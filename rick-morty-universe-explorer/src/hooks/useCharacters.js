"use client";

import { useEffect, useState } from "react";
import { fetchCharacters } from "@/lib/api";

export default function useCharacters(page) {

    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        async function loadCharacters() {

        setLoading(true);
        setError(null);

        const result = await fetchCharacters(page);

        if (result.error) {
            setError(result.error);
        } else {
            setCharacters(prev => [...prev, ...(result.data.results || [])]);
        }

        setLoading(false);
        }

        loadCharacters();

    }, [page]);

    return { characters, loading, error };
}