// src/pages/Home.jsx

import { useRef, useState } from "react";
import {
  FaBolt,
  FaCheckCircle,
  FaClock,
  FaDownload,
  FaLink,
  FaShieldAlt,
  FaVideo,
} from "react-icons/fa";

import Header from "../components/header";
import SearchBar from "../components/searchbar";
import QualitySelector from "../components/qualityselector";
import DownloadButton from "../components/downloadbutton";
import Loading from "../components/loading";
import Footer from "../components/footer";

import { getVideoInfo } from "../services/videoApi";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [videoUrl, setVideoUrl] = useState("");

  const [video, setVideo] = useState(null);
  const [qualities, setQualities] = useState([]);
  const [selectedQuality, setSelectedQuality] = useState(null);

  const resultRef = useRef(null);

  const clearVideo = () => {
    setVideo(null);
    setQualities([]);
    setSelectedQuality(null);
    setVideoUrl("");
  };

  const handleSearch = async (url) => {
    const cleanUrl = url?.trim();

    if (!cleanUrl) {
      setError("Please enter a video URL.");
      return;
    }

    setLoading(true);
    setError("");

    clearVideo();

    try {
      const data = await getVideoInfo(cleanUrl);

      if (!data) {
        throw new Error("No video information found.");
      }

      const formats = Array.isArray(data.formats) ? data.formats : [];

      if (!formats.length) {
        throw new Error("No downloadable qualities available.");
      }

      setVideoUrl(cleanUrl);

      setVideo({
        title: data.title || "Untitled Video",
        thumbnail: data.thumbnail || "",
        duration: data.duration || "--:--",
        uploader: data.uploader || "Unknown Creator",
      });

      setQualities(formats);
      setSelectedQuality(formats[0]);

      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 200);
    } catch (err) {
      console.error("Video Fetch Error:", err);

      setError(
        err.message || "Something went wrong while fetching the video."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col text-white">
      <Header />

      <main className="flex-1">
        {/* =====================================
            HERO / DOWNLOAD SECTION
        ====================================== */}

        <section
          id="download"
          className="
            relative
            overflow-hidden
            px-4
            pb-16
            pt-12
            sm:px-6
            sm:pb-20
            sm:pt-16
            lg:px-8
            lg:pt-20
          "
        >
          <div className="mx-auto w-full max-w-6xl">
            {/* Hero Content */}

            <div className="mx-auto max-w-3xl text-center">
              {/* Small Badge */}

              <div
                className="
                  mb-5
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-red-500/20
                  bg-red-500/10
                  px-3
                  py-1.5
                  text-xs
                  font-medium
                  text-red-400
                  sm:text-sm
                "
              >
                <FaBolt className="text-[10px]" />

                Fast & Simple Video Downloader
              </div>

              {/* Heading */}

              <h1
                className="
                  text-4xl
                  font-extrabold
                  leading-[1.1]
                  tracking-tight
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                Download Videos
                <span
                  className="
                    block
                    bg-gradient-to-r
                    from-red-400
                    via-pink-400
                    to-purple-400
                    bg-clip-text
                    text-transparent
                  "
                >
                  Easily & Quickly
                </span>
              </h1>

              {/* Description */}

              <p
                className="
                  mx-auto
                  mt-5
                  max-w-2xl
                  text-sm
                  leading-6
                  text-slate-400
                  sm:text-base
                  sm:leading-7
                "
              >
                Paste your video URL below, choose your preferred quality,
                and download your video in just a few clicks.
              </p>
            </div>

            {/* Search Area */}

            <div
              className="
                mx-auto
                mt-9
                max-w-4xl
                sm:mt-10
              "
            >
              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-2
                  shadow-2xl
                  shadow-black/30
                  backdrop-blur-xl
                  sm:rounded-3xl
                  sm:p-3
                "
              >
                <SearchBar
                  onSearch={handleSearch}
                  loading={loading}
                />
              </div>

              {/* Supported message */}

              <div
                className="
                  mt-3
                  flex
                  items-center
                  justify-center
                  gap-2
                  text-xs
                  text-slate-500
                  sm:text-sm
                "
              >
                <FaLink className="text-slate-600" />

                Paste a public video URL to get started
              </div>
            </div>

            {/* Error */}

            {error && (
              <div
                className="
                  mx-auto
                  mt-6
                  max-w-3xl
                  rounded-2xl
                  border
                  border-red-500/20
                  bg-red-500/10
                  px-4
                  py-3
                  text-center
                  text-sm
                  text-red-400
                  shadow-lg
                  shadow-red-950/20
                "
              >
                {error}
              </div>
            )}

            {/* Loading */}

            {loading && (
              <div className="mx-auto mt-8 max-w-3xl">
                <Loading />
              </div>
            )}

            {/* =====================================
                VIDEO RESULT
            ====================================== */}

            {!loading && video && (
              <section
                ref={resultRef}
                className="
                  mx-auto
                  mt-10
                  max-w-4xl
                  scroll-mt-24
                  sm:mt-12
                "
              >
                {/* Video Information Card */}

                <div
                  className="
                    overflow-hidden
                    rounded-3xl
                    border
                    border-white/10
                    bg-slate-900/70
                    shadow-2xl
                    shadow-black/30
                    backdrop-blur-xl
                  "
                >
                  <div className="grid md:grid-cols-[280px_1fr]">
                    {/* Thumbnail */}

                    <div
                      className="
                        relative
                        aspect-video
                        overflow-hidden
                        bg-slate-800
                        md:aspect-auto
                      "
                    >
                      {video.thumbnail ? (
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="
                            h-full
                            w-full
                            object-cover
                          "
                        />
                      ) : (
                        <div
                          className="
                            flex
                            h-full
                            min-h-52
                            items-center
                            justify-center
                            bg-slate-800
                          "
                        >
                          <FaVideo className="text-4xl text-slate-600" />
                        </div>
                      )}

                      {/* Duration */}

                      <div
                        className="
                          absolute
                          bottom-3
                          right-3
                          rounded-md
                          bg-black/80
                          px-2
                          py-1
                          text-xs
                          font-medium
                          text-white
                          backdrop-blur-sm
                        "
                      >
                        {video.duration}
                      </div>
                    </div>

                    {/* Video Details */}

                    <div className="flex flex-col p-5 sm:p-6">
                      <div className="flex-1">
                        <div
                          className="
                            mb-2
                            flex
                            items-center
                            gap-2
                            text-xs
                            font-medium
                            uppercase
                            tracking-wider
                            text-red-400
                          "
                        >
                          <FaCheckCircle />

                          Video Found
                        </div>

                        <h2
                          className="
                            line-clamp-3
                            text-lg
                            font-bold
                            leading-7
                            text-white
                            sm:text-xl
                          "
                        >
                          {video.title}
                        </h2>

                        <p className="mt-2 text-sm text-slate-400">
                          {video.uploader}
                        </p>
                      </div>

                      {/* Quick Info */}

                      <div
                        className="
                          mt-5
                          grid
                          grid-cols-2
                          gap-3
                          border-t
                          border-white/10
                          pt-5
                        "
                      >
                        <div
                          className="
                            flex
                            items-center
                            gap-2
                            rounded-xl
                            bg-white/[0.03]
                            px-3
                            py-2.5
                          "
                        >
                          <FaClock className="text-sm text-red-400" />

                          <div>
                            <p className="text-[10px] uppercase text-slate-500">
                              Duration
                            </p>

                            <p className="text-xs font-medium text-slate-300">
                              {video.duration}
                            </p>
                          </div>
                        </div>

                        <div
                          className="
                            flex
                            items-center
                            gap-2
                            rounded-xl
                            bg-white/[0.03]
                            px-3
                            py-2.5
                          "
                        >
                          <FaDownload className="text-sm text-pink-400" />

                          <div>
                            <p className="text-[10px] uppercase text-slate-500">
                              Formats
                            </p>

                            <p className="text-xs font-medium text-slate-300">
                              {qualities.length} available
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quality + Download */}

                <div
                  className="
                    mt-6
                    rounded-3xl
                    border
                    border-white/10
                    bg-slate-900/60
                    p-5
                    shadow-xl
                    shadow-black/20
                    backdrop-blur-xl
                    sm:p-6
                  "
                >
                  <div className="mb-5">
                    <p className="text-sm font-semibold text-white">
                      Choose Download Quality
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Select the quality that works best for you.
                    </p>
                  </div>

                  <QualitySelector
                    qualities={qualities}
                    selectedQuality={selectedQuality}
                    setSelectedQuality={setSelectedQuality}
                  />

                  <div className="mt-5">
                    <DownloadButton
                      selectedQuality={selectedQuality}
                      videoUrl={videoUrl}
                    />
                  </div>
                </div>
              </section>
            )}

            {/* =====================================
                EMPTY STATE
            ====================================== */}

            {!loading && !video && !error && (
              <section
                className="
                  mx-auto
                  mt-12
                  max-w-4xl
                  sm:mt-16
                "
              >
                <div
                  className="
                    grid
                    grid-cols-1
                    gap-3
                    sm:grid-cols-3
                  "
                >
                  {/* Feature 1 */}

                  <div
                    className="
                      rounded-2xl
                      border
                      border-white/5
                      bg-white/[0.025]
                      p-5
                      text-center
                      transition
                      duration-300
                      hover:-translate-y-1
                      hover:border-red-500/20
                      hover:bg-white/[0.04]
                    "
                  >
                    <div
                      className="
                        mx-auto
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        bg-red-500/10
                        text-red-400
                      "
                    >
                      <FaBolt />
                    </div>

                    <h3 className="mt-3 text-sm font-semibold text-white">
                      Fast
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Get your video information quickly.
                    </p>
                  </div>

                  {/* Feature 2 */}

                  <div
                    className="
                      rounded-2xl
                      border
                      border-white/5
                      bg-white/[0.025]
                      p-5
                      text-center
                      transition
                      duration-300
                      hover:-translate-y-1
                      hover:border-pink-500/20
                      hover:bg-white/[0.04]
                    "
                  >
                    <div
                      className="
                        mx-auto
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        bg-pink-500/10
                        text-pink-400
                      "
                    >
                      <FaDownload />
                    </div>

                    <h3 className="mt-3 text-sm font-semibold text-white">
                      Multiple Qualities
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Choose from available video qualities.
                    </p>
                  </div>

                  {/* Feature 3 */}

                  <div
                    className="
                      rounded-2xl
                      border
                      border-white/5
                      bg-white/[0.025]
                      p-5
                      text-center
                      transition
                      duration-300
                      hover:-translate-y-1
                      hover:border-blue-500/20
                      hover:bg-white/[0.04]
                    "
                  >
                    <div
                      className="
                        mx-auto
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        bg-blue-500/10
                        text-blue-400
                      "
                    >
                      <FaShieldAlt />
                    </div>

                    <h3 className="mt-3 text-sm font-semibold text-white">
                      Simple & Clean
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      No complicated steps. Just paste and download.
                    </p>
                  </div>
                </div>
              </section>
            )}
          </div>
        </section>

        {/* =====================================
            FEATURES PLACEHOLDER
        ====================================== */}

        <section id="features" className="scroll-mt-24">
          {/* We'll build the full features section later */}
        </section>

        {/* =====================================
            FAQ PLACEHOLDER
        ====================================== */}

        <section id="faq" className="scroll-mt-24">
          {/* We'll build the FAQ section later */}
        </section>

        {/* =====================================
            ABOUT PLACEHOLDER
        ====================================== */}

        <section id="about" className="scroll-mt-24">
          {/* We'll build the About section later */}
        </section>
      </main>

      <Footer />
    </div>
  );
}