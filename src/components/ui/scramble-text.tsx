import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/<>_";

// Texto que "decodifica" letra por letra, estilo terminal.
export function ScrambleText({ text, delay = 0, className }: { text: string; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  // Começa com o texto real: aparece já no HTML pré-renderizado e só depois embaralha.
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (reduce) return;
    let frame = 0;
    let raf = 0;
    const start = performance.now() + delay * 1000;
    const tick = (now: number) => {
      if (now < start) {
        raf = requestAnimationFrame(tick);
        return;
      }
      frame++;
      const revealed = Math.floor(frame / 2);
      setOut(
        text
          .split("")
          .map((c, i) => (c === " " || i < revealed ? c : CHARS[Math.floor(Math.random() * CHARS.length)]))
          .join(""),
      );
      if (revealed < text.length) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, delay, reduce]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden>{out || " "}</span>
    </span>
  );
}
