import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getCategory, gamesInCategory } from "@/lib/catalog";
import { GameGrid } from "@/components/site/GameCard";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/categories/$slug")({
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) =>
    loaderData
      ? { meta: seo(`${loaderData.category.name} Games — Plyvion`, `Play free ${loaderData.category.name.toLowerCase()} games online on Plyvion. ${loaderData.category.description}`) }
      : { meta: [...seo("Category not found — Plyvion", "The requested category is unavailable on Plyvion."), { name: "robots", content: "noindex" }] },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold">Category not found</h1>
      <Link to="/categories" className="mt-4 inline-block text-primary">All categories</Link>
    </div>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold">{category.name} Games</h1>
      <p className="mb-6 mt-2 text-muted-foreground">{category.description}</p>
      <GameGrid games={gamesInCategory(category.slug)} emptyText={`${category.name} games are coming soon.`} />
    </div>
  );
}
