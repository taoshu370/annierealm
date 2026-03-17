"use client";

import { useState } from "react";
import GameCard from "./GameCard";
import RevealOnScroll from "./RevealOnScroll";
import type { Game } from "@/lib/content";

const filters = ["All", "Shipped", "Prototype", "Jam"];

interface GamesFilterProps {
  games: Game[];
}

export default function GamesFilter({ games }: GamesFilterProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const filteredGames =
    selectedFilter === "All"
      ? games
      : games.filter((game) => game.status === selectedFilter);

  return (
    <>
      {/* Filter tabs */}
      <RevealOnScroll>
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((filter) => {
            const isSelected = filter === selectedFilter;
            return (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                aria-pressed={isSelected}
                className={`rounded-md border px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-purple focus:ring-offset-2 focus:ring-offset-space min-h-[40px] ${
                  isSelected
                    ? "border-accent-purple/60 bg-accent-purple/10 text-accent-purple"
                    : "border-border bg-surface text-text-muted hover:border-border/80 hover:text-text"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </RevealOnScroll>

      {/* Grid */}
      {filteredGames.length > 0 ? (
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredGames.map((game, i) => (
            <RevealOnScroll key={game.slug} delay={i * 0.1}>
              <GameCard {...game} />
            </RevealOnScroll>
          ))}
        </div>
      ) : (
        <p className="text-text-muted py-12 text-center">
          No games found in this category.
        </p>
      )}
    </>
  );
}
