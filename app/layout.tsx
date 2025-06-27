import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { LanguageProvider } from "@/components/language-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { TitleBar } from "@/components/title-bar"

const inter = Inter({ subsets: ["latin"] })

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://zodborovany.cz';
const TITLE = 'ZOD Borovany - Zemědělské obchodní družstvo';
const DESCRIPTION = 'Moderní zemědělské družstvo s dlouholetou tradicí. Zabýváme se rostlinnou a živočišnou výrobou. Navštivte naši závodní kuchyni s tradiční českou kuchyní.';
const KEYWORDS = [
  'zemědělské družstvo Borovany',
  'zemědělská výroba Jižní Čechy',
  'rostlinná výroba Borovany',
  'živočišná výroba Borovany',
  'zemědělské družstvo Jižní Čechy',
  'prodej sena a slámy',
  'chov skotu Borovany',
  'mléčná produkce Borovany',
  'prodej obilí Jižní Čechy',
  'služby v zemědělství Borovany',
  'zemědělské práce Borovany'
].join(', ');

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  generator: "Next.js",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: 'ZOD Borovany',
    images: [
      {
        url: '/images/main/rostlinna.jpg',
        width: 1200,
        height: 630,
        alt: 'ZOD Borovany - Zemědělské obchodní družstvo',
      },
    ],
    locale: 'cs_CZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/images/main/rostlinna.jpg'],
  },
  alternates: {
    canonical: SITE_URL,
  },
  keywords: KEYWORDS,
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
  other: {
    'fb:app_id': '', // Add your Facebook App ID if you have one
    'og:site_name': 'ZOD Borovany',
    'og:type': 'website',
    'og:image:width': '1200',
    'og:image:height': '630',
    'robots': 'index, follow',
    'googlebot': 'index, follow',
    'revisit-after': '7 days',
    'author': 'ZOD Borovany',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs" prefix="og: https://ogp.me/ns#">
      <head />
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
