"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type StaffRole = "staff" | "waiter" | "hod" | "manager" | "owner" | "admin" | "executive"

export type StaffUser = {
  id: string
  name: string
  email: string
  role: StaffRole
  department?: string
  avatar?: string
  permissions: string[]
}

type StaffAuthContextType = {
  user: StaffUser | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (credentials: { email: string; password: string }) => Promise<StaffUser>
  logout: () => void
  hasPermission: (permission: string) => boolean
  updateUserDepartment: (department: string) => void
}

const StaffAuthContext = createContext<StaffAuthContextType | undefined>(undefined)

// Define permissions for each role
const rolePermissions: Record<StaffRole, string[]> = {
  staff: ["view:orders", "update:orders", "create:notes"],
  waiter: ["view:orders", "update:orders", "create:notes", "view:dining"],
  hod: ["view:orders", "update:orders", "create:notes", "view:staff", "view:reports", "manage:availability"],
  manager: [
    "view:orders",
    "update:orders",
    "create:notes",
    "view:staff",
    "view:reports",
    "manage:availability",
    "manage:staff",
    "view:finances",
  ],
  owner: [
    "view:orders",
    "update:orders",
    "create:notes",
    "view:staff",
    "view:reports",
    "manage:availability",
    "manage:staff",
    "view:finances",
  ],
  executive: [
    "view:orders",
    "update:orders",
    "create:notes",
    "view:staff",
    "view:reports",
    "manage:availability",
    "manage:staff",
    "view:finances",
  ],
  admin: ["*"], // Super admin has all permissions
}

export function StaffAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<StaffUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        // In a real app, this would be an API call to validate the session
        const savedUser = localStorage.getItem("goldfinch-staff-user")
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

  const login = async (credentials: { email: string; password: string }): Promise<StaffUser> => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call to authenticate
      // Simulating API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Determine role based on email for demo purposes
      let role: StaffRole = "staff"
      let department = "General"

      if (credentials.email.includes("waiter")) {
        role = "waiter"
        department = "Dining"
      } else if (credentials.email.includes("hod")) {
        role = "hod"
        department = "Housekeeping"
      } else if (credentials.email.includes("manager")) {
        role = "manager"
        department = "General"
      } else if (credentials.email.includes("owner")) {
        role = "owner"
        department = "General"
      } else if (credentials.email.includes("executive")) {
        role = "executive"
        department = "General"
      } else if (credentials.email.includes("admin")) {
        role = "admin"
        department = "General"
      }

      // Mock successful login
      const mockUser: StaffUser = {
        id: `staff-${Date.now()}`,
        name: credentials.email
          .split("@")[0]
          .replace(/\./g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()),
        email: credentials.email,
        role: role,
        department: department,
        permissions: rolePermissions[role],
        avatar: `/placeholder.svg?height=200&width=200&query=Avatar+${credentials.email.charAt(0).toUpperCase()}`,
      }

      setUser(mockUser)
      localStorage.setItem("goldfinch-staff-user", JSON.stringify(mockUser))
      return mockUser // Return the user object
    } catch (error) {
      console.error("Login failed:", error)
      throw new Error("Login failed. Please check your credentials and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("goldfinch-staff-user")
    // Force a page refresh to clear any cached state
    window.location.href = "/staff/login"
  }

  const hasPermission = (permission: string): boolean => {
    if (!user) return false

    // Super admin has all permissions
    if (user.permissions.includes("*")) return true

    // Check if user has the specific permission
    return user.permissions.includes(permission)
  }

  const updateUserDepartment = (department: string) => {
    if (user) {
      const updatedUser = { ...user, department }
      setUser(updatedUser)
      localStorage.setItem("goldfinch-staff-user", JSON.stringify(updatedUser))
    }
  }

  return (
    <StaffAuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        hasPermission,
        updateUserDepartment,
      }}
    >
      {children}
    </StaffAuthContext.Provider>
  )
}

export const useStaffAuth = () => {
  const context = useContext(StaffAuthContext)
  if (context === undefined) {
    throw new Error("useStaffAuth must be used within a StaffAuthProvider")
  }
  return context
}
