import { Formula } from '../types/index.ts';

export const initialFormulas: Formula[] = [
  {
    id: 'faraday-induction',
    name: 'Faraday-Maxwell Induction Law',
    subject: 'Electromagnetism',
    latex: '\\mathcal{E} = -\\frac{d\\Phi_B}{dt} = -\\frac{d}{dt} \\iint_S \\mathbf{B} \\cdot d\\mathbf{A}',
    shortcut: 'Alt+1',
    dimensions: '[M L^2 T^-3 I^-1] (Volts)',
    variables: [
      { symbol: '\\mathcal{E}', meaning: 'Electromotive force', units: 'V' },
      { symbol: '\\Phi_B', meaning: 'Magnetic flux', units: 'Wb (T·m²)' },
      { symbol: '\\mathbf{B}', meaning: 'Magnetic flux density', units: 'Tesla (T)' },
      { symbol: 't', meaning: 'Time coordinate', units: 'Seconds (s)' }
    ],
    retentionScore: 94.2,
    stabilityDays: 24,
    lastReviewed: 'Yesterday, 21:40',
    decayStatus: 'mastered',
    keyDerivation: 'Follows from Maxwell-Faraday curl equation: \\nabla \\times \\mathbf{E} = -\\frac{\\partial \\mathbf{B}}{\\partial t}. By Stokes theorem, \\oint \\mathbf{E}\\cdot d\\mathbf{l} = -\\iint \\frac{\\partial \\mathbf{B}}{\\partial t}\\cdot d\\mathbf{A}.'
  },
  {
    id: 'rlc-resonance',
    name: 'Series RLC Quality Factor & Bandwidth',
    subject: 'Circuit Analysis',
    latex: 'Q_0 = \\frac{\\omega_0 L}{R} = \\frac{1}{R}\\sqrt{\\frac{L}{C}}, \\quad \\Delta \\omega = \\frac{R}{L}',
    shortcut: 'Alt+2',
    dimensions: 'Dimensionless (Q), [T^-1] (rad/s)',
    variables: [
      { symbol: 'Q_0', meaning: 'Resonant Quality Factor', units: 'Dimensionless' },
      { symbol: '\\omega_0', meaning: 'Undamped resonant frequency', units: 'rad/s' },
      { symbol: 'L', meaning: 'Inductance', units: 'Henry (H)' },
      { symbol: 'R', meaning: 'Series resistance', units: 'Ohm (Ω)' },
      { symbol: 'C', meaning: 'Capacitance', units: 'Farad (F)' }
    ],
    retentionScore: 88.5,
    stabilityDays: 14,
    lastReviewed: '3 days ago',
    decayStatus: 'mastered',
    keyDerivation: 'Defined as 2\\pi \\times \\frac{\\text{Peak Stored Energy}}{\\text{Energy Dissipated Per Cycle}}. At resonance, stored magnetic & electric energies oscillate with equal amplitudes \\frac{1}{2}LI_m^2.'
  },
  {
    id: 'carnot-efficiency',
    name: 'Carnot Reversible Cycle Efficiency',
    subject: 'Thermodynamics',
    latex: '\\eta_{\\text{Carnot}} = 1 - \\frac{T_C}{T_H} = \\frac{W_{\\text{net}}}{Q_{\\text{in}}}',
    shortcut: 'Alt+3',
    dimensions: 'Dimensionless [0, 1]',
    variables: [
      { symbol: '\\eta', meaning: 'Thermal cycle efficiency', units: 'Ratio' },
      { symbol: 'T_C', meaning: 'Cold reservoir temperature', units: 'Kelvin (K)' },
      { symbol: 'T_H', meaning: 'Hot reservoir temperature', units: 'Kelvin (K)' },
      { symbol: 'W_{\\text{net}}', meaning: 'Net mechanical work output', units: 'Joules (J)' },
      { symbol: 'Q_{\\text{in}}', meaning: 'High-temperature heat input', units: 'Joules (J)' }
    ],
    retentionScore: 68.0,
    stabilityDays: 4,
    lastReviewed: '5 days ago',
    decayStatus: 'fragile',
    keyDerivation: 'By Clausius equality for reversible closed paths \\oint \\frac{dQ}{T} = 0 \\implies \\frac{Q_H}{T_H} + \\frac{Q_C}{T_C} = 0 \\implies \\frac{|Q_C|}{|Q_H|} = \\frac{T_C}{T_H}.'
  },
  {
    id: 'stokes-theorem',
    name: 'Stokes Curl & Circulation Theorem',
    subject: 'Multivariable Calculus',
    latex: '\\oint_{\\partial S} \\mathbf{F} \\cdot d\\mathbf{r} = \\iint_S (\\nabla \\times \\mathbf{F}) \\cdot \\hat{\\mathbf{n}}\\, dS',
    shortcut: 'Alt+4',
    dimensions: '[F · L] Line circulation',
    variables: [
      { symbol: '\\mathbf{F}', meaning: 'Smooth vector field', units: 'Arbitrary' },
      { symbol: '\\nabla \\times \\mathbf{F}', meaning: 'Curl vorticity vector', units: 'Field/meter' },
      { symbol: 'S', meaning: 'Orientable open surface', units: 'm²' },
      { symbol: '\\partial S', meaning: 'Piecewise smooth boundary curve', units: 'm' }
    ],
    retentionScore: 71.4,
    stabilityDays: 6,
    lastReviewed: '4 days ago',
    decayStatus: 'fragile',
    keyDerivation: 'Generalization of Fundamental Theorem of Calculus to 2-manifolds embedded in \\mathbb{R}^3 using differential 1-forms: \\int_{\\partial S} \\omega = \\int_S d\\omega.'
  },
  {
    id: 'perturbation-theory',
    name: '1st-Order Time-Independent Perturbation',
    subject: 'Quantum Mechanics',
    latex: 'E_n^{(1)} = \\langle \\psi_n^{(0)} | \\hat{H}\' | \\psi_n^{(0)} \\rangle = \\int \\psi_n^{(0)*}(\\mathbf{r}) \\hat{H}\' \\psi_n^{(0)}(\\mathbf{r})\\, d^3\\mathbf{r}',
    shortcut: 'Alt+5',
    dimensions: '[M L^2 T^-2] (Joules / eV)',
    variables: [
      { symbol: 'E_n^{(1)}', meaning: 'First-order energy correction', units: 'eV' },
      { symbol: '\\psi_n^{(0)}', meaning: 'Unperturbed stationary eigenstate', units: 'm^{-3/2}' },
      { symbol: '\\hat{H}\'', meaning: 'Perturbation Hamiltonian operator', units: 'eV' }
    ],
    retentionScore: 61.2,
    stabilityDays: 3,
    lastReviewed: '6 days ago',
    decayStatus: 'fragile',
    keyDerivation: 'Taylor series expansion of eigenvalues (H_0 + \\lambda H\') |\\psi_n\\rangle = E_n |\\psi_n\\rangle. Projecting onto \\langle \\psi_n^{(0)}| eliminates off-diagonal matrix components.'
  },
  {
    id: 'hamilton-canonical',
    name: 'Hamilton\'s Canonical Equations of Motion',
    subject: 'Analytical Mechanics',
    latex: '\\dot{q}_i = \\frac{\\partial \\mathcal{H}}{\\partial p_i}, \\quad \\dot{p}_i = -\\frac{\\partial \\mathcal{H}}{\\partial q_i}',
    shortcut: 'Alt+6',
    dimensions: '[L T^-1] (velocity), [M L T^-2] (generalized force)',
    variables: [
      { symbol: '\\mathcal{H}', meaning: 'Hamiltonian function (total energy)', units: 'Joules' },
      { symbol: 'q_i', meaning: 'Generalized position coordinates', units: 'Various' },
      { symbol: 'p_i', meaning: 'Conjugate generalized momenta \\partial L/\\partial \\dot{q}_i', units: 'kg·m/s' }
    ],
    retentionScore: 92.0,
    stabilityDays: 19,
    lastReviewed: 'Yesterday, 14:15',
    decayStatus: 'mastered',
    keyDerivation: 'Obtained via Legendre transform of Lagrangian: \\mathcal{H}(q, p, t) = \\sum p_i \\dot{q}_i - \\mathcal{L}(q, \\dot{q}, t).'
  }
];
