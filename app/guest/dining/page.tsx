import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { diningOptions } from "@/lib/seed-data"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function DiningPage() {
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
        </BreadcrumbList>
      </Breadcrumb>

      <section className="relative rounded-xl overflow-hidden h-48 mb-6">
        <Image
          src="https://restaurantindia.s3.ap-south-1.amazonaws.com/s3fs-public/2025-01/photo-1414235077428-338989a2e.JPG"
          fill
          alt="Goldfinch Dining"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <h1 className="text-white text-2xl font-semibold">Dining</h1>
          <p className="text-white/90 text-sm">Culinary excellence at your service</p>
        </div>
      </section>

      <section>
        <div className="grid gap-4">
          {diningOptions.map((option) => (
            <Link key={option.id} href={option.href} className="block">
              <Card className="overflow-hidden luxury-shadow hover:translate-y-[-2px] luxury-transition">
                <div className="relative h-40">
                  <Image src={option.image || "/placeholder.svg"} fill alt={option.title} className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-1">{option.title}</h3>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {option.features.map((feature, index) => (
                      <span
                        key={index}
                        className="text-xs bg-goldfinch-gold/10 text-goldfinch-gold px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <span className="text-xs text-goldfinch-gold font-medium">View Menu</span>
                  <ChevronRight className="h-4 w-4 text-goldfinch-gold" />
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
