import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
} from '@fortawesome/free-solid-svg-icons';

const userData = [
  {
    name: 'Students',
    number: '3,142',
    icon: faBook,
    icon1: faPencil,
    icon2: faHeart,
    icon3: faClock,
  },
  {
    name: 'Privacy',
    number: '100%',
    icon: faShield,
    icon1: faLock,
    icon2: faKey,
    icon3: faEyeSlash,
  },
  {
    name: 'Community',
    number: '200,000',
    icon: faUsers,
    icon1: faHeart,
    icon2: faShareFromSquare,
    icon3: faCloud,
  },
];
const tags = [
  { name: 'Mathematics', icon: faCalculator },
  { name: 'Science', icon: faFlask },
  { name: 'Biology', icon: faAtom },
  { name: 'History', icon: faLandmark },
  { name: 'Geography', icon: faGlobe },
  { name: 'Languages', icon: faLanguage },
  { name: 'School Books', icon: faBookOpen },
  { name: 'Study Guides', icon: faGraduationCap },
  { name: 'Library', icon: faBook },
];

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
        border-[#e0e0e0]
        bg-white
        px-5
        text-sm
        text-[#1a1a1a]
        backdrop-blur-md
        transition-all
        duration-300
        hover:border-[#50A2FF]/40
        hover:bg-[#f5f5f5]
        hover:text-[#1a1a1a]
        dark:border-[#2a2a2a]
        dark:bg-[#1a1a1a]
        dark:text-[#d1d1d1]
        dark:hover:border-[#50A2FF]/40
        dark:hover:bg-[#2a2a2a]
        dark:hover:text-white
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
          border-[#e0e0e0]
          p-2
          text-sm
          text-[#999]
          transition-all
          duration-300
          group-hover:border-[#50A2FF]/40
          group-hover:text-[#50A2FF]
          dark:border-[#3a3a3a]
          dark:text-[#888]
          dark:group-hover:border-[#50A2FF]/40
          dark:group-hover:text-[#50A2FF]
        "
      />

      <span>{tag.name}</span>
    </div>
  );
}
function StatCard({ item }) {
  return (
    <div className="flex w-56 flex-col items-center ">
      <div className="relative mb-8 h-28 w-44">
        <FontAwesomeIcon
          icon={item.icon}
          className="stat-icon absolute left-3 top-0 text-4xl text-[#1a1a1a] dark:text-white"
          style={{ animationDelay: '0s' }}
        />
        <FontAwesomeIcon
          icon={item.icon1}
          className="stat-icon absolute right-3 top-6 text-4xl text-[#1a1a1a] dark:text-white"
          style={{ animationDelay: '0.4s' }}
        />
        <FontAwesomeIcon
          icon={item.icon2}
          className="stat-icon absolute left-7 top-19 text-4xl text-[#1a1a1a] dark:text-white"
          style={{ animationDelay: '0.8s' }}
        />
        <FontAwesomeIcon
          icon={item.icon3}
          className="stat-icon absolute right-8 top-24 text-4xl text-[#1a1a1a] dark:text-white"
          style={{ animationDelay: '1.2s' }}
        />
      </div>
      <h1
        className="
          text-center
          text-5xl
          font-black
          tracking-tight
          text-[#1a1a1a]
          md:text-6xl
          dark:text-white
        "
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {item.number}
      </h1>
      <p className="mt-2 text-center text-lg font-medium text-[#999] dark:text-[#888]">
        {item.name}
      </p>
    </div>
  );
}

export default function Baner() {
  const animatedTags = [...tags, ...tags, ...tags];

  return (
    <div className="h-[80vh] bg-[#f5f5f5] transition-colors duration-300 dark:bg-[#0f0f0f]">
      <div
        className="
          relative
          mx-auto
          w-full
          overflow-hidden
          rounded-2xl
          border
          border-[#e0e0e0]
          bg-white
          shadow-[0_10px_40px_rgba(0,0,0,0.08)]
          transition-colors
          duration-300
          dark:border-[#2a2a2a]
          dark:bg-[#1a1a1a]
          dark:shadow-[0_10px_40px_rgba(0,0,0,0.25)]
        "
      >
        {/* ✅ LEFT FADE — gradient */}
        <div
          className="
            pointer-events-none
            absolute
            inset-y-0
            left-0
            z-20
            w-32
            bg-gradient-to-r
            from-white
            to-transparent
            transition-colors
            duration-300
            dark:from-[#1a1a1a]
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
            w-32
            bg-gradient-to-l
            from-white
            to-transparent
            transition-colors
            duration-300
            dark:from-[#1a1a1a]
          "
        />

        <div className="tags-track flex w-max gap-3 pt-4">
          {animatedTags.map((tag, index) => (
            <Tag key={`row1-${tag.name}-${index}`} tag={tag} />
          ))}
        </div>
        <div className="tags-track-reverse mt-2 flex w-max gap-3">
          {animatedTags.map((tag, index) => (
            <Tag key={`row2-${tag.name}-${index}`} tag={tag} />
          ))}
        </div>
        <div className="tags-track mt-2 flex w-max gap-3 pb-4">
          {animatedTags.map((tag, index) => (
            <Tag key={`row3-${tag.name}-${index}`} tag={tag} />
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
        {userData.map(item => (
          <StatCard key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
}