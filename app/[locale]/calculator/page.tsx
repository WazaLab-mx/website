'use client';

import React, { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import {
  AIMaturity,
  Answer,
  AppState,
  CalculatorContext,
  PrimaryGoal,
  QuizQuestion,
  QuizResults,
} from './types';
import { useLocale } from 'next-intl';
import { generateQuizQuestions, generateResultsSummary, sendReport } from './services/geminiService';
import QuizQuestionComponent from './components/QuizQuestion';
import EmailForm from './components/EmailForm';
import ResultsDisplay from './components/ResultsDisplay';
import ProgressBar from './components/ProgressBar';
import { Link } from '@/i18n/navigation';
import { Header } from "@/app/[locale]/components/ui/header";
import { Footer } from "@/app/[locale]/components/ui/footer";

const INDUSTRIES = [
  { apiValue: 'Retail / E-commerce', displayKey: 'industries.retail' },
  { apiValue: 'Healthcare', displayKey: 'industries.healthcare' },
  { apiValue: 'Manufacturing', displayKey: 'industries.manufacturing' },
  { apiValue: 'Finance & Insurance', displayKey: 'industries.finance' },
  { apiValue: 'Professional Services', displayKey: 'industries.professional' },
  { apiValue: 'Technology', displayKey: 'industries.technology' },
  { apiValue: 'Marketing & Advertising', displayKey: 'industries.marketing' },
  { apiValue: 'Arts & Entertainment', displayKey: 'industries.arts' },
] as const;

const MATURITY_LEVELS: { value: AIMaturity; labelKey: string }[] = [
  { value: 'none', labelKey: 'maturity.none' },
  { value: 'exploring', labelKey: 'maturity.exploring' },
  { value: 'piloting', labelKey: 'maturity.piloting' },
  { value: 'deployed', labelKey: 'maturity.deployed' },
];

const PRIMARY_GOALS: { value: PrimaryGoal; labelKey: string }[] = [
  { value: 'cost', labelKey: 'goal.cost' },
  { value: 'speed', labelKey: 'goal.speed' },
  { value: 'quality', labelKey: 'goal.quality' },
  { value: 'growth', labelKey: 'goal.growth' },
];

const WEEKS_PER_YEAR = 50;
const LOADED_COST_MULTIPLIER = 1.3;

export default function CalculatorPage() {
  const t = useTranslations("calculator");
  const locale = useLocale();

  const [appState, setAppState] = useState<AppState>('start');
  const [emailDelivered, setEmailDelivered] = useState<boolean | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [email, setEmail] = useState('');
  const [results, setResults] = useState<QuizResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [industry, setIndustry] = useState<string | null>(null);
  const [employeeCount, setEmployeeCount] = useState('');
  const [averageSalary, setAverageSalary] = useState('');
  const [weeklyHours, setWeeklyHours] = useState('40');
  const [aiMaturity, setAiMaturity] = useState<AIMaturity | null>(null);
  const [primaryGoal, setPrimaryGoal] = useState<PrimaryGoal | null>(null);

  const canStart = Boolean(industry && employeeCount && averageSalary && weeklyHours && aiMaturity && primaryGoal);

  const buildContext = (): CalculatorContext | null => {
    if (!canStart) return null;
    return {
      industry: industry!,
      employeeCount: parseInt(employeeCount, 10),
      averageSalary: parseInt(averageSalary, 10),
      weeklyHours: parseInt(weeklyHours, 10),
      aiMaturity: aiMaturity!,
      primaryGoal: primaryGoal!,
    };
  };

  const startQuiz = useCallback(async () => {
    const ctx = buildContext();
    if (!ctx) return;
    setAppState('loading');
    setError(null);
    try {
      const fetched = await generateQuizQuestions(ctx);
      if (!fetched || fetched.length === 0) {
        throw new Error(t("error.noQuestions"));
      }
      setQuestions(fetched);
      setAppState('quiz');
      setCurrentQuestionIndex(0);
      setAnswers([]);
    } catch (e) {
      setError(e instanceof Error ? e.message : t("error.generic"));
      setAppState('error');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [industry, employeeCount, averageSalary, weeklyHours, aiMaturity, primaryGoal]);

  const handleAnswer = (answer: Answer) => {
    const current = questions[currentQuestionIndex];
    const next = [...answers, { ...answer, question: current.question }];
    setAnswers(next);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setAppState('email');
    }
  };

  const handleEmailSubmit = useCallback(async (submittedEmail: string) => {
    const ctx = buildContext();
    if (!ctx) {
      setError(t("error.missingData"));
      setAppState('error');
      return;
    }
    setEmail(submittedEmail);
    setAppState('loading');
    setError(null);

    try {
      const { employeeCount: emp, averageSalary: salary, weeklyHours: hoursPerWeek } = ctx;
      const hourlyRate = salary / (hoursPerWeek * WEEKS_PER_YEAR);
      const loadedRate = hourlyRate * LOADED_COST_MULTIPLIER;

      const weeklyHoursSaved = answers.reduce((sum, a) => {
        const affected = Math.max(1, Math.round(emp * a.impactRatio));
        return sum + a.timeSaving * affected;
      }, 0);
      const annualHoursSaved = weeklyHoursSaved * WEEKS_PER_YEAR;
      const annualLaborSavings = annualHoursSaved * loadedRate;
      const threeYearSavings = annualLaborSavings * 3;

      const implementationCostLow = Math.max(15000, Math.round(emp * 300));
      const implementationCostHigh = Math.round(implementationCostLow * 3);

      const monthlySavings = annualLaborSavings / 12;
      const paybackMonths = monthlySavings > 0
        ? Math.max(1, Math.round(implementationCostLow / monthlySavings))
        : null;

      const totalReadinessScore = answers.reduce((sum, a) => sum + a.readinessScore, 0);
      const maxReadinessScore = questions.length * 10;

      const summary = await generateResultsSummary(answers, ctx, {
        annualHoursSaved: Math.round(annualHoursSaved),
        annualLaborSavings: Math.round(annualLaborSavings),
      });

      const finalResults: QuizResults = {
        weeklyHoursSaved: Math.round(weeklyHoursSaved),
        annualHoursSaved: Math.round(annualHoursSaved),
        annualLaborSavings: Math.round(annualLaborSavings),
        threeYearSavings: Math.round(threeYearSavings),
        implementationCostLow,
        implementationCostHigh,
        paybackMonths,
        totalReadinessScore,
        maxReadinessScore,
        summary,
      };

      setResults(finalResults);
      setAppState('results');

      // Fire-and-forget: persist the lead and send the email. UI doesn't wait on this.
      sendReport({ email: submittedEmail, locale, context: ctx, results: finalResults })
        .then(({ delivered }) => setEmailDelivered(delivered))
        .catch((err) => {
          console.error('sendReport failed:', err);
          setEmailDelivered(false);
        });
    } catch (e) {
      setError(e instanceof Error ? e.message : t("error.generic"));
      setAppState('error');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers, industry, employeeCount, averageSalary, weeklyHours, aiMaturity, primaryGoal, questions.length, locale]);

  const restartQuiz = () => {
    setAppState('start');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setEmail('');
    setResults(null);
    setError(null);
    setEmailDelivered(null);
    setIndustry(null);
    setEmployeeCount('');
    setAverageSalary('');
    setWeeklyHours('40');
    setAiMaturity(null);
    setPrimaryGoal(null);
  };

  const renderStart = () => (
    <div className="animate-fade-in">
      <div className="text-center mb-14">
        <span className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 font-medium">
          {t("start.eyebrow")}
        </span>
        <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-black dark:text-white leading-[1.05]">
          {t("start.title")}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          {t("start.description")}
        </p>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800 pt-12 space-y-12">
        <Field label={t("start.industryLabel")} number="01">
          <div className="flex flex-wrap gap-2">
            {INDUSTRIES.map((ind) => (
              <Chip
                key={ind.apiValue}
                active={industry === ind.apiValue}
                onClick={() => setIndustry(ind.apiValue)}
              >
                {t(ind.displayKey)}
              </Chip>
            ))}
          </div>
        </Field>

        <Field label={t("start.sizingLabel")} number="02">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <NumberInput
              id="employeeCount"
              label={t("start.employeeCount")}
              placeholder="50"
              value={employeeCount}
              onChange={setEmployeeCount}
              min={1}
            />
            <NumberInput
              id="averageSalary"
              label={t("start.averageSalary")}
              placeholder="65000"
              value={averageSalary}
              onChange={setAverageSalary}
              min={1}
              prefix="$"
            />
            <NumberInput
              id="weeklyHours"
              label={t("start.weeklyHours")}
              placeholder="40"
              value={weeklyHours}
              onChange={setWeeklyHours}
              min={1}
              max={80}
            />
          </div>
        </Field>

        <Field label={t("start.maturityLabel")} number="03">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {MATURITY_LEVELS.map((m) => (
              <Chip
                key={m.value}
                active={aiMaturity === m.value}
                onClick={() => setAiMaturity(m.value)}
                full
              >
                {t(m.labelKey)}
              </Chip>
            ))}
          </div>
        </Field>

        <Field label={t("start.goalLabel")} number="04">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {PRIMARY_GOALS.map((g) => (
              <Chip
                key={g.value}
                active={primaryGoal === g.value}
                onClick={() => setPrimaryGoal(g.value)}
                full
              >
                {t(g.labelKey)}
              </Chip>
            ))}
          </div>
        </Field>
      </div>

      <div className="mt-14 flex flex-col items-center gap-3">
        <button
          onClick={startQuiz}
          disabled={!canStart}
          className="bg-black dark:bg-white text-white dark:text-black font-medium py-4 px-10 text-base rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:text-gray-500 dark:disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          {t("start.startQuiz")}
        </button>
        <p className="text-xs text-gray-500 dark:text-gray-500">{t("start.duration")}</p>
        <Link
          href="/calculator/methodology"
          className="text-xs uppercase tracking-[0.2em] font-medium text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors mt-2"
        >
          {t("methodology.link")} →
        </Link>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (appState) {
      case 'start':
        return renderStart();
      case 'loading':
        return (
          <div className="text-center py-20">
            <div className="mx-auto h-10 w-10 border-2 border-gray-300 dark:border-gray-700 border-t-black dark:border-t-white rounded-full animate-spin" />
            <p className="mt-6 text-sm uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400">
              {answers.length > 0 ? t("loading.analyzing") : t("loading.generating")}
            </p>
          </div>
        );
      case 'quiz':
        return (
          <>
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400 mb-4">
              <span>{t("quiz.questionOf", { current: currentQuestionIndex + 1, total: questions.length })}</span>
              <span className="tabular-nums">{Math.round(((currentQuestionIndex) / questions.length) * 100)}%</span>
            </div>
            <ProgressBar current={currentQuestionIndex} total={questions.length} />
            <QuizQuestionComponent
              question={questions[currentQuestionIndex]}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
              onAnswer={(option) => handleAnswer({ ...option, question: questions[currentQuestionIndex].question })}
            />
          </>
        );
      case 'email':
        return <EmailForm onSubmit={handleEmailSubmit} isLoading={false} />;
      case 'results':
        return results && (
          <ResultsDisplay
            results={results}
            email={email}
            emailDelivered={emailDelivered}
            onRestart={restartQuiz}
          />
        );
      case 'error':
        return (
          <div className="text-center max-w-xl mx-auto border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 p-8 rounded-lg">
            <p className="text-sm uppercase tracking-[0.25em] text-red-700 dark:text-red-400 font-medium">
              {t("error.title")}
            </p>
            <p className="mt-3 text-gray-700 dark:text-gray-300">{error}</p>
            <button
              onClick={restartQuiz}
              className="mt-6 bg-black dark:bg-white text-white dark:text-black font-medium py-3 px-8 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              {t("error.tryAgain")}
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center px-4 py-24 md:py-32">
        <div className="w-full max-w-4xl">
          {renderContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
}

/* -------- small building blocks kept local to this page -------- */

function Field({ number, label, children }: { number: string; label: string; children: React.ReactNode }) {
  return (
    <div className="grid md:grid-cols-[auto_1fr] md:gap-10 gap-4">
      <div className="flex md:flex-col items-baseline md:items-start gap-4 md:gap-2">
        <span className="text-sm font-semibold tabular-nums text-gray-400 dark:text-gray-600">
          {number}
        </span>
        <span className="text-xs uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400 font-medium">
          {label}
        </span>
      </div>
      <div>{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
  full,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${full ? 'w-full' : ''} px-5 py-2.5 text-sm font-medium rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-950 focus:ring-black dark:focus:ring-white ${
        active
          ? 'bg-black dark:bg-white border-black dark:border-white text-white dark:text-black'
          : 'bg-transparent border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-500 dark:hover:border-gray-500'
      }`}
    >
      {children}
    </button>
  );
}

function NumberInput({
  id,
  label,
  placeholder,
  value,
  onChange,
  min,
  max,
  prefix,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  min?: number;
  max?: number;
  prefix?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400 font-medium mb-2">
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-sm">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full ${prefix ? 'pl-8' : 'pl-4'} pr-4 py-3 bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-black dark:focus:border-white transition-colors tabular-nums`}
          min={min}
          max={max}
        />
      </div>
    </div>
  );
}
