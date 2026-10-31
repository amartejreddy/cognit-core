import { Problem } from '../types/index.ts';

export const initialProblems: Problem[] = [
  {
    id: 'p-1',
    number: 1,
    subject: 'Electromagnetism',
    subtopic: 'Time-Varying Magnetic Fields & Induction',
    difficulty: 'Tier 3',
    timeBudgetSec: 120,
    questionLatex: `A conducting circular loop of radius R = 0.20\\text{ m} and resistance r = 2.5\\,\\Omega lies in the xy-plane. A spatially uniform but time-dependent magnetic field \\mathbf{B}(t) = B_0 \\exp(-t/\\tau)\\hat{\\mathbf{z}} is applied, where B_0 = 1.5\\text{ T} and \\tau = 4.0\\text{ s}. Determine the total thermal energy Q dissipated in the loop from t = 0 to t \\to \\infty.`,
    diagramType: 'vector_field',
    options: [
      { id: 'A', text: '0.0471 J', isCorrect: false, trapNote: 'Forgot the factor of 1/2 from the exponential time integral.' },
      { id: 'B', text: '0.0236 J', isCorrect: true, trapNote: 'Correct: Q = \\int_0^\\infty \\frac{\\mathcal{E}^2}{r} dt = \\frac{\\pi^2 R^4 B_0^2}{2 r \\tau}.' },
      { id: 'C', text: '0.0942 J', isCorrect: false, trapNote: 'Used diameter instead of radius in flux calculation.' },
      { id: 'D', text: '0.0118 J', isCorrect: false, trapNote: 'Extraneous factor of 2 in resistance denominator.' },
    ],
    correctOptionId: 'B',
    status: 'unattempted',
    markedForReview: false,
    formulaKeys: ['faraday-induction', 'joule-heating'],
    solutionSteps: [
      'Magnetic flux through loop: \\Phi(t) = B(t) \\cdot \\pi R^2 = \\pi R^2 B_0 e^{-t/\\tau}.',
      'Induced electromotive force: \\mathcal{E}(t) = -\\frac{d\\Phi}{dt} = \\frac{\\pi R^2 B_0}{\\tau} e^{-t/\\tau}.',
      'Instantaneous power dissipated: P(t) = \\frac{\\mathcal{E}(t)^2}{r} = \\frac{\\pi^2 R^4 B_0^2}{r \\tau^2} e^{-2t/\\tau}.',
      'Total dissipated energy: Q = \\int_0^{\\infty} P(t) dt = \\frac{\\pi^2 R^4 B_0^2}{r \\tau^2} \\left[ -\\frac{\\tau}{2} e^{-2t/\\tau} \\right]_0^{\\infty} = \\frac{\\pi^2 R^4 B_0^2}{2 r \\tau}.',
      'Numerical evaluation: \\frac{\\pi^2 (0.2)^4 (1.5)^2}{2 (2.5)(4.0)} = \\frac{9.8696 \\times 0.0016 \\times 2.25}{20} = \\frac{0.03553}{20} \\approx 0.0236\\text{ J}.'
    ],
    trapAnalysis: 'Common failure mode: Aspirants evaluate induced emf correctly but forget that power scales quadratically (e^{-2t/\\tau}), which halves the decay parameter when integrating to infinity.'
  },
  {
    id: 'p-2',
    number: 2,
    subject: 'Circuit Analysis',
    subtopic: 'Second-Order RLC Transient Response',
    difficulty: 'Tier 2',
    timeBudgetSec: 120,
    questionLatex: `In a series RLC resonator with L = 50\\text{ mH}, C = 2.0\\,\\mu\\text{F}, and R = 20\\,\\Omega, the circuit is energized by an AC source v_s(t) = V_m \\cos(\\omega t). Determine the resonant quality factor Q_0 and the half-power bandwidth \\Delta \\omega.`,
    diagramType: 'circuit',
    options: [
      { id: 'A', text: 'Q_0 = 7.91,\\; \\Delta \\omega = 400\\text{ rad/s}', isCorrect: true, trapNote: 'Correct: \\omega_0 = 1/\\sqrt{LC} = 3162.28\\text{ rad/s}, Q_0 = \\omega_0 L / R = 7.91, \\Delta \\omega = R/L = 400\\text{ rad/s}.' },
      { id: 'B', text: 'Q_0 = 15.8,\\; \\Delta \\omega = 200\\text{ rad/s}', isCorrect: false, trapNote: 'Omitted factor of R/L in bandwidth derivation.' },
      { id: 'C', text: 'Q_0 = 3.95,\\; \\Delta \\omega = 800\\text{ rad/s}', isCorrect: false, trapNote: 'Used parallel RLC impedance formula by mistake.' },
      { id: 'D', text: 'Q_0 = 7.91,\\; \\Delta \\omega = 200\\pi\\text{ rad/s}', isCorrect: false, trapNote: 'Confounded angular bandwidth rad/s with cyclic Hz.' },
    ],
    correctOptionId: 'A',
    status: 'mastered',
    markedForReview: false,
    selectedOptionId: 'A',
    elapsedSec: 84,
    confidence: 'certain',
    formulaKeys: ['rlc-resonance', 'quality-factor'],
    solutionSteps: [
      'Resonant angular frequency: \\omega_0 = \\frac{1}{\\sqrt{LC}} = \\frac{1}{\\sqrt{50 \\times 10^{-3} \\times 2.0 \\times 10^{-6}}} = \\frac{1}{\\sqrt{10^{-7}}} = \\sqrt{10^7} \\approx 3162.3\\text{ rad/s}.',
      'Series Quality Factor: Q_0 = \\frac{\\omega_0 L}{R} = \\frac{3162.3 \\times 0.050}{20} = 7.906 \\approx 7.91.',
      'Half-power angular bandwidth: \\Delta \\omega = \\frac{\\omega_0}{Q_0} = \\frac{R}{L} = \\frac{20}{0.050} = 400\\text{ rad/s}.'
    ],
    trapAnalysis: 'Classic pitfall: Mixing up the series RLC quality factor (\\omega_0 L / R) with the parallel RLC equivalent (R / \\omega_0 L).'
  },
  {
    id: 'p-3',
    number: 3,
    subject: 'Thermodynamics',
    subtopic: 'Carnot Cycle & Entropy Generation',
    difficulty: 'Tier 3',
    timeBudgetSec: 150,
    questionLatex: `An ideal monoatomic gas (\\gamma = 5/3) undergoes a reversible cycle comprising: (1\\to 2) isothermal expansion at T_H = 600\\text{ K} from V_1 to V_2 = 3V_1; (2\\to 3) adiabatic expansion to T_C = 300\\text{ K}; (3\\to 4) isothermal compression; and (4\\to 1) adiabatic compression. Calculate the net work output W_{\\text{net}} per mole if R = 8.314\\text{ J/(mol}\\cdot\\text{K)}.`,
    diagramType: 'thermo_cycle',
    options: [
      { id: 'A', text: '5.48 kJ/mol', isCorrect: false, trapNote: 'Calculated isothermal heat transfer but failed to multiply by Carnot efficiency \\eta.' },
      { id: 'B', text: '2.74 kJ/mol', isCorrect: true, trapNote: 'Correct: W = \\eta Q_{in} = (1 - 300/600) \\cdot R T_H \\ln(3) = 0.5 \\times 8.314 \\times 600 \\times 1.0986 = 2.74 kJ.' },
      { id: 'C', text: '1.37 kJ/mol', isCorrect: false, trapNote: 'Appended extraneous factor of (\\gamma - 1).' },
      { id: 'D', text: '3.65 kJ/mol', isCorrect: false, trapNote: 'Substituted isobaric work formulation.' },
    ],
    correctOptionId: 'B',
    status: 'fragile',
    markedForReview: true,
    selectedOptionId: 'A',
    elapsedSec: 168,
    confidence: 'deductive',
    formulaKeys: ['carnot-efficiency', 'entropy-isothermal'],
    solutionSteps: [
      'Efficiency of reversible Carnot cycle: \\eta = 1 - \\frac{T_C}{T_H} = 1 - \\frac{300}{600} = 0.50 (50\\%).',
      'Heat input during isothermal stage (1\\to 2): q_{in} = R T_H \\ln\\left(\\frac{V_2}{V_1}\\right) = 8.314 \\times 600 \\times \\ln(3).',
      'q_{in} = 4988.4 \\times 1.09861 \\approx 5480.3\\text{ J/mol} = 5.48\\text{ kJ/mol}.',
      'Net work produced: W_{\\text{net}} = \\eta \\cdot q_{in} = 0.50 \\times 5.4803\\text{ kJ/mol} \\approx 2.74\\text{ kJ/mol}.'
    ],
    trapAnalysis: 'High-frequency trap: Option A equals the total heat supplied q_{in}. Aspirants under time stress mistakenly treat the heat absorbed as the net mechanical work output.'
  },
  {
    id: 'p-4',
    number: 4,
    subject: 'Multivariable Calculus',
    subtopic: 'Stokes Theorem & Flux Line Integrals',
    difficulty: 'Tier 2',
    timeBudgetSec: 120,
    questionLatex: `Compute the circulation \\oint_C \\mathbf{F} \\cdot d\\mathbf{r} of vector field \\mathbf{F} = (y^2 + z^2)\\hat{\\mathbf{i}} + (x^2 + z^2)\\hat{\\mathbf{j}} + (x^2 + y^2)\\hat{\\mathbf{k}} along the triangle C with vertices (1,0,0), (0,1,0), and (0,0,1) oriented counter-clockwise when viewed from the positive octant.`,
    diagramType: 'vector_field',
    options: [
      { id: 'A', text: '0', isCorrect: true, trapNote: 'Correct: \\nabla \\times \\mathbf{F} = 2(y-z)\\hat{\\mathbf{i}} + 2(z-x)\\hat{\\mathbf{j}} + 2(x-y)\\hat{\\mathbf{k}}. On the plane x+y+z=1, the normal is \\hat{\\mathbf{n}} = \\frac{1}{\\sqrt{3}}(\\hat{\\mathbf{i}}+\\hat{\\mathbf{j}}+\\hat{\\mathbf{k}}). Thus (\\nabla \\times \\mathbf{F}) \\cdot \\hat{\\mathbf{n}} = \\frac{2}{\\sqrt{3}}((y-z)+(z-x)+(x-y)) \\equiv 0.' },
      { id: 'B', text: '\\sqrt{3}', isCorrect: false, trapNote: 'Assumed surface area of triangle instead of evaluating dot product with normal.' },
      { id: 'C', text: '-1', isCorrect: false, trapNote: 'Sign error in cyclic curl computation.' },
      { id: 'D', text: '2\\sqrt{3}', isCorrect: false, trapNote: 'Missed internal algebraic cancellation in \\sum (y-z) = 0.' },
    ],
    correctOptionId: 'A',
    status: 'unattempted',
    markedForReview: false,
    formulaKeys: ['stokes-theorem', 'curl-vector-calc'],
    solutionSteps: [
      'By Stokes Theorem: \\oint_C \\mathbf{F} \\cdot d\\mathbf{r} = \\iint_S (\\nabla \\times \\mathbf{F}) \\cdot \\hat{\\mathbf{n}}\\, dS.',
      'Curl calculation: \\nabla \\times \\mathbf{F} = \\begin{vmatrix} \\hat{\\mathbf{i}} & \\hat{\\mathbf{j}} & \\hat{\\mathbf{k}} \\\\ \\partial_x & \\partial_y & \\partial_z \\\\ y^2+z^2 & x^2+z^2 & x^2+y^2 \\end{vmatrix} = 2(y-z)\\hat{\\mathbf{i}} + 2(z-x)\\hat{\\mathbf{j}} + 2(x-y)\\hat{\\mathbf{k}}.',
      'Surface plane equation: x + y + z = 1. Unit normal: \\hat{\\mathbf{n}} = \\frac{1}{\\sqrt{3}}(\\hat{\\mathbf{i}} + \\hat{\\mathbf{j}} + \\hat{\\mathbf{k}}).',
      'Dot product: (\\nabla \\times \\mathbf{F}) \\cdot \\hat{\\mathbf{n}} = \\frac{2}{\\sqrt{3}} [(y-z) + (z-x) + (x-y)] = \\frac{2}{\\sqrt{3}}(0) = 0.',
      'Therefore, the integral identically equals 0.'
    ],
    trapAnalysis: 'Analytical symmetry trap: Students waste 4+ minutes setting up parametrization rather than inspecting the cyclic symmetry of the curl dot normal.'
  },
  {
    id: 'p-5',
    number: 5,
    subject: 'Quantum Mechanics',
    subtopic: 'Infinite Square Well Perturbation',
    difficulty: 'Tier 3',
    timeBudgetSec: 150,
    questionLatex: `A particle of mass m resides in a 1D infinite square well between x = 0 and x = L. A weak delta-function perturbation H\' = \\alpha \\delta(x - L/2) is introduced at the center. What is the first-order energy shift \\Delta E_n^{(1)} for the n-th energy eigenstate?`,
    diagramType: 'potential_well',
    options: [
      { id: 'A', text: '\\Delta E_n^{(1)} = \\frac{2\\alpha}{L} \\sin^2(n\\pi/2)', isCorrect: true, trapNote: 'Correct: \\Delta E_n^{(1)} = \\langle \\psi_n | \\alpha \\delta(x - L/2) | \\psi_n \\rangle = \\alpha |\\psi_n(L/2)|^2 = \\frac{2\\alpha}{L}\\sin^2(n\\pi/2).' },
      { id: 'B', text: '\\Delta E_n^{(1)} = \\frac{\\alpha}{L} \\text{ for all } n', isCorrect: false, trapNote: 'Missed spatial nodal structure of eigenstates.' },
      { id: 'C', text: '\\Delta E_n^{(1)} = 0 \\text{ for all odd } n', isCorrect: false, trapNote: 'Inverted even/odd parity; odd n have peaks at L/2, even n have nodes (zero).' },
      { id: 'D', text: '\\Delta E_n^{(1)} = \\frac{4\\alpha}{L} \\cos(n\\pi)', isCorrect: false, trapNote: 'Incorrect wave-function normalization.' },
    ],
    correctOptionId: 'A',
    status: 'unattempted',
    markedForReview: false,
    formulaKeys: ['perturbation-theory', 'schrodinger-well'],
    solutionSteps: [
      'Unperturbed eigenstates: \\psi_n(x) = \\sqrt{\\frac{2}{L}} \\sin\\left(\\frac{n\\pi x}{L}\\right).',
      'First-order perturbation formula: \\Delta E_n^{(1)} = \\int_0^L \\psi_n^*(x) H\' \\psi_n(x)\\, dx.',
      'Evaluating delta function: \\int_0^L |\\psi_n(x)|^2 \\alpha \\delta(x - L/2)\\, dx = \\alpha |\\psi_n(L/2)|^2.',
      'Substitute x = L/2: |\\psi_n(L/2)|^2 = \\frac{2}{L} \\sin^2\\left(\\frac{n\\pi}{2}\\right).',
      'Note: For even n, \\sin(n\\pi/2) = 0 \\implies \\Delta E_n^{(1)} = 0. For odd n, \\sin^2(n\\pi/2) = 1 \\implies \\Delta E_n^{(1)} = 2\\alpha/L.'
    ],
    trapAnalysis: 'Parity inversion trap: Many candidates conclude that even n states shift while odd n states remain unaffected, missing that \\sin(n\\pi/2) has nodes at even integers.'
  }
];
