# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS

## Manual HTML5 game catalog

The catalog is `src/lib/games.json` and intentionally contains only `[]` until real games are supplied. Do not add generated games, demos, or sample images.

Each registration needs a unique lowercase hyphenated `slug`, a `title`, the actual `thumbnail` path, a `category` slug, and a local `gamePath`. Put the supplied HTML5 folder under `public/games/` and reference its public path beginning with `/games/`. Folder paths resolve to `index.html`; an explicit `.html` entry file is preserved. Use `categories` for multiple categories. Existing `embedUrl` registrations remain supported.

Optional fields: `description`, `instructions`, `addedAt` (ISO timestamp for New Games ordering), and `popularity` (a manually supplied nonnegative ranking for Popular Games; not automatic analytics). The catalog drives the homepage, game pages, search, and category pages automatically. No registration examples or game assets are bundled.

The Contact Us page awaits the owner's contact address. Sitemap creation awaits a published public site address; robots.txt is preserved without a preview-domain sitemap directive.

## Cloudflare Workers deployment

Configured using the [official Cloudflare TanStack Start guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/). The Lovable Vite wrapper still supplies React, TanStack Start, Tailwind, path aliases and diagnostics. Nitro is disabled and removed; the Cloudflare Vite plugin is the sole deployment adapter.

`wrangler.jsonc` names the Worker `plyvion`, uses the existing `src/server.ts` error-handling entrypoint, enables Node compatibility and observability, and sets the compatibility date to 2026-11-21. The plugin generates the deployment configuration and static-asset wiring during the build. No Cloudflare account ID, credentials, domain or secrets are stored in the repository.

Commands from the project root:

```sh
bun install --frozen-lockfile
bun run build       # Production build only; does not deploy
bun run preview     # Preview the production build locally
bun run cf-typegen  # Generate Cloudflare binding types when needed
bunx wrangler login # Sign in to your Cloudflare account
bun run deploy      # Builds, then deploys ONLY when explicitly invoked
```

Do not run `deploy` until ready to publish. Select your Cloudflare account when prompted. GitHub/Workers Builds can use `bun run build` as the build command and `bunx wrangler deploy` as the deployment command; enabling that integration is a separate, explicit publishing decision. Keep `.dev.vars` and `.wrangler/` untracked as already configured. The design, content routes, SEO metadata, robots.txt and empty JSON catalog are unchanged.
