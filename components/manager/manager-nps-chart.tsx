"use client"

import { Pie, PieChart, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

// Mock data for NPS breakdown
const npsData = [
  { name: "Promoters (9-10)", value: 78, color: "#22c55e" },
  { name: "Passives (7-8)", value: 16, color: "#94a3b8" },
  { name: "Detractors (0-6)", value: 6, color: "#ef4444" },
]

export function ManagerNpsChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={npsData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {npsData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`${value}%`, "Percentage"]}
          contentStyle={{
            backgroundColor: "white",
            borderRadius: "0.375rem",
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
