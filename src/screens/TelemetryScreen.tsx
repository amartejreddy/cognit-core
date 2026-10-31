import React, { useState } from 'react';
import { StudyBlock, TelemetryMetric } from '../types/index.ts';
import { FocusAudioSynthesizer } from '../components/FocusAudioSynthesizer.tsx';
import {
  Clock,
  Activity,
  Zap,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Play,
  CheckSquare,
  Shield,
  Layers
} from 'lucide-react';

interface TelemetryScreenProps {
  studyBlocks: StudyBlock[];
  hourlyMetrics: TelemetryMetric[];
  onUpdateBlock: (updated: StudyBlock) => void;
}

export const TelemetryScreen: React.FC<TelemetryScreenProps> = ({
  studyBlocks,
  hourlyMetrics,
  onUpdateBlock,
}) => {
  const [activeBlockId, setActiveBlockId] = useState<string>('b-3');

  const totalTargetProblems = studyBlocks.reduce((acc, b) => acc + b.targetProblemCount, 0);
  const totalCompletedProblems = studyBlocks.reduce((acc, b) => acc + b.completedProblemCount, 0);
  const totalElapsedMinutes = studyBlocks.reduce((acc, b) => acc + b.elapsedMinutes, 0);

  const errorCategories = [
    { label: 'Algebraic / Calculation Slip', percentage: 38, count: 14, color: '#f59e0b' },
    { label: 'Theoretical / Concept Gap', percentage: 29, count: 11, color: '#5856d6' },
    { label: 'Time Pressure / Speed Panic', percentage: 21, count: 8, color: '#ffb4ab' },
    { label: 'Question Stem Misread', percentage: 12, count: 4, color: '#8e8e93' },
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-[#121316] p-4 lg:p-6 space-y-4 font-mono">
      {/* Top Banner Cockpit Metric Strip */}
      <div className="bg-[#181a1f] border border-[#2d3139] rounded-[4px] p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[#8e8e93] font-semibold">
              Cognitive Velocity Cockpit
            </div>
            <h2 className="text-xl font-bold text-[#f3f4f6]">
              12-Hour Study Block Telemetry & Stamina Monitor
            </h2>
            <div className="flex items-center gap-2 text-xs text-[#8e8e93] mt-1">
              <span>Standard 4-Block Regime (12.0 Hours)</span>
              <span>·</span>
              <span className="text-[#10b981]">Active Session: 7h 58m</span>
              <span>·</span>
              <span className="text-[#c2c1ff]">Overall Completion: {totalCompletedProblems} / {totalTargetProblems} Problems</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="bg-[#121316] border border-[#2d3139] px-3 py-1.5 rounded-[2px] text-center">
              <span className="text-[9px] text-[#8e8e93] block uppercase">Median Pace</span>
              <span className="text-sm font-bold text-[#f3f4f6] tabular-nums">1m 38s</span>
            </div>
            <div className="bg-[#121316] border border-[#2d3139] px-3 py-1.5 rounded-[2px] text-center">
              <span className="text-[9px] text-[#8e8e93] block uppercase">Peak Velocity</span>
              <span className="text-sm font-bold text-[#10b981] tabular-nums">16 Q/hr</span>
            </div>
            <div className="bg-[#121316] border border-[#2d3139] px-3 py-1.5 rounded-[2px] text-center">
              <span className="text-[9px] text-[#8e8e93] block uppercase">Aggregate Accuracy</span>
              <span className="text-sm font-bold text-[#c2c1ff] tabular-nums">87.4%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: 12-Hour Study Block Timeline (Left 7 cols) + Audio Synth & Error Classification (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Study Block Timeline */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#181a1f] border border-[#2d3139] rounded-[4px] p-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#2d3139] mb-4">
              <span className="text-[11px] font-semibold text-[#f3f4f6] uppercase tracking-wider">
                12-Hour Discrete Block Execution
              </span>
              <span className="text-[10px] text-[#8e8e93]">3 of 4 Active</span>
            </div>

            <div className="space-y-3">
              {studyBlocks.map(block => {
                const isActive = block.status === 'active';
                const isCompleted = block.status === 'completed';

                let borderClass = 'border-[#2d3139] bg-[#121316]';
                if (isActive) borderClass = 'border-[#5856d6] bg-[#5856d6]/5';

                return (
                  <div
                    key={block.id}
                    className={`p-3.5 rounded-[4px] border transition-all ${borderClass}`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#f3f4f6]">
                            {block.title}
                          </span>
                          {isCompleted && (
                            <span className="bg-[#10b981]/15 text-[#10b981] text-[9px] px-1.5 py-0.2 rounded uppercase font-medium">
                              Completed
                            </span>
                          )}
                          {isActive && (
                            <span className="bg-[#5856d6]/20 text-[#c2c1ff] border border-[#5856d6]/40 text-[9px] px-1.5 py-0.2 rounded uppercase font-medium animate-pulse">
                              Active Sprint
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-[#8e8e93] mt-0.5">
                          {block.timeRange} ({block.targetDurationMinutes} min target)
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-[#f3f4f6] tabular-nums">
                          {block.completedProblemCount} / {block.targetProblemCount}
                        </span>
                        <span className="text-[10px] text-[#8e8e93] block">problems</span>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-[#181a1f] h-1.5 rounded-full overflow-hidden border border-[#2d3139] my-2">
                      <div
                        className={`h-full transition-all duration-300 ${
                          isCompleted ? 'bg-[#10b981]' : isActive ? 'bg-[#5856d6]' : 'bg-[#2d3139]'
                        }`}
                        style={{
                          width: `${Math.min(100, Math.round((block.completedProblemCount / block.targetProblemCount) * 100))}%`,
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-[#8e8e93]">
                      <span>Elapsed: {block.elapsedMinutes}m / {block.targetDurationMinutes}m</span>
                      {block.focusScore > 0 && (
                        <span className="text-[#c2c1ff]">Focus Factor: {block.focusScore}%</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cognitive Velocity Chart */}
          <div className="bg-[#181a1f] border border-[#2d3139] rounded-[4px] p-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#2d3139] mb-3">
              <span className="text-[11px] font-semibold text-[#f3f4f6] uppercase tracking-wider">
                Velocity vs. Fatigue Profile (Problems / Hour)
              </span>
              <span className="text-[10px] text-[#8e8e93]">Hourly Sampled</span>
            </div>

            {/* SVG Velocity Bar / Line chart */}
            <div className="bg-[#121316] border border-[#2d3139] rounded-[4px] p-3">
              <svg viewBox="0 0 380 150" className="w-full">
                {/* Axes */}
                <line x1="30" y1="120" x2="360" y2="120" stroke="#2d3139" strokeWidth="1.5" />
                <line x1="30" y1="120" x2="30" y2="15" stroke="#2d3139" strokeWidth="1.5" />

                {/* Grid guidelines */}
                <line x1="30" y1="20" x2="360" y2="20" stroke="#1f1f23" strokeDasharray="3 3" />
                <text x="5" y="24" fill="#8e8e93" fontSize="9">20 Q</text>

                <line x1="30" y1="70" x2="360" y2="70" stroke="#1f1f23" strokeDasharray="3 3" />
                <text x="5" y="74" fill="#8e8e93" fontSize="9">10 Q</text>

                {/* Bars for velocity */}
                {hourlyMetrics.map((m, i) => {
                  const x = 50 + i * 34;
                  const barHeight = (m.velocityProblemsPerHour / 20) * 100;
                  const y = 120 - barHeight;
                  return (
                    <g key={i}>
                      <rect
                        x={x}
                        y={y}
                        width="18"
                        height={barHeight}
                        fill={m.velocityProblemsPerHour >= 14 ? '#5856d6' : '#292a2d'}
                        rx="1"
                      />
                      <text x={x + 9} y={y - 4} fill="#c7c4d6" fontSize="8" textAnchor="middle">
                        {m.velocityProblemsPerHour}
                      </text>
                      <text x={x + 9} y="133" fill="#8e8e93" fontSize="7.5" textAnchor="middle">
                        {m.hour.slice(0, 2)}h
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
            <div className="flex items-center justify-between text-[10px] text-[#8e8e93] mt-2">
              <span>Velocity peaks during morning Block I (16 Q/hr)</span>
              <span className="text-[#f59e0b]">Fatigue degradation visible after 7.5 hours</span>
            </div>
          </div>
        </div>

        {/* Right: Audio Synthesizer & Forensic Error Breakdown (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Real Audio Synthesizer component */}
          <FocusAudioSynthesizer />

          {/* Root-Cause Error Distribution */}
          <div className="bg-[#181a1f] border border-[#2d3139] rounded-[4px] p-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#2d3139] mb-3">
              <span className="text-[11px] font-semibold text-[#f3f4f6] uppercase tracking-wider">
                Error Root Cause Classification
              </span>
              <span className="text-[10px] text-[#8e8e93]">37 Total Lapses</span>
            </div>

            <div className="space-y-3">
              {errorCategories.map((cat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#e3e2e6]">{cat.label}</span>
                    <span className="text-[#8e8e93] tabular-nums font-semibold">
                      {cat.percentage}% ({cat.count})
                    </span>
                  </div>
                  <div className="w-full bg-[#121316] h-1.5 rounded-full overflow-hidden border border-[#2d3139]/60">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-2.5 bg-[#121316] border border-[#2d3139] rounded-[2px] text-[11px] text-[#8e8e93] leading-relaxed">
              <span className="text-[#f59e0b] font-semibold block mb-0.5">Tactical Remedy:</span>
              38% of errors are arithmetic sign slips during integration bounds. Force step-by-step bound substitutions before choosing option.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
