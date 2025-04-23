"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LanguageProvider } from "@/lib/i18n/language-context"
import { useLanguage } from "@/lib/i18n/language-context"
import { LanguageSelector } from "@/components/language-selector"

function QRAccessContent() {
  const router = useRouter()
  const [roomNumber, setRoomNumber] = useState("")
  const [lastName, setLastName] = useState("")
  const [loading, setLoading] = useState(false)
  const { t } = useLanguage()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      router.push("/guest")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-goldfinch-ivory p-4">
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Image src="/stylized-goldfinch.png" width={80} height={80} alt="Goldfinch Hotels" className="mb-4" />
          <h1 className="text-3xl font-serif font-semibold text-center">
            <span className="text-goldfinch-gold">Goldfinch</span>
          </h1>
          <p className="text-center text-muted-foreground mt-2">Mumbai's premier luxury hotel experience</p>
        </div>

        <Card className="luxury-shadow border-goldfinch-gold/20">
          <CardHeader>
            <CardTitle className="text-xl text-center">{t("auth.guestAccess")}</CardTitle>
            <CardDescription className="text-center">{t("auth.enterDetails")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="roomNumber">{t("auth.roomNumber")}</Label>
                <Input
                  id="roomNumber"
                  placeholder="e.g. 301"
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  required
                  className="border-goldfinch-gold/20 focus:border-goldfinch-gold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">{t("auth.lastName")}</Label>
                <Input
                  id="lastName"
                  placeholder="e.g. Smith"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="border-goldfinch-gold/20 focus:border-goldfinch-gold"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-goldfinch-gold hover:bg-goldfinch-gold/90 text-white"
                disabled={loading}
              >
                {loading ? t("auth.verifying") : t("auth.accessServices")}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <p className="text-xs text-center text-muted-foreground">{t("auth.termsAgreement")}</p>
            <p className="text-xs text-center">
              {t("auth.needHelp")} <span className="text-goldfinch-gold">9</span> {t("auth.fromRoomPhone")}
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default function QRAccessPage() {
  return (
    <LanguageProvider>
      <QRAccessContent />
    </LanguageProvider>
  )
}
