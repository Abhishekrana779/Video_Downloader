// src/components/QualitySelector.jsx

import {
  FaCheckCircle,
  FaVideo,
  FaDownload,
} from "react-icons/fa";

export default function QualitySelector({
  qualities = [],
  selectedQuality,
  setSelectedQuality,
}) {
  if (!qualities.length) return null;

  // =====================================
  // Remove duplicate qualities
  // =====================================

  const uniqueQualities = qualities.filter(
    (item, index, self) =>
      index ===
      self.findIndex(
        (q) =>
          (q.height || q.quality || q.format_note) ===
          (item.height || item.quality || item.format_note)
      )
  );

  // =====================================
  // Quality Label
  // =====================================

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

  // =====================================
  // Format Label
  // =====================================

  const getFormatLabel = (item) => {
    return (
      item.ext ||
      item.format ||
      "MP4"
    ).toUpperCase();
  };

  // =====================================
  // File Size
  // =====================================

  const getFileSize = (item) => {
    if (item.size) {
      return item.size;
    }

    if (item.filesize) {
      return `${(
        item.filesize /
        1024 /
        1024
      ).toFixed(2)} MB`;
    }

    if (item.filesize_approx) {
      return `${(
        item.filesize_approx /
        1024 /
        1024
      ).toFixed(2)} MB`;
    }

    return null;
  };

  // =====================================
  // Selected State
  // =====================================

  const isSelected = (item) => {
    if (!selectedQuality) return false;

    return (
      selectedQuality.format_id === item.format_id ||
      selectedQuality.id === item.id ||
      selectedQuality.format === item.format
    );
  };

  return (
    <div className="w-full">
      {/* =================================
          Header
      ================================== */}

      <div className="mb-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3
              className="
                text-base
                font-bold
                text-white
                sm:text-lg
              "
            >
              Choose Quality
            </h3>

            <p
              className="
                mt-1
                text-xs
                leading-5
                text-slate-500
                sm:text-sm
              "
            >
              Select the quality you want to download.
            </p>
          </div>

          {/* Number of qualities */}

          <span
            className="
              shrink-0
              rounded-full
              border
              border-white/10
              bg-white/5
              px-2.5
              py-1
              text-[10px]
              font-medium
              text-slate-400
              sm:px-3
              sm:text-xs
            "
          >
            {uniqueQualities.length}{" "}
            {uniqueQualities.length === 1
              ? "option"
              : "options"}
          </span>
        </div>
      </div>

      {/* =================================
          Quality Cards
      ================================== */}

      <div
        className="
          grid
          grid-cols-2
          gap-2.5
          sm:grid-cols-3
          sm:gap-3
          lg:grid-cols-4
        "
      >
        {uniqueQualities.map((item, index) => {
          const active = isSelected(item);
          const fileSize = getFileSize(item);

          return (
            <button
              key={
                item.format_id ||
                item.id ||
                `${getQualityLabel(item)}-${index}`
              }
              type="button"
              onClick={() =>
                setSelectedQuality(item)
              }
              aria-pressed={active}
              className={`
                group
                relative
                min-h-[140px]
                overflow-hidden
                rounded-2xl
                border
                p-4
                text-left
                transition-all
                duration-300
                active:scale-[0.97]

                ${
                  active
                    ? `
                      border-red-500/70
                      bg-gradient-to-br
                      from-red-500/15
                      via-pink-500/10
                      to-transparent
                      shadow-lg
                      shadow-red-500/10
                    `
                    : `
                      border-white/10
                      bg-white/[0.025]
                      hover:-translate-y-1
                      hover:border-red-500/30
                      hover:bg-white/[0.05]
                      hover:shadow-lg
                      hover:shadow-black/20
                    `
                }
              `}
            >
              {/* Selected Indicator */}

              {active && (
                <FaCheckCircle
                  className="
                    absolute
                    right-3
                    top-3
                    text-sm
                    text-red-400
                    sm:text-base
                  "
                />
              )}

              {/* Quality Icon */}

              <div
                className={`
                  mb-4
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  transition
                  duration-300
                  ${
                    active
                      ? "bg-red-500/20"
                      : "bg-white/5 group-hover:bg-red-500/10"
                  }
                `}
              >
                <FaVideo
                  className={`
                    text-base
                    transition
                    duration-300
                    ${
                      active
                        ? "text-red-400"
                        : "text-slate-500 group-hover:text-red-400"
                    }
                  `}
                />
              </div>

              {/* Quality */}

              <h4
                className={`
                  text-base
                  font-bold
                  sm:text-lg
                  ${
                    active
                      ? "text-white"
                      : "text-slate-200"
                  }
                `}
              >
                {getQualityLabel(item)}
              </h4>

              {/* Format + Size */}

              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <span
                  className={`
                    rounded-md
                    px-2
                    py-1
                    text-[10px]
                    font-semibold
                    ${
                      active
                        ? "bg-red-500/15 text-red-300"
                        : "bg-white/5 text-slate-500"
                    }
                  `}
                >
                  {getFormatLabel(item)}
                </span>

                {fileSize && (
                  <span
                    className="
                      truncate
                      text-[10px]
                      text-slate-500
                    "
                  >
                    {fileSize}
                  </span>
                )}
              </div>

              {/* Selected Bottom Line */}

              {active && (
                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-0.5
                    w-full
                    bg-gradient-to-r
                    from-red-500
                    to-pink-500
                  "
                />
              )}
            </button>
          );
        })}
      </div>

      {/* =================================
          Selected Quality
      ================================== */}

      {selectedQuality && (
        <div
          className="
            mt-5
            flex
            flex-col
            gap-3
            rounded-2xl
            border
            border-red-500/15
            bg-red-500/[0.06]
            p-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-red-500/10
                text-red-400
              "
            >
              <FaDownload className="text-sm" />
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                Selected quality
              </p>

              <p className="mt-0.5 text-sm font-semibold text-white">
                {getQualityLabel(selectedQuality)}
              </p>
            </div>
          </div>

          <span
            className="
              self-start
              rounded-full
              bg-white/5
              px-3
              py-1
              text-xs
              font-medium
              text-slate-400
              sm:self-auto
            "
          >
            {getFormatLabel(selectedQuality)}
          </span>
        </div>
      )}
    </div>
  );
}