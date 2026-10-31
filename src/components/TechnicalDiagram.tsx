import React from 'react';

interface TechnicalDiagramProps {
  type?: 'circuit' | 'thermo_cycle' | 'potential_well' | 'vector_field' | 'signal';
}

export const TechnicalDiagram: React.FC<TechnicalDiagramProps> = ({ type }) => {
  if (!type) return null;

  return (
    <div className="bg-[#121316] border border-[#2d3139] rounded-[4px] p-3 flex flex-col items-center justify-center font-mono select-none">
      <div className="w-full flex items-center justify-between text-[10px] text-[#8e8e93] pb-2 border-b border-[#2d3139]/60 mb-2">
        <span className="uppercase tracking-wider font-semibold">Instrument Schematic</span>
        <span>Scale 1:1</span>
      </div>

      {type === 'vector_field' && (
        <svg viewBox="0 0 360 140" className="w-full max-h-[140px] text-[#e3e2e6]">
          {/* Circular loop in xy-plane */}
          <ellipse cx="180" cy="70" rx="90" ry="36" fill="none" stroke="#5856d6" strokeWidth="2.5" />
          {/* Axis indicators */}
          <line x1="180" y1="70" x2="270" y2="70" stroke="#8e8e93" strokeDasharray="3 3" />
          <text x="225" y="62" fill="#8e8e93" fontSize="10">R = 0.20m</text>
          
          {/* B field vector indicators (pointing along z) */}
          {[120, 150, 180, 210, 240].map((x, i) => (
            <g key={i}>
              <line x1={x} y1="120" x2={x} y2="24" stroke="#4edea3" strokeWidth="1.5" markerEnd="url(#arrow-green)" />
            </g>
          ))}
          <text x="250" y="30" fill="#4edea3" fontSize="11" fontWeight="bold">B(t) = B₀ e^-(t/τ) ẑ</text>
          <text x="180" y="132" fill="#8e8e93" fontSize="9" textAnchor="middle">Conducting Loop (r = 2.5 Ω)</text>

          <defs>
            <marker id="arrow-green" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#4edea3" />
            </marker>
          </defs>
        </svg>
      )}

      {type === 'circuit' && (
        <svg viewBox="0 0 360 130" className="w-full max-h-[130px] text-[#e3e2e6]">
          {/* Source symbol */}
          <circle cx="50" cy="65" r="16" fill="none" stroke="#8e8e93" strokeWidth="2" />
          <path d="M 42 65 Q 46 57 50 65 T 58 65" fill="none" stroke="#8e8e93" strokeWidth="1.5" />
          <text x="50" y="98" fill="#8e8e93" fontSize="10" textAnchor="middle">v_s(t)</text>

          {/* Wire from source to R */}
          <line x1="50" y1="49" x2="50" y2="30" stroke="#8e8e93" strokeWidth="2" />
          <line x1="50" y1="30" x2="100" y2="30" stroke="#8e8e93" strokeWidth="2" />

          {/* Resistor R */}
          <rect x="100" y="24" width="40" height="12" fill="#181a1f" stroke="#5856d6" strokeWidth="2" />
          <text x="120" y="18" fill="#c2c1ff" fontSize="10" textAnchor="middle">R = 20 Ω</text>

          {/* Wire to Inductor L */}
          <line x1="140" y1="30" x2="180" y2="30" stroke="#8e8e93" strokeWidth="2" />

          {/* Inductor L (curved arcs) */}
          <path d="M 180 30 Q 190 12 200 30 Q 210 12 220 30 Q 230 12 240 30" fill="none" stroke="#5856d6" strokeWidth="2" />
          <text x="210" y="16" fill="#c2c1ff" fontSize="10" textAnchor="middle">L = 50 mH</text>

          {/* Wire to Capacitor C */}
          <line x1="240" y1="30" x2="280" y2="30" stroke="#8e8e93" strokeWidth="2" />

          {/* Capacitor C */}
          <line x1="280" y1="18" x2="280" y2="42" stroke="#4edea3" strokeWidth="2.5" />
          <line x1="288" y1="18" x2="288" y2="42" stroke="#4edea3" strokeWidth="2.5" />
          <text x="284" y="58" fill="#4edea3" fontSize="10" textAnchor="middle">C = 2.0 μF</text>

          {/* Return wire */}
          <line x1="288" y1="30" x2="320" y2="30" stroke="#8e8e93" strokeWidth="2" />
          <line x1="320" y1="30" x2="320" y2="105" stroke="#8e8e93" strokeWidth="2" />
          <line x1="320" y1="105" x2="50" y2="105" stroke="#8e8e93" strokeWidth="2" />
          <line x1="50" y1="105" x2="50" y2="81" stroke="#8e8e93" strokeWidth="2" />
          
          <text x="180" y="122" fill="#8e8e93" fontSize="9" textAnchor="middle">Series Resonant Configuration: ω₀ = 1/√(LC)</text>
        </svg>
      )}

      {type === 'thermo_cycle' && (
        <svg viewBox="0 0 360 140" className="w-full max-h-[140px] text-[#e3e2e6]">
          {/* Axes P vs V */}
          <line x1="50" y1="110" x2="320" y2="110" stroke="#8e8e93" strokeWidth="1.5" />
          <line x1="50" y1="110" x2="50" y2="15" stroke="#8e8e93" strokeWidth="1.5" />
          <text x="325" y="113" fill="#8e8e93" fontSize="10">V</text>
          <text x="40" y="20" fill="#8e8e93" fontSize="10">P</text>

          {/* Carnot Cycle Closed Loop */}
          {/* 1 -> 2 (Isotherm TH = 600K) */}
          <path d="M 90 35 Q 140 45 190 60" fill="none" stroke="#ffb95f" strokeWidth="2" />
          <text x="140" y="42" fill="#ffb95f" fontSize="9">1→2 (T_H=600K)</text>

          {/* 2 -> 3 (Adiabat) */}
          <path d="M 190 60 Q 225 80 250 100" fill="none" stroke="#5856d6" strokeWidth="2" strokeDasharray="4 2" />

          {/* 3 -> 4 (Isotherm TC = 300K) */}
          <path d="M 250 100 Q 180 95 130 92" fill="none" stroke="#4edea3" strokeWidth="2" />
          <text x="180" y="105" fill="#4edea3" fontSize="9">3→4 (T_C=300K)</text>

          {/* 4 -> 1 (Adiabat return) */}
          <path d="M 130 92 Q 105 60 90 35" fill="none" stroke="#5856d6" strokeWidth="2" strokeDasharray="4 2" />

          {/* Vertices */}
          <circle cx="90" cy="35" r="3" fill="#ffb95f" />
          <text x="80" y="32" fill="#f3f4f6" fontSize="10">1</text>
          <circle cx="190" cy="60" r="3" fill="#ffb95f" />
          <text x="198" y="58" fill="#f3f4f6" fontSize="10">2</text>
          <circle cx="250" cy="100" r="3" fill="#4edea3" />
          <text x="258" y="102" fill="#f3f4f6" fontSize="10">3</text>
          <circle cx="130" cy="92" r="3" fill="#4edea3" />
          <text x="120" y="96" fill="#f3f4f6" fontSize="10">4</text>
        </svg>
      )}

      {type === 'potential_well' && (
        <svg viewBox="0 0 360 130" className="w-full max-h-[130px] text-[#e3e2e6]">
          {/* Well walls */}
          <line x1="70" y1="20" x2="70" y2="105" stroke="#8e8e93" strokeWidth="3" />
          <line x1="270" y1="20" x2="270" y2="105" stroke="#8e8e93" strokeWidth="3" />
          <line x1="70" y1="105" x2="270" y2="105" stroke="#8e8e93" strokeWidth="1.5" />

          <text x="65" y="118" fill="#8e8e93" fontSize="10" textAnchor="middle">x = 0</text>
          <text x="170" y="118" fill="#8e8e93" fontSize="10" textAnchor="middle">x = L/2</text>
          <text x="270" y="118" fill="#8e8e93" fontSize="10" textAnchor="middle">x = L</text>

          {/* Delta spike at L/2 */}
          <line x1="170" y1="105" x2="170" y2="35" stroke="#ffb95f" strokeWidth="2.5" />
          <polygon points="166,38 170,28 174,38" fill="#ffb95f" />
          <text x="180" y="38" fill="#ffb95f" fontSize="10">H' = αδ(x - L/2)</text>

          {/* Ground state wavefunction n=1 */}
          <path d="M 70 85 Q 170 30 270 85" fill="none" stroke="#5856d6" strokeWidth="2" />
          <text x="230" y="55" fill="#c2c1ff" fontSize="9">ψ₁(x)</text>

          {/* First excited state n=2 */}
          <path d="M 70 65 Q 120 40 170 65 T 270 65" fill="none" stroke="#4edea3" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="230" y="75" fill="#4edea3" fontSize="9">ψ₂(x) [node at L/2]</text>
        </svg>
      )}
    </div>
  );
};
