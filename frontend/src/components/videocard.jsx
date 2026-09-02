// src/components/SearchBar.jsx

import { useState } from "react";
import {
  FaLink,
  FaDownload,
  FaSpinner,
  FaPaste,
  FaTimes,
  FaYoutube,
} from "react-icons/fa";

export default function SearchBar({ onSearch, loading = false }) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const validateUrl = (value) => {
    try {
      const link = new URL(value);

      const supportedSites = [
        "youtube.com",
        "youtu.be",
        "facebook.com",
        "instagram.com",
        "tiktok.com",
        "vimeo.com",
        "twitter.com",
        "x.com",
      ];

      return supportedSites.some((site) => link.hostname.includes(site));
    } catch {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const value = url.trim();

    if (!value) {
      setError("Please enter a video URL.");
      return;
    }

    if (!validateUrl(value)) {
      setError("Please enter a supported video platform URL.");
      return;
    }

    setError("");
    onSearch?.(value);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();

      if (text) {
        setUrl(text.trim());
        setError("");
      }
    } catch {
      setError("Clipboard permission is unavailable.");
    }
  };

  const clearInput = () => {
    setUrl("");
    setError("");
  };

  return (
    <section
      id="search"
      className="
        mx-auto
        mt-10
        w-full
        max-w-5xl
        px-4
        sm:px-6
        lg:px-8
      "
    >
      <div
        className="
          overflow-hidden
          rounded-3xl
          border
          border-slate-800
          bg-slate-900
          shadow-2xl
        "
      >
        {/* Header */}

        <div
          className="
            border-b
            border-slate-800
            bg-gradient-to-r
            from-red-500/10
            via-pink-500/10
            to-purple-500/10
            p-6
          "
        >
          <div className="flex items-center gap-4">
            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-red-500
                text-white
                shadow-lg
              "
            >
              <FaYoutube className="text-2xl" />
            </div>

            <div>
              <h2
                className="
                  text-xl
                  font-bold
                  text-white
                  sm:text-2xl
                "
              >
                Video Downloader
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-400
                "
              >
                Paste a video link and select your preferred quality.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <label
            htmlFor="video-url"
            className="
              block
              text-sm
              font-medium
              text-slate-300
            "
          >
            Video URL
          </label>

          <div
            className="
              flex
              flex-col
              gap-4
              lg:flex-row
            "
          >
            {/* Input */}

            <div className="relative flex-1">
              <FaLink
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-500
                "
              />

              <input
                id="video-url"
                type="url"
                value={url}
                disabled={loading}
                autoComplete="off"
                spellCheck={false}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError("");
                }}
                placeholder="https://youtube.com/watch..."
                className="
                  w-full
                  rounded-2xl
                  border
                  border-slate-700
                  bg-slate-950
                  py-4
                  pl-12
                  pr-28
                  text-white
                  outline-none
                  transition

                  placeholder:text-slate-500

                  focus:border-red-500
                  focus:ring-4
                  focus:ring-red-500/20

                  disabled:opacity-50
                "
              />

              <div
                className="
                  absolute
                  right-3
                  top-1/2
                  flex
                  -translate-y-1/2
                  gap-2
                "
              >
                {url && (
                  <button
                    type="button"
                    disabled={loading}
                    onClick={clearInput}
                    aria-label="Clear URL"
                    className="
                      text-slate-400
                      transition
                      hover:text-white
                      disabled:opacity-50
                    "
                  >
                    <FaTimes />
                  </button>
                )}

                <button
                  type="button"
                  disabled={loading}
                  onClick={handlePaste}
                  aria-label="Paste URL"
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-lg
                    bg-slate-800
                    px-3
                    py-2
                    text-sm
                    text-slate-300
                    transition
                    hover:bg-slate-700
                    hover:text-white
                    disabled:opacity-50
                  "
                >
                  <FaPaste />

                  <span className="hidden sm:block">Paste</span>
                </button>
              </div>
            </div>

            {/* Submit Button */}

            <button
              type="submit"
              disabled={loading}
              className="
                flex
                min-h-[56px]
                min-w-[190px]
                items-center
                justify-center
                gap-3
                rounded-2xl
                bg-red-500
                px-6
                font-semibold
                text-white
                transition

                hover:bg-red-600

                active:scale-95

                disabled:pointer-events-none
                disabled:opacity-60
              "
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Fetching...
                </>
              ) : (
                <>
                  <FaDownload />
                  Get Video
                </>
              )}
            </button>
          </div>

          {/* Error */}

          {error && (
            <div
              className="
                rounded-xl
                border
                border-red-500/30
                bg-red-500/10
                px-4
                py-3
                text-sm
                text-red-400
              "
            >
              {error}
            </div>
          )}

          {/* Supported Platforms */}

          <div
            className="
              flex
              flex-wrap
              gap-2
              pt-2
            "
          >
            {[
              "YouTube",
              "Facebook",
              "Instagram",
              "TikTok",
              "Vimeo",
              "X/Twitter",
            ].map((platform) => (
              <span
                key={platform}
                className="
                  rounded-full
                  bg-slate-800
                  px-3
                  py-1
                  text-xs
                  text-slate-400
                "
              >
                {platform}
              </span>
            ))}
          </div>
        </form>
      </div>
    </section>
  );
}
