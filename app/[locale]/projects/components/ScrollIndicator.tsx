"use client";

import { useTranslations } from "next-intl";

interface ScrollIndicatorProps {
  total: number;
  current: number;
  onDotClick: (index: number) => void;
}

export function ScrollIndicator({ total, current, onDotClick }: ScrollIndicatorProps) {
  const t = useTranslations("common.accessibility");

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            index === current
              ? "bg-white scale-125 shadow-lg shadow-white/30"
              : "bg-white/40 hover:bg-white/60"
          }`}
          aria-label={t("goToProject", { number: index + 1 })}
        />
      ))}
    </div>
  );
}
