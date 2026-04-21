'use client';

import React, { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { AppState, QuizQuestion, Answer, QuizResults } from './types';
import { generateQuizQuestions, generateResultsSummary } from './services/geminiService';
import QuizQuestionComponent from './components/QuizQuestion';
import EmailForm from './components/EmailForm';
import ResultsDisplay from './components/ResultsDisplay';
import ProgressBar from './components/ProgressBar';
import { Header } from "@/app/[locale]/components/ui/header";
import { Footer } from "@/app/[locale]/components/ui/footer";

const INDUSTRIES = [
  { apiValue: 'Retail / E-commerce', displayKey: 'industries.retail' },
  { apiValue: 'Healthcare', displayKey: 'industries.healthcare' },
  { apiValue: 'Manufacturing', displayKey: 'industries.manufacturing' },
  { apiValue: 'Finance & Insurance', displayKey: 'industries.finance' },
  { apiValue: 'Professional Services', displayKey: 'industries.professional' },
  { apiValue: 'Technology', displayKey: 'industries.technology' },
] as const;

export default function CalculatorPage() {
  const t = useTranslations("calculator");

  const [appState, setAppState] = useState<AppState>('start');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [email, setEmail] = useState('');
  const [results, setResults] = useState<QuizResults | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndustryApiValue, setSelectedIndustryApiValue] = useState<string | null>(null);
  const [employeeCount, setEmployeeCount] = useState('');
  const [averageSalary, setAverageSalary] = useState('');

  const startQuiz = useCallback(async () => {
    if (!selectedIndustryApiValue || !employeeCount || !averageSalary) return;
    setAppState('loading');
    setError(null);
    try {
      const fetchedQuestions = await generateQuizQuestions(selectedIndustryApiValue);
      if (fetchedQuestions && fetchedQuestions.length > 0) {
        setQuestions(fetchedQuestions);
        setAppState('quiz');
        setCurrentQuestionIndex(0);
        setAnswers([]);
      } else {
        throw new Error("No questions were generated.");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "An unknown error occurred.");
      setAppState('error');
    }
  }, [selectedIndustryApiValue, employeeCount, averageSalary]);

  const handleAnswer = (answer: Answer) => {
    const newAnswers = [...answers, { ...answer, question: questions[currentQuestionIndex].question }];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setAppState('email');
    }
  };

  const handleEmailSubmit = useCallback(async (submittedEmail: string) => {
    if (!selectedIndustryApiValue || !employeeCount || !averageSalary) {
      setError(t("error.missingData"));
      setAppState('error');
      return;
    }
    setEmail(submittedEmail);
    setAppState('loading');
    setError(null);

    try {
      const numEmployees = parseInt(employeeCount, 10);
      const annualSalary = parseInt(averageSalary, 10);
      const hourlyRate = annualSalary / 2080;

      const totalTimeSavingPerEmployee = answers.reduce((sum, ans) => sum + ans.timeSaving, 0);
      const totalCompanyTimeSaving = totalTimeSavingPerEmployee * numEmployees;
      const totalReadinessScore = answers.reduce((sum, ans) => sum + ans.readinessScore, 0);
      const maxReadinessScore = questions.length * 10;
      const moneySaved = totalCompanyTimeSaving * hourlyRate;

      const summary = await generateResultsSummary(answers, selectedIndustryApiValue, numEmployees, annualSalary);

      setResults({
        totalTimeSaving: totalCompanyTimeSaving,
        totalReadinessScore,
        maxReadinessScore,
        moneySaved,
        summary,
      });
      setAppState('results');
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to generate results.");
      setAppState('error');
    }
  }, [answers, selectedIndustryApiValue, employeeCount, averageSalary, questions.length, t]);

  const restartQuiz = () => {
    setAppState('start');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setEmail('');
    setResults(null);
    setError(null);
    setSelectedIndustryApiValue(null);
    setEmployeeCount('');
    setAverageSalary('');
  };

  const renderContent = () => {
    switch (appState) {
      case 'start':
        return (
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{t("start.title")}</h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">{t("start.description")}</p>

            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">{t("start.selectIndustry")}</h2>
                <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                  {INDUSTRIES.map((ind) => (
                    <button
                      key={ind.apiValue}
                      onClick={() => setSelectedIndustryApiValue(ind.apiValue)}
                      className={`px-4 py-2 md:px-6 md:py-3 font-semibold border-2 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 ${
                        selectedIndustryApiValue === ind.apiValue
                          ? 'bg-black border-black text-white shadow-lg'
                          : 'bg-white border-gray-300 text-gray-700 hover:border-gray-600'
                      }`}
                    >
                      {t(ind.displayKey)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label htmlFor="employeeCount" className="text-xl font-bold text-gray-800 mb-4 block">{t("start.employeeCount")}</label>
                  <input
                    id="employeeCount"
                    type="number"
                    value={employeeCount}
                    onChange={(e) => setEmployeeCount(e.target.value)}
                    placeholder={t("start.employeePlaceholder")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 text-center"
                    min="1"
                  />
                </div>
                <div>
                  <label htmlFor="averageSalary" className="text-xl font-bold text-gray-800 mb-4 block">{t("start.averageSalary")}</label>
                  <input
                    id="averageSalary"
                    type="number"
                    value={averageSalary}
                    onChange={(e) => setAverageSalary(e.target.value)}
                    placeholder={t("start.salaryPlaceholder")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 text-center"
                    min="1"
                  />
                </div>
              </div>

              <button
                onClick={startQuiz}
                disabled={!selectedIndustryApiValue || !employeeCount || !averageSalary}
                className="bg-black text-white font-bold py-4 px-10 text-lg rounded-lg hover:bg-gray-800 transition-all transform hover:scale-105 duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
              >
                {t("start.startQuiz")}
              </button>
            </div>
          </div>
        );
      case 'loading':
        return (
          <div className="text-center">
            <svg className="animate-spin mx-auto h-12 w-12 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-4 text-lg text-gray-600">{answers.length > 0 ? t("loading.analyzing") : t("loading.generating")}</p>
          </div>
        );
      case 'quiz':
        return (
          <>
            <p className="text-center font-semibold text-gray-700 mb-2">{t("quiz.questionOf", { current: currentQuestionIndex + 1, total: questions.length })}</p>
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
        return results && <ResultsDisplay results={results} email={email} onRestart={restartQuiz} />;
      case 'error':
        return (
          <div className="text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
            <strong className="font-bold">{t("error.title")}</strong>
            <p className="block sm:inline ml-2">{error}</p>
            <button onClick={restartQuiz} className="mt-4 bg-black text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-800">
              {t("error.tryAgain")}
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-4 py-20">
        <div className="w-full max-w-4xl">
          {renderContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
}
