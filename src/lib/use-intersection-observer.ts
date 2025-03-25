"use client"

import { useEffect, useState, useRef, type RefObject } from "react"

interface UseIntersectionObserverProps {
  threshold?: number
  rootMargin?: string
  root?: Element | null
}

export function useIntersectionObserver({
  threshold = 0,
  rootMargin = "0px",
  root = null,
}: UseIntersectionObserverProps = {}): {
  ref: RefObject<Element | null>
  isIntersecting: boolean
  hasIntersected: boolean
} {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const ref = useRef<Element>(null)

  useEffect(() => {
    // Early return if browser doesn't support IntersectionObserver
    if (typeof IntersectionObserver === "undefined" || !ref.current) {
      return () => {}
    }

    let observer: IntersectionObserver | null = null
    let isMounted = true

    try {
      observer = new IntersectionObserver(
        (entries) => {
          // Only update state if component is still mounted
          if (isMounted && entries[0]) {
            if (entries[0].isIntersecting) {
              setIsIntersecting(true)
              setHasIntersected(true)
            } else {
              setIsIntersecting(false)
            }
          }
        },
        {
          threshold,
          rootMargin,
          root,
        },
      )

      const currentRef = ref.current
      if (currentRef) {
        observer.observe(currentRef)
      }
    } catch (error) {
      console.error("Error setting up intersection observer:", error)
    }

    return () => {
      isMounted = false
      if (observer) {
        observer.disconnect()
      }
    }
  }, [threshold, rootMargin, root])

  return { ref, isIntersecting, hasIntersected }
}

