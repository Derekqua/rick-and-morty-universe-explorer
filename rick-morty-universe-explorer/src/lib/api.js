const BASE_URL = "https://rickandmortyapi.com/api";

export async function fetchCharacters(page = 1, search = "") {
  try {
    const params = new URLSearchParams({ page });
    if (search.trim()) params.set("name", search.trim());

    const res = await fetch(`${BASE_URL}/character?${params}`);

    if (res.status === 404) {
      return { data: { results: [], info: { pages: 0, count: 0 } }, error: null };
    }

    if (!res.ok) throw new Error("Network response was not ok");

    const data = await res.json();
    
    return { data, error: null };

  } catch (error) {
    console.error("API Error:", error);
    return { data: null, error: "Failed to fetch characters" };
  }
}

export async function fetchAllCharacters() {
  try {
    const first = await fetch(`${BASE_URL}/character`).then(r => r.json());
    const totalPages = first.info?.pages ?? 1;
    const results = [...(first.results ?? [])];

    const requests = [];
    for (let p = 2; p <= totalPages; p++) {
      requests.push(fetch(`${BASE_URL}/character?page=${p}`).then(r => r.json()));
    }

    const pages = await Promise.all(requests);
    pages.forEach(page => results.push(...(page.results ?? [])));

    return { data: results, error: null };
  } catch (err) {
    return { data: [], error: "Failed to load full dataset." };
  }
}