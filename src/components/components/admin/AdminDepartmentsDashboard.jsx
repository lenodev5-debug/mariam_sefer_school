import { useEffect, useMemo, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSchool,
    faCircleCheck,
    faCirclePause,
    faCirclePlus,
    faEllipsisVertical,
    faMagnifyingGlass,
    faFolderOpen,
    faBookOpen,
    faBook,
    faLayerGroup,
    faChartLine,
} from '@fortawesome/free-solid-svg-icons';

import departmentService from '../../../../lib/service/admin/departmentService';
import subjectService from '../../../../lib/service/admin/subjectService';
import FloatingMenu from '../../shared/ui/FloatingMenu';


/* ============================================================
 * HELPERS
 * ============================================================ */

const MONTH_LABELS = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function formatDuration(ms) {
    if (ms <= 0) return '0m';

    const totalMinutes = Math.floor(ms / 60000);
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const minutes = totalMinutes % 60;

    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
}

function timeAgo(date) {
    const diff = Date.now() - new Date(date).getTime();
    return formatDuration(diff) + ' ago';
}

// Extract "name" from either a string, an id, or a populated object
function resolveName(value) {
    if (!value) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'object') return value.name || value.code || '';
    return String(value);
}

/* ============================================================
 * COMPONENT
 * ============================================================ */

export default function AdminDepartmentsDashboard() {
    const [departments, setDepartments] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');

    /* ============================================================
     * FETCH (departments + subjects)
     * ============================================================ */

    useEffect(() => {
        const fetchAll = async () => {
            try {
                setLoading(true);
                setError('');

                const [deptRes, subjRes] = await Promise.all([
                    departmentService.getAllDepartments(),
                    subjectService.getAllSubjects(),
                ]);

                setDepartments(
                    deptRes?.success
                        ? deptRes.data || []
                        : deptRes?.data || []
                );

                setSubjects(
                    subjRes?.success
                        ? subjRes.data || []
                        : subjRes?.data || []
                );
            } catch (err) {
                console.error(
                    'Failed to fetch dashboard data:',
                    err
                );
                setError(
                    err?.message ||
                    'Failed to load dashboard data.'
                );
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, []);

    /* ============================================================
     * SEARCH
     * ============================================================ */

    const filteredDepartments = useMemo(() => {
        const query = search.toLowerCase().trim();
        if (!query) return departments;

        return departments.filter((department) => {
            const name = department?.name?.toLowerCase() || '';
            const code = department?.code?.toLowerCase() || '';
            const description =
                department?.description?.toLowerCase() || '';

            return (
                name.includes(query) ||
                code.includes(query) ||
                description.includes(query)
            );
        });
    }, [departments, search]);

    /* ============================================================
     * STATISTICS
     * ============================================================ */

    const activeDepartments = departments.filter(
        (d) => d?.status === 'active'
    ).length;

    const inactiveDepartments = departments.filter(
        (d) => d?.status === 'inactive'
    ).length;

    const recentlyAdded = useMemo(() => {
        const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
        return departments.filter(
            (d) => new Date(d.createdAt).getTime() >= weekAgo
        ).length;
    }, [departments]);

    const activeSubjects = subjects.filter(
        (s) => s?.status === 'active'
    ).length;

    const inactiveSubjects = subjects.filter(
        (s) => s?.status === 'inactive'
    ).length;

    /* ============================================================
     * CHART DATA
     * ============================================================ */

    const monthlyData = useMemo(() => {
        const now = new Date();
        const buckets = Array.from({ length: 12 }, (_, i) => {
            const d = new Date(
                now.getFullYear(),
                now.getMonth() - (11 - i),
                1
            );
            return {
                label: MONTH_LABELS[d.getMonth()],
                year: d.getFullYear(),
                month: d.getMonth(),
                value: 0,
                subjects: 0,
            };
        });

        // departments per month
        departments.forEach((d) => {
            const created = new Date(d.createdAt);
            const bucket = buckets.find(
                (b) =>
                    b.year === created.getFullYear() &&
                    b.month === created.getMonth()
            );
            if (bucket) bucket.value += 1;
        });

        // subjects per month (overlay)
        subjects.forEach((s) => {
            const created = new Date(s.createdAt);
            const bucket = buckets.find(
                (b) =>
                    b.year === created.getFullYear() &&
                    b.month === created.getMonth()
            );
            if (bucket) bucket.subjects += 1;
        });

        return buckets;
    }, [departments, subjects]);

    const weeklyData = useMemo(() => {
        const now = new Date();
        const buckets = Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(now.getDate() - (6 - i));
            d.setHours(0, 0, 0, 0);
            return {
                label: DAY_LABELS[d.getDay()],
                date: d,
                value: 0,
            };
        });

        departments.forEach((d) => {
            const created = new Date(d.createdAt);
            created.setHours(0, 0, 0, 0);
            const bucket = buckets.find(
                (b) => b.date.getTime() === created.getTime()
            );
            if (bucket) bucket.value += 1;
        });

        return buckets;
    }, [departments]);

    const recentDepartments = useMemo(() => {
        return [...departments]
            .sort(
                (a, b) =>
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
            )
            .slice(0, 3);
    }, [departments]);

    // Subjects grouped by department (top 3 departments by subject count)
    const topSubjectsByDepartment = useMemo(() => {
        const map = new Map();

        subjects.forEach((s) => {
            const deptName = resolveName(s.department) || 'Unassigned';
            if (!map.has(deptName)) {
                map.set(deptName, {
                    name: deptName,
                    count: 0,
                    active: 0,
                });
            }
            const entry = map.get(deptName);
            entry.count += 1;
            if (s.status === 'active') entry.active += 1;
        });

        return [...map.values()]
            .sort((a, b) => b.count - a.count)
            .slice(0, 3);
    }, [subjects]);

    const maxSubjectCount = Math.max(
        1,
        ...topSubjectsByDepartment.map((d) => d.count)
    );

    /* ============================================================
     * LOADING
     * ============================================================ */

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6 dark:bg-[#0f0f0f]">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8">
                        <div className="h-8 w-56 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
                        <div className="mt-3 h-4 w-80 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[1, 2, 3, 4].map((item) => (
                            <div
                                key={item}
                                className="h-32 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800"
                            />
                        ))}
                    </div>

                    <div className="mt-6 grid gap-4 lg:grid-cols-3">
                        <div className="h-72 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800 lg:col-span-2" />
                        <div className="h-72 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
                    </div>

                    <div className="mt-6 grid gap-4 lg:grid-cols-3">
                        <div className="h-64 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
                        <div className="h-64 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800 lg:col-span-2" />
                    </div>
                </div>
            </div>
        );
    }

    /* ============================================================
     * ERROR
     * ============================================================ */

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 p-6 dark:bg-[#0f0f0f]">
                <div className="mx-auto max-w-7xl">
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-900/40 dark:bg-red-950/20">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                                !
                            </div>
                            <div>
                                <h2 className="font-semibold text-red-700 dark:text-red-400">
                                    Unable to load dashboard
                                </h2>
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                    {error}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /* ============================================================
     * DASHBOARD
     * ============================================================ */

    return (
        <div className="min-h-screen bg-[#0f0f0f] p-4 pt-20 sm:p-6 sm:pt-20">
            <div className="mx-auto max-w-7xl">

                {/* HEADER */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-white">
                            Departments
                        </h1>
                        <p className="mt-1 text-sm text-gray-400">
                            Manage departments and subjects
                        </p>
                    </div>
                </div>

                {/* ================================================
                    STAT CARDS
                ================================================ */}

                <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <GradientStatCard
                        title="Total Departments"
                        value={departments.length}
                        gradient="from-indigo-500 via-indigo-500 to-violet-500"
                        icon={faSchool}
                    />
                    <GradientStatCard
                        title="Active"
                        value={activeDepartments}
                        gradient="from-rose-400 via-rose-500 to-red-500"
                        icon={faCircleCheck}
                    />
                    <GradientStatCard
                        title="Inactive"
                        value={inactiveDepartments}
                        gradient="from-violet-500 via-purple-500 to-fuchsia-500"
                        icon={faCirclePause}
                    />
                    <GradientStatCard
                        title="Added This Week"
                        value={recentlyAdded}
                        gradient="from-sky-400 via-cyan-500 to-teal-500"
                        icon={faCirclePlus}
                    />
                </div>

                {/* ================================================
                    AREA + DONUT
                ================================================ */}

                <div className="mb-6 grid gap-4 lg:grid-cols-3">

                    <div className="rounded-2xl border border-gray-800 bg-[#171717] p-5 lg:col-span-2">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon
                                    icon={faChartLine}
                                    className="text-indigo-400"
                                />
                                <h2 className="text-base font-semibold text-white">
                                    Growth
                                </h2>
                            </div>
                            <div className="flex items-center gap-2 rounded-lg border border-gray-700 px-3 py-1.5 text-xs text-gray-300">
                                Last 12 months
                                <FontAwesomeIcon
                                    icon={faLayerGroup}
                                    className="text-[10px]"
                                />
                            </div>
                        </div>

                        <AreaChart data={monthlyData} />
                    </div>

                    <div className="rounded-2xl border border-gray-800 bg-[#171717] p-5">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-base font-semibold text-white">
                                Department Status
                            </h2>
                            <button className="text-gray-500 hover:text-gray-300">
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        </div>

                        <DonutChart
                            active={activeDepartments}
                            inactive={inactiveDepartments}
                        />
                    </div>
                </div>

                {/* ================================================
                    WEEKLY + RECENT
                ================================================ */}

                <div className="mb-6 grid gap-4 lg:grid-cols-3">

                    <div className="rounded-2xl border border-gray-800 bg-[#171717] p-5">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-base font-semibold text-white">
                                Weekly Report
                            </h2>
                            <button className="text-gray-500 hover:text-gray-300">
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        </div>

                        <p className="text-xs text-gray-400">Total this week</p>
                        <p className="mt-1 text-2xl font-bold text-white">
                            {weeklyData.reduce((s, d) => s + d.value, 0)}{' '}
                            <span className="text-sm font-normal text-gray-400">
                                departments
                            </span>
                        </p>

                        <BarChart data={weeklyData} />
                    </div>

                    <div className="rounded-2xl border border-gray-800 bg-[#171717] p-5 lg:col-span-2">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-base font-semibold text-white">
                                Recent Departments
                            </h2>
                            <button className="text-gray-500 hover:text-gray-300">
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        </div>

                        {recentDepartments.length === 0 ? (
                            <p className="py-8 text-center text-sm text-gray-500">
                                No departments yet.
                            </p>
                        ) : (
                            <ul className="space-y-5">
                                {recentDepartments.map((d) => {
                                    const progress = Math.min(
                                        100,
                                        ((d.description?.length || 0) /
                                            200) *
                                            100
                                    );

                                    return (
                                        <li key={d._id}>
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate font-medium text-white">
                                                        {d.name || 'Unnamed'}
                                                    </p>
                                                    <p className="mt-0.5 truncate text-xs text-gray-400">
                                                        {d.description ||
                                                            'No description'}
                                                    </p>
                                                </div>
                                                <span className="shrink-0 text-xs font-medium text-gray-300">
                                                    {timeAgo(d.createdAt)}
                                                </span>
                                            </div>

                                            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-800">
                                                <div
                                                    className={`h-full rounded-full ${
                                                        d.status === 'active'
                                                            ? 'bg-green-500'
                                                            : 'bg-violet-500'
                                                    }`}
                                                    style={{
                                                        width: `${progress}%`,
                                                    }}
                                                />
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                </div>

                {/* ================================================
                    SUBJECTS OVERVIEW
                ================================================ */}

                <div className="mb-6 grid gap-4 lg:grid-cols-3">

                    {/* Subject counts */}
                    <div className="rounded-2xl border border-gray-800 bg-[#171717] p-5">
                        <div className="mb-4 flex items-center gap-2">
                            <FontAwesomeIcon
                                icon={faBookOpen}
                                className="text-cyan-400"
                            />
                            <h2 className="text-base font-semibold text-white">
                                Subjects
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-gray-400">
                                    Total subjects
                                </p>
                                <p className="text-3xl font-bold text-white">
                                    {subjects.length}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="rounded-xl bg-green-500/10 p-3">
                                    <p className="text-xs text-green-400">
                                        Active
                                    </p>
                                    <p className="text-lg font-semibold text-white">
                                        {activeSubjects}
                                    </p>
                                </div>
                                <div className="rounded-xl bg-orange-500/10 p-3">
                                    <p className="text-xs text-orange-400">
                                        Inactive
                                    </p>
                                    <p className="text-lg font-semibold text-white">
                                        {inactiveSubjects}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Top subjects per department */}
                    <div className="rounded-2xl border border-gray-800 bg-[#171717] p-5 lg:col-span-2">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon
                                    icon={faLayerGroup}
                                    className="text-violet-400"
                                />
                                <h2 className="text-base font-semibold text-white">
                                    Subjects per Department
                                </h2>
                            </div>
                            <button className="text-gray-500 hover:text-gray-300">
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        </div>

                        {topSubjectsByDepartment.length === 0 ? (
                            <p className="py-8 text-center text-sm text-gray-500">
                                No subjects yet.
                            </p>
                        ) : (
                            <ul className="space-y-5">
                                {topSubjectsByDepartment.map((d, i) => {
                                    const progress =
                                        (d.count / maxSubjectCount) * 100;

                                    return (
                                        <li key={i}>
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex items-center gap-3 min-w-0 flex-1">
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-cyan-300">
                                                        <FontAwesomeIcon
                                                            icon={faBook}
                                                            className="text-sm"
                                                        />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="truncate font-medium text-white">
                                                            {d.name}
                                                        </p>
                                                        <p className="mt-0.5 truncate text-xs text-gray-400">
                                                            {d.active} active ·{' '}
                                                            {d.count - d.active}{' '}
                                                            inactive
                                                        </p>
                                                    </div>
                                                </div>
                                                <span className="shrink-0 text-xs font-medium text-gray-300">
                                                    {d.count} subjects
                                                </span>
                                            </div>

                                            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-800">
                                                <div
                                                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                                                    style={{
                                                        width: `${progress}%`,
                                                    }}
                                                />
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                </div>

                {/* ================================================
                    ALL DEPARTMENTS LIST
                ================================================ */}

                <div className="overflow-hidden rounded-2xl border border-gray-800 bg-[#171717]">
                    <div className="flex flex-col gap-4 border-b border-gray-800 p-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-white">
                                All Departments
                            </h2>
                            <p className="mt-1 text-sm text-gray-400">
                                {filteredDepartments.length} departments found
                            </p>
                        </div>

                        <div className="relative w-full sm:w-72">
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400"
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search departments..."
                                className="h-10 w-full rounded-xl border border-gray-700 bg-[#202020] pl-9 pr-4 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                            />
                        </div>
                    </div>

                    {filteredDepartments.length === 0 && (
                        <div className="px-6 py-16 text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-800 text-gray-400">
                                <FontAwesomeIcon
                                    icon={faFolderOpen}
                                    className="text-2xl"
                                />
                            </div>
                            <h3 className="mt-4 font-semibold text-white">
                                No departments found
                            </h3>
                            <p className="mt-1 text-sm text-gray-400">
                                Try changing your search.
                            </p>
                        </div>
                    )}

                    {filteredDepartments.length > 0 && (
                        <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredDepartments.map((department) => {
                                const count = subjects.filter((s) => {
                                    const deptName = resolveName(s.department);
                                    return (
                                        deptName === department.name ||
                                        s.department === department._id
                                    );
                                }).length;

                                return (
                                    <div
                                        key={department._id}
                                        className="group rounded-2xl border border-gray-800 bg-[#202020] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-lg"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                                                <FontAwesomeIcon
                                                    icon={faSchool}
                                                    className="text-lg"
                                                />
                                            </div>

                                            <span
                                                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                                    department.status === 'active'
                                                        ? 'bg-green-500/10 text-green-400'
                                                        : 'bg-gray-700 text-gray-300'
                                                }`}
                                            >
                                                {department.status || 'unknown'}
                                            </span>
                                        </div>

                                        <h3 className="mt-5 truncate text-lg font-semibold text-white">
                                            {department.name || 'Unnamed Department'}
                                        </h3>

                                        {department.code && (
                                            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-blue-400">
                                                {department.code}
                                            </p>
                                        )}

                                        <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-5 text-gray-400">
                                            {department.description ||
                                                'No description available.'}
                                        </p>

                                        <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                                            <FontAwesomeIcon
                                                icon={faBook}
                                                className="text-cyan-400"
                                            />
                                            <span>
                                                {count} subject
                                                {count === 1 ? '' : 's'}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

            </div>
            <FloatingMenu />
        </div>
    );
}

/* ============================================================
 * GRADIENT STAT CARD
 * ============================================================ */

function GradientStatCard({ title, value, gradient, icon }) {
    return (
        <div
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-5 text-white shadow-lg`}
        >
            <svg
                className="pointer-events-none absolute bottom-0 left-0 h-20 w-full opacity-30"
                viewBox="0 0 400 80"
                preserveAspectRatio="none"
            >
                <path
                    d="M0 40 Q 100 10 200 40 T 400 40 V 80 H 0 Z"
                    fill="rgba(255,255,255,0.35)"
                />
            </svg>

            <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-base backdrop-blur">
                        <FontAwesomeIcon icon={icon} />
                    </div>
                    <p className="text-sm font-medium">{title}</p>
                </div>

                <button className="text-white/70 hover:text-white">
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
            </div>

            <div className="relative mt-6">
                <p className="text-xs text-white/80">Total</p>
                <p className="text-2xl font-bold">{value}</p>
            </div>
        </div>
    );
}

/* ============================================================
 * AREA CHART (SVG)
 * ============================================================ */

function AreaChart({ data }) {
    const width = 600;
    const height = 180;
    const padding = { top: 10, right: 10, bottom: 30, left: 40 };

    const maxValue = Math.max(1, ...data.map((d) => d.value));
    const innerW = width - padding.left - padding.right;
    const innerH = height - padding.top - padding.bottom;

    const points = data.map((d, i) => {
        const x = padding.left + (i / (data.length - 1)) * innerW;
        const y =
            padding.top +
            innerH -
            (d.value / maxValue) * innerH;
        return { x, y, ...d };
    });

    const linePath = points
        .map((p, i) => {
            if (i === 0) return `M ${p.x} ${p.y}`;
            const prev = points[i - 1];
            const cx = (prev.x + p.x) / 2;
            return `C ${cx} ${prev.y}, ${cx} ${p.y}, ${p.x} ${p.y}`;
        })
        .join(' ');

    const areaPath = `${linePath} L ${points[points.length - 1].x} ${
        height - padding.bottom
    } L ${points[0].x} ${height - padding.bottom} Z`;

    const gridLines = [0, 0.25, 0.5, 0.75, 1];

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
            <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
            </defs>

            {gridLines.map((g, i) => {
                const y = padding.top + innerH * g;
                const value = Math.round(maxValue * (1 - g));
                return (
                    <g key={i}>
                        <line
                            x1={padding.left}
                            x2={width - padding.right}
                            y1={y}
                            y2={y}
                            stroke="#262626"
                            strokeWidth="1"
                        />
                        <text
                            x={padding.left - 8}
                            y={y + 4}
                            textAnchor="end"
                            fontSize="10"
                            fill="#6b7280"
                        >
                            {value}
                        </text>
                    </g>
                );
            })}

            {points.map((p, i) => (
                <rect
                    key={i}
                    x={p.x - 6}
                    y={p.y}
                    width={12}
                    height={height - padding.bottom - p.y}
                    fill="url(#areaGrad)"
                />
            ))}

            <path d={areaPath} fill="url(#areaGrad)" />
            <path
                d={linePath}
                fill="none"
                stroke="url(#lineGrad)"
                strokeWidth="2"
            />

            {points.map((p, i) => (
                <circle
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    r="3"
                    fill="#0f0f0f"
                    stroke="#a855f7"
                    strokeWidth="2"
                />
            ))}

            {points.map((p, i) => (
                <text
                    key={i}
                    x={p.x}
                    y={height - 8}
                    textAnchor="middle"
                    fontSize="10"
                    fill="#6b7280"
                >
                    {p.label}
                </text>
            ))}
        </svg>
    );
}

/* ============================================================
 * DONUT CHART
 * ============================================================ */

function DonutChart({ active, inactive }) {
    const total = active + inactive;
    const activePct = total ? active / total : 0;
    const inactivePct = total ? inactive / total : 0;

    const radius = 70;
    const stroke = 22;
    const circumference = 2 * Math.PI * radius;

    return (
        <div className="flex flex-col items-center">
            <div className="relative">
                <svg
                    width="180"
                    height="180"
                    viewBox="0 0 180 180"
                    className="-rotate-90"
                >
                    <circle
                        cx="90"
                        cy="90"
                        r={radius}
                        fill="none"
                        stroke="#262626"
                        strokeWidth={stroke}
                    />
                    <circle
                        cx="90"
                        cy="90"
                        r={radius}
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth={stroke}
                        strokeDasharray={`${
                            inactivePct * circumference
                        } ${circumference}`}
                        strokeLinecap="butt"
                    />
                    <circle
                        cx="90"
                        cy="90"
                        r={radius}
                        fill="none"
                        stroke="#818cf8"
                        strokeWidth={stroke}
                        strokeDasharray={`${
                            activePct * circumference
                        } ${circumference}`}
                        strokeDashoffset={`-${
                            inactivePct * circumference
                        }`}
                        strokeLinecap="butt"
                    />
                </svg>

                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xs text-gray-400">Total</span>
                    <span className="text-lg font-bold text-white">
                        {total}
                    </span>
                </div>
            </div>

            <div className="mt-4 flex w-full justify-around text-xs">
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-indigo-400" />
                    <div>
                        <p className="text-gray-400">Active</p>
                        <p className="font-semibold text-white">{active}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-sky-400" />
                    <div>
                        <p className="text-gray-400">Inactive</p>
                        <p className="font-semibold text-white">{inactive}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ============================================================
 * BAR CHART
 * ============================================================ */

function BarChart({ data }) {
    const maxValue = Math.max(1, ...data.map((d) => d.value));

    return (
        <div className="mt-6 flex h-32 items-end justify-between gap-2">
            {data.map((d, i) => {
                const height =
                    maxValue === 0 ? 0 : (d.value / maxValue) * 100;

                const color =
                    i % 2 === 0 ? 'bg-indigo-500' : 'bg-green-500';

                return (
                    <div
                        key={i}
                        className="flex flex-1 flex-col items-center gap-2"
                    >
                        <div className="flex h-24 w-full items-end">
                            <div
                                className={`w-full rounded-md ${color}`}
                                style={{
                                    height: `${Math.max(
                                        height,
                                        d.value > 0 ? 8 : 4
                                    )}%`,
                                }}
                            />
                        </div>
                        <span className="text-[10px] text-gray-500">
                            {d.label}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}