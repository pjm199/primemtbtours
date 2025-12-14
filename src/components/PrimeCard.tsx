import React from "react";
import type { PrimeCardItem } from "../types/prime";

type PrimeCardProps = {
  item: PrimeCardItem;
  isActive: boolean;
  onHover: () => void;
  onBlur: () => void;
};

const PrimeCard: React.FC<PrimeCardProps> = ({
  item,
  isActive,
  onHover,
  onBlur,
}) => {
  return (
    <article
      className={`relative flex-shrink-0 overflow-hidden rounded-xl bg-slate-900/90 shadow-sm ring-1 ring-slate-800/80 cursor-pointer transition-all duration-300 ease-out
        ${isActive ? "basis-80" : "basis-44"}`}
      onMouseEnter={onHover}
      onMouseLeave={onBlur}
    >
      {/* Poster */}
      <div className="relative aspect-[16/9] w-full">
        <img
          src={item.imageUrl}
          alt={item.title}
          className={`h-full w-full object-cover transition-transform duration-300 ${
            isActive ? "scale-105" : "scale-100"
          }`}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
      </div>

      {/* Always visible bottom */}
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
        className={`pointer-events-none absolute inset-0 flex flex-col justify-between p-3 text-xs text-slate-50 transition-all duration-300
          ${
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
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
          <div className="inline-flex items-center gap-2 rounded-md bg-slate-950/90 px-3 py-1 text-[11px] font-semibold">
            <span className="text-base leading-none">▶</span>
            <span>Play</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-md bg-slate-900/80 px-2.5 py-1 text-[11px]">
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
};

export default PrimeCard;
