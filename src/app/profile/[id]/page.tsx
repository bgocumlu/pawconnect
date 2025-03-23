import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { UserProfile } from "@/components/user-profile"
import { notFound } from "next/navigation"
import { users } from "@/lib/mock-data"

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id: paramsId } = await params; // Await the params promise
  const user = users.find((user) => user.id === paramsId);

  if (!user) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-6">
        <UserProfile user={user} />
      </main>
      <SiteFooter />
    </div>
  );
}

