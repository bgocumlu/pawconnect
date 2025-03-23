// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { notFound } from "next/navigation";
import { conversations } from "@/lib/mock-data";
import { MessageConversation } from "@/components/message-conversation";

interface PageProps {
    params: { id: string };
}

export default function MessagePage({ params }: PageProps) {
    const { id } = params;

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
