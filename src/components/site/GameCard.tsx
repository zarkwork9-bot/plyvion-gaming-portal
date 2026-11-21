import { Link } from "@tanstack/react-router";
import type { Game } from "@/lib/catalog";

export function GameCard({ game }: { game: Game }) {
  return (
    <Link to="/games/$slug" params={{ slug: game.slug }} className="group block min-w-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={game.title}>
      <div className="aspect-[4/3] overflow-hidden rounded-lg bg-muted">
        <img src={game.thumbnail} alt={game.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-200 motion-safe:group-hover:scale-105" />
      </div>
      <h3 className="mt-1.5 truncate text-xs font-medium leading-5 sm:text-sm">{game.title}</h3>
    </Link>
  );
}

export function GameGrid({ games }: { games: Game[]; emptyText?: string }) {
  if (games.length === 0) return null;
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-4 min-[480px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {games.map((game) => <GameCard key={game.slug} game={game} />)}
    </div>
  );
}
