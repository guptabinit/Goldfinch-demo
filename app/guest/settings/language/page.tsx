"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/lib/i18n/language-context"

export default function LanguageSettingsPage() {
  const { language, setLanguage, t } = useLanguage()

  const languages = [
    { code: "en", name: t("languages.en") },
    { code: "hi", name: t("languages.hi") },
    { code: "fr", name: t("languages.fr") },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/guest/settings">
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">{t("common.back")}</span>
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">{t("languages.language")}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("languages.selectLanguage")}</CardTitle>
          <CardDescription>Choose your preferred language for the app interface</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={language} onValueChange={(value) => setLanguage(value as any)} className="space-y-4">
            {languages.map((lang) => (
              <div key={lang.code} className="flex items-center space-x-2 border rounded-md p-3">
                <RadioGroupItem value={lang.code} id={`lang-${lang.code}`} />
                <Label htmlFor={`lang-${lang.code}`} className="flex-1 cursor-pointer">
                  {lang.name}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  )
}
