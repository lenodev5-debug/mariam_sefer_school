import { useState } from "react";
import gradeService from "../../../../../lib/service/admin/gradeService";

// ============================================================
// GRADE OPTIONS
// ============================================================

const GRADE_OPTIONS = [
    {
        value: "kg",
        label: "KG",
    },
    {
        value: "1",
        label: "Grade 1",
    },
    {
        value: "2",
        label: "Grade 2",
    },
    {
        value: "3",
        label: "Grade 3",
    },
    {
        value: "4",
        label: "Grade 4",
    },
    {
        value: "5",
        label: "Grade 5",
    },
    {
        value: "6",
        label: "Grade 6",
    },
    {
        value: "7",
        label: "Grade 7",
    },
    {
        value: "8",
        label: "Grade 8",
    },
    {
        value: "9",
        label: "Grade 9",
    },
    {
        value: "10",
        label: "Grade 10",
    },
    {
        value: "11",
        label: "Grade 11",
    },
    {
        value: "12",
        label: "Grade 12",
    },
];

// ============================================================
// SECTION OPTIONS
// ============================================================

const SECTION_OPTIONS = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
];

// ============================================================
// INITIAL FORM
// ============================================================

const INITIAL_FORM_DATA = {
    gradeName: "",
    sectionName: "",
    status: "active",
};

// ============================================================
// COMPONENT
// ============================================================

export default function GradeForm({ onSuccess }) {
    const [formData, setFormData] =
        useState(INITIAL_FORM_DATA);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    // ========================================================
    // HANDLE INPUT CHANGE
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

        // Clear previous messages
        setError("");
        setSuccess("");
    };

    // ========================================================
    // VALIDATE FORM
    // ========================================================

    const validateForm = () => {
        if (!formData.gradeName) {
            return "Please select a grade.";
        }

        if (!formData.sectionName) {
            return "Please select a section.";
        }

        if (!formData.status) {
            return "Please select a status.";
        }

        return null;
    };

    // ========================================================
    // RESET FORM
    // ========================================================

    const resetForm = () => {
        setFormData({
            ...INITIAL_FORM_DATA,
        });
    };

    // ========================================================
    // CREATE GRADE
    // ========================================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        // ----------------------------------------------------
        // VALIDATION
        // ----------------------------------------------------

        const validationError =
            validateForm();

        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            setLoading(true);

            // ------------------------------------------------
            // DATA SENT TO BACKEND
            // ------------------------------------------------

            const gradeData = {
                gradeName:
                    formData.gradeName,

                sectionName:
                    formData.sectionName,

                status:
                    formData.status,
            };

            // ------------------------------------------------
            // API REQUEST
            // ------------------------------------------------

            const response =
                await gradeService.createGrade(
                    gradeData
                );

            // ------------------------------------------------
            // CHECK RESPONSE
            // ------------------------------------------------

            if (!response?.success) {
                throw new Error(
                    response?.message ||
                        "Failed to create grade."
                );
            }

            // ------------------------------------------------
            // SUCCESS
            // ------------------------------------------------

            setSuccess(
                "Grade created successfully."
            );

            // Reset form
            resetForm();

            // Send created grade to parent
            onSuccess?.(
                response.data
            );

        } catch (error) {
            console.error(
                "Create grade error:",
                error
            );

            // ------------------------------------------------
            // BACKEND ERROR
            // ------------------------------------------------

            const message =
                error.response?.data?.message ||
                error.message ||
                "Failed to create grade.";

            setError(message);

        } finally {
            setLoading(false);
        }
    };

    // ========================================================
    // RENDER
    // ========================================================

    return (
        <div className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#151515]">

            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <div className="mb-6">
                <div className="flex items-center gap-3">

                    {/* Icon */}

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 dark:bg-white/10">

                        <svg
                            className="h-5 w-5 text-gray-700 dark:text-gray-200"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M4 4h16v16H4z" />

                            <path d="M8 8h8" />

                            <path d="M8 12h8" />

                            <path d="M8 16h5" />
                        </svg>

                    </div>

                    {/* Title */}

                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Create Grade
                        </h2>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Create a grade and assign
                            its section.
                        </p>
                    </div>

                </div>
            </div>

            {/* ================================================= */}
            {/* ERROR MESSAGE */}
            {/* ================================================= */}

            {error && (
                <div
                    role="alert"
                    className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400"
                >
                    <svg
                        className="mt-0.5 h-5 w-5 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="9"
                        />

                        <path d="M12 8v4" />

                        <path d="M12 16h.01" />
                    </svg>

                    <span>
                        {error}
                    </span>
                </div>
            )}

            {/* ================================================= */}
            {/* SUCCESS MESSAGE */}
            {/* ================================================= */}

            {success && (
                <div
                    role="status"
                    className="mb-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-900/50 dark:bg-green-950/30 dark:text-green-400"
                >
                    <svg
                        className="mt-0.5 h-5 w-5 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M5 12l4 4L19 6" />
                    </svg>

                    <span>
                        {success}
                    </span>
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
                {/* GRADE */}
                {/* ================================================= */}

                <div>
                    <label
                        htmlFor="gradeName"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Grade
                    </label>

                    <select
                        id="gradeName"
                        name="gradeName"
                        value={
                            formData.gradeName
                        }
                        onChange={
                            handleChange
                        }
                        disabled={loading}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-[#1d1d1d] dark:text-white dark:focus:border-white/30 dark:focus:ring-white/10"
                    >
                        <option value="">
                            Select grade
                        </option>

                        {GRADE_OPTIONS.map(
                            (grade) => (
                                <option
                                    key={
                                        grade.value
                                    }
                                    value={
                                        grade.value
                                    }
                                >
                                    {
                                        grade.label
                                    }
                                </option>
                            )
                        )}
                    </select>
                </div>

                {/* ================================================= */}
                {/* SECTION */}
                {/* ================================================= */}

                <div>
                    <label
                        htmlFor="sectionName"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Section
                    </label>

                    <select
                        id="sectionName"
                        name="sectionName"
                        value={
                            formData.sectionName
                        }
                        onChange={
                            handleChange
                        }
                        disabled={loading}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-[#1d1d1d] dark:text-white dark:focus:border-white/30 dark:focus:ring-white/10"
                    >
                        <option value="">
                            Select section
                        </option>

                        {SECTION_OPTIONS.map(
                            (section) => (
                                <option
                                    key={section}
                                    value={section}
                                >
                                    Section{" "}
                                    {section}
                                </option>
                            )
                        )}
                    </select>
                </div>

                {/* ================================================= */}
                {/* STATUS */}
                {/* ================================================= */}

                <div>
                    <label
                        htmlFor="status"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Status
                    </label>

                    <select
                        id="status"
                        name="status"
                        value={
                            formData.status
                        }
                        onChange={
                            handleChange
                        }
                        disabled={loading}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-[#1d1d1d] dark:text-white dark:focus:border-white/30 dark:focus:ring-white/10"
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
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >
                    {loading && (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white dark:border-black/30 dark:border-t-black" />
                    )}

                    <span>
                        {loading
                            ? "Creating..."
                            : "Create Grade"}
                    </span>
                </button>

            </form>
        </div>
    );
}
