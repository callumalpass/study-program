import type { WrittenExercise } from '../../../core/types';

export const math101Exercises: WrittenExercise[] = [
  {
    id: 'math101-ex-1',
    subjectId: 'math101',
    topicId: 'math101-topic-1',
    type: 'written',
    title: 'Truth Tables and Logical Equivalence',
    description: 'Construct a truth table for the proposition ((P → Q) ∧ (Q → R)) → (P → R). Determine whether this proposition is a tautology, contradiction, or contingency. Then prove that (P → Q) is logically equivalent to (¬Q → ¬P) using a truth table.',
    hints: [
      'Start by identifying all atomic propositions (P, Q, R) and create columns for each.',
      'Build up complex expressions step by step, creating intermediate columns.',
      'A tautology has all true values in its final column.',
      'For logical equivalence, two expressions must have identical truth values in all rows.'
    ],
    solution: 'The truth table shows that ((P → Q) ∧ (Q → R)) → (P → R) is always true, making it a tautology. This represents the transitive property of implication.\n\nFor the second part, the truth table for (P → Q) and (¬Q → ¬P) shows:\nP | Q | P→Q | ¬Q | ¬P | ¬Q→¬P\nT | T |  T  | F  | F  |   T\nT | F |  F  | T  | F  |   F\nF | T |  T  | F  | T  |   T\nF | F |  T  | T  | T  |   T\n\nSince columns P→Q and ¬Q→¬P are identical, the propositions are logically equivalent. This is the contrapositive relationship.'
  },
  {
    id: 'math101-ex-2',
    subjectId: 'math101',
    topicId: 'math101-topic-2',
    type: 'written',
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
    id: 'math101-ex-3',
    subjectId: 'math101',
    topicId: 'math101-topic-3',
    type: 'written',
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
    id: 'math101-ex-4',
    subjectId: 'math101',
    topicId: 'math101-topic-4',
    type: 'written',
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
    id: 'math101-ex-5',
    subjectId: 'math101',
    topicId: 'math101-topic-5',
    type: 'written',
    title: 'Function Properties and Composition',
    description: 'Let f: ℝ → ℝ be defined by f(x) = 3x - 2 and g: ℝ → ℝ be defined by g(x) = x² + 1. (a) Find (f ∘ g)(x) and (g ∘ f)(x). (b) Determine if f is injective, surjective, and/or bijective. (c) Find f⁻¹(x) if it exists. (d) Prove that if f: A → B and g: B → C are both injective, then g ∘ f: A → C is also injective.',
    hints: [
      'For composition, substitute one function into the other.',
      'For injectivity, check if f(x₁) = f(x₂) implies x₁ = x₂.',
      'For surjectivity, check if every y in codomain has a preimage.',
      'To find inverse, solve y = f(x) for x in terms of y.',
      'Use the definitions directly in the proof about composition.'
    ],
    solution: '(a) (f ∘ g)(x) = f(g(x)) = f(x² + 1) = 3(x² + 1) - 2 = 3x² + 1\n    (g ∘ f)(x) = g(f(x)) = g(3x - 2) = (3x - 2)² + 1 = 9x² - 12x + 5\n\n(b) Injective: Suppose f(x₁) = f(x₂). Then 3x₁ - 2 = 3x₂ - 2, so 3x₁ = 3x₂, thus x₁ = x₂. YES, injective.\n    Surjective: For any y ∈ ℝ, we need x such that 3x - 2 = y. Solving: x = (y + 2)/3, which exists for all y. YES, surjective.\n    Bijective: YES (both injective and surjective).\n\n(c) To find f⁻¹: Let y = 3x - 2. Solve for x: x = (y + 2)/3. Therefore f⁻¹(x) = (x + 2)/3.\n\n(d) Proof: Let f: A → B and g: B → C both be injective. We must show g ∘ f is injective.\n    Suppose (g ∘ f)(a₁) = (g ∘ f)(a₂) for a₁, a₂ ∈ A.\n    Then g(f(a₁)) = g(f(a₂)).\n    Since g is injective, f(a₁) = f(a₂).\n    Since f is injective, a₁ = a₂.\n    Therefore g ∘ f is injective.'
  }
];
