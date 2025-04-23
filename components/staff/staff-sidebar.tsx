"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ClipboardList,
  Bell,
  Settings,
  Users,
  BarChart,
  MessageSquare,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Bed,
  Utensils,
  SpadeIcon as Spa,
  CalendarClock,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useStaffAuth } from "@/lib/auth/staff-auth-context"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export function StaffSidebar() {
  const pathname = usePathname()
  const { user, logout, hasPermission } = useStaffAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    })
    router.push("/staff/login")
  }

  const navItems = [
    {
      title: "Dashboard",
      href: "/staff/dashboard",
      icon: LayoutDashboard,
      permission: "view:orders",
    },
    {
      title: "Orders",
      href: "/staff/orders",
      icon: ClipboardList,
      permission: "view:orders",
    },
    {
      title: "Notifications",
      href: "/staff/notifications",
      icon: Bell,
      permission: "view:orders",
    },
    {
      title: "Services",
      href: "/staff/services",
      icon: Settings,
      permission: "manage:availability",
    },
    {
      title: "Staff",
      href: "/staff/staff-management",
      icon: Users,
      permission: "manage:staff",
    },
    {
      title: "Reports",
      href: "/staff/reports",
      icon: BarChart,
      permission: "view:reports",
    },
    {
      title: "Guest Communication",
      href: "/staff/communication",
      icon: MessageSquare,
      permission: "view:orders",
    },
    {
      title: "Scheduling",
      href: "/staff/scheduling",
      icon: CalendarClock,
      permission: "view:staff",
    },
  ]

  const departmentItems = [
    {
      title: "Housekeeping",
      href: "/staff/departments/housekeeping",
      icon: Bed,
      permission: "view:orders",
    },
    {
      title: "Dining",
      href: "/staff/departments/dining",
      icon: Utensils,
      permission: "view:orders",
    },
    {
      title: "Room Service",
      href: "/staff/departments/room-service",
      icon: Coffee,
      permission: "view:orders",
    },
    {
      title: "Spa & Wellness",
      href: "/staff/departments/spa",
      icon: Spa,
      permission: "view:orders",
    },
  ]

  return (
    <div
      className={cn(
        "relative flex flex-col border-r bg-white transition-all duration-300",
        collapsed ? "w-[80px]" : "w-[280px]",
      )}
    >
      <div className="flex h-16 items-center border-b px-4">
        <Link href="/staff/dashboard" className="flex items-center gap-2">
          <Image src="/stylized-goldfinch.png" width={32} height={32} alt="Goldfinch Hotels" className="h-8 w-auto" />
          {!collapsed && <span className="text-lg font-semibold">Goldfinch Staff</span>}
        </Link>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-20 z-10 h-6 w-6 rounded-full border bg-background shadow-md"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </Button>

      <ScrollArea className="flex-1 px-3 py-4">
        <div className="mb-6 space-y-1">
          {navItems.map((item) => {
            // Skip items the user doesn't have permission for
            if (!hasPermission(item.permission)) return null

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    pathname === item.href ? "bg-goldfinch-gold/10 text-goldfinch-gold" : "",
                  )}
                >
                  <item.icon className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-2")} />
                  {!collapsed && <span>{item.title}</span>}
                </Button>
              </Link>
            )
          })}
        </div>

        {!collapsed && (
          <div className="mb-2 px-4 text-xs font-semibold uppercase text-muted-foreground">Departments</div>
        )}

        <div className="mb-6 space-y-1">
          {departmentItems.map((item) => {
            // Skip items the user doesn't have permission for
            if (!hasPermission(item.permission)) return null

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    pathname === item.href ? "bg-goldfinch-gold/10 text-goldfinch-gold" : "",
                  )}
                >
                  <item.icon className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-2")} />
                  {!collapsed && <span>{item.title}</span>}
                </Button>
              </Link>
            )
          })}
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <div className={cn("flex items-center", collapsed ? "justify-center" : "justify-between")}>
          {!collapsed && (
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
              </div>
            </div>
          )}
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
