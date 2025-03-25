import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MarketplacePage } from "@/components/marketplace-page";
import { Suspense } from "react";
import { MarketplaceSkeleton } from "@/components/loading-skeleton";

export default function Marketplace() {
    return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1 container py-6">
                <Suspense fallback={<MarketplaceSkeleton />}>
                    <MarketplacePage />
                </Suspense>
            </main>
            <SiteFooter />
        </div>
    );
}
