import { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faPhone, faPlus } from '@fortawesome/free-solid-svg-icons';

// Mock data to simulate events on specific days of the month
const MOCK_EVENTS = {
  8: 2,   // 2 events on the 8th
  9: 1,   // 1 event on the 9th
  10: 0,  // No events on the 10th
  11: 3,  // 3 events on the 11th
  12: 0,  // No events on the 12th
  13: 0,  // No events on the 13th
};

export default function MeetingCard() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeDay, setActiveDay] = useState(11);
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Generate the week days based on the currently selected month
  const days = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Find the first Monday of the month
    const firstDay = new Date(year, month, 1);
    const dayOfWeek = firstDay.getDay(); // 0 = Sun, 1 = Mon...
    const diffToMonday = firstDay.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const monday = new Date(year, month, diffToMonday);

    const daysArray = [];
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 0; i < 6; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      daysArray.push({
        num: d.getDate(),
        name: dayNames[i],
        fullDate: d
      });
    }
    return daysArray;
  }, [currentDate]);

  // Check if the active day has events
  const activeDayEvents = MOCK_EVENTS[activeDay] || 0;
  const hasEvents = activeDayEvents > 0;
  const activeDayObj = days.find(d => d.num === activeDay) || days[0];

  const handleMonthSelect = (monthIndex) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(monthIndex);
    setCurrentDate(newDate);
    setIsMonthDropdownOpen(false);
  };

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

        {/* Month selector with Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
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
              {months[currentDate.getMonth()]}
            </span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`text-sm text-[#1a1a1a] dark:text-white transition-transform duration-200 ${isMonthDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dropdown Menu */}
          {isMonthDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-[#2a2a2a] rounded-xl shadow-lg border border-[#d0d0ce] dark:border-[#3a3a3a] z-50 max-h-60 overflow-y-auto custom-scrollbar">
              {months.map((month, index) => (
                <button
                  key={month}
                  onClick={() => handleMonthSelect(index)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors
                    ${currentDate.getMonth() === index 
                      ? 'bg-[#f0ff7a] text-[#1a1a1a] font-bold' 
                      : 'text-[#1a1a1a] dark:text-white hover:bg-[#f0f0f0] dark:hover:bg-[#333]'
                    }`}
                >
                  {month}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Info Section: Calls vs Add Event */}
      <div className="flex items-center mb-8 gap-2 text-[#1a1a1a] dark:text-white">
        {hasEvents ? (
          <>
            <FontAwesomeIcon icon={faPhone} className="text-base" />
            <span className="text-sm text-[#1a1a1a] dark:text-gray-300 max-[480px]:text-xs">
              {activeDayEvents} calls • {activeDayObj.name}, {activeDay}
            </span>
          </>
        ) : (
          <button className="flex items-center gap-2 text-sm text-[#1a1a1a] dark:text-gray-300 max-[480px]:text-xs hover:opacity-70 transition-opacity">
            <FontAwesomeIcon icon={faPlus} className="text-base" />
            <span>Add Event or Schedule</span>
          </button>
        )}
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

      {/* Custom Scrollbar for Dropdown */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #475569;
        }
      `}</style>
    </div>
  );
}