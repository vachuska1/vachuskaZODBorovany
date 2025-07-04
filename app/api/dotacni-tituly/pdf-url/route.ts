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
      pdf1Url, pdf1Name, 
      pdf2Url, pdf2Name, 
      pdf3Url, pdf3Name, 
      pdf4Url, pdf4Name,
      pdf5Url, pdf5Name,
      pdf6Url, pdf6Name
    ] = await Promise.all([
      redis.get('dotacni-tituly:pdf1') as Promise<string | null>,
      redis.get('dotacni-tituly:pdf1Name') as Promise<string | null>,
      redis.get('dotacni-tituly:pdf2') as Promise<string | null>,
      redis.get('dotacni-tituly:pdf2Name') as Promise<string | null>,
      redis.get('dotacni-tituly:pdf3') as Promise<string | null>,
      redis.get('dotacni-tituly:pdf3Name') as Promise<string | null>,
      redis.get('dotacni-tituly:pdf4') as Promise<string | null>,
      redis.get('dotacni-tituly:pdf4Name') as Promise<string | null>,
      redis.get('dotacni-tituly:pdf5') as Promise<string | null>,
      redis.get('dotacni-tituly:pdf5Name') as Promise<string | null>,
      redis.get('dotacni-tituly:pdf6') as Promise<string | null>,
      redis.get('dotacni-tituly:pdf6Name') as Promise<string | null>,
    ])

    // Get default URLs from environment variables
    const defaultPdf1Url = process.env.DEFAULT_PDF1_URL || ''
    const defaultPdf2Url = process.env.DEFAULT_PDF2_URL || ''
    const defaultPdf3Url = process.env.DEFAULT_PDF3_URL || ''
    const defaultPdf4Url = process.env.DEFAULT_PDF4_URL || ''
    const defaultPdf5Url = process.env.DEFAULT_PDF5_URL || ''
    const defaultPdf6Url = process.env.DEFAULT_PDF6_URL || ''

    return NextResponse.json({
      pdf1Url: pdf1Url || defaultPdf1Url,
      pdf1Name: pdf1Name || '',
      pdf2Url: pdf2Url || defaultPdf2Url,
      pdf2Name: pdf2Name || '',
      pdf3Url: pdf3Url || defaultPdf3Url,
      pdf3Name: pdf3Name || '',
      pdf4Url: pdf4Url || defaultPdf4Url,
      pdf4Name: pdf4Name || '',
      pdf5Url: pdf5Url || defaultPdf5Url,
      pdf5Name: pdf5Name || '',
      pdf6Url: pdf6Url || defaultPdf6Url,
      pdf6Name: pdf6Name || '',
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
