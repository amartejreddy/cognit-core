export type MasteryStatus = 'mastered' | 'fragile' | 'unattempted';

export interface ProblemOption {
  id: string; // 'A' | 'B' | 'C' | 'D'
  text: string;
  isCorrect: boolean;
  trapNote?: string;
}

export interface Problem {
  id: string;
  number: number;
  subject: string;
  subtopic: string;
  difficulty: 'Tier 1' | 'Tier 2' | 'Tier 3';
  timeBudgetSec: number; // e.g. 120s
  questionLatex: string;
  diagramType?: 'circuit' | 'thermo_cycle' | 'potential_well' | 'vector_field' | 'signal';
  options: ProblemOption[];
  correctOptionId: string;
  status: MasteryStatus;
  markedForReview: boolean;
  selectedOptionId?: string;
  elapsedSec?: number;
  confidence?: 'certain' | 'deductive' | 'intuitive' | 'guess';
  solutionSteps: string[];
  formulaKeys: string[];
  trapAnalysis: string;
}

export interface Formula {
  id: string;
  name: string;
  subject: string;
  latex: string;
  shortcut: string;
  dimensions: string;
  variables: { symbol: string; meaning: string; units: string }[];
  retentionScore: number; // 0 - 100%
  stabilityDays: number;
  lastReviewed: string;
  decayStatus: MasteryStatus;
  keyDerivation: string;
}

export interface StudyBlock {
  id: string;
  blockNumber: number;
  title: string;
  subject: string;
  timeRange: string;
  targetDurationMinutes: number;
  elapsedMinutes: number;
  status: 'completed' | 'active' | 'upcoming';
  targetProblemCount: number;
  completedProblemCount: number;
  focusScore: number; // e.g. 96%
}

export interface TelemetryMetric {
  hour: string;
  velocityProblemsPerHour: number;
  accuracyRate: number;
  cognitiveFatigueIndex: number; // 0 - 100
}
