/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { initialProblems } from './data/mockProblems.ts';
import { initialFormulas } from './data/mockFormulas.ts';
import { initialStudyBlocks, hourlyTelemetry } from './data/mockBlocks.ts';
import { Problem, Formula, StudyBlock } from './types/index.ts';
import { TopBar } from './components/TopBar.tsx';
import { SideNav } from './components/SideNav.tsx';
import { CommandPalette } from './components/CommandPalette.tsx';
import { CockpitScreen } from './screens/CockpitScreen.tsx';
import { MatrixScreen } from './screens/MatrixScreen.tsx';
import { TelemetryScreen } from './screens/TelemetryScreen.tsx';
import { AuditScreen } from './screens/AuditScreen.tsx';
import { HelpCircle, X, Keyboard } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'cockpit' | 'matrix' | 'telemetry' | 'audit'>('cockpit');
  const [isNavExpanded, setIsNavExpanded] = useState<boolean>(true);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);

  const [problems, setProblems] = useState<Problem[]>(initialProblems);
  const [formulas, setFormulas] = useState<Formula[]>(initialFormulas);
  const [studyBlocks, setStudyBlocks] = useState<StudyBlock[]>(initialStudyBlocks);
  const [activeProblemIndex, setActiveProblemIndex] = useState<number>(0);

  // Global hotkeys (Cmd/Ctrl+K for command palette, ? for shortcuts)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      } else if (e.key === '?' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setIsHelpOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleUpdateProblem = (updated: Problem) => {
    setProblems(prev => prev.map(p => (p.id === updated.id ? updated : p)));
  };

  const handleUpdateFormula = (updated: Formula) => {
    setFormulas(prev => prev.map(f => (f.id === updated.id ? updated : f)));
  };

  const handleUpdateBlock = (updated: StudyBlock) => {
    setStudyBlocks(prev => prev.map(b => (b.id === updated.id ? updated : b)));
  };

  const sessionStats = {
    masteredCount: problems.filter(p => p.status === 'mastered').length,
    fragileCount: problems.filter(p => p.status === 'fragile').length,
    unattemptedCount: problems.filter(p => p.status === 'unattempted').length,
    totalActiveMinutes: 478, // ~8 hours into 12h block
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#121316] text-[#e3e2e6] font-sans antialiased">
      {/* Persistent Technical Side Navigation (64px collapsed / 240px expanded) */}
      <SideNav
        currentScreen={currentScreen}
        onNavigate={screen => setCurrentScreen(screen)}
        isExpanded={isNavExpanded}
        onToggleExpand={() => setIsNavExpanded(exp => !exp)}
        sessionStats={sessionStats}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Bar Contract (Brand, 4 links, 1 primary action) */}
        <TopBar
          currentScreen={currentScreen}
          onNavigate={screen => setCurrentScreen(screen)}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />

        {/* Screen Switching Router */}
        <main className="flex-1 overflow-hidden flex flex-col relative">
          {currentScreen === 'cockpit' && (
            <CockpitScreen
              problems={problems}
              activeProblemIndex={activeProblemIndex}
              onSelectProblemIndex={idx => setActiveProblemIndex(idx)}
              onUpdateProblem={handleUpdateProblem}
              formulas={formulas}
            />
          )}

          {currentScreen === 'matrix' && (
            <MatrixScreen
              formulas={formulas}
              onUpdateFormula={handleUpdateFormula}
            />
          )}

          {currentScreen === 'telemetry' && (
            <TelemetryScreen
              studyBlocks={studyBlocks}
              hourlyMetrics={hourlyTelemetry}
              onUpdateBlock={handleUpdateBlock}
            />
          )}

          {currentScreen === 'audit' && (
            <AuditScreen problems={problems} />
          )}

          {/* Floating instrumental hotkey prompt */}
          <button
            onClick={() => setIsHelpOpen(true)}
            className="fixed bottom-4 right-4 p-2 rounded-[4px] bg-[#181a1f] border border-[#2d3139] text-[#8e8e93] hover:text-[#f3f4f6] hover:border-[#3e434d] transition-colors shadow-lg z-20 flex items-center gap-1.5 font-mono text-[11px]"
            title="Keyboard shortcuts (?)"
          >
            <Keyboard className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Hotkeys [?]</span>
          </button>
        </main>
      </div>

      {/* Universal Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={screen => setCurrentScreen(screen)}
        onSelectQuestion={idx => setActiveProblemIndex(idx)}
        onToggleTimer={() => {
          // toggle timer trigger
        }}
      />

      {/* Keyboard Shortcuts Dialog */}
      {isHelpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-[2px]">
          <div className="w-full max-w-md bg-[#202329] border border-[#3e434d] rounded-[6px] shadow-2xl p-5 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#2d3139] mb-4">
              <span className="font-semibold text-sm text-[#f3f4f6] uppercase tracking-wider">
                Instrumental Key Bindings
              </span>
              <button
                onClick={() => setIsHelpOpen(false)}
                className="text-[#8e8e93] hover:text-[#f3f4f6]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between py-1 border-b border-[#2d3139]/50">
                <span className="text-[#8e8e93]">Open Command Palette:</span>
                <kbd className="bg-[#181a1f] px-2 py-0.5 rounded border border-[#2d3139] text-[#c2c1ff]">
                  ⌘K / Ctrl+K
                </kbd>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[#2d3139]/50">
                <span className="text-[#8e8e93]">Assert Options A, B, C, D:</span>
                <kbd className="bg-[#181a1f] px-2 py-0.5 rounded border border-[#2d3139] text-[#c2c1ff]">
                  1, 2, 3, 4 / A, B, C, D
                </kbd>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[#2d3139]/50">
                <span className="text-[#8e8e93]">Next / Previous Question:</span>
                <kbd className="bg-[#181a1f] px-2 py-0.5 rounded border border-[#2d3139] text-[#c2c1ff]">
                  N / P
                </kbd>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[#2d3139]/50">
                <span className="text-[#8e8e93]">Toggle Speedhud Timer:</span>
                <kbd className="bg-[#181a1f] px-2 py-0.5 rounded border border-[#2d3139] text-[#c2c1ff]">
                  Spacebar
                </kbd>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[#2d3139]/50">
                <span className="text-[#8e8e93]">Toggle Vector Scratchpad:</span>
                <kbd className="bg-[#181a1f] px-2 py-0.5 rounded border border-[#2d3139] text-[#c2c1ff]">
                  S
                </kbd>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[#2d3139]/50">
                <span className="text-[#8e8e93]">Formula Quick Draw:</span>
                <kbd className="bg-[#181a1f] px-2 py-0.5 rounded border border-[#2d3139] text-[#c2c1ff]">
                  Alt+1 .. Alt+6
                </kbd>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-[#8e8e93]">Close Modal:</span>
                <kbd className="bg-[#181a1f] px-2 py-0.5 rounded border border-[#2d3139] text-[#c2c1ff]">
                  Esc
                </kbd>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#2d3139] text-center text-[10px] text-[#8e8e93]">
              Technical Focus OS · Engineered for 8–12 Hour Continuous Cognitive Blocks
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
