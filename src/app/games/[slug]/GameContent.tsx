"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/Section";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import GameCard from "@/components/GameCard";
import VideoEmbed from "@/components/VideoEmbed";
import RevealOnScroll from "@/components/RevealOnScroll";
import { getGameBySlug, getAllGames, type MediaItem, type Game } from "@/lib/content";

interface GameContentProps {
  game: Game | undefined;
  relatedGames: Game[];
}

function getStatusVariant(status?: string): "shipped" | "prototype" | "jam" | "default" {
  if (!status) return "default";
  const s = status.toLowerCase();
  if (s === "shipped") return "shipped";
  if (s === "prototype") return "prototype";
  if (s === "jam") return "jam";
  return "default";
}

/** Responsive image grid — GIFs unoptimized, PNGs/JPGs optimized */
function MediaGrid({ items, cols = 2 }: { items: MediaItem[]; cols?: 2 | 3 | 4 }) {
  if (!items || items.length === 0) return null;
  const colClass = cols === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : cols === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";

  return (
    <div className={`grid grid-cols-1 ${colClass} gap-3 mt-6`}>
      {items.map((item, idx) => {
        const isGif = item.src.toLowerCase().endsWith(".gif");
        return (
          <div key={idx} className="overflow-hidden rounded-lg border border-border bg-void">
            {isGif ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            ) : (
              <div className="relative aspect-video w-full">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            )}
            <p className="px-3 py-2 text-xs text-text-muted font-mono">{item.alt}</p>
          </div>
        );
      })}
    </div>
  );
}

export default function GameContent({ game, relatedGames }: GameContentProps) {
  if (!game) notFound();

  return (
    <>
      {/* ── Hero header ─────────────────────────────────────────────────── */}
      <section className="pt-12 pb-14 md:pt-16 md:pb-20 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 via-transparent to-accent-cyan/5 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-space via-transparent to-transparent pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <RevealOnScroll>
            <div className="flex items-center gap-2 text-xs text-text-muted font-mono mb-8">
              <Link href="/games" className="hover:text-accent-purple transition-colors">Games</Link>
              <span>/</span>
              <span className="text-text">{game.title}</span>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left: text */}
            <RevealOnScroll direction="left">
              <div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {game.status && <Badge variant={getStatusVariant(game.status)}>{game.status}</Badge>}
                  {game.whatIDid?.map((role, idx) => <Badge key={idx} variant="mono">{role}</Badge>)}
                </div>

                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-text mb-5">
                  {game.title}
                </h1>

                {game.elevatorSpell && (
                  <p className="text-lg text-text-muted max-w-xl leading-relaxed mb-8">
                    {game.elevatorSpell}
                  </p>
                )}

                <div className="flex flex-wrap gap-3">
                  {game.playLink && (
                    <Button href={game.playLink} variant="primary">Play on itch.io ↗</Button>
                  )}
                  {game.trailerLink && (
                    <Button href={game.trailerLink} variant="cyan">Watch Trailer ↗</Button>
                  )}
                  <Button href="/games" variant="ghost">← All Games</Button>
                </div>
                {game.engine && (
                  <p className="mt-4 text-sm text-text-muted font-mono">
                    <span className="text-accent-purple">Engine:</span> {game.engine}
                  </p>
                )}
              </div>
            </RevealOnScroll>

            {/* Right: cover image */}
            <RevealOnScroll direction="right">
              {game.coverImage && (
                <div className="relative overflow-hidden rounded-2xl border border-border aspect-video bg-void">
                  <Image
                    src={game.coverImage}
                    alt={`${game.title} cover`}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void/40 to-transparent" />
                </div>
              )}
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ── Highlights ──────────────────────────────────────────────────── */}
      {game.highlights && game.highlights.length > 0 && (
        <Section>
          <RevealOnScroll>
            <p className="font-mono text-sm text-accent-purple tracking-widest uppercase mb-4">Highlights</p>
          </RevealOnScroll>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {game.highlights.map((highlight, idx) => (
              <RevealOnScroll key={idx} delay={idx * 0.1}>
                <div className="glass rounded-xl border border-border p-5 hover:border-accent-purple/30 transition-colors duration-200">
                  <div className="w-6 h-px bg-accent-purple mb-3" />
                  <p className="text-sm text-text-muted leading-relaxed">{highlight}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Section>
      )}

      {/* ── Trailer / embedded video ─────────────────────────────────────── */}
      {game.videoSrc && (
        <Section className="border-t border-border">
          <RevealOnScroll>
            <p className="font-mono text-sm text-accent-purple tracking-widest uppercase mb-4">Trailer</p>
            <div className="rounded-2xl overflow-hidden border border-border">
              <VideoEmbed src={game.videoSrc} title={`${game.title} trailer`} type={game.videoType} />
            </div>
          </RevealOnScroll>
        </Section>
      )}

      {/* ── The Idea ────────────────────────────────────────────────────── */}
      {game.theIdea && (
        <Section className="border-t border-border">
          <RevealOnScroll>
            <div className="max-w-3xl">
              <p className="font-mono text-sm text-accent-purple tracking-widest uppercase mb-4">The Idea</p>
              <p className="text-text leading-relaxed whitespace-pre-line text-base md:text-lg">
                {game.theIdea}
              </p>
            </div>
          </RevealOnScroll>
        </Section>
      )}

      {/* ── Gameplay Loop + AI/Route images ────────────────────────── */}
      {game.gameplayLoop && (
        <Section className="border-t border-border bg-void">
          <RevealOnScroll>
            <p className="font-mono text-sm text-accent-cyan tracking-widest uppercase mb-4">Core Gameplay Loop</p>
          </RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 items-start">
            <RevealOnScroll direction="left" className="lg:col-span-2">
              <p className="text-text leading-relaxed whitespace-pre-line text-sm md:text-base">
                {game.gameplayLoop}
              </p>
            </RevealOnScroll>
            {game.gameplayImages && game.gameplayImages.length > 0 && (
              <>
                {/* Roll for Resolution / F1 Pit Stop / What If - images vertical stack */}
                {game.slug === "roll-for-resolution" || game.slug === "f1-pit-stop-vr" || game.slug === "what-if" ? (
                  <RevealOnScroll direction="right" className="lg:col-span-3">
                    <div className="flex flex-col items-center gap-3">
                      {game.gameplayImages.map((item, idx) => (
                        <div key={idx} className={game.slug === "what-if" ? "w-full" : "w-full max-w-xs"}>
                          <Image
                            src={item.src}
                            alt={item.alt}
                            width={game.slug === "what-if" ? 800 : 400}
                            height={game.slug === "what-if" ? 450 : 225}
                            className="w-full h-auto rounded-lg"
                            sizes={game.slug === "what-if" ? "(max-width: 1024px) 100vw, 600px" : "320px"}
                          />
                          <p className="mt-1 text-xs text-text-muted font-mono text-center">{item.alt}</p>
                        </div>
                      ))}
                    </div>
                  </RevealOnScroll>
                ) : (
                  /* Other games - 2 images side by side */
                  <RevealOnScroll direction="right" className="lg:col-span-3">
                    <div className="flex gap-2">
                      {game.gameplayImages.map((item, idx) => {
                        const widthClass = idx === 0 ? "w-[55%]" : "w-[45%]";
                        return (
                          <div key={idx} className={widthClass}>
                            <div className="relative w-full">
                              <Image
                                src={item.src}
                                alt={item.alt}
                                width={800}
                                height={600}
                                className="w-full h-auto rounded-lg"
                                sizes="(max-width: 768px) 50vw, 500px"
                              />
                            </div>
                            <p className="mt-2 text-xs text-text-muted font-mono text-center">{item.alt}</p>
                          </div>
                        );
                      })}
                    </div>
                  </RevealOnScroll>
                )}
              </>
            )}
          </div>
        </Section>
      )}

      {/* ── What If endings — special section ───────────────────────────── */}
      {game.endingImages && game.endingImages.length > 0 && (
        <Section className="border-t border-border">
          <RevealOnScroll>
            <p className="font-mono text-sm text-accent-amber tracking-widest uppercase mb-4">Three Endings</p>
            <p className="text-text-muted text-sm mb-6 max-w-xl">
              Every choice costs AP. Every ending is earned — or lost.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <MediaGrid items={game.endingImages} cols={3} />
          </RevealOnScroll>
        </Section>
      )}

      {/* ── Design Notes: Tech & Systems / Leg Movement / Art & Feel ─────────────────────────────────── */}
      {(game.leftBrainNotes || game.legMovementNotes || game.rightBrainNotes || game.cardTypes || game.countriesTraits || game.f1Actions) && (
        <Section className="border-t border-border">
          <RevealOnScroll>
            <p className="font-mono text-sm text-accent-purple tracking-widest uppercase mb-8">Design Notes</p>
          </RevealOnScroll>
          <div className="flex flex-col gap-8">

            {/* Tech & Systems - Special layout for Roll for Resolution */}
            {game.slug === "roll-for-resolution" && game.cardTypes && (
              <RevealOnScroll>
                <div className="glass rounded-xl border border-border p-8 hover:border-accent-cyan/30 transition-colors duration-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-px bg-accent-cyan" />
                    <span className="text-base font-mono text-accent-cyan tracking-wider uppercase">Card Types</span>
                  </div>
                  <div className="space-y-8">
                    {game.cardTypes.categories.map((category, idx) => (
                      <div key={idx} className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
                        <div className="lg:col-span-3">
                          <h4 className="text-base font-mono text-accent-cyan mb-3">{category.name}</h4>
                          <p className="text-base md:text-lg text-text-muted leading-relaxed whitespace-pre-line">
                            {category.description}
                          </p>
                        </div>
                        <div className="lg:col-span-2 flex gap-2">
                          {category.images.map((img, imgIdx) => (
                            <div key={imgIdx} className="relative aspect-[3/4] w-24 md:w-28">
                              <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-contain"
                                sizes="100px"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            )}

            {/* Countries' Traits - Special for Roll for Resolution */}
            {game.slug === "roll-for-resolution" && game.countriesTraits && (
              <RevealOnScroll>
                <div className="glass rounded-xl border border-border p-8 hover:border-accent-amber/30 transition-colors duration-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-px bg-accent-amber" />
                    <span className="text-base font-mono text-accent-amber tracking-wider uppercase">Countries' Traits</span>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    <p className="text-sm text-text-muted leading-relaxed whitespace-pre-line">
                      {game.countriesTraits.description}
                    </p>
                    <div className="relative aspect-video w-full">
                      <Image
                        src={game.countriesTraits.image.src}
                        alt={game.countriesTraits.image.alt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            )}

            {/* F1 Pit Stop - Actions */}
            {game.slug === "f1-pit-stop-vr" && game.f1Actions && (
              <RevealOnScroll>
                <div className="glass rounded-xl border border-border p-8 hover:border-accent-cyan/30 transition-colors duration-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-px bg-accent-cyan" />
                    <span className="text-base font-mono text-accent-cyan tracking-wider uppercase">Actions</span>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    {/* Left: Pull/Push/Detection text with trajectory images */}
                    <div className="space-y-6">
                      {/* Pull Action */}
                      <div>
                        <h4 className="text-sm font-mono text-accent-cyan mb-2">Pull Action</h4>
                        <p className="text-sm text-text-muted leading-relaxed mb-3">
                          {game.f1Actions.pullText}
                        </p>
                        <Image
                          src={game.f1Actions.pullImage.src}
                          alt={game.f1Actions.pullImage.alt}
                          width={600}
                          height={400}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                      {/* Push Action */}
                      <div>
                        <h4 className="text-sm font-mono text-accent-cyan mb-2">Push Action</h4>
                        <p className="text-sm text-text-muted leading-relaxed mb-3">
                          {game.f1Actions.pushText}
                        </p>
                        <Image
                          src={game.f1Actions.pushImage.src}
                          alt={game.f1Actions.pushImage.alt}
                          width={600}
                          height={400}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                      {/* Detection Pipeline */}
                      <div>
                        <h4 className="text-sm font-mono text-accent-cyan mb-2">Detection Pipeline</h4>
                        <p className="text-sm text-text-muted leading-relaxed whitespace-pre-line">
                          {game.f1Actions.detectionText}
                        </p>
                      </div>
                    </div>
                    {/* Right: Blueprint images vertical stack */}
                    <div className="flex flex-col gap-4">
                      {game.f1Actions.blueprintImages.map((img, idx) => (
                        <Image
                          key={idx}
                          src={img.src}
                          alt={img.alt}
                          width={800}
                          height={600}
                          className="w-full h-auto rounded-lg"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            )}

            {/* F1 Pit Stop - Key Safeguards */}
            {game.slug === "f1-pit-stop-vr" && game.f1KeySafeguards && (
              <RevealOnScroll>
                <div className="glass rounded-xl border border-border p-8 hover:border-accent-amber/30 transition-colors duration-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-px bg-accent-amber" />
                    <span className="text-base font-mono text-accent-amber tracking-wider uppercase">Key Safeguards</span>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    <p className="text-base md:text-lg text-text-muted leading-relaxed whitespace-pre-line">
                      {game.f1KeySafeguards.description}
                    </p>
                    <div className="relative aspect-video w-full">
                      <Image src={game.f1KeySafeguards.image.src} alt={game.f1KeySafeguards.image.alt} fill className="object-contain rounded-lg" sizes="(max-width: 768px) 100vw, 400px" />
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            )}

            {/* F1 Pit Stop - Teleportation */}
            {game.slug === "f1-pit-stop-vr" && game.f1Teleportation && (
              <RevealOnScroll>
                <div className="glass rounded-xl border border-border p-8 hover:border-accent-purple/30 transition-colors duration-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-px bg-accent-purple" />
                    <span className="text-base font-mono text-accent-purple tracking-wider uppercase">Teleportation</span>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    <p className="text-base md:text-lg text-text-muted leading-relaxed whitespace-pre-line">
                      {game.f1Teleportation.description}
                    </p>
                    <div className="relative aspect-video w-full">
                      <Image src={game.f1Teleportation.images[1].src} alt={game.f1Teleportation.images[1].alt} fill className="object-contain rounded-lg" sizes="(max-width: 768px) 100vw, 400px" />
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            )}

            {/* Standard Tech & Systems for other games */}
            {game.slug !== "roll-for-resolution" && game.slug !== "f1-pit-stop-vr" && game.leftBrainNotes && (
              <RevealOnScroll>
                <div className="glass rounded-xl border border-border p-8 hover:border-accent-cyan/30 transition-colors duration-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-px bg-accent-cyan" />
                    <span className="text-base font-mono text-accent-cyan tracking-wider uppercase">Tech & Systems</span>
                  </div>
                  {/* What If - text left, image right layout */}
                  {game.slug === "what-if" ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                      <p className="text-base md:text-lg text-text-muted leading-relaxed whitespace-pre-line">
                        {game.leftBrainNotes}
                      </p>
                      {game.techImages && game.techImages.length > 0 && (
                        <div className="flex flex-col gap-3">
                          {game.techImages.map((item, idx) => (
                            <div key={idx}>
                              <Image
                                src={item.src}
                                alt={item.alt}
                                width={800}
                                height={450}
                                className="w-full h-auto rounded-lg"
                              />
                              <p className="mt-1 text-xs text-text-muted font-mono text-center">{item.alt}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Other games - standard layout */
                    <>
                      <p className="text-base md:text-lg text-text-muted leading-relaxed whitespace-pre-line mb-6">
                        {game.leftBrainNotes}
                      </p>
                      {game.techImages && game.techImages.length > 0 && (
                        <div className="grid grid-cols-3 gap-3">
                          {game.techImages.map((item, idx) => {
                            const isGif = item.src.toLowerCase().endsWith(".gif");
                            return (
                              <div key={idx} className="overflow-hidden rounded-lg border border-border bg-void">
                                {isGif ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img src={item.src} alt={item.alt} className="w-full h-auto" loading="lazy" />
                                ) : (
                                  <div className="relative aspect-video w-full">
                                    <Image src={item.src} alt={item.alt} fill className="object-contain" sizes="(max-width: 768px) 33vw, 250px" />
                                  </div>
                                )}
                                <p className="px-2 py-1.5 text-xs text-text-muted font-mono leading-tight">{item.alt}</p>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </RevealOnScroll>
            )}

            {/* Leg Movement */}
            {game.legMovementNotes && (
              <RevealOnScroll>
                <div className="glass rounded-xl border border-border p-8 hover:border-accent-amber/30 transition-colors duration-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-px bg-accent-amber" />
                    <span className="text-base font-mono text-accent-amber tracking-wider uppercase">Leg Movement</span>
                  </div>
                  <p className="text-base md:text-lg text-text-muted leading-relaxed whitespace-pre-line">
                    {game.legMovementNotes}
                  </p>
                  {game.legMovementImages && game.legMovementImages.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      {game.legMovementImages.map((item, idx) => {
                        const isGif = item.src.toLowerCase().endsWith(".gif");
                        return (
                          <div key={idx} className="overflow-hidden rounded-xl border border-border bg-void">
                            {isGif ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={item.src} alt={item.alt} className="w-full h-auto" loading="lazy" />
                            ) : (
                              <div className="relative aspect-video w-full">
                                <Image src={item.src} alt={item.alt} fill className="object-contain" sizes="(max-width: 768px) 50vw, 400px" />
                              </div>
                            )}
                            <p className="px-3 py-2 text-sm text-text-muted font-mono">{item.alt}</p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </RevealOnScroll>
            )}

            {/* Art & Feel */}
            {game.rightBrainNotes && (
              <RevealOnScroll>
                <div className="glass rounded-xl border border-border p-8 hover:border-accent-purple/30 transition-colors duration-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-px bg-accent-purple" />
                    <span className="text-base font-mono text-accent-purple tracking-wider uppercase">Art & Feel</span>
                  </div>
                  {/* What If - text left, image right layout */}
                  {game.slug === "what-if" ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                      <p className="text-base md:text-lg text-text-muted leading-relaxed whitespace-pre-line">
                        {game.rightBrainNotes}
                      </p>
                      {game.artImages && game.artImages.length > 0 && (
                        <div className="flex flex-col gap-3">
                          {game.artImages.map((item, idx) => (
                            <div key={idx}>
                              <Image
                                src={item.src}
                                alt={item.alt}
                                width={800}
                                height={450}
                                className="w-full h-auto rounded-lg"
                              />
                              <p className="mt-1 text-xs text-text-muted font-mono text-center">{item.alt}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Other games - standard layout */
                    <>
                      <p className="text-base md:text-lg text-text-muted leading-relaxed whitespace-pre-line">
                        {game.rightBrainNotes}
                      </p>
                      {game.artImages && game.artImages.length > 0 && (
                        <div className="grid grid-cols-2 gap-4 mt-6">
                          {game.artImages.map((item, idx) => {
                            const isGif = item.src.toLowerCase().endsWith(".gif");
                            return (
                              <div key={idx} className="overflow-hidden rounded-xl border border-border bg-void">
                                {isGif ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img
                                    src={item.src}
                                    alt={item.alt}
                                    className="w-full h-auto object-cover"
                                    loading="lazy"
                                  />
                                ) : (
                                  <div className="relative aspect-video w-full">
                                    <Image
                                      src={item.src}
                                      alt={item.alt}
                                      fill
                                      className="object-contain"
                                      sizes="(max-width: 768px) 50vw, 400px"
                                    />
                                  </div>
                                )}
                                <p className="px-4 py-3 text-sm text-text-muted font-mono truncate">{item.alt}</p>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </RevealOnScroll>
            )}

          </div>
        </Section>
      )}

      {/* ── Lessons ─────────────────────────────────────────────────────── */}
      {game.lessons && game.lessons.length > 0 && (
        <Section className="border-t border-border bg-void">
          <RevealOnScroll>
            <p className="font-mono text-sm text-accent-amber tracking-widest uppercase mb-6">Lessons & Iterations</p>
          </RevealOnScroll>
          <div className="space-y-4 max-w-3xl">
            {game.lessons.map((lesson, idx) => (
              <RevealOnScroll key={idx} delay={idx * 0.1}>
                <div className="flex gap-4 glass rounded-xl border border-border p-5">
                  <span className="font-display text-3xl text-accent-amber/30 flex-shrink-0 leading-none">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm text-text-muted leading-relaxed">{lesson}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Section>
      )}

      {/* ── External links ──────────────────────────────────────────────── */}
      {game.links && game.links.length > 0 && (
        <Section className="border-t border-border">
          <RevealOnScroll>
            <p className="font-mono text-sm text-accent-purple tracking-widest uppercase mb-5">Links</p>
            <div className="flex flex-wrap gap-3">
              {game.links.map((link, idx) => (
                <Button key={idx} href={link.url} variant="ghost">{link.label} ↗</Button>
              ))}
            </div>
          </RevealOnScroll>
        </Section>
      )}

      {/* ── Credits ──────────────────────────────────────────────────── */}
      {game.credits && (
        <Section className="border-t border-border">
          <RevealOnScroll>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="font-mono text-sm text-accent-purple tracking-widest uppercase mb-4">Credits</p>
                <p className="text-lg md:text-xl text-text leading-relaxed">
                  {game.credits.text}
                </p>
              </div>
              <div className="relative w-full">
                <Image
                  src={game.credits.image}
                  alt="Artwork credits"
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </div>
          </RevealOnScroll>
        </Section>
      )}

      {/* ── More Games ──────────────────────────────────────────────────── */}
      {relatedGames.length > 0 && (
        <Section className="border-t border-border">
          <RevealOnScroll>
            <p className="font-mono text-sm text-accent-purple tracking-widest uppercase mb-4">More Games</p>
            <h2 className="font-display text-3xl md:text-4xl text-text mb-8">You might also like</h2>
          </RevealOnScroll>
          <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
            {relatedGames.map((relatedGame, i) => (
              <RevealOnScroll key={relatedGame.slug} delay={i * 0.15}>
                <GameCard {...relatedGame} />
              </RevealOnScroll>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
