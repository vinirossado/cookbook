"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RecipeCard from "@/components/recipe-card";
import { ModeToggle } from "@/components/toggle/theme";
import { ToggleLanguage } from "@/components/toggle/lang";
import { useTranslations } from "next-intl";

export default function RecipeListPage() {
  const t = useTranslations("RecipeListPage");

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-6">
          <Link href="/" className="text-xl font-bold text-foreground">
            {t("header.title")}
          </Link>
          <nav className="hidden space-x-6 md:flex">
            <Link href="/" className="font-medium text-primary">
              {t("header.nav.home")}
            </Link>
            <Link href="#" className="font-medium text-muted-foreground hover:text-primary">
              {t("header.nav.categories")}
            </Link>
            <Link href="#" className="font-medium text-muted-foreground hover:text-primary">
              {t("header.nav.popular")}
            </Link>
            <Link href="#" className="font-medium text-muted-foreground hover:text-primary">
              {t("header.nav.about")}
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <ToggleLanguage type="icon" />
            <ModeToggle type="icon" />
            <Button variant="ghost" size="icon" className="md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8 mx-auto md:px-6 md:py-12">
        <section className="mb-12">
          <div className="relative h-[400px] rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/placeholder.svg?height=800&width=1600')" }} />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
              <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">{t("hero.title")}</h1>
              <p className="max-w-2xl mb-8 text-lg md:text-xl">{t("hero.subtitle")}</p>
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input type="search" placeholder={t("hero.searchPlaceholder")} className="pl-10 h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-300" />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold md:text-3xl text-foreground">{t("categories.title")}</h2>
            <Button variant="link" className="font-medium">
              {t("categories.viewAll")}
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {categories.map((category) => (
              <Link key={category.id} href="#" className="flex flex-col items-center p-4 transition-all rounded-lg hover:bg-muted">
                <div className="flex items-center justify-center w-16 h-16 mb-3 rounded-full bg-primary/10">
                  <span className="text-2xl">{category.emoji}</span>
                </div>
                {/* @ts-ignore */}
                <span className="text-sm font-medium text-center text-foreground">{t(`categories.items.${category.key}`)}</span>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold md:text-3xl text-foreground">{t("recipes.title")}</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                {t("recipes.filter")}
              </Button>
              <select className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm">
                <option value="latest">{t("recipes.sort.latest")}</option>
                <option value="popular">{t("recipes.sort.popular")}</option>
                <option value="trending">{t("recipes.sort.trending")}</option>
              </select>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <Button variant="outline" className="mx-auto">
              {t("recipes.loadMore")}
            </Button>
          </div>
        </section>
      </main>

      <footer className="py-12 mt-12 bg-muted">
        <div className="container px-4 mx-auto md:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-bold text-foreground">{t("footer.title")}</h3>
              <p className="text-muted-foreground">{t("footer.description")}</p>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase text-muted-foreground">{t("footer.explore.title")}</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    {t("footer.explore.categories")}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    {t("footer.explore.popularRecipes")}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    {t("footer.explore.chefs")}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    {t("footer.explore.seasonal")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase text-muted-foreground">{t("footer.company.title")}</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    {t("footer.company.aboutUs")}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    {t("footer.company.contact")}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    {t("footer.company.careers")}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    {t("footer.company.privacyPolicy")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase text-muted-foreground">{t("footer.subscribe.title")}</h4>
              <p className="mb-4 text-muted-foreground">{t("footer.subscribe.description")}</p>
              <div className="flex gap-2">
                <Input type="email" placeholder={t("footer.subscribe.placeholder")} />
                <Button>{t("footer.subscribe.button")}</Button>
              </div>
            </div>
          </div>
          <div className="pt-8 mt-8 text-center border-t">
            <p className="text-muted-foreground">{t("footer.copyright", { year: new Date().getFullYear() })}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const categories = [
  { id: 1, key: "breakfast", name: "Breakfast", emoji: "🍳" },
  { id: 2, key: "lunch", name: "Lunch", emoji: "🥪" },
  { id: 3, key: "dinner", name: "Dinner", emoji: "🍲" },
  { id: 4, key: "desserts", name: "Desserts", emoji: "🍰" },
  { id: 5, key: "vegetarian", name: "Vegetarian", emoji: "🥗" },
  { id: 6, key: "seafood", name: "Seafood", emoji: "🦞" },
];

const recipes = [
  {
    id: 1,
    title: "Creamy Garlic Parmesan Pasta",
    image: "/placeholder.svg?height=400&width=600",
    prepTime: "15 min",
    cookTime: "20 min",
    difficulty: "Easy",
    rating: 4.8,
    author: {
      name: "Maria Rodriguez",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    saved: false,
  },
  {
    id: 2,
    title: "Spicy Thai Basil Chicken",
    image: "/placeholder.svg?height=400&width=600",
    prepTime: "10 min",
    cookTime: "15 min",
    difficulty: "Medium",
    rating: 4.6,
    author: {
      name: "Alex Chen",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    saved: true,
  },
  {
    id: 3,
    title: "Classic Margherita Pizza",
    image: "/placeholder.svg?height=400&width=600",
    prepTime: "30 min",
    cookTime: "15 min",
    difficulty: "Medium",
    rating: 4.9,
    author: {
      name: "Giovanni Rossi",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    saved: false,
  },
  {
    id: 4,
    title: "Chocolate Lava Cake",
    image: "/placeholder.svg?height=400&width=600",
    prepTime: "15 min",
    cookTime: "12 min",
    difficulty: "Medium",
    rating: 4.7,
    author: {
      name: "Sophie Martin",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    saved: false,
  },
  {
    id: 5,
    title: "Fresh Summer Salad",
    image: "/placeholder.svg?height=400&width=600",
    prepTime: "15 min",
    cookTime: "0 min",
    difficulty: "Easy",
    rating: 4.5,
    author: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    saved: true,
  },
  {
    id: 6,
    title: "Beef Wellington",
    image: "/placeholder.svg?height=400&width=600",
    prepTime: "45 min",
    cookTime: "1 hr 30 min",
    difficulty: "Hard",
    rating: 4.9,
    author: {
      name: "Gordon Smith",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    saved: false,
  },
  {
    id: 7,
    title: "Vegetable Stir Fry",
    image: "/placeholder.svg?height=400&width=600",
    prepTime: "20 min",
    cookTime: "10 min",
    difficulty: "Easy",
    rating: 4.3,
    author: {
      name: "Lin Zhang",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    saved: false,
  },
  {
    id: 8,
    title: "Homemade Sushi Rolls",
    image: "/placeholder.svg?height=400&width=600",
    prepTime: "30 min",
    cookTime: "15 min",
    difficulty: "Hard",
    rating: 4.7,
    author: {
      name: "Yuki Tanaka",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    saved: true,
  },
];
