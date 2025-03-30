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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, MapPin, MessageCircle, Plus, PawPrintIcon as Paw, ChevronDown, ChevronUp } from "lucide-react"
import { walkBuddies, walkEvents } from "@/lib/mock-data"
import Image from "next/image"
import { Slider } from "@/components/ui/slider"

export function WalkBuddyPage() {
  const [activeTab, setActiveTab] = useState("find")

  return (
    <div className="bg-paw-pattern">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <Paw className="mr-2 h-7 w-7 text-primary" />
          Find a Walk Buddy
        </h1>
        <p className="text-muted-foreground mb-4">
          Connect with other pet owners in your area for walks and playdates.
        </p>
      </div>

      <Tabs defaultValue="find" className="mb-8">
        <TabsList className="grid w-full grid-cols-3 rounded-full">
          <TabsTrigger value="find" onClick={() => setActiveTab("find")} className="rounded-full">
            Find Buddies
          </TabsTrigger>
          <TabsTrigger value="events" onClick={() => setActiveTab("events")} className="rounded-full">
            Walk Events
          </TabsTrigger>
          <TabsTrigger value="create" onClick={() => setActiveTab("create")} className="rounded-full">
            Create Event
          </TabsTrigger>
        </TabsList>

        <TabsContent value="find" className="mt-6">
          <FindBuddies />
        </TabsContent>

        <TabsContent value="events" className="mt-6">
          <WalkEvents />
        </TabsContent>

        <TabsContent value="create" className="mt-6">
          <CreateEvent />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function FindBuddies() {
  const [filters, setFilters] = useState({
    location: "",
    petType: "",
    walkTime: "",
    distance: 10,
  })
  const [filteredBuddies, setFilteredBuddies] = useState(walkBuddies)
  const [isFilterExpanded, setIsFilterExpanded] = useState(false)

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    applyFilters(newFilters)
  }

  const applyFilters = (currentFilters: any) => {
    let results = walkBuddies

    if (currentFilters.location) {
      results = results.filter((buddy) => buddy.location.toLowerCase().includes(currentFilters.location.toLowerCase()))
    }

    if (currentFilters.petType && currentFilters.petType !== "all") {
      results = results.filter((buddy) => buddy.petType.toLowerCase() === currentFilters.petType.toLowerCase())
    }

    if (currentFilters.walkTime && currentFilters.walkTime !== "all") {
      // Filter by walk time preference
      const timePreference = currentFilters.walkTime.toLowerCase()
      results = results.filter((buddy) => buddy.preferences.some((pref) => pref.toLowerCase().includes(timePreference)))
    }

    if (currentFilters.distance) {
      results = results.filter((buddy) => buddy.distance <= currentFilters.distance)
    }

    setFilteredBuddies(results)
  }

  const resetFilters = () => {
    setFilters({
      location: "",
      petType: "",
      walkTime: "",
      distance: 10,
    })
    setFilteredBuddies(walkBuddies)
  }

  const toggleFilters = () => {
    setIsFilterExpanded(!isFilterExpanded)
  }

  // Count active filters
  const activeFilterCount = Object.values(filters).filter((value) => {
    if (typeof value === "number") {
      return value !== 10
    }
    return value !== "" && value !== "all"
  }).length

  return (
    <div>
      <Card className="mb-6 rounded-2xl border-2 shadow-xs hover:shadow-md transition-shadow duration-300">
        <CardHeader className="">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Find Walk Buddies
            </CardTitle>
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
          <CardContent className="pt-0 pb-3">
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
              <div className="space-y-1">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="Enter city or area..."
                    className="pl-10 rounded-full"
                    value={filters.location}
                    onChange={(e) => handleFilterChange("location", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="petType">Pet Type</Label>
                <Select value={filters.petType} onValueChange={(value) => handleFilterChange("petType", value)}>
                  <SelectTrigger id="petType" className="rounded-full w-full">
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

              <div className="space-y-1">
                <Label htmlFor="walkTime">Walk Time</Label>
                <Select value={filters.walkTime} onValueChange={(value) => handleFilterChange("walkTime", value)}>
                  <SelectTrigger id="walkTime" className="rounded-full w-full">
                    <SelectValue placeholder="Any time" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="all">Any time</SelectItem>
                    <SelectItem value="morning">Morning</SelectItem>
                    <SelectItem value="afternoon">Afternoon</SelectItem>
                    <SelectItem value="evening">Evening</SelectItem>
                    <SelectItem value="weekend">Weekends</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <Label htmlFor="distance">Max Distance</Label>
                  <span className="text-sm text-muted-foreground">{filters.distance} km</span>
                </div>
                <Slider
                  id="distance"
                  defaultValue={[10]}
                  max={20}
                  step={1}
                  value={[filters.distance]}
                  onValueChange={(value) => handleFilterChange("distance", value[0])}
                  className="py-3"
                />
              </div>
            </div>
          </CardContent>
        )}

        {!isFilterExpanded && activeFilterCount > 0 && (
          <CardFooter className="pt-0 pb-3">
            <div className="flex flex-wrap gap-2">
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
              {filters.petType && filters.petType !== "all" && (
                <Badge
                  variant="outline"
                  className="rounded-full px-3 py-1 bg-background border-primary/20 text-foreground"
                >
                  Pet Type: {filters.petType}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1 p-0 text-muted-foreground hover:text-foreground"
                    onClick={() => handleFilterChange("petType", "")}
                  >
                    ×
                  </Button>
                </Badge>
              )}
              {filters.walkTime && filters.walkTime !== "all" && (
                <Badge
                  variant="outline"
                  className="rounded-full px-3 py-1 bg-background border-primary/20 text-foreground"
                >
                  Walk Time: {filters.walkTime}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1 p-0 text-muted-foreground hover:text-foreground"
                    onClick={() => handleFilterChange("walkTime", "")}
                  >
                    ×
                  </Button>
                </Badge>
              )}
              {filters.distance !== 10 && (
                <Badge
                  variant="outline"
                  className="rounded-full px-3 py-1 bg-background border-primary/20 text-foreground"
                >
                  Distance: {filters.distance} km
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1 p-0 text-muted-foreground hover:text-foreground"
                    onClick={() => handleFilterChange("distance", 10)}
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
          <CardFooter className="pt-0 pb-3">
            <Button
              variant="default"
              onClick={() => {
                applyFilters(filters)
                setIsFilterExpanded(false)
              }}
              className="rounded-full h-9 px-6 shadow-xs hover:shadow-sm w-full sm:w-auto"
            >
              Apply Filters
            </Button>
          </CardFooter>
        )}
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBuddies.map((buddy) => (
          <Card
            key={buddy.id}
            className="rounded-2xl border-2 overflow-hidden transition-all duration-300 hover:shadow-md group"
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <Avatar className="border-2 border-primary/20">
                    <AvatarImage src={buddy.avatar || "/placeholder.svg"} alt={buddy.name} />
                    <AvatarFallback>{buddy.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{buddy.name}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-1 h-3 w-3" />
                      {buddy.location}
                    </div>
                  </div>
                </div>
                <Badge className="rounded-full">{buddy.distance} km</Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex gap-3 mb-3">
                {buddy.pets.map((pet, index) => (
                  <div
                    key={index}
                    className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-primary/20 pet-avatar"
                  >
                    <Image
                      src={pet.image || "/placeholder.svg?height=100&width=100"}
                      alt={pet.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm">{buddy.bio}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {buddy.preferences.map((pref, index) => (
                  <Badge key={index} variant="outline" className="rounded-full">
                    {pref}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full gap-1 rounded-full h-10 shadow-xs hover:shadow-sm">
                <MessageCircle className="h-4 w-4 mr-1" />
                Connect
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredBuddies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No walk buddies found with these filters.</p>
          <Button variant="outline" className="mt-4 rounded-full shadow-xs hover:shadow-sm" onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  )
}

function WalkEvents() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {walkEvents.map((event) => (
          <Card
            key={event.id}
            className="rounded-2xl border-2 overflow-hidden transition-all duration-300 hover:shadow-md group"
          >
            <div className="relative h-40">
              <Image
                src={event.image || "/placeholder.svg?height=200&width=400"}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-lg font-bold text-white">{event.title}</h3>
                <div className="flex items-center text-white/80 text-sm">
                  <MapPin className="mr-1 h-3 w-3" />
                  {event.location}
                </div>
              </div>
            </div>
            <CardContent className="pt-4">
              <div className="flex justify-between mb-3">
                <div className="flex items-center text-sm">
                  <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span>{event.time}</span>
                </div>
              </div>
              <p className="text-sm">{event.description}</p>
              <div className="mt-3">
                <div className="text-sm text-muted-foreground mb-1">Attendees ({event.attendees.length})</div>
                <div className="flex -space-x-2">
                  {event.attendees.slice(0, 5).map((attendee, index) => (
                    <Avatar key={index} className="border-2 border-background h-8 w-8">
                      <AvatarImage src={attendee.avatar || "/placeholder.svg"} alt={attendee.name} />
                      <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ))}
                  {event.attendees.length > 5 && (
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-xs font-medium">
                      +{event.attendees.length - 5}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full rounded-full h-10 shadow-xs hover:shadow-sm">Join Event</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

function CreateEvent() {
  return (
    <Card className="rounded-2xl border-2 shadow-xs hover:shadow-md transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Create a Walk Event</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input id="title" placeholder="Enter event title..." className="rounded-full" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" className="rounded-full" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input id="time" type="time" className="rounded-full" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input id="location" placeholder="Enter location..." className="pl-10 rounded-full" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" placeholder="Describe your event..." className="rounded-full" />
          </div>

          <div className="space-y-2">
            <Label>Select Pets</Label>
            <div className="flex gap-2">
              <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-primary pet-avatar">
                <Image src="/placeholder.svg?height=100&width=100" alt="Pet" fill className="object-cover" />
              </div>
              <Button
                variant="outline"
                className="h-16 w-16 rounded-full flex items-center justify-center shadow-xs hover:shadow-sm"
              >
                <Plus className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full rounded-full h-10 shadow-xs hover:shadow-sm">Create Event</Button>
      </CardFooter>
    </Card>
  )
}

