"use client"

import { useLanguage } from "@/components/language-provider"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Printer, Upload } from "lucide-react"

type PdfUrls = {
  pdf1Url: string
  pdf2Url: string
}

const DEFAULT_PDF1 = "https://jtfdkynq6zcyxa4w.public.blob.vercel-storage.com/aktuality/nabidka-prace-NImbj0lqHTFBgcRWIxg8mpw5jO32rI.pdf"
const DEFAULT_PDF2 = "https://jtfdkynq6zcyxa4w.public.blob.vercel-storage.com/aktuality/nabidka-prace-xQViBb7351H95KQirQ1bJX7mxGqDBT.pdf"

export default function NewsPage() {
  const { t } = useLanguage()
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [pdfs, setPdfs] = useState<PdfUrls>({
    pdf1Url: '',
    pdf2Url: ''
  })

  useEffect(() => {
    const admin = localStorage.getItem('isAdmin') === 'true'
    setIsAdmin(admin)
    loadPdfs()
  }, [])

  const loadPdfs = async () => {
    try {
      const response = await fetch("/api/aktuality/pdf-url")
      if (!response.ok) throw new Error('Failed to fetch PDFs')
      const data = await response.json()
      
      // Only update if we have valid URLs
      const updatedPdfs = {
        pdf1Url: data.pdf1Url || DEFAULT_PDF1,
        pdf2Url: data.pdf2Url || DEFAULT_PDF2
      }
      
      setPdfs(updatedPdfs)
      setError("")
    } catch (err) {
      console.error("Error loading PDFs:", err)
      // Fallback to default PDFs if there's an error
      setPdfs({
        pdf1Url: DEFAULT_PDF1,
        pdf2Url: DEFAULT_PDF2
      })
      setError("Nepodařilo se načíst dokumenty")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePrint = (pdfUrl: string) => {
    const printWindow = window.open(pdfUrl, "_blank", "width=800,height=600")
    if (printWindow) {
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print()
        }, 500)
      }
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, pdfNumber: 1 | 2) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Reset file input
    e.target.value = ''

    const formData = new FormData()
    formData.append('file', file)
    formData.append('pdfNumber', pdfNumber.toString())

    try {
      setError("")
      const response = await fetch('/api/admin/upload-aktuality', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()
      if (response.ok) {
        // Update the specific PDF URL
        setPdfs(prev => ({
          ...prev,
          [`pdf${pdfNumber}Url`]: result.url
        }))
      } else {
        throw new Error(result.error || 'Nepodařilo se nahrát soubor')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Došlo k chybě při nahrávání')
      console.error('Upload error:', err)
    }
  }

  const getPdfJsUrl = (pdfUrl: string) => {
    return `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(pdfUrl)}`
  }

  // Don't show loading state if we have default PDFs
  const showLoading = isLoading && !pdfs.pdf1Url && !pdfs.pdf2Url

  if (showLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{t("news")}</h1>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </div>
    )
  }

  // Get translated title for the PDF
  const getTranslatedTitle = (number: number) => {
    return number === 1 ? t('aktualita1') : t('aktualita2')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{t("news")}</h1>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="w-full lg:w-[90%] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {([1, 2] as const).map((pdfNumber) => {
            const pdfUrl = pdfs[`pdf${pdfNumber}Url` as keyof PdfUrls] || ''
            const pdfName = getTranslatedTitle(pdfNumber)
            const isDefaultPdf = pdfUrl === (pdfNumber === 1 ? DEFAULT_PDF1 : DEFAULT_PDF2)

            return (
              <div key={pdfNumber} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                <div className="bg-gray-800 text-white p-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">{pdfName}</h2>
                    <Button
                      onClick={() => handlePrint(pdfUrl)}
                      variant="outline"
                      size="sm"
                      className="bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                      disabled={!pdfUrl || isDefaultPdf}
                      title={isDefaultPdf ? "Nelze tisknout výchozí PDF" : "Tisknout"}
                    >
                      <Printer className="h-4 w-4 mr-2" />
                      Tisknout
                    </Button>
                    {isAdmin && (
                      <>
                        <input
                          type="file"
                          id={`file-upload-${pdfNumber}`}
                          accept=".pdf"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, pdfNumber)}
                        />
                        <label
                          htmlFor={`file-upload-${pdfNumber}`}
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-8 w-8 p-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground cursor-pointer"
                          title="Nahrát nový dokument"
                        >
                          <Upload className="h-4 w-4" />
                        </label>
                      </>
                    )}
                  </div>
                </div>
                <div className="h-[700px] w-full bg-gray-50 flex items-center justify-center">
                  <iframe
                    key={`pdf-${pdfNumber}`} // Force re-render when URL changes
                    src={pdfUrl ? getPdfJsUrl(pdfUrl) : ''}
                    className="w-full h-full border-0"
                    title={pdfName}
                    onError={() => setError("Chyba při načítání dokumentu")}
                    onLoad={() => {
                      // This will be called when the iframe finishes loading
                      // You can add any additional logic here if needed
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
      </div>
    </div>
  )
}
