import {
  Menu
} from "lucide-react";

function MobileNavbar({ setSidebarOpen }) {

  return (
    <div className="md:hidden bg-black text-white p-4 flex items-center justify-between">

      <h1 className="text-2xl font-bold">
        ToolHub
      </h1>

      <button
        onClick={() => setSidebarOpen(true)}
      >

        <Menu size={28} />

      </button>

    </div>
  );
}

export default MobileNavbar;