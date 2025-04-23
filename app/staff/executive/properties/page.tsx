"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PropertyComparisonChart } from "@/components/executive/property-comparison-chart"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data
const revenueComparison = [
  { month: "Jan", mumbai: 120, delhi: 100, bangalore: 80 },
  { month: "Feb", mumbai: 125, delhi: 105, bangalore: 85 },
  { month: "Mar", mumbai: 130, delhi: 110, bangalore: 90 },
  { month: "Apr", mumbai: 135, delhi: 115, bangalore: 95 },
  { month: "May", mumbai: 140, delhi: 120, bangalore: 100 },
  { month: "Jun", mumbai: 145, delhi: 125, bangalore: 105 },
]

const occupancyComparison = [
  { month: "Jan", mumbai: 85, delhi: 80, bangalore: 75 },
  { month: "Feb", mumbai: 87, delhi: 82, bangalore: 77 },
  { month: "Mar", mumbai: 90, delhi: 85, bangalore: 80 },
  { month: "Apr", mumbai: 92, delhi: 87, bangalore: 82 },
  { month: "May", mumbai: 95, delhi: 90, bangalore: 85 },
  { month: "Jun", mumbai: 97, delhi: 92, bangalore: 87 },
]

const satisfactionComparison = [
  { month: "Jan", mumbai: 4.5, delhi: 4.3, bangalore: 4.4 },
  { month: "Feb", mumbai: 4.6, delhi: 4.4, bangalore: 4.5 },
  { month: "Mar", mumbai: 4.7, delhi: 4.5, bangalore: 4.6 },
  { month: "Apr", mumbai: 4.8, delhi: 4.6, bangalore: 4.7 },
  { month: "May", mumbai: 4.9, delhi: 4.7, bangalore: 4.8 },
  { month: "Jun", mumbai: 4.8, delhi: 4.6, bangalore: 4.7 },
]

export default function PropertiesDashboard() {
  const [timeframe, setTimeframe] = useState("month")

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Properties Comparison</h1>
          <p className="text-muted-foreground">Compare performance across different hotel properties.</p>
        </div>
        <Tabs defaultValue="month" value={timeframe} onValueChange={setTimeframe}>
          <TabsList>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="quarter">Quarter</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-6">
        <PropertyComparisonChart />
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Comparison</CardTitle>
            <CardDescription>Monthly revenue across properties (in lakhs ₹)</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ChartContainer
              config={{
                mumbai: {
                  label: "Mumbai",
                  color: "hsl(var(--chart-1))",
                },
                delhi: {
                  label: "Delhi",
                  color: "hsl(var(--chart-2))",
                },
                bangalore: {
                  label: "Bangalore",
                  color: "hsl(var(--chart-3))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueComparison} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="mumbai"
                    stroke="var(--color-mumbai)"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                  <Line type="monotone" dataKey="delhi" stroke="var(--color-delhi)" />
                  <Line type="monotone" dataKey="bangalore" stroke="var(--color-bangalore)" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Occupancy Comparison</CardTitle>
            <CardDescription>Monthly occupancy rates across properties (%)</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer
              config={{
                mumbai: {
                  label: "Mumbai",
                  color: "hsl(var(--chart-1))",
                },
                delhi: {
                  label: "Delhi",
                  color: "hsl(var(--chart-2))",
                },
                bangalore: {
                  label: "Bangalore",
                  color: "hsl(var(--chart-3))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={occupancyComparison} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="mumbai" fill="var(--color-mumbai)" name="Mumbai" />
                  <Bar dataKey="delhi" fill="var(--color-delhi)" name="Delhi" />
                  <Bar dataKey="bangalore" fill="var(--color-bangalore)" name="Bangalore" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Guest Satisfaction Comparison</CardTitle>
            <CardDescription>Monthly satisfaction ratings across properties (out of 5)</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer
              config={{
                mumbai: {
                  label: "Mumbai",
                  color: "hsl(var(--chart-1))",
                },
                delhi: {
                  label: "Delhi",
                  color: "hsl(var(--chart-2))",
                },
                bangalore: {
                  label: "Bangalore",
                  color: "hsl(var(--chart-3))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={satisfactionComparison} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[4, 5]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="mumbai" stroke="var(--color-mumbai)" />
                  <Line type="monotone" dataKey="delhi" stroke="var(--color-delhi)" />
                  <Line type="monotone" dataKey="bangalore" stroke="var(--color-bangalore)" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
