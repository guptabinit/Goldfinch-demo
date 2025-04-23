"use client"

import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react"

// Mock data for recent feedback
const feedbackData = [
  {
    id: 1,
    guest: "Rahul Mehta",
    room: "1201",
    department: "Room Service",
    rating: 5,
    comment: "Exceptional service! The food was delivered promptly and was still hot. The staff was very courteous.",
    sentiment: "positive",
    time: "2 hours ago",
  },
  {
    id: 2,
    guest: "Priya Singh",
    room: "805",
    department: "Housekeeping",
    rating: 4,
    comment: "Room was very clean, but I had to call twice for extra towels.",
    sentiment: "neutral",
    time: "5 hours ago",
  },
  {
    id: 3,
    guest: "John Williams",
    room: "1502",
    department: "Spa",
    rating: 5,
    comment: "The deep tissue massage was incredible! Exactly what I needed after a long flight.",
    sentiment: "positive",
    time: "1 day ago",
  },
  {
    id: 4,
    guest: "Sarah Johnson",
    room: "1105",
    department: "Restaurant",
    rating: 2,
    comment: "Disappointed with the breakfast. Food was cold and service was slow.",
    sentiment: "negative",
    time: "1 day ago",
  },
  {
    id: 5,
    guest: "Michael Chen",
    room: "901",
    department: "Front Desk",
    rating: 4,
    comment: "Check-in was smooth, but there was some confusion about my reservation initially.",
    sentiment: "neutral",
    time: "2 days ago",
  },
]

export function ManagerFeedbackList() {
  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Positive
          </Badge>
        )
      case "neutral":
        return <Badge variant="outline">Neutral</Badge>
      case "negative":
        return <Badge variant="destructive">Negative</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getRatingStars = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating)
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <ThumbsUp className="h-5 w-5 text-green-500" />
      case "negative":
        return <ThumbsDown className="h-5 w-5 text-red-500" />
      default:
        return <MessageSquare className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="space-y-4">
      {feedbackData.map((feedback) => (
        <div key={feedback.id} className="flex items-start p-4 rounded-md border bg-background">
          <div className="mr-4">
            <Avatar>
              <AvatarImage
                src={`/abstract-geometric-shapes.png?height=40&width=40&query=${feedback.guest}`}
                alt={feedback.guest}
              />
              <AvatarFallback>
                {feedback.guest
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <div className="font-medium">{feedback.guest}</div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Room {feedback.room}</span>
                {getSentimentBadge(feedback.sentiment)}
              </div>
            </div>
            <div className="flex items-center text-sm text-amber-500">{getRatingStars(feedback.rating)}</div>
            <p className="text-sm text-muted-foreground">{feedback.comment}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center space-x-2">
                <span>{feedback.department}</span>
                <span>•</span>
                <span>{feedback.time}</span>
              </div>
              <div className="flex items-center">{getSentimentIcon(feedback.sentiment)}</div>
            </div>
          </div>
        </div>
      ))}

      <Button variant="outline" className="w-full">
        View All Feedback
      </Button>
    </div>
  )
}
