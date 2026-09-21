import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBookOpen,
  faGraduationCap,
  faFileLines,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";

export default function StudentOverview() {
  return (
    <section className="mt-8 w-full">
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_275px]">

        {/* =====================================================
            LEFT CONTENT
        ====================================================== */}
        <div className="min-w-0">

          {/* ================= TOP STAT CARDS ================= */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

            <StatCard
              icon={<FontAwesomeIcon icon={faBookOpen} size="lg" />}
              iconBg="bg-[#eee7ff]"
              iconColor="text-[#9258e8]"
              title="Enrolled Courses"
              value="1"
            />

            <StatCard
              icon={<FontAwesomeIcon icon={faGraduationCap} size="lg" />}
              iconBg="bg-[#ffe8ef]"
              iconColor="text-[#e56b93]"
              title="Total Class"
              value="50"
            />

            <StatCard
              icon={<FontAwesomeIcon icon={faFileLines} size="lg" />}
              iconBg="bg-[#f3fbdc]"
              iconColor="text-[#b5cf42]"
              title="Assignments"
              value="25"
            />

            <StatCard
              icon={<FontAwesomeIcon icon={faCircleQuestion} size="lg" />}
              iconBg="bg-[#ddf8ee]"
              iconColor="text-[#50cda4]"
              title="Quiz"
              value="10"
            />

          </div>


          {/* ================= NEW COURSE ================= */}
          <div className="mt-7">

            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">
                New Course
              </h2>

              <button className="flex items-center gap-1 text-sm font-semibold text-[#9258e8]">
                See all
                <FontAwesomeIcon icon={faArrowRight} size={15} />
              </button>
            </div>


            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

              <NewCourseCard
                title="Graphic Design"
                reviews="123 Review"
                students="50"
                price="5000"
                type="design"
              />

              <NewCourseCard
                title="Web Development"
                reviews="223 Review"
                students="150"
                price="6000"
                type="web"
              />

            </div>
          </div>


          {/* ================= ACTIVITY CHART ================= */}
          <div className="mt-7 rounded-2xl bg-white p-5 shadow-sm">

            <h2 className="text-lg font-bold text-gray-900">
              Course Activity
            </h2>

            <div className="mt-5 w-full overflow-hidden">
              <ActivityChart />
            </div>

          </div>

        </div>


        {/* =====================================================
            RIGHT CONTENT
        ====================================================== */}
        <div className="space-y-5">

          {/* ================= CLASS SCHEDULE ================= */}
          <ClassSchedule />

          {/* ================= DAILY ACTIVITY ================= */}
          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <h2 className="text-center text-lg font-bold text-gray-900">
              Daily Activity
            </h2>

            <div className="mt-5 flex justify-center">
              <ActivityDonut percentage={80} />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}


/* =============================================================
   STAT CARD
============================================================= */

function StatCard({
  icon,
  iconBg,
  iconColor,
  title,
  value,
}) {
  return (
    <div
      className="
        flex min-h-[145px]
        flex-col items-center justify-center
        rounded-2xl bg-white
        px-3 py-5
        shadow-sm
        transition
        duration-300
        hover:-translate-y-1
        hover:shadow-md
      "
    >
      <div
        className={`
          flex h-11 w-11
          items-center justify-center
          rounded-full
          ${iconBg}
          ${iconColor}
        `}
      >
        {icon}
      </div>

      <p className="mt-4 text-center text-sm font-medium text-gray-500">
        {title}
      </p>

      <p className="mt-2 text-xl font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
}


/* =============================================================
   NEW COURSE CARD
============================================================= */

function NewCourseCard({
  title,
  reviews,
  students,
  price,
  type,
}) {
  return (
    <div
      className="
        group flex
        min-h-[110px]
        overflow-hidden
        rounded-xl
        bg-white
        shadow-sm
        transition
        duration-300
        hover:-translate-y-1
        hover:shadow-md
      "
    >

      {/* Illustration */}
      <div
        className="
          relative flex
          w-[105px]
          shrink-0
          items-center
          justify-center
          overflow-hidden
          bg-[#7e3f8f]
        "
      >

        {type === "design" ? (
          <DesignIllustration />
        ) : (
          <WebIllustration />
        )}

      </div>


      {/* Information */}
      <div className="flex min-w-0 flex-1 flex-col justify-center px-4">

        <h3 className="truncate text-sm font-bold text-gray-800">
          {title}
        </h3>

        <div className="mt-1 flex items-center gap-2">

          <div className="flex text-[11px] text-[#ef5c83]">
            ★★★★★
          </div>

          <span className="text-[10px] text-gray-400">
            ({reviews})
          </span>

        </div>

        <p className="mt-1 text-[10px] text-gray-400">
          {students} Students
        </p>


        <div className="mt-2 flex items-center justify-between">

          <span className="text-[10px] font-semibold text-gray-700">
            ETB {price}
          </span>

          <button
            className="
              rounded-sm
              bg-[#9258e8]
              px-3 py-1.5
              text-[9px]
              font-bold
              text-white
              transition
              hover:bg-[#8046d8]
            "
          >
            ENROLL NOW
          </button>

        </div>

      </div>
    </div>
  );
}


/* =============================================================
   DESIGN ILLUSTRATION
============================================================= */

function DesignIllustration() {
  return (
    <div className="relative h-full w-full">

      <div
        className="
          absolute left-1/2 top-1/2
          h-12 w-16
          -translate-x-1/2
          -translate-y-1/2
          rotate-[-8deg]
          rounded-lg
          bg-white/80
          shadow-lg
        "
      />

      <div
        className="
          absolute left-[32px] top-[28px]
          h-7 w-9
          rotate-[20deg]
          rounded-md
          bg-[#c9a4e8]
        "
      />

      <div
        className="
          absolute bottom-[20px] right-[15px]
          h-8 w-8
          rounded-full
          bg-[#9258e8]
        "
      />

      <div
        className="
          absolute right-[20px] top-[18px]
          h-4 w-4
          rounded-full
          bg-[#f1d6ff]
        "
      />

    </div>
  );
}


/* =============================================================
   WEB ILLUSTRATION
============================================================= */

function WebIllustration() {
  return (
    <div className="relative h-full w-full">

      {/* Laptop */}
      <div
        className="
          absolute left-1/2 top-[35px]
          h-9 w-12
          -translate-x-1/2
          rotate-[-15deg]
          rounded-md
          border-4 border-white/80
          bg-[#a779bc]
        "
      />

      <div
        className="
          absolute bottom-[24px] left-[30px]
          h-2 w-16
          rotate-[-15deg]
          rounded-full
          bg-white/80
        "
      />

      {/* Decorative circle */}
      <div
        className="
          absolute right-3 top-4
          h-5 w-5
          rounded-full
          bg-[#f1d6ff]
        "
      />

      {/* Person */}
      <div
        className="
          absolute bottom-5 right-5
          h-5 w-5
          rounded-full
          bg-[#f4c6a8]
        "
      />

    </div>
  );
}


/* =============================================================
   CLASS SCHEDULE
============================================================= */

function ClassSchedule() {
  const days = [
    ["Sun", 0],
    ["Mon", 1],
    ["Tue", 2],
    ["Wed", 3],
    ["Thu", 4],
    ["Fri", 5],
    ["Sat", 6],
  ];

  const dates = [
    1, 2, 3, 4, 5, 6,
    7, 8, 9, 10, 11, 12, 13,
    14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27,
    28, 29, 30, 31,
  ];

  const highlighted = [1, 4, 9, 13, 15, 18, 22, 23, 27];

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">

        <h2 className="text-center text-lg font-bold text-gray-900">
          Class schedule
        </h2>

      </div>


      <div className="p-4">

        {/* Month */}
        <div className="mb-4 flex items-center justify-between">

          <p className="text-xs font-semibold text-gray-500">
            January, 2024
          </p>

          <div className="flex gap-2">
            <button className="flex h-3 w-3 items-center justify-center rounded-full bg-[#ef5c83]" />
            <button className="flex h-3 w-3 items-center justify-center rounded-full bg-[#ef5c83]" />
          </div>

        </div>


        {/* Days */}
        <div className="grid grid-cols-7 gap-y-3 text-center">

          {days.map(([day]) => (
            <span
              key={day}
              className="text-[9px] font-semibold text-gray-500"
            >
              {day}
            </span>
          ))}


          {/* Empty first day */}
          <span />


          {dates.map((date) => {

            const active = highlighted.includes(date);

            return (
              <div
                key={date}
                className="flex justify-center"
              >
                <span
                  className={`
                    flex h-6 w-6
                    items-center justify-center
                    rounded-full
                    text-[10px]
                    transition
                    ${
                      active
                        ? "bg-[#eee7ff] font-bold text-[#9258e8]"
                        : "text-gray-600"
                    }
                  `}
                >
                  {date}
                </span>
              </div>
            );
          })}

        </div>

      </div>
    </div>
  );
}


/* =============================================================
   ACTIVITY LINE CHART
============================================================= */

function ActivityChart() {
  return (
    <div className="relative h-[230px] w-full min-w-[550px]">

      {/* Horizontal lines */}
      <div className="absolute left-10 right-2 top-5 border-t border-gray-200" />
      <div className="absolute left-10 right-2 top-[25%] border-t border-gray-200" />
      <div className="absolute left-10 right-2 top-[45%] border-t border-gray-200" />
      <div className="absolute left-10 right-2 top-[65%] border-t border-gray-200" />
      <div className="absolute left-10 right-2 top-[85%] border-t border-gray-200" />


      {/* Y axis labels */}
      <div className="absolute left-0 top-3 flex flex-col justify-between h-[190px] text-[10px] text-gray-400">
        <span>100</span>
        <span>80</span>
        <span>60</span>
        <span>40</span>
        <span>20</span>
        <span>0</span>
      </div>


      <svg
        viewBox="0 0 700 220"
        preserveAspectRatio="none"
        className="
          absolute
          left-10
          top-0
          h-[200px]
          w-[calc(100%-40px)]
        "
      >

        {/* Gradient */}
        <defs>
          <linearGradient
            id="activityGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#9258e8"
              stopOpacity="0.35"
            />

            <stop
              offset="100%"
              stopColor="#9258e8"
              stopOpacity="0.02"
            />
          </linearGradient>
        </defs>


        {/* Area */}
        <path
          d="
            M0 185
            C30 175, 55 140, 90 145
            C120 150, 130 180, 170 175
            C205 170, 215 120, 250 120
            C285 120, 275 70, 320 65
            C350 60, 365 95, 395 85
            C425 75, 440 40, 475 45
            C510 50, 500 100, 535 115
            C560 125, 580 160, 610 145
            C640 130, 660 120, 700 120
            L700 210
            L0 210
            Z
          "
          fill="url(#activityGradient)"
        />


        {/* Main line */}
        <path
          d="
            M0 185
            C30 175, 55 140, 90 145
            C120 150, 130 180, 170 175
            C205 170, 215 120, 250 120
            C285 120, 275 70, 320 65
            C350 60, 365 95, 395 85
            C425 75, 440 40, 475 45
            C510 50, 500 100, 535 115
            C560 125, 580 160, 610 145
            C640 130, 660 120, 700 120
          "
          fill="none"
          stroke="#9258e8"
          strokeWidth="3"
        />


        {/* July indicator */}
        <line
          x1="320"
          y1="65"
          x2="320"
          y2="210"
          stroke="#c7b4e9"
          strokeDasharray="4 4"
        />

        <circle
          cx="320"
          cy="65"
          r="5"
          fill="#9258e8"
        />

      </svg>


      {/* Hours tooltip */}
      <div
        className="
          absolute
          left-[44%]
          top-1
          rounded-md
          bg-[#9258e8]
          px-2
          py-1
          text-[9px]
          font-bold
          text-white
        "
      >
        64 HOURS
      </div>


      {/* X axis */}
      <div className="absolute bottom-0 left-10 right-2 flex justify-between text-[10px] text-gray-400">
        <span>January</span>
        <span>March</span>
        <span>May</span>
        <span>July</span>
        <span>September</span>
        <span>December</span>
      </div>

    </div>
  );
}


/* =============================================================
   DAILY ACTIVITY DONUT
============================================================= */

function ActivityDonut({ percentage }) {
  const radius = 55;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference * (percentage / 100);

  return (
    <div className="relative h-40 w-40">

      <svg
        className="h-full w-full -rotate-90"
        viewBox="0 0 140 140"
      >

        {/* Background */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#eeeaff"
          strokeWidth="20"
        />

        {/* Progress */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#9258e8"
          strokeWidth="20"
          strokeLinecap="butt"
          strokeDasharray={`${progress} ${circumference}`}
        />

      </svg>


      {/* Center percentage */}
      <div
        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
        "
      >
        <span className="text-2xl font-bold text-[#9258e8]">
          {percentage}%
        </span>
      </div>

    </div>
  );
}