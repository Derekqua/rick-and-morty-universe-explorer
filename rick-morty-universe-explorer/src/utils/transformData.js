export function groupByOrigin(characters) {
    
    const counts = {};

    characters.forEach(c => {
        const origin = c.origin?.name || "Unknown";

        if (!counts[origin]) {
        counts[origin] = 0;
        }

        counts[origin]++;

    });

    return Object.entries(counts).map(([origin, count]) => ({
        origin,
        count
    }));
}