import { useEffect, useState } from "react";
import userService from "../../../../../lib/service/admin/userService";

export default function UserForm({
    user = null,
    onSuccess,
    onCancel,
}) {
    const isEditMode = Boolean(user);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "Student",
        image: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                password: "",
                phone: user.phone || "",
                role: user.role || "Student",
                image: user.image || "",
            });
        } else {
            setFormData({
                name: "",
                email: "",
                password: "",
                phone: "",
                role: "Student",
                image: "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            if (isEditMode) {
                const updateData = {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    image: formData.image || null,
                };

                const response = await userService.updateUser(
                    user._id,
                    updateData
                );

                onSuccess?.(response);
            } else {
                const createData = {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    phone: formData.phone,
                    role: formData.role,
                    image: formData.image || null,
                };

                const response = await userService.createUser(
                    createData
                );

                onSuccess?.(response);
            }
        } catch (error) {
            console.error("User form error:", error);

            setError(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="no-scrollbar max-h-full space-y-5 overflow-y-auto"
        >
            {/* Error */}
            {error && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {error}
                </div>
            )}

            {/* Name */}
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                    Full Name
                </label>

                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    required
                    className="w-full rounded-lg border border-gray-700 bg-[#171717] px-4 py-3 text-white outline-none transition focus:border-gray-500"
                />
            </div>

            {/* Email */}
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                    Email
                </label>

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    required
                    className="w-full rounded-lg border border-gray-700 bg-[#171717] px-4 py-3 text-white outline-none transition focus:border-gray-500"
                />
            </div>

            {/* Password */}
            {!isEditMode && (
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                        Password
                    </label>

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        required
                        className="w-full rounded-lg border border-gray-700 bg-[#171717] px-4 py-3 text-white outline-none transition focus:border-gray-500"
                    />
                </div>
            )}

            {/* Phone */}
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                    Phone
                </label>

                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    required
                    className="w-full rounded-lg border border-gray-700 bg-[#171717] px-4 py-3 text-white outline-none transition focus:border-gray-500"
                />
            </div>

            {/* Role */}
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                    Role
                </label>

                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    disabled={isEditMode}
                    className="w-full rounded-lg border border-gray-700 bg-[#171717] px-4 py-3 text-white outline-none transition focus:border-gray-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <option value="User">User</option>
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Parent">Parent</option>
                    <option value="Admin">Admin</option>
                </select>

                {isEditMode && (
                    <p className="mt-1 text-xs text-gray-500">
                        Use the change-role action to change the user's role.
                    </p>
                )}
            </div>

            {/* Image */}
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                    Image URL
                </label>

                <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="Enter image URL"
                    className="w-full rounded-lg border border-gray-700 bg-[#171717] px-4 py-3 text-white outline-none transition focus:border-gray-500"
                />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-3">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="rounded-lg border border-gray-700 px-5 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-gray-800 disabled:opacity-50"
                    >
                        Cancel
                    </button>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading
                        ? "Saving..."
                        : isEditMode
                            ? "Update User"
                            : "Create User"}
                </button>
            </div>
        </form>
    );
}