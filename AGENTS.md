<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Portal architecture
- Keep manual game registrations in `src/lib/games.json`, validated and normalized by `src/lib/catalog.ts`; a single source drives homepage, categories, search and game URLs without persistence services.
- Serve user-supplied local HTML5 folders from `public/` and normalize their catalog folder paths to an index.html entry; preserve explicit entry files and legacy HTTPS embed URLs.
- Keep global navigation in the root Header with accessible Radix dialogs and CSS-token light/dark themes; browsing pages share the thumbnail grid without a marketing shell or footer.

## Deployment architecture
- Use the Cloudflare Vite plugin before the wrapper-provided TanStack stack and set `nitro: false`; exactly one deployment adapter avoids competing output pipelines.
- Point Wrangler to the existing `src/server.ts` custom entrypoint and let the Cloudflare Vite plugin generate deployment assets; preserve the SSR error wrapper without hardcoding build paths.
- Deploy only through an explicitly invoked deployment command; configuration changes must never automatically publish the site.
