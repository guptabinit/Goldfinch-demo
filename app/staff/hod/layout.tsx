"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useStaffAuth } from "@/lib/auth/staff-auth-context"
import { HodSidebar } from "@/components/hod/hod-sidebar"
import { Toaster } from "@/components/ui/toaster"
import { StaffNotificationProvider } from "@/components/staff/staff-notification-provider"

export default function HodLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading, hasPermission } = useStaffAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading) {
      // Redirect if not authenticated
      if (!isAuthenticated) {
        router.push("/staff/login")
        return
      }

      // Redirect if not authorized (not an HOD or higher)
      if (!hasPermission("view:staff") || !hasPermission("view:reports")) {
        router.push("/staff/dashboard")
        return
      }
    }
  }, [isAuthenticated, isLoading, router, hasPermission])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-goldfinch-gold border-t-transparent"></div>
      </div>
    )
  }

  if (!isAuthenticated || !hasPermission("view:staff") || !hasPermission("view:reports")) {
    return null
  }

  return (
    <StaffNotificationProvider>
      <div className="flex h-screen overflow-hidden">
        <HodSidebar department={user?.department || "General"} />
        <main className="flex-1 overflow-y-auto bg-goldfinch-ivory">{children}</main>
      </div>
      <Toaster />
    </StaffNotificationProvider>
  )
}
