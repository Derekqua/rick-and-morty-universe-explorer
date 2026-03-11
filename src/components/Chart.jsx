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

  const stats     = getSummaryStats(characters);
  const origins   = groupByOrigin(characters, 12);
  const locations = groupByLocation(characters, 12);
  const species   = groupBySpecies(characters);
  const statuses  = groupByStatus(characters);
  const genders   = groupByGender(characters);

  return (
    <div className="mt-10 space-y-10">

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Characters", value: stats.total },
          { label: "Alive",            value: `${stats.alive} (${stats.alivePercent}%)` },
          { label: "Unique Origins",   value: stats.uniqueOrigins },
          { label: "Unique Species",   value: stats.uniqueSpecies },
        ].map(({ label, value }) => (
          <div key={label} className="border rounded-lg p-4 text-center">
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* All 5 charts in one row */}
      <div className="grid grid-cols-5 gap-4">

        {/* Origins */}
        <div>
          <h2 className="text-sm font-bold mb-3">By Origin (Top 12)</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={origins} layout="vertical" margin={{ left: 0, right: 10 }}>
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis
                type="category" dataKey="name" width={80} tick={{ fontSize: 10 }}
                tickFormatter={v => v.length > 12 ? v.slice(0, 10) + "…" : v}
              />
              <Tooltip />
              <Bar dataKey="count" name="Characters" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Locations */}
        <div>
          <h2 className="text-sm font-bold mb-3">By Location (Top 12)</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={locations} layout="vertical" margin={{ left: 0, right: 10 }}>
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis
                type="category" dataKey="name" width={80} tick={{ fontSize: 10 }}
                tickFormatter={v => v.length > 12 ? v.slice(0, 10) + "…" : v}
              />
              <Tooltip />
              <Bar dataKey="count" name="Characters" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Species */}
        <div>
          <h2 className="text-sm font-bold mb-3">Species Breakdown</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={species} layout="vertical" margin={{ left: 0, right: 10 }}>
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="count" name="Characters" fill="#a855f7" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Status */}
        <div>
          <h2 className="text-sm font-bold mb-3">Status Distribution</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={statuses} dataKey="count" nameKey="name" cx="50%" cy="45%"
                outerRadius={75} label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {statuses.map(entry => (
                  <Cell key={entry.name} fill={STATUS_COLORS[entry.name] ?? "#9ca3af"} />
                ))}
              </Pie>
              <Tooltip />
              <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Gender */}
        <div>
          <h2 className="text-sm font-bold mb-3">Gender Distribution</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={genders} dataKey="count" nameKey="name" cx="50%" cy="45%"
                outerRadius={75} label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {genders.map((entry, i) => (
                  <Cell key={entry.name} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}
