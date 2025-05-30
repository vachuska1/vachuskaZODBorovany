"use client"

import { useLanguage } from "@/components/language-provider"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Printer, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Download } from "lucide-react"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"

// Nastavení PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

interface PDFViewerProps {
  url: string
  title: string
  onPrint: () => void
}

function PDFViewer({ url, title, onPrint }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [scale, setScale] = useState<number>(1.0)
  const [loading, setLoading] = useState<boolean>(true)

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    setLoading(false)
  }

  function onDocumentLoadError(error: Error) {
    console.error("Error loading PDF:", error)
    setLoading(false)
  }

  const goToPrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1))
  const goToNextPage = () => setPageNumber((prev) => Math.min(prev + 1, numPages))
  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 2.0))
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5))

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
      {/* Header s ovládacími prvky */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold">{title}</h2>
          <div className="flex gap-2">
            <Button
              onClick={onPrint}
              variant="outline"
              size="sm"
              className="bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
            >
              <Printer className="h-4 w-4 mr-2" />
              Tisk
            </Button>
            <Button
              onClick={() => window.open(url, "_blank")}
              variant="outline"
              size="sm"
              className="bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Stáhnout
            </Button>
          </div>
        </div>

        {/* Ovládací panel */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white hover:bg-opacity-20"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              {pageNumber} / {numPages}
            </span>
            <Button
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white hover:bg-opacity-20"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={zoomOut}
              disabled={scale <= 0.5}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white hover:bg-opacity-20"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm">{Math.round(scale * 100)}%</span>
            <Button
              onClick={zoomIn}
              disabled={scale >= 2.0}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white hover:bg-opacity-20"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* PDF obsah */}
      <div className="h-[700px] overflow-auto bg-gray-100 flex justify-center items-start p-4">
        {loading && (
          <div className="flex items-center justify-center h-full">
            <LoadingSpinner />
          </div>
        )}

        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={<LoadingSpinner />}
          className="shadow-lg"
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            className="border border-gray-300 bg-white"
            renderTextLayer={true}
            renderAnnotationLayer={true}
          />
        </Document>
      </div>

      {/* Footer s informacemi */}
      <div className="bg-gray-50 px-4 py-2 text-center text-sm text-gray-600">
        Použijte kolečko myši nebo tlačítka pro zoom • Šipky pro navigaci
      </div>
    </div>
  )
}

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
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <PDFViewer
              url={pdfUrls.week1}
              title="Tento týden"
              onPrint={() => handlePrint(pdfUrls.week1, "Tento týden")}
            />
            <PDFViewer
              url={pdfUrls.week2}
              title="Příští týden"
              onPrint={() => handlePrint(pdfUrls.week2, "Příští týden")}
            />
          </div>
        )}
      </div>
    </div>
  )
}
