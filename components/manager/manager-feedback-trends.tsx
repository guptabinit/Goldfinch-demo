"use client"

import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"

// Mock data for trending topics
const trendingTopics = [
  {
    topic: "Staff Friendliness",
    mentions: 187,
    sentiment: "positive",
    trend: "up",
    percentage: 12,
  },
  {
    topic: "Room Cleanliness",
    mentions: 156,
    sentiment: "positive",
    trend: "up",
    percentage: 8,
  },
  {
    topic: "Food Quality",
    mentions: 134,
    sentiment: "negative",
    trend: "down",
    percentage: 5,
  },
  {
    topic: "Check-in Experience",
    mentions: 112,
    sentiment: "positive",
    trend: "up",
    percentage: 15,
  },
  {
    topic: "Wifi Speed",
    mentions: 98,
    sentiment: "negative",
    trend: "down",
    percentage: 7,
  },
  {
    topic: "Bathroom Amenities",
    mentions: 87,
    sentiment: "neutral",
    trend: "stable",
    percentage: 0,
  },
  {
    topic: "Spa Services",
    mentions: 76,
    sentiment: "positive",
    trend: "up",
    percentage: 18,
  },
  {
    topic: "Room Service Speed",
    mentions: 68,
    sentiment: "negative",
    trend: "down",
    percentage: 9,
  },
]

export function ManagerFeedbackTrends() {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-500"
      case "negative":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const getTrendBadge = (trend: string, percentage: number) => {
    switch (trend) {
      case "up":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
            <TrendingUp className="mr-1 h-3 w-3" />
            {percentage}%
          </Badge>
        )
      case "down":
        return (
          <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
            <TrendingDown className="mr-1 h-3 w-3" />
            {percentage}%
          </Badge>
        )
      default:
        return <Badge variant="outline">Stable</Badge>
    }
  }

  return (
    <div className="space-y-4">
      {trendingTopics.map((topic, index) => (
        <div key={index} className="flex items-center justify-between p-2 rounded-md border bg-background">
          <div className="flex-1">
            <div className="font-medium">{topic.topic}</div>
            <div className="text-xs text-muted-foreground">{topic.mentions} mentions</div>
          </div>
          <div className="flex flex-col items-end space-y-1">
            <span className={`text-sm font-medium ${getSentimentColor(topic.sentiment)}`}>
              {topic.sentiment.charAt(0).toUpperCase() + topic.sentiment.slice(1)}
            </span>
            {getTrendBadge(topic.trend, topic.percentage)}
          </div>
        </div>
      ))}
    </div>
  )
}
