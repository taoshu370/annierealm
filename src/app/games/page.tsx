import type { Metadata } from "next";
import Section from "@/components/Section";
import GamesFilter from "@/components/GamesFilter";
import RevealOnScroll from "@/components/RevealOnScroll";
import { getAllGames } from "@/lib/content";

export const metadata: Metadata = {
  title: "Games — AnnieRealm",
  description: "Case studies for shipped games and prototypes — horror, strategy, VR rhythm, and narrative adventure.",
  openGraph: {
    title: "Games — AnnieRealm",
    description: "Case studies for shipped games and prototypes — horror, strategy, VR rhythm, and narrative adventure.",
    type: "website",
  },
};

export default function GamesPage() {
  const allGames = getAllGames();

  return (
    <>
      {/* Page header */}
      <section className="pt-16 pb-12 md:pt-20 md:pb-16 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <p className="font-mono text-sm text-accent-purple tracking-widest uppercase mb-3">
              Portfolio
            </p>
            <h1 className="font-display text-5xl md:text-6xl text-text mb-4">
              Games
            </h1>
            <p className="text-text-muted max-w-xl leading-relaxed text-base md:text-lg">
              Shipped titles and prototypes — each one a different genre, a different engine, a different design problem.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <Section>
        <GamesFilter games={allGames} />
      </Section>
    </>
  );
}
