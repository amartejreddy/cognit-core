import { StudyBlock, TelemetryMetric } from '../types/index.ts';

export const initialStudyBlocks: StudyBlock[] = [
  {
    id: 'b-1',
    blockNumber: 1,
    title: 'Block I: Electromagnetic Field Theory & Potentials',
    subject: 'Electromagnetism',
    timeRange: '08:00 — 11:00',
    targetDurationMinutes: 180,
    elapsedMinutes: 180,
    status: 'completed',
    targetProblemCount: 40,
    completedProblemCount: 42,
    focusScore: 97
  },
  {
    id: 'b-2',
    blockNumber: 2,
    title: 'Block II: RLC Resonators & State-Space Transforms',
    subject: 'Circuit Analysis',
    timeRange: '11:30 — 14:30',
    targetDurationMinutes: 180,
    elapsedMinutes: 180,
    status: 'completed',
    targetProblemCount: 35,
    completedProblemCount: 38,
    focusScore: 93
  },
  {
    id: 'b-3',
    blockNumber: 3,
    title: 'Block III: Carnot Thermodynamic Engines & Entropy',
    subject: 'Thermodynamics',
    timeRange: '15:30 — 18:30',
    targetDurationMinutes: 180,
    elapsedMinutes: 118,
    status: 'active',
    targetProblemCount: 35,
    completedProblemCount: 26,
    focusScore: 91
  },
  {
    id: 'b-4',
    blockNumber: 4,
    title: 'Block IV: Timed Comprehensive Mock & Trap Forensics',
    subject: 'Comprehensive Mock',
    timeRange: '19:30 — 22:30',
    targetDurationMinutes: 180,
    elapsedMinutes: 0,
    status: 'upcoming',
    targetProblemCount: 30,
    completedProblemCount: 0,
    focusScore: 0
  }
];

export const hourlyTelemetry: TelemetryMetric[] = [
  { hour: '08:00', velocityProblemsPerHour: 14, accuracyRate: 92.8, cognitiveFatigueIndex: 12 },
  { hour: '09:00', velocityProblemsPerHour: 16, accuracyRate: 94.1, cognitiveFatigueIndex: 18 },
  { hour: '10:00', velocityProblemsPerHour: 15, accuracyRate: 91.5, cognitiveFatigueIndex: 26 },
  { hour: '11:30', velocityProblemsPerHour: 13, accuracyRate: 89.2, cognitiveFatigueIndex: 32 },
  { hour: '12:30', velocityProblemsPerHour: 14, accuracyRate: 88.0, cognitiveFatigueIndex: 39 },
  { hour: '13:30', velocityProblemsPerHour: 12, accuracyRate: 86.4, cognitiveFatigueIndex: 45 },
  { hour: '15:30', velocityProblemsPerHour: 11, accuracyRate: 84.5, cognitiveFatigueIndex: 51 },
  { hour: '16:30', velocityProblemsPerHour: 10, accuracyRate: 81.2, cognitiveFatigueIndex: 58 },
  { hour: '17:30', velocityProblemsPerHour: 9,  accuracyRate: 79.0, cognitiveFatigueIndex: 64 },
];
