import { WrittenExercise } from '../../../../core/types';

export const topic5Exercises: WrittenExercise[] = [
  {
    id: 'math401-t5-ex01',
    subjectId: 'math401',
    topicId: 'math401-topic-5',
    type: 'written',
    title: 'Bernoulli Distribution',
    description: 'A coin has probability p = 0.6 of landing heads. Let X = 1 if heads, X = 0 if tails. Find E[X] and Var(X).',
    difficulty: 1,
    hints: [
      'This is a Bernoulli(p) distribution',
      'E[X] = p',
      'Var(X) = p(1-p)'
    ],
    solution: 'X ~ Bernoulli(0.6). E[X] = p = 0.6. Var(X) = p(1-p) = 0.6(0.4) = 0.24.'
  },
  {
    id: 'math401-t5-ex02',
    subjectId: 'math401',
    topicId: 'math401-topic-5',
    type: 'written',
    title: 'Binomial Distribution Probability',
    description: 'A fair coin is flipped 10 times. Find the probability of getting exactly 6 heads.',
    difficulty: 2,
    hints: [
      'Let X = number of heads, then X ~ Binomial(n=10, p=0.5)',
      'P(X = k) = C(n,k)p^k(1-p)^(n-k)',
      'Calculate C(10,6) = 10!/(6!4!) = 210'
    ],
    solution: 'X ~ Binomial(10, 0.5). P(X = 6) = C(10,6)(0.5)^6(0.5)^4 = 210(0.5)^10 = 210/1024 ≈ 0.205.'
  },
  {
    id: 'math401-t5-ex03',
    subjectId: 'math401',
    topicId: 'math401-topic-5',
    type: 'written',
    title: 'Binomial Mean and Variance',
    description: 'If X ~ Binomial(n, p), derive that E[X] = np.',
    difficulty: 3,
    hints: [
      'Think of X as the sum of n independent Bernoulli(p) trials',
      'Use linearity of expectation',
      'E[X] = E[X₁ + X₂ + ... + Xₙ]'
    ],
    solution: 'X = X₁ + X₂ + ... + Xₙ where each Xᵢ ~ Bernoulli(p) is independent. By linearity: E[X] = E[X₁] + ... + E[Xₙ] = p + p + ... + p (n times) = np.'
  },
  {
    id: 'math401-t5-ex04',
    subjectId: 'math401',
    topicId: 'math401-topic-5',
    type: 'written',
    title: 'Geometric Distribution',
    description: 'Roll a fair die repeatedly until you get a 6. Let X = number of rolls needed. Find P(X = 3) and E[X].',
    difficulty: 2,
    hints: [
      'X ~ Geometric(p) where p = 1/6',
      'P(X = k) = (1-p)^(k-1)p',
      'E[X] = 1/p'
    ],
    solution: 'X ~ Geometric(1/6). P(X = 3) = (5/6)²(1/6) = 25/216 ≈ 0.116. E[X] = 1/p = 1/(1/6) = 6 rolls on average.'
  },
  {
    id: 'math401-t5-ex05',
    subjectId: 'math401',
    topicId: 'math401-topic-5',
    type: 'written',
    title: 'Poisson Distribution',
    description: 'Emails arrive at rate λ = 3 per hour. Let X = number of emails in one hour. Find P(X = 5).',
    difficulty: 2,
    hints: [
      'X ~ Poisson(λ = 3)',
      'P(X = k) = e^(-λ)λ^k/k!',
      'Calculate e^(-3) · 3^5 / 5!'
    ],
    solution: 'X ~ Poisson(3). P(X = 5) = e^(-3) · 3^5 / 5! = e^(-3) · 243 / 120 ≈ 0.0498 · 2.025 ≈ 0.101.'
  },
  {
    id: 'math401-t5-ex06',
    subjectId: 'math401',
    topicId: 'math401-topic-5',
    type: 'written',
    title: 'Poisson Approximation to Binomial',
    description: 'A factory produces 1000 items, each with probability 0.002 of being defective. Approximate P(X ≤ 1) where X is the number of defectives.',
    difficulty: 3,
    hints: [
      'X ~ Binomial(1000, 0.002), but n is large and p is small',
      'Use Poisson approximation with λ = np',
      'P(X ≤ 1) = P(X = 0) + P(X = 1)'
    ],
    solution: 'λ = np = 1000(0.002) = 2. Approximate X ~ Poisson(2). P(X = 0) = e^(-2) · 2^0 / 0! = e^(-2) ≈ 0.135. P(X = 1) = e^(-2) · 2^1 / 1! = 2e^(-2) ≈ 0.271. P(X ≤ 1) ≈ 0.135 + 0.271 = 0.406.'
  },
  {
    id: 'math401-t5-ex07',
    subjectId: 'math401',
    topicId: 'math401-topic-5',
    type: 'written',
    title: 'Normal Distribution Standardization',
    description: 'If X ~ N(μ = 50, σ² = 25), find P(X > 60) using the standard normal table.',
    difficulty: 2,
    hints: [
      'Standardize: Z = (X - μ)/σ',
      'Convert X = 60 to a z-score',
      'Use P(X > 60) = P(Z > z)'
    ],
    solution: 'σ = √25 = 5. Z = (60 - 50)/5 = 2. P(X > 60) = P(Z > 2) = 1 - Φ(2) ≈ 1 - 0.9772 = 0.0228.'
  },
  {
    id: 'math401-t5-ex08',
    subjectId: 'math401',
    topicId: 'math401-topic-5',
    type: 'written',
    title: 'Normal Distribution Percentiles',
    description: 'For X ~ N(100, 225), find the 95th percentile.',
    difficulty: 2,
    hints: [
      'Find z₀.₉₅ such that Φ(z₀.₉₅) = 0.95',
      'From tables, z₀.₉₅ ≈ 1.645',
      'Transform back: x = μ + zσ'
    ],
    solution: 'σ = √225 = 15. From standard normal tables, z₀.₉₅ ≈ 1.645. The 95th percentile is x = 100 + 1.645(15) = 100 + 24.675 = 124.675.'
  },
  {
    id: 'math401-t5-ex09',
    subjectId: 'math401',
    topicId: 'math401-topic-5',
    type: 'written',
    title: 'Chi-Square Distribution',
    description: 'If X₁, X₂, ..., X₅ are independent N(0,1) random variables, what is the distribution of Y = X₁² + X₂² + ... + X₅²?',
    difficulty: 2,
    hints: [
      'The sum of squares of independent standard normals follows a chi-square distribution',
      'The degrees of freedom equals the number of terms',
      'Y ~ χ²(k) where k is the df'
    ],
    solution: 'Y = Σᵢ₌₁⁵ Xᵢ² where Xᵢ ~ N(0,1) independent. Therefore Y ~ χ²(5), the chi-square distribution with 5 degrees of freedom.'
  },
  {
    id: 'math401-t5-ex10',
    subjectId: 'math401',
    topicId: 'math401-topic-5',
    type: 'written',
    title: 'Student t-Distribution',
    description: 'Let Z ~ N(0,1) and V ~ χ²(n) be independent. Define T = Z/√(V/n). What is the distribution of T?',
    difficulty: 3,
    hints: [
      'This is the definition of the Student t-distribution',
      'T ~ t(n) with n degrees of freedom',
      'As n → ∞, t(n) → N(0,1)'
    ],
    solution: 'By definition, T = Z/√(V/n) where Z ~ N(0,1) and V ~ χ²(n) are independent follows the Student t-distribution with n degrees of freedom, written T ~ t(n). This distribution has heavier tails than the normal distribution, especially for small n.'
  }
];
