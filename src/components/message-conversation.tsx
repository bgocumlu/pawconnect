/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, ImageIcon, Send, Smile } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function MessageConversation({ conversation }: { conversation: any }) {
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState(conversation.messages)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const newMsg = {
      id: `msg-${Date.now()}`,
      content: newMessage,
      sender: "me",
      timestamp: "Just now",
    }

    setMessages([...messages, newMsg])
    setNewMessage("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-12rem)] flex flex-col">
      <Card className="rounded-2xl border-2 shadow-xs flex flex-col h-full">
        <CardHeader className="border-b px-4 py-3 shrink-0">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="mr-2 rounded-full h-10 w-10 flex items-center justify-center"
            >
              <Link href="/messages">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <Avatar className="h-10 w-10 mr-3 border-2 border-primary/20">
              <AvatarImage src={conversation.user.avatar || "/placeholder.svg"} alt={conversation.user.name} />
              <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">{conversation.user.name}</CardTitle>
              <div className="text-xs text-muted-foreground flex items-center">
                <span
                  className={cn("h-2 w-2 rounded-full mr-1", conversation.user.isOnline ? "bg-secondary" : "bg-muted")}
                ></span>
                {conversation.user.isOnline ? "Online" : "Offline"}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="text-center text-xs text-muted-foreground py-2">{conversation.startDate}</div>

          {messages.map((message: any) => (
            <div key={message.id} className={cn("flex max-w-[80%]", message.sender === "me" ? "ml-auto" : "mr-auto")}>
              {message.sender !== "me" && (
                <Avatar className="h-8 w-8 mr-2 mt-1 shrink-0 border-2 border-primary/20">
                  <AvatarImage src={conversation.user.avatar || "/placeholder.svg"} alt={conversation.user.name} />
                  <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div>
                <div
                  className={cn(
                    "rounded-2xl px-4 py-2",
                    message.sender === "me" ? "bg-primary text-primary-foreground" : "bg-muted",
                  )}
                >
                  {message.content}
                </div>
                <div className="text-xs text-muted-foreground mt-1 px-2">{message.timestamp}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </CardContent>
        <div className="p-3 border-t flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 flex items-center justify-center">
            <ImageIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 flex items-center justify-center">
            <Smile className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Type a message..."
            className="rounded-full"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            size="icon"
            className="rounded-full h-10 w-10 flex items-center justify-center"
            onClick={handleSendMessage}
            disabled={newMessage.trim() === ""}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </Card>
    </div>
  )
}

