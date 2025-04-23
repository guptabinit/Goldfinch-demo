"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Clock, ChevronRight, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/lib/i18n/language-context"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useState } from "react"

export default function FacialTreatmentsPage() {
  const { t } = useLanguage()
  const [filters, setFilters] = useState({
    duration: [] as string[],
    type: [] as string[],
  })

  const facials = [
    {
      id: "hydrating-glow",
      title: "Hydrating Glow Facial",
      description:
        "Restore moisture and radiance to dry, dull skin with our hydrating facial that uses hyaluronic acid and natural botanicals.",
      duration: 60,
      price: 3200,
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop",
      popular: true,
      type: "hydrating",
    },
    {
      id: "anti-aging-lift",
      title: "Anti-Aging Lift Facial",
      description:
        "Turn back time with our premium anti-aging facial that firms, lifts and reduces the appearance of fine lines and wrinkles.",
      duration: 75,
      price: 4500,
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2070&auto=format&fit=crop",
      type: "anti-aging",
    },
    {
      id: "deep-cleansing",
      title: "Deep Cleansing Facial",
      description:
        "A thorough cleansing treatment that removes impurities, unclogs pores and balances oil production for clearer skin.",
      duration: 60,
      price: 2800,
      image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop",
      popular: false,
      type: "cleansing",
    },
  ]

  const toggleFilter = (category: "duration" | "type", value: string) => {
    setFilters((prev) => {
      const current = [...prev[category]]
      if (current.includes(value)) {
        return {
          ...prev,
          [category]: current.filter((item) => item !== value),
        }
      } else {
        return {
          ...prev,
          [category]: [...current, value],
        }
      }
    })
  }

  const filteredFacials = facials.filter((facial) => {
    if (filters.duration.length > 0 && !filters.duration.includes(facial.duration.toString())) {
      return false
    }
    if (filters.type.length > 0 && !filters.type.includes(facial.type)) {
      return false
    }
    return true
  })

  return (
    <div className="space-y-6">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/guest">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/guest/spa">Spa & Wellness</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/guest/spa/facial">Facial Treatments</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/guest/spa">
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">Facial Treatments</h1>
      </div>

      <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>Available 9:00 AM - 8:00 PM | Advance booking recommended</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <div className="p-2 font-medium">Duration</div>
            <DropdownMenuCheckboxItem
              checked={filters.duration.includes("45")}
              onCheckedChange={() => toggleFilter("duration", "45")}
            >
              45 minutes
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.duration.includes("60")}
              onCheckedChange={() => toggleFilter("duration", "60")}
            >
              60 minutes
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.duration.includes("75")}
              onCheckedChange={() => toggleFilter("duration", "75")}
            >
              75 minutes
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.duration.includes("90")}
              onCheckedChange={() => toggleFilter("duration", "90")}
            >
              90 minutes
            </DropdownMenuCheckboxItem>

            <div className="p-2 font-medium border-t mt-2">Type</div>
            <DropdownMenuCheckboxItem
              checked={filters.type.includes("hydrating")}
              onCheckedChange={() => toggleFilter("type", "hydrating")}
            >
              Hydrating
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.type.includes("anti-aging")}
              onCheckedChange={() => toggleFilter("type", "anti-aging")}
            >
              Anti-Aging
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.type.includes("cleansing")}
              onCheckedChange={() => toggleFilter("type", "cleansing")}
            >
              Cleansing
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.type.includes("brightening")}
              onCheckedChange={() => toggleFilter("type", "brightening")}
            >
              Brightening
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.type.includes("luxury")}
              onCheckedChange={() => toggleFilter("type", "luxury")}
            >
              Luxury
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.type.includes("sensitive")}
              onCheckedChange={() => toggleFilter("type", "sensitive")}
            >
              Sensitive Skin
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.type.includes("men")}
              onCheckedChange={() => toggleFilter("type", "men")}
            >
              Men's
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFacials.map((facial) => (
          <Link key={facial.id} href={`/guest/spa/facials/${facial.id}`}>
            <Card className="overflow-hidden luxury-shadow hover:translate-y-[-2px] luxury-transition h-full">
              <div className="relative h-48">
                <Image src={facial.image || "/placeholder.svg"} fill alt={facial.title} className="object-cover" />
                {facial.popular && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-goldfinch-gold">Popular</Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium">{facial.title}</h3>
                  <span className="text-goldfinch-gold font-medium">₹{facial.price}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{facial.description}</p>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{facial.duration} minutes</span>
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

      {filteredFacials.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-lg font-medium mb-2">No facial treatments found</h2>
          <p className="text-muted-foreground mb-6">Try adjusting your filters</p>
          <Button
            variant="outline"
            onClick={() => setFilters({ duration: [], type: [] })}
            className="border-goldfinch-gold/30 text-goldfinch-gold hover:bg-goldfinch-gold/10"
          >
            Clear Filters
          </Button>
        </div>
      )}

    </div>
  )
}
