import { COLORS } from './chartColors';

export default function TrendLineChart({ data, color = COLORS.blue }) {
  const w = 320;
  const h = 120;
  const pad = 8;
  const max = Math.max(1, ...data.map((d) => d.value));

  const points = data.map((d, i) => {
    const x =
      pad + (i * (w - pad * 2)) / Math.max(1, data.length - 1);
    const y = h - pad - (d.value / max) * (h - pad * 2);
    return { x, y, ...d };
  });

  const pathD = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');

  const areaD =
    `M ${points[0].x} ${h - pad} ` +
    points.map((p) => `L ${p.x} ${p.y}`).join(' ') +
    ` L ${points[points.length - 1].x} ${h - pad} Z`;

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="w-full"
        preserveAspectRatio="none"
        style={{ minHeight: 120 }}
      >
        <defs>
          <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 0.25, 0.5, 0.75, 1].map((f) => (
          <line
            key={f}
            x1={pad}
            x2={w - pad}
            y1={pad + f * (h - pad * 2)}
            y2={pad + f * (h - pad * 2)}
            stroke="currentColor"
            strokeWidth="1"
            className="text-gray-100 dark:text-white/5"
          />
        ))}

        <path d={areaD} fill="url(#trendFill)" />
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="3"
            fill="white"
            stroke={color}
            strokeWidth="2"
          />
        ))}
      </svg>

      <div className="mt-2 flex justify-between text-[10px] text-gray-400 dark:text-gray-500">
        {data.map((d) => (
          <span key={d.label}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}