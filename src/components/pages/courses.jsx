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
    <div className="flex flex-col items-center w-full min-h-screen bg-[#090909]">

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
          bg-[#090909]
          rounded-3xl
          px-12
          py-10
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
              text-[#F3F4F6]
              font-semibold
              tracking-tight
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
              text-[#9CA3AF]
              max-w-2xl
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
                bg-[#171717]
                border-2
                border-[#212121]
                rounded-[8px]
                min-h-[190px]
                p-6
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[#353535]
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
                  bg-white/[0.03]
                  blur-3xl
                  pointer-events-none
                "
              />


              {/* =================================================
                  CARD HEADER
              ================================================== */}

              <div className="relative flex justify-between items-start">

                <h2
                  className="
                    text-[20px]
                    text-[#F3F4F6]
                    font-semibold
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
                  color="#D1D5DB"
                  className="
                    rotate-[240deg]
                    relative
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
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
                  text-[#9CA3AF]
                  max-w-md
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
                      bg-[#111111]
                      border
                      border-[#353535]
                      rounded-full
                      px-3
                      py-1
                      text-[12px]
                      text-[#D1D5DB]
                      whitespace-nowrap
                      transition-all
                      duration-200
                      hover:bg-[#212121]
                      hover:text-[#F2F2F2]
                      hover:border-[#4a4a4a]
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
