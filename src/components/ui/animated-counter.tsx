import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

const fmt = new Intl.NumberFormat("pt-BR");

// Número que conta até o valor final quando entra na tela.
export function AnimatedCounter({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || !ref.current) return;
    if (reduce) {
      ref.current.textContent = fmt.format(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = fmt.format(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
}
