import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleCheck,
    faCirclePause,
} from '@fortawesome/free-solid-svg-icons';

const EntityCard = ({
    title,
    code,
    description,
    status,
    icon,
    meta,
    footer,
    onClick,
    menu,
}) => {
    const isActive =
        status?.toLowerCase() === 'active';

    return (
        <div
            className={`group relative rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 dark:border-gray-800 dark:bg-[#151515] ${
                onClick
                    ? 'cursor-pointer hover:-translate-y-1 hover:shadow-lg'
                    : ''
            }`}
            onClick={onClick}
        >
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                    {icon && (
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                            {typeof icon === 'object' ? (
                                <FontAwesomeIcon
                                    icon={icon}
                                />
                            ) : (
                                icon
                            )}
                        </div>
                    )}

                    <div className="min-w-0">
                        <h3 className="truncate font-semibold text-gray-900 dark:text-white">
                            {title}
                        </h3>

                        {code && (
                            <p className="mt-0.5 text-xs text-gray-500">
                                {code}
                            </p>
                        )}
                    </div>
                </div>

                {menu && (
                    <div
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >
                        {menu}
                    </div>
                )}
            </div>

            {/* Status */}
            {status && (
                <div className="mt-4">
                    <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                            isActive
                                ? 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400'
                                : 'bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400'
                        }`}
                    >
                        <FontAwesomeIcon
                            icon={
                                isActive
                                    ? faCircleCheck
                                    : faCirclePause
                            }
                            className="text-[10px]"
                        />

                        {status}
                    </span>
                </div>
            )}

            {/* Description */}
            {description && (
                <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                    {description}
                </p>
            )}

            {/* Meta */}
            {meta && (
                <div className="mt-4">
                    {meta}
                </div>
            )}

            {/* Footer */}
            {footer && (
                <div className="mt-5 border-t border-gray-100 pt-4 dark:border-gray-800">
                    {footer}
                </div>
            )}
        </div>
    );
};

export default EntityCard;