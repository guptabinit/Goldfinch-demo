"use client"

import { useState } from "react"
import { useStaffAuth } from "@/lib/auth/staff-auth-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, ChevronRight, Download, Plus } from "lucide-react"

// Mock schedule data
const scheduleData = [
  { id: "1", name: "Rahul Sharma", mon: "M", tue: "M", wed: "M", thu: "M", fri: "M", sat: "O", sun: "O" },
  { id: "2", name: "Priya Patel", mon: "E", tue: "E", wed: "E", thu: "E", fri: "E", sat: "O", sun: "O" },
  { id: "3", name: "Amit Kumar", mon: "N", tue: "N", wed: "N", thu: "N", fri: "N", sat: "O", sun: "O" },
  { id: "4", name: "Deepa Singh", mon: "M", tue: "M", wed: "M", thu: "M", fri: "M", sat: "O", sun: "O" },
  { id: "5", name: "Vikram Malhotra", mon: "E", tue: "E", wed: "E", thu: "E", fri: "E", sat: "O", sun: "O" },
  { id: "6", name: "Neha Gupta", mon: "N", tue: "N", wed: "N", thu: "N", fri: "N", sat: "O", sun: "O" },
  { id: "7", name: "Rajesh Khanna", mon: "M", tue: "M", wed: "M", thu: "M", fri: "M", sat: "O", sun: "O" },
  { id: "8", name: "Sunita Verma", mon: "E", tue: "E", wed: "E", thu: "E", fri: "E", sat: "O", sun: "O" },
]

// Mock leave requests
const leaveRequests = [
  {
    id: "L001",
    name: "Amit Kumar",
    from: "2023-11-15",
    to: "2023-11-18",
    reason: "Family function",
    status: "pending",
  },
  { id: "L002", name: "Deepa Singh", from: "2023-11-20", to: "2023-11-22", reason: "Medical", status: "approved" },
  { id: "L003", name: "Priya Patel", from: "2023-11-25", to: "2023-11-26", reason: "Personal", status: "rejected" },
]

export default function HodSchedulePage() {
  const { user } = useStaffAuth()
  const [date, setDate] = useState<Date | undefined>(new Date())

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>
      case "pending":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-500">
            Pending
          </Badge>
        )
      case "rejected":
        return <Badge className="bg-red-500">Rejected</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-semibold text-goldfinch-gold">Staff Schedule</h1>
          <p className="text-muted-foreground">
            Manage schedules for the {user?.department || "Housekeeping"} department
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-goldfinch-gold/30 text-goldfinch-gold hover:bg-goldfinch-gold/10">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button className="bg-goldfinch-gold hover:bg-goldfinch-gold/90">
            <Plus className="mr-2 h-4 w-4" />
            Create Schedule
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="weekly" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="weekly">Weekly View</TabsTrigger>
              <TabsTrigger value="daily">Daily View</TabsTrigger>
              <TabsTrigger value="monthly">Monthly View</TabsTrigger>
            </TabsList>

            <TabsContent value="weekly">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Weekly Schedule</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm font-medium">Nov 13 - Nov 19, 2023</span>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>Staff schedule for the current week</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[150px]">Staff</TableHead>
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
                      <span className="px-2 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800 mr-1">
                        E
                      </span>
                      <span>Evening</span>
                    </div>
                    <div className="flex items-center">
                      <span className="px-2 py-1 rounded-md text-xs font-medium bg-indigo-100 text-indigo-800 mr-1">
                        N
                      </span>
                      <span>Night</span>
                    </div>
                    <div className="flex items-center">
                      <span className="px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 mr-1">O</span>
                      <span>Off</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-goldfinch-gold hover:bg-goldfinch-gold/90">Edit Schedule</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="daily">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Schedule</CardTitle>
                  <CardDescription>Staff schedule for November 15, 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-4">
                    <p>Daily schedule view would be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="monthly">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Schedule</CardTitle>
                  <CardDescription>Staff schedule for November 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-4">
                    <p>Monthly schedule view would be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Leave Requests</CardTitle>
              <CardDescription>Pending and approved leave requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaveRequests.map((leave) => (
                  <Card key={leave.id} className="overflow-hidden">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base">{leave.name}</CardTitle>
                          <CardDescription className="text-xs">
                            {leave.from} to {leave.to}
                          </CardDescription>
                        </div>
                        {getStatusBadge(leave.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">{leave.reason}</p>
                    </CardContent>
                    {leave.status === "pending" && (
                      <CardFooter className="p-2 bg-gray-50 flex justify-end space-x-2">
                        <Button size="sm" variant="outline" className="h-8">
                          Reject
                        </Button>
                        <Button size="sm" className="h-8 bg-goldfinch-gold hover:bg-goldfinch-gold/90">
                          Approve
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">View All</Button>
              <Button className="bg-goldfinch-gold hover:bg-goldfinch-gold/90">
                <Plus className="mr-2 h-4 w-4" />
                New Request
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
