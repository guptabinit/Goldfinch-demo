"use client"

import { useState } from "react"
import { Clock, CheckCircle, Users, Star, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { mockStaffPerformance } from "@/lib/staff/mock-data"

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState("week")
  const [department, setDepartment] = useState("all")

  // Mock performance metrics
  const performanceMetrics = {
    ordersCompleted: 142,
    averageResponseTime: 4.8, // minutes
    customerSatisfaction: 92, // percentage
    activeStaff: 12,
  }

  // Filter staff by department
  const filteredStaff =
    department === "all"
      ? mockStaffPerformance
      : mockStaffPerformance.filter((staff) => staff.department.toLowerCase() === department.toLowerCase())

  return (
    <div className="flex flex-col h-full">
      <div className="border-b bg-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Performance Reports</h1>
            <p className="text-muted-foreground">Track staff performance and service metrics</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[160px] border-goldfinch-gold/20 focus:border-goldfinch-gold">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <div className="space-y-6">
          {/* Performance Overview */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Orders Completed</p>
                    <p className="text-3xl font-bold">{performanceMetrics.ordersCompleted}</p>
                  </div>
                  <div className="rounded-full p-2 bg-blue-100">
                    <CheckCircle className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg. Response Time</p>
                    <p className="text-3xl font-bold">{performanceMetrics.averageResponseTime} min</p>
                  </div>
                  <div className="rounded-full p-2 bg-amber-100">
                    <Clock className="h-6 w-6 text-amber-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Customer Satisfaction</p>
                    <p className="text-3xl font-bold">{performanceMetrics.customerSatisfaction}%</p>
                  </div>
                  <div className="rounded-full p-2 bg-green-100">
                    <Star className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Staff</p>
                    <p className="text-3xl font-bold">{performanceMetrics.activeStaff}</p>
                  </div>
                  <div className="rounded-full p-2 bg-purple-100">
                    <Users className="h-6 w-6 text-purple-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Staff Performance */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Staff Performance</CardTitle>
                  <CardDescription>Individual staff metrics and ratings</CardDescription>
                </div>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger className="w-[180px] border-goldfinch-gold/20 focus:border-goldfinch-gold">
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
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {filteredStaff.map((staff) => (
                  <div key={staff.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={staff.avatar || "/placeholder.svg"} alt={staff.name} />
                          <AvatarFallback>{staff.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{staff.name}</p>
                          <p className="text-sm text-muted-foreground">{staff.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{staff.ordersCompleted} orders</p>
                          <p className="text-xs text-muted-foreground">completed</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{staff.averageResponseTime} min</p>
                          <p className="text-xs text-muted-foreground">avg. response</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-goldfinch-gold fill-goldfinch-gold" />
                          <span className="font-medium">{staff.customerRating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>Performance</span>
                        <span className="font-medium">
                          {staff.customerRating >= 4.8
                            ? "Excellent"
                            : staff.customerRating >= 4.5
                              ? "Very Good"
                              : staff.customerRating >= 4.0
                                ? "Good"
                                : "Needs Improvement"}
                        </span>
                      </div>
                      <Progress value={staff.customerRating * 20} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Department Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
              <CardDescription>Metrics by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-goldfinch-gold" />
                      <span>Dining</span>
                    </div>
                    <span className="font-medium">92% completion rate</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500" />
                      <span>Housekeeping</span>
                    </div>
                    <span className="font-medium">88% completion rate</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                      <span>Room Service</span>
                    </div>
                    <span className="font-medium">95% completion rate</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-purple-500" />
                      <span>Spa & Wellness</span>
                    </div>
                    <span className="font-medium">85% completion rate</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
