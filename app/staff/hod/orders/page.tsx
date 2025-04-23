"use client"

import { useState } from "react"
import { useStaffAuth } from "@/lib/auth/staff-auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Check, Clock, Eye, Filter, MoreHorizontal, Search, X } from "lucide-react"

// Mock orders data
const ordersData = [
  {
    id: "ORD-2023-1001",
    guest: "Raj Malhotra",
    room: "501",
    service: "Room Cleaning",
    status: "completed",
    time: "10:30 AM",
    staff: "Rahul Sharma",
    rating: 5,
  },
  {
    id: "ORD-2023-1002",
    guest: "Ananya Desai",
    room: "302",
    service: "Linen Change",
    status: "in-progress",
    time: "11:45 AM",
    staff: "Priya Patel",
    rating: null,
  },
  {
    id: "ORD-2023-1003",
    guest: "Vikram Singh",
    room: "703",
    service: "Bathroom Cleaning",
    status: "pending",
    time: "1:15 PM",
    staff: "Unassigned",
    rating: null,
  },
  {
    id: "ORD-2023-1004",
    guest: "Meera Kapoor",
    room: "205",
    service: "Room Cleaning",
    status: "completed",
    time: "9:20 AM",
    staff: "Deepa Singh",
    rating: 4,
  },
  {
    id: "ORD-2023-1005",
    guest: "Arjun Mehta",
    room: "608",
    service: "Turndown Service",
    status: "delayed",
    time: "7:30 PM",
    staff: "Amit Kumar",
    rating: null,
  },
]

export default function HodOrdersPage() {
  const { user } = useStaffAuth()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredOrders = ordersData.filter(
    (order) =>
      order.guest.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.room.includes(searchTerm) ||
      order.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      case "in-progress":
        return <Badge className="bg-blue-500">In Progress</Badge>
      case "pending":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-500">
            Pending
          </Badge>
        )
      case "delayed":
        return <Badge className="bg-red-500">Delayed</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-semibold text-goldfinch-gold">Department Orders</h1>
          <p className="text-muted-foreground">
            Manage service orders for the {user?.department || "Housekeeping"} department
          </p>
        </div>
        <Button className="bg-goldfinch-gold hover:bg-goldfinch-gold/90">
          <Filter className="mr-2 h-4 w-4" />
          Advanced Filters
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by guest, room, or service..."
            className="pl-8 border-goldfinch-gold/20 focus:border-goldfinch-gold"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="delayed">Delayed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="delayed">Delayed</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Guest</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Staff</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.guest}</TableCell>
                      <TableCell>{order.room}</TableCell>
                      <TableCell>{order.service}</TableCell>
                      <TableCell>{order.time}</TableCell>
                      <TableCell>{order.staff}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Check className="mr-2 h-4 w-4" />
                              Mark as Completed
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Clock className="mr-2 h-4 w-4" />
                              Reschedule
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <X className="mr-2 h-4 w-4" />
                              Cancel Order
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tab contents would be similar but filtered by status */}
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Orders</CardTitle>
              <CardDescription>Orders that are waiting to be assigned or started</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Guest</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders
                    .filter((order) => order.status === "pending")
                    .map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.guest}</TableCell>
                        <TableCell>{order.room}</TableCell>
                        <TableCell>{order.service}</TableCell>
                        <TableCell>{order.time}</TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" className="mr-2 bg-goldfinch-gold hover:bg-goldfinch-gold/90">
                            Assign Staff
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Similar content for other tabs */}
      </Tabs>
    </div>
  )
}
