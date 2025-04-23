"use client"

import { useState, useEffect } from "react"
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Utensils,
  Bed,
  Coffee,
  SpadeIcon as Spa,
  Search,
  Bell,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { useStaffAuth } from "@/lib/auth/staff-auth-context"
import { useStaffNotifications } from "@/components/staff/staff-notification-provider"
import { OrderCard } from "@/components/staff/order-card"
import { mockOrders } from "@/lib/staff/mock-data"

export default function StaffDashboard() {
  const { user } = useStaffAuth()
  const { unreadCount, addNotification } = useStaffNotifications()
  const [orders, setOrders] = useState(mockOrders)
  const [filteredOrders, setFilteredOrders] = useState(mockOrders)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Filter orders based on search query and active tab
  useEffect(() => {
    let filtered = orders

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Apply tab filter
    if (activeTab !== "all") {
      filtered = filtered.filter((order) => order.status === activeTab)
    }

    setFilteredOrders(filtered)
  }, [searchQuery, activeTab, orders])

  // Demo function to add a new order notification
  const simulateNewOrder = () => {
    // Create a new order
    const newOrder = {
      id: `order-${Date.now()}`,
      guestName: "Emma Thompson",
      roomNumber: "405",
      orderTime: new Date(),
      status: "new",
      serviceType: "room_service",
      items: [
        { id: "item-1", name: "Club Sandwich", quantity: 1, price: 18.5 },
        { id: "item-2", name: "Fresh Orange Juice", quantity: 2, price: 6.0 },
      ],
      specialInstructions: "No mayo in the sandwich please.",
      totalAmount: 30.5,
      isUrgent: Math.random() > 0.7,
      staffNotes: [],
    }

    // Add to orders
    setOrders((prev) => [newOrder, ...prev])

    // Create notification
    addNotification({
      title: "New Room Service Order",
      message: `Room ${newOrder.roomNumber} has placed a new order`,
      type: newOrder.isUrgent ? "urgent" : "new_order",
      orderId: newOrder.id,
    })
  }

  // Stats for the dashboard
  const stats = [
    {
      title: "Pending Orders",
      value: orders.filter((order) => order.status === "new" || order.status === "preparing").length,
      icon: Clock,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      title: "Completed Today",
      value: orders.filter(
        (order) =>
          order.status === "completed" && new Date(order.orderTime).toDateString() === new Date().toDateString(),
      ).length,
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      title: "Urgent Orders",
      value: orders.filter((order) => order.isUrgent && order.status !== "completed").length,
      icon: AlertTriangle,
      color: "text-red-500",
      bgColor: "bg-red-100",
    },
    {
      title: "Avg. Response Time",
      value: "4.2 min",
      icon: TrendingUp,
      color: "text-purple-500",
      bgColor: "bg-purple-100",
    },
  ]

  return (
    <div className="flex flex-col h-full">
      <div className="border-b bg-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="gap-2 border-goldfinch-gold/30 text-goldfinch-gold hover:bg-goldfinch-gold/10"
              onClick={simulateNewOrder}
            >
              <Coffee className="h-4 w-4" />
              Simulate New Order
            </Button>
            <Button variant="ghost" size="icon" className="relative" asChild>
              <a href="/staff/notifications">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-goldfinch-gold">
                    {unreadCount}
                  </Badge>
                )}
              </a>
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`rounded-full p-2 ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Department Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>Response times and completion rates by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Utensils className="h-4 w-4 text-goldfinch-gold" />
                    <span className="font-medium">Dining</span>
                  </div>
                  <span className="text-sm">92% completion rate</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bed className="h-4 w-4 text-goldfinch-gold" />
                    <span className="font-medium">Housekeeping</span>
                  </div>
                  <span className="text-sm">88% completion rate</span>
                </div>
                <Progress value={88} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Coffee className="h-4 w-4 text-goldfinch-gold" />
                    <span className="font-medium">Room Service</span>
                  </div>
                  <span className="text-sm">95% completion rate</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Spa className="h-4 w-4 text-goldfinch-gold" />
                    <span className="font-medium">Spa & Wellness</span>
                  </div>
                  <span className="text-sm">85% completion rate</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Recent Orders</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search orders..."
                  className="pl-8 w-[250px] border-goldfinch-gold/20 focus:border-goldfinch-gold"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" asChild>
                <a href="/staff/orders">View All</a>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="preparing">Preparing</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab} className="mt-0">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredOrders.length > 0 ? (
                  filteredOrders.slice(0, 6).map((order) => <OrderCard key={order.id} order={order} />)
                ) : (
                  <p className="col-span-full text-center py-8 text-muted-foreground">
                    No orders found matching your criteria.
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
