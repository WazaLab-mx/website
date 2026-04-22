import { Answer, CalculatorContext, QuizQuestion, QuizResults, QuizResultsSummary } from '../types';

export const generateQuizQuestions = async (ctx: CalculatorContext): Promise<QuizQuestion[]> => {
  const response = await fetch('/api/calculator/generate-questions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ctx),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Failed to generate questions');
  }

  const data = await response.json();
  return data.questions;
};

export const generateResultsSummary = async (
  answers: Answer[],
  ctx: CalculatorContext,
  computed: { annualHoursSaved: number; annualLaborSavings: number },
): Promise<QuizResultsSummary> => {
  const response = await fetch('/api/calculator/generate-summary', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers, ...ctx, ...computed }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Failed to generate summary');
  }

  return response.json();
};

export const sendReport = async (payload: {
  email: string;
  locale: string;
  context: CalculatorContext;
  results: QuizResults;
}): Promise<{ delivered: boolean; reason?: string }> => {
  const { email, locale, context, results } = payload;
  const metrics = {
    annualLaborSavings: results.annualLaborSavings,
    annualHoursSaved: results.annualHoursSaved,
    threeYearSavings: results.threeYearSavings,
    implementationCostLow: results.implementationCostLow,
    implementationCostHigh: results.implementationCostHigh,
    paybackMonths: results.paybackMonths,
    totalReadinessScore: results.totalReadinessScore,
    maxReadinessScore: results.maxReadinessScore,
  };

  const response = await fetch('/api/calculator/send-report', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, locale, context, metrics, summary: results.summary }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    return { delivered: false, reason: error.reason || 'network_error' };
  }

  return response.json();
};
