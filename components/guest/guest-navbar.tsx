"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Bell, ShoppingCart, Menu, Home, History, Star, Wallet, User, LogOut, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n/language-context"
import { LanguageSelector } from "@/components/language-selector"
import { useAuth } from "@/lib/auth/auth-context"
import { useToast } from "@/components/ui/use-toast"

export function GuestNavbar() {
  const pathname = usePathname()
  const [cartCount, setCartCount] = useState(0)
  const [notificationCount, setNotificationCount] = useState(2)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const { t } = useLanguage()
  const { user, logout, isAuthenticated } = useAuth()
  const { toast } = useToast()

  const router = useRouter()

  const navLinks = [
    { href: "/guest", label: t("navigation.home"), icon: Home },
    { href: "/guest/orders", label: t("navigation.myOrders"), icon: History },
    { href: "/guest/feedback", label: t("navigation.feedback"), icon: Star },
    { href: "/guest/loyalty", label: t("navigation.loyaltyPoints"), icon: Wallet },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    })
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/guest/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
    }
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur-md transition-all duration-200",
        isScrolled ? "bg-white/80 shadow-sm" : "bg-white",
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px]">
              <div className="flex flex-col gap-6 py-6">
                <Link href="/guest" className="flex items-center gap-2">
                  <Image
                    src="/stylized-goldfinch.png"
                    width={40}
                    height={40}
                    alt="Goldfinch Hotels"
                    className="h-10 w-auto"
                  />
                  <span className="text-xl font-semibold">Goldfinch</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => {
                    const Icon = link.icon
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md luxury-transition",
                          pathname === link.href
                            ? "bg-goldfinch-gold/10 text-goldfinch-gold"
                            : "text-muted-foreground hover:bg-goldfinch-gold/5 hover:text-goldfinch-gold",
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        {link.label}
                      </Link>
                    )
                  })}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/guest" className="flex items-center gap-2 ml-2 lg:ml-0">
            <Image src="/stylized-goldfinch.png" width={32} height={32} alt="Goldfinch Hotels" className="h-8 w-auto" />
            <span className="text-lg font-semibold hidden md:inline-block">Goldfinch</span>
          </Link>
        </div>
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium luxury-transition",
                pathname === link.href ? "text-goldfinch-gold" : "text-muted-foreground hover:text-goldfinch-gold",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)} className="relative">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          <LanguageSelector />

          <Button variant="ghost" size="icon" asChild className="relative">
            <Link href="/guest/notifications">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-goldfinch-gold">
                  {notificationCount}
                </Badge>
              )}
              <span className="sr-only">{t("navigation.notifications")}</span>
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild className="relative">
            <Link href="/guest/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-goldfinch-gold">
                  {cartCount}
                </Badge>
              )}
              <span className="sr-only">{t("navigation.cart")}</span>
            </Link>
          </Button>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <div className="px-2 py-1.5 text-sm font-medium">{user?.name}</div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/guest/profile">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/guest/orders">My Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/guest/loyalty">Loyalty Points</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/guest/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="sm" asChild className="hidden md:flex">
              <Link href="/auth/login">Login</Link>
            </Button>
          )}
        </div>
      </div>

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="border-t border-b py-2 bg-white">
          <div className="container max-w-7xl mx-auto px-4 lg:px-8">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="search"
                placeholder="Search for services, amenities, etc."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-goldfinch-gold/20 focus:border-goldfinch-gold"
                autoFocus
              />
              <Button type="submit" className="bg-goldfinch-gold hover:bg-goldfinch-gold/90">
                Search
              </Button>
            </form>
          </div>
        </div>
      )}
    </header>
  )
}
