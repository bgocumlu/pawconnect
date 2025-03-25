"use client"

import { useState, useEffect } from "react"
import Image, { type ImageProps } from "next/image"
import { cn } from "@/lib/utils"

interface OptimizedImageProps extends Omit<ImageProps, "onLoad"> {
  fallback?: string
}

export function OptimizedImage({ src, alt, className, fallback = "/placeholder.svg", ...props }: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [imageSrc, setImageSrc] = useState(src)

  // Handle src changes
  useEffect(() => {
    setImageSrc(src)
    setIsLoaded(false)
    setError(false)
  }, [src])

  // Handle errors safely
  const handleError = () => {
    setError(true)
    setImageSrc(fallback)
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={error ? fallback : imageSrc}
        alt={alt}
        className={cn("transition-opacity duration-300", isLoaded ? "opacity-100" : "opacity-0")}
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        {...props}
      />
      {!isLoaded && <div className="absolute inset-0 bg-muted animate-pulse" />}
    </div>
  )
}

