import { useState } from "react";
import { ProfileList } from "../../../../components/profile";

const ROLES = ["Student", "Teacher", "Parent", "Librarian", "Admin", "User"];

export default function Users() {
  const [role, setRole] = useState("Student");

  const handleEdit = (profile) => {
    console.log("edit profile:", profile);
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">
          {role}s
        </h1>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="text-sm border rounded-md px-3 py-1.5 bg-white"
        >
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* key forces remount so data refetches when role changes */}
      <ProfileList key={role} role={role} onEdit={handleEdit} />
    </div>
  );
}