/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, MapPin } from "lucide-react"
import Image from "next/image"

interface PetCardProps {
  pet: any
  actionLabel?: string
  actionIcon?: React.ReactNode
  secondaryActionLabel?: string
  secondaryActionIcon?: React.ReactNode
  onAction?: () => void
  onSecondaryAction?: () => void
  className?: string
}

export function PetCard({
  pet,
  actionLabel = "View Details",
  actionIcon,
  secondaryActionLabel = "Save",
  secondaryActionIcon = <Heart className="h-4 w-4 mr-1" />,
  onAction,
  onSecondaryAction,
  className,
}: PetCardProps) {
  return (
    <Card
      className={`group overflow-hidden rounded-2xl border-2 transition-all duration-300 hover:shadow-md hover:border-primary/30 ${className}`}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={pet.image || "/placeholder.svg?height=200&width=300"}
          alt={pet.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          {pet.gender && (
            <Badge variant={pet.gender === "Male" ? "default" : "secondary"} className="rounded-full px-3">
              {pet.gender}
            </Badge>
          )}
          {pet.urgent && (
            <Badge variant="destructive" className="rounded-full px-3">
              Urgent
            </Badge>
          )}
        </div>
        {/* Add a gradient overlay for better text contrast */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{pet.name}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {pet.breed} • {pet.age} {pet.age === 1 ? "year" : "years"} old
            </p>
          </div>
          {pet.location && (
            <Badge variant="outline" className="rounded-full flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {typeof pet.location === "string" && pet.location.includes(",")
                ? pet.location.split(",")[0]
                : pet.location}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {pet.description && <p className="line-clamp-2 text-sm">{pet.description}</p>}
        {pet.traits && pet.traits.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {pet.traits.slice(0, 3).map((trait: string, index: number) => (
              <Badge key={index} variant="outline" className="rounded-full">
                {trait}
              </Badge>
            ))}
            {pet.traits.length > 3 && (
              <Badge variant="outline" className="rounded-full">
                +{pet.traits.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {secondaryActionLabel && (
          <Button
            variant="outline"
            size="sm"
            className="gap-1 rounded-full h-9 px-3 shadow-xs hover:shadow-sm"
            onClick={onSecondaryAction}
          >
            {secondaryActionIcon}
            {secondaryActionLabel}
          </Button>
        )}
        {actionLabel && (
          <Button size="sm" className="gap-1 rounded-full h-9 px-3 shadow-xs hover:shadow-sm" onClick={onAction}>
            {actionIcon}
            {actionLabel}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

