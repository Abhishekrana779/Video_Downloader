import Home from "./pages/home";

export default function App() {
  return (
    <div
      className="
        relative
        min-h-screen
        overflow-x-hidden
        bg-slate-950
        text-white
      "
    >
      {/* Background Effects */}

      <div
        className="
          fixed
          inset-0
          -z-20
          overflow-hidden
        "
      >
        {/* Main Gradient */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-br
            from-slate-950
            via-slate-900
            to-black
          "
        />

        {/* Red Glow */}

        <div
          className="
            absolute
            -top-32
            left-1/2
            h-[30rem]
            w-[30rem]
            -translate-x-1/2
            rounded-full
            bg-red-500/20
            blur-[150px]
            animate-pulse
          "
        />

        {/* Blue Glow */}

        <div
          className="
            absolute
            -bottom-20
            -right-20
            h-[26rem]
            w-[26rem]
            rounded-full
            bg-blue-500/20
            blur-[140px]
            animate-pulse
          "
        />

        {/* Purple Glow */}

        <div
          className="
            absolute
            left-[-120px]
            top-1/2
            h-[22rem]
            w-[22rem]
            rounded-full
            bg-purple-500/20
            blur-[130px]
            animate-pulse
          "
        />

        {/* Grid Background */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.04]
            [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
            [background-size:50px_50px]
          "
        />
      </div>

      {/* Application Content */}

      <main
        className="
          relative
          z-10
          min-h-screen
        "
      >
        <Home />
      </main>
    </div>
  );
}
