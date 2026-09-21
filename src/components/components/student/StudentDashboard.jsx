import UserIdCard from "../../shared/cards/users/userIdCards";

import user from "../../../assets/icon/student1.png";
import hat from "../../../assets/icon/hait.webp";
import bag from "../../../assets/icon/bag.png";
import graduaitonpaper from "../../../assets/icon/paper1.png";
import clock from "../../../assets/icon/clock.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons";
import StudentOverview from "./studentoverview";

export default function StudentDashboard() {
  return (
    <div className="min-h-screen w-full bg-[#f8f8fb] p-4 sm:p-6 lg:p-8">
      
      {/* ================= HEADER ================= */}
      <UserIdCard>
        <div className="relative h-full w-full overflow-hidden rounded-[15px]">
          
          {/* Header text */}
          <div className="absolute left-6 top-8 z-30 sm:left-10 sm:top-10">
            <p className="text-sm text-white/70">
              September 4, 2023
            </p>

            <h1 className="mt-10 text-2xl font-bold text-white sm:text-3xl">
              Welcome back, John!
            </h1>

            <p className="mt-1 text-sm text-white/70">
              Always stay updated in your student portal
            </p>
          </div>

          {/* Decorative objects */}
          <img
            src={hat}
            alt=""
            className="
              absolute z-10
              bottom-14 left-[50%]
              h-20 w-20
              rotate-[-25deg]
              object-contain
              sm:bottom-14 sm:left-[58%]
              sm:h-28 sm:w-28
            "
          />

          <img
            src={graduaitonpaper}
            alt=""
            className="
              absolute z-10
              bottom-8 left-[62%]
              h-16 w-16
              rotate-[20deg]
              object-contain
              sm:bottom-10 sm:left-[67%]
              sm:h-20 sm:w-20
            "
          />

          <img
            src={clock}
            alt=""
            className="
              absolute z-10
              bottom-12 right-[17%]
              h-20 w-20
              rotate-[15deg]
              object-contain
              sm:h-28 sm:w-28
            "
          />

          <img
            src={user}
            alt="Student profile"
            className="
              absolute z-20
              bottom-0 right-[7%]
              h-44 w-44
              object-contain
              sm:right-[8%]
              sm:h-64 sm:w-64
            "
          />

          <img
            src={bag}
            alt=""
            className="
              absolute z-10
              bottom-8 right-0
              h-20 w-20
              rotate-[15deg]
              object-contain
              sm:h-28 sm:w-28
            "
          />
        </div>
      </UserIdCard>

      {/* ================= MAIN CONTENT ================= */}
      <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_215px]">

        {/* ================= LEFT SIDE ================= */}
        <div className="min-w-0">

          {/* Finance title */}
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">
              Finance
            </h2>
          </div>

          {/* Finance cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <FinanceCard
              type="payable"
              amount="$ 10,000"
              label="Total Payable"
            />

            <FinanceCard
              type="paid"
              amount="$ 5,000"
              label="Total Paid"
              active
            />

            <FinanceCard
              type="other"
              amount="$ 300"
              label="Others"
            />

          </div>


          {/* ================= COURSES ================= */}
          <div className="mt-10">

            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">
                Enrolled Courses
              </h2>

              <button className="text-sm font-semibold text-[#9258e8] hover:underline">
                See all
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

              <CourseCard
                title={
                  <>
                    Object oriented
                    <br />
                    programming
                  </>
                }
                type="computer"
                active
              />

              <CourseCard
                title={
                  <>
                    Fundamentals of
                    <br />
                    database systems
                  </>
                }
                type="database"
              />

            </div>
          </div>
        </div>


        {/* ================= RIGHT SIDE ================= */}
        <aside className="min-w-0">

          {/* ================= INSTRUCTORS ================= */}
          <div>
            <h2 className="mb-4 text-lg font-bold text-gray-900">
              Course instructors
            </h2>

            <div className="flex items-center gap-3">

              <Instructor
                name="Sarah"
                initials="S"
                avatar="bg-[#e9a7a7]"
              />

              <Instructor
                name="Daniel"
                initials="D"
                avatar="bg-[#8bb4d9]"
              />

              <Instructor
                name="John"
                initials="J"
                avatar="bg-[#6f5b50]"
              />

            </div>
          </div>


          {/* ================= NOTICE ================= */}
          <div className="mt-7">

            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">
                Daily notice
              </h2>

              <button className="text-sm font-semibold text-[#9258e8] hover:underline">
                See all
              </button>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">

              <Notice
                title="Prelim payment due"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              />

              <Notice
                title="Exam schedule"
                text="Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
              />

            </div>
          </div>

        </aside>
      </div>
      <StudentOverview />
    </div>
  );
}


/* =========================================================
   FINANCE CARD
========================================================= */

function FinanceCard({
  amount,
  label,
  type,
  active = false,
}) {
  return (
    <div
      className={`
        relative flex h-40 flex-col items-center justify-center
        rounded-2xl bg-white
        transition-all duration-300
        ${
          active
            ? "border-[3px] border-[#9258e8] shadow-md"
            : "border border-transparent shadow-sm"
        }
      `}
    >

      {/* Icon */}
      <div className="mb-3 flex h-12 items-end justify-center gap-1">
        {type === "payable" && (
          <>
            <FontAwesomeIcon icon={faCoins} size="xl" className="text-[#a879ee]"/>
            <FontAwesomeIcon icon={faCoins} size="1xl" className="text-[#a879ee]"/>
            <FontAwesomeIcon icon={faCoins} size="2xl" className="text-[#a879ee]"/>
          </>
        )}

        {type === "paid" && (
          <>
            <div className="relative h-8 w-10 rounded-sm bg-transparent">
              <FontAwesomeIcon icon={faMoneyBill1Wave} size="2xl" className="absolute left-3 top-1 text-[#a879ee]"/>
            </div>

            <div className="flex items-end gap-1">
              <FontAwesomeIcon icon={faCoins} size="2xl" className="text-[#a879ee]"/>
            </div>
          </>
        )}

        {type === "other" && (
          <>
            <div className="h-5 w-2 rounded-t bg-[#c09cf1]" />
            <div className="h-8 w-2 rounded-t bg-[#a879ee]" />
            <div className="h-11 w-2 rounded-t bg-[#9258e8]" />
            <div className="h-14 w-2 rounded-t bg-[#9d6bea]" />
          </>
        )}
      </div>

      <p className="text-sm font-bold text-gray-900">
        {amount}
      </p>

      <p className="mt-1 text-xs text-gray-400">
        {label}
      </p>
    </div>
  );
}


/* =========================================================
   COURSE CARD
========================================================= */

function CourseCard({
  title,
  type,
  active = false,
}) {
  return (
    <div
      className={`
        relative h-28 overflow-hidden rounded-2xl
        bg-[#ded0f7] p-5
        transition-all duration-300
        ${active ? "border-[3px] border-[#9258e8]" : ""}
      `}
    >

      <p className="relative z-10 max-w-[180px] text-sm font-semibold leading-5 text-[#9258e8]">
        {title}
      </p>

      <button
        className="
          absolute bottom-3 left-5
          rounded-full bg-[#9258e8]
          px-7 py-2
          text-xs font-semibold text-white
          transition hover:bg-[#8046db]
        "
      >
        View
      </button>


      {/* Course illustration */}
      {type === "computer" && (
        <div className="absolute right-5 top-5 opacity-70">
          <div className="h-10 w-14 rounded-md border-4 border-white bg-[#a878eb] shadow-sm">
            <div className="h-full w-full bg-[#9258e8]/30" />
          </div>

          <div className="mx-auto h-2 w-8 bg-white" />
        </div>
      )}

      {type === "database" && (
        <div className="absolute right-5 top-4 flex items-end gap-2 opacity-70">

          <div className="h-12 w-12 rounded-full border-[10px] border-[#a879ee] border-r-transparent" />

          <div className="flex items-end gap-1">
            <div className="h-7 w-2 rounded-t bg-[#9258e8]" />
            <div className="h-10 w-2 rounded-t bg-[#9d6bea]" />
            <div className="h-14 w-2 rounded-t bg-[#a879ee]" />
          </div>

        </div>
      )}

    </div>
  );
}


/* =========================================================
   INSTRUCTOR
========================================================= */

function Instructor({
  name,
  initials,
  avatar,
}) {
  return (
    <div className="flex flex-col items-center">

      <div
        className={`
          flex h-16 w-16
          items-center justify-center
          rounded-full
          border-[3px] border-[#9258e8]
          ${avatar}
        `}
      >
        <span className="text-xl font-bold text-white">
          {initials}
        </span>
      </div>

      <span className="mt-1 text-[10px] text-gray-400">
        {name}
      </span>

    </div>
  );
}


/* =========================================================
   NOTICE
========================================================= */

function Notice({
  title,
  text,
}) {
  return (
    <div className="border-b border-gray-100 py-2 last:border-b-0">

      <h3 className="text-xs font-bold text-gray-900">
        {title}
      </h3>

      <p className="mt-1 text-xs leading-5 text-gray-400">
        {text}
      </p>

      <button className="mt-1 text-[11px] font-semibold text-[#9258e8]">
        See more
      </button>

    </div>
  );
}