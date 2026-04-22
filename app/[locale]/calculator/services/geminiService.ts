import { Answer, CalculatorContext, QuizQuestion, QuizResultsSummary } from '../types';

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
