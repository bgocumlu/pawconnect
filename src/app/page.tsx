import { Feed } from "@/components/feed"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container py-6">
        <Feed />
      </main>
      <SiteFooter />
    </div>
  )
}

