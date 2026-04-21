'use client';

import { useTranslations } from "next-intl";
import { CheckCircle } from "lucide-react";
import { ServiceDetailPage } from "../components/ServiceDetailPage";

function AIWeb3ExtraSections() {
  const t = useTranslations("serviceDetails.aiWeb3Integration");

  const creativeItems = [
    { title: t("creativeNft1Title"), desc: t("creativeNft1Desc") },
    { title: t("creativeNft2Title"), desc: t("creativeNft2Desc") },
    { title: t("creativeNft3Title"), desc: t("creativeNft3Desc") },
  ];

  const communityItems = [
    { title: t("community1Title"), desc: t("community1Desc") },
    { title: t("community2Title"), desc: t("community2Desc") },
    { title: t("community3Title"), desc: t("community3Desc") },
  ];

  return (
    <section className="container py-16 md:py-24">
      <div className="grid gap-12 md:grid-cols-2">
        <Panel title={t("creativeNftTitle")} desc={t("creativeNftDesc")} items={creativeItems} />
        <Panel title={t("communityTitle")} desc={t("communityDesc")} items={communityItems} />
      </div>
    </section>
  );
}

function Panel({ title, desc, items }: { title: string; desc: string; items: { title: string; desc: string }[] }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8">
      <h3 className="text-xl font-bold mb-6">{title}</h3>
      <p className="text-muted-foreground mb-6">{desc}</p>
      <ul className="space-y-4">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-black dark:text-white flex-shrink-0 mt-1" />
            <div>
              <span className="font-semibold">{item.title}</span>
              <p className="text-muted-foreground">{item.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AIWeb3IntegrationPage() {
  return (
    <ServiceDetailPage serviceKey="aiWeb3Integration">
      <AIWeb3ExtraSections />
    </ServiceDetailPage>
  );
}
