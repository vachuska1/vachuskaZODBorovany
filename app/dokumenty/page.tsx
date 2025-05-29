"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useState } from "react"
import { Printer } from "lucide-react"

export default function DocumentsPage() {
  const { t } = useLanguage()
  const [error, setError] = useState("")

  const documents = [
    {
      title: t("statutes"),
      url: "/api/pdfs/stanovy",
      id: "statutes",
    },
    {
      title: t("grants"),
      url: "/api/pdfs/dotace",
      id: "grants",
    },
  ]

  const handlePrint = (url: string, title: string) => {
    const printWindow = window.open(url, "_blank", "width=800,height=600")
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
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">{t("documents")}</h1>

        <div className="space-y-8">
          {documents.map((document) => (
            <Card key={document.id} className="bg-white shadow-lg border border-gray-200">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{document.title}</span>
                  <Button
                    onClick={() => handlePrint(document.url, document.title)}
                    variant="outline"
                    size="sm"
                    className="bg-gray-800 text-white border-gray-300 hover:bg-gray-700"
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    {t("print")}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {error ? (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                ) : (
                  <div className="h-[700px]">
                    <iframe
                      src={`${document.url}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                      className="w-full h-full border rounded"
                      title={document.title}
                      onError={() => setError("Chyba při načítání dokumentu")}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
