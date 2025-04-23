"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Mock data for top performing staff
const topStaffData = [
  {
    id: 1,
    name: "Amit Kumar",
    department: "Room Service",
    avatar: "/abstract-geometric-shapes.png?height=40&width=40&query=Amit Kumar",
    rating: 4.9,
    ordersCompleted: 124,
    responseTime: "5.8 min",
    slaCompliance: "98.4%",
  },
  {
    id: 2,
    name: "Ravi Patel",
    department: "Spa",
    avatar: "/abstract-geometric-shapes.png?height=40&width=40&query=Ravi Patel",
    rating: 5.0,
    ordersCompleted: 45,
    responseTime: "7.2 min",
    slaCompliance: "100%",
  },
  {
    id: 3,
    name: "Deepa Sharma",
    department: "Housekeeping",
    avatar: "/abstract-geometric-shapes.png?height=40&width=40&query=Deepa Sharma",
    rating: 4.7,
    ordersCompleted: 87,
    responseTime: "8.5 min",
    slaCompliance: "94.3%",
  },
  {
    id: 4,
    name: "Vikram Singh",
    department: "Room Service",
    avatar: "/abstract-geometric-shapes.png?height=40&width=40&query=Vikram Singh",
    rating: 4.6,
    ordersCompleted: 112,
    responseTime: "6.9 min",
    slaCompliance: "95.5%",
  },
]

export function ManagerStaffPerformance() {
  const getRatingStars = (rating: number) => {
    return "★".repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? "½" : "") + "☆".repeat(5 - Math.ceil(rating))
  }

  return (
    <div className="space-y-4">
      {topStaffData.map((staff) => (
        <div key={staff.id} className="flex items-start p-4 rounded-md border bg-background">
          <div className="mr-4">
            <Avatar>
              <AvatarImage src={staff.avatar || "/placeholder.svg"} alt={staff.name} />
              <AvatarFallback>
                {staff.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <div className="font-medium">{staff.name}</div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Top Performer
              </Badge>
            </div>
            <div className="flex items-center text-sm text-amber-500">{getRatingStars(staff.rating)}</div>
            <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
              <div>
                <span className="block">Department</span>
                <span className="font-medium text-foreground">{staff.department}</span>
              </div>
              <div>
                <span className="block">Orders Completed</span>
                <span className="font-medium text-foreground">{staff.ordersCompleted}</span>
              </div>
              <div>
                <span className="block">Response Time</span>
                <span className="font-medium text-foreground">{staff.responseTime}</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      <Button variant="outline" className="w-full">
        View All Staff
      </Button>
    </div>
  )
}
