import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MatingPage } from "@/components/mating-page";
import { Suspense } from "react";
import { MatingPageSkeleton } from "@/components/loading-skeleton";

export default function Mating() {
    return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1 container py-6">
                <Suspense fallback={<MatingPageSkeleton />}>
                    <MatingPage />
                </Suspense>
            </main>
            <SiteFooter />
        </div>
    );
}
