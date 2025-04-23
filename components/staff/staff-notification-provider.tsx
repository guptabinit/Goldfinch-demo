"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useStaffAuth } from "@/lib/auth/staff-auth-context"

type OrderNotification = {
  id: string
  title: string
  message: string
  type: "new_order" | "urgent" | "update" | "system"
  timestamp: Date
  read: boolean
  orderId?: string
}

type StaffNotificationContextType = {
  notifications: OrderNotification[]
  unreadCount: number
  addNotification: (notification: Omit<OrderNotification, "id" | "timestamp" | "read">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearNotifications: () => void
}

const StaffNotificationContext = createContext<StaffNotificationContextType | undefined>(undefined)

export function StaffNotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<OrderNotification[]>([])
  const { toast } = useToast()
  const { user } = useStaffAuth()

  const unreadCount = notifications.filter((n) => !n.read).length

  const addNotification = (notification: Omit<OrderNotification, "id" | "timestamp" | "read">) => {
    const newNotification: OrderNotification = {
      ...notification,
      id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      read: false,
    }

    setNotifications((prev) => [newNotification, ...prev])

    // Show toast for new notifications
    toast({
      title: notification.title,
      description: notification.message,
      variant: notification.type === "urgent" ? "destructive" : "default",
    })
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  // Load mock notifications for demo
  useEffect(() => {
    if (user) {
      const mockNotifications: OrderNotification[] = [
        {
          id: "notification-1",
          title: "New Room Service Order",
          message: "Room 301 has placed an order for breakfast",
          type: "new_order",
          timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
          read: false,
          orderId: "order-123",
        },
        {
          id: "notification-2",
          title: "Urgent Request",
          message: "Room 205 has requested extra towels urgently",
          type: "urgent",
          timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
          read: false,
          orderId: "order-124",
        },
        {
          id: "notification-3",
          title: "Order Status Update",
          message: "Order #125 has been marked as completed",
          type: "update",
          timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
          read: true,
          orderId: "order-125",
        },
      ]

      setNotifications(mockNotifications)
    }
  }, [user])

  return (
    <StaffNotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotifications,
      }}
    >
      {children}
    </StaffNotificationContext.Provider>
  )
}

export const useStaffNotifications = () => {
  const context = useContext(StaffNotificationContext)
  if (context === undefined) {
    throw new Error("useStaffNotifications must be used within a StaffNotificationProvider")
  }
  return context
}
