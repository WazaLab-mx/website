"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { DocsPageShell } from "../components/DocsPageShell";

export default function GettingStartedDocsPage() {
  const t = useTranslations("docs.gettingStarted");

  return (
    <DocsPageShell
      pageTitle={t("pageTitle")}
      supportButtonText={t("supportButton")}
    >
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
          <Link
            href="/docs/ai-agents"
            className="text-[#7C2D3E] hover:text-[#7C2D3E]/80"
          >
            {t("essentialResources.links.aiAgents")}
          </Link>
        </li>
        <li>
          <Link
            href="/docs/business-solutions"
            className="text-[#7C2D3E] hover:text-[#7C2D3E]/80"
          >
            {t("essentialResources.links.businessSolutions")}
          </Link>
        </li>
        <li>
          <Link
            href="/docs/web3"
            className="text-[#7C2D3E] hover:text-[#7C2D3E]/80"
          >
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
    </DocsPageShell>
  );
}
