
const BarChart = ({
    data = [],
    valueKey = 'value',
    labelKey = 'label',
    height = 220,
    barColor = '#6366f1',
    showValues = true,
}) => {
    if (!data.length) {
        return (
            <div className="flex h-[220px] items-center justify-center text-sm text-gray-500">
                No data available
            </div>
        );
    }

    const values = data.map(
        (item) => Number(item[valueKey]) || 0
    );

    const maxValue = Math.max(...values, 1);

    return (
        <div
            className="flex w-full items-end gap-3 overflow-x-auto"
            style={{ height }}
        >
            {data.map((item, index) => {
                const value =
                    Number(item[valueKey]) || 0;

                const percentage =
                    (value / maxValue) * 100;

                return (
                    <div
                        key={index}
                        className="flex min-w-[45px] flex-1 flex-col items-center justify-end gap-2"
                        style={{ height: '100%' }}
                    >
                        <div className="flex h-full w-full items-end justify-center">
                            <div
                                className="group relative w-full max-w-[42px] rounded-t-lg transition-all duration-300 hover:opacity-80"
                                style={{
                                    height: `${percentage}%`,
                                    minHeight:
                                        value > 0
                                            ? '4px'
                                            : '0',
                                    backgroundColor:
                                        barColor,
                                }}
                            >
                                {showValues && (
                                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-gray-700 dark:text-gray-300">
                                        {value}
                                    </span>
                                )}
                            </div>
                        </div>

                        <span className="max-w-[60px] truncate text-xs text-gray-500">
                            {item[labelKey]}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default BarChart;