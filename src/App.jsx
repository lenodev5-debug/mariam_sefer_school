import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import Header from "./components/shared/header";
import Sidebar from "./components/shared/sidebar";
import SectionTimeline from "./CustemHome";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const closeSidebar = () => setSidebarOpen(false);
    window.addEventListener("close-sidebar", closeSidebar);
    return () => {
      window.removeEventListener("close-sidebar", closeSidebar);
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Header
          onMenuClick={() => setSidebarOpen((prev) => !prev)}
          sidebarOpen={sidebarOpen}
        />

        <Sidebar isOpen={sidebarOpen} />

        <main
          className="
            min-h-screen
            pl-0
            transition-all duration-300
          "
        >
          {/* Remove p-6 padding */}
          <SectionTimeline />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;