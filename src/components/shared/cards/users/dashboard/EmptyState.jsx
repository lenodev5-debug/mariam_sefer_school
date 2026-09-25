import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';

export default function EmptyState({
    title = 'Nothing found',
    message = 'There is no data to display.',
}) {
    return (
        <div className="px-6 py-16 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-800 text-gray-400">

                <FontAwesomeIcon
                    icon={faFolderOpen}
                    className="text-2xl"
                />

            </div>

            <h3 className="mt-4 font-semibold text-white">
                {title}
            </h3>

            <p className="mt-1 text-sm text-gray-400">
                {message}
            </p>

        </div>
    );
}