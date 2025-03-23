"use client"

import { Home, MessageCircle, PawPrintIcon as Paw, MapPin, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
    },
    {
      name: "Mating",
      href: "/mating",
      icon: Paw,
    },
    {
      name: "Walk Buddy",
      href: "/walk-buddy",
      icon: MapPin,
    },
    {
      name: "Messages",
      href: "/messages",
      icon: MessageCircle,
    },
    {
      name: "Profile",
      href: "/profile/user1",
      icon: User,
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60 border-t">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <item.icon className={cn("h-5 w-5 mb-1", isActive && "animate-paw-bounce")} />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

