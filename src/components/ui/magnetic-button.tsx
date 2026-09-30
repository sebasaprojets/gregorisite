import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  external?: boolean;
};

// Botão que é "atraído" pelo cursor.
export function MagneticButton({ href, children, variant = "primary", className, external }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });

  return (
    <motion.a
      ref={ref}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.25);
        y.set((e.clientY - r.top - r.height / 2) * 0.35);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-7 font-display text-sm font-semibold uppercase tracking-[0.14em] transition-colors",
        variant === "primary"
          ? "bg-accent text-white shadow-[0_0_40px_-8px_rgba(229,36,59,0.8)] hover:bg-accent-soft"
          : "border border-white/15 bg-white/[0.03] text-fg backdrop-blur hover:border-white/35 hover:bg-white/[0.07]",
        className,
      )}
    >
      {variant === "primary" && (
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
        />
      )}
      <span className="relative flex items-center gap-2">{children}</span>
    </motion.a>
  );
}
