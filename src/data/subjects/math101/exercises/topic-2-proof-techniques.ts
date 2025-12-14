import type { WrittenExercise } from '../../../../core/types';

export const topic2Exercises: WrittenExercise[] = [
  // --- DRILLS (Simple Checks) ---
  {
    id: 'math101-t2-drill-1',
    subjectId: 'math101',
    topicId: 'math101-topic-2',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Direct Proof Step',
    description: 'If x = 3 and y = 5, prove x + y is even.',
    hints: ['Calculate the sum.'],
    solution: '3 + 5 = 8. 8 is divisible by 2, so it is even.'
  },
  {
    id: 'math101-t2-drill-2',
    subjectId: 'math101',
    topicId: 'math101-topic-2',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Contrapositive',
    description: 'What is the contrapositive of "If it rains, then the ground is wet"?',
    hints: ['Flip and negate both sides.'],
    solution: 'If the ground is NOT wet, then it is NOT raining.'
  },
  {
    id: 'math101-t2-drill-3',
    subjectId: 'math101',
    topicId: 'math101-topic-2',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Negation',
    description: 'Negate the statement: "All birds can fly."',
    hints: ['The negation of "All" is "There exists at least one that does not".'],
    solution: 'There exists a bird that cannot fly.'
  },
  {
    id: 'math101-t2-drill-4',
    subjectId: 'math101',
    topicId: 'math101-topic-2',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Counterexample',
    description: 'Find a counterexample for: "All prime numbers are odd."',
    hints: ['Check the first prime number.'],
    solution: '2 is a prime number and it is even.'
  },

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
    solution: `Proof by induction:

Base case (n = 1): Left side = 1. Right side = 1(1+1)/2 = 1. The formula holds for n = 1.

Inductive hypothesis: Assume that for some positive integer k, we have 1 + 2 + 3 + ... + k = k(k+1)/2.

Inductive step: We must show that 1 + 2 + 3 + ... + k + (k+1) = (k+1)(k+2)/2.

Starting with the left side:
1 + 2 + 3 + ... + k + (k+1)
= [1 + 2 + 3 + ... + k] + (k+1)
= k(k+1)/2 + (k+1)  [by inductive hypothesis]
= (k+1)[k/2 + 1]
= (k+1)(k+2)/2

This matches the formula for n = k+1. Therefore, by mathematical induction, the formula holds for all positive integers n.`
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
    solution: `Proof:

Let x and y be even integers.

By definition of even, there exist integers a and b such that:
x = 2a and y = 2b

Their sum is:
x + y = 2a + 2b = 2(a + b)

Since a + b is an integer (integers are closed under addition), we have that x + y = 2(a + b) is divisible by 2.

Therefore, x + y is even by definition.

Q.E.D.`
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
    solution: `Original statement: If n² is even, then n is even.

Contrapositive: If n is NOT even (i.e., n is odd), then n² is NOT even (i.e., n² is odd).

Proof of contrapositive:

Assume n is odd. By definition, there exists an integer k such that:
n = 2k + 1

Then:
n² = (2k + 1)²
   = 4k² + 4k + 1
   = 2(2k² + 2k) + 1

Since 2k² + 2k is an integer, we have n² = 2m + 1 where m = 2k² + 2k.

Therefore, n² is odd.

Since we proved the contrapositive, the original statement is true.

Q.E.D.`
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
    solution: `Proof by contradiction:

Assume √2 is rational. Then √2 = a/b where a, b are integers with b ≠ 0, and the fraction is in lowest terms (gcd(a,b) = 1).

Squaring both sides:
2 = a²/b²
a² = 2b²

Since a² = 2b², a² is even. By our earlier result, if a² is even, then a is even.

So a = 2k for some integer k. Substituting:
(2k)² = 2b²
4k² = 2b²
2k² = b²

This means b² is even. Again by our earlier result, b must be even.

But now both a and b are even, meaning they share a common factor of 2. This contradicts our assumption that a/b is in lowest terms.

Therefore, our assumption is false, and √2 is irrational.

Q.E.D.`
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
    solution: `Proof by induction:

Base case (n = 1):
LHS = 1² = 1
RHS = 1(1+1)(2·1+1)/6 = 1·2·3/6 = 1 ✓

Inductive hypothesis:
Assume 1² + 2² + ... + k² = k(k+1)(2k+1)/6 for some positive integer k.

Inductive step:
Show: 1² + 2² + ... + k² + (k+1)² = (k+1)(k+2)(2k+3)/6

LHS = [1² + 2² + ... + k²] + (k+1)²
    = k(k+1)(2k+1)/6 + (k+1)²    [by hypothesis]
    = (k+1)[k(2k+1)/6 + (k+1)]
    = (k+1)[k(2k+1) + 6(k+1)]/6
    = (k+1)[2k² + k + 6k + 6]/6
    = (k+1)[2k² + 7k + 6]/6
    = (k+1)(k+2)(2k+3)/6    [factoring 2k² + 7k + 6 = (k+2)(2k+3)]

This equals the RHS with n = k+1. By induction, the formula holds for all positive integers n.

Q.E.D.`
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
    solution: `Proof by cases:

Note that n² + n = n(n+1), the product of two consecutive integers.

Case 1: n is even
If n is even, then n = 2k for some integer k.
Then n(n+1) = 2k(n+1) = 2 · k(n+1), which is even.

Case 2: n is odd
If n is odd, then n+1 is even, so n+1 = 2m for some integer m.
Then n(n+1) = n · 2m = 2 · nm, which is even.

In both cases, n² + n is even.

Alternative proof: Of any two consecutive integers n and n+1, exactly one must be even. Therefore their product is always even.

Q.E.D.`
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
    solution: `Proof by strong induction:

Base case (n = 2):
2 is prime, so 2 = 2 is a product of one prime (itself). ✓

Inductive hypothesis:
Assume that for some k ≥ 2, every integer from 2 to k can be written as a product of primes.

Inductive step:
Consider n = k + 1. We show n can be written as a product of primes.

Case 1: n is prime
Then n is a product of one prime (itself). ✓

Case 2: n is composite
Then n = a · b where 2 ≤ a, b < n.
Since a and b are both in the range [2, k], by the strong inductive hypothesis, both can be written as products of primes:
a = p₁ · p₂ · ... · pᵣ
b = q₁ · q₂ · ... · qₛ

Therefore:
n = a · b = p₁ · p₂ · ... · pᵣ · q₁ · q₂ · ... · qₛ

This is a product of primes. ✓

By strong induction, every integer n ≥ 2 can be written as a product of primes.

Q.E.D.`
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
    solution: `Proof by induction:

Note: n³ - n = n(n-1)(n+1) = (n-1)n(n+1), the product of three consecutive integers.

Base case (n = 1):
1³ - 1 = 0 = 6 · 0, which is divisible by 6. ✓

Inductive hypothesis:
Assume k³ - k is divisible by 6 for some positive integer k.
That is, k³ - k = 6m for some integer m.

Inductive step:
Show (k+1)³ - (k+1) is divisible by 6.

(k+1)³ - (k+1)
= k³ + 3k² + 3k + 1 - k - 1
= k³ + 3k² + 2k
= (k³ - k) + 3k² + 3k
= (k³ - k) + 3k(k + 1)

By hypothesis, k³ - k = 6m for some integer m.

For 3k(k+1): Since k and k+1 are consecutive, one of them is even.
So k(k+1) is even, meaning k(k+1) = 2t for some integer t.
Thus 3k(k+1) = 6t.

Therefore:
(k+1)³ - (k+1) = 6m + 6t = 6(m + t)

This is divisible by 6. ✓

By induction, n³ - n is divisible by 6 for all positive integers n.

Q.E.D.`
  },
  {
    id: 'math101-t2-ex09',
    subjectId: 'math101',
    topicId: 'math101-topic-2',
    type: 'written',
    difficulty: 3,
    title: 'Pigeonhole Principle',
    description: 'Prove that in any group of 6 people, there are either 3 mutual friends or 3 mutual strangers.',
    hints: [
      'This is a classic Ramsey Theory problem.',
      'Consider one person A. By PHP, A must have either 3 friends or 3 strangers among the other 5.',
      'Analyze the relationships between those 3 people.'
    ],
    solution: `Proof:
Select any person A. The remaining 5 people are either friends with A or strangers to A.
By the Pigeonhole Principle, at least 3 of them fall into the same category.

Case 1: A has 3 friends (call them B, C, D).
- If any pair among B, C, D are friends (e.g., B and C), then A, B, C form a triangle of 3 mutual friends.
- If NO pair among B, C, D are friends, then B, C, D form a group of 3 mutual strangers.
In either subcase, the proposition holds.

Case 2: A has 3 strangers (call them X, Y, Z).
- If any pair among X, Y, Z are strangers (e.g., X and Y), then A, X, Y form a group of 3 mutual strangers.
- If NO pair among X, Y, Z are strangers (meaning they are all friends), then X, Y, Z form a triangle of 3 mutual friends.

Thus, in all cases, there are either 3 mutual friends or 3 mutual strangers.`
  },
  {
    id: 'math101-t2-ex10',
    subjectId: 'math101',
    topicId: 'math101-topic-2',
    type: 'written',
    difficulty: 2,
    title: 'Disproof by Counterexample',
    description: 'Disprove the statement: "For all real numbers x and y, if x² = y², then x = y."',
    hints: [
      'Find specific values for x and y where the hypothesis is true but the conclusion is false.',
      'Think about negative numbers.'
    ],
    solution: `To disprove the statement "For all x, y, if x² = y², then x = y", we need a single counterexample.

Let x = 2 and y = -2.

Hypothesis check: x² = 2² = 4, and y² = (-2)² = 4. So x² = y² is TRUE.

Conclusion check: x = 2 and y = -2. So x = y is FALSE.

Since we found a case where the hypothesis is true but the conclusion is false, the universal statement is False.`
  },
  {
    id: 'math101-t2-ex11',
    subjectId: 'math101',
    topicId: 'math101-topic-2',
    type: 'written',
    difficulty: 2,
    title: 'Closure of Rational Numbers',
    description: 'Prove directly that the sum of two rational numbers is rational.',
    hints: [
      'Definition of rational: x = p/q where p, q are integers and q ≠ 0.',
      'Add two fractions a/b and c/d.',
      'Show the result is a ratio of integers with non-zero denominator.'
    ],
    solution: `Proof:
Let x and y be rational numbers.
By definition, x = a/b and y = c/d for some integers a, b, c, d where b ≠ 0 and d ≠ 0.

Then x + y = a/b + c/d.
Finding a common denominator:
x + y = (ad + bc) / (bd).

Let p = ad + bc and q = bd.
Since a, b, c, d are integers, p is an integer (integers closed under multiplication and addition).
Since b ≠ 0 and d ≠ 0, q = bd ≠ 0.

Thus x + y = p/q, which satisfies the definition of a rational number.

Therefore, the sum of two rational numbers is rational.`
  },
  {
    id: 'math101-t2-ex12',
    subjectId: 'math101',
    topicId: 'math101-topic-2',
    type: 'written',
    difficulty: 4,
    title: "Euclid's Theorem (Infinitude of Primes)",
    description: 'Prove by contradiction that there are infinitely many prime numbers.',
    hints: [
      'Assume there is a finite list of primes p₁, p₂, ..., pₙ.',
      'Construct a number N = p₁p₂...pₙ + 1.',
      'Consider the prime factors of N.'
    ],
    solution: `Proof by contradiction:
Assume there are finitely many primes. List them as p₁, p₂, ..., pₙ.

Consider the number N = (p₁ · p₂ · ... · pₙ) + 1.

N is an integer > 1, so by the Fundamental Theorem of Arithmetic, it must have at least one prime factor, say q.

Since p₁, ..., pₙ are ALL the primes, q must be one of them (say q = pᵢ).

If q divides N, and q divides the product (p₁...pₙ), then q must divide their difference:
N - (p₁...pₙ) = 1.

But no prime divides 1. This is a contradiction.

Therefore, our assumption that there are finitely many primes is false.

Q.E.D.`
  },
  {
    id: 'math101-t2-ex13',
    subjectId: 'math101',
    topicId: 'math101-topic-2',
    type: 'written',
    difficulty: 3,
    title: 'Induction - Inequality',
    description: 'Prove by induction that 2ⁿ > n² for all integers n ≥ 5.',
    hints: [
      'Base case: n = 5.',
      'Inductive step: Show 2ᵏ⁺¹ > (k+1)² assuming 2ᵏ > k².',
      'You may need to show 2k² > (k+1)² separately.'
    ],
    solution: `Proof by induction:

Base case (n = 5):
2⁵ = 32
5² = 25
32 > 25, so base case holds.

Inductive hypothesis: Assume 2ᵏ > k² for some k ≥ 5.

Inductive step: Show 2ᵏ⁺¹ > (k+1)².
LHS = 2ᵏ⁺¹ = 2 · 2ᵏ
 > 2 · k²  (by hypothesis)

We need to show 2k² > (k+1)² = k² + 2k + 1.
Subtracting k² from both sides, we need to show k² > 2k + 1.

Since k ≥ 5:
k² = k · k ≥ 5k = 2k + 3k > 2k + 1.
So the inequality holds.

Therefore, 2ᵏ⁺¹ > 2k² > (k+1)².

By induction, 2ⁿ > n² for all n ≥ 5.`
  },
  {
    id: 'math101-t2-ex14',
    subjectId: 'math101',
    topicId: 'math101-topic-2',
    type: 'written',
    difficulty: 2,
    title: 'Without Loss of Generality (WLOG)',
    description: 'Prove that if x and y are integers and xy is even, then at least one of x or y is even.',
    hints: [
      'Use the contrapositive or contradiction.',
      'Alternatively, use WLOG to avoid repeating symmetric cases in a direct proof.',
      'Actually, contrapositive is easiest here: If both are odd, product is odd.'
    ],
    solution: `We prove the contrapositive: If x is odd AND y is odd, then xy is odd.

Let x = 2a + 1 and y = 2b + 1.
xy = (2a + 1)(2b + 1)
   = 4ab + 2a + 2b + 1
   = 2(2ab + a + b) + 1

This is of the form 2m + 1, so xy is odd.

Since the contrapositive is true, the original statement is true: if xy is even, then NOT (x is odd AND y is odd), which means at least one is even.`
  },
  {
    id: 'math101-t2-ex15',
    subjectId: 'math101',
    topicId: 'math101-topic-2',
    type: 'written',
    difficulty: 3,
    title: 'Constructive Existence Proof',
    description: 'Prove that there exists a positive integer that can be written as the sum of two cubes in two different ways.',
    hints: [
      'This is the famous logic of the "Hardy-Ramanujan number".',
      'Try small cubes: 1³, 2³, ..., 10³ and look for sums that match.',
      '12³ + 1³ = ?'
    ],
    solution: `We construct such a number by example.
Consider 1729.

12³ + 1³ = 1728 + 1 = 1729
10³ + 9³ = 1000 + 729 = 1729

Since we have found a number (1729) that satisfies the property, the existence theorem is proven.`
  },
  {
    id: 'math101-t2-ex16',
    subjectId: 'math101',
    topicId: 'math101-topic-2',
    type: 'written',
    difficulty: 4,
    title: 'Non-Constructive Existence Proof',
    description: 'Prove that there exist irrational numbers x and y such that x^y is rational.',
    hints: [
      'Consider the number √2^√2.',
      'If it is rational, you are done (x=y=√2).',
      'If it is irrational, let x = √2^√2 and y = √2.'
    ],
    solution: `Proof:
Consider the number α = √2^√2.

Case 1: α is rational.
Then we choose x = √2 and y = √2. Both are irrational, and x^y = α is rational. The theorem holds.

Case 2: α is irrational.
Then we choose x = α (which is irrational) and y = √2 (irrational).
Consider x^y = (√2^√2)^√2 = √2^(√2·√2) = √2² = 2.
Since 2 is rational, the theorem holds.

We don't know which case is true, but in EITHER case, we have found suitable x and y. Thus such numbers exist.`
  }
];
