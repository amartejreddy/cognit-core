import React from 'react';
import {
  Compass,
  BookOpen,
  Clock,
  AlertOctagon,
  ChevronLeft,
  ChevronRight,
  Shield,
  Layers,
  Activity,
  Cpu
} from 'lucide-react';

interface SideNavProps {
  currentScreen: 'cockpit' | 'matrix' | 'telemetry' | 'audit';
  onNavigate: (screen: 'cockpit' | 'matrix' | 'telemetry' | 'audit') => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  sessionStats: {
    masteredCount: number;
    fragileCount: number;
    unattemptedCount: number;
    totalActiveMinutes: number;
  };
}

export const SideNav: React.FC<SideNavProps> = ({
  currentScreen,
  onNavigate,
  isExpanded,
  onToggleExpand,
  sessionStats,
}) => {
  const navItems = [
    {
      id: 'cockpit' as const,
      label: 'Focus Cockpit',
      code: '01',
      icon: <Compass className="w-4 h-4" />,
      subtext: 'Problem & Speedhud',
    },
    {
      id: 'matrix' as const,
      label: 'Memory Matrix',
      code: '02',
      icon: <BookOpen className="w-4 h-4" />,
      subtext: 'Spaced Formula Decay',
    },
    {
      id: 'telemetry' as const,
      label: '12h Telemetry',
      code: '03',
      icon: <Clock className="w-4 h-4" />,
      subtext: 'Block Pace & Shield',
    },
    {
      id: 'audit' as const,
      label: 'Trap Forensics',
      code: '04',
      icon: <AlertOctagon className="w-4 h-4" />,
      subtext: 'Mock Diagnostics',
    },
  ];

  return (
    <aside
      className={`hidden md:flex flex-col border-r border-[#2d3139] bg-[#121316] transition-all duration-200 select-none shrink-0 ${
        isExpanded ? 'w-[240px]' : 'w-[64px]'
      }`}
    >
      {/* Top OS Branding Bar */}
      <div className="h-14 border-b border-[#2d3139] flex items-center justify-between px-3.5">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-7 h-7 rounded-[3px] bg-[#5856d6] flex items-center justify-center shrink-0 shadow-sm">
            <Cpu className="w-4 h-4 text-white" />
          </div>
          {isExpanded && (
            <div className="flex flex-col truncate">
              <span className="text-xs font-mono font-semibold text-[#f3f4f6] truncate">
                TF-OS COCKPIT
              </span>
              <span className="text-[10px] font-mono text-[#8e8e93] truncate">
                ENGINEERING CORE
              </span>
            </div>
          )}
        </div>

        <button
          onClick={onToggleExpand}
          className="p-1 rounded-[2px] text-[#8e8e93] hover:text-[#f3f4f6] hover:bg-[#181a1f] transition-colors"
          title={isExpanded ? 'Collapse Navigation (64px)' : 'Expand Navigation (240px)'}
        >
          {isExpanded ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Nav Link List */}
      <div className="flex-1 py-3 px-2 space-y-1 font-mono">
        {navItems.map(item => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[4px] text-xs transition-colors group relative ${
                isActive
                  ? 'bg-[#181a1f] text-[#f3f4f6] border border-[#5856d6] shadow-[inset_1px_0_0_#5856d6]'
                  : 'text-[#8e8e93] hover:text-[#f3f4f6] hover:bg-[#181a1f] border border-transparent'
              }`}
              title={!isExpanded ? item.label : undefined}
            >
              <div
                className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive ? 'text-[#c2c1ff]' : 'text-[#8e8e93] group-hover:text-[#f3f4f6]'
                }`}
              >
                {item.icon}
              </div>

              {isExpanded && (
                <div className="flex flex-col text-left truncate flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium truncate">{item.label}</span>
                    <span className="text-[10px] text-[#52525b]">{item.code}</span>
                  </div>
                  <span className="text-[10px] text-[#8e8e93] truncate">{item.subtext}</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Session Diagnostics Pill */}
      {isExpanded ? (
        <div className="p-3 m-2 bg-[#181a1f] border border-[#2d3139] rounded-[4px] font-mono text-[11px]">
          <div className="text-[10px] uppercase tracking-wider text-[#8e8e93] mb-2 font-semibold flex items-center justify-between">
            <span>Session Gauge</span>
            <span className="text-[#10b981]">ONLINE</span>
          </div>
          <div className="space-y-1 text-[10px]">
            <div className="flex items-center justify-between">
              <span className="text-[#8e8e93]">Mastered:</span>
              <span className="text-[#10b981] font-semibold">{sessionStats.masteredCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8e8e93]">Fragile:</span>
              <span className="text-[#f59e0b] font-semibold">{sessionStats.fragileCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8e8e93]">Unattempted:</span>
              <span className="text-[#8e8e93] font-semibold">{sessionStats.unattemptedCount}</span>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-[#2d3139] flex items-center justify-between text-[10px] text-[#c7c4d6]">
            <span>Block Time:</span>
            <span className="tabular-nums font-medium text-[#f3f4f6]">
              {Math.floor(sessionStats.totalActiveMinutes / 60)}h {sessionStats.totalActiveMinutes % 60}m
            </span>
          </div>
        </div>
      ) : (
        <div className="p-2 flex flex-col items-center gap-1 text-[10px] font-mono text-[#8e8e93] border-t border-[#2d3139]">
          <span className="w-2 h-2 rounded-full bg-[#10b981]" />
          <span>{sessionStats.masteredCount}</span>
        </div>
      )}
    </aside>
  );
};
