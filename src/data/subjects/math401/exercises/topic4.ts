import { WrittenExercise } from '../../../../core/types';

export const topic4Exercises: WrittenExercise[] = [
  {
    id: 'math401-t4-ex01',
    subjectId: 'math401',
    topicId: 'math401-topic-4',
    type: 'written',
    title: 'Expected Value Calculation',
    description: 'Let X be a discrete random variable with P(X = -1) = 0.2, P(X = 0) = 0.5, P(X = 2) = 0.3. Find E[X].',
    difficulty: 1,
    hints: [
      'E[X] = Σ x · P(X = x)',
      'Multiply each value by its probability',
      'Sum all the products'
    ],
    solution: 'E[X] = (-1)(0.2) + (0)(0.5) + (2)(0.3) = -0.2 + 0 + 0.6 = 0.4'
  },
  {
    id: 'math401-t4-ex02',
    subjectId: 'math401',
    topicId: 'math401-topic-4',
    type: 'written',
    title: 'Variance and Standard Deviation',
    description: 'For the random variable in the previous problem, find Var(X) and σ_X.',
    difficulty: 2,
    hints: [
      'First compute E[X²] = Σ x² · P(X = x)',
      'Then use Var(X) = E[X²] - (E[X])²',
      'Standard deviation σ_X = √Var(X)'
    ],
    solution: 'E[X²] = (-1)²(0.2) + (0)²(0.5) + (2)²(0.3) = 0.2 + 0 + 1.2 = 1.4. Var(X) = E[X²] - (E[X])² = 1.4 - (0.4)² = 1.4 - 0.16 = 1.24. σ_X = √1.24 ≈ 1.114.'
  },
  {
    id: 'math401-t4-ex03',
    subjectId: 'math401',
    topicId: 'math401-topic-4',
    type: 'written',
    title: 'Continuous Expected Value',
    description: 'Let X have PDF f(x) = 3x² for 0 ≤ x ≤ 1. Find E[X].',
    difficulty: 2,
    hints: [
      'For continuous RV, E[X] = ∫ x · f(x) dx',
      'Integrate from 0 to 1',
      'Compute ∫₀¹ x · 3x² dx = ∫₀¹ 3x³ dx'
    ],
    solution: 'E[X] = ∫₀¹ x · 3x² dx = ∫₀¹ 3x³ dx = [3x⁴/4]₀¹ = 3/4.'
  },
  {
    id: 'math401-t4-ex04',
    subjectId: 'math401',
    topicId: 'math401-topic-4',
    type: 'written',
    title: 'Linearity of Expectation',
    description: 'If E[X] = 5 and E[Y] = 3, find E[2X - 3Y + 7].',
    difficulty: 1,
    hints: [
      'Use linearity: E[aX + bY + c] = aE[X] + bE[Y] + c',
      'This holds regardless of whether X and Y are independent',
      'Substitute the values'
    ],
    solution: 'E[2X - 3Y + 7] = 2E[X] - 3E[Y] + 7 = 2(5) - 3(3) + 7 = 10 - 9 + 7 = 8.'
  },
  {
    id: 'math401-t4-ex05',
    subjectId: 'math401',
    topicId: 'math401-topic-4',
    type: 'written',
    title: 'Variance Properties',
    description: 'If Var(X) = 4, find Var(3X - 2). Assume X is a random variable.',
    difficulty: 2,
    hints: [
      'Var(aX + b) = a²Var(X)',
      'Adding constants does not affect variance',
      'Scaling by a multiplies variance by a²'
    ],
    solution: 'Var(3X - 2) = Var(3X) = 3²Var(X) = 9(4) = 36. The constant -2 does not affect variance.'
  },
  {
    id: 'math401-t4-ex06',
    subjectId: 'math401',
    topicId: 'math401-topic-4',
    type: 'written',
    title: 'Uniform Distribution Moments',
    description: 'For X ~ Uniform(a, b), derive formulas for E[X] and Var(X).',
    difficulty: 3,
    hints: [
      'PDF is f(x) = 1/(b-a) for a ≤ x ≤ b',
      'E[X] = ∫ₐᵇ x/(b-a) dx',
      'E[X²] = ∫ₐᵇ x²/(b-a) dx, then use Var(X) = E[X²] - (E[X])²'
    ],
    solution: 'E[X] = ∫ₐᵇ x/(b-a) dx = (1/(b-a))[x²/2]ₐᵇ = (b²-a²)/(2(b-a)) = (b+a)/2. E[X²] = ∫ₐᵇ x²/(b-a) dx = (1/(b-a))[x³/3]ₐᵇ = (b³-a³)/(3(b-a)) = (b²+ab+a²)/3. Var(X) = (b²+ab+a²)/3 - ((b+a)/2)² = (b²+ab+a²)/3 - (b²+2ab+a²)/4 = (4b²+4ab+4a²-3b²-6ab-3a²)/12 = (b²-2ab+a²)/12 = (b-a)²/12.'
  },
  {
    id: 'math401-t4-ex07',
    subjectId: 'math401',
    topicId: 'math401-topic-4',
    type: 'written',
    title: 'Exponential Distribution Mean',
    description: 'Show that if X ~ Exponential(λ), then E[X] = 1/λ.',
    difficulty: 3,
    hints: [
      'E[X] = ∫₀^∞ x · λe^(-λx) dx',
      'Use integration by parts: u = x, dv = λe^(-λx)dx',
      'Or recognize this as the Gamma function Γ(2)/λ²'
    ],
    solution: 'E[X] = ∫₀^∞ xλe^(-λx) dx. Using integration by parts with u = x, dv = λe^(-λx)dx: du = dx, v = -e^(-λx). E[X] = [-xe^(-λx)]₀^∞ + ∫₀^∞ e^(-λx) dx = 0 + [-e^(-λx)/λ]₀^∞ = 1/λ.'
  },
  {
    id: 'math401-t4-ex08',
    subjectId: 'math401',
    topicId: 'math401-topic-4',
    type: 'written',
    title: 'Moment Generating Function',
    description: 'Find the MGF M_X(t) = E[e^(tX)] for X ~ Exponential(λ) and use it to find E[X].',
    difficulty: 4,
    hints: [
      'M_X(t) = ∫₀^∞ e^(tx) · λe^(-λx) dx',
      'Combine exponents and integrate',
      'E[X] = M\'_X(0), the derivative of MGF at t=0'
    ],
    solution: 'M_X(t) = ∫₀^∞ λe^(tx-λx) dx = ∫₀^∞ λe^((t-λ)x) dx = λ[e^((t-λ)x)/(t-λ)]₀^∞ = λ/(λ-t) for t < λ. M\'_X(t) = λ/(λ-t)². E[X] = M\'_X(0) = λ/λ² = 1/λ.'
  },
  {
    id: 'math401-t4-ex09',
    subjectId: 'math401',
    topicId: 'math401-topic-4',
    type: 'written',
    title: 'Covariance Calculation',
    description: 'Let X and Y be random variables with E[X] = 2, E[Y] = 3, E[XY] = 7. Find Cov(X,Y).',
    difficulty: 2,
    hints: [
      'Cov(X,Y) = E[XY] - E[X]E[Y]',
      'Substitute the given values',
      'Positive covariance means X and Y tend to increase together'
    ],
    solution: 'Cov(X,Y) = E[XY] - E[X]E[Y] = 7 - (2)(3) = 7 - 6 = 1.'
  },
  {
    id: 'math401-t4-ex10',
    subjectId: 'math401',
    topicId: 'math401-topic-4',
    type: 'written',
    title: 'Variance of Sum',
    description: 'If X and Y are independent with Var(X) = 4 and Var(Y) = 9, find Var(X + Y) and Var(X - Y).',
    difficulty: 2,
    hints: [
      'For independent variables: Var(X + Y) = Var(X) + Var(Y)',
      'Also: Var(X - Y) = Var(X) + Var(-Y) = Var(X) + Var(Y)',
      'Var(-Y) = (-1)²Var(Y) = Var(Y)'
    ],
    solution: 'Since X and Y are independent, Cov(X,Y) = 0. Var(X + Y) = Var(X) + Var(Y) + 2Cov(X,Y) = 4 + 9 + 0 = 13. Var(X - Y) = Var(X) + Var(-Y) = Var(X) + Var(Y) = 4 + 9 = 13.'
  }
];
