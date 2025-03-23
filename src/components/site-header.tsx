"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Home, MessageSquare, PawPrintIcon as Paw, Search, MapPin, Sun, Moon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState, useEffect } from "react"
import { useMobile } from "@/hooks/use-mobile"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { NotificationsPopover } from "@/components/notifications-popover"

export function SiteHeader() {
  const isMobile = useMobile()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Check if user prefers dark mode
    const isDark =
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)

    setIsDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    }
  }

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
      icon: MessageSquare,
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center mr-4">
          <Link href="/" className="flex items-center space-x-2">
            <Paw className="h-7 w-7 text-primary animate-paw-bounce" />
            <span className="font-bold text-xl hidden sm:inline-block">PawConnect</span>
          </Link>
        </div>

        {!isMobile && (
          <div className="flex-1 flex justify-center mx-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search pets and people..."
                className="w-full pl-10 rounded-full bg-muted h-10"
              />
            </div>
          </div>
        )}

        {isMobile && !isSearchOpen ? (
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 h-10 w-10 flex items-center justify-center"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
          </Button>
        ) : isMobile && isSearchOpen ? (
          <div className="flex-1 flex mx-2">
            <div className="relative w-full">
              <Input type="search" placeholder="Search..." className="w-full pr-8 rounded-full" autoFocus />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center"
                onClick={() => setIsSearchOpen(false)}
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : null}

        <div className="flex items-center space-x-1 ml-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full h-10 w-10 flex items-center justify-center"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {!isMobile ? (
            <>
              {navItems.map((item) => {
                const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)

                return (
                  <Button
                    key={item.name}
                    variant="ghost"
                    size="icon"
                    asChild
                    className={cn(
                      "rounded-full h-10 w-10 flex items-center justify-center",
                      isActive && "bg-primary/10 text-primary",
                    )}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                    </Link>
                  </Button>
                )
              })}
              <NotificationsPopover />
            </>
          ) : (
            <NotificationsPopover />
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 flex items-center justify-center">
                <Avatar className="h-9 w-9 border-2 border-primary/20">
                  <AvatarImage src="/placeholder.svg" alt="@user" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl">
              <DropdownMenuItem asChild>
                <Link href="/profile/user1">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

