import { About } from "@/components/about";
import { BackToTop } from "@/components/back-to-top";
import { ChapterRail } from "@/components/chapter-rail";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { MagneticCursor } from "@/components/magnetic-cursor";
import { Navbar } from "@/components/navbar";
import { ScrollProgress } from "@/components/scroll-progress";
import { Skills } from "@/components/skills";
import { Work } from "@/components/work";

export default function Home() {
  return (
    <>
      <MagneticCursor />
      <ScrollProgress />
      <ChapterRail />
      <BackToTop />
      <Navbar />
      <main className="portfolio-flow min-h-screen" id="top">
        <Hero />
        <Work />
        <Skills />
        <Experience />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
