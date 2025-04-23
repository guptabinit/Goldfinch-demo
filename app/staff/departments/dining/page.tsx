"use client"

import { useState } from "react"
import { Utensils, Search, Plus, ArrowUpDown, ChefHat, Printer } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock dining orders
const diningOrders = [
  {
    id: "order-001",
    tableNumber: "12",
    guestName: "John Smith",
    orderType: "Dine-in",
    status: "new",
    orderTime: "10:30 AM",
    estimatedTime: "20 min",
    items: [
      { name: "Butter Chicken", quantity: 1, special: "Medium spicy" },
      { name: "Garlic Naan", quantity: 2, special: "" },
      { name: "Mango Lassi", quantity: 1, special: "" },
    ],
    totalAmount: 42.5,
    assignedTo: "Chef Ravi",
  },
  {
    id: "order-002",
    tableNumber: "8",
    guestName: "Sarah Johnson",
    orderType: "Dine-in",
    status: "preparing",
    orderTime: "10:15 AM",
    estimatedTime: "15 min",
    items: [
      { name: "Caesar Salad", quantity: 1, special: "Dressing on the side" },
      { name: "Grilled Salmon", quantity: 1, special: "Well done" },
      { name: "Sparkling Water", quantity: 1, special: "" },
    ],
    totalAmount: 38.75,
    assignedTo: "Chef Maria",
  },
  {
    id: "order-003",
    tableNumber: "Room 208",
    guestName: "Robert Williams",
    orderType: "Room Service",
    status: "ready",
    orderTime: "09:45 AM",
    estimatedTime: "30 min",
    items: [
      { name: "Continental Breakfast", quantity: 2, special: "" },
      { name: "Fresh Orange Juice", quantity: 2, special: "No ice" },
    ],
    totalAmount: 45.0,
    assignedTo: "Chef Daniel",
  },
  {
    id: "order-004",
    tableNumber: "15",
    guestName: "Emily Davis",
    orderType: "Dine-in",
    status: "completed",
    orderTime: "09:30 AM",
    estimatedTime: "25 min",
    items: [
      { name: "Eggs Benedict", quantity: 1, special: "" },
      { name: "Cappuccino", quantity: 1, special: "Extra shot" },
    ],
    totalAmount: 24.5,
    assignedTo: "Chef Maria",
  },
  {
    id: "order-005",
    tableNumber: "Room 127",
    guestName: "Michael Brown",
    orderType: "Room Service",
    status: "new",
    orderTime: "10:45 AM",
    estimatedTime: "35 min",
    items: [
      { name: "Club Sandwich", quantity: 1, special: "No mayo" },
      { name: "French Fries", quantity: 1, special: "Extra crispy" },
      { name: "Diet Coke", quantity: 1, special: "" },
    ],
    totalAmount: 32.25,
    assignedTo: "",
  },
]

// Mock kitchen staff data
const kitchenStaffData = [
  {
    id: 1,
    name: "Chef Ravi",
    role: "Head Chef",
    avatar: "/mystical-forest-spirit.png",
    status: "active",
    ordersAssigned: 3,
  },
  { id: 2, name: "Chef Maria", role: "Sous Chef", avatar: "/blue-being.png", status: "active", ordersAssigned: 2 },
  {
    id: 3,
    name: "Chef Daniel",
    role: "Line Cook",
    avatar: "/elemental-master.png",
    status: "active",
    ordersAssigned: 1,
  },
  {
    id: 4,
    name: "Chef Sophia",
    role: "Pastry Chef",
    avatar: "/abstract-letter-r.png",
    status: "break",
    ordersAssigned: 0,
  },
]

// Mock menu availability
const menuAvailability = [
  { category: "Appetizers", available: 8, unavailable: 1 },
  { category: "Main Courses", available: 12, unavailable: 2 },
  { category: "Desserts", available: 6, unavailable: 0 },
  { category: "Beverages", available: 10, unavailable: 1 },
]

export default function DiningDepartment() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Filter orders based on search and tab
  const filteredOrders = diningOrders.filter((order) => {
    const matchesSearch =
      order.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.tableNumber.includes(searchQuery) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

    if (activeTab === "all") return matchesSearch
    if (activeTab === "new") return matchesSearch && order.status === "new"
    if (activeTab === "preparing") return matchesSearch && order.status === "preparing"
    if (activeTab === "ready") return matchesSearch && order.status === "ready"
    if (activeTab === "completed") return matchesSearch && order.status === "completed"

    return matchesSearch
  })

  // Stats
  const stats = {
    newOrders: diningOrders.filter((order) => order.status === "new").length,
    preparingOrders: diningOrders.filter((order) => order.status === "preparing").length,
    readyOrders: diningOrders.filter((order) => order.status === "ready").length,
    completedOrders: diningOrders.filter((order) => order.status === "completed").length,
    avgPrepTime: "22 min",
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Utensils className="h-6 w-6 text-goldfinch-gold" />
            <h1 className="text-2xl font-bold">Dining Department</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="gap-2">
              <ChefHat className="h-4 w-4" />
              Update Menu
            </Button>
            <Button variant="outline" className="gap-2">
              <Printer className="h-4 w-4" />
              Print Orders
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
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
                <p className="text-sm font-medium text-muted-foreground">Ready to Serve</p>
                <p className="text-2xl font-bold text-green-600">{stats.readyOrders}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">Completed Today</p>
                <p className="text-2xl font-bold text-purple-600">{stats.completedOrders}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">Avg. Prep Time</p>
                <p className="text-2xl font-bold">{stats.avgPrepTime}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Kitchen Staff & Menu Availability */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Kitchen Staff */}
          <Card>
            <CardHeader>
              <CardTitle>Kitchen Staff</CardTitle>
              <CardDescription>Current staff status and assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {kitchenStaffData.map((staff) => (
                  <div key={staff.id} className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={staff.avatar || "/placeholder.svg"} alt={staff.name} />
                        <AvatarFallback>{staff.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{staff.name}</p>
                        <p className="text-xs text-muted-foreground">{staff.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={staff.status === "active" ? "success" : "secondary"} className="text-xs">
                        {staff.status === "active" ? "On Duty" : "On Break"}
                      </Badge>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Orders</p>
                        <p className="font-medium">{staff.ordersAssigned}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Assign
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Menu Availability */}
          <Card>
            <CardHeader>
              <CardTitle>Menu Availability</CardTitle>
              <CardDescription>Current menu item status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {menuAvailability.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{category.category}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-green-600">{category.available} available</span>
                        <span className="text-sm text-red-600">{category.unavailable} unavailable</span>
                      </div>
                    </div>
                    <Progress
                      value={(category.available / (category.available + category.unavailable)) * 100}
                      className="h-2"
                    />
                  </div>
                ))}
                <Button className="w-full mt-4">Manage Menu Items</Button>
              </div>
            </CardContent>
          </Card>
        </div>

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
                  <SelectItem value="dine-in">Dine-in</SelectItem>
                  <SelectItem value="room-service">Room Service</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="preparing">Preparing</TabsTrigger>
              <TabsTrigger value="ready">Ready</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab} className="mt-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-12 bg-muted/50 p-3 text-sm font-medium">
                  <div className="col-span-1">Table/Room</div>
                  <div className="col-span-2">Guest</div>
                  <div className="col-span-2">Order Type</div>
                  <div className="col-span-2">Time</div>
                  <div className="col-span-2">Assigned To</div>
                  <div className="col-span-1">Est. Time</div>
                  <div className="col-span-2">Status</div>
                </div>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <div key={order.id} className="grid grid-cols-12 items-center border-t p-3 text-sm">
                      <div className="col-span-1 font-medium">{order.tableNumber}</div>
                      <div className="col-span-2">{order.guestName}</div>
                      <div className="col-span-2">{order.orderType}</div>
                      <div className="col-span-2">{order.orderTime}</div>
                      <div className="col-span-2">
                        {order.assignedTo || (
                          <Button variant="outline" size="sm">
                            Assign
                          </Button>
                        )}
                      </div>
                      <div className="col-span-1">{order.estimatedTime}</div>
                      <div className="col-span-2 flex items-center gap-2">
                        <Badge
                          variant={
                            order.status === "completed"
                              ? "success"
                              : order.status === "ready"
                                ? "default"
                                : order.status === "preparing"
                                  ? "secondary"
                                  : "outline"
                          }
                          className="whitespace-nowrap"
                        >
                          {order.status}
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
