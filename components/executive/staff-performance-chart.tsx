"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from "recharts"

// Sample data
const data = [
  { subject: "Efficiency", housekeeping: 80, dining: 90, spa: 70, frontdesk: 85 },
  { subject: "Guest Rating", housekeeping: 85, dining: 95, spa: 80, frontdesk: 75 },
  { subject: "SLA Adherence", housekeeping: 90, dining: 80, spa: 85, frontdesk: 90 },
  { subject: "Upselling", housekeeping: 60, dining: 85, spa: 75, frontdesk: 70 },
  { subject: "Team Collaboration", housekeeping: 75, dining: 80, spa: 85, frontdesk: 80 },
]

export function StaffPerformanceChart() {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Department Performance Comparison</CardTitle>
        <CardDescription>Performance metrics across key departments</CardDescription>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar name="Housekeeping" dataKey="housekeeping" stroke="#8884d8" fill="#8884d8" fillOpacity={0.2} />
            <Radar name="Dining" dataKey="dining" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.2} />
            <Radar name="Spa" dataKey="spa" stroke="#ffc658" fill="#ffc658" fillOpacity={0.2} />
            <Radar name="Front Desk" dataKey="frontdesk" stroke="#ff8042" fill="#ff8042" fillOpacity={0.2} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
