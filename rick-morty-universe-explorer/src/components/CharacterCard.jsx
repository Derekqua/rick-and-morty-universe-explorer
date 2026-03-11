export default function CharacterCard({ character }) {

    return (
        <div className="bg-white shadow rounded-lg p-4">

        <img
            src={character.image}
            alt={character.name}
            className="w-full rounded"
        />

        <h2 className="font-bold mt-2">{character.name}</h2>

        <p>Species: {character.species}</p>
        <p>Status: {character.status}</p>
        <p>Origin: {character.origin.name}</p>
        <p>Location: {character.location.name}</p>

        </div>
    );

}