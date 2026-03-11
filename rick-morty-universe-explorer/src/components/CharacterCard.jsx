const STATUS_STYLES = {
  Alive:   { dot: "bg-green-400", text: "text-green-400" },
  Dead:    { dot: "bg-red-400",   text: "text-red-400"   },
  unknown: { dot: "bg-gray-500",  text: "text-gray-500"  },
};

export default function CharacterCard({ character }) {
  const status = STATUS_STYLES[character.status] ?? STATUS_STYLES.unknown;

  return (
    <div className="bg-white border border-gray-800 rounded-xl overflow-hidden hover:border-gray-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">

      {/* Image */}
      <div className="relative">
        <img
          src={character.image}
          alt={character.name}
          className="w-full aspect-square object-cover"
        />
        {/* Status badge */}
        <div className={`absolute top-2 right-2 flex items-center gap-1.5 bg-gray-900/80 backdrop-blur-sm px-2.5 py-1 rounded-full ${status.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
          <span className="text-xs font-medium">{character.status}</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h2 className="font-semibold text-gray-900 text-sm truncate mb-3">
          {character.name}
        </h2>

        <div className="space-y-1.5">
          <Row label="Species"  value={character.species} />
          <Row label="Origin"   value={character.origin.name} />
          <Row label="Location" value={character.location.name} />
        </div>
      </div>

    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-2 text-xs">
      <span className="text-gray-900 shrink-0">{label}</span>
      <span className="text-gray-600 truncate text-right">{value}</span>
    </div>
  );
}
