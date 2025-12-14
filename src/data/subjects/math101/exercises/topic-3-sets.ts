import type { WrittenExercise } from '../../../../core/types';

export const topic3Exercises: WrittenExercise[] = [
  // EXISTING exercise - preserve ID
  {
    id: 'math101-ex-3',
    subjectId: 'math101',
    topicId: 'math101-topic-3',
    type: 'written',
    difficulty: 3,
    title: 'Set Operations and Identities',
    description: 'Let U = {1,2,3,4,5,6,7,8,9,10}, A = {1,2,3,4,5}, and B = {4,5,6,7,8}. Find: (a) A ∪ B, (b) A ∩ B, (c) A - B, (d) B - A, (e) A\', (f) (A ∪ B)\'. Then prove using set algebra that A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C) for arbitrary sets.',
    hints: [
      'For union, combine all unique elements from both sets.',
      'For intersection, find only common elements.',
      'For set difference A - B, include elements in A but not in B.',
      'Complement includes all elements in U not in the set.',
      'Use element argument or algebraic laws to prove the distributive property.'
    ],
    solution: '(a) A ∪ B = {1,2,3,4,5,6,7,8}\n(b) A ∩ B = {4,5}\n(c) A - B = {1,2,3}\n(d) B - A = {6,7,8}\n(e) A\' = {6,7,8,9,10}\n(f) (A ∪ B)\' = {9,10}\n\nProof of distributive law A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C):\n\nLet x be an arbitrary element. We show x is in the left side if and only if x is in the right side.\n\n(→) Suppose x ∈ A ∩ (B ∪ C). Then x ∈ A and x ∈ (B ∪ C). So x ∈ A and (x ∈ B or x ∈ C). By distributive law of logic: (x ∈ A and x ∈ B) or (x ∈ A and x ∈ C). Therefore x ∈ (A ∩ B) or x ∈ (A ∩ C), which means x ∈ (A ∩ B) ∪ (A ∩ C).\n\n(←) Similar argument in reverse direction. Therefore the sets are equal.'
  },
  {
    id: 'math101-t3-ex02',
    subjectId: 'math101',
    topicId: 'math101-topic-3',
    type: 'written',
    difficulty: 1,
    title: 'Set Builder Notation',
    description: 'Write the following sets in set-builder notation:\n(a) {2, 4, 6, 8, 10, ...}\n(b) {1, 4, 9, 16, 25, ...}\n(c) {..., -6, -3, 0, 3, 6, 9, ...}',
    hints: [
      'Identify the pattern that generates each set',
      'Use {x | condition} or {x ∈ D | condition} format',
      'Consider what domain the elements come from'
    ],
    solution: '(a) {2, 4, 6, 8, 10, ...} - positive even integers\n= {x ∈ ℤ⁺ | x is even}\n= {2n | n ∈ ℤ⁺}\n= {x | x = 2n for some positive integer n}\n\n(b) {1, 4, 9, 16, 25, ...} - perfect squares\n= {n² | n ∈ ℤ⁺}\n= {x ∈ ℤ⁺ | x is a perfect square}\n= {x | x = n² for some positive integer n}\n\n(c) {..., -6, -3, 0, 3, 6, 9, ...} - multiples of 3\n= {3n | n ∈ ℤ}\n= {x ∈ ℤ | 3 divides x}\n= {x ∈ ℤ | x ≡ 0 (mod 3)}'
  },
  {
    id: 'math101-t3-ex03',
    subjectId: 'math101',
    topicId: 'math101-topic-3',
    type: 'written',
    difficulty: 2,
    title: 'Power Set',
    description: 'Find the power set of A = {a, b, c}. How many elements does P(A) have? In general, if |A| = n, what is |P(A)|?',
    hints: [
      'Power set includes ALL subsets, including ∅ and A itself',
      'List subsets systematically by size',
      'Each element is either in or out of a subset'
    ],
    solution: 'A = {a, b, c}\n\nP(A) = {\n  ∅,                    (0 elements)\n  {a}, {b}, {c},        (1 element each)\n  {a,b}, {a,c}, {b,c},  (2 elements each)\n  {a,b,c}               (3 elements)\n}\n\n|P(A)| = 1 + 3 + 3 + 1 = 8 = 2³\n\nIn general, if |A| = n, then |P(A)| = 2ⁿ.\n\nReason: For each subset, each of the n elements is either included or excluded. That\'s 2 choices per element, giving 2 × 2 × ... × 2 (n times) = 2ⁿ possible subsets.'
  },
  {
    id: 'math101-t3-ex04',
    subjectId: 'math101',
    topicId: 'math101-topic-3',
    type: 'written',
    difficulty: 2,
    title: 'Cartesian Product',
    description: 'Let A = {1, 2} and B = {x, y, z}. Find:\n(a) A × B\n(b) B × A\n(c) |A × B|\n(d) Is A × B = B × A?',
    hints: [
      'A × B = {(a, b) | a ∈ A and b ∈ B}',
      'Order matters in ordered pairs',
      '|A × B| = |A| × |B|'
    ],
    solution: '(a) A × B = {(a, b) | a ∈ A, b ∈ B}\n= {(1, x), (1, y), (1, z), (2, x), (2, y), (2, z)}\n\n(b) B × A = {(b, a) | b ∈ B, a ∈ A}\n= {(x, 1), (x, 2), (y, 1), (y, 2), (z, 1), (z, 2)}\n\n(c) |A × B| = |A| × |B| = 2 × 3 = 6\n\n(d) A × B ≠ B × A\n\nThey have the same cardinality (6 elements each), but the elements are different because order matters in ordered pairs. For example:\n(1, x) ∈ A × B but (1, x) ∉ B × A\n(x, 1) ∈ B × A but (x, 1) ∉ A × B\n\nIn general, A × B = B × A only when A = B or one of the sets is empty.'
  },
  {
    id: 'math101-t3-ex05',
    subjectId: 'math101',
    topicId: 'math101-topic-3',
    type: 'written',
    difficulty: 3,
    title: 'De Morgan\'s Laws for Sets',
    description: 'Prove De Morgan\'s laws for sets:\n(a) (A ∪ B)\' = A\' ∩ B\'\n(b) (A ∩ B)\' = A\' ∪ B\'',
    hints: [
      'Show each side is a subset of the other',
      'Use element-chasing argument',
      'x ∈ (A ∪ B)\' means x ∉ A ∪ B'
    ],
    solution: '(a) Proof that (A ∪ B)\' = A\' ∩ B\'\n\n(⊆) Let x ∈ (A ∪ B)\'.\nThen x ∉ A ∪ B.\nSo x ∉ A AND x ∉ B.\nThus x ∈ A\' AND x ∈ B\'.\nTherefore x ∈ A\' ∩ B\'.\n\n(⊇) Let x ∈ A\' ∩ B\'.\nThen x ∈ A\' AND x ∈ B\'.\nSo x ∉ A AND x ∉ B.\nThus x ∉ A ∪ B.\nTherefore x ∈ (A ∪ B)\'.\n\nSince each set is a subset of the other, (A ∪ B)\' = A\' ∩ B\'.\n\n(b) Proof that (A ∩ B)\' = A\' ∪ B\'\n\n(⊆) Let x ∈ (A ∩ B)\'.\nThen x ∉ A ∩ B.\nSo NOT(x ∈ A AND x ∈ B).\nBy logic: x ∉ A OR x ∉ B.\nThus x ∈ A\' OR x ∈ B\'.\nTherefore x ∈ A\' ∪ B\'.\n\n(⊇) Similar argument in reverse.\n\nQ.E.D.'
  },
  {
    id: 'math101-t3-ex06',
    subjectId: 'math101',
    topicId: 'math101-topic-3',
    type: 'written',
    difficulty: 2,
    title: 'Venn Diagrams',
    description: 'In a class of 40 students, 25 study Math, 20 study Physics, and 10 study both. Using set notation, find:\n(a) Students studying Math or Physics\n(b) Students studying only Math\n(c) Students studying neither subject',
    hints: [
      'Use inclusion-exclusion: |A ∪ B| = |A| + |B| - |A ∩ B|',
      'Only Math = Math - Both',
      'Neither = Total - (Math or Physics)'
    ],
    solution: 'Let M = students studying Math, P = students studying Physics.\n|M| = 25, |P| = 20, |M ∩ P| = 10, |U| = 40\n\n(a) Students studying Math or Physics: |M ∪ P|\nBy inclusion-exclusion:\n|M ∪ P| = |M| + |P| - |M ∩ P|\n        = 25 + 20 - 10\n        = 35 students\n\n(b) Students studying only Math: |M - P| or |M ∩ P\'|\n|M - P| = |M| - |M ∩ P|\n       = 25 - 10\n       = 15 students\n\n(c) Students studying neither: |(M ∪ P)\'|\n|(M ∪ P)\'| = |U| - |M ∪ P|\n          = 40 - 35\n          = 5 students'
  },
  {
    id: 'math101-t3-ex07',
    subjectId: 'math101',
    topicId: 'math101-topic-3',
    type: 'written',
    difficulty: 4,
    title: 'Subset Proofs',
    description: 'Prove that for any sets A, B, C:\n(a) If A ⊆ B, then A ∩ C ⊆ B ∩ C\n(b) If A ⊆ B and C ⊆ D, then A × C ⊆ B × D',
    hints: [
      'To prove X ⊆ Y, show every element of X is in Y',
      'Let x be an arbitrary element of the left side',
      'Use the given subset relationships'
    ],
    solution: '(a) Proof: If A ⊆ B, then A ∩ C ⊆ B ∩ C\n\nLet x ∈ A ∩ C.\nThen x ∈ A AND x ∈ C.\nSince A ⊆ B and x ∈ A, we have x ∈ B.\nSo x ∈ B AND x ∈ C.\nTherefore x ∈ B ∩ C.\n\nSince every element of A ∩ C is in B ∩ C, we have A ∩ C ⊆ B ∩ C. ✓\n\n(b) Proof: If A ⊆ B and C ⊆ D, then A × C ⊆ B × D\n\nLet (x, y) ∈ A × C.\nBy definition of Cartesian product: x ∈ A AND y ∈ C.\nSince A ⊆ B and x ∈ A, we have x ∈ B.\nSince C ⊆ D and y ∈ C, we have y ∈ D.\nSo x ∈ B AND y ∈ D.\nTherefore (x, y) ∈ B × D.\n\nSince every element of A × C is in B × D, we have A × C ⊆ B × D. ✓\n\nQ.E.D.'
  },
  {
    id: 'math101-t3-ex08',
    subjectId: 'math101',
    topicId: 'math101-topic-3',
    type: 'written',
    difficulty: 4,
    title: 'Set Algebra Proof',
    description: 'Prove the absorption law: A ∪ (A ∩ B) = A',
    hints: [
      'Show A ⊆ A ∪ (A ∩ B) and A ∪ (A ∩ B) ⊆ A',
      'For the first inclusion, use that A ⊆ A ∪ X for any X',
      'For the second, note both parts of the union are subsets of A'
    ],
    solution: 'Proof of Absorption Law: A ∪ (A ∩ B) = A\n\nWe prove double inclusion:\n\n(⊇) Prove A ⊆ A ∪ (A ∩ B):\nLet x ∈ A.\nSince x ∈ A, we have x ∈ A ∪ Y for any set Y.\nIn particular, x ∈ A ∪ (A ∩ B).\nThus A ⊆ A ∪ (A ∩ B). ✓\n\n(⊆) Prove A ∪ (A ∩ B) ⊆ A:\nLet x ∈ A ∪ (A ∩ B).\nThen x ∈ A OR x ∈ (A ∩ B).\n\nCase 1: x ∈ A. Then we\'re done.\n\nCase 2: x ∈ A ∩ B. Then x ∈ A AND x ∈ B.\nSo x ∈ A.\n\nIn both cases, x ∈ A.\nThus A ∪ (A ∩ B) ⊆ A. ✓\n\nSince A ⊆ A ∪ (A ∩ B) and A ∪ (A ∩ B) ⊆ A, we have A ∪ (A ∩ B) = A.\n\nQ.E.D.\n\nNote: The dual absorption law A ∩ (A ∪ B) = A can be proven similarly.'
  }
];
