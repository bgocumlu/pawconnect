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
  ref: RefObject<Element>
  isIntersecting: boolean
  hasIntersected: boolean
} {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const ref = useRef<Element>(null)

  useEffect(() => {
    const currentRef = ref.current

    if (!currentRef) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsIntersecting(true)
          setHasIntersected(true)
        } else {
          setIsIntersecting(false)
        }
      },
      {
        threshold,
        rootMargin,
        root,
      },
    )

    observer.observe(currentRef)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, root])

  return { ref, isIntersecting, hasIntersected }
}

