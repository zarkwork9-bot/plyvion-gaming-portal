import { createFileRoute, Link } from "@tanstack/react-router";
import { categories, gamesInCategory } from "@/lib/catalog";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/categories/")({
  head: () => ({ meta: seo("Game Categories — Plyvion", "Explore Plyvion games by category: action, puzzle, racing, arcade, adventure and more.") }),
  component: () => (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="font-display mb-6 text-3xl font-bold">Categories</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c) => (
          <Link key={c.slug} to="/categories/$slug" params={{ slug: c.slug }} className="rounded-xl border border-border bg-card p-5 transition hover:border-primary hover:shadow-glow">
            <h2 className="font-display text-lg font-semibold">{c.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
            <p className="mt-3 text-xs text-primary">{gamesInCategory(c.slug).length} games</p>
          </Link>
        ))}
      </div>
    </div>
  ),
});
