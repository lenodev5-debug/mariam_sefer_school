import { useEffect, useState } from 'react';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../context/usetheme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

import { getUser, hasToken } from '../../../lib/tokens/token';

function Header({ onMenuClick, sidebarOpen }) {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (hasToken()) {
      setUser(getUser());
    } else {
      setUser(null);
    }
  }, []);

  const handleProfileClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    switch (user.role) {
      case 'Admin':
        navigate('/admin/dashboard');
        break;

      case 'Teacher':
        navigate('/teacher/dashboard');
        break;

      case 'Parent':
        navigate('/parent/dashboard');
        break;

      case 'Student':
        navigate('/student/dashboard');
        break;

      case 'Librarian':
        navigate('/librarian/dashboard');
        break;

      default:
        break;
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className="
          flex
          h-16
          items-center
          justify-between
          border-b
          border-[#e0e0e0]
          px-4
          backdrop-blur-xl
          bg-white/70
          dark:border-[#2a2a2a]
          dark:bg-[#1a1a1a]/70
        "
      >

        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            {/* Menu */}
            <button
              onClick={onMenuClick}
              type="button"
              aria-label="Toggle sidebar"
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                text-[#1a1a1a]
                transition-all
                duration-300
                hover:bg-[#f0f0f0]
                hover:text-[#50A2FF]
                dark:text-[#d1d1d1]
                dark:hover:bg-[#2a2a2a]
                dark:hover:text-[#50A2FF]
              "
            >
              <svg
                className={`
                  h-5
                  w-5
                  transition-transform
                  duration-300
                  ease-in-out
                  ${sidebarOpen ? 'rotate-90' : 'rotate-0'}
                `}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {sidebarOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* SchoolHub */}
          <div className="flex items-center gap-2">
            <span
              className="
                hidden
                text-lg
                font-bold
                tracking-tight
                text-[#1a1a1a]
                sm:block
                dark:text-white
              "
              style={{ fontFamily: 'news' }}
            >
              <span className="overline decoration-solid decoration-4">
                {' '}
                <span
                  className="underline decoration-solid decoration-4 mr-2"
                  style={{ fontFamily: 'news' }}
                >
                  St
                </span>
              </span>
              Theresa
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden items-center gap-1 md:flex">

          <a
            href="/"
            className="
              rounded-lg
              px-3
              py-2
              text-sm
              font-medium
              text-[#1a1a1a]
              transition
              hover:bg-[#f0f0f0]
              hover:text-[#50A2FF]
              dark:text-[#d1d1d1]
              dark:hover:bg-[#2a2a2a]
              dark:hover:text-[#50A2FF]
            "
          >
            Home
          </a>

          <a
            href="/about"
            className="
              rounded-lg
              px-3
              py-2
              text-sm
              font-medium
              text-[#1a1a1a]
              transition
              hover:bg-[#f0f0f0]
              hover:text-[#50A2FF]
              dark:text-[#d1d1d1]
              dark:hover:bg-[#2a2a2a]
              dark:hover:text-[#50A2FF]
            "
          >
            About
          </a>

          <a
            href="/news"
            className="
              rounded-lg
              px-3
              py-2
              text-sm
              font-medium
              text-[#1a1a1a]
              transition
              hover:bg-[#f0f0f0]
              hover:text-[#50A2FF]
              dark:text-[#d1d1d1]
              dark:hover:bg-[#2a2a2a]
              dark:hover:text-[#50A2FF]
            "
          >
            News
          </a>

          <a
            href="/books"
            className="
              rounded-lg
              px-3
              py-2
              text-sm
              font-medium
              text-[#1a1a1a]
              transition
              hover:bg-[#f0f0f0]
              hover:text-[#50A2FF]
              dark:text-[#d1d1d1]
              dark:hover:bg-[#2a2a2a]
              dark:hover:text-[#50A2FF]
            "
          >
            Books
          </a>

          <a
            href="/contact"
            className="
              rounded-lg
              px-3
              py-2
              text-sm
              font-medium
              text-[#1a1a1a]
              transition
              hover:bg-[#f0f0f0]
              hover:text-[#50A2FF]
              dark:text-[#d1d1d1]
              dark:hover:bg-[#2a2a2a]
              dark:hover:text-[#50A2FF]
            "
          >
            Contact
          </a>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2">

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            type="button"
            aria-label="Toggle dark mode"
            className="
              relative
              h-10
              w-17.5
              rounded-full
              border
              border-[#e0e0e0]
              bg-[#f5f5f5]
              p-1
              shadow-inner
              transition-all
              duration-300
              hover:shadow-md
              dark:border-[#3a3a3a]
              dark:bg-[#222222]
            "
          >
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                flex
                items-center
                justify-between
                px-2.5
                text-xs
              "
            >
              <FontAwesomeIcon
                icon={faSun}
                className={`
                  h-3.5
                  w-3.5
                  transition-colors
                  duration-300
                  ${
                    theme === 'dark'
                      ? 'text-[#666]'
                      : 'text-yellow-500'
                  }
                `}
              />

              <FontAwesomeIcon
                icon={faMoon}
                className={`
                  h-3.5
                  w-3.5
                  transition-colors
                  duration-300
                  ${
                    theme === 'dark'
                      ? 'text-blue-300'
                      : 'text-[#999]'
                  }
                `}
              />
            </div>

            <span
              className={`
                relative
                z-10
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-white
                shadow-md
                transition-transform
                duration-300
                ease-in-out
                dark:bg-[#1a1a1a]
                ${
                  theme === 'dark'
                    ? 'translate-x-7.5'
                    : 'translate-x-0'
                }
              `}
            >
              <FontAwesomeIcon
                icon={theme === 'dark' ? faMoon : faSun}
                className={`
                  h-3.5
                  w-3.5
                  transition-colors
                  duration-300
                  ${
                    theme === 'dark'
                      ? 'text-blue-400'
                      : 'text-yellow-500'
                  }
                `}
              />
            </span>
          </button>

          {/* Profile / Sign In */}
          {user ? (
            <button
              onClick={handleProfileClick}
              type="button"
              aria-label="Profile"
              title={`${user.name} - ${user.role}`}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-linear-to-br
                from-indigo-500
                to-purple-600
                text-sm
                font-bold
                text-white
                ring-2
                ring-indigo-500/20
                ring-offset-2
                ring-offset-[#f5f5f5]
                transition-all
                duration-300
                hover:scale-105
                hover:ring-indigo-500/50
                dark:ring-indigo-400/20
                dark:ring-offset-[#0f0f0f]
              "
            >
              {user.name?.charAt(0).toUpperCase()}
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              type="button"
              className="
                rounded-xl
                bg-[#1a1a1a]
                px-4
                py-2
                text-sm
                font-medium
                text-white
                transition-all
                duration-300
                hover:bg-[#50A2FF]
                dark:bg-white
                dark:text-[#1a1a1a]
                dark:hover:bg-[#50A2FF]
                dark:hover:text-white
              "
            >
              Sign In
            </button>
          )}

        </div>
      </div>
    </header>
  );
}

export default Header;