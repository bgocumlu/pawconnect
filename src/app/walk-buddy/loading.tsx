import { WalkBuddySkeleton } from "@/components/loading-skeleton"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function WalkBuddyLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-6">
        <WalkBuddySkeleton />
      </main>
      <SiteFooter />
    </div>
  )
}

