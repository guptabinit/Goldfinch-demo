"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Star, MessageSquare, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function FeedbackPage() {
  const [activeTab, setActiveTab] = useState("my-feedback")

  const feedbackItems = [
    {
      id: "feedback-1",
      date: "Jan 18, 2023",
      rating: 5,
      comment:
        "Exceptional service and luxurious accommodations. The staff went above and beyond to make our stay memorable.",
      service: "Hotel Stay",
      status: "published",
      response:
        "Thank you for your wonderful feedback! We're delighted to hear that you enjoyed your stay with us and appreciated our service. We look forward to welcoming you back soon.",
    },
    {
      id: "feedback-2",
      date: "Mar 25, 2023",
      rating: 4,
      comment:
        "Great experience overall. The room was comfortable and the food was excellent. The only issue was the slow check-in process.",
      service: "In-Room Dining",
      status: "published",
      response: null,
    },
    {
      id: "feedback-3",
      date: "Jun 15, 2023",
      rating: 5,
      comment: "The spa treatment was absolutely rejuvenating. The therapist was skilled and attentive to my needs.",
      service: "Spa Service",
      status: "published",
      response:
        "Thank you for your feedback on our spa services. We're pleased to hear that you enjoyed your treatment and will pass your compliments to our therapist.",
    },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/guest">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/guest/feedback">Feedback</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/guest">
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-xl font-semibold">Feedback</h1>
        </div>

        <Button asChild className="bg-goldfinch-gold hover:bg-goldfinch-gold/90 gap-2">
          <Link href="/guest/feedback/new">
            <Plus className="h-4 w-4" />
            <span>New Feedback</span>
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="my-feedback" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my-feedback">My Feedback</TabsTrigger>
          <TabsTrigger value="hotel-feedback">Hotel Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="my-feedback" className="mt-6">
          {feedbackItems.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-lg font-medium mb-2">No feedback yet</h2>
              <p className="text-muted-foreground mb-6">You haven't submitted any feedback yet</p>
              <Button asChild className="bg-goldfinch-gold hover:bg-goldfinch-gold/90">
                <Link href="/guest/feedback/new">Share Your Experience</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {feedbackItems.map((feedback) => (
                <Card key={feedback.id} className="overflow-hidden luxury-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{feedback.service}</CardTitle>
                        <p className="text-sm text-muted-foreground">{feedback.date}</p>
                      </div>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= feedback.rating
                                ? "fill-goldfinch-gold text-goldfinch-gold"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{feedback.comment}</p>
                    {feedback.response && (
                      <div className="mt-4 bg-muted p-3 rounded-md">
                        <p className="text-xs font-medium mb-1">Response from Goldfinch Hotels:</p>
                        <p className="text-sm">{feedback.response}</p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-goldfinch-gold/30 text-goldfinch-gold hover:bg-goldfinch-gold/10"
                    >
                      Edit Feedback
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="hotel-feedback" className="mt-6">
          <div className="space-y-6">
            {[
              {
                id: "review-1",
                name: "Sarah M.",
                date: "2 weeks ago",
                rating: 5,
                comment:
                  "Absolutely loved my stay at Goldfinch. The staff was incredibly attentive and the amenities were top-notch. Will definitely be returning!",
              },
              {
                id: "review-2",
                name: "Raj P.",
                date: "1 month ago",
                rating: 4,
                comment:
                  "Beautiful property with excellent service. The restaurants offer a great variety of cuisines. Only downside was the pool area being a bit crowded.",
              },
              {
                id: "review-3",
                name: "Emma L.",
                date: "2 months ago",
                rating: 5,
                comment:
                  "From check-in to check-out, everything was perfect. The room was spacious and immaculate, and the spa services were exceptional.",
              },
            ].map((review) => (
              <Card key={review.id} className="overflow-hidden luxury-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{review.name}</h3>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating ? "fill-goldfinch-gold text-goldfinch-gold" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
