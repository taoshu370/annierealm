import Link from "next/link";
import Image from "next/image";
import Badge from "./Badge";
import Button from "./Button";

interface GameCardProps {
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
}

function getStatusVariant(status?: string): "shipped" | "prototype" | "jam" | "default" {
  if (!status) return "default";
  const s = status.toLowerCase();
  if (s === "shipped") return "shipped";
  if (s === "prototype") return "prototype";
  if (s === "jam") return "jam";
  return "default";
}

export default function GameCard({
  slug,
  title,
  status,
  whatIDid,
  elevatorSpell,
  highlights,
  coverImage,
  playLink,
  trailerLink,
}: GameCardProps) {
  return (
    <div className="group glass rounded-xl border border-border transition-all duration-300 hover:-translate-y-1 hover:border-accent-purple/40 hover:shadow-glow flex flex-col overflow-hidden">
      {/* Cover image */}
      {coverImage && (
        <Link href={`/games/${slug}`} className="block overflow-hidden flex-shrink-0 focus:outline-none">
          <div className="relative aspect-video w-full overflow-hidden bg-void">
            <Image
              src={coverImage}
              alt={`${title} cover`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Gradient overlay at bottom of image */}
            <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />
          </div>
        </Link>
      )}

      {/* Accent line */}
      {!coverImage && (
        <div className="h-px w-full bg-gradient-to-r from-transparent via-accent-purple/40 to-transparent" />
      )}

      <div className="p-5 flex flex-col">
        {/* Status + roles row */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {status && <Badge variant={getStatusVariant(status)}>{status}</Badge>}
          {whatIDid?.map((role, idx) => (
            <Badge key={idx} variant="mono">{role}</Badge>
          ))}
        </div>

        {/* Title */}
        <h3 className="font-display text-2xl md:text-3xl text-text mb-3 group-hover:text-accent-purple transition-colors duration-200">
          <Link href={`/games/${slug}`} className="focus:outline-none">
            {title}
          </Link>
        </h3>

        {/* Elevator pitch */}
        {elevatorSpell && (
          <p className="text-sm text-text-muted mb-2">
            {elevatorSpell}
          </p>
        )}

        {/* Highlights (3 max) */}
        {highlights && highlights.length > 0 && (
          <ul className="mb-2 space-y-0.5">
            {highlights.slice(0, 3).map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-text-muted">
                <span className="flex-shrink-0 w-1 h-1 rounded-full bg-accent-purple/60 mt-1" />
                {highlight}
              </li>
            ))}
          </ul>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <Button href={`/games/${slug}`} variant="ghost" size="sm">
            Case Study →
          </Button>
          {playLink && (
            <Button href={playLink} variant="primary" size="sm">
              Play
            </Button>
          )}
          {trailerLink && (
            <Button href={trailerLink} variant="cyan" size="sm">
              Trailer ↗
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
