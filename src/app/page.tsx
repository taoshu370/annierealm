import Hero from "@/components/Hero";
import Section from "@/components/Section";
import GameCard from "@/components/GameCard";
import Button from "@/components/Button";
import Link from "next/link";
import RevealOnScroll from "@/components/RevealOnScroll";
import { getFeaturedGames } from "@/lib/content";

export default function Home() {
  const featuredGames = getFeaturedGames();

  return (
    <>
      <Hero
        headline="AnnieRealm"
        subheadline="Game designer & developer. I build worlds from systems."
        primaryCTA="Explore Games"
        primaryCTAHref="/games"
        secondaryCTA="About Me"
        secondaryCTAHref="/about"
      />

      {/* Featured Games */}
      <Section>
        <RevealOnScroll>
          <div className="mb-10">
            <p className="font-mono text-sm text-accent-purple tracking-widest uppercase mb-3">
              Selected Works
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-text mb-4">
              Games I&apos;ve Built
            </h2>
            <p className="text-text-muted max-w-lg leading-relaxed">
              Horror, diplomacy, VR rhythm, and narrative mystery — four genres, four different technical challenges.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
          {featuredGames.map((game, i) => (
            <RevealOnScroll key={game.slug} delay={i * 0.15}>
              <GameCard {...game} />
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.3}>
          <div className="mt-10 flex justify-center">
            <Button href="/games" variant="ghost" size="lg">
              View All Games →
            </Button>
          </div>
        </RevealOnScroll>
      </Section>

      {/* About teaser */}
      <Section className="border-t border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <RevealOnScroll direction="left">
            <div>
              <p className="font-mono text-sm text-accent-cyan tracking-widest uppercase mb-3">
                About
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-text mb-6">
                Systems thinker.{" "}
                <span className="gradient-text">Aesthetic committer.</span>
              </h2>
              <p className="text-text-muted leading-relaxed mb-4">
                I&apos;m Annie — a game designer and developer who treats every project as a conversation between art and engineering. I like games where the visual identity and the mechanics speak the same language.
              </p>
              <p className="text-text-muted leading-relaxed mb-8">
                From PS1-era horror AI to satirical geopolitics-as-dice, I build with range and intention.
              </p>
              <Button href="/about" variant="ghost">
                Read more about me →
              </Button>
            </div>
          </RevealOnScroll>

          {/* Stats / quick facts */}
          <RevealOnScroll direction="right">
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "4", label: "Shipped & Prototype Games" },
                { value: "3+", label: "Engines (Unity, Unreal, VR)" },
                { value: "1×", label: "Global Game Jam Entry" },
                { value: "∞", label: "Iteration loops" },
              ].map((stat, i) => (
                <RevealOnScroll key={stat.label} delay={i * 0.1}>
                  <div className="glass rounded-xl border border-border p-6 text-center hover:border-accent-purple/30 transition-colors duration-200">
                    <div className="font-display text-5xl gradient-text mb-2">
                      {stat.value}
                    </div>
                    <div className="text-xs text-text-muted leading-snug">{stat.label}</div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Contact CTA */}
      <Section className="border-t border-border">
        <RevealOnScroll>
          <div className="text-center max-w-2xl mx-auto">
            <p className="font-mono text-sm text-accent-purple tracking-widest uppercase mb-3">
              Get in touch
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-text mb-4">
              Let&apos;s make something.
            </h2>
            <p className="text-text-muted mb-8 leading-relaxed">
              Open to collaborations, game jam partnerships, and conversations about craft.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button href="/contact" variant="primary" size="lg">
                Contact Me
              </Button>
              <Link
                href="/games"
                className="text-sm font-medium text-text-muted hover:text-text transition-colors"
              >
                or explore my work first →
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </Section>
    </>
  );
}
