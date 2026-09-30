import { MotionConfig } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Credentials } from "@/components/sections/Credentials";
import { Services } from "@/components/sections/Services";
import { Gallery } from "@/components/sections/Gallery";
import { Contact } from "@/components/sections/Contact";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#sobre" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2">
        Pular para o conteúdo
      </a>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Credentials />
        <Services />
        <Gallery />
        <Contact />
      </main>
    </MotionConfig>
  );
}
