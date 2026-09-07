import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { downloadVideoFile, fetchVideoInfo } from "../services/downloaderService.js";

function statusForError(error) {
  const message = error?.message || "Download failed";
  if (/429|rate-limited/i.test(message)) return 429;
  if (/403|rejected the server request|PO token/i.test(message)) return 403;
  return 500;
}

export async function getVideoInfo(req, res) {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: "URL is required" });
    }

    const data = await fetchVideoInfo(url);
    return res.json(data);
  } catch (error) {
    console.error("========== VIDEO INFO ERROR ==========");
    console.error(error);

    return res.status(statusForError(error)).json({
      message: error.message || "Unable to fetch video information",
    });
  }
}

export async function downloadVideo(req, res) {
  let outputPath = null;

  try {
    const { url, quality } = req.body;

    if (!url) {
      return res.status(400).json({ message: "Video URL is required" });
    }

    if (quality) {
      const height = Number.parseInt(String(quality).replace("p", ""), 10);
      if (!Number.isInteger(height) || height <= 0) {
        return res.status(400).json({ message: "Invalid quality" });
      }
    }

    console.log("Starting video download");
    console.log("URL:", url);
    console.log("Quality:", quality || "best");

    outputPath = await downloadVideoFile(url, quality);

    const stat = fs.statSync(outputPath);
    if (stat.size <= 0) {
      throw new Error("Downloaded video is empty.");
    }

    res.setHeader("Content-Type", "video/mp4");
    res.setHeader("Content-Length", stat.size);
    res.setHeader("Content-Disposition", 'attachment; filename="video.mp4"');

    const fileStream = fs.createReadStream(outputPath);

    const cleanup = () => {
      if (outputPath && fs.existsSync(outputPath)) {
        fs.unlink(outputPath, (error) => {
          if (error) console.error("Failed to delete temporary file:", error);
        });
      }
    };

    fileStream.on("error", (error) => {
      console.error("File stream error:", error);
      cleanup();
      if (!res.headersSent) {
        res.status(500).json({ message: "Failed to send video" });
      } else {
        res.destroy(error);
      }
    });

    fileStream.on("close", cleanup);
    fileStream.pipe(res);
  } catch (error) {
    console.error("========== DOWNLOAD ERROR ==========");
    console.error(error);

    if (outputPath && fs.existsSync(outputPath)) {
      try {
        fs.unlinkSync(outputPath);
      } catch (deleteError) {
        console.error("Failed to delete temporary file:", deleteError);
      }
    }

    if (!res.headersSent) {
      return res.status(statusForError(error)).json({
        message: error.message || "Download failed",
      });
    }
  }
}

// Keep these imports available for compatibility with older deployments that
// may import controller-level helpers while the shared service is rolled out.
export { spawn, crypto, path };
