"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, Users, CheckCircle, ChevronLeft, ChevronRight, Wifi, Monitor, Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

// Gallery images for Senate Hall
const galleryImages = [
  "https://www.ohotelsindia.com/pune/images/fc9a284bf66232c0bc022ec809b46384.jpg",
  "https://v1.nitj.ac.in/cce/Images/Conference_Hall_NITJ_1.jpg",
  "https://www.rhodeshouse.ox.ac.uk/media2/mhrcilg1/convening-hall-with-delegates.jpg?rxy=0.49874686716791977,0.4323626115547205&width=1900&height=700&format=jpg&v=1dbaa063813a9a0",
  "https://www.wework.com/ideas/wp-content/uploads/sites/4/2021/08/20201008-199WaterSt-2_fb.jpg?fit=1200%2C675",
]

export default function SenateHallPage() {
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
          Senate Conference Hall
        </h1>
        <p className="text-goldfinch-brown/80 text-lg">
          Sophisticated space for executive meetings and corporate events
        </p>
      </div>

      {/* Hero Gallery */}
      <div className="relative rounded-xl overflow-hidden h-[300px] md:h-[500px] mb-8">
        <Image
          src={galleryImages[currentImageIndex] || "/placeholder.svg"}
          alt="Senate Conference Hall"
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
                The Senate Conference Hall embodies professional elegance with its sophisticated design and
                state-of-the-art business facilities. This versatile space is ideal for corporate meetings, conferences,
                training sessions, and executive gatherings that demand both functionality and style.
              </p>
              <p>
                Featuring rich wood paneling, ergonomic seating, and advanced presentation technology, the Senate Hall
                creates an environment conducive to productivity and collaboration. Natural light floods the space
                through floor-to-ceiling windows that can be easily darkened for presentations.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-goldfinch-brown" />
                  <span>Capacity: 120 seated</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-goldfinch-brown" />
                  <span>Business hours access</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-goldfinch-brown" />
                  <span>Available all year</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="amenities" className="space-y-4">
              <h3 className="text-xl font-medium mb-4">Business Amenities</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "4K projection system with dual screens",
                  "Video conferencing capabilities",
                  "High-speed fiber internet (1 Gbps)",
                  "Integrated sound system with wireless microphones",
                  "Interactive smart boards",
                  "Ergonomic executive seating",
                  "Individual power outlets at each seat",
                  "Adjustable lighting with presets",
                  "Soundproof walls for privacy",
                  "Digital room booking system",
                  "Executive catering services",
                  "Dedicated IT support",
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
                  <Image
                    src="/senate-hall-floorplan.png"
                    alt="Senate Hall Floor Plan"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium">Boardroom Style</h4>
                    <p>Capacity: 40 guests</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium">Theater Style</h4>
                    <p>Capacity: 120 guests</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium">Classroom Style</h4>
                    <p>Capacity: 80 guests</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium">U-Shape</h4>
                    <p>Capacity: 35 guests</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium">Hollow Square</h4>
                    <p>Capacity: 48 guests</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium">Banquet Style</h4>
                    <p>Capacity: 80 guests</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="packages">
              <div className="space-y-6">
                <h3 className="text-xl font-medium mb-4">Business Packages</h3>

                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-medium text-goldfinch-brown mb-2">Executive Conference Package</h4>
                    <p className="mb-4">Our premium full-day conference solution includes:</p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>Full-day access to Senate Hall (8 hours)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>Executive breakfast, lunch, and afternoon tea</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>Complete AV setup with technical assistance</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>Conference stationery and materials</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>Dedicated conference coordinator</span>
                      </li>
                    </ul>
                    <p className="font-medium">₹2,25,000 for up to 50 attendees</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-medium text-goldfinch-brown mb-2">Half-Day Meeting Package</h4>
                    <p className="mb-4">Efficient solution for shorter business gatherings:</p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>4-hour access to Senate Hall</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>One meal service (breakfast or lunch)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>Coffee, tea, and refreshments</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>Standard AV setup</span>
                      </li>
                    </ul>
                    <p className="font-medium">₹1,25,000 for up to 50 attendees</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-medium text-goldfinch-brown mb-2">Multi-Day Corporate Retreat</h4>
                    <p className="mb-4">Comprehensive package for extended business events:</p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>2-3 day access to Senate Hall</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>All meals and refreshments included</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>Evening networking reception</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>Premium AV and presentation support</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-goldfinch-brown shrink-0 mt-0.5" />
                        <span>Discounted accommodation rates</span>
                      </li>
                    </ul>
                    <p className="font-medium">Starting at ₹5,00,000 for up to 40 attendees</p>
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
                  <label htmlFor="company" className="block text-sm font-medium mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="w-full p-2 border border-goldfinch-brown/20 rounded-md focus:outline-none focus:ring-2 focus:ring-goldfinch-brown/50"
                    placeholder="Your company"
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
                    <option value="meeting">Board Meeting</option>
                    <option value="conference">Conference</option>
                    <option value="training">Training Session</option>
                    <option value="presentation">Product Presentation</option>
                    <option value="workshop">Workshop</option>
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
                  <label htmlFor="duration" className="block text-sm font-medium mb-1">
                    Duration
                  </label>
                  <select
                    id="duration"
                    className="w-full p-2 border border-goldfinch-brown/20 rounded-md focus:outline-none focus:ring-2 focus:ring-goldfinch-brown/50"
                    required
                  >
                    <option value="">Select duration</option>
                    <option value="half-day">Half Day (4 hours)</option>
                    <option value="full-day">Full Day (8 hours)</option>
                    <option value="two-days">2 Days</option>
                    <option value="three-days">3 Days</option>
                    <option value="custom">Custom Duration</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="guests" className="block text-sm font-medium mb-1">
                    Expected Number of Attendees
                  </label>
                  <input
                    type="number"
                    id="guests"
                    className="w-full p-2 border border-goldfinch-brown/20 rounded-md focus:outline-none focus:ring-2 focus:ring-goldfinch-brown/50"
                    placeholder="50"
                    min="1"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Additional Requirements
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full p-2 border border-goldfinch-brown/20 rounded-md focus:outline-none focus:ring-2 focus:ring-goldfinch-brown/50"
                    placeholder="Please share any specific technical or catering requirements"
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
                  <p className="font-medium">Email: corporate@goldfinch.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-serif font-medium text-goldfinch-brown mb-6">Business Amenities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-goldfinch-ivory rounded-full">
                  <Wifi className="h-8 w-8 text-goldfinch-brown" />
                </div>
                <h3 className="text-xl font-medium mb-2">High-Speed Connectivity</h3>
                <p>
                  Dedicated 1 Gbps fiber internet connection with secure VPN access and multiple wireless access points
                  for seamless connectivity.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-goldfinch-ivory rounded-full">
                  <Monitor className="h-8 w-8 text-goldfinch-brown" />
                </div>
                <h3 className="text-xl font-medium mb-2">Advanced Presentation</h3>
                <p>
                  4K projection systems, interactive smart boards, and wireless presentation capabilities with support
                  for all major devices and platforms.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-goldfinch-ivory rounded-full">
                  <Coffee className="h-8 w-8 text-goldfinch-brown" />
                </div>
                <h3 className="text-xl font-medium mb-2">Executive Catering</h3>
                <p>
                  Customizable business catering options from our award-winning kitchen, including dietary
                  accommodations and premium coffee service.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-serif font-medium text-goldfinch-brown mb-6">Client Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Vikram Mehta",
              position: "CEO, Nexus Technologies",
              quote:
                "The Senate Hall provided the perfect professional environment for our quarterly board meeting. The technology was flawless and the service impeccable.",
            },
            {
              name: "Infosys Leadership Team",
              position: "Annual Strategy Session",
              quote:
                "We've hosted our annual strategy sessions at the Senate Hall for three consecutive years. The facilities and support staff consistently exceed our expectations.",
            },
            {
              name: "Dr. Anjali Sharma",
              position: "Conference Organizer, Medical Association of India",
              quote:
                "Our medical conference required specific technical setups and the Senate Hall team delivered perfectly. The space is versatile and the staff highly professional.",
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
                    <p className="text-sm text-goldfinch-brown/70">{testimonial.position}</p>
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
