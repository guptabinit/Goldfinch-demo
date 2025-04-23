"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MetricCard } from "@/components/executive/metric-card"
import { RevenueChart } from "@/components/executive/revenue-chart"
import { UpsellingChart } from "@/components/executive/upselling-chart"
import { UtilizationChart } from "@/components/executive/utilization-chart"
import { SatisfactionChart } from "@/components/executive/satisfaction-chart"
import { LoyaltyChart } from "@/components/executive/loyalty-chart"
import { StaffPerformanceChart } from "@/components/executive/staff-performance-chart"
import { PropertyComparisonChart } from "@/components/executive/property-comparison-chart"
import { TrendingUp, Users, Award, ThumbsUp, Calendar, DollarSign, Percent, UserCheck } from "lucide-react"

export default function ExecutiveDashboard() {
  const [timeframe, setTimeframe] = useState("today")

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Executive Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to your executive overview.</p>
        </div>
        <Tabs defaultValue="today" value={timeframe} onValueChange={setTimeframe}>
          <TabsList>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
            <TabsTrigger value="quarter">This Quarter</TabsTrigger>
            <TabsTrigger value="year">This Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Revenue"
          value="₹28,56,789"
          description={`Total revenue for ${timeframe}`}
          icon={<DollarSign className="h-4 w-4" />}
          trend={{ value: 12.5, isPositive: true }}
        />
        <MetricCard
          title="Occupancy Rate"
          value="85%"
          description={`Average occupancy for ${timeframe}`}
          icon={<Percent className="h-4 w-4" />}
          trend={{ value: 3.2, isPositive: true }}
        />
        <MetricCard
          title="Upselling Revenue"
          value="₹3,45,678"
          description={`Revenue from upselling for ${timeframe}`}
          icon={<TrendingUp className="h-4 w-4" />}
          trend={{ value: 8.7, isPositive: true }}
        />
        <MetricCard
          title="Guest Satisfaction"
          value="4.7/5"
          description={`Average rating for ${timeframe}`}
          icon={<ThumbsUp className="h-4 w-4" />}
          trend={{ value: 0.2, isPositive: true }}
        />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Loyalty Members"
          value="12,456"
          description="Total active loyalty program members"
          icon={<Award className="h-4 w-4" />}
          trend={{ value: 5.3, isPositive: true }}
        />
        <MetricCard
          title="Service Utilization"
          value="72%"
          description="Average service utilization rate"
          icon={<Users className="h-4 w-4" />}
          trend={{ value: 2.1, isPositive: true }}
        />
        <MetricCard
          title="Staff Performance"
          value="88%"
          description="Average staff performance score"
          icon={<UserCheck className="h-4 w-4" />}
          trend={{ value: 1.5, isPositive: true }}
        />
        <MetricCard
          title="Total Bookings"
          value="1,234"
          description={`Total bookings for ${timeframe}`}
          icon={<Calendar className="h-4 w-4" />}
          trend={{ value: 7.8, isPositive: true }}
        />
      </div>

      <div className="mt-6 grid gap-6">
        <RevenueChart />
      </div>

      <div className="mt-6 grid gap-6">
        <UpsellingChart />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-12">
        <UtilizationChart />
        <SatisfactionChart />
      </div>

      <div className="mt-6 grid gap-6">
        <LoyaltyChart />
      </div>

      <div className="mt-6 grid gap-6">
        <StaffPerformanceChart />
      </div>

      <div className="mt-6 grid gap-6">
        <PropertyComparisonChart />
      </div>
    </div>
  )
}
