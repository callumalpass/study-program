import type { WrittenExercise } from '../../../../core/types';

export const topic5Exercises: WrittenExercise[] = [
  // EXISTING exercise - preserve ID
  {
    id: 'math101-ex-5',
    subjectId: 'math101',
    topicId: 'math101-topic-5',
    type: 'written',
    difficulty: 4,
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
  },
  {
    id: 'math101-t5-ex02',
    subjectId: 'math101',
    topicId: 'math101-topic-5',
    type: 'written',
    difficulty: 1,
    title: 'Function Basics',
    description: 'Determine whether each relation is a function from A = {1,2,3} to B = {a,b,c}:\n(a) {(1,a), (2,b), (3,c)}\n(b) {(1,a), (2,a), (3,a)}\n(c) {(1,a), (1,b), (2,c)}\n(d) {(1,a), (2,b)}',
    hints: [
      'A function assigns EXACTLY one output to each input',
      'Every element in domain must have an output',
      'Same input cannot have different outputs'
    ],
    solution: '(a) {(1,a), (2,b), (3,c)}\nYES, this is a function.\n- Each element of A appears exactly once\n- Each element maps to exactly one element of B\n- This is also a bijection (one-to-one and onto)\n\n(b) {(1,a), (2,a), (3,a)}\nYES, this is a function.\n- Each element of A appears exactly once\n- Multiple inputs can map to the same output\n- This is a constant-like function (not injective)\n\n(c) {(1,a), (1,b), (2,c)}\nNO, this is NOT a function.\n- Element 1 maps to both a AND b\n- A function cannot have one input with multiple outputs\n- Also, 3 has no output\n\n(d) {(1,a), (2,b)}\nNO, this is NOT a function.\n- Element 3 from domain A has no output\n- Every element in the domain must have exactly one output'
  },
  {
    id: 'math101-t5-ex03',
    subjectId: 'math101',
    topicId: 'math101-topic-5',
    type: 'written',
    difficulty: 2,
    title: 'Injective and Surjective',
    description: 'For each function, determine if it is injective, surjective, both, or neither:\n(a) f: ℤ → ℤ, f(x) = x + 1\n(b) g: ℤ → ℤ, g(x) = x²\n(c) h: ℝ → ℝ₊, h(x) = eˣ\n(d) k: ℝ → ℝ, k(x) = x³',
    hints: [
      'Injective: different inputs → different outputs',
      'Surjective: every element in codomain is hit',
      'Consider the domain and codomain carefully'
    ],
    solution: '(a) f: ℤ → ℤ, f(x) = x + 1\n- Injective: YES. If x₁ + 1 = x₂ + 1, then x₁ = x₂.\n- Surjective: YES. For any y ∈ ℤ, x = y - 1 gives f(x) = y.\n- BIJECTIVE ✓\n\n(b) g: ℤ → ℤ, g(x) = x²\n- Injective: NO. g(2) = g(-2) = 4 but 2 ≠ -2.\n- Surjective: NO. Negative integers (like -1) and some positives (like 2) have no preimage. Only perfect squares are in the range.\n- NEITHER\n\n(c) h: ℝ → ℝ₊, h(x) = eˣ (where ℝ₊ = positive reals)\n- Injective: YES. eˣ¹ = eˣ² implies x₁ = x₂ (ln is well-defined).\n- Surjective: YES. For any y > 0, x = ln(y) gives eˣ = y.\n- BIJECTIVE ✓\n\n(d) k: ℝ → ℝ, k(x) = x³\n- Injective: YES. x₁³ = x₂³ implies x₁ = x₂ (cube root is unique).\n- Surjective: YES. For any y ∈ ℝ, x = ∛y gives k(x) = y.\n- BIJECTIVE ✓'
  },
  {
    id: 'math101-t5-ex04',
    subjectId: 'math101',
    topicId: 'math101-topic-5',
    type: 'written',
    difficulty: 2,
    title: 'Function Composition',
    description: 'Let f(x) = 2x + 1 and g(x) = x² - 3. Compute:\n(a) (f ∘ g)(2)\n(b) (g ∘ f)(2)\n(c) (f ∘ f)(x)\n(d) (g ∘ g)(x)',
    hints: [
      '(f ∘ g)(x) = f(g(x)): apply g first, then f',
      'Work from the inside out',
      'Simplify the resulting expressions'
    ],
    solution: '(a) (f ∘ g)(2) = f(g(2))\n    g(2) = 2² - 3 = 4 - 3 = 1\n    f(1) = 2(1) + 1 = 3\n    Answer: 3\n\n(b) (g ∘ f)(2) = g(f(2))\n    f(2) = 2(2) + 1 = 5\n    g(5) = 5² - 3 = 25 - 3 = 22\n    Answer: 22\n\nNote: f ∘ g ≠ g ∘ f (composition is not commutative)\n\n(c) (f ∘ f)(x) = f(f(x))\n    f(x) = 2x + 1\n    f(2x + 1) = 2(2x + 1) + 1 = 4x + 2 + 1 = 4x + 3\n    Answer: (f ∘ f)(x) = 4x + 3\n\n(d) (g ∘ g)(x) = g(g(x))\n    g(x) = x² - 3\n    g(x² - 3) = (x² - 3)² - 3\n             = x⁴ - 6x² + 9 - 3\n             = x⁴ - 6x² + 6\n    Answer: (g ∘ g)(x) = x⁴ - 6x² + 6'
  },
  {
    id: 'math101-t5-ex05',
    subjectId: 'math101',
    topicId: 'math101-topic-5',
    type: 'written',
    difficulty: 3,
    title: 'Finding Inverses',
    description: 'Find the inverse of each bijective function:\n(a) f(x) = 5x - 7\n(b) g(x) = (x + 3)/(x - 1) for x ≠ 1\n(c) h(x) = ∛(x - 2)',
    hints: [
      'Set y = f(x) and solve for x',
      'Then swap x and y for the final answer',
      'For (b), multiply both sides by (x-1) first'
    ],
    solution: '(a) f(x) = 5x - 7\n    Let y = 5x - 7\n    y + 7 = 5x\n    x = (y + 7)/5\n    \n    f⁻¹(x) = (x + 7)/5\n    \n    Verify: f(f⁻¹(x)) = 5·(x+7)/5 - 7 = x + 7 - 7 = x ✓\n\n(b) g(x) = (x + 3)/(x - 1)\n    Let y = (x + 3)/(x - 1)\n    y(x - 1) = x + 3\n    yx - y = x + 3\n    yx - x = y + 3\n    x(y - 1) = y + 3\n    x = (y + 3)/(y - 1)\n    \n    g⁻¹(x) = (x + 3)/(x - 1)  (for x ≠ 1)\n    \n    Note: g is its own inverse! This is called an involution.\n\n(c) h(x) = ∛(x - 2)\n    Let y = ∛(x - 2)\n    y³ = x - 2\n    x = y³ + 2\n    \n    h⁻¹(x) = x³ + 2\n    \n    Verify: h(h⁻¹(x)) = ∛((x³ + 2) - 2) = ∛(x³) = x ✓'
  },
  {
    id: 'math101-t5-ex06',
    subjectId: 'math101',
    topicId: 'math101-topic-5',
    type: 'written',
    difficulty: 3,
    title: 'Counting Functions',
    description: 'Let A = {1, 2, 3} and B = {a, b, c, d}. Find:\n(a) The total number of functions from A to B\n(b) The number of injective functions from A to B\n(c) Why are there no surjective functions from A to B?',
    hints: [
      'For total functions: each element of A can map to any element of B',
      'For injective: first element has |B| choices, second has |B|-1, etc.',
      'For surjective: consider the pigeonhole principle'
    ],
    solution: '(a) Total number of functions from A to B:\nEach of the 3 elements in A can independently map to any of 4 elements in B.\nTotal = 4 × 4 × 4 = 4³ = 64 functions\n\n(b) Number of injective functions from A to B:\nFor injective, different inputs must give different outputs.\n- Element 1 can map to any of 4 elements: 4 choices\n- Element 2 must map to a different element: 3 choices\n- Element 3 must differ from both: 2 choices\n\nTotal = 4 × 3 × 2 = 24 injective functions\n\nAlternatively: P(4,3) = 4!/(4-3)! = 4!/1! = 24\n\n(c) Why no surjective functions from A to B?\nA surjective function must hit every element in the codomain.\n|A| = 3 and |B| = 4.\n\nWith only 3 inputs, we can produce at most 3 distinct outputs.\nBut B has 4 elements that all need to be hit.\n\nBy the Pigeonhole Principle, it\'s impossible for 3 inputs to cover 4 outputs.\n\nFor surjection to be possible, we need |A| ≥ |B|.'
  },
  {
    id: 'math101-t5-ex07',
    subjectId: 'math101',
    topicId: 'math101-topic-5',
    type: 'written',
    difficulty: 4,
    title: 'Image and Preimage',
    description: 'Let f: ℝ → ℝ be defined by f(x) = x² - 4. Find:\n(a) f({-2, -1, 0, 1, 2})\n(b) f⁻¹({0})\n(c) f⁻¹({-4, 0, 5})\n(d) f⁻¹({-5})',
    hints: [
      'f(S) = {f(x) | x ∈ S} is the image of set S',
      'f⁻¹(T) = {x | f(x) ∈ T} is the preimage of set T',
      'Preimage exists even when inverse function doesn\'t'
    ],
    solution: 'f(x) = x² - 4\n\n(a) f({-2, -1, 0, 1, 2}):\nf(-2) = 4 - 4 = 0\nf(-1) = 1 - 4 = -3\nf(0) = 0 - 4 = -4\nf(1) = 1 - 4 = -3\nf(2) = 4 - 4 = 0\n\nf({-2, -1, 0, 1, 2}) = {-4, -3, 0}\n\n(b) f⁻¹({0}):\nSolve x² - 4 = 0\nx² = 4\nx = ±2\n\nf⁻¹({0}) = {-2, 2}\n\n(c) f⁻¹({-4, 0, 5}):\nFor -4: x² - 4 = -4 → x² = 0 → x = 0\nFor 0: x² - 4 = 0 → x² = 4 → x = ±2\nFor 5: x² - 4 = 5 → x² = 9 → x = ±3\n\nf⁻¹({-4, 0, 5}) = {-3, -2, 0, 2, 3}\n\n(d) f⁻¹({-5}):\nSolve x² - 4 = -5\nx² = -1\nNo real solutions.\n\nf⁻¹({-5}) = ∅'
  },
  {
    id: 'math101-t5-ex08',
    subjectId: 'math101',
    topicId: 'math101-topic-5',
    type: 'written',
    difficulty: 5,
    title: 'Composition and Inverses',
    description: 'Prove that if f: A → B and g: B → C are both bijections, then:\n(a) g ∘ f is a bijection\n(b) (g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹',
    hints: [
      'For bijection, prove both injective and surjective',
      'For the inverse formula, show both directions',
      'Use the fact that composition is associative'
    ],
    solution: '(a) Proof that g ∘ f is a bijection:\n\nInjective:\nSuppose (g ∘ f)(a₁) = (g ∘ f)(a₂).\nThen g(f(a₁)) = g(f(a₂)).\nSince g is injective: f(a₁) = f(a₂).\nSince f is injective: a₁ = a₂.\nTherefore g ∘ f is injective. ✓\n\nSurjective:\nLet c ∈ C be arbitrary.\nSince g is surjective, ∃b ∈ B with g(b) = c.\nSince f is surjective, ∃a ∈ A with f(a) = b.\nThen (g ∘ f)(a) = g(f(a)) = g(b) = c.\nTherefore g ∘ f is surjective. ✓\n\n(b) Proof that (g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹:\n\nWe need to show (f⁻¹ ∘ g⁻¹) ∘ (g ∘ f) = id_A and (g ∘ f) ∘ (f⁻¹ ∘ g⁻¹) = id_C.\n\nFirst direction:\n(f⁻¹ ∘ g⁻¹) ∘ (g ∘ f)\n= f⁻¹ ∘ (g⁻¹ ∘ g) ∘ f    [associativity]\n= f⁻¹ ∘ id_B ∘ f         [g⁻¹ ∘ g = id]\n= f⁻¹ ∘ f                 [identity]\n= id_A                    [f⁻¹ ∘ f = id]\n\nSecond direction:\n(g ∘ f) ∘ (f⁻¹ ∘ g⁻¹)\n= g ∘ (f ∘ f⁻¹) ∘ g⁻¹    [associativity]\n= g ∘ id_B ∘ g⁻¹         [f ∘ f⁻¹ = id]\n= g ∘ g⁻¹                [identity]\n= id_C                   [g ∘ g⁻¹ = id]\n\nTherefore (g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹.\n\nNote: The order reverses! "Socks then shoes on, shoes then socks off."'
  }
];
