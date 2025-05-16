import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { MobileNav } from "@/components/mobile-nav"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "PawConnect - Social Media for Pet Lovers",
  description: "Connect with other pet owners, find mates for your pets, and arrange walks.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#161A1D" />
        <link rel="apple-touch-icon" href="/paw-pattern.svg" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <div>
            <MobileNav />
          </div>
          {/* Spacer for iOS/PWA home indicator */}
          <div style={{ height: 'env(safe-area-inset-bottom, 32px)' }} />
        </ThemeProvider>
      </body>
    </html>
  )
}

