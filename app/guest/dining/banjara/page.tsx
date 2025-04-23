"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Clock, Calendar, Users, Phone, Star, MapPin, MenuIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/i18n/language-context"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export default function BanjaraRestaurantPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")
  const [reservationDate, setReservationDate] = useState("")
  const [reservationTime, setReservationTime] = useState("")
  const [guests, setGuests] = useState("2")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const menuCategories = [
    { id: "starters", name: "Starters" },
    { id: "main-course", name: "Main Course" },
  ]

  const menuItems = [
    {
      id: "paneer-tikka",
      name: "Paneer Tikka",
      description: "Cottage cheese marinated in yogurt and spices, grilled to perfection",
      price: 350,
      category: "starters",
      image: "https://t3.ftcdn.net/jpg/09/81/26/94/360_F_981269480_IPRBYhb0s0gaTSQI295xnirlHg0cOuMK.jpg",
      isVegetarian: true,
      isSpicy: true,
    },
    {
      id: "chicken-tikka",
      name: "Chicken Tikka",
      description: "Tender chicken pieces marinated in spices and yogurt, grilled in tandoor",
      price: 420,
      category: "starters",
      image: "https://www.shutterstock.com/image-photo/deliciously-spiced-chicken-tikka-kabab-600nw-2495838045.jpg",
      isVegetarian: false,
      isSpicy: true,
    },
    {
      id: "butter-chicken",
      name: "Butter Chicken",
      description: "Tender chicken in a rich tomato and butter gravy",
      price: 550,
      category: "main-course",
      image: "https://media.istockphoto.com/id/1170729895/photo/indian-butter-chicken-horizontal-photo.jpg?s=612x612&w=0&k=20&c=4bZViynoVnP1HaWHIY1k5FvW-dj9DM2EOMHbKnAqYZ4=",
      isVegetarian: false,
      isSpicy: false,
      isPopular: true,
    },
    {
      id: "dal-makhani",
      name: "Dal Makhani",
      description: "Black lentils slow-cooked with butter and cream",
      price: 380,
      category: "main-course",
      image: "https://media.istockphoto.com/id/1170374719/photo/dal-makhani-at-dark-background.jpg?s=612x612&w=0&k=20&c=49yLaUAE2apakVk2AAiRQimZd98WtSjIQ0hzCzWsmns=",
      isVegetarian: true,
      isPopular: true,
    },
  ]

  const router = useRouter()

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    router.push("/guest/orders/confirmation")
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Reservation Confirmed",
        description: `Your table for ${guests} on ${reservationDate} at ${reservationTime} has been reserved.`,
      })
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/guest">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/guest/dining">Dining</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/guest/dining/banjara">Banjara Restaurant</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/guest/dining">
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">Banjara Restaurant</h1>
      </div>

      <section className="relative rounded-xl overflow-hidden h-64 md:h-80">
        <Image src="https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D" fill alt="Banjara Restaurant" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-goldfinch-gold">Multi-Cuisine</Badge>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-white text-white" />
              <span className="text-white text-sm">4.8</span>
            </div>
          </div>
          <h1 className="text-white text-2xl md:text-3xl font-semibold">Banjara Restaurant</h1>
          <p className="text-white/90 text-sm md:text-base">Indian, Chinese, Mediterranean Cuisines</p>
        </div>
      </section>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start overflow-auto py-1 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="menu">Menu</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-0">
              <div className="prose max-w-none">
                <p>
                  Banjara, our multi-cuisine restaurant, offers a delightful culinary journey through Indian, Chinese,
                  and Mediterranean cuisines. With an emphasis on authentic flavors and premium ingredients, our chefs
                  create dishes that tantalize your taste buds.
                </p>
                <p>
                  The restaurant features a relaxing ambience with elegant décor, making it perfect for both casual
                  dining and special occasions. Our extensive wine selection complements the diverse menu, enhancing
                  your dining experience.
                </p>
                <p>
                  Traditional Indian dishes are our specialty, with a focus on rich, aromatic flavors that showcase the
                  diverse culinary heritage of India. From tandoor specialties to regional delicacies, every dish is
                  prepared with passion and precision.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-goldfinch-gold" />
                  <div>
                    <h3 className="font-medium">Opening Hours</h3>
                    <p className="text-sm text-muted-foreground">7:00 AM - 11:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-goldfinch-gold" />
                  <div>
                    <h3 className="font-medium">Reservations</h3>
                    <p className="text-sm text-muted-foreground">+91 22 1234 5678</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-goldfinch-gold" />
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-sm text-muted-foreground">Ground Floor, Goldfinch Hotel</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-goldfinch-gold" />
                  <div>
                    <h3 className="font-medium">Seating</h3>
                    <p className="text-sm text-muted-foreground">120 guests</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="menu" className="mt-0">
              <div className="flex overflow-x-auto gap-4 pb-2 mb-4">
                {menuCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant="outline"
                    className="border-goldfinch-gold/20 text-goldfinch-gold hover:bg-goldfinch-gold/10 whitespace-nowrap"
                    onClick={() => {
                      const element = document.getElementById(category.id)
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" })
                      }
                    }}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>

              <div className="space-y-8">
                {menuCategories.map((category) => (
                  <div key={category.id} id={category.id}>
                    <h3 className="text-xl font-semibold mb-4">{category.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {menuItems
                        .filter((item) => item.category === category.id)
                        .map((item) => (
                          <Card key={item.id} className="overflow-hidden luxury-shadow">
                            <div className="flex">
                              <div className="relative w-1/3 h-32">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  fill
                                  alt={item.name}
                                  className="object-cover"
                                />
                              </div>
                              <CardContent className="p-4 w-2/3">
                                <div className="flex justify-between items-start mb-1">
                                  <div>
                                    <h4 className="font-medium">{item.name}</h4>
                                    <div className="flex gap-2 mb-1">
                                      {item.isVegetarian && (
                                        <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
                                          Veg
                                        </Badge>
                                      )}
                                      {item.isSpicy && (
                                        <Badge variant="outline" className="text-red-500 border-red-500 text-xs">
                                          Spicy
                                        </Badge>
                                      )}
                                      {item.isPopular && (
                                        <Badge
                                          variant="outline"
                                          className="text-goldfinch-gold border-goldfinch-gold text-xs"
                                        >
                                          Popular
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                  <span className="text-goldfinch-gold font-medium">₹{item.price}</span>
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                              </CardContent>
                            </div>
                          </Card>
                        ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-goldfinch-gold hover:bg-goldfinch-gold/90 gap-2">
                      <MenuIcon className="h-4 w-4" />
                      View Full Menu
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Banjara Restaurant - Full Menu</DialogTitle>
                      <DialogDescription>Explore our complete selection of dishes</DialogDescription>
                    </DialogHeader>
                    <div className="max-h-[70vh] overflow-y-auto p-4">
                      {/* Full menu content would go here */}
                      <p>Full menu PDF or detailed listing would be displayed here</p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </TabsContent>

            <TabsContent value="photos" className="mt-0">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="relative aspect-square rounded-md overflow-hidden">
                    <Image
                      src={`https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?cs=srgb&dl=pexels-chanwalrus-941861.jpg&fm=jpg`}
                      fill
                      alt={`Banjara Restaurant Gallery`}
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="relative aspect-square rounded-md overflow-hidden">
                    <Image
                      src={`https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D`}
                      fill
                      alt={`Banjara Restaurant Gallery`}
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="relative aspect-square rounded-md overflow-hidden">
                    <Image
                      src={`https://images.unsplash.com/photo-1414235077428-338989a2e8c0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmluZSUyMGRpbmluZ3xlbnwwfHwwfHx8MA%3D%3D`}
                      fill
                      alt={`Banjara Restaurant Gallery`}
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-0">
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="luxury-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-goldfinch-gold/20 h-10 w-10 flex items-center justify-center">
                            <span className="text-goldfinch-gold font-medium">
                              {i === 1 ? "JD" : i === 2 ? "SM" : "AP"}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-medium">
                              {i === 1 ? "John Doe" : i === 2 ? "Sarah Miller" : "Amit Patel"}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {i === 1 ? "Mumbai, India" : i === 2 ? "London, UK" : "Delhi, India"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                (i === 1 && star <= 5) || (i === 2 && star <= 4) || (i === 3 && star <= 5)
                                  ? "fill-goldfinch-gold text-goldfinch-gold"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground">
                        {i === 1
                          ? "Exceptional dining experience! The butter chicken was the best I've ever had, and the service was impeccable. Highly recommend for anyone visiting Mumbai."
                          : i === 2
                            ? "Great food and ambiance. The flavors were authentic and the staff was very attentive. Would have given 5 stars but the wait time was a bit long."
                            : "Amazing authentic Indian cuisine. The chef's special thali was a delightful journey through regional flavors. Will definitely return on my next visit."}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="w-full md:w-1/3">
          <Card className="luxury-shadow sticky top-20">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Reserve a Table</h3>
              <form onSubmit={handleReservation} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={reservationDate}
                    onChange={(e) => setReservationDate(e.target.value)}
                    required
                    className="border-goldfinch-gold/20 focus:border-goldfinch-gold"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={reservationTime}
                    onChange={(e) => setReservationTime(e.target.value)}
                    required
                    className="border-goldfinch-gold/20 focus:border-goldfinch-gold"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Input
                    id="guests"
                    type="number"
                    min="1"
                    max="20"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    required
                    className="border-goldfinch-gold/20 focus:border-goldfinch-gold"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border-goldfinch-gold/20 focus:border-goldfinch-gold"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="border-goldfinch-gold/20 focus:border-goldfinch-gold"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-goldfinch-gold hover:bg-goldfinch-gold/90 gap-2"
                  disabled={isSubmitting}
                >
                  <Calendar className="h-4 w-4" />
                  {isSubmitting ? "Reserving..." : "Reserve Table"}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t">
                <h4 className="font-medium mb-2">Quick Info</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-goldfinch-gold" />
                    <span>7:00 AM - 11:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-goldfinch-gold" />
                    <span>+91 22 1234 5678</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-goldfinch-gold" />
                    <span>Capacity: 120 guests</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
