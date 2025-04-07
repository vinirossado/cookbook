"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import type { Recipe } from "@/lib/types"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowLeft,
  Clock,
  Users,
  Plus,
  Minus,
  Trash2,
  Edit,
  ChefHat,
  UtensilsCrossed,
  Printer,
  Share2,
  Star,
  Heart,
  Timer,
  Bookmark,
} from "lucide-react"
import { useMenu } from "@/hooks/use-menu"
import { AdBanner } from "@/components/ad-banner"
import { Progress } from "@/components/ui/progress"

export default function RecipeDetail() {
  const params = useParams()
  const router = useRouter()
  const { id } = params

  const [recipes, setRecipes] = useLocalStorage<Recipe[]>("recipes", [])
  const [isLoading, setIsLoading] = useState(true)
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const { addToMenu, removeFromMenu, isInMenu, getMenuItemCount } = useMenu()
  const [activeStep, setActiveStep] = useState(0)
  const [isCookingMode, setIsCookingMode] = useState(false)
  const [favorites, setFavorites] = useLocalStorage<string[]>("favorites", [])
  const [ratings, setRatings] = useLocalStorage<Record<string, number>>("ratings", {})
  const [timerActive, setTimerActive] = useState(false)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [timerDuration, setTimerDuration] = useState(0)

  const isFavorite = recipe ? favorites.includes(recipe.key) : false
  const currentRating = recipe ? ratings[recipe.key] || 0 : 0

  // Garantir que as receitas sejam carregadas do localStorage antes de tentar encontrar a receita
  useEffect(() => {
    // Se as receitas ainda não foram carregadas ou estão vazias, tente inicializar os dados
    if (recipes.length === 0) {
      try {
        // Verificar se existem receitas no localStorage
        const savedRecipes = localStorage.getItem("recipes")
        if (savedRecipes) {
          const parsedRecipes = JSON.parse(savedRecipes)
          if (parsedRecipes.length > 0) {
            setRecipes(parsedRecipes)
          }
        } else {
          // Se não há receitas, inicialize com dados de amostra
          const { initializeSampleData } = require("@/lib/sample-data")
          initializeSampleData()
          // Recarregar após inicialização
          const freshRecipes = JSON.parse(localStorage.getItem("recipes") || "[]")
          setRecipes(freshRecipes)
        }
      } catch (error) {
        console.error("Error loading recipes:", error)
      }
    }
    
    setIsLoading(false)
  }, [recipes, setRecipes])

  // Separar o efeito de busca da receita para garantir que receitas esteja carregado
  useEffect(() => {
    // Não tente encontrar a receita se ainda estiver carregando ou se não houver receitas
    if (isLoading || recipes.length === 0) {
      return
    }
    
    try {
      if (!id || typeof id !== "string") {
        console.error("Recipe ID is invalid or undefined:", id);
        setTimeout(() => router.push("/"), 100);
        return;
      }

      console.log("Looking for recipe with ID:", id);
      
      // Se ID é "undefined" como string, não uma variável undefined
      if (id === "undefined") {
        console.error("Recipe ID is the string 'undefined'");
        setTimeout(() => router.push("/"), 100);
        return;
      }
      
      // Busca direta pelo id/key da receita
      let foundRecipe = recipes.find(recipe => recipe.key === id);
      
      if (foundRecipe) {
        console.log("Recipe found by key:", foundRecipe.title);
        setRecipe(foundRecipe);
        return;
      }
      
      // Se ainda não encontrou, tenta remover o prefixo "recipe-" se existir
      if (id.startsWith('recipe-')) {
        const slugPart = id.substring(7); // Remove 'recipe-' prefix
        foundRecipe = recipes.find(recipe => recipe.key === slugPart);
        
        if (foundRecipe) {
          console.log("Recipe found after removing prefix:", foundRecipe.title);
          setRecipe(foundRecipe);
          return;
        }
      }

      debugger;

      console.dir(recipes, { depth: null });
      
      // Procura por correspondência pelo título convertido em slug
      foundRecipe = recipes.find(recipe => 
        createRecipeSlug(recipe.title) === id || 
        createRecipeSlug(recipe.title) === id.replace(/^recipe-/, '')
      );
      
      if (foundRecipe) {
        console.log("Recipe found by slug match:", foundRecipe.title);
        setRecipe(foundRecipe);
        return;
      }
      
      // Se não encontrou, procura por correspondência parcial no título
      foundRecipe = recipes.find(recipe => 
        recipe.title.toLowerCase().includes(id.toLowerCase().replace(/-/g, ' '))
      );
      
      if (foundRecipe) {
        console.log("Recipe found by title match:", foundRecipe.title);
        setRecipe(foundRecipe);
        return;
      }
      
      // Se ainda não encontrou, log de erro e redirecionamento
      console.error("Recipe not found for id:", id);
      console.log("Available recipe keys:", recipes.map(r => r.key));
      
      setTimeout(() => router.push("/"), 100);
    } catch (error) {
      console.error("Error loading recipe:", error);
      router.push("/");
    }
  }, [id, recipes, router, isLoading])
  
  // Função para criar slug consistente
  function createRecipeSlug(title: string): string {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1)
      }, 1000)
    } else if (timerSeconds === 0 && timerActive) {
      setTimerActive(false)
      // Play sound or show notification
      if (typeof window !== "undefined") {
        alert("Timer finished!")
      }
    }

    return () => clearInterval(interval)
  }, [timerActive, timerSeconds])

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this recipe?")) {
      const updatedRecipes = recipes.filter((r) => r.key !== id)
      localStorage.setItem("recipes", JSON.stringify(updatedRecipes))
      router.push("/")
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const toggleFavorite = () => {
    if (!recipe) return

    if (isFavorite) {
      setFavorites(favorites.filter((id) => id !== recipe.key))
    } else {
      setFavorites([...favorites, recipe.key])
    }
  }

  const setRating = (rating: number) => {
    if (!recipe) return

    setRatings({
      ...ratings,
      [recipe.key]: rating,
    })
  }

  const startTimer = (minutes: number) => {
    const seconds = minutes * 60
    setTimerDuration(seconds)
    setTimerSeconds(seconds)
    setTimerActive(true)
  }

  const stopTimer = () => {
    setTimerActive(false)
  }

  const resetTimer = () => {
    setTimerSeconds(timerDuration)
    setTimerActive(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-48 bg-muted rounded mb-4"></div>
            <div className="h-4 w-32 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  const menuCount = getMenuItemCount(recipe.key)

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
    Easy: "text-green-600 dark:text-green-400",
    Intermediate: "text-amber-600 dark:text-amber-400",
    Advanced: "text-red-600 dark:text-red-400",
  }[difficulty]

  // Estimate calories (very rough calculation)
  const estimateCalories = () => {
    // This is just a placeholder calculation
    const baseCalories = recipe.servings * 250
    const ingredientFactor = recipe.ingredients.length * 20
    return Math.round(baseCalories + ingredientFactor)
  }

  // Cooking mode view
  if (isCookingMode) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">{recipe.title}</h1>
          <Button variant="outline" onClick={() => setIsCookingMode(false)}>
            Exit Cooking Mode
          </Button>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">
              Step {activeStep + 1} of {recipe.instructions.length}
            </h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveStep(Math.min(recipe.instructions.length - 1, activeStep + 1))}
                disabled={activeStep === recipe.instructions.length - 1}
              >
                Next
              </Button>
            </div>
          </div>
          <Progress value={((activeStep + 1) / recipe.instructions.length) * 100} className="h-2" />
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <p className="text-xl">{recipe.instructions[activeStep]}</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ingredients</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient) => (
                  <li key={ingredient.key} className="flex gap-2">
                    <span className="font-medium">
                      {ingredient.quantity} {ingredient.unit}
                    </span>
                    <span>{ingredient.name}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Timer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold mb-4">{formatTime(timerSeconds)}</div>
                <div className="flex gap-2 justify-center mb-4">
                  {!timerActive ? (
                    <Button key="timer-5" onClick={() => startTimer(5)} variant="outline">
                      5 min
                    </Button>
                  ) : null}
                  {!timerActive ? (
                    <Button key="timer-10" onClick={() => startTimer(10)} variant="outline">
                      10 min
                    </Button>
                  ) : null}
                  {!timerActive ? (
                    <Button key="timer-15" onClick={() => startTimer(15)} variant="outline">
                      15 min
                    </Button>
                  ) : null}
                </div>
                <div className="flex gap-2 justify-center">
                  {timerActive ? (
                    <Button key="timer-pause" onClick={stopTimer} variant="outline">
                      Pause
                    </Button>
                  ) : timerSeconds > 0 ? (
                    <Button key="timer-resume" onClick={() => setTimerActive(true)} variant="outline">
                      Resume
                    </Button>
                  ) : null}
                  {timerSeconds > 0 ? (
                    <Button key="timer-reset" onClick={resetTimer} variant="outline">
                      Reset
                    </Button>
                  ) : null}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 print:hidden">
        <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to recipes
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 print:mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-green-800 dark:text-green-300">{recipe.title}</h1>
            {isFavorite && <Heart className="h-5 w-5 fill-red-500 text-red-500" />}
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline" className="capitalize bg-white dark:bg-gray-800">
              {recipe.category}
            </Badge>
            {recipe.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={`rating-star-${star}`}
                className={`h-4 w-4 cursor-pointer ${
                  star <= currentRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-2">
              {currentRating > 0 ? `Your rating: ${currentRating}/5` : "Rate this recipe"}
            </span>
          </div>
        </div>

        <div className="flex gap-2 print:hidden">
          <Button
            key="btn-favorite"
            variant="outline"
            size="sm"
            onClick={toggleFavorite}
            className={isFavorite ? "bg-red-50 text-red-600 border-red-200" : ""}
          >
            <Heart className={`mr-2 h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            {isFavorite ? "Favorited" : "Favorite"}
          </Button>
          <Button key="btn-print" variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button key="btn-share" variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Link href={`/recipe/${recipe.key}/edit`} key="link-edit">
            <Button variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
          <Button key="btn-delete" variant="destructive" size="sm" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recipe Tools</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button key="tool-cooking" variant="outline" className="w-full justify-start" onClick={() => setIsCookingMode(true)}>
              <ChefHat className="mr-2 h-4 w-4" />
              Cooking Mode
            </Button>
            <Button key="tool-print" variant="outline" className="w-full justify-start" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Print Recipe
            </Button>
            <Button key="tool-favorite" variant="outline" className="w-full justify-start" onClick={toggleFavorite}>
              <Bookmark className="mr-2 h-4 w-4" />
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
            <Button key="tool-timer" variant="outline" className="w-full justify-start">
              <Timer className="mr-2 h-4 w-4" />
              Set Timer
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Prep Time: {recipe.prepTime} min
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Cook Time: {recipe.cookTime} min
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Servings: {recipe.servings}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
              <span className={`text-sm font-medium ${difficultyColor}`}>
                Difficulty: {difficulty}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ChefHat className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Estimated Calories: {estimateCalories()} kcal
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Menu</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Button
                key="menu-add"
                variant="outline"
                className="w-full justify-start"
                onClick={() => addToMenu(recipe)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add to Menu
              </Button>
              {menuCount > 0 && (
                <Button
                  key="menu-remove"
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => removeFromMenu(recipe.key)}
                >
                  <Minus className="mr-2 h-4 w-4" />
                  Remove from Menu
                </Button>
              )}
            </div>
            {menuCount > 0 && (
              <div className="text-sm text-muted-foreground">
                This recipe is in your menu {menuCount} time(s).
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ingredients</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient.key} className="flex gap-2">
                  <span className="font-medium">
                    {ingredient.quantity} {ingredient.unit}
                  </span>
                  <span>{ingredient.name}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              {recipe.instructions.map((instruction, index) => (
                <li key={`instruction-${index}`}>{instruction}</li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>

      <AdBanner slot={""} />
    </div>
  )
}

