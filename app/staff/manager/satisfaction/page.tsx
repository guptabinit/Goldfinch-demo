"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BarChart, Download, Heart, RefreshCw, Star, TrendingUp } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ManagerSatisfactionChart } from "@/components/manager/manager-satisfaction-chart"
import { ManagerNpsChart } from "@/components/manager/manager-nps-chart"
import { ManagerSatisfactionHeatmap } from "@/components/manager/manager-satisfaction-heatmap"

export default function ManagerSatisfaction() {
  const [timeRange, setTimeRange] = useState("month")
  const [departmentFilter, setDepartmentFilter] = useState("all")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Guest Satisfaction</h1>
          <p className="text-muted-foreground">Monitor and analyze guest satisfaction metrics across all services</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Satisfaction</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.7/5.0</div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                <TrendingUp className="mr-1 h-3 w-3" />
                0.2
              </Badge>
              <p className="text-xs text-muted-foreground">from last month</p>
            </div>
            <div className="mt-4 flex items-center">
              <div className="flex-1 space-y-1">
                <div className="flex items-center text-xs">
                  <span className="w-8">5★</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full" style={{ width: "75%" }}></div>
                  </div>
                  <span className="w-8 text-right">75%</span>
                </div>
                <div className="flex items-center text-xs">
                  <span className="w-8">4★</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="bg-green-400 h-full" style={{ width: "20%" }}></div>
                  </div>
                  <span className="w-8 text-right">20%</span>
                </div>
                <div className="flex items-center text-xs">
                  <span className="w-8">≤3★</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full" style={{ width: "5%" }}></div>
                  </div>
                  <span className="w-8 text-right">5%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Promoter Score</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72</div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                <TrendingUp className="mr-1 h-3 w-3" />5
              </Badge>
              <p className="text-xs text-muted-foreground">from last quarter</p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
              <div className="flex flex-col items-center">
                <span className="font-medium text-green-500">78%</span>
                <span className="text-muted-foreground">Promoters</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium text-gray-500">16%</span>
                <span className="text-muted-foreground">Passives</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium text-red-500">6%</span>
                <span className="text-muted-foreground">Detractors</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CSAT Score</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                <TrendingUp className="mr-1 h-3 w-3" />
                2%
              </Badge>
              <p className="text-xs text-muted-foreground">from last month</p>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span>Room Service</span>
                <span className="font-medium">96%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>Housekeeping</span>
                <span className="font-medium">92%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>Spa & Wellness</span>
                <span className="font-medium">97%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Repeat Guest Rate</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38%</div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                <TrendingUp className="mr-1 h-3 w-3" />
                3%
              </Badge>
              <p className="text-xs text-muted-foreground">year-over-year</p>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span>Business Travelers</span>
                <span className="font-medium">52%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>Leisure Travelers</span>
                <span className="font-medium">31%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>Group Bookings</span>
                <span className="font-medium">45%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="nps">NPS Analysis</TabsTrigger>
          <TabsTrigger value="csat">CSAT Metrics</TabsTrigger>
          <TabsTrigger value="trends">Satisfaction Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Satisfaction by Department</CardTitle>
                <CardDescription>Guest satisfaction ratings across hotel services</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ManagerSatisfactionChart />
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Net Promoter Score Breakdown</CardTitle>
                <CardDescription>Distribution of promoters, passives, and detractors</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ManagerNpsChart />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Satisfaction Heatmap</CardTitle>
                <CardDescription>Guest satisfaction by service type and time period</CardDescription>
              </div>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="room-service">Room Service</SelectItem>
                  <SelectItem value="housekeeping">Housekeeping</SelectItem>
                  <SelectItem value="spa">Spa & Wellness</SelectItem>
                  <SelectItem value="front-desk">Front Desk</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ManagerSatisfactionHeatmap />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nps" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Net Promoter Score Analysis</CardTitle>
              <CardDescription>Detailed analysis of NPS metrics and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">NPS analysis will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="csat" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Satisfaction Score</CardTitle>
              <CardDescription>Detailed CSAT metrics and analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">CSAT metrics will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Satisfaction Trends</CardTitle>
              <CardDescription>Historical trends and analysis of guest satisfaction metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Satisfaction trends will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
