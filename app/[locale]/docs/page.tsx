"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Header } from "@/app/[locale]/components/ui/header";
import { Footer } from "@/app/[locale]/components/ui/footer";
import { ArrowRight } from "lucide-react";

export default function DocumentationPage() {
  const t = useTranslations("docs.main");
  const tNav = useTranslations("docs.nav");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-[#252A34] to-[#0D0D0D] text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  {t("hero.title")}
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  {t("hero.description")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Documentation Sections */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              {/* AI Agents */}
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6">
                  <h3 className="text-2xl font-bold">{t("sections.aiAgents.title")}</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {t("sections.aiAgents.description")}
                  </p>
                  <Button asChild className="mt-4 w-full bg-gradient-to-r from-[#7C2D3E] to-[#7C2D3E]/90">
                    <Link href="/docs/ai-agents">
                      {t("sections.aiAgents.button")} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Business Solutions */}
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6">
                  <h3 className="text-2xl font-bold">{t("sections.businessSolutions.title")}</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {t("sections.businessSolutions.description")}
                  </p>
                  <Button asChild className="mt-4 w-full bg-gradient-to-r from-[#7C2D3E] to-[#7C2D3E]/90">
                    <Link href="/docs/business-solutions">
                      {t("sections.businessSolutions.button")} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Web3 Development */}
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6">
                  <h3 className="text-2xl font-bold">{t("sections.web3.title")}</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {t("sections.web3.description")}
                  </p>
                  <Button asChild className="mt-4 w-full bg-gradient-to-r from-[#7C2D3E] to-[#7C2D3E]/90">
                    <Link href="/docs/web3">
                      {t("sections.web3.button")} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Getting Started Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-[#252A34] to-[#0D0D0D] text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">{t("gettingStarted.title")}</h2>
                <p className="text-gray-300">
                  {t("gettingStarted.description")}
                </p>
                <Button asChild className="bg-gradient-to-r from-[#7C2D3E] to-[#7C2D3E]/90">
                  <Link href="/docs/getting-started">
                    {t("gettingStarted.button")} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">{t("apiReference.title")}</h2>
                <p className="text-gray-300">
                  {t("apiReference.description")}
                </p>
                <Button asChild className="bg-gradient-to-r from-[#7C2D3E] to-[#7C2D3E]/90">
                  <Link href="/docs/api">
                    {t("apiReference.button")} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
