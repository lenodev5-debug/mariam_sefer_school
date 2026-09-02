import { useEffect, useState } from 'react';

function SectionTimeline({ sections }) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '');

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;

      let active = sections[0]?.id;
      let currentIndex = 0;

      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);

        if (!element) return;

        const rect = element.getBoundingClientRect();

        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
          active = section.id;
          currentIndex = index;
        }
      });

      setActiveSection(active);

      /*
       * Calculate continuous progress through
       * the complete home page.
       */
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

      const scrollProgress = documentHeight > 0 ? (window.scrollY / documentHeight) * 100 : 0;

      setProgress(Math.min(Math.max(scrollProgress, 0), 100));
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  const scrollToSection = id => {
    const element = document.getElementById(id);

    if (!element) return;

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div
      className="
        fixed
        right-6
        top-1/2
        z-[100]

        hidden
        h-[50vh]

        -translate-y-1/2

        md:flex
        items-center
      "
    >
      <div className="relative h-full w-6">
        {/* ==================================================
            BACKGROUND VERTICAL LINE
        ================================================== */}

        <div
          className="
            absolute
            left-1/2
            top-0
            h-full
            w-[2px]
            -translate-x-1/2

            bg-gray-300/70
            dark:bg-gray-700/70
          "
        />

        {/* ==================================================
            SCROLL PROGRESS LINE
        ================================================== */}

        <div
          className="
            absolute
            left-1/2
            top-0
            w-[2px]
            -translate-x-1/2

            bg-blue-500

            transition-[height]
            duration-100
          "
          style={{
            height: `${progress}%`,
          }}
        />

        {/* ==================================================
            SECTION CIRCLES
        ================================================== */}

        <div
          className="
            relative
            flex
            h-full
            flex-col
            items-center
            justify-between
          "
        >
          {sections.map(section => {
            const isActive = activeSection === section.id;

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollToSection(section.id)}
                aria-label={`Go to ${section.label}`}
                className="
                  relative
                  z-20
                  flex
                  items-center
                  justify-center
                  p-1
                  outline-none
                "
              >
                <span
                  className={`
                    block
                    rounded-full
                    border-2

                    transition-all
                    duration-300

                    ${
                      isActive
                        ? `
                          h-4
                          w-4
                          border-blue-500
                          bg-blue-500
                          shadow-md
                          shadow-blue-500/40
                        `
                        : `
                          h-3
                          w-3
                          border-gray-400
                          bg-white

                          dark:border-gray-500
                          dark:bg-gray-950
                        `
                    }
                  `}
                />
              </button>
            );
          })}
        </div>

        {/* ==================================================
            SMALL MOVING SCROLL POINT
        ================================================== */}

        <span
          className="
            pointer-events-none

            absolute
            left-1/2

            z-30

            h-2
            w-2

            -translate-x-1/2
            -translate-y-1/2

            rounded-full

            bg-blue-400

            ring-2
            ring-white/80

            shadow-md
            shadow-blue-500/50

            transition-[top]
            duration-100
            ease-linear

            dark:ring-gray-950/80
          "
          style={{
            top: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
}

export default SectionTimeline;
