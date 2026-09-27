import dance from '../../../assets/about/dancing.jpg'
import events from '../../../assets/about/events.jpg'
import football from '../../../assets/about/stu_football.jpg'
import clean from '../../../assets/about/clean.jpg'
const AboutInspire = () => {
  const facilities = [
    "Smart Classrooms",
    "Science Laboratories",
    "Computer Laboratories",
    "Robotics Center",
    "Creative Studios",
    "Sports Complex",
    "Auditorium",
    "Library",
  ];

  const studentLife = [
    {
      image: football,
      label: "Sports Competitions",
    },
    {
      image: events,
      label: "Cultural Events",
    },
    {
      image: clean,
      label: "Community Service",
    },
    {
      image: dance,
      label: "Art Clubs",
    },
  ];

  return (
    <section className="w-full bg-white">
      {/* ---------- TOP: Facilities Checklist ---------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
        {/* Left: Text + Checklist */}
        <div className="flex flex-col justify-center px-[6%] py-16 lg:py-20">
          <p className="text-sm md:text-[15px] leading-relaxed text-gray-600 max-w-[500px] mb-8">
            Our school is built to inspire innovation, collaboration, and
            creativity through world-class educational facilities.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {facilities.map((item, index) => (
              <li key={index} className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-[#0b1f2a] shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-sm text-[#0b1f2a] font-medium">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Building Image */}
        <div className="w-full h-[320px] lg:h-auto">
          <img
            src="YOUR_FACILITY_IMAGE_URL"
            alt="Modern school building"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* ---------- BOTTOM: Student Life ---------- */}
      <div className="max-w-[1300px] mx-auto px-[6%] py-20">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 border border-gray-300 rounded px-4 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-[#123c47]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 14l9-5-9-5-9 5 9 5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 14l6.16-3.422A12.083 12.083 0 0112 21a12.083 12.083 0 01-6.16-10.422L12 14z"
              />
            </svg>
            <span className="text-xs font-bold tracking-widest text-[#0b1f2a] uppercase">
              Student Life
            </span>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-center text-3xl md:text-4xl lg:text-[44px] font-bold text-[#0b1f2a] mb-5">
          Experience Vibrant Student Life
        </h2>

        <p className="text-center text-sm md:text-[15px] leading-relaxed text-gray-600 max-w-[640px] mx-auto mb-14">
          Students explore their passions through diverse extracurricular
          programs that build confidence, teamwork, and leadership skills.
        </p>

        {/* Image Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {studentLife.map((item, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-md group cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-[340px] md:h-[380px] object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Label chip */}
              <div className="absolute bottom-4 left-4 bg-white text-[#0b1f2a] text-sm font-semibold px-4 py-2 rounded shadow-md">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-4 mt-12">
          <button
            aria-label="Previous"
            className="w-11 h-11 flex items-center justify-center rounded-full bg-[#123c47] text-white hover:bg-[#0b1f2a] transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <button
            aria-label="Next"
            className="w-11 h-11 flex items-center justify-center rounded-full bg-[#123c47] text-white hover:bg-[#0b1f2a] transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutInspire;