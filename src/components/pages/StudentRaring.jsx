
import StudentFiromsa from "../../assets/images/student2.jpg";
import StudentMulualem from "../../assets/images/stundent.avif";
import StudentSurafel from "../../assets/images/stundet1.jpg";
import StudentHanna from "../../assets/images/stundet3.jpeg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

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

  return (
    <div className="flex bg-[#090909] w-full h-[65vh]">

      {/* =====================================================
          LEFT INFORMATION CARD
      ====================================================== */}

      <div className="w-86 min-h-50 bg-linear-to-tr from-[##121212] via-[#151718] to-[#090909] flex flex-col justify-center px-4 relative border-2 border-[#212121] rounded-3xl my-4">

        <FontAwesomeIcon
          icon={faUser}
          size="6x"
          color="#fff"
          className="mb-4 ml-4"
        />

        <h1 className="mt-1 text-3xl text-white">
          High Student rating
        </h1>

        <p className="text-white/55">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Doloremque veritatis perspiciatis recusandae sint soluta eum
          esse molestiae
        </p>

        <p className="text-white/65 text-center text-sm decoration-solid underline mt-2">
          meriem sefer/student
        </p>

        <div className="flex justify-center">
          <button className="bg-[#212121] text-white rounded-md w-34 h-12 mt-3 flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faStar} size="xl" />
            rate on here
          </button>
        </div>
      </div>


      {/* =====================================================
          RIGHT STUDENT SECTION
      ====================================================== */}

      <div className="w-[95%] min-h-50 bg-linear-to-lr from-[#111111] via-[#374151] to-[#212121] flex flex-col justify-center items-center gap-6 px-8 border-2 border-[#212121] rounded-2xl relative z-10 m-4">

        <h1
          className="text-4xl text-white/90 mt-4"
          style={{ fontFamily: "news" }}
        >
          See more students
        </h1>


        {/* =====================================================
            THREE CARD CONTAINER
        ====================================================== */}

        <div
          className="flex justify-center items-start"
          style={{
            width: "1078px",
            height: "400px",
            borderRadius: "8px",
            fontFamily: "'Inter', sans-serif",
            padding: "20px",
            boxSizing: "border-box",
            overflow: "hidden",
            position: "relative",
          }}
        >

          {/* ===================================================
              LEFT CARD
          ==================================================== */}

          <div
            className="
              w-58 h-84
              absolute
              top-22
              left-40
              -rotate-6
              rounded-xl
              z-10
              group
            "
          >

            {/* CONSTANT GLOW */}

            <div
              className="
                absolute
                -inset-8
                rounded-full
                bg-white/10
                blur-3xl
                opacity-60
                pointer-events-none
              "
            />

            {/* CONSTANT SHINE */}

            <div
              className="
                absolute
                -inset-3
                rounded-2xl
                bg-gradient-to-r
                from-transparent
                via-white/10
                to-transparent
                blur-xl
                opacity-40
                pointer-events-none
              "
            />

            {/* CARD */}

            <div
              className="
                relative
                w-full h-full
                border
                border-white/10
                bg-linear-to-bl
                from-[#141414]
                via-[#191919]
                to-[#1E1E1E]
                rounded-xl
                overflow-hidden
                transition-all
                duration-300
                hover:-translate-y-10
                hover:scale-105
                hover:shadow-xl
                hover:-rotate-1
              "
            >

              {/* IMAGE */}

              <div className="w-full h-36 overflow-hidden">
                <img
                  src={studentList[0].image}
                  alt={studentList[0].name}
                  className="w-full h-full object-cover"
                />
              </div>


              {/* CONTENT */}

              <div className="px-4 py-3">

                <h2 className="text-white text-lg font-semibold">
                  {studentList[0].name}
                </h2>

                <div className="flex items-center gap-1 mt-1">

                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-yellow-400 text-sm"
                  />

                  <span className="text-white/50 text-xs">
                    {studentList[0].rating}
                  </span>

                </div>

                <div className="mt-3">

                  <span className="text-white/40 text-xs">
                    Score
                  </span>

                  <p className="text-white text-3xl font-bold">
                    {studentList[0].point}

                    <span className="text-white/30 text-sm">
                      /600
                    </span>
                  </p>

                </div>

                <p className="text-white/45 text-xs leading-4 mt-2 line-clamp-2">
                  {studentList[0].message}
                </p>

              </div>
            </div>
          </div>


          {/* ===================================================
              CENTER CARD
          ==================================================== */}

          <div
            className="
              w-58 h-84
              absolute
              top-15
              left-1/2
              -translate-x-1/2
              rounded-xl
              z-30
              group
            "
          >

            {/* STRONG CONSTANT GLOW */}

            <div
              className="
                absolute
                -inset-10
                rounded-full
                bg-white/15
                blur-3xl
                opacity-70
                pointer-events-none
              "
            />

            {/* STRONG CONSTANT SHINE */}

            <div
              className="
                absolute
                -inset-4
                rounded-2xl
                bg-gradient-to-r
                from-transparent
                via-white/15
                to-transparent
                blur-xl
                opacity-50
                pointer-events-none
              "
            />

            {/* CARD */}

            <div
              className="
                relative
                w-full h-full
                border
                border-white/10
                bg-linear-to-bl
                from-[#202020]
                via-[#181818]
                to-[#111111]
                rounded-xl
                overflow-hidden
                transition-all
                duration-300
                hover:-translate-y-10
                hover:scale-105
                hover:shadow-xl
              "
            >

              {/* IMAGE */}

              <div className="w-full h-36 overflow-hidden">
                <img
                  src={studentList[1].image}
                  alt={studentList[1].name}
                  className="w-full h-full object-cover"
                />
              </div>


              {/* CONTENT */}

              <div className="px-4 py-3">

                <h2 className="text-white text-lg font-semibold">
                  {studentList[1].name}
                </h2>

                <div className="flex items-center gap-1 mt-1">

                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-yellow-400 text-sm"
                  />

                  <span className="text-white/50 text-xs">
                    {studentList[1].rating}
                  </span>

                </div>

                <div className="mt-3">

                  <span className="text-white/40 text-xs">
                    Score
                  </span>

                  <p className="text-white text-3xl font-bold">
                    {studentList[1].point}

                    <span className="text-white/30 text-sm">
                      /600
                    </span>
                  </p>

                </div>

                <p className="text-white/45 text-xs leading-4 mt-2 line-clamp-2">
                  {studentList[1].message}
                </p>

              </div>
            </div>
          </div>


          {/* ===================================================
              RIGHT CARD
          ==================================================== */}

          <div
            className="
              w-58 h-84
              absolute
              top-22
              right-40
              rotate-6
              rounded-xl
              z-10
              group
            "
          >

            {/* CONSTANT GLOW */}

            <div
              className="
                absolute
                -inset-8
                rounded-full
                bg-white/10
                blur-3xl
                opacity-60
                pointer-events-none
              "
            />

            {/* CONSTANT SHINE */}

            <div
              className="
                absolute
                -inset-3
                rounded-2xl
                bg-gradient-to-r
                from-transparent
                via-white/10
                to-transparent
                blur-xl
                opacity-40
                pointer-events-none
              "
            />

            {/* CARD */}

            <div
              className="
                relative
                w-full h-full
                border
                border-white/10
                bg-linear-to-bl
                from-[#141414]
                via-[#191919]
                to-[#1E1E1E]
                rounded-xl
                overflow-hidden
                transition-all
                duration-300
                hover:-translate-y-10
                hover:scale-105
                hover:shadow-xl
                hover:rotate-1
              "
            >

              {/* IMAGE */}

              <div className="w-full h-36 overflow-hidden">
                <img
                  src={studentList[2].image}
                  alt={studentList[2].name}
                  className="w-full h-full object-cover"
                />
              </div>


              {/* CONTENT */}

              <div className="px-4 py-3">

                <h2 className="text-white text-lg font-semibold">
                  {studentList[2].name}
                </h2>

                <div className="flex items-center gap-1 mt-1">

                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-yellow-400 text-sm"
                  />

                  <span className="text-white/50 text-xs">
                    {studentList[2].rating}
                  </span>

                </div>

                <div className="mt-3">

                  <span className="text-white/40 text-xs">
                    Score
                  </span>

                  <p className="text-white text-3xl font-bold">
                    {studentList[2].point}

                    <span className="text-white/30 text-sm">
                      /600
                    </span>
                  </p>

                </div>

                <p className="text-white/45 text-xs leading-4 mt-2 line-clamp-2">
                  {studentList[2].message}
                </p>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
