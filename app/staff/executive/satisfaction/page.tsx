"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricCard } from "@/components/executive/metric-card"
import { SatisfactionChart } from "@/components/executive/satisfaction-chart"
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
import { ThumbsUp, TrendingUp, MessageSquare, Award } from "lucide-react"

// Sample data
const sentimentAnalysis = [
  { category: "Positive", value: 65 },
  { category: "Neutral", value: 25 },
  { category: "Negative", value: 10 },
]

const COLORS = ["#4CAF50", "#FFC107", "#F44336"]

const feedbackByDepartment = [
  { department: "Housekeeping", positive: 80, neutral: 15, negative: 5 },
  { department: "Front Desk", positive: 75, neutral: 15, negative: 10 },
  { department: "Dining", positive: 70, neutral: 20, negative: 10 },
  { department: "Spa", positive: 85, neutral: 10, negative: 5 },
  { department: "Concierge", positive: 90, neutral: 8, negative: 2 },
]

const npsScores = [
  { month: "Jan", score: 65 },
  { month: "Feb", score: 68 },
  { month: "Mar", score: 70 },
  { month: "Apr", score: 72 },
  { month: "May", score: 75 },
  { month: "Jun", score: 78 },
]

export default function SatisfactionDashboard() {
  const [timeframe, setTimeframe] = useState("month")

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Guest Satisfaction Dashboard</h1>
          <p className="text-muted-foreground">Analyze guest feedback and satisfaction metrics.</p>
        </div>
        <Tabs defaultValue="month" value={timeframe} onValueChange={setTimeframe}>
          <TabsList>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="quarter">Quarter</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Overall Satisfaction"
          value="4.7/5"
          description={`Average rating for this ${timeframe}`}
          icon={<ThumbsUp className="h-4 w-4" />}
          trend={{ value: 0.2, isPositive: true }}
        />
        <MetricCard
          title="NPS Score"
          value="78"
          description="Net Promoter Score"
          icon={<TrendingUp className="h-4 w-4" />}
          trend={{ value: 3, isPositive: true }}
        />
        <MetricCard
          title="Feedback Count"
          value="1,245"
          description={`Total feedback received this ${timeframe}`}
          icon={<MessageSquare className="h-4 w-4" />}
          trend={{ value: 15.3, isPositive: true }}
        />
        <MetricCard
          title="Repeat Guests"
          value="68%"
          description="Percentage of returning guests"
          icon={<Award className="h-4 w-4" />}
          trend={{ value: 5.2, isPositive: true }}
        />
      </div>

      <div className="mt-6 grid gap-6">
        <SatisfactionChart />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sentiment Analysis</CardTitle>
            <CardDescription>Distribution of guest feedback sentiment</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentAnalysis}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ category, percent }) => `${category}: ${(percent * 100).toFixed(0)}%`}
                >
                  {sentimentAnalysis.map((entry, index) => (
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
            <CardTitle>NPS Score Trend</CardTitle>
            <CardDescription>Net Promoter Score over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer
              config={{
                score: {
                  label: "NPS Score",
                  color: "hsl(var(--chart-1))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={npsScores} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="var(--color-score)"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Feedback by Department</CardTitle>
            <CardDescription>Sentiment breakdown across hotel departments</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ChartContainer
              config={{
                positive: {
                  label: "Positive (%)",
                  color: "hsl(var(--chart-1))",
                },
                neutral: {
                  label: "Neutral (%)",
                  color: "hsl(var(--chart-2))",
                },
                negative: {
                  label: "Negative (%)",
                  color: "hsl(var(--chart-3))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={feedbackByDepartment} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="positive" stackId="a" fill="var(--color-positive)" name="Positive (%)" />
                  <Bar dataKey="neutral" stackId="a" fill="var(--color-neutral)" name="Neutral (%)" />
                  <Bar dataKey="negative" stackId="a" fill="var(--color-negative)" name="Negative (%)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
