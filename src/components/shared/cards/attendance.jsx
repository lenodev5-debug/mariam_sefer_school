import React from "react";

const attendanceData = [
    { day: "Mon", present: 65, absent: 59 },
    { day: "Tue", present: 75, absent: 65 },
    { day: "Wed", present: 90, absent: 73 },
    { day: "Thu", present: 72, absent: 80 },
    { day: "Fri", present: 69, absent: 65 },
];

const AttendanceCard = () => {
    return (
        <div className="w-full rounded-xl bg-white shadow-sm dark:bg-[#1a1a1a]">

            {/* Top navigation */}
            <div className="flex items-center justify-between border-b border-gray-200 px-5 dark:border-gray-700">

                {/* Left tabs */}
                <div className="flex items-center gap-8">
                    <button className="relative py-5 text-[16px] font-medium text-[#50A2FF]">
                        Attendance

                        <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-t-full bg-[#50A2FF]" />
                    </button>

                    <button className="py-5 text-[16px] text-gray-500 dark:text-gray-400">
                        Students
                    </button>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-5">

                    <button className="text-sm text-gray-500 dark:text-gray-400">
                        All day
                    </button>

                    <button className="text-sm text-gray-500 dark:text-gray-400">
                        All week
                    </button>

                    <button className="text-sm text-gray-500 dark:text-gray-400">
                        All month
                    </button>

                    <button className="text-sm font-medium text-[#50A2FF]">
                        This year
                    </button>

                    <button className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-300">
                        2026-01-01
                        <span>~</span>
                        2026-12-31
                        <span>▣</span>
                    </button>

                </div>
            </div>

            {/* Main content */}
            <div className="grid grid-cols-1 gap-10 p-8 xl:grid-cols-[1fr_280px]">

                {/* Chart */}
                <div>

                    <h3 className="mb-7 text-lg font-medium text-gray-800 dark:text-white">
                        Attendance Trend
                    </h3>

                    <div className="flex">

                        {/* Y axis */}
                        <div className="flex h-[300px] w-10 flex-col justify-between pb-8 text-xs text-gray-500 dark:text-gray-400">
                            <span>100</span>
                            <span>75</span>
                            <span>50</span>
                            <span>25</span>
                            <span>0</span>
                        </div>

                        {/* Chart */}
                        <div className="relative flex-1">

                            {/* Grid */}
                            <div className="absolute left-0 right-0 top-0 border-t border-gray-200 dark:border-gray-700" />

                            <div className="absolute left-0 right-0 top-1/4 border-t border-dashed border-gray-200 dark:border-gray-700" />

                            <div className="absolute left-0 right-0 top-2/4 border-t border-dashed border-gray-200 dark:border-gray-700" />

                            <div className="absolute left-0 right-0 top-3/4 border-t border-dashed border-gray-200 dark:border-gray-700" />

                            <div className="absolute bottom-8 left-0 right-0 border-t border-gray-300 dark:border-gray-600" />

                            {/* Bars */}
                            <div className="relative z-10 flex h-[300px] items-end justify-around px-5 pb-8">

                                {attendanceData.map((item) => (
                                    <div
                                        key={item.day}
                                        className="flex h-full items-end gap-1"
                                    >
                                        {/* Present */}
                                        <div
                                            className="w-10 rounded-t-sm bg-[#8FC4F8] transition-all duration-300 hover:opacity-80"
                                            style={{
                                                height: `${item.present}%`,
                                            }}
                                            title={`${item.present}% Present`}
                                        />

                                        {/* Absent */}
                                        <div
                                            className="w-10 rounded-t-sm bg-[#50A2FF] transition-all duration-300 hover:opacity-80"
                                            style={{
                                                height: `${item.absent}%`,
                                            }}
                                            title={`${item.absent}% Absent`}
                                        />
                                    </div>
                                ))}

                            </div>

                            {/* X axis */}
                            <div className="absolute bottom-0 left-0 right-0 flex justify-around px-5">
                                {attendanceData.map((item) => (
                                    <span
                                        key={item.day}
                                        className="text-xs text-gray-500 dark:text-gray-400"
                                    >
                                        {item.day}
                                    </span>
                                ))}
                            </div>

                        </div>
                    </div>

                    {/* Legend */}
                    <div className="mt-6 flex items-center gap-6">

                        <div className="flex items-center gap-2">
                            <span className="h-3 w-3 rounded-sm bg-[#8FC4F8]" />

                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Present
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="h-3 w-3 rounded-sm bg-[#50A2FF]" />

                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Absent
                            </span>
                        </div>

                    </div>
                </div>

                {/* Attendance ranking */}
                <div>

                    <h3 className="mb-7 text-lg font-medium text-gray-800 dark:text-white">
                        Attendance ranking
                    </h3>

                    <div className="space-y-5">

                        {[
                            ["1", "Grade 3", "95%"],
                            ["2", "Grade 5", "93%"],
                            ["3", "Grade 2", "91%"],
                            ["4", "Grade 4", "89%"],
                            ["5", "Grade 6", "87%"],
                            ["6", "Grade 1", "85%"],
                            ["7", "Grade 7", "82%"],
                        ].map(([rank, grade, percentage]) => (
                            <div
                                key={rank}
                                className="flex items-center justify-between"
                            >
                                <div className="flex items-center gap-4">

                                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-700 text-xs text-white dark:bg-gray-600">
                                        {rank}
                                    </span>

                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                        {grade}
                                    </span>

                                </div>

                                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                    {percentage}
                                </span>
                            </div>
                        ))}

                    </div>
                </div>

            </div>
        </div>
    );
};

export default AttendanceCard;