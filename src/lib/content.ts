import gamesData from "@/content/games.json";
import thoughtsData from "@/content/thoughts.json";

export interface MediaItem {
  src: string;
  alt: string;
}

export interface Game {
  slug: string;
  title: string;
  status?: string;
  whatIDid?: string[];
  elevatorSpell?: string;
  highlights?: string[];
  featured?: boolean;
  coverImage?: string;
  playLink?: string;
  trailerLink?: string;
  videoSrc?: string;
  videoType?: "youtube" | "vimeo" | "local";
  theIdea?: string;
  gameplayLoop?: string;
  gameplayImages?: MediaItem[];
  rightBrainNotes?: string;
  artImages?: MediaItem[];
  leftBrainNotes?: string;
  techImages?: MediaItem[];
  legMovementNotes?: string;
  legMovementImages?: MediaItem[];
  endingImages?: MediaItem[];
  screenshots?: string[];
  lessons?: string[];
  links?: { label: string; url: string }[];
  credits?: {
    text: string;
    image: string;
  };
  cardTypes?: {
    categories: {
      name: string;
      description: string;
      images: MediaItem[];
    }[];
  };
  countriesTraits?: {
    description: string;
    image: MediaItem;
  };
  f1Actions?: {
    pullText: string;
    pushText: string;
    detectionText: string;
    pullImage: MediaItem;
    pushImage: MediaItem;
    blueprintImages: MediaItem[];
  };
  f1KeySafeguards?: {
    description: string;
    image: MediaItem;
  };
  f1Teleportation?: {
    description: string;
    images: MediaItem[];
  };
}

export interface Thought {
  slug: string;
  title: string;
  excerpt?: string;
  category?: string;
  readTime?: string;
  date?: string;
  content?: string;
}

export function getAllGames(): Game[] {
  return gamesData as Game[];
}

export function getFeaturedGames(): Game[] {
  return getAllGames().filter((game) => game.featured);
}

export function getGameBySlug(slug: string): Game | undefined {
  return getAllGames().find((game) => game.slug === slug);
}

export function getAllThoughts(): Thought[] {
  return thoughtsData as Thought[];
}

export function getThoughtBySlug(slug: string): Thought | undefined {
  return getAllThoughts().find((thought) => thought.slug === slug);
}

export function getThoughtsByCategory(category?: string): Thought[] {
  if (!category || category === "All") {
    return getAllThoughts();
  }
  return getAllThoughts().filter((thought) => thought.category === category);
}
