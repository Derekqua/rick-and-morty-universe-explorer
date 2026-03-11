"use client";

import { useState, useEffect, useMemo } from "react";
import useCharacters from "@/hooks/useCharacters";
import Chart from "@/components/Chart";
import CharacterList from "@/components/CharacterList";
import SearchBar from "@/components/SearchBar";
import Filters from "@/components/Filters";

export default function Home() {
  const [page, setPage]     = useState(1);
  const [search, setSearch] = useState("");
  const [apiSearch, setApiSearch] = useState("");

  const [species, setSpecies] = useState("");
  const [status,  setStatus]  = useState("");
  const [gender,  setGender]  = useState("");

  // Single useEffect: debounce search AND reset page together
  useEffect(() => {
    const t = setTimeout(() => {
      setApiSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [search]);

  const { characters, loading, error, hasMore, totalCount } = useCharacters(page, apiSearch);

  const filtered = useMemo(() => {
    let result = characters;
    if (species) result = result.filter(c => c.species === species);
    if (status)  result = result.filter(c => c.status  === status);
    if (gender)  result = result.filter(c => c.gender  === gender);
    return result;
  }, [characters, species, status, gender]);

  if (loading && characters.length === 0) return <p className="p-10">Loading characters...</p>;
  if (error) return <p className="p-10 text-red-500">{error}</p>;

  return (
    <main className="p-10 max-w-7xl mx-auto">

      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Rick & Morty Universe Explorer</h1>
        <p className="text-gray-400 text-sm mt-1">Explore characters from the Rick and Morty series</p>
      </div>

      <SearchBar search={search} setSearch={setSearch} totalCount={totalCount} />

      <Filters
        characters={characters}
        species={species} setSpecies={setSpecies}
        status={status}   setStatus={setStatus}
        gender={gender}   setGender={setGender}
      />

      {/* Charts — based on currently loaded characters only */}
      {filtered.length > 0 && (
        <section className="mt-16">
          <p className="text-sm text-gray-400 mb-6">Based on {filtered.length} loaded characters — load more to update charts</p>
          <Chart characters={filtered} />
        </section>
      )}

      <CharacterList characters={filtered} />

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setPage(prev => prev + 1)}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </main>
  );
}
