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
      <Card className="rounded-2xl border-2">
        <CardHeader className="pb-3">
          <div className="flex items-start gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="flex-1 h-20 rounded-xl" />
          </div>
        </CardHeader>
        <CardFooter className="flex justify-between pt-0 pb-4">
          <div className="flex gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
          <Skeleton className="h-10 w-24 rounded-full" />
        </CardFooter>
      </Card>

      <div className="flex justify-center w-full mb-2">
        <Skeleton className="h-10 w-full max-w-md rounded-full" />
      </div>

      {[1, 2, 3].map((i) => (
        <Card key={i} className="rounded-2xl border-2">
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

export function AdoptionSkeleton() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <Skeleton className="h-10 w-48 mb-2" />
        <Skeleton className="h-5 w-full max-w-2xl" />
      </div>

      <div className="flex justify-center w-full mb-6">
        <Skeleton className="h-10 w-full max-w-md rounded-full" />
      </div>

      <Card className="mb-6 rounded-2xl border-2">
        <CardHeader className="pb-2">
          <div className="flex justify-between">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-8 w-24 rounded-full" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <Skeleton className="h-10 w-full rounded-full" />
            <Skeleton className="h-10 w-full rounded-full" />
            <Skeleton className="h-10 w-full rounded-full" />
            <Skeleton className="h-10 w-full rounded-full" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="rounded-2xl border-2 overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <Skeleton className="h-6 w-24 mb-1" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-16 w-full mb-2" />
              <div className="flex flex-wrap gap-1 mb-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <Skeleton className="h-4 w-32" />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Skeleton className="h-9 w-24 rounded-full" />
              <Skeleton className="h-9 w-24 rounded-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function MarketplaceSkeleton() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <Skeleton className="h-10 w-48 mb-2" />
        <Skeleton className="h-5 w-full max-w-2xl" />
      </div>

      <div className="flex justify-center w-full mb-6">
        <Skeleton className="h-10 w-full max-w-md rounded-full" />
      </div>

      <Card className="mb-6 rounded-2xl border-2">
        <CardHeader className="pb-2">
          <div className="flex justify-between">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-8 w-24 rounded-full" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <Skeleton className="h-10 w-full rounded-full" />
            <Skeleton className="h-10 w-full rounded-full" />
            <Skeleton className="h-10 w-full rounded-full" />
            <Skeleton className="h-10 w-full rounded-full" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="rounded-2xl border-2 overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <Skeleton className="h-6 w-48 mb-1" />
                  <Skeleton className="h-5 w-24 mb-1" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-12 w-full mb-2" />
              <Skeleton className="h-4 w-32" />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Skeleton className="h-9 w-32 rounded-full" />
              <Skeleton className="h-9 w-32 rounded-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function VetsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <Skeleton className="h-10 w-48 mb-2" />
        <Skeleton className="h-5 w-full max-w-2xl" />
      </div>

      <div className="flex justify-center w-full mb-6">
        <Skeleton className="h-10 w-full max-w-md rounded-full" />
      </div>

      <Card className="mb-6 rounded-2xl border-2">
        <CardHeader className="pb-2">
          <div className="flex justify-between">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-8 w-24 rounded-full" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <Skeleton className="h-10 w-full rounded-full" />
            <Skeleton className="h-10 w-full rounded-full" />
            <Skeleton className="h-10 w-full rounded-full" />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="rounded-2xl border-2 overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <Skeleton className="w-full md:w-1/4 h-48 md:h-auto" />
              <div className="flex-1 p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div>
                    <Skeleton className="h-7 w-48 mb-1" />
                    <Skeleton className="h-5 w-64 mb-1" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <div className="mt-2 md:mt-0 flex items-center">
                    <Skeleton className="h-6 w-24 rounded-full mr-2" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                </div>

                <div className="mt-4 flex flex-wrap gap-1">
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Skeleton className="h-9 w-32 rounded-full" />
                  <Skeleton className="h-9 w-32 rounded-full" />
                  <Skeleton className="h-9 w-24 rounded-full" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function WalkBuddySkeleton() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <Skeleton className="h-10 w-48 mb-2" />
        <Skeleton className="h-5 w-full max-w-2xl" />
      </div>

      <div className="flex justify-center w-full mb-6">
        <Skeleton className="h-10 w-full max-w-md rounded-full" />
      </div>

      <Card className="mb-6 rounded-2xl border-2">
        <CardHeader className="pb-2">
          <div className="flex justify-between">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-8 w-24 rounded-full" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <Skeleton className="h-10 w-full rounded-full" />
            <Skeleton className="h-10 w-full rounded-full" />
            <Skeleton className="h-10 w-full rounded-full" />
            <Skeleton className="h-10 w-full rounded-full" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="rounded-2xl border-2">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div>
                    <Skeleton className="h-6 w-32 mb-1" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex gap-3 mb-3">
                <Skeleton className="h-16 w-16 rounded-full" />
                <Skeleton className="h-16 w-16 rounded-full" />
              </div>
              <Skeleton className="h-16 w-full" />
              <div className="mt-3 flex flex-wrap gap-1">
                <Skeleton className="h-5 w-24 rounded-full" />
                <Skeleton className="h-5 w-24 rounded-full" />
                <Skeleton className="h-5 w-24 rounded-full" />
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full rounded-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function MatingPageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <Skeleton className="h-10 w-48 mb-2" />
        <Skeleton className="h-5 w-full max-w-2xl" />
      </div>

      <div className="flex justify-center w-full mb-6">
        <Skeleton className="h-10 w-full max-w-md rounded-full" />
      </div>

      <Card className="mb-6 rounded-2xl border-2">
        <CardHeader className="pb-2">
          <div className="flex justify-between">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-8 w-24 rounded-full" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <Skeleton className="h-10 w-full rounded-full" />
            <Skeleton className="h-10 w-full rounded-full" />
            <Skeleton className="h-10 w-full rounded-full" />
          </div>
          <div className="mt-4 sm:col-span-2">
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="rounded-2xl border-2 overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <Skeleton className="h-6 w-24 mb-1" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-16 w-full mb-2" />
              <div className="flex flex-wrap gap-1">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Skeleton className="h-9 w-24 rounded-full" />
              <Skeleton className="h-9 w-24 rounded-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function LostPetsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <Skeleton className="h-10 w-48 mb-2" />
        <Skeleton className="h-5 w-full max-w-2xl" />
      </div>

      <div className="flex justify-center w-full mb-6">
        <Skeleton className="h-10 w-full max-w-md rounded-full" />
      </div>

      <Card className="mb-6 rounded-2xl border-2">
        <CardHeader className="pb-2">
          <div className="flex justify-between">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-8 w-24 rounded-full" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <Skeleton className="h-10 w-full rounded-full" />
            <Skeleton className="h-10 w-full rounded-full" />
            <Skeleton className="h-10 w-full rounded-full" />
            <Skeleton className="h-10 w-full rounded-full" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="rounded-2xl border-2 overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <Skeleton className="h-6 w-24 mb-1" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-16 w-full mb-2" />
              <div className="flex flex-wrap gap-1 mb-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <Skeleton className="h-4 w-32" />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Skeleton className="h-9 w-24 rounded-full" />
              <Skeleton className="h-9 w-24 rounded-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

