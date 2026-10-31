import React, { useState, useEffect } from 'react';
import { Problem, Formula } from '../types/index.ts';
import { MathView } from '../components/MathView.tsx';
import { SpeedHud } from '../components/SpeedHud.tsx';
import { FormulaInspector } from '../components/FormulaInspector.tsx';
import { InteractiveScratchpad } from '../components/InteractiveScratchpad.tsx';
import { TechnicalDiagram } from '../components/TechnicalDiagram.tsx';
import {
  Flag,
  CheckCircle,
  AlertTriangle,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Edit2,
  Check,
  Zap
} from 'lucide-react';

interface CockpitScreenProps {
  problems: Problem[];
  activeProblemIndex: number;
  onSelectProblemIndex: (index: number) => void;
  onUpdateProblem: (updated: Problem) => void;
  formulas: Formula[];
}

export const CockpitScreen: React.FC<CockpitScreenProps> = ({
  problems,
  activeProblemIndex,
  onSelectProblemIndex,
  onUpdateProblem,
  formulas,
}) => {
  const currentProblem = problems[activeProblemIndex] || problems[0];

  // Timer states
  const [elapsedSec, setElapsedSec] = useState<number>(currentProblem.elapsedSec || 0);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [showScratchpad, setShowScratchpad] = useState<boolean>(true);
  const [selectedFormulaId, setSelectedFormulaId] = useState<string>(
    currentProblem.formulaKeys[0] || formulas[0]?.id || ''
  );

  // Sync elapsed timer when question changes
  useEffect(() => {
    setElapsedSec(currentProblem.elapsedSec || 0);
    if (currentProblem.formulaKeys[0]) {
      setSelectedFormulaId(currentProblem.formulaKeys[0]);
    }
  }, [activeProblemIndex, currentProblem]);

  // Active question timer tick
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedSec(prev => {
          const next = prev + 1;
          onUpdateProblem({ ...currentProblem, elapsedSec: next });
          return next;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, currentProblem, onUpdateProblem]);

  // Keyboard shortcut listener for options (1,2,3,4 / A,B,C,D) and navigation (N, P)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        setIsRunning(r => !r);
      } else if (e.key === '1' || e.key.toUpperCase() === 'A') {
        handleSelectOption('A');
      } else if (e.key === '2' || e.key.toUpperCase() === 'B') {
        handleSelectOption('B');
      } else if (e.key === '3' || e.key.toUpperCase() === 'C') {
        handleSelectOption('C');
      } else if (e.key === '4' || e.key.toUpperCase() === 'D') {
        handleSelectOption('D');
      } else if (e.key.toLowerCase() === 'n' && activeProblemIndex < problems.length - 1) {
        onSelectProblemIndex(activeProblemIndex + 1);
      } else if (e.key.toLowerCase() === 'p' && activeProblemIndex > 0) {
        onSelectProblemIndex(activeProblemIndex - 1);
      } else if (e.key.toLowerCase() === 's') {
        setShowScratchpad(s => !s);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProblemIndex, currentProblem, problems.length]);

  const handleSelectOption = (optionId: string) => {
    const isCorrect = currentProblem.options.find(o => o.id === optionId)?.isCorrect;
    const newStatus = isCorrect ? 'mastered' : 'fragile';

    onUpdateProblem({
      ...currentProblem,
      selectedOptionId: optionId,
      status: newStatus,
      elapsedSec,
    });
  };

  const handleToggleFlag = () => {
    onUpdateProblem({
      ...currentProblem,
      markedForReview: !currentProblem.markedForReview,
    });
  };

  const handleSetConfidence = (conf: 'certain' | 'deductive' | 'intuitive' | 'guess') => {
    onUpdateProblem({
      ...currentProblem,
      confidence: conf,
    });
  };

  // Filter formulas relevant to current question
  const relevantFormulas = formulas.filter(
    f => currentProblem.formulaKeys.includes(f.id) || f.subject === currentProblem.subject
  ).concat(formulas.filter(f => !currentProblem.formulaKeys.includes(f.id))).slice(0, 4);

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-[#121316] p-4 lg:p-6 space-y-4">
      {/* Speedhud Banner at the top */}
      <SpeedHud
        elapsedSec={elapsedSec}
        timeBudgetSec={currentProblem.timeBudgetSec}
        isRunning={isRunning}
        onTogglePlay={() => setIsRunning(r => !r)}
        onReset={() => setElapsedSec(0)}
        questionNumber={currentProblem.number}
        totalQuestions={problems.length}
      />

      {/* 12-Column Grid Layout:
          Columns 1-8: Problem, Diagrams, Interactive Options, Scratchpad
          Columns 9-12: Diagnostic Telemetry Sidebar, Question Matrix, Formula Inspector */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
        {/* Left / Central Workspace: 8 Columns */}
        <div className="xl:col-span-8 space-y-4">
          {/* Problem Card container conforming strictly to the design spec:
              "Background #181A1F, border 1px solid #2D3139. Header bars separated by 1px bottom divider #2D3139." */}
          <div className="bg-[#181a1f] border border-[#2d3139] rounded-[4px] overflow-hidden">
            {/* Header bar with metadata metrics rendered in label-md */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b border-[#2d3139] bg-[#121316]">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-semibold text-[#f3f4f6]">
                  {currentProblem.subject}
                </span>
                <span className="text-[#52525b]">/</span>
                <span className="text-xs font-mono text-[#8e8e93]">
                  {currentProblem.subtopic}
                </span>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                {/* Status indicator pills conforming to design spec */}
                {currentProblem.status === 'mastered' && (
                  <span className="bg-[#10b981]/12 text-[#10b981] border border-[#10b981]/30 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-[2px] font-medium">
                    Mastered
                  </span>
                )}
                {currentProblem.status === 'fragile' && (
                  <span className="bg-[#f59e0b]/12 text-[#f59e0b] border border-[#f59e0b]/30 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-[2px] font-medium">
                    Fragile
                  </span>
                )}
                {currentProblem.status === 'unattempted' && (
                  <span className="bg-[#181a1f] text-[#8e8e93] border border-[#2d3139] text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-[2px]">
                    Unattempted
                  </span>
                )}

                <button
                  onClick={handleToggleFlag}
                  className={`p-1.5 rounded-[2px] border transition-colors flex items-center gap-1 text-[11px] ${
                    currentProblem.markedForReview
                      ? 'bg-[#f59e0b]/15 border-[#f59e0b] text-[#f59e0b]'
                      : 'border-[#2d3139] text-[#8e8e93] hover:text-[#f3f4f6]'
                  }`}
                  title="Flag for review"
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">
                    {currentProblem.markedForReview ? 'Marked' : 'Review'}
                  </span>
                </button>
              </div>
            </div>

            {/* Problem Body & Mathematical Formulation */}
            <div className="p-4 lg:p-6 space-y-4">
              <div className="text-sm md:text-base leading-relaxed text-[#e3e2e6] font-normal">
                <MathView math={currentProblem.questionLatex} />
              </div>

              {/* Technical Schematic Diagram if present */}
              {currentProblem.diagramType && (
                <div className="my-2">
                  <TechnicalDiagram type={currentProblem.diagramType} />
                </div>
              )}

              {/* Options Section */}
              <div className="space-y-2.5 pt-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#8e8e93] font-semibold flex items-center justify-between">
                  <span>Assert Answer Target</span>
                  <span className="text-[10px] text-[#52525b]">Hotkeys: [1-4] or [A-D]</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 font-mono">
                  {currentProblem.options.map(option => {
                    const isSelected = currentProblem.selectedOptionId === option.id;
                    const isSubmitted = !!currentProblem.selectedOptionId;

                    let borderClass = 'border-[#2d3139] hover:border-[#3e434d] bg-[#121316]';
                    let textClass = 'text-[#e3e2e6]';
                    let badgeClass = 'bg-[#181a1f] text-[#8e8e93] border-[#2d3139]';

                    if (isSelected) {
                      if (option.isCorrect) {
                        borderClass = 'border-[#10b981] bg-[#10b981]/10';
                        textClass = 'text-[#10b981] font-medium';
                        badgeClass = 'bg-[#10b981] text-black font-bold border-[#10b981]';
                      } else {
                        borderClass = 'border-[#f59e0b] bg-[#f59e0b]/10';
                        textClass = 'text-[#f59e0b] font-medium';
                        badgeClass = 'bg-[#f59e0b] text-black font-bold border-[#f59e0b]';
                      }
                    } else if (isSubmitted && option.isCorrect) {
                      borderClass = 'border-[#10b981]/50 bg-[#10b981]/5';
                      badgeClass = 'border-[#10b981]/50 text-[#10b981]';
                    }

                    return (
                      <button
                        key={option.id}
                        onClick={() => handleSelectOption(option.id)}
                        className={`text-left p-3 rounded-[4px] border transition-all flex items-start gap-3 group relative ${borderClass}`}
                      >
                        <span
                          className={`w-6 h-6 rounded-[2px] border text-xs flex items-center justify-center shrink-0 font-bold transition-colors ${badgeClass}`}
                        >
                          {option.id}
                        </span>
                        <div className="flex-1 text-xs leading-relaxed pt-0.5">
                          <MathView math={option.text} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Confidence Rater (Cognitive Invariant) */}
              <div className="pt-3 border-t border-[#2d3139] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <span className="text-[11px] text-[#8e8e93]">Empirical Confidence:</span>
                <div className="flex items-center gap-1.5">
                  {(['certain', 'deductive', 'intuitive', 'guess'] as const).map(conf => (
                    <button
                      key={conf}
                      onClick={() => handleSetConfidence(conf)}
                      className={`px-2.5 py-1 text-[11px] rounded-[2px] border transition-colors capitalize ${
                        currentProblem.confidence === conf
                          ? 'bg-[#5856d6] border-[#5856d6] text-white font-medium'
                          : 'bg-[#121316] border-[#2d3139] text-[#8e8e93] hover:text-[#f3f4f6]'
                      }`}
                    >
                      {conf === 'certain' ? '100% Certain' : conf}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback & Trap Alert if answered */}
              {currentProblem.selectedOptionId && (
                <div
                  className={`p-3 rounded-[4px] border text-xs font-mono ${
                    currentProblem.selectedOptionId === currentProblem.correctOptionId
                      ? 'bg-[#10b981]/10 border-[#10b981]/40 text-[#4edea3]'
                      : 'bg-[#f59e0b]/10 border-[#f59e0b]/40 text-[#ffb95f]'
                  }`}
                >
                  <div className="flex items-center gap-2 font-semibold mb-1">
                    {currentProblem.selectedOptionId === currentProblem.correctOptionId ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-[#10b981]" />
                        <span>Assertion Verified: Option {currentProblem.correctOptionId}</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-4 h-4 text-[#f59e0b]" />
                        <span>Decay Trap Triggered: Option {currentProblem.selectedOptionId} is incorrect</span>
                      </>
                    )}
                  </div>
                  <p className="text-[11px] text-[#e3e2e6] leading-relaxed">
                    {currentProblem.trapAnalysis}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Nav Footer within Problem Card */}
            <div className="px-4 py-2.5 border-t border-[#2d3139] bg-[#121316] flex items-center justify-between font-mono text-xs">
              <button
                disabled={activeProblemIndex === 0}
                onClick={() => onSelectProblemIndex(activeProblemIndex - 1)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-[4px] bg-[#181a1f] border border-[#2d3139] text-[#8e8e93] hover:text-[#f3f4f6] disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev [P]</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowScratchpad(s => !s)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] border transition-colors ${
                    showScratchpad
                      ? 'bg-[#5856d6]/20 border-[#5856d6] text-[#c2c1ff]'
                      : 'bg-[#181a1f] border-[#2d3139] text-[#8e8e93] hover:text-[#f3f4f6]'
                  }`}
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Scratchpad [S]</span>
                </button>
              </div>

              <button
                disabled={activeProblemIndex === problems.length - 1}
                onClick={() => onSelectProblemIndex(activeProblemIndex + 1)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-[4px] bg-[#5856d6] text-white hover:bg-[#4b48b8] disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <span>Next [N]</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Scratchpad & Derivation Drawer */}
          {showScratchpad && (
            <div className="h-[320px]">
              <InteractiveScratchpad />
            </div>
          )}
        </div>

        {/* Right Diagnostic Telemetry Sidebar: 4 Columns */}
        <div className="xl:col-span-4 space-y-4">
          {/* Question Matrix Grid Navigator */}
          <div className="bg-[#181a1f] border border-[#2d3139] rounded-[4px] p-4 font-mono">
            <div className="flex items-center justify-between pb-3 border-b border-[#2d3139] mb-3">
              <span className="text-[11px] font-semibold text-[#f3f4f6] uppercase tracking-wider">
                Question Matrix (1–{problems.length})
              </span>
              <span className="text-[10px] text-[#8e8e93]">Cockpit Grid</span>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {problems.map((prob, idx) => {
                const isActive = idx === activeProblemIndex;
                let bgClass = 'bg-[#121316] text-[#8e8e93] border-[#2d3139]';

                if (prob.status === 'mastered') {
                  bgClass = 'bg-[#10b981]/15 text-[#10b981] border-[#10b981]/40';
                } else if (prob.status === 'fragile') {
                  bgClass = 'bg-[#f59e0b]/15 text-[#f59e0b] border-[#f59e0b]/40';
                }

                if (isActive) {
                  bgClass += ' ring-2 ring-[#5856d6] font-bold text-white';
                }

                return (
                  <button
                    key={prob.id}
                    onClick={() => onSelectProblemIndex(idx)}
                    className={`h-9 rounded-[2px] border text-xs flex flex-col items-center justify-center transition-all relative ${bgClass}`}
                  >
                    <span>{prob.number.toString().padStart(2, '0')}</span>
                    {prob.markedForReview && (
                      <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend row conforming to zero-pill metadata */}
            <div className="mt-4 pt-3 border-t border-[#2d3139] flex items-center justify-between text-[10px] text-[#8e8e93]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-[1px] bg-[#10b981]" />
                <span>Mastered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-[1px] bg-[#f59e0b]" />
                <span>Fragile</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-[1px] bg-[#2d3139]" />
                <span>Unattempted</span>
              </div>
            </div>
          </div>

          {/* Formula Inspector Sidebar Module */}
          <div className="bg-[#181a1f] border border-[#2d3139] rounded-[4px] p-4">
            <FormulaInspector
              formulas={relevantFormulas}
              activeFormulaId={selectedFormulaId}
              onSelectFormula={id => setSelectedFormulaId(id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
