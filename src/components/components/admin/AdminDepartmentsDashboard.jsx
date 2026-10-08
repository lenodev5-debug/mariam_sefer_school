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

import { AreaChart, BarChart, DonutChart } from '../../shared/cards/charts';


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
            <div className="min-h-screen bg-[#f5f5f5] p-6 dark:bg-[#0f0f0f]">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8">
                        <div className="h-8 w-56 animate-pulse rounded-lg bg-[#e5e5e5] dark:bg-[#1a1a1a]" />
                        <div className="mt-3 h-4 w-80 animate-pulse rounded bg-[#e5e5e5] dark:bg-[#1a1a1a]" />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[1, 2, 3, 4].map((item) => (
                            <div
                                key={item}
                                className="h-32 animate-pulse rounded-2xl bg-[#e5e5e5] dark:bg-[#1a1a1a]"
                            />
                        ))}
                    </div>

                    <div className="mt-6 grid gap-4 lg:grid-cols-3">
                        <div className="h-72 animate-pulse rounded-2xl bg-[#e5e5e5] dark:bg-[#1a1a1a] lg:col-span-2" />
                        <div className="h-72 animate-pulse rounded-2xl bg-[#e5e5e5] dark:bg-[#1a1a1a]" />
                    </div>

                    <div className="mt-6 grid gap-4 lg:grid-cols-3">
                        <div className="h-64 animate-pulse rounded-2xl bg-[#e5e5e5] dark:bg-[#1a1a1a]" />
                        <div className="h-64 animate-pulse rounded-2xl bg-[#e5e5e5] dark:bg-[#1a1a1a] lg:col-span-2" />
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
            <div className="min-h-screen bg-[#f5f5f5] p-6 dark:bg-[#0f0f0f]">
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
        <div className="min-h-screen bg-[#f5f5f5] p-4 pt-20 transition-colors duration-300 sm:p-6 sm:pt-20 dark:bg-[#0f0f0f]">
            <div className="mx-auto max-w-7xl">

                {/* HEADER */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-[#1a1a1a] dark:text-white">
                            Departments
                        </h1>
                        <p className="mt-1 text-sm text-[#999] dark:text-[#888]">
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

                    <div className="rounded-[20px] border border-[#e0e0e0] bg-white p-5 transition-colors duration-300 lg:col-span-2 dark:border-[#3a3a3a] dark:bg-[#1a1a1a]">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon
                                    icon={faChartLine}
                                    className="text-indigo-400"
                                />
                                <h2 className="text-base font-semibold text-[#1a1a1a] dark:text-white">
                                    Growth
                                </h2>
                            </div>
                            <div className="flex items-center gap-2 rounded-lg border border-[#e0e0e0] px-3 py-1.5 text-xs text-[#999] dark:border-[#3a3a3a] dark:text-[#888]">
                                Last 12 months
                                <FontAwesomeIcon
                                    icon={faLayerGroup}
                                    className="text-[10px]"
                                />
                            </div>
                        </div>

                        <AreaChart data={monthlyData} />
                    </div>

                    <div className="rounded-[20px] border border-[#e0e0e0] bg-white p-5 transition-colors duration-300 dark:border-[#3a3a3a] dark:bg-[#1a1a1a]">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-base font-semibold text-[#1a1a1a] dark:text-white">
                                Department Status
                            </h2>
                            <button className="text-[#999] hover:text-[#1a1a1a] dark:text-[#666] dark:hover:text-white">
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

                    <div className="rounded-[20px] border border-[#e0e0e0] bg-white p-5 transition-colors duration-300 dark:border-[#3a3a3a] dark:bg-[#1a1a1a]">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-base font-semibold text-[#1a1a1a] dark:text-white">
                                Weekly Report
                            </h2>
                            <button className="text-[#999] hover:text-[#1a1a1a] dark:text-[#666] dark:hover:text-white">
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        </div>

                        <p className="text-xs text-[#999] dark:text-[#888]">Total this week</p>
                        <p className="mt-1 text-2xl font-bold text-[#1a1a1a] dark:text-white">
                            {weeklyData.reduce((s, d) => s + d.value, 0)}{' '}
                            <span className="text-sm font-normal text-[#b0b0b0] dark:text-[#666]">
                                departments
                            </span>
                        </p>

                        <BarChart data={weeklyData} />
                    </div>

                    <div className="rounded-[20px] border border-[#e0e0e0] bg-white p-5 transition-colors duration-300 lg:col-span-2 dark:border-[#3a3a3a] dark:bg-[#1a1a1a]">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-base font-semibold text-[#1a1a1a] dark:text-white">
                                Recent Departments
                            </h2>
                            <button className="text-[#999] hover:text-[#1a1a1a] dark:text-[#666] dark:hover:text-white">
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        </div>

                        {recentDepartments.length === 0 ? (
                            <p className="py-8 text-center text-sm text-[#b0b0b0] dark:text-[#666]">
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
                                                    <p className="truncate font-medium text-[#1a1a1a] dark:text-white">
                                                        {d.name || 'Unnamed'}
                                                    </p>
                                                    <p className="mt-0.5 truncate text-xs text-[#999] dark:text-[#888]">
                                                        {d.description ||
                                                            'No description'}
                                                    </p>
                                                </div>
                                                <span className="shrink-0 text-xs font-medium text-[#999] dark:text-[#888]">
                                                    {timeAgo(d.createdAt)}
                                                </span>
                                            </div>

                                            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[#f0f0f0] dark:bg-[#2a2a2a]">
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
                    <div className="rounded-[20px] border border-[#e0e0e0] bg-white p-5 transition-colors duration-300 dark:border-[#3a3a3a] dark:bg-[#1a1a1a]">
                        <div className="mb-4 flex items-center gap-2">
                            <FontAwesomeIcon
                                icon={faBookOpen}
                                className="text-cyan-400"
                            />
                            <h2 className="text-base font-semibold text-[#1a1a1a] dark:text-white">
                                Subjects
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-[#999] dark:text-[#888]">
                                    Total subjects
                                </p>
                                <p className="text-3xl font-bold text-[#1a1a1a] dark:text-white">
                                    {subjects.length}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="rounded-xl bg-green-500/10 p-3">
                                    <p className="text-xs text-green-500 dark:text-green-400">
                                        Active
                                    </p>
                                    <p className="text-lg font-semibold text-[#1a1a1a] dark:text-white">
                                        {activeSubjects}
                                    </p>
                                </div>
                                <div className="rounded-xl bg-orange-500/10 p-3">
                                    <p className="text-xs text-orange-500 dark:text-orange-400">
                                        Inactive
                                    </p>
                                    <p className="text-lg font-semibold text-[#1a1a1a] dark:text-white">
                                        {inactiveSubjects}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Top subjects per department */}
                    <div className="rounded-[20px] border border-[#e0e0e0] bg-white p-5 transition-colors duration-300 lg:col-span-2 dark:border-[#3a3a3a] dark:bg-[#1a1a1a]">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon
                                    icon={faLayerGroup}
                                    className="text-violet-400"
                                />
                                <h2 className="text-base font-semibold text-[#1a1a1a] dark:text-white">
                                    Subjects per Department
                                </h2>
                            </div>
                            <button className="text-[#999] hover:text-[#1a1a1a] dark:text-[#666] dark:hover:text-white">
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        </div>

                        {topSubjectsByDepartment.length === 0 ? (
                            <p className="py-8 text-center text-sm text-[#b0b0b0] dark:text-[#666]">
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
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5f5f5] text-cyan-500 dark:bg-[#2a2a2a] dark:text-cyan-300">
                                                        <FontAwesomeIcon
                                                            icon={faBook}
                                                            className="text-sm"
                                                        />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="truncate font-medium text-[#1a1a1a] dark:text-white">
                                                            {d.name}
                                                        </p>
                                                        <p className="mt-0.5 truncate text-xs text-[#999] dark:text-[#888]">
                                                            {d.active} active ·{' '}
                                                            {d.count - d.active}{' '}
                                                            inactive
                                                        </p>
                                                    </div>
                                                </div>
                                                <span className="shrink-0 text-xs font-medium text-[#999] dark:text-[#888]">
                                                    {d.count} subjects
                                                </span>
                                            </div>

                                            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[#f0f0f0] dark:bg-[#2a2a2a]">
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

                <div className="overflow-hidden rounded-[20px] border border-[#e0e0e0] bg-white transition-colors duration-300 dark:border-[#3a3a3a] dark:bg-[#1a1a1a]">
                    <div className="flex flex-col gap-4 border-b border-[#f0f0f0] p-5 transition-colors duration-300 sm:flex-row sm:items-center sm:justify-between dark:border-[#2a2a2a]">
                        <div>
                            <h2 className="text-lg font-semibold text-[#1a1a1a] dark:text-white">
                                All Departments
                            </h2>
                            <p className="mt-1 text-sm text-[#999] dark:text-[#888]">
                                {filteredDepartments.length} departments found
                            </p>
                        </div>

                        <div className="relative w-full sm:w-72">
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#b0b0b0] dark:text-[#666]"
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search departments..."
                                className="h-10 w-full rounded-xl border border-[#e0e0e0] bg-white pl-9 pr-4 text-sm text-[#1a1a1a] outline-none transition placeholder:text-[#b0b0b0] focus:border-[#50A2FF] focus:ring-2 focus:ring-[#50A2FF]/10 dark:border-[#3a3a3a] dark:bg-[#2a2a2a] dark:text-white dark:placeholder:text-[#666]"
                            />
                        </div>
                    </div>

                    {filteredDepartments.length === 0 && (
                        <div className="px-6 py-16 text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f5f5f5] text-[#b0b0b0] dark:bg-[#2a2a2a] dark:text-[#666]">
                                <FontAwesomeIcon
                                    icon={faFolderOpen}
                                    className="text-2xl"
                                />
                            </div>
                            <h3 className="mt-4 font-semibold text-[#1a1a1a] dark:text-white">
                                No departments found
                            </h3>
                            <p className="mt-1 text-sm text-[#999] dark:text-[#888]">
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
                                        className="group rounded-[20px] border border-[#e0e0e0] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#50A2FF]/40 hover:shadow-lg dark:border-[#3a3a3a] dark:bg-[#2a2a2a]"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#50A2FF]/10 text-[#50A2FF]">
                                                <FontAwesomeIcon
                                                    icon={faSchool}
                                                    className="text-lg"
                                                />
                                            </div>

                                            <span
                                                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                                    department.status === 'active'
                                                        ? 'bg-green-500/10 text-green-500 dark:text-green-400'
                                                        : 'bg-[#f0f0f0] text-[#999] dark:bg-[#3a3a3a] dark:text-[#888]'
                                                }`}
                                            >
                                                {department.status || 'unknown'}
                                            </span>
                                        </div>

                                        <h3 className="mt-5 truncate text-lg font-semibold text-[#1a1a1a] dark:text-white">
                                            {department.name || 'Unnamed Department'}
                                        </h3>

                                        {department.code && (
                                            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-[#50A2FF]">
                                                {department.code}
                                            </p>
                                        )}

                                        <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-5 text-[#999] dark:text-[#888]">
                                            {department.description ||
                                                'No description available.'}
                                        </p>

                                        <div className="mt-4 flex items-center gap-2 text-xs text-[#999] dark:text-[#888]">
                                            <FontAwesomeIcon
                                                icon={faBook}
                                                className="text-cyan-500 dark:text-cyan-400"
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
 * (Dashboard-specific — kept local)
 * ============================================================ */

function GradientStatCard({ title, value, gradient, icon }) {
    return (
        <div
            className={`relative overflow-hidden rounded-[20px] bg-gradient-to-br ${gradient} p-5 text-white shadow-lg`}
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