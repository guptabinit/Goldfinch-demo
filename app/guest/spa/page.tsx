import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { spaServices } from "@/lib/seed-data"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function SpaPage() {
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
        </BreadcrumbList>
      </Breadcrumb>

      <section className="relative rounded-xl overflow-hidden h-48 mb-6">
        <Image src="/serene-spa-retreat.png" fill alt="Goldfinch Spa" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <h1 className="text-white text-2xl font-semibold">Spa & Wellness</h1>
          <p className="text-white/90 text-sm">Rejuvenate your body and mind</p>
        </div>
      </section>

      <section>
        <div className="grid gap-4">
          {spaServices.map((service) => (
            <Link key={service.id} href={service.href} className="block">
              <Card className="overflow-hidden luxury-shadow hover:translate-y-[-2px] luxury-transition">
                <div className="relative h-40">
                  <Image src={service.image || "/placeholder.svg"} fill alt={service.title} className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-1">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="text-xs bg-goldfinch-gold/10 text-goldfinch-gold px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                    {service.features.length > 3 && (
                      <span className="text-xs bg-goldfinch-gold/10 text-goldfinch-gold px-2 py-1 rounded-full">
                        +{service.features.length - 3} more
                      </span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <span className="text-xs text-goldfinch-gold font-medium">View Services</span>
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
