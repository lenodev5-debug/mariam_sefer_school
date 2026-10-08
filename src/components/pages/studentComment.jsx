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


const comments = [
  { name: "Firomsa Misgana", grade: "Grade 10", id: "ST-001", image: StudentFiromsa, comment: "This school made me more confident." },
  { name: "Mulualem Bekele", grade: "Grade 11", id: "ST-002", image: StudentMulualem, comment: "Our teachers always support us." },
  { name: "Surafel Tadesse", grade: "Grade 10", id: "ST-003", image: StudentSurafel, comment: "Every achievement motivates me." },
  { name: "Hanna Getachew", grade: "Grade 12", id: "ST-004", image: StudentHanna, comment: "I love our school community." },
  { name: "Abel Tesfaye", grade: "Grade 9", id: "ST-005", image: StudentFiromsa, comment: "Learning here is enjoyable." },
  { name: "Meron Alemu", grade: "Grade 11", id: "ST-006", image: StudentHanna, comment: "Our lessons are always interesting." },
  { name: "Dawit Kebede", grade: "Grade 10", id: "ST-007", image: StudentSurafel, comment: "School helps me discover my talents." },
  { name: "Selamawit Girma", grade: "Grade 12", id: "ST-008", image: StudentMulualem, comment: "Everyone supports my goals." },
];


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
        border-[#e0e0e0]
        bg-white
        px-3
        py-2
        text-[#1a1a1a]
        backdrop-blur-md
        transition-all
        duration-300
        hover:border-[#50A2FF]/40
        hover:bg-[#f5f5f5]
        hover:-translate-y-1
        dark:border-[#2a2a2a]
        dark:bg-[#1a1a1a]
        dark:text-white
        dark:hover:border-[#50A2FF]/40
        dark:hover:bg-[#2a2a2a]
      "
    >
      <div className="relative h-[80px] w-[70px] shrink-0 overflow-hidden rounded-lg">
        <img
          src={student.image}
          alt={student.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between self-stretch py-1">
        <div className="flex items-center justify-between gap-2">
          <h2
            className="truncate text-sm font-semibold text-[#1a1a1a] dark:text-white"
            style={{ fontFamily: "news" }}
          >
            {student.name}
          </h2>

          <FontAwesomeIcon
            icon={faQuoteLeft}
            className="shrink-0 text-[10px] text-[#b0b0b0] dark:text-[#666]"
          />
        </div>

        <p className="text-[9px] text-[#b0b0b0] dark:text-[#666]">
          {student.grade}
          <span className="mx-1">•</span>
          {student.id}
        </p>

        <p className="truncate text-[10px] text-[#999] dark:text-[#888]">
          "{student.comment}"
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-1 text-[9px] text-[#b0b0b0] transition hover:text-[#1a1a1a] dark:text-[#666] dark:hover:text-white"
          >
            <FontAwesomeIcon icon={faHeart} />
            Like
          </button>

          <button
            type="button"
            className="flex items-center gap-1 text-[9px] text-[#b0b0b0] transition hover:text-[#1a1a1a] dark:text-[#666] dark:hover:text-white"
          >
            <FontAwesomeIcon icon={faShareFromSquare} />
            Share
          </button>
        </div>
      </div>
    </div>
  );
}


function CommentRow({ items, reverse = false }) {
  const animatedComments = [...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden">

      {/* ✅ LEFT FADE — gradient */}
      <div
        className="
          pointer-events-none
          absolute
          inset-y-0
          left-0
          z-20
          w-24
          bg-gradient-to-r
          from-[#f5f5f5]
          to-transparent
          transition-colors
          duration-300
          dark:from-[#0f0f0f]
        "
      />

      {/* ✅ RIGHT FADE — gradient */}
      <div
        className="
          pointer-events-none
          absolute
          inset-y-0
          right-0
          z-20
          w-24
          bg-gradient-to-l
          from-[#f5f5f5]
          to-transparent
          transition-colors
          duration-300
          dark:from-[#0f0f0f]
        "
      />

      <div
        className={
          reverse
            ? "comments-track-reverse flex w-max gap-3"
            : "comments-track flex w-max gap-3"
        }
      >
        {animatedComments.map((student, index) => (
          <CommentCard key={`${student.id}-${index}`} student={student} />
        ))}
      </div>
    </div>
  );
}


export default function StudentComments() {
  return (
    <section className="h-[70vh] w-full bg-[#f5f5f5] transition-colors duration-300 dark:bg-[#0f0f0f]">
      <div className="flex w-full flex-col items-center justify-center pt-10">
        <h1
          className="text-3xl font-semibold text-[#1a1a1a] dark:text-white"
          style={{ fontFamily: "news" }}
        >
          Student Comments
        </h1>

        <p className="mt-2 text-sm text-[#999] dark:text-[#888]">
          Hear what our students have to say about their school experience.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-3">
        <CommentRow items={comments} />
        <CommentRow items={[...comments].reverse()} reverse />
        <CommentRow items={comments} />
      </div>
    </section>
  );
}