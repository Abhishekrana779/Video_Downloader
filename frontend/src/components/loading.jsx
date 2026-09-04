// src/components/loading.jsx

import {
  FaSpinner,
  FaVideo,
  FaBolt,
} from "react-icons/fa";

export default function Loading() {
  return (
    <section
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="
        mx-auto
        w-full
        max-w-5xl
        px-4
        py-10
        sm:px-6
        sm:py-12
        lg:px-8
      "
    >
      {/* =================================
          Main Loader
      ================================== */}

      <div
        className="
          flex
          flex-col
          items-center
          justify-center
          text-center
        "
      >
        {/* Animated Icon */}

        <div
          className="
            relative
            flex
            h-20
            w-20
            items-center
            justify-center
            sm:h-24
            sm:w-24
          "
        >
          {/* Outer Ring */}

          <div
            className="
              absolute
              inset-0
              rounded-full
              border-4
              border-white/5
            "
          />

          {/* Animated Ring */}

          <div
            className="
              absolute
              inset-0
              animate-spin
              rounded-full
              border-4
              border-transparent
              border-t-red-500
              border-r-pink-500
            "
          />

          {/* Inner Circle */}

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-slate-900
              shadow-lg
              sm:h-16
              sm:w-16
            "
          >
            <FaVideo
              className="
                text-xl
                text-red-400
                sm:text-2xl
              "
            />
          </div>
        </div>

        {/* Heading */}

        <h2
          className="
            mt-6
            flex
            items-center
            gap-2
            text-xl
            font-bold
            text-white
            sm:mt-7
            sm:text-2xl
          "
        >
          Fetching Video

          <FaSpinner
            className="
              animate-spin
              text-base
              text-red-500
              sm:text-lg
            "
          />
        </h2>

        {/* Description */}

        <p
          className="
            mt-3
            max-w-md
            text-center
            text-sm
            leading-6
            text-slate-400
          "
        >
          We're getting the video information and
          checking the available download qualities.
        </p>
      </div>

      {/* =================================
          Progress Bar
      ================================== */}

      <div className="mx-auto mt-7 w-full max-w-md">
        <div
          className="
            h-1.5
            overflow-hidden
            rounded-full
            bg-slate-800
          "
        >
          <div
            className="
              h-full
              w-1/2
              animate-[loading_1.5s_ease-in-out_infinite]
              rounded-full
              bg-gradient-to-r
              from-red-500
              via-pink-500
              to-purple-500
            "
          />
        </div>
      </div>

      {/* =================================
          Loading Preview
      ================================== */}

      <div
        className="
          mx-auto
          mt-8
          w-full
          rounded-2xl
          border
          border-white/10
          bg-white/[0.03]
          p-4
          backdrop-blur-xl
          sm:mt-10
          sm:rounded-3xl
          sm:p-5
        "
      >
        <div
          className="
            animate-pulse
            md:grid
            md:grid-cols-[240px_1fr]
            md:gap-5
          "
        >
          {/* Thumbnail Skeleton */}

          <div
            className="
              flex
              h-44
              w-full
              items-center
              justify-center
              overflow-hidden
              rounded-xl
              bg-slate-800/80
              sm:h-52
              md:h-40
            "
          >
            <FaVideo
              className="
                text-3xl
                text-slate-700
              "
            />
          </div>

          {/* Content Skeleton */}

          <div className="mt-5 md:mt-0">
            {/* Title */}

            <div
              className="
                h-6
                w-4/5
                rounded-lg
                bg-slate-800
                sm:h-7
              "
            />

            {/* Uploader */}

            <div
              className="
                mt-3
                h-4
                w-2/5
                rounded
                bg-slate-800
              "
            />

            {/* Info Cards */}

            <div
              className="
                mt-6
                grid
                grid-cols-2
                gap-3
              "
            >
              <div
                className="
                  h-14
                  rounded-xl
                  bg-slate-800/80
                "
              />

              <div
                className="
                  h-14
                  rounded-xl
                  bg-slate-800/80
                "
              />
            </div>
          </div>
        </div>
      </div>

      {/* =================================
          Status Message
      ================================== */}

      <div
        className="
          mt-6
          flex
          items-center
          justify-center
          gap-2
          text-xs
          text-slate-500
          sm:text-sm
        "
      >
        <FaBolt className="text-red-400" />

        <span>
          This usually takes only a few seconds...
        </span>
      </div>
    </section>
  );
}