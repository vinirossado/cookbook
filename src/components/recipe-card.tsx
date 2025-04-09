"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Bookmark, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface RecipeCardProps {
  recipe: {
    id: number;
    title: string;
    image: string;
    prepTime: string;
    cookTime: string;
    difficulty: string;
    rating: number;
    author: {
      name: string;
      avatar: string;
    };
    saved: boolean;
  };
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const [isSaved, setIsSaved] = useState(recipe.saved);
  const t = useTranslations("RecipeCard");

  return (
    <div className="group overflow-hidden rounded-xl border bg-card transition-all hover:shadow-md">
      <Link href={`/recipe/${recipe.id}`} className="block">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image src={recipe.image || "/placeholder.svg"} alt={recipe.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsSaved(!isSaved);
            }}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-colors hover:bg-background"
            aria-label={t("saveRecipe")}
          >
            <Bookmark className={cn("h-4 w-4", isSaved ? "fill-primary text-primary" : "text-muted-foreground")} />
          </button>
        </div>
      </Link>
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{t("totalTime", { prep: recipe.prepTime, cook: recipe.cookTime })}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{recipe.rating}</span>
          </div>
        </div>
        <Link href={`/recipe/${recipe.id}`} className="block">
          <h3 className="mb-2 font-bold leading-tight text-card-foreground transition-colors group-hover:text-primary">{recipe.title}</h3>
        </Link>
        <div className="flex items-center gap-2">
          <Image src={recipe.author.avatar || "/placeholder.svg"} width={24} height={24} alt={recipe.author.name} className="rounded-full" />
          <span className="text-xs text-muted-foreground">{t("byAuthor", { author: recipe.author.name })}</span>
        </div>
      </div>
    </div>
  );
}
