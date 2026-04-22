export type AIMaturity = 'none' | 'exploring' | 'piloting' | 'deployed';
export type PrimaryGoal = 'cost' | 'speed' | 'quality' | 'growth';

export interface CalculatorContext {
  industry: string;
  country: string;
  employeeCount: number;
  averageSalary: number;
  weeklyHours: number;
  aiMaturity: AIMaturity;
  primaryGoal: PrimaryGoal;
}

export interface QuizOption {
  text: string;
  /** Hours saved per affected employee per week. */
  timeSaving: number;
  /** 1–10 score indicating AI readiness for this option. */
  readinessScore: number;
  /** 0–1 fraction of the workforce this option applies to. */
  impactRatio: number;
}

export interface QuizQuestion {
  question: string;
  /** Optional context to show under the question. */
  rationale?: string;
  options: QuizOption[];
}

export interface Answer extends QuizOption {
  question: string;
}

export interface QuizResultsSummary {
  summary: string;
  bulletPoints: string[];
  quickWins?: string[];
}

export interface QuizResults {
  weeklyHoursSaved: number;
  annualHoursSaved: number;
  annualLaborSavings: number;
  threeYearSavings: number;
  implementationCostLow: number;
  implementationCostHigh: number;
  paybackMonths: number | null;
  totalReadinessScore: number;
  maxReadinessScore: number;
  summary: QuizResultsSummary;
}

export type AppState = 'start' | 'loading' | 'quiz' | 'email' | 'results' | 'error';
