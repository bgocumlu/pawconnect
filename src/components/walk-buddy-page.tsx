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
import { Calendar, Clock, MapPin, MessageCircle, Plus, PawPrintIcon as Paw } from "lucide-react"
import { walkBuddies, walkEvents } from "@/lib/mock-data"
import Image from "next/image"

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
        <TabsList className="grid w-full grid-cols-3 rounded-full p-1">
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
  const [location, setLocation] = useState("")
  const [petType, setPetType] = useState("")
  const [filteredBuddies, setFilteredBuddies] = useState(walkBuddies)

  const handleFilter = () => {
    let results = walkBuddies

    if (location) {
      results = results.filter((buddy) => buddy.location.toLowerCase().includes(location.toLowerCase()))
    }

    if (petType) {
      results = results.filter((buddy) => buddy.petType.toLowerCase() === petType.toLowerCase())
    }

    setFilteredBuddies(results)
  }

  const resetFilters = () => {
    setLocation("")
    setPetType("")
    setFilteredBuddies(walkBuddies)
  }

  return (
    <div>
      <Card className="mb-8 rounded-2xl border-2 shadow-xs hover:shadow-md transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Filter Walk Buddies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  placeholder="Enter city or area..."
                  className="pl-10 rounded-full"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="petType">Pet Type</Label>
              <Select value={petType} onValueChange={setPetType}>
                <SelectTrigger id="petType" className="rounded-full">
                  <SelectValue placeholder="Any pet type" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="any">Any pet type</SelectItem>
                  <SelectItem value="dog">Dog</SelectItem>
                  <SelectItem value="cat">Cat</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={resetFilters} className="rounded-full h-10 px-4 shadow-xs hover:shadow-sm">
            Reset
          </Button>
          <Button onClick={handleFilter} className="rounded-full h-10 px-4 shadow-xs hover:shadow-sm">
            Find Buddies
          </Button>
        </CardFooter>
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

