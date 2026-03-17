import Link from "next/link";
import Button from "@/components/Button";
import Section from "@/components/Section";

export default function NotFound() {
  return (
    <Section>
      <div className="text-center max-w-2xl mx-auto py-16">
        <p className="font-mono text-sm text-accent-purple tracking-widest uppercase mb-4">
          404
        </p>
        <h1 className="font-display text-6xl md:text-7xl text-text mb-4">
          Page Not Found
        </h1>
        <p className="text-text-muted leading-relaxed mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button href="/" variant="primary">
            Go Home
          </Button>
          <Link
            href="/games"
            className="text-sm font-medium text-text-muted hover:text-text transition-colors"
          >
            Browse Games →
          </Link>
        </div>
      </div>
    </Section>
  );
}
