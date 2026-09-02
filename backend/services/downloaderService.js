import { execFile } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const execFileAsync = promisify(execFile);

const YT_DLP_PATH = "yt-dlp";

function formatDuration(seconds) {
  if (!seconds) return "--:--";

  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

export async function fetchVideoInfo(url) {
  try {
    const { stdout } = await execFileAsync(YT_DLP_PATH, [
      "--js-runtimes",
      "node",

      "-J",
      "--no-playlist",

      url,
    ]);

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
    console.error(error);

    throw error;
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

    console.log("Downloading with format:", formatSelector);

    await execFileAsync(YT_DLP_PATH, [
      "--js-runtimes",
      "node",

      "-f",
      formatSelector,

      "--no-playlist",

      "-o",
      output,

      url,
    ]);

    return output;
  } catch (error) {
    console.error("========== DOWNLOAD ERROR ==========");
    console.error(error);

    throw error;
  }
}