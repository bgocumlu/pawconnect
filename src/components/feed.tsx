/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, MessageCircle, Share, Smile, PawPrintIcon as Paw, ImageIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { posts } from "@/lib/mock-data"

export function Feed() {
  const [activeTab, setActiveTab] = useState("for-you")
  const [postContent, setPostContent] = useState("")
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({})
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>(
    posts.reduce((acc, post) => ({ ...acc, [post.id]: post.likes }), {}),
  )

  const handleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const newLiked = { ...prev, [postId]: !prev[postId] }
      return newLiked
    })

    setLikeCounts((prev) => {
      const currentCount = prev[postId] || 0
      const newCount = likedPosts[postId] ? currentCount - 1 : currentCount + 1
      return { ...prev, [postId]: newCount }
    })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="mb-6 rounded-2xl border-2 shadow-md hover:shadow-lg transition-shadow duration-300 bg-linear-to-r from-background to-muted/20">
        <CardHeader className="pb-0 pt-4">
          <div className="flex items-start gap-3">
            <Avatar className="border-2 border-primary/20 h-12 w-12 shadow-xs">
              <AvatarImage src="/placeholder.svg" alt="@user" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="Share what your pet is up to..."
                className="resize-none rounded-xl min-h-[80px] w-full bg-background/80 backdrop-blur-xs border-primary/10 focus-visible:ring-primary/30"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />
              <div className="flex justify-between items-center mt-2">
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-9 w-9 flex items-center justify-center border-primary/20 bg-background/80 backdrop-blur-xs hover:bg-primary/10"
                  >
                    <ImageIcon className="h-4 w-4 text-primary" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-9 w-9 flex items-center justify-center border-primary/20 bg-background/80 backdrop-blur-xs hover:bg-primary/10"
                  >
                    <Camera className="h-4 w-4 text-primary" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-9 w-9 flex items-center justify-center border-primary/20 bg-background/80 backdrop-blur-xs hover:bg-primary/10"
                  >
                    <Smile className="h-4 w-4 text-primary" />
                  </Button>
                </div>
                <Button className="rounded-full px-6 h-9 shadow-md hover:shadow-lg font-medium">Post</Button>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="for-you" className="mb-6">
        <TabsList className="grid w-full grid-cols-2 rounded-full p-1">
          <TabsTrigger value="for-you" onClick={() => setActiveTab("for-you")} className="rounded-full">
            For You
          </TabsTrigger>
          <TabsTrigger value="following" onClick={() => setActiveTab("following")} className="rounded-full">
            Following
          </TabsTrigger>
        </TabsList>
        <TabsContent value="for-you" className="space-y-4 mt-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              isLiked={likedPosts[post.id] || false}
              likeCount={likeCounts[post.id] || post.likes}
              onLike={() => handleLike(post.id)}
            />
          ))}
        </TabsContent>
        <TabsContent value="following" className="space-y-4 mt-4">
          {posts
            .filter((post) => post.isFollowing)
            .map((post) => (
              <PostCard
                key={post.id}
                post={post}
                isLiked={likedPosts[post.id] || false}
                likeCount={likeCounts[post.id] || post.likes}
                onLike={() => handleLike(post.id)}
              />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PostCard({
  post,
  isLiked,
  likeCount,
  onLike,
}: {
  post: any
  isLiked: boolean
  likeCount: number
  onLike: () => void
}) {
  return (
    <Card className="rounded-2xl border-2 overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="">
        <div className="flex justify-between items-center">
          <Link href={`/profile/${post.user.id}`} className="flex items-center gap-2">
            <Avatar className="border-2 border-primary/20">
              <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
              <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">{post.user.name}</div>
              <div className="text-xs text-muted-foreground">{post.timeAgo}</div>
            </div>
          </Link>
        </div>
        <p className="pt-3">{post.content}</p>
      </CardHeader>
      <CardContent className="pb-3">
        {post.image && (
          <div className="relative rounded-xl overflow-hidden group">
            <Image
              src={post.image || "/placeholder.svg"}
              alt="Post image"
              width={600}
              height={400}
              className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
              style={{ maxHeight: "400px" }}
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-3">
        <div className="flex justify-between w-full">
          <Button
            variant="ghost"
            size="sm"
            className={`gap-1 rounded-full h-9 px-3 transition-colors ${isLiked ? "text-primary" : ""}`}
            onClick={onLike}
          >
            <Paw className={`h-4 w-4 transition-all ${isLiked ? "fill-primary text-primary" : ""}`} />
            <span>{likeCount}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-1 rounded-full h-9 px-3">
            <MessageCircle className="h-4 w-4" />
            <span>{post.comments}</span>
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full h-9 px-3">
            <Share className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

