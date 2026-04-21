"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Header } from "@/app/[locale]/components/ui/header";
import { Footer } from "@/app/[locale]/components/ui/footer";
import { ArrowLeft } from "lucide-react";

export default function APIDocsPage() {
  const t = useTranslations("docs.api");
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

            <h2>{t("authentication.title")}</h2>
            <p>{t("authentication.description")}</p>
            <pre><code>
{`Authorization: Bearer YOUR_API_KEY`}
            </code></pre>

            <h2>{t("endpoints.title")}</h2>

            <h3>{t("endpoints.aiAgents.title")}</h3>
            <ul>
              <li>
                <code>POST /api/v1/agents/create</code>
                <p>{t("endpoints.aiAgents.createAgent")}</p>
              </li>
              <li>
                <code>GET /api/v1/agents/{'{agent_id}'}</code>
                <p>{t("endpoints.aiAgents.getAgent")}</p>
              </li>
              <li>
                <code>PUT /api/v1/agents/{'{agent_id}'}/train</code>
                <p>{t("endpoints.aiAgents.trainAgent")}</p>
              </li>
            </ul>

            <h3>{t("endpoints.businessSolutions.title")}</h3>
            <ul>
              <li>
                <code>POST /api/v1/business/analyze</code>
                <p>{t("endpoints.businessSolutions.analyze")}</p>
              </li>
              <li>
                <code>GET /api/v1/business/insights</code>
                <p>{t("endpoints.businessSolutions.insights")}</p>
              </li>
              <li>
                <code>POST /api/v1/business/automate</code>
                <p>{t("endpoints.businessSolutions.automate")}</p>
              </li>
            </ul>

            <h3>{t("endpoints.web3.title")}</h3>
            <ul>
              <li>
                <code>POST /api/v1/web3/deploy</code>
                <p>{t("endpoints.web3.deploy")}</p>
              </li>
              <li>
                <code>GET /api/v1/web3/contracts/{'{address}'}</code>
                <p>{t("endpoints.web3.getContract")}</p>
              </li>
              <li>
                <code>POST /api/v1/web3/interact</code>
                <p>{t("endpoints.web3.interact")}</p>
              </li>
            </ul>

            <h2>{t("rateLimits.title")}</h2>
            <p>{t("rateLimits.description")}</p>
            <ul>
              <li>{t("rateLimits.tiers.free")}</li>
              <li>{t("rateLimits.tiers.professional")}</li>
              <li>{t("rateLimits.tiers.enterprise")}</li>
            </ul>

            <h2>{t("errorHandling.title")}</h2>
            <p>{t("errorHandling.description")}</p>
            <ul>
              <li><code>200</code> - {t("errorHandling.codes.200")}</li>
              <li><code>400</code> - {t("errorHandling.codes.400")}</li>
              <li><code>401</code> - {t("errorHandling.codes.401")}</li>
              <li><code>403</code> - {t("errorHandling.codes.403")}</li>
              <li><code>404</code> - {t("errorHandling.codes.404")}</li>
              <li><code>429</code> - {t("errorHandling.codes.429")}</li>
              <li><code>500</code> - {t("errorHandling.codes.500")}</li>
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
