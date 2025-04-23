"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { Bell, CheckCircle, AlertTriangle, Info, Check, Trash2 } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useStaffNotifications } from "@/components/staff/staff-notification-provider"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

// Notification type icons
const notificationIcons = {
  new_order: Bell,
  urgent: AlertTriangle,
  update: CheckCircle,
  system: Info,
}

export default function NotificationsPage() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotifications } = useStaffNotifications()
  const { toast } = useToast()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")

  const filteredNotifications =
    activeTab === "all"
      ? notifications
      : activeTab === "unread"
        ? notifications.filter((n) => !n.read)
        : notifications.filter((n) => n.read)

  const handleMarkAsRead = (id: string) => {
    markAsRead(id)
    toast({
      title: "Notification marked as read",
      description: "This notification has been marked as read",
    })
  }

  const handleMarkAllAsRead = () => {
    markAllAsRead()
    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read",
    })
  }

  const handleClearNotifications = () => {
    clearNotifications()
    toast({
      title: "Notifications cleared",
      description: "All notifications have been cleared",
    })
  }

  const handleViewOrder = (orderId?: string) => {
    if (orderId) {
      router.push(`/staff/orders/${orderId}`)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b bg-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            <p className="text-muted-foreground">
              {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleMarkAllAsRead} disabled={unreadCount === 0}>
              <Check className="mr-2 h-4 w-4" />
              Mark All as Read
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearNotifications}
              disabled={notifications.length === 0}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear All
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Notifications</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="read">Read</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => {
                const Icon = notificationIcons[notification.type]
                return (
                  <Card
                    key={notification.id}
                    className={`overflow-hidden ${!notification.read ? "border-l-4 border-l-goldfinch-gold" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`rounded-full p-2 ${
                            notification.type === "urgent"
                              ? "bg-red-100 text-red-500"
                              : notification.type === "new_order"
                                ? "bg-blue-100 text-blue-500"
                                : notification.type === "update"
                                  ? "bg-green-100 text-green-500"
                                  : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium">{notification.title}</h3>
                              <p className="text-sm text-muted-foreground">{notification.message}</p>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between bg-muted/50 p-3">
                      {!notification.read && (
                        <Button variant="ghost" size="sm" onClick={() => handleMarkAsRead(notification.id)}>
                          <Check className="mr-2 h-4 w-4" />
                          Mark as Read
                        </Button>
                      )}
                      {notification.orderId && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="ml-auto"
                          onClick={() => handleViewOrder(notification.orderId)}
                        >
                          View Order
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                )
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <Bell className="h-12 w-12 text-muted-foreground opacity-20" />
                <h3 className="mt-4 text-lg font-medium">No notifications</h3>
                <p className="text-muted-foreground">
                  {activeTab === "all"
                    ? "You don't have any notifications yet"
                    : activeTab === "unread"
                      ? "You don't have any unread notifications"
                      : "You don't have any read notifications"}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
