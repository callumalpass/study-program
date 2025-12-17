import { WrittenExercise } from '../../../../core/types';

export const topic7Exercises: WrittenExercise[] = [
  {
    id: 'math401-t7-ex01',
    subjectId: 'math401',
    topicId: 'math401-topic-7',
    type: 'written',
    title: 'Law of Large Numbers Application',
    description: 'A fair die is rolled n times. Let X̄_n be the average of the outcomes. According to the Law of Large Numbers, what value does X̄_n approach as n → ∞?',
    difficulty: 1,
    hints: [
      'Find E[X] for a single die roll',
      'E[X] = (1+2+3+4+5+6)/6',
      'LLN says X̄_n → E[X] as n → ∞'
    ],
    solution: 'For a fair die, E[X] = (1+2+3+4+5+6)/6 = 21/6 = 3.5. By the Law of Large Numbers, X̄_n → 3.5 almost surely as n → ∞. This means the sample average converges to the population mean.'
  },
  {
    id: 'math401-t7-ex02',
    subjectId: 'math401',
    topicId: 'math401-topic-7',
    type: 'written',
    title: 'Weak vs Strong LLN',
    description: 'Explain the difference between the Weak Law of Large Numbers and the Strong Law of Large Numbers.',
    difficulty: 2,
    hints: [
      'Weak LLN: X̄_n → μ in probability',
      'Strong LLN: X̄_n → μ almost surely',
      'Almost sure convergence is stronger than convergence in probability'
    ],
    solution: 'Weak LLN states that X̄_n converges to μ in probability: for any ε > 0, P(|X̄_n - μ| > ε) → 0 as n → ∞. Strong LLN states that X̄_n converges to μ almost surely: P(lim_{n→∞} X̄_n = μ) = 1. Almost sure convergence implies convergence in probability, but not vice versa. The strong law makes a stronger statement about the limiting behavior.'
  },
  {
    id: 'math401-t7-ex03',
    subjectId: 'math401',
    topicId: 'math401-topic-7',
    type: 'written',
    title: 'Central Limit Theorem Setup',
    description: 'Let X₁, X₂, ..., X_n be i.i.d. with E[Xᵢ] = μ and Var(Xᵢ) = σ². State what the Central Limit Theorem says about S_n = X₁ + ... + X_n.',
    difficulty: 2,
    hints: [
      'Standardize S_n: Z_n = (S_n - nμ)/(σ√n)',
      'CLT says Z_n converges in distribution',
      'The limiting distribution is standard normal'
    ],
    solution: 'The Central Limit Theorem states that Z_n = (S_n - nμ)/(σ√n) converges in distribution to N(0,1) as n → ∞. Equivalently, S_n is approximately N(nμ, nσ²) for large n. This holds regardless of the distribution of the Xᵢ (as long as μ and σ² exist and are finite).'
  },
  {
    id: 'math401-t7-ex04',
    subjectId: 'math401',
    topicId: 'math401-topic-7',
    type: 'written',
    title: 'CLT for Sample Mean',
    description: 'A population has mean μ=50 and standard deviation σ=10. A sample of n=100 is taken. Using CLT, approximate P(X̄ > 52).',
    difficulty: 3,
    hints: [
      'X̄ ~ approximately N(μ, σ²/n)',
      'X̄ ~ N(50, 100/100) = N(50, 1)',
      'Standardize and use normal table'
    ],
    solution: 'By CLT, X̄ ~ approximately N(50, 10²/100) = N(50, 1). Standardize: Z = (52-50)/1 = 2. P(X̄ > 52) = P(Z > 2) ≈ 1 - Φ(2) ≈ 1 - 0.9772 = 0.0228.'
  },
  {
    id: 'math401-t7-ex05',
    subjectId: 'math401',
    topicId: 'math401-topic-7',
    type: 'written',
    title: 'Continuity Correction',
    description: 'Let S_n ~ Binomial(100, 0.5). Use CLT with continuity correction to approximate P(S_n = 55).',
    difficulty: 3,
    hints: [
      'For Binomial(n,p): μ=np=50, σ²=np(1-p)=25',
      'Use continuity correction: P(S_n = 55) ≈ P(54.5 < S_n < 55.5)',
      'Standardize with N(50, 25)'
    ],
    solution: 'μ = 100(0.5) = 50, σ = √(100·0.5·0.5) = 5. With continuity correction: P(S_n = 55) ≈ P(54.5 < S_n < 55.5). Standardize: P((54.5-50)/5 < Z < (55.5-50)/5) = P(0.9 < Z < 1.1) = Φ(1.1) - Φ(0.9) ≈ 0.8643 - 0.8159 = 0.0484.'
  },
  {
    id: 'math401-t7-ex06',
    subjectId: 'math401',
    topicId: 'math401-topic-7',
    type: 'written',
    title: 'Convergence in Probability',
    description: 'Define what it means for a sequence of random variables Y_n to converge in probability to a constant c.',
    difficulty: 2,
    hints: [
      'Use the ε-δ definition',
      'Consider P(|Y_n - c| > ε)',
      'This probability should go to 0'
    ],
    solution: 'Y_n converges in probability to c (written Y_n →^P c) if for every ε > 0, lim_{n→∞} P(|Y_n - c| > ε) = 0. Equivalently, lim_{n→∞} P(|Y_n - c| ≤ ε) = 1. This means that for large n, Y_n is likely to be close to c.'
  },
  {
    id: 'math401-t7-ex07',
    subjectId: 'math401',
    topicId: 'math401-topic-7',
    type: 'written',
    title: 'Convergence in Distribution',
    description: 'What does it mean for X_n to converge in distribution to X? How does this differ from convergence in probability?',
    difficulty: 3,
    hints: [
      'Convergence in distribution: F_n(x) → F(x)',
      'Only requires CDFs to converge',
      'Weaker than convergence in probability'
    ],
    solution: 'X_n converges in distribution to X (written X_n →^D X) if lim_{n→∞} F_n(x) = F(x) at all continuity points of F, where F_n and F are the CDFs. This is weaker than convergence in probability because it only requires the distributions to converge, not the random variables themselves. Convergence in probability implies convergence in distribution, but not vice versa.'
  },
  {
    id: 'math401-t7-ex08',
    subjectId: 'math401',
    topicId: 'math401-topic-7',
    type: 'written',
    title: 'Slutsky\'s Theorem',
    description: 'State Slutsky\'s Theorem and give an example of its application.',
    difficulty: 3,
    hints: [
      'If X_n →^D X and Y_n →^P c',
      'Then X_n + Y_n →^D X + c',
      'Useful for combining convergence results'
    ],
    solution: 'Slutsky\'s Theorem: If X_n →^D X and Y_n →^P c (constant), then (1) X_n + Y_n →^D X + c, (2) X_n Y_n →^D cX, (3) X_n/Y_n →^D X/c (if c ≠ 0). Example: If Z_n →^D N(0,1) and S_n² →^P σ², then Z_n/S_n →^D N(0,σ²). This is used in deriving the distribution of the t-statistic.'
  },
  {
    id: 'math401-t7-ex09',
    subjectId: 'math401',
    topicId: 'math401-topic-7',
    type: 'written',
    title: 'Delta Method',
    description: 'State the Delta Method and explain when it is useful.',
    difficulty: 4,
    hints: [
      'If √n(Y_n - θ) →^D N(0, σ²)',
      'Then √n(g(Y_n) - g(θ)) →^D N(0, [g\'(θ)]²σ²)',
      'Used to find asymptotic distributions of transformations'
    ],
    solution: 'Delta Method: If √n(Y_n - θ) →^D N(0, σ²) and g is differentiable at θ with g\'(θ) ≠ 0, then √n(g(Y_n) - g(θ)) →^D N(0, [g\'(θ)]²σ²). This allows us to find the asymptotic distribution of a function of an estimator. Example: If X̄_n estimates p and √n(X̄_n - p) →^D N(0, p(1-p)), then for g(x) = log(x), √n(log(X̄_n) - log(p)) →^D N(0, 1/p²·p(1-p)) = N(0, (1-p)/p).'
  },
  {
    id: 'math401-t7-ex10',
    subjectId: 'math401',
    topicId: 'math401-topic-7',
    type: 'written',
    title: 'Sample Size for CLT',
    description: 'A population is highly skewed with mean 100 and standard deviation 20. Approximately how large should n be for the distribution of X̄ to be approximately normal?',
    difficulty: 2,
    hints: [
      'Rule of thumb: n ≥ 30 for moderately skewed',
      'More skewed distributions need larger n',
      'CLT works better with larger samples'
    ],
    solution: 'For highly skewed distributions, a common rule of thumb is n ≥ 30, though n ≥ 50 or even n ≥ 100 may be needed for very heavy skewness. The more the population deviates from normality, the larger n must be for the CLT approximation to be accurate. For this highly skewed population, n ≥ 50 would be safer, though n = 30 might give a reasonable approximation. The exact requirement depends on how much accuracy is needed.'
  }
];
