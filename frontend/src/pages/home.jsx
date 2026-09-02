// src/pages/Home.jsx

import { useRef, useState } from "react";

import Header from "../components/header";
import SearchBar from "../components/searchbar";
import VideoCard from "../components/videocard";
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

      setError(err.message || "Something went wrong while fetching video.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        flex
        min-h-screen
        flex-col
        bg-slate-950
        text-white
      "
    >
      <Header />

      <main
        className="
          mx-auto
          w-full
          max-w-6xl
          flex-1
          px-4
          py-8
          sm:px-6
          lg:px-8
        "
      >
        <SearchBar onSearch={handleSearch} loading={loading} />

        {/* Error */}

        {error && (
          <div
            className="
              mt-6
              rounded-2xl
              border
              border-red-500/30
              bg-red-500/10
              p-4
              text-center
              text-red-400
            "
          >
            {error}
          </div>
        )}

        {/* Loading */}

        {loading && (
          <div className="mt-8">
            <Loading />
          </div>
        )}

        {/* Result */}

        {!loading && video && (
          <section
            ref={resultRef}
            className="
              mt-10
              space-y-8
            "
          >
            <VideoCard video={video} />

            <QualitySelector
              qualities={qualities}
              selectedQuality={selectedQuality}
              setSelectedQuality={setSelectedQuality}
            />

            <DownloadButton
              selectedQuality={selectedQuality}
              videoUrl={videoUrl}
            />
          </section>
        )}

        {/* Empty State */}

        {!loading && !video && !error && (
          <section
            className="
              flex
              min-h-[350px]
              items-center
              justify-center
              text-center
            "
          >
            <div
              className="
                max-w-xl
              "
            >
              <h2
                className="
                  text-3xl
                  font-bold
                  sm:text-4xl
                "
              >
                Download Videos Easily
              </h2>

              <p
                className="
                  mt-4
                  text-slate-400
                  leading-7
                "
              >
                Paste a supported video URL, choose your preferred quality, and
                download your video quickly.
              </p>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
