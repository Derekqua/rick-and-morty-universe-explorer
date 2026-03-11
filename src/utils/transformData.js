function groupBy(characters, keyFn, limit = Infinity) {
  const counts = {};
  characters.forEach(c => {
    const key = keyFn(c) || "Unknown";
    counts[key] = (counts[key] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export function groupBySpecies(characters) {
  return groupBy(characters, c => c.species);
}

export function groupByStatus(characters) {
  return groupBy(characters, c => c.status);
}

export function groupByGender(characters) {
  return groupBy(characters, c => c.gender);
}

export function getSummaryStats(characters) {
  const total = characters.length;
  const alive = characters.filter(c => c.status === "Alive").length;
  return {
    total,
    alive,
    alivePercent: total ? Math.round((alive / total) * 100) : 0,
    uniqueOrigins: new Set(characters.map(c => c.origin?.name)).size,
    uniqueSpecies: new Set(characters.map(c => c.species)).size,
  };
}

export function getDisplacementBySpecies(characters, limit = 8) {
  const map = {};

  characters.forEach(c => {
    const origin   = c.origin?.name;
    const location = c.location?.name;
    const species  = c.species || "Unknown";

    if (!origin || !location) return;
    if (origin === "unknown" || location === "unknown") return;

    if (!map[species]) map[species] = { name: species, displaced: 0, atHome: 0 };

    if (origin !== location) map[species].displaced++;
    else map[species].atHome++;
  });

  return Object.values(map)
    .filter(d => d.displaced + d.atHome > 0)
    .sort((a, b) => (b.displaced + b.atHome) - (a.displaced + a.atHome))
    .slice(0, limit);
}
