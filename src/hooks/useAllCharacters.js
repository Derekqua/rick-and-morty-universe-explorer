"use client";

import { useEffect, useState } from "react";
import { fetchAllCharacters } from "@/lib/api";

export default function useAllCharacters() {
  const [allCharacters, setAllCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllCharacters().then(({ data, error }) => {
      if (error) setError(error);
      else setAllCharacters(data);
      setLoading(false);
    });
  }, []);

  return { allCharacters, loading, error };
}
