import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Moon, Search, Sun, Home, Clock3, Flame, Grid2X2, Flag, Puzzle, Zap, Trophy, Compass, Joystick, Info, Mail, Shield, FileWarning, FileText, Brain, Coffee } from "lucide-react";
import { categories } from "@/lib/catalog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const browseLinks = [
  { to: "/", label: "Home", icon: Home },
  { to: "/new-games", label: "New Games", icon: Clock3 },
  { to: "/popular-games", label: "Popular Games", icon: Flame },
  { to: "/games", label: "All Games", icon: Grid2X2 },
] as const;
const infoLinks = [
  { to: "/about", label: "About Us", icon: Info },
  { to: "/contact", label: "Contact Us", icon: Mail },
  { to: "/privacy", label: "Privacy Policy", icon: Shield },
  { to: "/disclaimer", label: "Disclaimer", icon: FileWarning },
  { to: "/terms", label: "Terms and Conditions", icon: FileText },
] as const;
const categoryOrder = ["racing", "puzzle", "action", "sports", "adventure", "arcade", "strategy", "casual"];
const categoryIcons = [Flag, Puzzle, Zap, Trophy, Compass, Joystick, Brain, Coffee];
const linkClass = "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent";

export function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [dark, setDark] = useState(false);
  useEffect(() => {
    try {
      const savedDark = localStorage.getItem("plyvion-theme") === "dark";
      setDark(savedDark);
      document.documentElement.classList.toggle("dark", savedDark);
    } catch { /* Light theme remains usable when storage is unavailable. */ }
  }, []);
  function toggleTheme() {
    const nextDark = !dark;
    setDark(nextDark);
    document.documentElement.classList.toggle("dark", nextDark);
    try { localStorage.setItem("plyvion-theme", nextDark ? "dark" : "light"); } catch { /* Theme still changes for this visit. */ }
  }
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="flex h-16 items-center gap-2 px-3 sm:gap-3 sm:px-5 lg:px-6">
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild><Button variant="ghost" size="icon" className="h-10 w-10 shrink-0" aria-label="Open menu" title="Open menu"><Menu className="!h-6 !w-6" /></Button></SheetTrigger>
          <SheetContent side="left" className="w-[min(320px,88vw)] overflow-y-auto px-4 py-5" aria-describedby={undefined}>
            <SheetTitle className="font-display mb-5 px-3 text-xl font-bold">PLY<span className="text-primary">VION</span></SheetTitle>
            <nav aria-label="Main menu">
              {browseLinks.map(({ to, label, icon: Icon }) => <Link key={to} to={to} activeOptions={{ exact: true }} activeProps={{ className: "bg-accent text-primary" }} onClick={() => setMenuOpen(false)} className={linkClass}><Icon className="h-4 w-4" />{label}</Link>)}
              <div className="my-3 border-t border-border" />
              {categoryOrder.map((slug, index) => {
                const category = categories.find((item) => item.slug === slug);
                const Icon = categoryIcons[index] ?? Grid2X2;
                if (!category) return null;
                return <Link key={slug} to="/categories/$slug" params={{ slug }} onClick={() => setMenuOpen(false)} activeProps={{ className: "bg-accent text-primary" }} className={linkClass}><Icon className="h-4 w-4" />{category.name}</Link>;
              })}
              <div className="my-3 border-t border-border" />
              {infoLinks.map(({ to, label, icon: Icon }) => <Link key={to} to={to} onClick={() => setMenuOpen(false)} className={linkClass}><Icon className="h-4 w-4" />{label}</Link>)}
            </nav>
          </SheetContent>
        </Sheet>
        <Link to="/" aria-label="Plyvion home" className="font-display shrink-0 text-2xl font-bold leading-none sm:text-3xl">PLY<span className="text-primary">VION</span></Link>
        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
          <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
            <DialogTrigger asChild><Button variant="ghost" size="icon" className="h-10 w-10" aria-label="Search games" title="Search games"><Search className="!h-5 !w-5" /></Button></DialogTrigger>
            <DialogContent aria-describedby={undefined} className="w-[calc(100%-2rem)] rounded-lg">
              <DialogTitle>Search games</DialogTitle>
              <form onSubmit={(event) => { event.preventDefault(); setSearchOpen(false); void navigate({ to: "/search", search: { q: query } }); }}>
                <Input type="search" aria-label="Game title" placeholder="Search games" value={query} onChange={(event) => setQuery(event.target.value)} />
                <Button type="submit" className="mt-3 w-full"><Search />Search</Button>
              </form>
            </DialogContent>
          </Dialog>
          <Button variant="ghost" size="icon" className="h-10 w-10" onClick={toggleTheme} aria-label={dark ? "Switch to light theme" : "Switch to dark theme"} title={dark ? "Light theme" : "Dark theme"}>{dark ? <Sun className="!h-5 !w-5" /> : <Moon className="!h-5 !w-5" />}</Button>
        </div>
      </div>
    </header>
  );
}
