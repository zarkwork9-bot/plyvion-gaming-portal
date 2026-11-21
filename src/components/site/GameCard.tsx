import { Link } from "@tanstack/react-router";
import type { Game } from "@/lib/catalog";

export function GameCard({ game }: { game: Game }) {
  return (
    <Link to="/games/$slug" params={{ slug: game.slug }} className="group block overflow-hidden rounded-xl border border-border bg-card transition hover:-translate-y-1 hover:border-primary hover:shadow-glow">
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img src={game.thumbnail} alt={game.title} loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
      </div>
      <div className="p-3">
        <h3 className="font-display truncate text-sm font-semibold">{game.title}</h3>
      </div>
    </Link>
  );
}

export function GameGrid({ games, emptyText = "Games coming soon." }: { games: Game[]; emptyText?: string }) {
  if (games.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card/40 px-6 py-16 text-center">
        <p className="font-display text-lg text-foreground">No games yet</p>
        <p className="mt-1 text-sm text-muted-foreground">{emptyText}</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {games.map((g) => <GameCard key={g.slug} game={g} />)}
    </div>
  );
}
