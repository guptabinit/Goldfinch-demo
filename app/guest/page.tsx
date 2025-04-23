"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Utensils,
  SpadeIcon as Spa,
  Bed,
  Map,
  Shirt,
  ChevronRight,
  Building2,
  Coffee,
  Wine,
  Dumbbell,
  Search,
} from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/i18n/language-context"
import { useAuth } from "@/lib/auth/auth-context"

export default function GuestHomePage() {
  const { t } = useLanguage()
  const { user, isAuthenticated } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")

  const services = [
    {
      id: "dining",
      title: t("services.dining.title"),
      description: t("services.dining.description"),
      icon: Utensils,
      image: "/elegant-wine-pairing.png",
      href: "/guest/dining",
    },
    {
      id: "wellness",
      title: t("services.spa.title"),
      description: t("services.spa.description"),
      icon: Spa,
      image: "/serene-spa-retreat.png",
      href: "/guest/spa",
    },
    {
      id: "facilities",
      title: t("services.housekeeping.title"),
      description: t("services.housekeeping.description"),
      icon: Bed,
      image: "/pristine-suite-refresh.png",
      href: "/guest/housekeeping",
    },
    {
      id: "facilities",
      title: "Banquets & Conferences",
      description: "Elegant venues for your events",
      icon: Building2,
      image: "/banquet-hall.png",
      href: "/guest/banquets",
    },
    {
      id: "tours",
      title: t("services.tours.title"),
      description: t("services.tours.description"),
      icon: Map,
      image: "/mumbai-tour.png",
      href: "/guest/tours",
    },
    {
      id: "facilities",
      title: t("services.laundry.title"),
      description: t("services.laundry.description"),
      icon: Shirt,
      image: "/pristine-hotel-linens.png",
      href: "/guest/laundry",
    },
  ]

  const quickLinks = [
    { title: "Room Service", icon: Coffee, href: "/guest/dining/in-room-dining" },
    { title: "Book Spa", icon: Spa, href: "/guest/spa/treatments" },
    { title: "Restaurant", icon: Wine, href: "/guest/dining/banjara" },
    { title: "Gym", icon: Dumbbell, href: "/guest/facilities/gym" },
  ]

  const promotions = [
    {
      id: "spa-discount",
      title: "20% Off Spa Treatments",
      description: "Enjoy special discounts on all spa treatments this weekend",
      image: "https://images.unsplash.com/photo-1700142360825-d21edc53c8db?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      href: "/guest/spa",
      badge: "Limited Time",
    },
    {
      id: "dining-offer",
      title: "Wine & Dine Package",
      description: "3-course meal with complimentary wine for two",
      image: "https://plus.unsplash.com/premium_photo-1676736839168-37aca6d63b9e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8V2luZSUyMGFuZCUyMERpbmV8ZW58MHx8MHx8fDA%3D",
      href: "/guest/dining/banjara",
      badge: "New",
    },
    {
      id: "loyalty-bonus",
      title: "Double Loyalty Points",
      description: "Earn double points on all services until end of month",
      image: "https://plus.unsplash.com/premium_photo-1728618062261-74d0d5957227?q=80&w=1990&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      href: "/guest/loyalty",
      badge: "Members Only",
    },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality
    console.log("Searching for:", searchQuery)
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section */}
      <section className="relative rounded-xl overflow-hidden h-64 md:h-96 -mx-4 sm:mx-0">
        <Image src="/goldfinch-mumbai-lobby.png" fill alt="Goldfinch Hotel Mumbai" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 md:p-10">
          <h1 className="text-white text-3xl md:text-4xl font-semibold">{t("common.welcome")}</h1>
          <p className="text-white/90 text-sm md:text-base mt-2">{t("common.howMayWeAssist")}</p>

          <form onSubmit={handleSearch} className="mt-6 flex gap-2 max-w-md">
            <Input
              type="search"
              placeholder="Search for services, amenities, etc."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/90 border-none"
            />
            <Button type="submit" className="bg-goldfinch-gold hover:bg-goldfinch-gold/90">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </section>

      {/* Quick Links */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {quickLinks.map((link) => (
          <Link key={link.title} href={link.href}>
            <Card className="luxury-shadow hover:translate-y-[-2px] luxury-transition h-full">
              <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                <div className="rounded-full bg-goldfinch-gold/10 p-3 mb-3">
                  <link.icon className="h-6 w-6 text-goldfinch-gold" />
                </div>
                <h3 className="font-medium text-sm">{link.title}</h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      {/* User Welcome or Login Prompt */}
      {isAuthenticated ? (
        <section className="bg-goldfinch-gold/10 rounded-xl p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Welcome back, {user?.name}</h2>
              <p className="text-muted-foreground">Enjoy your stay at Goldfinch Hotels Mumbai</p>
            </div>
            <div className="flex gap-3">
              <Button
                asChild
                variant="outline"
                className="border-goldfinch-gold/30 text-goldfinch-gold hover:bg-goldfinch-gold/10"
              >
                <Link href="/guest/orders">View Orders</Link>
              </Button>
              <Button asChild className="bg-goldfinch-gold hover:bg-goldfinch-gold/90">
                <Link href="/guest/loyalty">250 Points</Link>
              </Button>
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-goldfinch-gold/10 rounded-xl p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Enhance Your Experience</h2>
              <p className="text-muted-foreground">Login or register to earn loyalty points and track your orders</p>
            </div>
            <div className="flex gap-3">
              <Button
                asChild
                variant="outline"
                className="border-goldfinch-gold/30 text-goldfinch-gold hover:bg-goldfinch-gold/10"
              >
                <Link href="/auth/register">Register</Link>
              </Button>
              <Button asChild className="bg-goldfinch-gold hover:bg-goldfinch-gold/90">
                <Link href="/auth/login">Login</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Promotions */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Special Offers</h2>
          <Link href="/guest/promotions" className="text-sm text-goldfinch-gold hover:underline flex items-center">
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {promotions.map((promo) => (
            <Link key={promo.id} href={promo.href} className="block">
              <Card className="overflow-hidden luxury-shadow hover:translate-y-[-2px] luxury-transition h-full">
                <div className="relative h-40">
                  <Image src={promo.image || "/placeholder.svg"} fill alt={promo.title} className="object-cover" />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-goldfinch-gold">{promo.badge}</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-1">{promo.title}</h3>
                  <p className="text-sm text-muted-foreground">{promo.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Services */}
      <section>
        <h2 className="text-xl font-semibold mb-4">{t("services.ourServices")}</h2>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full justify-start overflow-auto py-1 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="dining">Dining</TabsTrigger>
            <TabsTrigger value="wellness">Wellness</TabsTrigger>
            <TabsTrigger value="tours">Events</TabsTrigger>
            <TabsTrigger value="facilities">Facilities</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service,i) => (
                <Link key={service.id+i} href={service.href} className="block">
                  <Card className="overflow-hidden luxury-shadow hover:translate-y-[-2px] luxury-transition h-full">
                    <div className="relative h-40">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        fill
                        alt={service.title}
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-4 flex items-center gap-2">
                        <service.icon className="h-5 w-5 text-goldfinch-gold" />
                        <h3 className="text-white font-medium">{service.title}</h3>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                      <span className="text-xs text-goldfinch-gold font-medium">{t("services.viewServices")}</span>
                      <ChevronRight className="h-4 w-4 text-goldfinch-gold" />
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          {/* Other tabs content would be similar but filtered */}
          <TabsContent value="dining" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services
                .filter((s) => s.id === "dining")
                .map((service) => (
                  <Link key={service.id} href={service.href} className="block">
                    <Card className="overflow-hidden luxury-shadow hover:translate-y-[-2px] luxury-transition h-full">
                      <div className="relative h-40">
                        <Image
                          src={service.image || "/placeholder.svg"}
                          fill
                          alt={service.title}
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-4 flex items-center gap-2">
                          <service.icon className="h-5 w-5 text-goldfinch-gold" />
                          <h3 className="text-white font-medium">{service.title}</h3>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex justify-between items-center">
                        <span className="text-xs text-goldfinch-gold font-medium">{t("services.viewServices")}</span>
                        <ChevronRight className="h-4 w-4 text-goldfinch-gold" />
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
            </div>
          </TabsContent>
            {/*Wellness*/}
            <TabsContent value="wellness" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services
                .filter((s) => s.id === "wellness")
                .map((service) => (
                  <Link key={service.id} href={service.href} className="block">
                    <Card className="overflow-hidden luxury-shadow hover:translate-y-[-2px] luxury-transition h-full">
                      <div className="relative h-40">
                        <Image
                          src={service.image || "/placeholder.svg"}
                          fill
                          alt={service.title}
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-4 flex items-center gap-2">
                          <service.icon className="h-5 w-5 text-goldfinch-gold" />
                          <h3 className="text-white font-medium">{service.title}</h3>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex justify-between items-center">
                        <span className="text-xs text-goldfinch-gold font-medium">{t("services.viewServices")}</span>
                        <ChevronRight className="h-4 w-4 text-goldfinch-gold" />
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
            </div>
          </TabsContent>
                    {/*Tours*/}
                    <TabsContent value="tours" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services
                .filter((s) => s.id === "tours")
                .map((service) => (
                  <Link key={service.id} href={service.href} className="block">
                    <Card className="overflow-hidden luxury-shadow hover:translate-y-[-2px] luxury-transition h-full">
                      <div className="relative h-40">
                        <Image
                          src={service.image || "/placeholder.svg"}
                          fill
                          alt={service.title}
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-4 flex items-center gap-2">
                          <service.icon className="h-5 w-5 text-goldfinch-gold" />
                          <h3 className="text-white font-medium">{service.title}</h3>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex justify-between items-center">
                        <span className="text-xs text-goldfinch-gold font-medium">{t("services.viewServices")}</span>
                        <ChevronRight className="h-4 w-4 text-goldfinch-gold" />
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
            </div>
          </TabsContent>
          {/*Facilities*/}
          <TabsContent value="facilities" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services
                .filter((s) => s.id === "facilities")
                .map((service,i) => (
                  <Link key={service.id+i} href={service.href} className="block">
                    <Card className="overflow-hidden luxury-shadow hover:translate-y-[-2px] luxury-transition h-full">
                      <div className="relative h-40">
                        <Image
                          src={service.image || "/placeholder.svg"}
                          fill
                          alt={service.title}
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-4 flex items-center gap-2">
                          <service.icon className="h-5 w-5 text-goldfinch-gold" />
                          <h3 className="text-white font-medium">{service.title}</h3>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex justify-between items-center">
                        <span className="text-xs text-goldfinch-gold font-medium">{t("services.viewServices")}</span>
                        <ChevronRight className="h-4 w-4 text-goldfinch-gold" />
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}
