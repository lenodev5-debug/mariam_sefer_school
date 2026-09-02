import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faAtom,
  faBookOpen,
  faCalculator,
  faFlask,
  faGlobe,
  faGraduationCap,
  faLandmark,
  faLanguage,
  faBook,
  faHeart,
  faClock,
  faPencil,
  faShield,
  faLock,
  faKey,
  faEyeSlash,
  faUsers,
  faShareFromSquare,
  faCloud,
} from "@fortawesome/free-solid-svg-icons";


const userData = [
  {
    name: "Students",
    number: "3,142",
    icon: faBook,
    icon1: faPencil,
    icon2: faHeart,
    icon3: faClock,
  },
  {
    name: "Privacy",
    number: "100%",
    icon: faShield,
    icon1: faLock,
    icon2: faKey,
    icon3: faEyeSlash,
  },
  {
    name: "Community",
    number: "200,000",
    icon: faUsers,
    icon1: faHeart,
    icon2: faShareFromSquare,
    icon3: faCloud,
  },
];
const tags = [
  { name: "Mathematics", icon: faCalculator },
  { name: "Science", icon: faFlask },
  { name: "Biology", icon: faAtom },
  { name: "History", icon: faLandmark },
  { name: "Geography", icon: faGlobe },
  { name: "Languages", icon: faLanguage },
  { name: "School Books", icon: faBookOpen },
  { name: "Study Guides", icon: faGraduationCap },
  { name: "Library", icon: faBook },
];

// ============================================================
// TAG COMPONENT
// ============================================================

function Tag({ tag }) {
  return (
    <div
      className="
        group
        flex
        h-11
        shrink-0
        items-center
        gap-2
        rounded-md
        border
        border-white/10
        bg-white/[0.04]
        px-5
        text-sm
        text-gray-300
        backdrop-blur-md
        transition-all
        duration-300
        hover:border-white/20
        hover:bg-white/[0.08]
        hover:text-white
      "
    >
      <FontAwesomeIcon
        icon={tag.icon}
        className="
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-md
          border
          border-white/20
          p-2
          text-sm
          text-gray-400
          transition-all
          duration-300
          group-hover:border-white/40
          group-hover:text-white
        "
      />

      <span>{tag.name}</span>
    </div>
  );
}
function StatCard({ item }) {
  return (
    <div className="flex w-56 flex-col items-center">
      <div className="relative mb-8 h-28 w-44">
        <FontAwesomeIcon
          icon={item.icon}
          className="
            stat-icon
            absolute
            left-3
            top-0
            text-4xl
            text-white
          "
          style={{
            animationDelay: "0s",
          }}
        />
        <FontAwesomeIcon
          icon={item.icon1}
          className="
            stat-icon
            absolute
            right-3
            top-8
            text-4xl
            text-white
          "
          style={{
            animationDelay: "0.4s",
          }}
        />
        <FontAwesomeIcon
          icon={item.icon2}
          className="
            stat-icon
            absolute
            left-12
            top-16
            text-4xl
            text-white
          "
          style={{
            animationDelay: "0.8s",
          }}
        />
        <FontAwesomeIcon
          icon={item.icon3}
          className="
            stat-icon
            absolute
            right-12
            top-24
            text-4xl
            text-white
          "
          style={{
            animationDelay: "1.2s",
          }}
        />
      </div>
      <h1
        className="
          text-center
          text-5xl
          font-black
          tracking-tight
          text-white
          md:text-6xl
        "
        style={{
          fontFamily: "Inter, sans-serif",
        }}
      >
        {item.number}
      </h1>
      <p className="mt-2 text-center text-lg font-medium text-gray-400">
        {item.name}
      </p>
    </div>
  );
}

export default function Baner() {
  const animatedTags = [...tags, ...tags, ...tags];

  return (
    <section className="w-full overflow-hidden bg-transparent px-4 py-10">
      <div
        className="
          relative
          mx-auto
          w-full
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-white/[0.02]
          py-3
          shadow-[0_10px_40px_rgba(0,0,0,0.25)]
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            inset-y-0
            left-0
            z-20
            w-32
            bg-gradient-to-r
            from-[#0a0a0a]
            to-transparent
          "
        />
        <div
          className="
            pointer-events-none
            absolute
            inset-y-0
            right-0
            z-20
            w-32
            bg-gradient-to-l
            from-[#0a0a0a]
            to-transparent
          "
        />
        <div className="tags-track flex w-max gap-3">
          {animatedTags.map((tag, index) => (
            <Tag
              key={`row1-${tag.name}-${index}`}
              tag={tag}
            />
          ))}
        </div>
        <div className="tags-track-reverse mt-2 flex w-max gap-3">
          {animatedTags.map((tag, index) => (
            <Tag
              key={`row2-${tag.name}-${index}`}
              tag={tag}
            />
          ))}
        </div>
        <div className="tags-track mt-2 flex w-max gap-3">
          {animatedTags.map((tag, index) => (
            <Tag
              key={`row3-${tag.name}-${index}`}
              tag={tag}
            />
          ))}
        </div>
      </div>
      <div
        className="
          mt-32
          flex
          flex-wrap
          items-center
          justify-center
          gap-20
          px-4
          md:mt-42
          md:gap-32
          lg:gap-42
        "
      >
        {userData.map((item) => (
          <StatCard
            key={item.name}
            item={item}
          />
        ))}
      </div>
    </section>
  );
}
