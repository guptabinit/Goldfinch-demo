"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for promotion performance
const promotionData = [
  {
    name: "Early Bird Breakfast",
    redemptions: 87,
    revenue: 43500,
    target: 50000,
  },
  {
    name: "Spa Midweek Special",
    redemptions: 45,
    revenue: 67500,
    target: 60000,
  },
  {
    name: "Suite Upgrade",
    redemptions: 12,
    revenue: 36000,
    target: 40000,
  },
  {
    name: "Happy Hour Cocktails",
    redemptions: 156,
    revenue: 93600,
    target: 80000,
  },
  {
    name: "Weekend Brunch",
    redemptions: 78,
    revenue: 155922,
    target: 150000,
  },
]

export function ManagerPromotionPerformance() {
  return (
    <ChartContainer
      config={{
        redemptions: {
          label: "Redemptions",
          color: "hsl(var(--chart-1))",
        },
        revenue: {
          label: "Revenue (₹)",
          color: "hsl(var(--chart-2))",
        },
        target: {
          label: "Target (₹)",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={promotionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" orientation="left" />
          <YAxis yAxisId="right" orientation="right" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar yAxisId="left" dataKey="redemptions" fill="var(--color-redemptions)" />
          <Bar yAxisId="right" dataKey="revenue" fill="var(--color-revenue)" />
          <Bar yAxisId="right" dataKey="target" fill="var(--color-target)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
