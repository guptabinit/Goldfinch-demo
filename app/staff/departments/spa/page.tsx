"use client"

import { useState } from "react"
import { SpadeIcon as Spa, Search, Plus, Calendar, ArrowUpDown, Users, CalendarDays } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock spa appointments
const spaAppointments = [
  {
    id: "spa-001",
    guestName: "John Smith",
    roomNumber: "301",
    service: "Swedish Massage",
    duration: "60 min",
    status: "scheduled",
    appointmentTime: "2:30 PM",
    therapist: "Aisha Patel",
    notes: "First time guest, prefers medium pressure",
    isVIP: false,
  },
  {
    id: "spa-002",
    guestName: "Sarah Johnson",
    roomNumber: "415",
    service: "Deep Tissue Massage",
    duration: "90 min",
    status: "in_progress",
    appointmentTime: "11:00 AM",
    therapist: "Miguel Santos",
    notes: "Focus on lower back area",
    isVIP: true,
  },
  {
    id: "spa-003",
    guestName: "Robert Williams",
    roomNumber: "208",
    service: "Aromatherapy Facial",
    duration: "60 min",
    status: "completed",
    appointmentTime: "9:30 AM",
    therapist: "Lisa Chen",
    notes: "Sensitive skin, use gentle products",
    isVIP: false,
  },
  {
    id: "spa-004",
    guestName: "Emily Davis",
    roomNumber: "512",
    service: "Hot Stone Massage",
    duration: "75 min",
    status: "scheduled",
    appointmentTime: "4:00 PM",
    therapist: "Aisha Patel",
    notes: "",
    isVIP: false,
  },
  {
    id: "spa-005",
    guestName: "Michael Brown",
    roomNumber: "127",
    service: "Reflexology",
    duration: "45 min",
    status: "confirmed",
    appointmentTime: "1:15 PM",
    therapist: "",
    notes: "Returning guest, prefers male therapist",
    isVIP: true,
  },
]

// Mock therapist data
const therapistData = [
  {
    id: 1,
    name: "Aisha Patel",
    avatar: "/mystical-forest-spirit.png",
    status: "active",
    specialty: "Massage Therapy",
    appointmentsToday: 3,
  },
  {
    id: 2,
    name: "Miguel Santos",
    avatar: "/blue-being.png",
    status: "active",
    specialty: "Deep Tissue & Sports",
    appointmentsToday: 2,
  },
  {
    id: 3,
    name: "Lisa Chen",
    avatar: "/elemental-master.png",
    status: "active",
    specialty: "Facials & Skincare",
    appointmentsToday: 4,
  },
  {
    id: 4,
    name: "David Johnson",
    avatar: "/abstract-letter-r.png",
    status: "break",
    specialty: "Ayurvedic Treatments",
    appointmentsToday: 1,
  },
]

// Mock service availability
const serviceAvailability = [
  { service: "Swedish Massage", booked: 5, available: 7, duration: "60 min" },
  { service: "Deep Tissue Massage", booked: 4, available: 3, duration: "60/90 min" },
  { service: "Aromatherapy Facial", booked: 3, available: 5, duration: "60 min" },
  { service: "Hot Stone Massage", booked: 2, available: 2, duration: "75 min" },
  { service: "Reflexology", booked: 1, available: 6, duration: "45 min" },
]

export default function SpaDepartment() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Filter appointments based on search and tab
  const filteredAppointments = spaAppointments.filter((appointment) => {
    const matchesSearch =
      appointment.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.roomNumber.includes(searchQuery) ||
      appointment.service.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "scheduled") return matchesSearch && appointment.status === "scheduled"
    if (activeTab === "confirmed") return matchesSearch && appointment.status === "confirmed"
    if (activeTab === "in_progress") return matchesSearch && appointment.status === "in_progress"
    if (activeTab === "completed") return matchesSearch && appointment.status === "completed"

    return matchesSearch
  })

  // Stats
  const stats = {
    scheduledAppointments: spaAppointments.filter((appointment) => appointment.status === "scheduled").length,
    confirmedAppointments: spaAppointments.filter((appointment) => appointment.status === "confirmed").length,
    inProgressAppointments: spaAppointments.filter((appointment) => appointment.status === "in_progress").length,
    completedAppointments: spaAppointments.filter((appointment) => appointment.status === "completed").length,
    vipGuests: spaAppointments.filter((appointment) => appointment.isVIP).length,
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Spa className="h-6 w-6 text-goldfinch-gold" />
            <h1 className="text-2xl font-bold">Spa & Wellness Department</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              View Calendar
            </Button>
            <Button variant="outline" className="gap-2">
              <Users className="h-4 w-4" />
              Therapist Schedule
            </Button>
            <Button className="gap-2 bg-goldfinch-gold hover:bg-goldfinch-gold/90">
              <Plus className="h-4 w-4" />
              New Appointment
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Appointment Stats */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold text-blue-600">{stats.scheduledAppointments}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">Confirmed</p>
                <p className="text-2xl font-bold text-amber-600">{stats.confirmedAppointments}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-purple-600">{stats.inProgressAppointments}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-green-600">{stats.completedAppointments}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">VIP Guests</p>
                <p className="text-2xl font-bold text-goldfinch-gold">{stats.vipGuests}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Therapists & Service Availability */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Therapists */}
          <Card>
            <CardHeader>
              <CardTitle>Spa Therapists</CardTitle>
              <CardDescription>Current therapist status and appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {therapistData.map((therapist) => (
                  <div key={therapist.id} className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={therapist.avatar || "/placeholder.svg"} alt={therapist.name} />
                        <AvatarFallback>{therapist.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{therapist.name}</p>
                        <p className="text-xs text-muted-foreground">{therapist.specialty}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={therapist.status === "active" ? "success" : "secondary"} className="text-xs">
                        {therapist.status === "active" ? "Available" : "On Break"}
                      </Badge>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Today</p>
                        <p className="font-medium">{therapist.appointmentsToday}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Schedule
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Service Availability */}
          <Card>
            <CardHeader>
              <CardTitle>Service Availability</CardTitle>
              <CardDescription>Today's availability by service type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serviceAvailability.map((service, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{service.service}</p>
                        <p className="text-xs text-muted-foreground">{service.duration}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-amber-600">{service.booked} booked</span>
                        <span className="text-sm text-green-600">{service.available} available</span>
                      </div>
                    </div>
                    <Progress
                      value={(service.available / (service.available + service.booked)) * 100}
                      className="h-2"
                    />
                  </div>
                ))}
                <div className="flex justify-between mt-4">
                  <Button variant="outline">View All Services</Button>
                  <Button variant="outline">Update Availability</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Schedule */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>All spa appointments for today</CardDescription>
            </div>
            <Button variant="outline" className="gap-2">
              <CalendarDays className="h-4 w-4" />
              View Full Calendar
            </Button>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search appointments..."
                    className="pl-8 w-full sm:w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Services</SelectItem>
                    <SelectItem value="massage">Massage</SelectItem>
                    <SelectItem value="facial">Facial</SelectItem>
                    <SelectItem value="body">Body Treatments</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Appointments</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                <TabsTrigger value="in_progress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              <TabsContent value={activeTab} className="mt-0">
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 bg-muted/50 p-3 text-sm font-medium">
                    <div className="col-span-1">Room</div>
                    <div className="col-span-2">Guest</div>
                    <div className="col-span-2">Service</div>
                    <div className="col-span-1">Duration</div>
                    <div className="col-span-2">Time</div>
                    <div className="col-span-2">Therapist</div>
                    <div className="col-span-2">Status</div>
                  </div>
                  {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className={`grid grid-cols-12 items-center border-t p-3 text-sm ${appointment.isVIP ? "border-l-4 border-l-goldfinch-gold" : ""}`}
                      >
                        <div className="col-span-1 font-medium">{appointment.roomNumber}</div>
                        <div className="col-span-2">
                          <div className="flex items-center gap-1">
                            {appointment.guestName}
                            {appointment.isVIP && (
                              <Badge variant="gold" className="ml-1">
                                VIP
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="col-span-2">{appointment.service}</div>
                        <div className="col-span-1">{appointment.duration}</div>
                        <div className="col-span-2">{appointment.appointmentTime}</div>
                        <div className="col-span-2">
                          {appointment.therapist || (
                            <Button variant="outline" size="sm">
                              Assign
                            </Button>
                          )}
                        </div>
                        <div className="col-span-2 flex items-center gap-2">
                          <Badge
                            variant={
                              appointment.status === "completed"
                                ? "success"
                                : appointment.status === "in_progress"
                                  ? "default"
                                  : appointment.status === "confirmed"
                                    ? "secondary"
                                    : "outline"
                            }
                            className="whitespace-nowrap"
                          >
                            {appointment.status.replace("_", " ")}
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
                    <div className="p-4 text-center text-muted-foreground">
                      No appointments found matching your criteria.
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
