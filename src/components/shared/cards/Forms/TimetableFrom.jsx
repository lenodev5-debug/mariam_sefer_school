import { useEffect, useMemo, useState } from "react";

import timetableService from "../../../../../lib/service/admin/timetable";
import academicYearService from "../../../../../lib/service/admin/academicYearService";
import gradeService from "../../../../../lib/service/admin/gradeService";
import teacherAssignmentService from "../../../../../lib/service/admin/teacherAssignmentService";

const DAYS = [
    {
        value: "monday",
        label: "Monday",
    },
    {
        value: "tuesday",
        label: "Tuesday",
    },
    {
        value: "wednesday",
        label: "Wednesday",
    },
    {
        value: "thursday",
        label: "Thursday",
    },
    {
        value: "friday",
        label: "Friday",
    },
    {
        value: "saturday",
        label: "Saturday",
    },
    {
        value: "sunday",
        label: "Sunday",
    },
];

export default function TimetableForm({
    onSuccess,
}) {
    const [academicYears, setAcademicYears] =
        useState([]);

    const [grades, setGrades] =
        useState([]);

    const [teacherAssignments, setTeacherAssignments] =
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
        teacherAssignmentId: "",
        dayOfWeek: "",
        startTime: "",
        endTime: "",
        room: "",
    });

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
                ] = await Promise.all([
                    academicYearService
                        .getAllAcademicYears(),

                    gradeService
                        .getAllGrades(),

                    teacherAssignmentService
                        .getAllTeacherAssignments(),
                ]);

                setAcademicYears(
                    academicYearResponse?.data || []
                );

                setGrades(
                    gradeResponse?.data || []
                );

                setTeacherAssignments(
                    assignmentResponse?.data || []
                );

            } catch (error) {
                console.error(
                    "Load timetable form data error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                        "Failed to load timetable data."
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
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setError("");
        setSuccess("");
    };

    // ========================================================
    // FILTER ASSIGNMENTS
    // ========================================================

    const availableAssignments = useMemo(() => {
        return teacherAssignments.filter(
            (assignment) => {

                if (
                    assignment.status !==
                    "active"
                ) {
                    return false;
                }

                if (
                    formData.academicYearId &&
                    assignment.academicYearId?._id !==
                        formData.academicYearId
                ) {
                    return false;
                }

                if (
                    formData.gradeId &&
                    assignment.gradeId?._id !==
                        formData.gradeId
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

        if (!formData.teacherAssignmentId) {
            setError(
                "Please select a teacher assignment."
            );
            return;
        }

        if (!formData.dayOfWeek) {
            setError(
                "Please select a day."
            );
            return;
        }

        if (!formData.startTime) {
            setError(
                "Please select a start time."
            );
            return;
        }

        if (!formData.endTime) {
            setError(
                "Please select an end time."
            );
            return;
        }

        if (
            formData.endTime <=
            formData.startTime
        ) {
            setError(
                "End time must be later than start time."
            );
            return;
        }

        try {
            setLoading(true);

            const timetableData = {
                academicYearId:
                    formData.academicYearId,

                gradeId:
                    formData.gradeId,

                teacherAssignmentId:
                    formData.teacherAssignmentId,

                dayOfWeek:
                    formData.dayOfWeek,

                startTime:
                    formData.startTime,

                endTime:
                    formData.endTime,

                room:
                    formData.room.trim() || null,
            };

            const response =
                await timetableService
                    .createTimetable(
                        timetableData
                    );

            if (!response?.success) {
                throw new Error(
                    response?.message ||
                        "Failed to create timetable."
                );
            }

            setSuccess(
                "Timetable created successfully."
            );

            setFormData({
                academicYearId:
                    formData.academicYearId,

                gradeId:
                    formData.gradeId,

                teacherAssignmentId: "",

                dayOfWeek: "",

                startTime: "",

                endTime: "",

                room: "",
            });

            onSuccess?.(response.data);

        } catch (error) {
            console.error(
                "Create timetable error:",
                error
            );

            setError(
                error.response?.data?.message ||
                    error.message ||
                    "Failed to create timetable."
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

                    Loading timetable data...
                </div>
            </div>
        );
    }

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
                            <rect
                                x="3"
                                y="4"
                                width="18"
                                height="17"
                                rx="2"
                            />

                            <path d="M16 2v4M8 2v4M3 9h18" />

                            <path d="M8 13h2M14 13h2M8 17h2M14 17h2" />
                        </svg>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Create Timetable
                        </h2>

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Add a class to the school timetable.
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

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                {/* ================================================= */}
                {/* ACADEMIC YEAR + GRADE */}
                {/* ================================================= */}

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Academic Year
                        </label>

                        <select
                            name="academicYearId"
                            value={
                                formData.academicYearId
                            }
                            onChange={handleChange}
                            disabled={loading}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200 disabled:opacity-60 dark:border-white/10 dark:bg-[#1d1d1d] dark:text-white dark:focus:border-white/30"
                        >
                            <option value="">
                                Select academic year
                            </option>

                            {academicYears.map(
                                (year) => (
                                    <option
                                        key={year._id}
                                        value={year._id}
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

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Grade / Section
                        </label>

                        <select
                            name="gradeId"
                            value={
                                formData.gradeId
                            }
                            onChange={(e) => {
                                handleChange(e);

                                setFormData(
                                    (prev) => ({
                                        ...prev,
                                        gradeId:
                                            e.target.value,
                                        teacherAssignmentId:
                                            "",
                                    })
                                );
                            }}
                            disabled={loading}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200 disabled:opacity-60 dark:border-white/10 dark:bg-[#1d1d1d] dark:text-white dark:focus:border-white/30"
                        >
                            <option value="">
                                Select grade
                            </option>

                            {grades.map(
                                (grade) => (
                                    <option
                                        key={grade._id}
                                        value={grade._id}
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
                {/* TEACHER ASSIGNMENT */}
                {/* ================================================= */}

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Teacher Assignment
                    </label>

                    <select
                        name="teacherAssignmentId"
                        value={
                            formData.teacherAssignmentId
                        }
                        onChange={handleChange}
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
                                ? "No assignments found"
                                : "Select teacher assignment"}
                        </option>

                        {availableAssignments.map(
                            (assignment) => {

                                const teacher =
                                    assignment
                                        .teacherId
                                        ?.userId
                                        ?.name ||
                                    "Unknown teacher";

                                const subject =
                                    assignment
                                        .subjectId
                                        ?.name ||
                                    "Unknown subject";

                                const code =
                                    assignment
                                        .subjectId
                                        ?.code;

                                return (
                                    <option
                                        key={
                                            assignment._id
                                        }
                                        value={
                                            assignment._id
                                        }
                                    >
                                        {subject}
                                        {code
                                            ? ` (${code})`
                                            : ""}{" "}
                                        —{" "}
                                        {teacher}
                                    </option>
                                );
                            }
                        )}
                    </select>

                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                        Only active assignments for the selected academic year and grade are shown.
                    </p>
                </div>

                {/* ================================================= */}
                {/* DAY */}
                {/* ================================================= */}

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Day
                    </label>

                    <select
                        name="dayOfWeek"
                        value={
                            formData.dayOfWeek
                        }
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200 disabled:opacity-60 dark:border-white/10 dark:bg-[#1d1d1d] dark:text-white dark:focus:border-white/30"
                    >
                        <option value="">
                            Select day
                        </option>

                        {DAYS.map((day) => (
                            <option
                                key={day.value}
                                value={day.value}
                            >
                                {day.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* ================================================= */}
                {/* TIME */}
                {/* ================================================= */}

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Start Time
                        </label>

                        <input
                            type="time"
                            name="startTime"
                            value={
                                formData.startTime
                            }
                            onChange={handleChange}
                            disabled={loading}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200 disabled:opacity-60 dark:border-white/10 dark:bg-[#1d1d1d] dark:text-white dark:focus:border-white/30"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            End Time
                        </label>

                        <input
                            type="time"
                            name="endTime"
                            value={
                                formData.endTime
                            }
                            onChange={handleChange}
                            disabled={loading}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200 disabled:opacity-60 dark:border-white/10 dark:bg-[#1d1d1d] dark:text-white dark:focus:border-white/30"
                        />
                    </div>
                </div>

                {/* ================================================= */}
                {/* ROOM */}
                {/* ================================================= */}

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Room
                        <span className="ml-1 text-gray-400">
                            (Optional)
                        </span>
                    </label>

                    <input
                        type="text"
                        name="room"
                        value={formData.room}
                        onChange={handleChange}
                        placeholder="e.g. Room 12"
                        disabled={loading}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 disabled:opacity-60 dark:border-white/10 dark:bg-[#1d1d1d] dark:text-white dark:placeholder:text-gray-600 dark:focus:border-white/30"
                    />
                </div>

                {/* ================================================= */}
                {/* SUBMIT */}
                {/* ================================================= */}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-black px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >
                    {loading
                        ? "Creating timetable..."
                        : "Create Timetable"}
                </button>
            </form>
        </div>
    );
}