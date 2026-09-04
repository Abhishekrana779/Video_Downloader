// src/components/footer.jsx

import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaHeart,
  FaReact,
  FaArrowUp,
} from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "#" },
    { name: "Features", href: "#features" },
    { name: "FAQ", href: "#faq" },
    { name: "About", href: "#about" },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/sushantrana1",
      icon: <FaGithub />,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: <FaLinkedin />,
    },
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: <FaTwitter />,
    },
  ];

  return (
    <footer
      className="
        relative
        mt-16
        w-full
        overflow-hidden
        border-t
        border-white/10
        bg-slate-950
        text-white
      "
    >
      {/* =================================
          Background Glow
      ================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -top-32
          left-1/2
          h-64
          w-64
          -translate-x-1/2
          rounded-full
          bg-red-500/10
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-32
          right-0
          h-64
          w-64
          rounded-full
          bg-purple-500/10
          blur-3xl
        "
      />

      {/* =================================
          Main Footer
      ================================== */}

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-7xl
          px-4
          py-12
          sm:px-6
          sm:py-14
          lg:px-8
        "
      >
        <div
          className="
            grid
            grid-cols-1
            gap-10
            sm:grid-cols-2
            lg:grid-cols-3
            lg:gap-16
          "
        >
          {/* =================================
              Brand
          ================================== */}

          <div className="sm:col-span-2 lg:col-span-1">
            <a
              href="#"
              className="
                inline-flex
                items-center
                gap-2.5
                text-xl
                font-bold
                tracking-tight
                sm:text-2xl
              "
            >
              <span
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  bg-gradient-to-br
                  from-red-500
                  to-purple-500
                  shadow-lg
                  shadow-red-500/20
                "
              >
                <FaVideoIcon />
              </span>

              <span>
                Video
                <span className="text-red-400">
                  Downloader
                </span>
              </span>
            </a>

            <p
              className="
                mt-4
                max-w-md
                text-sm
                leading-6
                text-slate-400
              "
            >
              Download videos quickly and easily with
              a simple, fast, and responsive video
              downloader interface.
            </p>

            {/* Tech */}

            <div
              className="
                mt-5
                flex
                items-center
                gap-2
                text-xs
                text-slate-500
              "
            >
              <FaReact
                className="
                  text-cyan-400
                "
              />

              Built with React & Tailwind CSS
            </div>
          </div>

          {/* =================================
              Quick Links
          ================================== */}

          <div>
            <h3
              className="
                text-sm
                font-semibold
                uppercase
                tracking-wider
                text-white
              "
            >
              Quick Links
            </h3>

            <ul
              className="
                mt-5
                space-y-3
                text-sm
              "
            >
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="
                      inline-flex
                      transition-colors
                      duration-200
                      text-slate-400
                      hover:text-red-400
                    "
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* =================================
              Follow
          ================================== */}

          <div>
            <h3
              className="
                text-sm
                font-semibold
                uppercase
                tracking-wider
                text-white
              "
            >
              Follow Me
            </h3>

            <p
              className="
                mt-5
                max-w-xs
                text-sm
                leading-6
                text-slate-500
              "
            >
              Connect with me and check out more of
              my projects.
            </p>

            <div
              className="
                mt-5
                flex
                flex-wrap
                gap-3
              "
            >
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    text-slate-400
                    transition-all
                    duration-200
                    hover:-translate-y-1
                    hover:border-red-500/40
                    hover:bg-red-500/10
                    hover:text-red-400
                  "
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =================================
          Bottom Bar
      ================================== */}

      <div
        className="
          relative
          border-t
          border-white/10
        "
      >
        <div
          className="
            mx-auto
            flex
            w-full
            max-w-7xl
            flex-col
            items-center
            justify-between
            gap-4
            px-4
            py-5
            text-center
            sm:flex-row
            sm:px-6
            sm:text-left
            lg:px-8
          "
        >
          <p
            className="
              text-xs
              text-slate-500
              sm:text-sm
            "
          >
            © {year} VideoDownloader. All rights
            reserved.
          </p>

          <a
            href="#"
            aria-label="Back to top"
            className="
              flex
              items-center
              gap-2
              text-xs
              text-slate-500
              transition-colors
              hover:text-red-400
              sm:text-sm
            "
          >
            Back to top
            <FaArrowUp />
          </a>
        </div>
      </div>
    </footer>
  );
}

/* =====================================
   Small Logo Icon
===================================== */

function FaVideoIcon() {
  return (
    <FaReact
      className="
        text-lg
        text-white
      "
    />
  );
}