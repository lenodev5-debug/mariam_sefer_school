import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faHeart,
  faShareFromSquare,
  faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";

import StudentFiromsa from "../../assets/images/student2.jpg";
import StudentMulualem from "../../assets/images/stundent.avif";
import StudentSurafel from "../../assets/images/stundet1.jpg";
import StudentHanna from "../../assets/images/stundet3.jpeg";


// ============================================================
// STUDENT COMMENTS DATA
// ============================================================

const comments = [
  {
    name: "Firomsa Misgana",
    grade: "Grade 10",
    id: "ST-001",
    image: StudentFiromsa,
    comment: "This school made me more confident.",
  },
  {
    name: "Mulualem Bekele",
    grade: "Grade 11",
    id: "ST-002",
    image: StudentMulualem,
    comment: "Our teachers always support us.",
  },
  {
    name: "Surafel Tadesse",
    grade: "Grade 10",
    id: "ST-003",
    image: StudentSurafel,
    comment: "Every achievement motivates me.",
  },
  {
    name: "Hanna Getachew",
    grade: "Grade 12",
    id: "ST-004",
    image: StudentHanna,
    comment: "I love our school community.",
  },
  {
    name: "Abel Tesfaye",
    grade: "Grade 9",
    id: "ST-005",
    image: StudentFiromsa,
    comment: "Learning here is enjoyable.",
  },
  {
    name: "Meron Alemu",
    grade: "Grade 11",
    id: "ST-006",
    image: StudentHanna,
    comment: "Our lessons are always interesting.",
  },
  {
    name: "Dawit Kebede",
    grade: "Grade 10",
    id: "ST-007",
    image: StudentSurafel,
    comment: "School helps me discover my talents.",
  },
  {
    name: "Selamawit Girma",
    grade: "Grade 12",
    id: "ST-008",
    image: StudentMulualem,
    comment: "Everyone supports my goals.",
  },
];


// ============================================================
// COMMENT CARD
// ============================================================

function CommentCard({ student }) {
  return (
    <div
      className="
        group
        flex
        h-[105px]
        w-[310px]
        shrink-0
        items-center
        gap-3
        rounded-xl
        border
        border-white/10
        bg-[#090909]
        px-3
        py-2
        text-white
        backdrop-blur-md
        transition-all
        duration-300
        hover:border-white/20
        hover:bg-white/[0.06]
        hover:-translate-y-1
      "
    >

      {/* ==================================================
          STUDENT IMAGE
      ================================================== */}

      <div className="relative h-[80px] w-[70px] shrink-0 overflow-hidden rounded-lg">

        <img
          src={student.image}
          alt={student.name}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />

      </div>


      {/* ==================================================
          STUDENT INFORMATION
      ================================================== */}

      <div className="flex min-w-0 flex-1 flex-col justify-between self-stretch py-1">

        {/* NAME */}

        <div className="flex items-center justify-between gap-2">

          <h2
            className="truncate text-sm font-semibold text-white"
            style={{ fontFamily: "news" }}
          >
            {student.name}
          </h2>

          <FontAwesomeIcon
            icon={faQuoteLeft}
            className="shrink-0 text-[10px] text-white/20"
          />

        </div>


        {/* GRADE + ID */}

        <p className="text-[9px] text-white/30">
          {student.grade}
          <span className="mx-1">•</span>
          {student.id}
        </p>


        {/* COMMENT */}

        <p className="truncate text-[10px] text-white/50">
          "{student.comment}"
        </p>


        {/* ACTIONS */}

        <div className="flex items-center gap-3">

          <button
            type="button"
            className="
              flex
              items-center
              gap-1
              text-[9px]
              text-white/30
              transition
              hover:text-white
            "
          >
            <FontAwesomeIcon icon={faHeart} />
            Like
          </button>


          <button
            type="button"
            className="
              flex
              items-center
              gap-1
              text-[9px]
              text-white/30
              transition
              hover:text-white
            "
          >
            <FontAwesomeIcon icon={faShareFromSquare} />
            Share
          </button>

        </div>

      </div>

    </div>
  );
}


// ============================================================
// ROW
// ============================================================

function CommentRow({ items, reverse = false }) {
  const animatedComments = [...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden">

      {/* LEFT FADE */}

      <div
        className="
          pointer-events-none
          absolute
          inset-y-0
          left-0
          z-20
          w-24
          bg-[#090909]
        "
      />

      {/* RIGHT FADE */}

      <div
        className="
          pointer-events-none
          absolute
          inset-y-0
          right-0
          z-20
          w-24
          bg-[#090909]
        "
      />


      {/* MOVING TRACK */}

      <div
        className={
          reverse
            ? "comments-track-reverse flex w-max gap-3"
            : "comments-track flex w-max gap-3"
        }
      >
        {animatedComments.map((student, index) => (
          <CommentCard
            key={`${student.id}-${index}`}
            student={student}
          />
        ))}
      </div>

    </div>
  );
}


// ============================================================
// MAIN COMPONENT
// ============================================================

export default function StudentComments() {
  return (
    <section className="h-[70vh] w-full bg-[#090909]">

      {/* ======================================================
          HEADER
      ======================================================= */}

      <div className="flex w-full flex-col items-center justify-center pt-10">

        <h1
          className="text-3xl font-semibold text-white"
          style={{ fontFamily: "news" }}
        >
          Student Comments
        </h1>

        <p className="mt-2 text-sm text-white/40">
          Hear what our students have to say about their school experience.
        </p>

      </div>


      {/* ======================================================
          THREE COMMENT ROWS
      ======================================================= */}

      <div className="mt-10 flex flex-col gap-3">

        {/* ROW 1 — LEFT */}

        <CommentRow items={comments} />


        {/* ROW 2 — RIGHT */}

        <CommentRow
          items={[...comments].reverse()}
          reverse
        />


        {/* ROW 3 — LEFT */}

        <CommentRow items={comments} />
    {/* BOTTOM SHINNING LINE */}
            <div
            className="
                pointer-events-none
                absolute
                bottom-0
                left-1/2
                h-0.5
                w-1/2
                -translate-x-1/2
                rounded-full
                bg-white/70
                blur-[2px]
                opacity-70
                transition-all
                duration-500
                group-hover:w-3/4
                group-hover:opacity-100
                group-hover:blur-[3px]
            "
            />
        </div>

    </section>
  );
}
