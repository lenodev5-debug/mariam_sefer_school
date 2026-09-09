import {
  faEllipsis,
  faHeart,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import StudentFiromsa from "../../assets/images/student2.jpg";
import StudentMulualem from "../../assets/images/stundent.avif";
import StudentSurafel from "../../assets/images/stundet1.jpg";
import StudentHanna from "../../assets/images/stundet3.jpeg";

export default function News() {
  const news = [
    {
      title: "Outstanding Student Achievement",
      description:
        "Celebrating the dedication, hard work, and academic achievement of our students.",
      image: StudentFiromsa,
    },
    {
      title: "Academic Excellence",
      description:
        "Our students continue to demonstrate remarkable commitment to their education.",
      image: StudentMulualem,
    },
    {
      title: "Celebrating Success",
      description:
        "A new achievement worth celebrating with our entire school community.",
      image: StudentSurafel,
    },
    {
      title: "A Proud Moment for Our School",
      description:
        "We are proud to recognize the outstanding achievements of our students.",
      image: StudentHanna,
    },
  ];

  return (
    <>

      {/* =====================================================
          NEWS HEADER
      ====================================================== */}

      <div className="mb-6">
        <h1
          className="text-5xl font-semibold text-white"
          style={{ fontFamily: "news" }}
        >
          Latest News
        </h1>

        <p className="mt-2 text-white/50">
          Discover the latest achievements and events from our school.
        </p>
      </div>


      {/* =====================================================
          MAIN NEWS CONTAINER

          HEIGHT  = 30vh
          LEFT    = 60%
          RIGHT   = 40%
      ====================================================== */}

      <div className="grid h-[30vh] w-full grid-cols-[60%_40%] gap-5">


        {/* ===================================================
            LEFT — FEATURED NEWS
        ==================================================== */}

        <article
          className="
            group
            relative
            h-full
            overflow-hidden
            rounded-2xl
            border-2
            border-[#212121]
            bg-[#171717]
            transition-all
            duration-300
            hover:border-[#353535]
          "
        >

          {/* FEATURED IMAGE */}

          <img
            src={news[0].image}
            alt={news[0].title}
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              group-hover:scale-105
            "
          />


          {/* DARK OVERLAY */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black
              via-black/50
              to-transparent
            "
          />


          {/* FEATURED CONTENT */}

          <div className="absolute bottom-0 left-0 right-0 p-6">

            {/* CATEGORY */}

            <span
              className="
                mb-2
                inline-block
                rounded-full
                border
                border-white/10
                bg-white/10
                px-3
                py-1
                text-xs
                text-white/80
                backdrop-blur-md
              "
            >
              Featured News
            </span>


            {/* TITLE */}

            <h2
              className="
                text-3xl
                font-semibold
                leading-tight
                text-white
              "
              style={{ fontFamily: "news" }}
            >
              {news[0].title}
            </h2>


            {/* DESCRIPTION */}

            <p className="mt-2 max-w-xl text-sm text-white/65">
              {news[0].description}
            </p>


            {/* ACTIONS */}

            <div className="mt-3 flex items-center gap-2">

              {/* FAVORITE */}

              <button
                type="button"
                className="
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/10
                  bg-white/10
                  px-3
                  py-1.5
                  text-xs
                  text-white/70
                  backdrop-blur-md
                  transition
                  hover:bg-white/20
                  hover:text-white
                "
              >
                <FontAwesomeIcon icon={faHeart} />
                Favorite
              </button>


              {/* SHARE */}

              <button
                type="button"
                className="
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/10
                  bg-white/10
                  px-3
                  py-1.5
                  text-xs
                  text-white/70
                  backdrop-blur-md
                  transition
                  hover:bg-white/20
                  hover:text-white
                "
              >
                <FontAwesomeIcon icon={faShareNodes} />
                Share
              </button>


              {/* MORE */}

              <button
                type="button"
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/10
                  text-white/60
                  backdrop-blur-md
                  transition
                  hover:bg-white/20
                  hover:text-white
                "
              >
                <FontAwesomeIcon icon={faEllipsis} />
              </button>

            </div>

          </div>

        </article>


        {/* ===================================================
            RIGHT — THREE SMALL NEWS
        ==================================================== */}

        <div className="flex h-full flex-col gap-3">

          {news.slice(1, 4).map((item) => (
            <article
              key={item.title}
              className="
                group
                flex
                min-h-0
                flex-1
                overflow-hidden
                rounded-2xl
                border-2
                border-[#212121]
                bg-[#171717]
                transition-all
                duration-300
                hover:border-[#353535]
                hover:bg-[#1a1a1a]
              "
            >

              {/* =================================================
                  IMAGE — 25% OF CARD WIDTH
              ================================================== */}

              <div
                className="
                  relative
                  h-full
                  w-[25%]
                  shrink-0
                  overflow-hidden
                "
              >

                <img
                  src={item.image}
                  alt={item.title}
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


              {/* =================================================
                  CONTENT — 75% OF CARD WIDTH
              ================================================== */}

              <div
                className="
                  flex
                  min-w-0
                  flex-1
                  flex-col
                  justify-between
                  p-4
                "
              >

                {/* TOP CONTENT */}

                <div>

                  {/* CATEGORY */}

                  <span
                    className="
                      text-[10px]
                      uppercase
                      tracking-[0.15em]
                      text-white/30
                    "
                  >
                    School News
                  </span>


                  {/* TITLE */}

                  <h2
                    className="
                      mt-1
                      line-clamp-2
                      text-lg
                      font-semibold
                      leading-tight
                      text-white
                    "
                    style={{ fontFamily: "news" }}
                  >
                    {item.title}
                  </h2>


                  {/* DESCRIPTION */}

                  <p
                    className="
                      mt-1
                      line-clamp-2
                      text-xs
                      leading-relaxed
                      text-white/45
                    "
                  >
                    {item.description}
                  </p>

                </div>


                {/* =================================================
                    ACTION BAR
                ================================================== */}

                <div
                  className="
                    mt-2
                    flex
                    items-center
                    border-t
                    border-white/5
                    pt-2
                  "
                >

                  {/* FAVORITE */}

                  <button
                    type="button"
                    className="
                      flex
                      items-center
                      gap-1.5
                      rounded-full
                      px-2
                      py-1
                      text-[11px]
                      text-white/40
                      transition
                      hover:bg-white/5
                      hover:text-white
                    "
                  >
                    <FontAwesomeIcon icon={faHeart} />
                    Favorite
                  </button>


                  {/* SHARE */}

                  <button
                    type="button"
                    className="
                      flex
                      items-center
                      gap-1.5
                      rounded-full
                      px-2
                      py-1
                      text-[11px]
                      text-white/40
                      transition
                      hover:bg-white/5
                      hover:text-white
                    "
                  >
                    <FontAwesomeIcon icon={faShareNodes} />
                    Share
                  </button>


                  {/* MORE */}

                  <button
                    type="button"
                    className="
                      ml-auto
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center
                      rounded-full
                      text-white/35
                      transition
                      hover:bg-white/5
                      hover:text-white
                    "
                  >
                    <FontAwesomeIcon icon={faEllipsis} />
                  </button>

                </div>

              </div>

            </article>
          ))}

        </div>

      </div>
      </>

  );
}
