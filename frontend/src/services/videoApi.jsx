// src/services/videoApi.jsx

const API_URL ="https://video-downloader-954d.onrender.com/api"

export async function getVideoInfo(url) {
  try {
    const response = await fetch(`${API_URL}/info`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        url,
      }),
    });

    let data;

    try {
      data = await response.json();
    } catch {
      throw new Error("Invalid response from server.");
    }

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch video information.");
    }

    return data;
  } catch (error) {
    console.error("Video Info Error:", error);

    if (error.message.includes("Failed to fetch")) {
      throw new Error(
        "Cannot connect to server. Make sure backend is running.",
      );
    }

    throw error;
  }
}

export async function downloadVideo(url, quality) {
  try {
    const response = await fetch(`${API_URL}/download`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        url,
        quality,
      }),
    });

    if (!response.ok) {
      let errorMessage = "Download failed.";

      try {
        const data = await response.json();

        errorMessage = data.message || errorMessage;
      } catch {}

      throw new Error(errorMessage);
    }

    const blob = await response.blob();

    const fileURL = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = fileURL;

    link.download = "video.mp4";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    window.URL.revokeObjectURL(fileURL);
  } catch (error) {
    console.error("Download Error:", error);

    throw error;
  }
}
