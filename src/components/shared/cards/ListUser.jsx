import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faCheckCircle,
  faCircle,
  faArrowLeft,
  faCloud,
  faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';

/* ─────────────────── DATA ─────────────────── */
const initialStudents = [
  { id: 1, name: 'Marke Angel',  photo: 'https://i.pravatar.cc/100?img=1',  idNumber: '245690', year: 2019, marks: 1440, rank: '98.95%', active: true },
  { id: 2, name: 'Angel Korrea', photo: 'https://i.pravatar.cc/100?img=5',  idNumber: '245690', year: 2020, marks: 1225, rank: '98.95%', active: true },
  { id: 3, name: 'Lucifer Zen',  photo: 'https://i.pravatar.cc/100?img=12', idNumber: '245690', year: 2018, marks: 875,  rank: '98.95%', active: true },
  { id: 4, name: 'Trent Boult',  photo: 'https://i.pravatar.cc/100?img=15', idNumber: '245690', year: 2019, marks: 1230, rank: '98.95%', active: true },
  { id: 5, name: 'Droid Man',    photo: 'https://i.pravatar.cc/100?img=33', idNumber: '245690', year: 2021, marks: 1160, rank: '98.95%', active: true },
];

/* ─────────────────── MAIN ─────────────────── */
export default function ListUser() {
  const [students, setStudents] = useState(initialStudents);
  const [activeTab, setActiveTab] = useState('Today');
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const tabs = ['Today', 'Week', 'Month', 'Year'];

  const toggleActive = (id) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
    setOpenMenuId(null);
  };

  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    setOpenMenuId(null);
    if (selectedUser?.id === id) setSelectedUser(null);
  };

  /* ── DETAIL VIEW ── */
  if (selectedUser) {
    return (
      <UserDetails
        user={selectedUser}
        onBack={() => setSelectedUser(null)}
      />
    );
  }

  /* ── LIST VIEW ── */
  return (
    <div className="w-full rounded-2xl bg-white p-6 shadow-sm transition-colors duration-300 dark:bg-[#1a1a1a]">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#1a1a1a] dark:text-white">
          Top Performer
        </h2>
        <button
          type="button"
          className="rounded-md bg-gray-100 px-3 py-1.5 text-xs font-semibold text-[#1a1a1a] hover:bg-gray-200 dark:bg-[#2a2a2a] dark:text-white dark:hover:bg-[#333] transition-colors"
        >
          Full Chart
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-5 flex gap-6 border-b border-gray-200 dark:border-[#2a2a2a]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`relative pb-2 text-sm font-semibold transition-colors ${
                isActive
                  ? 'text-[#1a1a1a] dark:text-white'
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              {tab}
              {isActive && (
                <span className="absolute left-0 -bottom-px h-0.5 w-full rounded-full bg-[#1a1a1a] dark:bg-white" />
              )}
            </button>
          );
        })}
      </div>

      {/* Table head */}
      <div className="grid grid-cols-[60px_1fr_100px_70px_80px_90px] gap-3 px-2 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
        <span>Photo</span>
        <span>Name</span>
        <span>ID Number</span>
        <span className="text-center">Year</span>
        <span className="text-center">Marks</span>
        <span className="text-center">Rank</span>
      </div>

      {/* Rows */}
      <div className="flex flex-col">
        {students.map((student) => {
          const isMenuOpen = openMenuId === student.id;
          return (
            <div
              key={student.id}
              className={`relative grid grid-cols-[60px_1fr_100px_70px_80px_90px] gap-3 items-center rounded-lg px-2 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-[#222] ${
                !student.active ? 'opacity-50' : ''
              }`}
            >
              {/* Photo + dot */}
              <button
                type="button"
                onClick={() => {
                  setOpenMenuId(null);
                  setSelectedUser(student);
                }}
                className="relative w-fit"
              >
                <img
                  src={student.photo}
                  alt={student.name}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-white dark:ring-[#1a1a1a]"
                />
                <span
                  className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white dark:border-[#1a1a1a] ${
                    student.active ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                />
              </button>

              {/* Name */}
              <button
                type="button"
                onClick={() => {
                  setOpenMenuId(null);
                  setSelectedUser(student);
                }}
                className="truncate text-left text-sm font-bold text-[#1a1a1a] dark:text-white"
              >
                {student.name}
              </button>

              {/* ID */}
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ID: {student.idNumber}
              </span>

              {/* Year */}
              <span className="text-center text-xs text-[#1a1a1a] dark:text-white">
                {student.year}
              </span>

              {/* Marks */}
              <span className="text-center text-xs text-[#1a1a1a] dark:text-white">
                {String(student.marks).padStart(4, '0')}
              </span>

              {/* Rank + menu */}
              <div className="relative flex justify-center">
                <button
                  type="button"
                  onClick={() => setOpenMenuId(isMenuOpen ? null : student.id)}
                  className="rounded-md bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-500 hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20 transition-colors"
                >
                  {student.rank}
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 top-full z-20 mt-2 w-40 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-xl dark:border-[#333] dark:bg-[#252525]">
                    <button
                      type="button"
                      onClick={() => toggleActive(student.id)}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-[#333] transition-colors"
                    >
                      <FontAwesomeIcon
                        icon={student.active ? faCircle : faCheckCircle}
                        className={`h-3 w-3 ${student.active ? 'text-gray-400' : 'text-green-500'}`}
                      />
                      {student.active ? 'Set Inactive' : 'Set Active'}
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteStudent(student.id)}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                    >
                      <FontAwesomeIcon icon={faTrash} className="h-3 w-3" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {students.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-400 dark:text-gray-500">
            No students left.
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────── DETAILS VIEW (bento mockup) ─────────────────── */
function UserDetails({ user, onBack }) {
  return (
    <div className="w-full space-y-5">

      {/* Back */}
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        Back to Users
      </button>

      {/* User header */}
      <div className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm dark:bg-[#1a1a1a]">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img src={user.photo} alt={user.name} className="h-14 w-14 rounded-full object-cover" />
            <span
              className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-[#1a1a1a] ${
                user.active ? 'bg-green-500' : 'bg-gray-400'
              }`}
            />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#1a1a1a] dark:text-white">{user.name}</h2>
            <p className="text-xs text-gray-400">Student ID: {user.idNumber}</p>
          </div>
        </div>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-500 dark:bg-blue-500/10 dark:text-blue-400">
          Student
        </span>
      </div>

      {/* ═══ BENTO GRID ═══ */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">

        {/* 1. AREA CHART — 2×2 */}
        <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-[#1a1a1a] md:col-span-2 md:row-span-2">
          <p className="text-sm font-medium text-gray-400">Consectetur Adipiscing Elit</p>

          <div className="relative mt-4 flex h-[260px]">
            <div className="flex flex-col justify-between py-1 text-[10px] text-gray-400">
              <span>2019</span><span>2018</span><span>2017</span><span>2016</span><span>2015</span>
            </div>

            <div className="relative ml-3 flex-1">
              <div className="absolute inset-0 flex flex-col justify-between">
                {[0,1,2,3,4].map(i => (
                  <div key={i} className="border-t border-gray-100 dark:border-[#2a2a2a]" />
                ))}
              </div>

              <svg viewBox="0 0 400 220" preserveAspectRatio="none" className="relative h-full w-full">
                <path
                  d="M0,140 C40,60 80,40 130,80 C170,110 200,160 250,110 C290,70 340,30 400,15 L400,220 L0,220 Z"
                  fill="#fde047"
                />
                <path
                  d="M0,140 C40,60 80,40 130,80 C170,110 200,160 250,110 C290,70 340,30 400,15"
                  fill="none" stroke="#facc15" strokeWidth="2"
                />
                <path
                  d="M0,190 C80,180 160,160 240,120 C300,90 350,55 400,30"
                  fill="none" stroke="#fb923c" strokeWidth="2.5"
                />
              </svg>

              <div className="mt-1 flex justify-between text-[10px] text-gray-400">
                {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map(n => <span key={n}>{n}</span>)}
              </div>
            </div>
          </div>
        </div>

        {/* 2. CLOCK — yellow */}
        <div className="rounded-2xl bg-yellow-400 p-5 text-center shadow-sm">
          <p className="text-[42px] font-light leading-none text-white">13:00</p>
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-white/90">
            Friday 11 September
          </p>
        </div>

        {/* 3. WEATHER — green */}
        <div className="flex items-center justify-around rounded-2xl bg-emerald-500 p-5 text-white shadow-sm">
          <FontAwesomeIcon icon={faCloud} className="text-4xl" />
          <span className="text-3xl font-light">27°C</span>
        </div>

        {/* 4. KPI ORANGE — 2 cols */}
        <div className="rounded-2xl bg-orange-500 p-5 text-white shadow-sm md:col-span-2">
          <div className="flex items-start justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-white/80">Lorem Ipsum</p>
            <FontAwesomeIcon icon={faCircleInfo} className="text-sm text-white/70" />
          </div>
          <p className="mt-4 text-4xl font-light">
            {String(user.marks).padStart(4, '0')} M
          </p>
        </div>

        {/* 5. $1,561 PINK CARD */}
        <div className="rounded-2xl bg-white p-5 text-center shadow-sm dark:bg-[#1a1a1a]">
          <p className="text-[11px] text-gray-400">Consectetur Adipiscing Elit</p>
          <p className="mt-3 text-4xl font-light text-pink-500">$ 1,561</p>
          <p className="mt-1 text-[10px] text-gray-400">labore et dolore magna aliqua</p>
          <svg viewBox="0 0 100 30" className="mt-4 h-12 w-full">
            <path d="M0,22 C15,18 25,5 40,10 C55,15 65,3 80,8 C90,11 95,15 100,18 L100,30 L0,30 Z" fill="#fb923c" />
          </svg>
        </div>

        {/* 6. GAUGE 75,3% */}
        <div className="rounded-2xl bg-white p-5 text-center shadow-sm dark:bg-[#1a1a1a]">
          <p className="text-[11px] text-gray-400">Ut enim ad minim veniam</p>
          <div className="relative mx-auto mt-3 h-24 w-40">
            <svg viewBox="0 0 120 70" className="h-full w-full">
              <path d="M10,60 A50,50 0 0,1 110,60" fill="none" stroke="#e5e7eb" strokeWidth="12" strokeLinecap="round" className="dark:stroke-[#333]" />
              <path d="M10,60 A50,50 0 0,1 95,20" fill="none" stroke="#fb923c" strokeWidth="12" strokeLinecap="round" />
            </svg>
            <p className="absolute bottom-0 left-1/2 -translate-x-1/2 text-2xl font-light text-pink-500">
              75,3%
            </p>
          </div>
          <p className="mt-1 text-[10px] text-gray-400">laboris nisi ut aliquip</p>
        </div>

        {/* 7. PROGRESS BARS — 2 cols */}
        <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-[#1a1a1a] md:col-span-2">
          <div className="flex items-start justify-between">
            <p className="text-sm text-gray-400">Duis aute irure dolor in reprehenderit</p>
            <FontAwesomeIcon icon={faCircleInfo} className="text-sm text-gray-300 dark:text-gray-500" />
          </div>
          <div className="mt-5 space-y-4">
            <Bar label="Proin vitae nibh eu"   value={85} color="bg-yellow-400" />
            <Bar label="Etiam mollis semper"   value={65} color="bg-emerald-500" />
            <Bar label="Suspendisse nec nunc"  value={45} color="bg-orange-500" />
          </div>
        </div>

        {/* 8. BIG DONUT 64,5% — 2×2 */}
        <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-[#1a1a1a] md:col-span-2 md:row-span-2">
          <p className="text-center text-sm font-medium uppercase tracking-widest text-gray-400">
            Lorem Ipsum
          </p>
          <p className="mt-1 text-center text-[10px] text-gray-400">
            dolor sit amet, consectetur adipiscing elit
          </p>

          <div className="relative mx-auto mt-6 h-40 w-40">
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
              <circle cx="60" cy="60" r="50" fill="none" stroke="#fef9c3" strokeWidth="14" />
              <circle
                cx="60" cy="60" r="50"
                fill="none" stroke="#facc15" strokeWidth="14"
                strokeDasharray="314" strokeDashoffset="113"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-light text-pink-500">64,5%</span>
              <span className="text-[10px] text-gray-400">labore et dolore</span>
            </div>
          </div>

          <p className="mt-6 text-center text-sm font-medium uppercase tracking-widest text-gray-400">
            Lorem Ipsum
          </p>
        </div>

        {/* 9. TIMELINE — 2×2 */}
        <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-[#1a1a1a] md:col-span-2 md:row-span-2">
          <div className="space-y-5">
            <TimelineItem color="bg-emerald-500" title="Lorem Ipsum" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
            <TimelineItem color="bg-yellow-400"  title="Lorem Ipsum" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt." />
            <TimelineItem color="bg-emerald-500" title="Lorem Ipsum" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
            <TimelineItem color="bg-yellow-400"  title="Lorem Ipsum" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt." />
          </div>
        </div>

        {/* 10. DISTRIBUTION — 2 cols */}
        <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-[#1a1a1a] md:col-span-2">
          <div className="flex items-start justify-between">
            <p className="text-sm text-gray-400">
              Duis aute irure dolor in reprehenderit in voluptate velit
            </p>
            <FontAwesomeIcon icon={faCircleInfo} className="text-sm text-gray-300 dark:text-gray-500" />
          </div>

          <div className="mt-4 flex items-center gap-6">
            <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="18" className="dark:stroke-[#2a2a2a]" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#facc15" strokeWidth="18" strokeDasharray="88 251" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#fb923c" strokeWidth="18" strokeDasharray="60 251" strokeDashoffset="-88" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#22c55e" strokeWidth="18" strokeDasharray="50 251" strokeDashoffset="-148" />
            </svg>

            <div className="flex-1 space-y-2 text-xs">
              <Legend color="bg-yellow-400" label="Lorem Ipsum" value="70%" />
              <Legend color="bg-orange-500" label="Lorem Ipsum" value="48%" />
              <Legend color="bg-emerald-500" label="Lorem Ipsum" value="30%" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ─────────────────── HELPERS ─────────────────── */
function Bar({ label, value, color }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-[10px] text-gray-400">
        <span>{label}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-[#303030]">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function TimelineItem({ color, title, text }) {
  return (
    <div className="flex gap-3">
      <div className="relative flex flex-col items-center">
        <span className={`mt-1 h-3 w-3 rounded-full ${color}`} />
        <span className="mt-1 w-px flex-1 bg-gray-200 dark:bg-[#2a2a2a]" />
      </div>
      <div className="pb-1">
        <p className="text-xs font-bold uppercase tracking-wide text-[#1a1a1a] dark:text-white">
          {title}
        </p>
        <p className="mt-1 text-[11px] leading-relaxed text-gray-400">{text}</p>
      </div>
    </div>
  );
}

function Legend({ color, label, value }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-3 w-3 rounded-sm ${color}`} />
      <span className="flex-1 text-[#1a1a1a] dark:text-gray-300">{label}</span>
      <span className="font-semibold text-gray-400">{value}</span>
    </div>
  );
}