"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ChevronLeft,
  Clock,
  Calendar,
  Plus,
  Minus,
  Shirt,
  PenIcon as Pants,
  SaladIcon as Dress,
  ShirtIcon as Tshirt,
  Check,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"


interface LaundryItem {
  id: string
  name: string
  icon: React.ReactNode
  price: number
  count: number
}

export default function LaundryPage() {
  const { toast } = useToast()
  const [serviceType, setServiceType] = useState<string>("standard")
  const [pickupTime, setPickupTime] = useState<string>("morning")
  const [specialInstructions, setSpecialInstructions] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("new")

  const [items, setItems] = useState<LaundryItem[]>([
    { id: "shirt", name: "Shirt", icon: <Shirt className="h-5 w-5" />, price: 150, count: 0 },
    { id: "tshirt", name: "T-Shirt", icon: <Tshirt className="h-5 w-5" />, price: 100, count: 0 },
    { id: "pants", name: "Pants/Trousers", icon: <Pants className="h-5 w-5" />, price: 200, count: 0 },
    { id: "dress", name: "Dress", icon: <Dress className="h-5 w-5" />, price: 250, count: 0 },
    { id: "suit", name: "Suit (2pc)", icon: <Shirt className="h-5 w-5" />, price: 500, count: 0 },
    { id: "jacket", name: "Jacket", icon: <Shirt className="h-5 w-5" />, price: 300, count: 0 },
    { id: "sweater", name: "Sweater", icon: <Shirt className="h-5 w-5" />, price: 200, count: 0 },
    { id: "underwear", name: "Underwear", icon: <Shirt className="h-5 w-5" />, price: 50, count: 0 },
  ])

  const updateItemCount = (id: string, increment: boolean) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, count: increment ? item.count + 1 : Math.max(0, item.count - 1) } : item,
      ),
    )
  }

  const totalItems = items.reduce((sum, item) => sum + item.count, 0)
  const subtotal = items.reduce((sum, item) => sum + item.count * item.price, 0)

  // Calculate service charge based on service type
  const serviceMultiplier = serviceType === "express" ? 1.5 : serviceType === "deluxe" ? 1.25 : 1
  const total = Math.round(subtotal * serviceMultiplier)
  const router = useRouter()

  const handleSubmit = () => {
    if (totalItems === 0) {
      toast({
        title: "No items selected",
        description: "Please select at least one item for laundry.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    router.push("/guest/orders/confirmation")

    // Simulate API call
    
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Laundry Request Submitted",
        description: `Your laundry will be picked up during the ${pickupTime} window.`,
        variant: "default",
      })

      // Reset form
      setItems(items.map((item) => ({ ...item, count: 0 })))
      setSpecialInstructions("")
    }, 1500)
  }

  const pastOrders = [
    {
      id: "order-1",
      date: "Apr 22, 2023",
      items: 5,
      total: 850,
      status: "Delivered",
      statusColor: "bg-green-500",
    },
    {
      id: "order-2",
      date: "Apr 19, 2023",
      items: 3,
      total: 450,
      status: "Delivered",
      statusColor: "bg-green-500",
    },
  ]

  return (
    <div className="container max-w-4xl py-6 space-y-6">
      <div className="flex items-center">
        <Link href="/guest" className="mr-2">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Laundry Services</h1>
      </div>

      <Tabs defaultValue="new" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="new">New Order</TabsTrigger>
          <TabsTrigger value="history">Order History</TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Laundry Items</CardTitle>
                  <CardDescription>Select the items you would like to have laundered</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between border rounded-lg p-3">
                        <div className="flex items-center">
                          <div className="bg-muted h-10 w-10 rounded-md flex items-center justify-center mr-3">
                            {item.icon}
                          </div>
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">₹{item.price}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateItemCount(item.id, false)}
                            disabled={item.count === 0}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-6 text-center">{item.count}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateItemCount(item.id, true)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Service Options</CardTitle>
                  <CardDescription>Choose your preferred service type and pickup time</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Service Type</h3>
                    <RadioGroup value={serviceType} onValueChange={setServiceType} className="flex flex-col space-y-3">
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="standard" id="standard" className="mt-1" />
                        <div className="grid gap-1">
                          <Label htmlFor="standard" className="font-medium">
                            Standard Service (24 hours)
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Regular cleaning and pressing, delivered within 24 hours
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="express" id="express" className="mt-1" />
                        <div className="grid gap-1">
                          <Label htmlFor="express" className="font-medium">
                            Express Service (6 hours) +50%
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Expedited service with delivery within 6 hours
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="deluxe" id="deluxe" className="mt-1" />
                        <div className="grid gap-1">
                          <Label htmlFor="deluxe" className="font-medium">
                            Deluxe Service (24 hours) +25%
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Premium cleaning with special care for delicate fabrics
                          </p>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-2">Pickup Time</h3>
                    <RadioGroup value={pickupTime} onValueChange={setPickupTime} className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="morning" id="morning" />
                        <Label htmlFor="morning">Morning (8:00 AM - 11:00 AM)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="afternoon" id="afternoon" />
                        <Label htmlFor="afternoon">Afternoon (12:00 PM - 3:00 PM)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="evening" id="evening" />
                        <Label htmlFor="evening">Evening (4:00 PM - 7:00 PM)</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Special Instructions</h3>
                    <textarea
                      className="w-full min-h-[100px] p-3 border rounded-md"
                      placeholder="Any specific instructions for handling your laundry..."
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Items ({totalItems})</span>
                      <span>₹{subtotal}</span>
                    </div>
                    {serviceType !== "standard" && (
                      <div className="flex justify-between text-sm">
                        <span>{serviceType === "express" ? "Express Service (+50%)" : "Deluxe Service (+25%)"}</span>
                        <span>₹{total - subtotal}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>₹{total}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSubmit} disabled={totalItems === 0 || isSubmitting} className="w-full">
                    {isSubmitting ? "Processing..." : "Submit Order"}
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Laundry Schedule</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium">Pickup Times</h4>
                      <p className="text-sm text-muted-foreground">8:00 AM - 7:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium">Service Days</h4>
                      <p className="text-sm text-muted-foreground">All days including weekends</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3"
                  alt="Laundry service"
                  width={400}
                  height={250}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Laundry Orders</CardTitle>
              <CardDescription>View your recent laundry orders and their status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pastOrders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium">Order #{order.id}</h3>
                        <div className={`ml-2 h-2 w-2 rounded-full ${order.statusColor}`}></div>
                        <span className="ml-1 text-sm text-muted-foreground">{order.status}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{order.date}</p>
                    </div>
                    <Badge variant="outline">₹{order.total}</Badge>
                  </div>
                  <div className="text-sm">
                    <span>{order.items} items</span>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="ghost" size="sm" className="h-8">
                      View Details
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Laundry Care Guide</CardTitle>
              <CardDescription>Tips for preparing your laundry</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <p className="text-sm">Empty all pockets before submitting items</p>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <p className="text-sm">Inform us of any stains or special care requirements</p>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <p className="text-sm">Delicate items should be marked accordingly</p>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <p className="text-sm">All items will be returned on hangers or folded</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
