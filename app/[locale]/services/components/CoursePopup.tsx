"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { POPUP_KEY_MAP } from "../services.config";

const MODULE_INDICES = [0, 1, 2, 3, 4] as const;

interface Props {
  activePopup: string | null;
  onClose: () => void;
}

export function CoursePopup({ activePopup, onClose }: Props) {
  const t = useTranslations("services.popups");

  if (!activePopup) return null;
  const popupKey = POPUP_KEY_MAP[activePopup];
  if (!popupKey) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-auto rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label={t("close")}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          <X className="h-6 w-6" />
        </button>

        <h3 className="mb-4 text-2xl font-bold text-black dark:text-white">
          {t(`${popupKey}.title`)}
        </h3>
        <div className="mb-6">
          <h4 className="mb-2 font-semibold">{t(`${popupKey}.courseDetails`)}</h4>
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <p className="mb-4 text-muted-foreground">
              <strong>{t(`${popupKey}.programTitle`)}</strong>
              <br />
              {t(`${popupKey}.programDescription`)}
            </p>
            <p className="text-muted-foreground">{t(`${popupKey}.programNote`)}</p>
            <div className="mt-4 text-muted-foreground">
              <strong>{t(`${popupKey}.modulesTitle`)}</strong>
              <ul className="mt-2 space-y-1">
                {MODULE_INDICES.map((i) => (
                  <li key={i}>{t(`${popupKey}.modules.${i}`)}</li>
                ))}
              </ul>
            </div>
            <p className="mt-4 text-muted-foreground">
              <strong>{t(`${popupKey}.duration`)}</strong> {t(`${popupKey}.durationValue`)}
              <br />
              <strong>{t(`${popupKey}.format`)}</strong> {t(`${popupKey}.formatValue`)}
              <br />
              <strong>{t(`${popupKey}.prerequisites`)}</strong>{" "}
              {t(`${popupKey}.prerequisitesValue`)}
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={onClose} className="bg-black text-white hover:bg-gray-800">
            {t("close")}
          </Button>
        </div>
      </div>
    </div>
  );
}
