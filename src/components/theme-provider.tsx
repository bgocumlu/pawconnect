"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

// Create a context to track if we're already inside a ThemeProvider
const ThemeProviderContext = createContext(false)

export function useThemeProviderContext() {
  return useContext(ThemeProviderContext)
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)
  const isNested = useThemeProviderContext()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent multiple theme providers from being rendered
  if (isNested) {
    return <>{children}</>
  }

  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>
  }

  return (
    <ThemeProviderContext.Provider value={true}>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </ThemeProviderContext.Provider>
  )
}

