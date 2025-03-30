import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { UserProfile } from "@/components/user-profile"
import { notFound } from "next/navigation"
import { users } from "@/lib/mock-data"
import { Suspense } from "react"
import { ProfileSkeleton } from "@/components/loading-skeleton"

import { use } from "react";

type Params = Promise<{ id: string }>;

export default function ProfilePage(props: { params: Params }) {
    const params = use(props.params);
    // Ensure we have a valid user ID
    if (!params.id) {
        notFound();
    }

    const user = users.find((user) => user.id === params.id);

    if (!user) {
        notFound();
    }

    return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1 container py-6">
                <Suspense fallback={<ProfileSkeleton />}>
                    <UserProfile user={user} />
                </Suspense>
            </main>
            <SiteFooter />
        </div>
    );
}

