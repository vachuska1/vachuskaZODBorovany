import { type NextRequest, NextResponse } from "next/server"
import { Redis } from "@upstash/redis"

// Check for required environment variables
const requiredEnvVars = [
  'STORAGE_KV_REST_API_URL',
  'STORAGE_KV_REST_API_TOKEN'
]

const missingEnvVars = requiredEnvVars.filter(env => !process.env[env])

if (missingEnvVars.length > 0 && process.env.NODE_ENV === 'development') {
  console.warn(`Missing required environment variables: ${missingEnvVars.join(', ')}`)
}

const redis = new Redis({
  url: process.env.STORAGE_KV_REST_API_URL,
  token: process.env.STORAGE_KV_REST_API_TOKEN,
})

export async function GET() {
  try {
    // Get all PDF URLs and names from Redis
    const [
      pdf1Url,
      pdf2Url,
      pdf3Url,
      pdf4Url,
      pdf1Name,
      pdf2Name,
      pdf3Name,
      pdf4Name
    ] = await Promise.all([
      redis.get<string>('dotacni-tituly:pdf1'),
      redis.get<string>('dotacni-tituly:pdf2'),
      redis.get<string>('dotacni-tituly:pdf3'),
      redis.get<string>('dotacni-tituly:pdf4'),
      redis.get<string>('dotacni-tituly:pdf1Name'),
      redis.get<string>('dotacni-tituly:pdf2Name'),
      redis.get<string>('dotacni-tituly:pdf3Name'),
      redis.get<string>('dotacni-tituly:pdf4Name')
    ])

    return NextResponse.json({
      pdf1Url: pdf1Url || null,
      pdf2Url: pdf2Url || null,
      pdf3Url: pdf3Url || null,
      pdf4Url: pdf4Url || null,
      pdf1Name: pdf1Name || null,
      pdf2Name: pdf2Name || null,
      pdf3Name: pdf3Name || null,
      pdf4Name: pdf4Name || null
    })
  } catch (error) {
    console.error('Error fetching PDF URLs:', error)
    return NextResponse.json(
      { 
        error: 'Chyba při načítání PDF souborů',
        details: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : String(error) : undefined
      },
      { status: 500 }
    )
  }
}
