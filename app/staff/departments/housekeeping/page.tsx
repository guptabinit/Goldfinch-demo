"use client"

import { useState } from "react"
import { Bed, Search, CalendarClock, RefreshCcw, ArrowUpDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock housekeeping requests
const housekeepingRequests = [
  {
    id: "req-001",
    roomNumber: "301",
    guestName: "John Smith",
    requestType: "Room Cleaning",
    status: "pending",
    requestTime: "10:30 AM",
    priority: "high",
    notes: "Guest requested service before 2 PM",
    assignedTo: "Maria Garcia",
  },
  {
    id: "req-002",
    roomNumber: "415",
    guestName: "Sarah Johnson",
    requestType: "Towel Replacement",
    status: "in_progress",
    requestTime: "11:15 AM",
    priority: "medium",
    notes: "4 extra towels requested",
    assignedTo: "David Chen",
  },
  {
    id: "req-003",
    roomNumber: "208",
    guestName: "Robert Williams",
    requestType: "Bed Making",
    status: "completed",
    requestTime: "09:45 AM",
    priority: "medium",
    notes: "",
    assignedTo: "Maria Garcia",
  },
  {
    id: "req-004",
    roomNumber: "512",
    guestName: "Emily Davis",
    requestType: "Amenity Restock",
    status: "pending",
    requestTime: "12:05 PM",
    priority: "low",
    notes: "Need more coffee pods and toiletries",
    assignedTo: "",
  },
  {
    id: "req-005",
    roomNumber: "127",
    guestName: "Michael Brown",
    requestType: "Room Cleaning",
    status: "scheduled",
    requestTime: "01:30 PM",
    priority: "medium",
    notes: "Guest will be out until 4 PM",
    assignedTo: "James Wilson",
  },
]

// Mock room status data
const roomStatusData = {
  clean: 42,
  dirty: 15,
  outOfOrder: 3,
  inspected: 28,
  occupied: 65,
  vacant: 23,
  total: 88,
}

// Mock staff data
const staffData = [
  {
    id: 1,
    name: "Maria Garcia",
    avatar: "/mystical-forest-spirit.png",
    status: "active",
    assignedRooms: 8,
    completedToday: 12,
  },
  { id: 2, name: "David Chen", avatar: "/blue-being.png", status: "active", assignedRooms: 6, completedToday: 9 },
  {
    id: 3,
    name: "James Wilson",
    avatar: "/elemental-master.png",
    status: "break",
    assignedRooms: 4,
    completedToday: 7,
  },
  {
    id: 4,
    name: "Sophia Rodriguez",
    avatar: "/abstract-letter-r.png",
    status: "active",
    assignedRooms: 7,
    completedToday: 10,
  },
]

export default function HousekeepingDepartment() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Filter requests based on search and tab
  const filteredRequests = housekeepingRequests.filter((request) => {
    const matchesSearch =
      request.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.roomNumber.includes(searchQuery) ||
      request.requestType.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "pending") return matchesSearch && request.status === "pending"
    if (activeTab === "in_progress") return matchesSearch && request.status === "in_progress"
    if (activeTab === "completed") return matchesSearch && request.status === "completed"
    if (activeTab === "scheduled") return matchesSearch && request.status === "scheduled"

    return matchesSearch
  })

  return (
    <div className="flex flex-col h-full">
      <div className="border-b bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bed className="h-6 w-6 text-goldfinch-gold" />
            <h1 className="text-2xl font-bold">Housekeeping Department</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="gap-2">
              <CalendarClock className="h-4 w-4" />
              Schedule Tasks
            </Button>
            <Button variant="outline" className="gap-2">
              <RefreshCcw className="h-4 w-4" />
              Refresh Status
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Room Status Overview */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-7">
          <Card className="col-span-1">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">Clean</p>
                <p className="text-2xl font-bold text-green-600">{roomStatusData.clean}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">Dirty</p>
                <p className="text-2xl font-bold text-red-600">{roomStatusData.dirty}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">Inspected</p>
                <p className="text-2xl font-bold text-blue-600">{roomStatusData.inspected}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">Out of Order</p>
                <p className="text-2xl font-bold text-gray-600">{roomStatusData.outOfOrder}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">Occupied</p>
                <p className="text-2xl font-bold text-purple-600">{roomStatusData.occupied}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">Vacant</p>
                <p className="text-2xl font-bold text-amber-600">{roomStatusData.vacant}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">Total Rooms</p>
                <p className="text-2xl font-bold">{roomStatusData.total}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Staff Status */}
        <Card>
          <CardHeader>
            <CardTitle>Housekeeping Staff</CardTitle>
            <CardDescription>Current staff status and assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {staffData.map((staff) => (
                <div key={staff.id} className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={staff.avatar || "/placeholder.svg"} alt={staff.name} />
                      <AvatarFallback>{staff.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{staff.name}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant={staff.status === "active" ? "success" : "secondary"} className="text-xs">
                          {staff.status === "active" ? "On Duty" : "On Break"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Assigned</p>
                      <p className="font-medium">{staff.assignedRooms} rooms</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Completed</p>
                      <p className="font-medium">{staff.completedToday} today</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Assign Task
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Service Requests */}
        <div>
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-xl font-bold">Service Requests</h2>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search requests..."
                  className="pl-8 w-full sm:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Requests</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="in_progress">In Progress</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab} className="mt-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-12 bg-muted/50 p-3 text-sm font-medium">
                  <div className="col-span-1">Room</div>
                  <div className="col-span-2">Guest</div>
                  <div className="col-span-2">Request Type</div>
                  <div className="col-span-1">Priority</div>
                  <div className="col-span-2">Time</div>
                  <div className="col-span-2">Assigned To</div>
                  <div className="col-span-2">Status</div>
                </div>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <div key={request.id} className="grid grid-cols-12 items-center border-t p-3 text-sm">
                      <div className="col-span-1 font-medium">{request.roomNumber}</div>
                      <div className="col-span-2">{request.guestName}</div>
                      <div className="col-span-2">{request.requestType}</div>
                      <div className="col-span-1">
                        <Badge
                          variant={
                            request.priority === "high"
                              ? "destructive"
                              : request.priority === "medium"
                                ? "default"
                                : "outline"
                          }
                          className="whitespace-nowrap"
                        >
                          {request.priority}
                        </Badge>
                      </div>
                      <div className="col-span-2">{request.requestTime}</div>
                      <div className="col-span-2">
                        {request.assignedTo || (
                          <Button variant="outline" size="sm">
                            Assign
                          </Button>
                        )}
                      </div>
                      <div className="col-span-2 flex items-center gap-2">
                        <Badge
                          variant={
                            request.status === "completed"
                              ? "success"
                              : request.status === "in_progress"
                                ? "default"
                                : request.status === "scheduled"
                                  ? "secondary"
                                  : "outline"
                          }
                          className="whitespace-nowrap"
                        >
                          {request.status.replace("_", " ")}
                        </Badge>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <ArrowUpDown className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">No requests found matching your criteria.</div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
