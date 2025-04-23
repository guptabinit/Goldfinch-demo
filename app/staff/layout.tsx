"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { StaffAuthProvider, useStaffAuth } from "@/lib/auth/staff-auth-context"
import { StaffSidebar } from "@/components/staff/staff-sidebar"
import { Toaster } from "@/components/ui/toaster"
import { StaffNotificationProvider } from "@/components/staff/staff-notification-provider"

function StaffLayoutContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, user } = useStaffAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Add a small delay to ensure localStorage is properly checked
    const authCheckTimeout = setTimeout(() => {

      // Redirect to role-specific dashboard if user is on general staff pages but has a specialized role
      if (!isLoading && isAuthenticated && user) {
        // If user is on a general staff page but has HOD role
        if (
          user.role === "hod" &&
          pathname.startsWith("/staff/") &&
          !pathname.includes("/staff/hod/") &&
          !pathname.includes("/staff/login")
        ) {
          router.push("/staff/hod/dashboard")
        }

        // If user is on a general staff page but has manager role
        if (
          user.role === "manager" &&
          pathname.startsWith("/staff/") &&
          !pathname.includes("/staff/manager/") &&
          !pathname.includes("/staff/login")
        ) {
          router.push("/staff/manager/dashboard")
        }
      }
    }, 200)

    return () => clearTimeout(authCheckTimeout)
  }, [isAuthenticated, isLoading, router, pathname, user])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-goldfinch-gold border-t-transparent"></div>
      </div>
    )
  }

  if (!isAuthenticated && !pathname.includes("/staff/login")) {
    return null
  }

  // Don't render sidebar for login page or specialized role pages
  if (pathname.includes("/staff/login") || pathname.includes("/staff/hod/") || pathname.includes("/staff/manager/")) {
    return <>{children}</>
  }

  // Only render the staff sidebar for general staff pages
  return (
    <StaffNotificationProvider>
      <div className="flex h-screen overflow-hidden">
        <StaffSidebar />
        <main className="flex-1 overflow-y-auto bg-goldfinch-ivory">{children}</main>
      </div>
      <Toaster />
    </StaffNotificationProvider>
  )
}

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return (
    <StaffAuthProvider>
      <StaffLayoutContent>{children}</StaffLayoutContent>
    </StaffAuthProvider>
  )
}
