import {
    useMemo,
    useState,
} from "react";

import {
    faMagnifyingGlass,
    faFilter,
    faUsers,
    faUserCheck,
    faUserClock,
    faUserSlash,
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import UserRow from "./userRow";


const UserList = ({
    users = [],

    loading = false,

    onUserClick,
    onView,
    onEdit,
    onChangeRole,
    onChangeStatus,
    onDelete,

    canView = true,
    canEdit = false,
    canChangeRole = false,
    canChangeStatus = false,
    canDelete = false,

    pagination = null,
    onPageChange,
}) => {

    const [search, setSearch] = useState("");

    const [roleFilter, setRoleFilter] =
        useState("all");

    const [statusFilter, setStatusFilter] =
        useState("all");


    // ============================================================
    // FILTER USERS
    // ============================================================

    const filteredUsers = useMemo(() => {

        const searchValue = search
            .trim()
            .toLowerCase();


        return users.filter((user) => {

            const matchesSearch =
                !searchValue ||
                user.name
                    ?.toLowerCase()
                    .includes(searchValue) ||
                user.email
                    ?.toLowerCase()
                    .includes(searchValue) ||
                user.phone
                    ?.toLowerCase()
                    .includes(searchValue);


            const matchesRole =
                roleFilter === "all" ||
                user.role === roleFilter;


            const matchesStatus =
                statusFilter === "all" ||
                user.status === statusFilter;


            return (
                matchesSearch &&
                matchesRole &&
                matchesStatus
            );

        });

    }, [
        users,
        search,
        roleFilter,
        statusFilter,
    ]);


    // ============================================================
    // STATISTICS
    // ============================================================

    const totalUsers = users.length;


    const activeUsers = users.filter(
        (user) =>
            user.status === "active"
    ).length;


    const inactiveUsers = users.filter(
        (user) =>
            user.status === "inactive"
    ).length;


    const suspendedUsers = users.filter(
        (user) =>
            user.status === "suspended"
    ).length;


    // ============================================================
    // LOADING
    // ============================================================

    if (loading) {

        return (
            <div className="w-full rounded-2xl bg-white p-8 shadow-sm dark:bg-[#171717]">

                <div className="flex items-center justify-center py-16">

                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900 dark:border-gray-700 dark:border-t-white" />

                </div>

            </div>
        );
    }


    return (
        <div className="w-full space-y-5">


            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Users
                    </h2>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Manage all users in the school system.
                    </p>

                </div>


                {/* SEARCH */}

                <div className="relative w-full lg:w-80">

                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(event) =>
                            setSearch(
                                event.target.value
                            )
                        }
                        placeholder="Search users..."
                        className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-gray-400 dark:border-gray-700 dark:bg-[#111111] dark:text-white dark:focus:border-gray-500"
                    />

                </div>

            </div>


            {/* ==================================================
                STATISTICS
            ================================================== */}

            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">

                <StatCard
                    icon={faUsers}
                    label="Total Users"
                    value={totalUsers}
                />

                <StatCard
                    icon={faUserCheck}
                    label="Active"
                    value={activeUsers}
                />

                <StatCard
                    icon={faUserClock}
                    label="Inactive"
                    value={inactiveUsers}
                />

                <StatCard
                    icon={faUserSlash}
                    label="Suspended"
                    value={suspendedUsers}
                />

            </div>


            {/* ==================================================
                FILTERS
            ================================================== */}

            <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm dark:bg-[#171717] sm:flex-row">

                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">

                    <FontAwesomeIcon
                        icon={faFilter}
                    />

                    <span>
                        Filters
                    </span>

                </div>


                {/* ROLE */}

                <select
                    value={roleFilter}
                    onChange={(event) =>
                        setRoleFilter(
                            event.target.value
                        )
                    }
                    className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none dark:border-gray-700 dark:bg-[#111111] dark:text-white"
                >

                    <option value="all">
                        All Roles
                    </option>

                    <option value="Student">
                        Student
                    </option>

                    <option value="Teacher">
                        Teacher
                    </option>

                    <option value="Parent">
                        Parent
                    </option>

                    <option value="Admin">
                        Admin
                    </option>

                    <option value="User">
                        User
                    </option>

                </select>


                {/* STATUS */}

                <select
                    value={statusFilter}
                    onChange={(event) =>
                        setStatusFilter(
                            event.target.value
                        )
                    }
                    className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none dark:border-gray-700 dark:bg-[#111111] dark:text-white"
                >

                    <option value="all">
                        All Statuses
                    </option>

                    <option value="active">
                        Active
                    </option>

                    <option value="inactive">
                        Inactive
                    </option>

                    <option value="suspended">
                        Suspended
                    </option>

                </select>

            </div>


            {/* ==================================================
                DESKTOP TABLE
            ================================================== */}

            <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-[#171717] md:block">

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead>

                            <tr className="border-b border-gray-100 text-left dark:border-gray-800">

                                <th className="px-5 py-4 text-xs font-medium uppercase text-gray-500">
                                    User
                                </th>

                                <th className="px-5 py-4 text-xs font-medium uppercase text-gray-500">
                                    Role
                                </th>

                                <th className="px-5 py-4 text-xs font-medium uppercase text-gray-500">
                                    Phone
                                </th>

                                <th className="px-5 py-4 text-xs font-medium uppercase text-gray-500">
                                    Status
                                </th>

                                <th className="px-5 py-4 text-right text-xs font-medium uppercase text-gray-500">
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {filteredUsers.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="px-5 py-16 text-center text-sm text-gray-500"
                                    >
                                        No users found.
                                    </td>

                                </tr>

                            ) : (

                                filteredUsers.map((user) => (

                                    <UserRow
                                        key={
                                            user._id ||
                                            user.id
                                        }
                                        user={user}
                                        onClick={
                                            onUserClick
                                        }
                                        onView={
                                            onView
                                        }
                                        onEdit={
                                            onEdit
                                        }
                                        onChangeRole={
                                            onChangeRole
                                        }
                                        onChangeStatus={
                                            onChangeStatus
                                        }
                                        onDelete={
                                            onDelete
                                        }
                                        canView={
                                            canView
                                        }
                                        canEdit={
                                            canEdit
                                        }
                                        canChangeRole={
                                            canChangeRole
                                        }
                                        canChangeStatus={
                                            canChangeStatus
                                        }
                                        canDelete={
                                            canDelete
                                        }
                                    />

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>


            {/* ==================================================
                MOBILE
            ================================================== */}

            <div className="space-y-3 md:hidden">

                {filteredUsers.length === 0 ? (

                    <div className="rounded-2xl bg-white p-10 text-center text-sm text-gray-500 dark:bg-[#171717]">
                        No users found.
                    </div>

                ) : (

                    filteredUsers.map((user) => (

                        <UserRow
                            key={
                                user._id ||
                                user.id
                            }
                            user={user}
                            mobile
                            onClick={
                                onUserClick
                            }
                            onView={
                                onView
                            }
                            onEdit={
                                onEdit
                            }
                            onChangeRole={
                                onChangeRole
                            }
                            onChangeStatus={
                                onChangeStatus
                            }
                            onDelete={
                                onDelete
                            }
                            canView={
                                canView
                            }
                            canEdit={
                                canEdit
                            }
                            canChangeRole={
                                canChangeRole
                            }
                            canChangeStatus={
                                canChangeStatus
                            }
                            canDelete={
                                canDelete
                            }
                        />

                    ))

                )}

            </div>


            {/* ==================================================
                PAGINATION
            ================================================== */}

            {pagination &&
                pagination.totalPages > 1 && (

                    <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm dark:bg-[#171717]">

                        <p className="text-sm text-gray-500 dark:text-gray-400">

                            Page {pagination.page} of{" "}
                            {pagination.totalPages}

                        </p>


                        <div className="flex gap-2">

                            <button
                                type="button"
                                disabled={
                                    pagination.page <= 1
                                }
                                onClick={() =>
                                    onPageChange?.(
                                        pagination.page - 1
                                    )
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700"
                            >

                                <FontAwesomeIcon
                                    icon={
                                        faChevronLeft
                                    }
                                />

                            </button>


                            <button
                                type="button"
                                disabled={
                                    pagination.page >=
                                    pagination.totalPages
                                }
                                onClick={() =>
                                    onPageChange?.(
                                        pagination.page + 1
                                    )
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700"
                            >

                                <FontAwesomeIcon
                                    icon={
                                        faChevronRight
                                    }
                                />

                            </button>

                        </div>

                    </div>

                )}

        </div>
    );
};


// ============================================================
// STAT CARD
// ============================================================

const StatCard = ({
    icon,
    label,
    value,
}) => {

    return (
        <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-[#171717]">

            <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-700 dark:bg-[#222222] dark:text-gray-300">

                    <FontAwesomeIcon
                        icon={icon}
                    />

                </div>

                <div>

                    <p className="text-xs text-gray-500">
                        {label}
                    </p>

                    <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                        {value}
                    </p>

                </div>

            </div>

        </div>
    );
};


export default UserList;