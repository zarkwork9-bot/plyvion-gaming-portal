import { createFileRoute } from "@tanstack/react-router";
import { games } from "@/lib/catalog";
import { GameGrid } from "@/components/site/GameCard";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({ meta: seo("Plyvion — Free Online HTML5 Games", "Browse and play HTML5 games on Plyvion, including racing, puzzle, action, sports and arcade games.") }),
  component: Index,
});
function Index() {
  return <div className="px-3 py-4 sm:px-5 sm:py-5 lg:px-6"><GameGrid games={games} /></div>;
}
