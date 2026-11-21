import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
export const Route = createFileRoute("/disclaimer")({
  head: () => ({ meta: seo("Disclaimer — Plyvion", "Information about game availability and third-party content on Plyvion.") }),
  component: () => <div className="mx-auto max-w-3xl px-4 py-10"><h1 className="font-display text-3xl font-bold">Disclaimer</h1><p className="mt-4 text-muted-foreground">Game content belongs to its respective owners. Third-party games and links may have their own terms and privacy policies. Availability and compatibility can vary by device.</p></div>,
});
