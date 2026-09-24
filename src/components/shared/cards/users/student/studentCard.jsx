import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEllipsis,
    faPerson,
    faPersonDress,
} from "@fortawesome/free-solid-svg-icons";

const StudentsCard = () => {
    return (
        <div className="w-full rounded-[22px] bg-white p-6 shadow-sm dark:bg-[#1a1a1a]">

            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-[22px] font-semibold text-[#111827] dark:text-white">
                    Student Attendance
                </h2>

                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                    <FontAwesomeIcon icon={faEllipsis} />
                </button>
            </div>

            {/* Rings */}
            <div className="flex justify-center py-8">
                <div className="relative h-[230px] w-[230px]">

                    {/* Outer background */}
                    <div className="absolute inset-0 rounded-full border-[20px] border-[#f1f3f6] dark:border-[#292929]" />

                    {/* Blue progress */}
                    <div
                        className="
                            absolute inset-0
                            rounded-full
                            border-[20px]
                            border-transparent
                            border-l-[#b9e8f8]
                            border-t-[#b9e8f8]
                            border-b-[#b9e8f8]
                            rotate-[35deg]
                        "
                    />

                    {/* Inner background */}
                    <div className="absolute inset-[43px] rounded-full border-[20px] border-[#f1f3f6] dark:border-[#292929]" />

                    {/* Yellow progress */}
                    <div
                        className="
                            absolute inset-[43px]
                            rounded-full
                            border-[20px]
                            border-transparent
                            border-r-[#ffe37a]
                            border-t-[#ffe37a]
                            rotate-[35deg]
                        "
                    />

                    {/* Center */}
                    <div className="absolute inset-0 flex items-center justify-center gap-2">
                        <FontAwesomeIcon
                            icon={faPerson}
                            className="text-[38px] text-[#b9e8f8]"
                        />

                        <FontAwesomeIcon
                            icon={faPersonDress}
                            className="text-[38px] text-[#ffe37a]"
                        />
                    </div>
                </div>
            </div>

            {/* Boys / Girls */}
            <div className="grid grid-cols-2 gap-6">

                {/* Boys */}
                <div>
                    <div className="mb-2 flex items-center gap-3">
                        <span className="h-5 w-5 rounded-full bg-[#b9e8f8]" />

                        <span className="text-[22px] font-semibold text-[#111827] dark:text-white">
                            45,414
                        </span>
                    </div>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Boys (47%)
                    </p>
                </div>

                {/* Girls */}
                <div>
                    <div className="mb-2 flex items-center gap-3">
                        <span className="h-5 w-5 rounded-full bg-[#ffe37a]" />

                        <span className="text-[22px] font-semibold text-[#111827] dark:text-white">
                            40,270
                        </span>
                    </div>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Girls (53%)
                    </p>
                </div>

            </div>
        </div>
    );
};

export default StudentsCard;