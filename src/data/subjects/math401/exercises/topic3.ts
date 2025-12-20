import { WrittenExercise } from '../../../../core/types';

export const topic3Exercises: WrittenExercise[] = [
  {
    id: 'math401-t3-ex01',
    subjectId: 'math401',
    topicId: 'math401-topic-3',
    type: 'written',
    title: 'Line Integral Computation',
    description: 'Compute ∫_γ z dz where γ is the line segment from 0 to 1+i.',
    difficulty: 2,
    hints: [
      'Parameterize the line: z(t) = t(1+i) for t ∈ [0,1]',
      'Find dz = z\'(t)dt',
      'Substitute and integrate'
    ],
    solution: 'Parameterize: z(t) = t(1+i), so dz = (1+i)dt for t ∈ [0,1]. ∫_γ z dz = ∫₀¹ t(1+i)(1+i)dt = (1+i)² ∫₀¹ t dt = (1+2i-1)[t²/2]₀¹ = 2i · 1/2 = i.'
  },
  {
    id: 'math401-t3-ex02',
    subjectId: 'math401',
    topicId: 'math401-topic-3',
    type: 'written',
    title: 'Contour Integral of Polynomial',
    description: 'Evaluate ∫_γ (z² + 3z) dz where γ is the unit circle traversed once counterclockwise.',
    difficulty: 2,
    hints: [
      'z² + 3z is entire (analytic everywhere)',
      'Use Cauchy-Goursat theorem',
      'Alternatively, find an antiderivative'
    ],
    solution: 'Since f(z) = z² + 3z is entire, by Cauchy-Goursat theorem, ∫_γ f(z)dz = 0 for any closed contour γ. Alternatively, F(z) = z³/3 + 3z²/2 is an antiderivative, and since γ is closed, ∫_γ f = F(end) - F(start) = 0.'
  },
  {
    id: 'math401-t3-ex03',
    subjectId: 'math401',
    topicId: 'math401-topic-3',
    type: 'written',
    title: 'Parameterized Circle Integration',
    description: 'Compute ∫_{|z|=2} z̄ dz where the circle is traversed counterclockwise.',
    difficulty: 3,
    hints: [
      'Parameterize: z = 2e^(iθ) for θ ∈ [0, 2π]',
      'Find z̄ and dz in terms of θ',
      'Substitute and integrate'
    ],
    solution: 'z = 2e^(iθ), z̄ = 2e^(-iθ), dz = 2ie^(iθ)dθ. ∫_{|z|=2} z̄ dz = ∫₀^(2π) 2e^(-iθ) · 2ie^(iθ)dθ = 4i∫₀^(2π) dθ = 4i[θ]₀^(2π) = 8πi.'
  },
  {
    id: 'math401-t3-ex04',
    subjectId: 'math401',
    topicId: 'math401-topic-3',
    type: 'written',
    title: 'ML Inequality Application',
    description: 'Use the ML inequality to bound |∫_{|z|=1} e^z/z² dz|.',
    difficulty: 3,
    hints: [
      'ML inequality: |∫_γ f| ≤ ML where M = max|f| on γ, L = length of γ',
      'On |z|=1, find bound for |e^z|',
      'Length of unit circle is 2π'
    ],
    solution: 'On |z|=1: |e^z| = e^(Re z) ≤ e¹ = e (since Re z ≤ |z| = 1). So |e^z/z²| = |e^z|/|z|² ≤ e/1 = e. Length L = 2π. By ML inequality: |∫_{|z|=1} e^z/z² dz| ≤ e · 2π = 2πe.'
  },
  {
    id: 'math401-t3-ex05',
    subjectId: 'math401',
    topicId: 'math401-topic-3',
    type: 'written',
    title: 'Independence of Path',
    description: 'Show that ∫_γ e^z dz is independent of path by finding an antiderivative.',
    difficulty: 2,
    hints: [
      'An antiderivative F satisfies F\' = f',
      'Check if d/dz(e^z) = e^z',
      'If antiderivative exists, integral depends only on endpoints'
    ],
    solution: 'F(z) = e^z is an antiderivative of f(z) = e^z since d/dz(e^z) = e^z. Therefore, for any path γ from a to b: ∫_γ e^z dz = F(b) - F(a) = e^b - e^a, which depends only on endpoints, not on the path.'
  },
  {
    id: 'math401-t3-ex06',
    subjectId: 'math401',
    topicId: 'math401-topic-3',
    type: 'written',
    title: 'Cauchy-Goursat Application',
    description: 'Evaluate ∫_γ cos(z) dz where γ is any closed contour not enclosing any singularities.',
    difficulty: 2,
    hints: [
      'Check if cos(z) is analytic',
      'cos(z) = (e^(iz) + e^(-iz))/2 is entire',
      'Apply Cauchy-Goursat theorem'
    ],
    solution: 'cos(z) is entire (analytic everywhere in ℂ). By the Cauchy-Goursat theorem, for any closed contour γ in the complex plane, ∫_γ cos(z) dz = 0.'
  },
  {
    id: 'math401-t3-ex07',
    subjectId: 'math401',
    topicId: 'math401-topic-3',
    type: 'written',
    title: 'Integral with Branch Cut',
    description: 'Explain why ∫_γ √z dz depends on the path when γ goes around the origin.',
    difficulty: 3,
    hints: [
      '√z is multi-valued and requires a branch cut',
      '√z is not analytic on any domain containing the origin',
      'Going around origin changes the branch'
    ],
    solution: 'The function √z is multi-valued and not analytic on any domain containing the origin. Any branch of √z has a branch cut (typically along the negative real axis or another ray from the origin). When a contour γ crosses the branch cut or encircles the origin, the integral depends on how the branch is traversed. Therefore ∫_γ √z dz is path-dependent when γ goes around the origin.'
  },
  {
    id: 'math401-t3-ex08',
    subjectId: 'math401',
    topicId: 'math401-topic-3',
    type: 'written',
    title: 'Deformation of Contours',
    description: 'Let γ₁ be the circle |z|=1 and γ₂ be the circle |z|=2, both counterclockwise. Show that ∫_{γ₁} f(z)dz = ∫_{γ₂} f(z)dz for f(z) = 1/(z-3).',
    difficulty: 3,
    hints: [
      'Check where f is analytic',
      'The singularity is at z = 3',
      'Both contours don\'t enclose the singularity'
    ],
    solution: 'f(z) = 1/(z-3) has a singularity only at z = 3. Since |3| > 2 > 1, the point z = 3 is outside both circles. Therefore f is analytic in the annulus 1 ≤ |z| ≤ 2. By deformation of contours (or Cauchy-Goursat applied to the region between contours): ∫_{γ₁} f dz = ∫_{γ₂} f dz. In fact, both equal 0.'
  },
  {
    id: 'math401-t3-ex09',
    subjectId: 'math401',
    topicId: 'math401-topic-3',
    type: 'written',
    title: 'Computing with Antiderivative',
    description: 'Evaluate ∫_γ sin(z) dz where γ goes from 0 to πi along any path.',
    difficulty: 2,
    hints: [
      'Find an antiderivative of sin(z)',
      'd/dz(-cos(z)) = sin(z)',
      'Use fundamental theorem of contour integration'
    ],
    solution: 'An antiderivative of sin(z) is F(z) = -cos(z). Therefore ∫_γ sin(z) dz = F(πi) - F(0) = -cos(πi) - (-cos(0)) = -cos(πi) + cos(0). Using cos(z) = (e^(iz) + e^(-iz))/2: cos(πi) = (e^(-π) + e^π)/2 = cosh(π). So the answer is -cosh(π) + 1 = 1 - cosh(π).'
  },
  {
    id: 'math401-t3-ex10',
    subjectId: 'math401',
    topicId: 'math401-topic-3',
    type: 'written',
    title: 'Winding Number',
    description: 'Compute the winding number n(γ, 0) where γ is the circle |z|=1 traversed twice counterclockwise.',
    difficulty: 2,
    hints: [
      'Winding number: n(γ,a) = (1/2πi)∫_γ dz/(z-a)',
      'For circle |z|=r traversed once counterclockwise around a, n = 1',
      'Traversing twice doubles the winding number'
    ],
    solution: 'n(γ,0) = (1/2πi)∫_γ dz/z. For unit circle traversed once, ∫_{|z|=1} dz/z = 2πi. Since γ is traversed twice, ∫_γ dz/z = 2·2πi = 4πi. Therefore n(γ,0) = (1/2πi)·4πi = 2.'
  },
  {
    id: 'math401-t3-ex11',
    subjectId: 'math401',
    topicId: 'math401-topic-3',
    type: 'written',
    title: 'Integral Along Rectangle',
    description: 'Evaluate ∫_γ (2z + 1) dz where γ is the rectangle with vertices at 0, 2, 2+i, i traversed counterclockwise.',
    difficulty: 3,
    hints: [
      'The integrand is entire',
      'Apply Cauchy-Goursat theorem',
      'Or use antiderivative F(z) = z² + z'
    ],
    solution: 'Since f(z) = 2z + 1 is entire (analytic everywhere), by Cauchy-Goursat theorem, ∫_γ f(z)dz = 0 for any closed contour γ. Alternatively, F(z) = z² + z is an antiderivative, and since γ is closed: ∫_γ f = F(end) - F(start) = F(0) - F(0) = 0.'
  },
  {
    id: 'math401-t3-ex12',
    subjectId: 'math401',
    topicId: 'math401-topic-3',
    type: 'written',
    title: 'Contour Integration with Multiple Paths',
    description: 'Let γ₁ be the line segment from 0 to 1+i, and γ₂ be the path from 0 to 1 to 1+i (two line segments). Show that ∫_{γ₁} z² dz = ∫_{γ₂} z² dz.',
    difficulty: 2,
    hints: [
      'z² is entire',
      'Find antiderivative',
      'Both paths have same endpoints'
    ],
    solution: 'Since f(z) = z² is entire, it has antiderivative F(z) = z³/3 in all of ℂ. Both γ₁ and γ₂ go from 0 to 1+i. Therefore ∫_{γ₁} z² dz = F(1+i) - F(0) = (1+i)³/3 - 0 = (1 + 3i - 3 - i)/3 = (-2 + 2i)/3. Similarly for γ₂. The integrals are equal.'
  },
  {
    id: 'math401-t3-ex13',
    subjectId: 'math401',
    topicId: 'math401-topic-3',
    type: 'written',
    title: 'Integral of Conjugate Function',
    description: 'Show that ∫_γ z̄ dz ≠ 0 for some closed contour γ, proving z̄ is not analytic.',
    difficulty: 3,
    hints: [
      'Try γ = unit circle',
      'Parameterize and compute',
      'If z̄ were analytic, Cauchy-Goursat would give 0'
    ],
    solution: 'Let γ be the unit circle traversed counterclockwise. From exercise 3, we found ∫_{|z|=2} z̄ dz = 8πi. For unit circle: z = e^(iθ), z̄ = e^(-iθ), dz = ie^(iθ)dθ. ∫_γ z̄ dz = ∫₀^(2π) e^(-iθ)·ie^(iθ)dθ = i∫₀^(2π) dθ = 2πi ≠ 0. This shows z̄ cannot be analytic (Cauchy-Goursat would require the integral to be 0).'
  },
  {
    id: 'math401-t3-ex14',
    subjectId: 'math401',
    topicId: 'math401-topic-3',
    type: 'written',
    title: 'Length of Contour',
    description: 'Find the length of the contour γ parameterized by z(t) = t + it² for t ∈ [0,1].',
    difficulty: 2,
    hints: [
      'Length: L = ∫_a^b |z\'(t)| dt',
      'Compute z\'(t) = dz/dt',
      'Find |z\'(t)|'
    ],
    solution: 'z(t) = t + it², so z\'(t) = 1 + 2it. |z\'(t)| = |1 + 2it| = √(1² + (2t)²) = √(1 + 4t²). Length: L = ∫₀¹ √(1 + 4t²) dt. Using substitution u = 2t: L = (1/2)∫₀² √(1 + u²) du = (1/2)[u√(1+u²)/2 + (1/2)ln|u + √(1+u²)|]₀² = (1/4)[2√5 + ln(2+√5)] ≈ 1.48.'
  },
  {
    id: 'math401-t3-ex15',
    subjectId: 'math401',
    topicId: 'math401-topic-3',
    type: 'written',
    title: 'Maximum Modulus on Contour',
    description: 'Find the maximum value of |z²| on the contour |z-1| = 1.',
    difficulty: 3,
    hints: [
      'Parameterize the circle: z = 1 + e^(iθ)',
      'Compute |z²| and find its maximum',
      'Or use geometric reasoning'
    ],
    solution: 'The circle |z-1| = 1 is centered at 1 with radius 1, so it passes through 0 and 2. |z²| = |z|². On this circle, z ranges from points with minimum |z| = 0 (at z = 0) to maximum |z| = 2 (at z = 2). Therefore max|z²| = 2² = 4.'
  },
  {
    id: 'math401-t3-ex16',
    subjectId: 'math401',
    topicId: 'math401-topic-3',
    type: 'written',
    title: 'Fundamental Theorem Application',
    description: 'Use the fundamental theorem of contour integration to evaluate ∫_γ (1/z²) dz where γ goes from 1 to i along any path not passing through 0.',
    difficulty: 2,
    hints: [
      'Find an antiderivative of 1/z²',
      'd/dz(-1/z) = 1/z²',
      'Apply fundamental theorem'
    ],
    solution: 'F(z) = -1/z is an antiderivative of f(z) = 1/z² (valid on ℂ\\{0}). By the fundamental theorem: ∫_γ (1/z²) dz = F(i) - F(1) = -1/i - (-1/1) = -1/i + 1 = 1 + i (using 1/i = -i).'
  }
];
