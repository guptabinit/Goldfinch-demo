"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for orders chart
const ordersData = [
  {
    department: "Room Service",
    completed: 124,
    inProgress: 18,
    delayed: 3,
  },
  {
    department: "Housekeeping",
    completed: 87,
    inProgress: 15,
    delayed: 5,
  },
  {
    department: "Spa",
    completed: 45,
    inProgress: 9,
    delayed: 1,
  },
  {
    department: "Concierge",
    completed: 32,
    inProgress: 6,
    delayed: 0,
  },
  {
    department: "Maintenance",
    completed: 28,
    inProgress: 8,
    delayed: 2,
  },
]

export function ManagerOrdersChart() {
  return (
    <ChartContainer
      config={{
        completed: {
          label: "Completed",
          color: "hsl(var(--chart-1))",
        },
        inProgress: {
          label: "In Progress",
          color: "hsl(var(--chart-2))",
        },
        delayed: {
          label: "Delayed",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={ordersData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="department" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey="completed" fill="var(--color-completed)" />
          <Bar dataKey="inProgress" fill="var(--color-inProgress)" />
          <Bar dataKey="delayed" fill="var(--color-delayed)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
