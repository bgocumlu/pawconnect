/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, MessageCircle } from "lucide-react"
import Link from "next/link"
import { conversations } from "@/lib/mock-data"

export function MessageInbox() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredConversations = conversations.filter((conversation) => {
    const matchesSearch = conversation.user.name.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "unread") return matchesSearch && conversation.unreadCount > 0
    return matchesSearch
  })

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <MessageCircle className="mr-2 h-7 w-7 text-primary" />
          Messages
        </h1>
        <Button size="sm" className="rounded-full h-9 px-4 shadow-xs hover:shadow-sm">
          <Plus className="h-4 w-4 mr-2" />
          New Message
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search conversations..."
          className="pl-10 rounded-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="grid w-full grid-cols-2 rounded-full p-1">
          <TabsTrigger value="all" onClick={() => setActiveTab("all")} className="rounded-full">
            All Messages
          </TabsTrigger>
          <TabsTrigger value="unread" onClick={() => setActiveTab("unread")} className="rounded-full">
            Unread
            {conversations.reduce((count, conv) => count + conv.unreadCount, 0) > 0 && (
              <Badge variant="secondary" className="ml-2 rounded-full">
                {conversations.reduce((count, conv) => count + conv.unreadCount, 0)}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4 space-y-3">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conversation) => (
              <ConversationCard key={conversation.id} conversation={conversation} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No conversations found</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="unread" className="mt-4 space-y-3">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conversation) => (
              <ConversationCard key={conversation.id} conversation={conversation} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No unread messages</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ConversationCard({ conversation }: { conversation: any }) {
  return (
    <Link href={`/messages/${conversation.id}`}>
      <Card className="rounded-2xl border-2 transition-all duration-300 hover:shadow-md hover:border-primary/30">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-primary/20">
              <AvatarImage src={conversation.user.avatar || "/placeholder.svg"} alt={conversation.user.name} />
              <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base truncate">{conversation.user.name}</CardTitle>
                <CardDescription className="text-xs">{conversation.lastMessageTime}</CardDescription>
              </div>
              <div className="flex items-center justify-between mt-1">
                <CardDescription className="text-sm truncate">{conversation.lastMessage}</CardDescription>
                {conversation.unreadCount > 0 && (
                  <Badge variant="secondary" className="rounded-full ml-2">
                    {conversation.unreadCount}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

