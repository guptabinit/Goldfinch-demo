"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth/auth-context"
import { LanguageProvider } from "@/lib/i18n/language-context"
import { useLanguage } from "@/lib/i18n/language-context"
import { LanguageSelector } from "@/components/language-selector"

function VerifyOtpContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { verifyOtp, requestOtp, isLoading } = useAuth()
  const { toast } = useToast()
  const { t } = useLanguage()

  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [countdown, setCountdown] = useState(30)
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    const phoneParam = searchParams.get("phone")
    if (phoneParam) {
      setPhone(phoneParam)
    } else {
      router.push("/auth/register")
    }
  }, [searchParams, router])

  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0 && !canResend) {
      setCanResend(true)
    }
  }, [countdown, canResend])

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await verifyOtp(phone, otp)
      toast({
        title: "Verification successful",
        description: "Your account has been created successfully",
      })
      router.push("/guest")
    } catch (error) {
      toast({
        title: "Verification failed",
        description: (error as Error).message,
        variant: "destructive",
      })
    }
  }

  const handleResendOtp = async () => {
    try {
      await requestOtp(phone)
      setCountdown(30)
      setCanResend(false)
      toast({
        title: "OTP resent",
        description: "A new OTP has been sent to your phone",
      })
    } catch (error) {
      toast({
        title: "Failed to resend OTP",
        description: (error as Error).message,
        variant: "destructive",
      })
    }
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
            <CardTitle className="text-xl text-center">Verify Phone Number</CardTitle>
            <CardDescription className="text-center">Enter the OTP sent to your phone</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  disabled
                  className="border-goldfinch-gold/20 focus:border-goldfinch-gold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="border-goldfinch-gold/20 focus:border-goldfinch-gold"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-goldfinch-gold hover:bg-goldfinch-gold/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </Button>
              <div className="text-center text-sm">
                {canResend ? (
                  <button type="button" onClick={handleResendOtp} className="text-goldfinch-gold hover:underline">
                    Resend OTP
                  </button>
                ) : (
                  <span className="text-muted-foreground">Resend OTP in {countdown} seconds</span>
                )}
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="text-center w-full">
              <Link href="/auth/login" className="text-sm text-goldfinch-gold hover:underline">
                Back to Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default function VerifyOtpPage() {
  return (
    <LanguageProvider>
      <VerifyOtpContent />
    </LanguageProvider>
  )
}
