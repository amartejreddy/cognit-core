import React from 'react';
import { Terminal, Shield, Sparkles } from 'lucide-react';

interface TopBarProps {
  currentScreen: 'cockpit' | 'matrix' | 'telemetry' | 'audit';
  onNavigate: (screen: 'cockpit' | 'matrix' | 'telemetry' | 'audit') => void;
  onOpenCommandPalette: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentScreen,
  onNavigate,
  onOpenCommandPalette,
}) => {
  return (
    <header className="h-14 border-b border-[#2d3139] bg-[#121316] flex items-center justify-between gap-8 px-4 lg:px-6 sticky top-0 z-30 select-none">
      {/* Zone 1: Single text element wordmark in display face */}
      <button
        onClick={() => onNavigate('cockpit')}
        className="text-base font-semibold tracking-tight text-[#f3f4f6] whitespace-nowrap shrink-0 hover:text-white transition-colors flex items-center gap-2"
      >
        <span className="w-2.5 h-2.5 rounded-[2px] bg-[#5856d6]" />
        <span>Technical Focus OS</span>
      </button>

      {/* Zone 2: 4 clean single-line text navigation links */}
      <nav className="hidden sm:flex items-center gap-6 text-xs font-mono font-medium text-[#8e8e93]">
        <button
          onClick={() => onNavigate('cockpit')}
          className={`hover:text-[#f3f4f6] transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
            currentScreen === 'cockpit'
              ? 'text-[#f3f4f6] border-b-2 border-[#5856d6] font-semibold'
              : ''
          }`}
        >
          01. Cockpit
        </button>
        <button
          onClick={() => onNavigate('matrix')}
          className={`hover:text-[#f3f4f6] transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
            currentScreen === 'matrix'
              ? 'text-[#f3f4f6] border-b-2 border-[#5856d6] font-semibold'
              : ''
          }`}
        >
          02. Memory Matrix
        </button>
        <button
          onClick={() => onNavigate('telemetry')}
          className={`hover:text-[#f3f4f6] transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
            currentScreen === 'telemetry'
              ? 'text-[#f3f4f6] border-b-2 border-[#5856d6] font-semibold'
              : ''
          }`}
        >
          03. 12h Telemetry
        </button>
        <button
          onClick={() => onNavigate('audit')}
          className={`hover:text-[#f3f4f6] transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
            currentScreen === 'audit'
              ? 'text-[#f3f4f6] border-b-2 border-[#5856d6] font-semibold'
              : ''
          }`}
        >
          04. Trap Audit
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenCommandPalette}
          className="px-3 py-1.5 text-xs font-mono font-medium text-white bg-[#5856d6] hover:bg-[#4b48b8] active:bg-[#403da1] rounded-[4px] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 shadow-sm"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Command Palette</span>
          <kbd className="hidden md:inline-block text-[10px] bg-black/25 px-1 rounded text-white/80">
            ⌘K
          </kbd>
        </button>
      </div>
    </header>
  );
};
