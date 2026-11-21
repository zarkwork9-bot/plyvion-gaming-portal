import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import type { ConfigEnv } from "vite";

// Keep the wrapper's single React/TanStack/Tailwind plugin stack and preview support.
// Replace its deployment adapter, rather than adding Cloudflare alongside Nitro.
const baseConfig = defineConfig({
  nitro: false,
});

export default async function config(env: ConfigEnv) {
  const base = await baseConfig(env);
  return {
    ...base,
    // Cloudflare must precede TanStack Start, as in Cloudflare's official guide.
    plugins: [cloudflare({ viteEnvironment: { name: "ssr" } }), ...(base.plugins ?? [])],
  };
}
