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
    <section className="w-full min-h-screen bg-[#090909] px-8 py-12">

      {/* =====================================================
          NEWS HEADER
      ====================================================== */}

      <div className="mb-8">

        <h1
          className="text-5xl text-white font-semibold"
          style={{ fontFamily: "news" }}
        >
          Latest News
        </h1>

        <p className="text-white/50 mt-2">
          Discover the latest achievements and events from our school.
        </p>

      </div>


      {/* =====================================================
          NEWS LAYOUT

          LEFT  = BIG NEWS
          RIGHT = THREE SMALL NEWS
      ====================================================== */}

      <div className="grid grid-cols-[60%_40%] gap-5 w-full h-[650px]">

        {/* ===================================================
            LEFT — BIG FEATURED NEWS
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

          {/* Image */}

          <img
            src={news[0].image}
            alt={news[0].title}
            className="
              absolute
              inset-0
              w-full
              h-full
              object-cover
              transition-transform
              duration-700
              group-hover:scale-105
            "
          />

          {/* Overlay */}

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

          {/* Big news content */}

          <div className="absolute bottom-0 left-0 right-0 p-10">

            <span
              className="
                inline-block
                bg-white/10
                backdrop-blur-md
                border
                border-white/10
                rounded-full
                px-4
                py-1
                text-sm
                text-white/80
                mb-4
              "
            >
              Featured News
            </span>

            <h2
              className="
                text-4xl
                font-semibold
                text-white
              "
              style={{ fontFamily: "news" }}
            >
              {news[0].title}
            </h2>

            <p className="text-white/65 text-base mt-3 max-w-xl">
              {news[0].description}
            </p>

          </div>

        </article>


        {/* ===================================================
            RIGHT — THREE SMALL NEWS
        ==================================================== */}

        <div className="flex flex-col gap-5 h-full">

          {news.slice(1, 4).map((item) => (
            <article
              key={item.title}
              className="
                group
                relative
                flex-1
                overflow-hidden
                rounded-2xl
                border-2
                border-[#212121]
                bg-[#171717]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[#353535]
              "
            >

              {/* Image */}

              <img
                src={item.image}
                alt={item.title}
                className="
                  absolute
                  inset-0
                  w-full
                  h-full
                  object-cover
                  transition-transform
                  duration-500
                  group-hover:scale-105
                "
              />

              {/* Overlay */}

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

              {/* Small news content */}

              <div className="absolute bottom-0 left-0 right-0 p-5">

                <h2
                  className="
                    text-xl
                    text-white
                    font-semibold
                  "
                  style={{ fontFamily: "news" }}
                >
                  {item.title}
                </h2>

                <p className="text-sm text-white/60 mt-1">
                  {item.description}
                </p>

              </div>

            </article>
          ))}

        </div>

      </div>

    </section>
  );
}
