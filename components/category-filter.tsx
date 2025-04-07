"use client"

import { Button } from "@/components/ui/button"

interface CategoryFilterProps {
  categories: string[]
  selectedCategories: string[]
  onToggleCategory: (category: string) => void
}

export function CategoryFilter({ categories, selectedCategories, onToggleCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategories.includes(category) ? "default" : "outline"}
          size="sm"
          onClick={() => onToggleCategory(category)}
          className={`capitalize ${
            selectedCategories.includes(category)
              ? "bg-green-600 hover:bg-green-700"
              : "hover:bg-green-50 hover:text-green-700 dark:hover:bg-green-900/30 dark:hover:text-green-300"
          }`}
        >
          {category}
        </Button>
      ))}
    </div>
  )
}

