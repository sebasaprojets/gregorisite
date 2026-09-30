import type { ReactNode } from "react";
import { motion } from "framer-motion";

// Entrada suave ao rolar a página.
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
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
