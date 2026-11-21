import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { searchGames } from "@/lib/catalog";
import { GameGrid } from "@/components/site/GameCard";
import { seo } from "@/lib/seo";
export const Route = createFileRoute("/search")({
  validateSearch: z.object({ q: z.string().optional().catch("") }),
  head: () => ({ meta: [...seo("Search Games — Plyvion", "Search registered Plyvion games by title."), { name: "robots", content: "noindex, follow" }] }),
  component: SearchPage,
});
function SearchPage() {
  const { q } = Route.useSearch();
  const results = searchGames(q ?? "");
  return <div className="px-3 py-4 sm:px-5 lg:px-6"><h1 className="font-display mb-5 text-2xl font-bold">Search games</h1><GameGrid games={results} />{q && results.length === 0 && <p className="text-sm text-muted-foreground">No games found.</p>}</div>;
}
