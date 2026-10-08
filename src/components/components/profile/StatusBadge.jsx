const COLORS = {
  active:
    "bg-[#dcfce7] text-[#166534] dark:bg-[#143a2a] dark:text-[#4ade80]",
  inactive:
    "bg-gray-100 text-gray-600 dark:bg-[#2a2a2a] dark:text-gray-400",
  suspended:
    "bg-red-100 text-red-700 dark:bg-[#3a1414] dark:text-red-400",
  resigned:
    "bg-orange-100 text-orange-700 dark:bg-[#3a2414] dark:text-orange-400",
  graduated:
    "bg-blue-100 text-blue-700 dark:bg-[#14243a] dark:text-blue-400",
  transferred:
    "bg-purple-100 text-purple-700 dark:bg-[#25143a] dark:text-purple-400",
};

export default function StatusBadge({ status }) {
  const cls = COLORS[status] ?? COLORS.inactive;
  return (
    <span
      className={`inline-flex h-6 items-center rounded px-2 text-xs font-medium capitalize ${cls}`}
    >
      {status || "inactive"}
    </span>
  );
}