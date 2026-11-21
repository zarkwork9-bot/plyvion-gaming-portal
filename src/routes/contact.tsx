import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
export const Route = createFileRoute("/contact")({
  head: () => ({ meta: seo("Contact Us — Plyvion", "Contact information for the Plyvion gaming portal.") }),
  component: () => <div className="mx-auto max-w-3xl px-4 py-10"><h1 className="font-display text-3xl font-bold">Contact Us</h1><p className="mt-4 text-muted-foreground">Contact details are not available yet.</p></div>,
});
