import { ArrowUpRight } from "lucide-react";
import { credentials } from "@/data/profile";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Reveal, SectionLabel } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

// Bento grid: o primeiro card (Vikings) ocupa mais espaço.
const spans = ["md:col-span-2 md:row-span-2", "", "", "", "", "md:col-span-4"];

export function Credentials() {
  return (
    <section id="credenciais" className="relative py-24 sm:py-32">
      <div aria-hidden className="bg-grid mask-radial absolute inset-0 -z-10 opacity-60" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionLabel index="03">Credenciais</SectionLabel>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="max-w-2xl font-display text-4xl font-bold uppercase leading-tight sm:text-5xl">
              Onde Gregori <span className="text-accent">atua</span>
            </h2>
            <p className="max-w-sm text-muted">Liderança, instrução e voluntariado. Toque em um card para abrir o perfil da organização.</p>
          </div>
        </Reveal>

        <div className="mt-14 grid auto-rows-[minmax(200px,auto)] gap-4 md:grid-cols-4">
          {credentials.map((c, i) => (
            <Reveal key={c.code} delay={i * 0.06} className={cn(spans[i])}>
              <a href={c.href} target="_blank" rel="noopener noreferrer" className="block h-full touch-manipulation rounded-2xl transition-transform duration-200 active:scale-[0.98]" aria-label={`${c.title}: ${c.role}. Abrir no Instagram`}>
                <SpotlightCard className="flex h-full flex-col">
                  <div className={cn("flex h-full flex-col justify-between gap-8 p-6", i === 0 && "md:p-9")}>
                    <div className="flex items-start justify-between">
                      <span className="rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-xs font-medium tracking-widest text-accent-soft">
                        {c.code}
                      </span>
                      <ArrowUpRight className="h-5 w-5 text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-fg" />
                    </div>

                    {i === 0 && (
                      <img src="images/vikings-logo.webp" alt="" className="h-24 w-24 rounded-full border border-white/10 object-cover md:h-32 md:w-32" />
                    )}

                    <div>
                      <div className="font-mono text-xs uppercase tracking-widest text-hud">{c.role}</div>
                      <h3 className={cn("mt-2 font-display font-bold uppercase", i === 0 ? "text-3xl md:text-5xl" : "text-2xl")}>{c.title}</h3>
                      <p className={cn("mt-2 text-muted", i === 0 && "md:max-w-md md:text-lg")}>{c.description}</p>
                      <div className="mt-4 font-mono text-xs text-muted">{c.org}</div>
                    </div>
                  </div>
                </SpotlightCard>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
