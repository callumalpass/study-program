import type { WrittenExercise } from '../../../../core/types';

export const topic4Exercises: WrittenExercise[] = [
  // EXISTING exercise - preserve ID
  {
    id: 'math101-ex-4',
    subjectId: 'math101',
    topicId: 'math101-topic-4',
    type: 'written',
    difficulty: 4,
    title: 'Relations and Their Properties',
    description: 'Consider the relation R on the set A = {1,2,3,4} defined by R = {(1,1), (1,2), (2,1), (2,2), (3,3), (4,4)}. Determine whether R is reflexive, symmetric, antisymmetric, and/or transitive. Justify each answer. Then define an equivalence relation on the set of integers Z where aRb if a and b have the same remainder when divided by 3. Prove it is an equivalence relation and describe the equivalence classes.',
    hints: [
      'Reflexive: Check if (a,a) ∈ R for all a ∈ A.',
      'Symmetric: Check if (a,b) ∈ R implies (b,a) ∈ R.',
      'Antisymmetric: Check if (a,b) ∈ R and (b,a) ∈ R implies a = b.',
      'Transitive: Check if (a,b) ∈ R and (b,c) ∈ R implies (a,c) ∈ R.',
      'For equivalence relation, prove all three properties: reflexive, symmetric, transitive.'
    ],
    solution: 'Analysis of R:\n- Reflexive: YES. All pairs (1,1), (2,2), (3,3), (4,4) are in R.\n- Symmetric: YES. We have (1,2) and (2,1) both in R. All other pairs are symmetric by being reflexive.\n- Antisymmetric: NO. We have both (1,2) and (2,1) in R, but 1 ≠ 2.\n- Transitive: YES. Check all cases: (1,1)∘(1,2)→(1,2)✓, (1,2)∘(2,1)→(1,1)✓, (1,2)∘(2,2)→(1,2)✓, etc.\n\nProof that "same remainder mod 3" is an equivalence relation:\n\n1. Reflexive: Any integer a has the same remainder as itself when divided by 3, so aRa.\n\n2. Symmetric: If aRb (same remainder mod 3), then bRa (order doesn\'t matter for equality).\n\n3. Transitive: If aRb and bRc, then a and b have the same remainder r₁, and b and c have the same remainder r₂. Since b has remainder r₁ and r₂, we have r₁ = r₂. Thus a and c both have remainder r₁, so aRc.\n\nEquivalence classes: [0] = {...,-6,-3,0,3,6,...}, [1] = {...,-5,-2,1,4,7,...}, [2] = {...,-4,-1,2,5,8,...}'
  },
  {
    id: 'math101-t4-ex02',
    subjectId: 'math101',
    topicId: 'math101-topic-4',
    type: 'written',
    difficulty: 1,
    title: 'Relation Properties',
    description: 'For A = {1, 2, 3}, determine which properties (reflexive, symmetric, antisymmetric, transitive) each relation has:\n(a) R₁ = {(1,1), (2,2), (3,3)}\n(b) R₂ = {(1,2), (2,1)}\n(c) R₃ = {(1,2), (2,3), (1,3)}',
    hints: [
      'Check each property systematically',
      'Reflexive needs (a,a) for ALL elements',
      'One counterexample is enough to fail a property'
    ],
    solution: '(a) R₁ = {(1,1), (2,2), (3,3)} - the identity relation\n- Reflexive: YES (all diagonal pairs present)\n- Symmetric: YES (vacuously - no non-diagonal pairs)\n- Antisymmetric: YES (only diagonal pairs)\n- Transitive: YES (vacuously - can\'t form chains)\n\n(b) R₂ = {(1,2), (2,1)}\n- Reflexive: NO (missing (1,1), (2,2), (3,3))\n- Symmetric: YES ((1,2) and (2,1) both present)\n- Antisymmetric: NO (1R₂2 and 2R₂1 but 1≠2)\n- Transitive: NO ((1,2) and (2,1) but (1,1) missing)\n\n(c) R₃ = {(1,2), (2,3), (1,3)}\n- Reflexive: NO (no diagonal pairs)\n- Symmetric: NO ((1,2) but no (2,1))\n- Antisymmetric: YES (no symmetric pairs)\n- Transitive: YES ((1,2), (2,3) → (1,3) ✓)'
  },
  {
    id: 'math101-t4-ex03',
    subjectId: 'math101',
    topicId: 'math101-topic-4',
    type: 'written',
    difficulty: 2,
    title: 'Partial Order',
    description: 'The divisibility relation | on the set A = {1, 2, 3, 6} is defined as: a|b if a divides b. List all pairs in this relation and verify it is a partial order.',
    hints: [
      'a divides b means b = ka for some integer k',
      'A partial order is reflexive, antisymmetric, and transitive',
      'Draw the Hasse diagram to visualize'
    ],
    solution: 'First, list all pairs where a|b (a divides b):\n\n1 divides everything: (1,1), (1,2), (1,3), (1,6)\n2 divides 2 and 6: (2,2), (2,6)\n3 divides 3 and 6: (3,3), (3,6)\n6 divides 6: (6,6)\n\nR = {(1,1), (1,2), (1,3), (1,6), (2,2), (2,6), (3,3), (3,6), (6,6)}\n\nVerifying partial order properties:\n\n1. Reflexive: YES\n   (1,1), (2,2), (3,3), (6,6) all present.\n   Every number divides itself.\n\n2. Antisymmetric: YES\n   If a|b and b|a, then a = b (for positive integers).\n   Check: The only pairs (a,b), (b,a) with both in R are the diagonal pairs.\n\n3. Transitive: YES\n   If a|b and b|c, then a|c.\n   Check: (1,2),(2,6)→(1,6)✓  (1,3),(3,6)→(1,6)✓\n   All transitivity chains check out.\n\nTherefore | is a partial order on A.'
  },
  {
    id: 'math101-t4-ex04',
    subjectId: 'math101',
    topicId: 'math101-topic-4',
    type: 'written',
    difficulty: 2,
    title: 'Equivalence Classes',
    description: 'Define a relation R on ℤ by: aRb if and only if a - b is even. Prove R is an equivalence relation and find all equivalence classes.',
    hints: [
      'a - b even means a - b = 2k for some integer k',
      'Check reflexive, symmetric, transitive',
      'Equivalence classes partition ℤ'
    ],
    solution: 'Proof that R is an equivalence relation:\n\n1. Reflexive: For any a ∈ ℤ, a - a = 0 = 2(0), which is even.\n   So aRa. ✓\n\n2. Symmetric: Suppose aRb. Then a - b = 2k for some k ∈ ℤ.\n   Then b - a = -(a - b) = -2k = 2(-k), which is even.\n   So bRa. ✓\n\n3. Transitive: Suppose aRb and bRc.\n   Then a - b = 2k and b - c = 2m for some k, m ∈ ℤ.\n   Then a - c = (a - b) + (b - c) = 2k + 2m = 2(k + m), which is even.\n   So aRc. ✓\n\nEquivalence Classes:\nTwo integers are related iff they differ by an even number.\nThis means they have the same parity (both even or both odd).\n\n[0] = {..., -4, -2, 0, 2, 4, ...} = all even integers\n[1] = {..., -3, -1, 1, 3, 5, ...} = all odd integers\n\nThere are exactly 2 equivalence classes, partitioning ℤ into even and odd integers.'
  },
  {
    id: 'math101-t4-ex05',
    subjectId: 'math101',
    topicId: 'math101-topic-4',
    type: 'written',
    difficulty: 3,
    title: 'Relation Composition',
    description: 'Let R = {(1,2), (2,3), (3,1)} and S = {(1,3), (2,1), (3,2)} be relations on {1,2,3}. Find R ∘ S and S ∘ R.',
    hints: [
      'R ∘ S means "first apply S, then R"',
      '(a,c) ∈ R ∘ S if there exists b with (a,b) ∈ S and (b,c) ∈ R',
      'Check all possible combinations systematically'
    ],
    solution: 'For R ∘ S: (a,c) ∈ R ∘ S if ∃b: (a,b) ∈ S and (b,c) ∈ R\n\nCheck each element of S as the first step:\n- (1,3) ∈ S: Look for (3,?) in R. (3,1) ∈ R → (1,1) ∈ R∘S\n- (2,1) ∈ S: Look for (1,?) in R. (1,2) ∈ R → (2,2) ∈ R∘S\n- (3,2) ∈ S: Look for (2,?) in R. (2,3) ∈ R → (3,3) ∈ R∘S\n\nR ∘ S = {(1,1), (2,2), (3,3)}\n\nFor S ∘ R: (a,c) ∈ S ∘ R if ∃b: (a,b) ∈ R and (b,c) ∈ S\n\nCheck each element of R as the first step:\n- (1,2) ∈ R: Look for (2,?) in S. (2,1) ∈ S → (1,1) ∈ S∘R\n- (2,3) ∈ R: Look for (3,?) in S. (3,2) ∈ S → (2,2) ∈ S∘R\n- (3,1) ∈ R: Look for (1,?) in S. (1,3) ∈ S → (3,3) ∈ S∘R\n\nS ∘ R = {(1,1), (2,2), (3,3)}\n\nInterestingly, R ∘ S = S ∘ R = Identity relation in this case!'
  },
  {
    id: 'math101-t4-ex06',
    subjectId: 'math101',
    topicId: 'math101-topic-4',
    type: 'written',
    difficulty: 3,
    title: 'Closures',
    description: 'Let R = {(1,2), (2,3), (3,4)} on A = {1,2,3,4}. Find:\n(a) The reflexive closure of R\n(b) The symmetric closure of R\n(c) The transitive closure of R',
    hints: [
      'Reflexive closure: add diagonal pairs',
      'Symmetric closure: add reverse of each pair',
      'Transitive closure: add all pairs needed for transitivity'
    ],
    solution: 'R = {(1,2), (2,3), (3,4)}\n\n(a) Reflexive Closure r(R):\nAdd (a,a) for all a ∈ A:\nr(R) = R ∪ {(1,1), (2,2), (3,3), (4,4)}\n     = {(1,1), (1,2), (2,2), (2,3), (3,3), (3,4), (4,4)}\n\n(b) Symmetric Closure s(R):\nAdd (b,a) for each (a,b) in R:\ns(R) = R ∪ {(2,1), (3,2), (4,3)}\n     = {(1,2), (2,1), (2,3), (3,2), (3,4), (4,3)}\n\n(c) Transitive Closure t(R):\nRepeatedly add (a,c) when (a,b) and (b,c) exist:\n\nStart: {(1,2), (2,3), (3,4)}\n\nFirst pass:\n- (1,2), (2,3) → add (1,3)\n- (2,3), (3,4) → add (2,4)\n\nSecond pass:\n- (1,3), (3,4) → add (1,4)\n- (1,2), (2,4) → add (1,4) (already adding)\n\nt(R) = {(1,2), (1,3), (1,4), (2,3), (2,4), (3,4)}\n\nNote: This forms a total order 1 < 2 < 3 < 4'
  },
  {
    id: 'math101-t4-ex07',
    subjectId: 'math101',
    topicId: 'math101-topic-4',
    type: 'written',
    difficulty: 4,
    title: 'Total Order vs Partial Order',
    description: 'Consider the subset relation ⊆ on P({a,b}) = {∅, {a}, {b}, {a,b}}. Show this is a partial order but not a total order. Draw the Hasse diagram.',
    hints: [
      'Check reflexive, antisymmetric, transitive',
      'Total order requires every pair to be comparable',
      'Find two elements that are not related either way'
    ],
    solution: 'P({a,b}) = {∅, {a}, {b}, {a,b}}\n\nList all subset relations:\n∅ ⊆ ∅, ∅ ⊆ {a}, ∅ ⊆ {b}, ∅ ⊆ {a,b}\n{a} ⊆ {a}, {a} ⊆ {a,b}\n{b} ⊆ {b}, {b} ⊆ {a,b}\n{a,b} ⊆ {a,b}\n\nPartial Order Verification:\n1. Reflexive: Every set is a subset of itself. ✓\n2. Antisymmetric: If A ⊆ B and B ⊆ A, then A = B. ✓\n3. Transitive: If A ⊆ B and B ⊆ C, then A ⊆ C. ✓\n\nNot a Total Order:\n{a} and {b} are NOT comparable:\n- {a} ⊄ {b} (a is not in {b})\n- {b} ⊄ {a} (b is not in {a})\n\nSo neither {a} ⊆ {b} nor {b} ⊆ {a}.\n\nHasse Diagram:\n      {a,b}\n      /   \\\n    {a}   {b}\n      \\   /\n        ∅\n\n{a} and {b} are on the same level (incomparable).'
  },
  {
    id: 'math101-t4-ex08',
    subjectId: 'math101',
    topicId: 'math101-topic-4',
    type: 'written',
    difficulty: 5,
    title: 'Partition and Equivalence Relation',
    description: 'Prove: Every equivalence relation on a set A induces a partition of A, and conversely, every partition of A induces an equivalence relation.',
    hints: [
      'Equivalence classes are non-empty, disjoint, and cover A',
      'For partition → relation: define aRb if a and b are in the same block',
      'Verify all properties carefully'
    ],
    solution: 'Theorem: Equivalence relations and partitions are in bijective correspondence.\n\nPart 1: Equivalence Relation → Partition\n\nLet R be an equivalence relation on A. The equivalence classes form a partition.\n\n1. Non-empty: Each class [a] contains at least a (since aRa).\n\n2. Disjoint: Suppose [a] ∩ [b] ≠ ∅. Let c ∈ [a] ∩ [b].\n   Then aRc and bRc.\n   By symmetry: cRb.\n   By transitivity: aRb.\n   So for any x ∈ [a], we have xRa and aRb, giving xRb, so x ∈ [b].\n   Similarly [b] ⊆ [a]. Thus [a] = [b].\n   Contrapositive: If [a] ≠ [b], they are disjoint.\n\n3. Cover A: For any a ∈ A, a ∈ [a], so every element is in some class.\n\nPart 2: Partition → Equivalence Relation\n\nLet P = {B₁, B₂, ...} be a partition of A. Define aRb iff a and b are in the same block.\n\n1. Reflexive: a is in the same block as a. ✓\n\n2. Symmetric: If a and b are in the same block, then b and a are in the same block. ✓\n\n3. Transitive: If a,b are in block Bᵢ and b,c are in the same block, then since b is in exactly one block, c must also be in Bᵢ. So a,c are in the same block. ✓\n\nQ.E.D.'
  }
];
