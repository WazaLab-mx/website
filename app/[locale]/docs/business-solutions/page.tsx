"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Header } from "@/app/[locale]/components/ui/header";
import { Footer } from "@/app/[locale]/components/ui/footer";
import { ArrowLeft } from "lucide-react";

export default function BusinessSolutionsDocsPage() {
  const t = useTranslations("docs.businessSolutions");
  const tNav = useTranslations("docs.nav");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 pt-16">
        <div className="container max-w-4xl py-12">
          <div className="mb-6">
            <Link href="/docs" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {tNav("backToDocs")}
            </Link>
          </div>

          <h1 className="text-4xl font-bold mb-8">{t("pageTitle")}</h1>

          <div className="prose dark:prose-invert max-w-none">
            <h2>{t("introduction.title")}</h2>
            <p>{t("introduction.description")}</p>

            <h2>{t("solutionCategories.title")}</h2>
            <ul>
              <li>{t("solutionCategories.items.smartWork")}</li>
              <li>{t("solutionCategories.items.businessGrowth")}</li>
              <li>{t("solutionCategories.items.smartInsights")}</li>
              <li>{t("solutionCategories.items.customerExperience")}</li>
            </ul>

            <h2>{t("implementationProcess.title")}</h2>
            <p>{t("implementationProcess.description")}</p>
            <ol>
              <li>{t("implementationProcess.steps.analysis")}</li>
              <li>{t("implementationProcess.steps.selection")}</li>
              <li>{t("implementationProcess.steps.planning")}</li>
              <li>{t("implementationProcess.steps.implementation")}</li>
              <li>{t("implementationProcess.steps.training")}</li>
              <li>{t("implementationProcess.steps.monitoring")}</li>
            </ol>

            <h2>{t("integrationGuidelines.title")}</h2>
            <p>{t("integrationGuidelines.description")}</p>
            <ul>
              <li>{t("integrationGuidelines.items.apiIntegration")}</li>
              <li>{t("integrationGuidelines.items.dataMigration")}</li>
              <li>{t("integrationGuidelines.items.security")}</li>
              <li>{t("integrationGuidelines.items.performance")}</li>
            </ul>

            <h2>{t("bestPractices.title")}</h2>
            <p>{t("bestPractices.description")}</p>
            <ul>
              <li>{t("bestPractices.items.changeManagement")}</li>
              <li>{t("bestPractices.items.userTraining")}</li>
              <li>{t("bestPractices.items.performanceMonitoring")}</li>
              <li>{t("bestPractices.items.continuousImprovement")}</li>
            </ul>

            <div className="not-prose mt-8">
              <Button asChild className="bg-gradient-to-r from-[#7C2D3E] to-[#7C2D3E]/90">
                <Link href="/contact">
                  {t("supportButton")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
