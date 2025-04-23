"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for performance metrics
const performanceData = [
  {
    month: "Jan",
    responseTime: 8.5,
    completionRate: 92,
    satisfaction: 4.5,
    slaCompliance: 92,
  },
  {
    month: "Feb",
    responseTime: 8.2,
    completionRate: 93,
    satisfaction: 4.6,
    slaCompliance: 93,
  },
  {
    month: "Mar",
    responseTime: 7.9,
    completionRate: 94,
    satisfaction: 4.6,
    slaCompliance: 94,
  },
  {
    month: "Apr",
    responseTime: 7.5,
    completionRate: 95,
    satisfaction: 4.7,
    slaCompliance: 95,
  },
  {
    month: "May",
    responseTime: 8.2,
    completionRate: 94,
    satisfaction: 4.7,
    slaCompliance: 94,
  },
  {
    month: "Jun",
    responseTime: 8.0,
    completionRate: 95,
    satisfaction: 4.8,
    slaCompliance: 95,
  },
  {
    month: "Jul",
    responseTime: 7.8,
    completionRate: 96,
    satisfaction: 4.8,
    slaCompliance: 96,
  },
  {
    month: "Aug",
    responseTime: 7.6,
    completionRate: 96,
    satisfaction: 4.9,
    slaCompliance: 96,
  },
  {
    month: "Sep",
    responseTime: 7.4,
    completionRate: 97,
    satisfaction: 4.9,
    slaCompliance: 97,
  },
  {
    month: "Oct",
    responseTime: 7.2,
    completionRate: 97,
    satisfaction: 4.9,
    slaCompliance: 97,
  },
  {
    month: "Nov",
    responseTime: 7.0,
    completionRate: 98,
    satisfaction: 5.0,
    slaCompliance: 98,
  },
  {
    month: "Dec",
    responseTime: 6.8,
    completionRate: 98,
    satisfaction: 5.0,
    slaCompliance: 98,
  },
]

export function ManagerPerformanceChart() {
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
        slaCompliance: {
          label: "SLA Compliance (%)",
          color: "hsl(var(--chart-4))",
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
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
          <Line yAxisId="right" type="monotone" dataKey="slaCompliance" stroke="var(--color-slaCompliance)" />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
