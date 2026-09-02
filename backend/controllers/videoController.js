import { fetchVideoInfo } from "../services/downloaderService.js";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import crypto from "crypto";

// ===============================
// YT-DLP PATH
// ===============================

const YTDLP_PATH =
  process.platform === "win32"
    ? "yt-dlp.exe"
    : "yt-dlp";

// ===============================
// GET VIDEO INFORMATION
// ===============================

export async function getVideoInfo(req, res) {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        message: "URL is required",
      });
    }

    const data = await fetchVideoInfo(url);

    return res.json(data);
  } catch (error) {
    console.error(
      "========== VIDEO INFO ERROR =========="
    );

    console.error(error);

    return res.status(500).json({
      message:
        error.message ||
        "Unable to fetch video information",
    });
  }
}

// ===============================
// DOWNLOAD VIDEO
// ===============================

export async function downloadVideo(req, res) {
  let outputPath = null;
  let ytdlp = null;

  try {
    const { url, quality } = req.body;

    // ===============================
    // VALIDATE URL
    // ===============================

    if (!url) {
      return res.status(400).json({
        message: "Video URL is required",
      });
    }

    // ===============================
    // CONVERT QUALITY
    // ===============================

    const height = quality
      ? parseInt(
          String(quality).replace("p", ""),
          10
        )
      : null;

    if (
      quality &&
      (!Number.isInteger(height) || height <= 0)
    ) {
      return res.status(400).json({
        message: "Invalid quality",
      });
    }

    // ===============================
    // CREATE DOWNLOAD DIRECTORY
    // ===============================

    const downloadsDir =
      path.resolve("downloads");

    if (!fs.existsSync(downloadsDir)) {
      fs.mkdirSync(downloadsDir, {
        recursive: true,
      });
    }

    // ===============================
    // CREATE UNIQUE FILE NAME
    // ===============================

    const randomId = crypto
      .randomBytes(6)
      .toString("hex");

    outputPath = path.join(
      downloadsDir,
      `video-${Date.now()}-${randomId}.mp4`
    );

    // ===============================
    // FORMAT SELECTION
    // ===============================

    let format;

    if (height) {
      format =
        `bestvideo[height<=${height}][ext=mp4]+` +
        `bestaudio[ext=m4a]/` +
        `bestvideo[height<=${height}]+` +
        `bestaudio/best`;
    } else {
      format =
        "bestvideo[ext=mp4]+bestaudio[ext=m4a]/" +
        "bestvideo+bestaudio/best";
    }

    // ===============================
    // YT-DLP ARGUMENTS
    // ===============================

    const args = [
      "-f",
      format,

      "--merge-output-format",
      "mp4",

      "--no-playlist",

      "-o",
      outputPath,

      url,
    ];

    // ===============================
    // LOG
    // ===============================

    console.log("");
    console.log(
      "================================="
    );
    console.log(
      "Starting video download"
    );
    console.log(
      "================================="
    );
    console.log("URL:", url);
    console.log(
      "Quality:",
      quality || "best"
    );
    console.log("Format:", format);
    console.log(
      "Output:",
      outputPath
    );
    console.log(
      "yt-dlp:",
      YTDLP_PATH
    );
    console.log(
      "================================="
    );

    // ===============================
    // START YT-DLP
    // ===============================

    ytdlp = spawn(
      YTDLP_PATH,
      args,
      {
        windowsHide: true,
      }
    );

    let stderr = "";

    // ===============================
    // STDOUT
    // ===============================

    ytdlp.stdout.on(
      "data",
      (data) => {
        console.log(
          "yt-dlp:",
          data.toString()
        );
      }
    );

    // ===============================
    // STDERR
    // ===============================

    ytdlp.stderr.on(
      "data",
      (data) => {
        const message =
          data.toString();

        stderr += message;

        console.log(
          "yt-dlp:",
          message
        );
      }
    );

    // ===============================
    // SPAWN ERROR
    // ===============================

    ytdlp.on(
      "error",
      (error) => {
        console.error(
          "================================="
        );

        console.error(
          "yt-dlp spawn error"
        );

        console.error(
          "================================="
        );

        console.error(error);

        if (
          outputPath &&
          fs.existsSync(outputPath)
        ) {
          try {
            fs.unlinkSync(
              outputPath
            );
          } catch (deleteError) {
            console.error(
              "Failed to delete file:",
              deleteError
            );
          }
        }

        if (!res.headersSent) {
          return res
            .status(500)
            .json({
              message:
                "Failed to start yt-dlp. Make sure yt-dlp is installed and available in PATH.",
              error:
                error.message,
            });
        }
      }
    );

    // ===============================
    // YT-DLP FINISHED
    // ===============================

    ytdlp.on(
      "close",
      (code) => {
        // ===============================
        // DOWNLOAD FAILED
        // ===============================

        if (code !== 0) {
          console.error(
            "================================="
          );

          console.error(
            "yt-dlp failed"
          );

          console.error(
            "Exit code:",
            code
          );

          console.error(
            "================================="
          );

          console.error(stderr);

          if (
            outputPath &&
            fs.existsSync(outputPath)
          ) {
            try {
              fs.unlinkSync(
                outputPath
              );
            } catch (deleteError) {
              console.error(
                "Failed to delete file:",
                deleteError
              );
            }
          }

          if (!res.headersSent) {
            return res
              .status(500)
              .json({
                message:
                  "Video download failed",
                error:
                  stderr ||
                  `yt-dlp exited with code ${code}`,
              });
          }

          return;
        }

        // ===============================
        // DOWNLOAD SUCCESS
        // ===============================

        console.log(
          "================================="
        );

        console.log(
          "yt-dlp download completed"
        );

        console.log(
          "================================="
        );

        // ===============================
        // CHECK OUTPUT FILE
        // ===============================

        if (
          !outputPath ||
          !fs.existsSync(
            outputPath
          )
        ) {
          console.error(
            "Output file does not exist:",
            outputPath
          );

          if (!res.headersSent) {
            return res
              .status(500)
              .json({
                message:
                  "Downloaded file was not created",
              });
          }

          return;
        }

        // ===============================
        // CHECK FILE SIZE
        // ===============================

        const stat =
          fs.statSync(
            outputPath
          );

        console.log(
          "Downloaded file size:",
          stat.size,
          "bytes"
        );

        if (stat.size === 0) {
          try {
            fs.unlinkSync(
              outputPath
            );
          } catch (deleteError) {
            console.error(
              deleteError
            );
          }

          if (!res.headersSent) {
            return res
              .status(500)
              .json({
                message:
                  "Downloaded file is empty",
              });
          }

          return;
        }

        // ===============================
        // SEND VIDEO
        // ===============================

        res.setHeader(
          "Content-Type",
          "video/mp4"
        );

        res.setHeader(
          "Content-Length",
          stat.size
        );

        res.setHeader(
          "Content-Disposition",
          'attachment; filename="video.mp4"'
        );

        const fileStream =
          fs.createReadStream(
            outputPath
          );

        // ===============================
        // FILE STREAM ERROR
        // ===============================

        fileStream.on(
          "error",
          (error) => {
            console.error(
              "File stream error:",
              error
            );

            if (
              !res.headersSent
            ) {
              res
                .status(500)
                .json({
                  message:
                    "Failed to send video",
                });
            } else {
              res.destroy(
                error
              );
            }
          }
        );

        // ===============================
        // DELETE TEMP FILE
        // ===============================

        fileStream.on(
          "close",
          () => {
            if (
              outputPath &&
              fs.existsSync(
                outputPath
              )
            ) {
              fs.unlink(
                outputPath,
                (error) => {
                  if (error) {
                    console.error(
                      "Failed to delete temporary file:",
                      error
                    );
                  } else {
                    console.log(
                      "Temporary file deleted:",
                      outputPath
                    );
                  }
                }
              );
            }
          }
        );

        // ===============================
        // SEND FILE
        // ===============================

        fileStream.pipe(res);
      }
    );
  } catch (error) {
    console.error(
      "========== DOWNLOAD ERROR =========="
    );

    console.error(error);

    // ===============================
    // STOP YT-DLP
    // ===============================

    if (
      ytdlp &&
      !ytdlp.killed
    ) {
      ytdlp.kill();
    }

    // ===============================
    // DELETE FILE
    // ===============================

    if (
      outputPath &&
      fs.existsSync(outputPath)
    ) {
      try {
        fs.unlinkSync(
          outputPath
        );
      } catch (deleteError) {
        console.error(
          "Failed to delete file:",
          deleteError
        );
      }
    }

    // ===============================
    // SEND ERROR
    // ===============================

    if (!res.headersSent) {
      return res
        .status(500)
        .json({
          message:
            error.message ||
            "Download failed",
        });
    }
  }
}