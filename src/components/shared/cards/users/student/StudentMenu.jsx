import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faTrash,
    faCheckCircle,
    faCircle,
    faUserGraduate,
    faPen,
} from "@fortawesome/free-solid-svg-icons";


export default function StudentMenu({
    student,
    permissions,

    onView,
    onEdit,
    onToggle,
    onDelete,
}) {
    return (
        <div className="absolute right-2 top-full z-50 mt-2 w-48 overflow-hidden rounded-2xl border border-gray-100 bg-white p-1.5 shadow-xl shadow-black/10 dark:border-[#303030] dark:bg-[#222]">

            {/* VIEW */}

            {permissions.canView && (
                <button
                    type="button"
                    onClick={onView}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-gray-700 transition hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-[#2d2d2d]"
                >
                    <FontAwesomeIcon
                        icon={faUserGraduate}
                        className="w-3 text-blue-500"
                    />

                    View Profile
                </button>
            )}


            {/* EDIT */}

            {permissions.canEdit && (
                <button
                    type="button"
                    onClick={onEdit}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-gray-700 transition hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-[#2d2d2d]"
                >
                    <FontAwesomeIcon
                        icon={faPen}
                        className="w-3 text-gray-500"
                    />

                    Edit Student
                </button>
            )}


            {/* STATUS */}

            {permissions.canChangeStatus && (
                <button
                    type="button"
                    onClick={onToggle}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-gray-700 transition hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-[#2d2d2d]"
                >
                    <FontAwesomeIcon
                        icon={
                            student.active
                                ? faCircle
                                : faCheckCircle
                        }
                        className={`w-3 ${
                            student.active
                                ? "text-gray-400"
                                : "text-emerald-500"
                        }`}
                    />

                    {student.active
                        ? "Set Inactive"
                        : "Set Active"}
                </button>
            )}


            {/* DELETE */}

            {permissions.canDelete && (
                <>
                    <div className="my-1 border-t border-gray-100 dark:border-[#333]" />

                    <button
                        type="button"
                        onClick={onDelete}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-red-500 transition hover:bg-red-50 dark:hover:bg-red-500/10"
                    >
                        <FontAwesomeIcon
                            icon={faTrash}
                            className="w-3"
                        />

                        Delete Student
                    </button>
                </>
            )}

        </div>
    );
}