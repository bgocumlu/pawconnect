"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, MessageCircle, Share, Smile, PawPrintIcon as Paw } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { posts } from "@/lib/mock-data"

export function Feed() {
  const [activeTab, setActiveTab] = useState("for-you")
  const [postContent, setPostContent] = useState("")

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="mb-6 rounded-2xl border-2 shadow-xs hover:shadow-md transition-shadow duration-300">
        <CardHeader className="pb-3">
          <div className="flex items-start gap-4">
            <Avatar className="border-2 border-primary/20">
              <AvatarImage src="/placeholder.svg" alt="@user" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <Textarea
              placeholder="Share what your pet is up to..."
              className="flex-1 resize-none rounded-xl"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardFooter className="flex justify-between pt-0">
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="rounded-full h-10 w-10 flex items-center justify-center">
              <Camera className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full h-10 w-10 flex items-center justify-center">
              <Smile className="h-4 w-4" />
            </Button>
          </div>
          <Button className="rounded-full px-4 h-10 shadow-xs hover:shadow-sm">Post</Button>
        </CardFooter>
      </Card>

      <Tabs defaultValue="for-you" className="mb-6">
        <TabsList className="grid w-full grid-cols-2 rounded-full">
          <TabsTrigger value="for-you" onClick={() => setActiveTab("for-you")} className="rounded-full">
            For You
          </TabsTrigger>
          <TabsTrigger value="following" onClick={() => setActiveTab("following")} className="rounded-full">
            Following
          </TabsTrigger>
        </TabsList>
        <TabsContent value="for-you" className="space-y-4 mt-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </TabsContent>
        <TabsContent value="following" className="space-y-4 mt-4">
          {posts
            .filter((post) => post.isFollowing)
            .map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PostCard({ post }: { post: any }) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
  }

  return (
    <Card className="rounded-2xl border-2 overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-3">
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
            className={`gap-1 rounded-full h-9 px-3 transition-colors ${liked ? "text-primary" : ""}`}
            onClick={handleLike}
          >
            <Paw className={`h-4 w-4 transition-all ${liked ? "fill-primary text-primary" : ""}`} />
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

