"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for KPI chart
const kpiData = [
  { date: "Mon", responseTime: 7.2, completionRate: 95, satisfaction: 4.6 },
  { date: "Tue", responseTime: 8.1, completionRate: 93, satisfaction: 4.5 },
  { date: "Wed", responseTime: 7.8, completionRate: 94, satisfaction: 4.7 },
  { date: "Thu", responseTime: 8.5, completionRate: 92, satisfaction: 4.4 },
  { date: "Fri", responseTime: 8.0, completionRate: 96, satisfaction: 4.8 },
  { date: "Sat", responseTime: 7.5, completionRate: 97, satisfaction: 4.9 },
  { date: "Sun", responseTime: 7.0, completionRate: 98, satisfaction: 4.9 },
]

export function ManagerKpiChart() {
  return (
    <ChartContainer
      config={{
        responseTime: {
          label: "Avg. Response Time (min)",
          color: "hsl(var(--chart-1))",
        },
        completionRate: {
          label: "Completion Rate (%)",
          color: "hsl(var(--chart-2))",
        },
        satisfaction: {
          label: "Guest Satisfaction (1-5)",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={kpiData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" orientation="left" />
          <YAxis yAxisId="right" orientation="right" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="responseTime"
            stroke="var(--color-responseTime)"
            activeDot={{ r: 8 }}
          />
          <Line yAxisId="right" type="monotone" dataKey="completionRate" stroke="var(--color-completionRate)" />
          <Line yAxisId="left" type="monotone" dataKey="satisfaction" stroke="var(--color-satisfaction)" />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
