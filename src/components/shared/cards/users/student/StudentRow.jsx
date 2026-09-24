import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";

import StudentMenu from "./StudentMenu";


export default function StudentRow({
    student,
    permissions,

    menuOpen,

    onMenuToggle,
    onView,
    onEdit,
    onToggle,
    onDelete,
}) {
    return (
        <div
            className={`group relative rounded-2xl px-3 py-3 transition ${
                student.active
                    ? "hover:bg-gray-50 dark:hover:bg-[#202020]"
                    : "opacity-50 hover:bg-gray-50 dark:hover:bg-[#202020]"
            }`}
        >

            {/* =========================================================
                DESKTOP
            ========================================================= */}

            <div className="hidden grid-cols-[56px_1fr_110px_75px_85px_100px] items-center gap-3 md:grid">

                {/* Photo */}

                <button
                    type="button"
                    onClick={onView}
                    className="relative w-fit"
                >
                    <img
                        src={student.photo}
                        alt={student.name}
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-white dark:ring-[#181818]"
                    />

                    <span
                        className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white dark:border-[#181818] ${
                            student.active
                                ? "bg-emerald-500"
                                : "bg-gray-400"
                        }`}
                    />
                </button>


                {/* Name */}

                <button
                    type="button"
                    onClick={onView}
                    className="truncate text-left text-sm font-bold text-gray-900 dark:text-white"
                >
                    {student.name}
                </button>


                {/* ID */}

                <span className="text-xs text-gray-500 dark:text-gray-400">
                    {student.idNumber}
                </span>


                {/* Year */}

                <span className="text-center text-xs font-medium text-gray-700 dark:text-gray-300">
                    {student.year}
                </span>


                {/* Marks */}

                <span className="text-center text-xs font-bold text-gray-900 dark:text-white">
                    {String(student.marks ?? 0).padStart(4, "0")}
                </span>


                {/* Rank + Menu */}

                <div className="relative flex justify-center">

                    <button
                        type="button"
                        onClick={onMenuToggle}
                        className="flex items-center gap-2 rounded-xl bg-blue-50 px-3 py-1.5 text-[10px] font-bold text-blue-600 transition hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20"
                    >
                        {student.rank ?? "-"}

                        <FontAwesomeIcon
                            icon={faEllipsisVertical}
                            className="text-[9px]"
                        />
                    </button>


                    {menuOpen && (
                        <StudentMenu
                            student={student}
                            permissions={permissions}
                            onView={onView}
                            onEdit={onEdit}
                            onToggle={onToggle}
                            onDelete={onDelete}
                        />
                    )}

                </div>

            </div>


            {/* =========================================================
                MOBILE
            ========================================================= */}

            <div className="flex items-center gap-3 md:hidden">

                {/* Photo */}

                <button
                    type="button"
                    onClick={onView}
                    className="relative shrink-0"
                >
                    <img
                        src={student.photo}
                        alt={student.name}
                        className="h-11 w-11 rounded-full object-cover"
                    />

                    <span
                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-[#181818] ${
                            student.active
                                ? "bg-emerald-500"
                                : "bg-gray-400"
                        }`}
                    />
                </button>


                {/* Name */}

                <button
                    type="button"
                    onClick={onView}
                    className="min-w-0 flex-1 text-left"
                >
                    <p className="truncate text-sm font-bold text-gray-900 dark:text-white">
                        {student.name}
                    </p>

                    <p className="mt-0.5 text-[10px] text-gray-400">
                        ID {student.idNumber} · {student.year}
                    </p>
                </button>


                {/* Marks */}

                <div className="text-right">

                    <p className="text-xs font-bold text-gray-900 dark:text-white">
                        {student.marks ?? 0}
                    </p>

                    <p className="text-[10px] font-bold text-blue-500">
                        {student.rank ?? "-"}
                    </p>

                </div>


                {/* Menu */}

                <button
                    type="button"
                    onClick={onMenuToggle}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-[#292929]"
                >
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>


                {menuOpen && (
                    <StudentMenu
                        student={student}
                        permissions={permissions}
                        onView={onView}
                        onEdit={onEdit}
                        onToggle={onToggle}
                        onDelete={onDelete}
                    />
                )}

            </div>

        </div>
    );
}