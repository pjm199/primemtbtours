import { useState } from "react";

export interface Tour {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  price: string;
  highlights: string[];
  ratio?: "landscape" | "portrait";
}

export interface TourCategory {
  id: string;
  title: string;
  tours: Tour[];
}

interface ToursSectionProps {
  categories: TourCategory[];
}

function TourCard({
  tour,
  categoryIndex,
}: {
  tour: Tour;
  categoryIndex: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Alternate between landscape and portrait by category (row), not by card
  const ratio =
    tour.ratio || (categoryIndex % 2 === 0 ? "landscape" : "portrait");
  const aspectRatio = ratio === "landscape" ? "1.618 / 1" : "1 / 1.618";

  const difficultyColors = {
    Beginner: "from-green-500 to-emerald-600",
    Intermediate: "from-amber-500 to-orange-600",
    Advanced: "from-red-500 to-rose-600",
  };

  return (
    <div
      className="relative w-full cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
    >
      {/* Card Container - Golden Ratio */}
      <div
        className="relative overflow-hidden rounded-lg transition-all duration-300 group-hover:scale-105 group-hover:z-10"
        style={{ aspectRatio }}
      >
        {/* Image */}
        <img
          src={tour.imageUrl}
          alt={tour.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-blue-550 via-slate-900/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Difficulty Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-linear-to-r ${
              difficultyColors[tour.difficulty]
            }`}
          >
            {tour.difficulty}
          </span>
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-4">
          {/* Title */}
          <h3 className="text-lg font-bold text-white mb-1 line-clamp-2">
            {tour.title}
          </h3>

          {/* Subtitle */}
          <p className="text-sm text-gray-300 mb-2">{tour.subtitle}</p>

          {/* Details on Hover */}
          <div
            className={`transition-all duration-300 ${
              isHovered ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            {/* Description */}
            <p className="text-xs text-gray-400 mb-3 line-clamp-2">
              {tour.description}
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap gap-1 mb-3">
              {tour.highlights.slice(0, 3).map((highlight, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-0.5 bg-white/10 text-white/80 rounded"
                >
                  {highlight}
                </span>
              ))}
            </div>

            {/* Duration & Price */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-white/70">⏱️ {tour.duration}</span>
              <span className="text-sm font-bold text-[#00a8e1]">
                {tour.price}
              </span>
            </div>

            {/* Book Button */}
            <button className="w-full py-2 bg-white text-black text-sm font-bold rounded hover:bg-gray-200 transition-all">
              Book Tour
            </button>
          </div>

          {/* Show More Indicator when not hovered */}
          {!isHovered && (
            <div className="flex items-center gap-1 mt-2 text-xs text-white/60">
              <span className="hidden sm:inline">Hover for details</span>
              <span className="sm:hidden">Tap for details</span>
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TourCarousel({
  category,
  categoryIndex,
}: {
  category: TourCategory;
  categoryIndex: number;
}) {
  return (
    <div className="mb-12">
      {/* Category Title */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 px-4 sm:px-6 md:px-12">
        {category.title}
      </h2>

      {/* Carousel Container */}
      <div className="relative group/carousel overflow-visible">
        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 px-4 sm:px-6 md:px-12 py-4">
          {category.tours.map((tour, index) => (
            <TourCard key={tour.id} tour={tour} categoryIndex={categoryIndex} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ToursSection({ categories }: ToursSectionProps) {
  return (
    <section className="w-full bg-[#0f172a] py-12">
      {categories.map((category, categoryIndex) => (
        <TourCarousel
          key={category.id}
          category={category}
          categoryIndex={categoryIndex}
        />
      ))}
    </section>
  );
}
