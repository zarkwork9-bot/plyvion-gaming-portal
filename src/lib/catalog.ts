// Game catalog. Intentionally empty: real HTML5 games are added manually later.
// To add a game, push an entry into `games` (embedUrl points at the hosted HTML5 build).
export type Category = { slug: string; name: string; description: string };
export type Game = {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  embedUrl: string;
  categories: string[];
  instructions?: string;
};

export const categories: Category[] = [
  { slug: "action", name: "Action", description: "Fast reflexes, high stakes, nonstop momentum." },
  { slug: "puzzle", name: "Puzzle", description: "Brain-bending challenges and clever logic." },
  { slug: "racing", name: "Racing", description: "Burn rubber on tracks across every terrain." },
  { slug: "arcade", name: "Arcade", description: "Classic pick-up-and-play score chasers." },
  { slug: "adventure", name: "Adventure", description: "Explore worlds and uncover stories." },
  { slug: "sports", name: "Sports", description: "Compete in every game under the sun." },
  { slug: "strategy", name: "Strategy", description: "Plan, build and outthink your rivals." },
  { slug: "casual", name: "Casual", description: "Relaxed games for a quick break." },
];

export const games: Game[] = [];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getGame = (slug: string) => games.find((g) => g.slug === slug);
export const gamesInCategory = (slug: string) => games.filter((g) => g.categories.includes(slug));
