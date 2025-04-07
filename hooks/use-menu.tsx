"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import type { Recipe, MenuItem } from "@/lib/types"

interface MenuContextType {
  menu: MenuItem[]
  addToMenu: (recipe: Recipe) => void
  removeFromMenu: (recipeId: string) => void
  clearMenu: () => void
  isInMenu: (recipeId: string) => boolean
  getMenuItemCount: (recipeId: string) => number
  increaseCount: (recipeId: string) => void
  decreaseCount: (recipeId: string) => void
}

const MenuContext = createContext<MenuContextType | undefined>(undefined)

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [menu, setMenu] = useState<MenuItem[]>([])

  // Load menu from localStorage on initial render
  useEffect(() => {
    const savedMenu = localStorage.getItem("menu")
    if (savedMenu) {
      try {
        setMenu(JSON.parse(savedMenu))
      } catch (error) {
        console.error("Failed to parse menu from localStorage", error)
      }
    }
  }, [])

  // Save menu to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("menu", JSON.stringify(menu))
  }, [menu])

  const addToMenu = (recipe: Recipe) => {
    setMenu((prevMenu) => {
      const existingItem = prevMenu.find((item) => item.recipe.key === recipe.key)

      if (existingItem) {
        return prevMenu.map((item) => (item.recipe.key === recipe.key ? { ...item, count: item.count + 1 } : item))
      } else {
        return [...prevMenu, { recipe, count: 1 }]
      }
    })
  }

  const removeFromMenu = (recipeId: string) => {
    setMenu((prevMenu) => prevMenu.filter((item) => item.recipe.key !== recipeId))
  }

  const clearMenu = () => {
    setMenu([])
  }

  const isInMenu = (recipeId: string) => {
    return menu.some((item) => item.recipe.key === recipeId)
  }

  const getMenuItemCount = (recipeId: string) => {
    const item = menu.find((item) => item.recipe.key === recipeId)
    return item ? item.count : 0
  }

  const increaseCount = (recipeId: string) => {
    setMenu((prevMenu) =>
      prevMenu.map((item) => (item.recipe.key === recipeId ? { ...item, count: item.count + 1 } : item)),
    )
  }

  const decreaseCount = (recipeId: string) => {
    setMenu((prevMenu) =>
      prevMenu.map((item) =>
        item.recipe.key === recipeId && item.count > 1 ? { ...item, count: item.count - 1 } : item,
      ),
    )
  }

  return (
    <MenuContext.Provider
      value={{
        menu,
        addToMenu,
        removeFromMenu,
        clearMenu,
        isInMenu,
        getMenuItemCount,
        increaseCount,
        decreaseCount,
      }}
    >
      {children}
    </MenuContext.Provider>
  )
}

export function useMenu() {
  const context = useContext(MenuContext)
  if (context === undefined) {
    throw new Error("useMenu must be used within a MenuProvider")
  }
  return context
}

