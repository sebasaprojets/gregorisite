import { useRef, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

// Card com luz que segue o cursor (padrão "spotlight card" do 21st.dev).
export function SpotlightCard({
  children,
  className,
  color = "rgba(229, 36, 59, 0.18)",
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const background = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, ${color}, transparent 70%)`;

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      onPointerLeave={() => {
        x.set(-400);
        y.set(-400);
      }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-line bg-surface/80 transition-colors duration-300 hover:border-white/15",
        className,
      )}
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background }} />
      <div className="relative">{children}</div>
    </div>
  );
}
