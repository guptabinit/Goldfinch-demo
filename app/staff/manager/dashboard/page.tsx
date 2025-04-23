"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  ArrowDown,
  ArrowUp,
  BellRing,
  Clock,
  Download,
  Hotel,
  Utensils,
  SpadeIcon as Spa,
  Users,
  RefreshCw,
  Calendar,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ManagerKpiChart } from "@/components/manager/manager-kpi-chart"
import { ManagerOrdersChart } from "@/components/manager/manager-orders-chart"
import { ManagerDepartmentPerformance } from "@/components/manager/manager-department-performance"
import { ManagerAlertsList } from "@/components/manager/manager-alerts-list"

export default function ManagerDashboard() {
  const [timeRange, setTimeRange] = useState("today")
  const [lastUpdated, setLastUpdated] = useState("2 minutes ago")

  const refreshData = () => {
    // Simulate refresh
    setLastUpdated("Just now")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Operations Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive overview of all hotel operations and performance metrics
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={refreshData}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">Last updated: {lastUpdated}</div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Active Orders</CardTitle>
            <BellRing className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                <ArrowUp className="mr-1 h-3 w-3" />
                12%
              </Badge>
              <p className="text-xs text-muted-foreground">from yesterday</p>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center">
                <div className="mr-1 h-2 w-2 rounded-full bg-blue-500"></div>
                <span>Room Service: 18</span>
              </div>
              <div className="flex items-center">
                <div className="mr-1 h-2 w-2 rounded-full bg-amber-500"></div>
                <span>Housekeeping: 15</span>
              </div>
              <div className="flex items-center">
                <div className="mr-1 h-2 w-2 rounded-full bg-purple-500"></div>
                <span>Spa: 9</span>
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
                3%
              </Badge>
              <p className="text-xs text-muted-foreground">from target (8 min)</p>
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
            <CardTitle className="text-sm font-medium">Guest Satisfaction</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.7/5.0</div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                <ArrowUp className="mr-1 h-3 w-3" />
                0.2
              </Badge>
              <p className="text-xs text-muted-foreground">from last week</p>
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
            <CardTitle className="text-sm font-medium">SLA Compliance</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
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
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="room-service">
            <Utensils className="mr-2 h-4 w-4" />
            Room Service
          </TabsTrigger>
          <TabsTrigger value="housekeeping">
            <Hotel className="mr-2 h-4 w-4" />
            Housekeeping
          </TabsTrigger>
          <TabsTrigger value="spa">
            <Spa className="mr-2 h-4 w-4" />
            Spa & Wellness
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Key Performance Indicators</CardTitle>
                <CardDescription>Tracking operational efficiency across departments</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ManagerKpiChart />
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Orders by Department</CardTitle>
                <CardDescription>Distribution and completion rates of service orders</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ManagerOrdersChart />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
                <CardDescription>Comparative analysis of key metrics across departments</CardDescription>
              </CardHeader>
              <CardContent>
                <ManagerDepartmentPerformance />
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Critical Alerts</CardTitle>
                <CardDescription>Urgent issues requiring immediate attention</CardDescription>
              </CardHeader>
              <CardContent>
                <ManagerAlertsList />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="room-service" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Room Service Department</CardTitle>
              <CardDescription>Detailed metrics and performance for Room Service operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Room Service department details will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="housekeeping" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Housekeeping Department</CardTitle>
              <CardDescription>Detailed metrics and performance for Housekeeping operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Housekeeping department details will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="spa" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Spa & Wellness Department</CardTitle>
              <CardDescription>Detailed metrics and performance for Spa & Wellness operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Spa & Wellness department details will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
