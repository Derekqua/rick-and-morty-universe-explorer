"use client";
import useAllCharacters from "@/hooks/useAllCharacters";
import Chart from "@/components/Chart";

export default function Dashboard() {
  const { allCharacters, loading } = useAllCharacters();

  if (loading) return <p className="p-10">Loading charts...</p>;

  return (
    <main className="p-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
      <Chart characters={allCharacters} />
    </main>
  );
}