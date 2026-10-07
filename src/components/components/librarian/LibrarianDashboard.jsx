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

const DEMO_CREATED = [3, 6, 2, 8, 5, 11, 4];
const DEMO_BORROWED = [5, 9, 7, 14, 10, 17, 8];

/* ============================================================
 * Theme tokens (match LibrarianBookStore)
 * ============================================================ */
const THEME = {
  teal: "#55b6b6",
  tealHover: "#43a6a6",
  tealSoft: "#eefafa",
  orange: "#ed7950",
  orangeSoft: "#fff4ef",
  amber: "#c78f2c",
  amberSoft: "#fdf4e3",
  warmBarBg: "#f8d8cc",
};

/* ============================================================
 * Welcome Header
 * ============================================================ */
const ROLE_STYLES = {
  Admin: { bg: "bg-violet-500/10", text: "text-violet-500" },
  Librarian: { bg: "bg-[#eefafa]", text: "text-[#0f2424] dark:bg-[#0f2424] dark:text-[#7adcdc]" },
  Teacher: { bg: "bg-sky-500/10", text: "text-sky-500" },
  Student: { bg: "bg-emerald-500/10", text: "text-emerald-500" },
  Parent: { bg: "bg-amber-500/10", text: "text-amber-500" },
  User: { bg: "bg-slate-500/10", text: "text-slate-500" },
};

const STATUS_STYLES = {
  active: "bg-emerald-500/10 text-emerald-500",
  inactive: "bg-gray-500/10 text-gray-500",
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
    <div className="mb-6 overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-[#1B1A1A]">
      <div className="relative flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
        {/* Left — avatar + greeting */}
        <div className="flex items-center gap-4">
          <div className="relative">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || "user"}
                className="h-16 w-16 rounded-2xl object-cover ring-2 ring-[#55b6b6]/30 ring-offset-2 ring-offset-white dark:ring-offset-[#1B1A1A]"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#55b6b6] to-[#3a8a8a] text-2xl font-bold text-white shadow-md">
                {initial}
              </div>
            )}

            <span
              className={`absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-white dark:border-[#1B1A1A] ${
                user.status === "active"
                  ? "bg-emerald-500"
                  : user.status === "suspended"
                  ? "bg-red-500"
                  : "bg-gray-400"
              }`}
            />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              {getGreeting()},
            </p>
            <h2 className="mt-0.5 truncate text-2xl font-bold text-gray-800 dark:text-gray-100">
              {user.name || "Unnamed user"}
            </h2>

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
        <div className="flex flex-col gap-2 text-xs text-gray-500 md:items-end">
          {user.email && (
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faEnvelope} className="text-[10px] text-gray-400" />
              <span className="truncate">{user.email}</span>
            </div>
          )}

          {user.phone && (
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faPhone} className="text-[10px] text-gray-400" />
              <span>{user.phone}</span>
            </div>
          )}

          {joined && (
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faCalendarDays} className="text-[10px] text-gray-400" />
              <span>Joined {joined}</span>
            </div>
          )}

          <div className="mt-1 flex items-center gap-2">
            <span className="text-gray-400">Managing</span>
            <span className="rounded-md bg-[#eefafa] px-2 py-0.5 text-xs font-bold text-[#0f2424] dark:bg-[#0f2424] dark:text-[#7adcdc]">
              {totalBooks} {totalBooks === 1 ? "title" : "titles"}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom accent bar — teal → orange (matches bookstore palette) */}
      <div className="h-1 w-full bg-gradient-to-r from-[#55b6b6] via-[#7adcdc] to-[#ed7950]" />
    </div>
  );
};

/* ============================================================
 * Inline SVG: Progress Ring
 * ============================================================ */
const ProgressRing = ({ percent = 0, color = THEME.teal, label, value }) => {
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
          <circle cx="50" cy="50" r={radius} fill="none" stroke={THEME.warmBarBg} strokeWidth={stroke} />
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
          <span className="text-lg font-bold text-gray-800 dark:text-gray-100">
            {display}
          </span>
        </div>
      </div>
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 text-center max-w-[120px]">
        {label}
      </p>
    </div>
  );
};

/* ============================================================
 * Inline SVG: Area Chart
 * ============================================================ */
const InlineAreaChart = ({ data = [], height = 192, color = THEME.orange }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-xs text-gray-400">
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
          className="fill-gray-400"
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
const InlineBarChart = ({ data = [], height = 192, color = THEME.teal }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-xs text-gray-400">
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
              className="fill-gray-400"
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
          fill="none" stroke={THEME.warmBarBg} strokeWidth={stroke}
        />
        <circle
          cx="80" cy="80" r={radius}
          fill="none" stroke={THEME.teal} strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-extrabold text-gray-800 dark:text-gray-100">
          {activePct}%
        </span>
      </div>
    </div>
  );
};

/* ============================================================
 * Reusable card class
 * ============================================================ */
const CARD =
  "rounded-2xl bg-white p-6 shadow-sm dark:bg-[#1B1A1A]";

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
  const safeBooks = Array.isArray(books) ? books : [];
  const totalBooks = safeBooks.length;
  const availableBooks = safeBooks.filter((b) => b?.isAvailable === true).length;
  const borrowedBooks = safeBooks.filter((b) => safeNum(b?.borrowedOut) > 0).length;

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

  const createdActivity =
    realCreatedSum > 0
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

  const borrowActivity =
    realBorrowSum > 0
      ? realBorrow
      : last7.map((d, i) => ({
          label: DAY_LABELS[d.getDay()],
          value: DEMO_BORROWED[i],
        }));

  const totalCreatedThisWeek = createdActivity.reduce((s, d) => s + d.value, 0);
  const totalBorrowedThisWeek = borrowActivity.reduce((s, d) => s + d.value, 0);

  const pct = (n) => (totalBooks > 0 ? Math.round((n / totalBooks) * 100) : 0);

  const goals = [
    { label: "Books in library", percent: 72, color: THEME.teal, value: String(totalBooks) },
    { label: "Available copies", percent: pct(availableBooks), color: "#7adcdc" },
    { label: "Currently borrowed", percent: pct(borrowedBooks), color: THEME.orange },
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
    { id: 1, icon: faPlus, text: "Added Atomic Habits to the library", time: "2 hours ago", color: THEME.teal },
    { id: 2, icon: faBookOpen, text: "Test Teacher borrowed Ikigai", time: "18 hours ago", color: "#7adcdc" },
    { id: 3, icon: faUndo, text: "The Psychology of Money returned", time: "1 day ago", color: THEME.orange },
  ];

  /* ============================================================
   * LOADING
   * ============================================================ */
  if (loading) {
    return (
      <div className="min-h-screen w-full overflow-hidden bg-[#f7f6f5] px-5 pb-10 pt-24 md:px-7 md:pt-28 dark:bg-[#0E0E0E]">
        <div className="relative w-full">
          <div className="mb-8 h-32 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800"
              />
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
    <div className="min-h-screen w-full overflow-hidden bg-[#f7f6f5] px-5 pb-10 pt-24 md:px-7 md:pt-28 dark:bg-[#0E0E0E]">
      {/* Ambient background — same as LibrarianBookStore */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(60%_50%_at_15%_0%,#e8f5f5_0%,transparent_60%),radial-gradient(50%_45%_at_100%_10%,#fdeee4_0%,transparent_60%)] dark:bg-[radial-gradient(60%_50%_at_15%_0%,#0f2424_0%,transparent_60%),radial-gradient(50%_45%_at_100%_10%,#2a1710_0%,transparent_60%)]"
      />

      {/* Full-width container */}
      <div className="relative w-full">
        {/* Welcome header */}
        <WelcomeHeader user={user} totalBooks={totalBooks} />

        {/* Page title */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Librarian Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Overview of your library activity and inventory.
          </p>
        </div>

        {/* ============================================================
         * ROW 1 — CHARTS (moved to top)
         * ============================================================ */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className={CARD}>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faChartLine} style={{ color: THEME.teal }} />
                <h2 className="text-[16px] font-semibold text-gray-800 dark:text-gray-100">
                  Books added
                </h2>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-500 dark:border-gray-700">
                Last 7 days
                <FontAwesomeIcon icon={faLayerGroup} className="text-[10px]" />
              </div>
            </div>
            <p className="mb-3 text-xs text-gray-500">
              {totalCreatedThisWeek} book{totalCreatedThisWeek === 1 ? "" : "s"} this week
            </p>
            <div className="h-48">
              <InlineBarChart data={createdActivity} color={THEME.teal} />
            </div>
          </div>

          <div className={CARD}>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faChartLine} style={{ color: THEME.orange }} />
                <h2 className="text-[16px] font-semibold text-gray-800 dark:text-gray-100">
                  Borrow activity
                </h2>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-500 dark:border-gray-700">
                Last 7 days
                <FontAwesomeIcon icon={faLayerGroup} className="text-[10px]" />
              </div>
            </div>
            <p className="mb-3 text-xs text-gray-500">
              {totalBorrowedThisWeek} borrow{totalBorrowedThisWeek === 1 ? "" : "s"} this week
            </p>
            <div className="h-48">
              <InlineAreaChart data={borrowActivity} color={THEME.orange} />
            </div>
          </div>
        </div>

        {/* ============================================================
         * ROW 2 — Goals + Recent activity
         * ============================================================ */}
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className={CARD}>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-[16px] font-semibold text-gray-800 dark:text-gray-100">
                Library goals
              </h2>
              <button className="text-gray-400 hover:text-gray-600">
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            </div>
            <div className="flex justify-around">
              {goals.map((g, i) => (
                <ProgressRing key={i} {...g} />
              ))}
            </div>
          </div>

          <div className={CARD}>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-[16px] font-semibold text-gray-800 dark:text-gray-100">
                Recent activity
              </h2>
              <button className="text-gray-400 hover:text-gray-600">
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            </div>
            <ul className="flex flex-col gap-5">
              {activities.map((a) => (
                <li key={a.id} className="flex items-start gap-3">
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs text-white"
                    style={{ backgroundColor: a.color }}
                  >
                    <FontAwesomeIcon icon={a.icon} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-gray-700 dark:text-gray-300">
                      {a.text}
                    </p>
                    <span className="text-xs text-gray-400">{a.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ============================================================
         * ROW 3 — Recently added + Availability
         * ============================================================ */}
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className={CARD}>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-[16px] font-semibold text-gray-800 dark:text-gray-100">
                Recently added
              </h2>
              <a
                href="/librarian/books"
                className="flex items-center gap-1 text-xs font-medium text-[#55b6b6] hover:underline"
              >
                See more <FontAwesomeIcon icon={faChevronRight} className="text-[8px]" />
              </a>
            </div>
            {recentBooks.length === 0 ? (
              <p className="text-sm text-gray-500">No books yet.</p>
            ) : (
              <div className="grid grid-cols-4 gap-3">
                {recentBooks.map((book) => (
                  <div key={book._id} className="flex flex-col">
                    <div className="mb-2 aspect-[2/3] overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800">
                      <img
                        src={book.coverImage || ""}
                        alt={book.title || "book"}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p className="line-clamp-2 text-[11px] font-semibold leading-tight text-gray-800 dark:text-gray-100">
                      {book.title}
                    </p>
                    <p className="line-clamp-1 text-[10px] text-gray-500">{book.author}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={CARD}>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-[16px] font-semibold text-gray-800 dark:text-gray-100">
                Availability
              </h2>
              <button className="text-gray-400 hover:text-gray-600">
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            </div>
            <div className="flex flex-col items-center gap-8 md:flex-row">
              <div className="shrink-0">
                <InlineDonutChart
                  active={availableBooks}
                  inactive={borrowedBooks}
                  size={200}
                />
              </div>
              <div className="flex flex-1 flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-sm bg-[#55b6b6]" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    Available — {availableBooks}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-sm bg-[#f8d8cc]" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    Borrowed — {borrowedBooks}
                  </span>
                </div>
                {topGenres.length > 0 && (
                  <div className="mt-3 border-t border-gray-100 pt-3 dark:border-gray-800">
                    <p className="mb-2 text-[11px] uppercase tracking-wide text-gray-400">
                      Top genres
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {topGenres.map((g) => (
                        <span
                          key={g}
                          className="rounded bg-[#eefafa] px-2 py-1 text-[11px] text-[#0f2424] dark:bg-[#0f2424] dark:text-[#7adcdc]"
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <p className="mt-6 text-xs text-gray-400">
              Diagram based on books you've added and marked as available.
            </p>
          </div>
        </div>

        {/* ============================================================
         * ROW 4 — Top authors + Inventory snapshot
         * ============================================================ */}
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className={CARD}>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-[16px] font-semibold text-gray-800 dark:text-gray-100">
                Top authors
              </h2>
              <button className="text-gray-400 hover:text-gray-600">
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            </div>
            {topAuthors.length === 0 ? (
              <p className="text-sm text-gray-500">No authors yet.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {topAuthors.map((name) => (
                  <span
                    key={name}
                    className="cursor-pointer rounded-md bg-[#eefafa] px-3 py-1.5 text-xs font-medium text-[#0f2424] transition-colors hover:bg-[#d8f0f0] dark:bg-[#0f2424] dark:text-[#7adcdc] dark:hover:bg-[#143232]"
                  >
                    {name}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className={CARD}>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-[16px] font-semibold text-gray-800 dark:text-gray-100">
                Inventory snapshot
              </h2>
            </div>
            <ul className="flex flex-col gap-4">
              <li className="flex justify-between text-sm">
                <span className="text-gray-500">Total titles</span>
                <span className="font-bold text-gray-800 dark:text-gray-100">{totalBooks}</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-gray-500">Available copies</span>
                <span className="font-bold text-[#55b6b6]">{availableBooks}</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-gray-500">Borrowed out</span>
                <span className="font-bold" style={{ color: THEME.orange }}>{borrowedBooks}</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-gray-500">Genres tracked</span>
                <span className="font-bold text-gray-800 dark:text-gray-100">
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