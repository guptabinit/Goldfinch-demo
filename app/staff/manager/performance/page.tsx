"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, LineChart, RefreshCw, Users } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ManagerPerformanceChart } from "@/components/manager/manager-performance-chart"
import { ManagerStaffPerformance } from "@/components/manager/manager-staff-performance"

export default function ManagerPerformance() {
  const [timeRange, setTimeRange] = useState("month")
  const [departmentFilter, setDepartmentFilter] = useState("all")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Service Performance</h1>
          <p className="text-muted-foreground">
            Monitor and analyze service performance metrics across all departments
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="services">Service Metrics</TabsTrigger>
          <TabsTrigger value="staff">Staff Performance</TabsTrigger>
          <TabsTrigger value="trends">Performance Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Room Service</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Avg. Response Time</span>
                    <span className="font-medium">6.5 min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Completion Rate</span>
                    <span className="font-medium">97.1%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Guest Satisfaction</span>
                    <span className="font-medium">4.8/5.0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">SLA Compliance</span>
                    <span className="font-medium">97.1%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Housekeeping</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Avg. Response Time</span>
                    <span className="font-medium">9.8 min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Completion Rate</span>
                    <span className="font-medium">91.3%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Guest Satisfaction</span>
                    <span className="font-medium">4.5/5.0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">SLA Compliance</span>
                    <span className="font-medium">91.3%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Spa & Wellness</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Avg. Response Time</span>
                    <span className="font-medium">8.3 min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Completion Rate</span>
                    <span className="font-medium">94.2%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Guest Satisfaction</span>
                    <span className="font-medium">4.9/5.0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">SLA Compliance</span>
                    <span className="font-medium">94.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Key performance indicators across all departments</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ManagerPerformanceChart />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Top Performing Staff</CardTitle>
                  <CardDescription>Staff members with the highest performance ratings</CardDescription>
                </div>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="room-service">Room Service</SelectItem>
                    <SelectItem value="housekeeping">Housekeeping</SelectItem>
                    <SelectItem value="spa">Spa & Wellness</SelectItem>
                    <SelectItem value="front-desk">Front Desk</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <ManagerStaffPerformance />
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
                <CardDescription>Key insights and recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 rounded-md bg-amber-50 border border-amber-200">
                    <h4 className="font-medium text-amber-800 mb-1">Housekeeping Response Time</h4>
                    <p className="text-sm text-amber-700">
                      Housekeeping response times are 25% above target. Consider reviewing staff allocation during peak
                      hours.
                    </p>
                  </div>

                  <div className="p-3 rounded-md bg-green-50 border border-green-200">
                    <h4 className="font-medium text-green-800 mb-1">Spa Service Excellence</h4>
                    <p className="text-sm text-green-700">
                      Spa services consistently receive the highest guest satisfaction ratings. Consider sharing best
                      practices with other departments.
                    </p>
                  </div>

                  <div className="p-3 rounded-md bg-blue-50 border border-blue-200">
                    <h4 className="font-medium text-blue-800 mb-1">Room Service Efficiency</h4>
                    <p className="text-sm text-blue-700">
                      Room service has improved delivery times by 12% this month. The new order routing system is
                      showing positive results.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Metrics</CardTitle>
              <CardDescription>Detailed performance metrics for all services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Avg. Response Time</TableHead>
                      <TableHead>Completion Rate</TableHead>
                      <TableHead>Guest Satisfaction</TableHead>
                      <TableHead>SLA Compliance</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Breakfast Delivery</TableCell>
                      <TableCell>Room Service</TableCell>
                      <TableCell>6.2 min</TableCell>
                      <TableCell>98.3%</TableCell>
                      <TableCell>4.8/5.0</TableCell>
                      <TableCell>98.3%</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Excellent
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Room Cleaning</TableCell>
                      <TableCell>Housekeeping</TableCell>
                      <TableCell>10.5 min</TableCell>
                      <TableCell>90.2%</TableCell>
                      <TableCell>4.4/5.0</TableCell>
                      <TableCell>90.2%</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          Needs Improvement
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Deep Tissue Massage</TableCell>
                      <TableCell>Spa</TableCell>
                      <TableCell>7.8 min</TableCell>
                      <TableCell>95.6%</TableCell>
                      <TableCell>4.9/5.0</TableCell>
                      <TableCell>95.6%</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Excellent
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Dinner Service</TableCell>
                      <TableCell>Room Service</TableCell>
                      <TableCell>7.1 min</TableCell>
                      <TableCell>96.5%</TableCell>
                      <TableCell>4.7/5.0</TableCell>
                      <TableCell>96.5%</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Good
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Turndown Service</TableCell>
                      <TableCell>Housekeeping</TableCell>
                      <TableCell>9.2 min</TableCell>
                      <TableCell>92.8%</TableCell>
                      <TableCell>4.6/5.0</TableCell>
                      <TableCell>92.8%</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          Satisfactory
                        </Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Staff Performance</CardTitle>
                <CardDescription>Individual staff performance metrics</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="room-service">Room Service</SelectItem>
                    <SelectItem value="housekeeping">Housekeeping</SelectItem>
                    <SelectItem value="spa">Spa & Wellness</SelectItem>
                    <SelectItem value="front-desk">Front Desk</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Users className="mr-2 h-4 w-4" />
                  View All Staff
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Staff Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Orders Completed</TableHead>
                      <TableHead>Avg. Response Time</TableHead>
                      <TableHead>Guest Rating</TableHead>
                      <TableHead>SLA Compliance</TableHead>
                      <TableHead>Performance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Amit Kumar</TableCell>
                      <TableCell>Room Service</TableCell>
                      <TableCell>124</TableCell>
                      <TableCell>5.8 min</TableCell>
                      <TableCell>4.9/5.0</TableCell>
                      <TableCell>98.4%</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Outstanding
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Deepa Sharma</TableCell>
                      <TableCell>Housekeeping</TableCell>
                      <TableCell>87</TableCell>
                      <TableCell>8.5 min</TableCell>
                      <TableCell>4.7/5.0</TableCell>
                      <TableCell>94.3%</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Excellent
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Ravi Patel</TableCell>
                      <TableCell>Spa</TableCell>
                      <TableCell>45</TableCell>
                      <TableCell>7.2 min</TableCell>
                      <TableCell>5.0/5.0</TableCell>
                      <TableCell>100%</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Outstanding
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Vikram Singh</TableCell>
                      <TableCell>Room Service</TableCell>
                      <TableCell>112</TableCell>
                      <TableCell>6.9 min</TableCell>
                      <TableCell>4.6/5.0</TableCell>
                      <TableCell>95.5%</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Good
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Anita Desai</TableCell>
                      <TableCell>Housekeeping</TableCell>
                      <TableCell>93</TableCell>
                      <TableCell>10.2 min</TableCell>
                      <TableCell>4.3/5.0</TableCell>
                      <TableCell>89.2%</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          Needs Improvement
                        </Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>Historical performance trends and analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Performance trends will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
