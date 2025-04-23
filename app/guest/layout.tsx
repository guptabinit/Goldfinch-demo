import type React from "react"
import { GuestNavbar } from "@/components/guest/guest-navbar"
import { GuestFooter } from "@/components/guest/guest-footer"
import { Toaster } from "@/components/ui/toaster"
import { NotificationProvider } from "@/components/guest/notification-provider"
import { LanguageProvider } from "@/lib/i18n/language-context"

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen">
        <NotificationProvider>
          <GuestNavbar />
          <main className="flex-1 container mx-auto px-4 py-6 sm:px-6 lg:px-8">{children}</main>
          <GuestFooter />
          <Toaster />
        </NotificationProvider>
      </div>
    </LanguageProvider>
  )
}
