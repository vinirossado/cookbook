"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Check, ShoppingBag, Printer } from "lucide-react"
import { useMenu } from "@/hooks/use-menu"
import { Checkbox } from "@/components/ui/checkbox"
import type { Ingredient } from "@/lib/types"
import { Separator } from "@/components/ui/separator"

interface AggregatedIngredient extends Ingredient {
  checked: boolean
  recipes: string[]
}

export default function ShoppingListPage() {
  const { menu } = useMenu()
  const [aggregatedIngredients, setAggregatedIngredients] = useState<AggregatedIngredient[]>(() => {
    const ingredientMap = new Map<string, AggregatedIngredient>()

    menu.forEach((item) => {
      const { recipe, count } = item

      recipe.ingredients.forEach((ingredient) => {
        const key = `${ingredient.name.toLowerCase()}-${ingredient.unit.toLowerCase()}`

        if (ingredientMap.has(key)) {
          const existingIngredient = ingredientMap.get(key)!

          // Try to convert quantities to numbers for addition
          const existingQty = Number.parseFloat(existingIngredient.quantity) || 0
          const newQty = (Number.parseFloat(ingredient.quantity) || 0) * count

          if (!isNaN(existingQty) && !isNaN(newQty)) {
            existingIngredient.quantity = (existingQty + newQty).toString()
          } else {
            // If we can't convert to numbers, just append with a plus sign
            existingIngredient.quantity = `${existingIngredient.quantity} + ${ingredient.quantity}`
          }

          // Add recipe to the list if not already included
          if (!existingIngredient.recipes.includes(recipe.title)) {
            existingIngredient.recipes.push(recipe.title)
          }
        } else {
          // Create a new aggregated ingredient
          const newQty = Number.parseFloat(ingredient.quantity)
          const adjustedQty = !isNaN(newQty) ? (newQty * count).toString() : ingredient.quantity

          ingredientMap.set(key, {
            ...ingredient,
            quantity: adjustedQty,
            checked: false,
            recipes: [recipe.title],
          })
        }
      })
    })

    return Array.from(ingredientMap.values())
  })

  const toggleIngredient = (id: string) => {
    setAggregatedIngredients(
      aggregatedIngredients.map((ingredient) =>
        ingredient.key === id ? { ...ingredient, checked: !ingredient.checked } : ingredient,
      ),
    )
  }

  const markAllChecked = () => {
    setAggregatedIngredients(aggregatedIngredients.map((ingredient) => ({ ...ingredient, checked: true })))
  }

  const markAllUnchecked = () => {
    setAggregatedIngredients(aggregatedIngredients.map((ingredient) => ({ ...ingredient, checked: false })))
  }

  const handlePrint = () => {
    window.print()
  }

  // Group ingredients by category (could be enhanced with actual categories)
  const groupedIngredients: Record<string, AggregatedIngredient[]> = {}

  aggregatedIngredients.forEach((ingredient) => {
    // This is a simple grouping - in a real app, you might want to categorize by food type
    const firstLetter = ingredient.name.charAt(0).toUpperCase()
    if (!groupedIngredients[firstLetter]) {
      groupedIngredients[firstLetter] = []
    }
    groupedIngredients[firstLetter].push(ingredient)
  })

  // Sort the groups alphabetically
  const sortedGroups = Object.keys(groupedIngredients).sort()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 print:hidden">
        <Link href="/menu" className="flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to menu
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Shopping List</h1>
          <p className="text-muted-foreground mt-1">Based on your menu plan</p>
        </div>

        <div className="flex gap-2 print:hidden">
          <Button variant="outline" onClick={markAllUnchecked}>
            Uncheck All
          </Button>
          <Button variant="outline" onClick={markAllChecked}>
            <Check className="mr-2 h-4 w-4" />
            Check All
          </Button>
          <Button onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </div>

      {menu.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-4">Your menu is empty. Add recipes to generate a shopping list.</p>
          <Link href="/">
            <Button>Browse Recipes</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Recipes in your menu</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1">
                {menu.map((item) => (
                  <li key={item.recipe.key}>
                    {item.recipe.title} ({item.count} {item.count === 1 ? "serving" : "servings"})
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ingredients to buy</CardTitle>
            </CardHeader>
            <CardContent>
              {sortedGroups.map((group) => (
                <div key={group} className="mb-6">
                  <h3 className="font-semibold mb-2">{group}</h3>
                  <ul className="space-y-2">
                    {groupedIngredients[group].map((ingredient) => (
                      <li key={ingredient.key} className="flex items-start gap-2">
                        <Checkbox
                          id={ingredient.key}
                          checked={ingredient.checked}
                          onCheckedChange={() => toggleIngredient(ingredient.key)}
                          className="mt-1"
                        />
                        <div className={`flex-1 ${ingredient.checked ? "line-through text-muted-foreground" : ""}`}>
                          <label htmlFor={ingredient.key} className="flex flex-col cursor-pointer">
                            <span>
                              <span className="font-medium">
                                {ingredient.quantity} {ingredient.unit}
                              </span>{" "}
                              {ingredient.name}
                            </span>
                            <span className="text-xs text-muted-foreground">For: {ingredient.recipes.join(", ")}</span>
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <Separator className="mt-4" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

