import { type NextRequest, NextResponse } from "next/server"
import { Redis } from "@upstash/redis"

const redis = new Redis({
  url: process.env.STORAGE_KV_REST_API_URL,
  token: process.env.STORAGE_KV_REST_API_TOKEN,
})

export async function POST(request: NextRequest) {
  try {
    const { pdfNumber } = await request.json()

    if (!pdfNumber) {
      return NextResponse.json(
        { error: "Chybí číslo PDF" },
        { status: 400 }
      )
    }

    if (!["1", "2", "3", "4"].includes(pdfNumber)) {
      return NextResponse.json(
        { error: "Neplatné číslo PDF. Musí být 1, 2, 3 nebo 4" },
        { status: 400 }
      )
    }

    // Delete the URL from Redis
    await redis.del(`aktuality:pdf${pdfNumber}`)

    return NextResponse.json({
      success: true,
      message: `Aktualita ${pdfNumber} byla úspěšně smazána`,
    })
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json(
      { error: "Chyba při mazání souboru" },
      { status: 500 }
    )
  }
}
