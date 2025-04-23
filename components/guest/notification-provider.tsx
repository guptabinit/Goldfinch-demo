"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type NotificationType = {
  id: string
  title: string
  message: string
  type: "order_update" | "promotion" | "system"
  timestamp: Date
}

type NotificationContextType = {
  notifications: NotificationType[]
  addNotification: (notification: Omit<NotificationType, "id" | "timestamp">) => void
  markAsRead: (id: string) => void
  clearAll: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationType[]>([])
  const [currentNotification, setCurrentNotification] = useState<NotificationType | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  const addNotification = (notification: Omit<NotificationType, "id" | "timestamp">) => {
    const newNotification = {
      ...notification,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date(),
    }

    setNotifications((prev) => [newNotification, ...prev])

    // Show toast for new notification
    toast({
      title: notification.title,
      description: notification.message,
      duration: 5000,
    })

    // Show popup for order updates
    if (notification.type === "order_update") {
      setCurrentNotification(newNotification)
      setIsOpen(true)
    }
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAsRead, clearAll }}>
      {children}
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="max-w-[350px]">
          <AlertDialogHeader>
            <AlertDialogTitle>{currentNotification?.title}</AlertDialogTitle>
            <AlertDialogDescription>{currentNotification?.message}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="bg-goldfinch-gold hover:bg-goldfinch-gold/90">View Order</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}
