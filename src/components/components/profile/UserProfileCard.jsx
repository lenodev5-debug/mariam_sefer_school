
import ProfileAvatar from "./ProfileAvatar";
import ProfileFields from "./ProfileFields";
import ProfileActions from "./ProfileActions";
import StatusBadge from "./StatusBadge";

export default function UserProfileCard({
  profile,
  variant = "card",
  onEdit,
  onDeleted,
  onStatusChanged,
  showActions = true,
}) {
  if (!profile || (!profile._id && !profile.id)) {
    return (
      <div className="rounded-2xl bg-white p-4 text-sm text-gray-400 shadow-sm dark:bg-[#1B1A1A]">
        Profile unavailable
      </div>
    );
  }

  /* ---------- COMPACT ---------- */
  if (variant === "compact") {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 transition hover:bg-gray-50 dark:border-gray-800 dark:bg-[#1B1A1A] dark:hover:bg-[#232222]">
        <ProfileAvatar user={profile} size={40} />

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-800 dark:text-gray-100">
            {profile.name ?? "Unnamed"}
          </p>
          <p className="truncate text-xs text-gray-500">{profile.email}</p>
        </div>

        <StatusBadge status={profile.status || "inactive"} />

        {showActions && (
          <ProfileActions
            profile={profile}
            onEdit={onEdit}
            onDeleted={onDeleted}
            onStatusChanged={onStatusChanged}
          />
        )}
      </div>
    );
  }

  /* ---------- CARD (default) ---------- */
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md dark:bg-[#1B1A1A]">
      <div className="flex items-start gap-4">
        <ProfileAvatar user={profile} size={64} />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold text-gray-800 dark:text-gray-100">
                {profile.name ?? "Unnamed User"}
              </h3>
              <p className="truncate text-sm text-gray-500">{profile.email}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-[#d8f0f0] bg-[#eefafa] px-2.5 py-0.5 text-xs font-medium text-[#0f2424] dark:border-[#143232] dark:bg-[#0f2424] dark:text-[#7adcdc]">
                {profile.role ?? "User"}
              </span>
              <StatusBadge status={profile.status || "inactive"} />
            </div>
          </div>

          <div className="mt-4">
            <ProfileFields profile={profile} />
          </div>

          {showActions && (
            <div className="mt-5 flex justify-end border-t border-gray-100 pt-4 dark:border-gray-800">
              <ProfileActions
                profile={profile}
                onEdit={onEdit}
                onDeleted={onDeleted}
                onStatusChanged={onStatusChanged}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}