import { useState } from "react";
import {
  FaLink,
  FaDownload,
  FaSpinner,
  FaPaste,
  FaYoutube,
  FaTimes,
} from "react-icons/fa";

export default function SearchBar({
  onSearch,
  loading = false,
}) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");


  const validateUrl = (value) => {
    try {
      const link = new URL(value);

      const platforms = [
        "youtube.com",
        "youtu.be",
        "vimeo.com",
        "facebook.com",
        "tiktok.com",
        "instagram.com",
      ];

      return platforms.some((site) =>
        link.hostname.includes(site)
      );

    } catch {
      return false;
    }
  };



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



  const handlePaste = async () => {
    try {
      const text =
        await navigator.clipboard.readText();


      if (text) {
        setUrl(text.trim());
        setError("");
      }

    } catch {
      setError(
        "Clipboard permission denied."
      );
    }
  };



  const clearUrl = () => {
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


        {/* Top Header */}

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
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-red-500
                text-white
                shadow-lg
              "
            >
              <FaYoutube className="text-xl" />
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
                Download Videos
              </h2>


              <p
                className="
                  mt-1
                  text-sm
                  text-slate-400
                "
              >
                Paste your video link and select quality.
              </p>

            </div>

          </div>

        </div>



        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >


          <label
            htmlFor="video-url"
            className="
              text-sm
              font-semibold
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
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError("");
                }}
                placeholder="Paste video URL here..."
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
                    onClick={clearUrl}
                    className="
                      rounded-lg
                      bg-slate-800
                      p-2
                      text-slate-400
                      hover:text-white
                    "
                  >
                    <FaTimes />
                  </button>
                )}



                <button
                  type="button"
                  onClick={handlePaste}
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-slate-800
                    px-3
                    py-2
                    text-sm
                    text-slate-300
                    hover:bg-slate-700
                    hover:text-white
                  "
                >
                  <FaPaste />
                  <span className="hidden sm:block">
                    Paste
                  </span>
                </button>


              </div>

            </div>




            {/* Button */}

            <button
              type="submit"
              disabled={loading}
              className="
                flex
                items-center
                justify-center
                gap-3
                rounded-2xl
                bg-red-500
                px-7
                py-4
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
                  Fetching
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




          {/* Platforms */}

          <div
            className="
              flex
              flex-wrap
              gap-2
              text-xs
              text-slate-400
            "
          >

            <span>
              Supported:
            </span>

            {[
              "YouTube",
              "Vimeo",
              "Facebook",
              "TikTok",
              "Instagram",
            ].map((item) => (
              <span
                key={item}
                className="
                  rounded-full
                  bg-slate-800
                  px-3
                  py-1
                "
              >
                {item}
              </span>
            ))}

          </div>


        </form>


      </div>

    </section>
  );
}