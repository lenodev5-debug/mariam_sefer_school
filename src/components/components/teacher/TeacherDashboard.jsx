import { useAuth } from "../../../context/AuthContext";


export default function TeacherDashboard() {
  const { user } = useAuth();

  const teacherName = user?.name || "Teacher";
  const teacherEmail = user?.email || "";
  const teacherImage = user?.image;

  const initials = teacherName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const status = user?.status || "active";
  const role = user?.role || "Teacher";

  return (
    <div className="min-h-screen w-full overflow-hidden bg-[#f7f6f5] px-5 pb-10 pt-24 md:px-7 md:pt-28 dark:bg-[#0E0E0E]">
      
    </div>
  );
}