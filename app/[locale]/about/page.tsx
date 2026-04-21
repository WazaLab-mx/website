"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Header } from "@/app/[locale]/components/ui/header";
import { Footer } from "@/app/[locale]/components/ui/footer";
import { OperatingModelSection } from "@/components/OperatingModelSection";

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-24 md:py-40 bg-white dark:bg-gray-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 opacity-60"></div>
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
                    <div className="absolute -bottom-2 left-0 right-0 h-4 bg-black/5 dark:bg-white/5 -rotate-1"></div>
                  </span>
                </h1>
                <div className="w-24 h-1 bg-black dark:bg-white mx-auto"></div>
              </div>
              <p className="max-w-4xl text-gray-800 dark:text-gray-200 text-2xl font-light leading-relaxed tracking-wide">
                {t("hero.description")}
                <span className="font-semibold text-black dark:text-white"> {t("hero.descriptionHighlight")}</span> {t("hero.descriptionEnd")}
              </p>
              <div className="pt-6">
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
          </div>
        </section>

        <div className="container mx-auto px-4 py-16 max-w-6xl">
          {/* Brand Story Section */}
          <section id="our-story" className="mb-40 scroll-mt-20">
            <div className="grid lg:grid-cols-2 gap-20 items-start">
              <div className="space-y-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-0.5 bg-black dark:bg-white"></div>
                    <span className="text-sm font-bold uppercase tracking-widest text-black dark:text-white">{t("origin.label")}</span>
                  </div>
                  <h2 className="text-4xl font-black text-black dark:text-white leading-tight lg:text-5xl">
                    {t("origin.title")}
                  </h2>
                </div>

                <div className="space-y-8 text-lg leading-relaxed">
                  <p className="text-gray-800 dark:text-gray-200 font-light">
                    {t("origin.paragraph1")}
                    <span className="font-semibold text-black dark:text-white"> {t("origin.paragraph1Highlight")}</span>
                    {t("origin.paragraph1End")}
                  </p>
                  <p className="text-gray-800 dark:text-gray-200 font-light">
                    {t("origin.paragraph2")}
                    <span className="font-semibold text-black dark:text-white"> {t("origin.paragraph2Highlight")}</span>
                    {" "}{t("origin.paragraph2End")}
                  </p>
                </div>

                <div className="pt-8 border-t-2 border-gray-100 dark:border-gray-800">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-black dark:text-white">{t("nameMeaning.title")}</h3>
                    <p className="text-lg text-gray-800 dark:text-gray-200 font-light leading-relaxed">
                      {t("nameMeaning.intro")}
                    </p>
                    <ul className="space-y-6">
                      <li className="flex items-start gap-4 group">
                        <CheckCircle className="h-6 w-6 text-black dark:text-white mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="text-lg text-gray-800 dark:text-gray-200 font-light">
                          {t("nameMeaning.japanese")} <span className="font-semibold text-black dark:text-white">{t("nameMeaning.japaneseHighlight")}</span> {t("nameMeaning.japaneseEnd")}
                        </span>
                      </li>
                      <li className="flex items-start gap-4 group">
                        <CheckCircle className="h-6 w-6 text-black dark:text-white mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="text-lg text-gray-800 dark:text-gray-200 font-light">
                          {t("nameMeaning.english")} <span className="font-semibold text-black dark:text-white">{t("nameMeaning.englishHighlight")}</span> {t("nameMeaning.englishEnd")}
                        </span>
                      </li>
                      <li className="flex items-start gap-4 group">
                        <CheckCircle className="h-6 w-6 text-black dark:text-white mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="text-lg text-gray-800 dark:text-gray-200 font-light">
                          {t("nameMeaning.swahili")} <span className="font-semibold text-black dark:text-white">{t("nameMeaning.swahiliHighlight")}</span>
                        </span>
                      </li>
                      <li className="flex items-start gap-4 group">
                        <CheckCircle className="h-6 w-6 text-black dark:text-white mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="text-lg text-gray-800 dark:text-gray-200 font-light">
                          {t("nameMeaning.spanish")} <span className="font-semibold text-black dark:text-white">{t("nameMeaning.spanishHighlight")}</span>{t("nameMeaning.spanishEnd")}
                        </span>
                      </li>
                    </ul>
                    <p className="text-lg text-gray-800 dark:text-gray-200 font-light leading-relaxed mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                      {t("nameMeaning.summary")} <span className="font-semibold text-black dark:text-white">{t("nameMeaning.summaryHighlight")}</span>{t("nameMeaning.summaryEnd")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative h-[600px] rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-900 shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent z-10"></div>
                <Image
                  src="/images/about-story.jpg"
                  alt={t("origin.imageAlt")}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
              </div>
            </div>
          </section>

          {/* Manifesto Section */}
          <section className="mb-40 bg-black px-8 md:px-16 py-20 md:py-24 rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black"></div>
            <div className="max-w-6xl mx-auto relative z-10">
              <div className="text-center mb-16 space-y-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="w-16 h-0.5 bg-white/60"></div>
                  <span className="text-sm font-bold uppercase tracking-widest text-white/80">{t("manifesto.label")}</span>
                  <div className="w-16 h-0.5 bg-white/60"></div>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                  {t("manifesto.title")}
                </h2>
                <div className="w-32 h-1 bg-white mx-auto"></div>
              </div>

              <div className="text-white">
                <p className="italic mb-16 text-3xl md:text-4xl font-light text-center text-gray-300 leading-relaxed">
                  {t("manifesto.subtitle")}
                </p>

                <div className="grid md:grid-cols-2 gap-16 lg:gap-20">
                  <div className="space-y-10">
                    <p className="text-xl leading-relaxed font-light text-gray-100">
                      {t("manifesto.belief1")} <span className="font-semibold text-white">{t("manifesto.belief1Highlight")}</span> {t("manifesto.belief1End")}
                    </p>
                    <p className="text-xl leading-relaxed font-light text-gray-100">
                      {t("manifesto.belief2")} <span className="font-semibold text-white">{t("manifesto.belief2Highlight")}</span>{t("manifesto.belief2End")}
                    </p>
                    <p className="text-xl leading-relaxed font-light text-gray-100">
                      {t("manifesto.belief3")} <span className="font-semibold text-white">{t("manifesto.belief3Highlight")}</span>{t("manifesto.belief3End")}
                    </p>
                  </div>
                  <div className="space-y-10">
                    <p className="text-xl leading-relaxed font-light text-gray-100">
                      {t("manifesto.belief4")} <span className="font-semibold text-white">{t("manifesto.belief4Highlight")}</span>{t("manifesto.belief4End")}
                    </p>
                    <p className="text-xl leading-relaxed font-light text-gray-100">
                      {t("manifesto.belief5")} <span className="font-semibold text-white">{t("manifesto.belief5Highlight")}</span>{t("manifesto.belief5End")}
                    </p>
                    <p className="text-xl leading-relaxed font-light text-gray-100">
                      {t("manifesto.belief6")} <span className="font-semibold text-white">{t("manifesto.belief6Highlight")}</span>{t("manifesto.belief6End")}
                    </p>
                    <div className="pt-8 border-t border-white/20">
                      <p className="font-black text-2xl md:text-3xl text-white leading-tight">
                        {t("manifesto.closing")}<br />
                        <span className="text-gray-300">{t("manifesto.closingSubtext")}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Operating Model */}
          <OperatingModelSection variant="about" includeId={true} />

          {/* Mission & Vision Section */}
          <section className="mb-40">
            <div className="text-center mb-20 space-y-6">
              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-0.5 bg-black dark:bg-white"></div>
                <span className="text-sm font-bold uppercase tracking-widest text-black dark:text-white">{t("mission.label")}</span>
                <div className="w-16 h-0.5 bg-black dark:bg-white"></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-black dark:text-white leading-tight">{t("mission.title")}</h2>
              <div className="w-24 h-1 bg-black dark:bg-white mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
              <div className="group">
                <div className="bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 p-12 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="h-2 w-20 bg-black dark:bg-white rounded-full group-hover:w-24 transition-all duration-500"></div>
                      <div className="h-2 w-8 bg-gray-300 dark:bg-gray-700 rounded-full group-hover:bg-black dark:group-hover:bg-white transition-all duration-500"></div>
                    </div>
                    <h3 className="text-3xl font-black text-black dark:text-white leading-tight">{t("mission.missionTitle")}</h3>
                    <p className="text-xl leading-relaxed text-gray-800 dark:text-gray-200 font-light">
                      {t("mission.missionText")}
                      <span className="font-semibold text-black dark:text-white"> {t("mission.missionHighlight1")}</span> {t("mission.missionMiddle")}
                      <span className="font-semibold text-black dark:text-white"> {t("mission.missionHighlight2")}</span>{t("mission.missionEnd")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 p-12 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="h-2 w-20 bg-gray-600 rounded-full group-hover:w-24 transition-all duration-500 group-hover:bg-black dark:group-hover:bg-white"></div>
                      <div className="h-2 w-8 bg-gray-300 dark:bg-gray-700 rounded-full group-hover:bg-gray-600 transition-all duration-500"></div>
                    </div>
                    <h3 className="text-3xl font-black text-black dark:text-white leading-tight">{t("mission.visionTitle")}</h3>
                    <p className="text-xl leading-relaxed text-gray-800 dark:text-gray-200 font-light">
                      {t("mission.visionText")} <span className="font-semibold text-black dark:text-white">{t("mission.visionHighlight1")}</span>{t("mission.visionMiddle")}
                      <span className="font-semibold text-black dark:text-white"> {t("mission.visionHighlight2")}</span> {t("mission.visionEnd")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Brand Values Section */}
          <section className="mb-40">
            <div className="text-center mb-20 space-y-6">
              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-0.5 bg-black dark:bg-white"></div>
                <span className="text-sm font-bold uppercase tracking-widest text-black dark:text-white">{t("values.label")}</span>
                <div className="w-16 h-0.5 bg-black dark:bg-white"></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-black dark:text-white leading-tight">{t("values.title")}</h2>
              <div className="w-24 h-1 bg-black dark:bg-white mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
              <div className="group">
                <div className="bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                  <div className="space-y-6">
                    <div className="h-16 w-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-8 group-hover:bg-black group-hover:scale-110 transition-all duration-500">
                      <span className="text-black dark:text-white text-2xl font-black group-hover:text-white transition-colors duration-500">{t("values.technicalMastery.abbr")}</span>
                    </div>
                    <h3 className="text-2xl font-black text-black dark:text-white leading-tight">{t("values.technicalMastery.title")}</h3>
                    <p className="text-lg text-gray-800 dark:text-gray-200 font-light leading-relaxed">
                      {t("values.technicalMastery.description")} <span className="font-semibold text-black dark:text-white">{t("values.technicalMastery.descriptionHighlight")}</span>{t("values.technicalMastery.descriptionEnd")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                  <div className="space-y-6">
                    <div className="h-16 w-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-8 group-hover:bg-black group-hover:scale-110 transition-all duration-500">
                      <span className="text-black dark:text-white text-2xl font-black group-hover:text-white transition-colors duration-500">{t("values.creativePlayfulness.abbr")}</span>
                    </div>
                    <h3 className="text-2xl font-black text-black dark:text-white leading-tight">{t("values.creativePlayfulness.title")}</h3>
                    <p className="text-lg text-gray-800 dark:text-gray-200 font-light leading-relaxed">
                      {t("values.creativePlayfulness.description")} <span className="font-semibold text-black dark:text-white">{t("values.creativePlayfulness.descriptionHighlight")}</span>{t("values.creativePlayfulness.descriptionEnd")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                  <div className="space-y-6">
                    <div className="h-16 w-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-8 group-hover:bg-black group-hover:scale-110 transition-all duration-500">
                      <span className="text-black dark:text-white text-2xl font-black group-hover:text-white transition-colors duration-500">{t("values.humanAiCollaboration.abbr")}</span>
                    </div>
                    <h3 className="text-2xl font-black text-black dark:text-white leading-tight">{t("values.humanAiCollaboration.title")}</h3>
                    <p className="text-lg text-gray-800 dark:text-gray-200 font-light leading-relaxed">
                      {t("values.humanAiCollaboration.description")} <span className="font-semibold text-black dark:text-white">{t("values.humanAiCollaboration.descriptionHighlight")}</span>{t("values.humanAiCollaboration.descriptionEnd")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                  <div className="space-y-6">
                    <div className="h-16 w-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-8 group-hover:bg-black group-hover:scale-110 transition-all duration-500">
                      <span className="text-black dark:text-white text-2xl font-black group-hover:text-white transition-colors duration-500">{t("values.kaizen.abbr")}</span>
                    </div>
                    <h3 className="text-2xl font-black text-black dark:text-white leading-tight">{t("values.kaizen.title")}</h3>
                    <p className="text-lg text-gray-800 dark:text-gray-200 font-light leading-relaxed">
                      {t("values.kaizen.description")} <span className="font-semibold text-black dark:text-white">{t("values.kaizen.descriptionHighlight")}</span> {t("values.kaizen.descriptionEnd")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                  <div className="space-y-6">
                    <div className="h-16 w-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-8 group-hover:bg-black group-hover:scale-110 transition-all duration-500">
                      <span className="text-black dark:text-white text-2xl font-black group-hover:text-white transition-colors duration-500">{t("values.recursiveImprovement.abbr")}</span>
                    </div>
                    <h3 className="text-2xl font-black text-black dark:text-white leading-tight">{t("values.recursiveImprovement.title")}</h3>
                    <p className="text-lg text-gray-800 dark:text-gray-200 font-light leading-relaxed">
                      {t("values.recursiveImprovement.description")} <span className="font-semibold text-black dark:text-white">{t("values.recursiveImprovement.descriptionHighlight")}</span>{t("values.recursiveImprovement.descriptionEnd")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                  <div className="space-y-6">
                    <div className="h-16 w-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-8 group-hover:bg-black group-hover:scale-110 transition-all duration-500">
                      <span className="text-black dark:text-white text-2xl font-black group-hover:text-white transition-colors duration-500">{t("values.globalPerspective.abbr")}</span>
                    </div>
                    <h3 className="text-2xl font-black text-black dark:text-white leading-tight">{t("values.globalPerspective.title")}</h3>
                    <p className="text-lg text-gray-800 dark:text-gray-200 font-light leading-relaxed">
                      {t("values.globalPerspective.description")} <span className="font-semibold text-black dark:text-white">{t("values.globalPerspective.descriptionHighlight")}</span> {t("values.globalPerspective.descriptionEnd")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Our Approach Section */}
          <section className="mb-40">
            <div className="text-center mb-20 space-y-6">
              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-0.5 bg-black dark:bg-white"></div>
                <span className="text-sm font-bold uppercase tracking-widest text-black dark:text-white">{t("approach.label")}</span>
                <div className="w-16 h-0.5 bg-black dark:bg-white"></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-black dark:text-white leading-tight">{t("approach.title")}</h2>
              <div className="w-24 h-1 bg-black dark:bg-white mx-auto"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="relative h-[600px] rounded-3xl overflow-hidden bg-gray-50 dark:bg-gray-900 order-2 lg:order-1 shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent z-10"></div>
                <Image
                  src="/images/about-approach.jpg"
                  alt={t("approach.imageAlt")}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
              </div>

              <div className="order-1 lg:order-2 space-y-12">
                <div className="group">
                  <div className="border-l-4 border-black dark:border-white pl-8 hover:pl-10 transition-all duration-300 group-hover:border-l-8">
                    <h3 className="text-2xl font-black mb-4 text-black dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                      {t("approach.aiNative.title")}
                    </h3>
                    <p className="text-xl leading-relaxed text-gray-800 dark:text-gray-200 font-light">
                      {t("approach.aiNative.description")}
                      <span className="font-semibold text-black dark:text-white"> {t("approach.aiNative.descriptionHighlight")}</span>{t("approach.aiNative.descriptionEnd")}
                    </p>
                  </div>
                </div>

                <div className="group">
                  <div className="border-l-4 border-gray-400 dark:border-gray-600 pl-8 hover:pl-10 transition-all duration-300 group-hover:border-l-8 group-hover:border-black dark:group-hover:border-white">
                    <h3 className="text-2xl font-black mb-4 text-black dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                      {t("approach.technicalCreative.title")}
                    </h3>
                    <p className="text-xl leading-relaxed text-gray-800 dark:text-gray-200 font-light">
                      {t("approach.technicalCreative.description")}
                      <span className="font-semibold text-black dark:text-white"> {t("approach.technicalCreative.descriptionHighlight")}</span>{t("approach.technicalCreative.descriptionEnd")}
                    </p>
                  </div>
                </div>

                <div className="group">
                  <div className="border-l-4 border-black dark:border-white pl-8 hover:pl-10 transition-all duration-300 group-hover:border-l-8">
                    <h3 className="text-2xl font-black mb-4 text-black dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                      {t("approach.selfRecursive.title")}
                    </h3>
                    <p className="text-xl leading-relaxed text-gray-800 dark:text-gray-200 font-light">
                      {t("approach.selfRecursive.description")}
                      <span className="font-semibold text-black dark:text-white"> {t("approach.selfRecursive.descriptionHighlight")}</span>{t("approach.selfRecursive.descriptionEnd")}
                    </p>
                  </div>
                </div>

                <div className="group">
                  <div className="border-l-4 border-gray-400 dark:border-gray-600 pl-8 hover:pl-10 transition-all duration-300 group-hover:border-l-8 group-hover:border-black dark:group-hover:border-white">
                    <h3 className="text-2xl font-black mb-4 text-black dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                      {t("approach.ecosystem.title")}
                    </h3>
                    <p className="text-xl leading-relaxed text-gray-800 dark:text-gray-200 font-light">
                      {t("approach.ecosystem.description")}
                      <span className="font-semibold text-black dark:text-white"> {t("approach.ecosystem.descriptionHighlight")}</span>{t("approach.ecosystem.descriptionEnd")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-black px-8 md:px-16 py-20 md:py-24 rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 to-black"></div>
            <div className="max-w-4xl mx-auto relative z-10 space-y-10">
              <div className="space-y-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="w-16 h-0.5 bg-white/60"></div>
                  <span className="text-sm font-bold uppercase tracking-widest text-white/80">{t("cta.label")}</span>
                  <div className="w-16 h-0.5 bg-white/60"></div>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                  {t("cta.title")}
                </h2>
                <div className="w-32 h-1 bg-white mx-auto"></div>
              </div>

              <p className="text-2xl md:text-3xl font-light text-gray-300 leading-relaxed max-w-3xl mx-auto">
                {t("cta.description")}
                <span className="font-semibold text-white"> {t("cta.descriptionHighlight")}</span>
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
