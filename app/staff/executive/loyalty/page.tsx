"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricCard } from "@/components/executive/metric-card"
import { LoyaltyChart } from "@/components/executive/loyalty-chart"
import {
  BarChart,
  Bar,
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
import { Award, Users, Percent, TrendingUp } from "lucide-react"

// Sample data
const membershipTiers = [
  { name: "Gold", value: 15 },
  { name: "Platinum", value: 35 },
  { name: "Diamond", value: 40 },
  { name: "Black", value: 10 },
]

const COLORS = ["#FFD700", "#E5E4E2", "#B9F2FF", "#000000"]

const pointsEarnedByCategory = [
  { category: "Stays", points: 120000 },
  { category: "Dining", points: 75000 },
  { category: "Spa", points: 45000 },
  { category: "Events", points: 30000 },
  { category: "Referrals", points: 15000 },
]

const redemptionByCategory = [
  { category: "Room Upgrades", points: 80000 },
  { category: "Free Nights", points: 100000 },
  { category: "Dining Credits", points: 50000 },
  { category: "Spa Services", points: 35000 },
  { category: "Airport Transfers", points: 20000 },
]

export default function LoyaltyDashboard() {
  const [timeframe, setTimeframe] = useState("month")

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Loyalty Program Dashboard</h1>
          <p className="text-muted-foreground">Analyze loyalty program performance and member engagement.</p>
        </div>
        <Tabs defaultValue="month" value={timeframe} onValueChange={setTimeframe}>
          <TabsList>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="quarter">Quarter</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
            <TabsTrigger value="all">All Time</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Members"
          value="12,456"
          description="Active loyalty program members"
          icon={<Users className="h-4 w-4" />}
          trend={{ value: 5.3, isPositive: true }}
        />
        <MetricCard
          title="Points Issued"
          value="2.85M"
          description={`Points issued this ${timeframe}`}
          icon={<Award className="h-4 w-4" />}
          trend={{ value: 8.7, isPositive: true }}
        />
        <MetricCard
          title="Redemption Rate"
          value="68%"
          description="Percentage of points redeemed"
          icon={<Percent className="h-4 w-4" />}
          trend={{ value: 3.2, isPositive: true }}
        />
        <MetricCard
          title="Member Spending"
          value="₹1.2Cr"
          description="Total spending by loyalty members"
          icon={<TrendingUp className="h-4 w-4" />}
          trend={{ value: 12.5, isPositive: true }}
        />
      </div>

      <div className="mt-6 grid gap-6">
        <LoyaltyChart />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Membership Tier Distribution</CardTitle>
            <CardDescription>Breakdown of members by loyalty tier</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={membershipTiers}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {membershipTiers.map((entry, index) => (
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
            <CardTitle>Points Earned by Category</CardTitle>
            <CardDescription>Distribution of points earned across categories</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer
              config={{
                points: {
                  label: "Points",
                  color: "hsl(var(--chart-1))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pointsEarnedByCategory} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="points" fill="var(--color-points)" name="Points" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Redemption by Category</CardTitle>
            <CardDescription>How members are redeeming their loyalty points</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer
              config={{
                points: {
                  label: "Points Redeemed",
                  color: "hsl(var(--chart-1))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={redemptionByCategory} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="points" fill="var(--color-points)" name="Points Redeemed" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
