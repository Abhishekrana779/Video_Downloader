// src/components/Loading.jsx

import { FaSpinner, FaVideo } from "react-icons/fa";

export default function Loading() {
  return (
    <section
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="
        mx-auto
        flex
        min-h-[400px]
        w-full
        max-w-5xl
        flex-col
        items-center
        justify-center
        px-4
        py-12
        sm:px-6
        lg:px-8
      "
    >

      {/* Loader */}

      <div className="relative flex h-24 w-24 items-center justify-center">

        <div
          className="
            absolute
            h-24
            w-24
            rounded-full
            border-4
            border-slate-800
          "
        />

        <div
          className="
            absolute
            h-24
            w-24
            animate-spin
            rounded-full
            border-4
            border-transparent
            border-t-red-500
            border-l-pink-500
          "
        />

        <FaVideo
          className="
            text-3xl
            text-red-400
          "
        />

      </div>


      {/* Heading */}

      <h2
        className="
          mt-8
          flex
          items-center
          gap-2
          text-center
          text-2xl
          font-bold
          text-white
          sm:text-3xl
        "
      >
        Fetching Video
        <FaSpinner className="animate-spin text-red-500" />
      </h2>


      <p
        className="
          mt-3
          max-w-lg
          text-center
          text-sm
          leading-7
          text-slate-400
        "
      >
        We are collecting video information and finding available qualities.
        Please wait a moment.
      </p>


      {/* Loading Bar */}

      <div className="mt-8 w-full max-w-md">

        <div
          className="
            h-2
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



      {/* Skeleton Preview */}

      <div
        className="
          mt-10
          w-full
          rounded-3xl
          border
          border-slate-800
          bg-slate-900/80
          p-5
          shadow-xl
          backdrop-blur
          sm:p-6
        "
      >

        <div
          className="
            flex
            flex-col
            gap-6
            animate-pulse
            md:flex-row
          "
        >

          {/* Thumbnail */}

          <div
            className="
              flex
              h-48
              w-full
              items-center
              justify-center
              rounded-2xl
              bg-slate-800
              md:h-52
              md:w-80
            "
          >
            <FaVideo className="text-4xl text-slate-700" />
          </div>


          {/* Content */}

          <div className="flex flex-1 flex-col">

            <div
              className="
                h-7
                w-3/4
                rounded-lg
                bg-slate-800
              "
            />

            <div
              className="
                mt-4
                h-4
                w-1/2
                rounded
                bg-slate-800
              "
            />


            <div
              className="
                mt-3
                h-4
                w-2/3
                rounded
                bg-slate-800
              "
            />


            <div className="mt-8 space-y-3">

              <div
                className="
                  h-12
                  rounded-xl
                  bg-slate-800
                "
              />

              <div
                className="
                  h-12
                  rounded-xl
                  bg-slate-800
                "
              />

              <div
                className="
                  h-12
                  rounded-xl
                  bg-slate-800
                "
              />

            </div>

          </div>

        </div>

      </div>


      <p
        className="
          mt-6
          text-center
          text-sm
          text-slate-500
        "
      >
        This normally takes only a few seconds...
      </p>

    </section>
  );
}