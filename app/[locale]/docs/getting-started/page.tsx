"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Header } from "@/app/[locale]/components/ui/header";
import { Footer } from "@/app/[locale]/components/ui/footer";
import { ArrowLeft } from "lucide-react";

export default function GettingStartedDocsPage() {
  const t = useTranslations("docs.gettingStarted");
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
            <h2>{t("welcome.title")}</h2>
            <p>{t("welcome.description")}</p>

            <h2>{t("quickStart.title")}</h2>
            <ol>
              <li>
                <strong>{t("quickStart.steps.createAccount.title")}</strong>
                <p>{t("quickStart.steps.createAccount.description")}</p>
              </li>
              <li>
                <strong>{t("quickStart.steps.chooseService.title")}</strong>
                <p>{t("quickStart.steps.chooseService.description")}</p>
                <ul>
                  <li>{t("quickStart.steps.chooseService.options.aiAgents")}</li>
                  <li>{t("quickStart.steps.chooseService.options.businessSolutions")}</li>
                  <li>{t("quickStart.steps.chooseService.options.web3")}</li>
                </ul>
              </li>
              <li>
                <strong>{t("quickStart.steps.setupEnvironment.title")}</strong>
                <p>{t("quickStart.steps.setupEnvironment.description")}</p>
              </li>
              <li>
                <strong>{t("quickStart.steps.startBuilding.title")}</strong>
                <p>{t("quickStart.steps.startBuilding.description")}</p>
              </li>
            </ol>

            <h2>{t("essentialResources.title")}</h2>
            <ul>
              <li>
                <Link href="/docs/ai-agents" className="text-[#7C2D3E] hover:text-[#7C2D3E]/80">
                  {t("essentialResources.links.aiAgents")}
                </Link>
              </li>
              <li>
                <Link href="/docs/business-solutions" className="text-[#7C2D3E] hover:text-[#7C2D3E]/80">
                  {t("essentialResources.links.businessSolutions")}
                </Link>
              </li>
              <li>
                <Link href="/docs/web3" className="text-[#7C2D3E] hover:text-[#7C2D3E]/80">
                  {t("essentialResources.links.web3")}
                </Link>
              </li>
            </ul>

            <h2>{t("bestPractices.title")}</h2>
            <ul>
              <li>{t("bestPractices.items.clearGoal")}</li>
              <li>{t("bestPractices.items.followGuides")}</li>
              <li>{t("bestPractices.items.testThoroughly")}</li>
              <li>{t("bestPractices.items.useSupport")}</li>
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
