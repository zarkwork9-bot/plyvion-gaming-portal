import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getCategory, getGame, games } from "@/lib/catalog";
import { GameGrid } from "@/components/site/GameCard";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/games/$slug")({
  loader: ({ params }) => {
    const game = getGame(params.slug);
    if (!game) throw notFound();
    return { game };
  },
  head: ({ loaderData }) =>
    loaderData
      ? { meta: [...seo(`${loaderData.game.title} — Play Free on Plyvion`, loaderData.game.description), ...(loaderData.game.thumbnail.startsWith("https://") ? [{ property: "og:image", content: loaderData.game.thumbnail }, { name: "twitter:image", content: loaderData.game.thumbnail }] : [])] }
      : { meta: [...seo("Game not found — Plyvion", "The requested game is unavailable on Plyvion."), { name: "robots", content: "noindex" }] },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold">Game not found</h1>
      <Link to="/games" className="mt-4 inline-block text-primary">Browse all games</Link>
    </div>
  ),
  component: GamePage,
});

function GamePage() {
  const { game } = Route.useLoaderData();
  const related = games.filter((g) => g.slug !== game.slug && g.categories.some((c) => game.categories.includes(c))).slice(0, 10);
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className={`mx-auto w-full overflow-hidden rounded-xl border border-border bg-muted ${game.slug === "number-merge" ? "h-[720px] max-w-2xl" : "aspect-video"}`}>
        <iframe src={game.embedUrl} title={game.title} className="h-full w-full" allow="fullscreen; autoplay; gamepad" allowFullScreen />
      </div>
      <h1 className="font-display mt-6 text-3xl font-bold">{game.title}</h1>
      <div className="mt-2 flex flex-wrap gap-2">
        {game.categories.map((c) => (
          <Link key={c} to="/categories/$slug" params={{ slug: c }} className="rounded-full border border-border px-3 py-1 text-xs hover:text-primary">{getCategory(c)?.name ?? c}</Link>
        ))}
      </div>
      <p className="mt-4 max-w-3xl text-muted-foreground">{game.description}</p>
      {game.instructions && (<><h2 className="font-display mt-8 text-xl font-semibold">How to play</h2><p className="mt-2 text-muted-foreground">{game.instructions}</p></>)}
      <h2 className="font-display mb-4 mt-12 text-xl font-semibold">Similar games</h2>
      <GameGrid games={related} />
    </div>
  );
}
