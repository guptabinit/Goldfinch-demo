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

export default function SpaTreatmentsPage() {
  const { t } = useLanguage()
  const [filters, setFilters] = useState({
    duration: [] as string[],
    type: [] as string[],
  })

  const treatments = [
    {
      id: "swedish-massage",
      title: "Swedish Massage",
      description:
        "A gentle full body massage technique that relaxes the muscle tissue, increases circulation and enhances physical and mental well-being.",
      duration: 60,
      price: 2500,
      image: "https://t3.ftcdn.net/jpg/00/51/71/92/360_F_51719267_ra6jPPKlIxSbxjzBMcEvr9qyfkoynWOV.jpg",
      popular: true,
      type: "relaxation",
    },
    {
      id: "deep-tissue",
      title: "Deep Tissue Massage",
      description: "A therapeutic massage that focuses on realigning deeper layers of muscles and connective tissue.",
      duration: 60,
      price: 3000,
      image: "https://images.squarespace-cdn.com/content/v1/5f2864b6ee63644ee0b157d3/1724694633011-SJLESBYMV1Y4CDQ4T7CK/deep+tissue+massage+techniques+for+beginners.jpg",
      type: "therapeutic",
    },
    {
      id: "aromatherapy",
      title: "Aromatherapy Massage",
      description:
        "A massage therapy that uses essential oils to promote healing and a feeling of well-being and relaxation.",
      duration: 75,
      price: 3500,
      image: "https://www.kingsmillshotel.com/wp-content/uploads/2018/06/Aromatherapy-Massage.jpg",
      popular: true,
      type: "relaxation",
    },
    {
      id: "hot-stone",
      title: "Hot Stone Massage",
      description:
        "A specialty massage where smooth, heated stones are placed on specific parts of your body to help relax and ease tense muscles.",
      duration: 90,
      price: 4000,
      image: "https://bluestonefirecupping.com/wp-content/uploads/2023/06/Hot-Stone-Massage-Therapy-1200-Blue-Stone-Fire-Cupping-and-massage-Bellingham-Wa-1024x684.jpeg",
      type: "specialty",
    }
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

  const filteredTreatments = treatments.filter((treatment) => {
    if (filters.duration.length > 0 && !filters.duration.includes(treatment.duration.toString())) {
      return false
    }
    if (filters.type.length > 0 && !filters.type.includes(treatment.type)) {
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
            <BreadcrumbLink href="/guest/spa/treatments">Treatments</BreadcrumbLink>
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
        <h1 className="text-xl font-semibold">Spa Treatments</h1>
      </div>

      <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>Available 9:00 AM - 9:00 PM | Advance booking recommended</span>
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
              checked={filters.type.includes("relaxation")}
              onCheckedChange={() => toggleFilter("type", "relaxation")}
            >
              Relaxation
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.type.includes("therapeutic")}
              onCheckedChange={() => toggleFilter("type", "therapeutic")}
            >
              Therapeutic
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.type.includes("specialty")}
              onCheckedChange={() => toggleFilter("type", "specialty")}
            >
              Specialty
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.type.includes("beauty")}
              onCheckedChange={() => toggleFilter("type", "beauty")}
            >
              Beauty
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTreatments.map((treatment) => (
          <Link key={treatment.id} href={`/guest/spa/treatments/${treatment.id}/schedule`}>
            <Card className="overflow-hidden luxury-shadow hover:translate-y-[-2px] luxury-transition h-full">
              <div className="relative h-48">
                <Image
                  src={treatment.image || "/placeholder.svg"}
                  fill
                  alt={treatment.title}
                  className="object-cover"
                />
                {treatment.popular && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-goldfinch-gold">Popular</Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium">{treatment.title}</h3>
                  <span className="text-goldfinch-gold font-medium">₹{treatment.price}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{treatment.description}</p>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{treatment.duration} minutes</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <span className="text-xs text-goldfinch-gold font-medium">Book Appointment</span>
                <ChevronRight className="h-4 w-4 text-goldfinch-gold" />
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>

      {filteredTreatments.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-lg font-medium mb-2">No treatments found</h2>
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

      <section className="mt-8 bg-goldfinch-gold/10 rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Spa Packages</h3>
            <p className="text-muted-foreground">Explore our curated spa packages for a complete wellness experience</p>
          </div>
          <Button asChild className="bg-goldfinch-gold hover:bg-goldfinch-gold/90">
            <Link href="/guest/spa/packages">View Packages</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
