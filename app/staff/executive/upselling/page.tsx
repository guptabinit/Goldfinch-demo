"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricCard } from "@/components/executive/metric-card"
import { UpsellingChart } from "@/components/executive/upselling-chart"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, ArrowUpRight, Percent, ShoppingBag } from "lucide-react"

// Sample data
const upsellingByType = [
  { name: "Room Upgrades", value: 40 },
  { name: "Dining Packages", value: 25 },
  { name: "Spa Treatments", value: 20 },
  { name: "Experience Packages", value: 15 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

const upsellingByStaff = [
  { name: "Rahul", count: 45, revenue: 67500 },
  { name: "Priya", count: 38, revenue: 57000 },
  { name: "Amit", count: 32, revenue: 48000 },
  { name: "Neha", count: 30, revenue: 45000 },
  { name: "Vikram", count: 28, revenue: 42000 },
]

const conversionRates = [
  { name: "Room Upgrades", rate: 35 },
  { name: "Dining Packages", rate: 28 },
  { name: "Spa Treatments", rate: 22 },
  { name: "Experience Packages", rate: 18 },
]

export default function UpsellingDashboard() {
  const [timeframe, setTimeframe] = useState("month")

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Upselling Dashboard</h1>
          <p className="text-muted-foreground">Track and analyze upselling performance and opportunities.</p>
        </div>
        <Tabs defaultValue="month" value={timeframe} onValueChange={setTimeframe}>
          <TabsList>
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="quarter">Quarter</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Upselling Revenue"
          value="₹3,45,678"
          description={`Revenue from upselling for this ${timeframe}`}
          icon={<TrendingUp className="h-4 w-4" />}
          trend={{ value: 8.7, isPositive: true }}
        />
        <MetricCard
          title="Upselling Count"
          value="347"
          description={`Number of successful upsells this ${timeframe}`}
          icon={<ShoppingBag className="h-4 w-4" />}
          trend={{ value: 12.3, isPositive: true }}
        />
        <MetricCard
          title="Conversion Rate"
          value="28.5%"
          description="Percentage of guests who accepted upsells"
          icon={<Percent className="h-4 w-4" />}
          trend={{ value: 3.2, isPositive: true }}
        />
        <MetricCard
          title="Avg. Upsell Value"
          value="₹9,961"
          description="Average value per upsell"
          icon={<ArrowUpRight className="h-4 w-4" />}
          trend={{ value: 5.1, isPositive: false }}
        />
      </div>

      <div className="mt-6 grid gap-6">
        <UpsellingChart />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upselling by Type</CardTitle>
            <CardDescription>Breakdown of upselling by category</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={upsellingByType}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {upsellingByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Rates by Offer Type</CardTitle>
            <CardDescription>Percentage of guests accepting different upsell offers</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer
              config={{
                rate: {
                  label: "Conversion Rate (%)",
                  color: "hsl(var(--chart-1))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={conversionRates} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="rate" fill="var(--color-rate)" name="Conversion Rate (%)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Staff</CardTitle>
            <CardDescription>Staff members with highest upselling performance</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ChartContainer
              config={{
                count: {
                  label: "Number of Upsells",
                  color: "hsl(var(--chart-1))",
                },
                revenue: {
                  label: "Revenue Generated (₹)",
                  color: "hsl(var(--chart-2))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={upsellingByStaff} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="var(--color-count)" />
                  <YAxis yAxisId="right" orientation="right" stroke="var(--color-revenue)" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="count" fill="var(--color-count)" name="Number of Upsells" />
                  <Bar yAxisId="right" dataKey="revenue" fill="var(--color-revenue)" name="Revenue Generated (₹)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
