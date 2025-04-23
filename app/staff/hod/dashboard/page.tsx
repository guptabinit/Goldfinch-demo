"use client"

import { useState, useEffect } from "react"
import {
  LayoutDashboard,
  Clock,
  AlertTriangle,
  CheckCircle,
  Users,
  ArrowUpDown,
  Download,
  Calendar,
  Filter,
  Search,
  Building,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useStaffAuth } from "@/lib/auth/staff-auth-context"
import { HodMetricsChart } from "@/components/hod/hod-metrics-chart"
import { HodPerformanceTable } from "@/components/hod/hod-performance-table"
import { HodSlaGauge } from "@/components/hod/hod-sla-gauge"
// Add the department selector import at the top
import { DepartmentSelector } from "@/components/hod/department-selector"

// Mock data for the dashboard
const departmentMetrics = {
  dining: {
    activeOrders: 12,
    pendingOrders: 5,
    completedToday: 47,
    slaViolations: 3,
    staffOnDuty: 8,
    avgResponseTime: "4.2 min",
    avgCompletionTime: "18 min",
    slaAdherence: 94,
  },
  housekeeping: {
    activeOrders: 8,
    pendingOrders: 3,
    completedToday: 32,
    slaViolations: 1,
    staffOnDuty: 12,
    avgResponseTime: "6.5 min",
    avgCompletionTime: "22 min",
    slaAdherence: 97,
  },
  spa: {
    activeOrders: 5,
    pendingOrders: 2,
    completedToday: 18,
    slaViolations: 0,
    staffOnDuty: 6,
    avgResponseTime: "3.8 min",
    avgCompletionTime: "65 min",
    slaAdherence: 100,
  },
  roomservice: {
    activeOrders: 10,
    pendingOrders: 4,
    completedToday: 38,
    slaViolations: 2,
    staffOnDuty: 7,
    avgResponseTime: "5.1 min",
    avgCompletionTime: "25 min",
    slaAdherence: 95,
  },
}

// Mock data for SLA violations
const slaViolations = [
  {
    id: "sla-001",
    orderType: "Room Service",
    roomNumber: "304",
    guestName: "John Smith",
    requestTime: "10:30 AM",
    responseTime: "10:52 AM",
    slaTime: "15 min",
    actualTime: "22 min",
    status: "resolved",
    assignedTo: "David Chen",
  },
  {
    id: "sla-002",
    orderType: "Housekeeping",
    roomNumber: "512",
    guestName: "Emily Davis",
    requestTime: "09:15 AM",
    responseTime: "09:48 AM",
    slaTime: "20 min",
    actualTime: "33 min",
    status: "escalated",
    assignedTo: "Maria Garcia",
  },
  {
    id: "sla-003",
    orderType: "Dining",
    roomNumber: "207",
    guestName: "Michael Brown",
    requestTime: "11:45 AM",
    responseTime: "12:10 PM",
    slaTime: "20 min",
    actualTime: "25 min",
    status: "resolved",
    assignedTo: "Chef Ravi",
  },
]

// Mock data for staff performance
const staffPerformance = [
  {
    id: 1,
    name: "David Chen",
    role: "Waiter",
    ordersCompleted: 18,
    avgResponseTime: "3.2 min",
    slaAdherence: 98,
    customerRating: 4.8,
  },
  {
    id: 2,
    name: "Maria Garcia",
    role: "Housekeeper",
    ordersCompleted: 12,
    avgResponseTime: "5.5 min",
    slaAdherence: 92,
    customerRating: 4.6,
  },
  {
    id: 3,
    name: "James Wilson",
    role: "Room Service",
    ordersCompleted: 15,
    avgResponseTime: "4.1 min",
    slaAdherence: 95,
    customerRating: 4.7,
  },
  {
    id: 4,
    name: "Sophia Rodriguez",
    role: "Spa Therapist",
    ordersCompleted: 8,
    avgResponseTime: "3.8 min",
    slaAdherence: 100,
    customerRating: 4.9,
  },
]

export default function HodDashboard() {
  const { user, updateUserDepartment } = useStaffAuth()
  const [department, setDepartment] = useState<"dining" | "housekeeping" | "spa" | "roomservice">("housekeeping")
  const [metrics, setMetrics] = useState(departmentMetrics.housekeeping)
  const [timeRange, setTimeRange] = useState("today")
  const [isLoading, setIsLoading] = useState(false)

  // Set department based on user's department
  useEffect(() => {
    if (user?.department) {
      const dept = user.department.toLowerCase()
      if (dept.includes("dining") || dept.includes("f&b")) {
        setDepartment("dining")
        setMetrics(departmentMetrics.dining)
      } else if (dept.includes("housekeeping")) {
        setDepartment("housekeeping")
        setMetrics(departmentMetrics.housekeeping)
      } else if (dept.includes("spa")) {
        setDepartment("spa")
        setMetrics(departmentMetrics.spa)
      } else if (dept.includes("room") || dept.includes("service")) {
        setDepartment("roomservice")
        setMetrics(departmentMetrics.roomservice)
      }
    }
  }, [user])

  // Handle time range change
  const handleTimeRangeChange = (value: string) => {
    setIsLoading(true)
    setTimeRange(value)

    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }

  // Handle department change
  const handleDepartmentChange = (value: "dining" | "housekeeping" | "spa" | "roomservice") => {
    setIsLoading(true)
    setDepartment(value)
    setMetrics(departmentMetrics[value])

    // Update user department in context
    const deptMap = {
      dining: "Dining",
      housekeeping: "Housekeeping",
      spa: "Spa & Wellness",
      roomservice: "Room Service",
    }

    updateUserDepartment(deptMap[value])

    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }

  // Get department name
  const getDepartmentName = () => {
    switch (department) {
      case "dining":
        return "F&B"
      case "housekeeping":
        return "Housekeeping"
      case "spa":
        return "Spa & Wellness"
      case "roomservice":
        return "Room Service"
      default:
        return "Department"
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b bg-white p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6 text-goldfinch-gold" />
            <div>
              <h1 className="text-2xl font-bold">{getDepartmentName()} Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user?.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-goldfinch-gold/10 px-3 py-1.5 rounded-md">
              <Building className="h-4 w-4 text-goldfinch-gold" />
              <Select defaultValue={department} onValueChange={handleDepartmentChange}>
                <SelectTrigger className="w-[180px] border-none bg-transparent focus:ring-0 shadow-none">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="housekeeping">Housekeeping</SelectItem>
                  <SelectItem value="dining">F&B Department</SelectItem>
                  <SelectItem value="spa">Spa & Wellness</SelectItem>
                  <SelectItem value="roomservice">Room Service</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Select defaultValue={timeRange} onValueChange={handleTimeRangeChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Custom Range</span>
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>
      </div>
      {/* Add the department selector in the page content, right after the header section */}
      <div className="mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Department Selection</CardTitle>
            <CardDescription>Change department for demonstration purposes</CardDescription>
          </CardHeader>
          <CardContent>
            <DepartmentSelector />
          </CardContent>
        </Card>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-goldfinch-gold border-t-transparent"></div>
          </div>
        ) : (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Orders</p>
                      <p className="text-3xl font-bold">{metrics.activeOrders}</p>
                    </div>
                    <div className="rounded-full p-2 bg-blue-100">
                      <Clock className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Completed Today</p>
                      <p className="text-3xl font-bold">{metrics.completedToday}</p>
                    </div>
                    <div className="rounded-full p-2 bg-green-100">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">SLA Violations</p>
                      <p className="text-3xl font-bold">{metrics.slaViolations}</p>
                    </div>
                    <div className="rounded-full p-2 bg-red-100">
                      <AlertTriangle className="h-6 w-6 text-red-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Staff On Duty</p>
                      <p className="text-3xl font-bold">{metrics.staffOnDuty}</p>
                    </div>
                    <div className="rounded-full p-2 bg-purple-100">
                      <Users className="h-6 w-6 text-purple-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* SLA Adherence */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>SLA Adherence</CardTitle>
                  <CardDescription>Overall service level agreement performance</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <HodSlaGauge value={metrics.slaAdherence} />
                </CardContent>
                <CardFooter>
                  <div className="w-full flex justify-between text-sm">
                    <div>
                      <p className="font-medium">Avg. Response Time</p>
                      <p className="text-muted-foreground">{metrics.avgResponseTime}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Avg. Completion Time</p>
                      <p className="text-muted-foreground">{metrics.avgCompletionTime}</p>
                    </div>
                  </div>
                </CardFooter>
              </Card>

              {/* Order Metrics */}
              <Card className="col-span-1 lg:col-span-2">
                <CardHeader>
                  <CardTitle>Order Metrics</CardTitle>
                  <CardDescription>Order volume and completion rates</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <HodMetricsChart department={department} timeRange={timeRange} />
                </CardContent>
              </Card>
            </div>

            {/* Staff Performance */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Staff Performance</CardTitle>
                  <CardDescription>Performance metrics for department staff</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Filter className="h-3.5 w-3.5" />
                    <span>Filter</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Download className="h-3.5 w-3.5" />
                    <span>Export</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <HodPerformanceTable data={staffPerformance} />
              </CardContent>
            </Card>

            {/* SLA Violations */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>SLA Violations</CardTitle>
                  <CardDescription>Recent service level agreement violations</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search violations..."
                      className="pl-8 w-[250px] border-goldfinch-gold/20 focus:border-goldfinch-gold"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="h-9 gap-1">
                    <ArrowUpDown className="h-3.5 w-3.5" />
                    <span>Sort</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 bg-muted/50 p-3 text-sm font-medium">
                    <div className="col-span-2">Order Type</div>
                    <div className="col-span-1">Room</div>
                    <div className="col-span-2">Guest</div>
                    <div className="col-span-1">Request Time</div>
                    <div className="col-span-1">Response Time</div>
                    <div className="col-span-1">SLA Time</div>
                    <div className="col-span-1">Actual Time</div>
                    <div className="col-span-1">Status</div>
                    <div className="col-span-2">Assigned To</div>
                  </div>
                  {slaViolations.map((violation) => (
                    <div key={violation.id} className="grid grid-cols-12 items-center border-t p-3 text-sm">
                      <div className="col-span-2">{violation.orderType}</div>
                      <div className="col-span-1 font-medium">{violation.roomNumber}</div>
                      <div className="col-span-2">{violation.guestName}</div>
                      <div className="col-span-1">{violation.requestTime}</div>
                      <div className="col-span-1">{violation.responseTime}</div>
                      <div className="col-span-1">{violation.slaTime}</div>
                      <div className="col-span-1 font-medium text-red-500">{violation.actualTime}</div>
                      <div className="col-span-1">
                        <Badge
                          variant={violation.status === "resolved" ? "outline" : "destructive"}
                          className="whitespace-nowrap"
                        >
                          {violation.status}
                        </Badge>
                      </div>
                      <div className="col-span-2">{violation.assignedTo}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
