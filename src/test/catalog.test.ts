import { describe, expect, it } from "vitest";
import { games, getGame, gamesInCategory, parseCatalog, searchGames } from "@/lib/catalog";

// Metadata-only fixtures: no game implementation, thumbnails, or public catalog entries.
const registration = { slug: "registered-title", title: "Registered Title", thumbnail: "/supplied-cover.webp", category: "racing", gamePath: "/games/registered-title" };
describe("Manually registered catalog", () => {
  it("starts empty without generated or demo games", () => { expect(games).toEqual([]); });
  it("gives a registered game its title, thumbnail, category and local entry path", () => {
    const [game] = parseCatalog([registration]);
    expect(game?.title).toBe("Registered Title");
    expect(game?.thumbnail).toBe("/supplied-cover.webp");
    expect(game?.categories).toEqual(["racing"]);
    expect(game?.embedUrl).toBe("/games/registered-title/index.html");
  });
  it("preserves explicitly supplied HTML entry files", () => {
    expect(parseCatalog([{ ...registration, gamePath: "/games/registered-title/play.html" }])[0]?.embedUrl).toBe("/games/registered-title/play.html");
  });
  it("rejects duplicate game URLs", () => { expect(() => parseCatalog([registration, registration])).toThrow("Duplicate game URL"); });
  it("rejects unknown categories", () => { expect(() => parseCatalog([{ ...registration, category: "not-a-category" }])).toThrow(); });
  it("finds a manually registered game on its URL, category and search", () => {
    const [game] = parseCatalog([registration]);
    if (!game) throw new Error("Missing registered metadata");
    games.push(game);
    try {
      expect(getGame("registered-title")).toEqual(game);
      expect(gamesInCategory("racing")).toEqual([game]);
      expect(gamesInCategory("puzzle")).toEqual([]);
      expect(searchGames("REGISTERED")).toEqual([game]);
      expect(searchGames("unrelated")).toEqual([]);
    } finally { games.pop(); }
  });
});
