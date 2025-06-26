"use client"

import type React from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LightboxGalleryProps {
  images: Array<{
    src: string
    alt: string
  }>
  isOpen: boolean
  currentIndex: number
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
}

export function LightboxGallery({ images, isOpen, currentIndex, onClose, onNext, onPrevious }: LightboxGalleryProps) {
  if (!isOpen) return null

  const currentImage = images[currentIndex]

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose()
    if (e.key === "ArrowLeft") onPrevious()
    if (e.key === "ArrowRight") onNext()
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Close button */}
      <Button
        onClick={onClose}
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 z-10"
      >
        <X className="h-6 w-6" />
      </Button>

      {/* Previous button */}
      <Button
        onClick={onPrevious}
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white hover:bg-opacity-20 z-10"
        disabled={images.length <= 1}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      {/* Next button */}
      <Button
        onClick={onNext}
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white hover:bg-opacity-20 z-10"
        disabled={images.length <= 1}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Main image */}
      <div className="relative max-w-4xl max-h-full w-full h-full flex flex-col items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={currentImage.src || "/placeholder.svg"}
            alt={currentImage.alt}
            width={1200}
            height={800}
            className="max-w-full max-h-[80vh] object-contain"
            priority
          />
        </div>
        
        {/* Image counter - moved to top */}
        <div className="mt-4 text-white bg-black bg-opacity-50 px-3 py-1 rounded">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  )
}
