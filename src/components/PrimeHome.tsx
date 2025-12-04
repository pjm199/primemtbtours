// src/components/PrimeHome.tsx
import React, { useState } from "react";

type CarouselItem = {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  badging?: string;
  imageUrl: string;
  tags?: string[];
};

const SECTIONS: { id: string; title: string; items: CarouselItem[] }[] = [
  {
    id: "continue",
    title: "Continue watching",
    items: [
      {
        id: 1,
        title: "The Rider of Cinque Terre",
        subtitle: "Season 1",
        description:
          "Follow epic e-bike adventures along the Ligurian coast, trails, and villages.",
        badging: "Included with Prime",
        imageUrl:
          "https://images.pexels.com/photos/248787/pexels-photo-248787.jpeg?auto=compress&cs=tinysrgb&w=1200",
        tags: ["Adventure", "MTB", "Travel"],
      },
      {
        id: 2,
        title: "Night Ride",
        subtitle: "Movie",
        description:
          "A night-time ride through silent towns and twisty roads along the sea.",
        badging: "Prime",
        imageUrl:
          "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=1200",
        tags: ["Thriller", "Road", "Drama"],
      },
      {
        id: 3,
        title: "Liguria: Hidden Trails",
        subtitle: "Season 2",
        description:
          "Secret singletracks, tough climbs, and crazy descents in the backcountry.",
        badging: "Included with Prime",
        imageUrl:
          "https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=1200",
        tags: ["Documentary", "MTB", "Nature"],
      },
    ],
  },
  {
    id: "recommended",
    title: "Recommended for you",
    items: [
      {
        id: 4,
        title: "Trail Masters",
        subtitle: "Season 1",
        description:
          "Top riders battle the toughest trails for the ultimate crown.",
        badging: "Prime",
        imageUrl:
          "https://images.pexels.com/photos/258045/pexels-photo-258045.jpeg?auto=compress&cs=tinysrgb&w=1200",
        tags: ["Competition", "Sports"],
      },
      {
        id: 5,
        title: "Sunset Lines",
        subtitle: "Movie",
        description:
          "Chasing the perfect golden hour ride on the Mediterranean.",
        badging: "Prime",
        imageUrl:
          "https://images.pexels.com/photos/276530/pexels-photo-276530.jpeg?auto=compress&cs=tinysrgb&w=1200",
        tags: ["Drama", "Travel"],
      },
      {
        id: 6,
        title: "Coastal Flow",
        subtitle: "Season 1",
        description: "Smooth lines, big views, and flow trails above the sea.",
        badging: "Included with Prime",
        imageUrl:
          "https://images.pexels.com/photos/163407/bicycle-bike-fixie-fixed-gear-163407.jpeg?auto=compress&cs=tinysrgb&w=1200",
        tags: ["Lifestyle", "MTB"],
      },
    ],
  },
];

function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-slate-800/60">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
          className="h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 pt-16 pb-10 lg:flex-row lg:items-end lg:px-6 lg:pt-20 lg:pb-14">
        <div className="max-w-xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-medium text-slate-100/90 ring-1 ring-slate-700/80">
            <span className="h-2 w-2 rounded-full bg-lime-400" />
            New season available
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            The Rider of Cinque Terre
          </h1>
          <p className="text-sm font-medium text-slate-200">
            Adventure • MTB • Liguria • 16+
          </p>
          <p className="text-sm leading-relaxed text-slate-200/80 sm:text-base">
            Discover incredible trails, villages, and views along the Ligurian
            coast. Ride steep climbs, technical descents, and hidden
            singletracks.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button className="inline-flex items-center gap-2 rounded-md bg-sky-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-sm hover:bg-sky-400">
              <span className="text-lg leading-none">▶</span>
              <span>Ride now</span>
            </button>
            <button className="inline-flex items-center gap-2 rounded-md bg-slate-800/80 px-4 py-2 text-xs font-semibold text-slate-100 hover:bg-slate-700/90">
              + Add to Ridelist
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-col items-start gap-2 text-xs text-slate-200/80 lg:ml-auto lg:mt-0">
          <span className="rounded-sm bg-sky-500/90 px-2 py-0.5 text-[12px] font-semibold text-slate-950">
            Included with Official Guide
          </span>
          <p>Ride safe • Wear helmet and pads • WE speak IT / EN</p>
        </div>
      </div>
    </section>
  );
}

function CarouselRow({
  title,
  items,
}: {
  title: string;
  items: CarouselItem[];
}) {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-6xl space-y-2 px-4 lg:px-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-50 sm:text-lg">
          {title}
        </h2>
        <button className="text-xs font-medium text-sky-400 hover:text-sky-300">
          See more
        </button>
      </div>

      <div
        className="flex gap-4 overflow-x-auto pb-8 pt-6 px-4 -mx-4"
        onMouseLeave={() => setActiveId(null)}
      >
        {items.map((item) => {
          const isActive = item.id === activeId;

          return (
            <article
              key={item.id}
              className={`group relative flex flex-col flex-shrink-0 rounded-xl bg-slate-900/90 cursor-pointer transition-all duration-800 ease-out overflow-hidden
                ${
                  isActive
                    ? "basis-80 shadow-2xl shadow-sky-500/25 ring-2 ring-sky-400/60 scale-[1.02] -translate-y-2 z-10"
                    : "basis-80 shadow-lg shadow-black/50 ring-1 ring-slate-800/80 hover:ring-slate-700/90 active:scale-98"
                }`}
              onMouseEnter={() => setActiveId(item.id)}
              onClick={() => setActiveId(isActive ? null : item.id)}
              onTouchStart={() => setActiveId(item.id)}
              style={isActive ? { aspectRatio: "1 / 1.618" } : undefined}
            >
              {/* Poster */}
              <div
                className={`relative w-full overflow-hidden transition-all duration-800 ease-out ${
                  isActive
                    ? "flex-[0.618] rounded-t-xl"
                    : "aspect-[1.618/1] rounded-xl"
                }`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className={`h-full w-full object-cover transition-all duration-800 ease-out ${
                    isActive
                      ? "scale-105 brightness-110"
                      : "scale-100 brightness-100"
                  }`}
                />
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-t transition-opacity duration-500 ${
                    isActive
                      ? "from-slate-950 via-slate-950/60 to-slate-950/20"
                      : "from-slate-950 via-slate-950/40 to-transparent"
                  }`}
                />
                {/* Shimmer effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ${
                    isActive ? "translate-x-full" : "-translate-x-full"
                  }`}
                />
              </div>

              {/* Always-visible title overlay on image */}
              <div
                className={`pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-transparent transition-all duration-800 ${
                  isActive ? "p-4 opacity-90" : "p-3 opacity-100"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3
                    className={`line-clamp-1 font-bold transition-all duration-500 ${
                      isActive ? "text-sm" : "text-xs"
                    }`}
                  >
                    {item.title}
                  </h3>
                  {item.badging && !isActive && (
                    <span className="rounded-sm bg-sky-500/90 px-1.5 py-0.5 text-[9px] font-semibold text-slate-950 shadow-md">
                      {item.badging}
                    </span>
                  )}
                </div>
                {item.subtitle && !isActive && (
                  <p className="mt-1 text-[11px] text-slate-300/90">
                    {item.subtitle}
                  </p>
                )}
              </div>

              {/* Expanded info section - slides down with flex-1 to fill remaining space */}
              <div
                className={`flex flex-col bg-gradient-to-b from-slate-900/96 to-slate-950/99 backdrop-blur-xl transition-all duration-800 ease-out overflow-hidden rounded-b-xl
                  ${
                    isActive
                      ? "flex-[0.382] opacity-100 border-t border-sky-500/30 shadow-inner shadow-sky-500/10"
                      : "flex-[0] opacity-0 max-h-0"
                  }`}
              >
                <div className="flex flex-col h-full p-4 space-y-3.5">
                  {/* Header with badge */}
                  <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-700/20">
                    {item.badging && (
                      <span className="rounded-md bg-gradient-to-r from-sky-500/90 to-emerald-500/90 px-2.5 py-1 text-[10px] font-bold text-slate-950 shadow-md">
                        {item.badging}
                      </span>
                    )}
                    {item.subtitle && (
                      <span className="text-[10px] text-slate-400 font-medium">
                        {item.subtitle}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-200/90 leading-relaxed flex-1">
                    {item.description}
                  </p>

                  {/* Tags */}
                  {item.tags && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-medium text-slate-300 bg-slate-800/60 backdrop-blur px-2.5 py-1 rounded-full ring-1 ring-slate-700/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex gap-2 pt-2 pb-2">
                    <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-sky-400 px-3 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-sky-500/30 hover:shadow-sky-500/60 transition-all hover:scale-[1.02] active:scale-95">
                      <span className="text-base leading-none">▶</span>
                      <span>Play</span>
                    </button>
                    <button className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-slate-800/80 backdrop-blur px-3 py-2.5 text-xs font-semibold ring-1 ring-slate-700/50 hover:ring-sky-500/50 hover:bg-slate-700/80 transition-all hover:scale-[1.02] active:scale-95">
                      <span className="text-sm">♥</span>
                    </button>
                    <button className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-slate-800/80 backdrop-blur px-3 py-2.5 text-xs font-semibold ring-1 ring-slate-700/50 hover:ring-sky-500/50 hover:bg-slate-700/80 transition-all hover:scale-[1.02] active:scale-95">
                      <span className="text-sm">👁</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default function PrimeHome() {
  return (
    <div className="space-y-4 pb-12 pt-4">
      <Hero />
      {SECTIONS.map((section) => (
        <CarouselRow
          key={section.id}
          title={section.title}
          items={section.items}
        />
      ))}
    </div>
  );
}
