"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock, User } from "lucide-react"

// Mock data for alerts
const alertsData = [
  {
    id: 1,
    type: "sla",
    message: "SLA Breach: Room Service Order #4582",
    time: "15 mins ago",
    severity: "high",
  },
  {
    id: 2,
    type: "vip",
    message: "VIP Guest Check-in: Mr. Sharma (Suite 1201)",
    time: "10 mins ago",
    severity: "medium",
  },
  {
    id: 3,
    type: "sla",
    message: "SLA Breach: Housekeeping Request #2371",
    time: "22 mins ago",
    severity: "high",
  },
  {
    id: 4,
    type: "order",
    message: "Large Group Booking: Corporate Event (25 rooms)",
    time: "30 mins ago",
    severity: "medium",
  },
  {
    id: 5,
    type: "sla",
    message: "SLA Breach: Maintenance Request #1092",
    time: "45 mins ago",
    severity: "high",
  },
]

export function ManagerAlertsList() {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "sla":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "vip":
        return <User className="h-5 w-5 text-amber-500" />
      default:
        return <Clock className="h-5 w-5 text-blue-500" />
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            Medium
          </Badge>
        )
      default:
        return <Badge variant="outline">Low</Badge>
    }
  }

  return (
    <div className="space-y-4">
      {alertsData.map((alert) => (
        <div key={alert.id} className="flex items-start p-3 rounded-md border bg-background">
          <div className="mr-3 mt-0.5">{getAlertIcon(alert.type)}</div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{alert.message}</p>
              {getSeverityBadge(alert.severity)}
            </div>
            <p className="text-xs text-muted-foreground">{alert.time}</p>
          </div>
        </div>
      ))}

      <Button variant="outline" className="w-full">
        View All Alerts
      </Button>
    </div>
  )
}
