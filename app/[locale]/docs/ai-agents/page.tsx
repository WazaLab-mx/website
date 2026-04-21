"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Header } from "@/app/[locale]/components/ui/header";
import { Footer } from "@/app/[locale]/components/ui/footer";
import { ArrowLeft } from "lucide-react";

export default function AIAgentsDocsPage() {
  const t = useTranslations("docs.aiAgents");
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

            <h2>{t("gettingStarted.title")}</h2>
            <p>{t("gettingStarted.description")}</p>
            <ul>
              <li>{t("gettingStarted.items.createAccount")}</li>
              <li>{t("gettingStarted.items.setupEnvironment")}</li>
              <li>{t("gettingStarted.items.configureAgent")}</li>
            </ul>

            <h2>{t("basicConcepts.title")}</h2>
            <p>{t("basicConcepts.description")}</p>
            <ul>
              <li>{t("basicConcepts.items.agentTypes")}</li>
              <li>{t("basicConcepts.items.training")}</li>
              <li>{t("basicConcepts.items.integration")}</li>
              <li>{t("basicConcepts.items.bestPractices")}</li>
            </ul>

            <h2>{t("implementationGuide.title")}</h2>
            <p>{t("implementationGuide.description")}</p>
            <ol>
              <li>{t("implementationGuide.steps.defineUseCase")}</li>
              <li>{t("implementationGuide.steps.chooseType")}</li>
              <li>{t("implementationGuide.steps.configureSettings")}</li>
              <li>{t("implementationGuide.steps.testValidate")}</li>
              <li>{t("implementationGuide.steps.deploy")}</li>
            </ol>

            <h2>{t("apiReference.title")}</h2>
            <p>{t("apiReference.description")}</p>
            <ul>
              <li>{t("apiReference.items.authentication")}</li>
              <li>{t("apiReference.items.agentManagement")}</li>
              <li>{t("apiReference.items.trainingApi")}</li>
              <li>{t("apiReference.items.interactionApi")}</li>
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
