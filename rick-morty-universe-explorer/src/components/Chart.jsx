"use client";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import {
  groupByOrigin, groupByLocation, groupBySpecies,
  groupByStatus, groupByGender, getSummaryStats,
} from "@/utils/transformData";

const STATUS_COLORS = { Alive: "#22c55e", Dead: "#ef4444", unknown: "#9ca3af" };
const PIE_COLORS = ["#6366f1", "#f59e0b", "#10b981", "#3b82f6", "#ec4899", "#14b8a6"];

export default function OriginChart({ characters }) {
  if (!characters.length) return null;

  const stats      = getSummaryStats(characters);
  const origins    = groupByOrigin(characters, 12);
  const locations  = groupByLocation(characters, 12);
  const species    = groupBySpecies(characters);
  const statuses   = groupByStatus(characters);
  const genders    = groupByGender(characters);

  return (
    <div className="mt-10 space-y-10">

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Characters", value: stats.total },
          { label: "Alive", value: `${stats.alive} (${stats.alivePercent}%)` },
          { label: "Unique Origins", value: stats.uniqueOrigins },
          { label: "Unique Species", value: stats.uniqueSpecies },
        ].map(({ label, value }) => (
          <div key={label} className="border rounded-lg p-4 text-center">
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Origins bar chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
        <h2 className="text-xl font-bold mb-4">Characters by Origin (Top 12)</h2>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={origins} layout="vertical" margin={{ left: 10, right: 20 }}>
            <XAxis type="number" />
            <YAxis
              type="category" dataKey="name" width={160}
              tickFormatter={v => v.length > 22 ? v.slice(0, 20) + "…" : v}
            />
            <Tooltip />
            <Bar dataKey="count" name="Characters" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Current locations bar chart */}
      <div>
        <h2 className="text-xl font-bold mb-4">Characters by Current Location (Top 12)</h2>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={locations} layout="vertical" margin={{ left: 10, right: 20 }}>
            <XAxis type="number" />
            <YAxis
              type="category" dataKey="name" width={160}
              tickFormatter={v => v.length > 22 ? v.slice(0, 20) + "…" : v}
            />
            <Tooltip />
            <Bar dataKey="count" name="Characters" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      </div>

      {/* Species + Status + Gender row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Species */}
        <div className="md:col-span-1">
          <h2 className="text-xl font-bold mb-4">Species Breakdown</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={species} layout="vertical">
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={100} />
              <Tooltip />
              <Bar dataKey="count" name="Characters" fill="#a855f7" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Status */}
        <div>
          <h2 className="text-xl font-bold mb-4">Status Distribution</h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={statuses} dataKey="count" nameKey="name" cx="50%" cy="50%"
                outerRadius={90} label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
              >
                {statuses.map(entry => (
                  <Cell key={entry.name} fill={STATUS_COLORS[entry.name] ?? "#9ca3af"} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Gender */}
        <div>
          <h2 className="text-xl font-bold mb-4">Gender Distribution</h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={genders} dataKey="count" nameKey="name" cx="50%" cy="50%"
                outerRadius={90} label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
              >
                {genders.map((entry, i) => (
                  <Cell key={entry.name} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
