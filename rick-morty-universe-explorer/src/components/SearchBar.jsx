export default function SearchBar({ search, setSearch, totalCount }) {
  return (
    <div className="mb-4">

      <div className="relative">
        {/* Search icon */}
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
        </svg>

        <input
          type="text"
          placeholder="Search all characters globally..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="
            w-full border border-gray-300 rounded-full
            pl-11 pr-10 py-2.5
            text-sm text-gray-800 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent
            transition-all duration-150
          "
        />

        {/* Clear button */}
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Result count */}
      {search && (
        <p className="text-xs text-gray-400 mt-2 ml-2">
          {totalCount > 0 ? `${totalCount} results found` : "No characters found"}
        </p>
      )}

    </div>
  );
}
