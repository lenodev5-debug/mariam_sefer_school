import {
  faEllipsis,
  faHeart,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import StudentFiromsa from "../../../assets/images/student2.jpg";
import StudentMulualem from "../../../assets/images/stundent.avif";
import StudentSurafel from "../../../assets/images/stundet1.jpg";
import StudentHanna from "../../../assets/images/stundet3.jpeg";

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
    <div className="flex h-[75vh] w-full flex-col items-center bg-[#090909] px-8 py-8">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="flex w-full flex-col items-center justify-center">
        <h1
          className="text-2xl text-white"
          style={{ fontFamily: "news" }}
        >
          Latest News
        </h1>

        <p className="mt-1 text-center text-sm text-white/50">
          Discover the latest achievements and events from our school.
        </p>
      </div>


      {/* =====================================================
          NEWS CONTENT
      ====================================================== */}

      <div className="mt-6 flex min-h-0 w-full flex-1 gap-5">


        {/* ===================================================
            LEFT SIDE — FEATURED NEWS
        ==================================================== */}

        <div
          className="
            group
            relative
            h-full
            w-[45%]
            overflow-hidden
            rounded-2xl
            border
            border-white/10
            bg-black
          "
        >

          {/* IMAGE */}

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


          {/* IMAGE OVERLAY */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black
              via-black/40
              to-transparent
            "
          />


          {/* FEATURED CONTENT */}

          <div className="absolute bottom-0 left-0 w-full p-6">

            <span
              className="
                inline-flex
                rounded-full
                border
                border-white/10
                bg-white/10
                px-3
                py-1
                text-[10px]
                uppercase
                tracking-wider
                text-white/70
                backdrop-blur-md
              "
            >
              Featured News
            </span>


            <h2
              className="mt-3 text-2xl font-semibold leading-tight text-white"
              style={{ fontFamily: "news" }}
            >
              {news[0].title}
            </h2>


            <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/60">
              {news[0].description}
            </p>


            {/* ACTIONS */}

            <div className="mt-4 flex items-center gap-2">

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

        </div>


        {/* ===================================================
            RIGHT SIDE — NEWS LIST
        ==================================================== */}

        <div className="flex h-full min-w-0 flex-1 flex-col gap-3">

          {news.slice(1).map((item) => (
            <div
              key={item.title}
              className="
                group
                flex
                min-h-0
                flex-1
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-[#111111]
                transition-all
                duration-300
                hover:border-white/20
                hover:bg-[#151515]
              "
            >

              {/* =================================================
                  RIGHT CARD IMAGE — 25%
              ================================================== */}

              <div className="relative h-full w-[25%] shrink-0 overflow-hidden">

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
                  RIGHT CARD CONTENT — 75%
              ================================================== */}

              <div className="flex min-w-0 flex-1 flex-col justify-between p-4">

                {/* NEWS INFORMATION */}

                <div>

                  <span
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.15em]
                      text-white/30
                    "
                  >
                    School News
                  </span>


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


                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/45">
                    {item.description}
                  </p>

                </div>


                {/* ACTION BAR */}

                <div className="flex items-center gap-1 border-t border-white/5 pt-2">

                  <button
                    type="button"
                    className="
                      flex
                      items-center
                      gap-1.5
                      rounded-full
                      px-2
                      py-1
                      text-[10px]
                      text-white/40
                      transition
                      hover:bg-white/5
                      hover:text-white
                    "
                  >
                    <FontAwesomeIcon icon={faHeart} />
                    Favorite
                  </button>


                  <button
                    type="button"
                    className="
                      flex
                      items-center
                      gap-1.5
                      rounded-full
                      px-2
                      py-1
                      text-[10px]
                      text-white/40
                      transition
                      hover:bg-white/5
                      hover:text-white
                    "
                  >
                    <FontAwesomeIcon icon={faShareNodes} />
                    Share
                  </button>


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
                      text-white/30
                      transition
                      hover:bg-white/5
                      hover:text-white
                    "
                  >
                    <FontAwesomeIcon icon={faEllipsis} />
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}
