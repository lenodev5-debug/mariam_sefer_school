import { useEffect, useRef, useState } from "react";

import {
    faEllipsisVertical,
    faEye,
    faPen,
    faUserShield,
    faUserCheck,
    faUserSlash,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const UserMenu = ({
    user,

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
}) => {

    const [open, setOpen] = useState(false);

    const menuRef = useRef(null);


    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setOpen(false);
            }

        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };

    }, []);


    const closeMenu = () => {
        setOpen(false);
    };


    const handleAction = (callback) => {

        closeMenu();

        callback?.(user);

    };


    return (
        <div
            ref={menuRef}
            className="relative inline-block"
        >

            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-[#252525] dark:hover:text-white"
            >

                <FontAwesomeIcon
                    icon={faEllipsisVertical}
                />

            </button>


            {open && (

                <div className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-xl dark:border-gray-700 dark:bg-[#1b1b1b]">


                    {/* VIEW */}

                    {canView && (

                        <MenuButton
                            icon={faEye}
                            label="View details"
                            onClick={() =>
                                handleAction(onView)
                            }
                        />

                    )}


                    {/* EDIT */}

                    {canEdit && (

                        <MenuButton
                            icon={faPen}
                            label="Edit user"
                            onClick={() =>
                                handleAction(onEdit)
                            }
                        />

                    )}


                    {/* ROLE */}

                    {canChangeRole && (

                        <MenuButton
                            icon={faUserShield}
                            label="Change role"
                            onClick={() =>
                                handleAction(onChangeRole)
                            }
                        />

                    )}


                    {/* STATUS */}

                    {canChangeStatus && (

                        <MenuButton
                            icon={
                                user?.status === "active"
                                    ? faUserSlash
                                    : faUserCheck
                            }
                            label={
                                user?.status === "active"
                                    ? "Deactivate user"
                                    : "Activate user"
                            }
                            onClick={() =>
                                handleAction(
                                    onChangeStatus
                                )
                            }
                        />

                    )}


                    {/* DELETE */}

                    {canDelete && (

                        <>

                            <div className="my-1 border-t border-gray-100 dark:border-gray-800" />

                            <MenuButton
                                icon={faTrash}
                                label="Deactivate user"
                                danger
                                onClick={() =>
                                    handleAction(onDelete)
                                }
                            />

                        </>

                    )}

                </div>

            )}

        </div>
    );
};


// ============================================================
// MENU BUTTON
// ============================================================

const MenuButton = ({
    icon,
    label,
    onClick,
    danger = false,
}) => {

    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition ${
                danger
                    ? "text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#252525]"
            }`}
        >

            <FontAwesomeIcon
                icon={icon}
                className="w-4"
            />

            <span>{label}</span>

        </button>
    );
};


export default UserMenu;