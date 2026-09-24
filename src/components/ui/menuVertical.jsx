import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faHome,
    faMagnifyingGlass,
    faClockRotateLeft,
    faUser,
} from '@fortawesome/free-solid-svg-icons';

export default function ExpandableMenuVertical() {
    return (
        <nav className="group fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center">

            {/* Center + button */}
            <button
                type="button"
                aria-label="Open menu"
                className="
                    relative z-50
                    flex h-16 w-16
                    items-center justify-center
                    rounded-full
                    bg-[#3b82f6]
                    text-white
                    shadow-xl
                    transition-all duration-300
                    hover:bg-[#2563eb]
                    group-hover:scale-110
                "
            >
                <FontAwesomeIcon
                    icon={faPlus}
                    className="
                        h-8 w-8
                        transition-transform duration-500
                        ease-in-out
                        group-hover:rotate-45
                    "
                />
            </button>

            {/* Menu items */}
            <div
                className="
                    absolute
                    bottom-1/2
                    right-1/2
                    z-40
                    flex
                    items-center
                    justify-center
                "
            >

                {/* Home - UP 150px */}
                <button
                    type="button"
                    className="
                        absolute
                        opacity-0
                        group-hover:opacity-100
                        group-hover:-translate-y-37.5
                        transition-all duration-500
                        ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]
                        delay-50
                    "
                >
                    <div
                        className="
                            flex h-12 w-12
                            items-center justify-center
                            rounded-full
                            bg-white
                            shadow-lg
                            transition-all duration-300
                            hover:scale-110
                            hover:bg-gray-100
                            dark:bg-[#252525]
                            dark:hover:bg-[#333]
                        "
                    >
                        <FontAwesomeIcon
                            icon={faHome}
                            className="
                                h-5 w-5
                                text-gray-400
                                transition-colors duration-300
                                hover:text-[#3b82f6]
                            "
                        />
                    </div>

                    <span
                        className="
                            mt-2
                            block
                            text-center
                            text-xs
                            font-bold
                            text-gray-700
                            opacity-0
                            transition-opacity duration-300
                            delay-300
                            group-hover:opacity-100
                            dark:text-gray-300
                        "
                    >
                        Home
                    </span>
                </button>

                {/* Search - UP 75px */}
                <button
                    type="button"
                    className="
                        absolute
                        opacity-0
                        group-hover:opacity-100
                        group-hover:-translate-y-18.75
                        transition-all duration-500
                        ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]
                        delay-100
                    "
                >
                    <div
                        className="
                            flex h-12 w-12
                            items-center justify-center
                            rounded-full
                            bg-white
                            shadow-lg
                            transition-all duration-300
                            hover:scale-110
                            hover:bg-gray-100
                            dark:bg-[#252525]
                            dark:hover:bg-[#333]
                        "
                    >
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className="
                                h-5 w-5
                                text-gray-400
                                transition-colors duration-300
                                hover:text-[#3b82f6]
                            "
                        />
                    </div>

                    <span
                        className="
                            mt-2
                            block
                            text-center
                            text-xs
                            font-bold
                            text-gray-700
                            opacity-0
                            transition-opacity duration-300
                            delay-300
                            group-hover:opacity-100
                            dark:text-gray-300
                        "
                    >
                        Search
                    </span>
                </button>

                {/* History - LEFT 75px */}
                <button
                    type="button"
                    className="
                        absolute
                        opacity-0
                        group-hover:opacity-100
                        group-hover:-translate-x-18.75
                        transition-all duration-500
                        ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]
                        delay-150
                    "
                >
                    <div
                        className="
                            flex h-12 w-12
                            items-center justify-center
                            rounded-full
                            bg-white
                            shadow-lg
                            transition-all duration-300
                            hover:scale-110
                            hover:bg-gray-100
                            dark:bg-[#252525]
                            dark:hover:bg-[#333]
                        "
                    >
                        <FontAwesomeIcon
                            icon={faClockRotateLeft}
                            className="
                                h-5 w-5
                                text-gray-400
                                transition-colors duration-300
                                hover:text-[#3b82f6]
                            "
                        />
                    </div>

                    <span
                        className="
                            mt-2
                            block
                            text-center
                            text-xs
                            font-bold
                            text-gray-700
                            opacity-0
                            transition-opacity duration-300
                            delay-300
                            group-hover:opacity-100
                            dark:text-gray-300
                        "
                    >
                        History
                    </span>
                </button>

                {/* Profile - LEFT 150px */}
                <button
                    type="button"
                    className="
                        absolute
                        opacity-0
                        group-hover:opacity-100
                        group-hover:-translate-x-37.5
                        transition-all duration-500
                        ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]
                        delay-200
                    "
                >
                    <div
                        className="
                            flex h-12 w-12
                            items-center justify-center
                            rounded-full
                            bg-white
                            shadow-lg
                            transition-all duration-300
                            hover:scale-110
                            hover:bg-gray-100
                            dark:bg-[#252525]
                            dark:hover:bg-[#333]
                        "
                    >
                        <FontAwesomeIcon
                            icon={faUser}
                            className="
                                h-5 w-5
                                text-gray-400
                                transition-colors duration-300
                                hover:text-[#3b82f6]
                            "
                        />
                    </div>

                    <span
                        className="
                            mt-2
                            block
                            text-center
                            text-xs
                            font-bold
                            text-gray-700
                            opacity-0
                            transition-opacity duration-300
                            delay-300
                            group-hover:opacity-100
                            dark:text-gray-300
                        "
                    >
                        Profile
                    </span>
                </button>

            </div>
        </nav>
    );
}