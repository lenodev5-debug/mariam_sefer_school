import { useState, useRef } from 'react';
import school from '../../../assets/about/school.mp4';

const AboutVideo = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const faqs = [
    {
      question: "What curriculum do you offer?",
      answer:
        "We implement an internationally recognized curriculum that integrates global academic standards with character development, critical thinking, and future ready skills to prepare students for top universities worldwide.",
    },
    {
      question: "What language is used in learning?",
      answer:
        "Our primary language of instruction is English, with additional language programs offered to support bilingual and multilingual development among our diverse student body.",
    },
    {
      question: "How can I apply for admission?",
      answer:
        "You can apply through our online admissions portal. The process includes submitting an application form, previous academic records, and attending an interview with our admissions team.",
    },
    {
      question: "Do you offer scholarships?",
      answer:
        "Yes, we offer merit-based and need-based scholarships to support talented students. Please contact our admissions office for eligibility requirements and deadlines.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const handlePlay = () => {
    setIsPlaying(true);
    // Small delay so the video element mounts before play() is called
    setTimeout(() => {
      videoRef.current?.play();
    }, 0);
  };

  return (
    <section className="w-full bg-white">
      {/* ---------- TOP: Video Banner ---------- */}
      <div className="relative w-full h-[300px] md:h-[420px] lg:h-[520px] overflow-hidden">
        {isPlaying ? (
          <video
            ref={videoRef}
            src={school}
            controls
            autoPlay
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            {/* Video preview (first frame or thumbnail) */}
            <video
              src={school}
              muted
              preload="metadata"
              className="w-full h-full object-cover"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/10" />

            {/* Play Button */}
            <button
              onClick={handlePlay}
              aria-label="Play video"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-white/90 hover:bg-white transition-all duration-200 shadow-xl group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 md:w-8 md:h-8 text-gray-800 ml-1 group-hover:scale-110 transition-transform duration-200"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* ---------- BOTTOM: FAQ ---------- */}
      <div className="max-w-325 mx-auto px-[6%] py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Heading */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 border border-gray-300 rounded px-4 py-2 mb-7">
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
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-xs font-bold tracking-widest text-[#0b1f2a] uppercase">
                FAQ
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold leading-tight text-[#0b1f2a] mb-6">
              Frequently Asked <br className="hidden md:block" />
              Questions
            </h2>

            <p className="text-sm md:text-[15px] leading-relaxed text-gray-600 max-w-115">
              Find quick answers about admissions, curriculum, student life, and
              academic pathways.
            </p>
          </div>

          {/* Right: Accordion */}
          <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-md overflow-hidden transition-colors duration-300 ${
                    isOpen
                      ? "bg-[#123c47] text-white"
                      : "bg-[#f4f6f7] text-[#0b1f2a]"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                  >
                    <span className="text-[15px] font-semibold pr-4">
                      {faq.question}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <div
                    className={`px-6 overflow-hidden transition-all duration-300 ${
                      isOpen
                        ? "max-h-40 pb-6 opacity-100"
                        : "max-h-0 pb-0 opacity-0"
                    }`}
                  >
                    <p
                      className={`text-sm leading-relaxed ${
                        isOpen ? "text-gray-200" : "text-gray-600"
                      }`}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutVideo;