"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { FavoritesList } from "@/components/favorites-list"
import { AdBanner } from "@/components/ad-banner"

export default function FavoritesPage() {
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
          <h1 className="text-3xl font-bold">Favorite Recipes</h1>
          <p className="text-muted-foreground mt-1">Your saved favorite recipes</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <FavoritesList />
        </div>

        <div className="space-y-6">
          <AdBanner slot="favorites-sidebar" format="vertical" className="h-[600px]" />
        </div>
      </div>
    </div>
  )
}

