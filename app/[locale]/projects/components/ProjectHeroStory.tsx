"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { ProjectHeroSlide } from "./ProjectHeroSlide";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

interface ProjectHeroStoryProps {
  projects: Project[];
}

const AUTO_ADVANCE_INTERVAL = 6000;

export function ProjectHeroStory({ projects }: ProjectHeroStoryProps) {
  const t = useTranslations("projects.ui");
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const goToNext = useCallback(() => {
    setDirection("next");
    setActiveIndex((prev) => (prev + 1) % projects.length);
    setProgress(0);
  }, [projects.length]);

  const goToPrev = useCallback(() => {
    setDirection("prev");
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setProgress(0);
  }, [projects.length]);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > activeIndex ? "next" : "prev");
    setActiveIndex(index);
    setProgress(0);
  }, [activeIndex]);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goToNext();
          return 0;
        }
        return prev + (100 / (AUTO_ADVANCE_INTERVAL / 50));
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [isPaused, goToNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {projects.map((project, index) => (
        <ProjectHeroSlide
          key={project.id}
          project={project}
          isActive={activeIndex === index}
          direction={direction}
        />
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-black/50 transition-all duration-300 group"
        aria-label={t("previousProject")}
      >
        <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-black/50 transition-all duration-300 group"
        aria-label={t("nextProject")}
      >
        <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
      </button>

      {/* Bottom Navigation */}
      <div className="absolute bottom-8 left-0 right-0 z-30">
        <div className="container px-6 md:px-12 lg:px-20">
          <div className="flex items-center gap-6">
            {/* Project Thumbnails / Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  onClick={() => goToSlide(index)}
                  className={`relative overflow-hidden transition-all duration-500 ${
                    activeIndex === index
                      ? "w-24 md:w-32"
                      : "w-8 md:w-10 hover:w-12"
                  }`}
                  aria-label={t("goTo", { title: project.title })}
                >
                  {/* Background bar */}
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeIndex === index
                        ? "bg-white/30"
                        : "bg-white/20 hover:bg-white/30"
                    }`}
                  >
                    {/* Progress fill */}
                    {activeIndex === index && (
                      <div
                        className="h-full bg-white rounded-full transition-all duration-100"
                        style={{ width: `${progress}%` }}
                      />
                    )}
                  </div>

                  {/* Title label (only for active) */}
                  {activeIndex === index && (
                    <span className="absolute -top-6 left-0 text-xs font-medium text-white/80 whitespace-nowrap">
                      {project.title.length > 15
                        ? project.title.substring(0, 15) + "..."
                        : project.title}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Counter */}
            <div className="ml-auto text-white/60 text-sm font-medium tabular-nums">
              <span className="text-white">{String(activeIndex + 1).padStart(2, "0")}</span>
              <span className="mx-1">/</span>
              <span>{String(projects.length).padStart(2, "0")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-xs font-medium text-white/80 tracking-widest uppercase">
          {t("scrollForMore")}
        </span>
        <div className="w-px h-6 bg-gradient-to-b from-white/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
