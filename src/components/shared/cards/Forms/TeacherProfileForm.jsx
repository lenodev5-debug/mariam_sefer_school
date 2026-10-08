
import { useEffect, useMemo, useState } from "react";

import teacherService from "../../../../../lib/service/admin/teacherService";
import userService from "../../../../../lib/service/admin/userService";

const ALLOWED_STATUSES = [
    "active",
    "inactive",
    "suspended",
    "resigned",
];

const INITIAL_FORM = {
    userId: "",
    employeeNumber: "",
    specialization: "",
    hireDate: "",
    status: "active",
};

export default function TeacherProfileForm({
    teacher = null,
    onSuccess,
    onCancel,
}) {
    const isEditMode = Boolean(teacher?._id);

    const [formData, setFormData] = useState(INITIAL_FORM);

    const [users, setUsers] = useState([]);
    const [teachers, setTeachers] = useState([]);

    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const [error, setError] = useState("");

    /*
     * Load:
     * 1. Users with role = Teacher
     * 2. Existing TeacherProfiles
     */
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoadingData(true);
                setError("");

                const [usersResponse, teachersResponse] =
                    await Promise.all([
                        userService.getAllUsers(),
                        teacherService.getAllTeachers(),
                    ]);

                const userList =
                    Array.isArray(usersResponse)
                        ? usersResponse
                        : usersResponse?.users ||
                          usersResponse?.data ||
                          [];

                const teacherList =
                    Array.isArray(teachersResponse)
                        ? teachersResponse
                        : teachersResponse?.teachers ||
                          teachersResponse?.data ||
                          [];

                setUsers(userList);
                setTeachers(teacherList);
            } catch (err) {
                console.error(
                    "Failed to load teacher profile data:",
                    err
                );

                setError(
                    err?.response?.data?.message ||
                    "Failed to load teacher data."
                );
            } finally {
                setLoadingData(false);
            }
        };

        loadData();
    }, []);

    /*
     * Populate form when editing an existing teacher profile.
     */
    useEffect(() => {
        if (!teacher) {
            setFormData(INITIAL_FORM);
            return;
        }

        const teacherUserId =
            teacher.userId?._id ||
            teacher.userId?.id ||
            teacher.userId ||
            "";

        setFormData({
            userId: String(teacherUserId),
            employeeNumber: teacher.employeeNumber || "",
            specialization: teacher.specialization || "",
            hireDate: teacher.hireDate
                ? new Date(teacher.hireDate)
                      .toISOString()
                      .split("T")[0]
                : "",
            status: teacher.status || "active",
        });
    }, [teacher]);

    /*
     * Only users whose role is Teacher are eligible.
     *
     * When creating:
     *   Teacher User + no TeacherProfile = selectable
     *
     * When editing:
     *   The current profile's user is also selectable.
     */
    const availableTeachers = useMemo(() => {
        const teacherProfilesByUserId = new Set(
            teachers
                .map((profile) => {
                    const userId =
                        profile.userId?._id ||
                        profile.userId?.id ||
                        profile.userId;

                    return userId ? String(userId) : null;
                })
                .filter(Boolean)
        );

        return users.filter((user) => {
            if (user.role !== "Teacher") {
                return false;
            }

            const userId = String(user._id || user.id || "");

            if (!userId) {
                return false;
            }

            /*
             * In edit mode, keep the currently selected teacher.
             */
            if (
                isEditMode &&
                userId === String(formData.userId)
            ) {
                return true;
            }

            /*
             * Do not allow another TeacherProfile for
             * the same User.
             */
            return !teacherProfilesByUserId.has(userId);
        });
    }, [
        users,
        teachers,
        isEditMode,
        formData.userId,
    ]);

    const selectedUser = useMemo(() => {
        return users.find(
            (user) =>
                String(user._id || user.id) ===
                String(formData.userId)
        );
    }, [users, formData.userId]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        if (error) {
            setError("");
        }
    };

    const validateForm = () => {
        if (!formData.userId) {
            return "Please select a teacher.";
        }

        if (!formData.employeeNumber.trim()) {
            return "Employee number is required.";
        }

        if (!formData.status) {
            return "Please select a status.";
        }

        if (!ALLOWED_STATUSES.includes(formData.status)) {
            return "Invalid teacher status.";
        }

        return "";
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationError = validateForm();

        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            setLoading(true);
            setError("");

            const payload = {
                userId: formData.userId,
                employeeNumber:
                    formData.employeeNumber.trim().toUpperCase(),
                specialization:
                    formData.specialization.trim() || null,
                hireDate: formData.hireDate || undefined,
                status: formData.status,
            };

            let response;

            if (isEditMode) {
                response = await teacherService.updateTeacher(
                    teacher._id,
                    payload
                );
            } else {
                response = await teacherService.createTeacher(
                    payload
                );
            }

            /*
             * Refresh teacher profiles so the next create
             * operation has the latest information.
             */
            try {
                const refreshedTeachers =
                    await teacherService.getAllTeachers();

                const teacherList =
                    Array.isArray(refreshedTeachers)
                        ? refreshedTeachers
                        : refreshedTeachers?.teachers ||
                          refreshedTeachers?.data ||
                          [];

                setTeachers(teacherList);
            } catch (refreshError) {
                console.warn(
                    "Teacher profile refresh failed:",
                    refreshError
                );
            }

            if (onSuccess) {
                onSuccess(response);
            }
        } catch (err) {
            console.error(
                "Teacher profile save error:",
                err
            );

            const message =
                err?.response?.data?.message ||
                "Failed to save teacher profile.";

            setError(message);
        } finally {
            setLoading(false);
        }
    };

    if (loadingData) {
        return (
            <div className="w-full rounded-2xl border border-white/10 bg-[#151515] p-6 text-white">
                <div className="flex items-center gap-3">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                    <span className="text-sm text-white/70">
                        Loading teacher data...
                    </span>
                </div>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full rounded-2xl border border-white/10 bg-[#151515] p-6 text-white shadow-xl"
        >
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold">
                    {isEditMode
                        ? "Edit Teacher Profile"
                        : "Create Teacher Profile"}
                </h2>

                <p className="mt-1 text-sm text-white/50">
                    {isEditMode
                        ? "Update the teacher profile information."
                        : "Create a school profile for an existing Teacher user."}
                </p>
            </div>

            {/* Error */}
            {error && (
                <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Teacher */}
                <div className="md:col-span-2">
                    <label
                        htmlFor="userId"
                        className="mb-2 block text-sm font-medium text-white/80"
                    >
                        Teacher
                    </label>

                    <select
                        id="userId"
                        name="userId"
                        value={formData.userId}
                        onChange={handleChange}
                        disabled={isEditMode || loading}
                        className="w-full rounded-xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-sm text-white outline-none transition focus:border-white/30 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <option value="">
                            Select a teacher
                        </option>

                        {availableTeachers.map((user) => (
                            <option
                                key={user._id || user.id}
                                value={user._id || user.id}
                            >
                                {user.name || user.fullName || user.email}
                                {user.email
                                    ? ` — ${user.email}`
                                    : ""}
                            </option>
                        ))}
                    </select>

                    {availableTeachers.length === 0 && (
                        <p className="mt-2 text-xs text-amber-400">
                            {isEditMode
                                ? "The current teacher profile could not be found."
                                : "All Teacher users already have a teacher profile."}
                        </p>
                    )}

                    {selectedUser && (
                        <div className="mt-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3">
                            <p className="text-xs text-white/40">
                                Selected user
                            </p>

                            <p className="mt-1 text-sm font-medium text-white">
                                {selectedUser.name ||
                                    selectedUser.fullName ||
                                    "Teacher"}
                            </p>

                            {selectedUser.email && (
                                <p className="mt-1 text-xs text-white/50">
                                    {selectedUser.email}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {/* Employee Number */}
                <div>
                    <label
                        htmlFor="employeeNumber"
                        className="mb-2 block text-sm font-medium text-white/80"
                    >
                        Employee Number
                    </label>

                    <input
                        id="employeeNumber"
                        name="employeeNumber"
                        type="text"
                        value={formData.employeeNumber}
                        onChange={handleChange}
                        placeholder="e.g. TCH-0001"
                        disabled={loading}
                        className="w-full rounded-xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition focus:border-white/30 disabled:opacity-60"
                    />
                </div>

                {/* Specialization */}
                <div>
                    <label
                        htmlFor="specialization"
                        className="mb-2 block text-sm font-medium text-white/80"
                    >
                        Specialization
                    </label>

                    <input
                        id="specialization"
                        name="specialization"
                        type="text"
                        value={formData.specialization}
                        onChange={handleChange}
                        placeholder="e.g. Mathematics"
                        disabled={loading}
                        className="w-full rounded-xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition focus:border-white/30 disabled:opacity-60"
                    />
                </div>

                {/* Hire Date */}
                <div>
                    <label
                        htmlFor="hireDate"
                        className="mb-2 block text-sm font-medium text-white/80"
                    >
                        Hire Date
                    </label>

                    <input
                        id="hireDate"
                        name="hireDate"
                        type="date"
                        value={formData.hireDate}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full rounded-xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-sm text-white outline-none transition focus:border-white/30 disabled:opacity-60"
                    />
                </div>

                {/* Status */}
                <div>
                    <label
                        htmlFor="status"
                        className="mb-2 block text-sm font-medium text-white/80"
                    >
                        Status
                    </label>

                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full rounded-xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-sm text-white outline-none transition focus:border-white/30 disabled:opacity-60"
                    >
                        {ALLOWED_STATUSES.map((status) => (
                            <option
                                key={status}
                                value={status}
                            >
                                {status.charAt(0).toUpperCase() +
                                    status.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Actions */}
            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancel
                    </button>
                )}

                <button
                    type="submit"
                    disabled={loading || availableTeachers.length === 0}
                    className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading
                        ? "Saving..."
                        : isEditMode
                        ? "Update Teacher"
                        : "Create Teacher Profile"}
                </button>
            </div>
        </form>
    );
}
