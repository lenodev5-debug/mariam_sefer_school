
const AreaChart = ({
    data = [],
    width = 600,
    height = 220,
    valueKey = 'value',
    labelKey = 'label',
    lineColor = '#6366f1',
    fillColor = '#6366f1',
    showLabels = true,
}) => {
    if (!data.length) {
        return (
            <div className="flex h-[220px] items-center justify-center text-sm text-gray-500">
                No data available
            </div>
        );
    }

    const values = data.map((item) => Number(item[valueKey]) || 0);

    const maxValue = Math.max(...values, 1);
    const minValue = Math.min(...values, 0);

    const padding = {
        top: 20,
        right: 20,
        bottom: 35,
        left: 35,
    };

    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const getX = (index) => {
        if (data.length === 1) {
            return padding.left + chartWidth / 2;
        }

        return (
            padding.left +
            (index / (data.length - 1)) * chartWidth
        );
    };

    const getY = (value) => {
        if (maxValue === minValue) {
            return padding.top + chartHeight / 2;
        }

        return (
            padding.top +
            chartHeight -
            ((value - minValue) / (maxValue - minValue)) *
                chartHeight
        );
    };

    const points = data.map((item, index) => ({
        x: getX(index),
        y: getY(Number(item[valueKey]) || 0),
        value: Number(item[valueKey]) || 0,
        label: item[labelKey],
    }));

    const linePath = points
        .map((point, index) =>
            index === 0
                ? `M ${point.x} ${point.y}`
                : `L ${point.x} ${point.y}`
        )
        .join(' ');

    const areaPath = `
        ${linePath}
        L ${points[points.length - 1].x} ${height - padding.bottom}
        L ${points[0].x} ${height - padding.bottom}
        Z
    `;

    return (
        <div className="w-full overflow-hidden">
            <svg
                viewBox={`0 0 ${width} ${height}`}
                className="h-auto w-full"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient
                        id="area-chart-gradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop
                            offset="0%"
                            stopColor={fillColor}
                            stopOpacity="0.35"
                        />
                        <stop
                            offset="100%"
                            stopColor={fillColor}
                            stopOpacity="0"
                        />
                    </linearGradient>
                </defs>

                {/* Horizontal grid */}
                {[0, 0.25, 0.5, 0.75, 1].map((position) => {
                    const y =
                        padding.top +
                        chartHeight * position;

                    return (
                        <line
                            key={position}
                            x1={padding.left}
                            x2={width - padding.right}
                            y1={y}
                            y2={y}
                            stroke="currentColor"
                            strokeOpacity="0.08"
                        />
                    );
                })}

                {/* Area */}
                <path
                    d={areaPath}
                    fill="url(#area-chart-gradient)"
                />

                {/* Line */}
                <path
                    d={linePath}
                    fill="none"
                    stroke={lineColor}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Points */}
                {points.map((point, index) => (
                    <circle
                        key={index}
                        cx={point.x}
                        cy={point.y}
                        r="4"
                        fill={lineColor}
                    />
                ))}

                {/* Labels */}
                {showLabels &&
                    points.map((point, index) => (
                        <text
                            key={index}
                            x={point.x}
                            y={height - 10}
                            textAnchor="middle"
                            className="fill-gray-500 text-[10px]"
                        >
                            {point.label}
                        </text>
                    ))}
            </svg>
        </div>
    );
};

export default AreaChart;