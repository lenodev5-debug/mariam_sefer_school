import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faArrowLeft,
    faUser,
    faEnvelope,
    faPhone,
    faLocationDot,
    faCalendar,
    faUserCircle,
    faShieldHalved,
    faGraduationCap,
    faHeartPulse,
    faCircleCheck,
    faCircleXmark,
    faClock,
} from "@fortawesome/free-solid-svg-icons";


const StudentDetail = ({
    student,
    onBack,
    onEdit,
    canEdit = false,
}) => {

    if (!student) {
        return null;
    }


    // ============================================================
    // IDS
    // ============================================================

    const studentId =
        student._id ||
        student.id ||
        student.studentId ||
        null;

    const userId =
        student.userId?._id ||
        student.userId ||
        student.user?._id ||
        student.user?.id ||
        null;


    // ============================================================
    // USER DATA
    // ============================================================

    const user =
        typeof student.userId === "object"
            ? student.userId
            : student.user || {};


    const name =
        student.name ||
        user.name ||
        "Unnamed Student";


    const email =
        student.email ||
        user.email ||
        "No email";


    const phone =
        student.phone ||
        user.phone ||
        "No phone";


    const image =
        student.image ||
        user.image ||
        null;


    const userStatus =
        student.userStatus ||
        user.status ||
        "active";


    // ============================================================
    // STUDENT PROFILE DATA
    // ============================================================

    const admissionNumber =
        student.admissionNumber ||
        student.admissionNo ||
        "Not assigned";


    const gender =
        student.gender
            ? capitalize(student.gender)
            : "Not provided";


    const dateOfBirth =
        student.dateOfBirth
            ? formatDate(student.dateOfBirth)
            : "Not provided";


    const address =
        student.address ||
        "Not provided";


    const enrollmentDate =
        student.enrollmentDate
            ? formatDate(student.enrollmentDate)
            : "Not provided";


    const profileCompleted =
        student.profileCompleted === true;


    const studentStatus =
        student.studentStatus ||
        student.status ||
        "active";


    // ============================================================
    // OPTIONAL ACADEMIC DATA
    //
    // These fields are not currently inside StudentProfile.
    // They are prepared for your future academic/attendance APIs.
    // ============================================================

    const marks =
        student.marks ??
        student.totalMarks ??
        null;


    const average =
        student.average ??
        student.averageMark ??
        null;


    const rank =
        student.rank ??
        null;


    const attendance =
        student.attendance ??
        null;


    // ============================================================
    // RENDER
    // ============================================================

    return (
        <div className="w-full">

            {/* ====================================================
                HEADER
            ==================================================== */}

            <div className="mb-6 flex items-center justify-between">

                <button
                    type="button"
                    onClick={onBack}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-[#1a1a1a] dark:hover:text-white"
                >

                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="text-sm"
                    />

                    <span>
                        Back to Students
                    </span>

                </button>


                {canEdit && onEdit && (
                    <button
                        type="button"
                        onClick={() => onEdit(student)}
                        className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                    >
                        Edit Student
                    </button>
                )}

            </div>


            {/* ====================================================
                PROFILE HERO
            ==================================================== */}

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-[#292929] dark:bg-[#151515]">

                <div className="p-6">

                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                        {/* Student identity */}

                        <div className="flex items-center gap-5">

                            {/* Avatar */}

                            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-gray-100 dark:bg-[#222]">

                                {image ? (

                                    <img
                                        src={image}
                                        alt={name}
                                        className="h-full w-full object-cover"
                                    />

                                ) : (

                                    <div className="flex h-full w-full items-center justify-center text-gray-400">

                                        <FontAwesomeIcon
                                            icon={faUser}
                                            className="text-4xl"
                                        />

                                    </div>

                                )}

                            </div>


                            {/* Student name */}

                            <div>

                                <div className="flex flex-wrap items-center gap-3">

                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {name}
                                    </h1>


                                    <StatusBadge
                                        status={studentStatus}
                                    />

                                </div>


                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">

                                    Admission Number:{" "}

                                    <span className="font-medium text-gray-700 dark:text-gray-200">
                                        {admissionNumber}
                                    </span>

                                </p>


                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">

                                    Student ID:{" "}

                                    <span className="font-medium text-gray-700 dark:text-gray-200">
                                        {studentId || "N/A"}
                                    </span>

                                </p>

                            </div>

                        </div>


                        {/* Account status */}

                        <div className="rounded-xl border border-gray-200 px-4 py-3 dark:border-[#292929]">

                            <div className="flex items-center gap-2">

                                <FontAwesomeIcon
                                    icon={faShieldHalved}
                                    className={
                                        userStatus === "active"
                                            ? "text-green-500"
                                            : "text-gray-400"
                                    }
                                />

                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Account
                                </span>

                            </div>


                            <p className="mt-1 text-sm capitalize text-gray-500 dark:text-gray-400">
                                {userStatus}
                            </p>

                        </div>

                    </div>

                </div>

            </div>


            {/* ====================================================
                QUICK INFORMATION
            ==================================================== */}

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                <StatCard
                    icon={faGraduationCap}
                    title="Admission"
                    value={admissionNumber}
                />


                <StatCard
                    icon={faCalendar}
                    title="Enrolled"
                    value={formatShortDate(
                        student.enrollmentDate
                    )}
                />


                <StatCard
                    icon={faUserCircle}
                    title="Gender"
                    value={gender}
                />


                <StatCard
                    icon={
                        profileCompleted
                            ? faCircleCheck
                            : faClock
                    }
                    title="Profile"
                    value={
                        profileCompleted
                            ? "Completed"
                            : "Incomplete"
                    }
                />

            </div>


            {/* ====================================================
                ACADEMIC OVERVIEW
            ==================================================== */}

            {(marks !== null ||
                average !== null ||
                rank !== null ||
                attendance !== null) && (

                <div className="mt-6">

                    <SectionTitle>
                        Academic Overview
                    </SectionTitle>


                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                        {marks !== null && (

                            <StatCard
                                title="Total Marks"
                                value={marks}
                            />

                        )}


                        {average !== null && (

                            <StatCard
                                title="Average"
                                value={`${average}%`}
                            />

                        )}


                        {rank !== null && (

                            <StatCard
                                title="Rank"
                                value={rank}
                            />

                        )}


                        {attendance !== null && (

                            <StatCard
                                title="Attendance"
                                value={`${attendance}%`}
                            />

                        )}

                    </div>

                </div>

            )}


            {/* ====================================================
                PERSONAL + CONTACT INFORMATION
            ==================================================== */}

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">


                {/* =================================================
                    PERSONAL INFORMATION
                ================================================= */}

                <InfoCard
                    title="Personal Information"
                >

                    <InfoLine
                        icon={faUser}
                        label="Full Name"
                        value={name}
                    />


                    <InfoLine
                        icon={faUserCircle}
                        label="Gender"
                        value={gender}
                    />


                    <InfoLine
                        icon={faCalendar}
                        label="Date of Birth"
                        value={dateOfBirth}
                    />


                    <InfoLine
                        icon={faCalendar}
                        label="Enrollment Date"
                        value={enrollmentDate}
                    />


                    <InfoLine
                        icon={faLocationDot}
                        label="Address"
                        value={address}
                    />

                </InfoCard>


                {/* =================================================
                    CONTACT INFORMATION
                ================================================= */}

                <InfoCard
                    title="Contact Information"
                >

                    <InfoLine
                        icon={faEnvelope}
                        label="Email"
                        value={email}
                    />


                    <InfoLine
                        icon={faPhone}
                        label="Phone"
                        value={phone}
                    />


                    <InfoLine
                        icon={faHeartPulse}
                        label="Emergency Contact"
                        value={
                            student.emergencyContactName ||
                            "Not provided"
                        }
                    />


                    <InfoLine
                        icon={faPhone}
                        label="Emergency Phone"
                        value={
                            student.emergencyContactPhone ||
                            "Not provided"
                        }
                    />

                </InfoCard>

            </div>


            {/* ====================================================
                PROFILE STATUS
            ==================================================== */}

            <div className="mt-6">

                <InfoCard
                    title="Student Profile"
                >

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                        <StatusItem
                            label="Student Status"
                            value={studentStatus}
                            active={
                                studentStatus === "active"
                            }
                        />


                        <StatusItem
                            label="Account Status"
                            value={userStatus}
                            active={
                                userStatus === "active"
                            }
                        />


                        <StatusItem
                            label="Profile Completion"
                            value={
                                profileCompleted
                                    ? "Completed"
                                    : "Incomplete"
                            }
                            active={profileCompleted}
                        />

                    </div>

                </InfoCard>

            </div>

        </div>
    );
};


/* ================================================================
   STAT CARD
================================================================ */

const StatCard = ({
    icon,
    title,
    value,
}) => {

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-[#292929] dark:bg-[#151515]">

            <div className="flex items-center gap-3">

                {icon && (

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-700 dark:bg-[#222] dark:text-gray-200">

                        <FontAwesomeIcon
                            icon={icon}
                        />

                    </div>

                )}


                <div className="min-w-0">

                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        {title}
                    </p>


                    <p className="mt-1 truncate text-lg font-semibold text-gray-900 dark:text-white">
                        {value}
                    </p>

                </div>

            </div>

        </div>
    );
};


/* ================================================================
   INFO CARD
================================================================ */

const InfoCard = ({
    title,
    children,
}) => {

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-[#292929] dark:bg-[#151515]">

            <h2 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
                {title}
            </h2>


            <div className="space-y-4">
                {children}
            </div>

        </div>
    );
};


/* ================================================================
   INFO LINE
================================================================ */

const InfoLine = ({
    icon,
    label,
    value,
}) => {

    return (
        <div className="flex items-start gap-3">

            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600 dark:bg-[#222] dark:text-gray-300">

                <FontAwesomeIcon
                    icon={icon}
                />

            </div>


            <div className="min-w-0">

                <p className="text-xs text-gray-500 dark:text-gray-400">
                    {label}
                </p>


                <p className="mt-0.5 break-words text-sm font-medium text-gray-800 dark:text-gray-200">
                    {value}
                </p>

            </div>

        </div>
    );
};


/* ================================================================
   STATUS ITEM
================================================================ */

const StatusItem = ({
    label,
    value,
    active,
}) => {

    return (
        <div className="rounded-xl border border-gray-200 p-4 dark:border-[#292929]">

            <p className="text-xs text-gray-500 dark:text-gray-400">
                {label}
            </p>


            <div className="mt-2 flex items-center gap-2">

                <FontAwesomeIcon
                    icon={
                        active
                            ? faCircleCheck
                            : faCircleXmark
                    }
                    className={
                        active
                            ? "text-green-500"
                            : "text-gray-400"
                    }
                />


                <span className="text-sm font-medium capitalize text-gray-800 dark:text-gray-200">
                    {value}
                </span>

            </div>

        </div>
    );
};


/* ================================================================
   STATUS BADGE
================================================================ */

const StatusBadge = ({
    status,
}) => {

    const isActive =
        status === "active";


    return (
        <span
            className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                isActive
                    ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                    : "bg-gray-100 text-gray-600 dark:bg-[#252525] dark:text-gray-400"
            }`}
        >
            {status}
        </span>
    );
};


/* ================================================================
   SECTION TITLE
================================================================ */

const SectionTitle = ({
    children,
}) => {

    return (
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            {children}
        </h2>
    );
};


/* ================================================================
   HELPERS
================================================================ */

function capitalize(value) {

    if (!value) {
        return "";
    }

    return (
        value.charAt(0).toUpperCase() +
        value.slice(1)
    );
}


function formatDate(value) {

    const date = new Date(value);


    if (Number.isNaN(date.getTime())) {
        return "Invalid date";
    }


    return date.toLocaleDateString(
        undefined,
        {
            year: "numeric",
            month: "long",
            day: "numeric",
        }
    );
}


function formatShortDate(value) {

    if (!value) {
        return "Not provided";
    }


    const date = new Date(value);


    if (Number.isNaN(date.getTime())) {
        return "Not provided";
    }


    return date.toLocaleDateString(
        undefined,
        {
            year: "numeric",
            month: "short",
            day: "numeric",
        }
    );
}


export default StudentDetail;