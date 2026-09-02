import { useState } from "react";
import {
  FaDownload,
  FaSpinner,
  FaCheckCircle,
} from "react-icons/fa";

import { downloadVideo } from "../services/videoApi";

export default function DownloadButton({
  selectedQuality,
  videoUrl,
}) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleDownload = async () => {
    if (loading) return;

    if (!selectedQuality) {
      alert("Please select a video quality.");
      return;
    }

    if (!videoUrl) {
      alert("Invalid video URL.");
      return;
    }

    try {
      setLoading(true);
      setStatus("Preparing your download...");

      await downloadVideo(
        videoUrl,
        selectedQuality.format
      );

      setStatus("Download started successfully.");

      setTimeout(() => {
        setStatus("");
      }, 3000);
    } catch (error) {
      console.error(error);

      setStatus("");

      alert(
        error.message ||
          "Unable to download the video."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto mt-8 w-full max-w-4xl px-4">
      <button
        onClick={handleDownload}
        disabled={loading || !selectedQuality}
        className={`
          group
          flex
          w-full
          items-center
          justify-center
          gap-3
          rounded-2xl
          px-6
          py-4
          text-lg
          font-semibold
          transition-all
          duration-300
          shadow-xl

          ${
            loading
              ? "cursor-wait bg-slate-700 text-white"
              : selectedQuality
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:-translate-y-1 hover:shadow-2xl"
              : "cursor-not-allowed bg-slate-800 text-slate-500"
          }
        `}
      >
        {loading ? (
          <FaSpinner className="animate-spin text-xl" />
        ) : (
          <FaDownload className="text-xl transition-transform group-hover:translate-y-1" />
        )}

        <span>
          {loading
            ? "Downloading..."
            : selectedQuality
            ? `Download ${selectedQuality.quality}`
            : "Select Quality"}
        </span>
      </button>

      {status && (
        <div className="mt-4 flex items-center justify-center gap-2 text-green-500">
          <FaCheckCircle />
          <span>{status}</span>
        </div>
      )}
    </section>
  );
}