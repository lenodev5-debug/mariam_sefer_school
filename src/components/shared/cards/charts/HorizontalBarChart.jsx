export default function HorizontalBarChart({ rows }) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  const ticks = 5;

  return (
    <div className="w-full space-y-5">
      <div className="flex items-center gap-4">
        {rows.map((r) => (
          <div
            key={r.label}
            className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300"
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: r.color }}
            />
            {r.label}
          </div>
        ))}
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-0 flex justify-between">
          {Array.from({ length: ticks + 1 }).map((_, i) => (
            <div
              key={i}
              className="h-full w-px bg-gray-100 dark:bg-white/5"
            />
          ))}
        </div>

        <div className="relative space-y-5 py-2">
          {rows.map((r) => {
            const pct = (r.value / max) * 100;
            return (
              <div key={r.label} className="relative">
                <div className="h-10 w-full rounded-md">
                  <div
                    className="flex h-full items-center justify-end rounded-md pr-2 text-[11px] font-semibold text-white transition-all duration-700"
                    style={{
                      width: `${pct}%`,
                      minWidth: r.value > 0 ? 32 : 0,
                      background: r.color,
                    }}
                  >
                    {r.value > 0 && r.value}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-3 flex justify-between text-[10px] text-gray-400 dark:text-gray-500">
          {Array.from({ length: ticks + 1 }).map((_, i) => (
            <span key={i}>{Math.round((max / ticks) * i)}</span>
          ))}
        </div>
      </div>
    </div>
  );
}