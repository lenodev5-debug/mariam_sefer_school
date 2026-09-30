export default function BarChart({ data }) {
    const maxValue = Math.max(1, ...data.map((d) => d.value));

    return (
        <div className="mt-6 flex h-32 items-end justify-between gap-2">
            {data.map((d, i) => {
                const height =
                    maxValue === 0 ? 0 : (d.value / maxValue) * 100;

                const color =
                    i % 2 === 0 ? 'bg-indigo-500' : 'bg-green-500';

                return (
                    <div
                        key={i}
                        className="flex flex-1 flex-col items-center gap-2"
                    >
                        <div className="flex h-24 w-full items-end">
                            <div
                                className={`w-full rounded-md ${color}`}
                                style={{
                                    height: `${Math.max(
                                        height,
                                        d.value > 0 ? 8 : 4
                                    )}%`,
                                }}
                            />
                        </div>
                        <span className="text-[10px] text-gray-500">
                            {d.label}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}