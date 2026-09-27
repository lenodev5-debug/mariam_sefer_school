// src/pages/admin/AdminFormDashboard.jsx

import { useEffect, useMemo, useState } from "react";

import GradeForm from "../../shared/cards/Forms/GradeFrom";
import TimetableForm from "../../shared/cards/Forms/TimetableFrom";
import AcademicYearForm from "../../shared/cards/Forms/AcademicYear";
import DepartmentForm from "../../shared/cards/Forms/DepartmentForm";
import SubjectForm from "../../shared/cards/Forms/SubjectForm";

import gradeService from "../../../../lib/service/admin/gradeService";
import academicYearService from "../../../../lib/service/admin/academicYearService";
import timetableService from "../../../../lib/service/admin/timetable";
import departmentService from "../../../../lib/service/admin/departmentService";
import subjectService from "../../../../lib/service/admin/subjectService";

/* ============================================================
   FORM REGISTRY
   ============================================================ */

const FORM_TABS = [
    {
        key: "grade",
        label: "Grade",
        description: "Create grades and sections",
        icon: (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16v16H4z" />
                <path d="M8 8h8M8 12h8M8 16h5" />
            </svg>
        ),
        Component: GradeForm,
        service: gradeService,
        listKey: "getAllGrades",
        chart: "bar",
        itemLabel: (item) =>
            `${
                item.gradeName === "kg"
                    ? "KG"
                    : `Grade ${item.gradeName}`
            } — Section ${item.sectionName}`,
    },
    {
        key: "academicYear",
        label: "Academic Year",
        description: "Create and configure academic years",
        icon: (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="17" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
                <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
            </svg>
        ),
        Component: AcademicYearForm,
        service: academicYearService,
        listKey: "getAllAcademicYears",
        chart: "stacked",
        itemLabel: (item) =>
            item.name ||
            `${item.startYear}/${item.endYear}`,
    },
    {
        key: "timetable",
        label: "Timetable",
        description: "Add classes to the school timetable",
        icon: (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="17" rx="2" />
                <path d="M16 2v4M8 2v4M3 9h18" />
                <path d="M8 13h2M14 13h2M8 17h2M14 17h2" />
            </svg>
        ),
        Component: TimetableForm,
        service: timetableService,
        listKey: "getAllTimetables",
        chart: "week",
        itemLabel: (item) =>
            `${
                item.dayOfWeek
                    ? item.dayOfWeek.charAt(0).toUpperCase() +
                      item.dayOfWeek.slice(1)
                    : "—"
            } • ${item.startTime || "—"} - ${item.endTime || "—"}${
                item.room ? ` • ${item.room}` : ""
            }`,
    },
    {
        key: "department",
        label: "Department",
        description: "Organize school subjects",
        icon: (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M7 8h10M7 12h10M7 16h6" />
            </svg>
        ),
        Component: DepartmentForm,
        service: departmentService,
        listKey: "getAllDepartments",
        chart: "bar",
        itemLabel: (item) => item.name,
    },
    {
        key: "subject",
        label: "Subject",
        description: "Create subjects and assign departments",
        icon: (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 5h16M4 12h16M4 19h10" />
                <circle cx="18" cy="19" r="2" />
                <circle cx="18" cy="5" r="2" />
                <circle cx="18" cy="12" r="2" />
            </svg>
        ),
        Component: SubjectForm,
        service: subjectService,
        listKey: "getAllSubjects",
        chart: "bar",
        itemLabel: (item) =>
            `${item.name}${item.code ? ` (${item.code})` : ""}`,
    },
];

/* ============================================================
   CHART PRIMITIVES
   ============================================================ */

const DAY_ORDER = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
];

const COLORS = {
    emerald: "#10b981",
    red: "#ef4444",
    amber: "#f59e0b",
    blue: "#3b82f6",
    violet: "#8b5cf6",
};

/* ---------- Horizontal bar chart ---------- */
function HorizontalBarChart({ rows }) {
    const max = Math.max(1, ...rows.map((r) => r.value));
    const ticks = 5;

    return (
        <div className="w-full space-y-5">
            <div className="flex items-center gap-4">
                {rows.map((r) => (
                    <div
                        key={r.label}
                        className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300"
                    >
                        <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ background: r.color }}
                        />
                        {r.label}
                    </div>
                ))}
            </div>

            <div className="relative">
                <div className="pointer-events-none absolute inset-0 flex justify-between">
                    {Array.from({ length: ticks + 1 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-full w-px bg-gray-100 dark:bg-white/5"
                        />
                    ))}
                </div>

                <div className="relative space-y-5 py-2">
                    {rows.map((r) => {
                        const pct = (r.value / max) * 100;
                        return (
                            <div key={r.label} className="relative">
                                <div className="h-10 w-full rounded-md">
                                    <div
                                        className="flex h-full items-center justify-end rounded-md pr-2 text-[11px] font-semibold text-white transition-all duration-700"
                                        style={{
                                            width: `${pct}%`,
                                            minWidth:
                                                r.value > 0 ? 32 : 0,
                                            background: r.color,
                                        }}
                                    >
                                        {r.value > 0 && r.value}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-3 flex justify-between text-[10px] text-gray-400 dark:text-gray-500">
                    {Array.from({ length: ticks + 1 }).map((_, i) => (
                        <span key={i}>
                            {Math.round((max / ticks) * i)}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ---------- Stacked column chart ---------- */
function StackedColumnChart({ columns }) {
    const max = Math.max(
        1,
        ...columns.map((c) =>
            c.segments.reduce((s, seg) => s + seg.value, 0)
        )
    );
    const totalAll = columns.reduce(
        (s, c) => s + c.segments.reduce((a, b) => a + b.value, 0),
        0
    );

    return (
        <div className="w-full space-y-4">
            <div className="flex flex-wrap items-center gap-3">
                {columns[0]?.segments.map((seg) => (
                    <div
                        key={seg.label}
                        className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300"
                    >
                        <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ background: seg.color }}
                        />
                        {seg.label}
                    </div>
                ))}
            </div>

            <div className="flex h-[220px] items-end justify-around gap-4">
                {columns.map((col) => {
                    const total = col.segments.reduce(
                        (s, seg) => s + seg.value,
                        0
                    );
                    const totalPct = total / max;

                    return (
                        <div
                            key={col.label}
                            className="flex flex-1 flex-col items-center gap-2"
                        >
                            <div
                                className="flex w-full max-w-[80px] flex-col justify-end overflow-hidden rounded-t-md"
                                style={{ height: 200 }}
                            >
                                <div
                                    className="flex w-full flex-col justify-end transition-all duration-700"
                                    style={{
                                        height: `${totalPct * 100}%`,
                                    }}
                                >
                                    {col.segments
                                        .slice()
                                        .reverse()
                                        .map((seg) => {
                                            const h =
                                                total === 0
                                                    ? 0
                                                    : (seg.value /
                                                          total) *
                                                      100;
                                            return (
                                                <div
                                                    key={seg.label}
                                                    className="flex w-full items-center justify-center text-[10px] font-semibold text-white"
                                                    style={{
                                                        height: `${h}%`,
                                                        background:
                                                            seg.color,
                                                    }}
                                                >
                                                    {seg.value > 0 &&
                                                        totalAll > 0 &&
                                                        h > 14 &&
                                                        `${Math.round(
                                                            (seg.value /
                                                                totalAll) *
                                                                100
                                                        )}%`}
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                            <span className="text-[10px] text-gray-500 dark:text-gray-400">
                                {col.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/* ---------- Weekly column chart ---------- */
function WeeklyColumnChart({ data }) {
    const max = Math.max(1, ...data.map((d) => d.value));
    const ticks = 4;

    return (
        <div className="w-full space-y-4">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                    <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ background: COLORS.violet }}
                    />
                    Classes
                </div>
            </div>

            <div className="relative flex h-[220px] items-end justify-between gap-2 px-1">
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
                    {Array.from({ length: ticks + 1 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-px w-full bg-gray-100 dark:bg-white/5"
                        />
                    ))}
                </div>

                {data.map((d) => {
                    const pct = (d.value / max) * 100;
                    return (
                        <div
                            key={d.label}
                            className="relative flex flex-1 flex-col items-center gap-2"
                        >
                            <div className="relative flex h-[190px] w-full items-end justify-center">
                                <div
                                    className="w-full max-w-[28px] rounded-t-md transition-all duration-700"
                                    style={{
                                        height: `${pct}%`,
                                        background: `linear-gradient(180deg, ${COLORS.violet}, ${COLORS.blue})`,
                                    }}
                                    title={`${d.value} classes`}
                                />
                            </div>
                            <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">
                                {d.label.slice(0, 3)}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/* ---------- Trend line ---------- */
function TrendLineChart({ data, color = COLORS.blue }) {
    const w = 320;
    const h = 120;
    const pad = 8;
    const max = Math.max(1, ...data.map((d) => d.value));

    const points = data.map((d, i) => {
        const x =
            pad +
            (i * (w - pad * 2)) / Math.max(1, data.length - 1);
        const y = h - pad - (d.value / max) * (h - pad * 2);
        return { x, y, ...d };
    });

    const pathD = points
        .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
        .join(" ");

    const areaD =
        `M ${points[0].x} ${h - pad} ` +
        points.map((p) => `L ${p.x} ${p.y}`).join(" ") +
        ` L ${points[points.length - 1].x} ${h - pad} Z`;

    return (
        <div className="w-full">
            <svg
                viewBox={`0 0 ${w} ${h}`}
                className="w-full"
                preserveAspectRatio="none"
                style={{ minHeight: 120 }}
            >
                <defs>
                    <linearGradient
                        id="trendFill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop
                            offset="0%"
                            stopColor={color}
                            stopOpacity="0.35"
                        />
                        <stop
                            offset="100%"
                            stopColor={color}
                            stopOpacity="0"
                        />
                    </linearGradient>
                </defs>

                {[0, 0.25, 0.5, 0.75, 1].map((f) => (
                    <line
                        key={f}
                        x1={pad}
                        x2={w - pad}
                        y1={pad + f * (h - pad * 2)}
                        y2={pad + f * (h - pad * 2)}
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-gray-100 dark:text-white/5"
                    />
                ))}

                <path d={areaD} fill="url(#trendFill)" />
                <path
                    d={pathD}
                    fill="none"
                    stroke={color}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                {points.map((p, i) => (
                    <circle
                        key={i}
                        cx={p.x}
                        cy={p.y}
                        r="3"
                        fill="white"
                        stroke={color}
                        strokeWidth="2"
                    />
                ))}
            </svg>

            <div className="mt-2 flex justify-between text-[10px] text-gray-400 dark:text-gray-500">
                {data.map((d) => (
                    <span key={d.label}>{d.label}</span>
                ))}
            </div>
        </div>
    );
}

/* ---------- Donut ---------- */
function Donut({ value, total, color, label }) {
    const size = 110;
    const stroke = 12;
    const r = (size - stroke) / 2;
    const c = 2 * Math.PI * r;
    const pct = total === 0 ? 0 : value / total;
    const len = pct * c;

    return (
        <div className="flex flex-col items-center gap-2">
            <div
                className="relative"
                style={{ width: size, height: size }}
            >
                <svg
                    width={size}
                    height={size}
                    className="-rotate-90"
                >
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={r}
                        stroke="currentColor"
                        strokeWidth={stroke}
                        fill="none"
                        className="text-gray-100 dark:text-white/10"
                    />
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={r}
                        stroke={color}
                        strokeWidth={stroke}
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${len} ${c - len}`}
                        className="transition-all duration-700"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {Math.round(pct * 100)}%
                    </span>
                </div>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
                {label}
            </span>
        </div>
    );
}

/* ---------- Stat pill (square) ---------- */
function StatPill({ label, value, tone = "blue" }) {
    const tones = {
        blue: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30",
        green: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30",
        red: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30",
        amber: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30",
        violet: "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/30",
    };
    return (
        <div className="flex h-full items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-4 shadow-sm dark:border-white/10 dark:bg-[#151515]">
            <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-base font-semibold ${tones[tone]}`}
            >
                {value}
            </span>
            <span className="truncate text-sm font-medium text-gray-600 dark:text-gray-300">
                {label}
            </span>
        </div>
    );
}

/* ---------- Skeleton ---------- */
function SkeletonRow() {
    return (
        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-[#1a1a1a]">
            <div className="h-8 w-8 animate-pulse rounded-lg bg-gray-200 dark:bg-white/10" />
            <div className="flex-1 space-y-2">
                <div className="h-3 w-1/3 animate-pulse rounded bg-gray-200 dark:bg-white/10" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-white/10" />
            </div>
        </div>
    );
}

/* ============================================================
   MODAL
   ============================================================ */

function FormModal({ open, onClose, title, icon, children }) {
    /* ---- close on Escape ---- */
    useEffect(() => {
        if (!open) return;

        const onKey = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    /* ---- lock body scroll while open ---- */
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Panel */}
            <div
                role="dialog"
                aria-modal="true"
                className="
                    relative z-10 flex w-full max-w-2xl flex-col
                    max-h-[90vh] overflow-hidden
                    rounded-2xl border border-gray-200 bg-white
                    shadow-2xl
                    dark:border-white/10 dark:bg-[#151515]
                "
            >
                {/* Header */}
                <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-5 py-4 dark:border-white/10">
                    <div className="flex items-center gap-3 min-w-0">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-200">
                            {icon}
                        </span>
                        <h2 className="truncate text-base font-semibold text-gray-900 dark:text-white">
                            {title}
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="
                            flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
                            text-gray-500 transition
                            hover:bg-gray-100 hover:text-gray-900
                            dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white
                        "
                    >
                        <svg
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        >
                            <path d="M6 6l12 12M6 18L18 6" />
                        </svg>
                    </button>
                </div>

                {/* Body (scrollable) */}
                <div className="flex-1 overflow-y-auto p-1">
                    {children}
                </div>
            </div>
        </div>
    );
}

/* ============================================================
   DASHBOARD
   ============================================================ */

export default function AdminFormDashboard() {
    const [activeKey, setActiveKey] = useState(FORM_TABS[0].key);
    const [items, setItems] = useState([]);
    const [loadingList, setLoadingList] = useState(false);
    const [listError, setListError] = useState("");

    const [modalOpen, setModalOpen] = useState(false);

    const activeTab = useMemo(
        () => FORM_TABS.find((t) => t.key === activeKey),
        [activeKey]
    );

    /* ---------- Load list ---------- */
    useEffect(() => {
        let cancelled = false;

        const loadList = async () => {
            try {
                setLoadingList(true);
                setListError("");
                setItems([]);

                const service = activeTab.service;
                const fn = service[activeTab.listKey];
                if (typeof fn !== "function") {
                    throw new Error(
                        `Service method ${activeTab.listKey} not found`
                    );
                }

                const response = await fn();

                if (cancelled) return;

                if (!response?.success) {
                    throw new Error(
                        response?.message || "Failed to load data."
                    );
                }

                setItems(response.data || []);
            } catch (err) {
                if (cancelled) return;
                setListError(
                    err.response?.data?.message ||
                        err.message ||
                        "Failed to load data."
                );
            } finally {
                if (!cancelled) setLoadingList(false);
            }
        };

        loadList();

        return () => {
            cancelled = true;
        };
    }, [activeTab]);

    /* ---------- Stats ---------- */
    const stats = useMemo(() => {
        const total = items.length;
        const active = items.filter(
            (i) => i.status === "active"
        ).length;
        const inactive = items.filter(
            (i) => i.status === "inactive"
        ).length;
        const upcoming = items.filter(
            (i) => i.status === "upcoming"
        ).length;
        const completed = items.filter(
            (i) => i.status === "completed"
        ).length;
        return { total, active, inactive, upcoming, completed };
    }, [items]);

    /* ---------- Weekly data ---------- */
    const weeklyData = useMemo(() => {
        const counts = Object.fromEntries(
            DAY_ORDER.map((d) => [d, 0])
        );
        items.forEach((it) => {
            const d = (it.dayOfWeek || "").toLowerCase();
            if (counts[d] !== undefined) counts[d] += 1;
        });
        return DAY_ORDER.map((d) => ({
            label: d,
            value: counts[d],
        }));
    }, [items]);

    /* ---------- Trend data ---------- */
    const trendData = useMemo(() => {
        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const buckets = Object.fromEntries(days.map((d) => [d, 0]));
        items.forEach((it) => {
            const created =
                it.createdAt || it.startDate || it.updatedAt;
            if (!created) return;
            const d = new Date(created);
            if (isNaN(d)) return;
            const name = days[(d.getDay() + 6) % 7];
            buckets[name] += 1;
        });
        const maxReal = Math.max(...Object.values(buckets));
        if (maxReal === 0) {
            return days.map((d, i) => ({
                label: d,
                value: Math.max(
                    0,
                    Math.round(items.length / 7) + (i % 3)
                ),
            }));
        }
        return days.map((d) => ({ label: d, value: buckets[d] }));
    }, [items]);

    const handleCreated = (created) => {
        if (!created) return;
        setItems((prev) => [created, ...prev]);
        setModalOpen(false);
    };

    const ActiveForm = activeTab.Component;

    /* ---------- Chart switcher ---------- */
    const renderChart = () => {
        if (activeTab.chart === "stacked") {
            return (
                <StackedColumnChart
                    columns={[
                        {
                            label: "This year",
                            segments: [
                                {
                                    label: "Upcoming",
                                    value: stats.upcoming,
                                    color: COLORS.amber,
                                },
                                {
                                    label: "Active",
                                    value: stats.active,
                                    color: COLORS.emerald,
                                },
                                {
                                    label: "Completed",
                                    value: stats.completed,
                                    color: COLORS.violet,
                                },
                            ],
                        },
                    ]}
                />
            );
        }

        if (activeTab.chart === "week") {
            return <WeeklyColumnChart data={weeklyData} />;
        }

        return (
            <HorizontalBarChart
                rows={[
                    {
                        label: "Active",
                        value: stats.active,
                        color: COLORS.blue,
                    },
                    {
                        label: "Inactive",
                        value: stats.inactive,
                        color: COLORS.red,
                    },
                ]}
            />
        );
    };

    return (
        <div className="min-h-screen w-full space-y-4 p-3 sm:p-5">
            <div className="mx-auto w-full max-w-[1600px] space-y-4">
                {/* ================================================= */}
                {/* TABS */}
                {/* ================================================= */}
                <div className="mt-15 flex flex-wrap items-center gap-1.5 rounded-2xl border border-gray-200 bg-white p-1.5 dark:border-white/10 dark:bg-[#151515]">
                    {FORM_TABS.map((tab) => {
                        const active = tab.key === activeKey;
                        return (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => setActiveKey(tab.key)}
                                className={`
                                    flex min-w-[140px] flex-1 items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition
                                    ${
                                        active
                                            ? "bg-black text-white dark:bg-white dark:text-black"
                                            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
                                    }
                                `}
                            >
                                <span
                                    className={`
                                        flex h-8 w-8 shrink-0 items-center justify-center rounded-lg
                                        ${
                                            active
                                                ? "bg-white/15 dark:bg-black/10"
                                                : "bg-gray-100 dark:bg-white/10"
                                        }
                                    `}
                                >
                                    {tab.icon}
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span className="block truncate text-sm font-semibold leading-tight">
                                        {tab.label}
                                    </span>
                                    <span
                                        className={`block truncate text-[11px] leading-tight ${
                                            active
                                                ? "text-white/70 dark:text-black/60"
                                                : "text-gray-500 dark:text-gray-400"
                                        }`}
                                    >
                                        {tab.description}
                                    </span>
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* ================================================= */}
                {/* ROW 1: Main chart (58%) + Overview trend (38%) */}
                {/* ================================================= */}
                <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-[58fr_38fr]">
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#151515]">
                        <div className="mb-4 flex items-start justify-between gap-2">
                            <div className="min-w-0">
                                <h3 className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                                    {activeTab.label} statistics
                                </h3>
                                <p className="mt-0.5 text-[11px] text-gray-500 dark:text-gray-400">
                                    Live overview
                                </p>
                            </div>
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-200">
                                {activeTab.icon}
                            </span>
                        </div>

                        <div className="flex h-[260px] items-center justify-center">
                            {renderChart()}
                        </div>
                    </div>

                    <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#151515]">
                        <div className="mb-3 flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                Overview
                            </h3>
                            <span className="text-[11px] text-gray-500 dark:text-gray-400">
                                This week
                            </span>
                        </div>
                        <div className="flex flex-1 items-end">
                            <TrendLineChart data={trendData} />
                        </div>
                    </div>
                </div>

                {/* ================================================= */}
                {/* ROW 2: Circles (58%) + Stat squares (38%) */}
                {/* ================================================= */}
                <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-[58fr_38fr]">
                    <div className="grid grid-cols-3 gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#151515]">
                        <Donut
                            value={stats.active}
                            total={stats.total}
                            color={COLORS.emerald}
                            label="Active"
                        />
                        <Donut
                            value={
                                activeTab.key === "academicYear"
                                    ? stats.upcoming
                                    : stats.inactive
                            }
                            total={stats.total}
                            color={
                                activeTab.key === "academicYear"
                                    ? COLORS.amber
                                    : COLORS.red
                            }
                            label={
                                activeTab.key === "academicYear"
                                    ? "Upcoming"
                                    : "Inactive"
                            }
                        />
                        <Donut
                            value={stats.total}
                            total={stats.total}
                            color={COLORS.violet}
                            label="Total"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <StatPill
                            label="Total"
                            value={stats.total}
                            tone="blue"
                        />
                        <StatPill
                            label="Active"
                            value={stats.active}
                            tone="green"
                        />
                        <StatPill
                            label="Inactive"
                            value={stats.inactive}
                            tone="red"
                        />
                        {activeTab.key === "academicYear" ? (
                            <StatPill
                                label="Completed"
                                value={stats.completed}
                                tone="violet"
                            />
                        ) : (
                            <StatPill
                                label="Records"
                                value={items.length}
                                tone="amber"
                            />
                        )}
                    </div>
                </div>

                {/* ================================================= */}
                {/* ROW 3: BOTTOM LIST */}
                {/* ================================================= */}
                <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#151515]">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                All {activeTab.label}s
                            </h3>
                            <p className="mt-0.5 text-[11px] text-gray-500 dark:text-gray-400">
                                {items.length} record
                                {items.length !== 1 ? "s" : ""}
                            </p>
                        </div>
                    </div>

                    {loadingList && (
                        <div className="space-y-2">
                            <SkeletonRow />
                            <SkeletonRow />
                            <SkeletonRow />
                        </div>
                    )}

                    {!loadingList && listError && (
                        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                            {listError}
                        </div>
                    )}

                    {!loadingList &&
                        !listError &&
                        items.length === 0 && (
                            <div className="rounded-xl border border-dashed border-gray-300 px-4 py-10 text-center text-sm text-gray-500 dark:border-white/10 dark:text-gray-400">
                                No {activeTab.label.toLowerCase()}s yet.
                                Create one to get started.
                            </div>
                        )}

                    {!loadingList &&
                        !listError &&
                        items.length > 0 && (
                            <ul className="max-h-[420px] space-y-2 overflow-y-auto pr-1">
                                {items.map((item) => {
                                    const status =
                                        item.status || "—";
                                    const statusTone =
                                        status === "active"
                                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                                            : status === "upcoming"
                                            ? "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
                                            : status === "completed"
                                            ? "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400"
                                            : "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400";

                                    return (
                                        <li
                                            key={item._id}
                                            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 transition hover:border-gray-300 dark:border-white/10 dark:bg-[#1a1a1a] dark:hover:border-white/20"
                                        >
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-200">
                                                {activeTab.icon}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                                                    {activeTab.itemLabel(
                                                        item
                                                    )}
                                                </p>
                                                {item.description && (
                                                    <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                                                        {item.description}
                                                    </p>
                                                )}
                                            </div>

                                            <span
                                                className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium capitalize ${statusTone}`}
                                            >
                                                {status}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                </section>
            </div>

            {/* ================================================= */}
            {/* FLOATING CREATE BUTTON */}
            {/* ================================================= */}
            <button
                type="button"
                onClick={() => setModalOpen(true)}
                aria-label={`Create ${activeTab.label}`}
                className="
                    fixed bottom-6 right-6 z-40
                    flex items-center gap-2
                    rounded-full bg-black px-5 py-3.5
                    text-sm font-semibold text-white
                    shadow-lg shadow-black/20
                    transition hover:bg-gray-800 hover:scale-105
                    active:scale-95
                    dark:bg-white dark:text-black dark:hover:bg-gray-200
                "
            >
                <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                >
                    <path d="M12 5v14M5 12h14" />
                </svg>
                <span>Create {activeTab.label}</span>
            </button>

            {/* ================================================= */}
            {/* FORM MODAL */}
            {/* ================================================= */}
            <FormModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title={`Create ${activeTab.label}`}
                icon={activeTab.icon}
            >
                <ActiveForm onSuccess={handleCreated} />
            </FormModal>
        </div>
    );
}