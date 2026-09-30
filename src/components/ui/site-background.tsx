// Fundo fixo do site inteiro: fumaça vermelha, luz no chão e silhuetas
// (imagens geradas por scripts/gen-bg.mjs), mais a moldura de mira nos cantos.
export function SiteBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 -z-20 h-lvh overflow-hidden bg-bg">
      <picture>
        <source media="(min-width: 768px)" srcSet="images/bg-desktop.webp" />
        <img
          src="images/bg-mobile.webp"
          alt=""
          decoding="async"
          fetchPriority="high"
          className="animate-drift absolute inset-0 h-full w-full object-cover will-change-transform"
        />
      </picture>
      {/* Cintilar da luz vermelha no chão */}
      <div className="animate-flicker absolute bottom-[18%] left-0 h-24 w-3/4 glow-red opacity-60 md:w-1/2" />
      <div className="bg-grid absolute inset-0 opacity-40" />
      {/* Celular: escurece um pouco atrás do texto para manter a leitura */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/55 via-bg/40 to-bg/10 md:hidden" />
    </div>
  );
}

// Cantoneiras vermelhas nas bordas da tela e traço vertical à esquerda (só telas maiores).
export function ViewportFrame() {
  const c = "absolute h-12 w-12 border-accent/70";
  return (
    <div aria-hidden className="pointer-events-none fixed inset-4 z-40 hidden lg:block xl:inset-6">
      <span className={`${c} left-0 top-0 border-l border-t`} />
      <span className={`${c} right-0 top-0 border-r border-t`} />
      <span className={`${c} bottom-0 left-0 border-b border-l`} />
      <span className={`${c} bottom-0 right-0 border-b border-r`} />
      <span className="absolute left-0 top-[18%] h-[62%] w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <span className="absolute left-0 top-[42%] h-16 w-[2px] -translate-x-px bg-accent shadow-[0_0_12px_rgba(229,36,59,0.9)]" />
      <span className="absolute right-0 top-[18%] h-[62%] w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
    </div>
  );
}
