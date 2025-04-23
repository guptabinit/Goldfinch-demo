"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronLeft, Bell, Mail, MessageSquare, Calendar, Tag, Utensils, Bookmark, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Label } from "@/components/ui/label"

export default function NotificationsSettingsPage() {
  const { toast } = useToast()

  // State for notification preferences
  const [preferences, setPreferences] = useState({
    promotional: {
      enabled: true,
      channels: {
        email: true,
        sms: false,
        inApp: true,
      },
    },
    orderUpdates: {
      enabled: true,
      channels: {
        email: true,
        sms: true,
        inApp: true,
      },
    },
    reservationReminders: {
      enabled: true,
      channels: {
        email: true,
        sms: true,
        inApp: true,
      },
    },
    specialOffers: {
      enabled: true,
      channels: {
        email: true,
        sms: false,
        inApp: true,
      },
    },
    serviceUpdates: {
      enabled: true,
      channels: {
        email: true,
        sms: false,
        inApp: true,
      },
    },
  })

  // Toggle main notification type
  const toggleNotificationType = (type) => {
    const newPreferences = {
      ...preferences,
      [type]: {
        ...preferences[type],
        enabled: !preferences[type].enabled,
      },
    }

    setPreferences(newPreferences)

    // Show toast on change
    toast({
      title: "Preferences updated",
      description: `${type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, " $1")} notifications ${newPreferences[type].enabled ? "enabled" : "disabled"}.`,
    })
  }

  // Toggle channel for a notification type
  const toggleChannel = (type, channel) => {
    const newPreferences = {
      ...preferences,
      [type]: {
        ...preferences[type],
        channels: {
          ...preferences[type].channels,
          [channel]: !preferences[type].channels[channel],
        },
      },
    }

    setPreferences(newPreferences)

    // Show toast on change
    const channelName = channel === "inApp" ? "In-App" : channel.charAt(0).toUpperCase() + channel.slice(1)
    toast({
      title: "Channel updated",
      description: `${channelName} notifications for ${type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, " $1")} ${newPreferences[type].channels[channel] ? "enabled" : "disabled"}.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/guest/settings">
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">Notification Settings</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Manage how you receive notifications from Goldfinch Hotel</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Promotional Notifications */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Tag className="h-5 w-5 text-goldfinch-amber" />
                <div>
                  <h3 className="font-medium">Promotional Notifications</h3>
                  <p className="text-sm text-muted-foreground">Special offers, discounts, and promotions</p>
                </div>
              </div>
              <Switch
                checked={preferences.promotional.enabled}
                onCheckedChange={() => toggleNotificationType("promotional")}
              />
            </div>

            {preferences.promotional.enabled && (
              <div className="ml-8 pl-3 border-l-2 border-goldfinch-ivory space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="promotional-email" className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </Label>
                  <Switch
                    id="promotional-email"
                    checked={preferences.promotional.channels.email}
                    onCheckedChange={() => toggleChannel("promotional", "email")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="promotional-sms" className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>SMS</span>
                  </Label>
                  <Switch
                    id="promotional-sms"
                    checked={preferences.promotional.channels.sms}
                    onCheckedChange={() => toggleChannel("promotional", "sms")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="promotional-inapp" className="flex items-center space-x-2">
                    <Bell className="h-4 w-4" />
                    <span>In-App</span>
                  </Label>
                  <Switch
                    id="promotional-inapp"
                    checked={preferences.promotional.channels.inApp}
                    onCheckedChange={() => toggleChannel("promotional", "inApp")}
                  />
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Order Updates */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Utensils className="h-5 w-5 text-goldfinch-amber" />
                <div>
                  <h3 className="font-medium">Order Updates</h3>
                  <p className="text-sm text-muted-foreground">Status updates for room service and dining orders</p>
                </div>
              </div>
              <Switch
                checked={preferences.orderUpdates.enabled}
                onCheckedChange={() => toggleNotificationType("orderUpdates")}
              />
            </div>

            {preferences.orderUpdates.enabled && (
              <div className="ml-8 pl-3 border-l-2 border-goldfinch-ivory space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="order-email" className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </Label>
                  <Switch
                    id="order-email"
                    checked={preferences.orderUpdates.channels.email}
                    onCheckedChange={() => toggleChannel("orderUpdates", "email")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="order-sms" className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>SMS</span>
                  </Label>
                  <Switch
                    id="order-sms"
                    checked={preferences.orderUpdates.channels.sms}
                    onCheckedChange={() => toggleChannel("orderUpdates", "sms")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="order-inapp" className="flex items-center space-x-2">
                    <Bell className="h-4 w-4" />
                    <span>In-App</span>
                  </Label>
                  <Switch
                    id="order-inapp"
                    checked={preferences.orderUpdates.channels.inApp}
                    onCheckedChange={() => toggleChannel("orderUpdates", "inApp")}
                  />
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Reservation Reminders */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-goldfinch-amber" />
                <div>
                  <h3 className="font-medium">Reservation Reminders</h3>
                  <p className="text-sm text-muted-foreground">Reminders for spa, dining, and activity reservations</p>
                </div>
              </div>
              <Switch
                checked={preferences.reservationReminders.enabled}
                onCheckedChange={() => toggleNotificationType("reservationReminders")}
              />
            </div>

            {preferences.reservationReminders.enabled && (
              <div className="ml-8 pl-3 border-l-2 border-goldfinch-ivory space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="reservation-email" className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </Label>
                  <Switch
                    id="reservation-email"
                    checked={preferences.reservationReminders.channels.email}
                    onCheckedChange={() => toggleChannel("reservationReminders", "email")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="reservation-sms" className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>SMS</span>
                  </Label>
                  <Switch
                    id="reservation-sms"
                    checked={preferences.reservationReminders.channels.sms}
                    onCheckedChange={() => toggleChannel("reservationReminders", "sms")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="reservation-inapp" className="flex items-center space-x-2">
                    <Bell className="h-4 w-4" />
                    <span>In-App</span>
                  </Label>
                  <Switch
                    id="reservation-inapp"
                    checked={preferences.reservationReminders.channels.inApp}
                    onCheckedChange={() => toggleChannel("reservationReminders", "inApp")}
                  />
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Special Offers */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bookmark className="h-5 w-5 text-goldfinch-amber" />
                <div>
                  <h3 className="font-medium">Special Offers</h3>
                  <p className="text-sm text-muted-foreground">Exclusive offers and packages for your stay</p>
                </div>
              </div>
              <Switch
                checked={preferences.specialOffers.enabled}
                onCheckedChange={() => toggleNotificationType("specialOffers")}
              />
            </div>

            {preferences.specialOffers.enabled && (
              <div className="ml-8 pl-3 border-l-2 border-goldfinch-ivory space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="offers-email" className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </Label>
                  <Switch
                    id="offers-email"
                    checked={preferences.specialOffers.channels.email}
                    onCheckedChange={() => toggleChannel("specialOffers", "email")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="offers-sms" className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>SMS</span>
                  </Label>
                  <Switch
                    id="offers-sms"
                    checked={preferences.specialOffers.channels.sms}
                    onCheckedChange={() => toggleChannel("specialOffers", "sms")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="offers-inapp" className="flex items-center space-x-2">
                    <Bell className="h-4 w-4" />
                    <span>In-App</span>
                  </Label>
                  <Switch
                    id="offers-inapp"
                    checked={preferences.specialOffers.channels.inApp}
                    onCheckedChange={() => toggleChannel("specialOffers", "inApp")}
                  />
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Service Updates */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Info className="h-5 w-5 text-goldfinch-amber" />
                <div>
                  <h3 className="font-medium">Service Updates</h3>
                  <p className="text-sm text-muted-foreground">Updates about hotel services and amenities</p>
                </div>
              </div>
              <Switch
                checked={preferences.serviceUpdates.enabled}
                onCheckedChange={() => toggleNotificationType("serviceUpdates")}
              />
            </div>

            {preferences.serviceUpdates.enabled && (
              <div className="ml-8 pl-3 border-l-2 border-goldfinch-ivory space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="service-email" className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </Label>
                  <Switch
                    id="service-email"
                    checked={preferences.serviceUpdates.channels.email}
                    onCheckedChange={() => toggleChannel("serviceUpdates", "email")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="service-sms" className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>SMS</span>
                  </Label>
                  <Switch
                    id="service-sms"
                    checked={preferences.serviceUpdates.channels.sms}
                    onCheckedChange={() => toggleChannel("serviceUpdates", "sms")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="service-inapp" className="flex items-center space-x-2">
                    <Bell className="h-4 w-4" />
                    <span>In-App</span>
                  </Label>
                  <Switch
                    id="service-inapp"
                    checked={preferences.serviceUpdates.channels.inApp}
                    onCheckedChange={() => toggleChannel("serviceUpdates", "inApp")}
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
