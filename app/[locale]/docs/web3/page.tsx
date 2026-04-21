"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Header } from "@/app/[locale]/components/ui/header";
import { Footer } from "@/app/[locale]/components/ui/footer";
import { ArrowLeft } from "lucide-react";

export default function Web3DocsPage() {
  const t = useTranslations("docs.web3");
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

            <h2>{t("coreConcepts.title")}</h2>
            <ul>
              <li>{t("coreConcepts.items.blockchain")}</li>
              <li>{t("coreConcepts.items.smartContracts")}</li>
              <li>{t("coreConcepts.items.dapps")}</li>
              <li>{t("coreConcepts.items.web3Integration")}</li>
            </ul>

            <h2>{t("developmentGuide.title")}</h2>
            <p>{t("developmentGuide.description")}</p>
            <ol>
              <li>{t("developmentGuide.steps.environment")}</li>
              <li>{t("developmentGuide.steps.smartContract")}</li>
              <li>{t("developmentGuide.steps.frontend")}</li>
              <li>{t("developmentGuide.steps.testing")}</li>
              <li>{t("developmentGuide.steps.security")}</li>
            </ol>

            <h2>{t("smartContractDev.title")}</h2>
            <p>{t("smartContractDev.description")}</p>
            <ul>
              <li>{t("smartContractDev.items.solidity")}</li>
              <li>{t("smartContractDev.items.designPatterns")}</li>
              <li>{t("smartContractDev.items.testing")}</li>
              <li>{t("smartContractDev.items.gasOptimization")}</li>
              <li>{t("smartContractDev.items.securityBestPractices")}</li>
            </ul>

            <h2>{t("web3Integration.title")}</h2>
            <p>{t("web3Integration.description")}</p>
            <ul>
              <li>{t("web3Integration.items.wallet")}</li>
              <li>{t("web3Integration.items.transactions")}</li>
              <li>{t("web3Integration.items.events")}</li>
              <li>{t("web3Integration.items.storage")}</li>
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
