/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, Search, Upload, MapPin, ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"
import { matingPets } from "@/lib/mock-data"

export function MatingPage() {
  const [activeTab, setActiveTab] = useState("find")
  const [filters, setFilters] = useState({
    species: "",
    breed: "",
    gender: "",
    ageRange: [0, 15],
    distance: 50,
  })
  const [isFilterExpanded, setIsFilterExpanded] = useState(false)
  const [filteredPets, setFilteredPets] = useState(matingPets)

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)

    // Apply filters
    let results = matingPets

    if (newFilters.species && newFilters.species !== "all") {
      results = results.filter((pet) => pet.species.toLowerCase() === newFilters.species.toLowerCase())
    }

    if (newFilters.breed) {
      results = results.filter((pet) => pet.breed.toLowerCase().includes(newFilters.breed.toLowerCase()))
    }

    if (newFilters.gender && newFilters.gender !== "all") {
      results = results.filter((pet) => pet.gender === newFilters.gender)
    }

    results = results.filter((pet) => pet.age >= newFilters.ageRange[0] && pet.age <= newFilters.ageRange[1])

    results = results.filter((pet) => pet.distance <= newFilters.distance)

    setFilteredPets(results)
  }

  const resetFilters = () => {
    setFilters({
      species: "",
      breed: "",
      gender: "",
      ageRange: [0, 15],
      distance: 50,
    })
    setFilteredPets(matingPets)
  }

  const toggleFilters = () => {
    setIsFilterExpanded(!isFilterExpanded)
  }

  // Count active filters
  const activeFilterCount = Object.values(filters).filter((value) => {
    if (Array.isArray(value) && value.length === 2) {
      return value[0] !== 0 || value[1] !== 15
    }
    if (typeof value === "number") {
      return value !== 50
    }
    return value !== "" && value !== "all"
  }).length

  return (
    <div className="bg-paw-pattern">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <Heart className="mr-2 h-7 w-7 text-primary" />
          Find a Mate for Your Pet
        </h1>
        <p className="text-muted-foreground mb-4">
          Browse potential mates for your pet. Connect with other pet owners and arrange meetings.
        </p>
      </div>

      <Tabs defaultValue="find" className="mb-8">
        <TabsList className="grid w-full grid-cols-3 rounded-full">
          <TabsTrigger value="find" onClick={() => setActiveTab("find")} className="rounded-full">
            Find a Mate
          </TabsTrigger>
          <TabsTrigger value="list" onClick={() => setActiveTab("list")} className="rounded-full">
            List Your Pet
          </TabsTrigger>
          <TabsTrigger value="requests" onClick={() => setActiveTab("requests")} className="rounded-full">
            Requests
          </TabsTrigger>
        </TabsList>

        <TabsContent value="find" className="mt-4">
          <Card className="rounded-2xl border-2 shadow-xs hover:shadow-md transition-shadow duration-300 mb-4">
            <CardHeader className="">
              <div className="flex justify-between items-center">
                <CardTitle>Filter Options</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleFilters}
                  className="flex items-center gap-1 rounded-full h-8 px-3"
                >
                  {activeFilterCount > 0 && (
                    <Badge
                      variant="default"
                      className="mr-1 rounded-full h-5 w-5 p-0 flex items-center justify-center text-xs"
                    >
                      {activeFilterCount}
                    </Badge>
                  )}
                  <span className="text-sm">{isFilterExpanded ? "Hide" : "Show"} Filters</span>
                  {isFilterExpanded ? (
                    <ChevronUp className="h-3.5 w-3.5 ml-1 opacity-70" />
                  ) : (
                    <ChevronDown className="h-3.5 w-3.5 ml-1 opacity-70" />
                  )}
                </Button>
              </div>
            </CardHeader>

            {isFilterExpanded && (
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="species">Species</Label>
                    <Select value={filters.species} onValueChange={(value) => handleFilterChange("species", value)}>
                      <SelectTrigger id="species" className="rounded-full w-full">
                        <SelectValue placeholder="Any species" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="all">Any species</SelectItem>
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
                      <SelectTrigger id="gender" className="rounded-full w-full">
                        <SelectValue placeholder="Any gender" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="all">Any gender</SelectItem>
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
            )}

            {!isFilterExpanded && activeFilterCount > 0 && (
              <CardFooter className="pt-0 pb-4">
                <div className="flex flex-wrap gap-2">
                  {filters.species && filters.species !== "all" && (
                    <Badge
                      variant="outline"
                      className="rounded-full px-3 py-1 bg-background border-primary/20 text-foreground"
                    >
                      Species: {filters.species}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 p-0 text-muted-foreground hover:text-foreground"
                        onClick={() => handleFilterChange("species", "")}
                      >
                        ×
                      </Button>
                    </Badge>
                  )}
                  {filters.breed && (
                    <Badge
                      variant="outline"
                      className="rounded-full px-3 py-1 bg-background border-primary/20 text-foreground"
                    >
                      Breed: {filters.breed}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 p-0 text-muted-foreground hover:text-foreground"
                        onClick={() => handleFilterChange("breed", "")}
                      >
                        ×
                      </Button>
                    </Badge>
                  )}
                  {filters.gender && filters.gender !== "all" && (
                    <Badge
                      variant="outline"
                      className="rounded-full px-3 py-1 bg-background border-primary/20 text-foreground"
                    >
                      Gender: {filters.gender}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 p-0 text-muted-foreground hover:text-foreground"
                        onClick={() => handleFilterChange("gender", "")}
                      >
                        ×
                      </Button>
                    </Badge>
                  )}
                  {(filters.ageRange[0] !== 0 || filters.ageRange[1] !== 15) && (
                    <Badge
                      variant="outline"
                      className="rounded-full px-3 py-1 bg-background border-primary/20 text-foreground"
                    >
                      Age: {filters.ageRange[0]}-{filters.ageRange[1]} years
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 p-0 text-muted-foreground hover:text-foreground"
                        onClick={() => handleFilterChange("ageRange", [0, 15])}
                      >
                        ×
                      </Button>
                    </Badge>
                  )}
                  {filters.distance !== 50 && (
                    <Badge
                      variant="outline"
                      className="rounded-full px-3 py-1 bg-background border-primary/20 text-foreground"
                    >
                      Distance: {filters.distance} km
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 p-0 text-muted-foreground hover:text-foreground"
                        onClick={() => handleFilterChange("distance", 50)}
                      >
                        ×
                      </Button>
                    </Badge>
                  )}
                  {activeFilterCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetFilters}
                      className="text-xs h-7 rounded-full text-muted-foreground hover:text-foreground"
                    >
                      Clear all
                    </Button>
                  )}
                </div>
              </CardFooter>
            )}

            {isFilterExpanded && (
              <CardFooter>
                <Button onClick={resetFilters} className="rounded-full h-10 px-4 shadow-xs hover:shadow-sm">
                  Reset Filters
                </Button>
              </CardFooter>
            )}
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPets.length > 0 ? (
              filteredPets.map((pet) => (
                <Card key={pet.id} className="pet-card group">
                  <div className="relative h-54 overflow-hidden -mt-6">
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
        </TabsContent>

        <TabsContent value="list" className="mt-6">
          <Card className="rounded-2xl border-2 shadow-xs hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <CardTitle>List Your Pet for Mating</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Pet</Label>
                  <Select>
                    <SelectTrigger className="rounded-full w-full">
                      <SelectValue placeholder="Choose one of your pets" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="pet1">Max (Golden Retriever)</SelectItem>
                      <SelectItem value="pet2">Luna (Siamese Cat)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="availability">Availability</Label>
                    <Select>
                      <SelectTrigger id="availability" className="rounded-full w-full">
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="available">Available Now</SelectItem>
                        <SelectItem value="scheduled">Scheduled Dates</SelectItem>
                        <SelectItem value="limited">Limited Availability</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="location" placeholder="City, State" className="pl-10 rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your pet and your preferences for a mate..."
                    className="min-h-[100px] rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Upload Photos</Label>
                  <div className="border-2 border-dashed rounded-xl p-6 text-center">
                    <Button variant="outline" className="rounded-full h-10 px-4 gap-2">
                      <Upload className="h-4 w-4" />
                      Choose Files
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Upload up to 5 photos. Max 5MB each. JPG, PNG formats accepted.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="health-records">Health Records</Label>
                  <div className="border-2 border-dashed rounded-xl p-6 text-center">
                    <Button variant="outline" className="rounded-full h-10 px-4 gap-2">
                      <Upload className="h-4 w-4" />
                      Upload Documents
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Upload vaccination records, health certificates, and pedigree documents.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferences">Mate Preferences</Label>
                  <Input
                    id="preferences"
                    placeholder="e.g., breed, age, temperament (comma separated)"
                    className="rounded-full"
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button className="w-full rounded-full h-10 shadow-xs hover:shadow-sm">List for Mating</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="mt-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">You have no mating requests at this time.</p>
            <p className="text-sm text-muted-foreground mt-2">
              When someone is interested in your pet, their request will appear here.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

