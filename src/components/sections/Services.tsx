import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Crosshair, Droplet, Plus, ShieldHalf, Stethoscope } from "lucide-react";
import { services } from "@/data/profile";
import { Reveal, SectionLabel } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const icons = { droplet: Droplet, cross: Stethoscope, target: Crosshair, shield: ShieldHalf };

export function Services() {
  const [active, setActive] = useState(0);
  const current = services[active];
  const Icon = icons[current.icon];

  return (
    <section id="treinamentos" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="absolute right-0 top-1/3 -z-10 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[160px]" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionLabel index="03">Treinamentos</SectionLabel>
          <h2 className="max-w-3xl font-display text-4xl font-bold uppercase leading-tight sm:text-5xl">
            Preparação para o <span className="text-accent">momento crítico</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <ul className="space-y-2" role="tablist" aria-label="Treinamentos">
            {services.map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={cn(
                    "relative flex w-full items-center gap-5 rounded-2xl px-5 py-5 text-left transition-colors",
                    active === i ? "text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {active === i && (
                    <motion.span
                      layoutId="service-bg"
                      className="absolute inset-0 rounded-2xl border border-accent/40 bg-gradient-to-r from-accent/15 to-transparent"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative font-mono text-sm text-accent-soft">{s.id}</span>
                  <span className="relative flex-1 font-display text-xl font-semibold uppercase tracking-wide sm:text-2xl">{s.title}</span>
                  <Plus className={cn("relative h-5 w-5 transition-transform duration-300", active === i && "rotate-45 text-accent-soft")} />
                </button>
              </li>
            ))}
          </ul>

          <div className="relative min-h-[340px] overflow-hidden rounded-3xl border border-line bg-surface/70 p-8 sm:p-10">
            <div aria-hidden className="bg-grid absolute inset-0 opacity-50" />
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                role="tabpanel"
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex h-full flex-col"
              >
                <div className="relative mb-8 grid h-20 w-20 place-items-center">
                  <motion.span
                    className="absolute inset-0 rounded-full border border-dashed border-hud/50"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="absolute inset-2 rounded-full bg-accent/15" />
                  <Icon className="relative h-8 w-8 text-accent-soft" />
                </div>
                <div className="font-mono text-xs uppercase tracking-[0.25em] text-hud">Módulo {current.id}</div>
                <h3 className="mt-3 font-display text-3xl font-bold uppercase sm:text-4xl">{current.title}</h3>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">{current.text}</p>
                <a
                  href="#contato"
                  className="mt-8 inline-flex min-h-11 w-fit items-center gap-2 border-b border-accent pb-1 font-display text-sm font-semibold uppercase tracking-widest text-fg transition-colors hover:text-accent-soft"
                >
                  Quero participar
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
