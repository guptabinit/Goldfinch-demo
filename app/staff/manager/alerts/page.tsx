"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Bell, Edit, Plus, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// Mock data for VIP guests
const vipGuestsData = [
  {
    id: 1,
    name: "Rajiv Malhotra",
    status: "Platinum",
    preferences: "Corner suite, Champagne welcome, Daily newspaper",
    lastVisit: "2023-03-15",
    upcomingStay: "2023-05-20",
    notes: "CEO of TechGlobal India, prefers quiet rooms away from elevator",
  },
  {
    id: 2,
    name: "Priya Sharma",
    status: "Gold",
    preferences: "High floor, Extra pillows, Vegan meals",
    lastVisit: "2023-02-10",
    upcomingStay: null,
    notes: "Bollywood actress, values privacy, no photos policy",
  },
  {
    id: 3,
    name: "John Williams",
    status: "Platinum",
    preferences: "Airport pickup, Early check-in, Late checkout",
    lastVisit: "2023-04-05",
    upcomingStay: "2023-06-15",
    notes: "Regular business traveler, prefers same room each visit",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    status: "Silver",
    preferences: "Spa appointment on arrival, Still water, Fruit basket",
    lastVisit: "2022-12-20",
    upcomingStay: "2023-05-10",
    notes: "Celebrating anniversary during upcoming stay",
  },
  {
    id: 5,
    name: "Amit Patel",
    status: "Gold",
    preferences: "Connecting rooms, Children amenities, Pool view",
    lastVisit: "2023-01-30",
    upcomingStay: null,
    notes: "Travels with family, requires childproofing",
  },
]

// Mock data for alert rules
const alertRulesData = [
  {
    id: 1,
    name: "VIP Check-in Alert",
    description: "Notify when a VIP guest checks in",
    criteria: "Status: Gold, Platinum",
    recipients: "Manager, Front Desk, Concierge",
    priority: "high",
    enabled: true,
  },
  {
    id: 2,
    name: "Large Group Booking",
    description: "Alert for bookings with more than 10 rooms",
    criteria: "Room count > 10",
    recipients: "Manager, F&B Manager, Housekeeping",
    priority: "medium",
    enabled: true,
  },
  {
    id: 3,
    name: "High Value Order",
    description: "Notify for orders exceeding ₹10,000",
    criteria: "Order value > ₹10,000",
    recipients: "Manager, Department Head",
    priority: "medium",
    enabled: true,
  },
  {
    id: 4,
    name: "Extended Stay Guest",
    description: "Alert for guests staying longer than 7 days",
    criteria: "Stay duration > 7 days",
    recipients: "Manager, Housekeeping",
    priority: "low",
    enabled: false,
  },
  {
    id: 5,
    name: "Special Occasion",
    description: "Notify for guests celebrating special occasions",
    criteria: "Has anniversary, birthday, or honeymoon tag",
    recipients: "Manager, F&B Manager, Front Desk",
    priority: "medium",
    enabled: true,
  },
]

export default function ManagerAlerts() {
  const [editingVip, setEditingVip] = useState<number | null>(null)
  const [editingRule, setEditingRule] = useState<number | null>(null)

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            Medium
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Low
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Platinum":
        return <Badge className="bg-purple-500">Platinum</Badge>
      case "Gold":
        return <Badge className="bg-amber-500">Gold</Badge>
      case "Silver":
        return <Badge className="bg-gray-400">Silver</Badge>
      default:
        return <Badge variant="outline">Standard</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Special Alerts</h1>
          <p className="text-muted-foreground">Configure alerts for VIP guests and special situations</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <Bell className="mr-2 h-4 w-4" />
            Test Alert
          </Button>
        </div>
      </div>

      <Tabs defaultValue="vip" className="space-y-4">
        <TabsList>
          <TabsTrigger value="vip">VIP Guests</TabsTrigger>
          <TabsTrigger value="rules">Alert Rules</TabsTrigger>
          <TabsTrigger value="notifications">Notification Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="vip" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>VIP Guest Management</CardTitle>
                <CardDescription>Manage VIP guests and their preferences</CardDescription>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add VIP Guest
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Preferences</TableHead>
                      <TableHead>Last Visit</TableHead>
                      <TableHead>Upcoming Stay</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vipGuestsData.map((guest) => (
                      <TableRow key={guest.id}>
                        <TableCell className="font-medium">{guest.name}</TableCell>
                        <TableCell>{getStatusBadge(guest.status)}</TableCell>
                        <TableCell className="max-w-xs truncate">{guest.preferences}</TableCell>
                        <TableCell>{guest.lastVisit}</TableCell>
                        <TableCell>{guest.upcomingStay || "None scheduled"}</TableCell>
                        <TableCell className="max-w-xs truncate">{guest.notes}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => setEditingVip(guest.id)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {editingVip && (
            <Card>
              <CardHeader>
                <CardTitle>Edit VIP Guest</CardTitle>
                <CardDescription>Update VIP guest information and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Guest Name</Label>
                      <Input id="name" defaultValue={vipGuestsData.find((g) => g.id === editingVip)?.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select defaultValue={vipGuestsData.find((g) => g.id === editingVip)?.status.toLowerCase()}>
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="platinum">Platinum</SelectItem>
                          <SelectItem value="gold">Gold</SelectItem>
                          <SelectItem value="silver">Silver</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preferences">Preferences</Label>
                    <Textarea
                      id="preferences"
                      defaultValue={vipGuestsData.find((g) => g.id === editingVip)?.preferences}
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="last-visit">Last Visit</Label>
                      <Input
                        id="last-visit"
                        type="date"
                        defaultValue={vipGuestsData.find((g) => g.id === editingVip)?.lastVisit}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="upcoming-stay">Upcoming Stay</Label>
                      <Input
                        id="upcoming-stay"
                        type="date"
                        defaultValue={vipGuestsData.find((g) => g.id === editingVip)?.upcomingStay || ""}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      defaultValue={vipGuestsData.find((g) => g.id === editingVip)?.notes}
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setEditingVip(null)}>
                      Cancel
                    </Button>
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="rules" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Alert Rules</CardTitle>
                <CardDescription>Configure rules for automatic alerts</CardDescription>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Rule
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rule Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Criteria</TableHead>
                      <TableHead>Recipients</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {alertRulesData.map((rule) => (
                      <TableRow key={rule.id}>
                        <TableCell className="font-medium">{rule.name}</TableCell>
                        <TableCell className="max-w-xs truncate">{rule.description}</TableCell>
                        <TableCell>{rule.criteria}</TableCell>
                        <TableCell>{rule.recipients}</TableCell>
                        <TableCell>{getPriorityBadge(rule.priority)}</TableCell>
                        <TableCell>
                          <Switch checked={rule.enabled} />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => setEditingRule(rule.id)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {editingRule && (
            <Card>
              <CardHeader>
                <CardTitle>Edit Alert Rule</CardTitle>
                <CardDescription>Update alert rule configuration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="rule-name">Rule Name</Label>
                      <Input id="rule-name" defaultValue={alertRulesData.find((r) => r.id === editingRule)?.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select defaultValue={alertRulesData.find((r) => r.id === editingRule)?.priority}>
                        <SelectTrigger id="priority">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      defaultValue={alertRulesData.find((r) => r.id === editingRule)?.description}
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="criteria">Criteria</Label>
                    <Textarea
                      id="criteria"
                      defaultValue={alertRulesData.find((r) => r.id === editingRule)?.criteria}
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recipients">Recipients</Label>
                    <Input
                      id="recipients"
                      defaultValue={alertRulesData.find((r) => r.id === editingRule)?.recipients}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="enabled" defaultChecked={alertRulesData.find((r) => r.id === editingRule)?.enabled} />
                    <Label htmlFor="enabled">Enable this alert rule</Label>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setEditingRule(null)}>
                      Cancel
                    </Button>
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how and when you receive alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Delivery Methods</h3>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="in-app">In-App Notifications</Label>
                      </div>
                      <Switch id="in-app" defaultChecked />
                    </div>
                    <p className="text-sm text-muted-foreground pl-6">
                      Receive notifications within the hotel management portal
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="email">Email Notifications</Label>
                      </div>
                      <Switch id="email" defaultChecked />
                    </div>
                    <p className="text-sm text-muted-foreground pl-6">
                      Receive email notifications for important alerts
                    </p>
                    <div className="pl-6">
                      <Label htmlFor="email-address" className="text-sm">
                        Email Address
                      </Label>
                      <Input id="email-address" defaultValue="rajiv.mehta@goldfinchhotels.com" className="mt-1" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="sms">SMS Notifications</Label>
                      </div>
                      <Switch id="sms" />
                    </div>
                    <p className="text-sm text-muted-foreground pl-6">Receive SMS notifications for critical alerts</p>
                    <div className="pl-6">
                      <Label htmlFor="phone-number" className="text-sm">
                        Phone Number
                      </Label>
                      <Input id="phone-number" defaultValue="+91 98765 43210" className="mt-1" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Preferences</h3>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="vip-checkin">VIP Guest Check-in</Label>
                      <Select defaultValue="all">
                        <SelectTrigger id="vip-checkin" className="w-[180px]">
                          <SelectValue placeholder="Select notification level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Methods</SelectItem>
                          <SelectItem value="in-app">In-App Only</SelectItem>
                          <SelectItem value="email">Email Only</SelectItem>
                          <SelectItem value="none">Don't Notify</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="large-orders">Large Orders</Label>
                      <Select defaultValue="in-app">
                        <SelectTrigger id="large-orders" className="w-[180px]">
                          <SelectValue placeholder="Select notification level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Methods</SelectItem>
                          <SelectItem value="in-app">In-App Only</SelectItem>
                          <SelectItem value="email">Email Only</SelectItem>
                          <SelectItem value="none">Don't Notify</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sla-breach">SLA Breaches</Label>
                      <Select defaultValue="all">
                        <SelectTrigger id="sla-breach" className="w-[180px]">
                          <SelectValue placeholder="Select notification level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Methods</SelectItem>
                          <SelectItem value="in-app">In-App Only</SelectItem>
                          <SelectItem value="email">Email Only</SelectItem>
                          <SelectItem value="none">Don't Notify</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="special-requests">Special Requests</Label>
                      <Select defaultValue="in-app">
                        <SelectTrigger id="special-requests" className="w-[180px]">
                          <SelectValue placeholder="Select notification level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Methods</SelectItem>
                          <SelectItem value="in-app">In-App Only</SelectItem>
                          <SelectItem value="email">Email Only</SelectItem>
                          <SelectItem value="none">Don't Notify</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Reset to Default</Button>
                  <Button>Save Preferences</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
