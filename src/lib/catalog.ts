import { z } from "zod";
import catalog from "./games.json";

export type Category = { slug: string; name: string; description: string };
export const categories: Category[] = [
  { slug: "action", name: "Action", description: "Fast reflexes, high stakes, nonstop momentum." },
  { slug: "puzzle", name: "Puzzle", description: "Brain-bending challenges and clever logic." },
  { slug: "racing", name: "Racing", description: "Burn rubber on tracks across every terrain." },
  { slug: "arcade", name: "Arcade", description: "Classic pick-up-and-play score chasers." },
  { slug: "adventure", name: "Adventure", description: "Explore worlds and uncover stories." },
  { slug: "sports", name: "Sports", description: "Compete in every game under the sun." },
  { slug: "strategy", name: "Strategy", description: "Plan, build and outthink your rivals." },
  { slug: "casual", name: "Casual", description: "Relaxed games for a quick break." },
  { slug: "memory", name: "Memory", description: "Sharpen your recall with matching and memory challenges." },
  { slug: "word", name: "Word", description: "Play with letters, spelling and vocabulary." },
];
const categorySlug = z.string().refine((slug) => categories.some((category) => category.slug === slug), "Unknown game category");
const gameSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().trim().min(1),
  description: z.string().default(""),
  thumbnail: z.string().min(1),
  category: categorySlug.optional(),
  categories: z.array(categorySlug).optional(),
  gamePath: z.string().regex(/^\/(?!\/)[^?#]+$/, "Use a local path beginning with /").optional(),
  embedUrl: z.string().refine((value) => /^\/(?!\/)/.test(value) || value.startsWith("https://"), "Use a local path or HTTPS URL").optional(),
  instructions: z.string().optional(),
  addedAt: z.string().datetime().optional(),
  popularity: z.number().nonnegative().default(0),
}).refine((game) => game.category || game.categories?.length, "A category is required")
  .refine((game) => game.gamePath || game.embedUrl, "A game path is required")
  .transform((game) => {
    const path = game.gamePath;
    const embedUrl = path ? (/\.html?$/i.test(path) ? path : `${path.replace(/\/$/, "")}/index.html`) : game.embedUrl ?? "";
    return { ...game, categories: [...new Set([...(game.categories ?? []), ...(game.category ? [game.category] : [])])], embedUrl };
  });
export type Game = z.infer<typeof gameSchema>;
export function parseCatalog(data: unknown): Game[] {
  const entries = z.array(gameSchema).parse(data);
  const slugs = new Set<string>();
  for (const game of entries) {
    if (slugs.has(game.slug)) throw new Error(`Duplicate game URL: ${game.slug}`);
    slugs.add(game.slug);
  }
  return entries;
}
export const games = parseCatalog(catalog);
export const getCategory = (slug: string) => categories.find((category) => category.slug === slug);
export const getGame = (slug: string) => games.find((game) => game.slug === slug);
export const gamesInCategory = (slug: string) => games.filter((game) => game.categories.includes(slug));
export const searchGames = (query: string, source: Game[] = games) => source.filter((game) => game.title.toLowerCase().includes(query.trim().toLowerCase()));
export const newestGames = () => [...games].sort((a, b) => (b.addedAt ?? "").localeCompare(a.addedAt ?? ""));
export const popularGames = () => [...games].sort((a, b) => b.popularity - a.popularity);
