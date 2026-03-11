import CharacterCard from "@/components/CharacterCard";

export default function CharacterList({ characters }) {
  if (characters.length === 0) {
    return <p className="mt-6">No characters found.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      {characters.map(c => (
        <CharacterCard key={c.id} character={c} />
      ))}
    </div>
  );
}
