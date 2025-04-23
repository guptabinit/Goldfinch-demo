"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useStaffAuth } from "@/lib/auth/staff-auth-context"
import { ManagerSidebar } from "@/components/manager/manager-sidebar"
import { Toaster } from "@/components/ui/toaster"
import { StaffNotificationProvider } from "@/components/staff/staff-notification-provider"
import { Menu, Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading, hasPermission } = useStaffAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Set initial sidebar state based on screen size
  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 1024)
    }

    // Set initial state
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Clean up
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      // Redirect if not authenticated
      if (!isAuthenticated) {
        router.push("/staff/login")
        return
      }

      // Redirect if not authorized (not a manager or higher)
      if (!hasPermission("manage:staff")) {
        router.push("/staff/dashboard")
        return
      }
    }
  }, [isAuthenticated, isLoading, router, hasPermission])

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false)
    }
  }, [pathname])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-goldfinch-gold border-t-transparent"></div>
      </div>
    )
  }

  if (!isAuthenticated || !hasPermission("manage:staff")) {
    return null
  }

  const currentPage = navigation.find((item) => item.href === pathname)?.name || "Manager Portal"

  return (
    <StaffNotificationProvider>
      <div className="flex h-screen overflow-hidden bg-goldfinch-ivory">
        <ManagerSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-x-4 border-b bg-white px-4 shadow-sm sm:px-6">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu className="h-6 w-6" />
            </Button>

            <div className="flex flex-1 items-center justify-between">
              <h1 className="text-base font-semibold sm:text-xl truncate">{currentPage}</h1>

              <div className="flex items-center gap-x-4">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                  <span className="sr-only">Notifications</span>
                </Button>

                <div className="relative flex items-center">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </div>
              </div>
            </div>
          </header>

          <main
            className={cn(
              "flex-1 overflow-y-auto transition-all duration-300 ease-in-out p-4 sm:p-6",
              sidebarOpen ? "lg:ml-64" : "lg:ml-20",
            )}
          >
            <div className="mx-auto max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
      <Toaster />
    </StaffNotificationProvider>
  )
}

// Navigation array for page title
const navigation = [
  { name: "Dashboard", href: "/staff/manager/dashboard" },
  { name: "Orders", href: "/staff/manager/orders" },
  { name: "Guest Feedback", href: "/staff/manager/feedback" },
  { name: "Promotions", href: "/staff/manager/promotions" },
  { name: "Performance", href: "/staff/manager/performance" },
  { name: "SLA Monitoring", href: "/staff/manager/sla" },
  { name: "Guest Satisfaction", href: "/staff/manager/satisfaction" },
  { name: "Branding", href: "/staff/manager/branding" },
  { name: "Reports", href: "/staff/manager/reports" },
  { name: "Alerts", href: "/staff/manager/alerts" },
  { name: "Settings", href: "/staff/manager/settings" },
]
