"use client"

import Link from "next/link"
import { ChevronLeft, ChevronRight, Globe, Bell, Moon, Shield, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/i18n/language-context"

export default function SettingsPage() {
  const { t } = useLanguage()

  const settingsItems = [
    {
      id: "language",
      title: t("languages.language"),
      description: t("languages.selectLanguage"),
      icon: Globe,
      href: "/guest/settings/language",
    },
    {
      id: "notifications",
      title: t("navigation.notifications"),
      description: "Manage notification preferences",
      icon: Bell,
      href: "/guest/settings/notifications",
    },
    {
      id: "privacy",
      title: "Privacy & Security",
      description: "Manage your data and security settings",
      icon: Shield,
      href: "/guest/settings/privacy",
    },
    {
      id: "help",
      title: "Help & Support",
      description: "Get assistance and view FAQs",
      icon: HelpCircle,
      href: "/guest/help",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/guest">
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">{t("common.back")}</span>
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">Settings</h1>
      </div>

      <div className="grid gap-4">
        {settingsItems.map((item) => (
          <Link key={item.id} href={item.href} className="block">
            <Card className="luxury-shadow hover:translate-y-[-2px] luxury-transition">
              <CardContent className="p-0">
                <div className="flex items-center p-4">
                  <div className="rounded-full bg-goldfinch-gold/10 p-2 mr-4">
                    <item.icon className="h-5 w-5 text-goldfinch-gold" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
