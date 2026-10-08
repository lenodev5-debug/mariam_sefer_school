import { useEffect, useMemo, useState } from "react";

import teacherService from "../../../../../lib/service/admin/teacherService";
import teacherAssignmentService from "../../../../../lib/service/admin/teacherAssignmentService";
import academicYearService from "../../../../../lib/service/admin/academicYearService";
import gradeService from "../../../../../lib/service/admin/gradeService";
import subjectService from "../../../../../lib/service/admin/subjectService";
import departmentService from "../../../../../lib/service/admin/departmentService";

const ALLOWED_STATUSES = ["active", "inactive"];

const emptyForm = {
    teacherId: "",
    academicYearId: "",
    gradeIds: [],
    subjectIds: [],
    departmentId: "",
    status: "active",
};

export default function TeacherAssignmentForm({
    mode = "create",
    initialData = null,
    onSuccess = () => {},
    onCancel = () => {},
}) {
    const isEdit = mode === "edit";

    const [form, setForm] = useState(emptyForm);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState("");
    const [resultSummary, setResultSummary] = useState(null);

    // Relation data
    const [teachers, setTeachers] = useState([]);
    const [academicYears, setAcademicYears] = useState([]);
    const [grades, setGrades] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [loadingRelations, setLoadingRelations] = useState(true);

    // ------------------------------------------------------------
    // LOAD RELATIONS
    // ------------------------------------------------------------
    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                setLoadingRelations(true);
                setServerError("");

                const [
                    teachersRes,
                    yearsRes,
                    gradesRes,
                    subjectsRes,
                    departmentsRes,
                ] = await Promise.all([
                    teacherService.getAllTeachers(),
                    academicYearService.getAllAcademicYears(),
                    gradeService.getAllGrades(),
                    subjectService.getAllSubjects(),
                    departmentService.getAllDepartments(),
                ]);

                if (cancelled) return;

                const pick = (res) => {
    if (Array.isArray(res)) {
        return res;
    }

    if (Array.isArray(res?.data)) {
        return res.data;
    }

    if (Array.isArray(res?.data?.data)) {
        return res.data.data;
    }

    return [];
};

const activeOnly = (arr) =>
    arr.filter(
        (item) =>
            String(item?.status || "").toLowerCase() ===
            "active"
    );

                setTeachers(
                    activeOnly(pick(teachersRes))
                );

                setAcademicYears(
                    pick(yearsRes)
                    .filter(
                        (year) =>  ["active", "upcoming"].includes(
                            String(year?.status || "").toLowerCase()
                        )
                        )
                );

                setGrades(
                    activeOnly(pick(gradesRes))
                );

                setSubjects(
                    activeOnly(pick(subjectsRes))
                );

                setDepartments(
                    activeOnly(pick(departmentsRes))
                );
            } catch (err) {
                if (cancelled) return;

                setServerError(
                    err?.response?.data?.message ||
                        "Failed to load form data."
                );
            } finally {
                if (!cancelled) {
                    setLoadingRelations(false);
                }
            }
        };

        load();

        return () => {
            cancelled = true;
        };
    }, []);

    // ------------------------------------------------------------
    // HYDRATE EDIT MODE
    // ------------------------------------------------------------
    useEffect(() => {
        if (!isEdit || !initialData) return;

        const resolveId = (value) => {
            if (!value) return "";

            if (typeof value === "string") {
                return value;
            }

            return value._id || "";
        };

        setForm({
            // IMPORTANT:
            // teacherId must be TeacherProfile._id
            teacherId: resolveId(initialData.teacherId),

            academicYearId: resolveId(
                initialData.academicYearId
            ),

            gradeIds: [
                resolveId(initialData.gradeId),
            ].filter(Boolean),

            subjectIds: [
                resolveId(initialData.subjectId),
            ].filter(Boolean),

            departmentId: resolveId(
                initialData.departmentId
            ),

            status:
                initialData.status || "active",
        });
    }, [isEdit, initialData]);

    // ------------------------------------------------------------
    // DERIVED DEPARTMENT
    // ------------------------------------------------------------
    const selectedSubjects = useMemo(() => {
        return subjects.filter((subject) =>
            form.subjectIds.includes(subject._id)
        );
    }, [subjects, form.subjectIds]);

    const derivedDepartmentIds = useMemo(() => {
        const ids = new Set();

        selectedSubjects.forEach((subject) => {
            const departmentId =
                subject?.departmentId?._id ||
                subject?.departmentId ||
                "";

            if (departmentId) {
                ids.add(String(departmentId));
            }
        });

        return ids;
    }, [selectedSubjects]);

    const derivedDepartmentId =
        derivedDepartmentIds.size === 1
            ? [...derivedDepartmentIds][0]
            : "";

    useEffect(() => {
        if (!derivedDepartmentId) return;

        setForm((previous) => ({
            ...previous,
            departmentId: derivedDepartmentId,
        }));
    }, [derivedDepartmentId]);

    // ------------------------------------------------------------
    // HANDLERS
    // ------------------------------------------------------------
    const handleChange = (field, value) => {
        setForm((previous) => ({
            ...previous,
            [field]: value,
        }));

        setErrors((previous) => ({
            ...previous,
            [field]: undefined,
        }));

        setServerError("");
        setResultSummary(null);
    };

    const handleMultiToggle = (field, id) => {
        setForm((previous) => {
            const list = previous[field];

            const next = list.includes(id)
                ? list.filter((item) => item !== id)
                : [...list, id];

            return {
                ...previous,
                [field]: next,
            };
        });

        setErrors((previous) => ({
            ...previous,
            [field]: undefined,
        }));

        setServerError("");
        setResultSummary(null);
    };

    // ------------------------------------------------------------
    // VALIDATION
    // ------------------------------------------------------------
    const validate = () => {
        const next = {};

        if (!form.teacherId) {
            next.teacherId = "Teacher is required.";
        }

        if (!form.academicYearId) {
            next.academicYearId =
                "Academic year is required.";
        }

        if (form.gradeIds.length === 0) {
            next.gradeIds =
                "Pick at least one grade.";
        }

        if (form.subjectIds.length === 0) {
            next.subjectIds =
                "Pick at least one subject.";
        }

        if (!ALLOWED_STATUSES.includes(form.status)) {
            next.status = "Invalid status.";
        }

        setErrors(next);

        return Object.keys(next).length === 0;
    };

    // ------------------------------------------------------------
    // SUBMIT
    // ------------------------------------------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        setServerError("");
        setResultSummary(null);

        if (!validate()) return;

        // --------------------------------------------------------
        // EDIT MODE
        // --------------------------------------------------------
        if (isEdit) {
            const payload = {
                teacherId: form.teacherId,
                academicYearId: form.academicYearId,
                gradeId: form.gradeIds[0],
                subjectId: form.subjectIds[0],
                departmentId:
                    form.departmentId || null,
                status: form.status,
            };

            try {
                setSubmitting(true);

                const result =
                    await teacherAssignmentService.updateTeacherAssignment(
                        initialData._id,
                        payload
                    );

                onSuccess(result?.data || result);
            } catch (err) {
                setServerError(
                    err?.response?.data?.message ||
                        "Failed to update teacher assignment."
                );
            } finally {
                setSubmitting(false);
            }

            return;
        }

        // --------------------------------------------------------
        // CREATE MODE
        //
        // grade × subject
        //
        // 2 grades × 3 subjects = 6 assignments
        // --------------------------------------------------------
        const pairs = [];

        for (const gradeId of form.gradeIds) {
            for (const subjectId of form.subjectIds) {
                pairs.push({
                    gradeId,
                    subjectId,
                });
            }
        }

        const created = [];
        const failed = [];

        try {
            setSubmitting(true);

            for (const pair of pairs) {
                const payload = {
                    teacherId: form.teacherId,
                    academicYearId: form.academicYearId,
                    gradeId: pair.gradeId,
                    subjectId: pair.subjectId,
                    departmentId:
                        form.departmentId || null,
                    status: form.status,
                };

                try {
                    const response =
                        await teacherAssignmentService.createTeacherAssignment(
                            payload
                        );

                    created.push({
                        gradeId: pair.gradeId,
                        subjectId: pair.subjectId,
                        assignment:
                            response?.data ||
                            response,
                    });
                } catch (err) {
                    failed.push({
                        gradeId: pair.gradeId,
                        subjectId: pair.subjectId,
                        message:
                            err?.response?.data?.message ||
                            "Failed to create assignment.",
                    });
                }
            }

            setResultSummary({
                created: created.length,
                failed: failed.length,
                failures: failed,
            });

            if (failed.length === 0) {
                onSuccess({
                    created: created.length,
                    assignments: created.map(
                        (item) => item.assignment
                    ),
                });
            }
        } catch (err) {
            setServerError(
                err?.response?.data?.message ||
                    "Failed to create teacher assignments."
            );
        } finally {
            setSubmitting(false);
        }
    };

    // ------------------------------------------------------------
    // RENDER
    // ------------------------------------------------------------
    return (
        <form
            onSubmit={handleSubmit}
            className="w-full space-y-5"
            noValidate
        >
            {/* SERVER ERROR */}
            {serverError && (
                <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
                    {serverError}
                </div>
            )}

            {/* RESULT SUMMARY */}
            {resultSummary &&
                resultSummary.failed > 0 && (
                    <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300">
                        <p className="font-medium">
                            {resultSummary.created} created,{" "}
                            {resultSummary.failed} failed.
                        </p>

                        <ul className="mt-2 list-disc space-y-1 pl-5">
                            {resultSummary.failures.map(
                                (failure, index) => (
                                    <li key={index}>
                                        {gradeLabel(
                                            failure.gradeId,
                                            grades
                                        )}{" "}
                                        ·{" "}
                                        {subjectLabel(
                                            failure.subjectId,
                                            subjects
                                        )}{" "}
                                        —{" "}
                                        {failure.message}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                )}

            {/* -------------------------------------------------- */}
            {/* TEACHER */}
            {/* -------------------------------------------------- */}
            <Field
                label="Teacher"
                error={errors.teacherId}
            >
                <select
                    value={form.teacherId}
                    onChange={(e) =>
                        handleChange(
                            "teacherId",
                            e.target.value
                        )
                    }
                    disabled={
                        loadingRelations ||
                        submitting ||
                        isEdit
                    }
                    className={selectClass(
                        errors.teacherId
                    )}
                >
                    <option value="">
                        {loadingRelations
                            ? "Loading..."
                            : "Select teacher"}
                    </option>

                    {teachers.map((teacher) => {
                        const teacherName =
                            teacher?.userId?.name ||
                            teacher?.name ||
                            "Teacher";

                        const teacherEmail =
                            teacher?.userId?.email ||
                            teacher?.email ||
                            "";

                        return (
                            <option
                                key={teacher._id}
                                value={teacher._id}
                            >
                                {teacherName}
                                {teacherEmail
                                    ? ` — ${teacherEmail}`
                                    : ""}
                            </option>
                        );
                    })}
                </select>
            </Field>

            {/* -------------------------------------------------- */}
            {/* ACADEMIC YEAR */}
            {/* -------------------------------------------------- */}
            <Field
                label="Academic Year"
                error={errors.academicYearId}
            >
                <select
                    value={form.academicYearId}
                    onChange={(e) =>
                        handleChange(
                            "academicYearId",
                            e.target.value
                        )
                    }
                    disabled={
                        loadingRelations ||
                        submitting
                    }
                    className={selectClass(
                        errors.academicYearId
                    )}
                >
                    <option value="">
                        {loadingRelations
                            ? "Loading..."
                            : "Select academic year"}
                    </option>

                    {academicYears.map((year) => (
                        <option
                            key={year._id}
                            value={year._id}
                        >
                            {year.name ||
                                year.yearName ||
                                `${year.startYear} - ${year.endYear}`}

                            {year.status
                                ? ` (${year.status})`
                                : ""}
                        </option>
                    ))}
                </select>
            </Field>

            {/* -------------------------------------------------- */}
            {/* GRADES */}
            {/* -------------------------------------------------- */}
            <Field
                label={`Grades${
                    form.gradeIds.length
                        ? ` (${form.gradeIds.length})`
                        : ""
                }`}
                hint="Select every grade this teacher will teach."
                error={errors.gradeIds}
            >
                <div
                    className={[
                        "max-h-48 overflow-y-auto rounded-xl border p-2",
                        errors.gradeIds
                            ? "border-red-400 dark:border-red-800"
                            : "border-zinc-300 dark:border-zinc-700",
                        "bg-white dark:bg-zinc-900",
                    ].join(" ")}
                >
                    {grades.length === 0 && (
                        <p className="px-2 py-1 text-sm text-zinc-500 dark:text-zinc-400">
                            No active grades.
                        </p>
                    )}

                    {grades.map((grade) => {
                        const checked =
                            form.gradeIds.includes(
                                grade._id
                            );

                        return (
                            <label
                                key={grade._id}
                                className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            >
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    disabled={
                                        submitting ||
                                        (isEdit &&
                                            !checked)
                                    }
                                    onChange={() =>
                                        handleMultiToggle(
                                            "gradeIds",
                                            grade._id
                                        )
                                    }
                                    className="h-4 w-4 rounded border-zinc-400 text-[#1c1c1c] focus:ring-0 dark:border-zinc-600"
                                />

                                <span className="text-sm text-zinc-800 dark:text-zinc-200">
                                    {grade.gradeName}

                                    {grade.sectionName
                                        ? ` - ${grade.sectionName}`
                                        : ""}
                                </span>
                            </label>
                        );
                    })}
                </div>
            </Field>

            {/* -------------------------------------------------- */}
            {/* SUBJECTS */}
            {/* -------------------------------------------------- */}
            <Field
                label={`Subjects${
                    form.subjectIds.length
                        ? ` (${form.subjectIds.length})`
                        : ""
                }`}
                hint="Select every subject this teacher will teach in the chosen grades."
                error={errors.subjectIds}
            >
                <div
                    className={[
                        "max-h-48 overflow-y-auto rounded-xl border p-2",
                        errors.subjectIds
                            ? "border-red-400 dark:border-red-800"
                            : "border-zinc-300 dark:border-zinc-700",
                        "bg-white dark:bg-zinc-900",
                    ].join(" ")}
                >
                    {subjects.length === 0 && (
                        <p className="px-2 py-1 text-sm text-zinc-500 dark:text-zinc-400">
                            No active subjects.
                        </p>
                    )}

                    {subjects.map((subject) => {
                        const checked =
                            form.subjectIds.includes(
                                subject._id
                            );

                        return (
                            <label
                                key={subject._id}
                                className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            >
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    disabled={
                                        submitting ||
                                        (isEdit &&
                                            !checked)
                                    }
                                    onChange={() =>
                                        handleMultiToggle(
                                            "subjectIds",
                                            subject._id
                                        )
                                    }
                                    className="h-4 w-4 rounded border-zinc-400 text-[#1c1c1c] focus:ring-0 dark:border-zinc-600"
                                />

                                <span className="text-sm text-zinc-800 dark:text-zinc-200">
                                    {subject.name}

                                    {subject.code
                                        ? ` (${subject.code})`
                                        : ""}
                                </span>
                            </label>
                        );
                    })}
                </div>
            </Field>

            {/* -------------------------------------------------- */}
            {/* DEPARTMENT */}
            {/* -------------------------------------------------- */}
            <Field
                label="Department"
                hint={
                    derivedDepartmentIds.size > 1
                        ? "Selected subjects span multiple departments."
                        : "Automatically determined by the selected subject(s)."
                }
            >
                <select
                    value={form.departmentId}
                    onChange={() => {}}
                    disabled
                    className={`${selectClass()} opacity-70`}
                >
                    <option value="">
                        {derivedDepartmentIds.size > 1
                            ? "Multiple departments"
                            : "—"}
                    </option>

                    {departments.map((department) => (
                        <option
                            key={department._id}
                            value={department._id}
                        >
                            {department.name}
                        </option>
                    ))}
                </select>
            </Field>

            {/* -------------------------------------------------- */}
            {/* STATUS */}
            {/* -------------------------------------------------- */}
            <Field
                label="Status"
                error={errors.status}
            >
                <select
                    value={form.status}
                    onChange={(e) =>
                        handleChange(
                            "status",
                            e.target.value
                        )
                    }
                    disabled={submitting}
                    className={selectClass(
                        errors.status
                    )}
                >
                    <option value="active">
                        Active
                    </option>

                    <option value="inactive">
                        Inactive
                    </option>
                </select>
            </Field>

            {/* -------------------------------------------------- */}
            {/* ACTIONS */}
            {/* -------------------------------------------------- */}
            <div className="flex items-center justify-end gap-3 pt-2">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={submitting}
                    className="rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={
                        submitting ||
                        loadingRelations
                    }
                    className="rounded-xl bg-[#1c1c1c] px-4 py-2 text-sm font-medium text-white transition hover:bg-black disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                >
                    {submitting
                        ? "Saving..."
                        : isEdit
                        ? "Update Assignment"
                        : `Create ${
                              form.gradeIds.length *
                              form.subjectIds.length
                          } Assignment${
                              form.gradeIds.length *
                                  form.subjectIds.length !==
                              1
                                  ? "s"
                                  : ""
                          }`}
                </button>
            </div>
        </form>
    );
}

// ------------------------------------------------------------
// HELPERS
// ------------------------------------------------------------

function Field({
    label,
    hint,
    error,
    children,
}) {
    return (
        <div className="space-y-1.5">
            <label className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {label}
            </label>

            {children}

            {hint && !error && (
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {hint}
                </p>
            )}

            {error && (
                <p className="text-xs text-red-600 dark:text-red-400">
                    {error}
                </p>
            )}
        </div>
    );
}

function selectClass(error) {
    return [
        "w-full rounded-xl border bg-white px-3 py-2 text-sm",
        "text-zinc-900 outline-none transition",
        "focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200",
        "disabled:cursor-not-allowed",
        "dark:bg-zinc-900 dark:text-zinc-100 dark:focus:ring-zinc-800",
        error
            ? "border-red-400 dark:border-red-800"
            : "border-zinc-300 dark:border-zinc-700",
    ].join(" ");
}

function gradeLabel(id, grades) {
    const grade = grades.find(
        (item) => item._id === id
    );

    if (!grade) return "Unknown grade";

    return `${grade.gradeName}${
        grade.sectionName
            ? ` - ${grade.sectionName}`
            : ""
    }`;
}

function subjectLabel(id, subjects) {
    const subject = subjects.find(
        (item) => item._id === id
    );

    if (!subject) return "Unknown subject";

    return (
        subject.name +
        (subject.code
            ? ` (${subject.code})`
            : "")
    );
}