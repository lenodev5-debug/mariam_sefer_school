import {
  faArrowUpRightFromSquare,
  faCamera,
  faFingerprint,
  faPhone,
  faShare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Platform() {
  return (
    <section className="relative flex min-h-screen w-full items-start justify-center overflow-hidden pt-16">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      {/* MAIN GRID */}
      <div className="relative z-10 grid w-full grid-cols-1 items-start gap-12 md:grid-cols-[1.8fr_1fr]">
        {/* LEFT — COMMUNITY */}
        <div className="flex w-full flex-col rounded-2xl rounded-l-none border border-white/20 p-10 md:p-14">
          {/* Online count */}
          <div className="mb-4 flex items-center gap-2 text-sm text-white/50">
            <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
            <span>598 Users</span>
          </div>

          {/* Heading */}
          <h1 className="max-w-xl text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl">
            Join the
            <br />
            <span className="text-white/50">Other student!</span>
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
            <FontAwesomeIcon icon={faShare} className="text-xl" />
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

        {/* RIGHT — PLATFORM */}
        <div className="relative w-full">
          <div className="relative flex flex-col items-center h-[650px] w-[340px] border-4 border-black rounded-2xl bg-gray-100">
            {/* Top Border */}
            <span className="border border-black bg-black w-20 h-2 rounded-b-2xl -mt-1"></span>

            {/* Time */}
            <p className="text-6xl font-bold mt-16 -mb-3">12:00</p>

            {/* Date */}
            <p className="text-md text-gray-700 mt-4">Fri, 20 December</p>

            {/* Fingerprint Icon */}
            <FontAwesomeIcon
              icon={faFingerprint}
              className="absolute bottom-12 text-6xl text-black"
            />

            {/* Camera Icon */}
            <FontAwesomeIcon
              icon={faCamera}
              className="absolute bottom-2.5 right-2.5 p-1 bg-[rgb(209,218,218)] rounded-md text-black text-3xl"
            />

            {/* Phone Icon */}
            <FontAwesomeIcon
              icon={faPhone}
              className="absolute bottom-2.5 left-2.5 p-1 bg-[rgb(209,218,218)] rounded-md text-black text-3xl"
            />
            {/* Right Border - Top */}
            <span className="absolute border-4 border-black right-[-8px] rounded-md top-14 h-7"></span>
          </div>
        </div>
      </div>
    </section>
  );
}
