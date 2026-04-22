'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Header } from '@/app/[locale]/components/ui/header';
import { Footer } from '@/app/[locale]/components/ui/footer';
import { ArrowLeft } from 'lucide-react';

export default function MethodologyPage() {
  const t = useTranslations('calculator.methodology');

  const sections = ['hourlyRate', 'loadedCost', 'hoursSaved', 'annualSavings', 'implementation', 'payback'] as const;
  const caveats = ['0', '1', '2', '3'] as const;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center px-4 py-24 md:py-32">
        <div className="w-full max-w-3xl">
          <Link
            href="/calculator"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-10"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('back')}
          </Link>

          <span className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 font-medium">
            {t('eyebrow')}
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-black dark:text-white leading-[1.05]">
            {t('title')}
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
            {t('intro')}
          </p>

          {/* Formula at a glance */}
          <div className="mt-12 border-y border-gray-200 dark:border-gray-800 py-8">
            <div className="font-mono text-sm md:text-base text-black dark:text-white leading-relaxed">
              <span className="text-gray-500 dark:text-gray-400">{t('formulaLabel')}</span>
              <br />
              <span className="font-semibold">{t('formula')}</span>
            </div>
          </div>

          {/* Step-by-step */}
          <div className="mt-14 space-y-12">
            {sections.map((key, i) => (
              <section key={key} className="grid md:grid-cols-[auto_1fr] gap-4 md:gap-10">
                <span className="text-sm tabular-nums text-gray-400 dark:text-gray-600 font-medium">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white">
                    {t(`sections.${key}.title`)}
                  </h2>
                  <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {t(`sections.${key}.body`)}
                  </p>
                  <div className="mt-4 inline-block border border-gray-200 dark:border-gray-800 rounded px-3 py-2 font-mono text-sm text-black dark:text-white">
                    {t(`sections.${key}.example`)}
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* Caveats */}
          <div className="mt-20 border-t border-gray-200 dark:border-gray-800 pt-12">
            <span className="text-xs uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400 font-medium">
              {t('caveats.eyebrow')}
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight text-black dark:text-white">
              {t('caveats.title')}
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('caveats.intro')}
            </p>
            <ul className="mt-8 space-y-4">
              {caveats.map((key, i) => (
                <li
                  key={key}
                  className="flex gap-4 text-gray-700 dark:text-gray-300 leading-relaxed"
                >
                  <span className="text-gray-400 dark:text-gray-600 tabular-nums font-medium mt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{t(`caveats.items.${key}`)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA back */}
          <div className="mt-16 text-center">
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black font-medium py-3 px-8 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              {t('cta')}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
