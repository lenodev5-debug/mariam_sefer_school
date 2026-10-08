import { useEffect, useMemo, useState } from "react";

import academicYearService from "../../../../../lib/service/admin/academicYearService";
import departmentService from "../../../../../lib/service/admin/departmentService";
import gradeService from "../../../../../lib/service/admin/gradeService";
import subjectService from "../../../../../lib/service/admin/subjectService";
import teacherAssignmentService from "../../../../../lib/service/admin/teacherAssignmentService";
import teacherService from "../../../../../lib/service/admin/teacherService";
import userService from "../../../../../lib/service/admin/userService";

const ALLOWED_STATUSES = ["active", "inactive"];

const emptyForm = {
    teacherId: "",
    academicYearId: "",
    gradeId: "",
    subjectId: "",
    departmentId: "",
    status: "active",
};

// ============================================================
// GET ID
// ============================================================

const getId = (value) => {
    if (!value) {
        return "";
    }

    if (typeof value === "string") {
        return value;
    }

    if (typeof value === "object") {
        return String(
            value._id ||
                value.id ||
                ""
        );
    }

    return "";
};

// ============================================================
// NORMALIZE API ARRAY
// ============================================================

const getArray = (response, keys = []) => {
    if (Array.isArray(response)) {
        return response;
    }

    if (Array.isArray(response?.data)) {
        return response.data;
    }

    if (Array.isArray(response?.data?.data)) {
        return response.data.data;
    }

    for (const key of keys) {
        if (Array.isArray(response?.[key])) {
            return response[key];
        }

        if (Array.isArray(response?.data?.[key])) {
            return response.data[key];
        }
    }

    return [];
};

// ============================================================
// GET TEACHER USER
// ============================================================

const getTeacherUser = (
    teacherProfile,
    users
) => {
    if (!teacherProfile) {
        return null;
    }

    // Populated userId
    if (
        typeof teacherProfile.userId ===
            "object" &&
        teacherProfile.userId?._id
    ) {
        return teacherProfile.userId;
    }

    const userId =
        getId(
            teacherProfile.userId
        );

    if (!userId) {
        return null;
    }

    return (
        users.find(
            (user) =>
                getId(user) ===
                userId
        ) || null
    );
};

// ============================================================
// TEACHER NAME
// ============================================================

const getTeacherName = (
    teacherProfile,
    users
) => {
    const user =
        getTeacherUser(
            teacherProfile,
            users
        );

    return (
        user?.name ||
        teacherProfile?.name ||
        "Unknown teacher"
    );
};

// ============================================================
// GRADE LABEL
// ============================================================

const getGradeLabel = (grade) => {
    if (!grade) {
        return "Unknown grade";
    }

    const gradeName = String(
        grade?.gradeName ??
            grade?.name ??
            grade?.grade ??
            ""
    ).trim();

    const sectionName = String(
        grade?.sectionName ??
            grade?.section ??
            grade?.section_name ??
            ""
    ).trim();

    let label = "";

    if (
        gradeName.toLowerCase() ===
        "kg"
    ) {
        label = "KG";
    } else if (gradeName) {
        label = `Grade ${gradeName}`;
    }

    if (sectionName) {
        label += ` - Section ${sectionName}`;
    }

    return (
        label ||
        "Unknown grade"
    );
};

// ============================================================
// COMPONENT
// ============================================================

export default function TeacherAssignmentForm({
    mode = "create",
    initialData = null,
    onSuccess = () => {},
    onCancel = () => {},
}) {
    const isEdit =
        mode === "edit";

    // ========================================================
    // STATE
    // ========================================================

    const [form, setForm] =
        useState(emptyForm);

    const [errors, setErrors] =
        useState({});

    const [serverError, setServerError] =
        useState("");

    const [submitting, setSubmitting] =
        useState(false);

    const [loadingRelations, setLoadingRelations] =
        useState(true);

    const [academicYears, setAcademicYears] =
        useState([]);

    const [grades, setGrades] =
        useState([]);

    const [subjects, setSubjects] =
        useState([]);

    const [departments, setDepartments] =
        useState([]);

    const [teacherProfiles, setTeacherProfiles] =
        useState([]);

    const [users, setUsers] =
        useState([]);

    // ========================================================
    // LOAD RELATION DATA
    // ========================================================

    useEffect(() => {
        let cancelled = false;

        const loadData = async () => {
            try {
                setLoadingRelations(true);
                setServerError("");

                const [
                    academicYearResponse,
                    gradeResponse,
                    subjectResponse,
                    departmentResponse,
                    teacherResponse,
                    userResponse,
                ] = await Promise.all([
                    academicYearService
                        .getAllAcademicYears(),

                    gradeService
                        .getAllGrades(),

                    subjectService
                        .getAllSubjects(),

                    departmentService
                        .getAllDepartments(),

                    teacherService
                        .getAllTeachers(),

                    userService
                        .getAllUsers({
                            role: "Teacher",
                        }),
                ]);

                if (cancelled) {
                    return;
                }

                const academicYearList =
                    getArray(
                        academicYearResponse,
                        [
                            "academicYears",
                            "years",
                        ]
                    );

                const gradeList =
                    getArray(
                        gradeResponse,
                        [
                            "grades",
                        ]
                    );

                const subjectList =
                    getArray(
                        subjectResponse,
                        [
                            "subjects",
                        ]
                    );

                const departmentList =
                    getArray(
                        departmentResponse,
                        [
                            "departments",
                        ]
                    );

                const teacherList =
                    getArray(
                        teacherResponse,
                        [
                            "teachers",
                            "teacherProfiles",
                        ]
                    );

                const userList =
                    getArray(
                        userResponse,
                        [
                            "users",
                        ]
                    );

                console.log(
                    "Teacher Assignment - Academic Years:",
                    academicYearList
                );

                console.log(
                    "Teacher Assignment - Grades:",
                    gradeList
                );

                console.log(
                    "Teacher Assignment - Subjects:",
                    subjectList
                );

                console.log(
                    "Teacher Assignment - Departments:",
                    departmentList
                );

                console.log(
                    "Teacher Assignment - Teacher Profiles:",
                    teacherList
                );

                console.log(
                    "Teacher Assignment - Teacher Users:",
                    userList
                );

                // ------------------------------------------------
                // ACADEMIC YEARS
                // ------------------------------------------------

                setAcademicYears(
                    academicYearList.filter(
                        (year) =>
                            [
                                "active",
                                "upcoming",
                            ].includes(
                                String(
                                    year?.status ??
                                        ""
                                ).toLowerCase()
                            )
                    )
                );

                // ------------------------------------------------
                // GRADES
                // ------------------------------------------------

                setGrades(
                    gradeList.filter(
                        (grade) =>
                            String(
                                grade?.status ??
                                    ""
                            ).toLowerCase() ===
                            "active"
                    )
                );

                // ------------------------------------------------
                // SUBJECTS
                // ------------------------------------------------

                setSubjects(
                    subjectList.filter(
                        (subject) =>
                            String(
                                subject?.status ??
                                    ""
                            ).toLowerCase() ===
                            "active"
                    )
                );

                // ------------------------------------------------
                // DEPARTMENTS
                // ------------------------------------------------

                setDepartments(
                    departmentList.filter(
                        (department) =>
                            String(
                                department?.status ??
                                    ""
                            ).toLowerCase() ===
                            "active"
                    )
                );

                // ------------------------------------------------
                // TEACHER PROFILES
                // ------------------------------------------------

                setTeacherProfiles(
                    teacherList
                );

                // ------------------------------------------------
                // TEACHER USERS
                // ------------------------------------------------

                setUsers(
                    userList.filter(
                        (user) =>
                            String(
                                user?.role ??
                                    ""
                            ).toLowerCase() ===
                            "teacher"
                    )
                );
            } catch (error) {
                if (cancelled) {
                    return;
                }

                console.error(
                    "Load teacher assignment relations error:",
                    error
                );

                setServerError(
                    error?.response?.data
                        ?.message ||
                        error?.message ||
                        "Failed to load teacher assignment data."
                );
            } finally {
                if (!cancelled) {
                    setLoadingRelations(false);
                }
            }
        };

        loadData();

        return () => {
            cancelled = true;
        };
    }, []);

    // ========================================================
    // LOAD EDIT DATA
    // ========================================================

    useEffect(() => {
        if (
            !isEdit ||
            !initialData
        ) {
            return;
        }

        setForm({
            teacherId:
                getId(
                    initialData.teacherId
                ),

            academicYearId:
                getId(
                    initialData.academicYearId
                ),

            gradeId:
                getId(
                    initialData.gradeId
                ),

            subjectId:
                getId(
                    initialData.subjectId
                ),

            departmentId:
                getId(
                    initialData.departmentId
                ),

            status:
                ALLOWED_STATUSES.includes(
                    String(
                        initialData.status ||
                            ""
                    ).toLowerCase()
                )
                    ? String(
                          initialData.status
                      ).toLowerCase()
                    : "active",
        });
    }, [
        isEdit,
        initialData,
    ]);

    // ========================================================
    // ACTIVE TEACHERS
    //
    // IMPORTANT:
    //
    // Teacher Assignment does NOT use existing assignments.
    //
    // A teacher is eligible when:
    //
    // 1. User exists
    // 2. User.role === Teacher
    // 3. TeacherProfile exists
    // 4. TeacherProfile.status === active
    // ========================================================

    const eligibleTeachers =
        useMemo(() => {
            return teacherProfiles.filter(
                (teacherProfile) => {
                    const profileStatus =
                        String(
                            teacherProfile?.status ??
                                ""
                        ).toLowerCase();

                    if (
                        profileStatus !==
                        "active"
                    ) {
                        return false;
                    }

                    const user =
                        getTeacherUser(
                            teacherProfile,
                            users
                        );

                    if (!user) {
                        return false;
                    }

                    return (
                        String(
                            user?.role ??
                                ""
                        ).toLowerCase() ===
                        "teacher"
                    );
                }
            );
        }, [
            teacherProfiles,
            users,
        ]);

    // ========================================================
    // ACTIVE SUBJECTS
    // ========================================================

    const eligibleSubjects =
        useMemo(() => {
            return subjects.filter(
                (subject) => {
                    if (
                        !form.departmentId
                    ) {
                        return true;
                    }

                    const subjectDepartmentId =
                        getId(
                            subject?.departmentId
                        );

                    return (
                        !subjectDepartmentId ||
                        subjectDepartmentId ===
                            form.departmentId
                    );
                }
            );
        }, [
            subjects,
            form.departmentId,
        ]);

    // ========================================================
    // HANDLE CHANGE
    // ========================================================

    const handleChange = (
        field,
        value
    ) => {
        setForm(
            (previous) => ({
                ...previous,
                [field]: value,
            })
        );

        setErrors(
            (previous) => ({
                ...previous,
                [field]: undefined,
            })
        );

        setServerError("");
    };

    // ========================================================
    // SUBJECT CHANGE
    // ========================================================

    const handleSubjectChange = (
        value
    ) => {
        const selectedSubject =
            subjects.find(
                (subject) =>
                    getId(subject) ===
                    value
            );

        const subjectDepartmentId =
            getId(
                selectedSubject?.departmentId
            );

        setForm(
            (previous) => ({
                ...previous,
                subjectId: value,

                departmentId:
                    subjectDepartmentId ||
                    previous.departmentId,
            })
        );

        setErrors(
            (previous) => ({
                ...previous,
                subjectId: undefined,
                departmentId: undefined,
            })
        );

        setServerError("");
    };

    // ========================================================
    // VALIDATION
    // ========================================================

    const validate = () => {
        const next = {};

        // ----------------------------------------------------
        // TEACHER
        // ----------------------------------------------------

        if (!form.teacherId) {
            next.teacherId =
                "Teacher is required.";
        } else {
            const selectedTeacher =
                eligibleTeachers.find(
                    (teacher) =>
                        getId(teacher) ===
                        form.teacherId
                );

            if (!selectedTeacher) {
                next.teacherId =
                    "Selected teacher does not have an active TeacherProfile.";
            }
        }

        // ----------------------------------------------------
        // ACADEMIC YEAR
        // ----------------------------------------------------

        if (!form.academicYearId) {
            next.academicYearId =
                "Academic year is required.";
        }

        // ----------------------------------------------------
        // GRADE
        // ----------------------------------------------------

        if (!form.gradeId) {
            next.gradeId =
                "Grade / section is required.";
        }

        // ----------------------------------------------------
        // SUBJECT
        // ----------------------------------------------------

        if (!form.subjectId) {
            next.subjectId =
                "Subject is required.";
        }

        // ----------------------------------------------------
        // DEPARTMENT
        // ----------------------------------------------------

        if (!form.departmentId) {
            next.departmentId =
                "Department is required.";
        }

        // ----------------------------------------------------
        // STATUS
        // ----------------------------------------------------

        if (
            !ALLOWED_STATUSES.includes(
                String(
                    form.status
                ).toLowerCase()
            )
        ) {
            next.status =
                "Invalid status.";
        }

        setErrors(next);

        return (
            Object.keys(next)
                .length === 0
        );
    };

    // ========================================================
    // SUBMIT
    // ========================================================

    const handleSubmit = async (
        event
    ) => {
        event.preventDefault();

        setServerError("");

        if (!validate()) {
            return;
        }

        const payload = {
            teacherId:
                form.teacherId,

            academicYearId:
                form.academicYearId,

            gradeId:
                form.gradeId,

            subjectId:
                form.subjectId,

            departmentId:
                form.departmentId,

            status:
                form.status,
        };

        console.log(
            "Teacher Assignment Payload:",
            payload
        );

        try {
            setSubmitting(true);

            let response;

            if (isEdit) {
                response =
                    await teacherAssignmentService
                        .updateTeacherAssignment(
                            initialData._id,
                            payload
                        );
            } else {
                response =
                    await teacherAssignmentService
                        .createTeacherAssignment(
                            payload
                        );
            }

            console.log(
                "Teacher Assignment Response:",
                response
            );

            onSuccess(
                response?.data ||
                    response
            );
        } catch (error) {
            console.error(
                "Teacher assignment submit error:",
                error
            );

            setServerError(
                error?.response?.data
                    ?.message ||
                    error?.message ||
                    (isEdit
                        ? "Failed to update teacher assignment."
                        : "Failed to create teacher assignment.")
            );
        } finally {
            setSubmitting(false);
        }
    };

    // ========================================================
    // CSS
    // ========================================================

    const selectClass =
        "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200 dark:border-white/10 dark:bg-[#1b1b1b] dark:text-white dark:focus:border-white/20 dark:focus:ring-white/10";

    const labelClass =
        "mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300";

    const errorClass =
        "border-red-500 focus:border-red-500 focus:ring-red-500/20";

    // ========================================================
    // RENDER
    // ========================================================

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full space-y-5"
            noValidate
        >
            {/* ================================================= */}
            {/* SERVER ERROR */}
            {/* ================================================= */}

            {serverError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
                    {serverError}
                </div>
            )}

            {/* ================================================= */}
            {/* LOADING */}
            {/* ================================================= */}

            {loadingRelations ? (
                <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-8 text-center text-sm text-gray-500 dark:border-white/10 dark:bg-white/5 dark:text-gray-400">
                    Loading teachers,
                    academic years,
                    grades, subjects and
                    departments...
                </div>
            ) : (
                <>
                    {/* ========================================= */}
                    {/* TEACHER */}
                    {/* ========================================= */}

                    <div>
                        <label
                            className={labelClass}
                        >
                            Teacher
                        </label>

                        <select
                            value={
                                form.teacherId
                            }
                            onChange={(event) =>
                                handleChange(
                                    "teacherId",
                                    event.target.value
                                )
                            }
                            disabled={
                                submitting ||
                                eligibleTeachers.length ===
                                    0
                            }
                            className={`${selectClass} ${
                                errors.teacherId
                                    ? errorClass
                                    : ""
                            } ${
                                submitting ||
                                eligibleTeachers.length ===
                                    0
                                    ? "cursor-not-allowed opacity-50"
                                    : ""
                            }`}
                        >
                            <option value="">
                                {eligibleTeachers.length ===
                                0
                                    ? "No active teachers with profiles found"
                                    : "Select teacher"}
                            </option>

                            {eligibleTeachers.map(
                                (teacher) => {
                                    const teacherId =
                                        getId(
                                            teacher
                                        );

                                    const user =
                                        getTeacherUser(
                                            teacher,
                                            users
                                        );

                                    const name =
                                        getTeacherName(
                                            teacher,
                                            users
                                        );

                                    const employeeNumber =
                                        teacher?.employeeNumber ||
                                        "";

                                    const specialization =
                                        teacher?.specialization ||
                                        "";

                                    return (
                                        <option
                                            key={
                                                teacherId
                                            }
                                            value={
                                                teacherId
                                            }
                                        >
                                            {employeeNumber
                                                ? `${employeeNumber} - `
                                                : ""}

                                            {name}

                                            {specialization
                                                ? ` (${specialization})`
                                                : ""}

                                            {user?.email
                                                ? ` — ${user.email}`
                                                : ""}
                                        </option>
                                    );
                                }
                            )}
                        </select>

                        {errors.teacherId && (
                            <p className="mt-1 text-xs text-red-500">
                                {
                                    errors.teacherId
                                }
                            </p>
                        )}

                        {!errors.teacherId && (
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                {eligibleTeachers.length >
                                0
                                    ? `${eligibleTeachers.length} active teacher profile${
                                          eligibleTeachers.length !==
                                          1
                                              ? "s"
                                              : ""
                                      } available.`
                                    : "Only Teacher users with an active TeacherProfile can receive assignments."}
                            </p>
                        )}
                    </div>

                    {/* ========================================= */}
                    {/* ACADEMIC YEAR + GRADE */}
                    {/* ========================================= */}

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        {/* ACADEMIC YEAR */}

                        <div>
                            <label
                                className={
                                    labelClass
                                }
                            >
                                Academic Year
                            </label>

                            <select
                                value={
                                    form.academicYearId
                                }
                                onChange={(event) =>
                                    handleChange(
                                        "academicYearId",
                                        event.target
                                            .value
                                    )
                                }
                                disabled={
                                    submitting
                                }
                                className={`${selectClass} ${
                                    errors.academicYearId
                                        ? errorClass
                                        : ""
                                }`}
                            >
                                <option value="">
                                    Select academic
                                    year
                                </option>

                                {academicYears.map(
                                    (year) => (
                                        <option
                                            key={
                                                year._id
                                            }
                                            value={
                                                year._id
                                            }
                                        >
                                            {year.name ||
                                                year.year ||
                                                year.title ||
                                                "Academic Year"}

                                            {String(
                                                year?.status
                                            ).toLowerCase() ===
                                            "active"
                                                ? " • Active"
                                                : ""}
                                        </option>
                                    )
                                )}
                            </select>

                            {errors.academicYearId && (
                                <p className="mt-1 text-xs text-red-500">
                                    {
                                        errors.academicYearId
                                    }
                                </p>
                            )}
                        </div>

                        {/* GRADE */}

                        <div>
                            <label
                                className={
                                    labelClass
                                }
                            >
                                Grade / Section
                            </label>

                            <select
                                value={
                                    form.gradeId
                                }
                                onChange={(event) =>
                                    handleChange(
                                        "gradeId",
                                        event.target
                                            .value
                                    )
                                }
                                disabled={
                                    submitting
                                }
                                className={`${selectClass} ${
                                    errors.gradeId
                                        ? errorClass
                                        : ""
                                }`}
                            >
                                <option value="">
                                    Select grade /
                                    section
                                </option>

                                {grades.map(
                                    (grade) => (
                                        <option
                                            key={
                                                grade._id
                                            }
                                            value={
                                                grade._id
                                            }
                                        >
                                            {getGradeLabel(
                                                grade
                                            )}
                                        </option>
                                    )
                                )}
                            </select>

                            {errors.gradeId && (
                                <p className="mt-1 text-xs text-red-500">
                                    {
                                        errors.gradeId
                                    }
                                </p>
                            )}
                        </div>
                    </div>

                    {/* ========================================= */}
                    {/* DEPARTMENT + SUBJECT */}
                    {/* ========================================= */}

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        {/* DEPARTMENT */}

                        <div>
                            <label
                                className={
                                    labelClass
                                }
                            >
                                Department
                            </label>

                            <select
                                value={
                                    form.departmentId
                                }
                                onChange={(event) =>
                                    handleChange(
                                        "departmentId",
                                        event.target
                                            .value
                                    )
                                }
                                disabled={
                                    submitting
                                }
                                className={`${selectClass} ${
                                    errors.departmentId
                                        ? errorClass
                                        : ""
                                }`}
                            >
                                <option value="">
                                    Select department
                                </option>

                                {departments.map(
                                    (department) => (
                                        <option
                                            key={
                                                department._id
                                            }
                                            value={
                                                department._id
                                            }
                                        >
                                            {
                                                department.name
                                            }
                                        </option>
                                    )
                                )}
                            </select>

                            {errors.departmentId && (
                                <p className="mt-1 text-xs text-red-500">
                                    {
                                        errors.departmentId
                                    }
                                </p>
                            )}
                        </div>

                        {/* SUBJECT */}

                        <div>
                            <label
                                className={
                                    labelClass
                                }
                            >
                                Subject
                            </label>

                            <select
                                value={
                                    form.subjectId
                                }
                                onChange={(event) =>
                                    handleSubjectChange(
                                        event.target
                                            .value
                                    )
                                }
                                disabled={
                                    submitting ||
                                    !form.departmentId
                                }
                                className={`${selectClass} ${
                                    errors.subjectId
                                        ? errorClass
                                        : ""
                                } ${
                                    !form.departmentId
                                        ? "cursor-not-allowed opacity-50"
                                        : ""
                                }`}
                            >
                                <option value="">
                                    {!form.departmentId
                                        ? "Select department first"
                                        : "Select subject"}
                                </option>

                                {eligibleSubjects.map(
                                    (subject) => (
                                        <option
                                            key={
                                                subject._id
                                            }
                                            value={
                                                subject._id
                                            }
                                        >
                                            {subject.name}

                                            {subject.code
                                                ? ` (${subject.code})`
                                                : ""}
                                        </option>
                                    )
                                )}
                            </select>

                            {errors.subjectId && (
                                <p className="mt-1 text-xs text-red-500">
                                    {
                                        errors.subjectId
                                    }
                                </p>
                            )}
                        </div>
                    </div>

                    {/* ========================================= */}
                    {/* STATUS */}
                    {/* ========================================= */}

                    <div>
                        <label
                            className={
                                labelClass
                            }
                        >
                            Status
                        </label>

                        <select
                            value={
                                form.status
                            }
                            onChange={(event) =>
                                handleChange(
                                    "status",
                                    event.target
                                        .value
                                )
                            }
                            disabled={
                                submitting
                            }
                            className={`${selectClass} ${
                                errors.status
                                    ? errorClass
                                    : ""
                            }`}
                        >
                            <option value="active">
                                Active
                            </option>

                            <option value="inactive">
                                Inactive
                            </option>
                        </select>

                        {errors.status && (
                            <p className="mt-1 text-xs text-red-500">
                                {
                                    errors.status
                                }
                            </p>
                        )}
                    </div>

                    {/* ========================================= */}
                    {/* INFORMATION */}
                    {/* ========================================= */}

                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-white/10 dark:bg-white/5">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                            Teacher eligibility
                        </p>

                        <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                            A teacher must have a
                            User account with the
                            Teacher role and an active
                            TeacherProfile. An existing
                            TeacherAssignment is not
                            required.
                        </p>
                    </div>

                    {/* ========================================= */}
                    {/* ACTIONS */}
                    {/* ========================================= */}

                    <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 dark:border-white/10 sm:flex-row sm:justify-end">
                        {onCancel && (
                            <button
                                type="button"
                                onClick={onCancel}
                                disabled={
                                    submitting
                                }
                                className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5"
                            >
                                Cancel
                            </button>
                        )}

                        <button
                            type="submit"
                            disabled={
                                submitting ||
                                loadingRelations ||
                                eligibleTeachers.length ===
                                    0
                            }
                            className="rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                        >
                            {submitting
                                ? isEdit
                                    ? "Updating..."
                                    : "Creating..."
                                : isEdit
                                ? "Update Assignment"
                                : "Create Assignment"}
                        </button>
                    </div>
                </>
            )}
        </form>
    );
}