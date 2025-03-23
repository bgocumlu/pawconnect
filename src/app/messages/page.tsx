import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MessageInbox } from "@/components/message-inbox"

export default function MessagesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container py-6">
        <MessageInbox />
      </main>
      <SiteFooter />
    </div>
  )
}

