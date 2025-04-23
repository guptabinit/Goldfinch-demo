"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight,
  CalendarClock,
  AlertTriangle,
  Tag,
  ToggleLeft,
  Megaphone,
  FileText,
  Utensils,
  Bed,
  SpadeIcon as Spa,
  Coffee,
  Building,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useStaffAuth } from "@/lib/auth/staff-auth-context"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type HodSidebarProps = {
  department: string
}

export function HodSidebar({ department }: HodSidebarProps) {
  const pathname = usePathname()
  const { user, logout, hasPermission, updateUserDepartment } = useStaffAuth()
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

  const handleDepartmentChange = (value: string) => {
    updateUserDepartment(value)
    toast({
      title: "Department Changed",
      description: `You are now viewing the ${value} department`,
    })
  }

  // Get department icon
  const getDepartmentIcon = () => {
    switch (department.toLowerCase()) {
      case "dining":
      case "f&b":
        return Utensils
      case "housekeeping":
        return Bed
      case "spa":
      case "spa & wellness":
        return Spa
      case "room service":
        return Coffee
      default:
        return Building
    }
  }

  const DepartmentIcon = getDepartmentIcon()

  const navItems = [
    {
      title: "Dashboard",
      href: "/staff/hod/dashboard",
      icon: LayoutDashboard,
      permission: "view:reports",
    },
    {
      title: "Staff Management",
      href: "/staff/hod/staff",
      icon: Users,
      permission: "view:staff",
    },
    {
      title: "Orders & Requests",
      href: "/staff/hod/orders",
      icon: ClipboardList,
      permission: "view:orders",
    },
    {
      title: "SLA Monitoring",
      href: "/staff/hod/sla",
      icon: AlertTriangle,
      permission: "view:reports",
    },
    {
      title: "Promotions",
      href: "/staff/hod/promotions",
      icon: Tag,
      permission: "manage:availability",
    },
    {
      title: "Service Availability",
      href: "/staff/hod/services",
      icon: ToggleLeft,
      permission: "manage:availability",
    },
    {
      title: "Announcements",
      href: "/staff/hod/announcements",
      icon: Megaphone,
      permission: "manage:staff",
    },
    {
      title: "Reports",
      href: "/staff/hod/reports",
      icon: FileText,
      permission: "view:reports",
    },
    {
      title: "Schedule",
      href: "/staff/hod/schedule",
      icon: CalendarClock,
      permission: "view:staff",
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
        <Link href="/staff/hod/dashboard" className="flex items-center gap-2">
          <Image src="/stylized-goldfinch.png" width={32} height={32} alt="Goldfinch Hotels" className="h-8 w-auto" />
          {!collapsed && <span className="text-lg font-semibold">Goldfinch HOD</span>}
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

      <div className={cn("flex items-center gap-2 border-b p-4", collapsed ? "justify-center" : "")}>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-goldfinch-gold/10">
          <DepartmentIcon className="h-4 w-4 text-goldfinch-gold" />
        </div>
        {!collapsed && (
          <div className="flex-1">
            {collapsed ? (
              <p className="text-sm font-medium">{department}</p>
            ) : (
              <Select defaultValue={department} onValueChange={handleDepartmentChange}>
                <SelectTrigger className="border-none bg-transparent focus:ring-0 shadow-none h-8 p-0 w-full">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Housekeeping">Housekeeping</SelectItem>
                  <SelectItem value="Dining">F&B Department</SelectItem>
                  <SelectItem value="Spa & Wellness">Spa & Wellness</SelectItem>
                  <SelectItem value="Room Service">Room Service</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        )}
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-1">
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
      </ScrollArea>

      <div className="border-t p-4">
        <div className={cn("flex items-center", collapsed ? "justify-center" : "justify-between")}>
          {!collapsed && (
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
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
