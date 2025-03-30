/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Heart,
  Upload,
  Calendar,
  MapPin,
  Mail,
  PawPrintIcon as Paw,
  ChevronDown,
  ChevronUp,
  Filter,
} from "lucide-react"
import Image from "next/image"
import { adoptionPets } from "@/lib/mock-data"

export function AdoptionPage() {
  const [activeTab, setActiveTab] = useState("find")
  const [filters, setFilters] = useState({
    species: "",
    age: "",
    gender: "",
    location: "",
    urgent: false,
  })
  const [filteredPets, setFilteredPets] = useState(adoptionPets)
  const [query, setQuery] = useState("")
  const [isFilterExpanded, setIsFilterExpanded] = useState(false)

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)

    // Apply filters
    let results = adoptionPets

    // Apply search query
    if (query) {
      const searchLower = query.toLowerCase()
      results = results.filter(
        (item) =>
          item.name?.toLowerCase().includes(searchLower) || item.description.toLowerCase().includes(searchLower),
      )
    }

    // Apply species filter
    if (newFilters.species && newFilters.species !== "all") {
      results = results.filter((pet) => pet.species.toLowerCase() === newFilters.species.toLowerCase())
    }

    // Apply age filter
    if (newFilters.age && newFilters.age !== "all") {
      if (newFilters.age === "puppy-kitten") {
        results = results.filter((pet) => pet.age <= 1)
      } else if (newFilters.age === "young") {
        results = results.filter((pet) => pet.age > 1 && pet.age <= 3)
      } else if (newFilters.age === "adult") {
        results = results.filter((pet) => pet.age > 3 && pet.age <= 7)
      } else if (newFilters.age === "senior") {
        results = results.filter((pet) => pet.age > 7)
      }
    }

    // Apply gender filter
    if (newFilters.gender && newFilters.gender !== "all") {
      results = results.filter((pet) => pet.gender === newFilters.gender)
    }

    if (newFilters.location) {
      results = results.filter((pet) => pet.location.toLowerCase().includes(newFilters.location.toLowerCase()))
    }

    if (newFilters.urgent) {
      results = results.filter((pet) => pet.urgent)
    }

    setFilteredPets(results)
  }

  const resetFilters = () => {
    setFilters({
      species: "",
      age: "",
      gender: "",
      location: "",
      urgent: false,
    })
    setFilteredPets(adoptionPets)
  }

  const toggleFilters = () => {
    setIsFilterExpanded(!isFilterExpanded)
  }

  // Count active filters
  const activeFilterCount = Object.values(filters).filter(
    (value) => value !== "" && value !== false && value !== "all",
  ).length

  return (
    <div className="bg-paw-pattern">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <Paw className="mr-2 h-7 w-7 text-primary" />
          Pet Adoption
        </h1>
        <p className="text-muted-foreground mb-4">
          Find your perfect companion or help a pet find their forever home. Browse available pets or list your pet for
          adoption.
        </p>
      </div>

      <Tabs defaultValue="find" className="mb-8">
        <TabsList className="grid w-full grid-cols-2 rounded-full">
          <TabsTrigger value="find" onClick={() => setActiveTab("find")} className="rounded-full">
            Find a Pet
          </TabsTrigger>
          <TabsTrigger value="list" onClick={() => setActiveTab("list")} className="rounded-full">
            List for Adoption
          </TabsTrigger>
        </TabsList>

        <TabsContent value="find" className="mt-4">
          <Card className="mb-4 rounded-2xl border-2 shadow-xs hover:shadow-md transition-shadow duration-300">
            <CardHeader className="">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <Filter className="h-5 w-5 mr-2 text-primary" />
                  Filter Pets
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleFilters}
                  className="flex items-center gap-1 rounded-full h-8 px-3 border-primary/20 hover:bg-primary/10"
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
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  <div className="space-y-2">
                    <Label htmlFor="species" className="flex items-center text-sm font-medium">
                      <Paw className="h-3.5 w-3.5 mr-1.5 text-primary" />
                      Species
                    </Label>
                    <Select value={filters.species} onValueChange={(value) => handleFilterChange("species", value)}>
                      <SelectTrigger id="species" className="rounded-full w-full">
                        <SelectValue placeholder="Any species" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="all">Any species</SelectItem>
                        <SelectItem value="dog">Dog</SelectItem>
                        <SelectItem value="cat">Cat</SelectItem>
                        <SelectItem value="rabbit">Rabbit</SelectItem>
                        <SelectItem value="bird">Bird</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age" className="flex items-center text-sm font-medium">
                      <Calendar className="h-3.5 w-3.5 mr-1.5 text-primary" />
                      Age
                    </Label>
                    <Select value={filters.age} onValueChange={(value) => handleFilterChange("age", value)}>
                      <SelectTrigger id="age" className="rounded-full w-full">
                        <SelectValue placeholder="Any age" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="all">Any age</SelectItem>
                        <SelectItem value="puppy-kitten">Baby (0-1 year)</SelectItem>
                        <SelectItem value="young">Young (1-3 years)</SelectItem>
                        <SelectItem value="adult">Adult (3-7 years)</SelectItem>
                        <SelectItem value="senior">Senior (7+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender" className="flex items-center text-sm font-medium">
                      <Heart className="h-3.5 w-3.5 mr-1.5 text-primary" />
                      Gender
                    </Label>
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

                  <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center text-sm font-medium">
                      <MapPin className="h-3.5 w-3.5 mr-1.5 text-primary" />
                      Location
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        placeholder="City or area..."
                        className="pl-10 rounded-full"
                        value={filters.location}
                        onChange={(e) => handleFilterChange("location", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 flex items-end">
                    <Button
                      variant={filters.urgent ? "default" : "outline"}
                      className="rounded-full h-10 px-4 w-full"
                      onClick={() => handleFilterChange("urgent", !filters.urgent)}
                    >
                      <Heart className={`h-4 w-4 mr-2 ${filters.urgent ? "fill-primary-foreground" : ""}`} />
                      Urgent Cases
                    </Button>
                  </div>

                  <div className="space-y-2 flex items-end">
                    <Button variant="outline" className="rounded-full h-10 px-4 w-full" onClick={resetFilters}>
                      Reset Filters
                    </Button>
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
                  {filters.age && filters.age !== "all" && (
                    <Badge
                      variant="outline"
                      className="rounded-full px-3 py-1 bg-background border-primary/20 text-foreground"
                    >
                      Age:{" "}
                      {filters.age === "puppy-kitten"
                        ? "Baby"
                        : filters.age === "young"
                          ? "Young"
                          : filters.age === "adult"
                            ? "Adult"
                            : "Senior"}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 p-0 text-muted-foreground hover:text-foreground"
                        onClick={() => handleFilterChange("age", "")}
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
                  {filters.location && (
                    <Badge
                      variant="outline"
                      className="rounded-full px-3 py-1 bg-background border-primary/20 text-foreground"
                    >
                      Location: {filters.location}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 p-0 text-muted-foreground hover:text-foreground"
                        onClick={() => handleFilterChange("location", "")}
                      >
                        ×
                      </Button>
                    </Badge>
                  )}
                  {filters.urgent && (
                    <Badge
                      variant="outline"
                      className="rounded-full px-3 py-1 bg-background border-primary/20 text-foreground"
                    >
                      Urgent Only
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 p-0 text-muted-foreground hover:text-foreground"
                        onClick={() => handleFilterChange("urgent", false)}
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
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPets.length > 0 ? (
              filteredPets.map((pet) => (
                <Card key={pet.id} className="pet-card group overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={pet.image || "/placeholder.svg?height=200&width=300"}
                      alt={pet.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Badge variant={pet.gender === "Male" ? "default" : "secondary"} className="rounded-full px-3">
                        {pet.gender}
                      </Badge>
                      {pet.urgent && (
                        <Badge variant="destructive" className="rounded-full px-3">
                          Urgent
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{pet.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {pet.breed} • {pet.age} {pet.age === 1 ? "year" : "years"} old
                        </p>
                      </div>
                      <Badge variant="outline" className="rounded-full flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {pet.location.split(",")[0]}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2">{pet.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {pet.traits.slice(0, 3).map((trait, index) => (
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
                    <div className="mt-3 text-xs text-muted-foreground flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Posted {pet.postedDate}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" className="gap-1 rounded-full h-9 px-3 shadow-xs hover:shadow-sm">
                      <Mail className="h-4 w-4 mr-1" />
                      Contact
                    </Button>
                    <Button size="sm" className="gap-1 rounded-full h-9 px-3 shadow-xs hover:shadow-sm">
                      <Heart className="h-4 w-4 mr-1" />
                      Adopt
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
                  onClick={resetFilters}
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
              <CardTitle>List Your Pet for Adoption</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="pet-name">Pet Name</Label>
                    <Input id="pet-name" placeholder="Enter pet name" className="rounded-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pet-species">Species</Label>
                    <Select>
                      <SelectTrigger id="pet-species" className="rounded-full w-full">
                        <SelectValue placeholder="Select species" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="dog">Dog</SelectItem>
                        <SelectItem value="cat">Cat</SelectItem>
                        <SelectItem value="rabbit">Rabbit</SelectItem>
                        <SelectItem value="bird">Bird</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="pet-breed">Breed</Label>
                    <Input id="pet-breed" placeholder="Enter breed" className="rounded-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pet-age">Age (years)</Label>
                    <Input id="pet-age" type="number" min="0" placeholder="Enter age" className="rounded-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pet-gender">Gender</Label>
                    <Select>
                      <SelectTrigger id="pet-gender" className="rounded-full w-full">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pet-description">Description</Label>
                  <Textarea
                    id="pet-description"
                    placeholder="Describe your pet's personality, habits, and why they need a new home..."
                    className="min-h-[100px] rounded-xl"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="pet-location">Location</Label>
                    <Input id="pet-location" placeholder="City, State" className="rounded-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pet-contact">Contact Phone</Label>
                    <Input id="pet-contact" placeholder="Your phone number" className="rounded-full" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pet-traits">Pet Traits</Label>
                  <Input
                    id="pet-traits"
                    placeholder="e.g., Friendly, Trained, Good with kids (comma separated)"
                    className="rounded-full"
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

                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="urgent-case" className="rounded" />
                  <Label htmlFor="urgent-case" className="text-sm font-normal">
                    This is an urgent adoption case
                  </Label>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button className="w-full rounded-full h-10 shadow-xs hover:shadow-sm">Submit Adoption Listing</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

