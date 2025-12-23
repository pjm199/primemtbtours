import React from "react";

export type TrailCardProps = {
  title: string;
  area: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  length?: string;
  typeTag?: string;
  elevation?: string;
  description?: string;
};

const difficultyColors = {
  Beginner: "from-green-500 to-green-600",
  Intermediate: "from-blue-500 to-blue-600",
  Advanced: "from-orange-500 to-orange-600",
  Expert: "from-red-500 to-red-600",
};

export default function TrailCard(props: TrailCardProps) {
  const { title, area, difficulty, length, typeTag, elevation, description } =
    props;

  return (
    <div className="relative w-full rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      {/* Card Background */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-800 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 ring-1 ring-white/10" />

      <div className="relative p-5">
        {/* Type Tag & Difficulty */}
        <div className="flex items-center justify-between gap-2 mb-3">
          {typeTag && (
            <div className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs uppercase tracking-wide font-semibold">
              {typeTag}
            </div>
          )}
          <div
            className={`px-3 py-1 rounded-lg bg-linear-to-r ${difficultyColors[difficulty]} text-white text-xs font-bold uppercase tracking-wider`}
          >
            {difficulty}
          </div>
        </div>

        {/* Title */}
        <h4 className="text-xl font-bold text-white mb-2 leading-tight">
          {title}
        </h4>

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-400 mb-3 line-clamp-2">
            {description}
          </p>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm">
          {length && (
            <div className="flex items-center gap-1.5 text-white/70">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              {length}
            </div>
          )}
          {elevation && (
            <div className="flex items-center gap-1.5 text-white/70">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
              {elevation}
            </div>
          )}
        </div>
      </div>

      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-blue-500/0 to-blue-500/0 hover:from-blue-500/5 hover:to-transparent transition-all duration-300 pointer-events-none" />
    </div>
  );
}
