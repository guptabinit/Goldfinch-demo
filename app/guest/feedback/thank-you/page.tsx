"use client"

import { useEffect } from "react"
import Link from "next/link"
import { CheckCircle2, Coins } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import confetti from "canvas-confetti"

export default function FeedbackThankYouPage() {
  useEffect(() => {
    // Trigger confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="rounded-full bg-green-100 p-4 mx-auto w-fit">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>

        <h1 className="text-2xl font-semibold">Thank You!</h1>
        <p className="text-muted-foreground">
          We appreciate your feedback. It helps us improve our services for you and other guests.
        </p>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-center gap-2">
              <Coins className="h-5 w-5 text-goldfinch-gold" />
              Loyalty Points Earned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-goldfinch-gold">+50</p>
            <p className="text-sm text-muted-foreground mt-1">Points have been added to your loyalty wallet</p>
          </CardContent>
          <CardFooter className="flex-col gap-3">
            <Button className="w-full bg-goldfinch-gold hover:bg-goldfinch-gold/90" asChild>
              <Link href="/guest/loyalty">View My Points</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/guest">Return to Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
