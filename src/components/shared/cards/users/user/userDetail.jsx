import {
    faArrowLeft,
    faUser,
    faEnvelope,
    faPhone,
    faCalendar,
    faShieldHalved,
    faCircleCheck,
    faCircleXmark,
    faClock,
    faIdCard,
    faUserTag,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const UserDetail = ({
    user,

    onBack,
    onEdit,
    onChangeRole,
    onChangeStatus,

    canEdit = false,
    canChangeRole = false,
    canChangeStatus = false,
}) => {

    if (!user) {

        return (
            <div className="rounded-2xl bg-white p-10 text-center dark:bg-[#171717]">

                <p className="text-sm text-gray-500">
                    User not found.
                </p>

            </div>
        );

    }


    const userId =
        user._id ||
        user.id ||
        "N/A";

    const name =
        user.name ||
        "Unnamed User";

    const email =
        user.email ||
        "No email";

    const phone =
        user.phone ||
        "No phone";

    const image =
        user.image;

    const role =
        user.role ||
        "User";

    const status =
        user.status ||
        "inactive";

    const createdAt =
        user.createdAt;

    const updatedAt =
        user.updatedAt;


    return (
        <div className="w-full space-y-5">


            {/* ==================================================
                TOP BAR
            ================================================== */}

            <div className="flex flex-wrap items-center justify-between gap-3">

                <button
                    type="button"
                    onClick={onBack}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#222222]"
                >

                    <FontAwesomeIcon
                        icon={faArrowLeft}
                    />

                    Back to users

                </button>


                <div className="flex gap-2">

                    {canEdit && (

                        <button
                            type="button"
                            onClick={() =>
                                onEdit?.(user)
                            }
                            className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                        >
                            Edit User
                        </button>

                    )}

                </div>

            </div>


            {/* ==================================================
                PROFILE HEADER
            ================================================== */}

            <div className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-[#171717]">

                <div className="p-6 sm:p-8">

                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

                        {/* IMAGE */}

                        {image ? (

                            <img
                                src={image}
                                alt={name}
                                className="h-24 w-24 rounded-2xl object-cover"
                            />

                        ) : (

                            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-3xl text-gray-500 dark:bg-[#252525]">

                                <FontAwesomeIcon
                                    icon={faUser}
                                />

                            </div>

                        )}


                        {/* NAME */}

                        <div className="min-w-0 flex-1">

                            <div className="flex flex-wrap items-center gap-3">

                                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {name}
                                </h1>

                                <StatusBadge
                                    status={status}
                                />

                            </div>


                            <p className="mt-2 text-sm text-gray-500">
                                {email}
                            </p>


                            <div className="mt-3 flex flex-wrap gap-2">

                                <RoleBadge
                                    role={role}
                                />

                                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-[#252525] dark:text-gray-400">

                                    ID: {userId}

                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* ==================================================
                QUICK INFORMATION
            ================================================== */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                <StatCard
                    icon={faUserTag}
                    label="Role"
                    value={role}
                />

                <StatCard
                    icon={faShieldHalved}
                    label="Account Status"
                    value={capitalize(status)}
                />

                <StatCard
                    icon={faCalendar}
                    label="Created"
                    value={formatShortDate(createdAt)}
                />

                <StatCard
                    icon={faClock}
                    label="Last Updated"
                    value={formatShortDate(updatedAt)}
                />

            </div>


            {/* ==================================================
                PERSONAL INFORMATION
            ================================================== */}

            <section className="rounded-2xl bg-white p-6 shadow-sm dark:bg-[#171717]">

                <SectionTitle
                    icon={faUser}
                    title="Personal Information"
                />

                <div className="mt-5 grid gap-5 sm:grid-cols-2">

                    <InfoLine
                        label="Full Name"
                        value={name}
                        icon={faUser}
                    />

                    <InfoLine
                        label="Email"
                        value={email}
                        icon={faEnvelope}
                    />

                    <InfoLine
                        label="Phone"
                        value={phone}
                        icon={faPhone}
                    />

                    <InfoLine
                        label="User ID"
                        value={userId}
                        icon={faIdCard}
                    />

                </div>

            </section>


            {/* ==================================================
                ACCOUNT INFORMATION
            ================================================== */}

            <section className="rounded-2xl bg-white p-6 shadow-sm dark:bg-[#171717]">

                <SectionTitle
                    icon={faShieldHalved}
                    title="Account Information"
                />

                <div className="mt-5 grid gap-5 sm:grid-cols-2">

                    <InfoLine
                        label="Role"
                        value={role}
                        icon={faUserTag}
                    />

                    <InfoLine
                        label="Status"
                        value={capitalize(status)}
                        icon={faShieldHalved}
                    />

                    <InfoLine
                        label="Created At"
                        value={formatDate(createdAt)}
                        icon={faCalendar}
                    />

                    <InfoLine
                        label="Updated At"
                        value={formatDate(updatedAt)}
                        icon={faClock}
                    />

                </div>

            </section>


            {/* ==================================================
                STATUS
            ================================================== */}

            <section className="rounded-2xl bg-white p-6 shadow-sm dark:bg-[#171717]">

                <SectionTitle
                    icon={faShieldHalved}
                    title="Account Status"
                />


                <div className="mt-5">

                    <StatusItem
                        status={status}
                    />

                </div>


                {canChangeStatus && (

                    <div className="mt-5 flex flex-wrap gap-2">

                        {status !== "active" && (

                            <button
                                type="button"
                                onClick={() =>
                                    onChangeStatus?.({
                                        user,
                                        status: "active",
                                    })
                                }
                                className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium dark:border-gray-700"
                            >
                                Activate
                            </button>

                        )}


                        {status !== "inactive" && (

                            <button
                                type="button"
                                onClick={() =>
                                    onChangeStatus?.({
                                        user,
                                        status: "inactive",
                                    })
                                }
                                className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium dark:border-gray-700"
                            >
                                Deactivate
                            </button>

                        )}


                        {status !== "suspended" && (

                            <button
                                type="button"
                                onClick={() =>
                                    onChangeStatus?.({
                                        user,
                                        status: "suspended",
                                    })
                                }
                                className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium dark:border-gray-700"
                            >
                                Suspend
                            </button>

                        )}

                    </div>

                )}

            </section>

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
        <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-[#171717]">

            <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600 dark:bg-[#252525] dark:text-gray-300">

                    <FontAwesomeIcon icon={icon} />

                </div>

                <div className="min-w-0">

                    <p className="text-xs text-gray-500">
                        {label}
                    </p>

                    <p className="mt-1 truncate text-sm font-semibold text-gray-900 dark:text-white">
                        {value}
                    </p>

                </div>

            </div>

        </div>
    );
};


// ============================================================
// INFO LINE
// ============================================================

const InfoLine = ({
    icon,
    label,
    value,
}) => {

    return (
        <div className="flex items-start gap-3">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500 dark:bg-[#252525]">

                <FontAwesomeIcon icon={icon} />

            </div>

            <div className="min-w-0">

                <p className="text-xs text-gray-500">
                    {label}
                </p>

                <p className="mt-1 break-all text-sm font-medium text-gray-900 dark:text-white">
                    {value || "Not provided"}
                </p>

            </div>

        </div>
    );
};


// ============================================================
// STATUS ITEM
// ============================================================

const StatusItem = ({ status }) => {

    const isActive = status === "active";

    const isSuspended =
        status === "suspended";


    let icon = faCircleXmark;

    if (isActive) {
        icon = faCircleCheck;
    } else if (isSuspended) {
        icon = faClock;
    }


    return (
        <div className="flex items-center gap-3">

            <FontAwesomeIcon
                icon={icon}
                className="text-lg"
            />

            <div>

                <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {capitalize(status)}
                </p>

                <p className="mt-1 text-xs text-gray-500">

                    {isActive &&
                        "This account is currently active."}

                    {status === "inactive" &&
                        "This account is currently inactive."}

                    {isSuspended &&
                        "This account is currently suspended."}

                </p>

            </div>

        </div>
    );
};


// ============================================================
// STATUS BADGE
// ============================================================

const StatusBadge = ({ status }) => {

    return (
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-[#252525] dark:text-gray-300">
            {capitalize(status)}
        </span>
    );
};


// ============================================================
// ROLE BADGE
// ============================================================

const RoleBadge = ({ role }) => {

    return (
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-[#252525] dark:text-gray-300">
            {role}
        </span>
    );
};


// ============================================================
// SECTION TITLE
// ============================================================

const SectionTitle = ({
    icon,
    title,
}) => {

    return (
        <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 dark:bg-[#252525] dark:text-gray-300">

                <FontAwesomeIcon icon={icon} />

            </div>

            <h2 className="font-semibold text-gray-900 dark:text-white">
                {title}
            </h2>

        </div>
    );
};


// ============================================================
// HELPERS
// ============================================================

const capitalize = (value = "") => {

    return value.charAt(0).toUpperCase() +
        value.slice(1);
};


const formatDate = (value) => {

    if (!value) {
        return "Not available";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "Not available";
    }

    return date.toLocaleString();
};


const formatShortDate = (value) => {

    if (!value) {
        return "N/A";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "N/A";
    }

    return date.toLocaleDateString();
};


export default UserDetail;