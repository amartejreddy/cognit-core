import React, { useState } from 'react';
import { Formula } from '../types/index.ts';
import { MathView } from '../components/MathView.tsx';
import {
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Brain,
  Sliders,
  Calendar,
  Layers,
  Sparkles,
  BookOpen,
  ArrowRight
} from 'lucide-react';

interface MatrixScreenProps {
  formulas: Formula[];
  onUpdateFormula: (updated: Formula) => void;
}

export const MatrixScreen: React.FC<MatrixScreenProps> = ({
  formulas,
  onUpdateFormula,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [drillIndex, setDrillIndex] = useState<number>(0);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  const subjects = ['All', 'Electromagnetism', 'Circuit Analysis', 'Thermodynamics', 'Multivariable Calculus', 'Quantum Mechanics'];

  const filteredFormulas = formulas.filter(f => {
    if (selectedSubject !== 'All' && f.subject !== selectedSubject) return false;
    if (selectedStatus === 'mastered' && f.decayStatus !== 'mastered') return false;
    if (selectedStatus === 'fragile' && f.decayStatus !== 'fragile') return false;
    return true;
  });

  const activeDrillFormula = formulas[drillIndex % formulas.length];

  const handleRateDrill = (rate: 'mastered' | 'fragile' | 'lapse') => {
    if (!activeDrillFormula) return;
    let newRetention = activeDrillFormula.retentionScore;
    let newStability = activeDrillFormula.stabilityDays;
    let newStatus = activeDrillFormula.decayStatus;

    if (rate === 'mastered') {
      newRetention = Math.min(100, Math.round(newRetention * 1.08));
      newStability = Math.round(newStability * 1.5) + 3;
      newStatus = 'mastered';
    } else if (rate === 'fragile') {
      newRetention = Math.max(45, Math.round(newRetention * 0.9));
      newStability = Math.max(1, Math.round(newStability * 0.8));
      newStatus = 'fragile';
    } else {
      newRetention = Math.max(20, Math.round(newRetention * 0.5));
      newStability = 1;
      newStatus = 'fragile';
    }

    onUpdateFormula({
      ...activeDrillFormula,
      retentionScore: newRetention,
      stabilityDays: newStability,
      decayStatus: newStatus,
      lastReviewed: 'Just now',
    });

    setIsRevealed(false);
    setDrillIndex(i => (i + 1) % formulas.length);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-[#121316] p-4 lg:p-6 space-y-4 font-mono">
      {/* Top Banner & Telemetry summary */}
      <div className="bg-[#181a1f] border border-[#2d3139] rounded-[4px] p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[#8e8e93] font-semibold">
              Ebbinghaus Spaced Repetition Engine
            </div>
            <h2 className="text-xl font-bold text-[#f3f4f6]">
              Analytical Formula Decay & Retention Matrix
            </h2>
            <div className="flex items-center gap-2 text-xs text-[#8e8e93] mt-1">
              <span>Model: R(t) = exp(-t / S)</span>
              <span>·</span>
              <span className="text-[#10b981]">Mean Retrievability: 79.2%</span>
              <span>·</span>
              <span>6 Target Invariants Tracked</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-[#10b981]/12 text-[#10b981] border border-[#10b981]/30 text-xs px-2.5 py-1 rounded-[2px]">
              {formulas.filter(f => f.decayStatus === 'mastered').length} Mastered
            </span>
            <span className="bg-[#f59e0b]/12 text-[#f59e0b] border border-[#f59e0b]/30 text-xs px-2.5 py-1 rounded-[2px]">
              {formulas.filter(f => f.decayStatus === 'fragile').length} Fragile
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Spaced Repetition Drill (Left) + Ebbinghaus Curve & Filters (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Active Flash Recall Inspector (7 cols) */}
        <div className="lg:col-span-7 bg-[#181a1f] border border-[#2d3139] rounded-[4px] flex flex-col overflow-hidden">
          <div className="px-4 py-3 bg-[#121316] border-b border-[#2d3139] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-[#5856d6]" />
              <span className="text-xs font-semibold text-[#f3f4f6] uppercase tracking-wider">
                Active Recall Drill #{drillIndex + 1}
              </span>
            </div>
            <span className="text-[10px] text-[#8e8e93]">
              Stability: {activeDrillFormula.stabilityDays}d
            </span>
          </div>

          <div className="p-5 flex-1 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between text-xs text-[#8e8e93] mb-1">
                <span>{activeDrillFormula.subject}</span>
                <span className="text-[#c2c1ff]">{activeDrillFormula.dimensions}</span>
              </div>
              <h3 className="text-lg font-bold text-[#f3f4f6]">
                {activeDrillFormula.name}
              </h3>
              <p className="text-xs text-[#8e8e93] mt-2 leading-relaxed">
                Prompt: Reconstruct the analytical mathematical formulation and invariant dimensions without checking notes.
              </p>
            </div>

            {/* Revealed or Concealed State */}
            {isRevealed ? (
              <div className="space-y-4">
                <div className="bg-[#121316] border border-[#2d3139] rounded-[4px] p-4 text-center">
                  <div className="text-[10px] uppercase tracking-wider text-[#8e8e93] mb-2 font-semibold">
                    Analytical Target Formulation
                  </div>
                  <div className="text-lg py-2">
                    <MathView math={activeDrillFormula.latex} block />
                  </div>
                </div>

                <div className="bg-[#121316] border border-[#2d3139] rounded-[4px] p-3 text-xs text-[#8e8e93]">
                  <span className="text-[#f3f4f6] font-medium block mb-1">Theoretical Derivation:</span>
                  <MathView math={activeDrillFormula.keyDerivation} />
                </div>
              </div>
            ) : (
              <div className="bg-[#121316] border border-dashed border-[#2d3139] rounded-[4px] p-8 text-center flex flex-col items-center justify-center">
                <Brain className="w-8 h-8 text-[#52525b] mb-2" />
                <span className="text-xs text-[#8e8e93] mb-3">
                  Formulation concealed behind focus blind
                </span>
                <button
                  onClick={() => setIsRevealed(true)}
                  className="px-4 py-2 bg-[#5856d6] hover:bg-[#4b48b8] text-white text-xs font-semibold rounded-[4px] transition-colors flex items-center gap-2"
                >
                  <span>Reveal Formulation & Derivation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Response rating buttons */}
            {isRevealed && (
              <div className="pt-4 border-t border-[#2d3139] grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleRateDrill('lapse')}
                  className="py-2.5 px-3 bg-[#121316] border border-[#93000a] text-[#ffb4ab] hover:bg-[#93000a]/20 rounded-[4px] text-xs font-medium transition-colors"
                >
                  Lapse / Forgotten (1d)
                </button>
                <button
                  onClick={() => handleRateDrill('fragile')}
                  className="py-2.5 px-3 bg-[#121316] border border-[#f59e0b] text-[#f59e0b] hover:bg-[#f59e0b]/20 rounded-[4px] text-xs font-medium transition-colors"
                >
                  Fragile / Hesitant (+1d)
                </button>
                <button
                  onClick={() => handleRateDrill('mastered')}
                  className="py-2.5 px-3 bg-[#121316] border border-[#10b981] text-[#10b981] hover:bg-[#10b981]/20 rounded-[4px] text-xs font-medium transition-colors"
                >
                  Mastered / Instant (+7d)
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Ebbinghaus Forgetting Curve Graph & Telemetry (5 cols) */}
        <div className="lg:col-span-5 bg-[#181a1f] border border-[#2d3139] rounded-[4px] p-4 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#2d3139] mb-3">
              <span className="text-[11px] font-semibold text-[#f3f4f6] uppercase tracking-wider">
                Ebbinghaus Decay Projection
              </span>
              <span className="text-[10px] text-[#8e8e93]">S = {activeDrillFormula.stabilityDays} days</span>
            </div>

            {/* SVG Decay Graph */}
            <div className="bg-[#121316] border border-[#2d3139] rounded-[4px] p-3">
              <svg viewBox="0 0 320 160" className="w-full">
                {/* Axes */}
                <line x1="35" y1="130" x2="300" y2="130" stroke="#2d3139" strokeWidth="1.5" />
                <line x1="35" y1="130" x2="35" y2="20" stroke="#2d3139" strokeWidth="1.5" />

                {/* Grid lines */}
                <line x1="35" y1="30" x2="300" y2="30" stroke="#1f1f23" strokeDasharray="3 3" />
                <text x="5" y="34" fill="#8e8e93" fontSize="9">100%</text>

                <line x1="35" y1="80" x2="300" y2="80" stroke="#1f1f23" strokeDasharray="3 3" />
                <text x="12" y="84" fill="#8e8e93" fontSize="9">50%</text>

                <line x1="35" y1="105" x2="300" y2="105" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
                <text x="235" y="100" fill="#f59e0b" fontSize="8">Fragile Threshold (40%)</text>

                {/* Exponential decay curve R = exp(-t/S) */}
                <path
                  d="M 35 30 Q 110 90 300 120"
                  fill="none"
                  stroke="#5856d6"
                  strokeWidth="2.5"
                />

                {/* Active marker */}
                <circle cx="120" cy="88" r="4" fill="#f59e0b" />
                <text x="130" y="85" fill="#f3f4f6" fontSize="9" fontWeight="bold">Current (68%)</text>

                {/* X labels */}
                <text x="35" y="145" fill="#8e8e93" fontSize="9">Day 0</text>
                <text x="160" y="145" fill="#8e8e93" fontSize="9">Day 7</text>
                <text x="270" y="145" fill="#8e8e93" fontSize="9">Day 14</text>
              </svg>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-[#8e8e93]">
              <span>Formula Identity:</span>
              <span className="text-[#f3f4f6]">{activeDrillFormula.id}</span>
            </div>
            <div className="flex items-center justify-between text-[#8e8e93]">
              <span>Last Tested:</span>
              <span className="text-[#c7c4d6]">{activeDrillFormula.lastReviewed}</span>
            </div>
            <div className="flex items-center justify-between text-[#8e8e93]">
              <span>Next Decay Check:</span>
              <span className="text-[#10b981]">In {activeDrillFormula.stabilityDays} days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Matrix Table */}
      <div className="bg-[#181a1f] border border-[#2d3139] rounded-[4px] p-4">
        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#2d3139] mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {subjects.map(subj => (
              <button
                key={subj}
                onClick={() => setSelectedSubject(subj)}
                className={`px-2.5 py-1 text-[11px] rounded-[2px] transition-colors border ${
                  selectedSubject === subj
                    ? 'bg-[#5856d6] border-[#5856d6] text-white font-medium'
                    : 'bg-[#121316] border-[#2d3139] text-[#8e8e93] hover:text-[#f3f4f6]'
                }`}
              >
                {subj}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSelectedStatus('All')}
              className={`px-2 py-0.5 text-[10px] rounded-[2px] border ${
                selectedStatus === 'All'
                  ? 'border-[#5856d6] text-[#c2c1ff]'
                  : 'border-[#2d3139] text-[#8e8e93]'
              }`}
            >
              All Status
            </button>
            <button
              onClick={() => setSelectedStatus('mastered')}
              className={`px-2 py-0.5 text-[10px] rounded-[2px] border ${
                selectedStatus === 'mastered'
                  ? 'border-[#10b981] text-[#10b981]'
                  : 'border-[#2d3139] text-[#8e8e93]'
              }`}
            >
              Mastered
            </button>
            <button
              onClick={() => setSelectedStatus('fragile')}
              className={`px-2 py-0.5 text-[10px] rounded-[2px] border ${
                selectedStatus === 'fragile'
                  ? 'border-[#f59e0b] text-[#f59e0b]'
                  : 'border-[#2d3139] text-[#8e8e93]'
              }`}
            >
              Fragile
            </button>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#2d3139] text-[10px] uppercase text-[#8e8e93]">
                <th className="py-2 px-3">Invariant Name</th>
                <th className="py-2 px-3">Discipline</th>
                <th className="py-2 px-3">Formulation</th>
                <th className="py-2 px-3">Retention</th>
                <th className="py-2 px-3">Stability</th>
                <th className="py-2 px-3">Decay Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d3139]/50">
              {filteredFormulas.map(formula => (
                <tr key={formula.id} className="hover:bg-[#121316] transition-colors">
                  <td className="py-2.5 px-3 text-[#f3f4f6] font-medium">{formula.name}</td>
                  <td className="py-2.5 px-3 text-[#8e8e93]">{formula.subject}</td>
                  <td className="py-2.5 px-3 text-[#c2c1ff] max-w-[200px] truncate">
                    <MathView math={formula.latex} />
                  </td>
                  <td className="py-2.5 px-3 tabular-nums font-semibold text-[#f3f4f6]">
                    {formula.retentionScore}%
                  </td>
                  <td className="py-2.5 px-3 text-[#8e8e93] tabular-nums">{formula.stabilityDays}d</td>
                  <td className="py-2.5 px-3">
                    {formula.decayStatus === 'mastered' ? (
                      <span className="bg-[#10b981]/12 text-[#10b981] border border-[#10b981]/30 text-[10px] px-2 py-0.5 rounded-[2px] uppercase">
                        Mastered
                      </span>
                    ) : (
                      <span className="bg-[#f59e0b]/12 text-[#f59e0b] border border-[#f59e0b]/30 text-[10px] px-2 py-0.5 rounded-[2px] uppercase">
                        Fragile
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
