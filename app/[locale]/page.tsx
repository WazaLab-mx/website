'use client';

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Header } from "@/app/[locale]/components/ui/header";
import { Footer } from "@/app/[locale]/components/ui/footer";

const FaultyTerminal = dynamic(() => import("@/components/ui/FaultyTerminal"), { ssr: false });

const pillarKeys = ["0", "1", "2"] as const;
const impactKeys = ["0", "1", "2"] as const;
const servicesKeys = ["0", "1", "2"] as const;

const projects = [
  {
    title: "San Luis Way",
    image: "/images/project-screenshots/san-luis-way.png",
    link: "https://sanluisway.com",
    tagKey: "0",
    stack: ["Next.js", "Supabase", "OpenAI", "Tailwind"],
  },
  {
    title: "GlamLocal",
    image: "/images/project-screenshots/glamlocal.png",
    link: "https://glamlocal.app/",
    tagKey: "1",
    stack: ["Next.js", "Supabase", "OpenAI", "Tailwind"],
  },
  {
    title: "BriefBoy",
    image: "/images/project-screenshots/briefboy.png",
    link: "https://brief-boy.com/landing",
    tagKey: "2",
    stack: ["React", "Node.js", "OpenAI", "Tailwind"],
  },
] as const;

export default function Home() {
  const t = useTranslations("home");
  const tA11y = useTranslations("common.accessibility");

  const scrollToPillars = () => {
    document.getElementById("pillars")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
      <Header />

      <main className="flex-1" role="main" aria-label={tA11y("mainContent")}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-black text-white px-4 py-2 rounded-md"
          aria-label={t("hero.skipLink")}
        >
          {t("hero.skipLink")}
        </a>

        {/* HERO */}
        <section
          id="main-content"
          className="relative w-full h-screen overflow-hidden bg-black"
          role="banner"
          aria-label={t("hero.ariaLabel")}
        >
          <div className="absolute inset-0 z-0">
            <FaultyTerminal
              scale={1.6}
              gridMul={[4, 2.5]}
              digitSize={1.2}
              timeScale={0.25}
              pause={false}
              scanlineIntensity={0.08}
              glitchAmount={0.2}
              flickerAmount={0.15}
              noiseAmp={1.0}
              chromaticAberration={0}
              dither={0}
              curvature={0}
              tint="#ffffff"
              mouseReact
              mouseStrength={0.8}
              pageLoadAnimation
              brightness={0.5}
              className="w-full h-full"
            />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)] z-[1]" />

          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="container px-6 mx-auto">
              <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                <h1
                  className="text-8xl md:text-9xl lg:text-[14rem] xl:text-[16rem] font-black tracking-tighter text-white glitch-text blur-in leading-none"
                  data-text="WAZA"
                >
                  WAZA
                </h1>
                <p className="mt-8 md:mt-10 text-xl md:text-2xl lg:text-3xl font-light text-white/80 max-w-2xl leading-relaxed blur-in-delay-2">
                  {t("hero.title")}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={scrollToPillars}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors duration-300 blur-in-delay-3"
            aria-label={t("hero.scroll")}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium">{t("hero.scroll")}</span>
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </button>
        </section>

        {/* PILLARS */}
        <section
          id="pillars"
          className="w-full py-32 md:py-48 bg-white dark:bg-gray-950"
        >
          <div className="container max-w-6xl px-6 mx-auto">
            <div className="mb-20 md:mb-24 smooth-reveal">
              <span className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 font-medium">
                {t("pillars.eyebrow")}
              </span>
              <h2 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-black dark:text-white max-w-3xl leading-[1.05]">
                {t("pillars.title")}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-16 md:gap-12">
              {pillarKeys.map((key, i) => (
                <div key={key} className={`smooth-reveal stagger-${i + 1}`}>
                  <div className="text-5xl md:text-6xl font-black text-gray-200 dark:text-gray-800 mb-6 tabular-nums leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-3 text-black dark:text-white">
                    {t(`pillars.items.${key}.title`)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base">
                    {t(`pillars.items.${key}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* IMPACT */}
        <section className="w-full py-20 md:py-28 bg-black text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
          <div className="container max-w-6xl px-6 mx-auto relative">
            <div className="mb-16 md:mb-20 smooth-reveal">
              <span className="text-xs uppercase tracking-[0.3em] text-white/50 font-medium">
                {t("impact.eyebrow")}
              </span>
              <h2 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05] max-w-3xl">
                {t("impact.title")}
              </h2>
            </div>

            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-10 md:gap-16 border-t border-white/15 pt-12">
              {impactKeys.map((key, i) => (
                <div key={key} className={`smooth-reveal stagger-${i + 1} flex flex-col gap-3`}>
                  <div className="text-xs uppercase tracking-[0.3em] text-white/50 font-medium">
                    {t(`impact.items.${key}.label`)}
                  </div>
                  <div className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white tabular-nums leading-none">
                    {t(`impact.items.${key}.value`)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WORK */}
        <section className="w-full py-32 md:py-48 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
          <div className="container max-w-7xl px-6 mx-auto">
            <div className="mb-16 md:mb-24 smooth-reveal flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 font-medium">
                  {t("work.eyebrow")}
                </span>
                <h2 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-black dark:text-white leading-[1.05]">
                  {t("work.title")}
                </h2>
              </div>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 text-sm uppercase tracking-widest text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
              >
                <span>{t("work.viewAll")}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {projects.map((p, i) => (
                <Link
                  key={p.title}
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`smooth-reveal stagger-${i + 1} group block`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="mt-6 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-semibold text-black dark:text-white">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-md leading-relaxed">
                        {t(`work.items.${p.tagKey}.description`)}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {p.stack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ArrowUpRight className="h-6 w-6 flex-shrink-0 mt-1 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES / HOW WE WORK */}
        <section className="w-full py-32 md:py-48 bg-white dark:bg-gray-950">
          <div className="container max-w-6xl px-6 mx-auto">
            <div className="mb-20 md:mb-24 smooth-reveal">
              <span className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 font-medium">
                {t("services.eyebrow")}
              </span>
              <h2 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-black dark:text-white leading-[1.05] max-w-3xl">
                {t("services.title")}
              </h2>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-gray-800 border-t border-b border-gray-200 dark:border-gray-800">
              {servicesKeys.map((key, i) => (
                <div
                  key={key}
                  className={`smooth-reveal stagger-${i + 1} group grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-6 md:gap-12 py-10 md:py-12 items-baseline transition-colors`}
                >
                  <div className="flex items-baseline gap-6">
                    <span className="text-sm tabular-nums text-gray-400 dark:text-gray-600 font-medium">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-black dark:text-white">
                      {t(`services.items.${key}.title`)}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed max-w-xl">
                    {t(`services.items.${key}.description`)}
                  </p>
                  <div className="hidden md:flex items-center text-gray-400 group-hover:text-black dark:group-hover:text-white transition-all duration-300 group-hover:translate-x-1">
                    <ArrowUpRight className="h-6 w-6" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CALCULATOR TEASER */}
        <section className="w-full py-20 md:py-28 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
          <div className="container max-w-5xl px-6 mx-auto">
            <div className="smooth-reveal flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-12">
              <div className="max-w-2xl">
                <span className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 font-medium">
                  {t("tool.eyebrow")}
                </span>
                <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-black dark:text-white leading-[1.1]">
                  {t("tool.title")}
                </h2>
                <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg">
                  {t("tool.description")}
                </p>
              </div>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black px-8 py-6 text-base rounded-lg transition-all duration-300 self-start md:self-end shrink-0"
              >
                <Link href="/calculator" className="inline-flex items-center gap-2">
                  <span>{t("tool.button")}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          id="cta"
          className="w-full py-40 md:py-56 bg-gray-50 dark:bg-gray-900 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }} />
          <div className="container max-w-4xl px-6 mx-auto text-center relative">
            <h2 className="smooth-reveal text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-black dark:text-white leading-[0.95]">
              {t("cta.title")}
            </h2>
            <p className="smooth-reveal stagger-2 mt-8 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
              {t("cta.description")}
            </p>
            <div className="smooth-reveal stagger-3 mt-12 md:mt-14">
              <Button
                asChild
                size="lg"
                className="bg-black hover:bg-gray-900 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black px-10 py-6 text-base rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/contact" className="inline-flex items-center gap-2">
                  <span>{t("cta.button")}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
