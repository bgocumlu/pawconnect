import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { VetsPage } from "@/components/vets-page"

export default function Vets() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-6">
        <VetsPage />
      </main>
      <SiteFooter />
    </div>
  )
}

