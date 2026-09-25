import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function SearchInput({
    value,
    onChange,
    placeholder = 'Search...',
}) {
    return (
        <div className="relative w-full sm:w-72">

            <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-sm
                    text-gray-400
                "
            />

            <input
                type="text"
                value={value}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                placeholder={placeholder}
                className="
                    h-10
                    w-full
                    rounded-xl
                    border
                    border-gray-700
                    bg-[#202020]
                    pl-9
                    pr-4
                    text-sm
                    text-white
                    outline-none
                    transition
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-500/10
                "
            />

        </div>
    );
}