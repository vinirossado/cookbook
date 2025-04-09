export interface Ingredient {
  key:  string
  name: string
  quantity: string
  unit: string
}

export interface Recipe {
  key: string
  title: string
  category: string
  description: string
  prepTime: number
  cookTime: number
  servings: number
  ingredients: Ingredient[]
  instructions: string[]
  tags: string[]
  createdAt: string
}

export interface MenuItem {
  recipe: Recipe
  count: number
}

