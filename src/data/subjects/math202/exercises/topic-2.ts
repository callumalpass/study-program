import { WrittenExercise } from '../../../../core/types';

export const math202Topic2Exercises: WrittenExercise[] = [
  {
    id: 'math202-t2-ex01',
    subjectId: 'math202',
    topicId: 'math202-2',
    type: 'written',
    title: 'Discrete Random Variable PMF',
    description: 'A discrete random variable X has the probability distribution: P(X=0)=0.1, P(X=1)=0.3, P(X=2)=0.4, P(X=3)=0.2. Verify this is a valid PMF and find P(X ≥ 2).',
    difficulty: 1,
    hints: [
      'For a valid PMF, all probabilities must be non-negative and sum to 1',
      'P(X ≥ 2) = P(X=2) + P(X=3)'
    ],
    solution: 'Check validity: All probabilities are ≥ 0\nSum: 0.1 + 0.3 + 0.4 + 0.2 = 1.0 ✓\nThis is a valid PMF.\n\nP(X ≥ 2) = P(X=2) + P(X=3) = 0.4 + 0.2 = 0.6'
  },
  {
    id: 'math202-t2-ex02',
    subjectId: 'math202',
    topicId: 'math202-2',
    type: 'written',
    title: 'Expected Value Calculation',
    description: 'For the random variable X with distribution: P(X=-1)=0.2, P(X=0)=0.5, P(X=2)=0.3, calculate E[X] and E[X²].',
    difficulty: 2,
    hints: [
      'E[X] = Σ x·P(X=x)',
      'E[X²] = Σ x²·P(X=x)'
    ],
    solution: 'E[X] = (-1)(0.2) + (0)(0.5) + (2)(0.3)\n= -0.2 + 0 + 0.6 = 0.4\n\nE[X²] = (-1)²(0.2) + (0)²(0.5) + (2)²(0.3)\n= 1(0.2) + 0 + 4(0.3)\n= 0.2 + 0 + 1.2 = 1.4'
  },
  {
    id: 'math202-t2-ex03',
    subjectId: 'math202',
    topicId: 'math202-2',
    type: 'written',
    title: 'Variance Calculation',
    description: 'Given E[X] = 3 and E[X²] = 11, find Var(X) and the standard deviation σ.',
    difficulty: 2,
    hints: [
      'Var(X) = E[X²] - (E[X])²',
      'σ = √Var(X)'
    ],
    solution: 'Var(X) = E[X²] - (E[X])²\n= 11 - 3²\n= 11 - 9 = 2\n\nStandard deviation σ = √Var(X) = √2 ≈ 1.414'
  },
  {
    id: 'math202-t2-ex04',
    subjectId: 'math202',
    topicId: 'math202-2',
    type: 'written',
    title: 'Linear Transformation of Random Variables',
    description: 'If X has E[X] = 10 and Var(X) = 4, find E[Y] and Var(Y) where Y = 3X + 5.',
    difficulty: 2,
    hints: [
      'E[aX + b] = aE[X] + b',
      'Var(aX + b) = a²Var(X)'
    ],
    solution: 'E[Y] = E[3X + 5] = 3E[X] + 5 = 3(10) + 5 = 35\n\nVar(Y) = Var(3X + 5) = 3²Var(X) = 9(4) = 36'
  },
  {
    id: 'math202-t2-ex05',
    subjectId: 'math202',
    topicId: 'math202-2',
    type: 'written',
    title: 'PDF Integration',
    description: 'A continuous random variable X has PDF f(x) = 2x for 0 ≤ x ≤ 1, and 0 otherwise. Find P(X ≤ 0.5).',
    difficulty: 2,
    hints: [
      'P(X ≤ a) = ∫₀ᵃ f(x)dx',
      'Integrate 2x from 0 to 0.5'
    ],
    solution: 'P(X ≤ 0.5) = ∫₀^0.5 2x dx\n= [x²]₀^0.5\n= (0.5)² - 0²\n= 0.25'
  },
  {
    id: 'math202-t2-ex06',
    subjectId: 'math202',
    topicId: 'math202-2',
    type: 'written',
    title: 'CDF from PDF',
    description: 'For the PDF f(x) = 3x² for 0 ≤ x ≤ 1, find the cumulative distribution function F(x).',
    difficulty: 3,
    hints: [
      'F(x) = ∫₋∞ˣ f(t)dt',
      'For 0 ≤ x ≤ 1: F(x) = ∫₀ˣ 3t²dt'
    ],
    solution: 'For x < 0: F(x) = 0\nFor 0 ≤ x ≤ 1: F(x) = ∫₀ˣ 3t²dt = [t³]₀ˣ = x³\nFor x > 1: F(x) = 1\n\nTherefore: F(x) = {\n  0,   if x < 0\n  x³,  if 0 ≤ x ≤ 1\n  1,   if x > 1\n}'
  },
  {
    id: 'math202-t2-ex07',
    subjectId: 'math202',
    topicId: 'math202-2',
    type: 'written',
    title: 'Expected Value of Continuous RV',
    description: 'For X with PDF f(x) = 2x for 0 ≤ x ≤ 1, calculate E[X].',
    difficulty: 2,
    hints: [
      'E[X] = ∫₋∞^∞ x·f(x)dx',
      'E[X] = ∫₀¹ x·2x dx = ∫₀¹ 2x² dx'
    ],
    solution: 'E[X] = ∫₀¹ x·2x dx = ∫₀¹ 2x² dx\n= [2x³/3]₀¹\n= 2/3 - 0 = 2/3 ≈ 0.667'
  },
  {
    id: 'math202-t2-ex08',
    subjectId: 'math202',
    topicId: 'math202-2',
    type: 'written',
    title: 'Variance of Continuous RV',
    description: 'For X with PDF f(x) = 2x on [0,1], we found E[X] = 2/3. Find Var(X).',
    difficulty: 3,
    hints: [
      'First find E[X²] = ∫₀¹ x²·2x dx',
      'Then Var(X) = E[X²] - (E[X])²'
    ],
    solution: 'E[X²] = ∫₀¹ x²·2x dx = ∫₀¹ 2x³ dx\n= [2x⁴/4]₀¹ = [x⁴/2]₀¹ = 1/2\n\nVar(X) = E[X²] - (E[X])²\n= 1/2 - (2/3)²\n= 1/2 - 4/9\n= 9/18 - 8/18 = 1/18 ≈ 0.056'
  },
  {
    id: 'math202-t2-ex09',
    subjectId: 'math202',
    topicId: 'math202-2',
    type: 'written',
    title: 'Moment Generating Function',
    description: 'For a discrete random variable X with P(X=0)=0.5, P(X=1)=0.5, find the MGF M(t) = E[eᵗˣ].',
    difficulty: 3,
    hints: [
      'M(t) = Σ eᵗˣ P(X=x)',
      'Sum over all possible values of X'
    ],
    solution: 'M(t) = E[eᵗˣ] = Σ eᵗˣ P(X=x)\n= e^(t·0) P(X=0) + e^(t·1) P(X=1)\n= e⁰(0.5) + eᵗ(0.5)\n= 0.5 + 0.5eᵗ\n= 0.5(1 + eᵗ)'
  },
  {
    id: 'math202-t2-ex10',
    subjectId: 'math202',
    topicId: 'math202-2',
    type: 'written',
    title: 'MGF and Moments',
    description: 'Given MGF M(t) = eᵗ + 2e²ᵗ / 3, find E[X] using the MGF.',
    difficulty: 3,
    hints: [
      'E[X] = M\'(0), the first derivative evaluated at t=0',
      'First find M\'(t), then evaluate at t=0'
    ],
    solution: 'M(t) = (1/3)eᵗ + (2/3)e²ᵗ\n\nM\'(t) = (1/3)eᵗ + (2/3)·2e²ᵗ = (1/3)eᵗ + (4/3)e²ᵗ\n\nE[X] = M\'(0) = (1/3)e⁰ + (4/3)e⁰\n= 1/3 + 4/3 = 5/3 ≈ 1.667'
  },
  {
    id: 'math202-t2-ex11',
    subjectId: 'math202',
    topicId: 'math202-2',
    type: 'written',
    title: 'Transformation of Random Variables',
    description: 'If X is uniformly distributed on [0, 2], find the PDF of Y = X².',
    difficulty: 4,
    hints: [
      'For X ~ U(0,2), f_X(x) = 1/2 for 0 ≤ x ≤ 2',
      'Use the transformation method: if y = g(x), then f_Y(y) = f_X(x)|dx/dy|',
      'From y = x², we get x = √y and dx/dy = 1/(2√y)'
    ],
    solution: 'X ~ U(0,2), so f_X(x) = 1/2 for 0 ≤ x ≤ 2\n\nFor Y = X², the range is 0 ≤ y ≤ 4\nFrom y = x², x = √y (taking positive root since x ≥ 0)\ndx/dy = 1/(2√y)\n\nf_Y(y) = f_X(√y)|dx/dy|\n= (1/2) · (1/(2√y))\n= 1/(4√y) for 0 ≤ y ≤ 4'
  },
  {
    id: 'math202-t2-ex12',
    subjectId: 'math202',
    topicId: 'math202-2',
    type: 'written',
    title: 'Median of a Distribution',
    description: 'For a random variable X with CDF F(x) = x² for 0 ≤ x ≤ 1, find the median.',
    difficulty: 2,
    hints: [
      'The median m satisfies F(m) = 0.5',
      'Solve m² = 0.5'
    ],
    solution: 'The median m satisfies F(m) = 0.5\nm² = 0.5\nm = √0.5 = 1/√2 = √2/2 ≈ 0.707'
  },
  {
    id: 'math202-t2-ex13',
    subjectId: 'math202',
    topicId: 'math202-2',
    type: 'written',
    title: 'Properties of Expectation',
    description: 'If X and Y are independent random variables with E[X] = 3, E[Y] = 5, Var(X) = 2, Var(Y) = 4, find E[2X + 3Y] and Var(2X + 3Y).',
    difficulty: 3,
    hints: [
      'E[aX + bY] = aE[X] + bE[Y]',
      'For independent X and Y: Var(aX + bY) = a²Var(X) + b²Var(Y)'
    ],
    solution: 'E[2X + 3Y] = 2E[X] + 3E[Y]\n= 2(3) + 3(5) = 6 + 15 = 21\n\nSince X and Y are independent:\nVar(2X + 3Y) = 2²Var(X) + 3²Var(Y)\n= 4(2) + 9(4)\n= 8 + 36 = 44'
  },
  {
    id: 'math202-t2-ex14',
    subjectId: 'math202',
    topicId: 'math202-2',
    type: 'written',
    title: 'Chebyshev\'s Inequality',
    description: 'A random variable X has mean μ = 50 and standard deviation σ = 5. Use Chebyshev\'s inequality to find a lower bound on P(40 < X < 60).',
    difficulty: 3,
    hints: [
      'Chebyshev\'s inequality: P(|X - μ| ≥ kσ) ≤ 1/k²',
      'Equivalently: P(|X - μ| < kσ) ≥ 1 - 1/k²',
      'Find k such that kσ = 10'
    ],
    solution: 'We want P(40 < X < 60) = P(|X - 50| < 10)\n\nSince σ = 5, we need kσ = 10, so k = 2\n\nBy Chebyshev\'s inequality:\nP(|X - μ| < kσ) ≥ 1 - 1/k²\nP(|X - 50| < 10) ≥ 1 - 1/4 = 3/4 = 0.75\n\nTherefore, P(40 < X < 60) ≥ 0.75 or 75%'
  },
  {
    id: 'math202-t2-ex15',
    subjectId: 'math202',
    topicId: 'math202-2',
    type: 'written',
    title: 'Quantile Function',
    description: 'For X with CDF F(x) = 1 - e^(-λx) for x ≥ 0 (exponential distribution), find the 75th percentile.',
    difficulty: 3,
    hints: [
      'The pth percentile q_p satisfies F(q_p) = p',
      'Solve 1 - e^(-λq) = 0.75',
      'Assume λ = 1 for simplicity'
    ],
    solution: 'For the 75th percentile, solve F(q) = 0.75\n1 - e^(-λq) = 0.75\ne^(-λq) = 0.25\n-λq = ln(0.25)\nq = -ln(0.25)/λ\n\nWith λ = 1:\nq = -ln(0.25) = ln(4) ≈ 1.386'
  },
  {
    id: 'math202-t2-ex16',
    subjectId: 'math202',
    topicId: 'math202-2',
    type: 'written',
    title: 'Joint Distributions',
    description: 'Two independent random variables X and Y both have E[X] = E[Y] = 0 and Var(X) = Var(Y) = 1. Find E[XY] and Var(X - Y).',
    difficulty: 3,
    hints: [
      'For independent X and Y: E[XY] = E[X]E[Y]',
      'Var(X - Y) = Var(X) + Var(-Y) = Var(X) + Var(Y)'
    ],
    solution: 'E[XY] = E[X]E[Y] (by independence)\n= 0 · 0 = 0\n\nVar(X - Y) = Var(X) + Var(-Y) (by independence)\n= Var(X) + (-1)²Var(Y)\n= 1 + 1 = 2'
  }
];
