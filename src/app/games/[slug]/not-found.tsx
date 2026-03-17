import Button from "@/components/Button";
import Section from "@/components/Section";

export default function NotFound() {
  return (
    <Section>
      <div className="text-center max-w-2xl mx-auto">
        <p className="font-mono text-sm text-accent-purple tracking-widest uppercase mb-4">404</p>
        <h1 className="font-display text-5xl md:text-6xl text-text mb-4">
          Game Not Found
        </h1>
        <p className="text-text-muted leading-relaxed mb-8">
          The game you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button href="/games" variant="primary">
          Browse All Games
        </Button>
      </div>
    </Section>
  );
}
