import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LostPetsPage } from "@/components/lost-pets-page"
import { Suspense } from "react"
import { LostPetsSkeleton } from "@/components/loading-skeleton"

export default function LostPets() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-6">
        <Suspense fallback={<LostPetsSkeleton />}>
          <LostPetsPage />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  )
}

