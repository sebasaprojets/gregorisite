import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Crosshair, Droplet, Plus, ShieldHalf, Stethoscope } from "lucide-react";
import { services } from "@/data/profile";
import { Reveal, SectionLabel } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const icons = { droplet: Droplet, cross: Stethoscope, target: Crosshair, shield: ShieldHalf };
const ease = [0.16, 1, 0.3, 1] as const;

type Service = (typeof services)[number];

function ServiceIcon({ icon, size = "lg" }: { icon: Service["icon"]; size?: "sm" | "lg" }) {
  const Icon = icons[icon];
  return (
    <div className={cn("relative grid place-items-center", size === "lg" ? "h-20 w-20" : "h-14 w-14")}>
      <m.span
        className="absolute inset-0 rounded-full border border-dashed border-hud/50"
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
      <span className="absolute inset-2 rounded-full bg-accent/15" />
      <Icon className={cn("relative text-accent-soft", size === "lg" ? "h-8 w-8" : "h-6 w-6")} />
    </div>
  );
}

function CTA() {
  return (
    <a
      href="#contato"
      className="mt-6 inline-flex min-h-11 w-fit items-center gap-2 border-b border-accent pb-1 font-display text-sm font-semibold uppercase tracking-widest text-fg transition-colors hover:text-accent-soft"
    >
      Quero participar
    </a>
  );
}

export function Services() {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section id="treinamentos" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="absolute right-0 top-1/3 -z-10 h-[640px] w-[640px] glow-red-soft" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionLabel index="03">Treinamentos</SectionLabel>
          <h2 className="max-w-3xl font-display text-4xl font-bold uppercase leading-tight sm:text-5xl">
            Preparação para o <span className="text-accent">momento crítico</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <ul className="space-y-2">
            {services.map((s, i) => {
              const isActive = active === i;
              return (
                <li key={s.id} className="relative">
                  {isActive && (
                    <m.span
                      layoutId="service-bg"
                      className="absolute inset-0 rounded-2xl border border-accent/40 bg-gradient-to-r from-accent/15 to-transparent"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <button
                    type="button"
                    aria-expanded={isActive}
                    aria-controls={`servico-${s.id}`}
                    onClick={() => setActive(i)}
                    onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                    className={cn(
                      "relative flex min-h-16 w-full touch-manipulation items-center gap-5 rounded-2xl px-5 py-5 text-left transition-colors",
                      isActive ? "text-fg" : "text-muted hover:text-fg active:text-fg",
                    )}
                  >
                    <span className="font-mono text-sm text-accent-soft">{s.id}</span>
                    <span className="flex-1 font-display text-xl font-semibold uppercase tracking-wide sm:text-2xl">{s.title}</span>
                    <Plus className={cn("h-5 w-5 shrink-0 transition-transform duration-300", isActive && "rotate-45 text-accent-soft")} />
                  </button>

                  {/* Celular e tablet: o conteúdo abre logo abaixo do item tocado */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <m.div
                        id={`servico-${s.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease }}
                        className="relative overflow-hidden lg:hidden"
                      >
                        <div className="flex gap-5 px-5 pb-6 pt-1">
                          <ServiceIcon icon={s.icon} size="sm" />
                          <div className="min-w-0 flex-1">
                            <p className="leading-relaxed text-muted">{s.text}</p>
                            <CTA />
                          </div>
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          {/* Desktop: painel ao lado */}
          <div className="relative hidden min-h-[340px] overflow-hidden rounded-3xl border border-line bg-surface/70 p-10 lg:block">
            <div aria-hidden className="bg-grid absolute inset-0 opacity-50" />
            <AnimatePresence mode="wait">
              <m.div
                key={current.id}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                transition={{ duration: 0.4, ease }}
                className="relative flex h-full flex-col"
              >
                <div className="mb-8">
                  <ServiceIcon icon={current.icon} />
                </div>
                <div className="font-mono text-xs uppercase tracking-[0.25em] text-hud">Módulo {current.id}</div>
                <h3 className="mt-3 font-display text-4xl font-bold uppercase">{current.title}</h3>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">{current.text}</p>
                <CTA />
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
