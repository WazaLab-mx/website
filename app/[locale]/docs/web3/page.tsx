"use client";

import { useTranslations } from "next-intl";
import { DocsPageShell } from "../components/DocsPageShell";

export default function Web3DocsPage() {
  const t = useTranslations("docs.web3");

  return (
    <DocsPageShell
      pageTitle={t("pageTitle")}
      supportButtonText={t("supportButton")}
    >
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
    </DocsPageShell>
  );
}
