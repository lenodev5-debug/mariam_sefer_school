import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons/faArrowDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CoursesDisplay() {
  const categories = [
    {
      title: "Loading UI",
      description:
        "Spinners, loaders, progress states, and loading animations.",
      tags: ["CSS Loaders", "Tailwind Loaders", "Animated Loaders"],
    },
    {
      title: "Button Effects",
      description:
        "Animated buttons, hover states, gradients, glow, and 3D interactions.",
      tags: ["Hover Effects", "Gradient Buttons", "3D Buttons"],
    },
    {
      title: "Card Components",
      description:
        "Profile cards, product cards, glass cards, and dashboard panels.",
      tags: ["Glassmorphism Cards", "Profile Cards", "Tailwind Cards"],
    },
    {
      title: "Modern Styles",
      description:
        "Glassmorphism, neumorphism, gradients, dark mode, retro, and neon UI.",
      tags: ["Neumorphism UI", "Gradient UI", "Dark Mode UI"],
    },
    {
      title: "Forms & Inputs",
      description:
        "Login forms, input fields, checkboxes, radio buttons, and switches.",
      tags: ["Input Fields", "Toggle Switches", "Checkbox UI"],
    },
    {
      title: "Tooltips & Patterns",
      description:
        "Helpful hover UI, CSS tooltips, background patterns, and decorative surfaces.",
      tags: ["CSS Tooltips", "Background Patterns", "CSS Patterns"],
    },
  ];

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[#f5f5f5] transition-colors duration-300 dark:bg-[#0f0f0f]">

      {/* =====================================================
          BROWSE BUTTON
      ====================================================== */}

      <div className="flex justify-center items-center w-full pt-8 pb-8">
        <button
          className="
            text-white
            text-2xl
            text-center
            bg-[#4F46E5]
            rounded-md
            p-2
            pr-5
            flex
            items-center
            gap-2
          "
          style={{ fontFamily: "news" }}
        >
          <FontAwesomeIcon
            icon={faRocket}
            className="mx-4"
          />

          Browse all elements
        </button>
      </div>


      {/* =====================================================
          MAIN BROWSE SECTION
      ====================================================== */}

      <div
        className="
          relative
          overflow-hidden
          w-[1521px]
          h-[760px]
          max-w-[calc(100vw-32px)]
          bg-white
          rounded-3xl
          px-12
          py-10
          transition-colors
          duration-300
          dark:bg-[#1a1a1a]
        "
      >

        {/* ===================================================
            HEADER
        ==================================================== */}

        <div className="relative z-10 flex flex-col items-center text-center">

          <h1
            className="
              text-[48px]
              leading-tight
              text-[#1a1a1a]
              font-semibold
              tracking-tight
              dark:text-[#F3F4F6]
            "
            style={{
              fontFamily: "Montserrat, Inter, sans-serif",
            }}
          >
            Browse by what you are building
          </h1>

          <p
            className="
              mt-4
              text-[18px]
              text-[#999]
              max-w-2xl
              dark:text-[#888]
            "
            style={{
              fontFamily: "Inter, sans-serif",
            }}
          >
            Curated groups of open-source elements for common searches like
            loading UI, animated buttons, glassmorphism cards, forms,
            tooltips, and more.
          </p>

        </div>


        {/* ===================================================
            CATEGORY GRID
        ==================================================== */}

        <div
          className="
            relative
            z-10
            grid
            grid-cols-3
            gap-5
            mt-10
            w-full
          "
        >

          {categories.map((category) => (
            <div
              key={category.title}
              className="
                group
                relative
                overflow-hidden
                flex
                flex-col
                bg-[#f5f5f5]
                border-2
                border-[#e0e0e0]
                rounded-[8px]
                min-h-[190px]
                p-6
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[#50A2FF]/40
                dark:bg-[#222222]
                dark:border-[#2a2a2a]
                dark:hover:border-[#50A2FF]/40
              "
            >

              {/* =================================================
                  SUBTLE LIGHT BEHIND CARD
              ================================================== */}

              <div
                className="
                  absolute
                  -top-20
                  -right-20
                  w-40
                  h-40
                  rounded-full
                  bg-black/[0.03]
                  blur-3xl
                  pointer-events-none
                  dark:bg-white/[0.03]
                "
              />


              {/* =================================================
                  CARD HEADER
              ================================================== */}

              <div className="relative flex justify-between items-start">

                <h2
                  className="
                    text-[20px]
                    text-[#1a1a1a]
                    font-semibold
                    dark:text-[#F3F4F6]
                  "
                  style={{
                    fontFamily:
                      "Montserrat, Inter, sans-serif",
                  }}
                >
                  {category.title}
                </h2>

                <FontAwesomeIcon
                  icon={faArrowDown}
                  size="1xl"
                  className="
                    rotate-[240deg]
                    relative
                    text-[#b0b0b0]
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                    dark:text-[#D1D5DB]
                  "
                />

              </div>


              {/* =================================================
                  DESCRIPTION
              ================================================== */}

              <p
                className="
                  relative
                  mt-3
                  text-[14px]
                  leading-5
                  text-[#999]
                  max-w-md
                  dark:text-[#888]
                "
                style={{
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {category.description}
              </p>


              {/* =================================================
                  TAG BUTTONS
                  ONE ROW AT THE BOTTOM
              ================================================== */}

              <div
                className="
                  relative
                  flex
                  flex-nowrap
                  items-center
                  gap-2
                  mt-auto
                  pt-5
                  w-full
                  overflow-hidden
                "
              >

                {category.tags.map((tag) => (
                  <button
                    key={tag}
                    className="
                      flex-shrink-0
                      bg-white
                      border
                      border-[#e0e0e0]
                      rounded-full
                      px-3
                      py-1
                      text-[12px]
                      text-[#1a1a1a]
                      whitespace-nowrap
                      transition-all
                      duration-200
                      hover:bg-[#f0f0f0]
                      hover:text-[#1a1a1a]
                      hover:border-[#50A2FF]/40
                      dark:bg-[#1a1a1a]
                      dark:border-[#3a3a3a]
                      dark:text-[#D1D5DB]
                      dark:hover:bg-[#2a2a2a]
                      dark:hover:text-white
                      dark:hover:border-[#50A2FF]/40
                    "
                    style={{
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {tag}
                  </button>
                ))}

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}