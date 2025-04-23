"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, ReferenceLine } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for satisfaction by department
const satisfactionData = [
  {
    department: "Room Service",
    rating: 4.8,
    benchmark: 4.5,
  },
  {
    department: "Housekeeping",
    rating: 4.5,
    benchmark: 4.5,
  },
  {
    department: "Spa & Wellness",
    rating: 4.9,
    benchmark: 4.5,
  },
  {
    department: "Front Desk",
    rating: 4.7,
    benchmark: 4.5,
  },
  {
    department: "Restaurant",
    rating: 4.6,
    benchmark: 4.5,
  },
  {
    department: "Concierge",
    rating: 4.8,
    benchmark: 4.5,
  },
]

export function ManagerSatisfactionChart() {
  return (
    <ChartContainer
      config={{
        rating: {
          label: "Rating (1-5)",
          color: "hsl(var(--chart-1))",
        },
        benchmark: {
          label: "Industry Benchmark",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={satisfactionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="department" />
          <YAxis domain={[3.5, 5]} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey="rating" fill="var(--color-rating)" />
          <ReferenceLine y={4.5} stroke="var(--color-benchmark)" strokeDasharray="3 3" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
