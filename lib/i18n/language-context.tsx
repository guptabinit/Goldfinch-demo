"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { translations, type Language } from "./translations"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Default to browser language or English
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    // Try to get language from localStorage on client side
    const savedLanguage = localStorage.getItem("goldfinch-language") as Language | null
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setLanguage(savedLanguage)
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split("-")[0] as Language
      if (Object.keys(translations).includes(browserLang)) {
        setLanguage(browserLang)
      }
    }
  }, [])

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem("goldfinch-language", newLanguage)
  }

  // Translation function
  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = translations[language]

    for (const k of keys) {
      if (value && value[k]) {
        value = value[k]
      } else {
        // Fallback to English if translation is missing
        let fallback = translations["en"]
        for (const fk of keys) {
          if (fallback && fallback[fk]) {
            fallback = fallback[fk]
          } else {
            return key // Return the key if no translation found
          }
        }
        return typeof fallback === "string" ? fallback : key
      }
    }

    return typeof value === "string" ? value : key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>{children}</LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
