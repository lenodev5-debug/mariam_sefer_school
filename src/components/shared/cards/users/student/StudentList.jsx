import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserGraduate,
    // faEllipsisVertical
} from "@fortawesome/free-solid-svg-icons";

import StudentRow from "./StudentRow";
import StudentDetails from "./StudentDetail";


const DEFAULT_PERMISSIONS = {
    canView: true,
    canEdit: false,
    canChangeStatus: false,
    canDelete: false,
};


export default function StudentList({
    students = [],
    loading = false,
    permissions = DEFAULT_PERMISSIONS,

    onEdit,
    onToggleStatus,
    onDelete,

    title = "Top Performers",
    subtitle = "Students",

    showFullChart = true,
    onFullChart,
}) {
    const [activeTab, setActiveTab] = useState("Today");
    const [openMenuId, setOpenMenuId] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const tabs = ["Today", "Week", "Month", "Year"];

    const mergedPermissions = {
        ...DEFAULT_PERMISSIONS,
        ...permissions,
    };


    const openDetails = (student) => {
        setOpenMenuId(null);
        setSelectedStudent(student);
    };


    const closeDetails = () => {
        setSelectedStudent(null);
    };


    const handleToggleStatus = (student) => {
        setOpenMenuId(null);

        if (onToggleStatus) {
            onToggleStatus(student);
        }
    };


    const handleDelete = (student) => {
        setOpenMenuId(null);

        if (selectedStudent?.id === student.id) {
            setSelectedStudent(null);
        }

        if (onDelete) {
            onDelete(student);
        }
    };


    /*
    |--------------------------------------------------------------------------
    | DETAIL VIEW
    |--------------------------------------------------------------------------
    */

    if (selectedStudent) {
        return (
            <StudentDetails
                student={selectedStudent}
                permissions={mergedPermissions}
                onBack={closeDetails}
                onEdit={onEdit}
                onToggleStatus={handleToggleStatus}
            />
        );
    }


    /*
    |--------------------------------------------------------------------------
    | LIST VIEW
    |--------------------------------------------------------------------------
    */

    return (
        <div className="w-full rounded-3xl bg-white p-5 shadow-sm ring-1 ring-gray-100 transition-colors duration-300 md:p-6 dark:bg-[#181818] dark:ring-[#252525]">

            {/* Header */}

            <div className="mb-6 flex items-center justify-between">

                <div>

                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
                        {subtitle}
                    </p>

                    <h2 className="mt-1 text-xl font-bold tracking-tight text-[#171717] dark:text-white">
                        {title}
                    </h2>

                </div>


                {showFullChart && (
                    <button
                        type="button"
                        onClick={onFullChart}
                        className="rounded-xl bg-gray-100 px-4 py-2 text-xs font-semibold text-[#171717] transition hover:bg-gray-200 dark:bg-[#252525] dark:text-white dark:hover:bg-[#303030]"
                    >
                        Full Chart
                    </button>
                )}

            </div>


            {/* Tabs */}

            <div className="mb-5 flex gap-6 overflow-x-auto border-b border-gray-100 dark:border-[#292929]">

                {tabs.map((tab) => {

                    const isActive = activeTab === tab;

                    return (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveTab(tab)}
                            className={`relative whitespace-nowrap pb-3 text-xs font-semibold transition-colors ${
                                isActive
                                    ? "text-gray-900 dark:text-white"
                                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            }`}
                        >
                            {tab}

                            {isActive && (
                                <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-gray-900 dark:bg-white" />
                            )}

                        </button>
                    );

                })}

            </div>


            {/* Loading */}

            {loading && (
                <div className="py-14 text-center">

                    <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900 dark:border-[#333] dark:border-t-white" />

                    <p className="mt-3 text-xs text-gray-400">
                        Loading students...
                    </p>

                </div>
            )}


            {!loading && (
                <>

                    {/* Desktop Header */}

                    <div className="hidden grid-cols-[56px_1fr_110px_75px_85px_100px] gap-3 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 md:grid">

                        <span>Photo</span>
                        <span>Name</span>
                        <span>ID Number</span>
                        <span className="text-center">Year</span>
                        <span className="text-center">Marks</span>
                        <span className="text-center">Rank</span>

                    </div>


                    {/* Students */}

                    <div className="flex flex-col gap-1">

                        {students.map((student) => (

                            <StudentRow
                                key={student.id}
                                student={student}
                                permissions={mergedPermissions}
                                menuOpen={openMenuId === student.id}
                                onMenuToggle={() =>
                                    setOpenMenuId(
                                        openMenuId === student.id
                                            ? null
                                            : student.id
                                    )
                                }
                                onView={() => openDetails(student)}
                                onEdit={() => onEdit?.(student)}
                                onToggle={() =>
                                    handleToggleStatus(student)
                                }
                                onDelete={() =>
                                    handleDelete(student)
                                }
                            />

                        ))}


                        {/* Empty */}

                        {students.length === 0 && (
                            <div className="rounded-2xl py-14 text-center">

                                <FontAwesomeIcon
                                    icon={faUserGraduate}
                                    className="text-2xl text-gray-300 dark:text-gray-600"
                                />

                                <p className="mt-3 text-sm font-semibold text-gray-500 dark:text-gray-400">
                                    No students found
                                </p>

                                <p className="mt-1 text-xs text-gray-400">
                                    Students will appear here when available.
                                </p>

                            </div>
                        )}

                    </div>

                </>
            )}

        </div>
    );
}
