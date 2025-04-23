"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type User = {
  id: string
  name: string
  email?: string
  phone?: string
  role: "guest" | "staff" | "admin"
  roomNumber?: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (credentials: { email?: string; phone?: string; password?: string; otp?: string }) => Promise<void>
  logout: () => void
  register: (userData: {
    name: string
    email?: string
    phone?: string
    password?: string
  }) => Promise<void>
  requestOtp: (phone: string) => Promise<void>
  verifyOtp: (phone: string, otp: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        // In a real app, this would be an API call to validate the session
        const savedUser = localStorage.getItem("goldfinch-user")
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (error) {
        console.error("Authentication check failed:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (credentials: { email?: string; phone?: string; password?: string; otp?: string }) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call to authenticate
      // Simulating API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful login
      const mockUser: User = {
        id: "user123",
        name: "John Doe",
        email: credentials.email || "john.doe@example.com",
        phone: credentials.phone || "+91 9876543210",
        role: "guest",
        roomNumber: "301",
      }

      setUser(mockUser)
      localStorage.setItem("goldfinch-user", JSON.stringify(mockUser))
    } catch (error) {
      console.error("Login failed:", error)
      throw new Error("Login failed. Please check your credentials and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("goldfinch-user")
  }

  const register = async (userData: { name: string; email?: string; phone?: string; password?: string }) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call to register
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful registration
      const mockUser: User = {
        id: "user123",
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        role: "guest",
      }

      setUser(mockUser)
      localStorage.setItem("goldfinch-user", JSON.stringify(mockUser))
    } catch (error) {
      console.error("Registration failed:", error)
      throw new Error("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const requestOtp = async (phone: string) => {
    try {
      // In a real app, this would be an API call to request OTP
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Mock successful OTP request
      return true
    } catch (error) {
      console.error("OTP request failed:", error)
      throw new Error("Failed to send OTP. Please try again.")
    }
  }

  const verifyOtp = async (phone: string, otp: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call to verify OTP
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful verification
      const mockUser: User = {
        id: "user123",
        name: "John Doe",
        phone: phone,
        role: "guest",
        roomNumber: "301",
      }

      setUser(mockUser)
      localStorage.setItem("goldfinch-user", JSON.stringify(mockUser))
    } catch (error) {
      console.error("OTP verification failed:", error)
      throw new Error("OTP verification failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        requestOtp,
        verifyOtp,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
