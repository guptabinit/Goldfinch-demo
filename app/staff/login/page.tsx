"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { StaffAuthProvider, useStaffAuth } from "@/lib/auth/staff-auth-context"

function LoginContent() {
  const router = useRouter()
  const { login, isLoading } = useStaffAuth()
  const { toast } = useToast()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [selectedRole, setSelectedRole] = useState<string | null>(null)


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const user = await login({ email, password })
      toast({
        title: "Login successful",
        description: "Welcome to Goldfinch Staff Portal",
      })

      // Redirect based on role
      if (user?.role === "hod") {
        window.location.href = "/staff/hod/dashboard"
      } else if (user?.role === "manager") {
        window.location.href = "/staff/manager/dashboard"
      } else {
        window.location.href = "/staff/dashboard"
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: (error as Error).message,
        variant: "destructive",
      })
    }
  }

  const fillCredentials = (role: string) => {
    setEmail(`${role}@goldfinch.com`)
    setPassword("password123")
    setSelectedRole(role)

    toast({
      title: "Credentials filled",
      description: `${role.charAt(0).toUpperCase() + role.slice(1)} credentials ready. Click Login to continue.`,
      duration: 3000,
    })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-goldfinch-ivory p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Image src="/stylized-goldfinch.png" width={80} height={80} alt="Goldfinch Hotels" className="mb-4" />
          <h1 className="text-3xl font-serif font-semibold text-center">
            <span className="text-goldfinch-gold">Goldfinch</span> Staff Portal
          </h1>
          <p className="text-center text-muted-foreground mt-2">Access the hotel management system</p>
        </div>

        <Card className="luxury-shadow border-goldfinch-gold/20">
          <CardHeader>
            <CardTitle className="text-xl text-center">Staff Login</CardTitle>
            <CardDescription className="text-center">Enter your credentials to access the staff portal</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@goldfinch.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-goldfinch-gold/20 focus:border-goldfinch-gold"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/staff/forgot-password" className="text-xs text-goldfinch-gold hover:underline">
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
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="w-full">
              <p className="text-sm font-medium mb-2">Quick Fill Credentials:</p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={`border-goldfinch-gold/30 hover:bg-goldfinch-gold/10 ${
                    selectedRole === "staff"
                      ? "bg-goldfinch-gold/20 text-goldfinch-gold font-medium"
                      : "text-goldfinch-gold"
                  }`}
                  onClick={() => fillCredentials("staff")}
                >
                  Staff
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`border-goldfinch-gold/30 hover:bg-goldfinch-gold/10 ${
                    selectedRole === "waiter"
                      ? "bg-goldfinch-gold/20 text-goldfinch-gold font-medium"
                      : "text-goldfinch-gold"
                  }`}
                  onClick={() => fillCredentials("waiter")}
                >
                  Waiter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`border-goldfinch-gold/30 hover:bg-goldfinch-gold/10 ${
                    selectedRole === "hod"
                      ? "bg-goldfinch-gold/20 text-goldfinch-gold font-medium"
                      : "text-goldfinch-gold"
                  }`}
                  onClick={() => fillCredentials("hod")}
                >
                  HOD
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`border-goldfinch-gold/30 hover:bg-goldfinch-gold/10 ${
                    selectedRole === "manager"
                      ? "bg-goldfinch-gold/20 text-goldfinch-gold font-medium"
                      : "text-goldfinch-gold"
                  }`}
                  onClick={() => fillCredentials("manager")}
                >
                  Manager
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`border-goldfinch-gold/30 hover:bg-goldfinch-gold/10 ${
                    selectedRole === "owner"
                      ? "bg-goldfinch-gold/20 text-goldfinch-gold font-medium"
                      : "text-goldfinch-gold"
                  }`}
                  onClick={() => fillCredentials("owner")}
                >
                  Owner
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`border-goldfinch-gold/30 hover:bg-goldfinch-gold/10 ${
                    selectedRole === "admin"
                      ? "bg-goldfinch-gold/20 text-goldfinch-gold font-medium"
                      : "text-goldfinch-gold"
                  }`}
                  onClick={() => fillCredentials("admin")}
                >
                  Admin
                </Button>
              </div>
            </div>
            <div className="text-center w-full">
              <Link href="/" className="text-sm text-muted-foreground hover:text-goldfinch-gold">
                Return to main site
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
    <StaffAuthProvider>
      <LoginContent />
    </StaffAuthProvider>
  )
}
