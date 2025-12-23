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

type Section = {
  id: string;
  title: string;
  items: CarouselItem[];
};

interface PrimeHomeProps {
  sections: Section[];
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-teal-800/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/60 via-transparent to-cyan-900/90" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-6 pt-20 pb-12 lg:flex-row lg:items-end lg:px-12 lg:pt-28 lg:pb-16">
        <div className="max-w-2xl space-y-5">
          <div className="inline-flex items-center gap-2 rounded bg-[#00a8e1]/10 px-3 py-1.5 text-xs font-medium text-[#00a8e1] border border-[#00a8e1]/30">
            <span className="h-2 w-2 rounded-full bg-[#00a8e1]" />
            New season available
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            The Rider of Cinque Terre
          </h1>
          <p className="text-base font-medium text-gray-400">
            Adventure • MTB • Liguria • 2025
          </p>
          <p className="text-base leading-relaxed text-gray-300">
            Discover incredible trails, villages, and views along the Ligurian
            coast. Ride steep climbs, technical descents, and hidden
            singletracks through the stunning Italian Riviera.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <button className="inline-flex items-center gap-3 rounded bg-white px-8 py-3 text-sm font-bold text-black hover:bg-gray-200 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
              <span>Play</span>
            </button>
            <button className="inline-flex items-center gap-2 rounded bg-gray-700/50 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-600/50 transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span>My List</span>
            </button>
          </div>
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
    <section className="mx-auto max-w-7xl space-y-3 px-6 lg:px-12">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <button className="text-sm font-medium text-[#00a8e1] hover:underline">
          See more
        </button>
      </div>

      <div
        className="flex gap-3 overflow-x-auto pb-8 pt-2 scrollbar-hide"
        onMouseLeave={() => setActiveId(null)}
      >
        {items.map((item) => {
          const isActive = item.id === activeId;

          return (
            <article
              key={item.id}
              className={`group relative flex flex-col flex-shrink-0 rounded bg-[#1a1a1a] cursor-pointer transition-all duration-800 ease-out overflow-hidden
                ${
                  isActive
                    ? "basis-80 shadow-2xl scale-105 z-10"
                    : "basis-80 hover:scale-102"
                }`}
              onMouseEnter={() => setActiveId(item.id)}
              onClick={() => setActiveId(isActive ? null : item.id)}
              onTouchStart={() => setActiveId(item.id)}
              style={isActive ? { aspectRatio: "1 / 1.618" } : undefined}
            >
              {/* Poster */}
              <div
                className={`relative w-full overflow-hidden transition-all duration-800 ease-out ${
                  isActive ? "flex-[0.618] rounded-t" : "aspect-[16/9] rounded"
                }`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className={`h-full w-full object-cover transition-all duration-800 ease-out ${
                    isActive ? "scale-105" : "scale-100"
                  }`}
                />
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-t transition-opacity duration-500 ${
                    isActive
                      ? "from-black via-black/40 to-transparent"
                      : "from-black/60 to-transparent"
                  }`}
                />
              </div>

              {/* Always-visible title overlay on image */}
              <div
                className={`pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent transition-all duration-800 ${
                  isActive ? "p-4" : "p-3"
                }`}
              >
                <h3
                  className={`line-clamp-1 font-bold text-white transition-all duration-500 ${
                    isActive ? "text-sm" : "text-sm"
                  }`}
                >
                  {item.title}
                </h3>
                {item.subtitle && !isActive && (
                  <p className="mt-1 text-xs text-gray-400">{item.subtitle}</p>
                )}
              </div>

              {/* Expanded info section */}
              <div
                className={`flex flex-col bg-[#1a1a1a] transition-all duration-800 ease-out overflow-hidden
                  ${
                    isActive
                      ? "flex-[0.382] opacity-100"
                      : "flex-[0] opacity-0 max-h-0"
                  }`}
              >
                <div className="flex flex-col h-full p-4 space-y-3">
                  {/* Description */}
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Tags */}
                  {item.tags && (
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className="text-xs text-gray-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex gap-2 pt-2">
                    <button className="flex-1 inline-flex items-center justify-center gap-2 rounded bg-white px-4 py-2.5 text-xs font-bold text-black hover:bg-gray-200 transition-all">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                      <span>Play</span>
                    </button>
                    <button className="inline-flex items-center justify-center rounded bg-gray-700/50 p-2.5 hover:bg-gray-600/50 transition-all">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="white"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
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

export default function PrimeHome({ sections }: PrimeHomeProps) {
  return (
    <div className="space-y-12 pb-16 pt-0 bg-[#0f171e]">
      <Hero />
      {sections.map((section) => (
        <CarouselRow
          key={section.id}
          title={section.title}
          items={section.items}
        />
      ))}
    </div>
  );
}
