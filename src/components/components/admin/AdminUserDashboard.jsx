
import { useEffect, useMemo, useState } from "react";

import userService from "../../../../lib/service/admin/userService"; 

import UserList from "../../shared/cards/users/user/userlist";
import UserDetail from "../../shared/cards/users/user/userDetail";
import FloatingMenu from "../../shared/ui/FloatingMenu";

export default function AdminUserDashboard() {
    /* ---------- state ---------- */
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedUser, setSelectedUser] = useState(null);
    const [view, setView] = useState("list"); // "list" | "detail"

    const [pagination, setPagination] = useState(null);
    const [page, setPage] = useState(1);

    /* ---------- permissions (hook into your auth later) ---------- */
    const canView = true;
    const canEdit = true;
    const canChangeRole = true;
    const canChangeStatus = true;
    const canDelete = true;

    /* ---------- load users ---------- */
    useEffect(() => {
        let cancelled = false;

        const loadUsers = async () => {
            try {
                setLoading(true);
                setError("");

                const response =
                    await userService.getAllUsers({
                        page,
                    });

                if (cancelled) return;

                if (!response?.success) {
                    throw new Error(
                        response?.message ||
                            "Failed to load users."
                    );
                }

                // response.data might be { users: [], pagination: {} }
                // or just an array — handle both
                const list = Array.isArray(response.data)
                    ? response.data
                    : response.data?.users || [];

                setUsers(list);

                if (response.pagination) {
                    setPagination(response.pagination);
                } else if (response.data?.pagination) {
                    setPagination(response.data.pagination);
                } else {
                    setPagination(null);
                }
            } catch (err) {
                if (cancelled) return;
                console.error("Load users error:", err);
                setError(
                    err.response?.data?.message ||
                        err.message ||
                        "Failed to load users."
                );
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        loadUsers();

        return () => {
            cancelled = true;
        };
    }, [page]);

    /* ---------- handlers ---------- */

    // Open detail view
    const handleUserClick = (user) => {
        setSelectedUser(user);
        setView("detail");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleView = (user) => {
        setSelectedUser(user);
        setView("detail");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleBack = () => {
        setView("list");
        setSelectedUser(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleEdit = (user) => {
        // TODO: open edit modal
        console.log("Edit user:", user);
    };

    const handleChangeRole = (user) => {
        // TODO: open change-role modal
        console.log("Change role:", user);
    };

    const handleChangeStatus = async (payload) => {
        // payload can be { user, status } from UserDetail
        // or just a user from UserMenu
        const user = payload?.user || payload;
        const status =
            payload?.status ||
            (user?.status === "active"
                ? "inactive"
                : "active");

        if (!user?._id && !user?.id) return;

        try {
            const id = user._id || user.id;

            const response =
                await userService.changeUserStatus?.(id, {
                    status,
                }) ||
                (await userService.updateUser?.(id, { status }));

            // Optimistic local update
            setUsers((prev) =>
                prev.map((u) =>
                    (u._id || u.id) === id
                        ? { ...u, status }
                        : u
                )
            );

            // Update selected user if open
            setSelectedUser((prev) =>
                prev && (prev._id || prev.id) === id
                    ? { ...prev, status }
                    : prev
            );
        } catch (err) {
            console.error("Change status error:", err);
            alert(
                err.response?.data?.message ||
                    err.message ||
                    "Failed to change status."
            );
        }
    };

    const handleDelete = async (user) => {
        if (!user?._id && !user?.id) return;

        const confirmed = window.confirm(
            `Delete ${user.name || "this user"}?`
        );
        if (!confirmed) return;

        try {
            const id = user._id || user.id;
            await userService.deleteUser?.(id);

            setUsers((prev) =>
                prev.filter((u) => (u._id || u.id) !== id)
            );

            if (
                selectedUser &&
                (selectedUser._id || selectedUser.id) === id
            ) {
                handleBack();
            }
        } catch (err) {
            console.error("Delete user error:", err);
            alert(
                err.response?.data?.message ||
                    err.message ||
                    "Failed to delete user."
            );
        }
    };

    const handlePageChange = (nextPage) => {
        setPage(nextPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (view === "detail" && selectedUser) {
        return (
            <div className="min-h-screen w-full p-3 sm:p-5">
                <div className="mx-auto w-full max-w-350">
                    <UserDetail
                        user={selectedUser}
                        onBack={handleBack}
                        onEdit={handleEdit}
                        onChangeRole={handleChangeRole}
                        onChangeStatus={handleChangeStatus}
                        canEdit={canEdit}
                        canChangeRole={canChangeRole}
                        canChangeStatus={canChangeStatus}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full p-3 sm:p-5">
            <div className="mx-auto w-full max-w-350 space-y-5 mt-15">
                {error && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                        {error}
                    </div>
                )}

                <UserList
                    users={users}
                    loading={loading}
                    onUserClick={handleUserClick}
                    onView={handleView}
                    onEdit={handleEdit}
                    onChangeRole={handleChangeRole}
                    onChangeStatus={handleChangeStatus}
                    onDelete={handleDelete}
                    canView={canView}
                    canEdit={canEdit}
                    canChangeRole={canChangeRole}
                    canChangeStatus={canChangeStatus}
                    canDelete={canDelete}
                    pagination={pagination}
                    onPageChange={handlePageChange}
                />
            </div>
            <FloatingMenu />
        </div>
    );
}