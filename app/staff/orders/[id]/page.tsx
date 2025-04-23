"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { formatDistanceToNow, format } from "date-fns"
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  AlertTriangle,
  Coffee,
  Utensils,
  Bed,
  SpadeIcon as Spa,
  MessageSquare,
  Send,
} from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { useStaffAuth } from "@/lib/auth/staff-auth-context"
import { mockOrders } from "@/lib/staff/mock-data"

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

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useStaffAuth()

  // Find the order from mock data
  const order = mockOrders.find((o) => o.id === params.id)

  const [status, setStatus] = useState(order?.status || "new")
  const [newNote, setNewNote] = useState("")
  const [staffNotes, setStaffNotes] = useState(order?.staffNotes || [])

  if (!order) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Order Not Found</h2>
          <p className="text-muted-foreground">The order you're looking for doesn't exist.</p>
          <Button className="mt-4" onClick={() => router.back()}>
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  const ServiceIcon = serviceTypeIcons[order.serviceType]
  const statusBadge = statusBadges[status as keyof typeof statusBadges]

  const handleStatusChange = (newStatus: "new" | "preparing" | "completed") => {
    setStatus(newStatus)
    toast({
      title: "Order Status Updated",
      description: `Order has been marked as ${newStatus}`,
    })
    // In a real app, this would call an API to update the order status
  }

  const handleAddNote = () => {
    if (!newNote.trim()) return

    const note = {
      id: `note-${Date.now()}`,
      text: newNote,
      staffName: user?.name || "Staff Member",
      timestamp: new Date(),
    }

    setStaffNotes([...staffNotes, note])
    setNewNote("")
    toast({
      title: "Note Added",
      description: "Your note has been added to the order",
    })
    // In a real app, this would call an API to add the note
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b bg-white p-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Order Details</h1>
            <p className="text-muted-foreground">Order #{order.id.replace("order-", "")}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Order Summary */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Order Summary</CardTitle>
              <Badge variant={statusBadge.variant as any} className="text-sm px-3 py-1">
                {statusBadge.label}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4 sm:gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Guest</p>
                  <p className="font-medium">{order.guestName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Room</p>
                  <p className="font-medium">{order.roomNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Service Type</p>
                  <div className="flex items-center gap-1 font-medium">
                    <ServiceIcon className="h-4 w-4 text-goldfinch-gold" />
                    <span className="capitalize">{order.serviceType.replace("_", " ")}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Order Time</p>
                  <p className="font-medium">{format(new Date(order.orderTime), "MMM d, yyyy h:mm a")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="font-medium">${order.totalAmount.toFixed(2)}</p>
                </div>
                {order.isUrgent && (
                  <div className="flex items-center gap-1 text-red-500">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="font-medium">Urgent Order</span>
                  </div>
                )}
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Order Items</h3>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{item.quantity}x</span>
                        <span>{item.name}</span>
                      </div>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {order.specialInstructions && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-medium mb-2">Special Instructions</h3>
                    <p className="text-muted-foreground">{order.specialInstructions}</p>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter className="flex justify-between bg-muted/50 p-4">
              {status === "new" && (
                <>
                  <Button
                    variant="outline"
                    className="text-goldfinch-gold border-goldfinch-gold/30 hover:bg-goldfinch-gold/10"
                    onClick={() => handleStatusChange("preparing")}
                  >
                    Accept Order
                  </Button>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Received {formatDistanceToNow(new Date(order.orderTime), { addSuffix: true })}</span>
                  </div>
                </>
              )}

              {status === "preparing" && (
                <>
                  <Button
                    variant="outline"
                    className="text-green-600 border-green-600/30 hover:bg-green-600/10"
                    onClick={() => handleStatusChange("completed")}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark as Completed
                  </Button>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>In preparation</span>
                  </div>
                </>
              )}

              {status === "completed" && (
                <div className="flex items-center gap-2 text-sm text-green-600 w-full justify-center">
                  <CheckCircle className="h-4 w-4" />
                  <span>Completed {formatDistanceToNow(new Date(), { addSuffix: true })}</span>
                </div>
              )}
            </CardFooter>
          </Card>

          {/* Staff Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Staff Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {staffNotes.length > 0 ? (
                  staffNotes.map((note) => (
                    <div key={note.id} className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{note.staffName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{note.staffName}</p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(note.timestamp), "MMM d, h:mm a")}
                          </p>
                        </div>
                        <p className="text-sm mt-1">{note.text}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No staff notes yet</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3 p-4">
              <Textarea
                placeholder="Add a note for other staff members..."
                className="min-h-[80px] border-goldfinch-gold/20 focus:border-goldfinch-gold"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              />
              <Button className="w-full bg-goldfinch-gold hover:bg-goldfinch-gold/90" onClick={handleAddNote}>
                <Send className="mr-2 h-4 w-4" />
                Add Note
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
