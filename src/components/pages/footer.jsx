import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faFacebookF,
  faInstagram,
  faTelegram,
  faYoutube,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

import {
  faGraduationCap,
  faBookOpen,
  faArrowRight,
  faLocationDot,
  faEnvelope,
  faPhone,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";


// ============================================================
// SOCIAL BUTTON
// ============================================================

function SocialButton({ icon, name }) {
  return (
    <button
      type="button"
      aria-label={name}
      className="
        group
        relative
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-lg
        border
        border-white/10
        bg-[#111111]
        text-white/50
        shadow-lg
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-white/20
        hover:bg-white/[0.08]
        hover:text-white
      "
    >
      <FontAwesomeIcon
        icon={icon}
        className="
          text-sm
          transition-transform
          duration-300
          group-hover:scale-110
        "
      />

      {/* ==================================================
          TOOLTIP
      ================================================== */}

      <span
        className="
          pointer-events-none
          absolute
          -top-9
          left-1/2
          -translate-x-1/2
          whitespace-nowrap
          rounded-md
          bg-white
          px-2
          py-1
          text-[9px]
          font-medium
          text-black
          opacity-0
          transition-all
          duration-300
          group-hover:-translate-y-1
          group-hover:opacity-100
        "
      >
        {name}
      </span>
    </button>
  );
}


// ============================================================
// FOOTER LINK
// ============================================================

function FooterLink({ children }) {
  return (
    <a
      href="#"
      className="
        group
        flex
        w-fit
        items-center
        gap-2
        text-sm
        text-white/40
        transition-all
        duration-300
        hover:translate-x-1
        hover:text-white
      "
    >
      <FontAwesomeIcon
        icon={faChevronRight}
        className="
          text-[7px]
          text-white/20
          transition
          duration-300
          group-hover:text-white
        "
      />

      {children}
    </a>
  );
}


// ============================================================
// FOOTER
// ============================================================

export default function Footer() {
  return (
    <footer
      className="
        relative
        flex
        min-h-[70vh]
        w-full
        flex-col
        justify-between
        overflow-hidden
        bg-[#0D0D0D]
      "
    >

      {/* ======================================================
          TOP GLOW
      ======================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[1px]
          w-[55%]
          -translate-x-1/2
          bg-white/20
          blur-sm
        "
      />


      {/* ======================================================
          MAIN FOOTER
      ======================================================= */}

      <div
        className="
          mx-auto
          grid
          w-full
          max-w-7xl
          grid-cols-1
          gap-12
          px-8
          pb-16
          pt-20
          md:grid-cols-2
          lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]
          lg:gap-10
        "
      >

        {/* ==================================================
            SCHOOL BRAND
        ================================================== */}

        <div className="flex flex-col">

          {/* LOGO */}

          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                bg-white/[0.04]
              "
            >
              <FontAwesomeIcon
                icon={faGraduationCap}
                className="text-lg text-white"
              />
            </div>

            <div>

              <h2
                className="text-lg font-semibold text-white"
                style={{ fontFamily: "news" }}
              >
                Our School
              </h2>

              <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                Learn • Grow • Succeed
              </p>

            </div>

          </div>


          {/* DESCRIPTION */}

          <p className="mt-6 max-w-sm text-sm leading-6 text-white/40">
            Empowering students with knowledge, confidence, and the
            skills they need to build a brighter future.
          </p>


          {/* SOCIAL MEDIA */}

          <div className="mt-7 flex items-center gap-3">

            <SocialButton
              icon={faFacebookF}
              name="Facebook"
            />

            <SocialButton
              icon={faInstagram}
              name="Instagram"
            />

            <SocialButton
              icon={faTelegram}
              name="Telegram"
            />

            <SocialButton
              icon={faYoutube}
              name="YouTube"
            />

            <SocialButton
              icon={faTiktok}
              name="TikTok"
            />

          </div>

        </div>


        {/* ==================================================
            SCHOOL
        ================================================== */}

        <div>

          <h3
            className="mb-6 text-sm font-semibold text-white"
            style={{ fontFamily: "news" }}
          >
            School
          </h3>

          <div className="flex flex-col gap-3">

            <FooterLink>About Us</FooterLink>

            <FooterLink>Teachers</FooterLink>

            <FooterLink>Students</FooterLink>

            <FooterLink>News & Events</FooterLink>

            <FooterLink>Contact</FooterLink>

          </div>

        </div>


        {/* ==================================================
            ACADEMICS
        ================================================== */}

        <div>

          <h3
            className="mb-6 text-sm font-semibold text-white"
            style={{ fontFamily: "news" }}
          >
            Academics
          </h3>

          <div className="flex flex-col gap-3">

            <FooterLink>
              <span className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faBookOpen}
                  className="text-[10px] text-white/20"
                />
                Courses
              </span>
            </FooterLink>

            <FooterLink>Subjects</FooterLink>

            <FooterLink>Library</FooterLink>

            <FooterLink>Exams</FooterLink>

            <FooterLink>Assignments</FooterLink>

          </div>

        </div>


        {/* ==================================================
            CONTACT
        ================================================== */}

        <div>

          <h3
            className="mb-6 text-sm font-semibold text-white"
            style={{ fontFamily: "news" }}
          >
            Get in Touch
          </h3>


          <div className="flex flex-col gap-5">

            {/* LOCATION */}

            <div className="flex items-start gap-3">

              <FontAwesomeIcon
                icon={faLocationDot}
                className="mt-1 text-xs text-white/30"
              />

              <div>

                <p className="text-[10px] uppercase tracking-wider text-white/25">
                  Address
                </p>

                <p className="mt-1 text-sm text-white/50">
                  Addis Ababa, Ethiopia
                </p>

              </div>

            </div>


            {/* EMAIL */}

            <div className="flex items-start gap-3">

              <FontAwesomeIcon
                icon={faEnvelope}
                className="mt-1 text-xs text-white/30"
              />

              <div>

                <p className="text-[10px] uppercase tracking-wider text-white/25">
                  Email
                </p>

                <p className="mt-1 text-sm text-white/50">
                  info@ourschool.edu
                </p>

              </div>

            </div>


            {/* PHONE */}

            <div className="flex items-start gap-3">

              <FontAwesomeIcon
                icon={faPhone}
                className="mt-1 text-xs text-white/30"
              />

              <div>

                <p className="text-[10px] uppercase tracking-wider text-white/25">
                  Phone
                </p>

                <p className="mt-1 text-sm text-white/50">
                  +251 900 000 000
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* ======================================================
          NEWSLETTER / CTA
      ======================================================= */}

      <div className="mx-auto w-full max-w-7xl px-8">

        <div
          className="
            flex
            flex-col
            items-start
            justify-between
            gap-5
            bg-transparent
            px-6
            py-5
            md:flex-row
            md:items-center
          "
        >

          <div>

            <h3
              className="text-sm font-semibold text-white"
              style={{ fontFamily: "news" }}
            >
              Stay connected with our school
            </h3>

            <p className="mt-1 text-xs text-white/30">
              Follow our latest news, events, and student achievements.
            </p>

          </div>


          <button
            type="button"
            className="
              group
              flex
              items-center
              gap-2
              rounded-lg
              border
              border-white/10
              bg-white
              px-4
              py-2.5
              text-xs
              font-semibold
              text-black
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-white/90
            "
          >
            Explore School

            <FontAwesomeIcon
              icon={faArrowRight}
              className="
                text-[10px]
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />

          </button>

        </div>

      </div>


      {/* ======================================================
          BOTTOM
      ======================================================= */}

      <div className="mx-auto mt-10 w-full max-w-7xl px-8">

        <div
          className="
            flex
            flex-col
            items-center
            justify-between
            gap-3
            border-t
            border-white/10
            py-6
            text-center
            md:flex-row
            md:text-left
          "
        >

          <p className="text-[10px] text-white/25">
            © 2026 Our School. All rights reserved.
          </p>


          <div className="flex items-center gap-5">

            <a
              href="#"
              className="text-[10px] text-white/25 transition hover:text-white"
            >
              Privacy
            </a>

            <a
              href="#"
              className="text-[10px] text-white/25 transition hover:text-white"
            >
              Terms
            </a>

            <a
              href="#"
              className="text-[10px] text-white/25 transition hover:text-white"
            >
              Help
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}
