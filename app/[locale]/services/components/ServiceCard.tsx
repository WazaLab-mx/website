"use client";

import { Link, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import type { ServiceDef } from "../services.config";

const FEATURE_INDICES = [0, 1, 2, 3] as const;

interface Props {
  service: ServiceDef;
}

export function ServiceCard({ service }: Props) {
  const t = useTranslations("services.grid");
  const router = useRouter();
  const Icon = service.icon;
  const path = `/services/${service.slug}`;

  return (
    <div
      onClick={() => router.push(path)}
      className="group relative overflow-hidden rounded-lg border-0 bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-800 opacity-0 transition-opacity duration-300 group-hover:opacity-5" />
      <div className="p-8">
        <div className="mb-6 flex items-center gap-4">
          <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-4 text-black dark:text-white">
            <Icon className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-bold dark:text-white">
            {t(`items.${service.titleKey}.title`)}
          </h3>
        </div>
        <p className="mb-6 text-muted-foreground">
          {t(`items.${service.titleKey}.description`)}
        </p>
        <div className="mb-6 space-y-4">
          <h4 className="font-semibold dark:text-white">{t("whatYouGet")}</h4>
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {FEATURE_INDICES.map((i) => (
              <li key={i} className="flex items-start gap-2 text-muted-foreground">
                <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                <span>{t(`items.${service.titleKey}.features.${i}`)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-end">
          <Button
            asChild
            onClick={(e) => e.stopPropagation()}
            className="bg-transparent text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 border border-black dark:border-white"
          >
            <Link href={path} target="_blank" rel="noopener noreferrer">
              {t("learnMore")}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
