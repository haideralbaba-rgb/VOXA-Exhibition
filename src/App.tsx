import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { initLenis, lenis } from "./lib/lenis";
import Preloader from "./components/Preloader";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import BentoHighlights from "./components/BentoHighlights";
import CinemaStage from "./components/CinemaStage";
import GallerySection from "./components/GallerySection";
import Specs from "./components/Specs";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import SoundExperience from "./components/SoundExperience";
import WorkModal from "./components/WorkModal";
import type { Work } from "./data";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    const destroy = initLenis();
    lenis?.stop();
    return destroy;
  }, []);

  useEffect(() => {
    if (loaded) lenis?.start();
  }, [loaded]);

  const done = useCallback(() => setLoaded(true), []);

  return (
    <div className="relative min-h-screen bg-black text-[#f5f5f7] antialiased selection:bg-[#0071e3] selection:text-white">
      <SoundExperience />
      <AnimatePresence>{!loaded && <Preloader key="pre" onDone={done} />}</AnimatePresence>
      <Nav ready={loaded} />

      <main>
        <Hero ready={loaded} />
        <BentoHighlights onSelectWork={setSelectedWork} />
        <CinemaStage />
        <GallerySection />
        <Specs />
        <About />
        <Services />
      </main>

      <Contact />

      <WorkModal work={selectedWork} onClose={() => setSelectedWork(null)} />
    </div>
  );
}
