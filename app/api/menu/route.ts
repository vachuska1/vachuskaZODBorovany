import { NextResponse } from "next/server"

// In-memory storage for uploaded PDF URLs
// This will reset on each deployment, but that's fine for this use case
const uploadedMenuUrls = {
  week1: null as string | null,
  week2: null as string | null,
}

export async function GET() {
  try {
    // Check if we have uploaded URLs, otherwise use the default endpoints
    const week1Url = uploadedMenuUrls.week1 || "/api/menu/generate-default-pdf?week=week1"
    const week2Url = uploadedMenuUrls.week2 || "/api/menu/generate-default-pdf?week=week2"

    return NextResponse.json({
      week1Url,
      week2Url,
    })
  } catch (error) {
    console.error("Get menu error:", error)
    return NextResponse.json(
      {
        week1Url: "/api/menu/generate-default-pdf?week=week1",
        week2Url: "/api/menu/generate-default-pdf?week=week2",
      },
      { status: 500 },
    )
  }
}
