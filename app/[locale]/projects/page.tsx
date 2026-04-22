"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Footer } from "../components/ui/footer";
import { Header } from "../components/ui/header";
import { ProjectHeroStory } from "./components/ProjectHeroStory";

const heroProjectKeys = ["0", "1", "2", "3"] as const;

export default function Projects() {
  const t = useTranslations("projects");

  const allProjects = heroProjectKeys.map((key) => ({
    id: Number(key),
    title: t(`hero.${key}.title`),
    description: t(`hero.${key}.description`),
    image: t(`hero.${key}.image`),
    tags: [
      t(`hero.${key}.tags.0`),
      t(`hero.${key}.tags.1`),
      t(`hero.${key}.tags.2`),
    ].filter(Boolean),
    link: t(`hero.${key}.link`),
  }));

  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Header />

      {/* Hero Storytelling Section */}
      <ProjectHeroStory projects={allProjects} />

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-black text-white relative">
        <div className="absolute inset-0 bg-[url('/bg.png')] opacity-10 bg-cover bg-center"></div>
        <div className="container px-4 md:px-6 relative">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                {t("cta.title")}{" "}
                <span className="text-white">{t("cta.titleHighlight")}</span>?
              </h2>
              <p className="mx-auto max-w-[600px] text-white/90 md:text-xl">
                {t("cta.description")}
              </p>
            </div>
            <div className="flex flex-col gap-3 min-[400px]:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-white text-black hover:bg-white/90 shadow-md"
              >
                <Link href="/#cta">{t("cta.startProject")}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                <Link href="/services">{t("cta.viewServices")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
