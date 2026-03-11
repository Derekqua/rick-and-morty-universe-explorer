"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function OriginChart({ data }) {

  return (
    <div className="mt-10 h-80">

      <h2 className="text-xl font-bold mb-4">
        Characters by Origin
      </h2>

      <ResponsiveContainer width="100%" height="100%">

        <BarChart data={data}>

          <XAxis dataKey="origin" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );

}