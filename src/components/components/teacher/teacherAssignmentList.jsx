import { useCallback, useEffect, useMemo, useState } from "react";

import teacherAssignmentService from "../../../../lib/service/admin/teacherAssignmentService";
import academicYearService from "../../../../lib/service/admin/academicYearService";
import gradeService from "../../../../lib/service/admin/gradeService";

export default function TeacherAssignmentList({
    onEdit = () => {},
    onCreate = () => {},
    refreshKey = 0,
}) {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [actionId, setActionId] = useState(null);

    // Filters
    const [academicYears, setAcademicYears] = useState([]);
    const [grades, setGrades] = useState([]);
    const [filterYear, setFilterYear] = useState("");
    const [filterGrade, setFilterGrade] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [filterCoordinator, setFilterCoordinator] = useState("");
    const [search, setSearch] = useState("");

    // ------------------------------------------------------------
    // LOAD FILTER RELATIONS
    // ------------------------------------------------------------
    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                const [yearsRes, gradesRes] = await Promise.all([
                    academicYearService.getAllAcademicYears(),
                    gradeService.getAllGrades(),
                ]);

                if (cancelled) return;

                const pick = (res) =>
                    Array.isArray(res) ? res : res?.data || [];

                setAcademicYears(pick(yearsRes));
                setGrades(pick(gradesRes));
            } catch {
                // Non-fatal — filters will be empty
            }
        };

        load();

        return () => {
            cancelled = true;
        };
    }, []);

    // ------------------------------------------------------------
    // LOAD ASSIGNMENTS
    // ------------------------------------------------------------
    const loadAssignments = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const params = {};
            if (filterYear) params.academicYearId = filterYear;
            if (filterGrade) params.gradeId = filterGrade;
            if (filterStatus) params.status = filterStatus;
            if (filterCoordinator === "true") params.isCoordinator = "true";
            if (filterCoordinator === "false") params.isCoordinator = "false";

            const res =
                await teacherAssignmentService.getAllTeacherAssignments(
                    params
                );

            const list = Array.isArray(res) ? res : res?.data || [];
            setAssignments(list);
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                    "Failed to load teacher assignments."
            );
            setAssignments([]);
        } finally {
            setLoading(false);
        }
    }, [
        filterYear,
        filterGrade,
        filterStatus,
        filterCoordinator,
    ]);

    useEffect(() => {
        loadAssignments();
    }, [loadAssignments, refreshKey]);

    // ------------------------------------------------------------
    // CLIENT-SIDE SEARCH
    // ------------------------------------------------------------
    const visibleAssignments = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return assignments;

        return assignments.filter((a) => {
            const teacherName =
                a.teacherId?.userId?.name ||
                a.teacherId?.employeeNumber ||
                "";
            const subjectName = a.subjectId?.name || "";
            const subjectCode = a.subjectId?.code || "";
            const gradeName = a.gradeId?.gradeName || "";
            const section = a.gradeId?.sectionName || "";

            return [
                teacherName,
                subjectName,
                subjectCode,
                gradeName,
                section,
            ]
                .join(" ")
                .toLowerCase()
                .includes(q);
        });
    }, [assignments, search]);

    // ------------------------------------------------------------
    // ACTIONS
    // ------------------------------------------------------------
    const handleToggleStatus = async (assignment) => {
        const nextStatus =
            assignment.status === "active" ? "inactive" : "active";

        try {
            setActionId(assignment._id);
            await teacherAssignmentService.changeTeacherAssignmentStatus(
                assignment._id,
                { status: nextStatus }
            );
            await loadAssignments();
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                    "Failed to change status."
            );
        } finally {
            setActionId(null);
        }
    };

    const handleDelete = async (assignment) => {
        const label = `${assignment.subjectId?.name || "subject"} — ${
            assignment.gradeId?.gradeName || "grade"
        }${assignment.gradeId?.sectionName ? ` ${assignment.gradeId.sectionName}` : ""}`;

        if (
            !window.confirm(
                `Deactivate this assignment?\n\n${label}\n\nThis preserves historical records.`
            )
        ) {
            return;
        }

        try {
            setActionId(assignment._id);
            await teacherAssignmentService.deleteTeacherAssignment(
                assignment._id
            );
            await loadAssignments();
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                    "Failed to deactivate assignment."
            );
        } finally {
            setActionId(null);
        }
    };

    const resetFilters = () => {
        setFilterYear("");
        setFilterGrade("");
        setFilterStatus("");
        setFilterCoordinator("");
        setSearch("");
    };

    // ------------------------------------------------------------
    // RENDER
    // ------------------------------------------------------------
    return (
        <div className="w-full space-y-4">
            {/* HEADER + CREATE */}
            <div className="flex items-center justify-between gap-3">
                <div>
                    <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                        Teacher Assignments
                    </h2>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {loading
                            ? "Loading..."
                            : `${visibleAssignments.length} of ${assignments.length} shown`}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onCreate}
                    className="rounded-xl bg-[#1c1c1c] px-3 py-2 text-xs font-medium text-white transition hover:bg-black dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                >
                    + New Assignment
                </button>
            </div>

            {/* FILTERS */}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search teacher, subject, grade..."
                    className={inputClass()}
                />

                <select
                    value={filterYear}
                    onChange={(e) => setFilterYear(e.target.value)}
                    className={inputClass()}
                >
                    <option value="">All years</option>
                    {academicYears.map((y) => (
                        <option key={y._id} value={y._id}>
                            {y.name || `${y.startYear} - ${y.endYear}`}
                        </option>
                    ))}
                </select>

                <select
                    value={filterGrade}
                    onChange={(e) => setFilterGrade(e.target.value)}
                    className={inputClass()}
                >
                    <option value="">All grades</option>
                    {grades.map((g) => (
                        <option key={g._id} value={g._id}>
                            {g.gradeName}
                            {g.sectionName ? ` - ${g.sectionName}` : ""}
                        </option>
                    ))}
                </select>

                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className={inputClass()}
                >
                    <option value="">All statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>

                <select
                    value={filterCoordinator}
                    onChange={(e) =>
                        setFilterCoordinator(e.target.value)
                    }
                    className={inputClass()}
                >
                    <option value="">All roles</option>
                    <option value="true">Coordinators only</option>
                    <option value="false">Non-coordinators</option>
                </select>
            </div>

            {(filterYear ||
                filterGrade ||
                filterStatus ||
                filterCoordinator ||
                search) && (
                <button
                    type="button"
                    onClick={resetFilters}
                    className="text-xs text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                    Reset filters
                </button>
            )}

            {/* ERROR */}
            {error && (
                <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
                    {error}
                </div>
            )}

            {/* CONTENT */}
            {loading ? (
                <SkeletonRows />
            ) : visibleAssignments.length === 0 ? (
                <EmptyState
                    hasFilters={
                        !!(
                            filterYear ||
                            filterGrade ||
                            filterStatus ||
                            filterCoordinator ||
                            search
                        )
                    }
                    onReset={resetFilters}
                    onCreate={onCreate}
                />
            ) : (
                <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-zinc-50 dark:bg-zinc-900">
                                <tr className="text-left text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                                    <th className="px-4 py-3 font-medium">
                                        Teacher
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Grade
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Subject
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Year
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Role
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 font-medium text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {visibleAssignments.map((a) => {
                                    const busy = actionId === a._id;
                                    return (
                                        <tr
                                            key={a._id}
                                            className="border-t border-zinc-100 dark:border-zinc-900 hover:bg-zinc-50/60 dark:hover:bg-zinc-900/60"
                                        >
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-200 text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                                                        {initials(
                                                            a.teacherId
                                                                ?.userId
                                                                ?.name ||
                                                                a
                                                                    .teacherId
                                                                    ?.employeeNumber ||
                                                                "?"
                                                        )}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="truncate font-medium text-zinc-900 dark:text-zinc-100">
                                                            {a.teacherId
                                                                ?.userId
                                                                ?.name ||
                                                                "—"}
                                                        </p>
                                                        <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                                                            {a.teacherId
                                                                ?.employeeNumber ||
                                                                ""}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                                                {a.gradeId?.gradeName ||
                                                    "—"}
                                                {a.gradeId?.sectionName
                                                    ? ` - ${a.gradeId.sectionName}`
                                                    : ""}
                                            </td>
                                            <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                                                {a.subjectId?.name ||
                                                    "—"}
                                                {a.subjectId?.code
                                                    ? ` (${a.subjectId.code})`
                                                    : ""}
                                            </td>
                                            <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                                                {a.academicYearId
                                                    ?.name ||
                                                    `${a.academicYearId?.startYear ?? ""} - ${a.academicYearId?.endYear ?? ""}`}
                                            </td>
                                            <td className="px-4 py-3">
                                                {a.isCoordinator ? (
                                                    <span className="inline-flex items-center rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300">
                                                        Coordinator
                                                    </span>
                                                ) : (
                                                    <span className="text-xs text-zinc-400 dark:text-zinc-500">
                                                        —
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <StatusPill
                                                    status={a.status}
                                                />
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            onEdit(a)
                                                        }
                                                        disabled={busy}
                                                        className="rounded-lg border border-zinc-300 px-2 py-1 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleToggleStatus(
                                                                a
                                                            )
                                                        }
                                                        disabled={busy}
                                                        className="rounded-lg border border-zinc-300 px-2 py-1 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
                                                    >
                                                        {a.status ===
                                                        "active"
                                                            ? "Deactivate"
                                                            : "Activate"}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDelete(a)
                                                        }
                                                        disabled={
                                                            busy ||
                                                            a.status ===
                                                                "inactive"
                                                        }
                                                        className="rounded-lg border border-red-300 px-2 py-1 text-xs font-medium text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-red-900/60 dark:text-red-300 dark:hover:bg-red-950/40"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

// ------------------------------------------------------------
// Subcomponents
// ------------------------------------------------------------
function StatusPill({ status }) {
    const isActive = status === "active";
    return (
        <span
            className={[
                "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium",
                isActive
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                    : "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
            ].join(" ")}
        >
            <span
                className={[
                    "h-1.5 w-1.5 rounded-full",
                    isActive
                        ? "bg-emerald-500"
                        : "bg-zinc-500",
                ].join(" ")}
            />
            {isActive ? "Active" : "Inactive"}
        </span>
    );
}

function EmptyState({ hasFilters, onReset, onCreate }) {
    return (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-white/60 px-6 py-12 text-center dark:border-zinc-800 dark:bg-zinc-950/60">
            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {hasFilters
                    ? "No assignments match your filters."
                    : "No teacher assignments yet."}
            </p>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                {hasFilters
                    ? "Try adjusting or resetting the filters."
                    : "Create the first assignment to get started."}
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
                {hasFilters && (
                    <button
                        type="button"
                        onClick={onReset}
                        className="rounded-xl border border-zinc-300 px-3 py-2 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
                    >
                        Reset filters
                    </button>
                )}
                <button
                    type="button"
                    onClick={onCreate}
                    className="rounded-xl bg-[#1c1c1c] px-3 py-2 text-xs font-medium text-white transition hover:bg-black dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                >
                    + New Assignment
                </button>
            </div>
        </div>
    );
}

function SkeletonRows() {
    return (
        <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
                <div
                    key={i}
                    className="h-12 w-full animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-900"
                />
            ))}
        </div>
    );
}

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------
function inputClass() {
    return [
        "w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm",
        "text-zinc-900 outline-none transition",
        "focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200",
        "dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:ring-zinc-800",
    ].join(" ");
}

function initials(name) {
    if (!name) return "?";
    return (
        name
            .split(" ")
            .filter(Boolean)
            .map((p) => p[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "?"
    );
}