'use client';

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Brain, Users, Rocket } from "lucide-react";

interface OperatingModelSectionProps {
  variant?: 'home' | 'about';
  showCTA?: boolean;
  includeId?: boolean;
}

export function OperatingModelSection({
  variant = 'home',
  showCTA = false,
  includeId = false
}: OperatingModelSectionProps) {
  const t = useTranslations("common.operatingModel");
  const outcomesTitle = variant === 'about' ? t('outcomesAbout') : t('outcomesHome');
  const isHomePage = variant === 'home';

  const pillars = [
    {
      icon: Brain,
      title: t('practiceAreas'),
      desc: t('practiceAreasDesc'),
      items: [t('practiceItem1'), t('practiceItem2'), t('practiceItem3')],
    },
    {
      icon: Users,
      title: t('waysOfWorking'),
      desc: t('waysOfWorkingDesc'),
      items: [t('waysItem1'), t('waysItem2'), t('waysItem3')],
    },
    {
      icon: Rocket,
      title: outcomesTitle,
      desc: t('outcomesDesc'),
      items: [t('outcomesItem1'), t('outcomesItem2'), t('outcomesItem3')],
    },
  ];

  if (isHomePage) {
    return (
      <section
        {...(includeId ? { id: "operating-model" } : {})}
        className="w-full py-20 md:py-32 bg-black text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/bg.png')] opacity-10 bg-cover bg-center grayscale"></div>
        <div className="container px-4 md:px-6 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              {t('title')}{" "}
              <span className="text-white">{t('titleHighlight')}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[800px] text-gray-200 md:text-xl leading-relaxed">
              {t('description')}
            </p>
            <div className="mt-4 h-1 w-12 bg-gradient-to-r from-white to-gray-400 mx-auto rounded-full"></div>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const gradients = [
                'from-black to-gray-800',
                'from-gray-800 to-gray-600',
                'from-gray-600 to-gray-400',
              ];
              const borderHovers = [
                'hover:border-black dark:hover:border-white',
                'hover:border-gray-800 dark:hover:border-gray-200',
                'hover:border-gray-600 dark:hover:border-gray-400',
              ];
              return (
                <div key={idx} className={`group relative bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 transition-all duration-300 hover:shadow-2xl border border-gray-200 dark:border-gray-800 ${borderHovers[idx]}`}>
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradients[idx]} rounded-t-lg`}></div>
                  <div className="mb-6 rounded-lg bg-gray-100 dark:bg-gray-800 w-14 h-14 flex items-center justify-center text-black dark:text-white">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-black dark:text-white">{pillar.title}</h3>
                  <p className="text-gray-800 dark:text-gray-200 mb-4 leading-relaxed">{pillar.desc}</p>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {pillar.items.map((item, i) => (
                      <li key={i}>{`\u2022 ${item}`}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          {showCTA && (
            <div className="mt-12 text-center">
              <Button asChild className="bg-black hover:bg-gray-800 text-white shadow-md hover:shadow-lg rounded-md transition-all duration-300">
                <Link href="/about#operating-model">{t('seeDetails')}</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section {...(includeId ? { id: "operating-model" } : {})} className="mb-24">
      <h2 className="text-3xl font-bold mb-10 text-center text-black dark:text-white">
        {t('title')} {t('titleHighlight')}
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          const gradients = [
            'from-black to-gray-600',
            'from-gray-800 to-gray-500',
            'from-gray-600 to-gray-400',
          ];
          return (
            <div key={idx} className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300">
              <div className={`h-2 w-20 bg-gradient-to-r ${gradients[idx]} rounded-full mb-6`}></div>
              <h3 className="text-xl font-bold mb-3 text-black dark:text-white">{pillar.title}</h3>
              <p className="text-lg leading-relaxed mb-4 text-gray-800 dark:text-gray-200">{pillar.desc}</p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                {pillar.items.map((item, i) => (
                  <li key={i}>{`\u2022 ${item}`}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
