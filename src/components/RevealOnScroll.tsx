"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
}

export default function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.6,
}: RevealOnScrollProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: 40, opacity: 0 };
      case "down":
        return { y: -40, opacity: 0 };
      case "left":
        return { x: 40, opacity: 0 };
      case "right":
        return { x: -40, opacity: 0 };
      default:
        return { y: 40, opacity: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={isInView ? { x: 0, y: 0, opacity: 1 } : getInitialPosition()}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
