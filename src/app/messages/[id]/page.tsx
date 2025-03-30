import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MessageConversation } from "@/components/message-conversation"
import { notFound } from "next/navigation"
import { conversations } from "@/lib/mock-data"

import { use } from "react";

type Params = Promise<{ id: string }>;

export default function ConversationPage(props: { params: Params }) {
  const params = use(props.params);
  const conversation = conversations.find((conv) => conv.id === params.id)

  if (!conversation) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container py-6">
        <MessageConversation conversation={conversation} />
      </main>
      <SiteFooter />
    </div>
  )
}

