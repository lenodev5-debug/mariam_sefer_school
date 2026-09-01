import { useTheme } from "../../context/usetheme";

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

          border
          border-gray-200/70
          
          px-4

          shadow-xl
          shadow-black/5

          backdrop-blur-2xl

          dark:border-gray-700/60
          bg-transparent
          dark:shadow-black/30
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

              hover:bg-gray-100
              hover:text-blue-500

              dark:text-gray-300
              dark:hover:bg-gray-800
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
              hover:bg-gray-100
              hover:text-blue-500
              dark:text-gray-300
              dark:hover:bg-gray-800
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
              hover:bg-gray-100
              hover:text-blue-500
              dark:text-gray-300
              dark:hover:bg-gray-800
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
              hover:bg-gray-100
              hover:text-blue-500
              dark:text-gray-300
              dark:hover:bg-gray-800
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
              hover:bg-gray-100
              hover:text-blue-500
              dark:text-gray-300
              dark:hover:bg-gray-800
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
              group
              relative
              h-10
              w-[70px]
              rounded-full
              border
              border-gray-200
              bg-gray-100
              p-1
              shadow-inner

              transition-all
              duration-300
              hover:shadow-md

              dark:border-gray-700
              dark:bg-gray-800
            "
          >
            <span
              className="
                pointer-events-none
                absolute
                inset-0
                flex
                items-center
                justify-between
                px-2
                text-xs
              "
            >
              <span
                className={
                  theme === "dark"
                    ? "text-gray-500"
                    : "text-yellow-500"
                }
              >
                ☀
              </span>

              <span
                className={
                  theme === "dark"
                    ? "text-blue-300"
                    : "text-gray-400"
                }
              >
                ☾
              </span>
            </span>

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
                dark:bg-gray-950

                ${
                  theme === "dark"
                    ? "translate-x-[30px]"
                    : "translate-x-0"
                }
              `}
            >
              {theme === "dark" ? "☾" : "☀"}
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
              ring-offset-white

              transition-all
              duration-300

              hover:scale-105
              hover:ring-indigo-500/50

              dark:ring-indigo-400/20
              dark:ring-offset-gray-950
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