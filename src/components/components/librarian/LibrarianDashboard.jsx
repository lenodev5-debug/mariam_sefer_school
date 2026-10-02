import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faUndo,
  faChevronRight,
  faPlus,
  faEllipsisVertical,
  faChartLine,
  faLayerGroup,
  faEnvelope,
  faPhone,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

import FloatingMenu from "../../shared/ui/FloatingMenu";
import bookstoreService from "../../../../lib/service/books/bookstoreService";
import { useAuth } from "../../../context/AuthContext";

/* ============================================================
 * Utils
 * ============================================================ */
const safeNum = (v, fallback = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

const localDayKey = (d) => {
  const x = new Date(d);
  const y = x.getFullYear();
  const m = String(x.getMonth() + 1).padStart(2, "0");
  const day = String(x.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const buildLast7Days = () => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);
    days.push(d);
  }
  return days;
};

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const DEMO_CREATED  = [3, 6, 2, 8, 5, 11, 4];
const DEMO_BORROWED = [5, 9, 7, 14, 10, 17, 8];

/* ============================================================
 * Welcome Header
 * ============================================================ */
const ROLE_STYLES = {
  Admin:     { bg: "bg-violet-500/10", text: "text-violet-500", ring: "ring-violet-500/20" },
  Librarian: { bg: "bg-indigo-500/10", text: "text-indigo-500", ring: "ring-indigo-500/20" },
  Teacher:   { bg: "bg-sky-500/10",    text: "text-sky-500",    ring: "ring-sky-500/20" },
  Student:   { bg: "bg-emerald-500/10",text: "text-emerald-500",ring: "ring-emerald-500/20" },
  Parent:    { bg: "bg-amber-500/10",  text: "text-amber-500",  ring: "ring-amber-500/20" },
  User:      { bg: "bg-slate-500/10",  text: "text-slate-500",  ring: "ring-slate-500/20" },
};

const STATUS_STYLES = {
  active:    "bg-emerald-500/10 text-emerald-500",
  inactive:  "bg-gray-500/10 text-gray-500",
  suspended: "bg-red-500/10 text-red-500",
};

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
};

const formatJoined = (date) => {
  if (!date) return "";
  try {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
};

const WelcomeHeader = ({ user, totalBooks }) => {
  if (!user) return null;

  const roleStyle = ROLE_STYLES[user.role] || ROLE_STYLES.User;
  const statusStyle = STATUS_STYLES[user.status] || STATUS_STYLES.inactive;
  const initial = (user.name || user.email || "U").charAt(0).toUpperCase();
  const joined = formatJoined(user.createdAt);

  return (
    <div className="mb-8 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="relative flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">

        {/* Left — avatar + greeting */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || "user"}
                className="h-16 w-16 rounded-2xl object-cover ring-2 ring-blue-500/20 ring-offset-2 ring-offset-white dark:ring-offset-gray-900"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-2xl font-bold text-white shadow-md">
                {initial}
              </div>
            )}

            {/* Status dot */}
            <span
              className={`absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-white dark:border-gray-900 ${
                user.status === "active"
                  ? "bg-emerald-500"
                  : user.status === "suspended"
                  ? "bg-red-500"
                  : "bg-gray-400"
              }`}
            />
          </div>

          {/* Text */}
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {getGreeting()},
            </p>
            <h2 className="mt-0.5 truncate text-2xl font-bold text-slate-900 dark:text-white">
              {user.name || "Unnamed user"}
            </h2>

            {/* Badges */}
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${roleStyle.bg} ${roleStyle.text}`}
              >
                {user.role}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize ${statusStyle}`}
              >
                {user.status}
              </span>
            </div>
          </div>
        </div>

        {/* Right — contact info + joined */}
        <div className="flex flex-col gap-2 text-xs text-slate-500 dark:text-slate-400 md:items-end">

          {user.email && (
            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-[10px] text-slate-400"
              />
              <span className="truncate">{user.email}</span>
            </div>
          )}

          {user.phone && (
            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faPhone}
                className="text-[10px] text-slate-400"
              />
              <span>{user.phone}</span>
            </div>
          )}

          {joined && (
            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faCalendarDays}
                className="text-[10px] text-slate-400"
              />
              <span>Joined {joined}</span>
            </div>
          )}

          {/* Quick stat */}
          <div className="mt-1 flex items-center gap-2">
            <span className="text-slate-400">Managing</span>
            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-700 dark:bg-white/10 dark:text-slate-200">
              {totalBooks} {totalBooks === 1 ? "title" : "titles"}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom accent bar — subtle gradient */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />
    </div>
  );
};

/* ============================================================
 * Inline SVG: Progress Ring
 * ============================================================ */
const ProgressRing = ({ percent = 0, color = "#3A82F6", label, value }) => {
  const safePercent = Number.isFinite(Number(percent))
    ? Math.max(0, Math.min(100, Number(percent)))
    : 0;

  const radius = 42;
  const stroke = 10;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (safePercent / 100) * circumference;
  const display = value != null ? String(value) : `${safePercent}%`;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-28 h-28">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="#EEF1F6" strokeWidth={stroke} />
          <circle
            cx="50" cy="50" r={radius}
            fill="none" stroke={color} strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-slate-800 dark:text-white">
            {display}
          </span>
        </div>
      </div>
      <p className="text-sm font-medium text-slate-600 dark:text-slate-400 text-center max-w-[120px]">
        {label}
      </p>
    </div>
  );
};

/* ============================================================
 * Inline SVG: Area Chart
 * ============================================================ */
const InlineAreaChart = ({ data = [], height = 192, color = "#7C3AED" }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-xs text-slate-400">
        No data
      </div>
    );
  }

  const width = 600;
  const padding = { top: 10, right: 10, bottom: 24, left: 30 };
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  const maxVal = Math.max(1, ...data.map((d) => safeNum(d.value, 0)));
  const stepX = data.length > 1 ? innerW / (data.length - 1) : 0;

  const points = data.map((d, i) => {
    const v = safeNum(d.value, 0);
    const x = padding.left + i * stepX;
    const y = padding.top + innerH - (v / maxVal) * innerH;
    return { x, y, v, label: d.label };
  });

  const linePath = points.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = points[i - 1];
    const cx = (prev.x + p.x) / 2;
    return `${acc} C ${cx} ${prev.y}, ${cx} ${p.y}, ${p.x} ${p.y}`;
  }, "");

  const areaPath =
    `M ${padding.left} ${padding.top + innerH} ` +
    points.reduce((acc, p, i) => {
      if (i === 0) return `${acc}L ${p.x} ${p.y}`;
      const prev = points[i - 1];
      const cx = (prev.x + p.x) / 2;
      return `${acc} C ${cx} ${prev.y}, ${cx} ${p.y}, ${p.x} ${p.y}`;
    }, "") +
    ` L ${padding.left + innerW} ${padding.top + innerH} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {[0, 0.25, 0.5, 0.75, 1].map((r) => {
        const y = padding.top + innerH * r;
        return (
          <line
            key={r}
            x1={padding.left}
            x2={padding.left + innerW}
            y1={y}
            y2={y}
            stroke="#E5E7EB"
            strokeDasharray="3 4"
            strokeWidth="1"
          />
        );
      })}

      <path d={areaPath} fill="url(#areaGrad)" />
      <path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill="#fff" stroke={color} strokeWidth="2" />
      ))}

      {points.map((p, i) => (
        <text
          key={`x-${i}`}
          x={p.x}
          y={height - 6}
          textAnchor="middle"
          className="fill-slate-400"
          fontSize="10"
        >
          {p.label}
        </text>
      ))}
    </svg>
  );
};

/* ============================================================
 * Inline SVG: Bar Chart
 * ============================================================ */
const InlineBarChart = ({ data = [], height = 192, color = "#6366F1" }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-xs text-slate-400">
        No data
      </div>
    );
  }

  const width = 600;
  const padding = { top: 10, right: 10, bottom: 24, left: 30 };
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  const maxVal = Math.max(1, ...data.map((d) => safeNum(d.value, 0)));
  const slot = innerW / data.length;
  const barW = slot * 0.55;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
      {[0, 0.25, 0.5, 0.75, 1].map((r) => {
        const y = padding.top + innerH * r;
        return (
          <line
            key={r}
            x1={padding.left}
            x2={padding.left + innerW}
            y1={y}
            y2={y}
            stroke="#E5E7EB"
            strokeDasharray="3 4"
            strokeWidth="1"
          />
        );
      })}

      {data.map((d, i) => {
        const v = safeNum(d.value, 0);
        const barH = (v / maxVal) * innerH;
        const x = padding.left + i * slot + (slot - barW) / 2;
        const y = padding.top + innerH - barH;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={barH} rx="6" fill={color} />
            <text
              x={x + barW / 2}
              y={height - 6}
              textAnchor="middle"
              className="fill-slate-400"
              fontSize="10"
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

/* ============================================================
 * Inline SVG: Donut Chart
 * ============================================================ */
const InlineDonutChart = ({ active = 0, inactive = 0, size = 200 }) => {
  const total = active + inactive;
  const safeTotal = total > 0 ? total : 1;
  const activePct = Math.round((active / safeTotal) * 100);

  const radius = 60;
  const stroke = 22;
  const circumference = 2 * Math.PI * radius;
  const dash = (activePct / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
        <circle
          cx="80" cy="80" r={radius}
          fill="none" stroke="#E5E7EB" strokeWidth={stroke}
        />
        <circle
          cx="80" cy="80" r={radius}
          fill="none" stroke="#6366F1" strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-extrabold text-slate-800 dark:text-white">
          {activePct}%
        </span>
      </div>
    </div>
  );
};

/* ============================================================
 * Main
 * ============================================================ */
export default function LibrarianDashboard() {
  const { user } = useAuth();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bookstoreService
      .getAllBooks({ sort: "-createdAt", limit: 100 })
      .then((res) => {
        const list = Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res)
          ? res
          : [];
        setBooks(list);
      })
      .catch((err) => {
        console.error("Librarian dashboard fetch error:", err);
        setBooks([]);
      })
      .finally(() => setLoading(false));
  }, []);

  /* ---------- Derived ---------- */
  const safeBooks      = Array.isArray(books) ? books : [];
  const totalBooks     = safeBooks.length;
  const availableBooks = safeBooks.filter((b) => b?.isAvailable === true).length;
  const borrowedBooks  = safeBooks.filter((b) => safeNum(b?.borrowedOut) > 0).length;

  const last7 = buildLast7Days();

  const realCreated = last7.map((date) => {
    const key = localDayKey(date);
    const value = safeBooks.filter((b) => {
      if (!b?.createdAt) return false;
      return localDayKey(b.createdAt) === key;
    }).length;
    return { label: DAY_LABELS[date.getDay()], value };
  });

  const realCreatedSum = realCreated.reduce((s, d) => s + d.value, 0);

  const createdActivity = realCreatedSum > 0
    ? realCreated
    : last7.map((d, i) => ({
        label: DAY_LABELS[d.getDay()],
        value: DEMO_CREATED[i],
      }));

  const realBorrow = last7.map((date) => {
    const key = localDayKey(date);
    const value = safeBooks.filter((b) => {
      if (!b?.updatedAt) return false;
      return localDayKey(b.updatedAt) === key && safeNum(b?.borrowedOut) > 0;
    }).length;
    return { label: DAY_LABELS[date.getDay()], value };
  });

  const realBorrowSum = realBorrow.reduce((s, d) => s + d.value, 0);

  const borrowActivity = realBorrowSum > 0
    ? realBorrow
    : last7.map((d, i) => ({
        label: DAY_LABELS[d.getDay()],
        value: DEMO_BORROWED[i],
      }));

  const totalCreatedThisWeek  = createdActivity.reduce((s, d) => s + d.value, 0);
  const totalBorrowedThisWeek = borrowActivity.reduce((s, d) => s + d.value, 0);

  const pct = (n) => (totalBooks > 0 ? Math.round((n / totalBooks) * 100) : 0);

  const goals = [
    { label: "Books in library",   percent: 72,                 color: "#3A82F6", value: String(totalBooks) },
    { label: "Available copies",   percent: pct(availableBooks), color: "#7DD3FC" },
    { label: "Currently borrowed", percent: pct(borrowedBooks),  color: "#1E293B" },
  ];

  const recentBooks = safeBooks.slice(0, 4);

  const genreCounts = safeBooks.reduce((acc, b) => {
    const genres = Array.isArray(b?.genre)
      ? b.genre
      : typeof b?.genre === "string"
      ? [b.genre]
      : [];
    genres.forEach((g) => {
      const key = String(g || "").trim().toLowerCase();
      if (key) acc[key] = (acc[key] || 0) + 1;
    });
    return acc;
  }, {});

  const topGenres = Object.entries(genreCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([name]) => name.replace(/\b\w/g, (c) => c.toUpperCase()));

  const authorCounts = safeBooks.reduce((acc, b) => {
    const a = typeof b?.author === "string" ? b.author.trim() : "";
    if (a) acc[a] = (acc[a] || 0) + 1;
    return acc;
  }, {});

  const topAuthors = Object.entries(authorCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name]) => name);

  const activities = [
    { id: 1, icon: faPlus,     text: "Added Atomic Habits to the library", time: "2 hours ago",  color: "#3A82F6" },
    { id: 2, icon: faBookOpen, text: "Test Teacher borrowed Ikigai",       time: "18 hours ago", color: "#7DD3FC" },
    { id: 3, icon: faUndo,     text: "The Psychology of Money returned",   time: "1 day ago",    color: "#1E293B" },
  ];

  /* ============================================================
   * LOADING
   * ============================================================ */
  if (loading) {
    return (
      <div className="pt-24 px-4 md:px-8 pb-16 bg-slate-50 dark:bg-gray-950 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 h-32 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ============================================================
   * DASHBOARD
   * ============================================================ */
  return (
    <div className="pt-24 px-4 md:px-8 pb-16 bg-slate-50 dark:bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Welcome header */}
        <WelcomeHeader user={user} totalBooks={totalBooks} />

        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif text-slate-900 dark:text-white">
            Librarian Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Overview of your library activity and inventory.
          </p>
        </div>

        {/* ROW 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Library goals</h2>
              <button className="text-gray-400 hover:text-gray-600">
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            </div>
            <div className="flex justify-around">
              {goals.map((g, i) => <ProgressRing key={i} {...g} />)}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent activity</h2>
              <button className="text-gray-400 hover:text-gray-600">
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            </div>
            <ul className="flex flex-col gap-5">
              {activities.map((a) => (
                <li key={a.id} className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs shrink-0"
                    style={{ backgroundColor: a.color }}
                  >
                    <FontAwesomeIcon icon={a.icon} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 dark:text-slate-300 truncate">{a.text}</p>
                    <span className="text-xs text-slate-400">{a.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ROW 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faChartLine} className="text-indigo-400" />
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Books added</h2>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-gray-700 px-3 py-1.5 text-xs text-slate-500 dark:text-slate-400">
                Last 7 days
                <FontAwesomeIcon icon={faLayerGroup} className="text-[10px]" />
              </div>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              {totalCreatedThisWeek} book{totalCreatedThisWeek === 1 ? "" : "s"} this week
            </p>
            <div className="h-48">
              <InlineBarChart data={createdActivity} color="#6366F1" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-gray-800">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recently added</h2>
              <a
                href="/librarian/books"
                className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
              >
                See more <FontAwesomeIcon icon={faChevronRight} className="text-[8px]" />
              </a>
            </div>
            {recentBooks.length === 0 ? (
              <p className="text-sm text-slate-500">No books yet.</p>
            ) : (
              <div className="grid grid-cols-4 gap-3">
                {recentBooks.map((book) => (
                  <div key={book._id} className="flex flex-col">
                    <div className="aspect-[2/3] bg-slate-100 dark:bg-gray-800 rounded-md overflow-hidden mb-2">
                      <img
                        src={book.coverImage || ""}
                        alt={book.title || "book"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-[11px] font-semibold text-slate-800 dark:text-white line-clamp-2 leading-tight">
                      {book.title}
                    </p>
                    <p className="text-[10px] text-slate-500 line-clamp-1">{book.author}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ROW 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faChartLine} className="text-cyan-400" />
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Borrow activity</h2>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-gray-700 px-3 py-1.5 text-xs text-slate-500 dark:text-slate-400">
                Last 7 days
                <FontAwesomeIcon icon={faLayerGroup} className="text-[10px]" />
              </div>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              {totalBorrowedThisWeek} borrow{totalBorrowedThisWeek === 1 ? "" : "s"} this week
            </p>
            <div className="h-48">
              <InlineAreaChart data={borrowActivity} color="#06B6D4" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Availability</h2>
              <button className="text-gray-400 hover:text-gray-600">
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="shrink-0">
                <InlineDonutChart
                  active={availableBooks}
                  inactive={borrowedBooks}
                  size={200}
                />
              </div>
              <div className="flex flex-col gap-3 flex-1">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-indigo-500" />
                  <span className="text-xs text-slate-600 dark:text-slate-400">
                    Available — {availableBooks}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-slate-300" />
                  <span className="text-xs text-slate-600 dark:text-slate-400">
                    Borrowed — {borrowedBooks}
                  </span>
                </div>
                {topGenres.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-gray-800">
                    <p className="text-[11px] uppercase tracking-wide text-slate-400 mb-2">
                      Top genres
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {topGenres.map((g) => (
                        <span
                          key={g}
                          className="px-2 py-1 text-[11px] rounded bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-slate-300"
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-6">
              Diagram based on books you've added and marked as available.
            </p>
          </div>
        </div>

        {/* ROW 4 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Top authors</h2>
              <button className="text-gray-400 hover:text-gray-600">
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            </div>
            {topAuthors.length === 0 ? (
              <p className="text-sm text-slate-500">No authors yet.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {topAuthors.map((name) => (
                  <span
                    key={name}
                    className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-gray-800 rounded-md hover:bg-slate-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    {name}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Inventory snapshot</h2>
            </div>
            <ul className="flex flex-col gap-4">
              <li className="flex justify-between text-sm">
                <span className="text-slate-500">Total titles</span>
                <span className="font-bold text-slate-900 dark:text-white">{totalBooks}</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-slate-500">Available copies</span>
                <span className="font-bold text-slate-900 dark:text-white">{availableBooks}</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-slate-500">Borrowed out</span>
                <span className="font-bold text-slate-900 dark:text-white">{borrowedBooks}</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-slate-500">Genres tracked</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {Object.keys(genreCounts).length}
                </span>
              </li>
            </ul>
          </div>
        </div>

      </div>
      <FloatingMenu />
    </div>
  );
}