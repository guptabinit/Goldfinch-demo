"use client"

import { useState } from "react"
import { Coffee, Search, Plus, AlertTriangle, ArrowUpDown, MapPin, Timer } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock room service orders
const roomServiceOrders = [
  {
    id: "rs-001",
    roomNumber: "301",
    guestName: "John Smith",
    orderType: "Food & Beverage",
    status: "new",
    orderTime: "10:30 AM",
    estimatedDelivery: "10:55 AM",
    items: [
      { name: "Club Sandwich", quantity: 1, special: "No mayo" },
      { name: "French Fries", quantity: 1, special: "" },
      { name: "Coca Cola", quantity: 2, special: "With ice" },
    ],
    totalAmount: 38.5,
    assignedTo: "",
    isUrgent: true,
  },
  {
    id: "rs-002",
    roomNumber: "415",
    guestName: "Sarah Johnson",
    orderType: "Food & Beverage",
    status: "preparing",
    orderTime: "10:15 AM",
    estimatedDelivery: "10:45 AM",
    items: [
      { name: "Caesar Salad", quantity: 1, special: "Dressing on the side" },
      { name: "Sparkling Water", quantity: 1, special: "" },
    ],
    totalAmount: 24.75,
    assignedTo: "James Wilson",
    isUrgent: false,
  },
  {
    id: "rs-003",
    roomNumber: "208",
    guestName: "Robert Williams",
    orderType: "Amenities",
    status: "delivering",
    orderTime: "09:45 AM",
    estimatedDelivery: "10:15 AM",
    items: [
      { name: "Extra Towels", quantity: 4, special: "" },
      { name: "Toothbrush Kit", quantity: 2, special: "" },
    ],
    totalAmount: 0,
    assignedTo: "Maria Garcia",
    isUrgent: false,
  },
  {
    id: "rs-004",
    roomNumber: "512",
    guestName: "Emily Davis",
    orderType: "Food & Beverage",
    status: "completed",
    orderTime: "09:30 AM",
    estimatedDelivery: "10:00 AM",
    items: [
      { name: "Continental Breakfast", quantity: 2, special: "" },
      { name: "Coffee", quantity: 2, special: "One black, one with cream" },
    ],
    totalAmount: 42.0,
    assignedTo: "David Chen",
    isUrgent: false,
  },
  {
    id: "rs-005",
    roomNumber: "127",
    guestName: "Michael Brown",
    orderType: "Food & Beverage",
    status: "new",
    orderTime: "10:45 AM",
    estimatedDelivery: "11:15 AM",
    items: [
      { name: "Chicken Biryani", quantity: 1, special: "Mild spice" },
      { name: "Garlic Naan", quantity: 2, special: "" },
      { name: "Mango Lassi", quantity: 1, special: "" },
    ],
    totalAmount: 35.25,
    assignedTo: "",
    isUrgent: false,
  },
]

// Mock room service staff data
const roomServiceStaffData = [
  {
    id: 1,
    name: "Maria Garcia",
    avatar: "/mystical-forest-spirit.png",
    status: "active",
    ordersAssigned: 1,
    floor: "1-3",
  },
  { id: 2, name: "David Chen", avatar: "/blue-being.png", status: "active", ordersAssigned: 1, floor: "4-6" },
  { id: 3, name: "James Wilson", avatar: "/elemental-master.png", status: "active", ordersAssigned: 1, floor: "7-9" },
  {
    id: 4,
    name: "Sophia Rodriguez",
    avatar: "/abstract-letter-r.png",
    status: "break",
    ordersAssigned: 0,
    floor: "10-12",
  },
]

export default function RoomServiceDepartment() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Filter orders based on search and tab
  const filteredOrders = roomServiceOrders.filter((order) => {
    const matchesSearch =
      order.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.roomNumber.includes(searchQuery) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

    if (activeTab === "all") return matchesSearch
    if (activeTab === "new") return matchesSearch && order.status === "new"
    if (activeTab === "preparing") return matchesSearch && order.status === "preparing"
    if (activeTab === "delivering") return matchesSearch && order.status === "delivering"
    if (activeTab === "completed") return matchesSearch && order.status === "completed"

    return matchesSearch
  })

  // Stats
  const stats = {
    newOrders: roomServiceOrders.filter((order) => order.status === "new").length,
    preparingOrders: roomServiceOrders.filter((order) => order.status === "preparing").length,
    deliveringOrders: roomServiceOrders.filter((order) => order.status === "delivering").length,
    completedOrders: roomServiceOrders.filter((order) => order.status === "completed").length,
    urgentOrders: roomServiceOrders.filter((order) => order.isUrgent).length,
    avgDeliveryTime: "25 min",
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coffee className="h-6 w-6 text-goldfinch-gold" />
            <h1 className="text-2xl font-bold">Room Service Department</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="gap-2">
              <MapPin className="h-4 w-4" />
              Floor Map
            </Button>
            <Button variant="outline" className="gap-2">
              <Timer className="h-4 w-4" />
              Delivery Times
            </Button>
            <Button className="gap-2 bg-goldfinch-gold hover:bg-goldfinch-gold/90">
              <Plus className="h-4 w-4" />
              New Order
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Order Stats */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">New Orders</p>
                <p className="text-2xl font-bold text-blue-600">{stats.newOrders}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">Preparing</p>
                <p className="text-2xl font-bold text-amber-600">{stats.preparingOrders}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">Delivering</p>
                <p className="text-2xl font-bold text-purple-600">{stats.deliveringOrders}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-green-600">{stats.completedOrders}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">Urgent Orders</p>
                <p className="text-2xl font-bold text-red-600">{stats.urgentOrders}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">Avg. Delivery Time</p>
                <p className="text-2xl font-bold">{stats.avgDeliveryTime}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Room Service Staff */}
        <Card>
          <CardHeader>
            <CardTitle>Room Service Staff</CardTitle>
            <CardDescription>Current staff status and assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roomServiceStaffData.map((staff) => (
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
                        <span className="text-xs text-muted-foreground">Floors: {staff.floor}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Orders</p>
                      <p className="font-medium">{staff.ordersAssigned}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Assign Order
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Orders */}
        <div>
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-xl font-bold">Current Orders</h2>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search orders..."
                  className="pl-8 w-full sm:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="food">Food & Beverage</SelectItem>
                  <SelectItem value="amenities">Amenities</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="preparing">Preparing</TabsTrigger>
              <TabsTrigger value="delivering">Delivering</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab} className="mt-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-12 bg-muted/50 p-3 text-sm font-medium">
                  <div className="col-span-1">Room</div>
                  <div className="col-span-2">Guest</div>
                  <div className="col-span-2">Order Type</div>
                  <div className="col-span-1">Time</div>
                  <div className="col-span-2">Est. Delivery</div>
                  <div className="col-span-2">Assigned To</div>
                  <div className="col-span-2">Status</div>
                </div>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className={`grid grid-cols-12 items-center border-t p-3 text-sm ${order.isUrgent ? "border-l-4 border-l-red-500" : ""}`}
                    >
                      <div className="col-span-1 font-medium">{order.roomNumber}</div>
                      <div className="col-span-2">{order.guestName}</div>
                      <div className="col-span-2">{order.orderType}</div>
                      <div className="col-span-1">{order.orderTime}</div>
                      <div className="col-span-2">{order.estimatedDelivery}</div>
                      <div className="col-span-2">
                        {order.assignedTo || (
                          <Button variant="outline" size="sm">
                            Assign
                          </Button>
                        )}
                      </div>
                      <div className="col-span-2 flex items-center gap-2">
                        <Badge
                          variant={
                            order.status === "completed"
                              ? "success"
                              : order.status === "delivering"
                                ? "default"
                                : order.status === "preparing"
                                  ? "secondary"
                                  : "outline"
                          }
                          className="whitespace-nowrap"
                        >
                          {order.status}
                        </Badge>
                        {order.isUrgent && <AlertTriangle className="h-4 w-4 text-red-500" />}
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <ArrowUpDown className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">No orders found matching your criteria.</div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
