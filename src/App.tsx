import { LazyMotion, MotionConfig } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Credentials } from "@/components/sections/Credentials";
import { Services } from "@/components/sections/Services";
import { Gallery } from "@/components/sections/Gallery";
import { Contact } from "@/components/sections/Contact";
import { SiteBackground, ViewportFrame } from "@/components/ui/site-background";

const loadFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);

export default function App() {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">
        <a href="#sobre" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2">
          Pular para o conteúdo
        </a>
        <SiteBackground />
        <ViewportFrame />
        <Navbar />
        <main>
          <Hero />
          {/* Abaixo do hero o fundo continua, um pouco mais escuro para o texto ler bem */}
          <div className="bg-[linear-gradient(to_bottom,transparent,rgb(7_8_10/0.62)_16rem)]">
            <About />
            <Credentials />
            <Services />
            <Gallery />
            <Contact />
          </div>
        </main>
      </MotionConfig>
    </LazyMotion>
  );
}
