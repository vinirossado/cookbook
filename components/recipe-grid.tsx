"use client"

import React, { useState, useEffect, Fragment } from "react"
import type { Recipe } from "@/lib/types"
import { RecipeCard } from "@/components/recipe-card"
import { CategoryFilter } from "@/components/category-filter"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Search, Clock, Filter } from "lucide-react"
import { initializeSampleData } from "@/lib/sample-data"
import { AdBanner } from "@/components/ad-banner"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

export function RecipeGrid() {
  const [recipes, setRecipes] = useLocalStorage<Recipe[]>("recipes", [])
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["All"])
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [maxPrepTime, setMaxPrepTime] = useState<number>(60)
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([])

  // Initialize sample data if no recipes exist - only run once
  useEffect(() => {
    try {
      const dataInitialized = initializeSampleData()
      if (dataInitialized) {
        // If data was initialized, reload it from localStorage
        const loadedRecipes = JSON.parse(localStorage.getItem("recipes") || "[]")
        // Ensure all recipes have a valid key
        const validRecipes = loadedRecipes.map((recipe:any, index:any) => {
          if (!recipe.key) {
            return { ...recipe, key: `recipe-${index}` }
          }
          return recipe
        })
        setRecipes(validRecipes)
      }
    } catch (error) {
      console.error("Error initializing recipe data:", error)
    }
  }, []) // Empty dependency array ensures this only runs once

  // Get unique categories from recipes
  const categories = ["All", ...Array.from(new Set(recipes.map((recipe) => recipe.category)))]

  // Find the maximum prep time across all recipes for the slider
  const highestPrepTime = Math.max(...recipes.map((recipe) => recipe.prepTime + recipe.cookTime), 60)

  // Update filtered recipes when filters or recipes change
  useEffect(() => {
    let filtered = [...recipes]

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(query) ||
          recipe.description.toLowerCase().includes(query) ||
          recipe.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // Filter by selected categories
    if (selectedCategories.length > 0 && !selectedCategories.includes("All")) {
      filtered = filtered.filter((recipe) => selectedCategories.includes(recipe.category))
    }

    // Filter by prep time
    filtered = filtered.filter((recipe) => recipe.prepTime + recipe.cookTime <= maxPrepTime)

    // Sort by newest first
    filtered = filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    setFilteredRecipes(filtered)
  }, [searchQuery, selectedCategories, maxPrepTime, recipes])

  const handleCategoryToggle = (category: string) => {
    if (category === "All") {
      setSelectedCategories(["All"])
      return
    }

    // Remove "All" if it's selected
    let newCategories = selectedCategories.filter((c) => c !== "All")

    // Toggle the selected category
    if (newCategories.includes(category)) {
      newCategories = newCategories.filter((c) => c !== category)
    } else {
      newCategories = [...newCategories, category]
    }

    // If no categories are selected, select "All"
    if (newCategories.length === 0) {
      newCategories = ["All"]
    }

    setSelectedCategories(newCategories)
  }

  // Filter component for mobile
  const MobileFilters = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="md:hidden">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh]">
        <SheetHeader>
          <SheetTitle>Filter Recipes</SheetTitle>
          <SheetDescription>Adjust filters to find the perfect recipe</SheetDescription>
        </SheetHeader>
        <div className="py-6 space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Categories</h3>
            <CategoryFilter
              categories={categories}
              selectedCategories={selectedCategories}
              onToggleCategory={handleCategoryToggle}
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Maximum Preparation Time</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <Label>Max Total Time: {maxPrepTime} min</Label>
              </div>
              <Slider
                value={[maxPrepTime]}
                min={10}
                max={Math.max(highestPrepTime, 60)}
                step={5}
                onValueChange={(value) => setMaxPrepTime(value[0])}
              />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )

  return (
    <div>
      <div className="grid gap-6 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search recipes, ingredients, or tags..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="hidden md:block">
            <CategoryFilter
              categories={categories}
              selectedCategories={selectedCategories}
              onToggleCategory={handleCategoryToggle}
            />
          </div>

          <MobileFilters />

          <div className="hidden md:flex items-center gap-2 w-[250px]">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <Label className="whitespace-nowrap text-sm">Max Time: {maxPrepTime} min</Label>
            <Slider
              value={[maxPrepTime]}
              min={10}
              max={Math.max(highestPrepTime, 60)}
              step={5}
              onValueChange={(value) => setMaxPrepTime(value[0])}
              className="w-24 ml-2"
            />
          </div>
        </div>
      </div>

      {filteredRecipes.length === 0 ? (
        <div className="text-center py-12 bg-muted/20 rounded-lg">
          <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No recipes found. Try adjusting your filters or add a new recipe.</p>
          <Link href="/add-recipe" className="mt-4 inline-block">
            <Button className="mt-4 bg-green-600 hover:bg-green-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Recipe
            </Button>
          </Link>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe, index) => (
              <Fragment key={`recipe-${recipe.key || index}-container`}>
                <RecipeCard key={recipe.key || `recipe-${index}`} recipe={recipe} />

                {/* Insert ad after every 6th recipe */}
                {(index + 1) % 6 === 0 && index !== filteredRecipes.length - 1 && (
                  <div key={`ad-${index}`} className="col-span-full my-4">
                    <AdBanner slot={`inline-ad-${index}`} format="horizontal" className="h-24" />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

