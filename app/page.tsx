import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle, UtensilsCrossed, BookOpen, ShoppingBag, Heart } from "lucide-react"
import { RecipeGrid } from "@/components/recipe-grid"
import { AdBanner } from "@/components/ad-banner"

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-green-800 dark:text-green-300">
                Your Personal Recipe Collection
              </h1>
              <p className="text-lg text-muted-foreground">
                Organize your favorite recipes, plan your meals, and generate shopping lists with ease.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/add-recipe">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Add Recipe
                  </Button>
                </Link>
                <Link href="/menu">
                  <Button size="lg" variant="outline">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Plan Your Menu
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="relative w-full max-w-md aspect-square">
                <div className="absolute top-0 right-0 w-4/5 h-4/5 bg-green-100 dark:bg-green-900 rounded-lg shadow-lg transform rotate-6"></div>
                <div className="absolute bottom-0 left-0 w-4/5 h-4/5 bg-emerald-100 dark:bg-emerald-900 rounded-lg shadow-lg transform -rotate-6"></div>
                <div className="absolute inset-0 m-auto w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 flex items-center justify-center">
                  <div className="text-center">
                    <UtensilsCrossed className="h-16 w-16 mx-auto mb-4 text-green-600 dark:text-green-400" />
                    <h3 className="text-xl font-semibold mb-2">My Cookbook</h3>
                    <p className="text-muted-foreground">Your recipes, your way</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Ad Banner */}
      <div className="container mx-auto px-4 py-6">
        <AdBanner slot="1234567890" format="horizontal" className="mx-auto max-w-4xl h-24" />
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8 text-center">Everything You Need for Meal Planning</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-green-100 dark:border-green-900">
            <div className="bg-green-50 dark:bg-green-900/50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Recipe Collection</h3>
            <p className="text-muted-foreground">
              Store all your favorite recipes in one place with detailed ingredients and instructions.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-green-100 dark:border-green-900">
            <div className="bg-green-50 dark:bg-green-900/50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <UtensilsCrossed className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Menu Planning</h3>
            <p className="text-muted-foreground">
              Plan your meals for the week by adding recipes to your menu with adjustable servings.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-green-100 dark:border-green-900">
            <div className="bg-green-50 dark:bg-green-900/50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <ShoppingBag className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Shopping Lists</h3>
            <p className="text-muted-foreground">
              Automatically generate shopping lists based on your menu plan with consolidated ingredients.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-green-100 dark:border-green-900">
            <div className="bg-green-50 dark:bg-green-900/50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Heart className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Favorites</h3>
            <p className="text-muted-foreground">
              Save your favorite recipes for quick access and organize your personal collection.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">My Recipes</h2>
            <p className="text-muted-foreground mt-1">Browse and filter your recipe collection</p>
          </div>
          <div className="flex gap-4">
            <Link href="/favorites">
              <Button variant="outline">
                <Heart className="mr-2 h-4 w-4" />
                Favorites
              </Button>
            </Link>
            <Link href="/menu">
              <Button variant="outline">View Menu Plan</Button>
            </Link>
            <Link href="/shopping-list">
              <Button variant="outline">Shopping List</Button>
            </Link>
            <Link href="/add-recipe">
              <Button className="bg-green-600 hover:bg-green-700">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Recipe
              </Button>
            </Link>
          </div>
        </div>

        {/* Recipe Grid with Sidebar Ad */}
        <div className="grid lg:grid-cols-[1fr_200px] gap-8">
          <RecipeGrid />

          <div className="space-y-8 hidden lg:block">
            <AdBanner slot="2345678901" format="vertical" className="h-[600px]" />
          </div>
        </div>

        {/* Bottom Ad Banner */}
        <div className="mt-12">
          <AdBanner slot="3456789012" format="rectangle" className="mx-auto h-[250px] max-w-[300px]" />
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 bg-green-50 dark:bg-green-900/30 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-semibold mb-4">Get Weekly Recipe Inspiration</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Sign up for our newsletter to receive new recipe ideas, seasonal ingredients, and cooking tips.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2 rounded-l-md border border-r-0 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <Button className="rounded-l-none bg-green-600 hover:bg-green-700">Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

