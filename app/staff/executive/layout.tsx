"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useStaffAuth } from "@/lib/auth/staff-auth-context"
import { ExecutiveSidebar } from "@/components/executive/executive-sidebar"
import { Toaster } from "@/components/ui/toaster"
import { StaffNotificationProvider } from "@/components/staff/staff-notification-provider"

export default function ExecutiveLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, user } = useStaffAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/staff/login")
    }

    // Verify the user has executive permissions
    if (!isLoading && isAuthenticated && user) {
      const isExecutive = user.role === "owner" || user.role === "manager" || user.role === "admin"
      if (!isExecutive) {
        router.push("/staff/dashboard")
      }
    }
  }, [isAuthenticated, isLoading, router, user])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-goldfinch-gold border-t-transparent"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <StaffNotificationProvider>
      <div className="flex h-screen overflow-hidden">
        <ExecutiveSidebar />
        <main className="flex-1 overflow-y-auto bg-goldfinch-ivory">{children}</main>
      </div>
      <Toaster />
    </StaffNotificationProvider>
  )
}
