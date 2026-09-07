import { execFile } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const execFileAsync = promisify(execFile);

const YT_DLP_PATH = "yt-dlp";

const YT_DLP_COMMON_ARGS = [
  "--js-runtimes",
  "node",
  "--no-playlist",
  "--extractor-args",
  "youtube:player_client=android,web",
];

function formatDuration(seconds) {
  if (!seconds) return "--:--";

  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

export async function fetchVideoInfo(url) {
  try {
    console.log("YT-DLP PATH:", YT_DLP_PATH);
    console.log("VIDEO URL:", url);

    const { stdout, stderr } = await execFileAsync(YT_DLP_PATH, [
      "--version",
    ]);

    console.log("YT-DLP VERSION:", stdout);
    console.log("YT-DLP STDERR:", stderr);

    const result = await execFileAsync(YT_DLP_PATH, [
      "--js-runtimes",
      "node",
      "--no-playlist",
      "-J",
      url,
    ]);

    console.log("YT-DLP OUTPUT RECEIVED");

    const data = JSON.parse(result.stdout);

    // ...rest of your code
  } catch (error) {
    console.error("========== YT-DLP ERROR ==========");
    console.error("message:", error.message);
    console.error("stdout:", error.stdout);
    console.error("stderr:", error.stderr);
    console.error("code:", error.code);

    throw error;
  }
}

export async function downloadVideoFile(url, quality) {
  try {
    const downloadsDir = path.resolve("downloads");

    if (!fs.existsSync(downloadsDir)) {
      fs.mkdirSync(downloadsDir, {
        recursive: true,
      });
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

    await execFileAsync(
      YT_DLP_PATH,
      [
        ...YT_DLP_COMMON_ARGS,

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

    if (!fs.existsSync(output)) {
      throw new Error(
        "Video file was not created."
      );
    }

    return output;
  } catch (error) {
    console.error("========== YT-DLP DOWNLOAD ERROR ==========");
    console.error("Message:", error.message);
    console.error("STDERR:", error.stderr);

    throw new Error(
      error.stderr || "Failed to download video"
    );
  }
}
