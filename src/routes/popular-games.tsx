import { createFileRoute } from "@tanstack/react-router";
import { popularGames } from "@/lib/catalog";
import { GameGrid } from "@/components/site/GameCard";
import { seo } from "@/lib/seo";
export const Route = createFileRoute("/popular-games")({
  head: () => ({ meta: seo("Popular Games — Plyvion", "Browse popular HTML5 browser games registered on Plyvion.") }),
  component: () => <div className="px-3 py-4 sm:px-5 lg:px-6"><h1 className="font-display mb-5 text-2xl font-bold">Popular Games</h1><GameGrid games={popularGames()} /></div>,
});
