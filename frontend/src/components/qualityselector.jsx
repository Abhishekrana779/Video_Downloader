// src/components/QualitySelector.jsx

import { FaCheckCircle, FaVideo, FaDownload } from "react-icons/fa";

export default function QualitySelector({
  qualities = [],
  selectedQuality,
  setSelectedQuality,
}) {
  if (!qualities.length) return null;

  // Remove duplicate qualities

  const uniqueQualities = qualities.filter(
    (item, index, self) =>
      index ===
      self.findIndex(
        (q) =>
          (q.height || q.quality || q.format_note) ===
          (item.height || item.quality || item.format_note),
      ),
  );

  const getQualityLabel = (item) => {
    if (item.quality) {
      return item.quality;
    }

    if (item.format_note) {
      return item.format_note;
    }

    if (item.height) {
      return `${item.height}p`;
    }

    return "Unknown";
  };

  const getFormatLabel = (item) => {
    return (item.ext || item.format || "MP4").toUpperCase();
  };

  const isSelected = (item) => {
    if (!selectedQuality) return false;

    return (
      selectedQuality.format_id === item.format_id ||
      selectedQuality.id === item.id ||
      selectedQuality.format === item.format
    );
  };

  return (
    <section
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
      {/* Header */}

      <div className="mb-6">
        <h2
          className="
            text-2xl
            font-bold
            text-white
            sm:text-3xl
          "
        >
          Select Video Quality
        </h2>

        <p
          className="
            mt-2
            text-sm
            text-slate-400
          "
        >
          Choose the video quality you want to download.
        </p>
      </div>

      {/* Quality Cards */}

      <div
        className="
          grid
          grid-cols-2
          gap-4
          sm:grid-cols-3
          lg:grid-cols-4
        "
      >
        {uniqueQualities.map((item, index) => {
          const active = isSelected(item);

          return (
            <button
              key={
                item.format_id || item.id || `${getQualityLabel(item)}-${index}`
              }
              onClick={() => setSelectedQuality(item)}
              className={`
                relative
                flex
                flex-col
                items-center
                justify-center
                rounded-2xl
                border
                p-5
                transition-all
                duration-300
                active:scale-95

                ${
                  active
                    ? `
                      border-red-500
                      bg-gradient-to-br
                      from-red-500
                      to-pink-600
                      text-white
                      shadow-lg
                      shadow-red-500/30
                    `
                    : `
                      border-slate-700
                      bg-slate-900
                      text-slate-300
                      hover:-translate-y-1
                      hover:border-red-500
                      hover:bg-slate-800
                    `
                }
              `}
            >
              {/* Selected Icon */}

              {active && (
                <FaCheckCircle
                  className="
                    absolute
                    right-3
                    top-3
                    text-xl
                  "
                />
              )}

              {/* Video Icon */}

              <div
                className="
                  mb-3
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-red-500/20
                "
              >
                <FaVideo
                  className="
                    text-2xl
                    text-red-400
                  "
                />
              </div>

              {/* Quality */}

              <h3
                className="
                  text-lg
                  font-bold
                "
              >
                {getQualityLabel(item)}
              </h3>

              {/* Format */}

              <span
                className="
                  mt-2
                  rounded-full
                  bg-white/10
                  px-3
                  py-1
                  text-xs
                "
              >
                {getFormatLabel(item)}
              </span>

              {/* Size */}

              {(item.size || item.filesize) && (
                <p
                  className="
                    mt-2
                    text-xs
                    text-slate-300
                  "
                >
                  {item.size ||
                    `${(item.filesize / 1024 / 1024).toFixed(2)} MB`}
                </p>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Quality */}

      {selectedQuality && (
        <div
          className="
            mt-8
            flex
            items-center
            justify-center
            gap-3
            rounded-2xl
            border
            border-red-500/30
            bg-red-500/10
            p-5
            text-red-300
          "
        >
          <FaDownload />

          <span>
            Selected:
            <strong
              className="
                ml-2
                text-white
              "
            >
              {getQualityLabel(selectedQuality)}
            </strong>
          </span>
        </div>
      )}
    </section>
  );
}
