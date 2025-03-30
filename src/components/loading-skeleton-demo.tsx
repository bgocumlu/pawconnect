"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  FeedSkeleton,
  ProfileSkeleton,
  AdoptionSkeleton,
  MarketplaceSkeleton,
  VetsSkeleton,
  WalkBuddySkeleton,
  MatingPageSkeleton,
} from "@/components/loading-skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function LoadingSkeletonDemo() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Loading Skeleton Demo</h2>
        <Button onClick={() => setIsLoading(!isLoading)} variant={isLoading ? "default" : "outline"}>
          {isLoading ? "Hide Skeletons" : "Show Skeletons"}
        </Button>
      </div>

      {isLoading && (
        <Tabs defaultValue="feed" className="w-full">
          <TabsList className="grid grid-cols-7 w-full">
            <TabsTrigger value="feed">Feed</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="adoption">Adoption</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="vets">Vets</TabsTrigger>
            <TabsTrigger value="walkbuddy">Walk Buddy</TabsTrigger>
            <TabsTrigger value="mating">Mating</TabsTrigger>
          </TabsList>
          <TabsContent value="feed" className="mt-4">
            <FeedSkeleton />
          </TabsContent>
          <TabsContent value="profile" className="mt-4">
            <ProfileSkeleton />
          </TabsContent>
          <TabsContent value="adoption" className="mt-4">
            <AdoptionSkeleton />
          </TabsContent>
          <TabsContent value="marketplace" className="mt-4">
            <MarketplaceSkeleton />
          </TabsContent>
          <TabsContent value="vets" className="mt-4">
            <VetsSkeleton />
          </TabsContent>
          <TabsContent value="walkbuddy" className="mt-4">
            <WalkBuddySkeleton />
          </TabsContent>
          <TabsContent value="mating" className="mt-4">
            <MatingPageSkeleton />
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

