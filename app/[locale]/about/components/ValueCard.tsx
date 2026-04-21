"use client";

import { useTranslations } from "next-intl";

interface Props {
  valueKey: string;
}

export function ValueCard({ valueKey }: Props) {
  const t = useTranslations(`about.values.${valueKey}`);

  return (
    <div className="group">
      <div className="bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
        <div className="space-y-6">
          <div className="h-16 w-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-8 group-hover:bg-black group-hover:scale-110 transition-all duration-500">
            <span className="text-black dark:text-white text-2xl font-black group-hover:text-white transition-colors duration-500">
              {t("abbr")}
            </span>
          </div>
          <h3 className="text-2xl font-black text-black dark:text-white leading-tight">
            {t("title")}
          </h3>
          <p className="text-lg text-gray-800 dark:text-gray-200 font-light leading-relaxed">
            {t("description")}{" "}
            <span className="font-semibold text-black dark:text-white">
              {t("descriptionHighlight")}
            </span>
            {t("descriptionEnd")}
          </p>
        </div>
      </div>
    </div>
  );
}
