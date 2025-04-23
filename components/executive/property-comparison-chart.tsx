"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data
const data = [
  { metric: "Revenue (Lakhs)", mumbai: 120, delhi: 100, bangalore: 80 },
  { metric: "Occupancy (%)", mumbai: 85, delhi: 80, bangalore: 75 },
  { metric: "ADR (₹)", mumbai: 12000, delhi: 10000, bangalore: 9000 },
  { metric: "RevPAR (₹)", mumbai: 10200, delhi: 8000, bangalore: 6750 },
  { metric: "Guest Satisfaction", mumbai: 4.5, delhi: 4.3, bangalore: 4.4 },
]

export function PropertyComparisonChart() {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Cross-Property Comparison</CardTitle>
        <CardDescription>Key metrics across different properties</CardDescription>
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
            <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="metric" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="mumbai" fill="var(--color-mumbai)" />
              <Bar dataKey="delhi" fill="var(--color-delhi)" />
              <Bar dataKey="bangalore" fill="var(--color-bangalore)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
