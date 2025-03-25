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
import { ShoppingBag, Search, Filter, Tag, MapPin, Upload, Heart, ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"
import { marketplaceItems } from "@/lib/mock-data"

export function MarketplacePage() {
  const [activeTab, setActiveTab] = useState("browse")
  const [filters, setFilters] = useState({
    category: "",
    priceRange: "",
    condition: "",
    location: "",
  })
  const [filteredItems, setFilteredItems] = useState(marketplaceItems)
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterExpanded, setIsFilterExpanded] = useState(false)

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
    let results = marketplaceItems

    // Apply search query
    if (query) {
      const searchLower = query.toLowerCase()
      results = results.filter(
        (item) =>
          item.title.toLowerCase().includes(searchLower) || item.description.toLowerCase().includes(searchLower),
      )
    }

    // Apply category filter
    if (currentFilters.category && currentFilters.category !== "all") {
      results = results.filter((item) => item.category === currentFilters.category)
    }

    // Apply price range filter
    if (currentFilters.priceRange && currentFilters.priceRange !== "all") {
      switch (currentFilters.priceRange) {
        case "under25":
          results = results.filter((item) => item.price < 25)
          break
        case "25to50":
          results = results.filter((item) => item.price >= 25 && item.price <= 50)
          break
        case "50to100":
          results = results.filter((item) => item.price > 50 && item.price <= 100)
          break
        case "over100":
          results = results.filter((item) => item.price > 100)
          break
      }
    }

    // Apply condition filter
    if (currentFilters.condition && currentFilters.condition !== "all") {
      results = results.filter((item) => item.condition === currentFilters.condition)
    }

    // Apply location filter
    if (currentFilters.location) {
      results = results.filter((item) => item.location.toLowerCase().includes(currentFilters.location.toLowerCase()))
    }

    setFilteredItems(results)
  }

  const resetFilters = () => {
    setFilters({
      category: "",
      priceRange: "",
      condition: "",
      location: "",
    })
    setSearchQuery("")
    setFilteredItems(marketplaceItems)
  }

  const toggleFilters = () => {
    setIsFilterExpanded(!isFilterExpanded)
  }

  // Count active filters
  const activeFilterCount =
    Object.values(filters).filter((value) => value !== "" && value !== "all").length + (searchQuery ? 1 : 0)

  return (
      <div className="bg-paw-pattern">
          <div className="mb-8">
              <h1 className="text-3xl font-bold mb-6 flex items-center">
                  <ShoppingBag className="mr-2 h-7 w-7 text-primary" />
                  Pet Marketplace
              </h1>
              <p className="text-muted-foreground mb-4">
                  Buy and sell pet supplies, accessories, and more. Connect with
                  other pet owners in your area.
              </p>
          </div>

          <Tabs defaultValue="browse" className="mb-8">
              <TabsList className="grid w-full grid-cols-2 rounded-full p-1">
                  <TabsTrigger
                      value="browse"
                      onClick={() => setActiveTab("browse")}
                      className="rounded-full"
                  >
                      Browse Items
                  </TabsTrigger>
                  <TabsTrigger
                      value="sell"
                      onClick={() => setActiveTab("sell")}
                      className="rounded-full"
                  >
                      Sell Item
                  </TabsTrigger>
              </TabsList>

              <TabsContent value="browse" className="mt-3">
                  <Card className="mb-3 rounded-2xl border-2 shadow-xs hover:shadow-md transition-shadow duration-300">
                      <CardHeader className="">
                          <div className="flex justify-between items-center">
                              <CardTitle>Find Items</CardTitle>
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
                                  <span className="text-sm">
                                      {isFilterExpanded ? "Hide" : "Show"}{" "}
                                      Filters
                                  </span>
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
                              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                                  <div className="space-y-2 sm:col-span-2">
                                      <Label htmlFor="search">Search</Label>
                                      <div className="relative">
                                          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                          <Input
                                              id="search"
                                              placeholder="Search for items..."
                                              className="pl-10 rounded-full"
                                              value={searchQuery}
                                              onChange={(e) =>
                                                  handleSearch(e.target.value)
                                              }
                                          />
                                      </div>
                                  </div>

                                  <div className="space-y-2">
                                      <Label htmlFor="category">Category</Label>
                                      <Select
                                          value={filters.category}
                                          onValueChange={(value) =>
                                              handleFilterChange(
                                                  "category",
                                                  value
                                              )
                                          }
                                      >
                                          <SelectTrigger
                                              id="category"
                                              className="rounded-full w-full"
                                          >
                                              <SelectValue placeholder="All categories" />
                                          </SelectTrigger>
                                          <SelectContent className="rounded-xl">
                                              <SelectItem value="all">
                                                  All categories
                                              </SelectItem>
                                              <SelectItem value="food">
                                                  Food & Treats
                                              </SelectItem>
                                              <SelectItem value="toys">
                                                  Toys
                                              </SelectItem>
                                              <SelectItem value="accessories">
                                                  Accessories
                                              </SelectItem>
                                              <SelectItem value="beds">
                                                  Beds & Furniture
                                              </SelectItem>
                                              <SelectItem value="grooming">
                                                  Grooming Supplies
                                              </SelectItem>
                                              <SelectItem value="health">
                                                  Health & Wellness
                                              </SelectItem>
                                          </SelectContent>
                                      </Select>
                                  </div>

                                  <div className="space-y-2">
                                      <Label htmlFor="price">Price Range</Label>
                                      <Select
                                          value={filters.priceRange}
                                          onValueChange={(value) =>
                                              handleFilterChange(
                                                  "priceRange",
                                                  value
                                              )
                                          }
                                      >
                                          <SelectTrigger
                                              id="price"
                                              className="rounded-full w-full"
                                          >
                                              <SelectValue placeholder="Any price" />
                                          </SelectTrigger>
                                          <SelectContent className="rounded-xl">
                                              <SelectItem value="all">
                                                  Any price
                                              </SelectItem>
                                              <SelectItem value="under25">
                                                  Under $25
                                              </SelectItem>
                                              <SelectItem value="25to50">
                                                  $25 to $50
                                              </SelectItem>
                                              <SelectItem value="50to100">
                                                  $50 to $100
                                              </SelectItem>
                                              <SelectItem value="over100">
                                                  Over $100
                                              </SelectItem>
                                          </SelectContent>
                                      </Select>
                                  </div>

                                  <div className="space-y-2">
                                      <Label htmlFor="condition">
                                          Condition
                                      </Label>
                                      <Select
                                          value={filters.condition}
                                          onValueChange={(value) =>
                                              handleFilterChange(
                                                  "condition",
                                                  value
                                              )
                                          }
                                      >
                                          <SelectTrigger
                                              id="condition"
                                              className="rounded-full w-full"
                                          >
                                              <SelectValue placeholder="Any condition" />
                                          </SelectTrigger>
                                          <SelectContent className="rounded-xl">
                                              <SelectItem value="all">
                                                  Any condition
                                              </SelectItem>
                                              <SelectItem value="new">
                                                  New
                                              </SelectItem>
                                              <SelectItem value="likeNew">
                                                  Like New
                                              </SelectItem>
                                              <SelectItem value="good">
                                                  Good
                                              </SelectItem>
                                              <SelectItem value="fair">
                                                  Fair
                                              </SelectItem>
                                          </SelectContent>
                                      </Select>
                                  </div>

                                  <div className="space-y-2">
                                      <Label htmlFor="location">Location</Label>
                                      <div className="relative">
                                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                          <Input
                                              id="location"
                                              placeholder="City or area..."
                                              className="pl-10 rounded-full"
                                              value={filters.location}
                                              onChange={(e) =>
                                                  handleFilterChange(
                                                      "location",
                                                      e.target.value
                                                  )
                                              }
                                          />
                                      </div>
                                  </div>

                                  <div className="space-y-2 flex items-end">
                                      <Button
                                          variant="outline"
                                          className="rounded-full h-10 px-4 w-full flex items-center gap-2"
                                          onClick={resetFilters}
                                      >
                                          <Filter className="h-4 w-4" />
                                          Reset Filters
                                      </Button>
                                  </div>
                              </div>
                          </CardContent>
                      )}

                      {!isFilterExpanded && activeFilterCount > 0 && (
                          <CardFooter className="pt-0 pb-4">
                              <div className="flex flex-wrap gap-2">
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
                                  {filters.category &&
                                      filters.category !== "all" && (
                                          <Badge
                                              variant="outline"
                                              className="rounded-full px-3 py-1 bg-background border-primary/20 text-foreground"
                                          >
                                              Category: {filters.category}
                                              <Button
                                                  variant="ghost"
                                                  size="icon"
                                                  className="h-4 w-4 ml-1 p-0 text-muted-foreground hover:text-foreground"
                                                  onClick={() =>
                                                      handleFilterChange(
                                                          "category",
                                                          ""
                                                      )
                                                  }
                                              >
                                                  ×
                                              </Button>
                                          </Badge>
                                      )}
                                  {filters.priceRange &&
                                      filters.priceRange !== "all" && (
                                          <Badge
                                              variant="outline"
                                              className="rounded-full px-3 py-1 bg-background border-primary/20 text-foreground"
                                          >
                                              Price:{" "}
                                              {filters.priceRange === "under25"
                                                  ? "Under $25"
                                                  : filters.priceRange ===
                                                    "25to50"
                                                  ? "$25-$50"
                                                  : filters.priceRange ===
                                                    "50to100"
                                                  ? "$50-$100"
                                                  : "Over $100"}
                                              <Button
                                                  variant="ghost"
                                                  size="icon"
                                                  className="h-4 w-4 ml-1 p-0 text-muted-foreground hover:text-foreground"
                                                  onClick={() =>
                                                      handleFilterChange(
                                                          "priceRange",
                                                          ""
                                                      )
                                                  }
                                              >
                                                  ×
                                              </Button>
                                          </Badge>
                                      )}
                                  {filters.condition &&
                                      filters.condition !== "all" && (
                                          <Badge
                                              variant="outline"
                                              className="rounded-full px-3 py-1 bg-background border-primary/20 text-foreground"
                                          >
                                              Condition: {filters.condition}
                                              <Button
                                                  variant="ghost"
                                                  size="icon"
                                                  className="h-4 w-4 ml-1 p-0 text-muted-foreground hover:text-foreground"
                                                  onClick={() =>
                                                      handleFilterChange(
                                                          "condition",
                                                          ""
                                                      )
                                                  }
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
                                              onClick={() =>
                                                  handleFilterChange(
                                                      "location",
                                                      ""
                                                  )
                                              }
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
                      {filteredItems.length > 0 ? (
                          filteredItems.map((item) => (
                              <Card
                                  key={item.id}
                                  className="group overflow-hidden rounded-2xl border-2 transition-all duration-300 hover:shadow-md"
                              >
                                  <div className="relative h-48 overflow-hidden">
                                      <Image
                                          src={
                                              item.image ||
                                              "/placeholder.svg?height=200&width=300"
                                          }
                                          alt={item.title}
                                          fill
                                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                                      />
                                      <div className="absolute top-2 right-2">
                                          <Badge
                                              variant={
                                                  item.condition === "new"
                                                      ? "default"
                                                      : "secondary"
                                              }
                                              className="rounded-full px-3"
                                          >
                                              {item.condition}
                                          </Badge>
                                      </div>
                                      <Button
                                          variant="secondary"
                                          size="icon"
                                          className="absolute top-2 left-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                      >
                                          <Heart className="h-4 w-4" />
                                      </Button>
                                  </div>
                                  <CardHeader>
                                      <div className="flex justify-between items-start">
                                          <div>
                                              <CardTitle className="line-clamp-1">
                                                  {item.title}
                                              </CardTitle>
                                              <p className="text-primary font-bold">
                                                  ${item.price.toFixed(2)}
                                              </p>
                                          </div>
                                          <Badge
                                              variant="outline"
                                              className="rounded-full flex items-center gap-1"
                                          >
                                              <MapPin className="h-3 w-3" />
                                              {item.location.split(",")[0]}
                                          </Badge>
                                      </div>
                                  </CardHeader>
                                  <CardContent>
                                      <p className="line-clamp-2 text-sm text-muted-foreground">
                                          {item.description}
                                      </p>
                                      <div className="mt-2 flex items-center text-xs text-muted-foreground">
                                          <Tag className="h-3 w-3 mr-1" />
                                          {item.category}
                                      </div>
                                  </CardContent>
                                  <CardFooter className="flex justify-between">
                                      <Button
                                          variant="outline"
                                          size="sm"
                                          className="rounded-full h-9 px-3 shadow-xs hover:shadow-sm"
                                      >
                                          Message Seller
                                      </Button>
                                      <Button
                                          size="sm"
                                          className="rounded-full h-9 px-3 shadow-xs hover:shadow-sm"
                                      >
                                          View Details
                                      </Button>
                                  </CardFooter>
                              </Card>
                          ))
                      ) : (
                          <div className="col-span-full text-center py-12">
                              <p className="text-muted-foreground">
                                  No items match your search criteria.
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

              <TabsContent value="sell" className="mt-6">
                  <Card className="rounded-2xl border-2 shadow-xs hover:shadow-md transition-shadow duration-300">
                      <CardHeader>
                          <CardTitle>List an Item for Sale</CardTitle>
                      </CardHeader>
                      <CardContent>
                          <form className="space-y-4">
                              <div className="space-y-2">
                                  <Label htmlFor="item-title">Item Title</Label>
                                  <Input
                                      id="item-title"
                                      placeholder="Enter a descriptive title"
                                      className="rounded-full"
                                  />
                              </div>

                              <div className="grid gap-4 sm:grid-cols-2">
                                  <div className="space-y-2">
                                      <Label htmlFor="item-price">
                                          Price ($)
                                      </Label>
                                      <Input
                                          id="item-price"
                                          type="number"
                                          min="0"
                                          step="0.01"
                                          placeholder="0.00"
                                          className="rounded-full"
                                      />
                                  </div>
                                  <div className="space-y-2">
                                      <Label htmlFor="item-category">
                                          Category
                                      </Label>
                                      <Select>
                                          <SelectTrigger
                                              id="item-category"
                                              className="rounded-full w-full"
                                          >
                                              <SelectValue placeholder="Select category" />
                                          </SelectTrigger>
                                          <SelectContent className="rounded-xl">
                                              <SelectItem value="food">
                                                  Food & Treats
                                              </SelectItem>
                                              <SelectItem value="toys">
                                                  Toys
                                              </SelectItem>
                                              <SelectItem value="accessories">
                                                  Accessories
                                              </SelectItem>
                                              <SelectItem value="beds">
                                                  Beds & Furniture
                                              </SelectItem>
                                              <SelectItem value="grooming">
                                                  Grooming Supplies
                                              </SelectItem>
                                              <SelectItem value="health">
                                                  Health & Wellness
                                              </SelectItem>
                                          </SelectContent>
                                      </Select>
                                  </div>
                              </div>

                              <div className="grid gap-4 sm:grid-cols-2">
                                  <div className="space-y-2">
                                      <Label htmlFor="item-condition">
                                          Condition
                                      </Label>
                                      <Select>
                                          <SelectTrigger
                                              id="item-condition"
                                              className="rounded-full w-full"
                                          >
                                              <SelectValue placeholder="Select condition" />
                                          </SelectTrigger>
                                          <SelectContent className="rounded-xl">
                                              <SelectItem value="new">
                                                  New
                                              </SelectItem>
                                              <SelectItem value="likeNew">
                                                  Like New
                                              </SelectItem>
                                              <SelectItem value="good">
                                                  Good
                                              </SelectItem>
                                              <SelectItem value="fair">
                                                  Fair
                                              </SelectItem>
                                          </SelectContent>
                                      </Select>
                                  </div>
                                  <div className="space-y-2">
                                      <Label htmlFor="item-location">
                                          Location
                                      </Label>
                                      <Input
                                          id="item-location"
                                          placeholder="City, State"
                                          className="rounded-full"
                                      />
                                  </div>
                              </div>

                              <div className="space-y-2">
                                  <Label htmlFor="item-description">
                                      Description
                                  </Label>
                                  <Textarea
                                      id="item-description"
                                      placeholder="Describe your item in detail..."
                                      className="min-h-[100px] rounded-xl"
                                  />
                              </div>

                              <div className="space-y-2">
                                  <Label>Upload Photos</Label>
                                  <div className="border-2 border-dashed rounded-xl p-6 text-center">
                                      <Button
                                          variant="outline"
                                          className="rounded-full h-10 px-4 gap-2"
                                      >
                                          <Upload className="h-4 w-4" />
                                          Choose Files
                                      </Button>
                                      <p className="text-xs text-muted-foreground mt-2">
                                          Upload up to 5 photos. Max 5MB each.
                                          JPG, PNG formats accepted.
                                      </p>
                                  </div>
                              </div>

                              <div className="space-y-2">
                                  <Label htmlFor="item-tags">
                                      Tags (Optional)
                                  </Label>
                                  <Input
                                      id="item-tags"
                                      placeholder="e.g., small dogs, organic, handmade (comma separated)"
                                      className="rounded-full"
                                  />
                              </div>
                          </form>
                      </CardContent>
                      <CardFooter>
                          <Button className="w-full rounded-full h-10 shadow-xs hover:shadow-sm">
                              List Item for Sale
                          </Button>
                      </CardFooter>
                  </Card>
              </TabsContent>
          </Tabs>
      </div>
  );
}

