"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MobileMenu } from "./mobile-menu"

export function Navbar() {
  const { language, setLanguage, t } = useLanguage()

  const flagImages = {
    cs: "/images/flags/czech-republic.png",
    en: "/images/flags/united-kingdom.png",
    de: "/images/flags/germany.png",
  }

  const flagLabels = {
    cs: "Čeština",
    en: "English",
    de: "Deutsch",
  }

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Mobile Menu */}
          <div className="md:hidden">
            <MobileMenu />
          </div>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="ZOD Borovany Logo"
                width={140}
                height={70}
                className="h-16 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Centered Navigation */}
          <div className="hidden md:block flex-1">
            <div className="flex items-center justify-center space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-green-600 px-3 py-2 text-lg font-medium transition-colors"
              >
                {t("home")}
              </Link>
              <Link
                href="/jidelni-listek"
                className="text-gray-700 hover:text-green-600 px-3 py-2 text-lg font-medium transition-colors"
              >
                {t("menu")}
              </Link>
              <Link
                href="/aktuality"
                className="text-gray-700 hover:text-green-600 px-3 py-2 text-lg font-medium transition-colors"
              >
                {t("news")}
              </Link>
              <Link
                href="/vos"
                className="text-gray-700 hover:text-green-600 px-3 py-2 text-lg font-medium transition-colors"
              >
                {t("vos")}
              </Link>
              <Link
                href="/dokumenty"
                className="text-gray-700 hover:text-green-600 px-3 py-2 text-lg font-medium transition-colors"
              >
                {t("documents")}
              </Link>
              <Link
                href="/kontakt"
                className="text-gray-700 hover:text-green-600 px-3 py-2 text-lg font-medium transition-colors"
              >
                {t("contact")}
              </Link>
            </div>
          </div>

          {/* Language Switcher with Flags */}
          <div className="flex-shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Image
                    src={flagImages[language] || "/placeholder.svg"}
                    alt={flagLabels[language]}
                    width={24}
                    height={16}
                    className="rounded-sm"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("cs")} className="flex items-center gap-2">
                  <Image
                    src="/images/flags/czech-republic.png"
                    alt="Čeština"
                    width={20}
                    height={13}
                    className="rounded-sm"
                  />
                  Čeština
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("en")} className="flex items-center gap-2">
                  <Image
                    src="/images/flags/united-kingdom.png"
                    alt="English"
                    width={20}
                    height={13}
                    className="rounded-sm"
                  />
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("de")} className="flex items-center gap-2">
                  <Image src="/images/flags/germany.png" alt="Deutsch" width={20} height={13} className="rounded-sm" />
                  Deutsch
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
