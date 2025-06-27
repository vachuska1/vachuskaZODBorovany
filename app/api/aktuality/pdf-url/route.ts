import { type NextRequest, NextResponse } from "next/server"
import { Redis } from "@upstash/redis"

const redis = new Redis({
  url: process.env.STORAGE_KV_REST_API_URL || "https://romantic-hound-16277.upstash.io",
  token: process.env.STORAGE_KV_REST_API_TOKEN || "AT-VAAIjcDFmMWYxNGY3MWU2NmY0OTVlODMyMTc4ZWZjOWFkMGVmY3AxMA",
})

// Default PDFs
const DEFAULT_PDF1 = "https://jtfdkynq6zcyxa4w.public.blob.vercel-storage.com/aktuality/nabidka-prace-NImbj0lqHTFBgcRWIxg8mpw5jO32rI.pdf"
const DEFAULT_PDF2 = "https://jtfdkynq6zcyxa4w.public.blob.vercel-storage.com/aktuality/nabidka-prace-xQViBb7351H95KQirQ1bJX7mxGqDBT.pdf"

export async function GET() {
  try {
    // Get both PDF URLs from Redis
    const pdf1Url = await redis.get<string>("aktuality:pdf1")
    const pdf2Url = await redis.get<string>("aktuality:pdf2")

    return NextResponse.json({
      pdf1Url: pdf1Url || DEFAULT_PDF1,
      pdf2Url: pdf2Url || DEFAULT_PDF2
    })
  } catch (error) {
    console.error("Error getting aktuality PDFs:", error)
    return NextResponse.json(
      { error: "Chyba při načítání aktualit" },
      { status: 500 }
    )
  }
}
