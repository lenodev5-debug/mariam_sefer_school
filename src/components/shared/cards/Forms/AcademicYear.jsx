import { useState } from "react";
import academicYearService from "../../../../../lib/service/admin/academicYearService";

// INITIAL FORM

const INITIAL_FORM_DATA = {
    name: "",
    startYear: "",
    endYear: "",
    startDate: "",
    endDate: "",
    status: "upcoming",
};

// COMPONENT

export default function AcademicYearForm({ onSuccess }) {
    const [formData, setFormData] =
        useState(INITIAL_FORM_DATA);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    // HANDLE INPUT CHANGE

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

    // VALIDATE FORM

    const validateForm = () => {
        if (!formData.name.trim()) {
            return "Please enter an academic year name.";
        }

        if (!formData.startYear) {
            return "Please enter the start year.";
        }

        if (!formData.endYear) {
            return "Please enter the end year.";
        }

        if (
            Number(formData.endYear) !==
            Number(formData.startYear) + 1
        ) {
            return "Academic year must span exactly one year.";
        }

        if (!formData.startDate) {
            return "Please select a start date.";
        }

        if (!formData.endDate) {
            return "Please select an end date.";
        }

        if (
            new Date(formData.endDate) <=
            new Date(formData.startDate)
        ) {
            return "End date must be after the start date.";
        }

        if (!formData.status) {
            return "Please select a status.";
        }

        return null;
    };

    // RESET FORM

    const resetForm = () => {
        setFormData({
            ...INITIAL_FORM_DATA,
        });
    };

    // CREATE ACADEMIC YEAR

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

            const academicYearData = {
                name: formData.name.trim(),

                startYear:
                    Number(formData.startYear),

                endYear:
                    Number(formData.endYear),

                startDate:
                    formData.startDate,

                endDate:
                    formData.endDate,

                status:
                    formData.status,
            };

            // ------------------------------------------------
            // API REQUEST
            // ------------------------------------------------

            const response =
                await academicYearService.createAcademicYear(
                    academicYearData
                );

            // ------------------------------------------------
            // CHECK RESPONSE
            // ------------------------------------------------

            if (!response?.success) {
                throw new Error(
                    response?.message ||
                        "Failed to create academic year."
                );
            }

            // ------------------------------------------------
            // SUCCESS
            // ------------------------------------------------

            setSuccess(
                "Academic year created successfully."
            );

            resetForm();

            // Send created academic year
            // back to the parent component
            onSuccess?.(
                response.data
            );

        } catch (error) {
            console.error(
                "Create academic year error:",
                error
            );

            const message =
                error.response?.data?.message ||
                error.message ||
                "Failed to create academic year.";

            setError(message);

        } finally {
            setLoading(false);
        }
    };

    // RENDER

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
                            <rect
                                x="3"
                                y="4"
                                width="18"
                                height="17"
                                rx="2"
                            />

                            <path d="M16 2v4" />

                            <path d="M8 2v4" />

                            <path d="M3 10h18" />

                            <path d="M8 14h.01" />

                            <path d="M12 14h.01" />

                            <path d="M16 14h.01" />

                            <path d="M8 18h.01" />

                            <path d="M12 18h.01" />
                        </svg>

                    </div>

                    {/* Title */}

                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Create Academic Year
                        </h2>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Create and configure a new
                            academic year.
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
                {/* NAME */}
                {/* ================================================= */}

                <div>
                    <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Academic Year Name
                    </label>

                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={loading}
                        placeholder="e.g. 2018/2019"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-[#1d1d1d] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white/30 dark:focus:ring-white/10"
                    />
                </div>

                {/* ================================================= */}
                {/* YEARS */}
                {/* ================================================= */}

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                    {/* START YEAR */}

                    <div>
                        <label
                            htmlFor="startYear"
                            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Start Year
                        </label>

                        <input
                            id="startYear"
                            name="startYear"
                            type="number"
                            value={
                                formData.startYear
                            }
                            onChange={handleChange}
                            disabled={loading}
                            placeholder="2018"
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-[#1d1d1d] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white/30 dark:focus:ring-white/10"
                        />
                    </div>

                    {/* END YEAR */}

                    <div>
                        <label
                            htmlFor="endYear"
                            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            End Year
                        </label>

                        <input
                            id="endYear"
                            name="endYear"
                            type="number"
                            value={
                                formData.endYear
                            }
                            onChange={handleChange}
                            disabled={loading}
                            placeholder="2019"
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-[#1d1d1d] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white/30 dark:focus:ring-white/10"
                        />
                    </div>

                </div>

                {/* ================================================= */}
                {/* DATES */}
                {/* ================================================= */}

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                    {/* START DATE */}

                    <div>
                        <label
                            htmlFor="startDate"
                            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Start Date
                        </label>

                        <input
                            id="startDate"
                            name="startDate"
                            type="date"
                            value={
                                formData.startDate
                            }
                            onChange={handleChange}
                            disabled={loading}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-[#1d1d1d] dark:text-white dark:focus:border-white/30 dark:focus:ring-white/10"
                        />
                    </div>

                    {/* END DATE */}

                    <div>
                        <label
                            htmlFor="endDate"
                            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            End Date
                        </label>

                        <input
                            id="endDate"
                            name="endDate"
                            type="date"
                            value={
                                formData.endDate
                            }
                            onChange={handleChange}
                            disabled={loading}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-[#1d1d1d] dark:text-white dark:focus:border-white/30 dark:focus:ring-white/10"
                        />
                    </div>

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
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-[#1d1d1d] dark:text-white dark:focus:border-white/30 dark:focus:ring-white/10"
                    >
                        <option value="upcoming">
                            Upcoming
                        </option>

                        <option value="active">
                            Active
                        </option>

                        <option value="completed">
                            Completed
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
                            : "Create Academic Year"}
                    </span>
                </button>

            </form>
        </div>
    );
}