"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, MapPin, Clock, Star, Filter, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface Tour {
  id: string
  title: string
  description: string
  duration: string
  price: number
  rating: number
  location: string
  image: string
  category: "hotel" | "city" | "cultural" | "adventure"
  available: boolean
}

export default function ToursPage() {
  const [activeTab, setActiveTab] = useState("all")

  const tours: Tour[] = [
    {
      id: "mumbai-city-highlights",
      title: "Mumbai City Highlights",
      description:
        "Discover the vibrant city of Mumbai with our curated tour covering iconic landmarks including Gateway of India, Marine Drive, and Dhobi Ghat.",
      duration: "4 hours",
      price: 2500,
      rating: 4.6,
      location: "Mumbai",
      image:
        "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3",
      category: "city",
      available: true,
    }
  ]

  const filteredTours = activeTab === "all" ? tours : tours.filter((tour) => tour.category === activeTab)

  return (
    <div className="container max-w-6xl py-6 space-y-6">
      <div className="flex items-center">
        <Link href="/guest" className="mr-2">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Tours & Experiences</h1>
      </div>

      <div className="relative rounded-xl overflow-hidden h-64 md:h-80">
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Tours and Experiences"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
          <h2 className="text-2xl md:text-3xl font-bold">Discover Mumbai & Beyond</h2>
          <p className="text-sm md:text-base mt-2 max-w-2xl">
            Explore the vibrant culture, rich history, and breathtaking sights with our curated tours and experiences.
          </p>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Tours</TabsTrigger>
            <TabsTrigger value="hotel">Hotel</TabsTrigger>
            <TabsTrigger value="city">City</TabsTrigger>
            <TabsTrigger value="cultural">Cultural</TabsTrigger>
            <TabsTrigger value="adventure">Adventure</TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTours.map((tour) => (
              <Link
                href={`/guest/tours/${tour.id}`}
                key={tour.id}
                className={`block transition-opacity ${!tour.available ? "opacity-70 pointer-events-none" : "hover:opacity-95"}`}
              >
                <Card className="overflow-hidden h-full flex flex-col">
                  <div className="relative h-48">
                    <Image src={tour.image || "/placeholder.svg"} alt={tour.title} fill className="object-cover" />
                    {tour.category === "hotel" && (
                      <Badge className="absolute top-2 right-2 bg-goldfinch-ivory text-goldfinch-brown">
                        Complimentary
                      </Badge>
                    )}
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{tour.title}</CardTitle>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{tour.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      <span>{tour.location}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3 flex-grow">
                    <p className="text-sm text-muted-foreground line-clamp-2">{tour.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{tour.duration}</span>
                      </div>
                      <div className="font-medium">{tour.price === 0 ? "Free" : `₹${tour.price}`}</div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" disabled={!tour.available}>
                      {tour.available ? (
                        <>
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      ) : (
                        "Currently Unavailable"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
