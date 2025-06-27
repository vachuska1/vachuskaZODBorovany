"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Upload, FileText } from "lucide-react"

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [message, setMessage] = useState("")
  const [uploading, setUploading] = useState(false)
  const [currentMenus, setCurrentMenus] = useState({
    week1Url: "",
    week2Url: "",
  })
  const [currentNews, setCurrentNews] = useState({
    pdf1Url: "",
    pdf2Url: "",
    pdf3Url: "",
    pdf4Url: "",
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      loadCurrentMenus()
    }
  }, [isAuthenticated])

  const loadCurrentMenus = async () => {
    setLoading(true)
    try {
      // Load menus
      const menusResponse = await fetch("/api/menu/update")
      const menusData = await menusResponse.json()
      setCurrentMenus({
        week1Url: menusData.week1Url || "",
        week2Url: menusData.week2Url || "",
      })

      // Load news PDFs
      const newsResponse = await fetch("/api/aktuality/pdf-url")
      const newsData = await newsResponse.json()
      setCurrentNews({
        pdf1Url: newsData.pdf1Url || "",
        pdf2Url: newsData.pdf2Url || "",
        pdf3Url: newsData.pdf3Url || "",
        pdf4Url: newsData.pdf4Url || "",
      })
    } catch (error) {
      console.error("Error loading data:", error)
      setMessage("Chyba při načítání dat")
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setMessage("")
    } else {
      setMessage("Nesprávné heslo")
    }
  }

  const handleFileUpload = async (file: File, week: "week1" | "week2") => {
    setUploading(true)
    setMessage("")

    const formData = new FormData()
    formData.append("file", file)
    formData.append("week", week)

    try {
      const response = await fetch("/api/admin/upload-menu", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        // Update the menu URL
        const updateResponse = await fetch("/api/menu/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            week: week,
            url: data.url,
          }),
        })

        if (updateResponse.ok) {
          setMessage(`${week === "week1" ? "Týden 1" : "Týden 2"} byl úspěšně nahrán`)

          // Reload current menus
          loadCurrentMenus()
        } else {
          setMessage(`Soubor byl nahrán, ale došlo k chybě při aktualizaci`)
        }
      } else {
        setMessage(data.error || "Chyba při nahrávání souboru")
      }
    } catch (error) {
      console.error("Upload error:", error)
      setMessage("Chyba při nahrávání souboru")
    } finally {
      setUploading(false)
    }
  }

  const handleDocumentUpload = async (file: File, documentType: string) => {
    setUploading(true)
    setMessage("")

    const formData = new FormData()
    formData.append("file", file)
    formData.append("documentType", documentType)

    try {
      const response = await fetch("/api/admin/upload-document", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(`${documentType} byl úspěšně nahrán`)
      } else {
        setMessage(data.error || "Chyba při nahrávání souboru")
      }
    } catch (error) {
      console.error("Upload error:", error)
      setMessage("Chyba při nahrávání souboru")
    } finally {
      setUploading(false)
    }
  }

  const handleNewsUpload = async (file: File, pdfNumber: 1 | 2 | 3 | 4) => {
    setUploading(true)
    setMessage("")

    const formData = new FormData()
    formData.append("file", file)
    formData.append("pdfNumber", pdfNumber.toString())

    try {
      const response = await fetch("/api/admin/upload-aktuality", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(`Aktualita ${pdfNumber} byla úspěšně nahrána`)
        // Update the current news state
        setCurrentNews(prev => ({
          ...prev,
          [`pdf${pdfNumber}Url`]: data.url
        }))
      } else {
        throw new Error(data.error || "Chyba při nahrávání souboru")
      }
    } catch (error) {
      console.error("Upload error:", error)
      setMessage(error instanceof Error ? error.message : "Chyba při nahrávání souboru")
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteNews = async (pdfNumber: 1 | 2 | 3 | 4) => {
    if (!window.confirm(`Opravdu chcete smazat aktuální PDF pro Aktualitu ${pdfNumber}?`)) {
      return
    }

    setUploading(true)
    setMessage("")

    try {
      const response = await fetch("/api/admin/delete-aktualita", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pdfNumber: pdfNumber.toString() }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(`Aktualita ${pdfNumber} byla úspěšně smazána`)
        // Force a refresh of the PDF list
        const response = await fetch("/api/aktuality/pdf-url")
        if (response.ok) {
          const data = await response.json()
          setCurrentNews({
            pdf1Url: data.pdf1Url || "",
            pdf2Url: data.pdf2Url || "",
            pdf3Url: data.pdf3Url || "",
            pdf4Url: data.pdf4Url || ""
          })
        }
      } else {
        throw new Error(data.error || "Chyba při mazání souboru")
      }
    } catch (error) {
      console.error("Delete error:", error)
      setMessage(error instanceof Error ? error.message : "Chyba při mazání souboru")
    } finally {
      setUploading(false)
    }
  }

  const isDefaultUrl = (url: string) => {
    return url.includes("/api/menu/default/")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">🔐 Administrace</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="password">Heslo</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Zadejte heslo..."
              />
            </div>
            <Button onClick={handleLogin} className="w-full">
              Přihlásit se
            </Button>
            {message && (
              <Alert variant={message.includes("Chyba") ? "destructive" : "default"}>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">📋 Správa jídelních lístků</h1>
          <p className="text-gray-600">Nahrajte PDF soubory pro týdenní jídelní lístky</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Week 1 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Týden 1
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileUpload(file, "week1")
                    }}
                    disabled={uploading}
                    className="cursor-pointer"
                  />
                  <p className="text-sm text-gray-500 mt-2">Pouze PDF soubory</p>
                </div>
                {uploading && <LoadingSpinner />}
              </CardContent>
              <CardFooter className="flex flex-col items-start space-y-2">
                <p className="text-sm font-medium text-gray-700">Aktuální stav:</p>
                {isDefaultUrl(currentMenus.week1Url) ? (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    Žádný PDF soubor není nahrán
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    PDF soubor je nahrán
                    <a
                      href={currentMenus.week1Url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline ml-2"
                    >
                      Zobrazit
                    </a>
                  </div>
                )}
              </CardFooter>
            </Card>

            {/* Week 2 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Týden 2
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileUpload(file, "week2")
                    }}
                    disabled={uploading}
                    className="cursor-pointer"
                  />
                  <p className="text-sm text-gray-500 mt-2">Pouze PDF soubory</p>
                </div>
                {uploading && <LoadingSpinner />}
              </CardContent>
              <CardFooter className="flex flex-col items-start space-y-2">
                <p className="text-sm font-medium text-gray-700">Aktuální stav:</p>
                {isDefaultUrl(currentMenus.week2Url) ? (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    Žádný PDF soubor není nahrán
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    PDF soubor je nahrán
                    <a
                      href={currentMenus.week2Url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline ml-2"
                    >
                      Zobrazit
                    </a>
                  </div>
                )}
              </CardFooter>
            </Card>
          </div>
        )}

        {/* Aktuality */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">📰 Správa aktualit</h2>
          <p className="text-center text-gray-600 mb-8">Nahrajte PDF soubory pro aktuality (max. 4)</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {([1, 2, 3, 4] as const).map((pdfNumber) => (
              <Card key={pdfNumber}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Aktualita {pdfNumber}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <Input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleNewsUpload(file, pdfNumber)
                      }}
                      disabled={uploading}
                      className="cursor-pointer"
                    />
                    <p className="text-sm text-gray-500 mt-2">Pouze PDF soubory</p>
                  </div>
                  {uploading && <LoadingSpinner />}
                </CardContent>
                <CardFooter className="flex flex-col items-start space-y-2">
                  <p className="text-sm font-medium text-gray-700">Aktuální stav:</p>
                  {currentNews[`pdf${pdfNumber}Url` as keyof typeof currentNews] ? (
                    <div className="w-full">
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        PDF soubor je nahrán
                        <a
                          href={currentNews[`pdf${pdfNumber}Url` as keyof typeof currentNews]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline ml-2 mr-2"
                        >
                          Zobrazit
                        </a>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            handleDeleteNews(pdfNumber)
                          }}
                          className="text-red-600 hover:underline text-sm"
                          disabled={uploading}
                        >
                          Smazat
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      Žádný PDF soubor není nahrán
                    </div>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Ostatní dokumenty */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">📄 Ostatní dokumenty</h2>
          <p className="text-center text-gray-600 mb-8">Nahrajte PDF soubory pro VOS a dokumenty</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* VOS */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  VOS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleDocumentUpload(file, "vos")
                    }}
                    disabled={uploading}
                    className="cursor-pointer"
                  />
                  <p className="text-sm text-gray-500 mt-2">Pouze PDF soubory</p>
                </div>
                {uploading && <LoadingSpinner />}
              </CardContent>
            </Card>

            {/* Stanovy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Stanovy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleDocumentUpload(file, "stanovy")
                    }}
                    disabled={uploading}
                    className="cursor-pointer"
                  />
                  <p className="text-sm text-gray-500 mt-2">Pouze PDF soubory</p>
                </div>
                {uploading && <LoadingSpinner />}
              </CardContent>
            </Card>

            {/* Dotace */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Dotace
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleDocumentUpload(file, "dotace")
                    }}
                    disabled={uploading}
                    className="cursor-pointer"
                  />
                  <p className="text-sm text-gray-500 mt-2">Pouze PDF soubory</p>
                </div>
                {uploading && <LoadingSpinner />}
              </CardContent>
            </Card>
          </div>
        </div>

        {message && (
          <Alert className="mt-6" variant={message.includes("Chyba") ? "destructive" : "default"}>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        <div className="mt-8 text-center">
          <Button onClick={() => (window.location.href = "/")} variant="outline" className="mr-4">
            ← Zpět na hlavní stránku
          </Button>
          <Button onClick={() => (window.location.href = "/jidelni-listek")} variant="outline">
            Zobrazit jídelní lístky
          </Button>
        </div>
      </div>
    </div>
  )
}
