import { WrittenExercise } from '../../../../core/types';

export const topic1Exercises: WrittenExercise[] = [
  {
    id: 'math401-t1-ex01',
    subjectId: 'math401',
    topicId: 'math401-topic-1',
    type: 'written',
    title: 'Computing Complex Number Operations',
    description: 'Compute (3 + 4i)(2 - i) and express in standard form a + bi.',
    difficulty: 1,
    hints: [
      'Use the distributive property (FOIL)',
      'Remember that i² = -1',
      'Combine real and imaginary parts separately'
    ],
    solution: '(3 + 4i)(2 - i) = 6 - 3i + 8i - 4i² = 6 + 5i - 4(-1) = 6 + 5i + 4 = 10 + 5i'
  },
  {
    id: 'math401-t1-ex02',
    subjectId: 'math401',
    topicId: 'math401-topic-1',
    type: 'written',
    title: 'Complex Division',
    description: 'Compute (3 + 4i)/(1 - 2i) and express in standard form.',
    difficulty: 2,
    hints: [
      'Multiply numerator and denominator by the conjugate of the denominator',
      'The conjugate of 1 - 2i is 1 + 2i',
      'Simplify using i² = -1'
    ],
    solution: '(3 + 4i)/(1 - 2i) = (3 + 4i)(1 + 2i)/[(1 - 2i)(1 + 2i)] = (3 + 6i + 4i + 8i²)/(1 + 4) = (3 + 10i - 8)/5 = (-5 + 10i)/5 = -1 + 2i'
  },
  {
    id: 'math401-t1-ex03',
    subjectId: 'math401',
    topicId: 'math401-topic-1',
    type: 'written',
    title: 'Modulus and Argument',
    description: 'Find the modulus and argument of z = -1 + i√3.',
    difficulty: 2,
    hints: [
      'Modulus: |z| = √(a² + b²)',
      'Argument: θ = arctan(b/a), but be careful about the quadrant',
      'This complex number is in the second quadrant'
    ],
    solution: 'Modulus: |z| = √((-1)² + (√3)²) = √(1 + 3) = 2. Argument: The point (-1, √3) is in the second quadrant. tan(θ) = √3/(-1) = -√3, so θ = 2π/3 (or 120°).'
  },
  {
    id: 'math401-t1-ex04',
    subjectId: 'math401',
    topicId: 'math401-topic-1',
    type: 'written',
    title: 'Polar Form Conversion',
    description: 'Express z = 1 + i in polar form re^(iθ).',
    difficulty: 2,
    hints: [
      'Find r = |z| = √(1² + 1²)',
      'Find θ using arctan(1/1)',
      'Express as z = re^(iθ)'
    ],
    solution: 'r = √(1² + 1²) = √2. θ = arctan(1/1) = π/4. Therefore z = √2 e^(iπ/4).'
  },
  {
    id: 'math401-t1-ex05',
    subjectId: 'math401',
    topicId: 'math401-topic-1',
    type: 'written',
    title: 'De Moivre\'s Theorem',
    description: 'Use De Moivre\'s theorem to compute (1 + i)^6.',
    difficulty: 3,
    hints: [
      'First convert 1 + i to polar form',
      'Apply De Moivre\'s theorem: (re^(iθ))^n = r^n e^(inθ)',
      'Convert back to standard form if needed'
    ],
    solution: '1 + i = √2 e^(iπ/4). Using De Moivre: (1 + i)^6 = (√2)^6 e^(i6π/4) = 8e^(i3π/2) = 8(cos(3π/2) + i sin(3π/2)) = 8(0 - i) = -8i'
  },
  {
    id: 'math401-t1-ex06',
    subjectId: 'math401',
    topicId: 'math401-topic-1',
    type: 'written',
    title: 'Finding Complex Roots',
    description: 'Find all cube roots of 8.',
    difficulty: 3,
    hints: [
      'Write 8 in polar form: 8 = 8e^(i0)',
      'Use the formula for nth roots: z_k = r^(1/n) e^(i(θ + 2πk)/n) for k = 0, 1, ..., n-1',
      'There should be 3 distinct roots'
    ],
    solution: '8 = 8e^(i0). Cube roots: z_k = 8^(1/3) e^(i2πk/3) for k = 0, 1, 2. z_0 = 2e^(i0) = 2, z_1 = 2e^(i2π/3) = 2(-1/2 + i√3/2) = -1 + i√3, z_2 = 2e^(i4π/3) = 2(-1/2 - i√3/2) = -1 - i√3'
  },
  {
    id: 'math401-t1-ex07',
    subjectId: 'math401',
    topicId: 'math401-topic-1',
    type: 'written',
    title: 'Fourth Roots of Unity',
    description: 'Find all fourth roots of unity and plot them in the complex plane.',
    difficulty: 2,
    hints: [
      'Fourth roots of 1 = e^(i0)',
      'Use z_k = e^(i2πk/4) for k = 0, 1, 2, 3',
      'They form a square on the unit circle'
    ],
    solution: 'Fourth roots of unity: z_k = e^(iπk/2) for k = 0, 1, 2, 3. z_0 = 1, z_1 = e^(iπ/2) = i, z_2 = e^(iπ) = -1, z_3 = e^(i3π/2) = -i. These form a square with vertices at 1, i, -1, -i on the unit circle.'
  },
  {
    id: 'math401-t1-ex08',
    subjectId: 'math401',
    topicId: 'math401-topic-1',
    type: 'written',
    title: 'Complex Conjugate Properties',
    description: 'Prove that for any complex numbers z and w, the conjugate of their product equals the product of their conjugates: z·w = z̄·w̄.',
    difficulty: 3,
    hints: [
      'Let z = a + bi and w = c + di',
      'Compute z·w first',
      'Then compute its conjugate and compare with z̄·w̄'
    ],
    solution: 'Let z = a + bi and w = c + di. Then z·w = (ac - bd) + i(ad + bc). So z·w = (ac - bd) - i(ad + bc). Now z̄ = a - bi and w̄ = c - di. Therefore z̄·w̄ = (ac - bd) - i(ad + bc). Thus z·w = z̄·w̄.'
  },
  {
    id: 'math401-t1-ex09',
    subjectId: 'math401',
    topicId: 'math401-topic-1',
    type: 'written',
    title: 'Open and Closed Sets',
    description: 'Determine whether the set S = {z : |z - 1| < 2} is open, closed, or neither in the complex plane.',
    difficulty: 2,
    hints: [
      'This set is an open disk centered at 1 with radius 2',
      'Check if boundary points are included (< vs ≤)',
      'An open disk is an open set'
    ],
    solution: 'S = {z : |z - 1| < 2} is the open disk of radius 2 centered at z = 1. Since the inequality is strict (<), the boundary circle |z - 1| = 2 is not included. Therefore S is an open set (and not closed).'
  },
  {
    id: 'math401-t1-ex10',
    subjectId: 'math401',
    topicId: 'math401-topic-1',
    type: 'written',
    title: 'Connected Sets',
    description: 'Show that the annulus A = {z : 1 < |z| < 2} is a connected domain.',
    difficulty: 3,
    hints: [
      'A domain is an open connected set',
      'First show it is open',
      'Then show any two points can be connected by a path in A'
    ],
    solution: 'The annulus A = {z : 1 < |z| < 2} is open because it can be written as the intersection of the open set {z : |z| < 2} with the complement of the closed set {z : |z| ≤ 1}. To show connectedness, take any two points z_1, z_2 in A. We can connect them by a path that goes along a circular arc at some radius r ∈ (1, 2), then radially to the other point. Since such a path exists for any pair of points, A is connected. Therefore A is a domain.'
  },
  {
    id: 'math401-t1-ex11',
    subjectId: 'math401',
    topicId: 'math401-topic-1',
    type: 'written',
    title: 'Euler\'s Formula Application',
    description: 'Use Euler\'s formula e^(iθ) = cos(θ) + i sin(θ) to derive the identity cos(2θ) = cos²(θ) - sin²(θ).',
    difficulty: 3,
    hints: [
      'Start with e^(i2θ) = (e^(iθ))²',
      'Expand both sides using Euler\'s formula',
      'Compare real parts'
    ],
    solution: 'e^(i2θ) = cos(2θ) + i sin(2θ). Also, (e^(iθ))² = (cos(θ) + i sin(θ))² = cos²(θ) + 2i cos(θ)sin(θ) - sin²(θ) = (cos²(θ) - sin²(θ)) + i(2sin(θ)cos(θ)). Comparing real parts: cos(2θ) = cos²(θ) - sin²(θ).'
  },
  {
    id: 'math401-t1-ex12',
    subjectId: 'math401',
    topicId: 'math401-topic-1',
    type: 'written',
    title: 'Complex Exponential',
    description: 'Compute e^(π i/2) and express in standard form.',
    difficulty: 1,
    hints: [
      'Use Euler\'s formula: e^(iθ) = cos(θ) + i sin(θ)',
      'θ = π/2',
      'Evaluate cos(π/2) and sin(π/2)'
    ],
    solution: 'e^(πi/2) = cos(π/2) + i sin(π/2) = 0 + i(1) = i'
  },
  {
    id: 'math401-t1-ex13',
    subjectId: 'math401',
    topicId: 'math401-topic-1',
    type: 'written',
    title: 'Stereographic Projection',
    description: 'Describe how the point z = i on the complex plane maps to the Riemann sphere under stereographic projection.',
    difficulty: 3,
    hints: [
      'Stereographic projection maps from the sphere to the plane',
      'The south pole maps to the origin',
      'Points on the unit circle map to the equator'
    ],
    solution: 'Under stereographic projection from the north pole, a point z in the complex plane corresponds to a point on the Riemann sphere. For z = i, which has modulus 1, the point lies on the unit circle, so it maps to a point on the equator of the sphere. Specifically, z = i corresponds to the point on the equator in the direction of the positive imaginary axis (y-direction).'
  },
  {
    id: 'math401-t1-ex14',
    subjectId: 'math401',
    topicId: 'math401-topic-1',
    type: 'written',
    title: 'Triangle Inequality',
    description: 'Prove the triangle inequality for complex numbers: |z + w| ≤ |z| + |w|.',
    difficulty: 4,
    hints: [
      'Square both sides to avoid absolute values',
      'Use |z|² = zz̄',
      'Show that Re(zw̄) ≤ |z||w| using Cauchy-Schwarz'
    ],
    solution: '|z + w|² = (z + w)(z̄ + w̄) = zz̄ + zw̄ + wz̄ + ww̄ = |z|² + |w|² + 2Re(zw̄). Since Re(zw̄) ≤ |zw̄| = |z||w|, we have |z + w|² ≤ |z|² + |w|² + 2|z||w| = (|z| + |w|)². Taking square roots: |z + w| ≤ |z| + |w|.'
  },
  {
    id: 'math401-t1-ex15',
    subjectId: 'math401',
    topicId: 'math401-topic-1',
    type: 'written',
    title: 'Solving Complex Equations',
    description: 'Solve the equation z² + 2z + 2 = 0 in the complex numbers.',
    difficulty: 2,
    hints: [
      'Use the quadratic formula',
      'The discriminant will be negative',
      'Simplify √(-4) = 2i'
    ],
    solution: 'Using the quadratic formula: z = (-2 ± √(4 - 8))/2 = (-2 ± √(-4))/2 = (-2 ± 2i)/2 = -1 ± i. The solutions are z = -1 + i and z = -1 - i.'
  },
  {
    id: 'math401-t1-ex16',
    subjectId: 'math401',
    topicId: 'math401-topic-1',
    type: 'written',
    title: 'Simply Connected Domains',
    description: 'Explain why the annulus {z : 1 < |z| < 2} is not simply connected.',
    difficulty: 3,
    hints: [
      'A domain is simply connected if every closed curve can be continuously shrunk to a point',
      'Consider a circle around the origin within the annulus',
      'Can this circle be shrunk to a point while staying in the domain?'
    ],
    solution: 'The annulus A = {z : 1 < |z| < 2} is not simply connected because it contains a "hole" (the region |z| ≤ 1). Consider the circle γ with |z| = 1.5, which lies entirely in A. This circle cannot be continuously shrunk to a point while remaining in A, because shrinking it would require passing through the hole |z| ≤ 1, which is not in A. Therefore A is not simply connected.'
  }
];
