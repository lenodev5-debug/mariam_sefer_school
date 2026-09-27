import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/shared/header';
import Sidebar from './components/shared/sidebar';
import CustomHome from './CustemHome';
import Loading from './components/shared/ui/Loading';

import Login from './components/auth/login';
import ProtectedRoute from './components/auth/ProtectedRoute';

import About from './components/pages/About';

import AdminDashboard from './components/components/admin/adminDashboard';
import TeacherDashboard from './components/components/teacher/TeacherDashboard';
import ParentDashboard from './components/components/parent/parentDashboard';
import StudentDashboard from './components/components/student/StudentDashboard';
import AdminUserDashboard from './components/components/admin/AdminUserDashboard';
import AdminStudentsDashboard from './components/components/admin/AdminStudentsDashboard';
import AdminTeachersDashboard from './components/components/admin/AdminTeachersDashboard';
import AdminDepartmentsDashboard from './components/components/admin/AdminDepartmentsDashboard';
import AdminFormDashboard from './components/components/admin/adminFormDashboard';
import AboutHome from './components/pages/about/aboutHome';
import AboutUs from './components/pages/about/aboutUs';
import AboutFuture from './components/pages/about/aboutFuture';
import AboutInspire from './components/pages/about/aboutInspire';
import AboutVideo from './components/pages/about/aboutVideo';
import StartFuture from './components/pages/about/startFuture';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  /*
   * Close sidebar
   */
  useEffect(() => {
    const closeSidebar = () => {
      setSidebarOpen(false);
    };

    window.addEventListener(
      'close-sidebar',
      closeSidebar
    );

    return () => {
      window.removeEventListener(
        'close-sidebar',
        closeSidebar
      );
    };
  }, []);

  /*
   * Application loading
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  /*
   * Show loading screen
   */
  if (loading) {
    return <Loading />;
  }

  return (
    <Routes>

      {/* ========================================= */}
      {/* HOME PAGE */}
      {/* ========================================= */}

      <Route
        path="/"
        element={
          <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

            <Header
              onMenuClick={() =>
                setSidebarOpen(
                  (prev) => !prev
                )
              }
              sidebarOpen={sidebarOpen}
            />

            <Sidebar
              isOpen={sidebarOpen}
            />

            <main
              className="
                min-h-screen
                pl-0
                transition-all
                duration-300
              "
            >
              <CustomHome />
            </main>

          </div>
        }
      />

      {/* ========================================= */}
      {/* LOGIN */}
      {/* ========================================= */}

      <Route
        path="/login"
        element={
          <Login />
        }
      />

      {/* ========================================= */}
      {/* ABOUT */}
      {/* ========================================= */}

      <Route
        path="/about"
        element={
          <>
            <Header />
            <AboutHome />
            <AboutUs />
            <AboutFuture />
            <AboutInspire />
            <AboutVideo />
            <StartFuture />
          </>
        }
      />

      {/* ========================================= */}
      {/* ADMIN DASHBOARD */}
      {/* ========================================= */}

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute
            allowedRoles={['Admin']}
          >
          <div className="min-h-screen bg-gray-50 dark:bg-gray-950 relative">

            <Header
              onMenuClick={() =>
                setSidebarOpen(
                  (prev) => !prev
                )
              }
              sidebarOpen={sidebarOpen}
            />

            <Sidebar
              isOpen={sidebarOpen}
            />
            <AdminDashboard />
          </div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users/manage"
        element={
          <ProtectedRoute
            allowedRoles={['Admin']}
          >
          <div className="min-h-screen bg-gray-50 dark:bg-gray-950 relative">

            <Header
              onMenuClick={() =>
                setSidebarOpen(
                  (prev) => !prev
                )
              }
              sidebarOpen={sidebarOpen}
            />

            <Sidebar
              isOpen={sidebarOpen}
            />
            <AdminUserDashboard />
          </div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/students/manage"
        element={
          <ProtectedRoute
            allowedRoles={['Admin']}
          >
          <div className="min-h-screen bg-gray-50 dark:bg-gray-950 relative">

            <Header
              onMenuClick={() =>
                setSidebarOpen(
                  (prev) => !prev
                )
              }
              sidebarOpen={sidebarOpen}
            />

            <Sidebar
              isOpen={sidebarOpen}
            />
            <AdminStudentsDashboard />
          </div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/teachers/manage"
        element={
          <ProtectedRoute
            allowedRoles={['Admin']}
          >
          <div className="min-h-screen bg-gray-50 dark:bg-gray-950 relative">

            <Header
              onMenuClick={() =>
                setSidebarOpen(
                  (prev) => !prev
                )
              }
              sidebarOpen={sidebarOpen}
            />

            <Sidebar
              isOpen={sidebarOpen}
            />
            <AdminTeachersDashboard />
          </div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/departments/manage"
        element={
          <ProtectedRoute
            allowedRoles={['Admin']}
          >
          <div className="min-h-screen bg-gray-50 dark:bg-gray-950 relative">

            <Header
              onMenuClick={() =>
                setSidebarOpen(
                  (prev) => !prev
                )
              }
              sidebarOpen={sidebarOpen}
            />

            <Sidebar
              isOpen={sidebarOpen}
            />
            <AdminDepartmentsDashboard />
          </div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/forms/manage"
        element={
          <ProtectedRoute
            allowedRoles={['Admin']}
          >
          <div className="min-h-screen bg-gray-50 dark:bg-gray-950 relative">

            <Header
              onMenuClick={() =>
                setSidebarOpen(
                  (prev) => !prev
                )
              }
              sidebarOpen={sidebarOpen}
            />

            <Sidebar
              isOpen={sidebarOpen}
            />
            <AdminFormDashboard />
          </div>
          </ProtectedRoute>
        }
      />

      {/* ========================================= */}
      {/* TEACHER DASHBOARD */}
      {/* ========================================= */}

      <Route
        path="/user/teacher/dashboard"
        element={
          <ProtectedRoute
            allowedRoles={['Teacher']}
          >
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />

      {/* ========================================= */}
      {/* PARENT DASHBOARD */}
      {/* ========================================= */}

      <Route
        path="/user/parent/dashboard"
        element={
          <ProtectedRoute
            allowedRoles={['Parent']}
          >
            <ParentDashboard />
          </ProtectedRoute>
        }
      />

      {/* ========================================= */}
      {/* STUDENT DASHBOARD */}
      {/* ========================================= */}

      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute
            allowedRoles={['Student']}
          >

            <Header
              onMenuClick={() =>
                setSidebarOpen(
                  (prev) => !prev
                )
              }
              sidebarOpen={sidebarOpen}
            />

            <Sidebar
              isOpen={sidebarOpen}
            />           
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;
