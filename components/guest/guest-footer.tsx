"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import { Button } from "@/components/ui/button"

export function GuestFooter() {
  const { t } = useLanguage()

  return (
    <footer className="border-t bg-white py-8">
      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-4">
            <Image
              src="/stylized-goldfinch.png"
              width={40}
              height={40}
              alt="Goldfinch Hotels"
              className="h-10 w-auto"
            />
            <span className="text-xl font-semibold">Goldfinch</span>
          </div>

          <p className="text-sm text-muted-foreground max-w-md mb-6">
            Luxury redefined for our esteemed guests. Experience the perfect blend of comfort, elegance, and exceptional
            service.
          </p>

          <div className="flex gap-3 mb-6">
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 p-0">
              <Facebook className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 p-0">
              <Instagram className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 p-0">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 p-0">
              <Linkedin className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <Link href="/guest/help" className="text-sm hover:text-goldfinch-gold luxury-transition">
              Help & Support
            </Link>
            <Link href="/privacy" className="text-sm hover:text-goldfinch-gold luxury-transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm hover:text-goldfinch-gold luxury-transition">
              Terms of Service
            </Link>
            <Link href="/guest/contact" className="text-sm hover:text-goldfinch-gold luxury-transition">
              Contact Us
            </Link>
          </div>

          <div className="text-xs text-muted-foreground">
            <p>© 2023 Goldfinch Hotels. All rights reserved.</p>
            <p className="mt-1">
              Powered by <span className="text-goldfinch-gold font-medium">Quickgick</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
