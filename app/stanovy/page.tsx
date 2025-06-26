"use client"

import { useLanguage } from "@/components/language-provider"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Printer } from "lucide-react"

export default function StatutesPage() {
  const { t } = useLanguage()
  const [error, setError] = useState("")
  const [documentUrl, setDocumentUrl] = useState("/api/pdfs/stanovy")

  useEffect(() => {
    // Load stanovy URL
    fetch("/api/documents/get-url?type=stanovy")
      .then((res) => res.json())
      .then((data) => {
        setDocumentUrl(data.url || "/api/pdfs/stanovy")
      })
      .catch(() => {})
  }, [])

  const handlePrint = () => {
    const printWindow = window.open(documentUrl, "_blank", "width=800,height=600")
    if (printWindow) {
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print()
        }, 1000)
      }
    }
  }

  // Funkce pro vytvoření PDF.js URL
  const getPdfJsUrl = (pdfUrl: string) => {
    return `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(pdfUrl)}`
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">{t("statutes")}</h1>

        <div className="w-full lg:w-[90%] mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
            <div className="bg-gray-800 text-white p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{t("statutes")}</h2>
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
            {error ? (
              <Alert variant="destructive" className="m-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : (
              <div className="h-[800px] w-full">
                <iframe
                  src={getPdfJsUrl(documentUrl)}
                  className="w-full h-full border-0"
                  title={t("statutes")}
                  onError={() => setError("Chyba při načítání dokumentu")}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
