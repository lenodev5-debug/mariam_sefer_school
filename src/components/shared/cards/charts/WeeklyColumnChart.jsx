import { COLORS } from './chartColors';

export default function WeeklyColumnChart({ data }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  const ticks = 4;

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: COLORS.violet }}
          />
          Classes
        </div>
      </div>

      <div className="relative flex h-[220px] items-end justify-between gap-2 px-1">
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
          {Array.from({ length: ticks + 1 }).map((_, i) => (
            <div
              key={i}
              className="h-px w-full bg-gray-100 dark:bg-white/5"
            />
          ))}
        </div>

        {data.map((d) => {
          const pct = (d.value / max) * 100;
          return (
            <div
              key={d.label}
              className="relative flex flex-1 flex-col items-center gap-2"
            >
              <div className="relative flex h-[190px] w-full items-end justify-center">
                <div
                  className="w-full max-w-[28px] rounded-t-md transition-all duration-700"
                  style={{
                    height: `${pct}%`,
                    background: `linear-gradient(180deg, ${COLORS.violet}, ${COLORS.blue})`,
                  }}
                  title={`${d.value} classes`}
                />
              </div>
              <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">
                {d.label.slice(0, 3)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}