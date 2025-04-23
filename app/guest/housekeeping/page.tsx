"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChevronLeft, Clock, CalendarCheck, Sparkles, Utensils, Bed, Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

export default function HousekeepingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [selectedTime, setSelectedTime] = useState<string>("morning")
  const [selectedService, setSelectedService] = useState<string[]>([])
  const [specialRequest, setSpecialRequest] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [doNotDisturb, setDoNotDisturb] = useState(false)

  const handleServiceToggle = (service: string) => {
    if (selectedService.includes(service)) {
      setSelectedService(selectedService.filter((s) => s !== service))
    } else {
      setSelectedService([...selectedService, service])
    }
  }

  
  const handleSubmit = () => {
    setIsSubmitting(true)
    router.push("/guest/orders/confirmation")
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Request Submitted",
        description: "Your housekeeping request has been received.",
        variant: "default",
      })

      // Reset form
      setSelectedService([])
      setSpecialRequest("")
    }, 1500)
  }

  const handleDoNotDisturb = () => {
    setDoNotDisturb(!doNotDisturb)
    toast({
      title: doNotDisturb ? "Do Not Disturb Disabled" : "Do Not Disturb Enabled",
      description: doNotDisturb
        ? "Housekeeping staff will resume normal service."
        : "Housekeeping staff will not disturb you until disabled.",
      variant: "default",
    })
  }

  return (
    <div className="container max-w-4xl py-6 space-y-6">
      <div className="flex items-center">
        <Link href="/guest" className="mr-2">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Housekeeping Services</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Request Housekeeping</CardTitle>
              <CardDescription>Schedule room cleaning or request additional amenities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Preferred Time</h3>
                <RadioGroup value={selectedTime} onValueChange={setSelectedTime} className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="morning" id="morning" />
                    <Label htmlFor="morning">Morning (8:00 AM - 12:00 PM)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="afternoon" id="afternoon" />
                    <Label htmlFor="afternoon">Afternoon (12:00 PM - 4:00 PM)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="evening" id="evening" />
                    <Label htmlFor="evening">Evening (4:00 PM - 8:00 PM)</Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Services Needed</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button
                    variant={selectedService.includes("full-cleaning") ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => handleServiceToggle("full-cleaning")}
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Full Room Cleaning
                  </Button>
                  <Button
                    variant={selectedService.includes("turndown") ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => handleServiceToggle("turndown")}
                  >
                    <Bed className="mr-2 h-4 w-4" />
                    Turndown Service
                  </Button>
                  <Button
                    variant={selectedService.includes("amenities") ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => handleServiceToggle("amenities")}
                  >
                    <Utensils className="mr-2 h-4 w-4" />
                    Replenish Amenities
                  </Button>
                  <Button
                    variant={selectedService.includes("extra") ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => handleServiceToggle("extra")}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Extra Towels/Linens
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Special Requests</h3>
                <Textarea
                  placeholder="Any specific instructions or requests..."
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  className="resize-none"
                  rows={4}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSubmit} disabled={selectedService.length === 0 || isSubmitting} className="w-full">
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Do Not Disturb</CardTitle>
              <CardDescription>Toggle this option if you don't want to be disturbed by housekeeping</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="font-medium">Do Not Disturb Mode</h3>
                  <p className="text-sm text-muted-foreground">
                    Housekeeping will skip your room until you disable this
                  </p>
                </div>
                <Switch checked={doNotDisturb} onCheckedChange={handleDoNotDisturb} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Housekeeping Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h4 className="font-medium">Regular Service</h4>
                  <p className="text-sm text-muted-foreground">Daily: 8:00 AM - 2:00 PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CalendarCheck className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h4 className="font-medium">Turndown Service</h4>
                  <p className="text-sm text-muted-foreground">Daily: 6:00 PM - 8:00 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Recent Requests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">Full Room Cleaning</h4>
                  <Badge variant="outline" className="text-xs">
                    Completed
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Yesterday, 10:15 AM</p>
              </div>
              <div className="border rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">Extra Towels</h4>
                  <Badge variant="outline" className="text-xs">
                    Completed
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Apr 21, 2023, 4:30 PM</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" size="sm">
                View All History
              </Button>
            </CardFooter>
          </Card>

          <div className="rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
              alt="Housekeeping service"
              width={400}
              height={250}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
