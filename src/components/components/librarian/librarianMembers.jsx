import { useCallback, useMemo, useState } from "react";
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
import {
  ProfileList,
  UserProfileCard
} from '../../components/profile'
import { useProfiles } from "../../../hooks/useProfiles";

/* ============================================================
 * Theme tokens
 * ============================================================ */
const THEME = {
  teal: "#55b6b6",
  tealHover: "#43a6a6",
  tealSoft: "#eefafa",
  tealText: "#0f2424",
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
  /* ---------- state ---------- */
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [page, setPage] = useState(1);

  /* ---------- fetch librarians via the shared hook ---------- */
  const params = useMemo(
    () => ({
      role: "librarian",
      page,
      limit: 20,
      sort: "-createdAt",
    }),
    [page]
  );

  const { profiles, loading, error, refetch, setProfiles } = useProfiles({
    role: "Librarian", // -> /api/librarian
    params,
  });

  /* ---------- derived: filter + search ---------- */
  const filteredProfiles = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    let list = profiles;

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
  }, [profiles, search, statusFilter]);

  /* ---------- derived: stats ---------- */
  const statistics = useMemo(() => {
    const total = profiles.length;
    const active = profiles.filter(
      (u) => String(u?.status).toLowerCase() === "active"
    ).length;
    const inactive = profiles.filter(
      (u) => String(u?.status).toLowerCase() === "inactive"
    ).length;
    const suspended = profiles.filter(
      (u) => String(u?.status).toLowerCase() === "suspended"
    ).length;

    return { total, active, inactive, suspended };
  }, [profiles]);

  /* ---------- pagination meta ---------- */
  const pagination = useMemo(
    () => ({
      page,
      pages: Math.max(1, Math.ceil(profiles.length / 20) || 1),
      total: profiles.length,
    }),
    [profiles.length, page]
  );

  /* ---------- handlers ---------- */
  const handleView = useCallback((profile) => {
    setSelectedProfile(profile);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleBack = useCallback(() => {
    setSelectedProfile(null);
    refetch();
  }, [refetch]);

  const handleEdit = useCallback((profile) => {
    console.log("Edit librarian:", profile);
    // TODO: open edit modal
  }, []);

  const handleDeleted = useCallback(
    (id) => {
      setProfiles((prev) =>
        prev.filter((p) => (p._id || p.id) !== id)
      );
      if (
        selectedProfile &&
        (selectedProfile._id || selectedProfile.id) === id
      ) {
        handleBack();
      }
    },
    [selectedProfile, handleBack, setProfiles]
  );

  const handleStatusChanged = useCallback(
    (id, status) => {
      setProfiles((prev) =>
        prev.map((p) =>
          (p._id || p.id) === id ? { ...p, status } : p
        )
      );
      setSelectedProfile((prev) =>
        prev && (prev._id || prev.id) === id
          ? { ...prev, status }
          : prev
      );
    },
    [setProfiles]
  );

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
        {selectedProfile ? (
          <div className="space-y-4">
            <button
              onClick={handleBack}
              className="text-sm text-[#55b6b6] hover:underline"
            >
              ← Back to librarians
            </button>

            <UserProfileCard
              profile={selectedProfile}
              variant="card"
              onEdit={handleEdit}
              onDeleted={handleDeleted}
              onStatusChanged={handleStatusChanged}
            />
          </div>
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
                    onClick={() => refetch()}
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

              {/* List (loading / empty / data all handled inside) */}
              <div className="p-4">
                <ProfileList
                  role="Librarian"
                  params={params}
                  variant="card"
                  onEdit={handleEdit}
                  onView={handleView}
                  onDeleted={handleDeleted}
                  onStatusChanged={handleStatusChanged}
                  profilesOverride={filteredProfiles}
                  loadingOverride={loading}
                />
              </div>

              {/* Pagination */}
              {!loading && filteredProfiles.length > 0 && (
                <div className="flex flex-col gap-3 border-t border-gray-100 px-4 py-4 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-gray-500">
                    Page {pagination.page} of {pagination.pages}
                    {" · "}
                    {pagination.total} librarians
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
                      disabled={page >= pagination.pages || loading}
                      onClick={() => setPage((current) => current + 1)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition hover:text-[#55b6b6] disabled:cursor-not-allowed disabled:opacity-30 dark:border-gray-700 dark:bg-[#101010]"
                    >
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <FloatingMenu />
    </div>
  );
}