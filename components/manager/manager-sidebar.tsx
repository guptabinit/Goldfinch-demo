"use client"

import { cn } from "@/lib/utils"
import {
  BarChart3,
  ClipboardList,
  MessageSquare,
  Tag,
  LineChart,
  AlertTriangle,
  Heart,
  Palette,
  FileText,
  Bell,
  Settings,
  Home,
  X,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ManagerSidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function ManagerSidebar({ open, setOpen }: ManagerSidebarProps) {
  const pathname = usePathname()

  const navigation = [
    { name: "Dashboard", href: "/staff/manager/dashboard", icon: Home },
    { name: "Orders", href: "/staff/manager/orders", icon: ClipboardList, alert: "12" },
    { name: "Guest Feedback", href: "/staff/manager/feedback", icon: MessageSquare },
    { name: "Promotions", href: "/staff/manager/promotions", icon: Tag },
    { name: "Performance", href: "/staff/manager/performance", icon: LineChart },
    { name: "SLA Monitoring", href: "/staff/manager/sla", icon: AlertTriangle, alert: "3" },
    { name: "Guest Satisfaction", href: "/staff/manager/satisfaction", icon: Heart },
    { name: "Branding", href: "/staff/manager/branding", icon: Palette },
    { name: "Reports", href: "/staff/manager/reports", icon: FileText },
    { name: "Alerts", href: "/staff/manager/alerts", icon: Bell },
    { name: "Settings", href: "/staff/manager/settings", icon: Settings },
  ]

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setOpen(false)} aria-hidden="true" />
      )}

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-white shadow-lg transition-all duration-300 ease-in-out",
          open ? "translate-x-0 w-64" : "lg:w-20 lg:translate-x-0 -translate-x-full",
        )}
      >
        <div className="flex items-center justify-between h-16 border-b px-4">
          <div className={cn("flex items-center", !open && "lg:justify-center lg:w-full")}>
            <img src="/stylized-goldfinch.png" alt="Goldfinch Hotels" className="h-8 w-auto" />
            {open && <span className="ml-2 text-lg font-semibold text-primary">Manager Portal</span>}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors relative",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                  onClick={() => window.innerWidth < 1024 && setOpen(false)}
                >
                  <item.icon className={cn("h-5 w-5 flex-shrink-0", open ? "mr-3" : "lg:mx-auto")} />
                  {open && <span className="flex-1">{item.name}</span>}
                  {open && item.alert && (
                    <Badge variant="destructive" className="ml-auto">
                      {item.alert}
                    </Badge>
                  )}
                  {!open && item.alert && (
                    <Badge
                      variant="destructive"
                      className="absolute top-0 right-0 -mt-1 -mr-1 h-4 w-4 rounded-full p-0 text-[10px] lg:flex hidden"
                    >
                      {item.alert}
                    </Badge>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t p-4">
          <div className={cn("flex items-center", open ? "justify-between" : "lg:justify-center")}>
            <div className={cn("flex items-center", !open && "lg:hidden")}>
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
              <span className="ml-2 text-sm text-muted-foreground">v1.2.0</span>
            </div>
            {!open && <BarChart3 className="h-5 w-5 text-muted-foreground hidden lg:block" />}
          </div>
        </div>
      </div>
    </>
  )
}
