"use client"

import { useState } from "react"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, Plus, Filter } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format, addDays, startOfWeek, addWeeks, subWeeks } from "date-fns"
import { useToast } from "@/components/ui/use-toast"
import { mockStaffPerformance } from "@/lib/staff/mock-data"

// Mock shifts
const mockShifts = [
  {
    id: "shift-1",
    staffId: "staff-1",
    date: new Date(),
    startTime: "08:00",
    endTime: "16:00",
    department: "Dining",
  },
  {
    id: "shift-2",
    staffId: "staff-2",
    date: new Date(),
    startTime: "10:00",
    endTime: "18:00",
    department: "Housekeeping",
  },
  {
    id: "shift-3",
    staffId: "staff-3",
    date: addDays(new Date(), 1),
    startTime: "12:00",
    endTime: "20:00",
    department: "Spa",
  },
  {
    id: "shift-4",
    staffId: "staff-4",
    date: addDays(new Date(), 2),
    startTime: "07:00",
    endTime: "15:00",
    department: "Reception",
  },
  {
    id: "shift-5",
    staffId: "staff-1",
    date: addDays(new Date(), 3),
    startTime: "16:00",
    endTime: "00:00",
    department: "Dining",
  },
]

export default function SchedulingPage() {
  const { toast } = useToast()
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }))
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [shifts, setShifts] = useState(mockShifts)
  const [staff] = useState(mockStaffPerformance)

  // Generate days of the week
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i))

  // Filter shifts based on department
  const filteredShifts =
    departmentFilter === "all"
      ? shifts
      : shifts.filter((shift) => shift.department.toLowerCase() === departmentFilter.toLowerCase())

  // Navigate to previous week
  const goToPreviousWeek = () => {
    setCurrentWeekStart(subWeeks(currentWeekStart, 1))
  }

  // Navigate to next week
  const goToNextWeek = () => {
    setCurrentWeekStart(addWeeks(currentWeekStart, 1))
  }

  // Get shifts for a specific day and staff member
  const getShiftsForDayAndStaff = (date: Date, staffId: string) => {
    return filteredShifts.filter(
      (shift) => format(new Date(shift.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd") && shift.staffId === staffId,
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b bg-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Staff Scheduling</h1>
            <p className="text-muted-foreground">Manage staff shifts and schedules</p>
          </div>
          <Button className="gap-2 bg-goldfinch-gold hover:bg-goldfinch-gold/90">
            <Plus className="h-4 w-4" />
            Add Shift
          </Button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Weekly Schedule</CardTitle>
                <CardDescription>
                  {format(currentWeekStart, "MMMM d, yyyy")} - {format(addDays(currentWeekStart, 6), "MMMM d, yyyy")}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={goToPreviousWeek}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }))}
                >
                  <CalendarIcon className="h-4 w-4" />
                  Today
                </Button>
                <Button variant="outline" size="icon" onClick={goToNextWeek}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-[180px] border-goldfinch-gold/20 focus:border-goldfinch-gold">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="dining">Dining</SelectItem>
                    <SelectItem value="housekeeping">Housekeeping</SelectItem>
                    <SelectItem value="spa">Spa</SelectItem>
                    <SelectItem value="reception">Reception</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] border-collapse">
                <thead>
                  <tr>
                    <th className="border-b p-3 text-left font-medium">Staff</th>
                    {weekDays.map((day, index) => (
                      <th
                        key={index}
                        className={`border-b p-3 text-center font-medium ${
                          format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd") ? "bg-goldfinch-gold/10" : ""
                        }`}
                      >
                        <div>{format(day, "EEE")}</div>
                        <div className="text-sm font-normal text-muted-foreground">{format(day, "MMM d")}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {staff.map((staffMember) => (
                    <tr key={staffMember.id}>
                      <td className="border-b p-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={staffMember.avatar || "/placeholder.svg"} alt={staffMember.name} />
                            <AvatarFallback>{staffMember.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{staffMember.name}</p>
                            <p className="text-xs text-muted-foreground">{staffMember.department}</p>
                          </div>
                        </div>
                      </td>
                      {weekDays.map((day, index) => {
                        const shiftsForDay = getShiftsForDayAndStaff(day, staffMember.id)
                        return (
                          <td
                            key={index}
                            className={`border-b p-3 text-center ${
                              format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
                                ? "bg-goldfinch-gold/10"
                                : ""
                            }`}
                          >
                            {shiftsForDay.length > 0 ? (
                              <div className="flex flex-col items-center gap-1">
                                {shiftsForDay.map((shift) => (
                                  <Badge
                                    key={shift.id}
                                    variant="outline"
                                    className="flex items-center gap-1 cursor-pointer hover:bg-muted"
                                  >
                                    <Clock className="h-3 w-3" />
                                    <span>
                                      {shift.startTime} - {shift.endTime}
                                    </span>
                                  </Badge>
                                ))}
                              </div>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 rounded-full"
                                onClick={() => {
                                  toast({
                                    title: "Add Shift",
                                    description: `Add shift for ${staffMember.name} on ${format(day, "MMMM d, yyyy")}`,
                                  })
                                }}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
