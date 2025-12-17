import { WrittenExercise } from '../../../../core/types';

export const topic6Exercises: WrittenExercise[] = [
  {
    id: 'math401-t6-ex01',
    subjectId: 'math401',
    topicId: 'math401-topic-6',
    type: 'written',
    title: 'Joint PMF',
    description: 'Let (X,Y) have joint PMF: P(X=0,Y=0)=0.2, P(X=0,Y=1)=0.1, P(X=1,Y=0)=0.3, P(X=1,Y=1)=0.4. Find P(X=0).',
    difficulty: 1,
    hints: [
      'Marginal probability P(X=0) is the sum over all y values',
      'P(X=0) = P(X=0,Y=0) + P(X=0,Y=1)',
      'Sum the probabilities where X=0'
    ],
    solution: 'P(X=0) = P(X=0,Y=0) + P(X=0,Y=1) = 0.2 + 0.1 = 0.3.'
  },
  {
    id: 'math401-t6-ex02',
    subjectId: 'math401',
    topicId: 'math401-topic-6',
    type: 'written',
    title: 'Independence Test',
    description: 'Using the joint PMF from the previous problem, determine if X and Y are independent.',
    difficulty: 2,
    hints: [
      'X and Y are independent if P(X=x,Y=y) = P(X=x)P(Y=y) for all x,y',
      'Find marginal P(X=0), P(Y=0), P(X=1), P(Y=1)',
      'Check if any joint probability fails the independence test'
    ],
    solution: 'P(X=0)=0.3, P(X=1)=0.7, P(Y=0)=0.5, P(Y=1)=0.5. Check: P(X=0,Y=0) = 0.2, but P(X=0)P(Y=0) = 0.3·0.5 = 0.15. Since 0.2 ≠ 0.15, X and Y are NOT independent.'
  },
  {
    id: 'math401-t6-ex03',
    subjectId: 'math401',
    topicId: 'math401-topic-6',
    type: 'written',
    title: 'Joint PDF Integration',
    description: 'Let (X,Y) have joint PDF f(x,y) = 6xy for 0 ≤ x ≤ 1, 0 ≤ y ≤ 1, and 0 otherwise. Find P(X + Y ≤ 1).',
    difficulty: 3,
    hints: [
      'Integrate over the region where x + y ≤ 1',
      'Set up the integral: ∫∫_R 6xy dA',
      'The region is a triangle with vertices (0,0), (1,0), (0,1)'
    ],
    solution: 'P(X + Y ≤ 1) = ∫₀¹ ∫₀^(1-x) 6xy dy dx = ∫₀¹ 6x[y²/2]₀^(1-x) dx = ∫₀¹ 3x(1-x)² dx = ∫₀¹ 3x(1-2x+x²) dx = ∫₀¹ (3x-6x²+3x³) dx = [3x²/2 - 2x³ + 3x⁴/4]₀¹ = 3/2 - 2 + 3/4 = 1/4.'
  },
  {
    id: 'math401-t6-ex04',
    subjectId: 'math401',
    topicId: 'math401-topic-6',
    type: 'written',
    title: 'Marginal PDF',
    description: 'For the joint PDF f(x,y) = 6xy on [0,1]×[0,1], find the marginal PDF f_X(x).',
    difficulty: 2,
    hints: [
      'f_X(x) = ∫_{-∞}^∞ f(x,y) dy',
      'For this problem, integrate from 0 to 1',
      'f_X(x) = ∫₀¹ 6xy dy'
    ],
    solution: 'f_X(x) = ∫₀¹ 6xy dy = 6x[y²/2]₀¹ = 3x for 0 ≤ x ≤ 1, and 0 otherwise.'
  },
  {
    id: 'math401-t6-ex05',
    subjectId: 'math401',
    topicId: 'math401-topic-6',
    type: 'written',
    title: 'Conditional Distribution',
    description: 'Given the joint PDF f(x,y) = 6xy on [0,1]×[0,1], find the conditional PDF f_{Y|X}(y|x=0.5).',
    difficulty: 3,
    hints: [
      'f_{Y|X}(y|x) = f(x,y)/f_X(x)',
      'From previous problem, f_X(0.5) = 3(0.5) = 1.5',
      'f_{Y|X}(y|0.5) = 6(0.5)y / 1.5'
    ],
    solution: 'f_{Y|X}(y|0.5) = f(0.5,y)/f_X(0.5) = 6(0.5)y / 3(0.5) = 3y / 1.5 = 2y for 0 ≤ y ≤ 1.'
  },
  {
    id: 'math401-t6-ex06',
    subjectId: 'math401',
    topicId: 'math401-topic-6',
    type: 'written',
    title: 'Expected Value of Function',
    description: 'If (X,Y) has joint PMF P(0,0)=0.2, P(0,1)=0.3, P(1,0)=0.4, P(1,1)=0.1, find E[XY].',
    difficulty: 2,
    hints: [
      'E[g(X,Y)] = Σₓ Σᵧ g(x,y)P(X=x,Y=y)',
      'Here g(x,y) = xy',
      'Only the (1,1) term contributes'
    ],
    solution: 'E[XY] = (0)(0)(0.2) + (0)(1)(0.3) + (1)(0)(0.4) + (1)(1)(0.1) = 0 + 0 + 0 + 0.1 = 0.1.'
  },
  {
    id: 'math401-t6-ex07',
    subjectId: 'math401',
    topicId: 'math401-topic-6',
    type: 'written',
    title: 'Correlation Coefficient',
    description: 'For random variables X and Y with Var(X)=4, Var(Y)=9, Cov(X,Y)=3, find the correlation ρ(X,Y).',
    difficulty: 2,
    hints: [
      'ρ(X,Y) = Cov(X,Y)/(σ_X σ_Y)',
      'σ_X = √Var(X) = 2',
      'σ_Y = √Var(Y) = 3'
    ],
    solution: 'ρ(X,Y) = Cov(X,Y)/(σ_X σ_Y) = 3/(2·3) = 3/6 = 0.5. This indicates positive correlation.'
  },
  {
    id: 'math401-t6-ex08',
    subjectId: 'math401',
    topicId: 'math401-topic-6',
    type: 'written',
    title: 'Bivariate Normal',
    description: 'If (X,Y) ~ Bivariate Normal with ρ=0, what can you conclude about X and Y?',
    difficulty: 2,
    hints: [
      'For bivariate normal, ρ=0 implies independence',
      'This is special to the normal distribution',
      'Uncorrelated does not imply independent in general'
    ],
    solution: 'For bivariate normal distributions, ρ=0 (uncorrelated) implies that X and Y are independent. This is a special property of the multivariate normal distribution. In general, uncorrelated does not imply independent, but it does for jointly normal random variables.'
  },
  {
    id: 'math401-t6-ex09',
    subjectId: 'math401',
    topicId: 'math401-topic-6',
    type: 'written',
    title: 'Convolution Formula',
    description: 'If X and Y are independent, derive the PDF of Z = X + Y in terms of f_X and f_Y.',
    difficulty: 4,
    hints: [
      'Use f_Z(z) = ∫_{-∞}^∞ f_X(x)f_Y(z-x) dx',
      'This is called the convolution of f_X and f_Y',
      'Denoted f_Z = f_X * f_Y'
    ],
    solution: 'For independent X and Y, the PDF of Z = X + Y is given by the convolution: f_Z(z) = ∫_{-∞}^∞ f_X(x)f_Y(z-x) dx = (f_X * f_Y)(z). This can be derived by computing P(Z ≤ z) = ∫∫_{x+y≤z} f(x,y) dx dy and differentiating with respect to z.'
  },
  {
    id: 'math401-t6-ex10',
    subjectId: 'math401',
    topicId: 'math401-topic-6',
    type: 'written',
    title: 'Sum of Independent Normals',
    description: 'If X ~ N(μ₁, σ₁²) and Y ~ N(μ₂, σ₂²) are independent, find the distribution of Z = X + Y.',
    difficulty: 2,
    hints: [
      'The sum of independent normals is normal',
      'E[X + Y] = E[X] + E[Y]',
      'Var(X + Y) = Var(X) + Var(Y) for independent variables'
    ],
    solution: 'Z = X + Y ~ N(μ₁ + μ₂, σ₁² + σ₂²). The sum of independent normal random variables is normal with mean equal to the sum of means and variance equal to the sum of variances.'
  }
];
