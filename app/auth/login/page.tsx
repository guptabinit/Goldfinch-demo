"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth/auth-context"
import { LanguageProvider } from "@/lib/i18n/language-context"
import { useLanguage } from "@/lib/i18n/language-context"
import { LanguageSelector } from "@/components/language-selector"

function LoginContent() {
  const router = useRouter()
  const { login, requestOtp, verifyOtp, isLoading } = useAuth()
  const { toast } = useToast()
  const { t } = useLanguage()

  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login({ email, password })
      toast({
        title: "Login successful",
        description: "Welcome back to Goldfinch Hotels",
      })
      router.push("/guest")
    } catch (error) {
      toast({
        title: "Login failed",
        description: (error as Error).message,
        variant: "destructive",
      })
    }
  }

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await requestOtp(phone)
      setOtpSent(true)
      toast({
        title: "OTP sent",
        description: "Please check your phone for the OTP",
      })
    } catch (error) {
      toast({
        title: "Failed to send OTP",
        description: (error as Error).message,
        variant: "destructive",
      })
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await verifyOtp(phone, otp)
      toast({
        title: "Login successful",
        description: "Welcome back to Goldfinch Hotels",
      })
      router.push("/guest")
    } catch (error) {
      toast({
        title: "OTP verification failed",
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
            <CardTitle className="text-xl text-center">Login</CardTitle>
            <CardDescription className="text-center">Access your Goldfinch account</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="email"
              value={loginMethod}
              onValueChange={(v) => setLoginMethod(v as "email" | "phone")}
            >
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="phone">Phone</TabsTrigger>
              </TabsList>

              <TabsContent value="email">
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-goldfinch-gold/20 focus:border-goldfinch-gold"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link href="/auth/forgot-password" className="text-xs text-goldfinch-gold hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-goldfinch-gold/20 focus:border-goldfinch-gold"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-goldfinch-gold hover:bg-goldfinch-gold/90 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="phone">
                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="border-goldfinch-gold/20 focus:border-goldfinch-gold"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-goldfinch-gold hover:bg-goldfinch-gold/90 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? "Sending OTP..." : "Send OTP"}
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
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
                      <p className="text-xs text-muted-foreground">
                        OTP sent to {phone}.
                        <button
                          type="button"
                          onClick={() => setOtpSent(false)}
                          className="text-goldfinch-gold hover:underline ml-1"
                        >
                          Change number
                        </button>
                      </p>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-goldfinch-gold hover:bg-goldfinch-gold/90 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? "Verifying..." : "Verify OTP"}
                    </Button>
                  </form>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              variant="outline"
              className="w-full border-goldfinch-gold/30 text-goldfinch-gold hover:bg-goldfinch-gold/10"
              onClick={async () => {
                try {
                  await login({ email: "guest@example.com", password: "password123" })
                  toast({
                    title: "Dev Login Successful",
                    description: "Logged in with development credentials",
                  })
                  router.push("/guest")
                } catch (error) {
                  toast({
                    title: "Login failed",
                    description: (error as Error).message,
                    variant: "destructive",
                  })
                }
              }}
            >
              Quick Dev Login
            </Button>
            <div className="text-center w-full">
              <p className="text-sm">
                Don't have an account?{" "}
                <Link href="/auth/register" className="text-goldfinch-gold hover:underline">
                  Register
                </Link>
              </p>
            </div>
            <div className="text-center w-full">
              <Link href="/qr-access" className="text-sm text-muted-foreground hover:text-goldfinch-gold">
                Access as hotel guest
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <LanguageProvider>
      <LoginContent />
    </LanguageProvider>
  )
}
