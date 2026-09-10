import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/shared/header';
import Sidebar from './components/shared/sidebar';
import CustomHome from './CustemHome';
import Loading from './components/ui/Loading';
import Login from './components/auth/login';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const closeSidebar = () => setSidebarOpen(false);
    window.addEventListener('close-sidebar', closeSidebar);
    return () => {
      window.removeEventListener('close-sidebar', closeSidebar);
    };
  }, []);

  // loading state
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [])

  if (loading) return <Loading />

  return (
    <Routes>
      {/* Home page routes */}
      <Route path='/' element={
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
          <Header onMenuClick={() => setSidebarOpen(prev => !prev)} sidebarOpen={sidebarOpen} />

          <Sidebar isOpen={sidebarOpen} />

          <main
            className="
            min-h-screen
            pl-0
            transition-all duration-300
            "
            >
            {/* Remove p-6 padding */}
            <CustomHome />
          </main>
        </div>
            }
          />
          
          {/* login authenticate route */}
          <Route path='/login' 
            element={
              <Login />
            }
          />
    </Routes>
  );
}

export default App;
