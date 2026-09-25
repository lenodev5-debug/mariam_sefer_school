import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isOpen }) => {
  const { user } = useAuth();

  /*
   * ============================================================
   * COMMON MENU ITEMS
   * ============================================================
   */

  const commonItems = [
    {
      name: 'Messages',
      path: '/messages',
      badge: 4,
      icon: (
        <svg viewBox="0 0 24 24" fill="blue">
          <path d="M5 18v3.766l1.515-.909L11.277 18H16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h1zM4 8h12v8h-5.277L7 18.234V16H4V8z" />
          <path d="M20 2H8c-1.103 0-2 .897-2 2h12c1.103 0 2 .897 2 2v8c0 1.103-.897 2-2 2V4c0-1.103-.897-2-2-2z" />
        </svg>
      ),
    },

    {
      name: 'About',
      path: '/about',
      icon: (
        <svg viewBox="0 0 24 24" fill="blue">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
      ),
    },

    {
      name: 'Settings',
      path: '/settings',
      icon: (
        <svg viewBox="0 0 24 24" fill="blue">
          <path d="M19.43 12.98c.04-.32.07-.65.07-.98s-.02-.66-.07-.98l2.11-1.65-2-3.46-2.49 1a7.3 7.3 0 0 0-1.69-.98L15 3h-4l-.36 2.53c-.61.25-1.17.58-1.69.98l-2.49-1-2 3.46 2.11 1.65c-.04.32-.08.65-.08.98s.03.66.08.98l-2.11 1.65 2 3.46 2.49-1c.52.4 1.08.73 1.69.98L11 21h4l.36-2.53c.61-.25 1.17-.58 1.69-.98l2.49 1 2.49 1 2.11-1.65zM13 15.5A3.5 3.5 0 1 1 13 8a3.5 3.5 0 0 1 0 7.5z" />
        </svg>
      ),
    },
  ];

  /*
   * ============================================================
   * ROLE-SPECIFIC MENU ITEMS
   * ============================================================
   */

  const roleMenus = {
    Admin: [
      {
        name: 'Dashboard',
        path: '/admin/dashboard',
        icon: (
          <svg viewBox="0 0 24 24" fill="blue">
            <path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0 1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z" />
          </svg>
        ),
      },

      {
        name: 'Users',
        path: '/admin/users/manage',
        icon: (
          <svg viewBox="0 0 24 24" fill="blue">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zM8 11c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.93 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
          </svg>
        ),
      },

      {
        name: 'Students',
        path: '/admin/students/manage',
        icon: (
          <svg viewBox="0 0 24 24" fill="blue">
            <path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3zm0 9.82L5.74 9 12 5.18 18.26 9 12 12.82zM5 12.5V17c0 2.21 3.13 4 7 4s7-1.79 7-4v-4.5l-7 3.82-7-3.82z" />
          </svg>
        ),
      },

      {
        name: 'Teachers',
        path: '/admin/teachers/manage',
        icon: (
          <svg viewBox="0 0 24 24" fill="blue">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        ),
      },

      {
        name: 'Departments',
        path: '/admin/departments/manage',
        icon: (
          <svg viewBox="0 0 24 24" fill="blue">
            <path d="M9 2h6a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm0 13h5a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1zm9 0h3a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1zM3 15h3a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1zm9-5.5a.75.75 0 0 1 .75.75V12h5.5a.75.75 0 0 1 0 1.5H5.75a.75.75 0 0 1 0-1.5H11V10.25A.75.75 0 0 1 11.75 9.5z"/>
          </svg>
        ),
      },

      {
        name: 'Forms',
        path: '/admin/forms/manage',
        icon: (
            <svg viewBox="0 0 24 24" fill="blue">
              <path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm1 4a1 1 0 0 0 0 2h10a1 1 0 0 0 0-2H7zm0 4a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2H7zm7 0a1 1 0 0 0 0 2h3a1 1 0 0 0 0-2h-3zM7 14a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2H7zm7 0a1 1 0 0 0 0 2h3a1 1 0 0 0 0-2h-3zM7 18a1 1 0 0 0 0 2h10a1 1 0 0 0 0-2H7z"/>
            </svg>
        ),
      },
    ],

    // teachers

    Teacher: [
      {
        name: 'Dashboard',
        path: '/teacher/dashboard',
        icon: (
            <svg viewBox="0 0 24 24" fill="blue">
              <path d="M9 2h6a1 1 0 0 1 1 1v1h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2V3a1 1 0 0 1 1-1zm-1 8a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2H8zm0 4a1 1 0 0 0 0 2h5a1 1 0 0 0 0-2H8z"/>
            </svg>
        ),
      },

      {
        name: 'Students',
        path: '/teacher/students',
        icon: (
          <svg viewBox="0 0 24 24" fill="blue">
            <path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3zm0 9.82L5.74 9 12 5.18 18.26 9 12 12.82zM5 12.5V17c0 2.21 3.13 4 7 4s7-1.79 7-4v-4.5l-7 3.82-7-3.82z" />
          </svg>
        ),
      },

      {
        name: 'Attendance',
        path: '/teacher/attendance',
        icon: (
          <svg viewBox="0 0 24 24" fill="blue">
            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H5V8h14v13zM7 10h5v5H7v-5z" />
          </svg>
        ),
      },

      {
        name: 'Results',
        path: '/teacher/results',
        icon: (
          <svg viewBox="0 0 24 24" fill="blue">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z" />
          </svg>
        ),
      },
    ],

    // students

    Student: [
      {
        name: 'Dashboard',
        path: '/student/dashboard',
        icon: (
          <svg viewBox="0 0 24 24" fill="blue">
            <path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm10 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7z" />
          </svg>
        ),
      },

      {
        name: 'Courses',
        path: '/student/courses',
        icon: (
          <svg viewBox="0 0 24 24" fill="blue">
            <path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3z" />
          </svg>
        ),
      },

      {
        name: 'Results',
        path: '/student/results',
        icon: (
          <svg viewBox="0 0 24 24" fill="blue">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
          </svg>
        ),
      },
    ],

    Parent: [
      {
        name: 'Dashboard',
        path: '/parent/dashboard',
        icon: (
          <svg viewBox="0 0 24 24" fill="blue">
            <path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1z" />
          </svg>
        ),
      },

      {
        name: 'My Children',
        path: '/parent/students',
        icon: (
          <svg viewBox="0 0 24 24" fill="blue">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        ),
      },

      {
        name: 'Documents',
        path: '/parent/documents',
        icon: (
          <svg viewBox="0 0 24 24" fill="blue">
            <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm1 7V3.5L18.5 9H15z" />
          </svg>
        ),
      },
    ],
  };

  /*
   * ============================================================
   * GET MENU FOR CURRENT USER
   * ============================================================
   */

  const role = user?.role;

  const roleItems = roleMenus[role] || [];

  /*
   * Add common items after role-specific items
   */
  const menuItems = [
    ...roleItems,
    ...commonItems,
  ];

  /*
   * ============================================================
   * SIDEBAR
   * ============================================================
   */

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
        ease-in-out

        ${
          isOpen
            ? 'translate-x-0 opacity-100'
            : '-translate-x-28 opacity-0 pointer-events-none'
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
          p-1.5

          shadow-2xl
          shadow-black/10

          backdrop-blur-4xl

          dark:border-gray-700/60
          dark:shadow-black/40
        "
      >
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