"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Facebook } from "lucide-react"
import { useLanguage } from "./language-provider"
import Image from "next/image"

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const { t } = useLanguage()
  const pathname = usePathname()

  // Funkce pro určení, zda je odkaz aktivní
  const isActive = (path: string) => {
    return pathname === path
  }

  const menuItems = [
    { href: "/", label: "home" },
    { href: "/aktuality", label: "news" },
    { href: "/jidelni-listek", label: "menu" },
    { href: "/vos", label: "vos" },
    { href: "/stanovy", label: "statutes" },
    { href: "/dotacni-tituly", label: "grants" },
    { href: "/kontakt", label: "contact" },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
        <div className="py-6 border-b bg-white">
          <Link href="/" className="flex justify-center" onClick={() => setOpen(false)}>
            <div className="relative w-72 h-24">
              <Image
                src="/images/logo.jpg"
                alt="ZOD Borovany Logo"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 300px"
              />
            </div>
          </Link>
        </div>
        <h2 className="sr-only">{t("mainNavigation")}</h2>
        <nav className="flex flex-col space-y-4 p-6">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`text-lg font-medium py-2 ${
                isActive(item.href)
                  ? "text-black font-semibold border-l-4 border-black pl-4"
                  : "text-gray-700 hover:text-black transition-colors pl-4"
              }`}
            >
              {t(item.label)}
            </Link>
          ))}
          <div className="pt-4 mt-4 border-t">
            <a
              href="https://www.facebook.com/zodborovany"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-700 hover:text-blue-600 transition-colors pl-4 py-2"
              onClick={() => setOpen(false)}
            >
              <Facebook className="h-5 w-5 mr-3" />
              <span className="font-medium">Facebook</span>
            </a>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
