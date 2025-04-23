"use client"

import { useState } from "react"
import { Megaphone, Search, Filter, Plus, Edit, Trash, Eye, Pin, PinOff } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useStaffAuth } from "@/lib/auth/staff-auth-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock announcements data
const announcementsData = [
  {
    id: "ann-001",
    title: "New Menu Items for Room Service",
    content:
      "We are excited to announce that we have added 5 new dishes to our room service menu. Please familiarize yourself with these new items and their preparation requirements.",
    department: "Dining",
    author: "Chef Ravi",
    authorAvatar: "/mystical-forest-spirit.png",
    date: "2023-10-15",
    isPinned: true,
    isUrgent: false,
    visibility: "department",
    comments: 3,
  },
  {
    id: "ann-002",
    title: "Staff Meeting - October 20th",
    content:
      "There will be a mandatory staff meeting for all F&B department employees on October 20th at 3 PM in the conference room. We will be discussing the upcoming holiday season preparations.",
    department: "Dining",
    author: "Maria Garcia",
    authorAvatar: "/blue-being.png",
    date: "2023-10-12",
    isPinned: false,
    isUrgent: true,
    visibility: "department",
    comments: 5,
  },
  {
    id: "ann-003",
    title: "New Cleaning Protocols",
    content:
      "Starting next week, we will be implementing new cleaning protocols for all guest rooms. Training sessions will be held on Wednesday and Thursday. Please check the schedule and ensure you attend one session.",
    department: "Housekeeping",
    author: "James Wilson",
    authorAvatar: "/elemental-master.png",
    date: "2023-10-10",
    isPinned: true,
    isUrgent: false,
    visibility: "department",
    comments: 2,
  },
  {
    id: "ann-004",
    title: "Spa Equipment Maintenance",
    content:
      "The spa will be closed for equipment maintenance on October 25th from 2 PM to 5 PM. Please reschedule any appointments during this time and inform the guests accordingly.",
    department: "Spa",
    author: "Sophia Rodriguez",
    authorAvatar: "/abstract-letter-r.png",
    date: "2023-10-08",
    isPinned: false,
    isUrgent: false,
    visibility: "department",
    comments: 1,
  },
  {
    id: "ann-005",
    title: "Holiday Schedule",
    content:
      "The holiday schedule for November and December is now available. Please submit your time-off requests by October 30th. We will try to accommodate all requests, but please be aware that we need adequate staffing during peak periods.",
    department: "All",
    author: "HR Department",
    authorAvatar: "/abstract-letter-L.png",
    date: "2023-10-05",
    isPinned: true,
    isUrgent: false,
    visibility: "all",
    comments: 8,
  },
]

export default function AnnouncementsPage() {
  const { user } = useStaffAuth()
  const [department, setDepartment] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showNewAnnouncement, setShowNewAnnouncement] = useState(false)
  const [announcements, setAnnouncements] = useState(announcementsData)

  // Set department based on user's department
  useState(() => {
    if (user?.department) {
      setDepartment(user.department)
    }
  })

  // Filter announcements based on search and tab
  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDepartment =
      announcement.department.toLowerCase() === department.toLowerCase() || announcement.department === "All"

    if (activeTab === "all") return matchesSearch && matchesDepartment
    if (activeTab === "pinned") return matchesSearch && matchesDepartment && announcement.isPinned
    if (activeTab === "urgent") return matchesSearch && matchesDepartment && announcement.isUrgent

    return matchesSearch && matchesDepartment
  })

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  // Toggle pin status
  const togglePinStatus = (id: string) => {
    setAnnouncements(
      announcements.map((announcement) =>
        announcement.id === id ? { ...announcement, isPinned: !announcement.isPinned } : announcement,
      ),
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b bg-white p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Megaphone className="h-6 w-6 text-goldfinch-gold" />
            <div>
              <h1 className="text-2xl font-bold">Internal Announcements</h1>
              <p className="text-muted-foreground">{department} Department</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              className="gap-2 bg-goldfinch-gold hover:bg-goldfinch-gold/90"
              onClick={() => setShowNewAnnouncement(true)}
            >
              <Plus className="h-4 w-4" />
              <span>New Announcement</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Announcements Overview */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Announcements</p>
                  <p className="text-3xl font-bold">{filteredAnnouncements.length}</p>
                </div>
                <div className="rounded-full p-2 bg-blue-100">
                  <Megaphone className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pinned Announcements</p>
                  <p className="text-3xl font-bold">
                    {filteredAnnouncements.filter((announcement) => announcement.isPinned).length}
                  </p>
                </div>
                <div className="rounded-full p-2 bg-amber-100">
                  <Pin className="h-6 w-6 text-amber-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Urgent Announcements</p>
                  <p className="text-3xl font-bold">
                    {filteredAnnouncements.filter((announcement) => announcement.isUrgent).length}
                  </p>
                </div>
                <div className="rounded-full p-2 bg-red-100">
                  <Megaphone className="h-6 w-6 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Announcements List */}
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Department Announcements</CardTitle>
              <CardDescription>Internal communications for staff members</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search announcements..."
                  className="pl-8 w-full sm:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Announcements</TabsTrigger>
                <TabsTrigger value="pinned">Pinned</TabsTrigger>
                <TabsTrigger value="urgent">Urgent</TabsTrigger>
              </TabsList>
              <div className="space-y-4">
                {filteredAnnouncements.length > 0 ? (
                  filteredAnnouncements.map((announcement) => (
                    <Card key={announcement.id} className={announcement.isUrgent ? "border-red-500" : ""}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-2">
                            {announcement.isUrgent && (
                              <Badge variant="destructive" className="mt-1">
                                Urgent
                              </Badge>
                            )}
                            <div>
                              <CardTitle className="text-lg">{announcement.title}</CardTitle>
                              <CardDescription className="flex items-center gap-2 mt-1">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage
                                    src={announcement.authorAvatar || "/placeholder.svg"}
                                    alt={announcement.author}
                                  />
                                  <AvatarFallback>{announcement.author.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span>{announcement.author}</span>
                                <span>•</span>
                                <span>{formatDate(announcement.date)}</span>
                                <span>•</span>
                                <Badge variant="outline">{announcement.department}</Badge>
                              </CardDescription>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => togglePinStatus(announcement.id)}
                              className={announcement.isPinned ? "text-amber-500" : ""}
                            >
                              {announcement.isPinned ? <Pin className="h-4 w-4" /> : <PinOff className="h-4 w-4" />}
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{announcement.content}</p>
                      </CardContent>
                      <CardContent className="pt-0 flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">{announcement.comments} comments</div>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Eye className="h-3.5 w-3.5" />
                          <span>View Details</span>
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">No announcements found.</div>
                )}
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* New Announcement Dialog */}
        <Dialog open={showNewAnnouncement} onOpenChange={setShowNewAnnouncement}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Announcement</DialogTitle>
              <DialogDescription>Post an announcement for your department or all staff.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="title">Announcement Title</Label>
                  <Input id="title" placeholder="Enter announcement title" />
                </div>
                <div>
                  <Label htmlFor="content">Announcement Content</Label>
                  <Textarea id="content" placeholder="Write your announcement here" className="min-h-[150px]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="visibility">Visibility</Label>
                    <Select defaultValue="department">
                      <SelectTrigger>
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="department">Department Only</SelectItem>
                        <SelectItem value="all">All Staff</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="date">Publish Date</Label>
                    <Input id="date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="pinned" />
                    <Label htmlFor="pinned">Pin Announcement</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="urgent" />
                    <Label htmlFor="urgent">Mark as Urgent</Label>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewAnnouncement(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowNewAnnouncement(false)}>Publish Announcement</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
