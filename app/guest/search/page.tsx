"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { ChevronLeft, Search, Filter, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { diningOptions, spaServices, banquetFacilities, tourOptions } from "@/lib/seed-data"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const queryParam = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(queryParam)
  const [activeTab, setActiveTab] = useState("all")
  const [filters, setFilters] = useState({
    categories: [] as string[],
  })

  // Combine all services for search
  const allServices = [
    ...diningOptions.map((item) => ({ ...item, category: "dining" })),
    ...spaServices.map((item) => ({ ...item, category: "spa" })),
    ...banquetFacilities.map((item) => ({ ...item, category: "banquets" })),
  ]

  // Filter services based on search query and active tab
  const filteredServices = allServices.filter((service) => {
    // Filter by search query
    const matchesQuery =
      searchQuery === "" ||
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by tab
    const matchesTab = activeTab === "all" || service.category === activeTab

    // Filter by category filters
    const matchesCategory = filters.categories.length === 0 || filters.categories.includes(service.category)

    return matchesQuery && matchesTab && matchesCategory
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would trigger a search API call
    console.log("Searching for:", searchQuery)
  }

  const toggleCategoryFilter = (category: string) => {
    setFilters((prev) => {
      const current = [...prev.categories]
      if (current.includes(category)) {
        return {
          ...prev,
          categories: current.filter((item) => item !== category),
        }
      } else {
        return {
          ...prev,
          categories: [...current, category],
        }
      }
    })
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
            <BreadcrumbLink href="/guest/search">Search</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/guest">
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">Search Results</h1>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          type="search"
          placeholder="Search for services, amenities, etc."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-goldfinch-gold/20 focus:border-goldfinch-gold"
        />
        <Button type="submit" className="bg-goldfinch-gold hover:bg-goldfinch-gold/90">
          <Search className="h-4 w-4" />
        </Button>
      </form>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredServices.length} result{filteredServices.length !== 1 ? "s" : ""} found
          {searchQuery ? ` for "${searchQuery}"` : ""}
        </p>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <div className="p-2 font-medium">Categories</div>
            <DropdownMenuCheckboxItem
              checked={filters.categories.includes("dining")}
              onCheckedChange={() => toggleCategoryFilter("dining")}
            >
              Dining
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.categories.includes("spa")}
              onCheckedChange={() => toggleCategoryFilter("spa")}
            >
              Spa & Wellness
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.categories.includes("banquets")}
              onCheckedChange={() => toggleCategoryFilter("banquets")}
            >
              Banquets & Events
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.categories.includes("tours")}
              onCheckedChange={() => toggleCategoryFilter("tours")}
            >
              Tours & Activities
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start overflow-auto py-1 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="dining">Dining</TabsTrigger>
          <TabsTrigger value="spa">Spa & Wellness</TabsTrigger>
          <TabsTrigger value="banquets">Banquets</TabsTrigger>
          <TabsTrigger value="tours">Tours</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          {filteredServices.length === 0 ? (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-lg font-medium mb-2">No results found</h2>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredServices.map((service) => (
                <Link key={service.id} href={service.href} className="block">
                  <Card className="overflow-hidden luxury-shadow hover:translate-y-[-2px] luxury-transition h-full">
                    <div className="relative h-40">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        fill
                        alt={service.title}
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-1">{service.title}</h3>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                      <span className="text-xs text-goldfinch-gold font-medium">View Details</span>
                      <ChevronRight className="h-4 w-4 text-goldfinch-gold" />
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Other tab contents would be similar but filtered by category */}
      </Tabs>
    </div>
  )
}
