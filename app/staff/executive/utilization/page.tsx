"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricCard } from "@/components/executive/metric-card"
import { UtilizationChart } from "@/components/executive/utilization-chart"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Users, Clock, TrendingUp, Calendar } from "lucide-react"

// Sample data
const utilizationTrend = [
  { month: "Jan", spa: 55, dining: 70, roomService: 80, concierge: 40, gym: 25 },
  { month: "Feb", spa: 60, dining: 75, roomService: 82, concierge: 42, gym: 28 },
  { month: "Mar", spa: 65, dining: 78, roomService: 85, concierge: 45, gym: 30 },
  { month: "Apr", spa: 70, dining: 80, roomService: 87, concierge: 48, gym: 32 },
  { month: "May", spa: 75, dining: 82, roomService: 88, concierge: 50, gym: 35 },
  { month: "Jun", spa: 80, dining: 85, roomService: 90, concierge: 52, gym: 38 },
]

const peakHours = [
  { hour: "6-8 AM", utilization: 45 },
  { hour: "8-10 AM", utilization: 75 },
  { hour: "10-12 PM", utilization: 65 },
  { hour: "12-2 PM", utilization: 85 },
  { hour: "2-4 PM", utilization: 55 },
  { hour: "4-6 PM", utilization: 60 },
  { hour: "6-8 PM", utilization: 90 },
  { hour: "8-10 PM", utilization: 80 },
  { hour: "10-12 AM", utilization: 40 },
]

const utilizationByGuestType = [
  { type: "Business", utilization: 65 },
  { type: "Leisure", utilization: 85 },
  { type: "Family", utilization: 75 },
  { type: "Group", utilization: 60 },
  { type: "Wedding", utilization: 90 },
]

export default function UtilizationDashboard() {
  const [timeframe, setTimeframe] = useState("month")

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Service Utilization Dashboard</h1>
          <p className="text-muted-foreground">Track and analyze guest service usage patterns.</p>
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
          title="Overall Utilization"
          value="72%"
          description={`Average service utilization for this ${timeframe}`}
          icon={<Users className="h-4 w-4" />}
          trend={{ value: 5.3, isPositive: true }}
        />
        <MetricCard
          title="Peak Utilization"
          value="90%"
          description="Highest service utilization rate"
          icon={<TrendingUp className="h-4 w-4" />}
          trend={{ value: 2.1, isPositive: true }}
        />
        <MetricCard
          title="Peak Hours"
          value="6-8 PM"
          description="Time with highest service demand"
          icon={<Clock className="h-4 w-4" />}
          trend={{ value: 0, isPositive: true }}
        />
        <MetricCard
          title="Busiest Day"
          value="Saturday"
          description="Day with highest service utilization"
          icon={<Calendar className="h-4 w-4" />}
          trend={{ value: 0, isPositive: true }}
        />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-12">
        <UtilizationChart />
        <Card className="col-span-full md:col-span-6">
          <CardHeader>
            <CardTitle>Utilization by Guest Type</CardTitle>
            <CardDescription>Service usage patterns by guest category</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer
              config={{
                utilization: {
                  label: "Utilization Rate (%)",
                  color: "hsl(var(--chart-1))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={utilizationByGuestType} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="utilization" fill="var(--color-utilization)" name="Utilization Rate (%)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Service Utilization Trends</CardTitle>
            <CardDescription>Utilization rates across services over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ChartContainer
              config={{
                spa: {
                  label: "Spa",
                  color: "hsl(var(--chart-1))",
                },
                dining: {
                  label: "Dining",
                  color: "hsl(var(--chart-2))",
                },
                roomService: {
                  label: "Room Service",
                  color: "hsl(var(--chart-3))",
                },
                concierge: {
                  label: "Concierge",
                  color: "hsl(var(--chart-4))",
                },
                gym: {
                  label: "Gym",
                  color: "hsl(var(--chart-5))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={utilizationTrend} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="spa" stroke="var(--color-spa)" />
                  <Line type="monotone" dataKey="dining" stroke="var(--color-dining)" />
                  <Line type="monotone" dataKey="roomService" stroke="var(--color-roomService)" />
                  <Line type="monotone" dataKey="concierge" stroke="var(--color-concierge)" />
                  <Line type="monotone" dataKey="gym" stroke="var(--color-gym)" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Peak Hours Analysis</CardTitle>
            <CardDescription>Service utilization by time of day</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer
              config={{
                utilization: {
                  label: "Utilization Rate (%)",
                  color: "hsl(var(--chart-1))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={peakHours} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="utilization" fill="var(--color-utilization)" name="Utilization Rate (%)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
