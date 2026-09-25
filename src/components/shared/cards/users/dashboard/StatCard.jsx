import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

export default function StatCard({
    title,
    value,
    icon,
    gradient = 'from-indigo-500 to-violet-500',
    label = 'Total',
}) {
    return (
        <div
            className={`
                relative
                overflow-hidden
                rounded-2xl
                bg-gradient-to-br
                ${gradient}
                p-5
                text-white
                shadow-lg
            `}
        >
            <div className="relative flex items-center justify-between">

                <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                        <FontAwesomeIcon icon={icon} />
                    </div>

                    <p className="text-sm font-medium">
                        {title}
                    </p>

                </div>

                <button
                    type="button"
                    className="text-white/70 hover:text-white"
                >
                    <FontAwesomeIcon
                        icon={faEllipsisVertical}
                    />
                </button>

            </div>

            <div className="relative mt-6">

                <p className="text-xs text-white/80">
                    {label}
                </p>

                <p className="text-2xl font-bold">
                    {value}
                </p>

            </div>

        </div>
    );
}