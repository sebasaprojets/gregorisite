import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, MessageCircle, ShieldCheck } from "lucide-react";
import { profile } from "@/data/profile";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ScrambleText } from "@/components/ui/scramble-text";
import { TiltCard } from "@/components/ui/tilt-card";
import { HudCorners } from "@/components/ui/hud-corners";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yImg = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="top" className="noise relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16">
      {/* Fundo: grade, brilhos e linha de varredura */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="bg-grid mask-radial absolute inset-0" />
        <div className="absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-accent/20 blur-[140px]" />
        <div className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-hud/10 blur-[140px]" />
        <div className="absolute inset-x-0 top-0 h-40 animate-scan bg-gradient-to-b from-transparent via-hud/[0.05] to-transparent" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div style={{ y: yText, opacity }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-2 pr-4 font-mono text-xs uppercase tracking-[0.2em] text-muted backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            CEO · Vikings Tactical Group
          </motion.div>

          <h1 className="font-display text-[clamp(3rem,9vw,6.5rem)] font-bold uppercase leading-[0.9] tracking-tight">
            <ScrambleText text="Gregori" className="block text-gradient" />
            <ScrambleText text="Silva" delay={0.25} className="block text-accent" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
          >
            {profile.role}. Instrutor <span className="text-fg">Stop the Bleed</span>,{" "}
            <span className="text-fg">TECC/TCCC</span>, <span className="text-fg">NATI Tática Brasil</span> e{" "}
            <span className="text-fg">C3 Cursos</span>. {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <MagneticButton href={profile.dm} external>
              <MessageCircle className="h-4 w-4" /> Falar com Gregori
            </MagneticButton>
            <MagneticButton href="#treinamentos" variant="ghost">
              Ver treinamentos <ArrowDown className="h-4 w-4" />
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: yImg }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease }}
          className="relative mx-auto w-full max-w-sm"
        >
          <TiltCard className="aspect-[3/4]">
            <div className="absolute inset-0 overflow-hidden rounded-3xl border border-white/10 bg-surface">
              <img
                src="images/retrato.webp"
                alt="Retrato de Gregori Silva"
                className="h-full w-full object-cover object-top grayscale-[35%] contrast-110"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-transparent" />
              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0_3px,rgba(0,0,0,0.18)_3px_4px)]" />
            </div>
            <HudCorners className="-inset-3" />

            <div style={{ transform: "translateZ(60px)" }} className="absolute left-3 bottom-10 rounded-xl border border-white/10 bg-bg/80 px-4 py-3 backdrop-blur-md sm:-left-10">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-hud">
                <ShieldCheck className="h-4 w-4" /> Status
              </div>
              <div className="mt-1 font-display text-sm font-semibold">Instrutor certificado</div>
            </div>
            <div style={{ transform: "translateZ(40px)" }} className="absolute right-3 top-8 sm:-right-4 rounded-xl border border-white/10 bg-bg/80 px-4 py-3 font-mono text-[11px] uppercase leading-5 tracking-widest text-muted backdrop-blur-md">
              <div>ID // @{profile.handle}</div>
              <div className="text-accent-soft">APH · Tático</div>
            </div>
          </TiltCard>
        </motion.div>
      </div>

      <motion.a
        href="#sobre"
        aria-label="Rolar para a próxima seção"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted md:flex"
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-white/10">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-accent"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
