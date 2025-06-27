import { type NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { Redis } from "@upstash/redis"

// Check for required environment variables
const requiredEnvVars = [
  'STORAGE_KV_REST_API_URL',
  'STORAGE_KV_REST_API_TOKEN',
  'NEW_BLOB_READ_WRITE_TOKEN'
]

const missingEnvVars = requiredEnvVars.filter(env => !process.env[env])

if (missingEnvVars.length > 0 && process.env.NODE_ENV === 'development') {
  console.warn(`Missing required environment variables: ${missingEnvVars.join(', ')}`)
}

const redis = new Redis({
  url: process.env.STORAGE_KV_REST_API_URL,
  token: process.env.STORAGE_KV_REST_API_TOKEN,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const pdfNumber = formData.get("pdfNumber") as string

    if (!file || !pdfNumber) {
      return NextResponse.json(
        { error: "Chybí soubor nebo číslo PDF" },
        { status: 400 }
      )
    }

    if (pdfNumber !== "1" && pdfNumber !== "2") {
      return NextResponse.json(
        { error: "Neplatné číslo PDF. Musí být 1 nebo 2" },
        { status: 400 }
      )
    }

    // Upload the file to Vercel Blob
    const timestamp = new Date().getTime()
    const fileName = `aktuality/aktualita-${pdfNumber}-${timestamp}.pdf`

    // Configure Vercel Blob with the correct token
    const blob = await put(fileName, file, {
      access: "public",
      contentType: "application/pdf",
      token: process.env.NEW_BLOB_READ_WRITE_TOKEN
    })

    // Save the URL to Redis
    await redis.set(`aktuality:pdf${pdfNumber}`, blob.url)

    return NextResponse.json({
      success: true,
      message: `Aktualita ${pdfNumber} byla úspěšně nahrána`,
      url: blob.url,
    })
  } catch (error) {
    console.error("Upload error:", error)
    
    // More detailed error messages
    let errorMessage = "Chyba při nahrávání souboru"
    if (error instanceof Error) {
      if (error.message.includes('BLOB_READ_WRITE_TOKEN')) {
        errorMessage = "Chyba konfigurace: Chybí BLOB_READ_WRITE_TOKEN"
      } else if (error.message.includes('UNAUTHORIZED')) {
        errorMessage = "Neoprávněný přístup: Neplatný token pro úložiště"
      } else if (error.message.includes('NetworkError')) {
        errorMessage = "Chyba sítě: Nepodařilo se připojit k úložišti"
      }
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : String(error) : undefined
      },
      { status: 500 }
    )
  }
}
