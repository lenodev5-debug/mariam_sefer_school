import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCheckCircle,
  faCircle,
  faArrowLeft,
  faEllipsisVertical,
  faUserGraduate,
  faChartLine,
  faCalendarCheck,
  faTrophy,
  faBookOpen,
  faArrowTrendUp,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */

const initialStudents = [
  {
    id: 1,
    name: "Marke Angel",
    photo: "https://i.pravatar.cc/100?img=1",
    idNumber: "245690",
    year: 2019,
    marks: 1440,
    rank: "98.95%",
    active: true,
  },
  {
    id: 2,
    name: "Angel Korrea",
    photo: "https://i.pravatar.cc/100?img=5",
    idNumber: "245691",
    year: 2020,
    marks: 1225,
    rank: "94.20%",
    active: true,
  },
  {
    id: 3,
    name: "Lucifer Zen",
    photo: "https://i.pravatar.cc/100?img=12",
    idNumber: "245692",
    year: 2018,
    marks: 875,
    rank: "82.40%",
    active: true,
  },
  {
    id: 4,
    name: "Trent Boult",
    photo: "https://i.pravatar.cc/100?img=15",
    idNumber: "245693",
    year: 2019,
    marks: 1230,
    rank: "91.70%",
    active: true,
  },
  {
    id: 5,
    name: "Droid Man",
    photo: "https://i.pravatar.cc/100?img=33",
    idNumber: "245694",
    year: 2021,
    marks: 1160,
    rank: "88.60%",
    active: true,
  },
];

/* ─────────────────────────────────────────
   MAIN
───────────────────────────────────────── */

export default function ListUser() {
  const [students, setStudents] = useState(initialStudents);
  const [activeTab, setActiveTab] = useState("Today");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const tabs = ["Today", "Week", "Month", "Year"];

  /* Toggle student status */
  const toggleActive = (id) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id
          ? { ...student, active: !student.active }
          : student
      )
    );

    setOpenMenuId(null);

    setSelectedUser((current) => {
      if (!current || current.id !== id) return current;

      return {
        ...current,
        active: !current.active,
      };
    });
  };

  /* Delete student */
  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
    setOpenMenuId(null);

    if (selectedUser?.id === id) {
      setSelectedUser(null);
    }
  };

  /* Open details */
  const openDetails = (student) => {
    setOpenMenuId(null);
    setSelectedUser(student);
  };

  /* ───────────────────────────────────────
     DETAIL VIEW
  ─────────────────────────────────────── */

  if (selectedUser) {
    return (
      <UserDetails
        user={selectedUser}
        onBack={() => setSelectedUser(null)}
        onToggleStatus={() => toggleActive(selectedUser.id)}
      />
    );
  }

  /* ───────────────────────────────────────
     LIST VIEW
  ─────────────────────────────────────── */

  return (
    <div className="w-full rounded-3xl bg-white p-5 shadow-sm ring-1 ring-gray-100 transition-colors duration-300 md:p-6 dark:bg-[#181818] dark:ring-[#252525]">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
            Students
          </p>

          <h2 className="mt-1 text-xl font-bold tracking-tight text-[#171717] dark:text-white">
            Top Performers
          </h2>
        </div>

        <button
          type="button"
          className="rounded-xl bg-gray-100 px-4 py-2 text-xs font-semibold text-[#171717] transition hover:bg-gray-200 dark:bg-[#252525] dark:text-white dark:hover:bg-[#303030]"
        >
          Full Chart
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-5 flex gap-6 overflow-x-auto border-b border-gray-100 dark:border-[#292929]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`relative whitespace-nowrap pb-3 text-xs font-semibold transition-colors ${
                isActive
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
            >
              {tab}

              {isActive && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-gray-900 dark:bg-white" />
              )}
            </button>
          );
        })}
      </div>

      {/* Desktop table header */}
      <div className="hidden grid-cols-[56px_1fr_110px_75px_85px_100px] gap-3 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 md:grid">

        <span>Photo</span>
        <span>Name</span>
        <span>ID Number</span>
        <span className="text-center">Year</span>
        <span className="text-center">Marks</span>
        <span className="text-center">Rank</span>

      </div>

      {/* Students */}
      <div className="flex flex-col gap-1">

        {students.map((student) => {
          const isMenuOpen = openMenuId === student.id;

          return (
            <div
              key={student.id}
              className={`group relative rounded-2xl px-3 py-3 transition ${
                student.active
                  ? "hover:bg-gray-50 dark:hover:bg-[#202020]"
                  : "opacity-50 hover:bg-gray-50 dark:hover:bg-[#202020]"
              }`}
            >

              {/* Desktop */}
              <div className="hidden grid-cols-[56px_1fr_110px_75px_85px_100px] items-center gap-3 md:grid">

                {/* Photo */}
                <button
                  type="button"
                  onClick={() => openDetails(student)}
                  className="relative w-fit"
                >
                  <img
                    src={student.photo}
                    alt={student.name}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-white dark:ring-[#181818]"
                  />

                  <span
                    className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white dark:border-[#181818] ${
                      student.active
                        ? "bg-emerald-500"
                        : "bg-gray-400"
                    }`}
                  />
                </button>

                {/* Name */}
                <button
                  type="button"
                  onClick={() => openDetails(student)}
                  className="truncate text-left text-sm font-bold text-gray-900 dark:text-white"
                >
                  {student.name}
                </button>

                {/* ID */}
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {student.idNumber}
                </span>

                {/* Year */}
                <span className="text-center text-xs font-medium text-gray-700 dark:text-gray-300">
                  {student.year}
                </span>

                {/* Marks */}
                <span className="text-center text-xs font-bold text-gray-900 dark:text-white">
                  {String(student.marks).padStart(4, "0")}
                </span>

                {/* Rank */}
                <div className="relative flex justify-center">

                  <button
                    type="button"
                    onClick={() =>
                      setOpenMenuId(isMenuOpen ? null : student.id)
                    }
                    className="flex items-center gap-2 rounded-xl bg-blue-50 px-3 py-1.5 text-[10px] font-bold text-blue-600 transition hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20"
                  >
                    {student.rank}

                    <FontAwesomeIcon
                      icon={faEllipsisVertical}
                      className="text-[9px]"
                    />
                  </button>

                  {isMenuOpen && (
                    <StudentMenu
                      student={student}
                      onView={() => openDetails(student)}
                      onToggle={() => toggleActive(student.id)}
                      onDelete={() => deleteStudent(student.id)}
                    />
                  )}

                </div>
              </div>

              {/* Mobile */}
              <div className="flex items-center gap-3 md:hidden">

                <button
                  type="button"
                  onClick={() => openDetails(student)}
                  className="relative shrink-0"
                >
                  <img
                    src={student.photo}
                    alt={student.name}
                    className="h-11 w-11 rounded-full object-cover"
                  />

                  <span
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-[#181818] ${
                      student.active
                        ? "bg-emerald-500"
                        : "bg-gray-400"
                    }`}
                  />
                </button>

                <button
                  type="button"
                  onClick={() => openDetails(student)}
                  className="min-w-0 flex-1 text-left"
                >
                  <p className="truncate text-sm font-bold text-gray-900 dark:text-white">
                    {student.name}
                  </p>

                  <p className="mt-0.5 text-[10px] text-gray-400">
                    ID {student.idNumber} · {student.year}
                  </p>
                </button>

                <div className="text-right">
                  <p className="text-xs font-bold text-gray-900 dark:text-white">
                    {student.marks}
                  </p>

                  <p className="text-[10px] font-bold text-blue-500">
                    {student.rank}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setOpenMenuId(isMenuOpen ? null : student.id)
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-[#292929]"
                >
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>

                {isMenuOpen && (
                  <StudentMenu
                    student={student}
                    onView={() => openDetails(student)}
                    onToggle={() => toggleActive(student.id)}
                    onDelete={() => deleteStudent(student.id)}
                  />
                )}

              </div>

            </div>
          );
        })}

        {students.length === 0 && (
          <div className="rounded-2xl py-14 text-center">
            <FontAwesomeIcon
              icon={faUserGraduate}
              className="text-2xl text-gray-300 dark:text-gray-600"
            />

            <p className="mt-3 text-sm font-semibold text-gray-500 dark:text-gray-400">
              No students left
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Students will appear here when available.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}


/* ─────────────────────────────────────────
   STUDENT MENU
───────────────────────────────────────── */

function StudentMenu({
  student,
  onView,
  onToggle,
  onDelete,
}) {
  return (
    <div className="absolute right-2 top-full z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-gray-100 bg-white p-1.5 shadow-xl shadow-black/10 dark:border-[#303030] dark:bg-[#222]">

      <button
        type="button"
        onClick={onView}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-gray-700 transition hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-[#2d2d2d]"
      >
        <FontAwesomeIcon
          icon={faUserGraduate}
          className="w-3 text-blue-500"
        />
        View Profile
      </button>

      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-gray-700 transition hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-[#2d2d2d]"
      >
        <FontAwesomeIcon
          icon={student.active ? faCircle : faCheckCircle}
          className={`w-3 ${
            student.active
              ? "text-gray-400"
              : "text-emerald-500"
          }`}
        />

        {student.active ? "Set Inactive" : "Set Active"}
      </button>

      <div className="my-1 border-t border-gray-100 dark:border-[#333]" />

      <button
        type="button"
        onClick={onDelete}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-red-500 transition hover:bg-red-50 dark:hover:bg-red-500/10"
      >
        <FontAwesomeIcon
          icon={faTrash}
          className="w-3"
        />
        Delete Student
      </button>

    </div>
  );
}


/* ─────────────────────────────────────────
   USER DETAILS
───────────────────────────────────────── */

function UserDetails({
  user,
  onBack,
}) {
  const attendance = 92;

  const average = Math.min(
    100,
    Math.round((user.marks / 1500) * 100)
  );

  const subjects = [
    {
      name: "Mathematics",
      score: 94,
      grade: "A",
    },
    {
      name: "English",
      score: 89,
      grade: "A-",
    },
    {
      name: "Biology",
      score: 91,
      grade: "A",
    },
    {
      name: "Physics",
      score: 84,
      grade: "B+",
    },
    {
      name: "Chemistry",
      score: 87,
      grade: "A-",
    },
  ];

  return (
    <div className="w-full space-y-5">

      {/* ───────────────── TOP BAR ───────────────── */}

      <div className="flex flex-wrap items-center justify-between gap-3">

        <button
          type="button"
          onClick={onBack}
          className="group flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-semibold text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-[#202020] dark:hover:text-white"
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="transition-transform group-hover:-translate-x-1"
          />

          Back to Users
        </button>

        <div className="flex items-center gap-2">

          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 dark:border-[#303030] dark:bg-[#1a1a1a] dark:text-gray-200 dark:hover:bg-[#222]"
          >
            <FontAwesomeIcon icon={faPen} />
            Edit Profile
          </button>

          <button
            type="button"
            className="rounded-xl bg-gray-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-black dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            More
          </button>

        </div>
      </div>


      {/* ───────────────── PROFILE HERO ───────────────── */}

      <section className="relative overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100 dark:bg-[#181818] dark:ring-[#252525]">

        {/* Decorative background */}
        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-r from-blue-500/10 via-indigo-500/10 to-emerald-500/10" />

        <div className="relative flex flex-col gap-6 p-6 md:p-7 lg:flex-row lg:items-center lg:justify-between">

          {/* Profile */}
          <div className="flex items-center gap-5">

            <div className="relative shrink-0">

              <div className="rounded-full bg-white p-1.5 shadow-xl dark:bg-[#181818]">
                <img
                  src={user.photo}
                  alt={user.name}
                  className="h-24 w-24 rounded-full object-cover md:h-28 md:w-28"
                />
              </div>

              <span
                className={`absolute bottom-3 right-3 h-4 w-4 rounded-full border-[3px] border-white dark:border-[#181818] ${
                  user.active
                    ? "bg-emerald-500"
                    : "bg-gray-400"
                }`}
              />

            </div>

            <div className="min-w-0">

              <div className="mb-2 flex flex-wrap items-center gap-2">

                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  Student
                </span>

                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    user.active
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                      : "bg-gray-100 text-gray-500 dark:bg-gray-500/10 dark:text-gray-400"
                  }`}
                >
                  {user.active ? "Active" : "Inactive"}
                </span>

              </div>

              <h1 className="truncate text-2xl font-bold tracking-tight text-gray-900 dark:text-white md:text-3xl">
                {user.name}
              </h1>

              <p className="mt-1 text-sm text-gray-400">
                Student ID #{user.idNumber}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 dark:text-gray-400">

                <span>
                  Grade{" "}
                  <strong className="text-gray-700 dark:text-gray-200">
                    10
                  </strong>
                </span>

                <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" />

                <span>
                  Section{" "}
                  <strong className="text-gray-700 dark:text-gray-200">
                    A
                  </strong>
                </span>

                <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" />

                <span>
                  Academic Year{" "}
                  <strong className="text-gray-700 dark:text-gray-200">
                    {user.year}
                  </strong>
                </span>

              </div>

            </div>
          </div>


          {/* Header statistics */}
          <div className="grid grid-cols-3 gap-5 border-t border-gray-100 pt-5 sm:gap-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 dark:border-[#292929]">

            <MiniStat
              label="Rank"
              value={`#${user.id}`}
            />

            <MiniStat
              label="Average"
              value={`${average}%`}
            />

            <MiniStat
              label="Attendance"
              value={`${attendance}%`}
            />

          </div>

        </div>
      </section>


      {/* ───────────────── KPI CARDS ───────────────── */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Marks"
          value={String(user.marks).padStart(4, "0")}
          subtitle="Across all subjects"
          icon={faBookOpen}
          iconClass="bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
          trend="+8.4%"
        />

        <StatCard
          title="Academic Average"
          value={`${average}%`}
          subtitle="Current performance"
          icon={faChartLine}
          iconClass="bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
          trend="+4.2%"
        />

        <StatCard
          title="Attendance"
          value={`${attendance}%`}
          subtitle="This academic year"
          icon={faCalendarCheck}
          iconClass="bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400"
          trend="+2.1%"
        />

        <StatCard
          title="Class Rank"
          value={`#${user.id}`}
          subtitle="Current position"
          icon={faTrophy}
          iconClass="bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400"
          trend="Top 10%"
        />

      </div>


      {/* ───────────────── BENTO GRID ───────────────── */}

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">

        {/* ═══════════════════════════════
            PERFORMANCE CHART
        ═══════════════════════════════ */}

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 xl:col-span-2 dark:bg-[#181818] dark:ring-[#252525]">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
                Academic Performance
              </p>

              <h2 className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
                Performance Overview
              </h2>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2 dark:bg-[#222]">

              <span className="h-2 w-2 rounded-full bg-blue-500" />

              <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400">
                Average score
              </span>

            </div>

          </div>


          <div className="mt-7 flex h-67.5">

            <div className="flex w-8 flex-col justify-between pb-8 text-[10px] text-gray-400">
              <span>100</span>
              <span>80</span>
              <span>60</span>
              <span>40</span>
              <span>20</span>
              <span>0</span>
            </div>

            <div className="relative flex-1">

              {/* Grid */}
              <div className="absolute inset-0 bottom-8 flex flex-col justify-between">

                {[100, 80, 60, 40, 20, 0].map((value) => (
                  <div
                    key={value}
                    className="border-t border-dashed border-gray-100 dark:border-[#292929]"
                  />
                ))}

              </div>

              <svg
                viewBox="0 0 600 220"
                preserveAspectRatio="none"
                className="relative h-55 w-full"
              >

                <defs>
                  <linearGradient
                    id="performanceFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#3b82f6"
                      stopOpacity="0.22"
                    />

                    <stop
                      offset="100%"
                      stopColor="#3b82f6"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>

                <path
                  d="M0,150 C55,125 75,140 120,110 C170,75 190,125 235,100 C280,75 300,95 350,65 C405,30 430,80 470,52 C520,20 550,42 600,18 L600,220 L0,220 Z"
                  fill="url(#performanceFill)"
                />

                <path
                  d="M0,150 C55,125 75,140 120,110 C170,75 190,125 235,100 C280,75 300,95 350,65 C405,30 430,80 470,52 C520,20 550,42 600,18"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {[0, 120, 235, 350, 470, 600].map(
                  (x, index) => {
                    const y = [
                      150,
                      110,
                      100,
                      65,
                      52,
                      18,
                    ][index];

                    return (
                      <circle
                        key={x}
                        cx={x}
                        cy={y}
                        r="4"
                        fill="#3b82f6"
                        stroke="white"
                        strokeWidth="2"
                      />
                    );
                  }
                )}

              </svg>


              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] text-gray-400">
                <span>Term 1</span>
                <span>Term 2</span>
                <span>Mid Year</span>
                <span>Term 3</span>
                <span>Final</span>
              </div>

            </div>
          </div>
        </div>


        {/* ═══════════════════════════════
            ATTENDANCE
        ═══════════════════════════════ */}

        <div className="rounded-3xl bg-gray-900 p-6 text-white shadow-sm dark:bg-[#202020]">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
                Attendance
              </p>

              <h2 className="mt-1 text-lg font-bold">
                Attendance Overview
              </h2>
            </div>

            <FontAwesomeIcon
              icon={faCalendarCheck}
              className="text-white/30"
            />

          </div>


          <div className="mt-7 flex justify-center">

            <div className="relative h-44 w-44">

              <svg
                viewBox="0 0 120 120"
                className="h-full w-full -rotate-90"
              >

                <circle
                  cx="60"
                  cy="60"
                  r="48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="10"
                  className="text-white/10"
                />

                <circle
                  cx="60"
                  cy="60"
                  r="48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray="301.6"
                  strokeDashoffset={
                    301.6 * (1 - attendance / 100)
                  }
                  className="text-emerald-400"
                />

              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">

                <span className="text-4xl font-bold">
                  {attendance}%
                </span>

                <span className="mt-1 text-[10px] text-white/40">
                  Overall attendance
                </span>

              </div>

            </div>
          </div>


          <div className="mt-5 grid grid-cols-3 gap-2">

            <AttendanceItem
              label="Present"
              value="168"
            />

            <AttendanceItem
              label="Absent"
              value="10"
            />

            <AttendanceItem
              label="Late"
              value="4"
            />

          </div>

        </div>


        {/* ═══════════════════════════════
            SUBJECT PERFORMANCE
        ═══════════════════════════════ */}

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 xl:col-span-2 dark:bg-[#181818] dark:ring-[#252525]">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
                Academic Results
              </p>

              <h2 className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
                Subject Performance
              </h2>
            </div>

            <button
              type="button"
              className="text-xs font-semibold text-blue-500 hover:text-blue-600"
            >
              View all
            </button>

          </div>


          <div className="mt-6 space-y-5">

            {subjects.map((subject) => (
              <SubjectRow
                key={subject.name}
                name={subject.name}
                score={subject.score}
                grade={subject.grade}
              />
            ))}

          </div>

        </div>


        {/* ═══════════════════════════════
            STUDENT STATUS
        ═══════════════════════════════ */}

        <div className="rounded-3xl bg-linear-to-br from-blue-600 to-indigo-600 p-6 text-white shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
                Student Status
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                {user.active
                  ? "Active Student"
                  : "Inactive Student"}
              </h2>
            </div>

            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              <FontAwesomeIcon icon={faUserGraduate} />
            </span>

          </div>


          <p className="mt-3 text-sm leading-relaxed text-white/65">
            Student is currently enrolled and participating
            in the academic program.
          </p>


          <div className="mt-7 space-y-4 border-t border-white/10 pt-5">

            <InfoLine
              label="Enrollment Year"
              value={user.year}
            />

            <InfoLine
              label="Current Grade"
              value="Grade 10 - A"
            />

            <InfoLine
              label="Student ID"
              value={user.idNumber}
            />

          </div>

        </div>


        {/* ═══════════════════════════════
            STUDENT INFORMATION
        ═══════════════════════════════ */}

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 xl:col-span-2 dark:bg-[#181818] dark:ring-[#252525]">

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
              Profile
            </p>

            <h2 className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
              Student Information
            </h2>
          </div>


          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">

            <InfoItem
              label="Full Name"
              value={user.name}
            />

            <InfoItem
              label="Student ID"
              value={user.idNumber}
            />

            <InfoItem
              label="Grade Level"
              value="Grade 10"
            />

            <InfoItem
              label="Section"
              value="Section A"
            />

            <InfoItem
              label="Academic Year"
              value={user.year}
            />

            <InfoItem
              label="Enrollment Status"
              value={user.active ? "Active" : "Inactive"}
            />

          </div>

        </div>


        {/* ═══════════════════════════════
            RECENT ACTIVITY
        ═══════════════════════════════ */}

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 dark:bg-[#181818] dark:ring-[#252525]">

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
              Activity
            </p>

            <h2 className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
              Recent Activity
            </h2>
          </div>


          <div className="mt-6 space-y-5">

            <ActivityItem
              title="Mathematics exam completed"
              description="Score recorded: 94%"
              time="Today"
              icon={faCheckCircle}
              iconClass="bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
            />

            <ActivityItem
              title="Attendance marked"
              description="Present for today's class"
              time="Today"
              icon={faCalendarCheck}
              iconClass="bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
            />

            <ActivityItem
              title="Biology assignment submitted"
              description="Cell Biology — Unit 2"
              time="Yesterday"
              icon={faArrowTrendUp}
              iconClass="bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400"
            />

            <ActivityItem
              title="Teacher feedback"
              description="Positive academic progress"
              time="2 days ago"
              icon={faTrophy}
              iconClass="bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400"
            />

          </div>

        </div>

      </div>
    </div>
  );
}


/* ─────────────────────────────────────────
   MINI STAT
───────────────────────────────────────── */

function MiniStat({ label, value }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}


/* ─────────────────────────────────────────
   STAT CARD
───────────────────────────────────────── */

function StatCard({
  title,
  value,
  subtitle,
  icon,
  iconClass,
  trend,
}) {
  return (
    <div className="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 transition duration-200 hover:-translate-y-0.5 hover:shadow-md dark:bg-[#181818] dark:ring-[#252525]">

      <div className="flex items-start justify-between">

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm ${iconClass}`}
        >
          <FontAwesomeIcon icon={icon} />
        </div>

        <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
          {trend}
        </span>

      </div>


      <p className="mt-5 text-xs font-medium text-gray-400">
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {value}
      </p>

      <p className="mt-1 text-[10px] text-gray-400">
        {subtitle}
      </p>

    </div>
  );
}


/* ─────────────────────────────────────────
   ATTENDANCE ITEM
───────────────────────────────────────── */

function AttendanceItem({ label, value }) {
  return (
    <div className="rounded-xl bg-white/5 p-3 text-center">

      <p className="text-lg font-bold">
        {value}
      </p>

      <p className="mt-1 text-[9px] uppercase tracking-wider text-white/40">
        {label}
      </p>

    </div>
  );
}


/* ─────────────────────────────────────────
   SUBJECT ROW
───────────────────────────────────────── */

function SubjectRow({
  name,
  score,
  grade,
}) {
  return (
    <div>

      <div className="mb-2 flex items-center justify-between gap-3">

        <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">
          {name}
        </p>

        <div className="flex items-center gap-3">

          <span className="text-xs font-bold text-gray-700 dark:text-gray-200">
            {score}%
          </span>

          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-[10px] font-bold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            {grade}
          </span>

        </div>

      </div>

      <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-[#292929]">

        <div
          className="h-full rounded-full bg-blue-500 transition-all duration-700"
          style={{
            width: `${score}%`,
          }}
        />

      </div>

    </div>
  );
}


/* ─────────────────────────────────────────
   INFO ITEM
───────────────────────────────────────── */

function InfoItem({
  label,
  value,
}) {
  return (
    <div className="rounded-2xl bg-gray-50 p-4 dark:bg-[#202020]">

      <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
        {label}
      </p>

      <p className="mt-1 truncate text-sm font-semibold text-gray-800 dark:text-gray-200">
        {value}
      </p>

    </div>
  );
}


/* ─────────────────────────────────────────
   INFO LINE
───────────────────────────────────────── */

function InfoLine({
  label,
  value,
}) {
  return (
    <div className="flex items-center justify-between gap-4 text-xs">

      <span className="text-white/50">
        {label}
      </span>

      <span className="font-semibold text-white">
        {value}
      </span>

    </div>
  );
}


/* ─────────────────────────────────────────
   ACTIVITY ITEM
───────────────────────────────────────── */

function ActivityItem({
  title,
  description,
  time,
  icon,
  iconClass,
}) {
  return (
    <div className="flex gap-3">

      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs ${iconClass}`}
      >
        <FontAwesomeIcon icon={icon} />
      </div>


      <div className="min-w-0 flex-1">

        <div className="flex items-start justify-between gap-2">

          <p className="text-xs font-bold text-gray-800 dark:text-gray-200">
            {title}
          </p>

          <span className="shrink-0 text-[9px] text-gray-400">
            {time}
          </span>

        </div>

        <p className="mt-1 text-[10px] leading-relaxed text-gray-400">
          {description}
        </p>

      </div>

    </div>
  );
}
