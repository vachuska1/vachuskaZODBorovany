import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { LanguageProvider } from "@/components/language-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { TitleBar } from "@/components/title-bar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ZOD Borovany - Zemědělské obchodní družstvo",
  description: "Moderní webové stránky Zemědělského obchodního družstva Borovany",
  generator: "v0.dev",
  icons: {
    icon: [
      { url: '/images/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/images/favicon_io/apple-touch-icon.png' },
    ],
    other: [
      {
        rel: 'icon',
        url: '/images/favicon_io/favicon.ico',
      },
    ],
  },
  manifest: '/images/favicon_io/site.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'ZOD Borovany',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs">
      <body className={inter.className}>
        <LanguageProvider>
          <div className="min-h-screen flex flex-col">
            <TitleBar />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  )
}
