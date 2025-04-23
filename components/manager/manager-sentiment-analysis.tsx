"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Mock data for sentiment analysis
const sentimentData = [
  {
    department: "Room Service",
    positive: 68,
    neutral: 22,
    negative: 10,
  },
  {
    department: "Housekeeping",
    positive: 72,
    neutral: 18,
    negative: 10,
  },
  {
    department: "Spa",
    positive: 82,
    neutral: 15,
    negative: 3,
  },
  {
    department: "Front Desk",
    positive: 65,
    neutral: 25,
    negative: 10,
  },
  {
    department: "Restaurant",
    positive: 58,
    neutral: 27,
    negative: 15,
  },
]

export function ManagerSentimentAnalysis() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={sentimentData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" domain={[0, 100]} />
        <YAxis type="category" dataKey="department" />
        <Tooltip
          formatter={(value) => [`${value}%`, ""]}
          contentStyle={{
            backgroundColor: "white",
            borderRadius: "0.375rem",
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          }}
        />
        <Legend />
        <Bar dataKey="positive" stackId="a" fill="#22c55e" name="Positive" />
        <Bar dataKey="neutral" stackId="a" fill="#94a3b8" name="Neutral" />
        <Bar dataKey="negative" stackId="a" fill="#ef4444" name="Negative" />
      </BarChart>
    </ResponsiveContainer>
  )
}
