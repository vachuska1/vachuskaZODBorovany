import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for uploaded PDF URLs
// This will reset on each deployment, but that's fine for this use case
const uploadedMenuUrls = {
  week1: null as string | null,
  week2: null as string | null,
}

export async function POST(request: NextRequest) {
  try {
    const { week, url } = await request.json()

    if (!week || !url) {
      return NextResponse.json({ error: "Chybí týden nebo URL" }, { status: 400 })
    }

    if (week !== "week1" && week !== "week2") {
      return NextResponse.json({ error: "Neplatný týden" }, { status: 400 })
    }

    // Store the uploaded PDF URL
    uploadedMenuUrls[week as keyof typeof uploadedMenuUrls] = url

    console.log(`Updated ${week} to: ${url}`)

    return NextResponse.json({
      success: true,
      message: `URL pro ${week === "week1" ? "Týden 1" : "Týden 2"} byla úspěšně aktualizována`,
    })
  } catch (error) {
    console.error("Update menu error:", error)
    return NextResponse.json({ error: "Chyba při aktualizaci menu" }, { status: 500 })
  }
}

export async function GET() {
  // Return uploaded URLs if available, otherwise default to HTML pages
  return NextResponse.json({
    week1Url: uploadedMenuUrls.week1 || "/api/menu/default/week1",
    week2Url: uploadedMenuUrls.week2 || "/api/menu/default/week2",
  })
}
