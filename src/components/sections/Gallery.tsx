import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Instagram } from "@/components/ui/instagram-icon";
import { gallery, profile } from "@/data/profile";
import { Reveal, SectionLabel } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const layout = ["row-span-2", "row-span-2", "row-span-2", "", ""];

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i! + 1) % gallery.length);
      if (e.key === "ArrowLeft") setOpen((i) => (i! - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section id="galeria" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionLabel index="04">Galeria</SectionLabel>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="font-display text-4xl font-bold uppercase leading-tight sm:text-5xl">
              Em <span className="text-accent">campo</span>
            </h2>
            <a
              href={profile.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-fg"
            >
              <Instagram className="h-4 w-4" /> Ver as 411 publicações
            </a>
          </div>
        </Reveal>

        <div className="mt-14 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] md:grid-cols-4">
          {gallery.map((g, i) => (
            <Reveal key={g.src} delay={i * 0.06} className={cn(layout[i])}>
              <motion.button
                type="button"
                layoutId={`photo-${i}`}
                onClick={() => setOpen(i)}
                aria-label={`Ampliar foto: ${g.label}`}
                className="group relative h-full w-full overflow-hidden rounded-2xl border border-line bg-surface"
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale-[40%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 flex w-full items-center justify-between p-4">
                  <span className="font-display text-sm font-semibold uppercase tracking-widest">{g.label}</span>
                  <span className="font-mono text-xs text-hud">0{i + 1}</span>
                </div>
              </motion.button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={gallery[open].label}
          >
            <motion.img
              layoutId={`photo-${open}`}
              src={gallery[open].src}
              alt={gallery[open].alt}
              className="max-h-[85vh] max-w-full rounded-2xl border border-white/10 object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button type="button" aria-label="Fechar" onClick={() => setOpen(null)} className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-bg/60">
              <X className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Foto anterior"
              onClick={(e) => {
                e.stopPropagation();
                setOpen((open - 1 + gallery.length) % gallery.length);
              }}
              className="absolute left-4 grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-bg/60"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Próxima foto"
              onClick={(e) => {
                e.stopPropagation();
                setOpen((open + 1) % gallery.length);
              }}
              className="absolute right-4 grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-bg/60"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
