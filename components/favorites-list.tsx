"use client"

import { useLocalStorage } from "@/hooks/use-local-storage"
import type { Recipe } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Clock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function FavoritesList() {
  const [favorites] = useLocalStorage<string[]>("favorites", [])
  const [recipes] = useLocalStorage<Recipe[]>("recipes", [])

  const favoriteRecipes = recipes.filter((recipe) => favorites.includes(recipe.key))

  if (favoriteRecipes.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-4">You haven't added any favorites yet.</p>
          <Link href="/">
            <Button>Browse Recipes</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {favoriteRecipes.map((recipe) => (
        <Link href={`/recipe/${recipe.key}`} key={recipe.key}>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <h3 className="font-medium">{recipe.title}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{recipe.prepTime + recipe.cookTime} min</span>
                </div>
              </div>
              <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

