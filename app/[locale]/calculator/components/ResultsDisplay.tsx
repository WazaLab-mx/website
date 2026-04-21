'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { QuizResults } from '../types';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

interface ResultsDisplayProps {
  results: QuizResults;
  email: string;
  onRestart: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, email, onRestart }) => {
  const t = useTranslations("calculator.results");

  const readinessPercentage = results.maxReadinessScore > 0
    ? Math.round((results.totalReadinessScore / results.maxReadinessScore) * 100)
    : 0;

  return (
    <div className="animate-fade-in w-full max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-black mb-2">{t("title")}</h1>
      <p className="text-center text-gray-600 mb-8">{t("emailSentTo", { email })}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-center">
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-500">{t("timeSaved")}</h3>
          <p className="text-4xl font-bold text-gray-900">{t("hours", { count: results.totalTimeSaving.toLocaleString() })}</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-500">{t("monthlySavings")}</h3>
          <p className="text-4xl font-bold text-black">${results.moneySaved.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
          <p className="text-sm text-gray-500">{t("salaryBasis")}</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{t("readinessScore")}</h3>
        <div className="w-full bg-gray-200 rounded-full h-6">
          <div
            className="bg-gradient-to-r from-gray-900 to-gray-700 h-6 rounded-full flex items-center justify-center text-white font-bold transition-all duration-1000 ease-out"
            style={{ width: `${readinessPercentage}%` }}
          >
            {readinessPercentage}%
          </div>
        </div>
        <p className="text-center text-gray-600 mt-2">{t("readinessExplainer")}</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{t("personalizedAnalysis")}</h3>
        <div className="prose max-w-none text-gray-700">
          <p className="mb-4">{results.summary.summary}</p>
          <ul className="list-disc pl-5 mt-4 space-y-2">
            {results.summary.bulletPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-black to-gray-900 p-8 rounded-lg text-white text-center mb-6">
        <h3 className="text-2xl font-bold mb-4">{t("ctaTitle")}</h3>
        <p className="mb-6 text-gray-200">{t("ctaDescription")}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-white text-black hover:bg-gray-100">
            <Link href="/contact">{t("scheduleConsultation")}</Link>
          </Button>
          <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-black">
            <Link href="/services">{t("exploreServices")}</Link>
          </Button>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onRestart}
          className="bg-gray-900 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-800 transition-colors duration-300"
        >
          {t("retakeQuiz")}
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
