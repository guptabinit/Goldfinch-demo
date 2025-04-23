import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Poppins, Lora } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth/auth-context"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
})

export const metadata: Metadata = {
  title: "Goldfinch Hotels - Guest Services",
  description: "Premium guest services for Goldfinch Hotels Mumbai",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${lora.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
