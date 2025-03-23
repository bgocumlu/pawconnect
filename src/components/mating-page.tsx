"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Search, PawPrintIcon as Paw } from "lucide-react"
import Image from "next/image"
import { matingPets } from "@/lib/mock-data"

export function MatingPage() {
  const [filters, setFilters] = useState({
    species: "",
    breed: "",
    gender: "",
    ageRange: [0, 15],
    distance: 50,
  })

  const [filteredPets, setFilteredPets] = useState(matingPets)

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)

    // Apply filters
    let results = matingPets

    if (newFilters.species) {
      results = results.filter((pet) => pet.species.toLowerCase() === newFilters.species.toLowerCase())
    }

    if (newFilters.breed) {
      results = results.filter((pet) => pet.breed.toLowerCase().includes(newFilters.breed.toLowerCase()))
    }

    if (newFilters.gender) {
      results = results.filter((pet) => pet.gender === newFilters.gender)
    }

    results = results.filter((pet) => pet.age >= newFilters.ageRange[0] && pet.age <= newFilters.ageRange[1])

    results = results.filter((pet) => pet.distance <= newFilters.distance)

    setFilteredPets(results)
  }

  return (
    <div className="bg-paw-pattern">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <Paw className="mr-2 h-7 w-7 text-primary" />
          Find a Mate for Your Pet
        </h1>
        <p className="text-muted-foreground mb-4">
          Browse potential mates for your pet. Connect with other pet owners and arrange meetings.
        </p>

        <Card className="rounded-2xl border-2 shadow-xs hover:shadow-md transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Filter Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="species">Species</Label>
                <Select value={filters.species} onValueChange={(value) => handleFilterChange("species", value)}>
                  <SelectTrigger id="species" className="rounded-full">
                    <SelectValue placeholder="Any species" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="any">Any species</SelectItem>
                    <SelectItem value="dog">Dog</SelectItem>
                    <SelectItem value="cat">Cat</SelectItem>
                    <SelectItem value="bird">Bird</SelectItem>
                    <SelectItem value="rabbit">Rabbit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="breed">Breed</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="breed"
                    placeholder="Search breeds..."
                    className="pl-10 rounded-full"
                    value={filters.breed}
                    onChange={(e) => handleFilterChange("breed", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={filters.gender} onValueChange={(value) => handleFilterChange("gender", value)}>
                  <SelectTrigger id="gender" className="rounded-full">
                    <SelectValue placeholder="Any gender" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="any">Any gender</SelectItem>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <div className="flex justify-between">
                  <Label>Age Range (years)</Label>
                  <span className="text-sm text-muted-foreground">
                    {filters.ageRange[0]} - {filters.ageRange[1]}
                  </span>
                </div>
                <Slider
                  defaultValue={[0, 15]}
                  max={15}
                  step={1}
                  value={filters.ageRange}
                  onValueChange={(value) => handleFilterChange("ageRange", value)}
                  className="py-4"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="distance">Max Distance</Label>
                  <span className="text-sm text-muted-foreground">{filters.distance} km</span>
                </div>
                <Slider
                  defaultValue={[50]}
                  max={100}
                  step={5}
                  value={[filters.distance]}
                  onValueChange={(value) => handleFilterChange("distance", value[0])}
                  className="py-4"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => setFilteredPets(matingPets)}
              className="rounded-full h-10 px-4 shadow-xs hover:shadow-sm"
            >
              Reset Filters
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPets.length > 0 ? (
          filteredPets.map((pet) => (
            <Card key={pet.id} className="pet-card group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={pet.image || "/placeholder.svg?height=200&width=300"}
                  alt={pet.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant={pet.gender === "Male" ? "default" : "secondary"} className="rounded-full px-3">
                    {pet.gender}
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{pet.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {pet.breed} • {pet.age} years old
                    </p>
                  </div>
                  <Badge variant="outline" className="rounded-full">
                    {pet.distance} km
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-2">{pet.description}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {pet.traits.map((trait, index) => (
                    <Badge key={index} variant="outline" className="rounded-full">
                      {trait}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" className="gap-1 rounded-full h-9 px-3 shadow-xs hover:shadow-sm">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Contact
                </Button>
                <Button size="sm" className="gap-1 rounded-full h-9 px-3 shadow-xs hover:shadow-sm">
                  <Heart className="h-4 w-4 mr-1" />
                  Interested
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No pets match your filters. Try adjusting your criteria.</p>
            <Button
              variant="outline"
              className="mt-4 rounded-full h-10 px-4 shadow-xs hover:shadow-sm"
              onClick={() => setFilteredPets(matingPets)}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

