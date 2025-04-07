"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from "uuid"
import type { Recipe, Ingredient } from "@/lib/types"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Minus, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AddRecipe() {
  const router = useRouter()
  const [recipes, setRecipes] = useLocalStorage<Recipe[]>("recipes", [])

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [prepTime, setPrepTime] = useState(0)
  const [cookTime, setCookTime] = useState(0)
  const [servings, setServings] = useState(4)
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ id: uuidv4(), name: "", quantity: "", unit: "" }])
  const [instructions, setInstructions] = useState<string[]>([""])

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { id: uuidv4(), name: "", quantity: "", unit: "" }])
  }

  const handleRemoveIngredient = (id: string) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((ingredient) => ingredient.key !== id))
    }
  }

  const handleIngredientChange = (id: string, field: keyof Ingredient, value: string) => {
    setIngredients(
      ingredients.map((ingredient) => (ingredient.key === id ? { ...ingredient, [field]: value } : ingredient)),
    )
  }

  const handleAddInstruction = () => {
    setInstructions([...instructions, ""])
  }

  const handleRemoveInstruction = (index: number) => {
    if (instructions.length > 1) {
      setInstructions(instructions.filter((_, i) => i !== index))
    }
  }

  const handleInstructionChange = (index: number, value: string) => {
    setInstructions(instructions.map((instruction, i) => (i === index ? value : instruction)))
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Filter out empty ingredients and instructions
    const filteredIngredients = ingredients.filter((ing) => ing.name.trim() !== "" && ing.quantity.trim() !== "")

    const filteredInstructions = instructions.filter((instruction) => instruction.trim() !== "")

    const newRecipe: Recipe = {
      id: uuidv4(),
      title,
      category: category || "Uncategorized",
      description,
      prepTime,
      cookTime,
      servings,
      ingredients: filteredIngredients,
      instructions: filteredInstructions,
      tags,
      createdAt: new Date().toISOString(),
    }

    setRecipes([...recipes, newRecipe])
    router.push("/")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to recipes
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Add New Recipe</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="title">Recipe Title</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g., Breakfast, Dinner, Dessert"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="prepTime">Prep Time (minutes)</Label>
                  <Input
                    id="prepTime"
                    type="number"
                    min="0"
                    value={prepTime}
                    onChange={(e) => setPrepTime(Number.parseInt(e.target.value) || 0)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="cookTime">Cook Time (minutes)</Label>
                  <Input
                    id="cookTime"
                    type="number"
                    min="0"
                    value={cookTime}
                    onChange={(e) => setCookTime(Number.parseInt(e.target.value) || 0)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="servings">Servings</Label>
                  <Input
                    id="servings"
                    type="number"
                    min="1"
                    value={servings}
                    onChange={(e) => setServings(Number.parseInt(e.target.value) || 1)}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <div
                      key={tag}
                      className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {tag}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-5 w-5 p-0 ml-1"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add a tag"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddTag()
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddTag} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ingredients</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {ingredients.map((ingredient, index) => (
                <div key={ingredient.key} className="flex gap-2 items-start">
                  <div className="grid grid-cols-3 gap-2 flex-1">
                    <Input
                      placeholder="Quantity"
                      value={ingredient.quantity}
                      onChange={(e) => handleIngredientChange(ingredient.key, "quantity", e.target.value)}
                    />
                    <Input
                      placeholder="Unit"
                      value={ingredient.unit}
                      onChange={(e) => handleIngredientChange(ingredient.key, "unit", e.target.value)}
                    />
                    <Input
                      placeholder="Ingredient"
                      value={ingredient.name}
                      onChange={(e) => handleIngredientChange(ingredient.key, "name", e.target.value)}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemoveIngredient(ingredient.key)}
                    disabled={ingredients.length === 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button type="button" variant="outline" onClick={handleAddIngredient}>
                <Plus className="mr-2 h-4 w-4" />
                Add Ingredient
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Instructions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {instructions.map((instruction, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <div className="flex-none pt-3 text-muted-foreground">{index + 1}.</div>
                  <Textarea
                    value={instruction}
                    onChange={(e) => handleInstructionChange(index, e.target.value)}
                    placeholder={`Step ${index + 1}`}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemoveInstruction(index)}
                    disabled={instructions.length === 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button type="button" variant="outline" onClick={handleAddInstruction}>
                <Plus className="mr-2 h-4 w-4" />
                Add Step
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="flex justify-end gap-4">
          <Link href="/">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit">Save Recipe</Button>
        </div>
      </form>
    </div>
  )
}

