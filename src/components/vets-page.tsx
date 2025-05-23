/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { CardFooter } from "@/components/ui/card"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Stethoscope, MapPin, Phone, Mail, Clock, Star, Search, Filter, ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"
import { veterinarians } from "@/lib/mock-data"

export function VetsPage() {
  const [activeTab, setActiveTab] = useState("list")
  const [filters, setFilters] = useState({
    specialty: "",
    emergency: false,
    distance: 10,
    search: "",
  })
  const [filteredVets, setFilteredVets] = useState(veterinarians)
  const [isFilterExpanded, setIsFilterExpanded] = useState(false)

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)

    // Apply filters
    let results = veterinarians

    if (newFilters.specialty && newFilters.specialty !== "all") {
      results = results.filter((vet) => vet.specialty.toLowerCase().includes(newFilters.specialty.toLowerCase()))
    }

    if (newFilters.emergency) {
      results = results.filter((vet) => vet.emergency)
    }

    if (newFilters.distance) {
      results = results.filter((vet) => vet.distance <= newFilters.distance)
    }

    if (newFilters.search) {
      const searchLower = newFilters.search.toLowerCase()
      results = results.filter(
        (vet) =>
          vet.name.toLowerCase().includes(searchLower) ||
          vet.clinic.toLowerCase().includes(searchLower) ||
          vet.specialty.toLowerCase().includes(searchLower) ||
          vet.address.toLowerCase().includes(searchLower),
      )
    }

    setFilteredVets(results)
  }

  const resetFilters = () => {
    setFilters({
      specialty: "",
      emergency: false,
      distance: 10,
      search: "",
    })
    setFilteredVets(veterinarians)
  }

  const toggleFilters = () => {
    setIsFilterExpanded(!isFilterExpanded)
  }

  // Count active filters
  const activeFilterCount = Object.values(filters).filter((value) => {
    if (typeof value === "boolean") {
      return value === true
    }
    if (typeof value === "number") {
      return value !== 10
    }
    return value !== "" && value !== "all"
  }).length

  return (
    <div className="bg-paw-pattern">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <Stethoscope className="mr-2 h-7 w-7 text-primary" />
          Find Veterinarians
        </h1>
        <p className="text-muted-foreground mb-4">
          Discover the best veterinarians near you for your pet&apos;s healthcare needs. Filter by specialty, emergency
          services, and more.
        </p>
      </div>

      <Tabs defaultValue="list" className="mb-8">
        <TabsList className="grid w-full grid-cols-2 rounded-full">
          <TabsTrigger value="list" onClick={() => setActiveTab("list")} className="rounded-full">
            List View
          </TabsTrigger>
          <TabsTrigger value="map" onClick={() => setActiveTab("map")} className="rounded-full">
            Map View
          </TabsTrigger>
        </TabsList>

        <div className="mt-4">
          <Card className="mb-4 rounded-2xl border-2 shadow-xs hover:shadow-md transition-shadow duration-300">
            <CardHeader className="">
              <div className="flex justify-between items-center">
                <CardTitle>Find a Vet</CardTitle>
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
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="search">Search</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="search"
                        placeholder="Search by name, clinic, or specialty..."
                        className="pl-10 rounded-full"
                        value={filters.search}
                        onChange={(e) => handleFilterChange("search", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialty">Specialty</Label>
                    <Select value={filters.specialty} onValueChange={(value) => handleFilterChange("specialty", value)}>
                      <SelectTrigger id="specialty" className="rounded-full w-full">
                        <SelectValue placeholder="Any specialty" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="all">Any specialty</SelectItem>
                        <SelectItem value="general">General Practice</SelectItem>
                        <SelectItem value="emergency">Emergency & Critical Care</SelectItem>
                        <SelectItem value="surgery">Surgery</SelectItem>
                        <SelectItem value="exotic">Exotic Animal Medicine</SelectItem>
                        <SelectItem value="holistic">Holistic & Integrative</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end space-x-2">
                    <Button
                      variant={filters.emergency ? "default" : "outline"}
                      className="rounded-full h-10 px-4 flex-1"
                      onClick={() => handleFilterChange("emergency", !filters.emergency)}
                    >
                      Emergency Services
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-full h-10 w-10 flex items-center justify-center"
                      onClick={resetFilters}
                    >
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            )}

            {!isFilterExpanded && activeFilterCount > 0 && (
              <CardFooter className="pt-0 pb-4">
                <div className="flex flex-wrap gap-2">
                  {filters.search && (
                    <Badge
                      variant="outline"
                      className="rounded-full px-3 py-1 bg-background border-primary/20 text-foreground"
                    >
                      Search: {filters.search}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 p-0 text-muted-foreground hover:text-foreground"
                        onClick={() => handleFilterChange("search", "")}
                      >
                        ×
                      </Button>
                    </Badge>
                  )}
                  {filters.specialty && filters.specialty !== "all" && (
                    <Badge
                      variant="outline"
                      className="rounded-full px-3 py-1 bg-background border-primary/20 text-foreground"
                    >
                      Specialty: {filters.specialty}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 p-0 text-muted-foreground hover:text-foreground"
                        onClick={() => handleFilterChange("specialty", "")}
                      >
                        ×
                      </Button>
                    </Badge>
                  )}
                  {filters.emergency && (
                    <Badge
                      variant="outline"
                      className="rounded-full px-3 py-1 bg-background border-primary/20 text-foreground"
                    >
                      Emergency Services
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 p-0 text-muted-foreground hover:text-foreground"
                        onClick={() => handleFilterChange("emergency", false)}
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
                      Distance: {filters.distance} miles
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
          </Card>

          <TabsContent value="list" className="mt-0">
            <div className="space-y-6">
              {filteredVets.length > 0 ? (
                filteredVets.map((vet) => (
                  <Card
                    key={vet.id}
                    className="rounded-2xl border-2 overflow-hidden transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="relative w-full md:w-1/4 h-48 md:h-auto -mt-6 -mb-6">
                        <Image
                          src={vet.image || "/placeholder.svg?height=200&width=200"}
                          alt={vet.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                          <div>
                            <h3 className="text-xl font-bold">{vet.name}</h3>
                            <p className="text-primary font-medium">{vet.clinic}</p>
                            <p className="text-sm text-muted-foreground mt-1">{vet.specialty}</p>
                          </div>
                          <div className="mt-2 md:mt-0 flex items-center">
                            <div className="flex items-center mr-2">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                              <span className="font-bold">{vet.rating}</span>
                              <span className="text-muted-foreground text-sm ml-1">({vet.reviewCount})</span>
                            </div>
                            <Badge variant="outline" className="rounded-full flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {vet.distance} miles
                            </Badge>
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                            <span className="line-clamp-1">{vet.address}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground mr-2" />
                            <span>{vet.phone}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground mr-2" />
                            <span>{vet.email}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                            <span className="line-clamp-1">{vet.hours.split(",")[0]}</span>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-1">
                          {vet.services.slice(0, 4).map((service, index) => (
                            <Badge key={index} variant="outline" className="rounded-full">
                              {service}
                            </Badge>
                          ))}
                          {vet.services.length > 4 && (
                            <Badge variant="outline" className="rounded-full">
                              +{vet.services.length - 4} more
                            </Badge>
                          )}
                        </div>

                        {vet.emergency && (
                          <Badge variant="secondary" className="mt-3 rounded-full">
                            24/7 Emergency Services
                          </Badge>
                        )}

                        <div className="mt-4 flex flex-wrap gap-2">
                          <Button size="sm" className="rounded-full h-9 px-4 shadow-xs hover:shadow-sm">
                            Book Appointment
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-full h-9 px-4 shadow-xs hover:shadow-sm">
                            View Profile
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-full h-9 px-4 shadow-xs hover:shadow-sm">
                            <Phone className="h-4 w-4 mr-2" />
                            Call
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No veterinarians match your filters. Try adjusting your criteria.
                  </p>
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

          <TabsContent value="map" className="mt-0">
            <Card className="rounded-2xl border-2 overflow-hidden">
              <div className="relative h-[500px] bg-muted/30 flex items-center justify-center">
                <div className="text-center">
                  <Stethoscope className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">Map View Coming Soon</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    We&apos;re working on an interactive map to help you find veterinarians near you. In the meantime, please
                    use the list view.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

