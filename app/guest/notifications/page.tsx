"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Bell, Check, Trash2, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useNotifications } from "@/components/guest/notification-provider"

export default function NotificationsPage() {
  const { toast } = useToast()
  const { notifications, markAsRead, clearAll } = useNotifications()
  const [filters, setFilters] = useState({
    types: [] as string[],
  })

  const notificationTypes = [
    { value: "order_update", label: "Order Updates" },
    { value: "promotion", label: "Promotions" },
    { value: "system", label: "System" },
  ]

  const toggleFilter = (value: string) => {
    setFilters((prev) => {
      const current = [...prev.types]
      if (current.includes(value)) {
        return {
          ...prev,
          types: current.filter((item) => item !== value),
        }
      } else {
        return {
          ...prev,
          types: [...current, value],
        }
      }
    })
  }

  const filteredNotifications = notifications.filter((notification) => {
    if (filters.types.length > 0 && !filters.types.includes(notification.type)) {
      return false
    }
    return true
  })

  const handleMarkAsRead = (id: string) => {
    markAsRead(id)
    toast({
      title: "Notification marked as read",
      description: "The notification has been marked as read",
    })
  }

  const handleClearAll = () => {
    clearAll()
    toast({
      title: "Notifications cleared",
      description: "All notifications have been cleared",
    })
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`
    if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`
    if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`

    return date.toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/guest">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/guest/notifications">Notifications</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/guest">
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-xl font-semibold">Notifications</h1>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <div className="p-2 font-medium">Notification Type</div>
              {notificationTypes.map((type) => (
                <DropdownMenuCheckboxItem
                  key={type.value}
                  checked={filters.types.includes(type.value)}
                  onCheckedChange={() => toggleFilter(type.value)}
                >
                  {type.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="sm"
            className="border-goldfinch-gold/30 text-goldfinch-gold hover:bg-goldfinch-gold/10"
            onClick={handleClearAll}
          >
            Clear All
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-lg font-medium mb-2">No notifications</h2>
              <p className="text-muted-foreground">You don't have any notifications at the moment</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <Card key={notification.id} className="overflow-hidden luxury-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{notification.title}</h3>
                          {notification.type === "order_update" && <Badge className="bg-blue-500">Order</Badge>}
                          {notification.type === "promotion" && <Badge className="bg-goldfinch-gold">Promotion</Badge>}
                          {notification.type === "system" && <Badge variant="outline">System</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">{formatDate(notification.timestamp)}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-green-600"
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          <Check className="h-4 w-4" />
                          <span className="sr-only">Mark as read</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-red-500"
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="unread" className="mt-6">
          {/* Similar content as "all" tab but filtered for unread notifications */}
          <div className="text-center py-12">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-lg font-medium mb-2">No unread notifications</h2>
            <p className="text-muted-foreground">You've read all your notifications</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
