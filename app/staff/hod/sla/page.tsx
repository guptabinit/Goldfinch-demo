"use client"

import { useState } from "react"
import { AlertTriangle, Clock, Filter, Search, Download, Bell, Settings, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useStaffAuth } from "@/lib/auth/staff-auth-context"
import { HodSlaGauge } from "@/components/hod/hod-sla-gauge"

// Mock SLA data
const slaData = {
  dining: {
    adherence: 94,
    violations: 3,
    avgResponseTime: "4.2 min",
    avgResolutionTime: "18 min",
    targetResponseTime: "5 min",
    targetResolutionTime: "20 min",
  },
  housekeeping: {
    adherence: 97,
    violations: 1,
    avgResponseTime: "6.5 min",
    avgResolutionTime: "22 min",
    targetResponseTime: "10 min",
    targetResolutionTime: "30 min",
  },
  spa: {
    adherence: 100,
    violations: 0,
    avgResponseTime: "3.8 min",
    avgResolutionTime: "65 min",
    targetResponseTime: "5 min",
    targetResolutionTime: "75 min",
  },
}

// Mock SLA violations
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
    reason: "Staff shortage during peak hours",
    resolution: "Additional staff assigned to room service",
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
    reason: "Multiple priority requests at the same time",
    resolution: "Pending manager review",
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
    reason: "Kitchen backlog due to large event",
    resolution: "Complimentary dessert offered as compensation",
  },
  {
    id: "sla-004",
    orderType: "Room Service",
    roomNumber: "418",
    guestName: "Jennifer Wilson",
    requestTime: "07:30 PM",
    responseTime: "08:05 PM",
    slaTime: "15 min",
    actualTime: "35 min",
    status: "resolved",
    assignedTo: "James Wilson",
    reason: "Elevator maintenance caused delay",
    resolution: "Service charge waived",
  },
  {
    id: "sla-005",
    orderType: "Spa",
    roomNumber: "621",
    guestName: "Robert Johnson",
    requestTime: "02:00 PM",
    responseTime: "02:18 PM",
    slaTime: "15 min",
    actualTime: "18 min",
    status: "resolved",
    assignedTo: "Sophia Rodriguez",
    reason: "Therapist was finishing previous session",
    resolution: "Extended treatment time at no extra charge",
  },
]

// Mock SLA settings
const slaSettings = [
  {
    department: "Dining",
    serviceType: "Room Service",
    responseTime: "15 min",
    resolutionTime: "30 min",
    priority: "Normal",
  },
  {
    department: "Dining",
    serviceType: "Room Service - VIP",
    responseTime: "10 min",
    resolutionTime: "25 min",
    priority: "High",
  },
  {
    department: "Housekeeping",
    serviceType: "Room Cleaning",
    responseTime: "20 min",
    resolutionTime: "45 min",
    priority: "Normal",
  },
  {
    department: "Housekeeping",
    serviceType: "Amenity Request",
    responseTime: "15 min",
    resolutionTime: "20 min",
    priority: "Normal",
  },
  {
    department: "Spa",
    serviceType: "Appointment Booking",
    responseTime: "15 min",
    resolutionTime: "30 min",
    priority: "Normal",
  },
  {
    department: "Spa",
    serviceType: "Spa Treatment",
    responseTime: "10 min",
    resolutionTime: "As scheduled",
    priority: "High",
  },
]

export default function SlaDashboard() {
  const { user } = useStaffAuth()
  const [department, setDepartment] = useState<"dining" | "housekeeping" | "spa">("dining")
  const [activeTab, setActiveTab] = useState("violations")
  const [searchQuery, setSearchQuery] = useState("")

  // Set department based on user's department
  useState(() => {
    if (user?.department) {
      const dept = user.department.toLowerCase()
      if (dept.includes("dining") || dept.includes("f&b")) {
        setDepartment("dining")
      } else if (dept.includes("housekeeping")) {
        setDepartment("housekeeping")
      } else if (dept.includes("spa")) {
        setDepartment("spa")
      }
    }
  })

  // Filter violations based on search
  const filteredViolations = slaViolations.filter((violation) => {
    return (
      violation.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      violation.roomNumber.includes(searchQuery) ||
      violation.orderType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      violation.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  // Get department name
  const getDepartmentName = () => {
    switch (department) {
      case "dining":
        return "F&B"
      case "housekeeping":
        return "Housekeeping"
      case "spa":
        return "Spa & Wellness"
      default:
        return "Department"
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b bg-white p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-goldfinch-gold" />
            <div>
              <h1 className="text-2xl font-bold">SLA Monitoring</h1>
              <p className="text-muted-foreground">{getDepartmentName()} Department</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Select
              defaultValue={department}
              onValueChange={(value: "dining" | "housekeeping" | "spa") => setDepartment(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dining">F&B Department</SelectItem>
                <SelectItem value="housekeeping">Housekeeping</SelectItem>
                <SelectItem value="spa">Spa & Wellness</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Date Range</span>
            </Button>
            <Button variant="outline" className="gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Alerts</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {/* SLA Overview */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>SLA Adherence</CardTitle>
              <CardDescription>Overall service level agreement performance</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <HodSlaGauge value={slaData[department].adherence} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Response Time</CardTitle>
              <CardDescription>Average time to respond to requests</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="flex items-center justify-center w-32 h-32 rounded-full border-8 border-goldfinch-gold/20">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{slaData[department].avgResponseTime}</div>
                    <div className="text-sm text-muted-foreground">Average</div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <div className="text-sm font-medium">Target: {slaData[department].targetResponseTime}</div>
                  <div className="text-xs text-muted-foreground">
                    {Number.parseFloat(slaData[department].avgResponseTime) <
                    Number.parseFloat(slaData[department].targetResponseTime)
                      ? "Under target ✓"
                      : "Over target ✗"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resolution Time</CardTitle>
              <CardDescription>Average time to complete requests</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="flex items-center justify-center w-32 h-32 rounded-full border-8 border-goldfinch-gold/20">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{slaData[department].avgResolutionTime}</div>
                    <div className="text-sm text-muted-foreground">Average</div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <div className="text-sm font-medium">Target: {slaData[department].targetResolutionTime}</div>
                  <div className="text-xs text-muted-foreground">
                    {Number.parseFloat(slaData[department].avgResolutionTime) <
                    Number.parseFloat(slaData[department].targetResolutionTime)
                      ? "Under target ✓"
                      : "Over target ✗"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SLA Management Tabs */}
        <Tabs defaultValue="violations" onValueChange={setActiveTab}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="violations">SLA Violations</TabsTrigger>
              <TabsTrigger value="settings">SLA Settings</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2 mt-4 sm:mt-0">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-8 w-full sm:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="violations" className="mt-0">
            <Card>
              <CardContent className="p-0">
                <div className="rounded-md">
                  <div className="grid grid-cols-12 bg-muted/50 p-3 text-sm font-medium">
                    <div className="col-span-2">Order Type</div>
                    <div className="col-span-1">Room</div>
                    <div className="col-span-2">Guest</div>
                    <div className="col-span-1">Request Time</div>
                    <div className="col-span-1">SLA Time</div>
                    <div className="col-span-1">Actual Time</div>
                    <div className="col-span-1">Status</div>
                    <div className="col-span-1">Assigned To</div>
                    <div className="col-span-2">Resolution</div>
                  </div>
                  {filteredViolations.length > 0 ? (
                    filteredViolations.map((violation) => (
                      <div key={violation.id} className="grid grid-cols-12 items-center border-t p-3 text-sm">
                        <div className="col-span-2">{violation.orderType}</div>
                        <div className="col-span-1 font-medium">{violation.roomNumber}</div>
                        <div className="col-span-2">{violation.guestName}</div>
                        <div className="col-span-1">{violation.requestTime}</div>
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
                        <div className="col-span-1">{violation.assignedTo}</div>
                        <div className="col-span-2 truncate" title={violation.resolution}>
                          {violation.resolution}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">No SLA violations found.</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-0">
            <Card>
              <CardContent className="p-0">
                <div className="rounded-md">
                  <div className="grid grid-cols-12 bg-muted/50 p-3 text-sm font-medium">
                    <div className="col-span-2">Department</div>
                    <div className="col-span-3">Service Type</div>
                    <div className="col-span-2">Response Time</div>
                    <div className="col-span-2">Resolution Time</div>
                    <div className="col-span-2">Priority</div>
                    <div className="col-span-1">Actions</div>
                  </div>
                  {slaSettings.map((setting, index) => (
                    <div key={index} className="grid grid-cols-12 items-center border-t p-3 text-sm">
                      <div className="col-span-2">{setting.department}</div>
                      <div className="col-span-3 font-medium">{setting.serviceType}</div>
                      <div className="col-span-2">{setting.responseTime}</div>
                      <div className="col-span-2">{setting.resolutionTime}</div>
                      <div className="col-span-2">
                        <Badge
                          variant={setting.priority === "High" ? "default" : "outline"}
                          className="whitespace-nowrap"
                        >
                          {setting.priority}
                        </Badge>
                      </div>
                      <div className="col-span-1">
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <div className="flex justify-end p-4 border-t">
                <Button>Add New SLA Rule</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* SLA Alerts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>SLA Alert Settings</CardTitle>
              <CardDescription>Configure when and how to receive SLA violation alerts</CardDescription>
            </div>
            <Button variant="outline" className="gap-2">
              <Settings className="h-4 w-4" />
              <span>Configure</span>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Response Time Alerts</p>
                    <p className="text-sm text-muted-foreground">Notify when response time exceeds SLA</p>
                  </div>
                </div>
                <Badge variant="outline">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Escalation Alerts</p>
                    <p className="text-sm text-muted-foreground">Automatically escalate after 2 SLA breaches</p>
                  </div>
                </div>
                <Badge variant="outline">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Notification Channels</p>
                    <p className="text-sm text-muted-foreground">Email, SMS, and Dashboard alerts</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
