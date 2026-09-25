
const EntityRow = ({
    title,
    subtitle,
    image,
    icon,
    status,
    meta = [],
    actions,
    onClick,
}) => {
    return (
        <div
            onClick={onClick}
            className={`flex items-center gap-4 border-b border-gray-100 px-4 py-4 last:border-b-0 dark:border-gray-800 ${
                onClick
                    ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.03]'
                    : ''
            }`}
        >
            {/* Avatar / Icon */}
            <div className="shrink-0">
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="h-10 w-10 rounded-xl object-cover"
                    />
                ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                        {icon}
                    </div>
                )}
            </div>

            {/* Main */}
            <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                    {title}
                </h3>

                {subtitle && (
                    <p className="truncate text-xs text-gray-500">
                        {subtitle}
                    </p>
                )}
            </div>

            {/* Meta */}
            <div className="hidden items-center gap-6 md:flex">
                {meta.map((item, index) => (
                    <div key={index}>
                        <p className="text-xs text-gray-400">
                            {item.label}
                        </p>

                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {item.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Status */}
            {status && (
                <span
                    className={`hidden rounded-full px-3 py-1 text-xs font-medium sm:inline-flex ${
                        status.toLowerCase() ===
                        'active'
                            ? 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400'
                            : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                    }`}
                >
                    {status}
                </span>
            )}

            {/* Actions */}
            {actions && (
                <div
                    onClick={(event) =>
                        event.stopPropagation()
                    }
                >
                    {actions}
                </div>
            )}
        </div>
    );
};

export default EntityRow;