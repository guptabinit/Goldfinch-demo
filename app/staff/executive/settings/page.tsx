"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useStaffAuth } from "@/lib/auth/staff-auth-context"

export default function SettingsPage() {
  const { user } = useStaffAuth()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("general")

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    })
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your executive dashboard preferences and access controls.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="access">Access Control</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your dashboard preferences and display options.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Display Name</Label>
                <Input id="name" defaultValue={user?.name || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue={user?.email || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Default Currency</Label>
                <Select defaultValue="inr">
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inr">Indian Rupee (₹)</SelectItem>
                    <SelectItem value="usd">US Dollar ($)</SelectItem>
                    <SelectItem value="eur">Euro (€)</SelectItem>
                    <SelectItem value="gbp">British Pound (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeZone">Time Zone</Label>
                <Select defaultValue="ist">
                  <SelectTrigger id="timeZone">
                    <SelectValue placeholder="Select time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                    <SelectItem value="utc">Coordinated Universal Time (UTC)</SelectItem>
                    <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                    <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="darkMode" />
                <Label htmlFor="darkMode">Enable Dark Mode</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="access">
          <Card>
            <CardHeader>
              <CardTitle>Access Control</CardTitle>
              <CardDescription>Manage user roles and permissions for the executive dashboard.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="role">Default Role for New Users</Label>
                <Select defaultValue="viewer">
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                <Label>Module Access</Label>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="revenueAccess" className="flex-1">
                      Revenue Dashboard
                    </Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="revenueAccess" className="w-[180px]">
                        <SelectValue placeholder="Select access" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="managers">Managers & Above</SelectItem>
                        <SelectItem value="executives">Executives Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="financialAccess" className="flex-1">
                      Financial Reports
                    </Label>
                    <Select defaultValue="executives">
                      <SelectTrigger id="financialAccess" className="w-[180px]">
                        <SelectValue placeholder="Select access" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="managers">Managers & Above</SelectItem>
                        <SelectItem value="executives">Executives Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="staffAccess" className="flex-1">
                      Staff Performance
                    </Label>
                    <Select defaultValue="managers">
                      <SelectTrigger id="staffAccess" className="w-[180px]">
                        <SelectValue placeholder="Select access" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="managers">Managers & Above</SelectItem>
                        <SelectItem value="executives">Executives Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure alerts and notification preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Email Notifications</Label>
                <div className="grid gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="dailyReport" defaultChecked />
                    <Label htmlFor="dailyReport">Daily Summary Report</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="weeklyReport" defaultChecked />
                    <Label htmlFor="weeklyReport">Weekly Performance Report</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="monthlyReport" defaultChecked />
                    <Label htmlFor="monthlyReport">Monthly Financial Report</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="alertNotifications" defaultChecked />
                    <Label htmlFor="alertNotifications">Critical Alerts</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <Label>Dashboard Alerts</Label>
                <div className="grid gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="revenueAlerts" defaultChecked />
                    <Label htmlFor="revenueAlerts">Revenue Threshold Alerts</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="occupancyAlerts" defaultChecked />
                    <Label htmlFor="occupancyAlerts">Low Occupancy Alerts</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="satisfactionAlerts" defaultChecked />
                    <Label htmlFor="satisfactionAlerts">Guest Satisfaction Alerts</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Report Settings</CardTitle>
              <CardDescription>Configure report generation and export preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="defaultFormat">Default Export Format</Label>
                <Select defaultValue="pdf">
                  <SelectTrigger id="defaultFormat">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="scheduledReports">Scheduled Reports</Label>
                <Select defaultValue="weekly">
                  <SelectTrigger id="scheduledReports">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                <Label>Report Customization</Label>
                <div className="grid gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="includeLogo" defaultChecked />
                    <Label htmlFor="includeLogo">Include Hotel Logo</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="includeCharts" defaultChecked />
                    <Label htmlFor="includeCharts">Include Charts and Graphs</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="includeComparison" defaultChecked />
                    <Label htmlFor="includeComparison">Include Year-over-Year Comparison</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
