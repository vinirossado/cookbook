import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { Clock, ChefHat, Users, Bookmark, Printer, Share2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";

export default function RecipePage() {
  const t = useTranslations("RecipePage");

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-6">
          <Link href="/" className="text-xl font-bold">
            {t("header.title")}
          </Link>
          <nav className="hidden space-x-6 md:flex">
            <Link href="/" className="font-medium text-gray-600 hover:text-primary">
              {t("header.nav.home")}
            </Link>
            <Link href="#" className="font-medium text-gray-600 hover:text-primary">
              {t("header.nav.categories")}
            </Link>
            <Link href="#" className="font-medium text-gray-600 hover:text-primary">
              {t("header.nav.popular")}
            </Link>
            <Link href="#" className="font-medium text-gray-600 hover:text-primary">
              {t("header.nav.about")}
            </Link>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </header>

      <main className="container px-4 py-8 mx-auto md:px-6 md:py-12">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-1">
            <nav className="flex mb-4 text-sm" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link href="/" className="inline-flex items-center text-gray-500 hover:text-primary">
                    {t("header.nav.home")}
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="mx-2 text-gray-400">/</span>
                    <Link href="#" className="text-gray-500 hover:text-primary">
                      {t("header.nav.categories")}
                    </Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="text-gray-600">{t("header.nav.categories")}</span>
                  </div>
                </li>
              </ol>
            </nav>

            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">{t("header.nav.categories")}</h1>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                  ))}
                </div>
                <span className="ml-2 text-sm font-medium">4.8 (124 reviews)</span>
              </div>
              <Separator orientation="vertical" className="h-5" />
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm">35 min</span>
              </div>
              <Separator orientation="vertical" className="h-5" />
              <div className="flex items-center gap-1">
                <ChefHat className="w-4 h-4 text-gray-500" />
                <span className="text-sm">Easy</span>
              </div>
              <Separator orientation="vertical" className="h-5" />
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm">Serves 4</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              <Button variant="outline" size="sm" className="gap-1">
                <Bookmark className="w-4 h-4" />
                Save
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Printer className="w-4 h-4" />
                Print
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>

            <div className="relative w-full mb-8 overflow-hidden rounded-xl aspect-video">
              <Image src="/placeholder.svg?height=600&width=1200" alt="Creamy Garlic Parmesan Pasta" fill className="object-cover" />
            </div>

            <div className="mb-8 prose max-w-none">
              <p>This creamy garlic parmesan pasta is a quick and easy dish that's perfect for busy weeknights. It's rich, indulgent, and packed with flavor. The sauce is made with fresh garlic, butter, cream, and parmesan cheese, creating a silky smooth texture that coats every strand of pasta perfectly.</p>
            </div>

            <Tabs defaultValue="ingredients" className="mb-12">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                <TabsTrigger value="instructions">Instructions</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>
              <TabsContent value="ingredients" className="pt-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium">Ingredients</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Serving:</span>
                      <select className="h-8 rounded-md border border-input bg-background px-2 py-1 text-sm shadow-sm">
                        <option value="2">2 servings</option>
                        <option value="4" selected>
                          4 servings
                        </option>
                        <option value="6">6 servings</option>
                        <option value="8">8 servings</option>
                      </select>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <input type="checkbox" className="mr-3 h-5 w-5 rounded-md border-gray-300" />
                      <span>1 pound (450g) fettuccine pasta</span>
                    </li>
                    <li className="flex items-center">
                      <input type="checkbox" className="mr-3 h-5 w-5 rounded-md border-gray-300" />
                      <span>4 tablespoons unsalted butter</span>
                    </li>
                    <li className="flex items-center">
                      <input type="checkbox" className="mr-3 h-5 w-5 rounded-md border-gray-300" />
                      <span>4 cloves garlic, minced</span>
                    </li>
                    <li className="flex items-center">
                      <input type="checkbox" className="mr-3 h-5 w-5 rounded-md border-gray-300" />
                      <span>2 cups heavy cream</span>
                    </li>
                    <li className="flex items-center">
                      <input type="checkbox" className="mr-3 h-5 w-5 rounded-md border-gray-300" />
                      <span>1 1/2 cups freshly grated Parmesan cheese</span>
                    </li>
                    <li className="flex items-center">
                      <input type="checkbox" className="mr-3 h-5 w-5 rounded-md border-gray-300" />
                      <span>1/2 teaspoon salt, or to taste</span>
                    </li>
                    <li className="flex items-center">
                      <input type="checkbox" className="mr-3 h-5 w-5 rounded-md border-gray-300" />
                      <span>1/4 teaspoon freshly ground black pepper</span>
                    </li>
                    <li className="flex items-center">
                      <input type="checkbox" className="mr-3 h-5 w-5 rounded-md border-gray-300" />
                      <span>2 tablespoons fresh parsley, chopped (for garnish)</span>
                    </li>
                    <li className="flex items-center">
                      <input type="checkbox" className="mr-3 h-5 w-5 rounded-md border-gray-300" />
                      <span>Red pepper flakes (optional, for heat)</span>
                    </li>
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="instructions" className="pt-6">
                <div className="mb-4">
                  <h3 className="mb-4 text-lg font-medium">Instructions</h3>
                  <ol className="space-y-6">
                    <li className="flex gap-4">
                      <div className="flex items-center justify-center w-8 h-8 mt-1 text-sm font-bold rounded-full shrink-0 bg-primary/10 text-primary">1</div>
                      <div>
                        <p>Bring a large pot of salted water to a boil. Add the fettuccine and cook according to package instructions until al dente, usually 8-10 minutes. Reserve 1 cup of pasta water before draining.</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="flex items-center justify-center w-8 h-8 mt-1 text-sm font-bold rounded-full shrink-0 bg-primary/10 text-primary">2</div>
                      <div>
                        <p>While the pasta is cooking, melt the butter in a large skillet over medium heat. Add the minced garlic and sauté for 1-2 minutes until fragrant, being careful not to burn it.</p>
                        <div className="relative w-full mt-3 overflow-hidden rounded-lg aspect-video">
                          <Image src="/placeholder.svg?height=300&width=600" alt="Sautéing garlic in butter" fill className="object-cover" />
                        </div>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="flex items-center justify-center w-8 h-8 mt-1 text-sm font-bold rounded-full shrink-0 bg-primary/10 text-primary">3</div>
                      <div>
                        <p>Pour in the heavy cream and bring to a simmer. Reduce heat to low and let it simmer for about 5 minutes until it starts to thicken slightly.</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="flex items-center justify-center w-8 h-8 mt-1 text-sm font-bold rounded-full shrink-0 bg-primary/10 text-primary">4</div>
                      <div>
                        <p>Gradually whisk in the grated Parmesan cheese until melted and the sauce is smooth. Season with salt and black pepper to taste.</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="flex items-center justify-center w-8 h-8 mt-1 text-sm font-bold rounded-full shrink-0 bg-primary/10 text-primary">5</div>
                      <div>
                        <p>Add the drained pasta to the sauce and toss to coat evenly. If the sauce is too thick, add some of the reserved pasta water, a little at a time, until you reach your desired consistency.</p>
                        <div className="relative w-full mt-3 overflow-hidden rounded-lg aspect-video">
                          <Image src="/placeholder.svg?height=300&width=600" alt="Tossing pasta in sauce" fill className="object-cover" />
                        </div>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="flex items-center justify-center w-8 h-8 mt-1 text-sm font-bold rounded-full shrink-0 bg-primary/10 text-primary">6</div>
                      <div>
                        <p>Serve immediately, garnished with chopped parsley and red pepper flakes if desired.</p>
                      </div>
                    </li>
                  </ol>
                </div>
              </TabsContent>
              <TabsContent value="notes" className="pt-6">
                <div className="mb-4">
                  <h3 className="mb-4 text-lg font-medium">Chef's Notes</h3>
                  <div className="p-4 rounded-lg bg-primary/5">
                    <ul className="space-y-3 list-disc list-inside">
                      <li>For the best flavor, use freshly grated Parmesan cheese rather than pre-grated. Pre-grated cheese often contains anti-caking agents that can make the sauce grainy.</li>
                      <li>You can add grilled chicken, sautéed shrimp, or steamed broccoli to make this a complete meal.</li>
                      <li>The sauce will continue to thicken as it cools, so if you're not serving immediately, make it slightly thinner than you want the final result to be.</li>
                      <li>Leftovers can be stored in an airtight container in the refrigerator for up to 3 days. When reheating, add a splash of milk or cream to loosen the sauce.</li>
                      <li>For a lighter version, you can substitute half-and-half for the heavy cream, though the sauce won't be quite as rich.</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="p-6 mb-8 border rounded-xl">
              <h3 className="mb-4 text-lg font-medium">Nutrition Information</h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="p-3 text-center rounded-lg bg-primary/5">
                  <p className="text-sm text-gray-600">Calories</p>
                  <p className="text-xl font-bold">650</p>
                </div>
                <div className="p-3 text-center rounded-lg bg-primary/5">
                  <p className="text-sm text-gray-600">Protein</p>
                  <p className="text-xl font-bold">18g</p>
                </div>
                <div className="p-3 text-center rounded-lg bg-primary/5">
                  <p className="text-sm text-gray-600">Carbs</p>
                  <p className="text-xl font-bold">52g</p>
                </div>
                <div className="p-3 text-center rounded-lg bg-primary/5">
                  <p className="text-sm text-gray-600">Fat</p>
                  <p className="text-xl font-bold">42g</p>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="mb-6 text-xl font-bold">Comments (24)</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Image src="/placeholder.svg?height=50&width=50" width={40} height={40} alt="User avatar" className="rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">Emily Johnson</h4>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">2 days ago</p>
                    <p>This recipe is amazing! I made it for dinner last night and my whole family loved it. I added some grilled chicken and it was perfect. Will definitely make again!</p>
                  </div>
                </div>
                <Separator />
                <div className="flex gap-4">
                  <Image src="/placeholder.svg?height=50&width=50" width={40} height={40} alt="User avatar" className="rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">Michael Thompson</h4>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">1 week ago</p>
                    <p>Great recipe but I found it a bit too rich. I used half-and-half instead of heavy cream the second time I made it and it was perfect for my taste. Still creamy but not too heavy.</p>
                  </div>
                </div>
                <Separator />
                <div className="flex gap-4">
                  <Image src="/placeholder.svg?height=50&width=50" width={40} height={40} alt="User avatar" className="rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">Sophia Garcia</h4>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">3 days ago</p>
                    <p>I added some sun-dried tomatoes and spinach to this recipe and it was delicious! The creamy sauce pairs perfectly with the tangy tomatoes. A new favorite in our house!</p>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-6">
                Load More Comments
              </Button>
            </div>
          </div>

          <div className="w-full lg:w-80 space-y-8">
            <div className="p-6 border rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Image src="/placeholder.svg?height=60&width=60" width={50} height={50} alt="Chef avatar" className="rounded-full" />
                <div>
                  <h3 className="font-medium">Maria Rodriguez</h3>
                  <p className="text-sm text-gray-600">Chef & Food Blogger</p>
                </div>
              </div>
              <p className="text-sm mb-4">I love creating simple, delicious recipes that anyone can make at home. This creamy pasta is one of my favorites!</p>
              <Button variant="outline" size="sm" className="w-full">
                View All Recipes
              </Button>
            </div>

            <div className="p-6 border rounded-xl">
              <h3 className="mb-4 text-lg font-medium">You Might Also Like</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex gap-3">
                    <Image src="/placeholder.svg?height=80&width=80" width={70} height={70} alt="Recipe thumbnail" className="rounded-md object-cover" />
                    <div>
                      <h4 className="font-medium text-sm">Lemon Garlic Butter Shrimp Pasta</h4>
                      <div className="flex items-center mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-3 w-3 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                          ))}
                        </div>
                        <span className="ml-1 text-xs text-gray-600">(86)</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border rounded-xl bg-primary/5">
              <h3 className="mb-4 text-lg font-medium">Subscribe for Weekly Recipes</h3>
              <p className="text-sm mb-4">Get new recipes delivered to your inbox every week!</p>
              <div className="space-y-3">
                <Input placeholder="Your email address" />
                <Button className="w-full">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-12 mt-12 bg-gray-50">
        <div className="container px-4 mx-auto md:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-bold">CulinaryDelight</h3>
              <p className="text-gray-600">Discover and share the best recipes from around the world.</p>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase text-gray-500">Explore</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-primary">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-primary">
                    Popular Recipes
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-primary">
                    Chefs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-primary">
                    Seasonal
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase text-gray-500">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-primary">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-primary">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase text-gray-500">Subscribe</h4>
              <p className="mb-4 text-gray-600">Get weekly recipes and cooking tips.</p>
              <div className="flex gap-2">
                <Input type="email" placeholder="Your email" />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="pt-8 mt-8 text-center border-t">
            <p className="text-gray-600">© {new Date().getFullYear()} CulinaryDelight. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
