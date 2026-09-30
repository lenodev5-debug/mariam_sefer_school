import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faPen,
    faUserShield,
    faUserCheck,
    faUserSlash,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Inline action buttons for desktop table rows.
 * Each button is optional via the can* flags.
 */
const UserActionsInline = ({
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
    if (!user) return null;

    const isActive = user.status === "active";

    const actions = [
        canView && {
            key: "view",
            icon: faEye,
            title: "View details",
            onClick: () => onView?.(user),
            tone: "default",
        },
        canEdit && {
            key: "edit",
            icon: faPen,
            title: "Edit user",
            onClick: () => onEdit?.(user),
            tone: "default",
        },
        canChangeRole && {
            key: "role",
            icon: faUserShield,
            title: "Change role",
            onClick: () => onChangeRole?.(user),
            tone: "default",
        },
        canChangeStatus && {
            key: "status",
            icon: isActive ? faUserSlash : faUserCheck,
            title: isActive ? "Deactivate user" : "Activate user",
            onClick: () => onChangeStatus?.(user),
            tone: "default",
        },
        canDelete && {
            key: "delete",
            icon: faTrash,
            title: "Delete user",
            onClick: () => onDelete?.(user),
            tone: "danger",
        },
    ].filter(Boolean);

    if (actions.length === 0) {
        return (
            <span className="text-xs text-gray-400 dark:text-gray-500">
                —
            </span>
        );
    }

    return (
        <div className="flex items-center justify-end gap-1">
            {actions.map((action, i) => (
                <span key={action.key} className="flex items-center">
                    {/* separator before danger (delete) */}
                    {action.tone === "danger" &&
                        i > 0 && (
                            <span className="mx-1 h-4 w-px bg-gray-200 dark:bg-gray-700" />
                        )}

                    <button
                        type="button"
                        title={action.title}
                        aria-label={action.title}
                        onClick={action.onClick}
                        className={`
                            flex h-8 w-8 items-center justify-center rounded-lg
                            text-sm transition
                            ${
                                action.tone === "danger"
                                    ? "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-[#252525] dark:hover:text-white"
                            }
                        `}
                    >
                        <FontAwesomeIcon icon={action.icon} />
                    </button>
                </span>
            ))}
        </div>
    );
};

export default UserActionsInline;