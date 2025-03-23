import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { UserProfile } from "@/components/user-profile"
import { notFound } from "next/navigation"
import { users } from "@/lib/mock-data"

export default function ProfilePage({ params }: { params: { id: string } }) {
  const user = users.find((user) => user.id === params.id);

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

