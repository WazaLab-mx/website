"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { locales, type Locale, localeNames } from "@/i18n/config";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("common.languageSwitcher");

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-1 text-sm" role="group" aria-label={t("ariaLabel")}>
      {locales.map((loc, index) => (
        <span key={loc} className="flex items-center">
          {index > 0 && (
            <span className="text-gray-400 mx-0.5" aria-hidden="true">|</span>
          )}
          <button
            onClick={() => handleLocaleChange(loc)}
            className={`
              px-1.5 py-0.5 rounded transition-all duration-200
              ${locale === loc
                ? "font-semibold text-black"
                : "text-gray-500 hover:text-black"
              }
            `}
            aria-label={localeNames[loc]}
            aria-current={locale === loc ? "true" : undefined}
          >
            {loc.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
