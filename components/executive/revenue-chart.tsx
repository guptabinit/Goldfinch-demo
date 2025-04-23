"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data
const monthlyData = [
  { name: "Jan", dining: 4000, spa: 2400, accommodation: 9800, events: 3800, total: 20000 },
  { name: "Feb", dining: 3000, spa: 1398, accommodation: 9200, events: 3800, total: 17398 },
  { name: "Mar", dining: 2000, spa: 9800, accommodation: 10000, events: 4800, total: 26600 },
  { name: "Apr", dining: 2780, spa: 3908, accommodation: 9500, events: 3800, total: 19988 },
  { name: "May", dining: 1890, spa: 4800, accommodation: 9800, events: 4200, total: 20690 },
  { name: "Jun", dining: 2390, spa: 3800, accommodation: 10200, events: 5800, total: 22190 },
  { name: "Jul", dining: 3490, spa: 4300, accommodation: 11000, events: 6800, total: 25590 },
  { name: "Aug", dining: 4000, spa: 2400, accommodation: 10800, events: 5800, total: 23000 },
  { name: "Sep", dining: 3000, spa: 1398, accommodation: 9800, events: 4800, total: 18998 },
  { name: "Oct", dining: 2000, spa: 9800, accommodation: 9500, events: 3800, total: 25100 },
  { name: "Nov", dining: 2780, spa: 3908, accommodation: 9800, events: 4200, total: 20688 },
  { name: "Dec", dining: 3890, spa: 4800, accommodation: 12000, events: 7800, total: 28490 },
]

const quarterlyData = [
  { name: "Q1", dining: 9000, spa: 13598, accommodation: 29000, events: 12400, total: 63998 },
  { name: "Q2", dining: 7060, spa: 13508, accommodation: 29500, events: 13800, total: 63868 },
  { name: "Q3", dining: 10490, spa: 8098, accommodation: 31600, events: 17400, total: 67588 },
  { name: "Q4", dining: 9450, spa: 18508, accommodation: 31300, events: 15800, total: 75058 },
]

const yearlyData = [
  { name: "2020", dining: 30000, spa: 45000, accommodation: 95000, events: 40000, total: 210000 },
  { name: "2021", dining: 35000, spa: 48000, accommodation: 100000, events: 45000, total: 228000 },
  { name: "2022", dining: 40000, spa: 52000, accommodation: 110000, events: 50000, total: 252000 },
  { name: "2023", dining: 45000, spa: 58000, accommodation: 120000, events: 55000, total: 278000 },
]

export function RevenueChart() {
  const [period, setPeriod] = useState("monthly")

  const data = {
    monthly: monthlyData,
    quarterly: quarterlyData,
    yearly: yearlyData,
  }[period]

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Revenue Breakdown</CardTitle>
          <Tabs defaultValue="monthly" value={period} onValueChange={setPeriod}>
            <TabsList>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <CardDescription>Revenue breakdown by category over time</CardDescription>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ChartContainer
          config={{
            dining: {
              label: "Dining",
              color: "hsl(var(--chart-1))",
            },
            spa: {
              label: "Spa",
              color: "hsl(var(--chart-2))",
            },
            accommodation: {
              label: "Accommodation",
              color: "hsl(var(--chart-3))",
            },
            events: {
              label: "Events",
              color: "hsl(var(--chart-4))",
            },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="dining"
                stackId="1"
                stroke="var(--color-dining)"
                fill="var(--color-dining)"
              />
              <Area type="monotone" dataKey="spa" stackId="1" stroke="var(--color-spa)" fill="var(--color-spa)" />
              <Area
                type="monotone"
                dataKey="accommodation"
                stackId="1"
                stroke="var(--color-accommodation)"
                fill="var(--color-accommodation)"
              />
              <Area
                type="monotone"
                dataKey="events"
                stackId="1"
                stroke="var(--color-events)"
                fill="var(--color-events)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
