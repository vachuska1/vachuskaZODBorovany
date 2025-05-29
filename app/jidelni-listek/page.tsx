"use client"

import { useLanguage } from "@/components/language-provider"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Printer } from "lucide-react"

export default function MenuPage() {
  const { t } = useLanguage()
  const [pdfUrls, setPdfUrls] = useState({
    week1: "/api/menu/default/week1",
    week2: "/api/menu/default/week2",
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    setLoading(true)
    fetch("/api/menu/update")
      .then((res) => res.json())
      .then((data) => {
        setPdfUrls({
          week1: data.week1Url || "/api/menu/default/week1",
          week2: data.week2Url || "/api/menu/default/week2",
        })
        setError("")
      })
      .catch((err) => {
        console.error("Error fetching menu:", err)
        setPdfUrls({
          week1: "/api/menu/default/week1",
          week2: "/api/menu/default/week2",
        })
        setError("")
      })
      .finally(() => setLoading(false))
  }, [])

  const handlePrint = (weekUrl: string, weekTitle: string) => {
    // Otevře URL přímo v novém okně pro lepší tisk
    const printWindow = window.open(weekUrl, "_blank", "width=800,height=600")
    if (printWindow) {
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print()
        }, 1000)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{t("menu")}</h1>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tento týden */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              <div className="bg-gray-800 text-white p-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Tento týden</h2>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handlePrint(pdfUrls.week1, "Tento týden")}
                      variant="outline"
                      size="sm"
                      className="bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                    >
                      <Printer className="h-4 w-4 mr-2" />
                      Tisk
                    </Button>
                    <Button
                      onClick={() => window.open(pdfUrls.week1, "_blank")}
                      variant="outline"
                      size="sm"
                      className="bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                    >
                      📱 Zobrazit PDF
                    </Button>
                  </div>
                </div>
              </div>
              <div className="h-[700px]">
                <iframe
                  src={`${pdfUrls.week1}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                  className="w-full h-full border-0"
                  title="Jídelní lístek - Tento týden"
                  onError={() => setError("Chyba při načítání jídelního lístku")}
                />
              </div>
            </div>

            {/* Příští týden */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              <div className="bg-gray-700 text-white p-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Příští týden</h2>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handlePrint(pdfUrls.week2, "Příští týden")}
                      variant="outline"
                      size="sm"
                      className="bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                    >
                      <Printer className="h-4 w-4 mr-2" />
                      Tisk
                    </Button>
                    <Button
                      onClick={() => window.open(pdfUrls.week2, "_blank")}
                      variant="outline"
                      size="sm"
                      className="bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                    >
                      📱 Zobrazit PDF
                    </Button>
                  </div>
                </div>
              </div>
              <div className="h-[700px]">
                <iframe
                  src={`${pdfUrls.week2}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                  className="w-full h-full border-0"
                  title="Jídelní lístek - Příští týden"
                  onError={() => setError("Chyba při načítání jídelního lístku")}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
