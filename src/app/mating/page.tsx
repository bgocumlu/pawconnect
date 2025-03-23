import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MatingPage } from "@/components/mating-page"

export default function Mating() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-6">
        <MatingPage />
      </main>
      <SiteFooter />
    </div>
  )
}

