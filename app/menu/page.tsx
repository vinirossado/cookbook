"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Trash2, ShoppingBag, Minus, Plus } from "lucide-react"
import { useMenu } from "@/hooks/use-menu"
import { Badge } from "@/components/ui/badge"

export default function MenuPage() {
  const { menu, removeFromMenu, clearMenu, increaseCount, decreaseCount } = useMenu()

  const totalRecipes = menu.length
  const totalServings = menu.reduce((sum, item) => sum + item.recipe.servings * item.count, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to recipes
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Menu Plan</h1>
          <p className="text-muted-foreground mt-1">Plan your meals and generate a shopping list</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={clearMenu} disabled={menu.length === 0}>
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Menu
          </Button>

          <Link href="/shopping-list">
            <Button disabled={menu.length === 0}>
              <ShoppingBag className="mr-2 h-4 w-4" />
              Generate Shopping List
            </Button>
          </Link>
        </div>
      </div>

      {menu.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Your menu is empty. Add recipes to create a meal plan.</p>
          <Link href="/">
            <Button>Browse Recipes</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Menu Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Recipes</p>
                  <p className="text-2xl font-bold">{totalRecipes}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Servings</p>
                  <p className="text-2xl font-bold">{totalServings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {menu.map((item) => (
              <Card key={item.recipe.key}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <Link href={`/recipe/${item.recipe.key}`} className="hover:underline">
                        <h3 className="text-lg font-semibold">{item.recipe.title}</h3>
                      </Link>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge variant="outline" className="capitalize">
                          {item.recipe.category}
                        </Badge>
                        {item.recipe.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        {item.recipe.ingredients.length} ingredients · {item.recipe.prepTime + item.recipe.cookTime} min
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => decreaseCount(item.recipe.key)}
                          disabled={item.count <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.count}</span>
                        <Button variant="outline" size="icon" onClick={() => increaseCount(item.recipe.key)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <Button variant="ghost" size="icon" onClick={() => removeFromMenu(item.recipe.key)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

