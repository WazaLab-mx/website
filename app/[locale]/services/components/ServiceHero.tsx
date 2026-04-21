'use client';

import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";

interface ServiceHeroProps {
  backLabel: string;
  badge: string;
  title: string;
  description: string;
}

export function ServiceHero({ backLabel, badge, title, description }: ServiceHeroProps) {
  return (
    <>
      <div className="container py-6">
        <Link
          href="/services"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {backLabel}
        </Link>
      </div>

      <section className="relative py-20 md:py-32 overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 z-0"></div>
        <div className="container relative z-10">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <div className="inline-flex items-center rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium bg-white/5 text-gray-300 hover:bg-white/10 transition-colors">
              {badge}
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white">
              {title}
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
