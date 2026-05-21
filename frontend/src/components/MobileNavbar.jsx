import { Menu } from "lucide-react";

import { Link } from "react-router-dom"

function MobileNavbar({ setSidebarOpen }) {
  return (
    <div className="md:hidden bg-black text-white p-4 flex items-center gap-3">

      <button onClick={() => setSidebarOpen(true)} className="flex items-center">
        <Menu size={28} />
      </button>

      <Link to="/">
        <h1 className="text-2xl font-bold cursor-pointer hover:text-gray-300 transition">
        ToolHub
        </h1> 
      </Link>

    </div>
  );
}

export default MobileNavbar;