import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: seo("Privacy Policy — Plyvion", "How Plyvion handles your information when you play games on our site.") }),
  component: () => (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-display text-3xl font-bold">Privacy Policy</h1>
      <p className="mt-4 text-muted-foreground">Plyvion does not require an account to play. Games embedded on this site may be provided by third parties with their own policies.</p>
    </div>
  ),
});
