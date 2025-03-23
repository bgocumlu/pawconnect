import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { WalkBuddyPage } from "@/components/walk-buddy-page"

export default function WalkBuddy() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-6">
        <WalkBuddyPage />
      </main>
      <SiteFooter />
    </div>
  )
}

