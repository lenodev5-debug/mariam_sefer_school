export default function DashboardSection({
    title,
    icon,
    children,
    className = '',
    action,
}) {
    return (
        <section
            className={`
                rounded-2xl
                border
                border-gray-800
                bg-[#171717]
                p-5
                ${className}
            `}
        >

            {(title || icon || action) && (
                <div className="mb-5 flex items-center justify-between">

                    <div className="flex items-center gap-2">

                        {icon && (
                            <span className="text-indigo-400">
                                {icon}
                            </span>
                        )}

                        {title && (
                            <h2 className="text-base font-semibold text-white">
                                {title}
                            </h2>
                        )}

                    </div>

                    {action}

                </div>
            )}

            {children}

        </section>
    );
}