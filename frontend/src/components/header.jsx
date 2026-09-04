// src/components/header.jsx

import {
  FaVideo,
  FaBars,
  FaTimes,
  FaArrowRight,
} from "react-icons/fa";

import { useEffect, useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", href: "#" },
    { name: "Features", href: "#features" },
    { name: "FAQ", href: "#faq" },
    { name: "About", href: "#about" },
  ];

  // Close mobile menu when pressing Escape
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-white/10
        bg-slate-950/80
        backdrop-blur-xl
      "
    >
      <div
        className="
          mx-auto
          flex
          h-16
          max-w-7xl
          items-center
          justify-between
          px-4
          sm:h-[72px]
          sm:px-6
          lg:px-8
        "
      >
        {/* =========================
            Logo
        ========================== */}

        <a
          href="#"
          className="
            group
            flex
            min-w-0
            items-center
            gap-2.5
            sm:gap-3
          "
          onClick={() => setMenuOpen(false)}
        >
          {/* Logo Icon */}

          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-br
              from-red-500
              to-pink-500
              text-white
              shadow-lg
              shadow-red-500/20
              transition
              duration-300
              group-hover:scale-105
              group-hover:shadow-red-500/40
              sm:h-10
              sm:w-10
            "
          >
            <FaVideo className="text-sm sm:text-base" />
          </div>

          {/* Logo Text */}

          <div className="min-w-0">
            <h1
              className="
                truncate
                text-sm
                font-bold
                tracking-tight
                text-white
                sm:text-lg
              "
            >
              Video Downloader
            </h1>

            <p
              className="
                hidden
                text-[11px]
                text-slate-500
                sm:block
              "
            >
              Download videos easily
            </p>
          </div>
        </a>

        {/* =========================
            Desktop Navigation
        ========================== */}

        <nav
          className="
            hidden
            items-center
            gap-1
            md:flex
          "
        >
          {links.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              className={`
                group
                relative
                rounded-lg
                px-4
                py-2
                text-sm
                font-medium
                transition
                duration-200
                ${
                  index === 0
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                }
              `}
            >
              {link.name}

              {/* Hover underline */}

              <span
                className="
                  absolute
                  bottom-1
                  left-4
                  right-4
                  h-px
                  origin-left
                  scale-x-0
                  bg-gradient-to-r
                  from-red-500
                  to-pink-500
                  transition
                  duration-300
                  group-hover:scale-x-100
                "
              />
            </a>
          ))}
        </nav>

        {/* =========================
            Desktop CTA + Mobile Menu
        ========================== */}

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Desktop Get Started */}

          <a
            href="#download"
            className="
              hidden
              items-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-red-500
              to-pink-500
              px-4
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-lg
              shadow-red-500/10
              transition
              duration-300
              hover:-translate-y-0.5
              hover:shadow-red-500/30
              sm:px-5
              md:flex
            "
          >
            Get Started

            <FaArrowRight
              className="
                text-xs
                transition
                duration-300
                group-hover:translate-x-1
              "
            />
          </a>

          {/* Mobile Menu Button */}

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-white/10
              bg-white/5
              text-slate-300
              transition
              duration-200
              hover:border-white/20
              hover:bg-white/10
              hover:text-white
              md:hidden
            "
          >
            {menuOpen ? (
              <FaTimes className="text-sm" />
            ) : (
              <FaBars className="text-sm" />
            )}
          </button>
        </div>
      </div>

      {/* =========================
          Mobile Navigation
      ========================== */}

      <div
        className={`
          overflow-hidden
          border-t
          border-white/5
          bg-slate-950/95
          backdrop-blur-xl
          transition-all
          duration-300
          md:hidden
          ${
            menuOpen
              ? "max-h-[500px] opacity-100"
              : "max-h-0 border-t-transparent opacity-0"
          }
        `}
      >
        <nav className="px-4 py-4 sm:px-6">
          <div className="flex flex-col gap-1">
            {links.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  font-medium
                  transition
                  duration-200
                  ${
                    index === 0
                      ? "bg-red-500/10 text-red-400"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                {link.name}

                {index === 0 && (
                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-red-500
                    "
                  />
                )}
              </a>
            ))}

            {/* Mobile CTA */}

            <a
              href="#download"
              onClick={() => setMenuOpen(false)}
              className="
                mt-3
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-red-500
                to-pink-500
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                shadow-lg
                shadow-red-500/10
                transition
                duration-300
                hover:shadow-red-500/30
              "
            >
              Get Started

              <FaArrowRight className="text-xs" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}