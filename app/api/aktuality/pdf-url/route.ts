import { type NextRequest, NextResponse } from "next/server"
import { Redis } from "@upstash/redis"

const redis = new Redis({
  url: process.env.STORAGE_KV_REST_API_URL || "https://romantic-hound-16277.upstash.io",
  token: process.env.STORAGE_KV_REST_API_TOKEN || "AT-VAAIjcDFmMWYxNGY3MWU2NmY0OTVlODMyMTc4ZWZjOWFkMGVmY3AxMA",
})

export async function GET() {
  try {
    // Get all PDF URLs from Redis
    const [pdf1Url, pdf2Url, pdf3Url, pdf4Url] = await Promise.all([
      redis.get<string>("aktuality:pdf1"),
      redis.get<string>("aktuality:pdf2"),
      redis.get<string>("aktuality:pdf3"),
      redis.get<string>("aktuality:pdf4")
    ])

    // Only return URLs that exist in Redis
    const response: { 
      pdf1Url?: string, 
      pdf2Url?: string,
      pdf3Url?: string,
      pdf4Url?: string 
    } = {}
    
    if (pdf1Url) response.pdf1Url = pdf1Url
    if (pdf2Url) response.pdf2Url = pdf2Url
    if (pdf3Url) response.pdf3Url = pdf3Url
    if (pdf4Url) response.pdf4Url = pdf4Url

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error getting aktuality PDFs:", error)
    return NextResponse.json(
      { error: "Chyba při načítání aktualit" },
      { status: 500 }
    )
  }
}
