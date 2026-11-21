import { createFileRoute, Link } from "@tanstack/react-router";
import { categories, games } from "@/lib/catalog";
import { GameGrid } from "@/components/site/GameCard";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({ meta: seo("Plyvion — Free Online HTML5 Games", "Play free HTML5 games in your browser on Plyvion. Action, puzzle, racing, arcade and more — no downloads.") }),
  component: Index,
});

function Index() {
  return (
    <div className="mx-auto max-w-7xl px-4">
      <section className="py-14 sm:py-20">
        <p className="text-xs uppercase tracking-[0.3em] text-primary">Free browser games</p>
        <h1 className="font-display mt-3 max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">Play instantly. <span className="text-primary">No downloads.</span></h1>
        <p className="mt-4 max-w-xl text-muted-foreground">Plyvion is your home for HTML5 games that run right in your browser, on any device.</p>
        <div className="mt-8 flex gap-3">
          <Link to="/games" className="rounded-md bg-primary px-5 py-2.5 font-medium text-primary-foreground hover:opacity-90">Browse games</Link>
          <Link to="/categories" className="rounded-md border border-border px-5 py-2.5 hover:bg-accent">Categories</Link>
        </div>
      </section>
      <section className="mb-12">
        <h2 className="font-display mb-4 text-xl font-semibold">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link key={c.slug} to="/categories/$slug" params={{ slug: c.slug }} className="rounded-full border border-border bg-card px-4 py-1.5 text-sm hover:border-primary hover:text-primary">{c.name}</Link>
          ))}
        </div>
      </section>
      <section>
        <h2 className="font-display mb-4 text-xl font-semibold">Latest games</h2>
        <GameGrid games={games.slice(0, 15)} />
      </section>
    </div>
  );
}
