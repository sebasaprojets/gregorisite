import { HeartPulse, LifeBuoy, Swords } from "lucide-react";
import { profile, credentials } from "@/data/profile";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Marquee } from "@/components/ui/marquee";
import { Reveal, SectionLabel } from "@/components/ui/reveal";

const pillars = [
  { icon: Swords, title: "Tático", text: "Instrução de campo, técnica e liderança de equipe." },
  { icon: HeartPulse, title: "Pré-hospitalar", text: "Controle de hemorragias e cuidado a vítimas sob ameaça." },
  { icon: LifeBuoy, title: "Salvamento", text: "Voluntariado na prevenção de afogamentos com a SOBRASA." },
];

export function About() {
  return (
    <section id="sobre" className="relative py-24 sm:py-32">
      <div className="border-y border-line bg-surface/40 py-5">
        <Marquee>
          {credentials.map((c) => (
            <span key={c.code} className="mx-8 flex items-center gap-8 font-display text-xl font-semibold uppercase tracking-wider text-muted sm:text-2xl">
              {c.title}
              <span aria-hidden className="h-2 w-2 rotate-45 bg-accent" />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="mx-auto mt-24 grid max-w-6xl gap-16 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <Reveal>
            <SectionLabel index="02">Sobre</SectionLabel>
            <h2 className="font-display text-4xl font-bold uppercase leading-tight sm:text-5xl">
              Formação que <span className="text-accent">salva vidas</span> dentro e fora do campo.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Gregori Silva é CEO da Vikings Tactical Group e instrutor em várias frentes: treinamento tático pela NATI Tática
              Brasil, controle de hemorragias pelo programa Stop the Bleed, atendimento a vítimas em ambiente tático (TECC/TCCC)
              pela IFIMED ATP e cursos de capacitação pela C3 Cursos. Também é voluntário da SOBRASA.
            </p>
          </Reveal>

          <dl className="mt-10 grid grid-cols-3 gap-3">
            {profile.stats.map((s, i) => (
              <Reveal key={s.label} delay={0.1 + i * 0.08}>
                <div className="rounded-2xl border border-line bg-surface/60 p-4 sm:p-5">
                  <dd className="font-display text-3xl font-bold sm:text-4xl">
                    <AnimatedCounter value={s.value} />
                  </dd>
                  <dt className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted sm:text-xs">{s.label}</dt>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>

        <div className="space-y-4 lg:pt-14">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div className="group flex gap-5 rounded-2xl border border-line bg-gradient-to-br from-surface to-bg p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-accent-soft transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <p.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold uppercase tracking-wide">{p.title}</h3>
                  <p className="mt-1 text-muted">{p.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
