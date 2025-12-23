import { useEffect, useState } from "react";

interface Video {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  badge: string;
  tags: string[];
  rating: string;
}

interface HeroCarouselProps {
  videos: Video[];
}

export default function HeroCarousel({ videos }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  // Show image for 3 seconds, then video for 5 seconds, then next slide
  useEffect(() => {
    setShowVideo(false); // Reset to image when slide changes

    // After 3 seconds, show video
    const imageTimer = setTimeout(() => {
      if (videos[currentIndex]?.videoUrl) {
        setShowVideo(true);
      }
    }, 3000);

    // After 3s (image) + 5s (video) = 8s total, go to next slide
    const slideTimer = setTimeout(() => {
      if (!isPaused) {
        setCurrentIndex((prev) => (prev + 1) % videos.length);
      }
    }, 8000);

    return () => {
      clearTimeout(imageTimer);
      clearTimeout(slideTimer);
    };
  }, [currentIndex, isPaused, videos]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentVideo = videos[currentIndex];

  return (
    <div
      className="relative w-full overflow-hidden group"
      style={{ aspectRatio: "1.618 / 1" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images and Videos */}
      {videos.map((video, index) => (
        <div
          key={video.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Fallback background - will show if image fails */}
          <div className="absolute inset-0 bg-linear-to-br from-blue-950 via-slate-900 to-blue-900" />

          {/* Image (shown first for 3 seconds) */}
          {index === currentIndex && !showVideo && (
            <>
              <img
                src={video.imageUrl}
                alt={video.title}
                className="absolute inset-0 w-full h-full object-cover scale-105 z-10"
                style={{
                  objectPosition: "65% center",
                  filter: "brightness(1.05) contrast(1.15) saturate(1.1)",
                }}
                onLoad={() => console.log("Image loaded:", video.title)}
                onError={(e) => {
                  console.error(
                    "Image failed to load:",
                    video.title,
                    video.imageUrl
                  );
                }}
                crossOrigin="anonymous"
              />
              {/* Prime Video Style Gradients - Clean dark blue left, spotlight on right */}
              <div
                className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-900/60 to-transparent z-20"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.75) 25%, rgba(15,23,42,0.5) 45%, rgba(15,23,42,0.25) 65%, transparent 85%)",
                }}
              />
              {/* Radial spotlight on right side */}
              <div
                className="absolute inset-0 z-20"
                style={{
                  background:
                    "radial-gradient(ellipse 800px 600px at 75% 50%, rgba(255,255,255,0.12) 0%, transparent 50%)",
                }}
              />
              <div
                className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent z-20"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 0%, transparent 50%, rgba(15,23,42,0.4) 75%, rgb(15,23,42) 100%)",
                }}
              />
              {/* Vignette effect */}
              <div
                className="absolute inset-0 z-20"
                style={{ boxShadow: "inset 0 0 200px rgba(15,23,42,0.6)" }}
              />
            </>
          )}

          {/* YouTube Video (shown after 3 seconds, plays for 5 seconds) */}
          {index === currentIndex && showVideo && video.videoUrl && (
            <div className="absolute inset-0 w-full h-full z-10">
              <iframe
                src={`https://www.youtube.com/embed/${video.videoUrl}?autoplay=1&mute=1&controls=0&loop=1&playlist=${video.videoUrl}&modestbranding=1&rel=0`}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-105"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  border: "none",
                  pointerEvents: "none",
                  width: "100vw",
                  height: "100vh",
                  minWidth: "100%",
                  minHeight: "100%",
                  objectPosition: "65% center",
                  filter: "brightness(1.05) contrast(1.15) saturate(1.1)",
                }}
              />
              {/* Prime Video Style Gradients - Clean black matching image */}
              <div
                className="absolute inset-0 pointer-events-none z-20"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.75) 25%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.25) 65%, transparent 85%)",
                }}
              />
              {/* Radial spotlight on right side */}
              <div
                className="absolute inset-0 pointer-events-none z-20"
                style={{
                  background:
                    "radial-gradient(ellipse 800px 600px at 75% 50%, rgba(255,255,255,0.12) 0%, transparent 50%)",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none z-20"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 0%, transparent 50%, rgba(0,0,0,0.4) 75%, #000000 100%)",
                }}
              />
              {/* Vignette effect */}
              <div
                className="absolute inset-0 pointer-events-none z-20"
                style={{ boxShadow: "inset 0 0 200px rgba(0,0,0,0.5)" }}
              />
            </div>
          )}
        </div>
      ))}

      {/* Content Overlay - Prime Video positioning */}
      <div className="relative z-30 h-full flex flex-col justify-between pb-20 md:pb-28 pt-20 md:pt-28 px-6 md:px-12 lg:px-20 max-w-full md:max-w-[85%] lg:max-w-[45%]">
        {/* Spacer to push content to bottom while keeping badge visible */}
        <div className="flex-1 min-h-5"></div>

        <div className="flex flex-col">
          {/* Logo + Badge */}
          <div className="flex items-center gap-4 mb-4">
            {/* Logo could go here if available */}
            {/* Badge */}
            <span className="inline-block bg-linear-to-r from-amber-500 to-orange-500 text-white px-4 py-1.5 rounded text-sm font-semibold">
              {currentVideo.badge}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-2 md:mb-3 max-w-3xl">
            {currentVideo.title}
          </h1>

          {/* Subtitle */}
          <p className="text-sm md:text-lg lg:text-xl text-gray-300 mb-3 md:mb-4">
            {currentVideo.subtitle}
          </p>

          {/* Description */}
          <p className="hidden sm:block text-sm md:text-base lg:text-lg text-gray-200 mb-4 md:mb-5 max-w-2xl leading-relaxed">
            {currentVideo.description}
          </p>

          {/* Rating, Year and Tags - Prime Video Style */}
          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4 md:mb-6 text-xs md:text-sm">
            {/* Rating */}
            <div className="flex items-center gap-1.5">
              <svg
                className="w-5 h-5 text-[#00a8e1]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-white font-semibold text-base">
                {currentVideo.rating}
              </span>
            </div>

            <span className="text-gray-400">•</span>

            {/* Tags */}
            {currentVideo.tags.map((tag, index) => (
              <span key={tag} className="flex items-center gap-3">
                <span className="text-gray-300 font-medium">{tag}</span>
                {index < currentVideo.tags.length - 1 && (
                  <span className="text-gray-500">•</span>
                )}
              </span>
            ))}
          </div>

          {/* Action Buttons - Prime Video Style */}
          <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8">
            <button className="flex items-center gap-2 px-7 py-2.5 bg-white text-black font-bold rounded-md hover:bg-gray-200 transition-all duration-200 group/btn text-base">
              <svg
                className="w-5 h-5 group-hover/btn:scale-110 transition-transform"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
              Play
            </button>
            <button className="flex items-center gap-2 px-7 py-2.5 bg-gray-600/80 backdrop-blur-sm text-white font-bold rounded-md hover:bg-gray-500/80 transition-all duration-200 text-base">
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* Previous Arrow - Left Side */}
      <button
        onClick={() =>
          goToSlide((currentIndex - 1 + videos.length) % videos.length)
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all duration-200 opacity-0 group-hover:opacity-100 flex items-center justify-center"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Next Arrow - Right Side */}
      <button
        onClick={() => goToSlide((currentIndex + 1) % videos.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all duration-200 opacity-0 group-hover:opacity-100 flex items-center justify-center"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentIndex
                ? "w-12 h-1.5 bg-white"
                : "w-8 h-1.5 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
