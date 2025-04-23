"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Clock, CheckCircle, AlertTriangle, Coffee } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { OrderCard } from "@/components/staff/order-card"
import { mockOrders } from "@/lib/staff/mock-data"

export default function OrdersPage() {
  const [orders, setOrders] = useState(mockOrders)
  const [filteredOrders, setFilteredOrders] = useState(mockOrders)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [serviceFilter, setServiceFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState("newest")

  // Filter and sort orders
  useEffect(() => {
    let filtered = [...orders]

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Apply tab filter (status)
    if (activeTab !== "all") {
      filtered = filtered.filter((order) => order.status === activeTab)
    }

    // Apply service type filter
    if (serviceFilter !== "all") {
      filtered = filtered.filter((order) => order.serviceType === serviceFilter)
    }

    // Apply sorting
    if (sortOrder === "newest") {
      filtered.sort((a, b) => new Date(b.orderTime).getTime() - new Date(a.orderTime).getTime())
    } else if (sortOrder === "oldest") {
      filtered.sort((a, b) => new Date(a.orderTime).getTime() - new Date(b.orderTime).getTime())
    } else if (sortOrder === "urgent") {
      filtered.sort((a, b) => {
        if (a.isUrgent && !b.isUrgent) return -1
        if (!a.isUrgent && b.isUrgent) return 1
        return new Date(b.orderTime).getTime() - new Date(a.orderTime).getTime()
      })
    }

    setFilteredOrders(filtered)
  }, [searchQuery, activeTab, serviceFilter, sortOrder, orders])

  // Stats for the orders page
  const stats = [
    {
      title: "New Orders",
      value: orders.filter((order) => order.status === "new").length,
      icon: Clock,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      title: "Preparing",
      value: orders.filter((order) => order.status === "preparing").length,
      icon: Coffee,
      color: "text-amber-500",
      bgColor: "bg-amber-100",
    },
    {
      title: "Completed",
      value: orders.filter((order) => order.status === "completed").length,
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      title: "Urgent",
      value: orders.filter((order) => order.isUrgent && order.status !== "completed").length,
      icon: AlertTriangle,
      color: "text-red-500",
      bgColor: "bg-red-100",
    },
  ]

  return (
    <div className="flex flex-col h-full">
      <div className="border-b bg-white p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Orders Management</h1>
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
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`rounded-full p-2 ${stat.bgColor}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filter by:</span>
          </div>

          <Select value={serviceFilter} onValueChange={setServiceFilter}>
            <SelectTrigger className="w-[180px] border-goldfinch-gold/20 focus:border-goldfinch-gold">
              <SelectValue placeholder="Service Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              <SelectItem value="room_service">Room Service</SelectItem>
              <SelectItem value="dining">Dining</SelectItem>
              <SelectItem value="housekeeping">Housekeeping</SelectItem>
              <SelectItem value="spa">Spa & Wellness</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-[180px] border-goldfinch-gold/20 focus:border-goldfinch-gold">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="urgent">Urgent First</SelectItem>
            </SelectContent>
          </Select>

          <div className="ml-auto">
            <Badge variant="outline" className="gap-1">
              {filteredOrders.length} orders found
            </Badge>
          </div>
        </div>

        {/* Orders List */}
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
                filteredOrders.map((order) => <OrderCard key={order.id} order={order} />)
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
  )
}
