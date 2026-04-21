"use client";

import { useTranslations } from "next-intl";
import { DocsPageShell } from "../components/DocsPageShell";

export default function BusinessSolutionsDocsPage() {
  const t = useTranslations("docs.businessSolutions");

  return (
    <DocsPageShell
      pageTitle={t("pageTitle")}
      supportButtonText={t("supportButton")}
    >
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
    </DocsPageShell>
  );
}
