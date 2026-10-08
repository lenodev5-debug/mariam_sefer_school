import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function ExpandableMenuVertical({
    items = [],
    directions = ["up", "left"],
    spacing = 53,
    className = "",
    buttonClassName = "",
    iconClassName = "",
    bgColor = "#3b82f6",
    hoverBgColor = "#2563eb",
    disabled = false,
}) {
    const [open, setOpen] = useState(false);

    /* ---------- Split items evenly across directions ---------- */
    const buckets = Object.fromEntries(directions.map((d) => [d, []]));
    const perDir = Math.ceil(items.length / directions.length) || 1;

    items.forEach((item, idx) => {
        const dirIndex = Math.min(
            Math.floor(idx / perDir),
            directions.length - 1
        );
        buckets[directions[dirIndex]].push(item);
    });

    const translateFor = (dir) =>
        ({
            up:    "-translate-y",
            down:  "translate-y",
            left:  "-translate-x",
            right: "translate-x",
        }[dir]);

    /* ---------- Flatten with distances ---------- */
    const renderItems = [];
    Object.entries(buckets).forEach(([dir, list]) => {
        list.forEach((item, idx) => {
            renderItems.push({
                ...item,
                _distance: (idx + 1) * spacing,
                _axis: translateFor(dir),
                _key: item.id ?? `${dir}-${idx}`,
            });
        });
    });

    /*
     * When `open === true`, items are shown & translated.
     * When `open === false`, items rely on `group-hover:*` — so hover works.
     * We express BOTH states with plain utility classes so Tailwind can
     * generate them at build time (arbitrary values inside group-hover:
     * can be flaky depending on the Tailwind version).
     */
    const itemOpacity = open
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto";

    return (
        <nav
            className={`
                group fixed bottom-8 right-8 z-50
                flex h-16 w-16 items-center justify-center
                ${className}
            `}
        >
            {/* FAB */}
            <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                disabled={disabled}
                onClick={() => setOpen((v) => !v)}
                className={`
                    relative z-50 flex h-16 w-16 items-center justify-center
                    rounded-full text-white shadow-xl transition-all duration-300
                    hover:scale-110
                    disabled:cursor-not-allowed disabled:opacity-60
                    ${open ? "scale-110" : ""}
                    ${buttonClassName}
                `}
                style={{ backgroundColor: open ? hoverBgColor : bgColor }}
            >
                <FontAwesomeIcon
                    icon={faPlus}
                    className={`
                        h-8 w-8 transition-transform duration-500 ease-in-out
                        ${open ? "rotate-45" : "group-hover:rotate-45"}
                        ${iconClassName}
                    `}
                />
            </button>

            {/* Items */}
            {renderItems.map((item) => {
                const Icon = item.icon;
                const Wrapper = item.href ? "a" : "button";

                return (
                    <Wrapper
                        key={item._key}
                        {...(item.href
                            ? { href: item.href }
                            : { type: "button", onClick: item.onClick })}
                        aria-label={item.label}
                        title={item.label}
                        style={{ "--dist": `${item._distance}px` }}
                        data-open={open ? "true" : "false"}
                        data-axis={item._axis}
                        className={`
                            menu-item
                            absolute flex flex-col items-center
                            ${itemOpacity}
                            transition-all duration-500
                            ease-[cubic-bezier(0.68,-0.55,0.27,1.555)]
                        `}
                    >
                        <div
                            className="
                                flex h-12 w-12 items-center justify-center
                                rounded-full bg-white shadow-lg
                                transition-all duration-300
                                hover:scale-110 hover:bg-gray-100
                                dark:bg-[#252525] dark:hover:bg-[#333]
                            "
                        >
                            <FontAwesomeIcon
                                icon={Icon}
                                className="
                                    h-5 w-5 text-gray-400
                                    transition-colors duration-300
                                    hover:text-[#3b82f6]
                                "
                            />
                        </div>

                        <span
                            className="
                                mt-1.5 whitespace-nowrap rounded-md
                                bg-black/75 px-2 py-0.5
                                text-[10px] font-semibold leading-tight text-white
                                dark:bg-white/90 dark:text-black
                            "
                        >
                            {item.label}
                        </span>
                    </Wrapper>
                );
            })}

            {/* Scoped CSS for the translate-on-open / translate-on-hover.
                Using raw CSS removes all the Tailwind arbitrary-value
                headaches with `group-hover:` + `[var(--dist)]`. */}
            <style>{`
                .group .menu-item[data-open="true"][data-axis="-translate-y"] {
                    transform: translateY(calc(-1 * var(--dist)));
                }
                .group .menu-item[data-open="true"][data-axis="translate-y"] {
                    transform: translateY(var(--dist));
                }
                .group .menu-item[data-open="true"][data-axis="-translate-x"] {
                    transform: translateX(calc(-1 * var(--dist)));
                }
                .group .menu-item[data-open="true"][data-axis="translate-x"] {
                    transform: translateX(var(--dist));
                }

                .group .menu-item[data-open="false"][data-axis="-translate-y"] {
                    transform: translateY(0);
                }
                .group .menu-item[data-open="false"][data-axis="translate-y"] {
                    transform: translateY(0);
                }
                .group .menu-item[data-open="false"][data-axis="-translate-x"] {
                    transform: translateX(0);
                }
                .group .menu-item[data-open="false"][data-axis="translate-x"] {
                    transform: translateX(0);
                }

                /* Hover — open the menu when the user hovers the FAB area */
                .group:hover .menu-item[data-open="false"][data-axis="-translate-y"] {
                    transform: translateY(calc(-1 * var(--dist)));
                }
                .group:hover .menu-item[data-open="false"][data-axis="translate-y"] {
                    transform: translateY(var(--dist));
                }
                .group:hover .menu-item[data-open="false"][data-axis="-translate-x"] {
                    transform: translateX(calc(-1 * var(--dist)));
                }
                .group:hover .menu-item[data-open="false"][data-axis="translate-x"] {
                    transform: translateX(var(--dist));
                }
            `}</style>
        </nav>
    );
}