"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricCard } from "@/components/executive/metric-card"
import { StaffPerformanceChart } from "@/components/executive/staff-performance-chart"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { UserCheck, Clock, Award, TrendingUp } from "lucide-react"

// Sample data
const topPerformers = [
  { name: "Rahul", department: "Housekeeping", score: 95 },
  { name: "Priya", department: "Front Desk", score: 92 },
  { name: "Amit", department: "Dining", score: 90 },
  { name: "Neha", department: "Spa", score: 89 },
  { name: "Vikram", department: "Concierge", score: 88 },
]

const performanceTrends = [
  { month: "Jan", housekeeping: 85, frontDesk: 82, dining: 80, spa: 78 },
  { month: "Feb", housekeeping: 86, frontDesk: 83, dining: 82, spa: 80 },
  { month: "Mar", housekeeping: 88, frontDesk: 85, dining: 84, spa: 82 },
  { month: "Apr", housekeeping: 90, frontDesk: 87, dining: 86, spa: 84 },
  { month: "May", housekeeping: 92, frontDesk: 89, dining: 88, spa: 86 },
  { month: "Jun", housekeeping: 95, frontDesk: 92, dining: 90, spa: 89 },
]

const trainingImpact = [
  { month: "Jan", before: 75, after: 85 },
  { month: "Feb", before: 76, after: 86 },
  { month: "Mar", before: 77, after: 88 },
  { month: "Apr", before: 78, after: 90 },
  { month: "May", before: 79, after: 92 },
  { month: "Jun", before: 80, after: 95 },
]

export default function PerformanceDashboard() {
  const [timeframe, setTimeframe] = useState("month")

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Staff Performance Dashboard</h1>
          <p className="text-muted-foreground">Track and analyze staff and department performance metrics.</p>
        </div>
        <Tabs defaultValue="month" value={timeframe} onValueChange={setTimeframe}>
          <TabsList>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="quarter">Quarter</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Overall Performance"
          value="88%"
          description={`Average staff performance for this ${timeframe}`}
          icon={<UserCheck className="h-4 w-4" />}
          trend={{ value: 3.5, isPositive: true }}
        />
        <MetricCard
          title="SLA Adherence"
          value="92%"
          description="Service Level Agreement compliance"
          icon={<Clock className="h-4 w-4" />}
          trend={{ value: 2.1, isPositive: true }}
        />
        <MetricCard
          title="Top Department"
          value="Housekeeping"
          description="Highest performing department"
          icon={<Award className="h-4 w-4" />}
          trend={{ value: 0, isPositive: true }}
        />
        <MetricCard
          title="Training ROI"
          value="145%"
          description="Return on investment for staff training"
          icon={<TrendingUp className="h-4 w-4" />}
          trend={{ value: 15.3, isPositive: true }}
        />
      </div>

      <div className="mt-6 grid gap-6">
        <StaffPerformanceChart />
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Department Performance Trends</CardTitle>
            <CardDescription>Performance scores by department over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ChartContainer
              config={{
                housekeeping: {
                  label: "Housekeeping",
                  color: "hsl(var(--chart-1))",
                },
                frontDesk: {
                  label: "Front Desk",
                  color: "hsl(var(--chart-2))",
                },
                dining: {
                  label: "Dining",
                  color: "hsl(var(--chart-3))",
                },
                spa: {
                  label: "Spa",
                  color: "hsl(var(--chart-4))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceTrends} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[70, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="housekeeping"
                    stroke="var(--color-housekeeping)"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                  <Line type="monotone" dataKey="frontDesk" stroke="var(--color-frontDesk)" />
                  <Line type="monotone" dataKey="dining" stroke="var(--color-dining)" />
                  <Line type="monotone" dataKey="spa" stroke="var(--color-spa)" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Staff</CardTitle>
            <CardDescription>Staff members with highest performance scores</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer
              config={{
                score: {
                  label: "Performance Score",
                  color: "hsl(var(--chart-1))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topPerformers} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[80, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="score" fill="var(--color-score)" name="Performance Score" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Training Impact Analysis</CardTitle>
            <CardDescription>Performance before and after training programs</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer
              config={{
                before: {
                  label: "Before Training",
                  color: "hsl(var(--chart-1))",
                },
                after: {
                  label: "After Training",
                  color: "hsl(var(--chart-2))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trainingImpact} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[70, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="before" stroke="var(--color-before)" strokeDasharray="5 5" />
                  <Line
                    type="monotone"
                    dataKey="after"
                    stroke="var(--color-after)"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
