import type { WrittenExercise } from '../../../../core/types';

export const topic3Exercises: WrittenExercise[] = [
  // --- DRILLS (Simple Checks) ---
  {
    id: 'math101-t3-drill-1',
    subjectId: 'math101',
    topicId: 'math101-topic-3',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Element Check',
    description: 'Is 3 an element of the set {1, 2, 3}?',
    hints: ['Look for the number 3 inside the curly braces.'] ,
    solution: 'Yes.'
  },
  {
    id: 'math101-t3-drill-2',
    subjectId: 'math101',
    topicId: 'math101-topic-3',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Union',
    description: 'Find the union of {1} and {2}.',
    hints: ['Combine all elements.'] ,
    solution: '{1, 2}'
  },
  {
    id: 'math101-t3-drill-3',
    subjectId: 'math101',
    topicId: 'math101-topic-3',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Intersection',
    description: 'Find the intersection of {1, 2} and {2, 3}.',
    hints: ['Find the common elements.'] ,
    solution: '{2}'
  },
  {
    id: 'math101-t3-drill-4',
    subjectId: 'math101',
    topicId: 'math101-topic-3',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Subset Check',
    description: 'Is {1} a subset of {1, 2}?',
    hints: ['Is every element of the first set in the second set?'] ,
    solution: 'Yes.'
  },

  // EXISTING exercise
  {
    id: 'math101-ex-3',
    subjectId: 'math101',
    topicId: 'math101-topic-3',
    type: 'written',
    difficulty: 2,
    title: 'Set Operations',
    description: `Given the sets A = {1, 2, 3, 4, 5}, B = {4, 5, 6, 7, 8}, and the universal set U = {1, 2, ..., 10}, compute the following:
(a) A ∪ B
(b) A ∩ B
(c) A - B
(d) The complement of (A ∪ B)`,
    hints: [
      'Union combines all elements.',
      'Intersection takes only common elements.',
      'Difference A-B removes elements of B from A.',
      'Complement takes all elements in U not in the set.'
    ],
    solution: `(a) A ∪ B = {1, 2, 3, 4, 5, 6, 7, 8}
(b) A ∩ B = {4, 5}
(c) A - B = {1, 2, 3}
(d) (A ∪ B)' = U - {1, 2, 3, 4, 5, 6, 7, 8} = {9, 10}`
  },
  {
    id: 'math101-t3-ex02',
    subjectId: 'math101',
    topicId: 'math101-topic-3',
    type: 'written',
    difficulty: 1,
    title: 'Subsets',
    description: 'List all subsets of the set A = {x, y, z}. How many are there?',
    hints: [
      'Don\'t forget the empty set and the set itself.',
      'The number of subsets is 2^n where n is the number of elements.'
    ],
    solution: `Subsets of {x, y, z}:
1. ∅
2. {x}
3. {y}
4. {z}
5. {x, y}
6. {x, z}
7. {y, z}
8. {x, y, z}

There are 8 subsets total (2³ = 8).`
  },
  {
    id: 'math101-t3-ex03',
    subjectId: 'math101',
    topicId: 'math101-topic-3',
    type: 'written',
    difficulty: 2,
    title: 'Venn Diagrams',
    description: 'Draw (or describe) a Venn diagram shading the region corresponding to A ∩ (B ∪ C).',
    hints: [
      'Draw three overlapping circles A, B, C.',
      'First identify B ∪ C (everything in B or C).',
      'Then overlap that with A.'
    ],
    solution: `Description of shaded region:
The region consists of two parts:
1. The central region where all three circles overlap (A ∩ B ∩ C).
2. The regions where A overlaps strictly with B (but not C) and where A overlaps strictly with C (but not B).

Basically, shade any part of A that is ALSO inside either B or C.`
  },
  {
    id: 'math101-t3-ex04',
    subjectId: 'math101',
    topicId: 'math101-topic-3',
    type: 'written',
    difficulty: 3,
    title: 'Set Identities Proof',
    description: 'Prove the distributive law using set builder notation: A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C).',
    hints: [
      'Start with x ∈ LHS.',
      'Convert to logic: x ∈ A ∧ (x ∈ B ∨ x ∈ C).',
      'Use logical distributivity.',
      'Convert back to set notation.'
    ],
    solution: `Proof:
Let x be an arbitrary element.
x ∈ A ∩ (B ∪ C)
⟺ x ∈ A ∧ x ∈ (B ∪ C)    [Def of Intersection]
⟺ x ∈ A ∧ (x ∈ B ∨ x ∈ C)    [Def of Union]
⟺ (x ∈ A ∧ x ∈ B) ∨ (x ∈ A ∧ x ∈ C)    [Distributive Law of Logic]
⟺ (x ∈ A ∩ B) ∨ (x ∈ A ∩ C)    [Def of Intersection]
⟺ x ∈ (A ∩ B) ∪ (A ∩ C)    [Def of Union]

Since the steps are reversible equivalences, LHS = RHS.`
  },
  {
    id: 'math101-t3-ex05',
    subjectId: 'math101',
    topicId: 'math101-topic-3',
    type: 'written',
    difficulty: 2,
    title: 'Cartesian Product',
    description: 'Let A = {1, 2} and B = {a, b, c}. List the elements of A × B and B × A. Are they equal?',
    hints: [
      'A × B consists of ordered pairs (a, b) where a ∈ A and b ∈ B.',
      'Order matters in the pairs.'
    ],
    solution: `A × B = {(1,a), (1,b), (1,c), (2,a), (2,b), (2,c)}
B × A = {(a,1), (a,2), (b,1), (b,2), (c,1), (c,2)}

They are NOT equal because (1,a) ≠ (a,1).`
  },
  {
    id: 'math101-t3-ex06',
    subjectId: 'math101',
    topicId: 'math101-topic-3',
    type: 'written',
    difficulty: 3,
    title: 'Set Difference Properties',
    description: 'Prove or disprove: A - (B ∩ C) = (A - B) ∩ (A - C).',
    hints: [
      'Try a Venn diagram or a concrete example first.',
      'Let A={1,2}, B={2}, C={2}.'
    ],
    solution: `Disproof by counterexample.
Let A = {1, 2}, B = {2}, C = {1}.

LHS: B ∩ C = ∅. So A - ∅ = {1, 2}.
RHS: A - B = {1}. A - C = {2}. Intersection = {1} ∩ {2} = ∅.

{1, 2} ≠ ∅.

Correct Identity: A - (B ∩ C) = (A - B) ∪ (A - C) (De Morgan's Law for sets).`
  },
  {
    id: 'math101-t3-ex07',
    subjectId: 'math101',
    topicId: 'math101-topic-3',
    type: 'written',
    difficulty: 3,
    title: 'Inclusion-Exclusion Principle',
    description: 'In a class of 50 students, 30 take Math, 25 take CS, and 10 take both. How many take neither?',
    hints: [
      'Use |A ∪ B| = |A| + |B| - |A ∩ B|.',
      'The "neither" group is Total - |A ∪ B|.'
    ],
    solution: `Let M be set of Math students, C be set of CS students.
|M| = 30, |C| = 25, |M ∩ C| = 10.

Students taking at least one (Union):
|M ∪ C| = |M| + |C| - |M ∩ C|
|M ∪ C| = 30 + 25 - 10 = 45.

Students taking neither:
Total - |M ∪ C| = 50 - 45 = 5.`
  },
  {
    id: 'math101-t3-ex08',
    subjectId: 'math101',
    topicId: 'math101-topic-3',
    type: 'written',
    difficulty: 2,
    title: 'Set Builder Notation',
    description: 'Express the set of all odd integers using set builder notation.',
    hints: [
      'An odd integer can be written as 2k+1 where k is an integer.',
      'Use Z for the set of integers.'
    ],
    solution: '{x ∈ Z | ∃k ∈ Z, x = 2k + 1}'
  },
  {
    id: 'math101-t3-ex09',
    subjectId: 'math101',
    topicId: 'math101-topic-3',
    type: 'written',
    difficulty: 3,
    title: 'Symmetric Difference',
    description: `The symmetric difference A ⊕ B (or A Δ B) contains elements in A or B but NOT in both. 
(a) Compute {1, 2, 3} ⊕ {3, 4, 5}.
(b) Prove A ⊕ B = (A - B) ∪ (B - A).`,
    hints: [
      'Think "XOR" for sets.',
      'Identify elements unique to each set.'
    ],
    solution: `(a) {1, 2, 3} ⊕ {3, 4, 5}
Elements in first only: {1, 2}
Elements in second only: {4, 5}
Union: {1, 2, 4, 5}

(b) Proof:
x ∈ A ⊕ B 
⟺ (x ∈ A ∨ x ∈ B) ∧ ¬(x ∈ A ∧ x ∈ B)  [Def of XOR]
⟺ (x ∈ A ∧ x ∉ B) ∨ (x ∈ B ∧ x ∉ A)   [Logical equivalence]
⟺ x ∈ (A - B) ∨ x ∈ (B - A)           [Def of Set Difference]
⟺ x ∈ (A - B) ∪ (B - A)               [Def of Union]`
  },
  {
    id: 'math101-t3-ex10',
    subjectId: 'math101',
    topicId: 'math101-topic-3',
    type: 'written',
    difficulty: 1,
    title: 'Disjoint Sets',
    description: 'Are the sets of prime numbers and composite numbers disjoint? Why or why not?',
    hints: [
      'Two sets are disjoint if their intersection is empty.',
      'Consider definitions of prime and composite.',
      'Is there any number that is both? Is there any number that is neither?'
    ],
    solution: `Yes, they are disjoint.
A prime number has exactly 2 divisors (1 and itself).
A composite number has more than 2 divisors.
No number can satisfy both definitions simultaneously. Therefore Primes ∩ Composites = ∅.

(Note: The number 1 is neither prime nor composite, but that doesn\'t affect disjointness).`
  },
  {
    id: 'math101-t3-ex11',
    subjectId: 'math101',
    topicId: 'math101-topic-3',
    type: 'written',
    difficulty: 4,
    title: 'Partitions',
    description: `Let S = {1, 2, 3, 4, 5, 6}. Definition: A partition is a collection of non-empty disjoint subsets whose union is S.
Which of the following are valid partitions of S?
(a) {{1, 2}, {3, 4, 5}, {6}}
(b) {{1, 2, 3}, {3, 4, 5, 6}}
(c) {{1, 2}, {4, 5, 6}}`,
    hints: [
      'Check 1: Are subsets non-empty?',
      'Check 2: Are they disjoint (no overlaps)?',
      'Check 3: Do they cover all of S?'
    ],
    solution: `(a) Valid. Disjoint and union is S.
(b) Invalid. Sets overlap at {3} (not disjoint).
(c) Invalid. Element 3 is missing (union is not S).`
  },
  {
    id: 'math101-t3-ex12',
    subjectId: 'math101',
    topicId: 'math101-topic-3',
    type: 'written',
    difficulty: 5,
    title: 'Power Set Cardinality',
    description: 'If set A has n elements, prove that its Power Set P(A) has 2^n elements using induction or combinatorial argument.',
    hints: [
      'Combinatorial: For each element, you have 2 choices (include or exclude).',
      'Induction: What happens when you add one element to a set?'
    ],
    solution: `Combinatorial Proof:
To form a subset, we consider each of the n elements in A one by one.
For the first element, we have 2 choices: either it is in the subset or it is not.
For the second element, we have 2 choices.
...
For the nth element, we have 2 choices.

Total ways to form a subset = 2 × 2 × ... × 2 (n times) = 2ⁿ.`
  },
  {
    id: 'math101-t3-ex13',
    subjectId: 'math101',
    topicId: 'math101-topic-3',
    type: 'written',
    difficulty: 3,
    title: 'Subset Proof',
    description: 'Prove that A ⊆ B if and only if A ∪ B = B.',
    hints: [
      'Prove two directions: (1) If A ⊆ B then A ∪ B = B. (2) If A ∪ B = B then A ⊆ B.'
    ],
    solution: `Direction 1 (⇒): Assume A ⊆ B.
We know B ⊆ A ∪ B always.
Let x ∈ A ∪ B. Then x ∈ A or x ∈ B.
If x ∈ A, since A ⊆ B, then x ∈ B.
So in all cases x ∈ B.
Thus A ∪ B ⊆ B.
Combining gives A ∪ B = B.

Direction 2 (⇐): Assume A ∪ B = B.
Let x ∈ A.
Then x ∈ A ∪ B (definition of union).
Since A ∪ B = B, then x ∈ B.
Therefore A ⊆ B.`
  },
  {
    id: 'math101-t3-ex14',
    subjectId: 'math101',
    topicId: 'math101-topic-3',
    type: 'written',
    difficulty: 4,
    title: 'Generalized Union/Intersection',
    description: `Let A_n = [0, 1/n) for n = 1, 2, 3... (Interval notation).
Find the infinite intersection ∩(n=1 to ∞) A_n.`,
    hints: [
      'Write out the first few sets: [0, 1), [0, 1/2), [0, 1/3)...',
      'What element is in ALL of them?',
      'Is there any positive number epsilon > 0 that is in all of them?'
    ],
    solution: `The intersection is {0}.

Reasoning:
0 is in every interval [0, 1/n) because 0 < 1/n for all positive integers n.

Suppose there is some positive number x > 0 in the intersection.
By the Archimedean property, there exists an integer N such that 1/N < x.
Then x is NOT in the interval [0, 1/N).
So x cannot be in the intersection.

Thus, only 0 remains.`
  },
  {
    id: 'math101-t3-ex15',
    subjectId: 'math101',
    topicId: 'math101-topic-3',
    type: 'written',
    difficulty: 5,
    title: 'Russell\'s Paradox',
    description: `Let R be the set of all sets that do not contain themselves as an element. R = {S | S ∉ S}.
Is R ∈ R? Explain the contradiction.`,
    hints: [
      'Assume R ∈ R. What does the definition of R imply?',
      'Assume R ∉ R. What does the definition of R imply?',
      'This paradox shows naive set theory is flawed.'
    ],
    solution: `Case 1: Assume R ∈ R.
By definition of R, if a set is in R, it does NOT contain itself.
So R ∈ R implies R ∉ R. Contradiction.

Case 2: Assume R ∉ R.
By definition of R, if a set does NOT contain itself, it must be in R.
So R ∉ R implies R ∈ R. Contradiction.

Conclusion: Such a set R cannot exist. This necessitated the development of axiomatic set theory (ZFC) which restricts how sets can be constructed.`
  },
  {
    id: 'math101-t3-ex16',
    subjectId: 'math101',
    topicId: 'math101-topic-3',
    type: 'written',
    difficulty: 3,
    title: 'Bit Vector Representation',
    description: `Suppose the universal set is U = {1, 2, 3, 4, 5, 6, 7, 8}. A subset can be represented by an 8-bit binary string where the ith bit is 1 if i is in the set.
(a) What is the bit string for A = {1, 3, 4, 8}?
(b) What set operation corresponds to the bitwise AND of two strings?
(c) What set operation corresponds to bitwise OR?`,
    hints: [
      'Order the bits from 1 to 8.',
      'AND is 1 only if both inputs are 1.',
      'OR is 1 if either input is 1.'
    ],
    solution: `(a) Set: {1, 3, 4, 8}
Positions: 1 2 3 4 5 6 7 8
Bits:      1 0 1 1 0 0 0 1
String: 10110001

(b) Bitwise AND corresponds to Intersection (∩). An element is in the result only if it is in BOTH sets.

(c) Bitwise OR corresponds to Union (∪). An element is in the result if it is in EITHER set.`
  }
];
