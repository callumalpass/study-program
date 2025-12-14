import type { WrittenExercise } from '../../../../core/types';

export const topic6Exercises: WrittenExercise[] = [
  // --- DRILLS (Difficulty 1) ---
  {
    id: 'math101-t6-drill-1',
    subjectId: 'math101',
    topicId: 'math101-topic-6',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Evaluate Universal Quantifier',
    description: 'Let the domain be {1, 2, 3} and P(x) mean "x > 0". Is ∀x P(x) true or false?',
    hints: ['Check if P(x) is true for every element in the domain.'],
    solution: 'True. P(1) = True, P(2) = True, P(3) = True. Since all are true, ∀x P(x) is True.'
  },
  {
    id: 'math101-t6-drill-2',
    subjectId: 'math101',
    topicId: 'math101-topic-6',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Evaluate Existential Quantifier',
    description: 'Let the domain be {1, 2, 3, 4} and P(x) mean "x is even". Is ∃x P(x) true or false?',
    hints: ['Check if P(x) is true for at least one element.'],
    solution: 'True. P(2) = True and P(4) = True. Since at least one is true, ∃x P(x) is True.'
  },
  {
    id: 'math101-t6-drill-3',
    subjectId: 'math101',
    topicId: 'math101-topic-6',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Negate Universal Statement',
    description: 'Write the negation of ∀x P(x) using an existential quantifier.',
    hints: ['The negation of "all" is "some... not".'],
    solution: '¬(∀x P(x)) ≡ ∃x ¬P(x)'
  },
  {
    id: 'math101-t6-drill-4',
    subjectId: 'math101',
    topicId: 'math101-topic-6',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Negate Existential Statement',
    description: 'Write the negation of ∃x P(x) using a universal quantifier.',
    hints: ['The negation of "some" is "all... not".'],
    solution: '¬(∃x P(x)) ≡ ∀x ¬P(x)'
  },

  // --- BASIC EXERCISES (Difficulty 2) ---
  {
    id: 'math101-t6-ex01',
    subjectId: 'math101',
    topicId: 'math101-topic-6',
    type: 'written',
    difficulty: 2,
    title: 'Predicate Evaluation',
    description: `Let P(x, y) mean "x + y = 5" and the domain for both variables be {1, 2, 3, 4}.
Evaluate:
(a) P(2, 3)
(b) P(1, 1)
(c) ∃y P(2, y)
(d) ∀x ∃y P(x, y)`,
    hints: [
      'For (a) and (b), just substitute and check.',
      'For (c), find if any y in {1,2,3,4} makes 2 + y = 5.',
      'For (d), check if for each x, there exists a y such that x + y = 5.'
    ],
    solution: `(a) P(2, 3): 2 + 3 = 5. True.
(b) P(1, 1): 1 + 1 = 2 ≠ 5. False.
(c) ∃y P(2, y): We need 2 + y = 5, so y = 3. Since 3 ∈ {1,2,3,4}, True.
(d) ∀x ∃y P(x, y): For each x, we need y = 5 - x in the domain.
    x = 1: y = 4 ✓
    x = 2: y = 3 ✓
    x = 3: y = 2 ✓
    x = 4: y = 1 ✓
    All work, so True.`
  },
  {
    id: 'math101-t6-ex02',
    subjectId: 'math101',
    topicId: 'math101-topic-6',
    type: 'written',
    difficulty: 2,
    title: 'Translate to Predicate Logic',
    description: `Let the domain be all people. Define predicates:
- S(x): "x is a student"
- P(x): "x studies programming"

Translate into predicate logic:
(a) "All students study programming."
(b) "Some students study programming."
(c) "No students study programming."
(d) "Not all students study programming."`,
    hints: [
      'Use → with ∀ for "all A are B".',
      'Use ∧ with ∃ for "some A are B".',
      '"No A are B" means "all A are not B".',
      '"Not all" is the negation of "all".'
    ],
    solution: `(a) ∀x (S(x) → P(x))
(b) ∃x (S(x) ∧ P(x))
(c) ∀x (S(x) → ¬P(x))  or equivalently  ¬∃x (S(x) ∧ P(x))
(d) ∃x (S(x) ∧ ¬P(x))`
  },
  {
    id: 'math101-t6-ex03',
    subjectId: 'math101',
    topicId: 'math101-topic-6',
    type: 'written',
    difficulty: 2,
    title: 'Domain Dependence',
    description: `Consider the statement ∀x (x² ≥ x).
Determine if this is true or false for each domain:
(a) Domain = positive integers {1, 2, 3, ...}
(b) Domain = all integers {..., -2, -1, 0, 1, 2, ...}
(c) Domain = real numbers in [0, 1]`,
    hints: [
      'Test representative values from each domain.',
      'Look for counterexamples where x² < x.',
      'When is x² < x? When 0 < x < 1.'
    ],
    solution: `(a) Positive integers: True. For n ≥ 1, we have n² ≥ n (since n² - n = n(n-1) ≥ 0).

(b) All integers: True. For n ≤ 0, n² ≥ 0 ≥ n. For n ≥ 1, same as (a).

(c) Real numbers in [0, 1]: False. Consider x = 0.5: x² = 0.25 < 0.5 = x.
Counterexample: Any x with 0 < x < 1 gives x² < x.`
  },
  {
    id: 'math101-t6-ex04',
    subjectId: 'math101',
    topicId: 'math101-topic-6',
    type: 'written',
    difficulty: 2,
    title: 'Negation Practice',
    description: `Write the negation of each statement in predicate logic and in English:
(a) ∀x (x > 0 → x² > 0)
(b) ∃x (Prime(x) ∧ Even(x))
(c) ∀x ∃y (y > x)`,
    hints: [
      'Apply the negation rules: ¬∀ → ∃¬, ¬∃ → ∀¬.',
      'Negate implications: ¬(P → Q) ≡ P ∧ ¬Q.',
      'Work from outside in for nested quantifiers.'
    ],
    solution: `(a) ¬[∀x (x > 0 → x² > 0)]
    ≡ ∃x ¬(x > 0 → x² > 0)
    ≡ ∃x (x > 0 ∧ x² ≤ 0)
    English: "There exists a positive number whose square is not positive."

(b) ¬[∃x (Prime(x) ∧ Even(x))]
    ≡ ∀x ¬(Prime(x) ∧ Even(x))
    ≡ ∀x (Prime(x) → ¬Even(x))
    English: "All prime numbers are odd" or "No prime is even."

(c) ¬[∀x ∃y (y > x)]
    ≡ ∃x ¬∃y (y > x)
    ≡ ∃x ∀y ¬(y > x)
    ≡ ∃x ∀y (y ≤ x)
    English: "There exists some x such that all y are at most x" (a maximum exists).`
  },

  // --- INTERMEDIATE EXERCISES (Difficulty 3) ---
  {
    id: 'math101-t6-ex05',
    subjectId: 'math101',
    topicId: 'math101-topic-6',
    type: 'written',
    difficulty: 3,
    title: 'Nested Quantifiers - Order Matters',
    description: `Let the domain be real numbers and L(x, y) mean "x < y".
Determine the truth value and explain:
(a) ∀x ∃y L(x, y)
(b) ∃y ∀x L(x, y)
(c) ∀x ∀y (L(x, y) ∨ L(y, x) ∨ x = y)
(d) ∃x ∃y (L(x, y) ∧ L(y, x))`,
    hints: [
      'For (a), can you always find a bigger number?',
      'For (b), is there one number bigger than ALL others?',
      'For (c), this is the trichotomy property.',
      'For (d), can x < y and y < x both be true?'
    ],
    solution: `(a) ∀x ∃y L(x, y): "For every x, there exists y > x."
    True. Given any x, choose y = x + 1.

(b) ∃y ∀x L(x, y): "There exists y greater than all x."
    False. No single real number is greater than all real numbers.

(c) ∀x ∀y (L(x, y) ∨ L(y, x) ∨ x = y): "For any two numbers, either x < y, y < x, or x = y."
    True. This is the trichotomy law for real numbers.

(d) ∃x ∃y (L(x, y) ∧ L(y, x)): "There exist x, y with x < y and y < x."
    False. The < relation is asymmetric; x < y implies y ≮ x.`
  },
  {
    id: 'math101-t6-ex06',
    subjectId: 'math101',
    topicId: 'math101-topic-6',
    type: 'written',
    difficulty: 3,
    title: 'Mathematical Statements',
    description: `Express the following mathematical statements in predicate logic. Use appropriate predicates and specify the domain.

(a) Every integer is either even or odd.
(b) There is no largest prime number.
(c) Between any two distinct real numbers, there is another real number.
(d) The square of any odd number is odd.`,
    hints: [
      'Define predicates like Even(x), Odd(x), Prime(x) as needed.',
      'For (b), think about what "no largest" means.',
      'For (c), this is the density of real numbers.',
      'For (d), use implication with ∀.'
    ],
    solution: `(a) Domain: integers. ∀x (Even(x) ∨ Odd(x))
    Or more explicitly: ∀x (∃k (x = 2k) ∨ ∃k (x = 2k + 1))

(b) Domain: integers. ¬∃p (Prime(p) ∧ ∀q (Prime(q) → q ≤ p))
    Or equivalently: ∀p (Prime(p) → ∃q (Prime(q) ∧ q > p))
    "For every prime, there exists a larger prime."

(c) Domain: real numbers. ∀x ∀y (x < y → ∃z (x < z ∧ z < y))
    "If x < y, then there exists z between them."

(d) Domain: integers. ∀x (Odd(x) → Odd(x²))
    More explicitly: ∀x (∃k (x = 2k + 1) → ∃m (x² = 2m + 1))`
  },
  {
    id: 'math101-t6-ex07',
    subjectId: 'math101',
    topicId: 'math101-topic-6',
    type: 'written',
    difficulty: 3,
    title: 'Equivalence of Quantified Statements',
    description: `Determine if the following pairs are logically equivalent. Justify your answer.

(a) ∀x (P(x) ∧ Q(x))  vs  (∀x P(x)) ∧ (∀x Q(x))
(b) ∃x (P(x) ∧ Q(x))  vs  (∃x P(x)) ∧ (∃x Q(x))
(c) ∀x (P(x) ∨ Q(x))  vs  (∀x P(x)) ∨ (∀x Q(x))
(d) ∃x (P(x) ∨ Q(x))  vs  (∃x P(x)) ∨ (∃x Q(x))`,
    hints: [
      'For each, try to construct a domain and predicates where they differ.',
      'Remember: ∀ distributes over ∧, ∃ distributes over ∨.',
      'The other directions are trickier.'
    ],
    solution: `(a) Equivalent. ∀x (P(x) ∧ Q(x)) ≡ (∀x P(x)) ∧ (∀x Q(x))
    "Everything satisfies P and Q" ≡ "Everything satisfies P, and everything satisfies Q."

(b) NOT equivalent. (∃x P(x)) ∧ (∃x Q(x)) ⇏ ∃x (P(x) ∧ Q(x))
    Counterexample: Domain = {1, 2}, P(1) = T, P(2) = F, Q(1) = F, Q(2) = T
    LHS: (∃x P(x)) ∧ (∃x Q(x)) = T ∧ T = T
    RHS: ∃x (P(x) ∧ Q(x)) = F (no single x satisfies both)

(c) NOT equivalent. (∀x P(x)) ∨ (∀x Q(x)) ⇏ ∀x (P(x) ∨ Q(x))
    Counterexample: Domain = {1, 2}, P(1) = T, P(2) = F, Q(1) = F, Q(2) = T
    LHS: (∀x P(x)) ∨ (∀x Q(x)) = F ∨ F = F
    RHS: ∀x (P(x) ∨ Q(x)) = T (each x satisfies P or Q)

(d) Equivalent. ∃x (P(x) ∨ Q(x)) ≡ (∃x P(x)) ∨ (∃x Q(x))
    "Something satisfies P or Q" ≡ "Something satisfies P, or something satisfies Q."`
  },
  {
    id: 'math101-t6-ex08',
    subjectId: 'math101',
    topicId: 'math101-topic-6',
    type: 'written',
    difficulty: 3,
    title: 'Translate English to Logic',
    description: `Let the domain be students in a class. Define:
- F(x, y): "x is friends with y"
- S(x, y): "x studies with y"
- P(x): "x passed the exam"

Translate to predicate logic:
(a) "Everyone has at least one friend."
(b) "Alice studies with all her friends."
(c) "If two students study together, at least one of them passed."
(d) "No one is friends with everyone."`,
    hints: [
      'For (a), use ∀x ∃y.',
      'For (b), let Alice be a constant a.',
      'For (c), use implication with ∨ or ∧.',
      'For (d), negate "someone is friends with everyone".'
    ],
    solution: `(a) "Everyone has at least one friend."
    ∀x ∃y F(x, y)

(b) "Alice studies with all her friends." (Let a = Alice)
    ∀y (F(a, y) → S(a, y))

(c) "If two students study together, at least one of them passed."
    ∀x ∀y (S(x, y) → (P(x) ∨ P(y)))

(d) "No one is friends with everyone."
    ¬∃x ∀y F(x, y)
    Or equivalently: ∀x ∃y ¬F(x, y)
    "Everyone has someone they're not friends with."`
  },
  {
    id: 'math101-t6-ex09',
    subjectId: 'math101',
    topicId: 'math101-topic-6',
    type: 'written',
    difficulty: 3,
    title: 'Uniqueness Quantifier',
    description: `The uniqueness quantifier ∃!x P(x) means "there exists exactly one x such that P(x)."

(a) Express ∃!x P(x) using only ∃, ∀, and logical connectives.
(b) Let P(x) mean "x² = 4" with domain = integers. Is ∃!x P(x) true?
(c) Let Q(x) mean "x is even and prime" with domain = positive integers. Is ∃!x Q(x) true?`,
    hints: [
      'For (a), combine existence with uniqueness: something has P, and anything with P is that thing.',
      'For (b), find all solutions to x² = 4.',
      'For (c), think about which primes are even.'
    ],
    solution: `(a) ∃!x P(x) ≡ ∃x (P(x) ∧ ∀y (P(y) → y = x))
    "There exists x with P, and any y with P must equal x."

    Alternative: ∃x P(x) ∧ ∀x ∀y ((P(x) ∧ P(y)) → x = y)
    "Something has P, and any two things with P are the same."

(b) P(x): x² = 4. Solutions: x = 2 and x = -2.
    There are two solutions, so ∃!x P(x) is False.

(c) Q(x): x is even and prime. The only even prime is 2.
    ∃!x Q(x) is True. (x = 2 is the unique such integer.)`
  },

  // --- CHALLENGING EXERCISES (Difficulty 4) ---
  {
    id: 'math101-t6-ex10',
    subjectId: 'math101',
    topicId: 'math101-topic-6',
    type: 'written',
    difficulty: 4,
    title: 'Complex Nested Quantifiers',
    description: `Let the domain be real numbers.
Translate to English and determine if true or false:
(a) ∀ε > 0 ∃δ > 0 ∀x (|x - 2| < δ → |x² - 4| < ε)
(b) ∃M ∀x (x² ≤ M)
(c) ∀x ∀y ∃z (x < z < y ∨ y < z < x ∨ x = y)`,
    hints: [
      '(a) is the definition of a limit/continuity.',
      '(b) asks if squares are bounded.',
      '(c) is about density of reals plus equality.'
    ],
    solution: `(a) "For every positive ε, there exists positive δ such that whenever x is within δ of 2, x² is within ε of 4."
    This is the ε-δ definition of continuity of f(x) = x² at x = 2.
    True. (Continuous functions satisfy this; choose δ appropriately based on ε.)

(b) "There exists M such that x² ≤ M for all x."
    English: "All squares are bounded by some M."
    False. For any M, choose x = √M + 1, then x² = M + 2√M + 1 > M.

(c) "For any x and y, there exists z strictly between them (or they're equal)."
    True. If x ≠ y, take z = (x + y)/2. If x = y, the condition x = y holds.`
  },
  {
    id: 'math101-t6-ex11',
    subjectId: 'math101',
    topicId: 'math101-topic-6',
    type: 'written',
    difficulty: 4,
    title: 'Proof with Quantifiers',
    description: `Prove or disprove each statement. If false, provide a counterexample.

(a) ∀x ∀y (x + y = y + x) [Domain: integers]
(b) ∀x ∃y (xy = 1) [Domain: nonzero real numbers]
(c) ∀x ∀y (x ≠ y → ∃z (x < z ∧ z < y)) [Domain: integers]
(d) ∃x ∀y (x ≤ y) [Domain: natural numbers]`,
    hints: [
      '(a) is commutativity of addition.',
      '(b) asks about multiplicative inverses.',
      '(c) is about density—are there integers between any two distinct integers?',
      '(d) asks about a minimum element.'
    ],
    solution: `(a) True. Addition of integers is commutative.
    For any integers x, y: x + y = y + x by the commutative property.

(b) True. Every nonzero real has a multiplicative inverse.
    For any nonzero x, let y = 1/x. Then xy = x · (1/x) = 1.

(c) False. Counterexample: x = 1, y = 2.
    We need z with 1 < z < 2, but no integer exists between 1 and 2.
    (The statement is true for reals but false for integers.)

(d) True. Choose x = 0 (or x = 1 if natural numbers start at 1).
    For all natural numbers y, we have 0 ≤ y (or 1 ≤ y).
    The natural numbers have a minimum element.`
  },
  {
    id: 'math101-t6-ex12',
    subjectId: 'math101',
    topicId: 'math101-topic-6',
    type: 'written',
    difficulty: 4,
    title: 'Negation of Complex Statements',
    description: `Write the negation in simplified form (push negation inward, cancel double negations):

(a) ∀x ∃y ∀z P(x, y, z)
(b) ∃x (P(x) → ∀y Q(x, y))
(c) ∀x ((∃y R(x, y)) → S(x))`,
    hints: [
      'Apply quantifier negation rules from outside in.',
      'Remember: ¬(P → Q) ≡ P ∧ ¬Q.',
      'Take it step by step, one quantifier at a time.'
    ],
    solution: `(a) ¬[∀x ∃y ∀z P(x, y, z)]
    ≡ ∃x ¬[∃y ∀z P(x, y, z)]
    ≡ ∃x ∀y ¬[∀z P(x, y, z)]
    ≡ ∃x ∀y ∃z ¬P(x, y, z)

(b) ¬[∃x (P(x) → ∀y Q(x, y))]
    ≡ ∀x ¬(P(x) → ∀y Q(x, y))
    ≡ ∀x (P(x) ∧ ¬∀y Q(x, y))
    ≡ ∀x (P(x) ∧ ∃y ¬Q(x, y))

(c) ¬[∀x ((∃y R(x, y)) → S(x))]
    ≡ ∃x ¬((∃y R(x, y)) → S(x))
    ≡ ∃x ((∃y R(x, y)) ∧ ¬S(x))
    "There exists x such that x is related to some y, but S(x) is false."`
  },
  {
    id: 'math101-t6-ex13',
    subjectId: 'math101',
    topicId: 'math101-topic-6',
    type: 'written',
    difficulty: 4,
    title: 'Database Query Translation',
    description: `Consider a database with:
- Students(sid, name, major)
- Enrolled(sid, cid)
- Courses(cid, title, dept)

Express these queries in predicate logic:
(a) "Some CS student is enrolled in all Math courses."
(b) "Every student is enrolled in at least one course."
(c) "No student is enrolled in both CS101 and CS102."`,
    hints: [
      'Use predicates like Student(s), Major(s, m), Enrolled(s, c), Course(c), Dept(c, d).',
      'For (a), note the nesting: ∃ student who ∀ math courses is enrolled.',
      'For (c), negation of existence.'
    ],
    solution: `Let S(x) = "x is a student", E(x, c) = "x is enrolled in c",
CS(x) = "x is a CS major", Math(c) = "c is a Math course"

(a) "Some CS student is enrolled in all Math courses."
    ∃x (S(x) ∧ CS(x) ∧ ∀c (Math(c) → E(x, c)))

(b) "Every student is enrolled in at least one course."
    ∀x (S(x) → ∃c E(x, c))

(c) "No student is enrolled in both CS101 and CS102."
    ¬∃x (S(x) ∧ E(x, CS101) ∧ E(x, CS102))
    Or equivalently:
    ∀x (S(x) → ¬(E(x, CS101) ∧ E(x, CS102)))
    ∀x (S(x) → (¬E(x, CS101) ∨ ¬E(x, CS102)))`
  },

  // --- ADVANCED EXERCISES (Difficulty 5) ---
  {
    id: 'math101-t6-ex14',
    subjectId: 'math101',
    topicId: 'math101-topic-6',
    type: 'written',
    difficulty: 5,
    title: 'Limit Definition',
    description: `The formal definition of lim(x→a) f(x) = L is:
∀ε > 0 ∃δ > 0 ∀x (0 < |x - a| < δ → |f(x) - L| < ε)

(a) Write the negation of this statement (i.e., the limit does NOT exist or is not L).
(b) Simplify your negation to a readable form.
(c) Use your negation to explain why lim(x→0) 1/x does not exist.`,
    hints: [
      'Negate systematically: ∀ becomes ∃, → becomes ∧ with negated consequent.',
      'The negation says: for some ε, no δ works.',
      'For (c), show that for some ε, you can always find x close to 0 where |1/x| is large.'
    ],
    solution: `(a) Negation:
¬[∀ε > 0 ∃δ > 0 ∀x (0 < |x - a| < δ → |f(x) - L| < ε)]
≡ ∃ε > 0 ¬[∃δ > 0 ∀x (0 < |x - a| < δ → |f(x) - L| < ε)]
≡ ∃ε > 0 ∀δ > 0 ¬[∀x (0 < |x - a| < δ → |f(x) - L| < ε)]
≡ ∃ε > 0 ∀δ > 0 ∃x ¬(0 < |x - a| < δ → |f(x) - L| < ε)
≡ ∃ε > 0 ∀δ > 0 ∃x (0 < |x - a| < δ ∧ |f(x) - L| ≥ ε)

(b) Simplified: "There exists ε > 0 such that for every δ > 0, some x within δ of a (but not equal to a) has |f(x) - L| ≥ ε."

(c) For f(x) = 1/x at a = 0 with any proposed L:
Let ε = 1. For any δ > 0, choose x = min(δ/2, 1/(|L| + 2)).
Then 0 < |x| < δ, but |1/x| > |L| + 1, so |1/x - L| ≥ 1 = ε.
No matter what δ we try, we can find an x close to 0 where 1/x is far from any fixed L.`
  },
  {
    id: 'math101-t6-ex15',
    subjectId: 'math101',
    topicId: 'math101-topic-6',
    type: 'written',
    difficulty: 5,
    title: 'Well-Ordering and Induction',
    description: `The Well-Ordering Principle states: Every non-empty subset of natural numbers has a least element.

(a) Express this in predicate logic. (Let N = natural numbers, S ⊆ N)
(b) Prove that ¬[∃n ∈ ℕ ∀m ∈ ℕ (m > n)] using well-ordering.
(c) Explain the connection between well-ordering and mathematical induction.`,
    hints: [
      'For (a), use set membership and the ≤ relation.',
      'For (b), assume the negation and derive a contradiction using well-ordering.',
      'For (c), think about what happens if a property fails somewhere.'
    ],
    solution: `(a) Well-Ordering in predicate logic:
∀S ((S ⊆ ℕ ∧ S ≠ ∅) → ∃n (n ∈ S ∧ ∀m (m ∈ S → n ≤ m)))
"Every non-empty subset of naturals has a minimum element."

(b) We want to prove there is no largest natural number.
Statement to prove: ∀n ∈ ℕ ∃m ∈ ℕ (m > n)
Proof: For any n, let m = n + 1. Then m > n and m ∈ ℕ. ✓
(Note: This doesn't directly use well-ordering, but well-ordering implies
there's a least natural, which combined with the successor property gives
no maximum.)

(c) Connection: Well-ordering implies strong induction.
Suppose P(0) is true and ∀k (P(k) → P(k+1)).
Assume ∃n ¬P(n). Let S = {n ∈ ℕ : ¬P(n)}.
By well-ordering, S has a minimum element m.
- If m = 0: contradicts P(0) being true.
- If m > 0: then P(m-1) is true (since m is minimum in S),
  so P(m) is true by the inductive step. Contradiction.
Therefore ∀n P(n). This shows well-ordering implies induction works.`
  },
  {
    id: 'math101-t6-ex16',
    subjectId: 'math101',
    topicId: 'math101-topic-6',
    type: 'written',
    difficulty: 5,
    title: 'Prenex Normal Form',
    description: `Convert the following formulas to prenex normal form (all quantifiers at the front):

(a) (∀x P(x)) → (∃y Q(y))
(b) ∀x (P(x) → ∃y R(x, y))
(c) (∃x P(x)) ∧ (∀y Q(y))

State the rules you use for each step.`,
    hints: [
      'Use equivalences: (∀x φ) → ψ ≡ ∃x (φ → ψ) when x not free in ψ.',
      'Rename variables if needed to avoid capture.',
      'Pull quantifiers out one at a time.'
    ],
    solution: `(a) (∀x P(x)) → (∃y Q(y))
    Step 1: Use (∀x φ) → ψ ≡ ∃x (φ → ψ) since y not in P(x)
    ≡ ∃x (P(x) → ∃y Q(y))
    Step 2: Use φ → ∃y ψ ≡ ∃y (φ → ψ) since y not in P(x)
    ≡ ∃x ∃y (P(x) → Q(y))
    Prenex form: ∃x ∃y (P(x) → Q(y))

(b) ∀x (P(x) → ∃y R(x, y))
    Step 1: Use φ → ∃y ψ ≡ ∃y (φ → ψ) — but careful, y might depend on x
    ≡ ∀x ∃y (P(x) → R(x, y))
    Prenex form: ∀x ∃y (P(x) → R(x, y))
    (Already almost prenex; just needed to recognize the scope.)

(c) (∃x P(x)) ∧ (∀y Q(y))
    Step 1: Rename to avoid confusion (variables are already distinct)
    Step 2: Use (∃x φ) ∧ ψ ≡ ∃x (φ ∧ ψ) since x not free in Q(y)
    ≡ ∃x (P(x) ∧ ∀y Q(y))
    Step 3: Use φ ∧ ∀y ψ ≡ ∀y (φ ∧ ψ) since y not free in P(x)
    ≡ ∃x ∀y (P(x) ∧ Q(y))
    Prenex form: ∃x ∀y (P(x) ∧ Q(y))`
  }
];
