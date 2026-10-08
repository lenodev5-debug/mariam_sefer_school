const fmtDate = (d) => (d ? new Date(d).toLocaleDateString() : "—");

const fmtLabel = (v) =>
  typeof v === "string" && v.includes("_")
    ? v.replace(/_/g, " ")
    : v;

function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-gray-800 capitalize dark:text-gray-200">
        {value ?? "—"}
      </p>
    </div>
  );
}

export default function ProfileFields({ profile }) {
  const renderRoleFields = () => {
    switch (profile?.role) {
      case "Teacher":
        return profile.teacherProfile ? (
          <>
            <Field label="Employee #" value={profile.teacherProfile.employeeNumber} />
            <Field label="Specialization" value={profile.teacherProfile.specialization} />
            <Field label="Hire Date" value={fmtDate(profile.teacherProfile.hireDate)} />
          </>
        ) : null;

      case "Student":
        return profile.studentProfile ? (
          <>
            <Field label="Admission #" value={profile.studentProfile.admissionNumber} />
            <Field label="Gender" value={profile.studentProfile.gender} />
            <Field label="Date of Birth" value={fmtDate(profile.studentProfile.dateOfBirth)} />
            <Field label="Address" value={profile.studentProfile.address} />
            <Field
              label="Emergency Contact"
              value={profile.studentProfile.emergencyContactName}
            />
            <Field
              label="Emergency Phone"
              value={profile.studentProfile.emergencyContactPhone}
            />
          </>
        ) : null;

      case "Parent":
        return profile.parentProfile ? (
          <>
            <Field label="Occupation" value={profile.parentProfile.occupation} />
            <Field label="Address" value={profile.parentProfile.address} />
            <Field
              label="Emergency Phone"
              value={profile.parentProfile.emergencyPhone}
            />
          </>
        ) : null;

      case "Librarian":
        return profile.librarianProfile ? (
          <>
            <Field label="Employee #" value={profile.librarianProfile.employeeNumber} />
            <Field
              label="Position"
              value={fmtLabel(profile.librarianProfile.position)}
            />
            <Field label="Hire Date" value={fmtDate(profile.librarianProfile.hireDate)} />
          </>
        ) : null;

      case "Admin":
        return profile.adminProfile ? (
          <>
            <Field label="Employee #" value={profile.adminProfile.employeeNumber} />
            <Field
              label="Position"
              value={fmtLabel(profile.adminProfile.position)}
            />
            <Field label="Hire Date" value={fmtDate(profile.adminProfile.hireDate)} />
          </>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      <Field label="Email" value={profile.email} />
      <Field label="Phone" value={profile.phone} />
      {renderRoleFields()}
    </div>
  );
}