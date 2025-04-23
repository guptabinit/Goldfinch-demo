"use client"

import { useState } from "react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Clock, CheckCircle, AlertTriangle, ChevronRight, Coffee, Utensils, Bed, SpadeIcon as Spa } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Service type icons
const serviceTypeIcons = {
  room_service: Coffee,
  dining: Utensils,
  housekeeping: Bed,
  spa: Spa,
}

// Status badges
const statusBadges = {
  new: { label: "New", variant: "default" },
  preparing: { label: "Preparing", variant: "secondary" },
  completed: { label: "Completed", variant: "outline" },
}

type Order = {
  id: string
  guestName: string
  roomNumber: string
  orderTime: Date
  status: "new" | "preparing" | "completed"
  serviceType: "room_service" | "dining" | "housekeeping" | "spa"
  items: Array<{
    id: string
    name: string
    quantity: number
    price: number
  }>
  specialInstructions?: string
  totalAmount: number
  isUrgent: boolean
  staffNotes: Array<{
    id: string
    text: string
    staffName: string
    timestamp: Date
  }>
}

type OrderCardProps = {
  order: Order
  showActions?: boolean
}

export function OrderCard({ order, showActions = true }: OrderCardProps) {
  const [status, setStatus] = useState(order.status)

  const ServiceIcon = serviceTypeIcons[order.serviceType]
  const statusBadge = statusBadges[status]

  const handleStatusChange = (newStatus: "new" | "preparing" | "completed") => {
    setStatus(newStatus)
    // In a real app, this would call an API to update the order status
  }

  return (
    <Card className={`overflow-hidden ${order.isUrgent ? "border-red-400" : ""}`}>
      <div className={`h-1 w-full ${order.isUrgent ? "bg-red-500" : "bg-goldfinch-gold"}`} />
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <ServiceIcon className="h-4 w-4 text-goldfinch-gold" />
              <h3 className="font-medium">{order.guestName}</h3>
              {order.isUrgent && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Urgent Order</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <p className="text-sm text-muted-foreground">Room {order.roomNumber}</p>
          </div>
          <Badge variant={statusBadge.variant as any}>{statusBadge.label}</Badge>
        </div>

        <div className="mt-4">
          <p className="text-sm font-medium">Order Items:</p>
          <ul className="mt-1 space-y-1">
            {order.items.slice(0, 2).map((item) => (
              <li key={item.id} className="text-sm">
                {item.quantity}x {item.name}
              </li>
            ))}
            {order.items.length > 2 && (
              <li className="text-sm text-muted-foreground">+{order.items.length - 2} more items</li>
            )}
          </ul>
        </div>

        {order.specialInstructions && (
          <div className="mt-3">
            <p className="text-sm font-medium">Special Instructions:</p>
            <p className="text-sm text-muted-foreground line-clamp-2">{order.specialInstructions}</p>
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{formatDistanceToNow(new Date(order.orderTime), { addSuffix: true })}</span>
          </div>
          <p className="font-medium">${order.totalAmount.toFixed(2)}</p>
        </div>
      </CardContent>

      {showActions && (
        <CardFooter className="flex justify-between bg-muted/50 p-3">
          {status === "new" && (
            <>
              <Button
                size="sm"
                variant="outline"
                className="text-goldfinch-gold border-goldfinch-gold/30 hover:bg-goldfinch-gold/10"
                onClick={() => handleStatusChange("preparing")}
              >
                Accept
              </Button>
              <Button size="sm" variant="ghost" className="gap-1" asChild>
                <Link href={`/staff/orders/${order.id}`}>
                  Details
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </>
          )}

          {status === "preparing" && (
            <>
              <Button
                size="sm"
                variant="outline"
                className="text-green-600 border-green-600/30 hover:bg-green-600/10"
                onClick={() => handleStatusChange("completed")}
              >
                <CheckCircle className="mr-1 h-4 w-4" />
                Complete
              </Button>
              <Button size="sm" variant="ghost" className="gap-1" asChild>
                <Link href={`/staff/orders/${order.id}`}>
                  Details
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </>
          )}

          {status === "completed" && (
            <Button size="sm" variant="ghost" className="w-full gap-1 justify-center" asChild>
              <Link href={`/staff/orders/${order.id}`}>
                View Details
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
