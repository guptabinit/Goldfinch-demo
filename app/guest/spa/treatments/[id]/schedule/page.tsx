"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChevronLeft, Clock, Calendar, User, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock treatment data
const treatment = {
  id: "swedish-massage",
  title: "Swedish Massage",
  description:
    "A gentle full body massage technique that relaxes the muscle tissue, increases circulation and enhances physical and mental well-being.",
  duration: 60,
  price: 2500,
  image: "https://www.shutterstock.com/image-photo/beautiful-young-woman-enjoying-massage-600nw-2345594117.jpg",
  popular: true,
}

// Available time slots
const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
]

// Therapists
const therapists = [
  { id: "th1", name: "Aanya Sharma", specialization: "Swedish & Deep Tissue" },
  { id: "th2", name: "Raj Patel", specialization: "Aromatherapy & Hot Stone" },
  { id: "th3", name: "Priya Mehta", specialization: "Thai & Swedish" },
  { id: "th4", name: "Vikram Singh", specialization: "Deep Tissue & Sports Massage" },
]

export default function ScheduleTreatmentPage() {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [timeSlot, setTimeSlot] = useState<string>("")
  const [therapist, setTherapist] = useState<string>("")
  const [specialRequests, setSpecialRequests] = useState("")
  const [isBooking, setIsBooking] = useState(false)

  const handleBooking = () => {
    setIsBooking(true)

    // Simulate API call
    setTimeout(() => {
      setIsBooking(false)
      router.push("/guest/orders/confirmation")
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/guest/spa/treatments">
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">Schedule Appointment</h1>
      </div>

      <Card className="overflow-hidden">
        <div className="relative h-40">
          <Image src={treatment.image || "/placeholder.svg"} fill alt={treatment.title} className="object-cover" />
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-1">
            <h2 className="font-medium">{treatment.title}</h2>
            <span className="text-goldfinch-gold font-medium">₹{treatment.price}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{treatment.description}</p>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{treatment.duration} minutes</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5 text-goldfinch-gold" />
            Select Date & Time
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Date</h3>
            <div className="border w-80 rounded-md p-3">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                className="mx-auto"
                disabled={(date) => {
                  // Disable past dates
                  return date < new Date(new Date().setHours(0, 0, 0, 0))
                }}
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Time Slot</h3>
            <RadioGroup value={timeSlot} onValueChange={setTimeSlot} className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <div key={slot} className="flex items-center space-x-2">
                  <RadioGroupItem value={slot} id={`time-${slot}`} />
                  <Label htmlFor={`time-${slot}`}>{slot}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-5 w-5 text-goldfinch-gold" />
            Select Therapist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={therapist} onValueChange={setTherapist}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a therapist" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">No preference</SelectItem>
              {therapists.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.name} - {t.specialization}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="h-5 w-5 text-goldfinch-gold" />
            Additional Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Any special requests or health concerns we should know about?"
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            className="resize-none"
          />
        </CardContent>
        <CardFooter className="flex-col gap-3">
          <Button
            className="w-full bg-goldfinch-gold hover:bg-goldfinch-gold/90"
            disabled={!date || !timeSlot || isBooking}
            onClick={handleBooking}
          >
            {isBooking ? "Processing..." : "Book Appointment"}
          </Button>
          <div className="text-xs text-center text-muted-foreground">
            Cancellation is free up to 4 hours before your appointment
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
