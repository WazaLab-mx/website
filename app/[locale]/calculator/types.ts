export interface QuizOption {
  text: string;
  timeSaving: number;
  readinessScore: number;
}

export interface QuizQuestion {
  question: string;
  options: QuizOption[];
}

export interface Answer extends QuizOption {
  question: string;
}

export interface QuizResults {
  totalTimeSaving: number;
  totalReadinessScore: number;
  maxReadinessScore: number;
  moneySaved: number;
  summary: {
    summary: string;
    bulletPoints: string[];
  };
}

export type AppState = 'start' | 'loading' | 'quiz' | 'email' | 'results' | 'error';
