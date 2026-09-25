
const DonutChart = ({
    data = [],
    valueKey = 'value',
    labelKey = 'label',
    size = 180,
    strokeWidth = 18,
    centerLabel,
}) => {
    const total = data.reduce(
        (sum, item) =>
            sum + (Number(item[valueKey]) || 0),
        0
    );

    if (!data.length || total === 0) {
        return (
            <div className="flex h-[180px] items-center justify-center text-sm text-gray-500">
                No data available
            </div>
        );
    }

    const radius = 70;
    const circumference = 2 * Math.PI * radius;

    let accumulated = 0;

    return (
        <div className="flex flex-col items-center gap-5">
            <div
                className="relative"
                style={{
                    width: size,
                    height: size,
                }}
            >
                <svg
                    width={size}
                    height={size}
                    viewBox="0 0 180 180"
                    className="-rotate-90"
                >
                    <circle
                        cx="90"
                        cy="90"
                        r={radius}
                        fill="none"
                        stroke="currentColor"
                        strokeOpacity="0.08"
                        strokeWidth={strokeWidth}
                    />

                    {data.map((item, index) => {
                        const value =
                            Number(item[valueKey]) || 0;

                        const percentage =
                            value / total;

                        const dashLength =
                            percentage *
                            circumference;

                        const dashOffset =
                            -accumulated *
                            circumference;

                        accumulated += percentage;

                        return (
                            <circle
                                key={index}
                                cx="90"
                                cy="90"
                                r={radius}
                                fill="none"
                                stroke={
                                    item.color ||
                                    `hsl(${index * 70 + 220}, 70%, 55%)`
                                }
                                strokeWidth={strokeWidth}
                                strokeDasharray={`${dashLength} ${circumference}`}
                                strokeDashoffset={
                                    dashOffset
                                }
                                strokeLinecap="round"
                            />
                        );
                    })}
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {centerLabel ?? total}
                    </span>

                    {!centerLabel && (
                        <span className="text-xs text-gray-500">
                            Total
                        </span>
                    )}
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-2"
                    >
                        <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{
                                backgroundColor:
                                    item.color ||
                                    `hsl(${index * 70 + 220}, 70%, 55%)`,
                            }}
                        />

                        <span className="text-xs text-gray-600 dark:text-gray-400">
                            {item[labelKey]} ({item[valueKey]})
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DonutChart;