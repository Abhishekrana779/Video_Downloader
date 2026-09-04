import Home from "./pages/home";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-white">
      
      {/* Background Effects */}
      <div className="fixed inset-0 -z-20 overflow-hidden">
        
        {/* Main Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-black" />

        {/* Red Glow */}
        <div
          className="
            absolute
            -top-40
            left-1/2
            h-[22rem]
            w-[22rem]
            -translate-x-1/2
            rounded-full
            bg-red-500/15
            blur-[120px]
            sm:h-[30rem]
            sm:w-[30rem]
            sm:blur-[150px]
            motion-safe:animate-pulse
          "
        />

        {/* Blue Glow */}
        <div
          className="
            absolute
            -bottom-32
            -right-32
            h-[20rem]
            w-[20rem]
            rounded-full
            bg-blue-500/15
            blur-[110px]
            sm:h-[26rem]
            sm:w-[26rem]
            sm:blur-[140px]
            motion-safe:animate-pulse
          "
        />

        {/* Purple Glow */}
        <div
          className="
            absolute
            -left-32
            top-1/2
            h-[18rem]
            w-[18rem]
            rounded-full
            bg-purple-500/15
            blur-[100px]
            sm:h-[22rem]
            sm:w-[22rem]
            sm:blur-[130px]
            motion-safe:animate-pulse
          "
        />

        {/* Grid Background */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
            [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
            [background-size:40px_40px]
            sm:[background-size:50px_50px]
          "
        />
      </div>

      {/* Application Content */}
      <main className="relative z-10 min-h-screen">
        <Home />
      </main>
    </div>
  );
}