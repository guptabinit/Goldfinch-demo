"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Clock, CheckCircle2, Utensils, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function OrderDetailsPage() {
  const [orderStatus, setOrderStatus] = useState("preparing") // received, preparing, on-the-way, delivered
  const [progress, setProgress] = useState(50)

  // Mock order data
  const order = {
    id: "GF12345",
    status: orderStatus,
    date: "April 20, 2023",
    time: "10:30 AM",
    items: [
      {
        id: "butter-chicken-1",
        name: "Butter Chicken",
        price: 550,
        quantity: 1,
        image: "/creamy-butter-chicken.png",
        modifiers: {
          spiceLevel: "medium",
          extras: ["extra-naan"],
        },
        extrasCost: 60,
      },
      {
        id: "avocado-toast-1",
        name: "Avocado Toast",
        price: 420,
        quantity: 2,
        image: "/vibrant-avocado-toast.png",
        modifiers: {
          extras: ["poached-egg", "feta"],
        },
        extrasCost: 110,
      },
    ],
    subtotal: 1110,
    tax: 56,
    serviceCharge: 111,
    total: 1277,
    paymentMethod: "Charged to Room 301",
    specialInstructions: "Please include extra napkins and cutlery for two people.",
  }

  const statusSteps = [
    {
      key: "received",
      label: "Order Received",
      description: "Your order has been received and is being processed.",
      time: "10:30 AM",
      icon: CheckCircle2,
    },
    {
      key: "preparing",
      label: "Preparing",
      description: "Our chefs are preparing your delicious meal.",
      time: "10:35 AM",
      icon: Utensils,
    },
    {
      key: "on-the-way",
      label: "On the way",
      description: "Your order is on its way to your room.",
      time: "",
      icon: Clock,
    },
    {
      key: "delivered",
      label: "Delivered",
      description: "Your order has been delivered. Enjoy!",
      time: "",
      icon: CheckCircle2,
    },
  ]

  const getStatusIndex = (status: string) => {
    return statusSteps.findIndex((step) => step.key === status)
  }

  const isStepCompleted = (stepKey: string) => {
    return getStatusIndex(stepKey) <= getStatusIndex(orderStatus)
  }

  const isStepCurrent = (stepKey: string) => {
    return stepKey === orderStatus
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/guest/orders">
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">Order Details</h1>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Order #{order.id}</CardTitle>
            <Badge className="bg-goldfinch-gold">
              {orderStatus === "received" && "Received"}
              {orderStatus === "preparing" && "Preparing"}
              {orderStatus === "on-the-way" && "On the way"}
              {orderStatus === "delivered" && "Delivered"}
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground">
            {order.date} at {order.time}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Progress value={progress} className="h-2 bg-goldfinch-gold/20" />
          </div>

          <div className="space-y-4">
            {statusSteps.map((step) => {
              const StepIcon = step.icon
              return (
                <div key={step.key} className="flex items-start gap-4">
                  <div
                    className={`rounded-full p-2 mt-0.5 ${
                      isStepCompleted(step.key) ? "bg-goldfinch-gold/20" : "bg-muted"
                    }`}
                  >
                    <StepIcon
                      className={`h-4 w-4 ${
                        isStepCompleted(step.key) ? "text-goldfinch-gold" : "text-muted-foreground"
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className={`font-medium ${!isStepCompleted(step.key) && "text-muted-foreground"}`}>
                      {step.label}
                      {isStepCurrent(step.key) && " (Current)"}
                    </h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                    {step.time && <p className="text-xs text-muted-foreground mt-1">{step.time}</p>}
                  </div>
                </div>
              )
            })}
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-3">Order Items</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden">
                    <Image src={item.image || "/placeholder.svg"} fill alt={item.name} className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{item.name}</h4>
                      <span>₹{(item.price + item.extrasCost) * item.quantity}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <div>
                        Qty: {item.quantity} × ₹{item.price}
                      </div>
                      {item.modifiers.spiceLevel && (
                        <div>
                          Spice:{" "}
                          {item.modifiers.spiceLevel.charAt(0).toUpperCase() + item.modifiers.spiceLevel.slice(1)}
                        </div>
                      )}
                      {item.modifiers.extras && item.modifiers.extras.length > 0 && (
                        <div>
                          Extras:{" "}
                          {item.modifiers.extras
                            .map((extra: string) =>
                              extra
                                .split("-")
                                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(" "),
                            )
                            .join(", ")}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-3">Payment Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{order.subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (5%)</span>
                <span>₹{order.tax}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Service Charge (10%)</span>
                <span>₹{order.serviceCharge}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>₹{order.total}</span>
              </div>
              <div className="text-sm text-muted-foreground">Payment Method: {order.paymentMethod}</div>
            </div>
          </div>

          {order.specialInstructions && (
            <>
              <Separator />
              <div>
                <h3 className="font-medium mb-2">Special Instructions</h3>
                <p className="text-sm text-muted-foreground">{order.specialInstructions}</p>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex-col gap-3">
          {orderStatus === "delivered" && (
            <Button className="w-full bg-goldfinch-gold hover:bg-goldfinch-gold/90 gap-2" asChild>
              <Link href="/guest/feedback/new?orderId=GF12345">
                <Star className="h-4 w-4" />
                Rate Your Experience
              </Link>
            </Button>
          )}
          <Button variant="outline" className="w-full" asChild>
            <Link href="/guest/help">Need Help?</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
