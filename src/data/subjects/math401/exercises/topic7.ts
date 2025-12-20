import { WrittenExercise } from '../../../../core/types';

export const topic7Exercises: WrittenExercise[] = [
  {
    id: 'math401-t7-ex01',
    subjectId: 'math401',
    topicId: 'math401-topic-7',
    type: 'written',
    title: 'Conformal Mapping Basics',
    description: 'Show that f(z) = z² is conformal except at z = 0.',
    difficulty: 2,
    hints: [
      'Conformal requires f\'(z) ≠ 0',
      'Compute f\'(z)',
      'Check where derivative vanishes'
    ],
    solution: 'f\'(z) = 2z. This is zero only at z = 0. Therefore f is conformal everywhere except at the origin.'
  },
  {
    id: 'math401-t7-ex02',
    subjectId: 'math401',
    topicId: 'math401-topic-7',
    type: 'written',
    title: 'Möbius Transformation Properties',
    description: 'Show that w = (z-1)/(z+1) maps the unit circle to the imaginary axis.',
    difficulty: 3,
    hints: [
      'Substitute z = e^{iθ}',
      'Simplify the expression',
      'Show w is purely imaginary'
    ],
    solution: 'For |z| = 1: z = e^{iθ}. w = (e^{iθ}-1)/(e^{iθ}+1). Multiply by conjugate: w = (e^{iθ}-1)(e^{-iθ}+1)/|e^{iθ}+1|² = (1+e^{-iθ}-e^{iθ}-1)/|e^{iθ}+1|² = -2i sin θ/(2+2cos θ) = -i tan(θ/2). Purely imaginary.'
  },
  {
    id: 'math401-t7-ex03',
    subjectId: 'math401',
    topicId: 'math401-topic-7',
    type: 'written',
    title: 'Inversion Mapping',
    description: 'Describe how w = 1/z maps circles and lines.',
    difficulty: 3,
    hints: [
      'Lines through origin map to lines',
      'Lines not through origin map to circles',
      'Circles through origin map to lines',
      'Circles not through origin map to circles'
    ],
    solution: 'w = 1/z: (1) Lines through 0 → lines through 0. (2) Lines not through 0 → circles through 0. (3) Circles through 0 → lines not through 0. (4) Circles not through 0 → circles not through 0.'
  },
  {
    id: 'math401-t7-ex04',
    subjectId: 'math401',
    topicId: 'math401-topic-7',
    type: 'written',
    title: 'Exponential Map',
    description: 'Show that w = e^z maps vertical lines to circles and horizontal lines to rays.',
    difficulty: 2,
    hints: [
      'Let z = x + iy',
      'w = e^x e^{iy}',
      'Vertical line: x constant',
      'Horizontal line: y constant'
    ],
    solution: 'z = x+iy, w = e^x e^{iy}. Vertical line x = c: |w| = e^c (circle of radius e^c). Horizontal line y = c: arg w = c (ray at angle c from origin).'
  },
  {
    id: 'math401-t7-ex05',
    subjectId: 'math401',
    topicId: 'math401-topic-7',
    type: 'written',
    title: 'Joukowski Transform',
    description: 'The Joukowski transform w = z + 1/z maps the unit circle to what?',
    difficulty: 3,
    hints: [
      'Set z = e^{iθ} on unit circle',
      'w = e^{iθ} + e^{-iθ}',
      'Use Euler formula'
    ],
    solution: 'For z = e^{iθ}: w = e^{iθ} + e^{-iθ} = 2cos θ. As θ varies from 0 to 2π, w traces the line segment [-2, 2] twice (real axis).'
  },
  {
    id: 'math401-t7-ex06',
    subjectId: 'math401',
    topicId: 'math401-topic-7',
    type: 'written',
    title: 'Cross-Ratio',
    description: 'Define the cross-ratio and explain its invariance under Möbius transformations.',
    difficulty: 4,
    hints: [
      'Cross-ratio of z₁,z₂,z₃,z₄: (z₁-z₃)(z₂-z₄)/[(z₁-z₄)(z₂-z₃)]',
      'Möbius maps preserve cross-ratios',
      'Used to construct Möbius maps'
    ],
    solution: 'Cross-ratio: (z₁,z₂;z₃,z₄) = [(z₁-z₃)(z₂-z₄)]/[(z₁-z₄)(z₂-z₃)]. Möbius transformations preserve cross-ratios: if w = T(z), then (w₁,w₂;w₃,w₄) = (z₁,z₂;z₃,z₄). Used to find Möbius map sending 3 points to 3 points.'
  },
  {
    id: 'math401-t7-ex07',
    subjectId: 'math401',
    topicId: 'math401-topic-7',
    type: 'written',
    title: 'Riemann Mapping Theorem',
    description: 'State the Riemann Mapping Theorem and give its significance.',
    difficulty: 3,
    hints: [
      'Simply connected domain',
      'Conformal map to unit disk',
      'Existence and uniqueness'
    ],
    solution: 'Riemann Mapping Theorem: Any simply connected domain D ⊂ ℂ with D ≠ ℂ can be conformally mapped to the unit disk. The map is unique up to Möbius transformations of the disk. Significance: classifies all simply connected domains.'
  },
  {
    id: 'math401-t7-ex08',
    subjectId: 'math401',
    topicId: 'math401-topic-7',
    type: 'written',
    title: 'Schwarz-Christoffel Formula',
    description: 'Explain the Schwarz-Christoffel formula for mapping upper half-plane to polygon.',
    difficulty: 4,
    hints: [
      'Maps ℍ to polygon with vertices',
      'Formula involves product of powers',
      'Angles at vertices determine exponents'
    ],
    solution: 'Schwarz-Christoffel: f(z) = A∫(z-x₁)^{-α₁}(z-x₂)^{-α₂}...(z-xₙ)^{-αₙ} dz + B maps upper half-plane to polygon with interior angles παᵢ at vertices corresponding to real points xᵢ. A, B are constants.'
  },
  {
    id: 'math401-t7-ex09',
    subjectId: 'math401',
    topicId: 'math401-topic-7',
    type: 'written',
    title: 'Fluid Flow Application',
    description: 'Explain how conformal maps model 2D incompressible fluid flow.',
    difficulty: 3,
    hints: [
      'Complex potential Ω = φ + iψ',
      'φ = velocity potential, ψ = stream function',
      'Cauchy-Riemann equations',
      'Laplace equation'
    ],
    solution: 'In 2D incompressible flow: velocity (u,v) has potential φ and stream function ψ. Complex potential Ω = φ+iψ is analytic. Cauchy-Riemann: ∂φ/∂x = ∂ψ/∂y, ∂φ/∂y = -∂ψ/∂x give u = ∂φ/∂x, v = ∂φ/∂y. Conformal maps transform one flow to another.'
  },
  {
    id: 'math401-t7-ex10',
    subjectId: 'math401',
    topicId: 'math401-topic-7',
    type: 'written',
    title: 'Electrostatics Application',
    description: 'How are conformal maps used to solve 2D electrostatics problems?',
    difficulty: 3,
    hints: [
      'Laplace equation ∇²φ = 0',
      'Harmonic functions',
      'Boundary value problems'
    ],
    solution: 'Electric potential φ satisfies Laplace\'s equation ∇²φ = 0, so φ is harmonic. Real/imaginary parts of analytic functions are harmonic. Conformal maps preserve harmonicity, transforming boundary value problems in complex domains to simpler domains (like half-plane or disk) where solutions are known.'
  },
  {
    id: 'math401-t7-ex11',
    subjectId: 'math401',
    topicId: 'math401-topic-7',
    type: 'written',
    title: 'Annulus Mapping',
    description: 'Can every annulus be conformally mapped to a standard annulus r < |z| < 1?',
    difficulty: 4,
    hints: [
      'Annulus modulus',
      'Conformal equivalence depends on ratio',
      'Not all annuli are conformally equivalent'
    ],
    solution: 'No. Two annuli are conformally equivalent iff they have the same modulus (ratio of radii). An annulus R₁ < |z| < R₂ has modulus R₂/R₁. This is a conformal invariant. Annuli with different moduli cannot be conformally mapped to each other.'
  },
  {
    id: 'math401-t7-ex12',
    subjectId: 'math401',
    topicId: 'math401-topic-7',
    type: 'written',
    title: 'Conformal Automorphisms',
    description: 'Find all conformal automorphisms (bijective conformal maps) of the unit disk.',
    difficulty: 4,
    hints: [
      'Möbius maps preserving unit disk',
      'Form: (z-a)/(1-āz) with |a| < 1',
      'Include rotations'
    ],
    solution: 'Conformal automorphisms of unit disk: φ(z) = e^{iθ}(z-a)/(1-āz) where |a| < 1 and θ ∈ ℝ. These are exactly the Möbius transformations mapping disk to itself.'
  },
  {
    id: 'math401-t7-ex13',
    subjectId: 'math401',
    topicId: 'math401-topic-7',
    type: 'written',
    title: 'Mapping Upper Half-Plane to Disk',
    description: 'Find a Möbius transformation mapping upper half-plane to unit disk.',
    difficulty: 3,
    hints: [
      'Send specific points to specific points',
      'w = (z-i)/(z+i) works',
      'Verify'
    ],
    solution: 'w = (z-i)/(z+i) maps ℍ to unit disk. Check: i → 0, ∞ → 1, 0 → -1. For Im z > 0: |w| < 1 (verify by computation).'
  },
  {
    id: 'math401-t7-ex14',
    subjectId: 'math401',
    topicId: 'math401-topic-7',
    type: 'written',
    title: 'Angle Preservation',
    description: 'Prove that conformal maps preserve angles between curves.',
    difficulty: 3,
    hints: [
      'Consider two curves intersecting at z₀',
      'Tangent vectors',
      'Multiplication by f\'(z₀) rotates and scales'
    ],
    solution: 'Let γ₁, γ₂ be curves intersecting at z₀ with tangent vectors v₁, v₂. Under w = f(z), images have tangents f\'(z₀)v₁, f\'(z₀)v₂. Since f\'(z₀) ≠ 0, multiplication by f\'(z₀) is rotation + scaling, preserving angle: arg(f\'v₂/f\'v₁) = arg(v₂/v₁).'
  },
  {
    id: 'math401-t7-ex15',
    subjectId: 'math401',
    topicId: 'math401-topic-7',
    type: 'written',
    title: 'Critical Points',
    description: 'What happens to conformality at critical points where f\'(z) = 0?',
    difficulty: 3,
    hints: [
      'Angle multiplication',
      'If f\'(z₀) = 0 but f\'\'(z₀) ≠ 0',
      'Angles are doubled'
    ],
    solution: 'At critical point z₀ where f\'(z₀) = 0, f is not conformal. If f\'\'(z₀) ≠ 0, near z₀: f(z) ≈ f(z₀) + (1/2)f\'\'(z₀)(z-z₀)². Angles are multiplied by 2 (e.g., f(z) = z² at origin doubles angles).'
  },
  {
    id: 'math401-t7-ex16',
    subjectId: 'math401',
    topicId: 'math401-topic-7',
    type: 'written',
    title: 'Dirichlet Problem',
    description: 'Explain how conformal mapping solves the Dirichlet problem.',
    difficulty: 4,
    hints: [
      'Dirichlet: find harmonic u with given boundary values',
      'Transform domain conformally',
      'Solve in simpler domain',
      'Transform solution back'
    ],
    solution: 'Dirichlet problem: find harmonic u in domain D with u = g on ∂D. If f: D → D\' conformally, and u\' solves Dirichlet in D\', then u = u\' ∘ f solves it in D (harmonicity preserved). Strategy: map to disk/half-plane where solution is explicit (Poisson integral), then pull back.'
  }
];
