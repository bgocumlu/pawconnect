import { FeedSkeleton } from "@/components/loading-skeleton"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function HomeLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container py-6">
        <FeedSkeleton />
      </main>
      <SiteFooter />
    </div>
  )
}

