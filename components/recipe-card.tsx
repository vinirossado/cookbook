import Link from "next/link"
import { Clock, UtensilsCrossed, ChefHat } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Recipe } from "@/lib/types"

interface RecipeCardProps {
  recipe: Recipe
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  // Format the date
  const formattedDate = new Date(recipe.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  // Calculate difficulty based on prep time and ingredients
  const getDifficulty = () => {
    const totalTime = recipe.prepTime + recipe.cookTime
    const ingredientCount = recipe.ingredients.length

    if (totalTime > 60 || ingredientCount > 12) return "Advanced"
    if (totalTime > 30 || ingredientCount > 8) return "Intermediate"
    return "Easy"
  }

  const difficulty = getDifficulty()
  const difficultyColor = {
    Easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    Intermediate: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
    Advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  }[difficulty]

  // Use the actual recipe key and don't generate a new one to ensure consistency
  // This fixes the "Recipe not found" error when navigating
  const recipeKey = recipe.key || createRecipeSlug(recipe.title);
  
  // Função para criar um slug a partir do título da receita caso não exista uma key
  function createRecipeSlug(title: string): string {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }

  // Log the key for debugging
  console.log(`Card for ${recipe.title} using key: ${recipeKey}`);

  return (
    <Link href={`/recipe/${recipeKey}`}>
      <Card className="h-full overflow-hidden hover:shadow-md transition-all duration-300 hover:translate-y-[-4px] border-green-100 dark:border-green-900">
        <CardHeader className="pb-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50">
          <div className="flex justify-between items-start">
            <CardTitle className="line-clamp-2">{recipe.title}</CardTitle>
            <Badge variant="outline" className="capitalize bg-white/80 dark:bg-gray-800/80">
              {recipe.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="py-4">
          <div className="flex gap-2 mb-4 flex-wrap">
            {recipe.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {recipe.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{recipe.tags.length - 3} more
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{recipe.description}</p>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{recipe.prepTime + recipe.cookTime} min</span>
            </div>
            <div className="flex items-center">
              <UtensilsCrossed className="h-4 w-4 mr-1" />
              <span>{recipe.ingredients.length} ingredients</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-0 pb-4 justify-between">
          <Badge className={difficultyColor}>{difficulty}</Badge>
          <div className="text-xs text-muted-foreground">{formattedDate}</div>
        </CardFooter>
      </Card>
    </Link>
  )
}

