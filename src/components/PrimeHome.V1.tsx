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
              <span>Watch now</span>
            </button>
            <button className="inline-flex items-center gap-2 rounded-md bg-slate-800/80 px-4 py-2 text-xs font-semibold text-slate-100 hover:bg-slate-700/90">
              + Add to Watchlist
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-col items-start gap-2 text-xs text-slate-200/80 lg:ml-auto lg:mt-0">
          <span className="rounded-sm bg-sky-500/90 px-2 py-0.5 text-[10px] font-semibold text-slate-950">
            Included with Prime
          </span>
          <p>Watch in HD • Subtitles • Original audio IT / EN</p>
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
    <section className="mx-auto max-w-6xl space-y-3 px-4 lg:px-6">
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
              className={`group relative flex-shrink-0 overflow-hidden rounded-xl bg-slate-900/90 cursor-pointer transition-all duration-500 ease-out
                ${
                  isActive
                    ? "basis-96 shadow-2xl shadow-sky-500/20 ring-2 ring-sky-500/50 scale-105 -translate-y-3 z-10"
                    : "basis-80 shadow-md shadow-black/40 ring-1 ring-slate-800/80 hover:ring-slate-700/80 active:scale-95"
                }`}
              onMouseEnter={() => setActiveId(item.id)}
              onClick={() => setActiveId(isActive ? null : item.id)}
              onTouchStart={() => setActiveId(item.id)}
            >
              {/* Poster */}
              <div className="relative aspect-[1.618/1] w-full">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className={`h-full w-full object-cover transition-all duration-500 ${
                    isActive
                      ? "scale-110 brightness-110"
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

              {/* Always-visible bottom text */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 text-xs text-slate-50">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="line-clamp-1 font-semibold">{item.title}</h3>
                  {item.badging && (
                    <span className="rounded-sm bg-sky-500/90 px-1.5 py-0.5 text-[9px] font-semibold text-slate-950">
                      {item.badging}
                    </span>
                  )}
                </div>
                {item.subtitle && (
                  <p className="mt-0.5 text-[11px] text-slate-200/80">
                    {item.subtitle}
                  </p>
                )}
              </div>

              {/* Expanded overlay */}
              <div
                className={`pointer-events-none absolute inset-0 flex flex-col justify-between p-3 text-xs text-slate-50 transition-all duration-500 ease-out
                  ${
                    isActive
                      ? "opacity-100 translate-y-0 bg-slate-950/70 backdrop-blur-md"
                      : "opacity-0 translate-y-8"
                  }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold">{item.title}</h3>
                    {item.subtitle && (
                      <p className="mt-0.5 text-[11px] text-slate-200/80">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                  <span className="rounded-sm bg-sky-500/90 px-1.5 py-0.5 text-[9px] font-semibold text-slate-950">
                    Prime
                  </span>
                </div>

                <div className="mt-2 line-clamp-3 max-w-xs text-[11px] text-slate-100/85">
                  {item.description}
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-sky-500 to-sky-400 px-3 py-1.5 text-[11px] font-bold text-slate-950 shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 transition-shadow">
                    <span className="text-base leading-none">▶</span>
                    <span>Play</span>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-md bg-slate-900/90 backdrop-blur px-2.5 py-1.5 text-[11px] font-semibold ring-1 ring-slate-700/50 hover:ring-slate-600 transition-all">
                    <span>＋</span>
                    <span>Watchlist</span>
                  </div>
                  {item.tags && (
                    <div className="flex flex-wrap gap-1 text-[10px] text-slate-200/80">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-slate-900/80 px-2 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
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
    <div className="space-y-8 pb-12 pt-4">
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
