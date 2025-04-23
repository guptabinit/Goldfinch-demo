"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { ChevronLeft, Clock, Star, Check, CalendarIcon, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function FacialDetailPage() {
  const params = useParams()
  const { toast } = useToast()
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [timeSlot, setTimeSlot] = useState<string | undefined>(undefined)
  const [therapist, setTherapist] = useState<string | undefined>(undefined)
  const [specialRequests, setSpecialRequests] = useState("")
  const [bookingComplete, setBookingComplete] = useState(false)
  const [activeTab, setActiveTab] = useState("details")

  const facialId = params.id as string

  // This would normally come from an API
  const facials = {
    "hydrating-glow": {
      id: "hydrating-glow",
      title: "Hydrating Glow Facial",
      description:
        "Restore moisture and radiance to dry, dull skin with our hydrating facial that uses hyaluronic acid and natural botanicals.",
      fullDescription:
        "Our signature Hydrating Glow Facial is designed to deeply replenish moisture levels in the skin while restoring a natural, healthy radiance. This treatment combines the power of hyaluronic acid, which can hold up to 1000 times its weight in water, with nourishing botanical extracts that soothe and revitalize dehydrated skin. The facial begins with a gentle cleanse, followed by a hydrating enzyme exfoliation to remove dead skin cells. A specialized hydrating mask infuses the skin with moisture, while our signature facial massage improves circulation and promotes lymphatic drainage. The treatment concludes with the application of a moisture-locking serum and protective moisturizer, leaving your skin plump, dewy, and glowing.",
      duration: 60,
      price: 3200,
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1596178060810-72c633ce9522?q=80&w=2069&auto=format&fit=crop",
      ],
      popular: true,
      type: "hydrating",
      rating: 4.8,
      reviewCount: 124,
      benefits: [
        "Deeply hydrates parched skin",
        "Restores natural radiance",
        "Plumps fine lines and wrinkles",
        "Soothes irritation and redness",
        "Strengthens skin barrier function",
      ],
      recommended: ["Dry skin", "Dehydrated skin", "Dull complexion", "Mature skin", "Post-travel skin"],
      process: [
        { step: "Gentle cleansing", time: "5 min" },
        { step: "Hydrating enzyme exfoliation", time: "10 min" },
        { step: "Hyaluronic acid infusion", time: "10 min" },
        { step: "Botanical moisture mask", time: "15 min" },
        { step: "Facial massage", time: "10 min" },
        { step: "Serum and moisturizer application", time: "10 min" },
      ],
      aftercare: [
        "Drink plenty of water to maintain hydration",
        "Use a hydrating serum morning and night",
        "Apply SPF daily to protect skin",
        "Avoid excessive heat for 24 hours",
        "Use a humidifier to maintain skin moisture",
      ],
      therapists: [
        { id: "aisha", name: "Aisha Patel", specialty: "Hydration Specialist" },
        { id: "mei", name: "Mei Lin", specialty: "Holistic Facial Expert" },
        { id: "sofia", name: "Sofia Rodriguez", specialty: "Botanical Skincare" },
      ],
      related: ["brightening-vitamin", "sensitive-skin", "anti-aging-lift"],
    },
    "anti-aging-lift": {
      id: "anti-aging-lift",
      title: "Anti-Aging Lift Facial",
      description:
        "Turn back time with our premium anti-aging facial that firms, lifts and reduces the appearance of fine lines and wrinkles.",
      fullDescription:
        "Our advanced Anti-Aging Lift Facial combines cutting-edge ingredients and techniques to visibly reduce signs of aging and restore youthful firmness to the skin. This comprehensive treatment targets fine lines, wrinkles, and loss of elasticity through a multi-step approach. Beginning with a deep cleanse and professional-grade exfoliation, the facial removes dull surface cells to enhance product penetration. A specialized lifting massage technique stimulates collagen production and improves muscle tone, while our proprietary peptide-rich mask firms and tightens the skin. The treatment concludes with the application of advanced anti-aging serums containing retinol, peptides, and antioxidants to protect and rejuvenate the skin. Experience a visible lift and renewed youthful appearance after just one session.",
      duration: 75,
      price: 4500,
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2070&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1596178060810-72c633ce9522?q=80&w=2069&auto=format&fit=crop",
      ],
      type: "anti-aging",
      rating: 4.9,
      reviewCount: 98,
      benefits: [
        "Reduces fine lines and wrinkles",
        "Improves skin elasticity and firmness",
        "Stimulates collagen production",
        "Lifts and contours facial features",
        "Brightens age spots and hyperpigmentation",
      ],
      recommended: [
        "Mature skin",
        "Loss of firmness",
        "Fine lines and wrinkles",
        "Dull, tired skin",
        "Sagging contours",
      ],
      process: [
        { step: "Double cleanse", time: "10 min" },
        { step: "AHA/BHA exfoliation", time: "10 min" },
        { step: "Lifting facial massage", time: "15 min" },
        { step: "Peptide-rich firming mask", time: "20 min" },
        { step: "LED light therapy", time: "10 min" },
        { step: "Anti-aging serum application", time: "10 min" },
      ],
      aftercare: [
        "Use recommended anti-aging products consistently",
        "Apply broad-spectrum SPF daily",
        "Avoid direct sun exposure for 48 hours",
        "Stay hydrated and maintain a healthy diet",
        "Schedule regular maintenance treatments",
      ],
      therapists: [
        { id: "elena", name: "Elena Petrova", specialty: "Anti-Aging Expert" },
        { id: "james", name: "James Wilson", specialty: "Advanced Facial Techniques" },
        { id: "mei", name: "Mei Lin", specialty: "Holistic Facial Expert" },
      ],
      related: ["gold-infusion", "hydrating-glow", "brightening-vitamin"],
    },
    "deep-cleansing": {
      id: "deep-cleansing",
      title: "Deep Cleansing Facial",
      description:
        "A thorough cleansing treatment that removes impurities, unclogs pores and balances oil production for clearer skin.",
      fullDescription:
        "Our Deep Cleansing Facial is a comprehensive treatment designed to thoroughly purify the skin, remove impurities, and restore balance to combination and oily skin types. This facial begins with a double cleanse to remove surface debris, followed by a gentle yet effective enzyme exfoliation to dissolve dead skin cells. A professional-grade steam treatment opens the pores, preparing the skin for expert extractions that remove blackheads and congestion. A purifying clay mask draws out remaining impurities while balancing oil production. The facial concludes with a lightweight, non-comedogenic moisturizer that hydrates without clogging pores. This treatment leaves the skin feeling fresh, clean, and balanced with visibly refined pores and a clearer complexion.",
      duration: 60,
      price: 2800,
      image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=2035&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1603217040830-34473db521a2?q=80&w=2069&auto=format&fit=crop",
      ],
      popular: false,
      type: "cleansing",
      rating: 4.7,
      reviewCount: 156,
      benefits: [
        "Deeply cleanses and unclogs pores",
        "Removes blackheads and impurities",
        "Balances oil production",
        "Prevents future breakouts",
        "Refines pore appearance",
      ],
      recommended: ["Oily skin", "Combination skin", "Congested pores", "Acne-prone skin", "Blackheads and whiteheads"],
      process: [
        { step: "Double cleanse", time: "10 min" },
        { step: "Enzyme exfoliation", time: "10 min" },
        { step: "Steam treatment", time: "10 min" },
        { step: "Professional extractions", time: "15 min" },
        { step: "Purifying clay mask", time: "10 min" },
        { step: "Oil-free hydration", time: "5 min" },
      ],
      aftercare: [
        "Avoid touching your face unnecessarily",
        "Use non-comedogenic skincare products",
        "Cleanse morning and night",
        "Exfoliate 2-3 times weekly",
        "Stay hydrated and maintain a balanced diet",
      ],
      therapists: [
        { id: "priya", name: "Priya Sharma", specialty: "Acne and Problematic Skin" },
        { id: "james", name: "James Wilson", specialty: "Advanced Facial Techniques" },
        { id: "sofia", name: "Sofia Rodriguez", specialty: "Botanical Skincare" },
      ],
      related: ["acne-clearing", "sensitive-skin", "mens-executive"],
    },
    "brightening-vitamin": {
      id: "brightening-vitamin",
      title: "Brightening Vitamin C Facial",
      description:
        "Illuminate your complexion with our vitamin C-infused facial that reduces dark spots and evens skin tone for a brighter appearance.",
      fullDescription:
        "Our Brightening Vitamin C Facial is a powerful treatment designed to illuminate the complexion, even skin tone, and reduce the appearance of dark spots and hyperpigmentation. This facial harnesses the power of stabilized vitamin C, a potent antioxidant known for its brightening and protective properties. The treatment begins with a gentle brightening cleanser, followed by a fruit enzyme exfoliation to remove dull surface cells. A specialized vitamin C mask delivers a concentrated dose of this powerful ingredient deep into the skin, while our signature facial massage enhances circulation and product absorption. The facial concludes with the application of a brightening serum and broad-spectrum SPF to protect the newly revealed skin. Experience a more radiant, even-toned complexion with improved clarity and luminosity.",
      duration: 60,
      price: 3500,
      image: "https://images.unsplash.com/photo-1596178060810-72c633ce9522?q=80&w=2069&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1596178060810-72c633ce9522?q=80&w=2069&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop",
      ],
      type: "brightening",
      popular: true,
      rating: 4.8,
      reviewCount: 112,
      benefits: [
        "Brightens and illuminates dull skin",
        "Reduces dark spots and hyperpigmentation",
        "Evens skin tone and texture",
        "Protects against environmental damage",
        "Stimulates collagen production",
      ],
      recommended: [
        "Dull, lackluster skin",
        "Uneven skin tone",
        "Sun damage",
        "Dark spots and hyperpigmentation",
        "Environmental damage",
      ],
      process: [
        { step: "Brightening cleanse", time: "5 min" },
        { step: "Fruit enzyme exfoliation", time: "10 min" },
        { step: "Vitamin C infusion", time: "10 min" },
        { step: "Brightening mask", time: "15 min" },
        { step: "Antioxidant facial massage", time: "10 min" },
        { step: "Brightening serum and SPF application", time: "10 min" },
      ],
      aftercare: [
        "Apply vitamin C serum daily",
        "Use broad-spectrum SPF every morning",
        "Avoid direct sun exposure for 48 hours",
        "Continue with brightening home care products",
        "Reapply sunscreen throughout the day",
      ],
      therapists: [
        { id: "aisha", name: "Aisha Patel", specialty: "Hydration Specialist" },
        { id: "elena", name: "Elena Petrova", specialty: "Anti-Aging Expert" },
        { id: "sofia", name: "Sofia Rodriguez", specialty: "Botanical Skincare" },
      ],
      related: ["hydrating-glow", "anti-aging-lift", "gold-infusion"],
    },
  }

  const facial = facials[facialId as keyof typeof facials]

  if (!facial) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-2xl font-bold mb-4">Treatment Not Found</h1>
        <p className="text-muted-foreground mb-6">The facial treatment you're looking for doesn't exist.</p>
        <Button asChild>
          <Link href="/guest/spa/facial">View All Facial Treatments</Link>
        </Button>
      </div>
    )
  }

  const handleBooking = () => {
    if (!date || !timeSlot || !therapist) {
      toast({
        title: "Missing information",
        description: "Please select a date, time and therapist to book your treatment.",
        variant: "destructive",
      })
      return
    }

    setBookingComplete(true)
    toast({
      title: "Booking Confirmed!",
      description: `Your ${facial.title} has been booked for ${date.toLocaleDateString()} at ${timeSlot}.`,
    })
  }

  const timeSlots = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM", "6:00 PM"]

  const relatedFacials = facial.related.map((id) => facials[id as keyof typeof facials]).filter(Boolean)

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
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/guest/spa/facial/${facial.id}`}>{facial.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/guest/spa/facials">
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">{facial.title}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <Image src={facial.image || "/placeholder.svg"} fill alt={facial.title} className="object-cover" />
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-goldfinch-gold text-goldfinch-gold" />
              <span className="font-medium">{facial.rating}</span>
              <span className="text-muted-foreground">({facial.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{facial.duration} minutes</span>
            </div>
            <Badge variant="outline" className="border-goldfinch-gold/30 text-goldfinch-gold">
              {facial.type.charAt(0).toUpperCase() + facial.type.slice(1)}
            </Badge>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="process">Process</TabsTrigger>
              <TabsTrigger value="aftercare">Aftercare</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4">
              <div>
                <h2 className="text-lg font-medium mb-2">Description</h2>
                <p className="text-muted-foreground">{facial.fullDescription}</p>
              </div>
              <div>
                <h2 className="text-lg font-medium mb-2">Benefits</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {facial.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-goldfinch-gold shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-medium mb-2">Recommended For</h2>
                <div className="flex flex-wrap gap-2">
                  {facial.recommended.map((item, index) => (
                    <Badge key={index} variant="secondary">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="process" className="space-y-4">
              <h2 className="text-lg font-medium mb-2">Treatment Process</h2>
              <div className="space-y-4">
                {facial.process.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-goldfinch-gold/10 rounded-full h-8 w-8 flex items-center justify-center text-goldfinch-gold font-medium shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{step.step}</h3>
                        <span className="text-sm text-muted-foreground">{step.time}</span>
                      </div>
                      <Separator className="my-2" />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="aftercare" className="space-y-4">
              <h2 className="text-lg font-medium mb-2">Aftercare Recommendations</h2>
              <ul className="space-y-3">
                {facial.aftercare.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-goldfinch-gold shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="reviews" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Guest Reviews</h2>
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-goldfinch-gold text-goldfinch-gold" />
                  <span className="font-medium text-lg">{facial.rating}</span>
                  <span className="text-muted-foreground">({facial.reviewCount})</span>
                </div>
              </div>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Excellent facial experience</CardTitle>
                        <CardDescription>Sarah J. - 2 weeks ago</CardDescription>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= 5 ? "fill-goldfinch-gold text-goldfinch-gold" : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      This facial was exactly what my skin needed. The therapist was knowledgeable and attentive, and my
                      skin looked amazing afterward. Will definitely book again!
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Relaxing and effective</CardTitle>
                        <CardDescription>Michael T. - 1 month ago</CardDescription>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= 4 ? "fill-goldfinch-gold text-goldfinch-gold" : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      I don't usually get facials, but this was recommended by a friend. The experience was relaxing and
                      my skin felt great afterward. The therapist explained everything clearly.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Transformed my skin</CardTitle>
                        <CardDescription>Priya M. - 2 months ago</CardDescription>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= 5 ? "fill-goldfinch-gold text-goldfinch-gold" : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      I've had this facial three times now and it's made a noticeable difference to my skin. The
                      therapists are all excellent and the spa environment is so peaceful. Highly recommend!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Book This Treatment</CardTitle>
              <CardDescription>
                ₹{facial.price} • {facial.duration} minutes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-goldfinch-gold hover:bg-goldfinch-gold/90 gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    Select Date & Time
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Book Your Appointment</DialogTitle>
                    <DialogDescription>
                      Select your preferred date, time and therapist for your {facial.title}.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Select Date</Label>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border mx-auto"
                        disabled={(date) =>
                          date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 2))
                        }
                      />
                    </div>
                    {date && (
                      <div className="space-y-2">
                        <Label>Select Time</Label>
                        <div className="grid grid-cols-3 gap-2">
                          {timeSlots.map((slot) => (
                            <Button
                              key={slot}
                              type="button"
                              variant={timeSlot === slot ? "default" : "outline"}
                              className={timeSlot === slot ? "bg-goldfinch-gold hover:bg-goldfinch-gold/90" : ""}
                              onClick={() => setTimeSlot(slot)}
                            >
                              {slot}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                    {date && timeSlot && (
                      <div className="space-y-2">
                        <Label>Select Therapist</Label>
                        <RadioGroup value={therapist} onValueChange={setTherapist}>
                          {facial.therapists.map((t) => (
                            <div key={t.id} className="flex items-center space-x-2">
                              <RadioGroupItem value={t.id} id={t.id} />
                              <Label htmlFor={t.id} className="flex flex-col">
                                <span>{t.name}</span>
                                <span className="text-xs text-muted-foreground">{t.specialty}</span>
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="special-requests">Special Requests (Optional)</Label>
                      <Textarea
                        id="special-requests"
                        placeholder="Any special requests or concerns..."
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      className="bg-goldfinch-gold hover:bg-goldfinch-gold/90"
                      onClick={handleBooking}
                      disabled={!date || !timeSlot || !therapist || bookingComplete}
                    >
                      {bookingComplete ? "Booking Confirmed" : "Confirm Booking"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-goldfinch-gold shrink-0 mt-0.5" />
                  <span className="text-sm">Professional spa therapists</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-goldfinch-gold shrink-0 mt-0.5" />
                  <span className="text-sm">Premium skincare products</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-goldfinch-gold shrink-0 mt-0.5" />
                  <span className="text-sm">Complimentary spa access</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-goldfinch-gold shrink-0 mt-0.5" />
                  <span className="text-sm">Free cancellation 24h before</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-medium">Have Questions?</h3>
                <Button variant="outline" className="w-full gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Contact Spa Reception
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
