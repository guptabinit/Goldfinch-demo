"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, Star, SmilePlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const emojis = [
  { value: "terrible", label: "😞", description: "Terrible" },
  { value: "bad", label: "🙁", description: "Bad" },
  { value: "okay", label: "😐", description: "Okay" },
  { value: "good", label: "🙂", description: "Good" },
  { value: "excellent", label: "😄", description: "Excellent" },
]

export default function NewFeedbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")

  const [starRating, setStarRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [emojiRating, setEmojiRating] = useState("")
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleStarClick = (rating: number) => {
    setStarRating(rating)
  }

  const handleStarHover = (rating: number) => {
    setHoverRating(rating)
  }

  const handleStarLeave = () => {
    setHoverRating(0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/guest/feedback/thank-you")
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href={orderId ? `/guest/orders/${orderId}` : "/guest"}>
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">Share Your Feedback</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {orderId ? `Feedback for Order #${orderId}` : "Your Experience at Goldfinch"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-3">How would you rate your experience?</h3>
              <div className="flex justify-center gap-2" onMouseLeave={handleStarLeave}>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => handleStarClick(rating)}
                    onMouseEnter={() => handleStarHover(rating)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-8 w-8 transition-all ${
                        (hoverRating || starRating) >= rating
                          ? "fill-goldfinch-gold text-goldfinch-gold"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-center text-sm mt-2">
                {starRating === 1 && "Poor"}
                {starRating === 2 && "Fair"}
                {starRating === 3 && "Good"}
                {starRating === 4 && "Very Good"}
                {starRating === 5 && "Excellent"}
                {starRating === 0 && "\u00A0"} {/* Non-breaking space to maintain height */}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3">How did you feel about our service?</h3>
              <RadioGroup value={emojiRating} onValueChange={setEmojiRating} className="flex justify-between">
                {emojis.map((emoji) => (
                  <div key={emoji.value} className="flex flex-col items-center gap-1">
                    <RadioGroupItem value={emoji.value} id={`emoji-${emoji.value}`} className="sr-only" />
                    <Label
                      htmlFor={`emoji-${emoji.value}`}
                      className={`text-3xl cursor-pointer transition-transform ${
                        emojiRating === emoji.value ? "scale-125" : ""
                      }`}
                    >
                      {emoji.label}
                    </Label>
                    <span className="text-xs text-muted-foreground">{emoji.description}</span>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3">Additional Comments</h3>
              <Textarea
                placeholder="Please share your thoughts about our service..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="resize-none min-h-[120px]"
              />
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-3">
            <Button
              type="submit"
              className="w-full bg-goldfinch-gold hover:bg-goldfinch-gold/90 gap-2"
              disabled={isSubmitting || (!starRating && !emojiRating)}
            >
              <SmilePlus className="h-4 w-4" />
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>
            <Button type="button" variant="outline" className="w-full" onClick={() => router.back()}>
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
