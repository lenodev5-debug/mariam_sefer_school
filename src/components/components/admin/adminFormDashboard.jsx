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

import FloatingMenu from "../../shared/ui/FloatingMenu";

import {
    AreaChart,
    HorizontalBarChart,
    StackedColumnChart,
    WeeklyColumnChart,
    DonutChart,
    COLORS,
    DAY_ORDER,
} from "../../shared/cards/charts";


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
   LOCAL UI ATOMS
   ============================================================ */

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
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

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
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
                aria-hidden="true"
            />

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
                {/* TABS */}
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
                {/* ROW 1: Main chart + Overview (now using AreaChart) */}
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

                        {/* ✅ Same gradient area UI as the Growth chart */}
                        <div className="flex flex-1 items-end">
                            <AreaChart data={trendData} />
                        </div>
                    </div>
                </div>

                {/* ================================================= */}
                {/* ROW 2: Donuts + Stat squares */}
                {/* ================================================= */}
                <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-[58fr_38fr]">
                    <div className="grid grid-cols-3 gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#151515]">
                        <DonutChart
                            value={stats.active}
                            total={stats.total}
                            color={COLORS.emerald}
                            label="Active"
                            size={110}
                        />
                        <DonutChart
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
                            size={110}
                        />
                        <DonutChart
                            value={stats.total}
                            total={stats.total}
                            color={COLORS.violet}
                            label="Total"
                            size={110}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <StatPill label="Total" value={stats.total} tone="blue" />
                        <StatPill label="Active" value={stats.active} tone="green" />
                        <StatPill label="Inactive" value={stats.inactive} tone="red" />
                        {activeTab.key === "academicYear" ? (
                            <StatPill label="Completed" value={stats.completed} tone="violet" />
                        ) : (
                            <StatPill label="Records" value={items.length} tone="amber" />
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

                    {!loadingList && !listError && items.length === 0 && (
                        <div className="rounded-xl border border-dashed border-gray-300 px-4 py-10 text-center text-sm text-gray-500 dark:border-white/10 dark:text-gray-400">
                            No {activeTab.label.toLowerCase()}s yet.
                            Create one to get started.
                        </div>
                    )}

                    {!loadingList && !listError && items.length > 0 && (
                        <ul className="max-h-[420px] space-y-2 overflow-y-auto pr-1">
                            {items.map((item) => {
                                const status = item.status || "—";
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
                                                {activeTab.itemLabel(item)}
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

            <FloatingMenu />

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