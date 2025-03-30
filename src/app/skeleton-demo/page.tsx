import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LoadingSkeletonDemo } from "@/components/loading-skeleton-demo"

export default function SkeletonDemoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-6">
        <LoadingSkeletonDemo />
      </main>
      <SiteFooter />
    </div>
  )
}

