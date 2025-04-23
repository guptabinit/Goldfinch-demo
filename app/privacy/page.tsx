"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronLeft, ChevronUp } from "lucide-react"

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const scrollToSection = (id: string) => {
    setActiveSection(id)
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -80 // Header offset
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "information-collection", title: "Information We Collect" },
    { id: "information-usage", title: "How We Use Your Information" },
    { id: "information-sharing", title: "Information Sharing and Disclosure" },
    { id: "data-security", title: "Data Security" },
    { id: "cookies", title: "Cookies and Tracking Technologies" },
    { id: "your-rights", title: "Your Rights and Choices" },
    { id: "international", title: "International Data Transfers" },
    { id: "children", title: "Children's Privacy" },
    { id: "updates", title: "Updates to This Privacy Policy" },
    { id: "contact", title: "Contact Us" },
  ]

  return (
    <div className="min-h-screen bg-goldfinch-ivory">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-goldfinch-brown hover:text-goldfinch-gold transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Table of Contents - Sticky on desktop */}
          <div className="md:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-20">
              <h2 className="text-xl font-semibold mb-4 text-goldfinch-brown">Table of Contents</h2>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={`text-left w-full hover:text-goldfinch-gold transition-colors ${
                        activeSection === section.id ? "text-goldfinch-gold font-medium" : "text-goldfinch-brown"
                      }`}
                    >
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-2/3">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-goldfinch-brown mb-2">Privacy Policy</h1>
                <p className="text-goldfinch-brown/80">Last Updated: April 23, 2025</p>
              </div>

              <section id="introduction" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-goldfinch-brown">Introduction</h2>
                <p className="mb-4">
                  Welcome to The Goldfinch Hotel. We respect your privacy and are committed to protecting your personal
                  data. This privacy policy will inform you about how we look after your personal data when you visit
                  our website and tell you about your privacy rights and how the law protects you.
                </p>
                <p className="mb-4">
                  This privacy policy applies to all personal information we collect through our website, mobile
                  applications, during your stay at our properties, and through other interactions with us.
                </p>
                <div className="text-right">
                  <button
                    onClick={scrollToTop}
                    className="text-goldfinch-gold hover:text-goldfinch-brown inline-flex items-center"
                  >
                    Back to top <ChevronUp className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </section>

              <section id="information-collection" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-goldfinch-brown">Information We Collect</h2>
                <p className="mb-4">
                  We collect several types of information from and about users of our website and services, including:
                </p>
                <h3 className="text-xl font-medium mb-2 text-goldfinch-brown">Personal Information</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Contact information (name, email address, postal address, phone number)</li>
                  <li>Reservation details (dates of arrival and departure, special requests)</li>
                  <li>Payment information (credit card details, billing address)</li>
                  <li>Identity verification information (passport or ID details when required by law)</li>
                  <li>Guest preferences and feedback</li>
                  <li>Loyalty program information</li>
                </ul>

                <h3 className="text-xl font-medium mb-2 text-goldfinch-brown">Automatically Collected Information</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Usage details (IP address, browser type, operating system)</li>
                  <li>Navigation patterns and interactions with our website</li>
                  <li>Device information (device type, unique device identifier)</li>
                  <li>Location data (if permitted by your device settings)</li>
                </ul>
                <div className="text-right">
                  <button
                    onClick={scrollToTop}
                    className="text-goldfinch-gold hover:text-goldfinch-brown inline-flex items-center"
                  >
                    Back to top <ChevronUp className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </section>

              <section id="information-usage" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-goldfinch-brown">How We Use Your Information</h2>
                <p className="mb-4">We use the information we collect about you for various purposes, including:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Processing and managing your reservations and stay</li>
                  <li>Providing and personalizing our services to meet your preferences</li>
                  <li>Processing payments and preventing fraudulent transactions</li>
                  <li>Communicating with you about your reservation, services, or inquiries</li>
                  <li>Sending you marketing communications (with your consent where required)</li>
                  <li>Improving our website, applications, and services</li>
                  <li>Conducting analytics and research to enhance guest experiences</li>
                  <li>Complying with legal obligations and enforcing our terms</li>
                </ul>
                <p className="mb-4">
                  We process your personal information based on one or more of the following legal grounds:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>To perform our contract with you</li>
                  <li>To comply with legal obligations</li>
                  <li>For our legitimate business interests</li>
                  <li>With your consent (where applicable)</li>
                </ul>
                <div className="text-right">
                  <button
                    onClick={scrollToTop}
                    className="text-goldfinch-gold hover:text-goldfinch-brown inline-flex items-center"
                  >
                    Back to top <ChevronUp className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </section>

              <section id="information-sharing" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-goldfinch-brown">Information Sharing and Disclosure</h2>
                <p className="mb-4">We may share your personal information with:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>
                    Service providers who perform services on our behalf (payment processors, IT providers, marketing
                    partners)
                  </li>
                  <li>Other Goldfinch Hotel properties and affiliated companies</li>
                  <li>Business partners (when you opt in to their services or promotions)</li>
                  <li>Legal authorities when required by law or to protect our rights</li>
                  <li>Potential buyers in the event of a business transaction (merger, acquisition, or sale)</li>
                </ul>
                <p className="mb-4">
                  We do not sell your personal information to third parties for their own marketing purposes.
                </p>
                <div className="text-right">
                  <button
                    onClick={scrollToTop}
                    className="text-goldfinch-gold hover:text-goldfinch-brown inline-flex items-center"
                  >
                    Back to top <ChevronUp className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </section>

              <section id="data-security" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-goldfinch-brown">Data Security</h2>
                <p className="mb-4">
                  We have implemented appropriate technical and organizational measures to protect your personal
                  information against unauthorized access, loss, or alteration. These include:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Encryption of sensitive data</li>
                  <li>Secure network infrastructure with firewalls</li>
                  <li>Regular security assessments and testing</li>
                  <li>Access controls and authentication procedures</li>
                  <li>Staff training on data protection and security</li>
                </ul>
                <p className="mb-4">
                  While we strive to protect your personal information, no method of transmission over the Internet or
                  electronic storage is 100% secure. We cannot guarantee absolute security of your data.
                </p>
                <div className="text-right">
                  <button
                    onClick={scrollToTop}
                    className="text-goldfinch-gold hover:text-goldfinch-brown inline-flex items-center"
                  >
                    Back to top <ChevronUp className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </section>

              <section id="cookies" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-goldfinch-brown">Cookies and Tracking Technologies</h2>
                <p className="mb-4">
                  We use cookies and similar tracking technologies to collect information about your browsing activities
                  and to distinguish you from other users of our website. This helps us provide you with a good
                  experience when you browse our website and allows us to improve our site.
                </p>
                <p className="mb-4">We use the following types of cookies:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>
                    <strong>Essential cookies:</strong> Required for the operation of our website
                  </li>
                  <li>
                    <strong>Analytical/performance cookies:</strong> Allow us to recognize and count visitors and
                    analyze website usage
                  </li>
                  <li>
                    <strong>Functionality cookies:</strong> Used to recognize you when you return to our website
                  </li>
                  <li>
                    <strong>Targeting cookies:</strong> Record your visit to our website, the pages you visit, and the
                    links you follow
                  </li>
                </ul>
                <p className="mb-4">
                  You can set your browser to refuse all or some browser cookies or to alert you when websites set or
                  access cookies. If you disable or refuse cookies, please note that some parts of this website may
                  become inaccessible or not function properly.
                </p>
                <div className="text-right">
                  <button
                    onClick={scrollToTop}
                    className="text-goldfinch-gold hover:text-goldfinch-brown inline-flex items-center"
                  >
                    Back to top <ChevronUp className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </section>

              <section id="your-rights" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-goldfinch-brown">Your Rights and Choices</h2>
                <p className="mb-4">
                  Depending on your location, you may have certain rights regarding your personal information:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Access to your personal information</li>
                  <li>Correction of inaccurate or incomplete data</li>
                  <li>Deletion of your personal information</li>
                  <li>Restriction or objection to certain processing activities</li>
                  <li>Data portability (receiving your data in a structured, machine-readable format)</li>
                  <li>Withdrawal of consent (where processing is based on consent)</li>
                </ul>
                <p className="mb-4">
                  To exercise these rights, please contact us using the details provided in the "Contact Us" section. We
                  may need to verify your identity before fulfilling your request.
                </p>
                <p className="mb-4">
                  If you are a resident of California, you may have additional rights under the California Consumer
                  Privacy Act (CCPA).
                </p>
                <div className="text-right">
                  <button
                    onClick={scrollToTop}
                    className="text-goldfinch-gold hover:text-goldfinch-brown inline-flex items-center"
                  >
                    Back to top <ChevronUp className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </section>

              <section id="international" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-goldfinch-brown">International Data Transfers</h2>
                <p className="mb-4">
                  As a global hotel chain, we may transfer your personal information to countries outside your country
                  of residence, including to countries that may not provide the same level of data protection as your
                  home country.
                </p>
                <p className="mb-4">
                  When we transfer personal information internationally, we implement appropriate safeguards in
                  accordance with applicable data protection laws, such as:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Standard contractual clauses approved by relevant authorities</li>
                  <li>Binding corporate rules for transfers within our corporate group</li>
                  <li>Compliance with approved certification mechanisms or codes of conduct</li>
                </ul>
                <p className="mb-4">
                  You can request more information about these safeguards by contacting us using the details provided.
                </p>
                <div className="text-right">
                  <button
                    onClick={scrollToTop}
                    className="text-goldfinch-gold hover:text-goldfinch-brown inline-flex items-center"
                  >
                    Back to top <ChevronUp className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </section>

              <section id="children" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-goldfinch-brown">Children's Privacy</h2>
                <p className="mb-4">
                  Our website and services are not directed to children under 16 years of age. We do not knowingly
                  collect personal information from children under 16. If we learn that we have collected personal
                  information from a child under 16 without verification of parental consent, we will take steps to
                  delete that information.
                </p>
                <p className="mb-4">
                  If you believe we might have any information from or about a child under 16, please contact us using
                  the details provided in the "Contact Us" section.
                </p>
                <div className="text-right">
                  <button
                    onClick={scrollToTop}
                    className="text-goldfinch-gold hover:text-goldfinch-brown inline-flex items-center"
                  >
                    Back to top <ChevronUp className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </section>

              <section id="updates" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-goldfinch-brown">Updates to This Privacy Policy</h2>
                <p className="mb-4">
                  We may update this privacy policy from time to time to reflect changes in our practices or for other
                  operational, legal, or regulatory reasons. We will post the revised policy on our website with an
                  updated "Last Updated" date.
                </p>
                <p className="mb-4">
                  We encourage you to review this privacy policy periodically to stay informed about how we collect,
                  use, and protect your personal information.
                </p>
                <p className="mb-4">
                  For significant changes that materially affect your rights or how we use your data, we will provide a
                  more prominent notice, such as email notifications or on-site messages.
                </p>
                <div className="text-right">
                  <button
                    onClick={scrollToTop}
                    className="text-goldfinch-gold hover:text-goldfinch-brown inline-flex items-center"
                  >
                    Back to top <ChevronUp className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </section>

              <section id="contact" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-goldfinch-brown">Contact Us</h2>
                <p className="mb-4">
                  If you have any questions, concerns, or requests regarding this privacy policy or our privacy
                  practices, please contact us at:
                </p>
                <div className="bg-goldfinch-ivory p-4 rounded-lg mb-4">
                  <p className="font-medium">The Goldfinch Hotel</p>
                  <p>Attn: Data Protection Officer</p>
                  <p>123 Luxury Avenue</p>
                  <p>Mumbai, Maharashtra 400001</p>
                  <p>India</p>
                  <p className="mt-2">Email: privacy@goldfinchhotel.com</p>
                  <p>Phone: +91 22 1234 5678</p>
                </div>
                <p className="mb-4">
                  We will respond to your inquiry as soon as possible and within the timeframe required by applicable
                  law.
                </p>
                <p className="mb-4">
                  If you are not satisfied with our response, you may have the right to lodge a complaint with a data
                  protection authority in your country of residence.
                </p>
                <div className="text-right">
                  <button
                    onClick={scrollToTop}
                    className="text-goldfinch-gold hover:text-goldfinch-brown inline-flex items-center"
                  >
                    Back to top <ChevronUp className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
