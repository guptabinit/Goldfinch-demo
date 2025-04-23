"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect } from "react"
import { redirect } from "next/navigation"
import { ChevronLeft, Coins, Clock, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth/auth-context"
import { Skeleton } from "@/components/ui/skeleton"

// Mock loyalty data
const loyaltyData = {
  points: 250,
  tier: "Silver",
  nextTier: "Gold",
  pointsToNextTier: 750,
  history: [
    {
      id: "LP1001",
      date: "April 20, 2023",
      description: "Feedback Submission",
      points: 50,
      status: "credited",
    },
    {
      id: "LP1000",
      date: "April 19, 2023",
      description: "Room Stay",
      points: 200,
      status: "credited",
    },
    {
      id: "LP999",
      date: "March 15, 2023",
      description: "Spa Service",
      points: 100,
      status: "credited",
    },
    {
      id: "LP998",
      date: "March 14, 2023",
      description: "Restaurant Dining",
      points: 150,
      status: "credited",
    },
    {
      id: "LP997",
      date: "February 28, 2023",
      description: "Room Upgrade Redemption",
      points: -300,
      status: "debited",
    },
  ],
  rewards: [
    {
      id: "RW001",
      title: "Complimentary Breakfast",
      description: "Enjoy a free breakfast for two at our restaurant",
      points: 200,
      image: "/opulent-morning-spread.png",
    },
    {
      id: "RW002",
      title: "Room Upgrade",
      description: "Upgrade to the next room category for your stay",
      points: 500,
      image: "/opulent-city-view.png",
    },
    {
      id: "RW003",
      title: "30-minute Spa Treatment",
      description: "Relax with a complimentary 30-minute spa treatment",
      points: 300,
      image: "/serene-spa-retreat.png",
    },
    {
      id: "RW004",
      title: "Airport Transfer",
      description: "Free airport transfer in a luxury vehicle",
      points: 400,
      image: "/airport-luxury-arrival.png",
    },
  ],
}

export default function LoyaltyPage() {
  const { user, isLoading, isAuthenticated } = useAuth()
  const progressPercentage = (loyaltyData.points / (loyaltyData.points + loyaltyData.pointsToNextTier)) * 100

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      redirect("/auth/login?returnUrl=/guest/loyalty")
    }
  }, [isLoading, isAuthenticated])

  if (isLoading) {
    return <LoyaltyPageSkeleton />
  }

  if (!isAuthenticated) {
    return null // This prevents flash of content before redirect
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/guest">
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">Loyalty Points</h1>
      </div>

      <Card className="bg-gradient-to-br from-goldfinch-gold to-amber-300 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-medium opacity-90">Current Tier</h2>
              <div className="text-xl font-semibold">{loyaltyData.tier}</div>
            </div>
            <div className="flex items-center gap-2">
              <Coins className="h-6 w-6" />
              <span className="text-2xl font-bold">{loyaltyData.points}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to {loyaltyData.nextTier}</span>
              <span>
                {loyaltyData.points} / {loyaltyData.points + loyaltyData.pointsToNextTier} points
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2 bg-white/30" />
          </div>

          <p className="text-sm mt-4 opacity-90">
            Earn {loyaltyData.pointsToNextTier} more points to reach {loyaltyData.nextTier} tier
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="rewards" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="rewards" className="mt-6">
          <div className="grid gap-4">
            {loyaltyData.rewards.map((reward) => (
              <Card key={reward.id} className="overflow-hidden luxury-shadow">
                <div className="relative h-32">
                  <Image src={reward.image || "/placeholder.svg"} fill alt={reward.title} className="object-cover" />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-goldfinch-gold flex items-center gap-1">
                      <Coins className="h-3 w-3" />
                      {reward.points} points
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium">{reward.title}</h3>
                  <p className="text-sm text-muted-foreground">{reward.description}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    className="w-full bg-goldfinch-gold hover:bg-goldfinch-gold/90"
                    disabled={loyaltyData.points < reward.points}
                  >
                    {loyaltyData.points >= reward.points ? "Redeem Reward" : "Not Enough Points"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <div className="space-y-4">
            {loyaltyData.history.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{item.description}</h3>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                    <div
                      className={`font-medium flex items-center gap-1 ${
                        item.status === "credited" ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {item.status === "credited" ? (
                        <>
                          <CheckCircle2 className="h-4 w-4" />+{item.points}
                        </>
                      ) : (
                        <>
                          <Clock className="h-4 w-4" />
                          {item.points}
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Loading skeleton component
function LoyaltyPageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-8 w-40" />
      </div>

      <Skeleton className="h-[180px] w-full rounded-lg" />

      <div className="space-y-4 mt-6">
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        <div className="grid gap-4 mt-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-32 w-full rounded-t-lg" />
              <Skeleton className="h-6 w-3/4 mx-4" />
              <Skeleton className="h-4 w-5/6 mx-4" />
              <Skeleton className="h-10 w-[calc(100%-32px)] mx-4 mb-4 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
