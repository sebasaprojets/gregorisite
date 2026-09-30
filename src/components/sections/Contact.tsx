import { MessageCircle } from "lucide-react";
import { Instagram } from "@/components/ui/instagram-icon";
import { credentials, profile } from "@/data/profile";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { HudCorners } from "@/components/ui/hud-corners";
import { Reveal, SectionLabel } from "@/components/ui/reveal";

export function Contact() {
  return (
    <section id="contato" className="px-4 py-24 sm:px-6 sm:py-32">
      <Reveal className="mx-auto max-w-6xl">
        <div className="noise relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-surface-2 via-surface to-bg px-6 py-16 text-center sm:px-12 sm:py-24">
          <div aria-hidden className="bg-grid mask-radial absolute inset-0" />
          <div aria-hidden className="absolute left-1/2 top-0 h-96 w-[44rem] -translate-x-1/2 -translate-y-1/3 glow-red" />
          <HudCorners className="inset-5" />

          <div className="relative">
            <div className="flex justify-center">
              <SectionLabel index="06">Contato</SectionLabel>
            </div>
            <img src="images/avatar.webp" alt="Foto de perfil de Gregori Silva" className="mx-auto mb-6 h-20 w-20 rounded-full border-2 border-accent/60 object-cover" />
            <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold uppercase leading-tight sm:text-6xl">
              Leve este treinamento para <span className="text-accent">sua equipe</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
              Cursos, workshops e palestras para empresas, equipes de segurança e grupos. Mande uma mensagem e combine os detalhes.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <MagneticButton href={profile.dm} external>
                <MessageCircle className="h-4 w-4" /> Enviar mensagem
              </MagneticButton>
              <MagneticButton href={profile.instagram} external variant="ghost">
                <Instagram className="h-4 w-4" /> @{profile.handle}
              </MagneticButton>
            </div>
          </div>
        </div>
      </Reveal>

      <footer className="mx-auto mt-16 max-w-6xl border-t border-line pt-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="font-display text-lg font-bold tracking-wider">
            GREGORI <span className="text-accent">SILVA</span>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-muted">
            {credentials.map((c) => (
              <li key={c.code}>
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="inline-block py-2 transition-colors hover:text-fg">
                  {c.org}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 pb-4 font-mono text-xs text-muted">© {new Date().getFullYear()} Gregori Silva. Todos os direitos reservados.</p>
      </footer>
    </section>
  );
}
