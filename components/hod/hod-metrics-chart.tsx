"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Mock data for the charts
const chartData = {
  dining: {
    today: [
      { name: "6 AM", orders: 5, completed: 5 },
      { name: "8 AM", orders: 12, completed: 10 },
      { name: "10 AM", orders: 18, completed: 15 },
      { name: "12 PM", orders: 25, completed: 22 },
      { name: "2 PM", orders: 15, completed: 14 },
      { name: "4 PM", orders: 10, completed: 8 },
      { name: "6 PM", orders: 20, completed: 18 },
      { name: "8 PM", orders: 15, completed: 12 },
    ],
    week: [
      { name: "Mon", orders: 45, completed: 42 },
      { name: "Tue", orders: 52, completed: 48 },
      { name: "Wed", orders: 48, completed: 45 },
      { name: "Thu", orders: 60, completed: 55 },
      { name: "Fri", orders: 75, completed: 70 },
      { name: "Sat", orders: 90, completed: 85 },
      { name: "Sun", orders: 80, completed: 75 },
    ],
  },
  housekeeping: {
    today: [
      { name: "6 AM", orders: 8, completed: 7 },
      { name: "8 AM", orders: 15, completed: 14 },
      { name: "10 AM", orders: 10, completed: 9 },
      { name: "12 PM", orders: 5, completed: 4 },
      { name: "2 PM", orders: 12, completed: 10 },
      { name: "4 PM", orders: 8, completed: 7 },
      { name: "6 PM", orders: 6, completed: 5 },
      { name: "8 PM", orders: 4, completed: 3 },
    ],
    week: [
      { name: "Mon", orders: 35, completed: 32 },
      { name: "Tue", orders: 42, completed: 40 },
      { name: "Wed", orders: 38, completed: 36 },
      { name: "Thu", orders: 45, completed: 42 },
      { name: "Fri", orders: 50, completed: 48 },
      { name: "Sat", orders: 30, completed: 28 },
      { name: "Sun", orders: 25, completed: 23 },
    ],
  },
  spa: {
    today: [
      { name: "6 AM", orders: 0, completed: 0 },
      { name: "8 AM", orders: 2, completed: 2 },
      { name: "10 AM", orders: 5, completed: 5 },
      { name: "12 PM", orders: 8, completed: 7 },
      { name: "2 PM", orders: 10, completed: 9 },
      { name: "4 PM", orders: 7, completed: 6 },
      { name: "6 PM", orders: 4, completed: 4 },
      { name: "8 PM", orders: 2, completed: 2 },
    ],
    week: [
      { name: "Mon", orders: 15, completed: 14 },
      { name: "Tue", orders: 18, completed: 17 },
      { name: "Wed", orders: 20, completed: 19 },
      { name: "Thu", orders: 22, completed: 21 },
      { name: "Fri", orders: 25, completed: 24 },
      { name: "Sat", orders: 30, completed: 29 },
      { name: "Sun", orders: 20, completed: 19 },
    ],
  },
}

type HodMetricsChartProps = {
  department: "dining" | "housekeeping" | "spa"
  timeRange: string
}

export function HodMetricsChart({ department, timeRange }: HodMetricsChartProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // Set chart data based on department and time range
    if (timeRange === "today" || timeRange === "yesterday") {
      setData(chartData[department].today)
    } else {
      setData(chartData[department].week)
    }
  }, [department, timeRange])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="orders" name="Total Orders" fill="#FFB800" />
        <Bar dataKey="completed" name="Completed" fill="#10B981" />
      </BarChart>
    </ResponsiveContainer>
  )
}
