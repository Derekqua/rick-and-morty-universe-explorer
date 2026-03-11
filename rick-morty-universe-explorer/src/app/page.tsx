"use client";

import { useState } from "react";
import useCharacters from "@/hooks/useCharacters";
import CharacterList from "@/components/CharacterList";
import SearchBar from "@/components/SearchBar";
import Filters from "@/components/Filters";
import OriginChart from "@/components/OriginChart";
import { groupByOrigin } from "@/utils/transformData";

interface Character {
  name: string;
  status: string;
  species: string;
  gender: string;
  location: { name: string };
  origin: { name: string };
  image: string;
}

export default function Home() {

  const [page, setPage] = useState(1);

  const { characters, loading, error } = useCharacters(page);

  const [search, setSearch] = useState("");
  const [species, setSpecies] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");

  let filtered = characters as Character[];

  if (search) {
    filtered = filtered.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (species) filtered = filtered.filter(c => c.species === species);
  if (status) filtered = filtered.filter(c => c.status === status);
  if (gender) filtered = filtered.filter(c => c.gender === gender);


  const chartData = groupByOrigin(filtered);

  if (loading) {
    return <p className="p-10">Loading characters...</p>;
  }

  if (error) {
    return <p className="p-10 text-red-500">{error}</p>;
  }

  return (

    <main className="p-10 max-w-6xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Rick & Morty Universe Explorer
      </h1>

      <SearchBar search={search} setSearch={setSearch} />

      <Filters
        characters={characters}
        species={species}
        setSpecies={setSpecies}
        status={status}
        setStatus={setStatus}
        gender={gender}
        setGender={setGender}
      />

      <OriginChart data={chartData} />

      <CharacterList characters={filtered}/>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => setPage(prev => prev + 1)}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Load More
        </button>
      </div>
    </main>

  );
}
