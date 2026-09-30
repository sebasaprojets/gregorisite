import { cn } from "@/lib/utils";

// Cantoneiras estilo mira/HUD em volta de um elemento.
export function HudCorners({ className }: { className?: string }) {
  const base = "absolute h-5 w-5 border-hud/70";
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      <span className={cn(base, "left-0 top-0 border-l-2 border-t-2")} />
      <span className={cn(base, "right-0 top-0 border-r-2 border-t-2")} />
      <span className={cn(base, "bottom-0 left-0 border-b-2 border-l-2")} />
      <span className={cn(base, "bottom-0 right-0 border-b-2 border-r-2")} />
    </div>
  );
}
