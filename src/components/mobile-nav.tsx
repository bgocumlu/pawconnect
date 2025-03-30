"use client"

import { Home, PawPrintIcon as Paw, MapPin, Heart, Stethoscope } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const pathname = usePathname()

  // Hide the mobile nav on auth pages
  if (pathname?.startsWith("/auth/")) {
    return null
  }

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
    },
    {
      name: "Adoption",
      href: "/adoption",
      icon: Paw,
    },
    {
      name: "Mating",
      href: "/mating",
      icon: Heart,
    },
    {
      name: "Walk Buddy",
      href: "/walk-buddy",
      icon: MapPin,
    },
    {
      name: "Vets",
      href: "/vets",
      icon: Stethoscope,
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60 border-t">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href)

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full transition-colors duration-150",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center h-8 w-8 rounded-full mb-1",
                  isActive && "bg-primary/10",
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "")} />
              </div>
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

