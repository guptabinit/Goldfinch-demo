"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, ReferenceLine } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for SLA trends
const slaTrendData = [
  {
    date: "Week 1",
    roomService: 97.5,
    housekeeping: 94.2,
    spa: 96.8,
    overall: 96.3,
    target: 96,
  },
  {
    date: "Week 2",
    roomService: 98.1,
    housekeeping: 93.5,
    spa: 95.9,
    overall: 95.8,
    target: 96,
  },
  {
    date: "Week 3",
    roomService: 97.8,
    housekeeping: 92.1,
    spa: 94.5,
    overall: 94.7,
    target: 96,
  },
  {
    date: "Week 4",
    roomService: 97.1,
    housekeeping: 91.3,
    spa: 94.2,
    overall: 94.2,
    target: 96,
  },
  {
    date: "Week 5 (Forecast)",
    roomService: 96.8,
    housekeeping: 90.8,
    spa: 93.9,
    overall: 93.8,
    target: 96,
  },
  {
    date: "Week 6 (Forecast)",
    roomService: 96.5,
    housekeeping: 90.5,
    spa: 93.7,
    overall: 93.5,
    target: 96,
  },
]

export function ManagerSlaTrends() {
  return (
    <ChartContainer
      config={{
        roomService: {
          label: "Room Service",
          color: "hsl(var(--chart-1))",
        },
        housekeeping: {
          label: "Housekeeping",
          color: "hsl(var(--chart-2))",
        },
        spa: {
          label: "Spa & Wellness",
          color: "hsl(var(--chart-3))",
        },
        overall: {
          label: "Overall",
          color: "hsl(var(--chart-4))",
        },
        target: {
          label: "Target",
          color: "hsl(var(--chart-5))",
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={slaTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[88, 100]} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line type="monotone" dataKey="roomService" stroke="var(--color-roomService)" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="housekeeping" stroke="var(--color-housekeeping)" />
          <Line type="monotone" dataKey="spa" stroke="var(--color-spa)" />
          <Line type="monotone" dataKey="overall" stroke="var(--color-overall)" strokeWidth={2} />
          <ReferenceLine y={96} stroke="var(--color-target)" strokeDasharray="3 3" />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
