import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: seo("About Plyvion", "Plyvion is a free online gaming portal for HTML5 browser games playable on any device.") }),
  component: () => (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-display text-3xl font-bold">About Plyvion</h1>
      <p className="mt-4 text-muted-foreground">Plyvion is a free gaming portal bringing you HTML5 games that run instantly in your browser — on desktop, tablet and mobile. No installs, no downloads.</p>
    </div>
  ),
});
