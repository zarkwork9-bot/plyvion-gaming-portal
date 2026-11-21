import { createFileRoute } from "@tanstack/react-router";
import { newestGames } from "@/lib/catalog";
import { GameGrid } from "@/components/site/GameCard";
import { seo } from "@/lib/seo";
export const Route = createFileRoute("/new-games")({
  head: () => ({ meta: seo("New Games — Plyvion", "Browse the newest registered HTML5 games on Plyvion.") }),
  component: () => <div className="px-3 py-4 sm:px-5 lg:px-6"><h1 className="font-display mb-5 text-2xl font-bold">New Games</h1><GameGrid games={newestGames()} /></div>,
});
