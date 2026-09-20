import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faPhone } from '@fortawesome/free-solid-svg-icons';

const days = [
  { num: 8,  name: 'Mon' },
  { num: 9,  name: 'Tue' },
  { num: 10, name: 'Wed' },
  { num: 11, name: 'Thu' },
  { num: 12, name: 'Fri' },
  { num: 13, name: 'Sat' },
];

export default function MeetingCard() {
  const [activeDay, setActiveDay] = useState(11);

  return (
    <div
      className="
        bg-[#e9eeea] dark:bg-[#1a1a1a]
        rounded-[2rem]
        p-6
        w-full max-w-[380px]
        shadow-[0_10px_25px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_25px_rgba(0,0,0,0.5)]
        transition-colors duration-300
        max-[480px]:max-w-full max-[480px]:p-4 max-[480px]:rounded-3xl
        max-[350px]:p-[0.8rem]
      "
    >
      {/* Header */}
      <div
        className="
          flex justify-between items-center mb-6
          max-[350px]:flex-col max-[350px]:items-start
        "
      >
        <div className="text-[1.875rem] font-bold leading-tight text-[#1a1a1a] dark:text-white max-[480px]:text-2xl max-[350px]:text-2xl">
          Upcoming
          <br />
          Meetings
        </div>

        {/* Month selector */}
        <button
          type="button"
          className="
            flex items-center gap-2
            bg-[#e9eeea] dark:bg-[#2a2a2a]
            rounded-full
            py-[0.7rem] px-[1.2rem]
            border border-[#d0d0ce] dark:border-[#3a3a3a]
            shadow-[0_1px_3px_rgba(0,0,0,0.05)]
            cursor-pointer
            transition-colors duration-200
            hover:bg-[#dededd] dark:hover:bg-[#333]
            max-[480px]:py-2 max-[480px]:px-3
            max-[350px]:mt-2
          "
        >
          <span className="text-base font-medium text-[#1a1a1a] dark:text-white max-[480px]:text-sm">
            September
          </span>
          <FontAwesomeIcon
            icon={faChevronDown}
            className="text-sm text-[#1a1a1a] dark:text-white"
          />
        </button>
      </div>

      {/* Calls info */}
      <div className="flex items-center mb-8 gap-2 text-[#1a1a1a] dark:text-white">
        <FontAwesomeIcon icon={faPhone} className="text-base" />
        <span className="text-sm text-[#1a1a1a] dark:text-gray-300 max-[480px]:text-xs">
          3 calls • Thu, 11
        </span>
      </div>

      {/* Date navigation */}
      <div className="relative">
        <div className="bg-white dark:bg-[#252525] rounded-2xl py-3 px-2 flex justify-between items-start mb-5 transition-colors duration-300">
          {days.map((day) => {
            const isActive = activeDay === day.num;
            return (
              <button
                key={day.num}
                type="button"
                onClick={() => setActiveDay(day.num)}
                className="group flex flex-col items-center relative w-full cursor-pointer"
              >
                <div
                  className={`
                    flex justify-center items-center w-10
                    text-[1.2rem] font-semibold h-7
                    rounded-t-[20px] pt-[5px]
                    transition-colors duration-200
                    max-[480px]:w-9 max-[480px]:text-base
                    max-[350px]:w-[30px] max-[350px]:text-sm
                    ${
                      isActive
                        ? 'bg-[#f0ff7a] text-[#1a1a1a]'
                        : 'text-[#1a1a1a] dark:text-white group-hover:bg-[#f8f8f8] dark:group-hover:bg-[#333]'
                    }
                  `}
                >
                  {day.num}
                </div>
                <div
                  className={`
                    flex justify-center items-center w-10
                    text-[0.7rem] h-5 rounded-b-[20px]
                    transition-colors duration-200
                    max-[480px]:w-9 max-[480px]:text-[0.65rem]
                    max-[350px]:w-[30px] max-[350px]:text-[0.6rem]
                    ${
                      isActive
                        ? 'bg-[#f0ff7a] text-[#1a1a1a]'
                        : 'text-[#666] dark:text-gray-400 group-hover:bg-[#f8f8f8] dark:group-hover:bg-[#333]'
                    }
                  `}
                >
                  {day.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Indicators */}
        <div className="relative flex justify-between w-full px-7 box-border max-[480px]:px-6 max-[350px]:px-5">
          <div className="absolute top-1/2 left-8 right-8 h-0 border-t-[1.5px] border-dashed border-[#d0d0ce] dark:border-[#3a3a3a] -translate-y-1/2 z-[1] max-[480px]:left-7 max-[480px]:right-7 max-[350px]:left-6 max-[350px]:right-6" />

          {days.map((day) => {
            const isActive = activeDay === day.num;
            return (
              <div
                key={day.num}
                className={`
                  w-2 h-2 rounded-full relative z-[2] transition-colors duration-200
                  ${
                    isActive
                      ? 'bg-black dark:bg-[#f0ff7a]'
                      : 'bg-[#d0d0ce] dark:bg-[#555]'
                  }
                `}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}