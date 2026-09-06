import { useState } from "react";

import StudentFiromsa from "../../assets/images/student2.jpg";
import StudentMulualem from "../../assets/images/stundent.avif";
import StudentSurafel from "../../assets/images/stundet1.jpg";
import StudentHanna from "../../assets/images/stundet3.jpeg";

export default function StudentRating() {
  const studentList = [
    {
      name: "Firomsa Misgana",
      point: "590",
      image: StudentFiromsa,
      rating: "1,2k",
      message:
        "Outstanding work, Firomsa! Your 590/600 score is an incredible achievement.",
      apText:
        "Your dedication and hard work have made us proud. We are honored to celebrate this outstanding achievement with you.",
    },
    {
      name: "Mulualem Legasa",
      point: "597",
      image: StudentMulualem,
      rating: "1,8k",
      message:
        "Amazing result, Mulualem! With 597/600, you are just 3 points away from a perfect score.",
      apText:
        "Congratulations on this exceptional result. Your determination and commitment to excellence are truly inspiring to our school community.",
    },
    {
      name: "Surafel Admasu",
      point: "593",
      image: StudentSurafel,
      rating: "1,3k",
      message:
        "Excellent job, Surafel! Your 593/600 score shows an exceptional level of preparation.",
      apText:
        "We are proud of your remarkable achievement. May this success be the beginning of many more accomplishments in your academic journey.",
    },
    {
      name: "Hanna Tesfaye",
      point: "586",
      image: StudentHanna,
      rating: "1,1k",
      message:
        "Great achievement, Hanna! Your 586/600 score is an excellent entrance result.",
      apText:
        "We are proud of your hard work and dedication. Your achievement is a wonderful example to our entire school community.",
    },
  ];

  /* =========================================================
     SORT STUDENTS
  ========================================================= */

  const sortedStudents = [...studentList].sort(
    (a, b) => Number(b.point) - Number(a.point)
  );

  const highestStudent = sortedStudents[0];
  const remainingStudents = sortedStudents.slice(1);

  /* =========================================================
     ACTIVE STUDENT
  ========================================================= */

  const [activeStudent, setActiveStudent] = useState(
    remainingStudents[1]
  );

  /* =========================================================
     GET RANK
  ========================================================= */

  const getRank = (student) => {
    const index = sortedStudents.findIndex(
      (item) => item.name === student.name
    );

    return index + 1;
  };

  return (
    <section className="w-full bg-transparent px-6 pb-10">
      <div
        className="
          mx-auto
          grid
          w-full
          max-w-[1600px]
          grid-cols-1
          gap-5
          lg:grid-cols-[25%_75%]
        "
      >
        {/* =====================================================
            LEFT — HIGHEST STUDENT
        ===================================================== */}

        <div
          className="
            relative
            lg:border-r
            lg:border-white/10
            lg:pr-5
          "
        >
          <article
            className="
              relative
              h-[320px]
              overflow-hidden
              rounded-2xl
              border
              border-yellow-400/20
              bg-transparent
              shadow-[0_20px_60px_rgba(0,0,0,0.4)]
            "
          >
            {/* IMAGE */}

            <div className="absolute inset-x-0 top-0 h-[55%]">
              <img
                src={highestStudent.image}
                alt={highestStudent.name}
                className="h-full w-full object-cover"
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-b
                  from-transparent
                  to-[#1b1b1d]
                "
              />
            </div>

            {/* SCORE */}

            <div
              className="
                absolute
                right-4
                top-4
                z-20
                text-right
              "
            >
              <p className="text-3xl font-black leading-none text-yellow-300">
                {highestStudent.point}
              </p>

              <p className="mt-1 text-[7px] uppercase tracking-[0.2em] text-white/50">
                / 600
              </p>
            </div>

            {/* CONTENT */}

            <div
              className="
                absolute
                inset-x-0
                bottom-0
                z-20
                p-5
              "
            >
              <span
                className="
                  inline-flex
                  rounded-full
                  border
                  border-yellow-400/30
                  bg-yellow-400/10
                  px-2
                  py-1
                  text-[7px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-yellow-300
                "
              >
                1st Place
              </span>

              <h2 className="mt-2 text-xl font-bold text-white">
                {highestStudent.name}
              </h2>

              <div className="mt-1 flex items-center gap-1">
                <span className="text-xs text-yellow-400">
                  ★
                </span>

                <span className="text-[9px] text-white/50">
                  {highestStudent.rating}
                </span>
              </div>

              <p className="mt-2 line-clamp-2 text-[8px] leading-4 text-white/45">
                {highestStudent.message}
              </p>
            </div>
          </article>
        </div>

        {/* =====================================================
            RIGHT — THREE CARD FAN
        ===================================================== */}

        <div className="relative h-[350px] w-full">
          <div className="relative mx-auto h-full w-[82%]">
            {/* LEFT CARD */}

            <StudentFanCard
              student={remainingStudents[0]}
              rank={getRank(remainingStudents[0])}
              active={
                activeStudent.name === remainingStudents[0].name
              }
              onClick={() =>
                setActiveStudent(remainingStudents[0])
              }
              position="left"
            />

            {/* CENTER CARD */}

            <StudentFanCard
              student={remainingStudents[1]}
              rank={getRank(remainingStudents[1])}
              active={
                activeStudent.name === remainingStudents[1].name
              }
              onClick={() =>
                setActiveStudent(remainingStudents[1])
              }
              position="center"
            />

            {/* RIGHT CARD */}

            <StudentFanCard
              student={remainingStudents[2]}
              rank={getRank(remainingStudents[2])}
              active={
                activeStudent.name === remainingStudents[2].name
              }
              onClick={() =>
                setActiveStudent(remainingStudents[2])
              }
              position="right"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   FAN CARD
============================================================= */

function StudentFanCard({
  student,
  rank,
  active,
  onClick,
  position,
}) {
  const positionClasses = {
    left: `
      left-[2%]
      -rotate-[10deg]
    `,

    center: `
      left-1/2
      -translate-x-1/2
      rotate-0
    `,

    right: `
      right-[2%]
      rotate-[10deg]
    `,
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        absolute
        top-1/2
        h-[330px]
        w-[34%]
        -translate-y-1/2
        overflow-hidden
        rounded-2xl
        border
        bg-transparent
        text-left
        outline-none

        ${positionClasses[position]}

        ${
          active
            ? `
              z-40
              border-white/30
              shadow-[0_25px_70px_rgba(0,0,0,0.65)]
            `
            : `
              z-10
              border-white/10
              shadow-[0_15px_40px_rgba(0,0,0,0.45)]
            `
        }
      `}
    >
      {/* IMAGE */}

      <div className="relative h-[58%] w-full">
        <img
          src={student.image}
          alt={student.name}
          className="h-full w-full object-cover"
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/70
            via-transparent
            to-transparent
          "
        />

        {/* RANK */}

        <div className="absolute left-3 top-3">
          <span
            className="
              rounded-full
              border
              border-white/20
              bg-black/35
              px-2
              py-1
              text-[6px]
              font-bold
              uppercase
              tracking-wider
              text-white/80
              backdrop-blur-md
            "
          >
            {rank === 2
              ? "2nd Place"
              : rank === 3
              ? "3rd Place"
              : "4th Place"}
          </span>
        </div>

        {/* SCORE */}

        <div className="absolute right-3 top-3 text-right">
          <p className="text-2xl font-black leading-none text-white">
            {student.point}
          </p>

          <p className="mt-1 text-[6px] uppercase tracking-[0.2em] text-white/60">
            / 600
          </p>
        </div>
      </div>

      {/* TEXT AREA */}

      <div className="relative h-[42%] bg-[#1b1b1d] p-4">
        <h2 className="truncate text-sm font-bold text-white">
          {student.name}
        </h2>

        <div className="mt-1 flex items-center gap-1">
          <span className="text-[10px] text-yellow-400">
            ★
          </span>

          <span className="text-[8px] text-white/40">
            {student.rating}
          </span>
        </div>

        <p className="mt-2 line-clamp-2 text-[7px] leading-3 text-white/40">
          {student.message}
        </p>

        {active && (
          <p className="mt-2 line-clamp-2 border-t border-white/10 pt-2 text-[6px] leading-3 text-white/30">
            {student.apText}
          </p>
        )}
      </div>
    </button>
  );
}
