const VisitsCard = () => {
    return (
        <div className="w-full rounded-[20px] bg-white p-5 shadow-sm dark:bg-[#1a1a1a]">
            {/* Header */}
            <div className="mb-3 flex items-center justify-between">
                <h2 className="text-[16px] font-bold text-[#1a1a1a] dark:text-white">
                    User visits
                </h2>

                <button
                    className="
                        flex h-5 w-5
                        items-center justify-center
                        rounded-full
                        border border-gray-400
                        text-xs text-gray-500
                        transition
                        hover:bg-gray-100
                        dark:border-gray-600
                        dark:hover:bg-gray-800
                    "
                >
                    i
                </button>
            </div>

            {/* Total */}
            <div className="mb-2">
                <h1 className="text-[30px] font-bold tracking-tight text-[#1a1a1a] dark:text-white">
                    6,480
                </h1>
            </div>

            {/* Area chart */}
            <div className="relative mt-2 h-32.5 w-full overflow-hidden">
                <svg
                    viewBox="0 0 300 100"
                    className="h-full w-full"
                    preserveAspectRatio="none"
                >
                    {/* Cyan */}
                    <path
                        d="
                            M0 88
                            C15 68 25 55 40 58
                            C55 61 60 78 75 72
                            C90 66 95 25 115 22
                            C135 19 130 55 150 53
                            C170 51 165 32 185 38
                            C205 44 205 22 225 12
                            C245 5 255 43 270 52
                            C285 61 295 80 300 88
                            L300 100
                            L0 100
                            Z
                        "
                        fill="#20d3d3"
                    />

                    {/* Blue */}
                    <path
                        d="
                            M0 88
                            C15 68 25 52 40 56
                            C55 60 60 78 75 75
                            C90 71 95 43 110 43
                            C125 43 130 66 145 66
                            C160 66 165 47 180 49
                            C195 51 200 68 215 62
                            C230 56 235 32 250 35
                            C270 39 280 68 300 88
                            L300 100
                            L0 100
                            Z
                        "
                        fill="#5579df"
                    />

                    {/* Red */}
                    <path
                        d="
                            M0 88
                            C20 83 30 68 45 74
                            C60 80 65 86 80 83
                            C95 80 105 73 120 76
                            C135 79 140 72 155 74
                            C170 77 180 60 195 62
                            C210 64 220 82 235 79
                            C250 76 260 71 275 80
                            C285 83 292 87 300 88
                            L300 100
                            L0 100
                            Z
                        "
                        fill="#ff705e"
                    />
                </svg>
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-gray-200 dark:border-gray-700" />

            {/* Bottom */}
            <div className="text-center">
                <span className="text-[15px] text-gray-700 dark:text-gray-300">
                    Day visits{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                        4,280
                    </span>
                </span>
            </div>
        </div>
    );
};

export default VisitsCard;