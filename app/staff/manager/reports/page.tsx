"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar, Download, FileText, Printer, RefreshCw, Share2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function ManagerReports() {
  const [reportType, setReportType] = useState("operational")
  const [timeRange, setTimeRange] = useState("month")
  const [department, setDepartment] = useState("all")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">Generate and download detailed reports for hotel operations</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            New Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="generate" className="space-y-4">
        <TabsList>
          <TabsTrigger value="generate">Generate Report</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="saved">Saved Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Report Generator</CardTitle>
              <CardDescription>Create customized reports for different departments and metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="report-type">Report Type</Label>
                    <Select value={reportType} onValueChange={setReportType}>
                      <SelectTrigger id="report-type">
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="operational">Operational Performance</SelectItem>
                        <SelectItem value="financial">Financial Summary</SelectItem>
                        <SelectItem value="guest">Guest Satisfaction</SelectItem>
                        <SelectItem value="staff">Staff Performance</SelectItem>
                        <SelectItem value="inventory">Inventory & Resources</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="time-range">Time Range</Label>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                      <SelectTrigger id="time-range">
                        <SelectValue placeholder="Select time range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="day">Daily</SelectItem>
                        <SelectItem value="week">Weekly</SelectItem>
                        <SelectItem value="month">Monthly</SelectItem>
                        <SelectItem value="quarter">Quarterly</SelectItem>
                        <SelectItem value="year">Yearly</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {timeRange === "custom" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="start-date">Start Date</Label>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          <Input id="start-date" type="date" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="end-date">End Date</Label>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          <Input id="end-date" type="date" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Select value={department} onValueChange={setDepartment}>
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="room-service">Room Service</SelectItem>
                        <SelectItem value="housekeeping">Housekeeping</SelectItem>
                        <SelectItem value="spa">Spa & Wellness</SelectItem>
                        <SelectItem value="front-desk">Front Desk</SelectItem>
                        <SelectItem value="restaurant">Restaurant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="format">Export Format</Label>
                    <Select defaultValue="pdf">
                      <SelectTrigger id="format">
                        <SelectValue placeholder="Select export format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF Document</SelectItem>
                        <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                        <SelectItem value="csv">CSV File</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Report Sections</h3>
                    <p className="text-sm text-muted-foreground mb-4">Select the sections to include in your report</p>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="section-summary" defaultChecked />
                        <Label htmlFor="section-summary">Executive Summary</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="section-metrics" defaultChecked />
                        <Label htmlFor="section-metrics">Key Performance Metrics</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="section-charts" defaultChecked />
                        <Label htmlFor="section-charts">Charts & Visualizations</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="section-trends" defaultChecked />
                        <Label htmlFor="section-trends">Trends & Analysis</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="section-details" defaultChecked />
                        <Label htmlFor="section-details">Detailed Data Tables</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="section-recommendations" />
                        <Label htmlFor="section-recommendations">Recommendations</Label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Delivery Options</h3>
                    <p className="text-sm text-muted-foreground mb-4">Choose how you want to receive the report</p>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="delivery-download" defaultChecked />
                        <Label htmlFor="delivery-download">Download Immediately</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="delivery-email" />
                        <Label htmlFor="delivery-email">Send via Email</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="delivery-print" />
                        <Label htmlFor="delivery-print">Print Automatically</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="delivery-save" defaultChecked />
                        <Label htmlFor="delivery-save">Save to Reports Library</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">
                  <Share2 className="mr-2 h-4 w-4" />
                  Schedule Report
                </Button>
                <Button variant="outline">
                  <Printer className="mr-2 h-4 w-4" />
                  Print Preview
                </Button>
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>Recently generated reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Report Name
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date Generated
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Format
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Monthly Operational Report
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Operational</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Apr 15, 2023</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">PDF</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          Download
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Q1 Financial Summary
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Financial</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Apr 10, 2023</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Excel</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          Download
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Guest Satisfaction Report
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Guest</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Apr 5, 2023</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">PDF</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          Download
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>Reports scheduled for automatic generation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Scheduled reports will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Saved Reports</CardTitle>
              <CardDescription>Your saved report templates and configurations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Saved reports will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
