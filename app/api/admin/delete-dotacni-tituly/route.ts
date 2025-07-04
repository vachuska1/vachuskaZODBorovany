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

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const pdfNumber = searchParams.get('pdfNumber')

    if (!pdfNumber || !["1", "2", "3", "4", "5", "6"].includes(pdfNumber)) {
      return NextResponse.json(
        { error: "Neplatné číslo PDF. Musí být 1, 2, 3, 4, 5 nebo 6" },
        { status: 400 }
      )
    }

    // Delete the URL from Redis
    await redis.del(`dotacni-tituly:pdf${pdfNumber}`)
    await redis.del(`dotacni-tituly:pdf${pdfNumber}Name`)

    return NextResponse.json({
      success: true,
      message: `Dotační titul ${pdfNumber} byl úspěšně smazán`
    })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { 
        error: 'Chyba při mazání souboru',
        details: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : String(error) : undefined
      },
      { status: 500 }
    )
  }
}
