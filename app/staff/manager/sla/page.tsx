"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowDown, ArrowUp, Clock, Download, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ManagerSlaChart } from "@/components/manager/manager-sla-chart"
import { ManagerSlaBreachTable } from "@/components/manager/manager-sla-breach-table"
import { ManagerSlaTrends } from "@/components/manager/manager-sla-trends"

export default function ManagerSla() {
  const [timeRange, setTimeRange] = useState("week")
  const [departmentFilter, setDepartmentFilter] = useState("all")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SLA Monitoring</h1>
          <p className="text-muted-foreground">Track service level agreement compliance and breaches</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
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
            <CardTitle className="text-sm font-medium">Overall SLA Compliance</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
                <ArrowDown className="mr-1 h-3 w-3" />
                1.8%
              </Badge>
              <p className="text-xs text-muted-foreground">from target (96%)</p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
              <div className="flex flex-col items-center">
                <span className="font-medium text-blue-500">97.1%</span>
                <span className="text-muted-foreground">Room Service</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium text-amber-500">91.3%</span>
                <span className="text-muted-foreground">Housekeeping</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium text-purple-500">94.2%</span>
                <span className="text-muted-foreground">Spa</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active SLA Breaches</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
                <ArrowUp className="mr-1 h-3 w-3" />3
              </Badge>
              <p className="text-xs text-muted-foreground">from yesterday</p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
              <div className="flex flex-col items-center">
                <span className="font-medium text-blue-500">2</span>
                <span className="text-muted-foreground">Room Service</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium text-amber-500">4</span>
                <span className="text-muted-foreground">Housekeeping</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium text-purple-500">1</span>
                <span className="text-muted-foreground">Spa</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.2 min</div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
                <ArrowUp className="mr-1 h-3 w-3" />
                0.4 min
              </Badge>
              <p className="text-xs text-muted-foreground">from target (7.8 min)</p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
              <div className="flex flex-col items-center">
                <span className="font-medium text-blue-500">6.5 min</span>
                <span>Room Service</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium text-amber-500">9.8 min</span>
                <span>Housekeeping</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium text-purple-500">8.3 min</span>
                <span>Spa</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SLA Trend</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Declining</div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
                <ArrowDown className="mr-1 h-3 w-3" />
                2.1%
              </Badge>
              <p className="text-xs text-muted-foreground">week-over-week</p>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span>Last Week</span>
                <span className="font-medium text-green-500">96.3%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>This Week</span>
                <span className="font-medium text-red-500">94.2%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>Forecast</span>
                <span className="font-medium text-amber-500">93.8%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="breaches">SLA Breaches</TabsTrigger>
          <TabsTrigger value="trends">Trends & Analysis</TabsTrigger>
          <TabsTrigger value="settings">SLA Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>SLA Compliance by Department</CardTitle>
                <CardDescription>Performance against service level agreements</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ManagerSlaChart />
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Active SLA Breaches</CardTitle>
                  <CardDescription>Currently unresolved SLA violations</CardDescription>
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
              <CardContent>
                <ManagerSlaBreachTable />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>SLA Compliance Trends</CardTitle>
              <CardDescription>Historical trends and forecasted compliance</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ManagerSlaTrends />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="breaches" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SLA Breach Analysis</CardTitle>
              <CardDescription>Detailed analysis of service level agreement violations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">SLA breach analysis will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SLA Trends & Analysis</CardTitle>
              <CardDescription>Long-term trends and performance analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">SLA trends and analysis will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SLA Configuration</CardTitle>
              <CardDescription>Configure service level agreement parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">SLA configuration settings will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
