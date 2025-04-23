"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, User, Mail, Phone, MapPin, Edit, Save, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth/auth-context"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function ProfilePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || "John Doe",
    email: user?.email || "john.doe@example.com",
    phone: user?.phone || "+91 9876543210",
    address: "123 Main Street, Mumbai, Maharashtra 400001",
    preferences: {
      roomTemperature: "22°C",
      pillowType: "Soft",
      dietaryRestrictions: "None",
      newspaper: "The Times of India",
    },
  })

  const handleSave = () => {
    setIsEditing(false)
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setProfileData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value,
        },
      }))
    } else {
      setProfileData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  return (
    <div className="space-y-6">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/guest">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/guest/profile">Profile</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/guest">
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">My Profile</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-goldfinch-gold/20 flex items-center justify-center mb-4">
                    {user?.name ? (
                      <span className="text-2xl font-semibold text-goldfinch-gold">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    ) : (
                      <User className="h-12 w-12 text-goldfinch-gold" />
                    )}
                  </div>
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute bottom-3 right-0 rounded-full h-8 w-8 bg-white"
                  >
                    <Camera className="h-4 w-4" />
                    <span className="sr-only">Change profile picture</span>
                  </Button>
                </div>
                <h2 className="text-xl font-semibold">{profileData.name}</h2>
                <p className="text-sm text-muted-foreground">Guest since January 2023</p>

                <div className="w-full mt-6 space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-goldfinch-gold" />
                    <span className="text-sm">{profileData.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-goldfinch-gold" />
                    <span className="text-sm">{profileData.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-goldfinch-gold" />
                    <span className="text-sm">{profileData.address}</span>
                  </div>
                </div>

                <div className="w-full mt-6">
                  <Button
                    variant="outline"
                    className="w-full border-goldfinch-gold/30 text-goldfinch-gold hover:bg-goldfinch-gold/10"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    ) : (
                      <>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Personal Details</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="stays">Past Stays</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={profileData.name}
                            onChange={handleChange}
                            className="border-goldfinch-gold/20 focus:border-goldfinch-gold"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={profileData.email}
                            onChange={handleChange}
                            className="border-goldfinch-gold/20 focus:border-goldfinch-gold"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={profileData.phone}
                            onChange={handleChange}
                            className="border-goldfinch-gold/20 focus:border-goldfinch-gold"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            name="address"
                            value={profileData.address}
                            onChange={handleChange}
                            className="border-goldfinch-gold/20 focus:border-goldfinch-gold"
                          />
                        </div>
                      </div>
                      <Button className="bg-goldfinch-gold hover:bg-goldfinch-gold/90" onClick={handleSave}>
                        Save Changes
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Full Name</h3>
                          <p>{profileData.name}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                          <p>{profileData.email}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
                          <p>{profileData.phone}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
                          <p>{profileData.address}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Account Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Password</h3>
                        <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                      </div>
                      <Button
                        variant="outline"
                        className="border-goldfinch-gold/30 text-goldfinch-gold hover:bg-goldfinch-gold/10"
                      >
                        Change Password
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Two-Factor Authentication</h3>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                      </div>
                      <Button
                        variant="outline"
                        className="border-goldfinch-gold/30 text-goldfinch-gold hover:bg-goldfinch-gold/10"
                      >
                        Enable
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Stay Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="roomTemperature">Room Temperature</Label>
                          <Input
                            id="roomTemperature"
                            name="preferences.roomTemperature"
                            value={profileData.preferences.roomTemperature}
                            onChange={handleChange}
                            className="border-goldfinch-gold/20 focus:border-goldfinch-gold"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pillowType">Pillow Type</Label>
                          <Input
                            id="pillowType"
                            name="preferences.pillowType"
                            value={profileData.preferences.pillowType}
                            onChange={handleChange}
                            className="border-goldfinch-gold/20 focus:border-goldfinch-gold"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
                          <Input
                            id="dietaryRestrictions"
                            name="preferences.dietaryRestrictions"
                            value={profileData.preferences.dietaryRestrictions}
                            onChange={handleChange}
                            className="border-goldfinch-gold/20 focus:border-goldfinch-gold"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newspaper">Newspaper</Label>
                          <Input
                            id="newspaper"
                            name="preferences.newspaper"
                            value={profileData.preferences.newspaper}
                            onChange={handleChange}
                            className="border-goldfinch-gold/20 focus:border-goldfinch-gold"
                          />
                        </div>
                      </div>
                      <Button className="bg-goldfinch-gold hover:bg-goldfinch-gold/90" onClick={handleSave}>
                        Save Preferences
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Room Temperature</h3>
                          <p>{profileData.preferences.roomTemperature}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Pillow Type</h3>
                          <p>{profileData.preferences.pillowType}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Dietary Restrictions</h3>
                          <p>{profileData.preferences.dietaryRestrictions}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Newspaper</h3>
                          <p>{profileData.preferences.newspaper}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stays" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Past Stays</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      {
                        id: "stay-1",
                        dates: "Jan 15 - Jan 18, 2023",
                        roomType: "Deluxe Room",
                        totalNights: 3,
                      },
                      {
                        id: "stay-2",
                        dates: "Mar 22 - Mar 25, 2023",
                        roomType: "Premier Room",
                        totalNights: 3,
                      },
                      {
                        id: "stay-3",
                        dates: "Jun 10 - Jun 15, 2023",
                        roomType: "Executive Suite",
                        totalNights: 5,
                      },
                    ].map((stay) => (
                      <div key={stay.id} className="border rounded-lg p-4">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                          <div>
                            <h3 className="font-medium">{stay.dates}</h3>
                            <p className="text-sm text-muted-foreground">
                              {stay.roomType} • {stay.totalNights} nights
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            className="border-goldfinch-gold/30 text-goldfinch-gold hover:bg-goldfinch-gold/10"
                            size="sm"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
