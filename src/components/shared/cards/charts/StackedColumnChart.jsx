export default function StackedColumnChart({ columns }) {
  const max = Math.max(
    1,
    ...columns.map((c) =>
      c.segments.reduce((s, seg) => s + seg.value, 0)
    )
  );
  const totalAll = columns.reduce(
    (s, c) => s + c.segments.reduce((a, b) => a + b.value, 0),
    0
  );

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        {columns[0]?.segments.map((seg) => (
          <div
            key={seg.label}
            className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300"
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: seg.color }}
            />
            {seg.label}
          </div>
        ))}
      </div>

      <div className="flex h-[220px] items-end justify-around gap-4">
        {columns.map((col) => {
          const total = col.segments.reduce(
            (s, seg) => s + seg.value,
            0
          );
          const totalPct = total / max;

          return (
            <div
              key={col.label}
              className="flex flex-1 flex-col items-center gap-2"
            >
              <div
                className="flex w-full max-w-[80px] flex-col justify-end overflow-hidden rounded-t-md"
                style={{ height: 200 }}
              >
                <div
                  className="flex w-full flex-col justify-end transition-all duration-700"
                  style={{ height: `${totalPct * 100}%` }}
                >
                  {col.segments
                    .slice()
                    .reverse()
                    .map((seg) => {
                      const h =
                        total === 0
                          ? 0
                          : (seg.value / total) * 100;
                      return (
                        <div
                          key={seg.label}
                          className="flex w-full items-center justify-center text-[10px] font-semibold text-white"
                          style={{
                            height: `${h}%`,
                            background: seg.color,
                          }}
                        >
                          {seg.value > 0 &&
                            totalAll > 0 &&
                            h > 14 &&
                            `${Math.round(
                              (seg.value / totalAll) * 100
                            )}%`}
                        </div>
                      );
                    })}
                </div>
              </div>
              <span className="text-[10px] text-gray-500 dark:text-gray-400">
                {col.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}