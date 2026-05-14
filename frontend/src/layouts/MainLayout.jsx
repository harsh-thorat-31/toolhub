import {
  useState
} from "react";

import Sidebar from "../components/Sidebar";

import MobileNavbar from "../components/MobileNavbar";

function MainLayout({ children }) {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* DESKTOP SIDEBAR */}

      <div className="hidden md:block">

        <Sidebar />

      </div>

      {/* MOBILE SIDEBAR */}

      {
        sidebarOpen && (

          <div className="fixed inset-0 z-50 flex">

            {/* OVERLAY */}

            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setSidebarOpen(false)}
            />

            {/* SIDEBAR */}

            <div className="relative z-50">

              <Sidebar />

            </div>

          </div>
        )
      }

      {/* MAIN CONTENT */}

      <div className="flex-1">

        <MobileNavbar
          setSidebarOpen={setSidebarOpen}
        />

        {children}

      </div>

    </div>
  );
}

export default MainLayout;