"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, ReferenceLine } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for SLA compliance
const slaData = [
  {
    department: "Room Service",
    compliance: 97.1,
    target: 96,
  },
  {
    department: "Housekeeping",
    compliance: 91.3,
    target: 96,
  },
  {
    department: "Spa",
    compliance: 94.2,
    target: 96,
  },
  {
    department: "Front Desk",
    compliance: 98.5,
    target: 96,
  },
  {
    department: "Concierge",
    compliance: 99.1,
    target: 96,
  },
  {
    department: "Maintenance",
    compliance: 89.7,
    target: 96,
  },
]

export function ManagerSlaChart() {
  return (
    <ChartContainer
      config={{
        compliance: {
          label: "Compliance (%)",
          color: "hsl(var(--chart-1))",
        },
        target: {
          label: "Target (%)",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={slaData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="department" />
          <YAxis domain={[80, 100]} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey="compliance" fill="var(--color-compliance)" />
          <ReferenceLine y={96} stroke="var(--color-target)" strokeDasharray="3 3" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
