"use client"

import { Input } from "@/components/ui/input"

import { useState } from "react"
import { FileText, Download, Calendar, Filter, BarChart, PieChart, TrendingUp, Users, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useStaffAuth } from "@/lib/auth/staff-auth-context"
import { HodMetricsChart } from "@/components/hod/hod-metrics-chart"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

// Mock reports data
const reportsData = [
  {
    id: "report-001",
    name: "Daily Operations Summary",
    description: "Summary of all operations for the day including orders, staff performance, and SLA adherence.",
    type: "daily",
    lastGenerated: "2023-10-15",
    format: "PDF",
    size: "1.2 MB",
  },
  {
    id: "report-002",
    name: "Weekly Performance Report",
    description: "Detailed analysis of department performance over the past week with key metrics and trends.",
    type: "weekly",
    lastGenerated: "2023-10-14",
    format: "Excel",
    size: "3.5 MB",
  },
  {
    id: "report-003",
    name: "Staff Productivity Analysis",
    description: "Analysis of individual staff productivity, order completion rates, and customer feedback.",
    type: "weekly",
    lastGenerated: "2023-10-14",
    format: "PDF",
    size: "2.8 MB",
  },
  {
    id: "report-004",
    name: "SLA Compliance Report",
    description: "Detailed report on service level agreement compliance, violations, and resolution times.",
    type: "weekly",
    lastGenerated: "2023-10-14",
    format: "PDF",
    size: "1.9 MB",
  },
  {
    id: "report-005",
    name: "Monthly Department Summary",
    description: "Comprehensive monthly summary of all department activities, performance, and key metrics.",
    type: "monthly",
    lastGenerated: "2023-09-30",
    format: "PDF",
    size: "4.2 MB",
  },
]

export default function ReportsPage() {
  const { user } = useStaffAuth()
  const [department, setDepartment] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [timeRange, setTimeRange] = useState("week")
  const [showGenerateReport, setShowGenerateReport] = useState(false)

  // Set department based on user's department
  useState(() => {
    if (user?.department) {
      setDepartment(user.department)
    }
  })

  // Filter reports based on tab
  const filteredReports = reportsData.filter((report) => {
    if (activeTab === "all") return true
    return report.type === activeTab
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
            <FileText className="h-6 w-6 text-goldfinch-gold" />
            <div>
              <h1 className="text-2xl font-bold">Reports</h1>
              <p className="text-muted-foreground">{department} Department</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Select defaultValue={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Custom Range</span>
            </Button>
            <Button
              className="gap-2 bg-goldfinch-gold hover:bg-goldfinch-gold/90"
              onClick={() => setShowGenerateReport(true)}
            >
              <FileText className="h-4 w-4" />
              <span>Generate Report</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Performance Metrics */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Order Metrics */}
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Order Metrics</CardTitle>
              <CardDescription>Order volume and completion rates</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <HodMetricsChart
                department={
                  department.toLowerCase().includes("dining")
                    ? "dining"
                    : department.toLowerCase().includes("housekeeping")
                      ? "housekeeping"
                      : "spa"
                }
                timeRange={timeRange}
              />
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Key Performance Indicators</CardTitle>
              <CardDescription>Current reporting period</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full p-1.5 bg-green-100">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                  <span className="text-sm font-medium">Order Completion Rate</span>
                </div>
                <span className="font-bold">94.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full p-1.5 bg-blue-100">
                    <Clock className="h-4 w-4 text-blue-500" />
                  </div>
                  <span className="text-sm font-medium">Avg. Response Time</span>
                </div>
                <span className="font-bold">4.8 min</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full p-1.5 bg-amber-100">
                    <Users className="h-4 w-4 text-amber-500" />
                  </div>
                  <span className="text-sm font-medium">Staff Utilization</span>
                </div>
                <span className="font-bold">87.5%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full p-1.5 bg-purple-100">
                    <BarChart className="h-4 w-4 text-purple-500" />
                  </div>
                  <span className="text-sm font-medium">SLA Adherence</span>
                </div>
                <span className="font-bold">96.3%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full p-1.5 bg-red-100">
                    <PieChart className="h-4 w-4 text-red-500" />
                  </div>
                  <span className="text-sm font-medium">Guest Satisfaction</span>
                </div>
                <span className="font-bold">4.7/5.0</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Available Reports */}
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Available Reports</CardTitle>
              <CardDescription>Download or schedule reports for your department</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Filter className="h-3.5 w-3.5" />
                <span>Filter</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Reports</TabsTrigger>
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 bg-muted/50 p-3 text-sm font-medium">
                  <div className="col-span-4">Report Name</div>
                  <div className="col-span-2">Type</div>
                  <div className="col-span-2">Last Generated</div>
                  <div className="col-span-1">Format</div>
                  <div className="col-span-1">Size</div>
                  <div className="col-span-2">Actions</div>
                </div>
                {filteredReports.length > 0 ? (
                  filteredReports.map((report) => (
                    <div key={report.id} className="grid grid-cols-12 items-center border-t p-3 text-sm">
                      <div className="col-span-4">
                        <div className="font-medium">{report.name}</div>
                        <div
                          className="text-xs text-muted-foreground truncate max-w-[350px]"
                          title={report.description}
                        >
                          {report.description}
                        </div>
                      </div>
                      <div className="col-span-2 capitalize">{report.type}</div>
                      <div className="col-span-2">{formatDate(report.lastGenerated)}</div>
                      <div className="col-span-1">{report.format}</div>
                      <div className="col-span-1">{report.size}</div>
                      <div className="col-span-2 flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Download className="h-3.5 w-3.5" />
                          <span>Download</span>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Calendar className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">No reports found.</div>
                )}
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* Generate Report Dialog */}
        <Dialog open={showGenerateReport} onOpenChange={setShowGenerateReport}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Generate New Report</DialogTitle>
              <DialogDescription>Create a custom report for your department.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="reportType">Report Type</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily Operations Summary</SelectItem>
                      <SelectItem value="weekly">Weekly Performance Report</SelectItem>
                      <SelectItem value="staff">Staff Productivity Analysis</SelectItem>
                      <SelectItem value="sla">SLA Compliance Report</SelectItem>
                      <SelectItem value="custom">Custom Report</SelectItem>
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
                  <Label htmlFor="format">Format</Label>
                  <Select defaultValue="pdf">
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-1">
                  <Label htmlFor="delivery">Delivery Method</Label>
                  <Select defaultValue="download">
                    <SelectTrigger>
                      <SelectValue placeholder="Select delivery" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="download">Download</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label className="mb-2 block">Include Sections</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="summary" defaultChecked />
                      <Label htmlFor="summary">Executive Summary</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="metrics" defaultChecked />
                      <Label htmlFor="metrics">Key Metrics</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="staff" defaultChecked />
                      <Label htmlFor="staff">Staff Performance</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="sla" defaultChecked />
                      <Label htmlFor="sla">SLA Compliance</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="charts" defaultChecked />
                      <Label htmlFor="charts">Charts & Graphs</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="recommendations" defaultChecked />
                      <Label htmlFor="recommendations">Recommendations</Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowGenerateReport(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowGenerateReport(false)}>Generate Report</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
