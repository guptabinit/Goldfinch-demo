"use client"

import { useState } from "react"
import { ToggleLeft, Search, Filter, Plus, Edit, Clock, Calendar, Settings } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
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

// Mock services data
const servicesData = {
  dining: [
    {
      id: "dining-001",
      name: "Room Service - Breakfast",
      description: "In-room breakfast service",
      availability: true,
      availableFrom: "06:00",
      availableTo: "11:00",
      category: "Room Service",
      preparationTime: "25 min",
      staffRequired: 2,
      restrictions: "None",
    },
    {
      id: "dining-002",
      name: "Room Service - Lunch",
      description: "In-room lunch service",
      availability: true,
      availableFrom: "12:00",
      availableTo: "15:00",
      category: "Room Service",
      preparationTime: "30 min",
      staffRequired: 2,
      restrictions: "None",
    },
    {
      id: "dining-003",
      name: "Room Service - Dinner",
      description: "In-room dinner service",
      availability: true,
      availableFrom: "18:00",
      availableTo: "22:30",
      category: "Room Service",
      preparationTime: "35 min",
      staffRequired: 2,
      restrictions: "None",
    },
    {
      id: "dining-004",
      name: "Banjara Restaurant - Breakfast",
      description: "Breakfast at Banjara restaurant",
      availability: true,
      availableFrom: "07:00",
      availableTo: "10:30",
      category: "Restaurant",
      preparationTime: "20 min",
      staffRequired: 4,
      restrictions: "None",
    },
    {
      id: "dining-005",
      name: "Banjara Restaurant - Lunch",
      description: "Lunch at Banjara restaurant",
      availability: true,
      availableFrom: "12:30",
      availableTo: "15:30",
      category: "Restaurant",
      preparationTime: "25 min",
      staffRequired: 5,
      restrictions: "None",
    },
    {
      id: "dining-006",
      name: "Banjara Restaurant - Dinner",
      description: "Dinner at Banjara restaurant",
      availability: true,
      availableFrom: "19:00",
      availableTo: "23:00",
      category: "Restaurant",
      preparationTime: "30 min",
      staffRequired: 6,
      restrictions: "None",
    },
    {
      id: "dining-007",
      name: "Special Dietary Requests",
      description: "Custom meals for dietary restrictions",
      availability: true,
      availableFrom: "07:00",
      availableTo: "22:00",
      category: "Special",
      preparationTime: "40 min",
      staffRequired: 1,
      restrictions: "Advance notice required",
    },
  ],
  housekeeping: [
    {
      id: "housekeeping-001",
      name: "Daily Room Cleaning",
      description: "Standard daily room cleaning service",
      availability: true,
      availableFrom: "08:00",
      availableTo: "16:00",
      category: "Room Cleaning",
      preparationTime: "30 min",
      staffRequired: 1,
      restrictions: "None",
    },
    {
      id: "housekeeping-002",
      name: "Turndown Service",
      description: "Evening turndown service",
      availability: true,
      availableFrom: "18:00",
      availableTo: "21:00",
      category: "Room Cleaning",
      preparationTime: "15 min",
      staffRequired: 1,
      restrictions: "None",
    },
    {
      id: "housekeeping-003",
      name: "Deep Cleaning",
      description: "Thorough room cleaning service",
      availability: false,
      availableFrom: "09:00",
      availableTo: "15:00",
      category: "Room Cleaning",
      preparationTime: "60 min",
      staffRequired: 2,
      restrictions: "By appointment only",
    },
    {
      id: "housekeeping-004",
      name: "Laundry Service",
      description: "Clothes washing and ironing",
      availability: true,
      availableFrom: "08:00",
      availableTo: "20:00",
      category: "Laundry",
      preparationTime: "180 min",
      staffRequired: 1,
      restrictions: "Same day service until 10 AM",
    },
    {
      id: "housekeeping-005",
      name: "Dry Cleaning",
      description: "Professional dry cleaning service",
      availability: true,
      availableFrom: "08:00",
      availableTo: "14:00",
      category: "Laundry",
      preparationTime: "24 hours",
      staffRequired: 1,
      restrictions: "48-hour turnaround",
    },
    {
      id: "housekeeping-006",
      name: "Extra Amenities",
      description: "Additional toiletries and amenities",
      availability: true,
      availableFrom: "00:00",
      availableTo: "23:59",
      category: "Amenities",
      preparationTime: "10 min",
      staffRequired: 1,
      restrictions: "None",
    },
  ],
  spa: [
    {
      id: "spa-001",
      name: "Swedish Massage",
      description: "Classic relaxation massage",
      availability: true,
      availableFrom: "10:00",
      availableTo: "20:00",
      category: "Massage",
      preparationTime: "60 min",
      staffRequired: 1,
      restrictions: "None",
    },
    {
      id: "spa-002",
      name: "Deep Tissue Massage",
      description: "Therapeutic massage for muscle tension",
      availability: true,
      availableFrom: "10:00",
      availableTo: "19:00",
      category: "Massage",
      preparationTime: "60/90 min",
      staffRequired: 1,
      restrictions: "None",
    },
    {
      id: "spa-003",
      name: "Hot Stone Massage",
      description: "Massage with heated stones",
      availability: true,
      availableFrom: "11:00",
      availableTo: "18:00",
      category: "Massage",
      preparationTime: "75 min",
      staffRequired: 1,
      restrictions: "None",
    },
    {
      id: "spa-004",
      name: "Aromatherapy Facial",
      description: "Facial treatment with essential oils",
      availability: true,
      availableFrom: "10:00",
      availableTo: "19:00",
      category: "Facial",
      preparationTime: "60 min",
      staffRequired: 1,
      restrictions: "None",
    },
    {
      id: "spa-005",
      name: "Body Scrub",
      description: "Exfoliating body treatment",
      availability: false,
      availableFrom: "11:00",
      availableTo: "17:00",
      category: "Body Treatment",
      preparationTime: "45 min",
      staffRequired: 1,
      restrictions: "Therapist on leave",
    },
    {
      id: "spa-006",
      name: "Couples Massage",
      description: "Massage for two people",
      availability: true,
      availableFrom: "12:00",
      availableTo: "20:00",
      category: "Massage",
      preparationTime: "60/90 min",
      staffRequired: 2,
      restrictions: "Advance booking required",
    },
  ],
}

export default function ServicesPage() {
  const { user } = useStaffAuth()
  const [department, setDepartment] = useState<"dining" | "housekeeping" | "spa">("dining")
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showNewService, setShowNewService] = useState(false)
  const [services, setServices] = useState(servicesData.dining)

  // Set department based on user's department
  useState(() => {
    if (user?.department) {
      const dept = user.department.toLowerCase()
      if (dept.includes("dining") || dept.includes("f&b")) {
        setDepartment("dining")
        setServices(servicesData.dining)
      } else if (dept.includes("housekeeping")) {
        setDepartment("housekeeping")
        setServices(servicesData.housekeeping)
      } else if (dept.includes("spa")) {
        setDepartment("spa")
        setServices(servicesData.spa)
      }
    }
  })

  // Filter services based on search and tab
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "available") return matchesSearch && service.availability
    if (activeTab === "unavailable") return matchesSearch && !service.availability

    return matchesSearch
  })

  // Toggle service availability
  const toggleServiceAvailability = (id: string) => {
    setServices(
      services.map((service) => (service.id === id ? { ...service, availability: !service.availability } : service)),
    )
  }

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
            <ToggleLeft className="h-6 w-6 text-goldfinch-gold" />
            <div>
              <h1 className="text-2xl font-bold">Service Availability</h1>
              <p className="text-muted-foreground">{getDepartmentName()} Department</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Select
              defaultValue={department}
              onValueChange={(value: "dining" | "housekeeping" | "spa") => {
                setDepartment(value)
                setServices(servicesData[value])
              }}
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
            <Button
              className="gap-2 bg-goldfinch-gold hover:bg-goldfinch-gold/90"
              onClick={() => setShowNewService(true)}
            >
              <Plus className="h-4 w-4" />
              <span>Add Service</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Services Overview */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Services</p>
                  <p className="text-3xl font-bold">{services.length}</p>
                </div>
                <div className="rounded-full p-2 bg-blue-100">
                  <Settings className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Available Services</p>
                  <p className="text-3xl font-bold">{services.filter((service) => service.availability).length}</p>
                </div>
                <div className="rounded-full p-2 bg-green-100">
                  <ToggleLeft className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Unavailable Services</p>
                  <p className="text-3xl font-bold">{services.filter((service) => !service.availability).length}</p>
                </div>
                <div className="rounded-full p-2 bg-red-100">
                  <ToggleLeft className="h-6 w-6 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Services List */}
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Service Management</CardTitle>
              <CardDescription>Control the availability of services in your department</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search services..."
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
                <TabsTrigger value="all">All Services</TabsTrigger>
                <TabsTrigger value="available">Available</TabsTrigger>
                <TabsTrigger value="unavailable">Unavailable</TabsTrigger>
              </TabsList>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 bg-muted/50 p-3 text-sm font-medium">
                  <div className="col-span-3">Service Name</div>
                  <div className="col-span-2">Category</div>
                  <div className="col-span-2">Available Hours</div>
                  <div className="col-span-1">Prep Time</div>
                  <div className="col-span-1">Staff</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-2">Actions</div>
                </div>
                {filteredServices.length > 0 ? (
                  filteredServices.map((service) => (
                    <div key={service.id} className="grid grid-cols-12 items-center border-t p-3 text-sm">
                      <div className="col-span-3">
                        <div className="font-medium">{service.name}</div>
                        <div
                          className="text-xs text-muted-foreground truncate max-w-[250px]"
                          title={service.description}
                        >
                          {service.description}
                        </div>
                      </div>
                      <div className="col-span-2">{service.category}</div>
                      <div className="col-span-2">
                        {service.availableFrom} - {service.availableTo}
                      </div>
                      <div className="col-span-1">{service.preparationTime}</div>
                      <div className="col-span-1">{service.staffRequired}</div>
                      <div className="col-span-1">
                        <Switch
                          checked={service.availability}
                          onCheckedChange={() => toggleServiceAvailability(service.id)}
                        />
                      </div>
                      <div className="col-span-2 flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Clock className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Calendar className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">No services found.</div>
                )}
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* New Service Dialog */}
        <Dialog open={showNewService} onOpenChange={setShowNewService}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
              <DialogDescription>Create a new service for your department.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="name">Service Name</Label>
                  <Input id="name" placeholder="Enter service name" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe the service" />
                </div>
                <div className="col-span-1">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {department === "dining" && (
                        <>
                          <SelectItem value="room_service">Room Service</SelectItem>
                          <SelectItem value="restaurant">Restaurant</SelectItem>
                          <SelectItem value="special">Special</SelectItem>
                        </>
                      )}
                      {department === "housekeeping" && (
                        <>
                          <SelectItem value="room_cleaning">Room Cleaning</SelectItem>
                          <SelectItem value="laundry">Laundry</SelectItem>
                          <SelectItem value="amenities">Amenities</SelectItem>
                        </>
                      )}
                      {department === "spa" && (
                        <>
                          <SelectItem value="massage">Massage</SelectItem>
                          <SelectItem value="facial">Facial</SelectItem>
                          <SelectItem value="body_treatment">Body Treatment</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-1">
                  <Label htmlFor="preparationTime">Preparation Time</Label>
                  <Input id="preparationTime" placeholder="e.g., 30 min" />
                </div>
                <div className="col-span-1">
                  <Label htmlFor="availableFrom">Available From</Label>
                  <Input id="availableFrom" type="time" />
                </div>
                <div className="col-span-1">
                  <Label htmlFor="availableTo">Available To</Label>
                  <Input id="availableTo" type="time" />
                </div>
                <div className="col-span-1">
                  <Label htmlFor="staffRequired">Staff Required</Label>
                  <Input id="staffRequired" type="number" min="1" defaultValue="1" />
                </div>
                <div className="col-span-1">
                  <Label htmlFor="restrictions">Restrictions</Label>
                  <Input id="restrictions" placeholder="Any restrictions" />
                </div>
                <div className="col-span-2 flex items-center space-x-2">
                  <Switch id="availability" defaultChecked />
                  <Label htmlFor="availability">Service is available</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewService(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowNewService(false)}>Add Service</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
