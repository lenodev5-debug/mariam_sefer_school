
import school from '../../../assets/about/school.jpg'
const AboutFuture = () => {
  const pathways = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Science & Technology",
      text: "Focused on scientific exploration, technology innovation, and analytical problem solving through STEM learning.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      title: "Business & Innovation",
      text: "Develops entrepreneurial mindset, leadership skills, and real world business understanding in a global economy.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
      ),
      title: "Arts & Digital Media",
      text: "Encourages creativity through visual arts, design, and digital media production to prepare students for creative industries.",
    },
  ];

  return (
    <section className="w-full bg-[#123c47]">
      {/* ---------- TOP: Future-Ready Pathways ---------- */}
      <div className="max-w-335 mx-auto px-[6%] pt-20 pb-16">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 border border-white/40 rounded px-4 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <span className="text-xs font-bold tracking-widest text-white uppercase">
              Academic
            </span>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-center text-3xl md:text-4xl lg:text-[44px] font-bold text-white mb-5">
          Future-Ready Learning Pathways
        </h2>

        <p className="text-center text-sm md:text-[15px] leading-relaxed text-gray-200 max-w-155 mx-auto mb-14">
          Our High School program combines rigorous academics with personalized
          learning pathways, preparing students for top universities worldwide.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pathways.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-lg px-7 pt-12 pb-10 flex flex-col items-center text-center hover:bg-white/10 transition-colors duration-300"
            >
              <div className="text-white mb-6">{item.icon}</div>
              <h3 className="text-lg font-bold text-white mb-4">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-300 mb-8 flex-1">
                {item.text}
              </p>
              <button className="px-6 py-2.5 text-sm font-semibold text-white border border-white/70 rounded hover:bg-white hover:text-[#123c47] transition-all duration-200">
                Read more
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- BOTTOM: Inspiring Spaces ---------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch bg-white">
        {/* Left: Content */}
        <div className="flex flex-col justify-center px-[6%] py-20 lg:py-24">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-gray-300 rounded px-4 py-2 w-fit mb-7">
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
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span className="text-xs font-bold tracking-widest text-[#0b1f2a] uppercase">
              Facilities
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold leading-tight text-[#0b1f2a] mb-5">
            Inspiring Spaces for <br className="hidden md:block" />
            Modern Learning
          </h2>

          {/* Description */}
          <p className="text-sm md:text-[15px] leading-relaxed text-gray-600 max-w-125">
            Our school is built to inspire innovation, collaboration, and
            creativity through world-class educational facilities.
          </p>
        </div>

        {/* Right: Image */}
        <div className="w-full h-75 lg:h-auto">
          <img
            src={school}
            alt="Modern school building"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutFuture;