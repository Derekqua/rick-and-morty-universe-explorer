const BASE_URL = "https://rickandmortyapi.com/api";

export async function fetchCharacters(page = 1) {
  try {
    console.log("page" + page);
    const res = await fetch(`${BASE_URL}/character?page=${page}`);

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();
    
    return { data, error: null };

  } catch (error) {
    console.error("API Error:", error);
    return { data: null, error: "Failed to fetch characters" };
  }
}