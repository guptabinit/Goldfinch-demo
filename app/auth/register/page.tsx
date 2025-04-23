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
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth/auth-context"
import { LanguageProvider } from "@/lib/i18n/language-context"
import { useLanguage } from "@/lib/i18n/language-context"
import { LanguageSelector } from "@/components/language-selector"

function RegisterContent() {
  const router = useRouter()
  const { register, requestOtp, isLoading } = useAuth()
  const { toast } = useToast()
  const { t } = useLanguage()

  const [registerMethod, setRegisterMethod] = useState<"email" | "phone">("email")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      })
      return
    }

    if (!acceptTerms) {
      toast({
        title: "Terms and conditions",
        description: "Please accept the terms and conditions to continue",
        variant: "destructive",
      })
      return
    }

    try {
      await register({ name, email, password })
      toast({
        title: "Registration successful",
        description: "Welcome to Goldfinch Hotels",
      })
      router.push("/guest")
    } catch (error) {
      toast({
        title: "Registration failed",
        description: (error as Error).message,
        variant: "destructive",
      })
    }
  }

  const handlePhoneRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!acceptTerms) {
      toast({
        title: "Terms and conditions",
        description: "Please accept the terms and conditions to continue",
        variant: "destructive",
      })
      return
    }

    try {
      await requestOtp(phone)
      // Store registration data in localStorage to use after OTP verification
      localStorage.setItem("goldfinch-registration", JSON.stringify({ name, phone }))
      toast({
        title: "OTP sent",
        description: "Please verify your phone number",
      })
      router.push("/auth/verify-otp?phone=" + encodeURIComponent(phone))
    } catch (error) {
      toast({
        title: "Failed to send OTP",
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
            <CardTitle className="text-xl text-center">Create Account</CardTitle>
            <CardDescription className="text-center">Join Goldfinch for exclusive benefits</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="email"
              value={registerMethod}
              onValueChange={(v) => setRegisterMethod(v as "email" | "phone")}
            >
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="phone">Phone</TabsTrigger>
              </TabsList>

              <TabsContent value="email">
                <form onSubmit={handleEmailRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="border-goldfinch-gold/20 focus:border-goldfinch-gold"
                    />
                  </div>
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
                    <Label htmlFor="password">Password</Label>
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
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="border-goldfinch-gold/20 focus:border-goldfinch-gold"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={acceptTerms}
                      onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I accept the{" "}
                      <Link href="/terms" className="text-goldfinch-gold hover:underline">
                        terms and conditions
                      </Link>
                    </label>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-goldfinch-gold hover:bg-goldfinch-gold/90 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="phone">
                <form onSubmit={handlePhoneRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name-phone">Full Name</Label>
                    <Input
                      id="name-phone"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="border-goldfinch-gold/20 focus:border-goldfinch-gold"
                    />
                  </div>
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
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms-phone"
                      checked={acceptTerms}
                      onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    />
                    <label
                      htmlFor="terms-phone"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I accept the{" "}
                      <Link href="/terms" className="text-goldfinch-gold hover:underline">
                        terms and conditions
                      </Link>
                    </label>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-goldfinch-gold hover:bg-goldfinch-gold/90 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending OTP..." : "Continue"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="text-center w-full">
              <p className="text-sm">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-goldfinch-gold hover:underline">
                  Login
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

export default function RegisterPage() {
  return (
    <LanguageProvider>
      <RegisterContent />
    </LanguageProvider>
  )
}
