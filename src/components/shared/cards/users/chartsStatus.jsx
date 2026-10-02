import { useState } from 'react';

const GradeDistributionCard = () => {
  // Updated data: Now representing Grade Levels and the number of students in each
  const barData = [
    { grade: 'G1', height: 'h-[32px]', marginBottom: 'mb-[8px]', dots: [] },
    { grade: 'G2', height: 'h-[44px]', marginBottom: 'mb-[14px]', dots: ['top'] },
    { grade: 'G3', height: 'h-[25px]', marginBottom: 'mb-[12px]', dots: ['bottom'] },
    { grade: 'G4', height: 'h-[32px]', marginBottom: 'mb-[10px]', dots: [] },
    { grade: 'G5', height: 'h-[44px]', marginBottom: 'mb-[14px]', dots: ['bottom'] },
    { grade: 'G6', height: 'h-[38px]', marginBottom: 'mb-[12px]', dots: [] },
    { grade: 'G7', height: 'h-[28px]', marginBottom: 'mb-[13px]', dots: ['top', 'bottom'] },
  ];

  const [moreBtn, setMoreBtn] = useState(false);

  return (
    <div className="bg-white dark:bg-[#1a1a1a] rounded-[20px] p-4.5 max-w-70 w-full font-sans transition-colors duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-[16px] font-bold text-[#1a1a1a] dark:text-white">
          Grade Distribution
        </span>
        <button className="bg-white dark:bg-[#2a2a2a] border-[1.5px] border-[#e0e0e0] dark:border-[#3a3a3a] rounded-[5px] px-2 py-2 text-[10px] font-semibold text-[#1a1a1a] dark:text-white cursor-pointer transition-all duration-200 hover:bg-[#f5f5f5] dark:hover:bg-[#333] hover:border-[#d0d0d0]">
          Full report-&gt;
        </button>
      </div>

      {/* Range / Main Metric */}
      <div className="mb-1">
        <span className="text-[30px] font-bold text-[#1a1a1a] dark:text-white tracking-[-0.5px]">
          2.3K
        </span>
        <span className="text-[28px] font-light text-[#b0b0b0] dark:text-[#666] ml-1">students</span>
      </div>

      {/* Date Range / Term */}
      <div className="text-[11px] text-[#999] dark:text-[#888] mb-5">
        Term 1 - 2023/2024
      </div>

      {/* Chart Container */}
      <div className="relative h-22.5 mb-5">
        {/* Average Line */}
        <div className="absolute left-0 right-0 top-[45%] h-[1.5px] bg-[#e0e0e0] dark:bg-[#333] z-1"></div>

        {/* Average Label */}
        <div className="absolute top-[-35%] right-0 bg-[#1a1a1a] dark:bg-[#333] text-white px-2 py-0.75 rounded-2 text-[10px] font-semibold z-2">
          Avg. 82
        </div>

        {/* Bars */}
        <div className="flex items-end justify-around h-full relative px-3.5">
          {barData.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-2 flex-1 z-2">
              <div className="flex flex-col items-center w-full">
                <div
                  // Changed to teal/emerald colors for a fresh academic look
                  className={`w-6 bg-linear-to-b from-[#0D9488] to-[#5EEAD4] rounded-[10px] relative transition-all duration-300 hover:scale-105 mx-0.75 ${item.height} ${item.marginBottom}`}
                >
                  {item.dots.includes('top') && (
                    <div className="w-2 h-2 bg-white dark:bg-[#1a1a1a] border-[1.5px] border-[#0D9488] rounded-full absolute left-1/2 -translate-x-1/2 -top-1"></div>
                  )}
                  {item.dots.includes('bottom') && (
                    <div className="w-2 h-2 bg-white dark:bg-[#1a1a1a] border-[1.5px] border-[#0D9488] rounded-full absolute left-1/2 -translate-x-1/2 -bottom-1"></div>
                  )}
                </div>
              </div>
              {/* Changed from Day to Grade Level */}
              <div className="text-[9px] text-[#999] dark:text-[#888] font-medium">
                {item.grade}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setMoreBtn(!moreBtn)}
          className="float-end mx-2 mt-1 text-sm font-bold text-white p-1 px-2 rounded-sm bg-[#50A2FF] hover:bg-[#3b8fe6] transition-colors"
        >
          {moreBtn ? 'Less' : 'More'}
        </button>
      </div>

      {/* Readings (toggled) */}
      {moreBtn && (
        <div className="border-t-[1.5px] border-[#f0f0f0] dark:border-[#2a2a2a] pt-3">
          <div className="flex justify-between items-center py-2 border-b-[1.5px] border-[#f0f0f0] dark:border-[#2a2a2a]">
            <span className="text-[9px] text-[#999] dark:text-[#888]">Most Students (Grade 2)</span>
            <span className="text-[12px] font-bold text-[#1a1a1a] dark:text-white">120</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b-[1.5px] border-[#f0f0f0] dark:border-[#2a2a2a] last:border-b-0">
            <span className="text-[9px] text-[#999] dark:text-[#888]">Fewest Students (Grade 3)</span>
            <span className="text-[12px] font-bold text-[#1a1a1a] dark:text-white">45</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GradeDistributionCard;