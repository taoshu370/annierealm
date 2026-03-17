import { getGameBySlug, getAllGames } from "@/lib/content";
import GameContent from "./GameContent";

interface GamePostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all games
export async function generateStaticParams() {
  const games = getAllGames();
  return games.map((game) => ({
    slug: game.slug,
  }));
}

export default async function GamePostPage({ params }: GamePostPageProps) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  const allGames = getAllGames();
  const relatedGames = allGames.filter((g) => g.slug !== slug).slice(0, 2);

  return <GameContent game={game} relatedGames={relatedGames} />;
}
