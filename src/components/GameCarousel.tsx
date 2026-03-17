"use client";

import { useState } from "react";
import GameCard from "./GameCard";

interface Game {
  slug: string;
  title: string;
  status?: string;
  whatIDid?: string[];
  elevatorSpell?: string;
  highlights?: string[];
  featured?: boolean;
  playLink?: string;
  trailerLink?: string;
}

interface GameCarouselProps {
  games: Game[];
}

export default function GameCarousel({ games }: GameCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (games.length === 0) return null;

  return (
    <div className="w-full">
      {/* Carousel viewport */}
      <div className="relative overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {games.map((game) => (
            <div key={game.slug} className="w-full flex-shrink-0">
              <GameCard {...game} />
            </div>
          ))}
        </div>
      </div>

      {/* Dot navigation */}
      {games.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {games.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-6 h-1.5 bg-accent-purple"
                  : "w-1.5 h-1.5 bg-border hover:bg-text-muted"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
