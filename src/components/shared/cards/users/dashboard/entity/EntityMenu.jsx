import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEye,
    faPen,
    faTrash,
    faToggleOn,
    faToggleOff,
} from '@fortawesome/free-solid-svg-icons';

const EntityMenu = ({
    onView,
    onEdit,
    onToggleStatus,
    onDelete,
    isActive = true,
}) => {
    const handleAction = (event, callback) => {
        event.stopPropagation();

        if (callback) {
            callback();
        }
    };

    return (
        <div className="w-44 overflow-hidden rounded-xl border border-gray-200 bg-white p-1 shadow-xl dark:border-gray-700 dark:bg-[#1a1a1a]">
            {onView && (
                <button
                    type="button"
                    onClick={(event) =>
                        handleAction(event, onView)
                    }
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
                >
                    <FontAwesomeIcon
                        icon={faEye}
                        className="w-4"
                    />
                    View
                </button>
            )}

            {onEdit && (
                <button
                    type="button"
                    onClick={(event) =>
                        handleAction(event, onEdit)
                    }
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
                >
                    <FontAwesomeIcon
                        icon={faPen}
                        className="w-4"
                    />
                    Edit
                </button>
            )}

            {onToggleStatus && (
                <button
                    type="button"
                    onClick={(event) =>
                        handleAction(
                            event,
                            onToggleStatus
                        )
                    }
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
                >
                    <FontAwesomeIcon
                        icon={
                            isActive
                                ? faToggleOff
                                : faToggleOn
                        }
                        className="w-4"
                    />

                    {isActive
                        ? 'Deactivate'
                        : 'Activate'}
                </button>
            )}

            {onDelete && (
                <>
                    <div className="my-1 border-t border-gray-100 dark:border-gray-800" />

                    <button
                        type="button"
                        onClick={(event) =>
                            handleAction(
                                event,
                                onDelete
                            )
                        }
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                    >
                        <FontAwesomeIcon
                            icon={faTrash}
                            className="w-4"
                        />
                        Delete
                    </button>
                </>
            )}
        </div>
    );
};

export default EntityMenu;