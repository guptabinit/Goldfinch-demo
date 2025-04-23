"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, Users, CheckCircle, ChevronLeft, ChevronRight, Umbrella, Music, Cloud } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

// Gallery images for Rooftop Venue
const galleryImages = ["https://www.tagvenue.com/images/location-pages/1920x1080/346.jpg", "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/62/df/d6/its-6-30-pm.jpg?w=900&h=-1&s=1", "https://marrymetampabay.com/wp-content/uploads/2022/03/21Romantic-Boho-Downtown-St-Pete-Rooftop-Wedding-Red-Mesa-Events.jpg", "https://images.squarespace-cdn.com/content/v1/571898482b8dde43af06c296/1548103234219-AAGZ2FVATJY1UR8Q1MDI/roof+top+chill-min-min.jpg"]

export default function RooftopVenuePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { toast } = useToast()

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const handleInquiry = () => {
    toast({
      title: "Inquiry Submitted",
      description: "Our banquet team will contact you shortly.",
    })
    
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/guest/banquets"
          className="flex items-center text-goldfinch-brown hover:text-goldfinch-brown/80 mb-4"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to All Banquet Halls
        </Link>
        <h1 className="text-3xl md:text-4xl font-serif font-medium text-goldfinch-brown mb-2">Rooftop Venue</h1>
        <p className="text-goldfinch-brown/80 text-lg">
          Breathtaking panoramic views of Mumbai's skyline for unforgettable events
        </p>
      </div>

      {/* Hero Gallery */}
      <div className="relative rounded-xl overflow-hidden h-[300px] md:h-[500px] mb-8">
        <Image
          src={galleryImages[currentImageIndex] || "/placeholder.svg"}
          alt="Rooftop Venue"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>

        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6 text-goldfinch-brown" />
        </button>

        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6 text-goldfinch-brown" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="packages">Packages</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <p>
                Perched atop the Goldfinch Hotel, our Rooftop Venue offers a stunning open-air setting with panoramic
                views of Mumbai's skyline. This versatile space transforms from a serene daytime venue to a magical
                nighttime setting as the city lights create a breathtaking backdrop.
              </p>
              <p>
                The venue features contemporary design elements with lush greenery, ambient lighting, and flexible
                layouts to accommodate various event styles. Whether you're planning an intimate wedding ceremony, a
                cocktail reception, or a corporate gathering, our rooftop creates an unforgettable atmosphere that
                elevates any occasion.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-goldfinch-brown" />
                  <span>Capacity: 150 guests</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-goldfinch-brown" />
                  <span>Available 10 AM - 11 PM</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-goldfinch-brown" />
                  <span>Weather dependent</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="amenities" className="space-y-4">
              <h3 className="text-xl font-medium mb-4">Rooftop Amenities</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Panoramic city views",
                  "Retractable canopy for weather protection",
                  "Ambient lighting system",
                  "Outdoor sound system",
                  "Dedicated bar area",
                  "Lounge seating options",
                  "Portable heating for cooler evenings",
                  "Decorative planters and greenery",
                  "Private elevator access",
                  "Restroom facilities",
                  "Catering service area",
                  "Flexible furniture arrangements",
                ].map((amenity, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="floorplan">
              <div className="bg-goldfinch-ivory p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-4">Floor Plan & Layout Options</h3>
                <div className="aspect-video relative bg-white rounded-lg overflow-hidden mb-4">
                  <Image src="/rooftop-floorplan.png" alt="Rooftop Venue Floor Plan" fill className="object-contain" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium">Cocktail Reception</h4>
                    <p>Capacity: 150 guests</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium">Seated Dinner</h4>
                    <p>Capacity: 100 guests</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium">Wedding Ceremony</h4>
                    <p>Capacity: 120 guests</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium">Theater Style</h4>
                    <p>Capacity: 130 guests</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium">Lounge Setup</h4>
                    <p>Capacity: 80 guests</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium">Mixed Arrangement</h4>
                    <p>Capacity: 120 guests</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="packages">
              <div className="space-y-6">
                <h3 className="text-xl font-medium mb-4">Rooftop Event Packages</h3>

                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-medium text-goldfinch-brown mb-2">Sunset Wedding Package</h4>
                    <p className="mb-4">A magical setting for your special day:</p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>6-hour exclusive rooftop access</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>Ceremony setup with floral decorations</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>Cocktail reception and dinner service</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>Dedicated wedding coordinator</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>Ambient lighting and sound system</span>
                      </li>
                    </ul>
                    <p className="font-medium">Starting at ₹4,50,000 for up to 80 guests</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-medium text-goldfinch-brown mb-2">Cocktail Reception Package</h4>
                    <p className="mb-4">Perfect for social gatherings and celebrations:</p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>4-hour rooftop access</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>Premium bar service with signature cocktails</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>Gourmet canapés and appetizers</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>Lounge seating arrangement</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>Background music or DJ services</span>
                      </li>
                    </ul>
                    <p className="font-medium">Starting at ₹3,25,000 for up to 100 guests</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-medium text-goldfinch-brown mb-2">Corporate Networking Package</h4>
                    <p className="mb-4">Impressive setting for business gatherings:</p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>3-hour rooftop access</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>Welcome drinks and premium beverages</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>Executive catering with international cuisine</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>Flexible seating and networking spaces</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>Branding opportunities</span>
                      </li>
                    </ul>
                    <p className="font-medium">Starting at ₹2,75,000 for up to 80 guests</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <h3 className="text-xl font-medium mb-4 text-goldfinch-brown">Request Information</h3>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault()
                  handleInquiry()
                }}
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-2 border border-goldfinch-brown/20 rounded-md focus:outline-none focus:ring-2 focus:ring-goldfinch-brown/50"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-2 border border-goldfinch-brown/20 rounded-md focus:outline-none focus:ring-2 focus:ring-goldfinch-brown/50"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full p-2 border border-goldfinch-brown/20 rounded-md focus:outline-none focus:ring-2 focus:ring-goldfinch-brown/50"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label htmlFor="eventType" className="block text-sm font-medium mb-1">
                    Event Type
                  </label>
                  <select
                    id="eventType"
                    className="w-full p-2 border border-goldfinch-brown/20 rounded-md focus:outline-none focus:ring-2 focus:ring-goldfinch-brown/50"
                    required
                  >
                    <option value="">Select event type</option>
                    <option value="wedding">Wedding Ceremony</option>
                    <option value="reception">Wedding Reception</option>
                    <option value="birthday">Birthday Celebration</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="cocktail">Cocktail Party</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-medium mb-1">
                    Tentative Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="w-full p-2 border border-goldfinch-brown/20 rounded-md focus:outline-none focus:ring-2 focus:ring-goldfinch-brown/50"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-medium mb-1">
                    Preferred Time
                  </label>
                  <select
                    id="time"
                    className="w-full p-2 border border-goldfinch-brown/20 rounded-md focus:outline-none focus:ring-2 focus:ring-goldfinch-brown/50"
                    required
                  >
                    <option value="">Select time</option>
                    <option value="morning">Morning (10 AM - 1 PM)</option>
                    <option value="afternoon">Afternoon (1 PM - 4 PM)</option>
                    <option value="evening">Evening (4 PM - 7 PM)</option>
                    <option value="night">Night (7 PM - 11 PM)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="guests" className="block text-sm font-medium mb-1">
                    Expected Number of Guests
                  </label>
                  <input
                    type="number"
                    id="guests"
                    className="w-full p-2 border border-goldfinch-brown/20 rounded-md focus:outline-none focus:ring-2 focus:ring-goldfinch-brown/50"
                    placeholder="80"
                    min="1"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Additional Information
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full p-2 border border-goldfinch-brown/20 rounded-md focus:outline-none focus:ring-2 focus:ring-goldfinch-brown/50"
                    placeholder="Please share any specific requirements or questions"
                  ></textarea>
                </div>

                <Button
  type="submit"
  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-white font-serif text-lg font-semibold tracking-wide shadow-md hover:brightness-110 transition duration-300 ease-in-out rounded-md"
>
  Submit Inquiry
</Button>

              </form>

              <div className="mt-6 pt-6 border-t border-goldfinch-brown/10">
                <p className="text-sm text-goldfinch-brown/70 mb-4">For immediate assistance:</p>
                <div className="flex items-center mb-2">
                  <p className="font-medium">Call: +91 22 6735 1234</p>
                </div>
                <div className="flex items-center">
                  <p className="font-medium">Email: events@goldfinch.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-serif font-medium text-goldfinch-brown mb-6">Rooftop Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-goldfinch-ivory rounded-full">
                  <Umbrella className="h-8 w-8 text-goldfinch-brown" />
                </div>
                <h3 className="text-xl font-medium mb-2">Weather Protection</h3>
                <p>
                  Our retractable canopy system provides protection from unexpected weather changes while maintaining
                  the open-air ambiance.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-goldfinch-ivory rounded-full">
                  <Music className="h-8 w-8 text-goldfinch-brown" />
                </div>
                <h3 className="text-xl font-medium mb-2">Ambient Entertainment</h3>
                <p>
                  Sophisticated sound system with zoned controls allows for perfect background music or dance floor
                  energy.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-goldfinch-ivory rounded-full">
                  <Cloud className="h-8 w-8 text-goldfinch-brown" />
                </div>
                <h3 className="text-xl font-medium mb-2">Panoramic Views</h3>
                <p>
                  Breathtaking 360° views of Mumbai's skyline create a stunning backdrop for photos and an unforgettable
                  atmosphere.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-serif font-medium text-goldfinch-brown mb-6">Guest Experiences</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Aisha & Rohan",
              event: "Engagement Celebration",
              quote:
                "Our sunset engagement party at the Rooftop Venue was magical. The city lights coming on as evening fell created the perfect romantic atmosphere.",
            },
            {
              name: "Reliance Digital",
              event: "Product Launch",
              quote:
                "We chose the rooftop for our product launch to create a memorable impression. The unique setting and views helped make our event a standout success.",
            },
            {
              name: "Kapoor Family",
              event: "60th Birthday Celebration",
              quote:
                "The rooftop team helped us create a sophisticated birthday celebration with incredible attention to detail. The views were the perfect conversation starter.",
            },
          ].map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="mb-4 text-goldfinch-brown">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.6 4H4V12.4L8.8 20H13.6L8.8 12.4H11.6V4Z" fill="currentColor" />
                      <path d="M22.4 4H14.8V12.4L19.6 20H24.4L19.6 12.4H22.4V4Z" fill="currentColor" />
                    </svg>
                  </div>
                  <p className="italic mb-4 flex-grow">{testimonial.quote}</p>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-goldfinch-brown/70">{testimonial.event}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-serif font-medium text-goldfinch-brown mb-6">Explore Our Other Venues</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/guest/banquets/silver-bills" className="group">
            <div className="relative h-64 rounded-xl overflow-hidden">
              <Image
                src="/silver-bills-banquet.png"
                alt="Silver Bills Banquet Hall"
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-xl font-medium text-white mb-1">Silver Bills Banquet Hall</h3>
                <p className="text-white/90">Elegant space for grand celebrations</p>
              </div>
            </div>
          </Link>

          <Link href="/guest/banquets/senate-hall" className="group">
            <div className="relative h-64 rounded-xl overflow-hidden">
              <Image
                src="/senate-conference-hall.png"
                alt="Senate Conference Hall"
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-xl font-medium text-white mb-1">Senate Conference Hall</h3>
                <p className="text-white/90">Perfect for business meetings and conferences</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
