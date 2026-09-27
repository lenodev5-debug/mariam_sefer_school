import Background from '../../../assets/about/aboutBackground.jpg'
import school from '../../../assets/about/school.jpg'

const StartFuture = () => {
  const menuLinks = ["Home", "About Us", "Academic", "Facilities", "Student Life"];

  return (
    <section className="w-full">
      {/* ---------- CTA BANNER ---------- */}
      <div className="relative w-full bg-[#123c47] py-20 px-[6%] overflow-hidden">
        {/* Decorative flag image behind the card */}
        <div className="absolute inset-0 opacity-90">
          <img
            src={Background}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#123c47]/40" />
        </div>

        {/* CTA Card */}
        <div className="relative z-10 max-w-250 mx-auto bg-white rounded-md shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
          {/* Left: Image */}
          <div className="w-full h-60 md:h-auto">
            <img
              src={school}
              alt="School campus with flag"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Content */}
          <div className="flex flex-col justify-center px-8 md:px-12 py-12">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-[#0b1f2a] mb-5">
              Start Your Future <br />
              With Us
            </h2>

            <p className="text-sm md:text-[15px] leading-relaxed text-gray-600 mb-8 max-w-95">
              Become part of a learning community dedicated to excellence,
              innovation, and global opportunities.
            </p>

            <button className="w-fit px-7 py-3 text-sm font-semibold rounded bg-[#123c47] text-white hover:bg-[#0b1f2a] transition-colors duration-200">
              Register Now
            </button>
          </div>
        </div>
      </div>

      {/* ---------- FOOTER ---------- */}
      <footer className="w-full bg-[#123c47] text-white">
        <div className="max-w-325 mx-auto px-[6%] pt-16 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {/* Column 1: Logo + Description + Socials */}
            <div>
              {/* Logo */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 flex items-center justify-center border-2 border-white rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-white"
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
                </div>
                <div className="leading-tight">
                  <p className="text-lg font-bold">Alteora</p>
                  <p className="text-xs tracking-widest text-gray-300 uppercase">
                    Academy
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-gray-300 mb-8 max-w-[320px]">
                Empowering future global leaders through world class
                international education, innovation, and character development.
              </p>

              {/* Social Icons */}
              <div className="flex gap-3">
                {/* Instagram */}
                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-9 h-9 flex items-center justify-center bg-white text-[#123c47] rounded hover:bg-gray-200 transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="#"
                  aria-label="Facebook"
                  className="w-9 h-9 flex items-center justify-center bg-white text-[#123c47] rounded hover:bg-gray-200 transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.592 1.325-1.326V1.326C24 .592 23.405 0 22.675 0z" />
                  </svg>
                </a>

                {/* Twitter */}
                <a
                  href="#"
                  aria-label="Twitter"
                  className="w-9 h-9 flex items-center justify-center bg-white text-[#123c47] rounded hover:bg-gray-200 transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="#"
                  aria-label="YouTube"
                  className="w-9 h-9 flex items-center justify-center bg-white text-[#123c47] rounded hover:bg-gray-200 transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Menu */}
            <div>
              <h4 className="text-base font-semibold mb-6">Menu</h4>
              <ul className="flex flex-col gap-3">
                {menuLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Admissions Office */}
            <div>
              <h4 className="text-base font-semibold mb-6">
                Admissions Office
              </h4>
              <p className="text-sm text-gray-300 mb-5">
                Global Education District, Singapore 018989
              </p>

              {/* Map */}
              <div className="w-full h-45 rounded overflow-hidden">
                <img
                  src={Background}
                  alt="Office location map"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/20 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-300">
              © Alteora Academy 2026. All Right Reserved.
            </p>

            <div className="flex items-center gap-4 text-xs text-gray-300">
              <a href="#" className="hover:text-white transition-colors">
                Terms & Conditions
              </a>
              <span className="text-white/40">|</span>
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <span className="text-white/40">|</span>
              <a href="#" className="hover:text-white transition-colors">
                Disclosures
              </a>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default StartFuture;