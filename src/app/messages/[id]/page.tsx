"use client";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { notFound } from "next/navigation";
import { conversations } from "@/lib/mock-data";
import { MessageConversation } from "@/components/message-conversation";

import { useParams } from "next/navigation";

export default function MessagePage() {
    const { id }: { id: string[] } = useParams();

    const paramsId = id[1];

    const conversation = conversations.find((conv) => conv.id === paramsId);

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
