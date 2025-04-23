"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Download, Filter, MoreHorizontal, RefreshCw, Search } from "lucide-react"

// Mock data for orders
const ordersData = [
  {
    id: "ORD-4582",
    guest: "Rahul Mehta",
    room: "1201",
    service: "Room Service",
    item: "Butter Chicken with Naan",
    status: "in-progress",
    time: "10:15 AM",
    staff: "Amit Kumar",
    priority: "normal",
  },
  {
    id: "ORD-4581",
    guest: "Priya Singh",
    room: "805",
    service: "Housekeeping",
    item: "Room Cleaning",
    status: "completed",
    time: "9:45 AM",
    staff: "Deepa Sharma",
    priority: "normal",
  },
  {
    id: "ORD-4580",
    guest: "John Williams",
    room: "1502",
    service: "Spa",
    item: "Deep Tissue Massage",
    status: "scheduled",
    time: "2:00 PM",
    staff: "Ravi Patel",
    priority: "normal",
  },
  {
    id: "ORD-4579",
    guest: "Sarah Johnson",
    room: "1105",
    service: "Room Service",
    item: "Continental Breakfast",
    status: "delayed",
    time: "8:30 AM",
    staff: "Vikram Singh",
    priority: "high",
  },
  {
    id: "ORD-4578",
    guest: "Michael Chen",
    room: "901",
    service: "Maintenance",
    item: "AC Repair",
    status: "in-progress",
    time: "11:20 AM",
    staff: "Rajesh Kumar",
    priority: "high",
  },
  {
    id: "ORD-4577",
    guest: "Emma Wilson",
    room: "1405",
    service: "Housekeeping",
    item: "Extra Towels",
    status: "completed",
    time: "9:15 AM",
    staff: "Anita Desai",
    priority: "normal",
  },
  {
    id: "ORD-4576",
    guest: "David Thompson",
    room: "1601",
    service: "Room Service",
    item: "Club Sandwich",
    status: "completed",
    time: "1:45 PM",
    staff: "Sanjay Gupta",
    priority: "normal",
  },
  {
    id: "ORD-4575",
    guest: "Lisa Wang",
    room: "1102",
    service: "Concierge",
    item: "Airport Transfer",
    status: "scheduled",
    time: "4:30 PM",
    staff: "Rahul Verma",
    priority: "high",
  },
  {
    id: "ORD-4574",
    guest: "Robert Brown",
    room: "705",
    service: "Room Service",
    item: "Chicken Biryani",
    status: "in-progress",
    time: "7:50 PM",
    staff: "Pradeep Singh",
    priority: "normal",
  },
  {
    id: "ORD-4573",
    guest: "Jennifer Lee",
    room: "1305",
    service: "Spa",
    item: "Swedish Massage",
    status: "completed",
    time: "3:30 PM",
    staff: "Meena Patel",
    priority: "normal",
  },
]

export default function ManagerOrders() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [serviceFilter, setServiceFilter] = useState("all")

  // Filter orders based on search term and filters
  const filteredOrders = ordersData.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.guest.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.item.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesService = serviceFilter === "all" || order.service === serviceFilter

    return matchesSearch && matchesStatus && matchesService
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Completed
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            In Progress
          </Badge>
        )
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Scheduled
          </Badge>
        )
      case "delayed":
        return <Badge variant="destructive">Delayed</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "normal":
        return <Badge variant="outline">Normal</Badge>
      default:
        return <Badge variant="outline">Low</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
          <p className="text-muted-foreground">View and manage all service orders across departments</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="delayed">Delayed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Order Management</CardTitle>
              <CardDescription>Manage and track all service orders across the hotel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between mb-4 space-y-2 md:space-y-0">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search orders..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex space-x-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center">
                        <Filter className="mr-2 h-4 w-4" />
                        Status
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setStatusFilter("all")}>All Statuses</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusFilter("in-progress")}>In Progress</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusFilter("completed")}>Completed</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusFilter("scheduled")}>Scheduled</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusFilter("delayed")}>Delayed</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center">
                        <Filter className="mr-2 h-4 w-4" />
                        Service
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setServiceFilter("all")}>All Services</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setServiceFilter("Room Service")}>Room Service</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setServiceFilter("Housekeeping")}>Housekeeping</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setServiceFilter("Spa")}>Spa & Wellness</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setServiceFilter("Maintenance")}>Maintenance</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setServiceFilter("Concierge")}>Concierge</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Guest</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Item</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Staff</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                          No orders found matching your criteria
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.guest}</TableCell>
                          <TableCell>{order.room}</TableCell>
                          <TableCell>{order.service}</TableCell>
                          <TableCell>{order.item}</TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                          <TableCell>{order.time}</TableCell>
                          <TableCell>{getPriorityBadge(order.priority)}</TableCell>
                          <TableCell>{order.staff}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Update Status</DropdownMenuItem>
                                <DropdownMenuItem>Reassign Staff</DropdownMenuItem>
                                <DropdownMenuItem>Contact Guest</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Orders</CardTitle>
              <CardDescription>Currently active and in-progress orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Active orders will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Orders</CardTitle>
              <CardDescription>Successfully completed orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Completed orders will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delayed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Delayed Orders</CardTitle>
              <CardDescription>Orders that have exceeded their SLA</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Delayed orders will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
