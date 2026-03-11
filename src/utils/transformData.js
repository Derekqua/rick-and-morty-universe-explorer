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

export function groupByOrigin(characters, limit = 12) {
  return groupBy(characters, c => c.origin?.name, limit);
}

export function groupByLocation(characters, limit = 12) {
  return groupBy(characters, c => c.location?.name, limit);
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
