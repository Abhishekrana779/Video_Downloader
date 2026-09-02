import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaHeart,
  FaReact,
} from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="
        mt-16
        w-full
        overflow-hidden
        border-t
        border-slate-800
        bg-gradient-to-b
        from-slate-950
        via-slate-900
        to-black
        text-white
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          px-4
          py-12
          sm:px-6
          lg:px-8
        "
      >
        <div
          className="
            grid
            grid-cols-1
            gap-10
            md:grid-cols-3
          "
        >
          {/* Brand */}

          <div
            className="
              min-w-0
              md:col-span-1
            "
          >
            <h2
              className="
                flex
                items-center
                gap-2
                text-2xl
                font-bold
              "
            >
              <FaReact
                className="
                  text-cyan-400
                "
              />
              VideoDownloader
            </h2>

            <p
              className="
                mt-4
                max-w-sm
                text-sm
                leading-6
                text-slate-400
              "
            >
              Download your favorite videos quickly with a simple, fast, and
              responsive video downloader interface built with React.
            </p>
          </div>

          {/* Mobile Two Columns */}

          <div
            className="
              grid
              grid-cols-2
              gap-6
              md:col-span-2
              md:grid-cols-2
            "
          >
            {/* Quick Links */}

            <div>
              <h3
                className="
                  mb-4
                  text-lg
                  font-semibold
                "
              >
                Quick Links
              </h3>

              <ul
                className="
                  space-y-3
                  text-sm
                  text-slate-400
                "
              >
                <li>
                  <a
                    href="#"
                    className="
                      transition
                      hover:text-cyan-400
                    "
                  >
                    Home
                  </a>
                </li>

                <li>
                  <a
                    href="#features"
                    className="
                      transition
                      hover:text-cyan-400
                    "
                  >
                    Features
                  </a>
                </li>

                <li>
                  <a
                    href="#about"
                    className="
                      transition
                      hover:text-cyan-400
                    "
                  >
                    About
                  </a>
                </li>

                <li>
                  <a
                    href="#contact"
                    className="
                      transition
                      hover:text-cyan-400
                    "
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Follow Me */}

            <div>
              <h3
                className="
                  mb-4
                  text-lg
                  font-semibold
                "
              >
                Follow Me
              </h3>

              <div
                className="
                  flex
                  flex-wrap
                  gap-3
                "
              >
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-slate-700
                    text-slate-300
                    transition
                    hover:border-cyan-400
                    hover:text-cyan-400
                  "
                >
                  <FaGithub />
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-slate-700
                    text-slate-300
                    transition
                    hover:border-cyan-400
                    hover:text-cyan-400
                  "
                >
                  <FaLinkedin />
                </a>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-slate-700
                    text-slate-300
                    transition
                    hover:border-cyan-400
                    hover:text-cyan-400
                  "
                >
                  <FaTwitter />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}

      <div
        className="
          border-t
          border-slate-800
          px-4
          py-5
          text-center
          text-sm
          text-slate-400
        "
      >
        <p
          className="
            flex
            flex-wrap
            items-center
            justify-center
            gap-2
          "
        >
          © {year} VideoDownloader. Made with
          <FaHeart
            className="
              text-red-500
            "
          />
          using React & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
