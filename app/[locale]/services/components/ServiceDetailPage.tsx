'use client';

import { useTranslations } from "next-intl";
import { Header } from "../../components/ui/header";
import { Footer } from "../../components/ui/footer";
import { ServiceHero } from "./ServiceHero";
import { ServiceFeatures } from "./ServiceFeatures";
import { ServiceUseCases } from "./ServiceUseCases";
import { ServiceExample } from "./ServiceExample";
import { ServiceCTA } from "./ServiceCTA";

interface ServiceDetailPageProps {
  serviceKey: string;
  children?: React.ReactNode;
}

export function ServiceDetailPage({ serviceKey, children }: ServiceDetailPageProps) {
  const t = useTranslations(`serviceDetails.${serviceKey}`);
  const tc = useTranslations("serviceDetails.common");

  const features = [
    { title: t("feature1Title"), description: t("feature1Desc") },
    { title: t("feature2Title"), description: t("feature2Desc") },
    { title: t("feature3Title"), description: t("feature3Desc") },
  ];

  const benefits = [
    { title: t("benefit1Title"), description: t("benefit1Desc") },
    { title: t("benefit2Title"), description: t("benefit2Desc") },
    { title: t("benefit3Title"), description: t("benefit3Desc") },
    { title: t("benefit4Title"), description: t("benefit4Desc") },
  ];

  const useCases = [1, 2, 3].map((i) => ({
    title: t(`useCase${i}Title`),
    description: t(`useCase${i}Desc`),
    features: [
      t(`useCase${i}Feature1`),
      t(`useCase${i}Feature2`),
      t(`useCase${i}Feature3`),
    ],
  }));

  const hasExample = t.has("exampleTitle");

  const steps = hasExample
    ? [1, 2, 3, 4].map((i) => ({
        title: t(`step${i}Title`),
        description: t(`step${i}Desc`),
      }))
    : [];

  const stats = hasExample
    ? [1, 2, 3].map((i) => ({
        value: t(`stat${i}Value`),
        label: t(`stat${i}Label`),
      }))
    : [];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ServiceHero
          backLabel={tc("backToServices")}
          badge={t("badge")}
          title={t("title")}
          description={t("description")}
        />

        <ServiceFeatures
          sectionTitle={t.has("howItWorksTitle") ? t("howItWorksTitle") : tc("howItWorks")}
          sectionDesc={t("howItWorksDesc")}
          features={features}
          benefitsTitle={tc("keyBenefits")}
          benefits={benefits}
        />

        <ServiceUseCases title={t("useCasesTitle")} cases={useCases} />

        {children}

        {hasExample && (
          <ServiceExample
            sectionTitle={tc("realWorldExample")}
            subtitle={t("exampleSubtitle")}
            exampleTitle={t("exampleTitle")}
            scenarioTitle={tc("scenarioTitle")}
            scenarioDesc={t("scenarioDesc")}
            solutionTitle={tc("solutionTitle")}
            solutionDesc={t("solutionDesc")}
            stepsTitle={tc("howItWorksSteps")}
            steps={steps}
            resultsTitle={tc("resultsTitle")}
            stats={stats}
          />
        )}

        <ServiceCTA
          title={t("ctaTitle")}
          description={t("ctaDesc")}
          buttonText={tc("getStarted")}
        />
      </main>
      <Footer />
    </div>
  );
}
