import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Flashlight } from "lucide-react";
import { useIsTouch } from "@/lib/use-touch";
import { SectionLabel } from "@/components/ui/reveal";

// O shader WebGL só é baixado quando a seção está chegando na tela, para não
// pesar no carregamento inicial nem no HTML pré-renderizado.
const FlashlightTextReveal = lazy(() => import("@/components/ui/flashlight-text-reveal"));

const TEXT = "QUANDO CADA\nSEGUNDO\nCONTA";
const FONT = '"Chakra Petch", Impact, "Arial Narrow Bold", sans-serif';
const GHOST = 0.05;
const WALL = ["#0B0C0E", "#2B1014", "#6E1A26"];

/**
 * `near`: a seção chegou perto da tela (uma vez só) — hora de baixar o shader.
 * `onScreen`: está visível agora — fora dela o shader é pausado, para não
 * gastar bateria enquanto a pessoa lê o resto da página.
 */
function useNearViewport<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [near, setNear] = useState(false);
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setOnScreen(entry.isIntersecting);
        if (entry.isIntersecting) setNear(true);
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, near, onScreen] as const;
}

/** A parede antes do shader carregar (e no HTML pré-renderizado). */
function Wall() {
  return (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{ background: `radial-gradient(circle at 50% 45%, ${WALL[1]} 0%, ${WALL[0]} 60%)` }}
    />
  );
}

export function Manifesto() {
  const [ref, near, onScreen] = useNearViewport<HTMLDivElement>();
  const touch = useIsTouch();

  const label = (
    <div className="pointer-events-none flex h-full w-full flex-col justify-between p-5 sm:p-8">
      <SectionLabel index="01">Manifesto</SectionLabel>
      <div className="flex items-center gap-3 self-end font-mono text-xs uppercase tracking-[0.25em] text-muted">
        <Flashlight className="h-4 w-4 text-accent" />
        {touch ? "Arraste o dedo para iluminar" : "Mova o cursor para iluminar"}
      </div>
    </div>
  );

  return (
    <section id="manifesto" aria-label="Manifesto" className="relative">
      <div ref={ref} className="relative overflow-hidden border-y border-line">
        {near ? (
          <Suspense
            fallback={
              <div className="relative h-[min(88svh,760px)]">
                <Wall />
              </div>
            }
          >
            <FlashlightTextReveal
              text={TEXT}
              textColor="#f2f5f7"
              fontFamily={FONT}
              fontSize="clamp(2.4rem, 8.5vw, 7rem)"
              ghost={GHOST}
              colors={WALL}
              height="min(88svh, 760px)"
              // No celular o dedo tapa o ponto exato, então a luz é mais larga;
              // sem desfoque e com menos granulado o shader fica bem mais leve.
              paused={!onScreen}
              // O shader preenche a tela toda: no celular render a menos de um
              // pixel físico por pixel CSS corta quase metade do trabalho.
              maxDpr={touch ? 1.25 : 2}
              radius={touch ? 0.46 : 0.34}
              blur={touch ? 0 : 0.016}
              grain={touch ? 0.09 : 0.14}
              speed={0.7}
              scale={2.4}
              intensity={0.6}
              contrast={0.95}
              brightness={-0.08}
              hue={0}
              drift={0.03}
              seed={7}
            >
              {label}
            </FlashlightTextReveal>
          </Suspense>
        ) : (
          <div className="relative h-[min(88svh,760px)]">
            <Wall />
            {/* O texto fica no HTML desde o início: leitores de tela e o Google leem tudo. */}
            <div
              className="absolute inset-0 flex items-center justify-center px-6 text-center uppercase"
              style={{
                color: "#f2f5f7",
                opacity: GHOST,
                fontFamily: FONT,
                fontSize: "clamp(2.4rem, 8.5vw, 7rem)",
                lineHeight: 0.88,
                whiteSpace: "pre-line",
              }}
            >
              <p className="m-0">{TEXT}</p>
            </div>
            <div className="relative z-10 h-full w-full">{label}</div>
          </div>
        )}
      </div>
    </section>
  );
}
