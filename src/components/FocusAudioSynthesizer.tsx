import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Square, Waves } from 'lucide-react';

type NoiseMode = 'gamma_40hz' | 'pink_noise' | 'brown_noise';

export const FocusAudioSynthesizer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState<NoiseMode>('gamma_40hz');
  const [volume, setVolume] = useState(0.35);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const activeNodesRef = useRef<{ stop: () => void } | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
      const gain = audioCtxRef.current.createGain();
      gain.gain.value = volume;
      gain.connect(audioCtxRef.current.destination);
      gainNodeRef.current = gain;
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const stopAudio = () => {
    if (activeNodesRef.current) {
      activeNodesRef.current.stop();
      activeNodesRef.current = null;
    }
    setIsPlaying(false);
  };

  const startAudio = () => {
    initAudio();
    stopAudio();

    const ctx = audioCtxRef.current!;
    const masterGain = gainNodeRef.current!;

    if (mode === 'gamma_40hz') {
      // 40Hz Gamma Binaural Beats (210Hz left ear, 250Hz right ear)
      const oscL = ctx.createOscillator();
      const oscR = ctx.createOscillator();
      const merger = ctx.createChannelMerger(2);

      oscL.type = 'sine';
      oscL.frequency.setValueAtTime(210, ctx.currentTime);
      oscR.type = 'sine';
      oscR.frequency.setValueAtTime(250, ctx.currentTime);

      oscL.connect(merger, 0, 0);
      oscR.connect(merger, 0, 1);
      merger.connect(masterGain);

      oscL.start();
      oscR.start();

      activeNodesRef.current = {
        stop: () => {
          try {
            oscL.stop();
            oscR.stop();
            oscL.disconnect();
            oscR.disconnect();
          } catch {
            // ignore
          }
        }
      };
    } else {
      // Buffer-based noise generator (Pink or Brown)
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      if (mode === 'pink_noise') {
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
          b6 = white * 0.115926;
        }
      } else {
        // Brown noise
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + (0.02 * white)) / 1.02;
          lastOut = output[i];
          output[i] *= 2.5;
        }
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;
      whiteNoise.connect(masterGain);
      whiteNoise.start();

      activeNodesRef.current = {
        stop: () => {
          try {
            whiteNoise.stop();
            whiteNoise.disconnect();
          } catch {
            // ignore
          }
        }
      };
    }

    setIsPlaying(true);
  };

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  useEffect(() => {
    if (isPlaying) {
      startAudio();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  useEffect(() => {
    return () => {
      stopAudio();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="bg-[#181a1f] border border-[#2d3139] rounded-[4px] p-4 text-xs font-mono">
      <div className="flex items-center justify-between border-b border-[#2d3139] pb-3 mb-3">
        <div className="flex items-center gap-2">
          <Waves className="w-4 h-4 text-[#5856d6]" />
          <span className="font-semibold text-[#f3f4f6] uppercase tracking-wider text-[11px]">
            Acoustic Shield Synthesizer
          </span>
        </div>
        <span className="text-[10px] text-[#8e8e93]">
          {isPlaying ? (
            <span className="text-[#10b981] font-medium uppercase tracking-wider">Active Stream</span>
          ) : (
            <span className="text-[#8e8e93]">Muted</span>
          )}
        </span>
      </div>

      <div className="space-y-3">
        {/* Mode selector */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#121316] border border-[#2d3139] rounded-[4px]">
          <button
            onClick={() => setMode('gamma_40hz')}
            className={`py-1 px-2 text-[11px] rounded-[2px] transition-colors ${
              mode === 'gamma_40hz'
                ? 'bg-[#5856d6] text-white font-medium'
                : 'text-[#8e8e93] hover:text-[#f3f4f6]'
            }`}
          >
            40Hz Gamma
          </button>
          <button
            onClick={() => setMode('pink_noise')}
            className={`py-1 px-2 text-[11px] rounded-[2px] transition-colors ${
              mode === 'pink_noise'
                ? 'bg-[#5856d6] text-white font-medium'
                : 'text-[#8e8e93] hover:text-[#f3f4f6]'
            }`}
          >
            Pink Noise
          </button>
          <button
            onClick={() => setMode('brown_noise')}
            className={`py-1 px-2 text-[11px] rounded-[2px] transition-colors ${
              mode === 'brown_noise'
                ? 'bg-[#5856d6] text-white font-medium'
                : 'text-[#8e8e93] hover:text-[#f3f4f6]'
            }`}
          >
            Brown Noise
          </button>
        </div>

        {/* Volume & Play trigger */}
        <div className="flex items-center gap-3 pt-1">
          <button
            onClick={isPlaying ? stopAudio : startAudio}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-[4px] text-xs font-medium transition-colors ${
              isPlaying
                ? 'bg-[#202329] border border-[#f59e0b] text-[#f59e0b] hover:bg-[#202329]/80'
                : 'bg-[#5856d6] text-white hover:bg-[#4b48b8]'
            }`}
          >
            {isPlaying ? (
              <>
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Mute Shield</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Engage Shield</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2 flex-1">
            <button
              onClick={() => setVolume(v => (v > 0 ? 0 : 0.35))}
              className="text-[#8e8e93] hover:text-[#f3f4f6]"
            >
              {volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={e => setVolume(parseFloat(e.target.value))}
              className="w-full accent-[#5856d6] h-1.5 bg-[#121316] rounded cursor-pointer"
            />
            <span className="text-[10px] text-[#8e8e93] w-8 tabular-nums">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
