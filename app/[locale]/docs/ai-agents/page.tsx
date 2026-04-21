"use client";

import { useTranslations } from "next-intl";
import { DocsPageShell } from "../components/DocsPageShell";

export default function AIAgentsDocsPage() {
  const t = useTranslations("docs.aiAgents");

  return (
    <DocsPageShell
      pageTitle={t("pageTitle")}
      supportButtonText={t("supportButton")}
    >
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
    </DocsPageShell>
  );
}
