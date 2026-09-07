import { execFile } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const execFileAsync = promisify(execFile);

const YT_DLP_PATH = "/usr/local/bin/yt-dlp";

function formatDuration(seconds) {
  if (!seconds) return "--:--";

  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

const COMMON_ARGS = [
  "--js-runtimes",
  "node",
  "--no-playlist",
  "--extractor-args",
  "youtube:player_client=android,web",
];

export async function fetchVideoInfo(url) {
  try {
    const { stdout, stderr } = await execFileAsync(
      YT_DLP_PATH,
      [
        ...COMMON_ARGS,
        "-J",
        url,
      ],
      {
        maxBuffer: 50 * 1024 * 1024,
      }
    );

    if (stderr) {
      console.log("yt-dlp stderr:", stderr);
    }

    const data = JSON.parse(stdout);

    const qualityMap = new Map();

    for (const item of data.formats || []) {
      if (
        item.ext === "mp4" &&
        item.height &&
        item.height > 0
      ) {
        qualityMap.set(item.height, {
          quality: `${item.height}p`,
          height: item.height,
        });
      }
    }

    const formats = [...qualityMap.values()]
      .sort((a, b) => b.height - a.height)
      .map((item) => ({
        quality: item.quality,
        height: item.height,
      }));

    return {
      title: data.title,
      thumbnail: data.thumbnail,
      duration: formatDuration(data.duration),
      uploader: data.uploader,
      formats,
    };
  } catch (error) {
    console.error("========== FETCH ERROR ==========");

    console.error("Message:", error.message);
    console.error("STDOUT:", error.stdout);
    console.error("STDERR:", error.stderr);

    throw new Error(
      error.stderr ||
        error.message ||
        "Failed to fetch video information"
    );
  }
}

export async function downloadVideoFile(url, quality) {
  try {
    const downloadsDir = path.resolve("downloads");

    if (!fs.existsSync(downloadsDir)) {
      fs.mkdirSync(downloadsDir, { recursive: true });
    }

    const output = path.join(
      downloadsDir,
      `video-${Date.now()}.mp4`
    );

    let formatSelector;

    if (quality) {
      const height = parseInt(
        String(quality).replace("p", ""),
        10
      );

      if (!Number.isInteger(height) || height <= 0) {
        throw new Error("Invalid video quality");
      }

      formatSelector =
        `best[height<=${height}][ext=mp4]/` +
        `bestvideo[height<=${height}][ext=mp4]+bestaudio/` +
        `best[height<=${height}]/best`;
    } else {
      formatSelector =
        "best[ext=mp4]/bestvideo[ext=mp4]+bestaudio/best";
    }

    console.log(
      "Downloading with format:",
      formatSelector
    );

    const { stderr } = await execFileAsync(
      YT_DLP_PATH,
      [
        ...COMMON_ARGS,

        "-f",
        formatSelector,

        "-o",
        output,

        url,
      ],
      {
        maxBuffer: 50 * 1024 * 1024,
      }
    );

    if (stderr) {
      console.log("yt-dlp stderr:", stderr);
    }

    if (!fs.existsSync(output)) {
      throw new Error(
        "yt-dlp completed but the video file was not created."
      );
    }

    return output;
  } catch (error) {
    console.error("========== DOWNLOAD ERROR ==========");

    console.error("Message:", error.message);
    console.error("STDOUT:", error.stdout);
    console.error("STDERR:", error.stderr);

    throw new Error(
      error.stderr ||
        error.message ||
        "Failed to download video"
    );
  }
}
