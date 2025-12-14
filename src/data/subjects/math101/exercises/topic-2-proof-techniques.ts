import type { WrittenExercise } from '../../../../core/types';

export const topic2Exercises: WrittenExercise[] = [
  // EXISTING exercise - preserve ID
  {
    id: 'math101-ex-2',
    subjectId: 'math101',
    topicId: 'math101-topic-2',
    type: 'written',
    difficulty: 3,
    title: 'Proof by Mathematical Induction',
    description: 'Use mathematical induction to prove that for all positive integers n, the sum 1 + 2 + 3 + ... + n = n(n+1)/2. Show all steps clearly: base case, inductive hypothesis, and inductive step.',
    hints: [
      'Base case: Verify the formula works for n = 1.',
      'Inductive hypothesis: Assume the formula holds for n = k.',
      'Inductive step: Use the hypothesis to prove it holds for n = k + 1.',
      'Remember that the sum up to k+1 equals (sum up to k) plus (k+1).'
    ],
    solution: 'Proof by induction:\n\nBase case (n = 1): Left side = 1. Right side = 1(1+1)/2 = 1. The formula holds for n = 1.\n\nInductive hypothesis: Assume that for some positive integer k, we have 1 + 2 + 3 + ... + k = k(k+1)/2.\n\nInductive step: We must show that 1 + 2 + 3 + ... + k + (k+1) = (k+1)(k+2)/2.\n\nStarting with the left side:\n1 + 2 + 3 + ... + k + (k+1)\n= [1 + 2 + 3 + ... + k] + (k+1)\n= k(k+1)/2 + (k+1)  [by inductive hypothesis]\n= (k+1)[k/2 + 1]\n= (k+1)(k+2)/2\n\nThis matches the formula for n = k+1. Therefore, by mathematical induction, the formula holds for all positive integers n.'
  },
  {
    id: 'math101-t2-ex02',
    subjectId: 'math101',
    topicId: 'math101-topic-2',
    type: 'written',
    difficulty: 1,
    title: 'Direct Proof',
    description: 'Prove directly that the sum of two even integers is even.',
    hints: [
      'Define what it means for an integer to be even',
      'Let the two even integers be 2a and 2b',
      'Add them and show the result is also even'
    ],
    solution: 'Proof:\n\nLet x and y be even integers.\n\nBy definition of even, there exist integers a and b such that:\nx = 2a and y = 2b\n\nTheir sum is:\nx + y = 2a + 2b = 2(a + b)\n\nSince a + b is an integer (integers are closed under addition), we have that x + y = 2(a + b) is divisible by 2.\n\nTherefore, x + y is even by definition.\n\nQ.E.D.'
  },
  {
    id: 'math101-t2-ex03',
    subjectId: 'math101',
    topicId: 'math101-topic-2',
    type: 'written',
    difficulty: 2,
    title: 'Proof by Contrapositive',
    description: 'Prove by contrapositive: If n² is even, then n is even.',
    hints: [
      'The contrapositive of "if P then Q" is "if not Q then not P"',
      'State the contrapositive clearly',
      'Prove the contrapositive using direct proof'
    ],
    solution: 'Original statement: If n² is even, then n is even.\n\nContrapositive: If n is NOT even (i.e., n is odd), then n² is NOT even (i.e., n² is odd).\n\nProof of contrapositive:\n\nAssume n is odd. By definition, there exists an integer k such that:\nn = 2k + 1\n\nThen:\nn² = (2k + 1)²\n   = 4k² + 4k + 1\n   = 2(2k² + 2k) + 1\n\nSince 2k² + 2k is an integer, we have n² = 2m + 1 where m = 2k² + 2k.\n\nTherefore, n² is odd.\n\nSince we proved the contrapositive, the original statement is true.\n\nQ.E.D.'
  },
  {
    id: 'math101-t2-ex04',
    subjectId: 'math101',
    topicId: 'math101-topic-2',
    type: 'written',
    difficulty: 3,
    title: 'Proof by Contradiction',
    description: 'Prove by contradiction that √2 is irrational.',
    hints: [
      'Assume √2 IS rational, meaning √2 = a/b in lowest terms',
      'Square both sides and derive a contradiction',
      'Show that both a and b must be even, contradicting "lowest terms"'
    ],
    solution: 'Proof by contradiction:\n\nAssume √2 is rational. Then √2 = a/b where a, b are integers with b ≠ 0, and the fraction is in lowest terms (gcd(a,b) = 1).\n\nSquaring both sides:\n2 = a²/b²\na² = 2b²\n\nSince a² = 2b², a² is even. By our earlier result, if a² is even, then a is even.\n\nSo a = 2k for some integer k. Substituting:\n(2k)² = 2b²\n4k² = 2b²\n2k² = b²\n\nThis means b² is even. Again by our earlier result, b must be even.\n\nBut now both a and b are even, meaning they share a common factor of 2. This contradicts our assumption that a/b is in lowest terms.\n\nTherefore, our assumption is false, and √2 is irrational.\n\nQ.E.D.'
  },
  {
    id: 'math101-t2-ex05',
    subjectId: 'math101',
    topicId: 'math101-topic-2',
    type: 'written',
    difficulty: 3,
    title: 'Induction - Sum of Squares',
    description: 'Prove by induction: 1² + 2² + 3² + ... + n² = n(n+1)(2n+1)/6 for all positive integers n.',
    hints: [
      'Base case: Check n = 1',
      'Assume true for n = k',
      'Show it holds for n = k + 1 by adding (k+1)²'
    ],
    solution: 'Proof by induction:\n\nBase case (n = 1):\nLHS = 1² = 1\nRHS = 1(1+1)(2·1+1)/6 = 1·2·3/6 = 1 ✓\n\nInductive hypothesis:\nAssume 1² + 2² + ... + k² = k(k+1)(2k+1)/6 for some positive integer k.\n\nInductive step:\nShow: 1² + 2² + ... + k² + (k+1)² = (k+1)(k+2)(2k+3)/6\n\nLHS = [1² + 2² + ... + k²] + (k+1)²\n    = k(k+1)(2k+1)/6 + (k+1)²    [by hypothesis]\n    = (k+1)[k(2k+1)/6 + (k+1)]\n    = (k+1)[k(2k+1) + 6(k+1)]/6\n    = (k+1)[2k² + k + 6k + 6]/6\n    = (k+1)[2k² + 7k + 6]/6\n    = (k+1)(k+2)(2k+3)/6    [factoring 2k² + 7k + 6 = (k+2)(2k+3)]\n\nThis equals the RHS with n = k+1. By induction, the formula holds for all positive integers n.\n\nQ.E.D.'
  },
  {
    id: 'math101-t2-ex06',
    subjectId: 'math101',
    topicId: 'math101-topic-2',
    type: 'written',
    difficulty: 2,
    title: 'Proof by Cases',
    description: 'Prove that for any integer n, n² + n is always even.',
    hints: [
      'Consider two cases: n is even and n is odd',
      'Prove the statement holds in each case',
      'Factor n² + n = n(n+1) and use the fact about consecutive integers'
    ],
    solution: 'Proof by cases:\n\nNote that n² + n = n(n+1), the product of two consecutive integers.\n\nCase 1: n is even\nIf n is even, then n = 2k for some integer k.\nThen n(n+1) = 2k(n+1) = 2 · k(n+1), which is even.\n\nCase 2: n is odd\nIf n is odd, then n+1 is even, so n+1 = 2m for some integer m.\nThen n(n+1) = n · 2m = 2 · nm, which is even.\n\nIn both cases, n² + n is even.\n\nAlternative proof: Of any two consecutive integers n and n+1, exactly one must be even. Therefore their product is always even.\n\nQ.E.D.'
  },
  {
    id: 'math101-t2-ex07',
    subjectId: 'math101',
    topicId: 'math101-topic-2',
    type: 'written',
    difficulty: 4,
    title: 'Strong Induction',
    description: 'Use strong induction to prove that every integer n ≥ 2 can be written as a product of prime numbers.',
    hints: [
      'Strong induction allows using ALL cases from base to k-1, not just k',
      'Base case: 2 is prime, so it is a product of one prime',
      'For the inductive step, consider if n is prime or composite'
    ],
    solution: 'Proof by strong induction:\n\nBase case (n = 2):\n2 is prime, so 2 = 2 is a product of one prime (itself). ✓\n\nInductive hypothesis:\nAssume that for some k ≥ 2, every integer from 2 to k can be written as a product of primes.\n\nInductive step:\nConsider n = k + 1. We show n can be written as a product of primes.\n\nCase 1: n is prime\nThen n is a product of one prime (itself). ✓\n\nCase 2: n is composite\nThen n = a · b where 2 ≤ a, b < n.\nSince a and b are both in the range [2, k], by the strong inductive hypothesis, both can be written as products of primes:\na = p₁ · p₂ · ... · pᵣ\nb = q₁ · q₂ · ... · qₛ\n\nTherefore:\nn = a · b = p₁ · p₂ · ... · pᵣ · q₁ · q₂ · ... · qₛ\n\nThis is a product of primes. ✓\n\nBy strong induction, every integer n ≥ 2 can be written as a product of primes.\n\nQ.E.D.'
  },
  {
    id: 'math101-t2-ex08',
    subjectId: 'math101',
    topicId: 'math101-topic-2',
    type: 'written',
    difficulty: 4,
    title: 'Induction - Divisibility',
    description: 'Prove by induction that n³ - n is divisible by 6 for all positive integers n.',
    hints: [
      'Factor: n³ - n = n(n² - 1) = n(n-1)(n+1)',
      'Or use induction directly',
      'For divisibility by 6, show divisibility by both 2 and 3'
    ],
    solution: 'Proof by induction:\n\nNote: n³ - n = n(n-1)(n+1) = (n-1)n(n+1), the product of three consecutive integers.\n\nBase case (n = 1):\n1³ - 1 = 0 = 6 · 0, which is divisible by 6. ✓\n\nInductive hypothesis:\nAssume k³ - k is divisible by 6 for some positive integer k.\nThat is, k³ - k = 6m for some integer m.\n\nInductive step:\nShow (k+1)³ - (k+1) is divisible by 6.\n\n(k+1)³ - (k+1)\n= k³ + 3k² + 3k + 1 - k - 1\n= k³ + 3k² + 2k\n= (k³ - k) + 3k² + 3k\n= (k³ - k) + 3k(k + 1)\n\nBy hypothesis, k³ - k = 6m for some integer m.\n\nFor 3k(k+1): Since k and k+1 are consecutive, one of them is even.\nSo k(k+1) is even, meaning k(k+1) = 2t for some integer t.\nThus 3k(k+1) = 6t.\n\nTherefore:\n(k+1)³ - (k+1) = 6m + 6t = 6(m + t)\n\nThis is divisible by 6. ✓\n\nBy induction, n³ - n is divisible by 6 for all positive integers n.\n\nQ.E.D.'
  }
];
