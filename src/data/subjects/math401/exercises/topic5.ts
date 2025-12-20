import { WrittenExercise } from '../../../../core/types';

export const topic5Exercises: WrittenExercise[] = [
  {
    id: 'math401-t5-ex01',
    subjectId: 'math401',
    topicId: 'math401-topic-5',
    type: 'written',
    title: 'Radius of Convergence',
    description: 'Find the radius of convergence of the power series Σ(z^n)/n².',
    difficulty: 2,
    hints: [
      'Use the ratio test or root test',
      'R = 1/lim sup |aₙ|^(1/n)',
      'Here aₙ = 1/n²'
    ],
    solution: 'Using root test: |aₙ|^(1/n) = (1/n²)^(1/n) = 1/n^(2/n) → 1 as n → ∞. Therefore R = 1/1 = 1.'
  },
  {
    id: 'math401-t5-ex02',
    subjectId: 'math401',
    topicId: 'math401-topic-5',
    type: 'written',
    title: 'Taylor Series Expansion',
    description: 'Find the first 4 terms of the Taylor series for f(z) = e^(z²) around z = 0.',
    difficulty: 2,
    hints: [
      'Use e^w = Σw^n/n!',
      'Substitute w = z²',
      'Expand'
    ],
    solution: 'e^(z²) = 1 + z² + z⁴/2 + z⁶/6 + ...'
  },
  {
    id: 'math401-t5-ex03',
    subjectId: 'math401',
    topicId: 'math401-topic-5',
    type: 'written',
    title: 'Laurent Series in Annulus',
    description: 'Find Laurent series for f(z) = 1/(z(z-1)) in 1 < |z| < ∞.',
    difficulty: 3,
    hints: [
      'Partial fractions',
      'Expand for |z| > 1'
    ],
    solution: 'Partial fractions: 1/(z(z-1)) = 1/(z-1) - 1/z. For |z| > 1: 1/(z-1) = (1/z)/(1-1/z) = z^(-1) + z^(-2) + z^(-3) + ... So f(z) = z^(-2) + z^(-3) + ...'
  },
  {
    id: 'math401-t5-ex04',
    subjectId: 'math401',
    topicId: 'math401-topic-5',
    type: 'written',
    title: 'Classifying Singularities',
    description: 'Classify singularity of f(z) = (1 - cos z)/z² at z = 0.',
    difficulty: 3,
    hints: [
      'Find Laurent series',
      'Use cos z = 1 - z²/2! + z⁴/4! - ...'
    ],
    solution: '1 - cos z = z²/2 - z⁴/24 + ... So f(z) = 1/2 - z²/24 + ... Removable singularity.'
  },
  {
    id: 'math401-t5-ex05',
    subjectId: 'math401',
    topicId: 'math401-topic-5',
    type: 'written',
    title: 'Order of Pole',
    description: 'Find order of pole of f(z) = z/(z²+1)² at z = i.',
    difficulty: 2,
    hints: [
      'Factor: z²+1 = (z-i)(z+i)',
      'Count power of (z-i)'
    ],
    solution: '(z²+1)² = (z-i)²(z+i)², so f has pole of order 2 at z = i.'
  },
  {
    id: 'math401-t5-ex06',
    subjectId: 'math401',
    topicId: 'math401-topic-5',
    type: 'written',
    title: 'Essential Singularity',
    description: 'Show f(z) = e^(1/z) has essential singularity at z = 0.',
    difficulty: 2,
    hints: [
      'Write Laurent series',
      'e^w = Σw^n/n!'
    ],
    solution: 'e^(1/z) = 1 + 1/z + 1/(2!z²) + ... has infinitely many negative powers, so essential singularity.'
  },
  {
    id: 'math401-t5-ex07',
    subjectId: 'math401',
    topicId: 'math401-topic-5',
    type: 'written',
    title: 'Simple Zero',
    description: 'If f(z₀) = 0 and f\'(z₀) ≠ 0, show z₀ is simple zero.',
    difficulty: 3,
    hints: [
      'Taylor series',
      'f(z₀) = 0 means a₀ = 0',
      'f\'(z₀) ≠ 0 means a₁ ≠ 0'
    ],
    solution: 'f(z) = a₁(z-z₀) + a₂(z-z₀)² + ... = (z-z₀)g(z) where g(z₀) ≠ 0. Simple zero.'
  },
  {
    id: 'math401-t5-ex08',
    subjectId: 'math401',
    topicId: 'math401-topic-5',
    type: 'written',
    title: 'Laurent Uniqueness',
    description: 'Explain why Laurent series in annulus is unique.',
    difficulty: 3,
    hints: [
      'Coefficients from integrals',
      'aₙ = (1/2πi)∫ f(z)/(z-a)^(n+1) dz'
    ],
    solution: 'Laurent coefficients uniquely determined by contour integrals.'
  },
  {
    id: 'math401-t5-ex09',
    subjectId: 'math401',
    topicId: 'math401-topic-5',
    type: 'written',
    title: 'Analytic Continuation',
    description: 'Explain analytic continuation of Σz^n to 1/(1-z).',
    difficulty: 3,
    hints: [
      'Series converges for |z| < 1',
      '1/(1-z) defined for z ≠ 1'
    ],
    solution: 'Σz^n = 1/(1-z) for |z| < 1. Function 1/(1-z) extends series beyond radius of convergence.'
  },
  {
    id: 'math401-t5-ex10',
    subjectId: 'math401',
    topicId: 'math401-topic-5',
    type: 'written',
    title: 'Boundary Convergence',
    description: 'Does Σz^n/n converge on |z| = 1?',
    difficulty: 3,
    hints: [
      'Check z = 1 and z = -1',
      'Use series tests'
    ],
    solution: 'At z = 1: diverges. At z = -1: converges. Depends on point.'
  },
  {
    id: 'math401-t5-ex11',
    subjectId: 'math401',
    topicId: 'math401-topic-5',
    type: 'written',
    title: 'Taylor Coefficients',
    description: 'Find Taylor series for 1/(1-z)² around z = 0.',
    difficulty: 2,
    hints: [
      'Differentiate Σz^n',
      'Term-by-term'
    ],
    solution: '1/(1-z)² = Σ(n+1)z^n = 1 + 2z + 3z² + ...'
  },
  {
    id: 'math401-t5-ex12',
    subjectId: 'math401',
    topicId: 'math401-topic-5',
    type: 'written',
    title: 'Multiple Laurent Regions',
    description: 'Find Laurent series for 1/[z(z-2)] in 0 < |z| < 2 and |z| > 2.',
    difficulty: 4,
    hints: [
      'Partial fractions',
      'Expand differently'
    ],
    solution: 'For 0 < |z| < 2: -1/(2z) - Σz^n/2^(n+1). For |z| > 2: different expansion.'
  },
  {
    id: 'math401-t5-ex13',
    subjectId: 'math401',
    topicId: 'math401-topic-5',
    type: 'written',
    title: 'Identity Theorem',
    description: 'If f(1/n) = g(1/n) for all n and 0 ∈ D, prove f = g.',
    difficulty: 4,
    hints: [
      '1/n → 0',
      'Identity theorem'
    ],
    solution: 'Points with limit point 0. By identity theorem, f = g on connected D.'
  },
  {
    id: 'math401-t5-ex14',
    subjectId: 'math401',
    topicId: 'math401-topic-5',
    type: 'written',
    title: 'Series Multiplication',
    description: 'Find power series for f(z)g(z) given their series.',
    difficulty: 3,
    hints: [
      'Cauchy product',
      'Σ_{k=0}^n aₖbₙ₋ₖ'
    ],
    solution: 'Coefficient of z^n is Σ_{k=0}^n aₖbₙ₋ₖ (Cauchy product).'
  },
  {
    id: 'math401-t5-ex15',
    subjectId: 'math401',
    topicId: 'math401-topic-5',
    type: 'written',
    title: 'Removable Singularity',
    description: 'If lim (z-a)f(z) = 0, prove removable singularity.',
    difficulty: 4,
    hints: [
      'Laurent series',
      'Principal part vanishes'
    ],
    solution: 'Limit condition forces a₋₁ = 0. All negative coefficients zero. Removable.'
  },
  {
    id: 'math401-t5-ex16',
    subjectId: 'math401',
    topicId: 'math401-topic-5',
    type: 'written',
    title: 'Radius from Singularities',
    description: 'Why is R = 1 for 1/(z²-3z+2) around z = 0?',
    difficulty: 3,
    hints: [
      'Factor denominator',
      'Find singularities',
      'Distance to nearest'
    ],
    solution: 'Poles at z = 1, 2. Nearest to 0 is at distance 1. So R = 1.'
  }
];
