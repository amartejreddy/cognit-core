import React, { useState } from 'react';
import { Formula } from '../types/index.ts';
import { MathView } from './MathView.tsx';
import { Bookmark, ChevronRight, Copy, Check, ShieldCheck, AlertCircle } from 'lucide-react';

interface FormulaInspectorProps {
  formulas: Formula[];
  activeFormulaId?: string;
  onSelectFormula?: (id: string) => void;
  compact?: boolean;
}

export const FormulaInspector: React.FC<FormulaInspectorProps> = ({
  formulas,
  activeFormulaId,
  onSelectFormula,
  compact = false,
}) => {
  const [selectedId, setSelectedId] = useState<string>(activeFormulaId || formulas[0]?.id || '');
  const [copied, setCopied] = useState(false);

  const activeFormula = formulas.find(f => f.id === selectedId) || formulas[0];

  const handleCopyLatex = () => {
    if (activeFormula) {
      navigator.clipboard.writeText(activeFormula.latex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSelect = (id: string) => {
    setSelectedId(id);
    if (onSelectFormula) {
      onSelectFormula(id);
    }
  };

  if (!activeFormula) return null;

  return (
    <div className="flex flex-col gap-3 font-mono">
      {/* Header bar with formula selector pill list */}
      <div className="flex items-center justify-between pb-2 border-b border-[#2d3139]">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-[#f3f4f6] uppercase tracking-wider">
            Formula Inspector
          </span>
          <span className="text-[10px] text-[#8e8e93] bg-[#121316] px-1.5 py-0.5 rounded-[2px] border border-[#2d3139]">
            {formulas.length} pinned
          </span>
        </div>

        <button
          onClick={handleCopyLatex}
          className="flex items-center gap-1 text-[10px] text-[#8e8e93] hover:text-[#f3f4f6] transition-colors"
          title="Copy LaTeX formulation"
        >
          {copied ? <Check className="w-3 h-3 text-[#10b981]" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? 'Copied' : 'LaTeX'}</span>
        </button>
      </div>

      {/* Quick shortcut selector bar */}
      <div className="flex flex-wrap gap-1.5">
        {formulas.map(f => {
          const isSelected = f.id === activeFormula.id;
          return (
            <button
              key={f.id}
              onClick={() => handleSelect(f.id)}
              className={`px-2 py-1 text-[10px] rounded-[2px] transition-colors border flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-[#5856d6]/15 border-[#5856d6] text-[#c2c1ff]'
                  : 'bg-[#181a1f] border-[#2d3139] text-[#8e8e93] hover:text-[#f3f4f6] hover:bg-[#202329]'
              }`}
            >
              <span className="text-[#c2c1ff] font-semibold">{f.shortcut}</span>
              <span className="truncate max-w-[110px]">{f.name.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Main Formula Inspector Container adhering strictly to the design spec:
          "Code-block format container featuring #121316 fill, left accent bar in #5856D6 (2px width), and instant keyboard shortcut badges (label-sm)." */}
      <div className="relative bg-[#121316] border border-[#2d3139] rounded-[4px] p-3 pl-4 overflow-hidden">
        {/* Left 2px accent bar in #5856D6 */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#5856d6]" />

        {/* Formula Title & Shortcut Badge */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-[#f3f4f6] truncate pr-2">
            {activeFormula.name}
          </span>
          <span className="text-[10px] font-mono font-medium text-[#c2c1ff] bg-[#5856d6]/20 border border-[#5856d6]/40 px-1.5 py-0.5 rounded-[2px] shrink-0">
            {activeFormula.shortcut}
          </span>
        </div>

        {/* LaTeX Math Expression View */}
        <div className="bg-[#181a1f] border border-[#2d3139] rounded-[2px] px-3 py-2.5 my-2 overflow-x-auto text-[#f3f4f6] flex items-center justify-center min-h-[50px]">
          <MathView math={activeFormula.latex} block />
        </div>

        {/* Dimension & Subject line */}
        <div className="flex flex-wrap items-center justify-between text-[11px] text-[#8e8e93] my-2 pt-1 border-t border-[#2d3139]/60">
          <div>
            <span className="text-[#8e8e93]">Dim: </span>
            <span className="text-[#c7c4d6]">{activeFormula.dimensions}</span>
          </div>
          <div className="flex items-center gap-1.5">
            {activeFormula.decayStatus === 'mastered' ? (
              <span className="bg-[#10b981]/12 text-[#10b981] border border-[#10b981]/30 text-[9px] px-1.5 py-0.2 rounded-[2px] uppercase">
                Mastered ({activeFormula.retentionScore}%)
              </span>
            ) : (
              <span className="bg-[#f59e0b]/12 text-[#f59e0b] border border-[#f59e0b]/30 text-[9px] px-1.5 py-0.2 rounded-[2px] uppercase">
                Fragile ({activeFormula.retentionScore}%)
              </span>
            )}
          </div>
        </div>

        {/* Variables breakdown table */}
        {!compact && (
          <div className="mt-2.5 pt-2 border-t border-[#2d3139]/60">
            <div className="text-[10px] uppercase tracking-wider text-[#8e8e93] mb-1.5 font-semibold">
              Parameter Invariants & Units
            </div>
            <div className="space-y-1 text-[10px]">
              {activeFormula.variables.map((v, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-0.5 px-1.5 rounded hover:bg-[#181a1f] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[#c2c1ff] font-semibold min-w-[24px]">
                      <MathView math={v.symbol} />
                    </span>
                    <span className="text-[#c7c4d6]">{v.meaning}</span>
                  </div>
                  <span className="text-[#8e8e93] tabular-nums">{v.units}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key derivation summary */}
        {!compact && activeFormula.keyDerivation && (
          <div className="mt-3 p-2 bg-[#181a1f] border border-[#2d3139] rounded-[2px] text-[10px] text-[#8e8e93] leading-relaxed">
            <span className="text-[#f3f4f6] font-medium block mb-0.5">Analytic Derivation:</span>
            <MathView math={activeFormula.keyDerivation} />
          </div>
        )}
      </div>
    </div>
  );
};
