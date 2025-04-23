"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data
const monthlyData = [
  { name: "Jan", count: 40, revenue: 2000 },
  { name: "Feb", count: 30, revenue: 1500 },
  { name: "Mar", count: 20, revenue: 1000 },
  { name: "Apr", count: 27, revenue: 1350 },
  { name: "May", count: 18, revenue: 900 },
  { name: "Jun", count: 23, revenue: 1150 },
  { name: "Jul", count: 34, revenue: 1700 },
  { name: "Aug", count: 40, revenue: 2000 },
  { name: "Sep", count: 30, revenue: 1500 },
  { name: "Oct", count: 20, revenue: 1000 },
  { name: "Nov", count: 27, revenue: 1350 },
  { name: "Dec", count: 38, revenue: 1900 },
]

const quarterlyData = [
  { name: "Q1", count: 90, revenue: 4500 },
  { name: "Q2", count: 68, revenue: 3400 },
  { name: "Q3", count: 104, revenue: 5200 },
  { name: "Q4", count: 85, revenue: 4250 },
]

const yearlyData = [
  { name: "2020", count: 300, revenue: 15000 },
  { name: "2021", count: 350, revenue: 17500 },
  { name: "2022", count: 400, revenue: 20000 },
  { name: "2023", count: 450, revenue: 22500 },
]

export function UpsellingChart() {
  const [period, setPeriod] = useState("monthly")
  const [metric, setMetric] = useState("revenue")

  const data = {
    monthly: monthlyData,
    quarterly: quarterlyData,
    yearly: yearlyData,
  }[period]

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <CardTitle>Upselling Performance</CardTitle>
            <CardDescription>Track upselling initiatives over time</CardDescription>
          </div>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
            <Tabs defaultValue="revenue" value={metric} onValueChange={setMetric} className="w-[200px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
                <TabsTrigger value="count">Count</TabsTrigger>
              </TabsList>
            </Tabs>
            <Tabs defaultValue="monthly" value={period} onValueChange={setPeriod} className="w-[300px]">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
                <TabsTrigger value="yearly">Yearly</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ChartContainer
          config={{
            [metric]: {
              label: metric === "revenue" ? "Revenue (₹)" : "Count",
              color: "hsl(var(--chart-1))",
            },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey={metric} fill="var(--color-revenue)" name={metric === "revenue" ? "Revenue (₹)" : "Count"} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
