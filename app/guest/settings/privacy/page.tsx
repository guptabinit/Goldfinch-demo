"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronLeft, Eye, Download, Trash2, Key, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function PrivacySettingsPage() {
  const { toast } = useToast()

  // State for privacy preferences
  const [privacyPreferences, setPrivacyPreferences] = useState({
    shareWithPartners: false,
    allowPersonalization: true,
    allowAnalytics: true,
    marketingEmails: true,
    showProfileToOthers: false,
  })

  // State for password change
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // State for 2FA
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  // Toggle privacy preference
  const togglePrivacyPreference = (preference) => {
    const newPreferences = {
      ...privacyPreferences,
      [preference]: !privacyPreferences[preference],
    }

    setPrivacyPreferences(newPreferences)

    // Show toast on change
    const preferenceName = preference.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())

    toast({
      title: "Preference updated",
      description: `${preferenceName} ${newPreferences[preference] ? "enabled" : "disabled"}.`,
    })
  }

  // Handle password change
  const handlePasswordChange = (e) => {
    e.preventDefault()

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation must match.",
        variant: "destructive",
      })
      return
    }

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      })

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    }, 1000)
  }

  // Toggle 2FA
  const toggle2FA = () => {
    const newState = !twoFactorEnabled
    setTwoFactorEnabled(newState)

    toast({
      title: "Two-factor authentication",
      description: `Two-factor authentication ${newState ? "enabled" : "disabled"}.`,
    })
  }

  // Request data deletion
  const requestDataDeletion = () => {
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Request submitted",
        description: "Your data deletion request has been submitted. You'll receive a confirmation email shortly.",
      })
    }, 1000)
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
        <h1 className="text-xl font-semibold">Privacy & Security</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>Manage your account security and authentication options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Password Change */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Key className="h-5 w-5 text-goldfinch-amber" />
              <h3 className="font-medium">Password</h3>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Update Password
              </Button>
            </form>
          </div>

          <Separator />

          {/* Two-Factor Authentication */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Smartphone className="h-5 w-5 text-goldfinch-amber" />
                <div>
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
              </div>
              <Switch checked={twoFactorEnabled} onCheckedChange={toggle2FA} />
            </div>

            {twoFactorEnabled && (
              <div className="ml-8 pl-3 border-l-2 border-goldfinch-ivory space-y-3">
                <p className="text-sm">
                  Two-factor authentication is enabled. You'll receive a verification code when signing in from a new
                  device.
                </p>
                <Button variant="outline" size="sm">
                  Configure 2FA
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Privacy Preferences</CardTitle>
          <CardDescription>Control how your data is used and shared</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Data Sharing */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Share data with hotel partners</Label>
              <p className="text-sm text-muted-foreground">
                Allow us to share your preferences with our trusted partners
              </p>
            </div>
            <Switch
              checked={privacyPreferences.shareWithPartners}
              onCheckedChange={() => togglePrivacyPreference("shareWithPartners")}
            />
          </div>

          <Separator />

          {/* Personalization */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Personalized experience</Label>
              <p className="text-sm text-muted-foreground">
                Allow us to personalize your experience based on your preferences
              </p>
            </div>
            <Switch
              checked={privacyPreferences.allowPersonalization}
              onCheckedChange={() => togglePrivacyPreference("allowPersonalization")}
            />
          </div>

          <Separator />

          {/* Analytics */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Analytics and improvements</Label>
              <p className="text-sm text-muted-foreground">
                Allow us to collect anonymous usage data to improve our services
              </p>
            </div>
            <Switch
              checked={privacyPreferences.allowAnalytics}
              onCheckedChange={() => togglePrivacyPreference("allowAnalytics")}
            />
          </div>

          <Separator />

          {/* Marketing */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Marketing emails</Label>
              <p className="text-sm text-muted-foreground">Receive emails about special offers and promotions</p>
            </div>
            <Switch
              checked={privacyPreferences.marketingEmails}
              onCheckedChange={() => togglePrivacyPreference("marketingEmails")}
            />
          </div>

          <Separator />

          {/* Profile Visibility */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Profile visibility</Label>
              <p className="text-sm text-muted-foreground">
                Allow other guests to see your profile in community features
              </p>
            </div>
            <Switch
              checked={privacyPreferences.showProfileToOthers}
              onCheckedChange={() => togglePrivacyPreference("showProfileToOthers")}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>Manage your personal data stored with us</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Download Data */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Download your data</Label>
              <p className="text-sm text-muted-foreground">Get a copy of all your personal data</p>
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>

          <Separator />

          {/* Delete Data */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Delete your data</Label>
              <p className="text-sm text-muted-foreground">Request deletion of all your personal data</p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" className="flex items-center gap-2">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will initiate the process to delete all your personal data. This cannot be undone. Your
                    account will be deactivated and all personal information will be removed from our systems.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={requestDataDeletion}>Yes, delete my data</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <Separator />

          {/* Privacy Policy */}
          <div>
            <Link href="/privacy-policy" className="text-goldfinch-amber hover:underline flex items-center gap-2">
              <Eye className="h-4 w-4" />
              View our Privacy Policy
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
