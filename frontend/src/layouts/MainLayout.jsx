import {
  useState,
  useContext
} from "react";

import Sidebar from "../components/Sidebar";
import MobileNavbar from "../components/MobileNavbar";
import { AuthContext } from "../context/AuthContext";

function MainLayout({ children }) {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {children}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* DESKTOP SIDEBAR */}

      <div className="hidden md:block">

        <Sidebar setSidebarOpen={setSidebarOpen} />

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

              <Sidebar setSidebarOpen={setSidebarOpen} />

            </div>

          </div>
        )
      }

      {/* MAIN CONTENT */}

      <div className="flex-1 flex flex-col min-h-screen">

        <MobileNavbar
          setSidebarOpen={setSidebarOpen}
        />

        <div className="flex-1 flex flex-col">
          {children}
        </div>

      </div>

    </div>
  );
}

export default MainLayout;