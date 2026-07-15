import { Link } from "react-router-dom";

function Navbar(){

    return(
        <nav className="bg-black text-white px-8 py-4 flex justify-between items-center">

      <Link to="/">
        <h1 className="text-2xl font-bold cursor-pointer hover:text-gray-300 transition">
          ToolHub
        </h1> 
      </Link>

      <div className="flex gap-5">
        <button className="hover:text-gray-300">
          Home
        </button>

        <button className="hover:text-gray-300">
          Tools
        </button>
      </div>

    </nav>
    );
}

export default Navbar;