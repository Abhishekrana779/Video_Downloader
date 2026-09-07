import { execFile } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const execFileAsync = promisify(execFile);

const YT_DLP_PATH = process.env.YT_DLP_PATH || "yt-dlp";
const YT_DLP_TIMEOUT = Number(process.env.YT_DLP_TIMEOUT_MS || 120000);
const YT_DLP_RETRIES = Number(process.env.YT_DLP_RETRIES || 2);
const POT_SCRIPT_PATH =
  process.env.YT_DLP_POT_SCRIPT_PATH ||
  path.resolve(process.cwd(), "../bgutil-ytdlp-pot-provider/server/build/generate_once.js");

function baseArgs() {
  return [
    "--js-runtimes",
    "node",
    "--no-playlist",
    "--retries",
    String(YT_DLP_RETRIES),
    "--fragment-retries",
    String(YT_DLP_RETRIES),
    "--socket-timeout",
    "30",
    "--extractor-args",
    "youtube:player-client=mweb",
    "--extractor-args",
    `youtubepot-bgutilscript:script_path=${POT_SCRIPT_PATH}`,
  ];
}

function formatDuration(seconds) {
  if (!Number.isFinite(Number(seconds)) || Number(seconds) <= 0) {
    return "--:--";
  }

  const total = Math.floor(Number(seconds));
  const minutes = Math.floor(total / 60);
  const secs = total % 60;

  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

function errorText(error) {
  return [error?.stderr, error?.stdout, error?.message]
    .filter(Boolean)
    .join("\n");
}

function cleanError(error) {
  const text = errorText(error);

  if (/429|too many requests/i.test(text)) {
    return new Error(
      "YouTube temporarily rate-limited this server (HTTP 429). Please wait and try again."
    );
  }

  if (/403|forbidden|failed to extract any player response/i.test(text)) {
    return new Error(
      "YouTube rejected the Render request (HTTP 403). The PO-token provider could not satisfy this request, or the Render IP is temporarily blocked."
    );
  }

  if (/script path doesn't exist|no server_home or script_path/i.test(text)) {
    return new Error(
      "The YouTube PO-token provider is not installed correctly on Render. Redeploy the latest build."
    );
  }

  return new Error(text || "yt-dlp failed to process the video");
}

async function runYtDlp(args) {
  return execFileAsync(YT_DLP_PATH, args, {
    timeout: YT_DLP_TIMEOUT,
    maxBuffer: 50 * 1024 * 1024,
    windowsHide: true,
  });
}

export async function fetchVideoInfo(url) {
  if (!url) throw new Error("Video URL is required");

  console.log("YT-DLP PATH:", YT_DLP_PATH);
  console.log("VIDEO URL:", url);
  console.log("PO TOKEN SCRIPT:", POT_SCRIPT_PATH);

  const version = await runYtDlp(["--version"]);
  console.log("YT-DLP VERSION:", version.stdout.trim());

  let lastError = null;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const result = await runYtDlp([
        ...baseArgs(),
        "--dump-single-json",
        "--skip-download",
        url,
      ]);

      const data = JSON.parse(result.stdout);

      const formats = (data.formats || [])
        .filter((item) => item.height)
        .map((item) => ({
          format_id: item.format_id,
          ext: item.ext,
          height: item.height,
          width: item.width,
          fps: item.fps,
          filesize: item.filesize || item.filesize_approx || null,
          vcodec: item.vcodec,
          acodec: item.acodec,
          abr: item.abr,
          vbr: item.vbr,
          format_note: item.format_note,
        }));

      return {
        id: data.id,
        title: data.title || "Untitled video",
        thumbnail: data.thumbnail || null,
        duration: data.duration || 0,
        durationFormatted: formatDuration(data.duration),
        uploader: data.uploader || data.channel || "Unknown",
        channel: data.channel || null,
        webpage_url: data.webpage_url || url,
        original_url: url,
        formats,
      };
    } catch (error) {
      lastError = error;
      console.error(`yt-dlp info attempt ${attempt + 1} failed:`, errorText(error));

      if (attempt === 0) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
    }
  }

  throw cleanError(lastError);
}

export async function downloadVideoFile(url, quality) {
  if (!url) throw new Error("Video URL is required");

  const downloadsDir = path.resolve("downloads");
  fs.mkdirSync(downloadsDir, { recursive: true });

  const output = path.join(downloadsDir, `video-${Date.now()}.mp4`);

  let formatSelector;

  if (quality) {
    const height = Number.parseInt(String(quality).replace("p", ""), 10);

    if (!Number.isInteger(height) || height <= 0) {
      throw new Error("Invalid video quality");
    }

    formatSelector =
      `bestvideo[height<=${height}][ext=mp4]+bestaudio[ext=m4a]/` +
      `bestvideo[height<=${height}]+bestaudio/` +
      `best[height<=${height}][ext=mp4]/best[height<=${height}]/best`;
  } else {
    formatSelector =
      "bestvideo[ext=mp4]+bestaudio[ext=m4a]/bestvideo+bestaudio/best[ext=mp4]/best";
  }

  try {
    await runYtDlp([
      ...baseArgs(),
      "-f",
      formatSelector,
      "--merge-output-format",
      "mp4",
      "-o",
      output,
      url,
    ]);

    if (!fs.existsSync(output)) {
      throw new Error("Video file was not created.");
    }

    const stat = fs.statSync(output);
    if (stat.size === 0) {
      fs.unlinkSync(output);
      throw new Error("Downloaded video is empty.");
    }

    return output;
  } catch (error) {
    if (fs.existsSync(output)) {
      try {
        fs.unlinkSync(output);
      } catch {}
    }

    throw cleanError(error);
  }
}
