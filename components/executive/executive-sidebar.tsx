"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  TrendingUp,
  BarChart3,
  Users,
  Award,
  Building,
  ThumbsUp,
  UserCog,
  FileSpreadsheet,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Hotel,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useStaffAuth } from "@/lib/auth/staff-auth-context"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export function ExecutiveSidebar() {
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
      title: "Overview",
      href: "/staff/executive/dashboard",
      icon: LayoutDashboard,
      permission: "view:finances",
    },
    {
      title: "Revenue",
      href: "/staff/executive/revenue",
      icon: TrendingUp,
      permission: "view:finances",
    },
    {
      title: "Upselling",
      href: "/staff/executive/upselling",
      icon: BarChart3,
      permission: "view:finances",
    },
    {
      title: "Service Utilization",
      href: "/staff/executive/utilization",
      icon: Users,
      permission: "view:finances",
    },
    {
      title: "Loyalty Program",
      href: "/staff/executive/loyalty",
      icon: Award,
      permission: "view:finances",
    },
    {
      title: "Properties",
      href: "/staff/executive/properties",
      icon: Building,
      permission: "view:finances",
    },
    {
      title: "Guest Satisfaction",
      href: "/staff/executive/satisfaction",
      icon: ThumbsUp,
      permission: "view:finances",
    },
    {
      title: "Staff Performance",
      href: "/staff/executive/performance",
      icon: UserCog,
      permission: "view:finances",
    },
    {
      title: "Financial Reports",
      href: "/staff/executive/reports",
      icon: FileSpreadsheet,
      permission: "view:finances",
    },
    {
      title: "Settings",
      href: "/staff/executive/settings",
      icon: Settings,
      permission: "view:finances",
    },
  ]

  const propertyItems = [
    {
      title: "Mumbai",
      href: "/staff/executive/properties/mumbai",
      icon: Hotel,
      permission: "view:finances",
    },
    {
      title: "Delhi",
      href: "/staff/executive/properties/delhi",
      icon: Hotel,
      permission: "view:finances",
    },
    {
      title: "Bangalore",
      href: "/staff/executive/properties/bangalore",
      icon: Hotel,
      permission: "view:finances",
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
        <Link href="/staff/executive/dashboard" className="flex items-center gap-2">
          <Image src="/stylized-goldfinch.png" width={32} height={32} alt="Goldfinch Hotels" className="h-8 w-auto" />
          {!collapsed && <span className="text-lg font-semibold">Goldfinch Executive</span>}
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
          <div className="mb-2 px-4 text-xs font-semibold uppercase text-muted-foreground">Properties</div>
        )}

        <div className="mb-6 space-y-1">
          {propertyItems.map((item) => {
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
                <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{user?.name || "User"}</p>
                <p className="text-xs text-muted-foreground capitalize">{user?.role || "Executive"}</p>
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
