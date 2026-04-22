'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { QuizResults } from '../types';
import { Link } from '@/i18n/navigation';

interface ResultsDisplayProps {
  results: QuizResults;
  email: string;
  emailDelivered?: boolean | null;
  onRestart: () => void;
}

const formatCurrency = (value: number) =>
  '$' + Math.round(value).toLocaleString('en-US');

const formatHours = (value: number) =>
  Math.round(value).toLocaleString('en-US');

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, email, emailDelivered, onRestart }) => {
  const t = useTranslations("calculator.results");

  const emailMessage =
    emailDelivered === null
      ? t("emailSending", { email })
      : emailDelivered
        ? t("emailSentTo", { email })
        : t("emailPending", { email });

  const readinessPercentage = results.maxReadinessScore > 0
    ? Math.round((results.totalReadinessScore / results.maxReadinessScore) * 100)
    : 0;

  return (
    <div className="animate-fade-in w-full">
      <div className="text-center mb-14">
        <span className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 font-medium">
          {t("eyebrow")}
        </span>
        <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-black dark:text-white leading-[1.05]">
          {t("title")}
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          {emailMessage}
        </p>
      </div>

      {/* Headline metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-y border-gray-200 dark:border-gray-800 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-800">
        <Metric
          label={t("annualSavings")}
          value={formatCurrency(results.annualLaborSavings)}
          footnote={t("annualSavingsFootnote")}
          emphasis
        />
        <Metric
          label={t("annualHoursSaved")}
          value={formatHours(results.annualHoursSaved)}
          footnote={t("hoursUnit")}
        />
        <Metric
          label={t("threeYearSavings")}
          value={formatCurrency(results.threeYearSavings)}
          footnote={t("threeYearFootnote")}
        />
      </div>

      <div className="mt-4 text-right">
        <Link
          href="/calculator/methodology"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
        >
          {t("methodologyLink")} →
        </Link>
      </div>

      {/* Implementation & payback */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <InfoCard
          label={t("implementationCost")}
          value={`${formatCurrency(results.implementationCostLow)} – ${formatCurrency(results.implementationCostHigh)}`}
          description={t("implementationCostDescription")}
        />
        <InfoCard
          label={t("paybackPeriod")}
          value={results.paybackMonths
            ? t("paybackMonths", { count: results.paybackMonths })
            : t("paybackUnknown")}
          description={t("paybackDescription")}
        />
      </div>

      {/* Readiness */}
      <div className="mt-14">
        <div className="flex items-baseline justify-between mb-3">
          <span className="text-xs uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400 font-medium">
            {t("readinessScore")}
          </span>
          <span className="text-2xl font-semibold tabular-nums text-black dark:text-white">
            {readinessPercentage}%
          </span>
        </div>
        <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 overflow-hidden rounded-full">
          <div
            className="h-full bg-black dark:bg-white transition-all duration-1000 ease-out rounded-full"
            style={{ width: `${readinessPercentage}%` }}
          />
        </div>
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">{t("readinessExplainer")}</p>
      </div>

      {/* Personalized analysis */}
      <div className="mt-14 border-t border-gray-200 dark:border-gray-800 pt-10">
        <span className="text-xs uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400 font-medium">
          {t("personalizedAnalysis")}
        </span>
        <p className="mt-4 text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">
          {results.summary.summary}
        </p>

        <div className="mt-10 grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-sm uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 font-medium mb-4">
              {t("focusAreas")}
            </h3>
            <ul className="space-y-3">
              {results.summary.bulletPoints.map((point, i) => (
                <li key={i} className="flex gap-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="text-gray-400 tabular-nums mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {results.summary.quickWins && results.summary.quickWins.length > 0 && (
            <div>
              <h3 className="text-sm uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 font-medium mb-4">
                {t("quickWins")}
              </h3>
              <ul className="space-y-3">
                {results.summary.quickWins.map((win, i) => (
                  <li
                    key={i}
                    className="border-l-2 border-black dark:border-white pl-4 text-gray-700 dark:text-gray-300 leading-relaxed"
                  >
                    {win}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-16 bg-black dark:bg-gray-900 border border-gray-900 dark:border-gray-800 text-white p-10 md:p-12 rounded-lg">
        <h3 className="text-2xl md:text-3xl font-black tracking-tight">{t("ctaTitle")}</h3>
        <p className="mt-3 text-white/70 max-w-xl leading-relaxed">{t("ctaDescription")}</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-white text-black font-medium px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {t("scheduleConsultation")}
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center border border-white/30 text-white font-medium px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            {t("exploreServices")}
          </Link>
        </div>
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={onRestart}
          className="text-sm uppercase tracking-[0.25em] font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
        >
          {t("retakeQuiz")} →
        </button>
      </div>
    </div>
  );
};

function Metric({
  label,
  value,
  footnote,
  emphasis,
}: {
  label: string;
  value: string;
  footnote?: string;
  emphasis?: boolean;
}) {
  return (
    <div className="min-w-0 py-8 md:py-10 px-6 text-center">
      <span className="block text-xs uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400 font-medium">
        {label}
      </span>
      <span
        className={`block mt-4 font-black tabular-nums text-black dark:text-white break-words ${
          emphasis
            ? 'text-3xl md:text-4xl lg:text-5xl'
            : 'text-2xl md:text-3xl lg:text-4xl'
        }`}
      >
        {value}
      </span>
      {footnote && (
        <span className="block mt-2 text-xs text-gray-500 dark:text-gray-500">{footnote}</span>
      )}
    </div>
  );
}

function InfoCard({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="min-w-0 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
      <span className="block text-xs uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400 font-medium">
        {label}
      </span>
      <span className="block mt-3 text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-black dark:text-white tabular-nums break-words">
        {value}
      </span>
      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}

export default ResultsDisplay;
