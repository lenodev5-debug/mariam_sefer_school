import { useCallback, useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faRotateLeft,
  faUser,
  faUserPlus,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import FloatingMenu from "../../shared/ui/FloatingMenu";
import userService from "../../../../lib/service/admin/userService"; 
import UserRow from "../../shared/cards/users/user/userRow";
import UserDetail from "../../shared/cards/users/user/userDetail";

/* ============================================================
 * Theme tokens (match other librarian pages)
 * ============================================================ */
const THEME = {
  teal: "#55b6b6",
  tealHover: "#43a6a6",
  tealSoft: "#eefafa",
  tealText: "#0f2424",
};

/* ============================================================
 * Helpers
 * ============================================================ */
const safeArray = (value) => {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value?.users)) return value.users;
  return [];
};

/* ============================================================
 * Stat Card
 * ============================================================ */
const StatCard = ({ title, value, subtitle, icon, iconClass, valueClass }) => (
  <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-[#1B1A1A]">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p
          className={`mt-2 text-3xl font-semibold ${
            valueClass || "text-gray-800 dark:text-gray-100"
          }`}
        >
          {value}
        </p>
        {subtitle && (
          <p className="mt-1 text-xs text-gray-400">{subtitle}</p>
        )}
      </div>
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
      >
        <FontAwesomeIcon icon={icon} />
      </div>
    </div>
  </div>
);

/* ============================================================
 * Main
 * ============================================================ */
export default function LibrarianMembers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedUser, setSelectedUser] = useState(null);

  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    limit: 20,
    pages: 1,
  });

  const [workingId, setWorkingId] = useState(null);

  /* ---------- Load ONLY librarians ---------- */
  const loadLibrarians = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      // Fetch only users whose role is "librarian".
      // The backend can also filter server-side if it supports `role`.
      const response = await userService.getAllUsers({
        role: "librarian",
        page,
        limit: 20,
        sort: "-createdAt",
      });

      // Some APIs ignore unknown params; enforce role filter client-side too.
      const list = safeArray(response).filter(
        (u) => String(u?.role || "").toLowerCase() === "librarian"
      );

      setUsers(list);

      if (response?.meta) {
        setMeta(response.meta);
      } else {
        setMeta({
          total: list.length,
          page,
          limit: 20,
          pages: 1,
        });
      }
    } catch (err) {
      console.error("Failed to load librarians:", err);
      setError(
        err?.response?.data?.message || "Failed to load librarians."
      );
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    loadLibrarians();
  }, [loadLibrarians]);

  /* ---------- Derived ---------- */
  const filteredUsers = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    let list = users;

    if (statusFilter !== "all") {
      list = list.filter(
        (u) => String(u?.status || "").toLowerCase() === statusFilter
      );
    }

    if (!keyword) return list;

    return list.filter((u) => {
      const name = (u?.name || "").toLowerCase();
      const email = (u?.email || "").toLowerCase();
      const phone = (u?.phone || "").toLowerCase();
      return (
        name.includes(keyword) ||
        email.includes(keyword) ||
        phone.includes(keyword)
      );
    });
  }, [users, search, statusFilter]);

  const statistics = useMemo(() => {
    const total = users.length;
    const active = users.filter(
      (u) => String(u?.status).toLowerCase() === "active"
    ).length;
    const inactive = users.filter(
      (u) => String(u?.status).toLowerCase() === "inactive"
    ).length;
    const suspended = users.filter(
      (u) => String(u?.status).toLowerCase() === "suspended"
    ).length;

    return { total, active, inactive, suspended };
  }, [users]);

  /* ---------- Actions ---------- */
  const handleView = (user) => setSelectedUser(user);

  const handleBack = () => {
    setSelectedUser(null);
    loadLibrarians();
  };

  const handleEdit = async (user) => {
    // Hook this into your edit modal / page.
    // Example: openEditModal(user)
    console.log("Edit user:", user);
  };

  const handleChangeRole = async (user) => {
    // Typically you'd open a role picker. Example placeholder:
    console.log("Change role for:", user);
  };

  const handleChangeStatus = async (payload) => {
    try {
      const user = payload?.user || payload;
      const nextStatus = payload?.status;
      const id = user?._id || user?.id;
      if (!id || !nextStatus) return;

      setWorkingId(id);
      await userService.changeUserStatus(id, { status: nextStatus });
      await loadLibrarians();

      if (selectedUser && (selectedUser._id || selectedUser.id) === id) {
        setSelectedUser({ ...selectedUser, status: nextStatus });
      }
    } catch (err) {
      console.error("Failed to change status:", err);
      setError(
        err?.response?.data?.message || "Failed to change user status."
      );
    } finally {
      setWorkingId(null);
    }
  };

  const handleDelete = async (user) => {
    const id = user?._id || user?.id;
    if (!id) return;

    const confirmed = window.confirm(
      `Delete ${user?.name || "this user"}? This cannot be undone.`
    );
    if (!confirmed) return;

    try {
      setWorkingId(id);
      await userService.deleteUser(id);
      await loadLibrarians();
    } catch (err) {
      console.error("Failed to delete user:", err);
      setError(err?.response?.data?.message || "Failed to delete user.");
    } finally {
      setWorkingId(null);
    }
  };

  /* ============================================================
   * RENDER
   * ============================================================ */
  return (
    <div className="min-h-screen w-full overflow-hidden bg-[#f7f6f5] px-5 pb-10 pt-24 md:px-7 md:pt-28 dark:bg-[#0E0E0E]">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(60%_50%_at_15%_0%,#e8f5f5_0%,transparent_60%),radial-gradient(50%_45%_at_100%_10%,#fdeee4_0%,transparent_60%)] dark:bg-[radial-gradient(60%_50%_at_15%_0%,#0f2424_0%,transparent_60%),radial-gradient(50%_45%_at_100%_10%,#2a1710_0%,transparent_60%)]"
      />

      <div className="relative w-full">
        {/* ============================================================
         * DETAIL VIEW
         * ============================================================ */}
        {selectedUser ? (
          <UserDetail
            user={selectedUser}
            onBack={handleBack}
            onEdit={handleEdit}
            onChangeRole={handleChangeRole}
            onChangeStatus={handleChangeStatus}
            canEdit
            canChangeRole
            canChangeStatus
          />
        ) : (
          <>
            {/* Header */}
            <div className="mb-6">
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                    Librarians
                  </h1>
                  <p className="mt-1 text-sm text-gray-500">
                    Manage librarian accounts, roles, and status.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={loadLibrarians}
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-[#1B1A1A] dark:text-gray-200"
                  >
                    <FontAwesomeIcon
                      icon={faRotateLeft}
                      className={loading ? "animate-spin" : ""}
                    />
                    Refresh
                  </button>

                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#55b6b6] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#43a6a6]"
                  >
                    <FontAwesomeIcon icon={faUserPlus} />
                    Add Librarian
                  </button>
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-400">
                {error}
              </div>
            )}

            {/* Statistics */}
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                title="Total Librarians"
                value={statistics.total}
                subtitle="All librarian accounts"
                icon={faUser}
                iconClass="bg-[#eefafa] text-[#0f2424] dark:bg-[#0f2424] dark:text-[#7adcdc]"
              />
              <StatCard
                title="Active"
                value={statistics.active}
                subtitle="Currently active"
                icon={faUser}
                iconClass="bg-emerald-500/10 text-emerald-500"
                valueClass="text-emerald-500"
              />
              <StatCard
                title="Inactive"
                value={statistics.inactive}
                subtitle="Not currently active"
                icon={faUser}
                iconClass="bg-gray-500/10 text-gray-500"
                valueClass="text-gray-500"
              />
              <StatCard
                title="Suspended"
                value={statistics.suspended}
                subtitle="Temporarily suspended"
                icon={faUser}
                iconClass="bg-red-500/10 text-red-500"
                valueClass="text-red-500"
              />
            </div>

            {/* Main panel */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-[#1B1A1A]">
              {/* Toolbar */}
              <div className="border-b border-gray-100 p-4 dark:border-gray-800">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  {/* Search */}
                  <div className="relative w-full lg:max-w-md">
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search librarian by name, email, or phone..."
                      className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-[#55b6b6] dark:border-gray-700 dark:bg-[#101010] dark:text-gray-100"
                    />
                  </div>

                  {/* Status filters */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: "all", label: "All" },
                      { value: "active", label: "Active" },
                      { value: "inactive", label: "Inactive" },
                      { value: "suspended", label: "Suspended" },
                    ].map((item) => {
                      const active = statusFilter === item.value;
                      return (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => setStatusFilter(item.value)}
                          className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                            active
                              ? "bg-[#55b6b6] text-white"
                              : "bg-[#eefafa] text-[#0f2424] hover:bg-[#d8f0f0] dark:bg-[#0f2424] dark:text-[#7adcdc] dark:hover:bg-[#143232]"
                          }`}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Loading / Empty / Content */}
              {loading ? (
                <div className="flex min-h-[350px] items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-[#55b6b6] dark:border-gray-800" />
                    <p className="text-sm text-gray-500">
                      Loading librarians...
                    </p>
                  </div>
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="flex min-h-[350px] items-center justify-center px-6">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eefafa] text-[#55b6b6] dark:bg-[#0f2424]">
                      <FontAwesomeIcon icon={faUser} className="text-xl" />
                    </div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-100">
                      No librarians found
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      No librarian accounts match the current filter.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Desktop table */}
                  <div className="hidden overflow-x-auto lg:block">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-100 text-left dark:border-gray-800">
                          <th className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-500">
                            User
                          </th>
                          <th className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-500">
                            Role
                          </th>
                          <th className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-500">
                            Phone
                          </th>
                          <th className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-500">
                            Status
                          </th>
                          <th className="px-5 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user) => (
                          <UserRow
                            key={user._id || user.id}
                            user={user}
                            onClick={handleView}
                            onView={handleView}
                            onEdit={handleEdit}
                            onChangeRole={handleChangeRole}
                            onChangeStatus={handleChangeStatus}
                            onDelete={handleDelete}
                            canView
                            canEdit
                            canChangeRole
                            canChangeStatus
                            canDelete
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile cards */}
                  <div className="space-y-3 p-4 lg:hidden">
                    {filteredUsers.map((user) => (
                      <UserRow
                        key={user._id || user.id}
                        user={user}
                        mobile
                        onClick={handleView}
                        onView={handleView}
                        onEdit={handleEdit}
                        onChangeRole={handleChangeRole}
                        onChangeStatus={handleChangeStatus}
                        onDelete={handleDelete}
                        canView
                        canEdit
                        canChangeRole
                        canChangeStatus
                        canDelete
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="flex flex-col gap-3 border-t border-gray-100 px-4 py-4 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-gray-500">
                      Page {meta.page || page} of {meta.pages || 1}
                      {" · "}
                      {meta.total || filteredUsers.length} librarians
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={page <= 1 || loading}
                        onClick={() =>
                          setPage((current) => Math.max(1, current - 1))
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition hover:text-[#55b6b6] disabled:cursor-not-allowed disabled:opacity-30 dark:border-gray-700 dark:bg-[#101010]"
                      >
                        <FontAwesomeIcon icon={faChevronLeft} />
                      </button>

                      <span className="px-2 text-sm text-gray-500">
                        {page}
                      </span>

                      <button
                        type="button"
                        disabled={page >= (meta.pages || 1) || loading}
                        onClick={() =>
                          setPage((current) => current + 1)
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition hover:text-[#55b6b6] disabled:cursor-not-allowed disabled:opacity-30 dark:border-gray-700 dark:bg-[##101010]"
                      >
                        <FontAwesomeIcon icon={faChevronRight} />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>

      <FloatingMenu />
    </div>
  );
}