import {
  faArrowUpRightFromSquare,
  faShare,
  faGraduationCap,
  faBookOpen,
  faUsers,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Platform() {
  return (
      <div
        className="
          relative
          z-10
          grid
          w-full
          grid-cols-1
          gap-5
          md:grid-cols-2
          bg-[#090909]
          py-14
        "
      >
        {/* =================================================
            LEFT — COMMUNITY
        ================================================= */}

        <div
          className="
            flex
            h-[50vh]
            w-full
            flex-col
            rounded-2xl
            rounded-l-none
            border
            border-white/20
            p-10
            md:p-14
          "
        >
          {/* Online count */}
          <div className="mb-4 flex items-center gap-2 text-sm text-white/50">
            <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]" />

            <span>598 Users</span>
          </div>

          {/* Heading */}
          <h1
            className="
              max-w-xl
              text-5xl
              font-bold
              leading-[1.05]
              tracking-tight
              text-white
              md:text-6xl
            "
          >
            Join the
            <br />

            <span className="text-white/50">
              Other student!
            </span>
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/50">
            use our mobile device to more futures.
          </p>

          {/* Discord button */}
          <a
            href="https://discord.gg/KD8ba2uUpT"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              mt-7
              flex
              w-fit
              items-center
              gap-3
              rounded-xl
              bg-[#5865F2]
              px-6
              py-3.5
              text-sm
              font-semibold
              text-white
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-[0_12px_35px_rgba(88,101,242,0.35)]
            "
          >
            <FontAwesomeIcon
              icon={faShare}
              className="text-xl"
            />

            <span>Join Theme</span>

            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className="
                text-xs
                opacity-60
                transition-transform
                duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </a>
        </div>

        {/* =================================================
            RIGHT — MOBILE PLATFORM
        ================================================= */}

        <div
          className="
            h-[50vh]
            w-full
            overflow-y-auto
            rounded-2xl
            rounded-r-none
            border
            border-white/20
            p-10
            md:p-14
            scrollbar-none
          "
        >
          {/* Label */}
          <div className="mb-4 flex items-center gap-2 text-sm text-white/50">
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />

            <span>Mobile Platform</span>
          </div>

          {/* Heading */}
          <h1
            className="
              max-w-xl
              text-5xl
              font-bold
              leading-[1.05]
              tracking-tight
              text-white
              md:text-6xl
            "
          >
            Learn
            <br />

            <span className="text-white/50">
              Everywhere!
            </span>
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/50">
            Take your learning experience with you wherever you go. Access
            your courses, lessons, progress and school community from your
            mobile device.
          </p>

          {/* FEATURES */}
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Feature 1 */}
            <div
              className="
                group
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                p-5
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-white/20
                hover:bg-white/[0.06]
              "
            >
              <div
                className="
                  mb-4
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-500/10
                  text-blue-300
                  transition-all
                  duration-300
                  group-hover:bg-blue-500/20
                "
              >
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  className="text-lg"
                />
              </div>

              <h3 className="text-sm font-semibold text-white">
                Learn Anywhere
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-white/40">
                Study your lessons wherever you are.
              </p>
            </div>

            {/* Feature 2 */}
            <div
              className="
                group
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                p-5
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-white/20
                hover:bg-white/[0.06]
              "
            >
              <div
                className="
                  mb-4
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-purple-500/10
                  text-purple-300
                  transition-all
                  duration-300
                  group-hover:bg-purple-500/20
                "
              >
                <FontAwesomeIcon
                  icon={faBookOpen}
                  className="text-lg"
                />
              </div>

              <h3 className="text-sm font-semibold text-white">
                Your Courses
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-white/40">
                Access your subjects and lessons from one place.
              </p>
            </div>

            {/* Feature 3 */}
            <div
              className="
                group
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                p-5
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-white/20
                hover:bg-white/[0.06]
              "
            >
              <div
                className="
                  mb-4
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-cyan-500/10
                  text-cyan-300
                  transition-all
                  duration-300
                  group-hover:bg-cyan-500/20
                "
              >
                <FontAwesomeIcon
                  icon={faChartLine}
                  className="text-lg"
                />
              </div>

              <h3 className="text-sm font-semibold text-white">
                Track Progress
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-white/40">
                Keep track of your academic progress.
              </p>
            </div>

            {/* Feature 4 */}
            <div
              className="
                group
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                p-5
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-white/20
                hover:bg-white/[0.06]
              "
            >
              <div
                className="
                  mb-4
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-green-500/10
                  text-green-300
                  transition-all
                  duration-300
                  group-hover:bg-green-500/20
                "
              >
                <FontAwesomeIcon
                  icon={faUsers}
                  className="text-lg"
                />
              </div>

              <h3 className="text-sm font-semibold text-white">
                Stay Connected
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-white/40">
                Stay connected with your teachers and school community.
              </p>
            </div>
          </div>

          {/* MORE ABOUT */}
          <div className="mt-10">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Everything
              <br />

              <span className="text-white/50">
                in your pocket.
              </span>
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/50">
              The mobile experience is designed to make learning simple,
              accessible and connected. Students can continue studying,
              review their courses and stay updated without needing to sit
              in front of a computer.
            </p>
          </div>

          {/* SECOND SECTION */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-white">
              Built for students
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-white/50">
              Whether you are reviewing a lesson, checking your progress or
              staying connected with your school community, everything is
              designed around your learning experience.
            </p>
          </div>

          {/* THIRD SECTION */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-white">
              One platform
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-white/50">
              Your courses, subjects, academic information and communication
              can all work together through one connected school platform.
            </p>
          </div>

          {/* Bottom button */}
          <button
            type="button"
            className="
              group
              mt-10
              mb-2
              flex
              w-fit
              items-center
              gap-3
              rounded-xl
              border
              border-white/10
              bg-white/5
              px-6
              py-3.5
              text-sm
              font-semibold
              text-white
              backdrop-blur-md
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-white/20
              hover:bg-white/10
            "
          >
            <span>Explore Mobile App</span>

            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className="
                text-xs
                opacity-50
                transition-transform
                duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </button>
        </div>
      </div>
  );
}