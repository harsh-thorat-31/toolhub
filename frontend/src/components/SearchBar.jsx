function SearchBar({ search, setSearch }) {

  return (
    <input
      type="text"
      placeholder="Search tools..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-black"
    />
  );
}

export default SearchBar;