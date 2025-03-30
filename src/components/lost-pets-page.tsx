/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { AlertTriangle, Search, MapPin, Upload, Calendar, Phone, Mail, Heart, Filter, Clock } from "lucide-react"
import Image from "next/image"
import { lostPets } from "@/lib/mock-data"

export function LostPetsPage() {
  const [activeTab, setActiveTab] = useState("lost")
  const [filters, setFilters] = useState({
    species: "",
    location: "",
    daysLost: "",
  })
  const [filteredPets, setFilteredPets] = useState(
    lostPets.filter((pet) => pet.status === "lost" || pet.status === "found"),
  )
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    applyFilters(newFilters, searchQuery)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    applyFilters(filters, query)
  }

  const applyFilters = (currentFilters: any, query: string) => {
    // Start with only lost and found pets (exclude reunited)
    let results = lostPets.filter((pet) => pet.status === "lost" || pet.status === "found")

    // Apply search query
    if (query) {
      const searchLower = query.toLowerCase()
      results = results.filter(
        (pet) =>
          pet.name.toLowerCase().includes(searchLower) ||
          pet.description.toLowerCase().includes(searchLower) ||
          pet.lastSeenLocation.toLowerCase().includes(searchLower) ||
          pet.breed.toLowerCase().includes(searchLower),
      )
    }

    // Apply species filter
    if (currentFilters.species && currentFilters.species !== "all") {
      results = results.filter((pet) => pet.species.toLowerCase() === currentFilters.species.toLowerCase())
    }

    // Apply location filter
    if (currentFilters.location) {
      results = results.filter((pet) =>
        pet.lastSeenLocation.toLowerCase().includes(currentFilters.location.toLowerCase()),
      )
    }

    // Apply days lost filter
    if (currentFilters.daysLost) {
      const daysAgo = Number.parseInt(currentFilters.daysLost)

      results = results.filter((pet) => {
        // Extract the date from the postedDate string (e.g., "2 days ago", "1 week ago")
        const postedText = pet.postedDate.toLowerCase()
        let daysPosted = 0

        if (postedText.includes("day")) {
          daysPosted = Number.parseInt(postedText.split(" ")[0])
        } else if (postedText.includes("week")) {
          daysPosted = Number.parseInt(postedText.split(" ")[0]) * 7
        } else if (postedText.includes("month")) {
          daysPosted = Number.parseInt(postedText.split(" ")[0]) * 30
        }

        return daysPosted <= daysAgo
      })
    }

    setFilteredPets(results)
  }

  const resetFilters = () => {
    setFilters({
      species: "",
      location: "",
      daysLost: "",
    })
    setSearchQuery("")
    setFilteredPets(lostPets.filter((pet) => pet.status === "lost" || pet.status === "found"))
  }

  // Count active filters
  const activeFilterCount =
    Object.values(filters).filter((value) => value !== "" && value !== "all").length + (searchQuery ? 1 : 0)

  return (
    <div className="bg-paw-pattern">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4 flex items-center">
          <AlertTriangle className="mr-2 h-7 w-7 text-primary" />
          Lost Pets
        </h1>
        <p className="text-muted-foreground mb-4">
          Help reunite lost pets with their owners. Search for missing pets in your area or report a lost pet.
        </p>
      </div>

      <Tabs defaultValue="lost" className="mb-8">
        <TabsList className="grid w-full grid-cols-2 rounded-full">
          <TabsTrigger value="lost" onClick={() => setActiveTab("lost")} className="rounded-full">
            Find Lost Pets
          </TabsTrigger>
          <TabsTrigger value="report" onClick={() => setActiveTab("report")} className="rounded-full">
            Report a Lost Pet
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lost" className="mt-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by pet name, breed, or location..."
                className="pl-10 rounded-full"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <Button
              variant={showFilters ? "default" : "outline"}
              className="rounded-full gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
              {activeFilterCount > 0 && !showFilters && (
                <Badge
                  variant="secondary"
                  className="ml-1 rounded-full h-5 w-5 p-0 flex items-center justify-center text-xs"
                >
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </div>

          {showFilters && (
            <Card className="mb-6 rounded-2xl border-2 shadow-xs">
              <CardContent className="pt-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="species">Pet Type</Label>
                    <Select value={filters.species} onValueChange={(value) => handleFilterChange("species", value)}>
                      <SelectTrigger id="species" className="rounded-full w-full">
                        <SelectValue placeholder="Any pet type" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="all">Any pet type</SelectItem>
                        <SelectItem value="dog">Dog</SelectItem>
                        <SelectItem value="cat">Cat</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Area/Neighborhood</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        placeholder="Enter neighborhood..."
                        className="pl-10 rounded-full"
                        value={filters.location}
                        onChange={(e) => handleFilterChange("location", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="daysLost">Lost Within</Label>
                    <Select value={filters.daysLost} onValueChange={(value) => handleFilterChange("daysLost", value)}>
                      <SelectTrigger id="daysLost" className="rounded-full w-full">
                        <SelectValue placeholder="Any time" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="all">Any time</SelectItem>
                        <SelectItem value="1">Last 24 hours</SelectItem>
                        <SelectItem value="3">Last 3 days</SelectItem>
                        <SelectItem value="7">Last week</SelectItem>
                        <SelectItem value="30">Last month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <Button variant="outline" className="rounded-full mr-2" onClick={resetFilters}>
                    Reset
                  </Button>
                  <Button
                    className="rounded-full"
                    onClick={() => {
                      applyFilters(filters, searchQuery)
                      setShowFilters(false)
                    }}
                  >
                    Apply Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {!showFilters && activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {searchQuery && (
                <Badge
                  variant="outline"
                  className="rounded-full px-3 py-1 bg-background border-primary/20 text-foreground"
                >
                  Search: {searchQuery}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1 p-0 text-muted-foreground hover:text-foreground"
                    onClick={() => handleSearch("")}
                  >
                    ×
                  </Button>
                </Badge>
              )}
              {filters.species && filters.species !== "all" && (
                <Badge
                  variant="outline"
                  className="rounded-full px-3 py-1 bg-background border-primary/20 text-foreground"
                >
                  Pet Type: {filters.species}
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
              {filters.location && (
                <Badge
                  variant="outline"
                  className="rounded-full px-3 py-1 bg-background border-primary/20 text-foreground"
                >
                  Area: {filters.location}
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
              {filters.daysLost && filters.daysLost !== "all" && (
                <Badge
                  variant="outline"
                  className="rounded-full px-3 py-1 bg-background border-primary/20 text-foreground"
                >
                  Lost within:{" "}
                  {filters.daysLost === "1"
                    ? "24 hours"
                    : filters.daysLost === "3"
                      ? "3 days"
                      : filters.daysLost === "7"
                        ? "1 week"
                        : "1 month"}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1 p-0 text-muted-foreground hover:text-foreground"
                    onClick={() => handleFilterChange("daysLost", "")}
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
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPets.length > 0 ? (
              filteredPets.map((pet) => (
                <Card
                  key={pet.id}
                  className={`group overflow-hidden rounded-2xl border-2 transition-all duration-300 hover:shadow-md ${
                    pet.urgent ? "border-destructive/50" : ""
                  }`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={pet.image || "/placeholder.svg?height=200&width=300"}
                      alt={pet.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Badge variant={pet.status === "lost" ? "destructive" : "default"} className="rounded-full px-3">
                        {pet.status === "lost" ? "Lost" : "Found"}
                      </Badge>
                      {pet.urgent && (
                        <Badge variant="destructive" className="rounded-full px-3">
                          Urgent
                        </Badge>
                      )}
                    </div>
                    {/* Add a gradient overlay to improve text readability */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{pet.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {pet.breed} • {pet.species}
                          {pet.age && ` • ${pet.age} ${pet.age === 1 ? "year" : "years"} old`}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center text-sm mb-2">
                      <MapPin className="h-3.5 w-3.5 mr-1 text-primary" />
                      <span className="text-muted-foreground">Last seen: </span>
                      <span className="ml-1 font-medium">{pet.lastSeenLocation}</span>
                    </div>
                    <div className="flex items-center text-sm mb-2">
                      <Calendar className="h-3.5 w-3.5 mr-1 text-primary" />
                      <span className="text-muted-foreground">Date: </span>
                      <span className="ml-1 font-medium">{pet.lastSeenDate}</span>
                    </div>
                    <div className="flex items-center text-sm mb-3">
                      <Clock className="h-3.5 w-3.5 mr-1 text-primary" />
                      <span className="text-muted-foreground">Posted: </span>
                      <span className="ml-1">{pet.postedDate}</span>
                    </div>
                    <p className="line-clamp-2 mb-2 text-sm">{pet.description}</p>
                    <div className="flex flex-wrap gap-1 mb-1">
                      {pet.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="rounded-full text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {pet.tags.length > 3 && (
                        <Badge variant="outline" className="rounded-full text-xs">
                          +{pet.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 flex justify-between">
                    <Button variant="outline" size="sm" className="gap-1 rounded-full h-9 px-3 shadow-xs hover:shadow-sm">
                      <Phone className="h-4 w-4 mr-1" />
                      Call Owner
                    </Button>
                    <Button size="sm" className="gap-1 rounded-full h-9 px-3 shadow-xs hover:shadow-sm">
                      <Heart className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No pets match your search criteria.</p>
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

        <TabsContent value="report" className="mt-6">
          <Card className="rounded-2xl border-2 shadow-xs hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Report a Lost Pet</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="pet-name">Pet Name</Label>
                    <Input id="pet-name" placeholder="Enter pet name" className="rounded-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pet-species">Pet Type</Label>
                    <Select>
                      <SelectTrigger id="pet-species" className="rounded-full w-full">
                        <SelectValue placeholder="Select pet type" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="dog">Dog</SelectItem>
                        <SelectItem value="cat">Cat</SelectItem>
                        <SelectItem value="bird">Bird</SelectItem>
                        <SelectItem value="rabbit">Rabbit</SelectItem>
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
                    <Label htmlFor="pet-gender">Gender</Label>
                    <Select>
                      <SelectTrigger id="pet-gender" className="rounded-full w-full">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pet-age">Age (approximate)</Label>
                    <Input id="pet-age" type="number" min="0" placeholder="Years" className="rounded-full" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="last-seen">Last Seen Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="last-seen"
                      placeholder="Enter specific location or address"
                      className="pl-10 rounded-full"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="last-seen-date">Date Last Seen</Label>
                    <Input id="last-seen-date" type="date" className="rounded-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-seen-time">Time (approximate)</Label>
                    <Input id="last-seen-time" type="time" className="rounded-full" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pet-description">Distinctive Features</Label>
                  <Textarea
                    id="pet-description"
                    placeholder="Describe any distinctive markings, collar color, tags, behavior, etc."
                    className="min-h-[100px] rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="microchipped">Microchipped?</Label>
                  <Select>
                    <SelectTrigger id="microchipped" className="rounded-full w-full">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Upload Photos</Label>
                  <div className="border-2 border-dashed rounded-xl p-6 text-center">
                    <Button variant="outline" className="rounded-full h-10 px-4 gap-2">
                      <Upload className="h-4 w-4" />
                      Choose Files
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Upload clear, recent photos. Max 5MB each. JPG, PNG formats accepted.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Your Name</Label>
                    <Input id="contact-name" placeholder="Enter your name" className="rounded-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Phone Number</Label>
                    <Input id="contact-phone" placeholder="Enter phone number" className="rounded-full" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="contact-email" type="email" placeholder="Enter email" className="pl-10 rounded-full" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reward">Reward (optional)</Label>
                  <Input id="reward" type="number" min="0" placeholder="Enter amount" className="rounded-full" />
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="urgent-case" className="rounded" />
                  <Label htmlFor="urgent-case" className="text-sm font-normal">
                    Mark as urgent (recently lost, medical needs, etc.)
                  </Label>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button className="w-full rounded-full h-10 shadow-xs hover:shadow-sm">Submit Report</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

