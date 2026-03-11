import { useMemo } from "react";

export default function Filters({ characters, species, setSpecies, status, setStatus, gender, setGender }) {
  const speciesOptions = useMemo(
    () => Array.from(new Set(characters.map(c => c.species))).sort(),
    [characters]
  );
  
  function clearAll() {
    setSpecies("");
    setStatus("");
    setGender("");
  }

  return (
    <div className="flex gap-4 mt-4">
      <select value={species} onChange={e => setSpecies(e.target.value)} className="border p-2 rounded">
        <option value="">All Species</option>
        {speciesOptions.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <select value={status} onChange={e => setStatus(e.target.value)} className="border p-2 rounded">
        <option value="">All Status</option>
        <option value="Alive">Alive</option>
        <option value="Dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>

      <select value={gender} onChange={e => setGender(e.target.value)} className="border p-2 rounded">
        <option value="">All Genders</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Genderless">Genderless</option>
        <option value="unknown">Unknown</option>
      </select>

      <button onClick={clearAll} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Clear Filter</button>
    </div>
  );
}
