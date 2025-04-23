"use client"

import { useState } from "react"
import { Users, Search, Plus, Edit, Trash2, MoreHorizontal, CheckCircle, Clock, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { mockStaffPerformance } from "@/lib/staff/mock-data"

export default function StaffManagementPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [staff, setStaff] = useState([
    ...mockStaffPerformance,
    {
      id: "staff-5",
      name: "Alex Johnson",
      role: "Front Desk Agent",
      department: "Reception",
      avatar: "/placeholder.svg?height=200&width=200&query=Avatar+A",
      ordersCompleted: 22,
      averageResponseTime: 3.5, // minutes
      customerRating: 4.5,
      lastActive: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
    },
    {
      id: "staff-6",
      name: "Maria Rodriguez",
      role: "Housekeeping Staff",
      department: "Housekeeping",
      avatar: "/blue-being.png",
      ordersCompleted: 31,
      averageResponseTime: 5.2, // minutes
      customerRating: 4.6,
      lastActive: new Date(Date.now() - 1000 * 60 * 40), // 40 minutes ago
    },
  ])

  // Filter staff based on search query and department filter
  const filteredStaff = staff.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.role.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment =
      departmentFilter === "all" || s.department.toLowerCase() === departmentFilter.toLowerCase()

    return matchesSearch && matchesDepartment
  })

  const handleDeleteStaff = (staffId: string) => {
    setStaff(staff.filter((s) => s.id !== staffId))

    toast({
      title: "Staff Removed",
      description: "The staff member has been removed from the system",
    })
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b bg-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Staff Management</h1>
            <p className="text-muted-foreground">Manage hotel staff and their roles</p>
          </div>
          <Button className="gap-2 bg-goldfinch-gold hover:bg-goldfinch-gold/90">
            <Plus className="h-4 w-4" />
            Add Staff
          </Button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Staff Directory</CardTitle>
                <CardDescription>View and manage all staff members</CardDescription>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search staff..."
                    className="pl-8 w-full sm:w-[200px] border-goldfinch-gold/20 focus:border-goldfinch-gold"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-full sm:w-[180px] border-goldfinch-gold/20 focus:border-goldfinch-gold">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="dining">Dining</SelectItem>
                    <SelectItem value="housekeeping">Housekeeping</SelectItem>
                    <SelectItem value="spa">Spa & Wellness</SelectItem>
                    <SelectItem value="reception">Reception</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredStaff.length > 0 ? (
                filteredStaff.map((staffMember) => (
                  <div
                    key={staffMember.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3 mb-3 sm:mb-0">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={staffMember.avatar || "/placeholder.svg"} alt={staffMember.name} />
                        <AvatarFallback>{staffMember.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{staffMember.name}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-muted-foreground">{staffMember.role}</p>
                          <Badge variant="outline" className="text-xs">
                            {staffMember.department}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{staffMember.ordersCompleted} orders</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-amber-500" />
                        <span className="text-sm">{staffMember.averageResponseTime} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-goldfinch-gold fill-goldfinch-gold" />
                        <span className="text-sm">{staffMember.customerRating}</span>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Users className="mr-2 h-4 w-4" />
                            Change Role
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500" onClick={() => handleDeleteStaff(staffMember.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove Staff
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground opacity-20" />
                  <h3 className="mt-4 text-lg font-medium">No staff found</h3>
                  <p className="text-muted-foreground">No staff members match your search criteria</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
