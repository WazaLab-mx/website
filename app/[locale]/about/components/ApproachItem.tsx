"use client";

import { useTranslations } from "next-intl";

interface Props {
  approachKey: string;
  emphasized?: boolean;
}

export function ApproachItem({ approachKey, emphasized = false }: Props) {
  const t = useTranslations(`about.approach.${approachKey}`);
  const borderColor = emphasized
    ? "border-black dark:border-white"
    : "border-gray-400 dark:border-gray-600 group-hover:border-black dark:group-hover:border-white";

  return (
    <div className="group">
      <div
        className={`border-l-4 ${borderColor} pl-8 hover:pl-10 transition-all duration-300 group-hover:border-l-8`}
      >
        <h3 className="text-2xl font-black mb-4 text-black dark:text-white transition-colors">
          {t("title")}
        </h3>
        <p className="text-xl leading-relaxed text-gray-800 dark:text-gray-200 font-light">
          {t("description")}{" "}
          <span className="font-semibold text-black dark:text-white">
            {t("descriptionHighlight")}
          </span>
          {t("descriptionEnd")}
        </p>
      </div>
    </div>
  );
}
