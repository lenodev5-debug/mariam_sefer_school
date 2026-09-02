import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../context/usetheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header({ onMenuClick, sidebarOpen }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed inset-x-0 top-0 z-50 ">
      <div
        className="
          flex
          h-16
          items-center
          justify-between

          border-b
          border-gray-200/20
          
          px-4

          backdrop-blur-xl
          bg-white/10

          dark:border-gray-700/30
          dark:bg-gray-900/10
        "
      >
        {/* Left */}
        <div className="flex items-center gap-3">
          {/* Menu */}
          <button
            onClick={onMenuClick}
            type="button"
            aria-label="Toggle sidebar"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl

              text-gray-600
              transition-all
              duration-300

              hover:bg-white/30
              hover:text-blue-500

              dark:text-gray-300
              dark:hover:bg-gray-800/30
              dark:hover:text-blue-400
            "
          >
            <svg
              className={`
                h-5 w-5
                transition-transform
                duration-300
                ${sidebarOpen ? "rotate-90" : ""}
              `}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* SchoolHub */}
          <div className="flex items-center gap-2">
            <span
              className="
                hidden
                text-lg
                font-bold
                tracking-tight
                text-gray-900
                sm:block
                dark:text-white
              "
            >
              <span className="overline decoration-solid decoration-4"> <span className="underline decoration-solid decoration-4">Ma</span></span>riam Sefer
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <a
            href="/about"
            className="
              rounded-lg
              px-3
              py-2
              text-sm
              font-medium
              text-gray-600
              transition
              hover:bg-white/30
              hover:text-blue-500
              dark:text-gray-300
              dark:hover:bg-gray-800/30
              dark:hover:text-blue-400
            "
          >
            About
          </a>

          <a
            href="/news"
            className="
              rounded-lg
              px-3
              py-2
              text-sm
              font-medium
              text-gray-600
              transition
              hover:bg-white/30
              hover:text-blue-500
              dark:text-gray-300
              dark:hover:bg-gray-800/30
              dark:hover:text-blue-400
            "
          >
            News
          </a>

          <a
            href="/books"
            className="
              rounded-lg
              px-3
              py-2
              text-sm
              font-medium
              text-gray-600
              transition
              hover:bg-white/30
              hover:text-blue-500
              dark:text-gray-300
              dark:hover:bg-gray-800/30
              dark:hover:text-blue-400
            "
          >
            Books
          </a>

          <a
            href="/contact"
            className="
              rounded-lg
              px-3
              py-2
              text-sm
              font-medium
              text-gray-600
              transition
              hover:bg-white/30
              hover:text-blue-500
              dark:text-gray-300
              dark:hover:bg-gray-800/30
              dark:hover:text-blue-400
            "
          >
            Contact
          </a>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Theme */}
          <button
            onClick={toggleTheme}
            type="button"
            aria-label="Toggle dark mode"
            className="
              relative
              h-10
              w-[70px]
              rounded-full
              border
              border-gray-200/30
              bg-white/20
              p-1
              shadow-inner

              transition-all
              duration-300
              hover:shadow-md

              dark:border-gray-700/30
              dark:bg-gray-800/20
            "
          >
            {/* Static icons on the track */}
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                flex
                items-center
                justify-between
                px-2.5
                text-xs
              "
            >
              <FontAwesomeIcon 
                icon={faSun} 
                className={`h-3.5 w-3.5 transition-colors duration-300 ${
                  theme === "dark" ? "text-gray-500" : "text-yellow-500"
                }`}
              />
              <FontAwesomeIcon 
                icon={faMoon} 
                className={`h-3.5 w-3.5 transition-colors duration-300 ${
                  theme === "dark" ? "text-blue-300" : "text-gray-400"
                }`}
              />
            </div>

            {/* Sliding thumb */}
            <span
              className={`
                relative
                z-10
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-white
                shadow-md
                transition-transform
                duration-300
                ease-in-out
                dark:bg-gray-800

                ${
                  theme === "dark"
                    ? "translate-x-[30px]"
                    : "translate-x-0"
                }
              `}
            >
              <FontAwesomeIcon 
                icon={theme === "dark" ? faMoon : faSun} 
                className={`h-3.5 w-3.5 transition-colors duration-300 ${
                  theme === "dark" ? "text-blue-400" : "text-yellow-500"
                }`}
              />
            </span>
          </button>
          
          {/* Profile Circle */}
          <button
            type="button"
            aria-label="Profile"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full

              bg-gradient-to-br
              from-indigo-500
              to-purple-600

              text-sm
              font-bold
              text-white

              ring-2
              ring-indigo-500/20
              ring-offset-2
              ring-offset-white/10

              transition-all
              duration-300

              hover:scale-105
              hover:ring-indigo-500/50

              dark:ring-indigo-400/20
              dark:ring-offset-gray-950/10
            "
          >
            A
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;