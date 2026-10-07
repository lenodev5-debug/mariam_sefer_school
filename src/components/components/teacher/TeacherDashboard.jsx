import { useAuth } from "../../../context/AuthContext";

/* ============================================================
 * Theme tokens (match other dashboards)
 * ============================================================ */
const THEME = {
  teal: "#55b6b6",
  tealHover: "#43a6a6",
  tealSoft: "#eefafa",
  tealText: "#0f2424",
  orange: "#ed7950",
  orangeSoft: "#fff4ef",
  amber: "#c78f2c",
  amberSoft: "#fdf4e3",
};

/* ============================================================
 * Stat Card
 * ============================================================ */
const StatCard = ({ icon, title, value, subtitle, iconClass, valueClass }) => (
  <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-[#1B1A1A]">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p
          className={`mt-2 text-3xl font-semibold ${
            valueClass || "text-gray-800 dark:text-gray-100"
          }`}
        >
          {value}
        </p>
        {subtitle && (
          <p className="mt-1 text-xs text-gray-400">{subtitle}</p>
        )}
      </div>
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
      >
        <span className="text-xl">{icon}</span>
      </div>
    </div>
  </div>
);

/* ============================================================
 * Workspace Card
 * ============================================================ */
const WorkspaceCard = ({ icon, title, description }) => (
  <div className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md dark:bg-[#1B1A1A]">
    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#eefafa] text-xl dark:bg-[#0f2424]">
      {icon}
    </div>

    <h3 className="font-semibold text-gray-800 dark:text-gray-100">
      {title}
    </h3>

    <p className="mt-2 text-sm leading-6 text-gray-500">
      {description}
    </p>
  </div>
);

/* ============================================================
 * Main
 * ============================================================ */
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

  const workspace = [
    {
      title: "My Classes",
      description: "View your assigned classes and sections.",
      icon: "📚",
    },
    {
      title: "My Students",
      description: "Access student information for your classes.",
      icon: "👥",
    },
    {
      title: "Attendance",
      description: "Record and review student attendance.",
      icon: "📋",
    },
    {
      title: "Assignments",
      description: "Create and manage student assignments.",
      icon: "📝",
    },
    {
      title: "Exams & Results",
      description: "Manage assessments and student results.",
      icon: "📊",
    },
    {
      title: "My Schedule",
      description: "View your teaching timetable.",
      icon: "📅",
    },
  ];

  return (
    <div className="min-h-screen w-full overflow-hidden bg-[#f7f6f5] px-5 pb-10 pt-24 md:px-7 md:pt-28 dark:bg-[#0E0E0E]">
      {/* Ambient background — matches other dashboards */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(60%_50%_at_15%_0%,#e8f5f5_0%,transparent_60%),radial-gradient(50%_45%_at_100%_10%,#fdeee4_0%,transparent_60%)] dark:bg-[radial-gradient(60%_50%_at_15%_0%,#0f2424_0%,transparent_60%),radial-gradient(50%_45%_at_100%_10%,#2a1710_0%,transparent_60%)]"
      />

      <div className="relative w-full">
        {/* ============================================================
         * HEADER
         * ============================================================ */}
        <header className="mb-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Teacher Dashboard
              </p>

              <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                Welcome back, {teacherName} 👋
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Manage your teaching activities from one place.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Notifications"
                className="relative rounded-xl border border-gray-200 bg-white p-3 text-gray-500 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-[#1B1A1A] dark:text-gray-300 dark:hover:bg-white/5"
              >
                <span className="text-xl">🔔</span>
              </button>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-2 pr-4 dark:border-gray-700 dark:bg-[#1B1A1A]">
                {teacherImage ? (
                  <img
                    src={teacherImage}
                    alt={teacherName}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#55b6b6] to-[#3a8a8a] font-semibold text-white">
                    {initials || "T"}
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {teacherName}
                  </p>
                  <p className="text-xs text-gray-400">{role}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ============================================================
         * TEACHER PROFILE
         * ============================================================ */}
        <section className="mb-6 overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-[#1B1A1A]">
          <div className="relative flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#eefafa] text-2xl dark:bg-[#0f2424]">
              👨‍🏫
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                {teacherName}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {teacherEmail || "No email available"}
              </p>

              <p className="mt-2 text-sm text-gray-400">
                Your personal teaching workspace
              </p>
            </div>

            <span
              className={`w-fit rounded-full px-3 py-1 text-xs font-medium capitalize ${
                status === "active"
                  ? "bg-emerald-500/10 text-emerald-500"
                  : status === "suspended"
                  ? "bg-red-500/10 text-red-500"
                  : "bg-gray-500/10 text-gray-500"
              }`}
            >
              {status}
            </span>
          </div>

          {/* Bottom accent bar — teal → orange */}
          <div className="h-1 w-full bg-gradient-to-r from-[#55b6b6] via-[#7adcdc] to-[#ed7950]" />
        </section>

        {/* ============================================================
         * STATS (optional, quick glance)
         * ============================================================ */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon="📚"
            title="My Classes"
            value="—"
            subtitle="Assigned classes"
            iconClass="bg-[#eefafa] text-[#0f2424] dark:bg-[#0f2424] dark:text-[#7adcdc]"
          />
          <StatCard
            icon="👥"
            title="My Students"
            value="—"
            subtitle="Across all classes"
            iconClass="bg-[#eefafa] text-[#0f2424] dark:bg-[#0f2424] dark:text-[#7adcdc]"
          />
          <StatCard
            icon="📝"
            title="Assignments"
            value="—"
            subtitle="Active this week"
            iconClass="bg-[#fff4ef] text-[#ed7950] dark:bg-[#2a1710]"
            valueClass="text-[#ed7950]"
          />
          <StatCard
            icon="📅"
            title="Schedule"
            value="—"
            subtitle="Upcoming sessions"
            iconClass="bg-[#fdf4e3] text-[#c78f2c] dark:bg-[#2a2210]"
            valueClass="text-[#c78f2c]"
          />
        </div>

        {/* ============================================================
         * WORKSPACE
         * ============================================================ */}
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Your Workspace
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Your teaching tools will appear here as we connect the relevant
              services.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {workspace.map((item) => (
              <WorkspaceCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}