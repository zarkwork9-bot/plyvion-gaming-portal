import fs from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.env.GITHUB_WORKSPACE ?? process.cwd();
const sourceRoot = path.join(root, "source-games");
const publicGames = path.join(root, "public", "games");
const catalogPath = path.join(root, "src", "lib", "games.json");
const registryPath = path.join(sourceRoot, "games", "registry.json");
const requested = (process.env.GAMES ?? "2048").split(",").map((s) => s.trim()).filter(Boolean);
const maxGames = Math.min(50, Math.max(1, Number.parseInt(process.env.MAX_GAMES ?? "10", 10) || 10));
const rightsConfirmed = process.env.CONFIRM_RIGHTS === "true";
if (!rightsConfirmed) throw new Error("Import stopped: confirm redistribution and commercial-use rights for every selected game and asset.");
if (requested.length === 0) throw new Error("Enter game slugs or use all.");
if (requested.length > 1 && requested[0] === "all") throw new Error("Use all by itself.");
const registry = JSON.parse(await fs.readFile(registryPath, "utf8"));
const existing = JSON.parse(await fs.readFile(catalogPath, "utf8"));
if (!Array.isArray(registry.games) || !Array.isArray(existing)) throw new Error("Invalid source registry or Plyvion catalog.");
const categoryMap = { puzzle: "puzzle", arcade: "arcade", shooter: "action", racing: "racing", sports: "sports", platformer: "adventure", casual: "casual", board: "strategy", "word-quiz": "puzzle", "3d": "arcade" };
const known = new Map(registry.games.map((game) => [game.slug, game]));
const selected = requested[0] === "all" ? registry.games.filter((game) => !existing.some((item) => item.slug === game.slug)).slice(0, maxGames) : requested.map((slug) => { const game = known.get(slug); if (!game) throw new Error("Unknown source game slug: " + slug); return game; });
if (selected.length === 0) throw new Error("No new games to import.");
if (selected.length > maxGames) throw new Error("This run exceeds MAX_GAMES=" + maxGames + ".");
const existingSlugs = new Set(existing.map((game) => game.slug));
const imported = []; const skipped = [];
const safeSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
async function inspectFolder(folder) { let files = 0; let bytes = 0; async function walk(current) { for (const entry of await fs.readdir(current, { withFileTypes: true })) { const full = path.join(current, entry.name); if (entry.isSymbolicLink()) throw new Error("Symbolic link not allowed: " + full); if (entry.isDirectory()) await walk(full); else if (entry.isFile()) { files += 1; bytes += (await fs.stat(full)).size; if (files > 600 || bytes > 8 * 1024 * 1024) throw new Error("Game exceeds safety limits (600 files / 8 MB): " + folder); } } } await walk(folder); return { files, bytes }; }
for (const game of selected) {
  if (!safeSlug.test(game.slug)) throw new Error("Unsafe slug: " + game.slug);
  if (existingSlugs.has(game.slug)) { skipped.push({ slug: game.slug, reason: "Already in catalog" }); continue; }
  const relative = String(game.path ?? "");
  if (!relative.startsWith("games/") || relative.includes("..") || path.isAbsolute(relative)) throw new Error("Unsafe source path for " + game.slug);
  const sourceIndex = path.resolve(sourceRoot, relative);
  if (!sourceIndex.startsWith(path.resolve(sourceRoot, "games") + path.sep)) throw new Error("Source path escaped games directory: " + game.slug);
  const sourceFolder = path.dirname(sourceIndex);
  const stat = await fs.stat(sourceIndex).catch(() => null);
  if (!stat?.isFile()) { skipped.push({ slug: game.slug, reason: "Missing entry file: " + relative }); continue; }
  const size = await inspectFolder(sourceFolder);
  const destination = path.join(publicGames, game.slug);
  await fs.rm(destination, { recursive: true, force: true });
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.cp(sourceFolder, destination, { recursive: true, errorOnExist: true });
  const title = String(game.name ?? game.slug).replace(/[<>&"]/g, "");
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#172554"/><stop offset="1" stop-color="#6d28d9"/></linearGradient></defs><rect width="640" height="360" rx="28" fill="url(#g)"/><circle cx="520" cy="80" r="110" fill="#fff" opacity=".08"/><text x="320" y="178" fill="#fff" font-family="Arial" font-size="34" font-weight="700" text-anchor="middle">' + title + '</text><text x="320" y="225" fill="#ddd6fe" font-family="Arial" font-size="18" text-anchor="middle">PLAY ON PLYVION</text></svg>';
  await fs.writeFile(path.join(destination, "plyvion-thumbnail.svg"), svg);
  await fs.writeFile(path.join(destination, "SOURCE-ATTRIBUTION.txt"), "Source: https://github.com/sausi-7/games\nOriginal game path: " + relative + "\nThe source repository has a root MIT license. Verify third-party libraries, fonts, music, artwork and other assets for redistribution and commercial-use rights before monetizing.\n");
  const category = categoryMap[game.category] ?? "arcade";
  existing.push({ slug: game.slug, title: String(game.name ?? game.slug), description: String(game.description ?? ""), thumbnail: "/games/" + game.slug + "/plyvion-thumbnail.svg", category, gamePath: "/games/" + game.slug + "/index.html", instructions: "Use the on-screen instructions and controls shown in the game.", addedAt: new Date().toISOString(), popularity: 0 });
  imported.push({ slug: game.slug, title: game.name ?? game.slug, category, files: size.files, sizeBytes: size.bytes }); existingSlugs.add(game.slug);
}
if (imported.length === 0) throw new Error("Nothing imported. Check slugs and source paths.");
await fs.writeFile(catalogPath, JSON.stringify(existing, null, 2) + "\n");
const report = { generatedAt: new Date().toISOString(), source: "https://github.com/sausi-7/games", imported, skipped, catalogTotal: existing.length, note: "Copied files are not proof of runtime testing or cleared third-party asset rights." };
await fs.writeFile(path.join(root, "import-report.json"), JSON.stringify(report, null, 2) + "\n");
execFileSync("git", ["config", "user.name", "github-actions[bot]"], { cwd: root });
execFileSync("git", ["config", "user.email", "41898282+github-actions[bot]@users.noreply.github.com"], { cwd: root });
execFileSync("git", ["add", "public/games", "src/lib/games.json", "import-report.json"], { cwd: root });
execFileSync("git", ["commit", "-m", "Import " + imported.length + " HTML5 game(s)"], { cwd: root, stdio: "inherit" });
execFileSync("git", ["push"], { cwd: root, stdio: "inherit" });
console.log(JSON.stringify(report, null, 2));