// src/components/searchbar.jsx

import { useState } from "react";
import {
  FaLink,
  FaDownload,
  FaSpinner,
  FaPaste,
  FaTimes,
  FaCheck,
} from "react-icons/fa";

export default function SearchBar({
  onSearch,
  loading = false,
}) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  // ================================
  // Validate URL
  // ================================

  const validateUrl = (value) => {
    try {
      const link = new URL(value);

      if (!["http:", "https:"].includes(link.protocol)) {
        return false;
      }

      const platforms = [
        "youtube.com",
        "youtu.be",
        "vimeo.com",
        "facebook.com",
        "tiktok.com",
        "instagram.com",
      ];

      return platforms.some(
        (site) =>
          link.hostname === site ||
          link.hostname.endsWith(`.${site}`)
      );
    } catch {
      return false;
    }
  };

  // ================================
  // Submit
  // ================================

  const handleSubmit = (e) => {
    e.preventDefault();

    const value = url.trim();

    if (!value) {
      setError("Please paste a video URL.");
      return;
    }

    if (!validateUrl(value)) {
      setError(
        "Please enter a supported video platform URL."
      );
      return;
    }

    setError("");
    onSearch?.(value);
  };

  // ================================
  // Paste
  // ================================

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();

      if (!text) {
        setError("Clipboard is empty.");
        return;
      }

      const cleanText = text.trim();

      setUrl(cleanText);

      if (validateUrl(cleanText)) {
        setError("");
      } else {
        setError(
          "The pasted text is not a supported video URL."
        );
      }
    } catch {
      setError("Clipboard permission denied.");
    }
  };

  // ================================
  // Clear
  // ================================

  const clearUrl = () => {
    setUrl("");
    setError("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full"
    >
      {/* ================================
          Input + Button
      ================================= */}

      <div
        className="
          flex
          flex-col
          gap-3
          sm:flex-row
        "
      >
        {/* URL Input */}

        <div className="relative min-w-0 flex-1">
          {/* Link Icon */}

          <FaLink
            className="
              pointer-events-none
              absolute
              left-4
              top-1/2
              z-10
              -translate-y-1/2
              text-sm
              text-slate-500
              sm:text-base
            "
          />

          <input
            id="video-url"
            type="url"
            value={url}
            disabled={loading}
            onChange={(e) => {
              setUrl(e.target.value);
              setError("");
            }}
            placeholder="Paste your video URL here..."
            aria-label="Video URL"
            className="
              h-14
              w-full
              rounded-2xl
              border
              border-white/10
              bg-slate-950/80
              pl-11
              pr-24
              text-sm
              text-white
              outline-none
              transition
              duration-200

              placeholder:text-slate-600

              hover:border-white/15

              focus:border-red-500/60
              focus:ring-4
              focus:ring-red-500/10

              disabled:cursor-not-allowed
              disabled:opacity-50

              sm:h-16
              sm:pl-12
              sm:pr-28
              sm:text-base
            "
          />

          {/* Input Actions */}

          <div
            className="
              absolute
              right-2
              top-1/2
              flex
              -translate-y-1/2
              items-center
              gap-1.5
            "
          >
            {/* Clear */}

            {url && (
              <button
                type="button"
                onClick={clearUrl}
                disabled={loading}
                aria-label="Clear URL"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  text-slate-500
                  transition
                  hover:bg-white/5
                  hover:text-white
                  disabled:opacity-50
                "
              >
                <FaTimes className="text-xs" />
              </button>
            )}

            {/* Paste */}

            <button
              type="button"
              onClick={handlePaste}
              disabled={loading}
              className="
                flex
                h-9
                items-center
                gap-1.5
                rounded-xl
                bg-white/5
                px-2.5
                text-xs
                font-medium
                text-slate-400
                transition
                hover:bg-white/10
                hover:text-white
                disabled:cursor-not-allowed
                disabled:opacity-50
                sm:px-3
              "
            >
              <FaPaste />

              <span className="hidden sm:inline">
                Paste
              </span>
            </button>
          </div>
        </div>

        {/* Get Video Button */}

        <button
          type="submit"
          disabled={loading}
          className="
            flex
            h-14
            w-full
            shrink-0
            items-center
            justify-center
            gap-2.5
            rounded-2xl
            bg-gradient-to-r
            from-red-500
            to-pink-500
            px-6
            text-sm
            font-bold
            text-white
            shadow-lg
            shadow-red-500/10
            transition
            duration-300

            hover:-translate-y-0.5
            hover:shadow-xl
            hover:shadow-red-500/20

            active:translate-y-0
            active:scale-[0.98]

            disabled:pointer-events-none
            disabled:opacity-60

            sm:h-16
            sm:w-auto
            sm:min-w-[150px]
          "
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin" />

              <span>Fetching...</span>
            </>
          ) : (
            <>
              <FaDownload />

              <span>Get Video</span>
            </>
          )}
        </button>
      </div>

      {/* ================================
          Validation Status
      ================================= */}

      {url && !error && !loading && validateUrl(url.trim()) && (
        <div
          className="
            mt-3
            flex
            items-center
            gap-2
            text-xs
            text-emerald-400
          "
        >
          <FaCheck />

          Supported video URL
        </div>
      )}

      {/* ================================
          Error
      ================================= */}

      {error && (
        <div
          className="
            mt-3
            rounded-xl
            border
            border-red-500/20
            bg-red-500/10
            px-4
            py-3
            text-xs
            leading-5
            text-red-400
            sm:text-sm
          "
          role="alert"
        >
          {error}
        </div>
      )}

      {/* ================================
          Supported Platforms
      ================================= */}

      <div
        className="
          mt-4
          flex
          flex-wrap
          items-center
          justify-center
          gap-1.5
          text-[11px]
          text-slate-600
          sm:justify-start
          sm:text-xs
        "
      >
        <span className="mr-1">
          Supports
        </span>

        {[
          "YouTube",
          "Vimeo",
          "Facebook",
          "TikTok",
          "Instagram",
        ].map((platform) => (
          <span
            key={platform}
            className="
              rounded-full
              border
              border-white/5
              bg-white/[0.03]
              px-2.5
              py-1
              text-slate-500
            "
          >
            {platform}
          </span>
        ))}
      </div>
    </form>
  );
}