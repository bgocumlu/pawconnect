/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  MapPin,
  MessageSquare,
  PawPrintIcon as Paw,
  Settings,
  UserIcon,
  MessageCircle,
  Plus,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { posts } from "@/lib/mock-data"

export function UserProfile({ user }: { user: any }) {
  const userPosts = posts.filter((post) => post.user.id === user.id)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative mb-8">
        <div className="relative h-48 sm:h-64 w-full overflow-hidden rounded-2xl">
          <Image
            src={user.coverImage || "/placeholder.svg?height=300&width=800"}
            alt="Cover"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>
        </div>
        <div className="absolute -bottom-16 left-4 sm:left-8">
          <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="absolute bottom-4 right-4">
          <Button variant="outline" className="bg-background/80 backdrop-blur-xs rounded-full shadow-xs">
            <Settings className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="mt-16 px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <div className="flex items-center text-muted-foreground mt-1">
            <UserIcon className="mr-1 h-4 w-4" />
            <span className="mr-3">@{user.username}</span>
            {user.location && (
              <>
                <MapPin className="mr-1 h-4 w-4" />
                <span>{user.location}</span>
              </>
            )}
          </div>
          <p className="mt-3">{user.bio}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            <Button variant="outline" className="gap-1 rounded-full h-10 px-4 shadow-xs hover:shadow-sm">
              <MessageSquare className="h-4 w-4 mr-1" />
              Message
            </Button>
            <Button className="rounded-full h-10 px-4 shadow-xs hover:shadow-sm">Follow</Button>
          </div>

          <div className="flex gap-4 mt-6">
            <div>
              <span className="font-bold">{user.posts}</span> <span className="text-muted-foreground">Posts</span>
            </div>
            <div>
              <span className="font-bold">{user.followers}</span>{" "}
              <span className="text-muted-foreground">Followers</span>
            </div>
            <div>
              <span className="font-bold">{user.following}</span>{" "}
              <span className="text-muted-foreground">Following</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center">
              <Paw className="mr-2 h-5 w-5 text-primary" />
              My Pets
            </h2>
            <Button variant="outline" size="sm" className="rounded-full h-9 px-4 gap-1 shadow-xs hover:shadow-sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Pet
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {user.pets.map((pet: any) => (
              <Card key={pet.id} className="pet-card group overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle>{pet.name}</CardTitle>
                    <Badge variant={pet.gender === "Male" ? "default" : "secondary"} className="rounded-full px-3">
                      {pet.gender}
                    </Badge>
                  </div>
                  <CardDescription>{pet.breed}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="relative h-48 w-full overflow-hidden rounded-xl">
                    <Image
                      src={pet.image || "/placeholder.svg?height=200&width=300"}
                      alt={pet.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" />
                    {pet.age} years
                  </div>
                  {pet.available && (
                    <Link href="/mating">
                      <Badge variant="outline" className="gap-1 rounded-full">
                        <Paw className="h-3 w-3" />
                        Available for mating
                      </Badge>
                    </Link>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div className="paw-print-divider my-8"></div>

        <Tabs defaultValue="posts" className="mt-8">
          <TabsList className="grid w-full grid-cols-3 rounded-full p-1">
            <TabsTrigger value="posts" className="rounded-full">
              Posts
            </TabsTrigger>
            <TabsTrigger value="photos" className="rounded-full">
              Photos
            </TabsTrigger>
            <TabsTrigger value="liked" className="rounded-full">
              Liked
            </TabsTrigger>
          </TabsList>
          <TabsContent value="posts" className="mt-4 space-y-4">
            {userPosts.map((post) => (
              <Card
                key={post.id}
                className="rounded-2xl border-2 overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Avatar className="border-2 border-primary/20">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{post.timeAgo}</div>
                      </div>
                    </div>
                  </div>
                  <p className="pt-3">{post.content}</p>
                </CardHeader>
                {post.image && (
                  <CardContent className="pb-3">
                    <div className="relative rounded-xl overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt="Post image"
                        width={600}
                        height={400}
                        className="w-full object-cover"
                        style={{ maxHeight: "400px" }}
                      />
                    </div>
                  </CardContent>
                )}
                <CardFooter className="border-t pt-3">
                  <div className="flex justify-between w-full">
                    <Button variant="ghost" size="sm" className="gap-1 rounded-full h-9 px-3">
                      <Paw className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1 rounded-full h-9 px-3">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="photos" className="mt-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {userPosts
                .filter((post) => post.image)
                .map((post) => (
                  <div key={post.id} className="relative aspect-square overflow-hidden rounded-xl group">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt="Post image"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="liked" className="mt-4">
            <div className="text-center py-8 text-muted-foreground">No liked posts yet</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

