"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronUp, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState("")

  // List of all sections for the table of contents
  const sections = [
    { id: "acceptance", title: "Acceptance of Terms" },
    { id: "definitions", title: "Definitions" },
    { id: "account", title: "Account Registration" },
    { id: "booking", title: "Booking & Reservations" },
    { id: "cancellation", title: "Cancellation & Refunds" },
    { id: "payment", title: "Payment Terms" },
    { id: "conduct", title: "Guest Conduct" },
    { id: "intellectual-property", title: "Intellectual Property" },
    { id: "liability", title: "Limitation of Liability" },
    { id: "indemnification", title: "Indemnification" },
    { id: "dispute", title: "Dispute Resolution" },
    { id: "modifications", title: "Modifications to Terms" },
    { id: "governing-law", title: "Governing Law" },
    { id: "contact", title: "Contact Information" },
  ]

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      // Find the section that is currently in view
      const currentSection = sections
        .map((section) => {
          const element = document.getElementById(section.id)
          if (!element) return { id: section.id, position: -1 }
          return {
            id: section.id,
            position: element.offsetTop,
          }
        })
        .filter((section) => section.position <= scrollPosition)
        .sort((a, b) => b.position - a.position)[0]

      if (currentSection && currentSection.id !== activeSection) {
        setActiveSection(currentSection.id)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Call once on mount to set initial active section

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [activeSection, sections])

  // Scroll to section when clicking on table of contents
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 20,
        behavior: "smooth",
      })
    }
  }

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div className="min-h-screen bg-goldfinch-ivory">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header with navigation */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 text-goldfinch-gold hover:text-goldfinch-gold/80">
              <Home className="h-5 w-5" />
              <span>Return to Home</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/stylized-goldfinch.png"
              width={40}
              height={40}
              alt="Goldfinch Hotels"
              className="h-10 w-auto"
            />
            <span className="text-xl font-semibold">Goldfinch</span>
          </div>
        </div>

        {/* Main title */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold md:text-4xl">Terms of Service</h1>
          <p className="mt-2 text-muted-foreground">Last Updated: April 23, 2023</p>
        </div>

        {/* Content with sidebar */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar with table of contents */}
          <div className="order-2 lg:order-1 lg:col-span-1">
            <div className="sticky top-8 rounded-lg border bg-card p-4 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold">Table of Contents</h2>
              <nav>
                <ul className="space-y-2">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left text-sm hover:text-goldfinch-gold ${
                          activeSection === section.id ? "font-medium text-goldfinch-gold" : "text-muted-foreground"
                        }`}
                      >
                        {section.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Main content */}
          <div className="order-1 lg:order-2 lg:col-span-3">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle id="acceptance">1. Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed">
                <p>
                  Welcome to Goldfinch Hotels. By accessing or using our website, mobile application, or any of our
                  services, you agree to be bound by these Terms of Service. These Terms constitute a legally binding
                  agreement between you and Goldfinch Hotels regarding your use of our services.
                </p>
                <p>
                  If you do not agree to these Terms, please do not use our services. By accessing or using our
                  services, you represent that you have read, understood, and agree to be bound by these Terms.
                </p>
                <p>
                  We may modify these Terms at any time. Your continued use of our services following any changes
                  constitutes your acceptance of the revised Terms.
                </p>
                <div className="flex justify-end">
                  <Button variant="link" size="sm" onClick={scrollToTop} className="text-goldfinch-gold">
                    Back to top <ChevronUp className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle id="definitions">2. Definitions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed">
                <p>Throughout these Terms, the following definitions apply:</p>
                <ul className="list-inside list-disc space-y-2 pl-4">
                  <li>
                    <strong>"Services"</strong> refers to our website, mobile application, hotel accommodations, dining
                    services, spa services, and all other services offered by Goldfinch Hotels.
                  </li>
                  <li>
                    <strong>"User," "you," or "your"</strong> refers to any individual who accesses or uses our
                    Services.
                  </li>
                  <li>
                    <strong>"Goldfinch Hotels," "we," "us," or "our"</strong> refers to Goldfinch Luxury Hotels &
                    Resorts Ltd., its subsidiaries, affiliates, officers, directors, employees, and agents.
                  </li>
                  <li>
                    <strong>"Content"</strong> refers to all text, images, videos, audio, and other materials that
                    appear on or through our Services.
                  </li>
                  <li>
                    <strong>"Reservation"</strong> refers to a booking made through our Services for accommodations or
                    other hotel services.
                  </li>
                </ul>
                <div className="flex justify-end">
                  <Button variant="link" size="sm" onClick={scrollToTop} className="text-goldfinch-gold">
                    Back to top <ChevronUp className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle id="account">3. Account Registration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed">
                <p>
                  To access certain features of our Services, you may need to register for an account. When you
                  register, you agree to provide accurate, current, and complete information about yourself.
                </p>
                <p>
                  You are responsible for maintaining the confidentiality of your account credentials and for all
                  activities that occur under your account. You agree to notify us immediately of any unauthorized use
                  of your account.
                </p>
                <p>
                  We reserve the right to suspend or terminate your account if any information provided during
                  registration or thereafter proves to be inaccurate, false, or misleading, or if you fail to comply
                  with these Terms.
                </p>
                <p>
                  You must be at least 18 years old to create an account. By creating an account, you represent and
                  warrant that you are at least 18 years of age.
                </p>
                <div className="flex justify-end">
                  <Button variant="link" size="sm" onClick={scrollToTop} className="text-goldfinch-gold">
                    Back to top <ChevronUp className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle id="booking">4. Booking & Reservations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed">
                <p>
                  All reservations made through our Services are subject to availability and acceptance by Goldfinch
                  Hotels. A reservation is not confirmed until you receive a confirmation notice with a reservation
                  number.
                </p>
                <p>
                  When making a reservation, you agree to provide accurate and complete information, including contact
                  details and payment information. You must be at least 18 years old to make a reservation.
                </p>
                <p>
                  Room rates are per room per night and are subject to applicable taxes and fees. Additional charges may
                  apply for extra guests, amenities, or services requested during your stay.
                </p>
                <p>
                  Check-in time is typically 3:00 PM, and check-out time is typically 12:00 PM. Early check-in and late
                  check-out may be available for an additional fee, subject to availability.
                </p>
                <p>
                  Special requests made during the reservation process (such as room preferences, accessibility needs,
                  or additional amenities) are subject to availability and cannot be guaranteed.
                </p>
                <div className="flex justify-end">
                  <Button variant="link" size="sm" onClick={scrollToTop} className="text-goldfinch-gold">
                    Back to top <ChevronUp className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle id="cancellation">5. Cancellation & Refunds</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed">
                <p>
                  Cancellation policies vary depending on the type of reservation, rate plan, and property. The specific
                  cancellation policy applicable to your reservation will be displayed during the booking process and in
                  your confirmation email.
                </p>
                <p>Standard cancellation policies typically include:</p>
                <ul className="list-inside list-disc space-y-2 pl-4">
                  <li>
                    <strong>Flexible Rate:</strong> Cancellations made at least 24 hours prior to the check-in date are
                    eligible for a full refund. Cancellations made less than 24 hours before check-in are subject to a
                    charge equivalent to one night's stay.
                  </li>
                  <li>
                    <strong>Non-Refundable Rate:</strong> These special rates offer discounts in exchange for no
                    cancellation flexibility. Payment is charged at the time of booking and is non-refundable.
                  </li>
                  <li>
                    <strong>Group Bookings:</strong> Group reservations (5 or more rooms) have specific cancellation
                    policies outlined in the group contract.
                  </li>
                </ul>
                <p>
                  For reservations made through third-party booking platforms, the cancellation policy of that platform
                  will apply.
                </p>
                <p>
                  In the event of extraordinary circumstances (such as severe weather, natural disasters, or government
                  travel restrictions), modified cancellation policies may apply at our discretion.
                </p>
                <div className="flex justify-end">
                  <Button variant="link" size="sm" onClick={scrollToTop} className="text-goldfinch-gold">
                    Back to top <ChevronUp className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle id="payment">6. Payment Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed">
                <p>
                  By providing payment information, you represent and warrant that you have the legal right to use the
                  payment method provided and that the information you supply is accurate.
                </p>
                <p>Payment policies typically include:</p>
                <ul className="list-inside list-disc space-y-2 pl-4">
                  <li>
                    <strong>Reservation Guarantee:</strong> A valid credit card is required to guarantee your
                    reservation. Depending on the rate plan, your card may be charged at the time of booking or upon
                    check-in.
                  </li>
                  <li>
                    <strong>Security Deposit:</strong> Upon check-in, we may place a hold on your credit card for
                    incidental charges. This hold will be released upon check-out, less any charges incurred during your
                    stay.
                  </li>
                  <li>
                    <strong>Currency:</strong> All rates are quoted and charged in the local currency of the hotel
                    location. Currency conversion is subject to your credit card company's policies and exchange rates.
                  </li>
                </ul>
                <p>
                  Additional charges may be incurred for services used during your stay, including but not limited to
                  dining, spa services, minibar, room service, and damage to hotel property.
                </p>
                <p>
                  All outstanding charges must be paid in full upon check-out. Failure to pay may result in legal action
                  and reporting to credit agencies.
                </p>
                <div className="flex justify-end">
                  <Button variant="link" size="sm" onClick={scrollToTop} className="text-goldfinch-gold">
                    Back to top <ChevronUp className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle id="conduct">7. Guest Conduct</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed">
                <p>
                  While staying at Goldfinch Hotels, you agree to conduct yourself in a respectful manner and to comply
                  with all hotel policies and rules.
                </p>
                <p>Prohibited conduct includes, but is not limited to:</p>
                <ul className="list-inside list-disc space-y-2 pl-4">
                  <li>Engaging in illegal activities on hotel premises</li>
                  <li>Causing damage to hotel property</li>
                  <li>Creating excessive noise that disturbs other guests</li>
                  <li>Smoking in non-smoking areas</li>
                  <li>Bringing pets into non-pet-friendly areas</li>
                  <li>Exceeding the maximum occupancy of your room</li>
                  <li>Harassment or threatening behavior toward staff or other guests</li>
                </ul>
                <p>
                  We reserve the right to refuse service, terminate reservations, or remove guests who engage in
                  prohibited conduct, without refund.
                </p>
                <p>
                  You are responsible for any damage to hotel property caused by you or your guests during your stay.
                  You agree to pay for any such damage upon request.
                </p>
                <div className="flex justify-end">
                  <Button variant="link" size="sm" onClick={scrollToTop} className="text-goldfinch-gold">
                    Back to top <ChevronUp className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle id="intellectual-property">8. Intellectual Property</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed">
                <p>
                  All content on our Services, including but not limited to text, graphics, logos, images, audio clips,
                  digital downloads, and software, is the property of Goldfinch Hotels or its content suppliers and is
                  protected by international copyright, trademark, and other intellectual property laws.
                </p>
                <p>
                  You may access, view, download, and print content from our Services for your personal, non-commercial
                  use only. You may not reproduce, modify, distribute, display, perform, or create derivative works from
                  any content without our express written permission.
                </p>
                <p>
                  The Goldfinch Hotels name, logo, and all related names, logos, product and service names, designs, and
                  slogans are trademarks of Goldfinch Hotels or its affiliates. You may not use these marks without our
                  prior written permission.
                </p>
                <p>
                  By submitting content to our Services (such as reviews, feedback, or photos), you grant Goldfinch
                  Hotels a worldwide, non-exclusive, royalty-free, perpetual, irrevocable right to use, reproduce,
                  modify, adapt, publish, translate, create derivative works from, distribute, and display such content
                  in any media.
                </p>
                <div className="flex justify-end">
                  <Button variant="link" size="sm" onClick={scrollToTop} className="text-goldfinch-gold">
                    Back to top <ChevronUp className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle id="liability">9. Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed">
                <p>
                  To the maximum extent permitted by applicable law, Goldfinch Hotels and its affiliates, officers,
                  directors, employees, and agents shall not be liable for any direct, indirect, incidental, special,
                  consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill,
                  or other intangible losses, resulting from:
                </p>
                <ul className="list-inside list-disc space-y-2 pl-4">
                  <li>Your access to or use of, or inability to access or use, our Services</li>
                  <li>Any conduct or content of any third party on our Services</li>
                  <li>Any content obtained from our Services</li>
                  <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                  <li>
                    Loss or damage to personal belongings during your stay, except as may be covered under applicable
                    laws governing innkeeper liability
                  </li>
                </ul>
                <p>
                  In no event shall our total liability to you for all claims exceed the amount paid by you, if any, for
                  accessing or using our Services during the twelve (12) months preceding your claim.
                </p>
                <p>
                  Some jurisdictions do not allow the exclusion of certain warranties or the limitation or exclusion of
                  liability for certain types of damages. Accordingly, some of the above limitations may not apply to
                  you.
                </p>
                <div className="flex justify-end">
                  <Button variant="link" size="sm" onClick={scrollToTop} className="text-goldfinch-gold">
                    Back to top <ChevronUp className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle id="indemnification">10. Indemnification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed">
                <p>
                  You agree to defend, indemnify, and hold harmless Goldfinch Hotels and its affiliates, officers,
                  directors, employees, and agents from and against any and all claims, damages, obligations, losses,
                  liabilities, costs or debt, and expenses (including but not limited to attorney's fees) arising from:
                </p>
                <ul className="list-inside list-disc space-y-2 pl-4">
                  <li>Your use of and access to our Services</li>
                  <li>Your violation of any term of these Terms</li>
                  <li>
                    Your violation of any third-party right, including without limitation any copyright, property, or
                    privacy right
                  </li>
                  <li>Any claim that your content caused damage to a third party</li>
                  <li>Any damage you cause to hotel property during your stay</li>
                </ul>
                <p>
                  This defense and indemnification obligation will survive these Terms and your use of our Services.
                </p>
                <div className="flex justify-end">
                  <Button variant="link" size="sm" onClick={scrollToTop} className="text-goldfinch-gold">
                    Back to top <ChevronUp className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle id="dispute">11. Dispute Resolution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed">
                <p>
                  We encourage you to contact us directly to resolve any concerns or disputes you may have regarding our
                  Services. Please contact our customer service team at support@goldfinchhotels.com or speak with a
                  manager during your stay.
                </p>
                <p>
                  For any dispute not resolved through direct communication, you agree to first attempt to resolve the
                  dispute informally by contacting us. If we are unable to resolve the dispute informally, then:
                </p>
                <ul className="list-inside list-disc space-y-2 pl-4">
                  <li>
                    <strong>For guests in the United States:</strong> Any dispute arising from these Terms or your use
                    of our Services shall be resolved through binding arbitration in accordance with the American
                    Arbitration Association's rules. The arbitration shall take place in [City, State], and judgment on
                    the arbitration award may be entered in any court having jurisdiction.
                  </li>
                  <li>
                    <strong>For guests outside the United States:</strong> Any dispute shall be resolved in accordance
                    with the laws of the country in which the hotel is located, and you consent to the exclusive
                    jurisdiction of the courts in that location.
                  </li>
                </ul>
                <p>
                  Notwithstanding the foregoing, either party may seek injunctive or other equitable relief in any court
                  of competent jurisdiction.
                </p>
                <p>
                  Any claim arising out of or relating to these Terms must be filed within one (1) year after such claim
                  arose, otherwise, the claim is permanently barred.
                </p>
                <div className="flex justify-end">
                  <Button variant="link" size="sm" onClick={scrollToTop} className="text-goldfinch-gold">
                    Back to top <ChevronUp className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle id="modifications">12. Modifications to Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed">
                <p>
                  We reserve the right to modify these Terms at any time. All changes are effective immediately upon
                  posting on our website. Your continued use of our Services following the posting of revised Terms
                  means that you accept and agree to the changes.
                </p>
                <p>
                  We will provide notice of material changes to these Terms by posting a notice on our website or
                  sending an email to the address associated with your account.
                </p>
                <p>
                  It is your responsibility to check these Terms periodically for changes. If you do not agree to the
                  revised Terms, you must stop using our Services.
                </p>
                <p>
                  For reservations made prior to a change in these Terms, the Terms in effect at the time of booking
                  will apply to that reservation.
                </p>
                <div className="flex justify-end">
                  <Button variant="link" size="sm" onClick={scrollToTop} className="text-goldfinch-gold">
                    Back to top <ChevronUp className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle id="governing-law">13. Governing Law</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed">
                <p>
                  These Terms and your use of our Services shall be governed by and construed in accordance with the
                  laws of the jurisdiction in which the Goldfinch Hotel property is located, without giving effect to
                  any principles of conflicts of law.
                </p>
                <p>
                  For properties located in the United States, these Terms shall be governed by the laws of the state in
                  which the property is located, without regard to its conflict of law provisions.
                </p>
                <p>
                  For properties located outside the United States, these Terms shall be governed by the laws of the
                  country in which the property is located.
                </p>
                <p>
                  The United Nations Convention on Contracts for the International Sale of Goods does not apply to these
                  Terms.
                </p>
                <div className="flex justify-end">
                  <Button variant="link" size="sm" onClick={scrollToTop} className="text-goldfinch-gold">
                    Back to top <ChevronUp className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle id="contact">14. Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed">
                <p>
                  If you have any questions about these Terms, please contact us using one of the following methods:
                </p>
                <ul className="list-inside list-disc space-y-2 pl-4">
                  <li>
                    <strong>Email:</strong> legal@goldfinchhotels.com
                  </li>
                  <li>
                    <strong>Phone:</strong> +1 (800) 555-1234
                  </li>
                  <li>
                    <strong>Mail:</strong>
                    <br />
                    Goldfinch Hotels Legal Department
                    <br />
                    123 Luxury Avenue
                    <br />
                    Mumbai, Maharashtra 400001
                    <br />
                    India
                  </li>
                </ul>
                <p>
                  For reservations or customer service inquiries, please contact reservations@goldfinchhotels.com or
                  call +1 (800) 555-5678.
                </p>
                <div className="flex justify-end">
                  <Button variant="link" size="sm" onClick={scrollToTop} className="text-goldfinch-gold">
                    Back to top <ChevronUp className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Final acknowledgment */}
            <Card className="mb-8">
              <CardContent className="py-6 text-center text-sm">
                <p>
                  By using our Services, you acknowledge that you have read, understood, and agree to be bound by these
                  Terms of Service.
                </p>
                <Button onClick={scrollToTop} className="mt-4 bg-goldfinch-gold text-white hover:bg-goldfinch-gold/90">
                  Back to top <ChevronUp className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
