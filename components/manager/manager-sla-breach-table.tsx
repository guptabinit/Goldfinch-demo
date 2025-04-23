"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowUpRight, Clock } from "lucide-react"

// Mock data for SLA breaches
const slaBreachData = [
  {
    id: "SLA-4582",
    orderId: "ORD-4582",
    department: "Room Service",
    service: "Butter Chicken with Naan",
    guest: "Rahul Mehta",
    room: "1201",
    breachTime: "15 mins ago",
    expectedTime: "30 mins",
    actualTime: "45+ mins",
    severity: "medium",
  },
  {
    id: "SLA-4579",
    orderId: "ORD-4579",
    department: "Room Service",
    service: "Continental Breakfast",
    guest: "Sarah Johnson",
    room: "1105",
    breachTime: "32 mins ago",
    expectedTime: "25 mins",
    actualTime: "57+ mins",
    severity: "high",
  },
  {
    id: "SLA-4571",
    orderId: "ORD-4571",
    department: "Housekeeping",
    service: "Room Cleaning",
    guest: "Michael Chen",
    room: "901",
    breachTime: "45 mins ago",
    expectedTime: "45 mins",
    actualTime: "90+ mins",
    severity: "high",
  },
  {
    id: "SLA-4568",
    orderId: "ORD-4568",
    department: "Housekeeping",
    service: "Extra Towels",
    guest: "Emma Wilson",
    room: "1405",
    breachTime: "22 mins ago",
    expectedTime: "15 mins",
    actualTime: "37+ mins",
    severity: "medium",
  },
  {
    id: "SLA-4565",
    orderId: "ORD-4565",
    department: "Housekeeping",
    service: "Turndown Service",
    guest: "David Thompson",
    room: "1601",
    breachTime: "18 mins ago",
    expectedTime: "30 mins",
    actualTime: "48+ mins",
    severity: "medium",
  },
  {
    id: "SLA-4562",
    orderId: "ORD-4562",
    department: "Spa",
    service: "Deep Tissue Massage",
    guest: "Lisa Wang",
    room: "1102",
    breachTime: "10 mins ago",
    expectedTime: "10 mins",
    actualTime: "20+ mins",
    severity: "low",
  },
  {
    id: "SLA-4559",
    orderId: "ORD-4559",
    department: "Maintenance",
    service: "AC Repair",
    guest: "Robert Brown",
    room: "705",
    breachTime: "65 mins ago",
    expectedTime: "60 mins",
    actualTime: "125+ mins",
    severity: "high",
  },
]

export function ManagerSlaBreachTable() {
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
      case "low":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Low
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-4">
      {slaBreachData.slice(0, 5).map((breach) => (
        <div key={breach.id} className="flex items-start p-3 rounded-md border bg-background">
          <div className="mr-3 mt-0.5">
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">{breach.service}</span>
                <span className="text-muted-foreground"> - {breach.department}</span>
              </div>
              {getSeverityBadge(breach.severity)}
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Guest: </span>
              <span>
                {breach.guest} (Room {breach.room})
              </span>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="mr-1 h-3 w-3" />
              <span>
                Expected: {breach.expectedTime} | Actual: {breach.actualTime}
              </span>
              <span className="mx-2">•</span>
              <span>Breached {breach.breachTime}</span>
            </div>
          </div>
        </div>
      ))}

      <Button variant="outline" className="w-full">
        <ArrowUpRight className="mr-2 h-4 w-4" />
        View All Breaches
      </Button>
    </div>
  )
}
