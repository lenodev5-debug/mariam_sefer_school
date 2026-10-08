export default function ProfileAvatar({ user, size = 28 }) {
  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ||
    user?.email?.[0]?.toUpperCase() ||
    "U";

  if (user?.image) {
    return (
      <img
        src={user.image}
        alt={user.name ?? user.email}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className="flex items-center justify-center rounded-full bg-[#14b8a6]/15 font-semibold text-[#0f766e] dark:bg-[#14b8a6]/20 dark:text-[#5eead4]"
      style={{ width: size, height: size, fontSize: size / 2.4 }}
    >
      {initials}
    </div>
  );
}