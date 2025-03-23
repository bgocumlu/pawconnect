import Link from "next/link"
import { PawPrintIcon as Paw, Heart } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:py-0 bg-muted/30 md:block hidden">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <div className="flex items-center gap-2">
          <Paw className="h-5 w-5 text-primary" />
          <p className="text-sm text-muted-foreground">© 2025 PawConnect. All rights reserved.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Terms
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Privacy
          </Link>
          <Link href="/help" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Help
          </Link>
          <span className="text-sm text-muted-foreground flex items-center">
            Made with <Heart className="h-3 w-3 mx-1 text-destructive" /> for pets
          </span>
        </div>
      </div>
    </footer>
  )
}

