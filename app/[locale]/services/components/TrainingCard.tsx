"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import type { TrainingDef } from "../services.config";

const FEATURE_INDICES = [0, 1, 2, 3] as const;

interface Props {
  training: TrainingDef;
  onOpenPopup: (id: string) => void;
}

export function TrainingCard({ training, onOpenPopup }: Props) {
  const t = useTranslations("services.training");
  const Icon = training.icon;

  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-gray-600/30 hover:bg-white/10">
      <div className="mb-6 flex items-center gap-4">
        <div className="rounded-full bg-gray-100 p-4 text-black">
          <Icon className="h-8 w-8" />
        </div>
        <h3 className="text-2xl font-bold">
          {t(`items.${training.titleKey}.title`)}
        </h3>
      </div>
      <p className="mb-6 text-gray-200">
        {t(`items.${training.titleKey}.description`)}
      </p>
      <ul className="mb-8 space-y-3">
        {FEATURE_INDICES.map((i) => (
          <li key={i} className="flex items-start gap-2">
            <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-white" />
            <span>{t(`items.${training.titleKey}.features.${i}`)}</span>
          </li>
        ))}
      </ul>
      <Button
        onClick={() => onOpenPopup(training.popupId)}
        className="w-full bg-black hover:bg-gray-800 text-white"
      >
        {t("learnMore")}
      </Button>
    </div>
  );
}
