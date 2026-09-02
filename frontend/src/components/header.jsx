// src/components/Header.jsx

import {
  FaVideo,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { useEffect, useState } from "react";

export default function Header() {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", href: "#" },
    { name: "Features", href: "#features" },
    { name: "FAQ", href: "#faq" },
    { name: "About", href: "#about" },
  ];

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-slate-800
        bg-slate-950/90
        backdrop-blur-lg
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
          sm:px-6
          lg:px-8
        "
      >

        {/* Logo */}

        <a
          href="#"
          className="flex items-center gap-3"
        >
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-r
              from-red-500
              to-pink-500
              text-white
              shadow-lg
              shadow-red-500/30
            "
          >
            <FaVideo />
          </div>

          <div>
            <h1
              className="
                text-lg
                font-bold
                text-white
                sm:text-xl
              "
            >
              Video Downloader
            </h1>

            <p
              className="
                hidden
                text-xs
                text-slate-400
                sm:block
              "
            >
              Download videos easily
            </p>
          </div>
        </a>


        {/* Desktop Navigation */}

        <nav
          className="
            hidden
            items-center
            gap-8
            md:flex
          "
        >
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="
                text-sm
                font-medium
                text-slate-300
                transition
                hover:text-red-400
              "
            >
              {link.name}
            </a>
          ))}
        </nav>


        {/* Actions */}

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          {/* Theme Button */}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-slate-700
              text-slate-300
              transition
              hover:bg-slate-800
              hover:text-white
            "
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>


          {/* Desktop Button */}

          <button
            className="
              hidden
              rounded-xl
              bg-red-500
              px-5
              py-2.5
              font-semibold
              text-white
              transition
              hover:bg-red-600
              md:block
            "
          >
            Get Started
          </button>


          {/* Mobile Menu */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-lg
              border
              border-slate-700
              text-white
              transition
              hover:bg-slate-800
              md:hidden
            "
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

        </div>
      </div>


      {/* Mobile Navigation */}

      <div
        className={`
          overflow-hidden
          transition-all
          duration-300
          md:hidden
          ${
            menuOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >

        <nav
          className="
            border-t
            border-slate-800
            bg-slate-950
            px-4
            py-5
          "
        >

          <div className="flex flex-col gap-3">

            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="
                  rounded-lg
                  px-3
                  py-2
                  text-slate-300
                  transition
                  hover:bg-slate-900
                  hover:text-red-400
                "
              >
                {link.name}
              </a>
            ))}


            <button
              className="
                mt-2
                rounded-xl
                bg-red-500
                px-5
                py-3
                font-semibold
                text-white
                transition
                hover:bg-red-600
              "
            >
              Get Started
            </button>

          </div>

        </nav>

      </div>

    </header>
  );
}