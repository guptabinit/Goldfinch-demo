"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, Users, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

// Gallery images for Silver Bills
const galleryImages = [
  "https://images.unsplash.com/photo-1495578999932-3bdbc2d35028?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1656774339672-23c999d5d5a9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1644174547761-de211415598e?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1663486767145-14e553aa8a9e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
]

export default function SilverBillsBanquetPage() {
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
        <h1 className="text-3xl md:text-4xl font-serif font-medium text-goldfinch-brown mb-2">
          Silver Bills Banquet Hall
        </h1>
        <p className="text-goldfinch-brown/80 text-lg">
          Our most elegant and spacious banquet hall for grand celebrations
        </p>
      </div>

      {/* Hero Gallery */}
      <div className="relative rounded-xl overflow-hidden h-[300px] md:h-[500px] mb-8">
        <Image
          src={galleryImages[currentImageIndex] || "/placeholder.svg"}
          alt="Silver Bills Banquet Hall"
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
                Silver Bills is our crown jewel banquet hall, designed to host the most prestigious events with
                unparalleled elegance. With soaring ceilings adorned with crystal chandeliers, intricate woodwork, and a
                neutral palette that complements any event theme, this venue creates a sophisticated backdrop for
                weddings, galas, and corporate events.
              </p>
              <p>
                The hall opens onto a private garden terrace, offering guests a seamless indoor-outdoor experience. Our
                dedicated event planning team ensures every detail is executed flawlessly, from custom menu creation to
                personalized décor arrangements.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-goldfinch-brown" />
                  <span>Capacity: 350 seated</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-goldfinch-brown" />
                  <span>24-hour access</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-goldfinch-brown" />
                  <span>Available all year</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="amenities" className="space-y-4">
              <h3 className="text-xl font-medium mb-4">Premium Amenities</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "State-of-the-art audiovisual equipment",
                  "Dedicated event coordinator",
                  "Custom lighting system with programmable scenes",
                  "Private entrance and reception area",
                  "Bridal/VIP suite with private facilities",
                  "High-speed Wi-Fi and streaming capabilities",
                  "In-house catering with customizable menus",
                  "Premium bar service options",
                  "Valet parking service",
                  "Integrated sound system",
                  "Climate-controlled environment",
                  "Wheelchair accessible",
                ].map((amenity, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="packages">
              <div className="space-y-6">
                <h3 className="text-xl font-medium mb-4">Event Packages</h3>

                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-medium text-goldfinch-brown mb-2">Platinum Wedding Package</h4>
                    <p className="mb-4">Our most comprehensive wedding package includes:</p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>Exclusive use of Silver Bills Banquet Hall for 12 hours</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>5-course gourmet dinner with premium wine pairing</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>Dedicated wedding coordinator and service staff</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>Luxury bridal suite with champagne service</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>Custom lighting and décor setup</span>
                      </li>
                    </ul>
                    <p className="font-medium">Starting at ₹8,50,000 for 200 guests</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-medium text-goldfinch-brown mb-2">Corporate Excellence Package</h4>
                    <p className="mb-4">Perfect for conferences, product launches, and corporate galas:</p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>Full-day venue access with flexible setup options</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>Premium AV equipment with technical support</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>Executive catering with coffee breaks and lunch</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>Dedicated event manager and support staff</span>
                      </li>
                    </ul>
                    <p className="font-medium">Starting at ₹5,50,000 for 150 guests</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-medium text-goldfinch-brown mb-2">Cultural Celebration Package</h4>
                    <p className="mb-4">Designed for cultural events, performances, and celebrations:</p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>Flexible stage setup with professional lighting</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>Customizable catering options for diverse cuisines</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>Green room facilities for performers</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>Custom décor and seating arrangements</span>
                      </li>
                    </ul>
                    <p className="font-medium">Starting at ₹6,25,000 for 250 guests</p>
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
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="birthday">Birthday Celebration</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="conference">Conference</option>
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
                  <label htmlFor="guests" className="block text-sm font-medium mb-1">
                    Expected Number of Guests
                  </label>
                  <input
                    type="number"
                    id="guests"
                    className="w-full p-2 border border-goldfinch-brown/20 rounded-md focus:outline-none focus:ring-2 focus:ring-goldfinch-brown/50"
                    placeholder="100"
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
                  <p className="font-medium">Email: banquets@goldfinch.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-serif font-medium text-goldfinch-brown mb-6">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Priya & Rahul Sharma",
              event: "Wedding Reception",
              quote:
                "Our wedding at Silver Bills was nothing short of magical. The staff's attention to detail and the elegant ambiance created memories we'll cherish forever.",
            },
            {
              name: "Tata Consultancy Services",
              event: "Annual Leadership Conference",
              quote:
                "The perfect venue for our corporate event. The audiovisual capabilities and flexible space allowed us to create exactly the professional environment we needed.",
            },
            {
              name: "Mehra Family",
              event: "50th Anniversary Celebration",
              quote:
                "We celebrated our parents' 50th anniversary at Silver Bills and were impressed by the impeccable service and beautiful setting. Our guests are still talking about it!",
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

          <Link href="/guest/banquets/rooftop-venue" className="group">
            <div className="relative h-64 rounded-xl overflow-hidden">
              <Image
                src="/rooftop-venue.png"
                alt="Rooftop Venue"
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-xl font-medium text-white mb-1">Rooftop Venue</h3>
                <p className="text-white/90">Stunning views for memorable celebrations</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
