
import clock from '../../../assets/about/clock.jpg'
import clock1 from '../../../assets/about/clock1.jpg'
const AboutUs = () => {
  return (
    <section className="w-full bg-white py-20 px-[6%]">
      <div className="max-w-325 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-8">
          {/* Big Image */}
          <div className="w-full overflow-hidden rounded-lg">
            <img
              src={clock}
              alt="Students jumping in hallway"
              className="w-full h-105 md:h-130 object-cover bg-top"
            />
          </div>

          {/* Vision & Mission */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-2">
            <div>
              <h3 className="text-lg font-bold text-[#0b1f2a] mb-3">
                Our Vision
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                We inspire globally minded students to grow with knowledge,
                integrity, and compassion in a supportive learning environment.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#0b1f2a] mb-3">
                Our Mission
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                We provide high quality education that develops critical
                thinking, creativity, leadership, and holistic student growth.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-gray-300 rounded px-4 py-2 w-fit">
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
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <span className="text-xs font-bold tracking-widest text-[#0b1f2a] uppercase">
              About Us
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold leading-tight text-[#0b1f2a]">
            Where Education Meets <br className="hidden md:block" />
            Global Excellence
          </h2>

          {/* Description */}
          <p className="text-sm md:text-[15px] leading-relaxed text-gray-600 max-w-140">
            Our school nurtures curious minds, strong character, and lifelong
            learners through an internationally focused education. We believe
            every student deserves an environment that inspires growth,
            creativity, and confidence.
          </p>

          {/* Bottom Image */}
          <div className="w-full overflow-hidden rounded-lg mt-2">
            <img
              src={clock1}
              alt="Students in classroom"
              className="w-full h-80 md:h-100 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;