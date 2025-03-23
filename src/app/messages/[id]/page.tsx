import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { notFound } from "next/navigation";
import { conversations } from "@/lib/mock-data";
import { MessageConversation } from "@/components/message-conversation";

interface PageProps {
    params: Promise<{ id: string }>; // If params is a Promise
}

export default async function MessagePage({ params }: PageProps) {
    const { id } = await params; // Await the params if it's a Promise

    const conversation = conversations.find((conv) => conv.id === id);

    if (!conversation) {
        notFound();
    }

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <SiteHeader />
            <main className="flex-1 container py-6">
                <MessageConversation conversation={conversation} />
            </main>
            <SiteFooter />
        </div>
    );
}
