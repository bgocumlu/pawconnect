import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Feed } from "@/components/feed"
import { Suspense } from "react"
import { FeedSkeleton } from "@/components/loading-skeleton"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container py-6">
        <Suspense fallback={<FeedSkeleton />}>
          <Feed />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  )
}

