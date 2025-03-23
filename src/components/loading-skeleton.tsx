import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export function ProfileSkeleton() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative mb-8">
        <Skeleton className="h-48 sm:h-64 w-full rounded-2xl" />
        <div className="absolute -bottom-16 left-4 sm:left-8">
          <Skeleton className="h-32 w-32 rounded-full" />
        </div>
      </div>

      <div className="mt-16 px-4">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-64 mb-3" />
        <Skeleton className="h-4 w-full max-w-md mb-4" />

        <div className="flex gap-2 mb-6">
          <Skeleton className="h-10 w-28 rounded-full" />
          <Skeleton className="h-10 w-24 rounded-full" />
        </div>

        <div className="flex gap-4 mb-8">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-20" />
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-9 w-24 rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-24 mb-1" />
                  <Skeleton className="h-4 w-32" />
                </CardHeader>
                <CardContent className="pb-2">
                  <Skeleton className="h-48 w-full rounded-xl" />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-6 w-32 rounded-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <Skeleton className="h-4 w-full my-8" />

        <div className="mt-8">
          <Skeleton className="h-10 w-full rounded-full mb-4" />
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <Card key={i}>
                <CardHeader className="pb-3">
                  <div className="flex gap-2">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-32 mb-1" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-16 w-full mt-3" />
                </CardHeader>
                <CardContent className="pb-3">
                  <Skeleton className="h-64 w-full rounded-xl" />
                </CardContent>
                <CardFooter className="border-t pt-3">
                  <div className="flex justify-between w-full">
                    <Skeleton className="h-9 w-20 rounded-full" />
                    <Skeleton className="h-9 w-20 rounded-full" />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function FeedSkeleton() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-start gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="flex-1 h-24 rounded-xl" />
          </div>
        </CardHeader>
        <CardFooter className="flex justify-between pt-0">
          <div className="flex gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
          <Skeleton className="h-10 w-20 rounded-full" />
        </CardFooter>
      </Card>

      <Skeleton className="h-10 w-full rounded-full" />

      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div>
                  <Skeleton className="h-5 w-32 mb-1" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
            <Skeleton className="h-16 w-full mt-3" />
          </CardHeader>
          <CardContent className="pb-3">
            <Skeleton className="h-64 w-full rounded-xl" />
          </CardContent>
          <CardFooter className="border-t pt-3">
            <div className="flex justify-between w-full">
              <Skeleton className="h-9 w-20 rounded-full" />
              <Skeleton className="h-9 w-20 rounded-full" />
              <Skeleton className="h-9 w-20 rounded-full" />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

