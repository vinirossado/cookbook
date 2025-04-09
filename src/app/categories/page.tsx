import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleLanguage } from "@/components/toggle/lang";
import { Separator } from "@/components/ui/separator";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="text-xl font-bold text-gradient">
            CulinaryDelight
          </Link>
          <nav className="hidden space-x-6 md:flex">
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/categories" className="nav-link">
              Categories
            </Link>
            <Link href="#" className="nav-link">
              Popular
            </Link>
            <Link href="#" className="nav-link">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ToggleLanguage />
            <Button variant="ghost" size="icon" className="md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      <main className="container px-4 py-8 md:px-6 md:py-12">
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">Recipe Categories</h1>
          <p className="text-muted-foreground">Browse recipes by category and find your next culinary inspiration.</p>
        </div>

        <div className="mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="search" placeholder="Search categories..." className="pl-9" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Filter</Button>
              <Button>Sort</Button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Italian", count: 156, image: "/placeholder.svg?height=300&width=400" },
            { name: "Mexican", count: 143, image: "/placeholder.svg?height=300&width=400" },
            { name: "Asian", count: 189, image: "/placeholder.svg?height=300&width=400" },
            { name: "Mediterranean", count: 134, image: "/placeholder.svg?height=300&width=400" },
            { name: "American", count: 167, image: "/placeholder.svg?height=300&width=400" },
            { name: "Indian", count: 145, image: "/placeholder.svg?height=300&width=400" },
            { name: "French", count: 123, image: "/placeholder.svg?height=300&width=400" },
            { name: "Thai", count: 98, image: "/placeholder.svg?height=300&width=400" },
            { name: "Japanese", count: 112, image: "/placeholder.svg?height=300&width=400" },
            { name: "Greek", count: 87, image: "/placeholder.svg?height=300&width=400" },
            { name: "Spanish", count: 76, image: "/placeholder.svg?height=300&width=400" },
            { name: "Vietnamese", count: 65, image: "/placeholder.svg?height=300&width=400" },
          ].map((category) => (
            <Link key={category.name} href={`/categories/${category.name.toLowerCase()}`} className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105" style={{ backgroundImage: `url('${category.image}')` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                  <p className="text-sm text-white/80">{category.count} recipes</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button>Load More Categories</Button>
        </div>
      </main>

      <div className="mt-12 bg-accent/5 py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-bold">CulinaryDelight</h3>
              <p className="text-muted-foreground">Discover and share the best recipes from around the world.</p>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase text-muted-foreground">Explore</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/categories" className="nav-link">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="#" className="nav-link">
                    Popular Recipes
                  </Link>
                </li>
                <li>
                  <Link href="#" className="nav-link">
                    Chefs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="nav-link">
                    Seasonal
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase text-muted-foreground">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="nav-link">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="nav-link">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="nav-link">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="nav-link">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase text-muted-foreground">Subscribe</h4>
              <p className="mb-4 text-muted-foreground">Get weekly recipes and cooking tips.</p>
              <div className="flex gap-2">
                <Input type="email" placeholder="Your email" />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="text-center">
            <p className="text-muted-foreground">© {new Date().getFullYear()} CulinaryDelight. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
