"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function ParallaxBackground() {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (backgroundRef.current) {
        const scrolled = window.scrollY;
        // Move background at 0.5x speed (slower than scroll)
        const yPos = -(scrolled * 0.5);
        backgroundRef.current.style.transform = `translate3d(0, ${yPos}px, 0)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={backgroundRef}
      className="fixed inset-0 w-full h-[500%] z-0 pointer-events-none opacity-20"
      style={{ willChange: "transform" }}
    >
      <Image
        src="/home_bg.png"
        alt=""
        fill
        className="object-cover"
        priority
        quality={90}
      />
    </div>
  );
}

