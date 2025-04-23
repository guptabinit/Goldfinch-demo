"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Users, Calendar, SquareIcon as SquareFeet } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/i18n/language-context"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function BanquetsPage() {
  const { t } = useLanguage()

  const venues = [
    {
      id: "silver-bills",
      title: "Silver Bills Banquet",
      description: "Elegant venue for weddings, corporate events, and celebrations",
      image: "/silver-bills-banquet.png",
      capacity: 350,
      area: "5000 sq ft",
      features: ["Partitionable", "Wedding Venue", "Corporate Events"],
      href: "/guest/banquets/silver-bills",
    },
    {
      id: "senate-hall",
      title: "Senate Conference Hall",
      description: "Modern facilities for business meetings and conferences",
      image: "/senate-conference-hall.png",
      capacity: 150,
      area: "2500 sq ft",
      features: ["Business Meetings", "Conferences", "Modern AV Equipment"],
      href: "/guest/banquets/senate-hall",
    },
    {
      id: "rooftop-venue",
      title: "Rooftop Venue",
      description: "Stunning open-air venue with panoramic city views",
      image: "/rooftop-venue.png",
      capacity: 250,
      area: "3000 sq ft",
      features: ["Open Air", "Panoramic Views", "Wedding Receptions"],
      href: "/guest/banquets/rooftop-venue",
    },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/guest">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/guest/banquets">Banquets & Conferences</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section className="relative rounded-xl overflow-hidden h-48 md:h-64 mb-6">
        <Image src="https://images.unsplash.com/photo-1677129661713-14a507086c5b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" fill alt="Goldfinch Banquets & Conferences" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <h1 className="text-white text-2xl md:text-3xl font-semibold">Banquets & Conferences</h1>
          <p className="text-white/90 text-sm md:text-base">Elegant venues for your special events</p>
        </div>
      </section>

      <section className="mb-8">
        <div className="prose max-w-none">
          <p>
            Goldfinch Hotel Mumbai offers elegant and versatile venues for all your event needs. From intimate
            gatherings to grand celebrations, our spaces can be customized to create the perfect setting for your
            special occasion.
          </p>
          <p>
            Our dedicated events team ensures flawless execution with attention to every detail, complemented by
            exquisite catering options and state-of-the-art facilities.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Our Venues</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.map((venue) => (
            <Link key={venue.id} href={venue.href} className="block">
              <Card className="overflow-hidden luxury-shadow hover:translate-y-[-2px] luxury-transition h-full">
                <div className="relative h-48">
                  <Image src={venue.image || "/placeholder.svg"} fill alt={venue.title} className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-lg mb-2">{venue.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{venue.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {venue.features.map((feature) => (
                      <Badge
                        key={feature}
                        variant="outline"
                        className="bg-goldfinch-gold/10 text-goldfinch-gold border-goldfinch-gold/20"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-goldfinch-gold" />
                      <span>Capacity: {venue.capacity}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <SquareFeet className="h-4 w-4 text-goldfinch-gold" />
                      <span>Area: {venue.area}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <span className="text-xs text-goldfinch-gold font-medium">View Details</span>
                  <ChevronRight className="h-4 w-4 text-goldfinch-gold" />
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 bg-goldfinch-gold/10 rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Plan Your Event</h3>
            <p className="text-muted-foreground">
              Contact our events team to discuss your requirements and get a customized quote
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/guest/banquets/inquiry"
              className="bg-goldfinch-gold hover:bg-goldfinch-gold/90 text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              <span>Make an Inquiry</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
