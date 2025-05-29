"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { LightboxGallery } from "@/components/lightbox-gallery"
import { Wheat, Milk, ChefHat } from "lucide-react"

export default function HomePage() {
  const { t } = useLanguage()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const galleryImages = [
    { src: "/images/gallery/1.jpg", alt: "ZOD Borovany - Zemědělská technika 1" },
    { src: "/images/gallery/2.jpg", alt: "ZOD Borovany - Zemědělská technika 2" },
    { src: "/images/gallery/3.jpg", alt: "ZOD Borovany - Zemědělská technika 3" },
    { src: "/images/gallery/4.jpg", alt: "ZOD Borovany - Zemědělská technika 4" },
    { src: "/images/gallery/5.jpg", alt: "ZOD Borovany - Zemědělská technika 5" },
    { src: "/images/gallery/6.jpg", alt: "ZOD Borovany - Zemědělská technika 6" },
    { src: "/images/gallery/7.jpg", alt: "ZOD Borovany - Zemědělská technika 7" },
    { src: "/images/gallery/8.jpg", alt: "ZOD Borovany - Zemědělská technika 8" },
  ]

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  // Listen for custom event from lightbox thumbnails
  useEffect(() => {
    const handleGoto = (e: CustomEvent) => {
      goToImage(e.detail)
    }
    window.addEventListener("lightbox-goto", handleGoto as EventListener)
    return () => window.removeEventListener("lightbox-goto", handleGoto as EventListener)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/zod-main.jpg"
            alt="ZOD Borovany - Zemědělské družstvo"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Zemědělské obchodní družstvo Borovany</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">Moderní zemědělské družstvo s tradicí</p>
        </div>
      </section>

      {/* Company Info Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            {/* Logo - Increased by 50% */}
            <div className="text-center mb-8">
              <Image src="/images/logo.png" alt="ZOD Borovany Logo" width={300} height={150} className="mx-auto" />
            </div>

            {/* Company Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div>
                  <span className="font-semibold text-gray-800">Adresa:</span>
                  <span className="ml-2 text-gray-600">Vodárenská 97, 373 12 Borovany</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">IČO:</span>
                  <span className="ml-2 text-gray-600">00109207</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">DIČ:</span>
                  <span className="ml-2 text-gray-600">CZ00109207</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="font-semibold text-gray-800">Tel:</span>
                  <span className="ml-2 text-gray-600">387 023 511</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Email:</span>
                  <span className="ml-2 text-gray-600">info@zodborovany.cz</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Datová schránka:</span>
                  <span className="ml-2 text-gray-600">r5tcx53</span>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="text-center border-t border-gray-200 pt-6">
              <div>
                <span className="font-semibold text-gray-800">Otevírací doba:</span>
                <span className="ml-2 text-gray-600">Po–Pá: 7:00–15:30, So–Ne: zavřeno</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/jidelni-listek">
                <Button className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 text-white px-8 py-3">
                  Jídelní lístek
                </Button>
              </Link>
              <Link href="/kontakt">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3"
                >
                  Kontakt
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">{t("whatWeDo")}</h2>

          {/* Responsive grid: 1 column on mobile, 2 columns on medium, 3 columns on large+ */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {/* Plant Production */}
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-gray-100">
                  <Wheat className="h-10 w-10 text-gray-700" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-4">{t("plantProduction")}</h3>
              <div className="text-gray-600 space-y-4">
                <p>{t("plantProductionText1")}</p>
                <p>{t("plantProductionText2")}</p>
              </div>
            </div>

            {/* Animal Production */}
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-gray-100">
                  <Milk className="h-10 w-10 text-gray-700" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-4">{t("animalProduction")}</h3>
              <div className="text-gray-600 space-y-4">
                <p>{t("animalProductionText1")}</p>
                <p>{t("animalProductionText2")}</p>
              </div>
            </div>

            {/* Company Canteen - This will be in the third column on xl+, or wrap to new row on md */}
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 md:col-span-2 xl:col-span-1">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-gray-100">
                  <ChefHat className="h-10 w-10 text-gray-700" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-4">{t("companyCanteen")}</h3>
              <div className="text-gray-600 space-y-4">
                <p>{t("companyCanteenText1")}</p>
                <p>{t("companyCanteenText2")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">{t("gallery")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="aspect-square overflow-hidden rounded-lg shadow-md cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Gallery */}
      <LightboxGallery
        images={galleryImages}
        isOpen={lightboxOpen}
        currentIndex={currentImageIndex}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrevious={previousImage}
      />
    </div>
  )
}
