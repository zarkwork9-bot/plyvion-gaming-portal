import { createFileRoute } from "@tanstack/react-router";
import { games } from "@/lib/catalog";
import { GameGrid } from "@/components/site/GameCard";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/games/")({
  head: () => ({ meta: seo("All Games — Plyvion", "Browse the full Plyvion catalog of free HTML5 browser games.") }),
  component: () => (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="font-display mb-6 text-3xl font-bold">All Games</h1>
      <GameGrid games={games} />
    </div>
  ),
});
