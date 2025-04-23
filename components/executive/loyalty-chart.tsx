"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data
const data = [
  { month: "Jan", enrollment: 120, redemption: 80 },
  { month: "Feb", enrollment: 140, redemption: 90 },
  { month: "Mar", enrollment: 160, redemption: 100 },
  { month: "Apr", enrollment: 180, redemption: 110 },
  { month: "May", enrollment: 200, redemption: 120 },
  { month: "Jun", enrollment: 220, redemption: 130 },
]

export function LoyaltyChart() {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Loyalty Program Metrics</CardTitle>
        <CardDescription>Member enrollment and point redemption trends</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ChartContainer
          config={{
            enrollment: {
              label: "New Enrollments",
              color: "hsl(var(--chart-1))",
            },
            redemption: {
              label: "Point Redemptions",
              color: "hsl(var(--chart-2))",
            },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="enrollment" fill="var(--color-enrollment)" />
              <Bar dataKey="redemption" fill="var(--color-redemption)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
