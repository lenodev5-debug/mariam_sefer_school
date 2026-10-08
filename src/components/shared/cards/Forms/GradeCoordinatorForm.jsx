import { useEffect, useMemo, useState } from "react";

import teacherGradeCoordinatorService from "../../../../../lib/service/admin/teacherGradeCoordinatorService";
import academicYearService from "../../../../../lib/service/admin/academicYearService";
import gradeService from "../../../../../lib/service/admin/gradeService";
import teacherAssignmentService from "../../../../../lib/service/admin/teacherAssignmentService";
import userService from "../../../../../lib/service/admin/userService";

export default function GradeCoordinatorForm({
    onSuccess,
}) {
    // ========================================================
    // STATE
    // ========================================================

    const [academicYears, setAcademicYears] =
        useState([]);

    const [grades, setGrades] =
        useState([]);

    const [teacherAssignments, setTeacherAssignments] =
        useState([]);

    const [teachers, setTeachers] =
        useState([]);

    const [loadingData, setLoadingData] =
        useState(true);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    const [formData, setFormData] = useState({
        academicYearId: "",
        gradeId: "",
        teacherId: "",
        status: "active",
    });

    // ========================================================
    // HELPERS
    // ========================================================

    const getId = (value) => {
        if (!value) {
            return "";
        }

        if (typeof value === "string") {
            return value;
        }

        return value._id || "";
    };

    const normalizeArray = (
        response,
        key
    ) => {
        if (Array.isArray(response)) {
            return response;
        }

        if (Array.isArray(response?.data)) {
            return response.data;
        }

        if (
            Array.isArray(
                response?.data?.[key]
            )
        ) {
            return response.data[key];
        }

        if (
            Array.isArray(
                response?.[key]
            )
        ) {
            return response[key];
        }

        return [];
    };

    // ========================================================
    // LOAD FORM DATA
    // ========================================================

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoadingData(true);
                setError("");

                const [
                    academicYearResponse,
                    gradeResponse,
                    assignmentResponse,
                    userResponse,
                ] = await Promise.all([
                    academicYearService
                        .getAllAcademicYears(),

                    gradeService
                        .getAllGrades(),

                    teacherAssignmentService
                        .getAllTeacherAssignments(),

                    userService.getAllUsers({
                        role: "Teacher",
                    }),
                ]);

                // ---------------------------------------------
                // ACADEMIC YEARS
                // ---------------------------------------------

                const academicYearList =
                    normalizeArray(
                        academicYearResponse,
                        "academicYears"
                    );

                // ---------------------------------------------
                // GRADES
                // ---------------------------------------------

                const gradeList =
                    normalizeArray(
                        gradeResponse,
                        "grades"
                    );

                // ---------------------------------------------
                // ASSIGNMENTS
                // ---------------------------------------------

                const assignmentList =
                    normalizeArray(
                        assignmentResponse,
                        "assignments"
                    );

                // ---------------------------------------------
                // TEACHERS / USERS
                // ---------------------------------------------

                const userList =
                    normalizeArray(
                        userResponse,
                        "users"
                    );

                console.log(
                    "Grade Coordinator - Academic Years:",
                    academicYearList
                );

                console.log(
                    "Grade Coordinator - Grades:",
                    gradeList
                );

                console.log(
                    "Grade Coordinator - Assignments:",
                    assignmentList
                );

                console.log(
                    "Grade Coordinator - Teacher Users:",
                    userList
                );

                setAcademicYears(
                    academicYearList
                );

                setGrades(
                    gradeList
                );

                setTeacherAssignments(
                    assignmentList
                );

                setTeachers(
                    userList.filter(
                        (user) =>
                            user.role ===
                            "Teacher"
                    )
                );

            } catch (error) {
                console.error(
                    "Load grade coordinator form data error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                        error.message ||
                        "Failed to load grade coordinator data."
                );
            } finally {
                setLoadingData(false);
            }
        };

        loadData();
    }, []);

    // ========================================================
    // HANDLE CHANGE
    // ========================================================

    const handleChange = (e) => {
        const {
            name,
            value,
        } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setError("");
        setSuccess("");
    };

    // ========================================================
    // ACADEMIC YEAR CHANGE
    // ========================================================

    const handleAcademicYearChange = (e) => {
        const value = e.target.value;

        setFormData((prev) => ({
            ...prev,
            academicYearId: value,
            teacherId: "",
        }));

        setError("");
        setSuccess("");
    };

    // ========================================================
    // GRADE CHANGE
    // ========================================================

    const handleGradeChange = (e) => {
        const value = e.target.value;

        setFormData((prev) => ({
            ...prev,
            gradeId: value,
            teacherId: "",
        }));

        setError("");
        setSuccess("");
    };

    // ========================================================
    // FIND USER FOR TEACHER PROFILE
    // ========================================================

    const getTeacherUser = (teacherProfile) => {
        if (!teacherProfile) {
            return null;
        }

        // ---------------------------------------------
        // If teacherId is already populated:
        //
        // teacherId: {
        //     _id: "...",
        //     userId: "..."
        // }
        // ---------------------------------------------

        const userId =
            getId(
                teacherProfile.userId
            );

        if (!userId) {
            return null;
        }

        return (
            teachers.find(
                (user) =>
                    getId(user) ===
                    userId
            ) || null
        );
    };

    // ========================================================
    // FILTER ACTIVE TEACHER ASSIGNMENTS
    // ========================================================

    const availableAssignments = useMemo(() => {
        if (
            !formData.academicYearId ||
            !formData.gradeId
        ) {
            return [];
        }

        return teacherAssignments.filter(
            (assignment) => {
                // ---------------------------------------------
                // ACTIVE ASSIGNMENT ONLY
                // ---------------------------------------------

                if (
                    assignment.status !==
                    "active"
                ) {
                    return false;
                }

                // ---------------------------------------------
                // ACADEMIC YEAR
                // ---------------------------------------------

                const assignmentAcademicYearId =
                    getId(
                        assignment.academicYearId
                    );

                if (
                    assignmentAcademicYearId !==
                    formData.academicYearId
                ) {
                    return false;
                }

                // ---------------------------------------------
                // GRADE
                // ---------------------------------------------

                const assignmentGradeId =
                    getId(
                        assignment.gradeId
                    );

                if (
                    assignmentGradeId !==
                    formData.gradeId
                ) {
                    return false;
                }

                // ---------------------------------------------
                // TEACHER PROFILE REQUIRED
                // ---------------------------------------------

                if (
                    !assignment.teacherId
                ) {
                    return false;
                }

                return true;
            }
        );
    }, [
        teacherAssignments,
        formData.academicYearId,
        formData.gradeId,
    ]);

    // ========================================================
    // SUBMIT
    // ========================================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        // ----------------------------------------------------
        // VALIDATION
        // ----------------------------------------------------

        if (!formData.academicYearId) {
            setError(
                "Please select an academic year."
            );
            return;
        }

        if (!formData.gradeId) {
            setError(
                "Please select a grade."
            );
            return;
        }

        if (!formData.teacherId) {
            setError(
                "Please select a teacher."
            );
            return;
        }

        try {
            setLoading(true);

            const coordinatorData = {
                teacherId:
                    formData.teacherId,

                academicYearId:
                    formData.academicYearId,

                gradeId:
                    formData.gradeId,

                status:
                    formData.status,
            };

            console.log(
                "Creating Grade Coordinator:",
                coordinatorData
            );

            const response =
                await teacherGradeCoordinatorService
                    .createGradeCoordinator(
                        coordinatorData
                    );

            console.log(
                "Grade Coordinator Response:",
                response
            );

            const coordinator =
                response?.coordinator ||
                response?.data?.coordinator ||
                response?.data;

            if (!coordinator) {
                throw new Error(
                    response?.message ||
                        "Failed to create grade coordinator."
                );
            }

            setSuccess(
                "Grade coordinator assigned successfully."
            );

            setFormData((prev) => ({
                ...prev,
                teacherId: "",
            }));

            onSuccess?.(
                coordinator
            );

        } catch (error) {
            console.error(
                "Create grade coordinator error:",
                error
            );

            setError(
                error.response?.data?.message ||
                    error.message ||
                    "Failed to create grade coordinator."
            );
        } finally {
            setLoading(false);
        }
    };

    // ========================================================
    // LOADING
    // ========================================================

    if (loadingData) {
        return (
            <div className="flex min-h-[300px] w-full items-center justify-center rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#151515]">

                <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">

                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-black dark:border-gray-700 dark:border-t-white" />

                    Loading grade coordinator data...

                </div>

            </div>
        );
    }

    // ========================================================
    // FORM
    // ========================================================

    return (
        <div className="w-full max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#151515]">

            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <div className="mb-6">

                <div className="mb-2 flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 dark:bg-white/10">

                        <svg
                            className="h-5 w-5 text-gray-700 dark:text-gray-200"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                        >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />

                            <circle
                                cx="9"
                                cy="7"
                                r="4"
                            />

                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />

                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>

                    </div>

                    <div>

                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Assign Grade Coordinator
                        </h2>

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Assign a teacher to coordinate a grade.
                        </p>

                    </div>

                </div>

            </div>

            {/* ================================================= */}
            {/* MESSAGES */}
            {/* ================================================= */}

            {error && (
                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                    {error}
                </div>
            )}

            {success && (
                <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-900/50 dark:bg-green-950/30 dark:text-green-400">
                    {success}
                </div>
            )}

            {/* ================================================= */}
            {/* FORM */}
            {/* ================================================= */}

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                {/* ================================================= */}
                {/* ACADEMIC YEAR + GRADE */}
                {/* ================================================= */}

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                    {/* ACADEMIC YEAR */}

                    <div>

                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Academic Year
                        </label>

                        <select
                            name="academicYearId"
                            value={
                                formData.academicYearId
                            }
                            onChange={
                                handleAcademicYearChange
                            }
                            disabled={loading}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200 disabled:opacity-60 dark:border-white/10 dark:bg-[#1d1d1d] dark:text-white dark:focus:border-white/30"
                        >

                            <option value="">
                                Select academic year
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
                                        {year.name}

                                        {year.status ===
                                        "active"
                                            ? " • Active"
                                            : ""}
                                    </option>
                                )
                            )}

                        </select>

                    </div>

                    {/* GRADE */}

                    <div>

                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Grade / Section
                        </label>

                        <select
                            name="gradeId"
                            value={
                                formData.gradeId
                            }
                            onChange={
                                handleGradeChange
                            }
                            disabled={loading}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200 disabled:opacity-60 dark:border-white/10 dark:bg-[#1d1d1d] dark:text-white dark:focus:border-white/30"
                        >

                            <option value="">
                                Select grade
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
                                        {grade.gradeName ===
                                        "kg"
                                            ? "KG"
                                            : `Grade ${grade.gradeName}`}

                                        {" - "}

                                        Section{" "}

                                        {
                                            grade.sectionName
                                        }

                                    </option>
                                )
                            )}

                        </select>

                    </div>

                </div>

                {/* ================================================= */}
                {/* TEACHER */}
                {/* ================================================= */}

                <div>

                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Teacher
                    </label>

                    <select
                        name="teacherId"
                        value={
                            formData.teacherId
                        }
                        onChange={
                            handleChange
                        }
                        disabled={
                            loading ||
                            !formData.academicYearId ||
                            !formData.gradeId
                        }
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-[#1d1d1d] dark:text-white dark:focus:border-white/30"
                    >

                        <option value="">
                            {!formData.academicYearId ||
                            !formData.gradeId
                                ? "Select academic year and grade first"
                                : availableAssignments.length ===
                                    0
                                ? "No teachers found"
                                : "Select teacher"}
                        </option>

                        {availableAssignments.map(
                            (assignment) => {

                                const teacherProfile =
                                    assignment.teacherId;

                                // --------------------------------
                                // TeacherProfile._id
                                // This is what the coordinator
                                // API needs as teacherId.
                                // --------------------------------

                                const teacherProfileId =
                                    getId(
                                        teacherProfile
                                    );

                                // --------------------------------
                                // TeacherProfile.userId
                                // --------------------------------

                                const userId =
                                    getId(
                                        teacherProfile?.userId
                                    );

                                // --------------------------------
                                // Find actual User
                                // --------------------------------

                                const teacherUser =
                                    teachers.find(
                                        (user) =>
                                            getId(
                                                user
                                            ) ===
                                            userId
                                    );

                                // --------------------------------
                                // Display name
                                // --------------------------------

                                const teacherName =
                                    teacherUser?.name ||
                                    "Unknown teacher";

                                const employeeNumber =
                                    teacherProfile
                                        ?.employeeNumber ||
                                    "";

                                const specialization =
                                    teacherProfile
                                        ?.specialization ||
                                    "";

                                return (
                                    <option
                                        key={
                                            assignment._id
                                        }
                                        value={
                                            teacherProfileId
                                        }
                                    >
                                        {employeeNumber
                                            ? `${employeeNumber} - `
                                            : ""}

                                        {teacherName}

                                        {specialization
                                            ? ` (${specialization})`
                                            : ""}
                                    </option>
                                );
                            }
                        )}

                    </select>

                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">

                        {!formData.academicYearId ||
                        !formData.gradeId
                            ? "Select an academic year and grade to see assigned teachers."
                            : availableAssignments.length ===
                                0
                            ? "No active teacher assignment exists for this academic year and grade."
                            : `${availableAssignments.length} active teacher assignment${
                                  availableAssignments.length !==
                                  1
                                      ? "s"
                                      : ""
                              } found.`}

                    </p>

                </div>

                {/* ================================================= */}
                {/* STATUS */}
                {/* ================================================= */}

                <div>

                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Status
                    </label>

                    <select
                        name="status"
                        value={
                            formData.status
                        }
                        onChange={
                            handleChange
                        }
                        disabled={loading}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200 disabled:opacity-60 dark:border-white/10 dark:bg-[#1d1d1d] dark:text-white dark:focus:border-white/30"
                    >

                        <option value="active">
                            Active
                        </option>

                        <option value="inactive">
                            Inactive
                        </option>

                    </select>

                </div>

                {/* ================================================= */}
                {/* SUBMIT */}
                {/* ================================================= */}

                <button
                    type="submit"
                    disabled={
                        loading ||
                        !formData.academicYearId ||
                        !formData.gradeId ||
                        !formData.teacherId
                    }
                    className="w-full rounded-xl bg-black px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >

                    {loading
                        ? "Assigning coordinator..."
                        : "Assign Grade Coordinator"}

                </button>

            </form>

        </div>
    );
}
