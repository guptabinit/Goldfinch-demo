"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Search, Phone, Mail, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would search the FAQs
    console.log("Searching FAQs for:", searchQuery)
  }

  const faqCategories = [
    {
      id: "general",
      title: "General",
      faqs: [
        {
          id: "check-in",
          question: "What are the check-in and check-out times?",
          answer:
            "Check-in time is 2:00 PM and check-out time is 12:00 PM. Early check-in and late check-out can be arranged based on availability and may incur additional charges.",
        },
        {
          id: "wifi",
          question: "Is Wi-Fi available at the hotel?",
          answer: "Yes, complimentary high-speed Wi-Fi is available throughout the hotel for all guests.",
        },
        {
          id: "parking",
          question: "Is parking available?",
          answer:
            "Yes, we offer both valet parking and self-parking options. Valet parking is available at ₹500 per day, while self-parking is available at ₹300 per day.",
        },
      ],
    },
    {
      id: "services",
      title: "Services & Amenities",
      faqs: [
        {
          id: "room-service",
          question: "What are the room service hours?",
          answer:
            "Room service is available 24 hours a day, 7 days a week. A full menu is available from 6:00 AM to 11:00 PM, with a limited menu available overnight.",
        },
        {
          id: "spa",
          question: "How do I book a spa treatment?",
          answer:
            "Spa treatments can be booked through this app, by calling the spa directly at extension 3, or by visiting the spa reception on the 3rd floor.",
        },
        {
          id: "gym",
          question: "What are the fitness center hours?",
          answer: "Our fitness center is open 24 hours a day and is accessible with your room key card.",
        },
      ],
    },
    {
      id: "billing",
      title: "Billing & Payments",
      faqs: [
        {
          id: "payment-methods",
          question: "What payment methods are accepted?",
          answer:
            "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, and cash. Digital payment options like UPI, PayTM, and Google Pay are also available.",
        },
        {
          id: "deposit",
          question: "Is a deposit required at check-in?",
          answer:
            "Yes, a pre-authorization hold for incidentals is required at check-in. This is typically ₹5,000 per night and will be released upon check-out if no additional charges are incurred.",
        },
        {
          id: "invoice",
          question: "How can I get a copy of my invoice?",
          answer:
            "A detailed invoice will be provided at check-out. If you need an additional copy, you can request it from the front desk or through this app under 'My Stays'.",
        },
      ],
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
            <BreadcrumbLink href="/guest/help">Help & Support</BreadcrumbLink>
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
        <h1 className="text-xl font-semibold">Help & Support</h1>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <Input
          type="search"
          placeholder="Search for answers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-goldfinch-gold/20 focus:border-goldfinch-gold"
        />
        <Button type="submit" className="bg-goldfinch-gold hover:bg-goldfinch-gold/90">
          <Search className="h-4 w-4" />
        </Button>
      </form>

      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="faq">FAQs</TabsTrigger>
          <TabsTrigger value="contact">Contact Us</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="mt-6">
          <div className="space-y-6">
            {faqCategories.map((category) => (
              <Card key={category.id} className="overflow-hidden luxury-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.faqs.map((faq) => (
                      <AccordionItem key={faq.id} value={faq.id}>
                        <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contact" className="mt-6">
          <Card className="overflow-hidden luxury-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-goldfinch-gold/10 p-3">
                    <Phone className="h-5 w-5 text-goldfinch-gold" />
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-sm text-muted-foreground mb-1">We're available 24/7</p>
                    <p className="text-sm">
                      From your room: <span className="font-medium">Dial 0</span>
                    </p>
                    <p className="text-sm">
                      External: <span className="font-medium">+91 22 1234 5678</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-goldfinch-gold/10 p-3">
                    <Mail className="h-5 w-5 text-goldfinch-gold" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-sm text-muted-foreground mb-1">We'll respond within 24 hours</p>
                    <p className="text-sm">
                      Guest Services: <span className="font-medium">guest@goldfinchhotels.com</span>
                    </p>
                    <p className="text-sm">
                      Reservations: <span className="font-medium">reservations@goldfinchhotels.com</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-full bg-goldfinch-gold/10 p-3">
                  <MessageSquare className="h-5 w-5 text-goldfinch-gold" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Live Chat</h3>
                  <p className="text-sm text-muted-foreground mb-3">Chat with our guest services team</p>
                  <Button className="w-full bg-goldfinch-gold hover:bg-goldfinch-gold/90">Start Chat</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden luxury-shadow mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      className="border-goldfinch-gold/20 focus:border-goldfinch-gold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your email"
                      className="border-goldfinch-gold/20 focus:border-goldfinch-gold"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    placeholder="How can we help you?"
                    className="border-goldfinch-gold/20 focus:border-goldfinch-gold"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Please provide details about your inquiry..."
                    className="w-full min-h-[100px] rounded-md border border-goldfinch-gold/20 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-goldfinch-gold focus:border-goldfinch-gold"
                  ></textarea>
                </div>
                <Button type="submit" className="w-full bg-goldfinch-gold hover:bg-goldfinch-gold/90">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
