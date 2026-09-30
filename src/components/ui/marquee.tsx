import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Faixa rolando infinitamente; pausa com o mouse em cima.
export function Marquee({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("group relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]", className)}>
      <div className="flex w-max shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused]">
        {children}
        <div aria-hidden className="flex items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
