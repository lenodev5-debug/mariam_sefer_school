export default function DonutChart({
  active,
  inactive,
  value,
  total: totalProp,
  color = '#818cf8',
  inactiveColor = '#38bdf8',
  label,
  activeLabel = 'Active',
  inactiveLabel = 'Inactive',
  size = 110,
  stroke = 10,
}) {
  if (value !== undefined) {
    const r = (size - stroke) / 2;
    const c = 2 * Math.PI * r;
    const pct = totalProp === 0 ? 0 : value / totalProp;
    const len = pct * c;

    // 100% → draw a single solid ring (no dash gaps/caps artifacts)
    const isFull = pct >= 0.999;

    return (
      <div className="flex flex-col items-center gap-3">
        <div className="relative" style={{ width: size, height: size }}>
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="-rotate-90"
          >
            {/* Track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              stroke="currentColor"
              strokeWidth={stroke}
              fill="none"
              className="text-gray-100 dark:text-white/10"
            />

            {/* Progress */}
            {isFull ? (
              <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                stroke={color}
                strokeWidth={stroke}
                fill="none"
              />
            ) : (
              <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                stroke={color}
                strokeWidth={stroke}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${len} ${c - len}`}
                className="transition-all duration-700"
              />
            )}
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {Math.round(pct * 100)}%
            </span>
          </div>
        </div>

        {label && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {label}
          </span>
        )}
      </div>
    );
  }

  /* ============================================================
   * TWO-SEGMENT MODE (unchanged)
   * ============================================================ */
  const total = active + inactive;
  const activePct = total ? active / total : 0;
  const inactivePct = total ? inactive / total : 0;

  const radius = 70;
  const strokeW = 22;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg
          width="180"
          height="180"
          viewBox="0 0 180 180"
          className="-rotate-90"
        >
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="#262626"
            strokeWidth={strokeW}
          />
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke={inactiveColor}
            strokeWidth={strokeW}
            strokeDasharray={`${inactivePct * circumference} ${circumference}`}
            strokeLinecap="butt"
          />
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeW}
            strokeDasharray={`${activePct * circumference} ${circumference}`}
            strokeDashoffset={`-${inactivePct * circumference}`}
            strokeLinecap="butt"
          />
        </svg>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs text-gray-400">Total</span>
          <span className="text-lg font-bold text-white">{total}</span>
        </div>
      </div>

      <div className="mt-4 flex w-full justify-around text-xs">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-indigo-400" />
          <div>
            <p className="text-gray-400">{activeLabel}</p>
            <p className="font-semibold text-white">{active}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-sky-400" />
          <div>
            <p className="text-gray-400">{inactiveLabel}</p>
            <p className="font-semibold text-white">{inactive}</p>
          </div>
        </div>
      </div>
    </div>
  );
}