function Navbar(){

    return(
        <nav className="bg-black text-white px-8 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold">
        ToolHub
      </h1>

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