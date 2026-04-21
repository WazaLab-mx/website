"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Header } from "@/app/[locale]/components/ui/header";
import { Footer } from "@/app/[locale]/components/ui/footer";
import { OperatingModelSection } from "@/components/OperatingModelSection";
import { SectionHeader } from "./components/SectionHeader";
import { ValueCard } from "./components/ValueCard";
import { ApproachItem } from "./components/ApproachItem";
import { VALUE_KEYS, APPROACH_KEYS, NAME_MEANING_KEYS } from "./about.config";

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="w-full py-24 md:py-40 bg-white dark:bg-gray-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 opacity-60" />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center text-center space-y-10 max-w-5xl mx-auto">
              <div className="inline-flex items-center rounded-full border-2 border-black/10 dark:border-white/10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-black dark:text-white shadow-lg">
                <span className="tracking-wide">{t("hero.badge")}</span>
              </div>
              <div className="space-y-4">
                <h1 className="text-5xl font-black tracking-tight text-black dark:text-white sm:text-6xl lg:text-7xl xl:text-8xl">
                  {t("hero.title")}{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10">{t("hero.titleHighlight")}</span>
                    <div className="absolute -bottom-2 left-0 right-0 h-4 bg-black/5 dark:bg-white/5 -rotate-1" />
                  </span>
                </h1>
                <div className="w-24 h-1 bg-black dark:bg-white mx-auto" />
              </div>
              <p className="max-w-4xl text-gray-800 dark:text-gray-200 text-2xl font-light leading-relaxed tracking-wide">
                {t("hero.description")}
                <span className="font-semibold text-black dark:text-white">
                  {" "}{t("hero.descriptionHighlight")}
                </span>{" "}
                {t("hero.descriptionEnd")}
              </p>
              <Button
                asChild
                className="bg-black hover:bg-gray-900 text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Link href="#our-story" className="flex items-center gap-3">
                  {t("hero.cta")} <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16 max-w-6xl">
          {/* Brand Story */}
          <section id="our-story" className="mb-40 scroll-mt-20">
            <div className="grid lg:grid-cols-2 gap-20 items-start">
              <div className="space-y-10">
                <SectionHeader
                  label={t("origin.label")}
                  title={t("origin.title")}
                  align="left"
                />

                <div className="space-y-8 text-lg leading-relaxed">
                  <p className="text-gray-800 dark:text-gray-200 font-light">
                    {t("origin.paragraph1")}
                    <span className="font-semibold text-black dark:text-white">
                      {" "}{t("origin.paragraph1Highlight")}
                    </span>
                    {t("origin.paragraph1End")}
                  </p>
                  <p className="text-gray-800 dark:text-gray-200 font-light">
                    {t("origin.paragraph2")}
                    <span className="font-semibold text-black dark:text-white">
                      {" "}{t("origin.paragraph2Highlight")}
                    </span>{" "}
                    {t("origin.paragraph2End")}
                  </p>
                </div>

                <div className="pt-8 border-t-2 border-gray-100 dark:border-gray-800 space-y-6">
                  <h3 className="text-2xl font-bold text-black dark:text-white">
                    {t("nameMeaning.title")}
                  </h3>
                  <p className="text-lg text-gray-800 dark:text-gray-200 font-light leading-relaxed">
                    {t("nameMeaning.intro")}
                  </p>
                  <ul className="space-y-6">
                    {NAME_MEANING_KEYS.map((key) => (
                      <li key={key} className="flex items-start gap-4 group">
                        <CheckCircle className="h-6 w-6 text-black dark:text-white mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="text-lg text-gray-800 dark:text-gray-200 font-light">
                          {t(`nameMeaning.${key}`)}{" "}
                          <span className="font-semibold text-black dark:text-white">
                            {t(`nameMeaning.${key}Highlight`)}
                          </span>
                          {t(`nameMeaning.${key}End`)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-lg text-gray-800 dark:text-gray-200 font-light leading-relaxed mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                    {t("nameMeaning.summary")}{" "}
                    <span className="font-semibold text-black dark:text-white">
                      {t("nameMeaning.summaryHighlight")}
                    </span>
                    {t("nameMeaning.summaryEnd")}
                  </p>
                </div>
              </div>

              <div className="relative h-[600px] rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-900 shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent z-10" />
                <Image
                  src="/images/about-story.jpg"
                  alt={t("origin.imageAlt")}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 to-transparent z-10" />
              </div>
            </div>
          </section>

          {/* Manifesto */}
          <section className="mb-40 bg-black px-8 md:px-16 py-20 md:py-24 rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black" />
            <div className="max-w-6xl mx-auto relative z-10">
              <div className="mb-16">
                <SectionHeader
                  label={t("manifesto.label")}
                  title={t("manifesto.title")}
                  variant="dark"
                />
              </div>

              <div className="text-white">
                <p className="italic mb-16 text-3xl md:text-4xl font-light text-center text-gray-300 leading-relaxed">
                  {t("manifesto.subtitle")}
                </p>

                <div className="grid md:grid-cols-2 gap-16 lg:gap-20">
                  <div className="space-y-10">
                    {[1, 2, 3].map((i) => (
                      <p key={i} className="text-xl leading-relaxed font-light text-gray-100">
                        {t(`manifesto.belief${i}`)}{" "}
                        <span className="font-semibold text-white">
                          {t(`manifesto.belief${i}Highlight`)}
                        </span>
                        {t(`manifesto.belief${i}End`)}
                      </p>
                    ))}
                  </div>
                  <div className="space-y-10">
                    {[4, 5, 6].map((i) => (
                      <p key={i} className="text-xl leading-relaxed font-light text-gray-100">
                        {t(`manifesto.belief${i}`)}{" "}
                        <span className="font-semibold text-white">
                          {t(`manifesto.belief${i}Highlight`)}
                        </span>
                        {t(`manifesto.belief${i}End`)}
                      </p>
                    ))}
                    <div className="pt-8 border-t border-white/20">
                      <p className="font-black text-2xl md:text-3xl text-white leading-tight">
                        {t("manifesto.closing")}
                        <br />
                        <span className="text-gray-300">
                          {t("manifesto.closingSubtext")}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Operating Model */}
          <OperatingModelSection variant="about" includeId={true} />

          {/* Mission & Vision */}
          <section className="mb-40">
            <div className="mb-20">
              <SectionHeader label={t("mission.label")} title={t("mission.title")} />
            </div>

            <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
              {[
                {
                  titleKey: "missionTitle",
                  textKey: "missionText",
                  highlightKey: "missionHighlight1",
                  middleKey: "missionMiddle",
                  highlight2Key: "missionHighlight2",
                  endKey: "missionEnd",
                  primary: true,
                },
                {
                  titleKey: "visionTitle",
                  textKey: "visionText",
                  highlightKey: "visionHighlight1",
                  middleKey: "visionMiddle",
                  highlight2Key: "visionHighlight2",
                  endKey: "visionEnd",
                  primary: false,
                },
              ].map((card) => (
                <div key={card.titleKey} className="group">
                  <div className="bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 p-12 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                    <div className="space-y-8">
                      <div className="flex items-center gap-4">
                        <div
                          className={`h-2 w-20 rounded-full group-hover:w-24 transition-all duration-500 ${
                            card.primary
                              ? "bg-black dark:bg-white"
                              : "bg-gray-600 group-hover:bg-black dark:group-hover:bg-white"
                          }`}
                        />
                        <div
                          className={`h-2 w-8 bg-gray-300 dark:bg-gray-700 rounded-full transition-all duration-500 ${
                            card.primary
                              ? "group-hover:bg-black dark:group-hover:bg-white"
                              : "group-hover:bg-gray-600"
                          }`}
                        />
                      </div>
                      <h3 className="text-3xl font-black text-black dark:text-white leading-tight">
                        {t(`mission.${card.titleKey}`)}
                      </h3>
                      <p className="text-xl leading-relaxed text-gray-800 dark:text-gray-200 font-light">
                        {t(`mission.${card.textKey}`)}
                        <span className="font-semibold text-black dark:text-white">
                          {" "}{t(`mission.${card.highlightKey}`)}
                        </span>{" "}
                        {t(`mission.${card.middleKey}`)}
                        <span className="font-semibold text-black dark:text-white">
                          {" "}{t(`mission.${card.highlight2Key}`)}
                        </span>
                        {t(`mission.${card.endKey}`)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Brand Values */}
          <section className="mb-40">
            <div className="mb-20">
              <SectionHeader label={t("values.label")} title={t("values.title")} />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
              {VALUE_KEYS.map((key) => (
                <ValueCard key={key} valueKey={key} />
              ))}
            </div>
          </section>

          {/* Our Approach */}
          <section className="mb-40">
            <div className="mb-20">
              <SectionHeader label={t("approach.label")} title={t("approach.title")} />
            </div>

            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="relative h-[600px] rounded-3xl overflow-hidden bg-gray-50 dark:bg-gray-900 order-2 lg:order-1 shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent z-10" />
                <Image
                  src="/images/about-approach.jpg"
                  alt={t("approach.imageAlt")}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent z-10" />
              </div>

              <div className="order-1 lg:order-2 space-y-12">
                {APPROACH_KEYS.map((key, i) => (
                  <ApproachItem
                    key={key}
                    approachKey={key}
                    emphasized={i % 2 === 0}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-black px-8 md:px-16 py-20 md:py-24 rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 to-black" />
            <div className="max-w-4xl mx-auto relative z-10 space-y-10">
              <SectionHeader
                label={t("cta.label")}
                title={t("cta.title")}
                variant="dark"
              />

              <p className="text-2xl md:text-3xl font-light text-gray-300 leading-relaxed max-w-3xl mx-auto">
                {t("cta.description")}
                <span className="font-semibold text-white">
                  {" "}{t("cta.descriptionHighlight")}
                </span>
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
                <Button
                  asChild
                  className="bg-white hover:bg-gray-100 text-black px-10 py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Link href="/contact" className="flex items-center gap-3">
                    {t("cta.primaryButton")} <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-2 border-white/40 text-white hover:bg-white hover:text-black px-10 py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Link href="/#servicios" className="flex items-center gap-3">
                    {t("cta.secondaryButton")} <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
