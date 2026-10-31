import React, { useRef, useState, useEffect } from 'react';
import { Eraser, PenTool, RotateCcw, Grid, Download, Trash2, Edit3, Type } from 'lucide-react';

interface InteractiveScratchpadProps {
  onDerivationChange?: (text: string) => void;
}

export const InteractiveScratchpad: React.FC<InteractiveScratchpadProps> = ({
  onDerivationChange,
}) => {
  const [activeTab, setActiveTab] = useState<'canvas' | 'text'>('canvas');
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [lineWidth, setLineWidth] = useState<number>(2);
  const [gridMode, setGridMode] = useState<'grid' | 'dots' | 'blank'>('grid');
  const [derivationText, setDerivationText] = useState<string>(
    '// Step derivation scratchpad:\nQ = integral(P(t) dt, 0, inf)\nPhi(t) = pi * R^2 * B_0 * exp(-t/tau)\nE(t) = -dPhi/dt = (pi*R^2*B_0/tau) * exp(-t/tau)\nP = E^2 / r => factor of 2 in denominator exponent'
  );

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  // Resize canvas according to device pixel ratio
  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const width = parent.clientWidth;
    const height = Math.max(260, parent.clientHeight || 260);

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  };

  useEffect(() => {
    initCanvas();
    window.addEventListener('resize', initCanvas);
    return () => window.removeEventListener('resize', initCanvas);
  }, [activeTab]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    const pos = getPos(e);
    lastPosRef.current = pos;
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || !lastPosRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentPos = getPos(e);

    ctx.beginPath();
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(currentPos.x, currentPos.y);

    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = lineWidth * 6;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = '#c2c1ff'; // Primary soft tint
      ctx.lineWidth = lineWidth;
    }

    ctx.stroke();
    lastPosRef.current = currentPos;
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
    lastPosRef.current = null;
  };

  const getPos = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const insertSnippet = (snippet: string) => {
    const newText = derivationText + '\n' + snippet;
    setDerivationText(newText);
    if (onDerivationChange) onDerivationChange(newText);
  };

  return (
    <div className="bg-[#181a1f] border border-[#2d3139] rounded-[4px] flex flex-col h-full font-mono">
      {/* Top Bar for Scratchpad */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#2d3139] bg-[#121316]">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-[#f3f4f6] uppercase tracking-wider">
            Scratchpad & Derivation
          </span>
          <div className="flex items-center bg-[#181a1f] border border-[#2d3139] rounded-[2px] p-0.5">
            <button
              onClick={() => setActiveTab('canvas')}
              className={`px-2 py-0.5 text-[10px] rounded-[2px] transition-colors ${
                activeTab === 'canvas' ? 'bg-[#5856d6] text-white' : 'text-[#8e8e93] hover:text-[#f3f4f6]'
              }`}
            >
              Draw
            </button>
            <button
              onClick={() => setActiveTab('text')}
              className={`px-2 py-0.5 text-[10px] rounded-[2px] transition-colors ${
                activeTab === 'text' ? 'bg-[#5856d6] text-white' : 'text-[#8e8e93] hover:text-[#f3f4f6]'
              }`}
            >
              Steps
            </button>
          </div>
        </div>

        {/* Action controls */}
        {activeTab === 'canvas' ? (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setTool('pen')}
              className={`p-1 rounded-[2px] border ${
                tool === 'pen'
                  ? 'bg-[#5856d6]/20 border-[#5856d6] text-[#c2c1ff]'
                  : 'border-[#2d3139] text-[#8e8e93] hover:text-[#f3f4f6]'
              }`}
              title="Pen tool"
            >
              <PenTool className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTool('eraser')}
              className={`p-1 rounded-[2px] border ${
                tool === 'eraser'
                  ? 'bg-[#5856d6]/20 border-[#5856d6] text-[#c2c1ff]'
                  : 'border-[#2d3139] text-[#8e8e93] hover:text-[#f3f4f6]'
              }`}
              title="Eraser"
            >
              <Eraser className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setGridMode(g => (g === 'grid' ? 'dots' : g === 'dots' ? 'blank' : 'grid'))}
              className={`p-1 rounded-[2px] border ${
                gridMode !== 'blank'
                  ? 'border-[#2d3139] text-[#c2c1ff]'
                  : 'border-[#2d3139] text-[#8e8e93]'
              }`}
              title={`Grid mode: ${gridMode}`}
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={clearCanvas}
              className="p-1 rounded-[2px] border border-[#2d3139] text-[#8e8e93] hover:text-[#f59e0b] hover:border-[#f59e0b]/50 transition-colors"
              title="Clear Canvas"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-[10px]">
            <button
              onClick={() => insertSnippet('\\int_0^\\infty ... dt')}
              className="px-1.5 py-0.5 bg-[#181a1f] border border-[#2d3139] text-[#c7c4d6] hover:text-[#f3f4f6] rounded-[2px]"
            >
              + Integral
            </button>
            <button
              onClick={() => insertSnippet('\\frac{d}{dt}(...) = ...')}
              className="px-1.5 py-0.5 bg-[#181a1f] border border-[#2d3139] text-[#c7c4d6] hover:text-[#f3f4f6] rounded-[2px]"
            >
              + Derivative
            </button>
          </div>
        )}
      </div>

      {/* Main Drawing / Text Area */}
      <div className="relative flex-1 min-h-[260px] bg-[#121316] overflow-hidden">
        {activeTab === 'canvas' ? (
          <div
            className={`w-full h-full relative cursor-crosshair ${
              gridMode === 'grid'
                ? 'bg-[linear-gradient(to_right,#1b1b1f_1px,transparent_1px),linear-gradient(to_bottom,#1b1b1f_1px,transparent_1px)] bg-[size:20px_20px]'
                : gridMode === 'dots'
                ? 'bg-[radial-gradient(#2d3139_1px,transparent_1px)] bg-[size:16px_16px]'
                : ''
            }`}
          >
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="absolute inset-0 touch-none w-full h-full"
            />
            <div className="absolute bottom-2 right-2 pointer-events-none text-[9px] text-[#52525b]">
              Vector Stylus & Canvas active (2px)
            </div>
          </div>
        ) : (
          <div className="h-full p-2">
            <textarea
              value={derivationText}
              onChange={e => {
                setDerivationText(e.target.value);
                if (onDerivationChange) onDerivationChange(e.target.value);
              }}
              placeholder="Record algebraic steps, limits, equation substitutions..."
              className="w-full h-full bg-transparent border-0 outline-none text-xs text-[#e3e2e6] font-mono resize-none leading-relaxed placeholder:text-[#52525b]"
            />
          </div>
        )}
      </div>
    </div>
  );
};
