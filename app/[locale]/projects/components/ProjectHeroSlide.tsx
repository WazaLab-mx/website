"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

interface ProjectHeroSlideProps {
  project: Project;
  isActive: boolean;
  direction: "next" | "prev" | null;
}

export function ProjectHeroSlide({ project, isActive, direction }: ProjectHeroSlideProps) {
  const t = useTranslations("projects.ui");

  return (
    <div
      className={`absolute inset-0 transition-all duration-1000 ease-out ${
        isActive
          ? "opacity-100 z-10"
          : direction === "next"
          ? "opacity-0 z-0 translate-x-8"
          : "opacity-0 z-0 -translate-x-8"
      }`}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black" />

      {/* Subtle gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-primary/5" />

      {/* Content Container */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* Left Side - Text Content */}
            <div
              className={`space-y-6 transition-all duration-700 delay-200 ${
                isActive
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-white/10 text-white/80 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[0.95]">
                {project.title}
              </h2>

              {/* Description */}
              <p className="text-base md:text-lg text-zinc-400 leading-relaxed max-w-lg">
                {project.description.length > 180
                  ? project.description.substring(0, 180) + "..."
                  : project.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-black hover:bg-zinc-200 font-semibold px-6 group"
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    {t("explore")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-zinc-700 text-white hover:bg-zinc-800 font-semibold px-6"
                >
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    {t("viewDetails")}
                  </a>
                </Button>
              </div>
            </div>

            {/* Right Side - Image in Browser Mockup */}
            <div
              className={`relative transition-all duration-700 delay-300 ${
                isActive
                  ? "opacity-100 translate-x-0 scale-100"
                  : "opacity-0 translate-x-8 scale-95"
              }`}
            >
              {/* Browser Window Mockup */}
              <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-zinc-800 bg-zinc-900">
                {/* Browser Top Bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-zinc-800/80 border-b border-zinc-700">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-zinc-700/50 rounded-md px-3 py-1 text-xs text-zinc-400 truncate max-w-xs">
                      {project.link.replace('https://', '').replace('http://', '')}
                    </div>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="relative aspect-video bg-zinc-950">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -z-10 -inset-4 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl blur-3xl opacity-30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
