"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"
import { cn } from "@/lib/utils"

interface OptimizedImageProps extends Omit<ImageProps, "onLoad"> {
  fallback?: string
}

export function OptimizedImage({ src, alt, className, fallback = "/placeholder.svg", ...props }: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={error ? fallback : src}
        alt={alt}
        className={cn("transition-opacity duration-300", isLoaded ? "opacity-100" : "opacity-0")}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        loading="lazy"
        {...props}
      />
      {!isLoaded && <div className="absolute inset-0 bg-muted animate-pulse" />}
    </div>
  )
}

