import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
export const Route = createFileRoute("/terms")({
  head: () => ({ meta: seo("Terms and Conditions — Plyvion", "Terms for browsing and playing registered games on Plyvion.") }),
  component: () => <div className="mx-auto max-w-3xl px-4 py-10"><h1 className="font-display text-3xl font-bold">Terms and Conditions</h1><p className="mt-4 text-muted-foreground">Use Plyvion lawfully and respect the rights of game creators. Do not misuse the website or redistribute game content without permission. Individual games may be subject to their owners’ additional terms.</p></div>,
});
