"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricCard } from "@/components/executive/metric-card"
import { RevenueChart } from "@/components/executive/revenue-chart"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
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
import { DollarSign, TrendingUp, ArrowUpRight, Percent } from "lucide-react"

// Sample data
const revenueBySource = [
  { name: "Direct Bookings", value: 45 },
  { name: "OTAs", value: 30 },
  { name: "Corporate", value: 15 },
  { name: "Travel Agents", value: 10 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

const revenueByDayOfWeek = [
  { name: "Mon", revenue: 12000 },
  { name: "Tue", revenue: 10000 },
  { name: "Wed", revenue: 11000 },
  { name: "Thu", revenue: 15000 },
  { name: "Fri", revenue: 18000 },
  { name: "Sat", revenue: 22000 },
  { name: "Sun", revenue: 20000 },
]

const revenueTrend = [
  { name: "Jan", actual: 150000, forecast: 145000 },
  { name: "Feb", actual: 160000, forecast: 155000 },
  { name: "Mar", actual: 170000, forecast: 165000 },
  { name: "Apr", actual: 180000, forecast: 175000 },
  { name: "May", actual: 190000, forecast: 185000 },
  { name: "Jun", actual: 200000, forecast: 195000 },
]

export default function RevenueDashboard() {
  const [timeframe, setTimeframe] = useState("month")

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Revenue Dashboard</h1>
          <p className="text-muted-foreground">Detailed analysis of revenue streams and performance.</p>
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
          title="Total Revenue"
          value="₹28,56,789"
          description={`Total revenue for this ${timeframe}`}
          icon={<DollarSign className="h-4 w-4" />}
          trend={{ value: 12.5, isPositive: true }}
        />
        <MetricCard
          title="RevPAR"
          value="₹12,345"
          description="Revenue per available room"
          icon={<TrendingUp className="h-4 w-4" />}
          trend={{ value: 8.3, isPositive: true }}
        />
        <MetricCard
          title="ADR"
          value="₹15,678"
          description="Average daily rate"
          icon={<ArrowUpRight className="h-4 w-4" />}
          trend={{ value: 5.2, isPositive: true }}
        />
        <MetricCard
          title="Occupancy"
          value="85%"
          description="Room occupancy rate"
          icon={<Percent className="h-4 w-4" />}
          trend={{ value: 3.7, isPositive: true }}
        />
      </div>

      <div className="mt-6 grid gap-6">
        <RevenueChart />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Source</CardTitle>
            <CardDescription>Breakdown of revenue by booking source</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueBySource}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {revenueBySource.map((entry, index) => (
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
            <CardTitle>Revenue by Day of Week</CardTitle>
            <CardDescription>Daily revenue pattern analysis</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer
              config={{
                revenue: {
                  label: "Revenue (₹)",
                  color: "hsl(var(--chart-1))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueByDayOfWeek} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="revenue" fill="var(--color-revenue)" name="Revenue (₹)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Forecast</CardTitle>
            <CardDescription>Actual revenue compared to forecasted targets</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ChartContainer
              config={{
                actual: {
                  label: "Actual Revenue (₹)",
                  color: "hsl(var(--chart-1))",
                },
                forecast: {
                  label: "Forecasted Revenue (₹)",
                  color: "hsl(var(--chart-2))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueTrend} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="var(--color-actual)"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                  <Line type="monotone" dataKey="forecast" stroke="var(--color-forecast)" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
