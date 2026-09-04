// src/components/DownloadButton.jsx

import { useState } from "react";
import {
  FaDownload,
  FaSpinner,
  FaCheckCircle,
  FaShieldAlt,
} from "react-icons/fa";

import { downloadVideo } from "../services/videoApi";

export default function DownloadButton({
  selectedQuality,
  videoUrl,
}) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  // =====================================
  // Get quality label
  // =====================================

  const getQualityLabel = (quality) => {
    if (!quality) return "Select Quality";

    if (quality.quality) {
      return quality.quality;
    }

    if (quality.format_note) {
      return quality.format_note;
    }

    if (quality.height) {
      return `${quality.height}p`;
    }

    return "Selected Quality";
  };

  // =====================================
  // Download
  // =====================================

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

  const qualityLabel =
    getQualityLabel(selectedQuality);

  return (
    <div className="w-full">
      {/* =================================
          Download Button
      ================================== */}

      <button
        type="button"
        onClick={handleDownload}
        disabled={loading || !selectedQuality}
        className={`
          group
          relative
          flex
          min-h-14
          w-full
          items-center
          justify-center
          gap-3
          overflow-hidden
          rounded-2xl
          px-6
          py-4
          text-sm
          font-bold
          transition-all
          duration-300
          sm:min-h-16
          sm:text-base

          ${
            loading
              ? `
                cursor-wait
                bg-slate-700
                text-slate-300
              `
              : selectedQuality
              ? `
                bg-gradient-to-r
                from-red-500
                via-pink-500
                to-purple-500
                text-white
                shadow-lg
                shadow-red-500/20

                hover:-translate-y-0.5
                hover:shadow-xl
                hover:shadow-red-500/30

                active:translate-y-0
                active:scale-[0.98]
              `
              : `
                cursor-not-allowed
                bg-slate-800
                text-slate-500
              `
          }
        `}
      >
        {/* Shine Effect */}

        {!loading && selectedQuality && (
          <span
            className="
              absolute
              inset-0
              -translate-x-full
              bg-gradient-to-r
              from-transparent
              via-white/10
              to-transparent
              transition-transform
              duration-700
              group-hover:translate-x-full
            "
          />
        )}

        {/* Icon */}

        {loading ? (
          <FaSpinner
            className="
              relative
              z-10
              animate-spin
              text-lg
            "
          />
        ) : (
          <FaDownload
            className="
              relative
              z-10
              text-lg
              transition-transform
              duration-300
              group-hover:translate-y-0.5
            "
          />
        )}

        {/* Text */}

        <span className="relative z-10">
          {loading
            ? "Preparing Download..."
            : selectedQuality
            ? `Download ${qualityLabel}`
            : "Select a Quality"}
        </span>
      </button>

      {/* =================================
          Status
      ================================== */}

      {status && (
        <div
          className="
            mt-4
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-emerald-500/15
            bg-emerald-500/[0.06]
            px-4
            py-3
            text-xs
            text-emerald-400
            sm:text-sm
          "
        >
          <FaCheckCircle />

          <span>{status}</span>
        </div>
      )}

      {/* =================================
          Security / Info
      ================================== */}

      {!status && !loading && selectedQuality && (
        <div
          className="
            mt-3
            flex
            items-center
            justify-center
            gap-2
            text-[10px]
            text-slate-600
            sm:text-xs
          "
        >
          <FaShieldAlt />

          Download will start automatically
        </div>
      )}
    </div>
  );
}