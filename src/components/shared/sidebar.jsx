import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0 1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z" />
        </svg>
      ),
    },
    {
      name: "Profile",
      path: "/profile",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z" />
        </svg>
      ),
    },
    {
      name: "Messages",
      path: "/messages",
      badge: 4,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M5 18v3.766l1.515-.909L11.277 18H16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h1zM4 8h12v8h-5.277L7 18.234V16H4V8z" />
          <path d="M20 2H8c-1.103 0-2 .897-2 2h12c1.103 0 2 .897 2 2v8c0 1.103-.897 2-2 2V4c0-1.103-.897-2-2-2z" />
        </svg>
      ),
    },
    {
      name: "About",
      path: "/about",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
      ),
    },
    {
      name: "Settings",
      path: "/settings",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.43 12.98c.04-.32.07-.65.07-.98s-.02-.66-.07-.98l2.11-1.65-2-3.46-2.49 1a7.3 7.3 0 0 0-1.69-.98L15 3h-4l-.36 2.53c-.61.25-1.17.58-1.69.98l-2.49-1-2 3.46 2.11 1.65c-.04.32-.08.65-.08.98s.03.66.08.98l-2.11 1.65 2 3.46 2.49-1c.52.4 1.08.73 1.69.98L11 21h4l.36-2.53c.61-.25 1.17-.58 1.69-.98l2.49 1 2-3.46-2.11-1.65zM13 15.5A3.5 3.5 0 1 1 13 8a3.5 3.5 0 0 1 0 7.5z" />
        </svg>
      ),
    },
  ];

  return (
    <aside
      className={`
        fixed
        left-5
        top-1/2
        z-40
        -translate-y-1/2

        transition-all
        duration-500
        ease-[cubic-bezier(0.4,0,0.2,1)]

        ${
          isOpen
            ? "translate-x-0 opacity-100"
            : "-translate-x-28 opacity-0 pointer-events-none"
        }
      `}
    >
      <div
        className="
          flex
          w-16
          flex-col
          items-center

          rounded-2xl
          border
          border-gray-200/70
          bg-white/70
          p-1.5

          shadow-2xl
          shadow-black/10

          backdrop-blur-2xl

          dark:border-gray-700/60
          dark:bg-gray-900/70
          dark:shadow-black/40
        "
      >
        {/* Navigation */}
        <nav className="flex w-full flex-col gap-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              title={item.name}
              className={({ isActive }) =>
                `
                group
                relative
                flex
                h-12
                w-full
                items-center
                justify-center
                rounded-xl

                transition-all
                duration-300

                ${
                  isActive
                    ? `
                      bg-blue-500/10
                      text-blue-500
                      shadow-md
                      shadow-blue-500/10
                      dark:bg-blue-500/15
                      dark:text-blue-400
                    `
                    : `
                      text-gray-500
                      hover:bg-gray-100/80
                      hover:text-blue-500
                      dark:text-gray-400
                      dark:hover:bg-gray-800/80
                      dark:hover:text-blue-400
                    `
                }
                `
              }
            >
              {({ isActive }) => (
                <>
                  {/* Active indicator */}
                  {isActive && (
                    <span
                      className="
                        absolute
                        -left-2
                        h-6
                        w-1
                        rounded-r-full
                        bg-blue-500
                        shadow-lg
                        shadow-blue-500/40
                      "
                    />
                  )}

                  {/* Icon */}
                  <span
                    className="
                      h-6
                      w-6
                      transition-all
                      duration-300
                      group-hover:scale-110
                    "
                  >
                    {item.icon}
                  </span>

                  {/* Badge */}
                  {item.badge && (
                    <span
                      className="
                        absolute
                        right-0.5
                        top-0.5
                        flex
                        h-4
                        min-w-4
                        items-center
                        justify-center
                        rounded-full
                        bg-red-500
                        px-1
                        text-[9px]
                        font-bold
                        text-white
                        ring-2
                        ring-white
                        dark:ring-gray-900
                      "
                    >
                      {item.badge}
                    </span>
                  )}

                  {/* Tooltip */}
                  <span
                    className="
                      pointer-events-none
                      absolute
                      left-16
                      hidden
                      whitespace-nowrap
                      rounded-lg
                      bg-gray-900
                      px-3
                      py-2
                      text-xs
                      font-medium
                      text-white
                      shadow-xl
                      group-hover:block
                      dark:bg-white
                      dark:text-gray-900
                    "
                  >
                    {item.name}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;