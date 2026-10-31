import React, { useState } from 'react';
import { Problem } from '../types/index.ts';
import { MathView } from '../components/MathView.tsx';
import { TechnicalDiagram } from '../components/TechnicalDiagram.tsx';
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Layers,
  ChevronLeft,
  ChevronRight,
  Target,
  Award,
  BarChart2,
  FileText
} from 'lucide-react';

interface AuditScreenProps {
  problems: Problem[];
}

export const AuditScreen: React.FC<AuditScreenProps> = ({ problems }) => {
  const [selectedProblemIndex, setSelectedProblemIndex] = useState<number>(0);
  const problem = problems[selectedProblemIndex] || problems[0];

  const masteredProblems = problems.filter(p => p.status === 'mastered');
  const fragileProblems = problems.filter(p => p.status === 'fragile');
  const unattemptedProblems = problems.filter(p => p.status === 'unattempted');

  const accuracyPct = Math.round((masteredProblems.length / Math.max(1, masteredProblems.length + fragileProblems.length)) * 100);

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-[#121316] p-4 lg:p-6 space-y-4 font-mono">
      {/* Top Banner & Diagnostic Percentile Strip */}
      <div className="bg-[#181a1f] border border-[#2d3139] rounded-[4px] p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[#8e8e93] font-semibold">
              Forensic Examination Post-Mortem
            </div>
            <h2 className="text-xl font-bold text-[#f3f4f6]">
              Split-Pane Question Paper & Distractor Trap Audit
            </h2>
            <div className="flex items-center gap-2 text-xs text-[#8e8e93] mt-1">
              <span>National Engineering Mock 04</span>
              <span>·</span>
              <span className="text-[#10b981]">Percentile Rank: 99.4th</span>
              <span>·</span>
              <span className="text-[#c2c1ff]">Projected Score: 242 / 300</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-[#121316] border border-[#2d3139] px-3 py-1.5 rounded-[2px] text-center">
              <span className="text-[9px] text-[#8e8e93] block uppercase">Verification Accuracy</span>
              <span className="text-sm font-bold text-[#10b981] tabular-nums">{accuracyPct}%</span>
            </div>
            <div className="bg-[#121316] border border-[#2d3139] px-3 py-1.5 rounded-[2px] text-center">
              <span className="text-[9px] text-[#8e8e93] block uppercase">Traps Triggered</span>
              <span className="text-sm font-bold text-[#f59e0b] tabular-nums">{fragileProblems.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Question Selector Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {problems.map((p, idx) => {
          const isSelected = idx === selectedProblemIndex;
          let badgeColor = 'border-[#2d3139] bg-[#181a1f] text-[#8e8e93]';
          if (p.status === 'mastered') {
            badgeColor = 'border-[#10b981]/50 bg-[#10b981]/15 text-[#10b981]';
          } else if (p.status === 'fragile') {
            badgeColor = 'border-[#f59e0b]/50 bg-[#f59e0b]/15 text-[#f59e0b]';
          }
          if (isSelected) {
            badgeColor += ' ring-2 ring-[#5856d6] font-bold text-white';
          }

          return (
            <button
              key={p.id}
              onClick={() => setSelectedProblemIndex(idx)}
              className={`px-3 py-1.5 rounded-[2px] text-xs border whitespace-nowrap transition-all ${badgeColor}`}
            >
              Q-{p.number.toString().padStart(2, '0')}: {p.subject.slice(0, 10)}
            </button>
          );
        })}
      </div>

      {/* Split-Pane 8-Column / Split Layout:
          Left Pane (6 cols): Question Statement, Options, Traps
          Right Pane (6 cols): Step-by-Step Derivation, Forensic Trap Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
        {/* Left Pane: Question Paper Context */}
        <div className="lg:col-span-6 bg-[#181a1f] border border-[#2d3139] rounded-[4px] flex flex-col overflow-hidden">
          <div className="px-4 py-3 bg-[#121316] border-b border-[#2d3139] flex items-center justify-between text-xs">
            <span className="font-semibold text-[#f3f4f6]">
              Problem Paper View [Q-{problem.number.toString().padStart(2, '0')}]
            </span>
            <span className="text-[#8e8e93]">{problem.difficulty}</span>
          </div>

          <div className="p-4 space-y-4 flex-1 overflow-y-auto">
            <div className="text-sm text-[#e3e2e6] leading-relaxed">
              <MathView math={problem.questionLatex} />
            </div>

            {problem.diagramType && (
              <div className="my-2">
                <TechnicalDiagram type={problem.diagramType} />
              </div>
            )}

            {/* Options list with trap commentary */}
            <div className="space-y-2 pt-2">
              <div className="text-[10px] uppercase tracking-wider text-[#8e8e93] font-semibold">
                Option Array & Forensic Traps
              </div>
              <div className="space-y-2">
                {problem.options.map(opt => {
                  const isCorrect = opt.isCorrect;
                  const isUserSelection = problem.selectedOptionId === opt.id;

                  return (
                    <div
                      key={opt.id}
                      className={`p-3 rounded-[4px] border text-xs transition-colors ${
                        isCorrect
                          ? 'border-[#10b981] bg-[#10b981]/10 text-[#f3f4f6]'
                          : isUserSelection
                          ? 'border-[#f59e0b] bg-[#f59e0b]/10 text-[#f3f4f6]'
                          : 'border-[#2d3139] bg-[#121316] text-[#8e8e93]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-5 h-5 rounded-[2px] flex items-center justify-center font-bold text-xs ${
                              isCorrect
                                ? 'bg-[#10b981] text-black'
                                : isUserSelection
                                ? 'bg-[#f59e0b] text-black'
                                : 'bg-[#181a1f] text-[#8e8e93] border border-[#2d3139]'
                            }`}
                          >
                            {opt.id}
                          </span>
                          <span className="font-medium text-[#f3f4f6]">
                            <MathView math={opt.text} />
                          </span>
                        </div>
                        {isCorrect && (
                          <span className="text-[10px] text-[#10b981] font-semibold uppercase">
                            Correct Assertion
                          </span>
                        )}
                        {isUserSelection && !isCorrect && (
                          <span className="text-[10px] text-[#f59e0b] font-semibold uppercase">
                            User Trap Pick
                          </span>
                        )}
                      </div>

                      {opt.trapNote && (
                        <div className="text-[11px] text-[#8e8e93] pt-1 border-t border-[#2d3139]/50 mt-1.5">
                          <span className="text-[#c7c4d6]">Distractor Trap: </span>
                          <MathView math={opt.trapNote} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Pane: Mathematical Derivation & Forensic Trap Analysis */}
        <div className="lg:col-span-6 bg-[#181a1f] border border-[#2d3139] rounded-[4px] flex flex-col overflow-hidden">
          <div className="px-4 py-3 bg-[#121316] border-b border-[#2d3139] flex items-center justify-between text-xs">
            <span className="font-semibold text-[#f3f4f6]">
              Analytical Proof & Trap Forensics
            </span>
            <span className="text-[#10b981]">Standard Allocation: {problem.timeBudgetSec}s</span>
          </div>

          <div className="p-4 space-y-4 flex-1 overflow-y-auto">
            {/* Step-by-Step Mathematical Derivation */}
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[#8e8e93] font-semibold mb-2">
                Rigorous Step-by-Step Derivation
              </div>
              <div className="space-y-2">
                {problem.solutionSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-[#121316] border border-[#2d3139] rounded-[2px] text-xs text-[#e3e2e6] leading-relaxed flex items-start gap-2.5"
                  >
                    <span className="text-[#5856d6] font-bold shrink-0">{idx + 1}.</span>
                    <div className="flex-1 overflow-x-auto">
                      <MathView math={step} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Test-Maker Distractor Forensic Breakdown */}
            <div className="p-3 bg-[#121316] border border-[#f59e0b]/40 rounded-[4px]">
              <div className="flex items-center gap-2 text-[#f59e0b] text-xs font-semibold mb-1">
                <AlertTriangle className="w-4 h-4" />
                <span>Test-Setter Psychology & Trap Engineering</span>
              </div>
              <p className="text-xs text-[#e3e2e6] leading-relaxed">
                {problem.trapAnalysis}
              </p>
            </div>

            {/* Empirical Timing Forensics */}
            <div className="p-3 bg-[#121316] border border-[#2d3139] rounded-[4px] space-y-1.5 text-xs text-[#8e8e93]">
              <div className="flex items-center justify-between">
                <span>Standard Candidate Time:</span>
                <span className="text-[#f3f4f6]">{problem.timeBudgetSec}s</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Your Active Solve Time:</span>
                <span className="text-[#c2c1ff]">{problem.elapsedSec || 84}s</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Pace Velocity:</span>
                <span className="text-[#10b981] font-semibold">
                  {(problem.elapsedSec || 84) <= problem.timeBudgetSec ? 'Optimal (Ahead of clock)' : 'Over budget'}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Paging in Audit Pane */}
          <div className="px-4 py-2.5 border-t border-[#2d3139] bg-[#121316] flex items-center justify-between text-xs">
            <button
              disabled={selectedProblemIndex === 0}
              onClick={() => setSelectedProblemIndex(i => i - 1)}
              className="flex items-center gap-1 text-[#8e8e93] hover:text-[#f3f4f6] disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Prev Audit</span>
            </button>

            <span className="text-[#8e8e93]">
              {selectedProblemIndex + 1} of {problems.length}
            </span>

            <button
              disabled={selectedProblemIndex === problems.length - 1}
              onClick={() => setSelectedProblemIndex(i => i + 1)}
              className="flex items-center gap-1 text-[#8e8e93] hover:text-[#f3f4f6] disabled:opacity-30 disabled:pointer-events-none"
            >
              <span>Next Audit</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
