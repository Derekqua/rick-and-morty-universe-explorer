"use client";

import { useEffect, useState } from "react";
import { fetchCharacters } from "@/lib/api";

export default function useCharacters(page, search) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      const result = await fetchCharacters(page, search);

      if (cancelled) return;

      if (result.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      const { results = [], info = {} } = result.data;

      // page 1 = new search, replace list. page > 1 = load more, append
      setCharacters(prev => (page === 1 ? results : [...prev, ...results]));
      setHasMore(page < (info.pages ?? 0));
      setTotalCount(info.count ?? 0);
      setLoading(false);
    }

    load();

    return () => { cancelled = true; };
  }, [page, search]);

  return { characters, loading, error, hasMore, totalCount };
}
