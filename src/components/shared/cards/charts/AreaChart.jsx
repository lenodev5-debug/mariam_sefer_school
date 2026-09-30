export default function AreaChart({ data }) {
    const width = 600;
    const height = 180;
    const padding = { top: 10, right: 10, bottom: 30, left: 40 };

    const maxValue = Math.max(1, ...data.map((d) => d.value));
    const innerW = width - padding.left - padding.right;
    const innerH = height - padding.top - padding.bottom;

    const points = data.map((d, i) => {
        const x = padding.left + (i / (data.length - 1)) * innerW;
        const y = padding.top + innerH - (d.value / maxValue) * innerH;
        return { x, y, ...d };
    });

    const linePath = points
        .map((p, i) => {
            if (i === 0) return `M ${p.x} ${p.y}`;
            const prev = points[i - 1];
            const cx = (prev.x + p.x) / 2;
            return `C ${cx} ${prev.y}, ${cx} ${p.y}, ${p.x} ${p.y}`;
        })
        .join(' ');

    const areaPath = `${linePath} L ${points[points.length - 1].x} ${
        height - padding.bottom
    } L ${points[0].x} ${height - padding.bottom} Z`;

    const gridLines = [0, 0.25, 0.5, 0.75, 1];

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
            <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
            </defs>

            {gridLines.map((g, i) => {
                const y = padding.top + innerH * g;
                const value = Math.round(maxValue * (1 - g));
                return (
                    <g key={i}>
                        <line
                            x1={padding.left}
                            x2={width - padding.right}
                            y1={y}
                            y2={y}
                            stroke="#262626"
                            strokeWidth="1"
                        />
                        <text
                            x={padding.left - 8}
                            y={y + 4}
                            textAnchor="end"
                            fontSize="10"
                            fill="#6b7280"
                        >
                            {value}
                        </text>
                    </g>
                );
            })}

            {points.map((p, i) => (
                <rect
                    key={i}
                    x={p.x - 6}
                    y={p.y}
                    width={12}
                    height={height - padding.bottom - p.y}
                    fill="url(#areaGrad)"
                />
            ))}

            <path d={areaPath} fill="url(#areaGrad)" />
            <path
                d={linePath}
                fill="none"
                stroke="url(#lineGrad)"
                strokeWidth="2"
            />

            {points.map((p, i) => (
                <circle
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    r="3"
                    fill="#0f0f0f"
                    stroke="#a855f7"
                    strokeWidth="2"
                />
            ))}

            {points.map((p, i) => (
                <text
                    key={i}
                    x={p.x}
                    y={height - 8}
                    textAnchor="middle"
                    fontSize="10"
                    fill="#6b7280"
                >
                    {p.label}
                </text>
            ))}
        </svg>
    );
}