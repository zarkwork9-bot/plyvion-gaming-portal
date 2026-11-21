import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { categories } from "@/lib/catalog";

const nav = [
  { to: "/", label: "Home" },
  { to: "/games", label: "All Games" },
  { to: "/categories", label: "Categories" },
  { to: "/about", label: "About" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
        <button aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)} className="rounded-md p-2 hover:bg-accent">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <Link to="/" className="font-display text-xl font-bold tracking-wider">
          PLY<span className="text-primary">VION</span>
        </Link>
        <nav className="ml-auto hidden gap-6 md:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }} className="text-sm text-muted-foreground hover:text-foreground" activeProps={{ className: "text-primary" }}>
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
      {open && (
        <>
          <div className="fixed inset-0 top-16 z-40 bg-background/60" onClick={() => setOpen(false)} />
          <aside className="fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-72 overflow-y-auto border-r border-border bg-card p-4">
            <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Menu</p>
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 hover:bg-accent">{n.label}</Link>
            ))}
            <p className="mb-2 mt-6 text-xs uppercase tracking-widest text-muted-foreground">Categories</p>
            {categories.map((c) => (
              <Link key={c.slug} to="/categories/$slug" params={{ slug: c.slug }} onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 hover:bg-accent" activeProps={{ className: "text-primary" }}>{c.name}</Link>
            ))}
          </aside>
        </>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Plyvion. Free online HTML5 games.</p>
        <div className="flex gap-4">
          <Link to="/about" className="hover:text-foreground">About</Link>
          <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
