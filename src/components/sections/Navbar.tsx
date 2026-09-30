import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Instagram } from "@/components/ui/instagram-icon";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const links = [
  { id: "sobre", label: "Sobre" },
  { id: "credenciais", label: "Credenciais" },
  { id: "treinamentos", label: "Treinamentos" },
  { id: "galeria", label: "Galeria" },
  { id: "contato", label: "Contato" },
];

export function Navbar() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div style={{ scaleX: progress }} className="h-0.5 origin-left bg-gradient-to-r from-accent via-accent-soft to-hud" />
      <nav
        className={cn(
          "mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-full px-4 py-2 transition-all duration-500 sm:px-5",
          scrolled ? "mx-3 border border-white/10 bg-bg/70 shadow-2xl shadow-black/50 backdrop-blur-xl sm:mx-auto" : "border border-transparent",
        )}
        aria-label="Navegação principal"
      >
        <a href="#top" className="flex min-h-11 items-center gap-2 font-display text-lg font-bold tracking-wider">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-accent text-sm text-white">GS</span>
          <span className="hidden sm:inline">GREGORI SILVA</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={cn(
                  "relative block rounded-full px-4 py-2 text-sm transition-colors",
                  active === l.id ? "text-white" : "text-muted hover:text-fg",
                )}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.06]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{l.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={profile.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de Gregori Silva"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-fg transition-colors hover:border-accent hover:text-accent-soft"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-0 -z-10 bg-bg/95 px-6 pt-28 backdrop-blur-xl md:hidden"
          >
            <ul className="space-y-2">
              {links.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.05 }}
                >
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-line py-4 font-display text-3xl font-semibold"
                  >
                    <span className="font-mono text-xs text-accent-soft">0{i + 1}</span>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
