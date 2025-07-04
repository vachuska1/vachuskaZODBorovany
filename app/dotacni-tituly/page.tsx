"use client"

import { useLanguage } from "@/components/language-provider"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileText, Printer, Upload } from "lucide-react"

type PdfUrls = {
  pdf1Url: string
  pdf2Url: string
  pdf3Url: string
  pdf4Url: string
  pdf1Name: string
  pdf2Name: string
  pdf3Name: string
  pdf4Name: string
}

export default function GrantsPage() {
  const { t } = useLanguage()
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [pdfs, setPdfs] = useState<PdfUrls>({
    pdf1Url: '',
    pdf2Url: '',
    pdf3Url: '',
    pdf4Url: '',
    pdf1Name: 'Dotační titul 1',
    pdf2Name: 'Dotační titul 2',
    pdf3Name: 'Dotační titul 3',
    pdf4Name: 'Dotační titul 4'
  })

  useEffect(() => {
    const admin = localStorage.getItem('isAdmin') === 'true'
    setIsAdmin(admin)
    loadPdfs()
  }, [])

  const loadPdfs = async () => {
    try {
      const response = await fetch("/api/dotacni-tituly/pdf-url")
      if (!response.ok) throw new Error('Failed to fetch PDFs')
      const data = await response.json()
      
      // Only set the URLs that exist in the response
      setPdfs(prev => ({
        ...prev,
        pdf1Url: data.pdf1Url || '',
        pdf2Url: data.pdf2Url || '',
        pdf3Url: data.pdf3Url || '',
        pdf4Url: data.pdf4Url || '',
        pdf1Name: data.pdf1Name || 'Dotační titul 1',
        pdf2Name: data.pdf2Name || 'Dotační titul 2',
        pdf3Name: data.pdf3Name || 'Dotační titul 3',
        pdf4Name: data.pdf4Name || 'Dotační titul 4'
      }))
      setError("")
    } catch (err) {
      console.error("Error loading PDFs:", err)
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, pdfNumber: 1 | 2 | 3 | 4) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Reset file input
    e.target.value = ''

    const formData = new FormData()
    formData.append('file', file)
    formData.append('pdfNumber', pdfNumber.toString())

    try {
      setError("")
      const response = await fetch('/api/admin/upload-dotacni-tituly', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()
      if (response.ok) {
        // Update the specific PDF URL and name
        setPdfs(prev => ({
          ...prev,
          [`pdf${pdfNumber}Url`]: result.url,
          [`pdf${pdfNumber}Name`]: result.fileName
        }))
      } else {
        throw new Error(result.error || 'Chyba při nahrávání souboru')
      }
    } catch (err) {
      console.error('Upload error:', err)
      setError(err instanceof Error ? err.message : 'Neznámá chyba při nahrávání')
    }
  }

  const handleDelete = async (pdfNumber: 1 | 2 | 3 | 4) => {
    if (!confirm('Opravdu chcete smazat tento dotační titul?')) return
    
    try {
      const response = await fetch(`/api/admin/delete-dotacni-tituly?pdfNumber=${pdfNumber}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        // Update the specific PDF URL to empty
        setPdfs(prev => ({
          ...prev,
          [`pdf${pdfNumber}Url`]: '',
          [`pdf${pdfNumber}Name`]: t(`grantTitle${pdfNumber}`)
        }))
      } else {
        const error = await response.json()
        throw new Error(error.error || 'Chyba při mazání souboru')
      }
    } catch (err) {
      console.error('Delete error:', err)
      setError(err instanceof Error ? err.message : 'Neznámá chyba při mazání')
    }
  }

  const getPdfJsUrl = (pdfUrl: string) => {
    return `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(pdfUrl)}`
  }

  const renderPdfCard = (pdfNumber: 1 | 2 | 3 | 4) => {
    const pdfUrl = pdfs[`pdf${pdfNumber}Url` as keyof PdfUrls] as string
    const pdfName = t(`grantTitle${pdfNumber}`) || pdfs[`pdf${pdfNumber}Name` as keyof PdfUrls] as string
    const fileName = pdfUrl ? pdfUrl.split('/').pop()?.split('?')[0] || 'Soubor' : ''
    
    if (!pdfUrl) {
      return (
        <div key={pdfNumber} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="bg-[#1e40af] text-white p-4">
            <h3 className="font-semibold text-lg">{pdfName}</h3>
          </div>
          <div className="p-6 text-center">
            <p className="text-gray-500 mb-4">Žádný soubor není nahrán</p>
            {isAdmin && (
              <Button asChild variant="outline" className="relative">
                <label className="cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  Nahrát PDF
                  <input 
                    type="file" 
                    accept=".pdf" 
                    className="hidden" 
                    onChange={(e) => handleFileUpload(e, pdfNumber)}
                  />
                </label>
              </Button>
            )}
          </div>
        </div>
      )
    }
    
    return (
      <div key={pdfNumber} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="bg-[#1e40af] text-white p-4 flex justify-between items-center">
          <h3 className="font-semibold text-lg">{pdfName}</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handlePrint(pdfUrl)}
            className="text-white hover:bg-blue-700 hover:text-white"
          >
            <Printer className="h-4 w-4 mr-2" />
            {t('print')}
          </Button>
        </div>
        <div className="p-0">
          <div className="w-full bg-gray-100 flex items-center justify-center" style={{ minHeight: '80vh' }}>
            <iframe
              key={`pdf-${pdfNumber}`}
              src={getPdfJsUrl(pdfUrl)}
              className="w-full h-full min-h-[80vh] border-0"
              title={pdfName}
              onError={() => setError("Chyba při načítání dokumentu")}
              style={{ height: '100%', minHeight: '80vh' }}
            />
          </div>
          {isAdmin && (
            <div className="bg-gray-50 p-3 border-t mt-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center overflow-hidden">
                  <FileText className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-700 truncate">
                    {fileName}
                  </span>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(pdfNumber)}
                  className="w-full sm:w-auto justify-center"
                >
                  Smazat
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Check if we have any PDFs to show (non-empty strings)
  const hasPdfs = !!(pdfs.pdf1Url || pdfs.pdf2Url || pdfs.pdf3Url || pdfs.pdf4Url)

  if (isLoading) {
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

  // Get only the PDFs that have been uploaded
  const uploadedPdfNumbers = ([1, 2, 3, 4] as const).filter(
    (num) => pdfs[`pdf${num}Url` as keyof PdfUrls]
  )

  // Split PDFs into pairs for 2-column layout
  const pdfPairs = []
  for (let i = 0; i < uploadedPdfNumbers.length; i += 2) {
    pdfPairs.push(uploadedPdfNumbers.slice(i, i + 2))
  }

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="w-[90%] mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{t("grants")}</h1>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="w-full">
          {uploadedPdfNumbers.length > 0 ? (
            <div className="space-y-6">
              {pdfPairs.map((pair, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pair.map((pdfNumber) => renderPdfCard(pdfNumber))}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-500 text-lg mb-4">Momentálně nejsou k dispozici žádné dotační tituly.</p>
              {isAdmin && (
                <div className="mt-4">
                  <p className="text-gray-500 mb-4">Chcete-li přidat dotační titul, klikněte na tlačítko níže:</p>
                  <Button 
                    variant="outline" 
                    className="relative"
                    onClick={() => document.getElementById('file-upload-1')?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Nahrát první dotační titul
                    <input 
                      type="file" 
                      id="file-upload-1"
                      accept=".pdf" 
                      className="hidden" 
                      onChange={(e) => handleFileUpload(e, 1)}
                    />
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
