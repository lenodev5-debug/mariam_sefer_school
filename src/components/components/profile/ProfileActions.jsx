
import { useState } from "react";
import profileService from "../../../../lib/service/profileService";

const STATUSES_BY_ROLE = {
  Student: ["active", "inactive", "graduated", "transferred"],
  Teacher: ["active", "inactive", "suspended", "resigned"],
  Parent: ["active", "inactive", "suspended"],
  Librarian: ["active", "inactive", "suspended"],
  Admin: ["active", "inactive", "suspended"],
  User: ["active", "inactive", "suspended"],
}
;

export default function ProfileActions({
  profile,
  onEdit,
  onDeleted,
  onStatusChanged,
  showEdit = true,
  showDelete = true,
  showStatus = false,
}) {
  const [loading, setLoading] = useState(false);

  if (!profile || (!profile._id && !profile.id)) return null;

  const id = profile._id || profile.id;
  const role = profile.role || "User";
  const currentStatus = profile.status || "active";
  const statuses = STATUSES_BY_ROLE[role] ?? STATUSES_BY_ROLE.User;

  const stop = (e) => e.stopPropagation();

  const handleStatusChange = async (e) => {
    e.stopPropagation();
    const status = e.target.value;
    if (status === currentStatus) return;
    setLoading(true);
    try {
      await profileService.changeStatus(role, id, status);
      onStatusChanged?.(id, status);
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to change status");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!window.confirm(`Delete ${profile.name ?? profile.email}?`)) return;
    setLoading(true);
    try {
      await profileService.remove(role, id);
      onDeleted?.(id);
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to delete");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-end gap-1.5"
      onClick={stop}
    >
      {showStatus && (
        <select
          disabled={loading}
          value={currentStatus}
          onChange={handleStatusChange}
          onClick={stop}
          className="h-7 rounded border border-gray-200 bg-white px-1.5 text-xs capitalize text-gray-700 outline-none focus:border-[#14b8a6] dark:border-[#2a2a2a] dark:bg-[#1f1f1f] dark:text-gray-200"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      )}

      {showEdit && (
        <button
          disabled={loading}
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.(profile);
          }}
          className="h-7 rounded border border-gray-200 bg-white px-2 text-xs font-medium text-gray-700 transition hover:border-[#14b8a6] hover:text-[#0f766e] disabled:opacity-50 dark:border-[#2a2a2a] dark:bg-[#1f1f1f] dark:text-gray-200 dark:hover:border-[#14b8a6]"
        >
          Edit
        </button>
      )}

      {showDelete && (
        <button
          disabled={loading}
          onClick={handleDelete}
          className="h-7 rounded border border-gray-200 bg-white px-2 text-xs font-medium text-red-600 transition hover:border-red-400 hover:bg-red-50 disabled:opacity-50 dark:border-[#2a2a2a] dark:bg-[#1f1f1f] dark:text-red-400 dark:hover:bg-[#2a1414]"
        >
          Delete
        </button>
      )}
    </div>
  );
}