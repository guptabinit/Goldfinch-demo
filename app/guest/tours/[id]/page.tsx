"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  Clock,
  MapPin,
  Users,
  Calendar,
  CheckCircle2,
  XCircle,
  Star,
  Share2,
  Heart,
  Info,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface TourImage {
  url: string
  alt: string
}

interface TourReview {
  id: string
  name: string
  rating: number
  date: string
  comment: string
  avatar?: string
}

interface TourItineraryItem {
  time: string
  title: string
  description: string
}

interface Tour {
  id: string
  title: string
  description: string
  longDescription: string
  duration: string
  price: number
  rating: number
  reviewCount: number
  location: string
  images: TourImage[]
  category: "hotel" | "city" | "cultural" | "adventure"
  available: boolean
  maxGroupSize: number
  languages: string[]
  inclusions: string[]
  exclusions: string[]
  itinerary: TourItineraryItem[]
  meetingPoint: string
  reviews: TourReview[]
  relatedTours: string[]
}

// Mock data for tours
const toursData: Tour[] = [
  {
    id: "mumbai-city-highlights",
    title: "Mumbai City Highlights",
    description: "Discover the vibrant city of Mumbai with our curated tour covering iconic landmarks.",
    longDescription:
      "Immerse yourself in the vibrant energy of Mumbai, India's city of dreams. This comprehensive tour takes you through the most iconic landmarks and hidden gems of the city. From colonial architecture to bustling markets, experience the perfect blend of history, culture, and modern city life. Our expert guides provide fascinating insights into Mumbai's transformation from a fishing village to a global metropolis. This tour is perfect for first-time visitors wanting to get a complete overview of Mumbai's diverse attractions.",
    duration: "4 hours",
    price: 2500,
    rating: 4.6,
    reviewCount: 124,
    location: "Mumbai",
    images: [
      {
        url: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3",
        alt: "Gateway of India",
      },
      {
        url: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
        alt: "Marine Drive",
      },
      {
        url: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
        alt: "Chhatrapati Shivaji Terminus",
      },
      {
        url: "https://images.unsplash.com/photo-1598434192043-71111c1b3f41?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3",
        alt: "Dhobi Ghat",
      },
      {
        url: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
        alt: "Mumbai Street Scene",
      },
    ],
    category: "city",
    available: true,
    maxGroupSize: 12,
    languages: ["English", "Hindi"],
    inclusions: [
      "Air-conditioned vehicle",
      "Professional guide",
      "Hotel pickup and drop-off",
      "Bottled water",
      "All taxes and service charges",
    ],
    exclusions: ["Meals and drinks", "Entrance fees to optional attractions", "Gratuities"],
    itinerary: [
      {
        time: "9:00 AM",
        title: "Hotel Pickup",
        description: "Our guide will meet you at the hotel lobby for a comfortable start to your tour.",
      },
      {
        time: "9:30 AM",
        title: "Gateway of India & Taj Mahal Palace Hotel",
        description:
          "Visit the iconic Gateway of India and see the historic Taj Mahal Palace Hotel, learning about their historical significance.",
      },
      {
        time: "10:30 AM",
        title: "Marine Drive & Chowpatty Beach",
        description:
          "Drive along the scenic Marine Drive, also known as the 'Queen's Necklace', and stop at Chowpatty Beach.",
      },
      {
        time: "11:30 AM",
        title: "Dhobi Ghat",
        description: "Witness the world's largest open-air laundry where thousands of washermen clean clothes daily.",
      },
      {
        time: "12:30 PM",
        title: "Lunch Break (Optional)",
        description: "Stop for lunch at a recommended local restaurant (cost not included).",
      },
      {
        time: "1:30 PM",
        title: "Chhatrapati Shivaji Terminus",
        description:
          "Visit the UNESCO World Heritage Site, a historic railway station with stunning Victorian Gothic architecture.",
      },
      {
        time: "2:30 PM",
        title: "Return to Hotel",
        description: "Comfortable drop-off at your hotel with recommendations for the rest of your stay.",
      },
    ],
    meetingPoint: "Your hotel lobby or a designated meeting point in South Mumbai",
    reviews: [
      {
        id: "review-1",
        name: "Priya Sharma",
        rating: 5,
        date: "October 15, 2023",
        comment:
          "Excellent tour! Our guide Raj was very knowledgeable and showed us all the important landmarks. The air-conditioned vehicle was very comfortable, which was important in Mumbai's heat.",
        avatar: "https://i.pravatar.cc/150?img=32",
      },
      {
        id: "review-2",
        name: "John Miller",
        rating: 4,
        date: "September 3, 2023",
        comment:
          "Great overview of Mumbai. We saw all the major sights and our guide provided interesting historical context. Would have liked a bit more time at the Gateway of India.",
        avatar: "https://i.pravatar.cc/150?img=53",
      },
      {
        id: "review-3",
        name: "Akshay Patel",
        rating: 5,
        date: "August 22, 2023",
        comment:
          "Born and raised in Mumbai, but took this tour with visiting family. Even I learned new things! Highly recommended for both tourists and locals.",
        avatar: "https://i.pravatar.cc/150?img=68",
      },
    ],
    relatedTours: ["elephanta-caves-excursion", "culinary-walking-tour", "bollywood-studio-experience"],
  },
]

// Mock data for related tours (simplified)
const relatedToursData = [
  {
    id: "mumbai-city-highlights",
    title: "Mumbai City Highlights",
    description: "Discover the vibrant city of Mumbai with our curated tour covering iconic landmarks.",
    duration: "4 hours",
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "city",
  }
]

export default function TourDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [tour, setTour] = useState<Tour | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [bookingDate, setBookingDate] = useState<string>("")
  const [guests, setGuests] = useState<string>("2")
  const [isBooking, setIsBooking] = useState(false)
  const [relatedTours, setRelatedTours] = useState<any[]>([])

  useEffect(() => {
    // Simulate API fetch
    const fetchTour = () => {
      setLoading(true)
      const tourId = params.id as string
      const foundTour = toursData.find((t) => t.id === tourId)

      if (foundTour) {
        setTour(foundTour)
        // Get related tours
        if (foundTour.relatedTours && foundTour.relatedTours.length > 0) {
          const related = foundTour.relatedTours.map((id) => relatedToursData.find((t) => t.id === id)).filter(Boolean)
          setRelatedTours(related)
        }
      }

      setLoading(false)
    }

    fetchTour()
  }, [params.id])

  const handleBookNow = () => {
    setIsBookingOpen(true)
  }

  const handleConfirmBooking = () => {
    setIsBooking(true)
    router.push("/guest/orders/confirmation")

    // Simulate API call
    setTimeout(() => {
      setIsBooking(false)
      setIsBookingOpen(false)

      toast({
        title: "Tour Booked Successfully",
        description: `Your ${tour?.title} has been booked for ${bookingDate}.`,
        variant: "default",
      })

      // Reset form
      setBookingDate("")
      setGuests("2")
    }, 1500)
  }

  if (loading) {
    return (
      <div className="container max-w-6xl py-6 space-y-8">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-muted animate-pulse"></div>
          <div className="h-8 w-48 bg-muted animate-pulse ml-2"></div>
        </div>
        <div className="h-96 w-full bg-muted animate-pulse rounded-xl"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div className="h-10 w-3/4 bg-muted animate-pulse"></div>
            <div className="h-4 w-full bg-muted animate-pulse"></div>
            <div className="h-4 w-full bg-muted animate-pulse"></div>
            <div className="h-4 w-2/3 bg-muted animate-pulse"></div>
          </div>
          <div className="h-64 w-full bg-muted animate-pulse rounded-lg"></div>
        </div>
      </div>
    )
  }

  if (!tour) {
    return (
      <div className="container max-w-6xl py-6 space-y-6">
        <div className="flex items-center">
          <Link href="/guest/tours" className="mr-2">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Tour Not Found</h1>
        </div>
        <div className="flex flex-col items-center justify-center py-12">
          <Info className="h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Tour Not Available</h2>
          <p className="text-muted-foreground mb-6">The tour you're looking for could not be found.</p>
          <Button asChild>
            <Link href="/guest/tours">Browse All Tours</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-6xl py-6 space-y-8">
      <div className="flex items-center">
        <Link href="/guest/tours" className="mr-2">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">{tour.title}</h1>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8 relative rounded-xl overflow-hidden h-[400px]">
          <Image
            src={tour.images[selectedImage].url || "/placeholder.svg"}
            alt={tour.images[selectedImage].alt}
            fill
            className="object-cover"
          />
        </div>
        <div className="md:col-span-4 grid grid-cols-2 gap-4">
          {tour.images.slice(1, 5).map((image, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden h-[120px] cursor-pointer"
              onClick={() => setSelectedImage(index + 1)}
            >
              <Image
                src={image.url || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover hover:opacity-90 transition"
              />
              {index === 3 && tour.images.length > 5 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-medium">
                  +{tour.images.length - 5} more
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tour Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="outline" className="bg-goldfinch-ivory text-goldfinch-brown">
                {tour.category.charAt(0).toUpperCase() + tour.category.slice(1)}
              </Badge>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 text-sm font-medium">{tour.rating}</span>
                <span className="ml-1 text-xs text-muted-foreground">({tour.reviewCount} reviews)</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4">{tour.title}</h2>
            <p className="text-muted-foreground">{tour.longDescription}</p>
          </div>

          <Tabs defaultValue="itinerary">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="itinerary" className="space-y-4 pt-4">
              <h3 className="text-xl font-semibold">Tour Itinerary</h3>
              <div className="space-y-6">
                {tour.itinerary.map((item, index) => (
                  <div key={index} className="relative pl-8 pb-6">
                    {index !== tour.itinerary.length - 1 && (
                      <div className="absolute left-3 top-3 bottom-0 w-0.5 bg-muted"></div>
                    )}
                    <div className="absolute left-0 top-1 h-6 w-6 rounded-full bg-goldfinch-ivory text-goldfinch-brown flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-semibold">{item.title}</h4>
                        <span className="ml-2 text-sm text-muted-foreground">{item.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-muted p-4 rounded-lg mt-4">
                <h4 className="font-medium mb-2">Meeting Point</h4>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                  <p className="text-sm">{tour.meetingPoint}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4 pt-4">
              <h3 className="text-xl font-semibold">Tour Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Duration</h4>
                        <p className="text-sm text-muted-foreground">{tour.duration}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <Users className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Group Size</h4>
                        <p className="text-sm text-muted-foreground">Max {tour.maxGroupSize} people</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Location</h4>
                        <p className="text-sm text-muted-foreground">{tour.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Availability</h4>
                        <p className="text-sm text-muted-foreground">Daily (subject to weather)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-4">
                <h4 className="font-medium mb-2">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {tour.languages.map((language, index) => (
                    <Badge key={index} variant="outline">
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="inclusions" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">What's Included</h3>
                  <ul className="space-y-2">
                    {tour.inclusions.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">What's Not Included</h3>
                  <ul className="space-y-2">
                    {tour.exclusions.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Guest Reviews</h3>
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium">{tour.rating}</span>
                  <span className="text-sm text-muted-foreground ml-1">({tour.reviewCount} reviews)</span>
                </div>
              </div>

              <div className="space-y-4 mt-4">
                {tour.reviews.map((review) => (
                  <div key={review.id} className="border rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                        <Image
                          src={review.avatar || "https://i.pravatar.cc/150"}
                          alt={review.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{review.name}</h4>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm mt-2">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Related Tours */}
          {relatedTours.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">You Might Also Like</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {relatedTours.slice(0, 3).map((relatedTour: any) => (
                  <Card key={relatedTour.id} className="overflow-hidden">
                    <div className="relative h-36">
                      <Image
                        src={relatedTour.image || "/placeholder.svg"}
                        alt={relatedTour.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-medium line-clamp-1">{relatedTour.title}</h4>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          <span>{relatedTour.duration}</span>
                        </div>
                        <span className="text-sm font-medium">₹{relatedTour.price}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-3"
                        onClick={() => router.push(`/guest/tours/${relatedTour.id}`)}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Booking Card */}
        <div className="md:col-span-1">
          <Card className="sticky top-6">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">₹{tour.price}</div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">{tour.rating}</span>
                </div>
              </div>

              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-2" />
                <span>{tour.duration}</span>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm">Free cancellation up to 24 hours before</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm">Mobile tickets accepted</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm">Instant confirmation</span>
                </div>
              </div>

              <Button className="w-full" onClick={handleBookNow}>
                Book Now
              </Button>

            </CardContent>
          </Card>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Book Tour</DialogTitle>
            <DialogDescription>Complete the details below to book your tour.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="flex items-start space-x-4">
              <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                <Image src={tour.images[0].url || "/placeholder.svg"} alt={tour.title} fill className="object-cover" />
              </div>
              <div>
                <h3 className="font-medium">{tour.title}</h3>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  <span>{tour.duration}</span>
                </div>
                <div className="text-sm font-medium mt-1">₹{tour.price}</div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">Select Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guests">Number of Guests</Label>
                <Select value={guests} onValueChange={setGuests}>
                  <SelectTrigger id="guests">
                    <SelectValue placeholder="Select number of guests" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Guest</SelectItem>
                    <SelectItem value="2">2 Guests</SelectItem>
                    <SelectItem value="3">3 Guests</SelectItem>
                    <SelectItem value="4">4 Guests</SelectItem>
                    <SelectItem value="5">5 Guests</SelectItem>
                    <SelectItem value="6">6+ Guests (Group)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-muted p-3 rounded-md space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Tour Price</span>
                  <span>
                    ₹{tour.price} × {guests} {Number.parseInt(guests) === 1 ? "person" : "people"}
                  </span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>₹{tour.price * Number.parseInt(guests)}</span>
                </div>
                <p className="text-xs text-muted-foreground">This amount will be charged to your room.</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBookingOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmBooking} disabled={!bookingDate || isBooking}>
              {isBooking ? "Processing..." : "Confirm Booking"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {children}
    </label>
  )
}
