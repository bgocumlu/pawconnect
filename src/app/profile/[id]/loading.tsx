import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function ProfileLoading() {
    return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1 container py-6">
                <div className="max-w-4xl mx-auto animate-pulse">
                    <div className="relative mb-8">
                        <div className="h-48 sm:h-64 w-full rounded-2xl bg-muted"></div>
                        <div className="absolute -bottom-16 left-4 sm:left-8">
                            <div className="h-32 w-32 rounded-full bg-muted"></div>
                        </div>
                    </div>

                    <div className="mt-16 px-4">
                        <div className="h-8 w-48 bg-muted rounded mb-2"></div>
                        <div className="h-4 w-64 bg-muted rounded mb-3"></div>
                        <div className="h-4 w-full max-w-md bg-muted rounded mb-4"></div>

                        <div className="flex gap-2 mb-6">
                            <div className="h-10 w-28 bg-muted rounded-full"></div>
                            <div className="h-10 w-24 bg-muted rounded-full"></div>
                        </div>
                    </div>
                </div>
            </main>
            <SiteFooter />
        </div>
    );
}
