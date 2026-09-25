import { useEffect, useState } from "react";

import subjectService from "../../../../../lib/service/admin/subjectService";
import departmentService from "../../../../../lib/service/admin/departmentService";

// INITIAL FORM

const INITIAL_FORM_DATA = {
    name: "",
    code: "",
    departmentId: "",
    description: "",
    status: "active",
};

// COMPONENT

export default function SubjectForm({ onSuccess }) {
    const [formData, setFormData] =
        useState(INITIAL_FORM_DATA);

    const [departments, setDepartments] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const [departmentsLoading, setDepartmentsLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    // FETCH DEPARTMENTS

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                setDepartmentsLoading(true);
                setError("");

                const response =
                    await departmentService.getAllDepartments();

                if (!response?.success) {
                    throw new Error(
                        response?.message ||
                            "Failed to fetch departments."
                    );
                }

                setDepartments(
                    response.data || []
                );

            } catch (error) {
                console.error(
                    "Fetch departments error:",
                    error
                );

                const message =
                    error.response?.data?.message ||
                    error.message ||
                    "Failed to fetch departments.";

                setError(message);

            } finally {
                setDepartmentsLoading(false);
            }
        };

        fetchDepartments();
    }, []);

    // HANDLE INPUT CHANGE

    const handleChange = (e) => {
        const {
            name,
            value,
        } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "code"
                    ? value.toUpperCase()
                    : value,
        }));

        setError("");
        setSuccess("");
    };

    // VALIDATE FORM

    const validateForm = () => {
        if (!formData.name.trim()) {
            return "Please enter a subject name.";
        }

        if (!formData.code.trim()) {
            return "Please enter a subject code.";
        }

        if (!formData.departmentId) {
            return "Please select a department.";
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

    // CREATE SUBJECT

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

            const subjectData = {
                name: formData.name.trim(),

                code: formData.code
                    .trim()
                    .toUpperCase(),

                departmentId:
                    formData.departmentId,

                description:
                    formData.description.trim(),

                status:
                    formData.status,
            };

            // ------------------------------------------------
            // API REQUEST
            // ------------------------------------------------

            const response =
                await subjectService.createSubject(
                    subjectData
                );

            // ------------------------------------------------
            // CHECK RESPONSE
            // ------------------------------------------------

            if (!response?.success) {
                throw new Error(
                    response?.message ||
                        "Failed to create subject."
                );
            }

            // ------------------------------------------------
            // SUCCESS
            // ------------------------------------------------

            setSuccess(
                "Subject created successfully."
            );

            resetForm();

            // Send created subject
            // back to parent component

            onSuccess?.(
                response.data
            );

        } catch (error) {
            console.error(
                "Create subject error:",
                error
            );

            const message =
                error.response?.data?.message ||
                error.message ||
                "Failed to create subject.";

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
                            <path d="M4 5h16" />

                            <path d="M4 12h16" />

                            <path d="M4 19h10" />

                            <circle
                                cx="18"
                                cy="19"
                                r="2"
                            />

                            <circle
                                cx="18"
                                cy="5"
                                r="2"
                            />

                            <circle
                                cx="18"
                                cy="12"
                                r="2"
                            />
                        </svg>

                    </div>

                    {/* Title */}

                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Create Subject
                        </h2>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Create a subject and assign it
                            to a department.
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
                {/* SUBJECT NAME */}
                {/* ================================================= */}

                <div>
                    <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Subject Name
                    </label>

                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={loading}
                        placeholder="e.g. Biology"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-[#1d1d1d] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white/30 dark:focus:ring-white/10"
                    />
                </div>

                {/* ================================================= */}
                {/* SUBJECT CODE */}
                {/* ================================================= */}

                <div>
                    <label
                        htmlFor="code"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Subject Code
                    </label>

                    <input
                        id="code"
                        name="code"
                        type="text"
                        value={formData.code}
                        onChange={handleChange}
                        disabled={loading}
                        placeholder="e.g. BIO"
                        maxLength={20}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm uppercase text-gray-900 outline-none transition placeholder:normal-case placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-[#1d1d1d] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white/30 dark:focus:ring-white/10"
                    />
                </div>

                {/* ================================================= */}
                {/* DEPARTMENT */}
                {/* ================================================= */}

                <div>
                    <label
                        htmlFor="departmentId"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Department
                    </label>

                    <select
                        id="departmentId"
                        name="departmentId"
                        value={
                            formData.departmentId
                        }
                        onChange={handleChange}
                        disabled={
                            loading ||
                            departmentsLoading
                        }
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-[#1d1d1d] dark:text-white dark:focus:border-white/30 dark:focus:ring-white/10"
                    >
                        <option value="">
                            {departmentsLoading
                                ? "Loading departments..."
                                : "Select department"}
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

                    {!departmentsLoading &&
                        departments.length ===
                            0 && (
                            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                No departments found.
                                Create a department
                                first.
                            </p>
                        )}
                </div>

                {/* ================================================= */}
                {/* DESCRIPTION */}
                {/* ================================================= */}

                <div>
                    <label
                        htmlFor="description"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Description
                    </label>

                    <textarea
                        id="description"
                        name="description"
                        rows={4}
                        value={
                            formData.description
                        }
                        onChange={handleChange}
                        disabled={loading}
                        placeholder="Describe this subject..."
                        className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-[#1d1d1d] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white/30 dark:focus:ring-white/10"
                    />
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
                        departmentsLoading ||
                        departments.length === 0
                    }
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >
                    {loading && (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white dark:border-black/30 dark:border-t-black" />
                    )}

                    <span>
                        {loading
                            ? "Creating..."
                            : "Create Subject"}
                    </span>
                </button>

            </form>
        </div>
    );
}