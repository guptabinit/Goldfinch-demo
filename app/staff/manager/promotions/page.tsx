"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Download, Edit, Plus, RefreshCw, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ManagerPromotionPerformance } from "@/components/manager/manager-promotion-performance"

// Mock data for promotions
const promotionsData = [
  {
    id: "PROMO-001",
    name: "Early Bird Breakfast",
    department: "Restaurant",
    type: "discount",
    value: "20%",
    startDate: "2023-04-15",
    endDate: "2023-05-15",
    timeRestriction: "7:00 AM - 9:00 AM",
    status: "active",
    redemptions: 87,
    revenue: "₹43,500",
  },
  {
    id: "PROMO-002",
    name: "Spa Midweek Special",
    department: "Spa",
    type: "discount",
    value: "15%",
    startDate: "2023-04-01",
    endDate: "2023-06-30",
    timeRestriction: "2:00 PM - 5:00 PM (Mon-Thu)",
    status: "active",
    redemptions: 45,
    revenue: "₹67,500",
  },
  {
    id: "PROMO-003",
    name: "Suite Upgrade",
    department: "Front Desk",
    type: "upgrade",
    value: "Free",
    startDate: "2023-05-01",
    endDate: "2023-05-31",
    timeRestriction: "N/A",
    status: "active",
    redemptions: 12,
    revenue: "₹36,000",
  },
  {
    id: "PROMO-004",
    name: "Happy Hour Cocktails",
    department: "Bar",
    type: "bogo",
    value: "Buy 1 Get 1",
    startDate: "2023-04-01",
    endDate: "2023-12-31",
    timeRestriction: "5:00 PM - 7:00 PM",
    status: "active",
    redemptions: 156,
    revenue: "₹93,600",
  },
  {
    id: "PROMO-005",
    name: "Weekend Brunch Special",
    department: "Restaurant",
    type: "package",
    value: "₹1,999",
    startDate: "2023-04-01",
    endDate: "2023-06-30",
    timeRestriction: "11:00 AM - 3:00 PM (Sat-Sun)",
    status: "active",
    redemptions: 78,
    revenue: "₹155,922",
  },
  {
    id: "PROMO-006",
    name: "Summer Pool Access",
    department: "Recreation",
    type: "fixed",
    value: "₹999",
    startDate: "2023-05-01",
    endDate: "2023-08-31",
    timeRestriction: "All Day",
    status: "scheduled",
    redemptions: 0,
    revenue: "₹0",
  },
  {
    id: "PROMO-007",
    name: "Monsoon Room Package",
    department: "Front Desk",
    type: "discount",
    value: "25%",
    startDate: "2023-06-15",
    endDate: "2023-09-15",
    timeRestriction: "N/A",
    status: "scheduled",
    redemptions: 0,
    revenue: "₹0",
  },
  {
    id: "PROMO-008",
    name: "Valentine's Day Special",
    department: "Restaurant",
    type: "package",
    value: "₹4,999",
    startDate: "2023-02-14",
    endDate: "2023-02-14",
    timeRestriction: "7:00 PM - 11:00 PM",
    status: "expired",
    redemptions: 42,
    revenue: "₹209,958",
  },
]

export default function ManagerPromotions() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")

  // Filter promotions based on filters
  const filteredPromotions = promotionsData.filter((promo) => {
    const matchesStatus = statusFilter === "all" || promo.status === statusFilter
    const matchesDepartment = departmentFilter === "all" || promo.department === departmentFilter

    return matchesStatus && matchesDepartment
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Active
          </Badge>
        )
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Scheduled
          </Badge>
        )
      case "expired":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Expired
          </Badge>
        )
      case "paused":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            Paused
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Promotions Management</h1>
          <p className="text-muted-foreground">Create and manage promotional offers across all hotel services</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Promotion
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Promotion</DialogTitle>
                <DialogDescription>Set up a new promotional offer for hotel services</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Promotion Name</Label>
                    <Input id="name" placeholder="Enter promotion name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select>
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="restaurant">Restaurant</SelectItem>
                        <SelectItem value="spa">Spa & Wellness</SelectItem>
                        <SelectItem value="housekeeping">Housekeeping</SelectItem>
                        <SelectItem value="front-desk">Front Desk</SelectItem>
                        <SelectItem value="bar">Bar & Lounge</SelectItem>
                        <SelectItem value="recreation">Recreation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Promotion Type</Label>
                    <Select>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="discount">Percentage Discount</SelectItem>
                        <SelectItem value="fixed">Fixed Price</SelectItem>
                        <SelectItem value="bogo">Buy One Get One</SelectItem>
                        <SelectItem value="package">Package Deal</SelectItem>
                        <SelectItem value="upgrade">Free Upgrade</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="value">Value</Label>
                    <Input id="value" placeholder="e.g. 20% or ₹999" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input id="start-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <Input id="end-date" type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time-restriction">Time Restriction (Optional)</Label>
                  <Input id="time-restriction" placeholder="e.g. 2:00 PM - 5:00 PM (Mon-Thu)" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Enter promotion details" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Create Promotion</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Promotions</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Promotions</CardTitle>
              <CardDescription>Manage promotional offers across all hotel services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between mb-4 space-y-2 md:space-y-0">
                <div className="flex space-x-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="Restaurant">Restaurant</SelectItem>
                      <SelectItem value="Spa">Spa & Wellness</SelectItem>
                      <SelectItem value="Front Desk">Front Desk</SelectItem>
                      <SelectItem value="Bar">Bar & Lounge</SelectItem>
                      <SelectItem value="Recreation">Recreation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Date Range</TableHead>
                      <TableHead>Time Restriction</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Redemptions</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPromotions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={11} className="text-center py-8 text-muted-foreground">
                          No promotions found matching your criteria
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredPromotions.map((promo) => (
                        <TableRow key={promo.id}>
                          <TableCell className="font-medium">{promo.id}</TableCell>
                          <TableCell>{promo.name}</TableCell>
                          <TableCell>{promo.department}</TableCell>
                          <TableCell className="capitalize">{promo.type}</TableCell>
                          <TableCell>{promo.value}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>
                                {new Date(promo.startDate).toLocaleDateString()} -{" "}
                                {new Date(promo.endDate).toLocaleDateString()}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>{promo.timeRestriction}</span>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(promo.status)}</TableCell>
                          <TableCell>{promo.redemptions}</TableCell>
                          <TableCell>{promo.revenue}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Promotion Performance</CardTitle>
              <CardDescription>Track the performance of active promotions</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ManagerPromotionPerformance />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Promotions</CardTitle>
              <CardDescription>Currently active promotional offers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Active promotions will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Promotions</CardTitle>
              <CardDescription>Upcoming promotional offers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Scheduled promotions will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expired" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expired Promotions</CardTitle>
              <CardDescription>Past promotional offers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Expired promotions will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
