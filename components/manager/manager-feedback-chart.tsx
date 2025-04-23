"use client"

import { Pie, PieChart, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

// Mock data for feedback by department
const feedbackData = [
  { name: "Room Service", value: 352, color: "#3b82f6" },
  { name: "Housekeeping", value: 289, color: "#f59e0b" },
  { name: "Spa & Wellness", value: 145, color: "#8b5cf6" },
  { name: "Front Desk", value: 203, color: "#10b981" },
  { name: "Restaurant", value: 259, color: "#ef4444" },
]

export function ManagerFeedbackChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={feedbackData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {feedbackData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`${value} submissions`, "Count"]}
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
