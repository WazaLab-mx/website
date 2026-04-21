import { QuizQuestion, Answer } from '../types';

export const generateQuizQuestions = async (industry: string): Promise<QuizQuestion[]> => {
  try {
    const response = await fetch('/api/calculator/generate-questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ industry }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to generate questions');
    }

    const data = await response.json();
    return data.questions;
  } catch (error) {
    console.error("Error generating quiz questions:", error);
    throw new Error("Failed to generate quiz questions. Please check your API key and try again.");
  }
};

export const generateResultsSummary = async (
  answers: Answer[],
  industry: string,
  employeeCount: number,
  averageSalary: number
): Promise<{ summary: string; bulletPoints: string[] }> => {
  try {
    const response = await fetch('/api/calculator/generate-summary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        answers,
        industry,
        employeeCount,
        averageSalary,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to generate summary');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error generating results summary:", error);
    throw new Error("Failed to generate results summary.");
  }
};
