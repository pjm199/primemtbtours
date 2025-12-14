import React, { useState } from "react";
import type { PrimeCardItem } from "../types/prime";
import PrimeCard from "./PrimeCard";

type PrimeCarouselRowProps = {
  title: string;
  items: PrimeCardItem[];
};

const PrimeCarouselRow: React.FC<PrimeCarouselRowProps> = ({
  title,
  items,
}) => {
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
        className="flex gap-3 overflow-x-auto pb-4"
        onMouseLeave={() => setActiveId(null)}
      >
        {items.map((item) => (
          <PrimeCard
            key={item.id}
            item={item}
            isActive={item.id === activeId}
            onHover={() => setActiveId(item.id)}
            onBlur={() => setActiveId(null)}
          />
        ))}
      </div>
    </section>
  );
};

export default PrimeCarouselRow;
