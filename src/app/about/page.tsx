import type { Metadata } from "next";
import Section from "@/components/Section";
import Button from "@/components/Button";
import Image from "next/image";
import RevealOnScroll from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "About — AnnieRealm",
  description: "Game designer and developer. I build systems with aesthetic conviction.",
};

const skills = [
  "Game Design",
  "Gameplay Programming",
  "Prototyping",
  "UI/UX",
  "Level Design",
  "Art Direction",
];

const tools = [
  { name: "Unity", category: "Engine", logo: "/unity-logo.svg" },
  { name: "Unreal Engine", category: "Engine", logo: "/unreal-logo.svg" },
];

export default function AboutPage() {
  return (
    <>
      {/* Page header */}
      <section className="pt-12 pb-14 md:pt-16 md:pb-20 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-purple/5 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-space via-transparent to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <p className="font-mono text-sm text-accent-cyan tracking-widest uppercase mb-3">
              About
            </p>
            <h1 className="font-display text-5xl md:text-6xl text-text">
              Annie
            </h1>
          </RevealOnScroll>
        </div>
      </section>

      {/* Bio */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Portrait */}
          <RevealOnScroll direction="left" className="lg:col-span-2 flex justify-center lg:justify-start">
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-accent-purple/30 to-accent-cyan/30 blur-sm" />
              <Image
                src="/portrait.png"
                alt="Annie"
                width={320}
                height={320}
                className="relative rounded-2xl w-64 h-64 md:w-80 md:h-80 object-cover"
              />
            </div>
          </RevealOnScroll>

          {/* Text */}
          <RevealOnScroll direction="right" className="lg:col-span-3">
            <div>
              <p className="text-base md:text-lg text-text leading-relaxed mb-5">
                Hi — I&apos;m Annie. I make games that blend expressive art direction with intentional mechanics. I like projects where the aesthetics aren&apos;t just decoration — they&apos;re part of how the game thinks.
              </p>
              <p className="text-base md:text-lg text-text-muted leading-relaxed mb-8">
                I&apos;m a political science student, but my passion to explore the rest of the world is endless. I hope to achieve world peace by creating virtual worlds that connect those divided by political boundaries.
              </p>
              <Button href="/contact" variant="primary">
                Get in touch
              </Button>
            </div>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Skills */}
      <Section className="border-t border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* What I do */}
          <RevealOnScroll direction="left">
            <div>
              <p className="font-mono text-sm text-accent-purple tracking-widest uppercase mb-5">
                What I Do
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span
                    key={skill}
                    className="rounded-md border border-border bg-surface px-4 py-2 text-sm text-text-muted hover:border-accent-purple/40 hover:text-text transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Tools */}
          <RevealOnScroll direction="right">
            <div>
              <p className="font-mono text-sm text-accent-cyan tracking-widest uppercase mb-5">
                Tools & Technologies
              </p>
              <div className="grid grid-cols-2 gap-3">
                {tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="glass rounded-lg border border-border p-4 hover:border-accent-cyan/30 transition-colors duration-200 flex flex-col items-center gap-3"
                  >
                    <Image
                      src={tool.logo}
                      alt={`${tool.name} logo`}
                      width={120}
                      height={48}
                      className="h-10 w-auto object-contain brightness-0 invert opacity-80"
                    />
                    <div className="text-center">
                      <p className="text-sm font-medium text-text">{tool.name}</p>
                      <p className="text-xs text-text-muted font-mono mt-0.5">{tool.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Design philosophy */}
      <Section className="border-t border-border bg-void">
        <RevealOnScroll>
          <div className="max-w-2xl">
            <p className="font-mono text-sm text-accent-purple tracking-widest uppercase mb-5">
              Design Philosophy
            </p>
            <blockquote className="text-xl md:text-2xl font-display text-text leading-relaxed mb-6">
              &ldquo;Every game should have a well-defined mechanical core AND a strong visual identity.
              Neither is decoration — they&apos;re in conversation.&rdquo;
            </blockquote>
            <p className="text-text-muted leading-relaxed">
              I believe constraints breed creativity. The PS1 rendering limitations became a horror tool. The AP economy in a game jam became moral weight. I design by asking: what does this constraint enable?
            </p>
          </div>
        </RevealOnScroll>
      </Section>

      {/* Touching message */}
      <Section className="border-t border-border">
        <RevealOnScroll>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-base leading-relaxed text-text-muted italic">
              Build with love &lt;3 — Anni
            </p>
          </div>
        </RevealOnScroll>
      </Section>
    </>
  );
}
