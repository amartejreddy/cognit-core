import React from 'react';
import { Play, Pause, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface SpeedHudProps {
  elapsedSec: number;
  timeBudgetSec: number;
  isRunning: boolean;
  onTogglePlay: () => void;
  onReset: () => void;
  questionNumber: number;
  totalQuestions: number;
}

export const SpeedHud: React.FC<SpeedHudProps> = ({
  elapsedSec,
  timeBudgetSec,
  isRunning,
  onTogglePlay,
  onReset,
  questionNumber,
  totalQuestions,
}) => {
  const isOvertime = elapsedSec > timeBudgetSec;
  const overtimeDelta = Math.abs(elapsedSec - timeBudgetSec);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Progress percentage capped at 100% or over
  const progressRatio = Math.min(100, Math.round((elapsedSec / timeBudgetSec) * 100));

  return (
    <div
      className={`bg-[#181a1f] border rounded-[4px] px-4 py-3 transition-colors ${
        isOvertime
          ? 'border-[#f59e0b] shadow-[0_0_12px_rgba(245,158,11,0.12)]'
          : 'border-[#2d3139]'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left: Question index & Pace Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-[#8e8e93] uppercase tracking-wider">
              Target Index
            </span>
            <span className="font-mono text-sm font-semibold text-[#f3f4f6]">
              Q-{questionNumber.toString().padStart(2, '0')}{' '}
              <span className="text-xs text-[#8e8e93] font-normal">/ {totalQuestions}</span>
            </span>
          </div>

          <div className="h-7 w-[1px] bg-[#2d3139]" />

          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-[#8e8e93] uppercase tracking-wider">
              Allocation Budget
            </span>
            <span className="font-mono text-xs text-[#c7c4d6]">
              {formatTime(timeBudgetSec)} std
            </span>
          </div>
        </div>

        {/* Center: High-density Speedhud Numerical Readout */}
        <div className="flex items-center gap-4">
          <div className="flex items-baseline gap-2">
            <span
              className={`font-mono text-3xl font-bold tracking-tight tabular-nums transition-colors ${
                isOvertime ? 'text-[#f59e0b]' : 'text-[#f3f4f6]'
              }`}
            >
              {formatTime(elapsedSec)}
            </span>
            <span
              className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-[2px] ${
                isOvertime
                  ? 'bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/30'
                  : 'bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30'
              }`}
            >
              {isOvertime ? `+${formatTime(overtimeDelta)} overtime` : `-${formatTime(timeBudgetSec - elapsedSec)} budget`}
            </span>
          </div>
        </div>

        {/* Right: Quick Timer Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onTogglePlay}
            title="Toggle Timer (Spacebar)"
            className={`p-2 rounded-[4px] border text-xs font-mono transition-colors flex items-center gap-1.5 ${
              isRunning
                ? 'bg-[#202329] border-[#2d3139] text-[#f3f4f6] hover:bg-[#202329]/80'
                : 'bg-[#5856d6] border-[#5856d6] text-white hover:bg-[#4b48b8]'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">Freeze</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">Pace</span>
              </>
            )}
          </button>

          <button
            onClick={onReset}
            title="Reset Question Timer"
            className="p-2 rounded-[4px] bg-[#121316] border border-[#2d3139] text-[#8e8e93] hover:text-[#f3f4f6] hover:bg-[#202329] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Speed Bar Gauge */}
      <div className="mt-2.5 w-full bg-[#121316] h-1 rounded-full overflow-hidden border border-[#2d3139]/50">
        <div
          className={`h-full transition-all duration-300 ${
            isOvertime ? 'bg-[#f59e0b]' : 'bg-[#5856d6]'
          }`}
          style={{ width: `${Math.min(100, (elapsedSec / timeBudgetSec) * 100)}%` }}
        />
      </div>
    </div>
  );
};
