"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface HeroProps {
  headline: string;
  subheadline: string;
  primaryCTA: string;
  primaryCTAHref: string;
  secondaryCTA?: string;
  secondaryCTAHref?: string;
}

export default function Hero({
  subheadline,
  primaryCTA,
  primaryCTAHref,
  secondaryCTA,
  secondaryCTAHref,
}: HeroProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Ensure iframe src is set after mount to avoid SSR issues
    if (iframeRef.current) {
      iframeRef.current.src =
        "https://www.youtube.com/embed/Z7Cm7z-3aX0?autoplay=1&mute=1&loop=1&playlist=Z7Cm7z-3aX0&controls=0&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1&playsinline=1";
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-16 md:-mt-20">
      {/* YouTube video background */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-void">
        <iframe
          ref={iframeRef}
          className="yt-cover border-0"
          allow="autoplay; encrypted-media"
          title="Background video"
          aria-hidden="true"
        />
      </div>

      {/* Dark gradient overlay — dims video for content readability */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(3,7,18,0.95) 0%, rgba(3,7,18,0.85) 40%, rgba(3,7,18,0.85) 60%, rgba(3,7,18,0.98) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 pb-24">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div
            className="mb-6 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <Image
              src="/logo.png"
              alt="AnnieRealm"
              width={1200}
              height={600}
              className="w-auto h-36 sm:h-48 md:h-60 lg:h-72"
              priority
            />
          </div>

          {/* Subheadline */}
          <p
            className="animate-fade-up text-base sm:text-lg md:text-xl text-white/75 max-w-xl leading-relaxed mb-10 font-light"
            style={{ animationDelay: "0.3s" }}
          >
            {subheadline}
          </p>

          {/* CTA buttons */}
          <div
            className="animate-fade-up flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto"
            style={{ animationDelay: "0.5s" }}
          >
            <Link
              href={primaryCTAHref}
              className="inline-flex items-center justify-center rounded-lg bg-accent-purple px-8 py-3.5 text-base font-medium text-white transition-all duration-200 hover:bg-accent-purple/90 hover:shadow-glow animate-glow-pulse focus:outline-none focus:ring-2 focus:ring-accent-purple focus:ring-offset-2 focus:ring-offset-space min-h-[50px]"
            >
              {primaryCTA}
            </Link>
            {secondaryCTA && secondaryCTAHref && (
              <Link
                href={secondaryCTAHref}
                className="inline-flex items-center justify-center rounded-lg border border-white/25 px-8 py-3.5 text-base font-medium text-white/85 transition-all duration-200 hover:border-white/50 hover:bg-white/5 hover:text-white focus:outline-none min-h-[50px]"
              >
                {secondaryCTA}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-xs text-white/40 tracking-widest uppercase font-mono">Scroll</span>
        <div className="flex flex-col items-center gap-1">
          <span className="block w-px h-6 bg-gradient-to-b from-white/0 to-white/30" />
          <svg
            className="w-4 h-4 text-white/30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
