
import Background from '../../../assets/about/aboutBackground.jpg'
const AboutHome = () => {
  const features = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-9 h-9"
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
      ),
      title: "20+ Years of Educational Excellence",
      text: "Providing high-quality international education with proven academic success.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-9 h-9"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "40+ Nationalities Community",
      text: "A diverse and multicultural environment that promotes global understanding.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-9 h-9"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 21h18M3 10.5l9-6.75 9 6.75M4.5 10.5V21M19.5 10.5V21"
          />
        </svg>
      ),
      title: "98% University Acceptance Rate",
      text: "Graduates successfully continuing their education at leading universities worldwide.",
    },
  ];

  return (
    <section className="relative w-full min-h-160 flex items-center overflow-hidden pt-20 pb-56 px-[6%]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${Background})` }}        
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-[#0a1419]/95 via-[#0a1419]/75 to-[#0a1419]/25" />

      {/* Main Content */}
      <div className="relative z-10 max-w-155 text-white">
        <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.15] tracking-tight mb-6">
          Shaping Global <br />
          Leaders For Tomorrow
        </h1>

        <p className="text-base leading-relaxed text-gray-200 max-w-130 mb-9">
          Our world class construction combines meticulous planning, superior
          craftsmanship, and strict standards to deliver structures that stand
          the test of time.
        </p>

        <div className="flex flex-wrap gap-4">
          <button className="px-7 py-3.5 text-[15px] font-semibold rounded bg-white text-[#0b1f2a] border-2 border-white hover:bg-gray-200 hover:border-gray-200 transition-all duration-200">
            Register Now
          </button>
          <button className="px-7 py-3.5 text-[15px] font-semibold rounded bg-transparent text-white border-2 border-white hover:bg-white hover:text-[#0b1f2a] transition-all duration-200">
            Book a Campus Tour
          </button>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="absolute bottom-0 left-0 right-0 z-20 grid grid-cols-1 lg:grid-cols-3 gap-6 px-[6%] translate-y-[38%]">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-[#123c47] rounded-md px-7 pt-10 pb-8 text-center text-white shadow-xl hover:-translate-y-1.5 transition-transform duration-300"
          >
            <div className="flex justify-center mb-4 text-white">
              {item.icon}
            </div>
            <h3 className="text-[17px] font-bold leading-snug mb-3">
              {item.title}
            </h3>
            <p className="text-sm leading-relaxed text-[#cdd9dd]">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      {/* Spacer for cards overflow on mobile */}
      <div className="lg:hidden h-40" />
    </section>
  );
};

export default AboutHome;