"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CheckCircle2, Clock, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import confetti from "canvas-confetti"

export default function OrderConfirmationPage() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Trigger confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })

    // Animate progress bar
    const timer = setTimeout(() => {
      setProgress(100)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center py-8">
        <div className="rounded-full bg-green-100 p-3 mb-4">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-2xl font-semibold text-center mb-2">Order Confirmed!</h1>
        <p className="text-center text-muted-foreground">
          Your order #GF12345 has been received and is being processed.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Order Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Status:</span>
              <span className="text-goldfinch-gold">Order Received</span>
            </div>
            <Progress value={progress} className="h-2 bg-goldfinch-gold/20" />
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-goldfinch-gold/20 p-2 mt-0.5">
                <CheckCircle2 className="h-4 w-4 text-goldfinch-gold" />
              </div>
              <div>
                <h3 className="font-medium">Order Received</h3>
                <p className="text-sm text-muted-foreground">Your order has been received and is being processed.</p>
                <p className="text-xs text-muted-foreground mt-1">10:30 AM</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-full bg-muted p-2 mt-0.5">
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-muted-foreground">Preparing</h3>
                <p className="text-sm text-muted-foreground">Our chefs are preparing your delicious meal.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-full bg-muted p-2 mt-0.5">
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-muted-foreground">On the way</h3>
                <p className="text-sm text-muted-foreground">Your order is on its way to your room.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-full bg-muted p-2 mt-0.5">
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-muted-foreground">Delivered</h3>
                <p className="text-sm text-muted-foreground">Your order has been delivered. Enjoy!</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            className="w-full border-goldfinch-gold/30 text-goldfinch-gold hover:bg-goldfinch-gold/10"
            asChild
          >
            <Link href="/guest/orders/GF12345">
              View Order Details
              <ChevronRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <div className="flex flex-col gap-4">
        <Button asChild className="bg-goldfinch-gold hover:bg-goldfinch-gold/90">
          <Link href="/guest/orders">View All Orders</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/guest">Return to Home</Link>
        </Button>
      </div>
    </div>
  )
}
