"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data
const data = [
  { month: "Jan", overall: 4.2, dining: 4.5, spa: 4.0, housekeeping: 4.3, frontdesk: 4.1 },
  { month: "Feb", overall: 4.3, dining: 4.6, spa: 4.1, housekeeping: 4.4, frontdesk: 4.2 },
  { month: "Mar", overall: 4.1, dining: 4.4, spa: 3.9, housekeeping: 4.2, frontdesk: 4.0 },
  { month: "Apr", overall: 4.4, dining: 4.7, spa: 4.2, housekeeping: 4.5, frontdesk: 4.3 },
  { month: "May", overall: 4.5, dining: 4.8, spa: 4.3, housekeeping: 4.6, frontdesk: 4.4 },
  { month: "Jun", overall: 4.3, dining: 4.6, spa: 4.1, housekeeping: 4.4, frontdesk: 4.2 },
]

export function SatisfactionChart() {
  return (
    <Card className="col-span-full md:col-span-6">
      <CardHeader>
        <CardTitle>Guest Satisfaction Trends</CardTitle>
        <CardDescription>Average ratings across departments (out of 5)</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ChartContainer
          config={{
            overall: {
              label: "Overall",
              color: "hsl(var(--chart-1))",
            },
            dining: {
              label: "Dining",
              color: "hsl(var(--chart-2))",
            },
            spa: {
              label: "Spa",
              color: "hsl(var(--chart-3))",
            },
            housekeeping: {
              label: "Housekeeping",
              color: "hsl(var(--chart-4))",
            },
            frontdesk: {
              label: "Front Desk",
              color: "hsl(var(--chart-5))",
            },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[3, 5]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="overall"
                stroke="var(--color-overall)"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
              <Line type="monotone" dataKey="dining" stroke="var(--color-dining)" />
              <Line type="monotone" dataKey="spa" stroke="var(--color-spa)" />
              <Line type="monotone" dataKey="housekeeping" stroke="var(--color-housekeeping)" />
              <Line type="monotone" dataKey="frontdesk" stroke="var(--color-frontdesk)" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
