"use client"

import { useState } from "react"
import { useStaffAuth } from "@/lib/auth/staff-auth-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Calendar, Edit, MoreHorizontal, Search, Star, Trash, UserPlus } from "lucide-react"

// Mock staff data
const staffMembers = [
  {
    id: "1",
    name: "Rahul Sharma",
    role: "Room Attendant",
    shift: "Morning",
    performance: 92,
    status: "active",
    avatar: "/abstract-rs.png",
  },
  {
    id: "2",
    name: "Priya Patel",
    role: "Supervisor",
    shift: "Evening",
    performance: 88,
    status: "active",
    avatar: "/Intersecting Paths.png",
  },
  {
    id: "3",
    name: "Amit Kumar",
    role: "Room Attendant",
    shift: "Night",
    performance: 78,
    status: "leave",
    avatar: "/alaskan-landscape.png",
  },
  {
    id: "4",
    name: "Deepa Singh",
    role: "Laundry Specialist",
    shift: "Morning",
    performance: 95,
    status: "active",
    avatar: "/abstract-data-stream.png",
  },
  {
    id: "5",
    name: "Vikram Malhotra",
    role: "Public Area Attendant",
    shift: "Evening",
    performance: 82,
    status: "training",
    avatar: "/virtual-meeting-diversity.png",
  },
]

// Mock schedule data
const scheduleData = [
  { id: "1", name: "Rahul Sharma", mon: "M", tue: "M", wed: "M", thu: "M", fri: "M", sat: "O", sun: "O" },
  { id: "2", name: "Priya Patel", mon: "E", tue: "E", wed: "E", thu: "E", fri: "E", sat: "O", sun: "O" },
  { id: "3", name: "Amit Kumar", mon: "N", tue: "N", wed: "N", thu: "N", fri: "N", sat: "O", sun: "O" },
  { id: "4", name: "Deepa Singh", mon: "M", tue: "M", wed: "M", thu: "M", fri: "M", sat: "O", sun: "O" },
  { id: "5", name: "Vikram Malhotra", mon: "E", tue: "E", wed: "E", thu: "E", fri: "E", sat: "O", sun: "O" },
]

export default function HodStaffPage() {
  const { user } = useStaffAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [addStaffOpen, setAddStaffOpen] = useState(false)

  const filteredStaff = staffMembers.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "leave":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-500">
            On Leave
          </Badge>
        )
      case "training":
        return <Badge className="bg-blue-500">Training</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getShiftColor = (shift: string) => {
    switch (shift) {
      case "M":
        return "bg-blue-100 text-blue-800"
      case "E":
        return "bg-purple-100 text-purple-800"
      case "N":
        return "bg-indigo-100 text-indigo-800"
      case "O":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-semibold text-goldfinch-gold">Staff Management</h1>
          <p className="text-muted-foreground">Manage staff in the {user?.department || "Housekeeping"} department</p>
        </div>
        <Dialog open={addStaffOpen} onOpenChange={setAddStaffOpen}>
          <DialogTrigger asChild>
            <Button className="bg-goldfinch-gold hover:bg-goldfinch-gold/90">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Staff
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
              <DialogDescription>
                Add a new staff member to the {user?.department || "Housekeeping"} department
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="attendant">Room Attendant</SelectItem>
                    <SelectItem value="supervisor">Supervisor</SelectItem>
                    <SelectItem value="laundry">Laundry Specialist</SelectItem>
                    <SelectItem value="public">Public Area Attendant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="shift" className="text-right">
                  Shift
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select shift" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning</SelectItem>
                    <SelectItem value="evening">Evening</SelectItem>
                    <SelectItem value="night">Night</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddStaffOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-goldfinch-gold hover:bg-goldfinch-gold/90" onClick={() => setAddStaffOpen(false)}>
                Add Staff
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search staff by name or role..."
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
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="leave">On Leave</SelectItem>
            <SelectItem value="training">Training</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="list">Staff List</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Staff</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Shift</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStaff.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={staff.avatar || "/placeholder.svg"} alt={staff.name} />
                            <AvatarFallback>{staff.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{staff.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{staff.role}</TableCell>
                      <TableCell>{staff.shift}</TableCell>
                      <TableCell>{getStatusBadge(staff.status)}</TableCell>
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
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="mr-2 h-4 w-4" />
                              Schedule
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
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

        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>Staff schedule for the current week</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Staff</TableHead>
                    <TableHead>Mon</TableHead>
                    <TableHead>Tue</TableHead>
                    <TableHead>Wed</TableHead>
                    <TableHead>Thu</TableHead>
                    <TableHead>Fri</TableHead>
                    <TableHead>Sat</TableHead>
                    <TableHead>Sun</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scheduleData.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell className="font-medium">{staff.name}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${getShiftColor(staff.mon)}`}>
                          {staff.mon}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${getShiftColor(staff.tue)}`}>
                          {staff.tue}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${getShiftColor(staff.wed)}`}>
                          {staff.wed}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${getShiftColor(staff.thu)}`}>
                          {staff.thu}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${getShiftColor(staff.fri)}`}>
                          {staff.fri}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${getShiftColor(staff.sat)}`}>
                          {staff.sat}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${getShiftColor(staff.sun)}`}>
                          {staff.sun}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <span className="px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 mr-1">M</span>
                  <span>Morning</span>
                </div>
                <div className="flex items-center">
                  <span className="px-2 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800 mr-1">E</span>
                  <span>Evening</span>
                </div>
                <div className="flex items-center">
                  <span className="px-2 py-1 rounded-md text-xs font-medium bg-indigo-100 text-indigo-800 mr-1">N</span>
                  <span>Night</span>
                </div>
                <div className="flex items-center">
                  <span className="px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 mr-1">O</span>
                  <span>Off</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-goldfinch-gold hover:bg-goldfinch-gold/90">
                <Edit className="mr-2 h-4 w-4" />
                Edit Schedule
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Staff Performance</CardTitle>
              <CardDescription>Performance metrics for the current month</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Staff</TableHead>
                    <TableHead>Performance Score</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Tasks Completed</TableHead>
                    <TableHead>Avg. Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStaff.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={staff.avatar || "/placeholder.svg"} alt={staff.name} />
                            <AvatarFallback>{staff.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{staff.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full ${
                              staff.performance > 90
                                ? "bg-green-500"
                                : staff.performance > 80
                                  ? "bg-blue-500"
                                  : staff.performance > 70
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                            }`}
                            style={{ width: `${staff.performance}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 mt-1">{staff.performance}%</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.round(staff.performance / 20) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{Math.floor(Math.random() * 50) + 50}/100</TableCell>
                      <TableCell>{Math.floor(Math.random() * 10) + 15} min</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
