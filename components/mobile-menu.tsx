"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useLanguage } from "./language-provider"

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const { t } = useLanguage()

  const menuItems = [
    { href: "/", label: t("home") },
    { href: "/jidelni-listek", label: t("menu") },
    { href: "/aktuality", label: t("news") },
    { href: "/vos", label: t("vos") },
    { href: "/dokumenty", label: t("documents") },
    { href: "/kontakt", label: t("contact") },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col space-y-4 mt-8">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-lg font-medium text-gray-700 hover:text-green-600 transition-colors py-2"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
