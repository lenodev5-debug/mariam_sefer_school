import {
    faEnvelope,
    faPhone,
    faUser,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import UserMenu from "./userMenu";


const UserRow = ({
    user,
    onClick,

    onEdit,
    onChangeRole,
    onChangeStatus,
    onDelete,

    canEdit = false,
    canChangeRole = false,
    canChangeStatus = false,
    canDelete = false,

    mobile = false,
}) => {

    const userId = user?._id || user?.id;

    const name = user?.name || "Unnamed User";

    const email = user?.email || "No email";

    const phone = user?.phone || "No phone";

    const image = user?.image;

    const role = user?.role || "User";

    const status = user?.status || "inactive";


    const handleRowClick = () => {

        if (!userId) return;

        onClick?.(user);

    };


    if (mobile) {

        return (
            <div
                className="rounded-2xl bg-white p-4 shadow-sm dark:bg-[#171717]"
            >

                <div className="flex items-start gap-3">

                    {/* AVATAR */}

                    <button
                        type="button"
                        onClick={handleRowClick}
                        className="shrink-0"
                    >

                        {image ? (

                            <img
                                src={image}
                                alt={name}
                                className="h-12 w-12 rounded-full object-cover"
                            />

                        ) : (

                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-[#252525]">

                                <FontAwesomeIcon icon={faUser} />

                            </div>

                        )}

                    </button>


                    {/* USER */}

                    <button
                        type="button"
                        onClick={handleRowClick}
                        className="min-w-0 flex-1 text-left"
                    >

                        <p className="truncate font-medium text-gray-900 dark:text-white">
                            {name}
                        </p>

                        <p className="mt-1 flex items-center gap-2 truncate text-xs text-gray-500">

                            <FontAwesomeIcon icon={faEnvelope} />

                            {email}

                        </p>

                        <p className="mt-1 flex items-center gap-2 text-xs text-gray-500">

                            <FontAwesomeIcon icon={faPhone} />

                            {phone}

                        </p>

                    </button>


                    <UserMenu
                        user={user}
                        onEdit={onEdit}
                        onChangeRole={onChangeRole}
                        onChangeStatus={onChangeStatus}
                        onDelete={onDelete}
                        canEdit={canEdit}
                        canChangeRole={canChangeRole}
                        canChangeStatus={canChangeStatus}
                        canDelete={canDelete}
                    />

                </div>


                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 dark:border-gray-800">

                    <RoleBadge role={role} />

                    <StatusBadge status={status} />

                </div>

            </div>
        );
    }


    return (
        <tr className="border-b border-gray-100 last:border-0 dark:border-gray-800">

            {/* USER */}

            <td className="px-5 py-4">

                <button
                    type="button"
                    onClick={handleRowClick}
                    className="flex items-center gap-3 text-left"
                >

                    {image ? (

                        <img
                            src={image}
                            alt={name}
                            className="h-11 w-11 rounded-full object-cover"
                        />

                    ) : (

                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-[#252525]">

                            <FontAwesomeIcon icon={faUser} />

                        </div>

                    )}


                    <div className="min-w-0">

                        <p className="truncate font-medium text-gray-900 dark:text-white">
                            {name}
                        </p>

                        <p className="mt-1 truncate text-xs text-gray-500">
                            {email}
                        </p>

                    </div>

                </button>

            </td>


            {/* ROLE */}

            <td className="px-5 py-4">

                <RoleBadge role={role} />

            </td>


            {/* PHONE */}

            <td className="px-5 py-4">

                <span className="text-sm text-gray-600 dark:text-gray-400">
                    {phone}
                </span>

            </td>


            {/* STATUS */}

            <td className="px-5 py-4">

                <StatusBadge status={status} />

            </td>


            {/* MENU */}

            <td className="px-5 py-4 text-right">

                <UserMenu
                    user={user}
                    onEdit={onEdit}
                    onChangeRole={onChangeRole}
                    onChangeStatus={onChangeStatus}
                    onDelete={onDelete}
                    canEdit={canEdit}
                    canChangeRole={canChangeRole}
                    canChangeStatus={canChangeStatus}
                    canDelete={canDelete}
                />

            </td>

        </tr>
    );
};


// ============================================================
// ROLE BADGE
// ============================================================

const RoleBadge = ({ role }) => {

    return (
        <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-[#252525] dark:text-gray-300">
            {role}
        </span>
    );
};


// ============================================================
// STATUS BADGE
// ============================================================

const StatusBadge = ({ status }) => {

    const label =
        status
            ? status.charAt(0).toUpperCase() +
              status.slice(1)
            : "Unknown";

    return (
        <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-[#252525] dark:text-gray-300">
            {label}
        </span>
    );
};


export default UserRow;