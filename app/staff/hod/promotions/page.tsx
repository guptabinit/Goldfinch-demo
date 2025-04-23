"use client"

import { useState } from "react"
import { Tag, Plus, Calendar, Clock, Percent, Search, Filter, Edit, Trash, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useStaffAuth } from "@/lib/auth/staff-auth-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

// Mock promotions data
const promotionsData = [
  {
    id: "promo-001",
    name: "Happy Hour Spa",
    description: "10% off on all spa treatments between 2 PM and 4 PM",
    department: "Spa",
    discountType: "percentage",
    discountValue: 10,
    startDate: "2023-10-01",
    endDate: "2023-12-31",
    startTime: "14:00",
    endTime: "16:00",
    status: "active",
    applicableServices: ["Swedish Massage", "Deep Tissue Massage", "Aromatherapy"],
    createdBy: "Sophia Rodriguez",
  },
  {
    id: "promo-002",
    name: "Breakfast Special",
    description: "15% off on breakfast orders before 8 AM",
    department: "Dining",
    discountType: "percentage",
    discountValue: 15,
    startDate: "2023-09-15",
    endDate: "2023-12-15",
    startTime: "06:00",
    endTime: "08:00",
    status: "active",
    applicableServices: ["Room Service Breakfast", "Restaurant Breakfast"],
    createdBy: "Chef Ravi",
  },
  {
    id: "promo-003",
    name: "Extended Stay Cleaning",
    description: "Free additional cleaning for stays longer than 5 nights",
    department: "Housekeeping",
    discountType: "freeService",
    discountValue: 0,
    startDate: "2023-10-15",
    endDate: "2024-01-15",
    startTime: "",
    endTime: "",
    status: "scheduled",
    applicableServices: ["Room Cleaning"],
    createdBy: "Maria Garcia",
  },
  {
    id: "promo-004",
    name: "Weekend Dining Delight",
    description: "20% off on dinner orders on weekends",
    department: "Dining",
    discountType: "percentage",
    discountValue: 20,
    startDate: "2023-11-01",
    endDate: "2023-12-31",
    startTime: "18:00",
    endTime: "22:00",
    status: "active",
    applicableServices: ["Room Service Dinner", "Restaurant Dinner"],
    createdBy: "Chef Ravi",
  },
  {
    id: "promo-005",
    name: "Summer Spa Package",
    description: "Buy one get one free on select spa treatments",
    department: "Spa",
    discountType: "bogo",
    discountValue: 100,
    startDate: "2023-06-01",
    endDate: "2023-09-30",
    startTime: "",
    endTime: "",
    status: "expired",
    applicableServices: ["Swedish Massage", "Aromatherapy"],
    createdBy: "Sophia Rodriguez",
  },
]

export default function PromotionsPage() {
  const { user } = useStaffAuth()
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showNewPromotion, setShowNewPromotion] = useState(false)
  const [department, setDepartment] = useState("")

  // Set department based on user's department
  useState(() => {
    if (user?.department) {
      setDepartment(user.department)
    }
  })

  // Filter promotions based on search and tab
  const filteredPromotions = promotionsData.filter((promotion) => {
    const matchesSearch =
      promotion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      promotion.description.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "active") return matchesSearch && promotion.status === "active"
    if (activeTab === "scheduled") return matchesSearch && promotion.status === "scheduled"
    if (activeTab === "expired") return matchesSearch && promotion.status === "expired"

    return matchesSearch
  })

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b bg-white p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Tag className="h-6 w-6 text-goldfinch-gold" />
            <div>
              <h1 className="text-2xl font-bold">Promotions Management</h1>
              <p className="text-muted-foreground">{department} Department</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              className="gap-2 bg-goldfinch-gold hover:bg-goldfinch-gold/90"
              onClick={() => setShowNewPromotion(true)}
            >
              <Plus className="h-4 w-4" />
              <span>New Promotion</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Promotions Overview */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Promotions</p>
                  <p className="text-3xl font-bold">
                    {promotionsData.filter((promo) => promo.status === "active").length}
                  </p>
                </div>
                <div className="rounded-full p-2 bg-green-100">
                  <Tag className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Scheduled Promotions</p>
                  <p className="text-3xl font-bold">
                    {promotionsData.filter((promo) => promo.status === "scheduled").length}
                  </p>
                </div>
                <div className="rounded-full p-2 bg-blue-100">
                  <Calendar className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Expired Promotions</p>
                  <p className="text-3xl font-bold">
                    {promotionsData.filter((promo) => promo.status === "expired").length}
                  </p>
                </div>
                <div className="rounded-full p-2 bg-gray-100">
                  <Clock className="h-6 w-6 text-gray-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Promotions List */}
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>All Promotions</CardTitle>
              <CardDescription>Manage your department's promotional offers</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search promotions..."
                  className="pl-8 w-full sm:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Promotions</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                <TabsTrigger value="expired">Expired</TabsTrigger>
              </TabsList>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 bg-muted/50 p-3 text-sm font-medium">
                  <div className="col-span-3">Promotion Name</div>
                  <div className="col-span-2">Department</div>
                  <div className="col-span-2">Discount</div>
                  <div className="col-span-2">Valid Period</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-2">Actions</div>
                </div>
                {filteredPromotions.length > 0 ? (
                  filteredPromotions.map((promotion) => (
                    <div key={promotion.id} className="grid grid-cols-12 items-center border-t p-3 text-sm">
                      <div className="col-span-3">
                        <div className="font-medium">{promotion.name}</div>
                        <div
                          className="text-xs text-muted-foreground truncate max-w-[250px]"
                          title={promotion.description}
                        >
                          {promotion.description}
                        </div>
                      </div>
                      <div className="col-span-2">{promotion.department}</div>
                      <div className="col-span-2">
                        {promotion.discountType === "percentage" ? (
                          <div className="flex items-center">
                            <Percent className="h-3.5 w-3.5 mr-1 text-goldfinch-gold" />
                            <span>{promotion.discountValue}% off</span>
                          </div>
                        ) : promotion.discountType === "bogo" ? (
                          <span>Buy One Get One</span>
                        ) : (
                          <span>Free Service</span>
                        )}
                      </div>
                      <div className="col-span-2">
                        <div>
                          {formatDate(promotion.startDate)} - {formatDate(promotion.endDate)}
                        </div>
                        {promotion.startTime && promotion.endTime && (
                          <div className="text-xs text-muted-foreground">
                            {promotion.startTime} - {promotion.endTime}
                          </div>
                        )}
                      </div>
                      <div className="col-span-1">
                        <Badge
                          variant={
                            promotion.status === "active"
                              ? "success"
                              : promotion.status === "scheduled"
                                ? "default"
                                : "secondary"
                          }
                          className="whitespace-nowrap"
                        >
                          {promotion.status}
                        </Badge>
                      </div>
                      <div className="col-span-2 flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">No promotions found.</div>
                )}
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* New Promotion Dialog */}
        <Dialog open={showNewPromotion} onOpenChange={setShowNewPromotion}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Promotion</DialogTitle>
              <DialogDescription>Set up a new promotional offer for your department's services.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="name">Promotion Name</Label>
                  <Input id="name" placeholder="Enter promotion name" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe the promotion" />
                </div>
                <div className="col-span-1">
                  <Label htmlFor="department">Department</Label>
                  <Select defaultValue={department.toLowerCase()}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dining">F&B Department</SelectItem>
                      <SelectItem value="housekeeping">Housekeeping</SelectItem>
                      <SelectItem value="spa">Spa & Wellness</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-1">
                  <Label htmlFor="discountType">Discount Type</Label>
                  <Select defaultValue="percentage">
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage Discount</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                      <SelectItem value="bogo">Buy One Get One</SelectItem>
                      <SelectItem value="freeService">Free Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-1">
                  <Label htmlFor="discountValue">Discount Value</Label>
                  <div className="flex items-center">
                    <Input id="discountValue" type="number" placeholder="10" />
                    <span className="ml-2">%</span>
                  </div>
                </div>
                <div className="col-span-1">
                  <Label htmlFor="services">Applicable Services</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select services" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Services</SelectItem>
                      <SelectItem value="selected">Selected Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-1">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" type="date" />
                </div>
                <div className="col-span-1">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" type="date" />
                </div>
                <div className="col-span-1">
                  <Label htmlFor="startTime">Start Time (Optional)</Label>
                  <Input id="startTime" type="time" />
                </div>
                <div className="col-span-1">
                  <Label htmlFor="endTime">End Time (Optional)</Label>
                  <Input id="endTime" type="time" />
                </div>
                <div className="col-span-2 flex items-center space-x-2">
                  <Switch id="active" />
                  <Label htmlFor="active">Activate promotion immediately</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewPromotion(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowNewPromotion(false)}>Create Promotion</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
