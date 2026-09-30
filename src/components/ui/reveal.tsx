import type { ReactNode } from "react";
import { m } from "framer-motion";
import { useIsTouch } from "@/lib/use-touch";

const ease = [0.16, 1, 0.3, 1] as const;

// Entrada suave ao rolar a página. No celular: sem desfoque (caro para a GPU),
// deslocamento menor e mais rápido, para parecer nativo.
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const touch = useIsTouch();
  return (
    <m.div
      className={className}
      initial={touch ? { opacity: 0, y: 18, filter: "none" } : { opacity: 0, y: 28, filter: "blur(6px)" }}
      whileInView={touch ? { opacity: 1, y: 0, filter: "none" } : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: touch ? "0px 0px -40px 0px" : "-80px" }}
      transition={{ duration: touch ? 0.5 : 0.7, delay: touch ? Math.min(delay, 0.15) : delay, ease }}
    >
      {children}
    </m.div>
  );
}

export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted">
      <span className="text-accent-soft">[{index}]</span>
      <span className="h-px w-10 bg-gradient-to-r from-accent to-transparent" />
      <span>{children}</span>
    </div>
  );
}
