import React, { useState, useEffect } from 'react';
import { Search, Compass, BookOpen, Clock, AlertOctagon, Zap, X } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: 'cockpit' | 'matrix' | 'telemetry' | 'audit') => void;
  onSelectQuestion: (index: number) => void;
  onToggleTimer: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onSelectQuestion,
  onToggleTimer,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'nav-cockpit',
      label: 'Jump to Problem Cockpit (Speedhud & Scratchpad)',
      category: 'Navigation',
      icon: <Compass className="w-4 h-4 text-[#5856d6]" />,
      action: () => {
        onNavigate('cockpit');
        onClose();
      },
    },
    {
      id: 'nav-matrix',
      label: 'Jump to Spaced Repetition Matrix & Memory Decay',
      category: 'Navigation',
      icon: <BookOpen className="w-4 h-4 text-[#4edea3]" />,
      action: () => {
        onNavigate('matrix');
        onClose();
      },
    },
    {
      id: 'nav-telemetry',
      label: 'Jump to 12-Hour Study Block Telemetry & Audio Synthesizer',
      category: 'Navigation',
      icon: <Clock className="w-4 h-4 text-[#ffb95f]" />,
      action: () => {
        onNavigate('telemetry');
        onClose();
      },
    },
    {
      id: 'nav-audit',
      label: 'Jump to Mock Examination Trap Forensics Audit',
      category: 'Navigation',
      icon: <AlertOctagon className="w-4 h-4 text-[#c2c1ff]" />,
      action: () => {
        onNavigate('audit');
        onClose();
      },
    },
    {
      id: 'timer-toggle',
      label: 'Toggle Speedhud Timer (Start / Pause pace)',
      category: 'Instrument Control',
      icon: <Zap className="w-4 h-4 text-[#5856d6]" />,
      action: () => {
        onToggleTimer();
        onClose();
      },
    },
    {
      id: 'q-1',
      label: 'Switch to Q-01: Time-Varying Magnetic Loop Induction',
      category: 'Problems',
      icon: <span className="font-mono text-xs text-[#5856d6]">01</span>,
      action: () => {
        onNavigate('cockpit');
        onSelectQuestion(0);
        onClose();
      },
    },
    {
      id: 'q-2',
      label: 'Switch to Q-02: Series RLC Resonator & Bandwidth',
      category: 'Problems',
      icon: <span className="font-mono text-xs text-[#5856d6]">02</span>,
      action: () => {
        onNavigate('cockpit');
        onSelectQuestion(1);
        onClose();
      },
    },
    {
      id: 'q-3',
      label: 'Switch to Q-03: Carnot Thermodynamic Cycle & Entropy',
      category: 'Problems',
      icon: <span className="font-mono text-xs text-[#5856d6]">03</span>,
      action: () => {
        onNavigate('cockpit');
        onSelectQuestion(2);
        onClose();
      },
    },
  ];

  const filtered = actions.filter(a =>
    a.label.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-[2px]">
      <div className="w-full max-w-xl bg-[#202329] border border-[#3e434d] rounded-[6px] shadow-[0_8px_24px_-4px_rgba(0,0,0,0.6)] overflow-hidden font-mono">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#2d3139] bg-[#181a1f]">
          <Search className="w-4 h-4 text-[#8e8e93]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type command or formula keyword (e.g., 'telemetry', 'RLC', 'jump')..."
            className="w-full bg-transparent border-0 outline-none text-xs text-[#f3f4f6] placeholder:text-[#52525b]"
          />
          <button
            onClick={onClose}
            className="text-[#8e8e93] hover:text-[#f3f4f6] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action item list */}
        <div className="max-h-[340px] overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-[#8e8e93]">
              No command matching <span className="text-[#f3f4f6]">"{query}"</span>
            </div>
          ) : (
            filtered.map(item => (
              <button
                key={item.id}
                onClick={item.action}
                className="w-full text-left px-3 py-2 rounded-[4px] hover:bg-[#181a1f] flex items-center justify-between text-xs transition-colors group border border-transparent hover:border-[#2d3139]"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-[#c7c4d6] group-hover:text-[#f3f4f6] transition-colors">
                    {item.label}
                  </span>
                </div>
                <span className="text-[10px] text-[#8e8e93] uppercase tracking-wider">
                  {item.category}
                </span>
              </button>
            ))
          )}
        </div>

        {/* Hotkey footer bar */}
        <div className="px-4 py-2 bg-[#121316] border-t border-[#2d3139] flex items-center justify-between text-[10px] text-[#8e8e93]">
          <div className="flex items-center gap-4">
            <span><kbd className="bg-[#181a1f] px-1 rounded border border-[#2d3139]">↑↓</kbd> Navigate</span>
            <span><kbd className="bg-[#181a1f] px-1 rounded border border-[#2d3139]">↵</kbd> Select</span>
            <span><kbd className="bg-[#181a1f] px-1 rounded border border-[#2d3139]">Esc</kbd> Close</span>
          </div>
          <span>Technical Focus OS Cockpit v2.4</span>
        </div>
      </div>
    </div>
  );
};
