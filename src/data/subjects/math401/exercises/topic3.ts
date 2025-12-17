import { WrittenExercise } from '../../../../core/types';

export const topic3Exercises: WrittenExercise[] = [
  {
    id: 'math401-t3-ex01',
    subjectId: 'math401',
    topicId: 'math401-topic-3',
    type: 'written',
    title: 'Discrete Random Variable Probability',
    description: 'Let X be a discrete random variable with PMF P(X = 1) = 0.3, P(X = 2) = 0.5, P(X = 3) = 0.2. Find P(X ≤ 2).',
    difficulty: 1,
    hints: [
      'P(X ≤ 2) means the probability that X takes values 1 or 2',
      'Add the individual probabilities',
      'Use P(X ≤ 2) = P(X = 1) + P(X = 2)'
    ],
    solution: 'P(X ≤ 2) = P(X = 1) + P(X = 2) = 0.3 + 0.5 = 0.8'
  },
  {
    id: 'math401-t3-ex02',
    subjectId: 'math401',
    topicId: 'math401-topic-3',
    type: 'written',
    title: 'CDF from PMF',
    description: 'For the random variable X with PMF P(X = 0) = 0.2, P(X = 1) = 0.5, P(X = 2) = 0.3, find the cumulative distribution function F(x) for all x.',
    difficulty: 2,
    hints: [
      'CDF F(x) = P(X ≤ x)',
      'Define F(x) piecewise for different ranges',
      'F(x) is 0 before the first value, and 1 after the last value'
    ],
    solution: 'F(x) = 0 for x < 0; F(x) = 0.2 for 0 ≤ x < 1; F(x) = 0.7 for 1 ≤ x < 2; F(x) = 1 for x ≥ 2. This is a step function that jumps at each value in the support of X.'
  },
  {
    id: 'math401-t3-ex03',
    subjectId: 'math401',
    topicId: 'math401-topic-3',
    type: 'written',
    title: 'Continuous Random Variable PDF',
    description: 'Let X have PDF f(x) = 2x for 0 ≤ x ≤ 1, and 0 otherwise. Verify this is a valid PDF and find P(1/4 ≤ X ≤ 3/4).',
    difficulty: 2,
    hints: [
      'A valid PDF must integrate to 1',
      'Compute ∫₀¹ 2x dx',
      'For P(a ≤ X ≤ b), integrate the PDF from a to b'
    ],
    solution: '∫₀¹ 2x dx = [x²]₀¹ = 1, so it is a valid PDF. P(1/4 ≤ X ≤ 3/4) = ∫₁/₄³/⁴ 2x dx = [x²]₁/₄³/⁴ = 9/16 - 1/16 = 8/16 = 1/2.'
  },
  {
    id: 'math401-t3-ex04',
    subjectId: 'math401',
    topicId: 'math401-topic-3',
    type: 'written',
    title: 'Finding PDF from CDF',
    description: 'If X has CDF F(x) = x² for 0 ≤ x ≤ 1 (and 0 for x < 0, 1 for x > 1), find the PDF f(x).',
    difficulty: 2,
    hints: [
      'The PDF is the derivative of the CDF',
      'f(x) = dF/dx',
      'Take the derivative only where F is differentiable'
    ],
    solution: 'f(x) = dF/dx = d/dx(x²) = 2x for 0 ≤ x ≤ 1, and f(x) = 0 elsewhere. This matches the triangular distribution on [0,1].'
  },
  {
    id: 'math401-t3-ex05',
    subjectId: 'math401',
    topicId: 'math401-topic-3',
    type: 'written',
    title: 'Uniform Distribution Properties',
    description: 'Let X ~ Uniform(0, 4). Find P(X > 2) and the median of X.',
    difficulty: 2,
    hints: [
      'For Uniform(a,b), the PDF is f(x) = 1/(b-a) for a ≤ x ≤ b',
      'P(X > 2) is the area under the PDF from 2 to 4',
      'The median m satisfies P(X ≤ m) = 1/2'
    ],
    solution: 'For Uniform(0,4), f(x) = 1/4 for 0 ≤ x ≤ 4. P(X > 2) = ∫₂⁴ (1/4)dx = (1/4)(4-2) = 1/2. For the median, we need F(m) = m/4 = 1/2, so m = 2. The median is 2.'
  },
  {
    id: 'math401-t3-ex06',
    subjectId: 'math401',
    topicId: 'math401-topic-3',
    type: 'written',
    title: 'Transformation of Random Variables',
    description: 'If X ~ Uniform(0,1), find the PDF of Y = X².',
    difficulty: 3,
    hints: [
      'Use the transformation formula: f_Y(y) = f_X(x)|dx/dy|',
      'First solve y = x² for x in terms of y',
      'Find the range of Y'
    ],
    solution: 'For 0 ≤ x ≤ 1, we have 0 ≤ y ≤ 1. From y = x², we get x = √y (taking positive root). dx/dy = 1/(2√y). Since X ~ Uniform(0,1), f_X(x) = 1. Therefore f_Y(y) = f_X(√y)|dx/dy| = 1 · 1/(2√y) = 1/(2√y) for 0 < y < 1, and 0 otherwise.'
  },
  {
    id: 'math401-t3-ex07',
    subjectId: 'math401',
    topicId: 'math401-topic-3',
    type: 'written',
    title: 'Exponential Distribution',
    description: 'Let X ~ Exponential(λ = 2). Find P(X > 1) and the CDF F(x).',
    difficulty: 2,
    hints: [
      'Exponential PDF: f(x) = λe^(-λx) for x ≥ 0',
      'CDF: F(x) = 1 - e^(-λx) for x ≥ 0',
      'P(X > 1) = 1 - F(1)'
    ],
    solution: 'For Exponential(λ=2), F(x) = 1 - e^(-2x) for x ≥ 0. P(X > 1) = 1 - F(1) = 1 - (1 - e^(-2)) = e^(-2) ≈ 0.1353. Alternatively, P(X > 1) = ∫₁^∞ 2e^(-2x)dx = [-e^(-2x)]₁^∞ = e^(-2).'
  },
  {
    id: 'math401-t3-ex08',
    subjectId: 'math401',
    topicId: 'math401-topic-3',
    type: 'written',
    title: 'Memoryless Property',
    description: 'Prove that the exponential distribution has the memoryless property: P(X > s+t | X > s) = P(X > t).',
    difficulty: 3,
    hints: [
      'Use conditional probability: P(A|B) = P(A ∩ B)/P(B)',
      'X > s+t and X > s implies X > s+t',
      'Use P(X > x) = e^(-λx) for exponential'
    ],
    solution: 'P(X > s+t | X > s) = P(X > s+t ∩ X > s)/P(X > s) = P(X > s+t)/P(X > s) = e^(-λ(s+t))/e^(-λs) = e^(-λt) = P(X > t). This shows the exponential distribution is memoryless.'
  },
  {
    id: 'math401-t3-ex09',
    subjectId: 'math401',
    topicId: 'math401-topic-3',
    type: 'written',
    title: 'Quantile Function',
    description: 'For X ~ Exponential(λ), find the median (50th percentile) in terms of λ.',
    difficulty: 2,
    hints: [
      'The median m satisfies F(m) = 0.5',
      'Use F(x) = 1 - e^(-λx)',
      'Solve 1 - e^(-λm) = 0.5'
    ],
    solution: 'Setting F(m) = 0.5: 1 - e^(-λm) = 0.5. So e^(-λm) = 0.5. Taking natural log: -λm = ln(0.5) = -ln(2). Therefore m = ln(2)/λ. For λ = 1, the median is ln(2) ≈ 0.693.'
  },
  {
    id: 'math401-t3-ex10',
    subjectId: 'math401',
    topicId: 'math401-topic-3',
    type: 'written',
    title: 'Mixed Random Variable',
    description: 'A random variable X has P(X = 0) = 0.3, and for x > 0, has PDF f(x) = 0.7e^(-x). Find P(X ≤ 1).',
    difficulty: 3,
    hints: [
      'This is a mixed distribution with a point mass at 0',
      'P(X ≤ 1) = P(X = 0) + P(0 < X ≤ 1)',
      'Integrate the continuous part'
    ],
    solution: 'P(X ≤ 1) = P(X = 0) + P(0 < X ≤ 1) = 0.3 + ∫₀¹ 0.7e^(-x)dx = 0.3 + 0.7[-e^(-x)]₀¹ = 0.3 + 0.7(1 - e^(-1)) = 0.3 + 0.7(1 - 0.368) = 0.3 + 0.443 = 0.743.'
  }
];
