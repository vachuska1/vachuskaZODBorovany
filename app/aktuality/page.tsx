"use client"

import { useLanguage } from "@/components/language-provider"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Printer } from "lucide-react"

export default function NewsPage() {
  const { t } = useLanguage()
  const [error, setError] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const pdfUrl = "/api/pdfs/aktuality"

  const handlePrint = () => {
    const printWindow = window.open(pdfUrl, "_blank", "width=800,height=600")
    if (printWindow) {
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print()
        }, 1000)
      }
    }
  }

  // Funkce pro vytvoření PDF.js URL - STEJNĚ JAKO U JÍDELNÍCH LÍSTKŮ
  const getPdfJsUrl = (pdfUrl: string) => {
    if (!mounted) return ""
    return `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(window.location.origin + pdfUrl)}`
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{t("news")}</h1>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              <div className="bg-gray-800 text-white p-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">{t("workOffers")}</h2>
                </div>
              </div>
              <div className="h-[800px] flex items-center justify-center">
                <div className="text-gray-500">Načítání...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{t("news")}</h1>
        </div>

        {error ? (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              <div className="bg-gray-800 text-white p-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">{t("workOffers")}</h2>
                  <Button
                    onClick={handlePrint}
                    variant="outline"
                    size="sm"
                    className="bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    {t("print")}
                  </Button>
                </div>
              </div>
              <div className="h-[800px]">
                <iframe
                  src={getPdfJsUrl(pdfUrl)}
                  className="w-full h-full border-0"
                  title={t("workOffers")}
                  onError={() => setError("Chyba při načítání dokumentu")}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
