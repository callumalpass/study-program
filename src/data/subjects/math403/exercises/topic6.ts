import { WrittenExercise } from '../../../../core/types';

export const topic6Exercises: WrittenExercise[] = [
  {
    id: 'math403-t6-ex01',
    subjectId: 'math403',
    topicId: 'math403-topic-6',
    type: 'written',
    title: 'Metric Space Axioms',
    description: 'Verify that d(x, y) = |x - y| defines a metric on ℝ.',
    difficulty: 1,
    hints: [
      'Check non-negativity',
      'Check d(x, y) = 0 iff x = y',
      'Check symmetry',
      'Check triangle inequality'
    ],
    solution: '(1) Non-negativity: |x - y| ≥ 0 for all x, y. (2) Identity: |x - y| = 0 ⟺ x - y = 0 ⟺ x = y. (3) Symmetry: |x - y| = |-(y - x)| = |y - x|. (4) Triangle inequality: |x - z| = |(x - y) + (y - z)| ≤ |x - y| + |y - z|. Therefore, d is a metric.'
  },
  {
    id: 'math403-t6-ex02',
    subjectId: 'math403',
    topicId: 'math403-topic-6',
    type: 'written',
    title: 'Discrete Metric',
    description: 'Show that the discrete metric d(x, y) = 0 if x = y and d(x, y) = 1 if x ≠ y defines a metric on any set X.',
    difficulty: 2,
    hints: [
      'Verify all metric axioms',
      'Triangle inequality: consider three cases'
    ],
    solution: '(1) d(x, y) ≥ 0 by definition. (2) d(x, y) = 0 ⟺ x = y by definition. (3) d(x, y) = d(y, x) by symmetry of equality. (4) Triangle inequality: If x = z, then d(x, z) = 0 ≤ d(x, y) + d(y, z). If x ≠ z, then d(x, z) = 1. Either x ≠ y or y ≠ z, so d(x, y) + d(y, z) ≥ 1. Thus d(x, z) ≤ d(x, y) + d(y, z). Therefore, d is a metric.'
  },
  {
    id: 'math403-t6-ex03',
    subjectId: 'math403',
    topicId: 'math403-topic-6',
    type: 'written',
    title: 'Metric Topology',
    description: 'Prove that the collection of all open balls in a metric space forms a basis for a topology.',
    difficulty: 2,
    hints: [
      'Already done in Topic 2',
      'Verify the two basis axioms',
      'Use triangle inequality for (B2)'
    ],
    solution: 'Let ℬ = {B(x, r) : x ∈ X, r > 0}. (B1) For any x ∈ X, we have x ∈ B(x, 1), so ⋃ℬ = X. (B2) Let y ∈ B(x₁, r₁) ∩ B(x₂, r₂). Let δ = min{r₁ - d(x₁, y), r₂ - d(x₂, y)} > 0. For any z ∈ B(y, δ), we have d(x₁, z) ≤ d(x₁, y) + d(y, z) < d(x₁, y) + δ ≤ r₁, so z ∈ B(x₁, r₁). Similarly z ∈ B(x₂, r₂). Thus B(y, δ) ⊆ B(x₁, r₁) ∩ B(x₂, r₂), so ℬ is a basis.'
  },
  {
    id: 'math403-t6-ex04',
    subjectId: 'math403',
    topicId: 'math403-topic-6',
    type: 'written',
    title: 'Convergence in Metric Spaces',
    description: 'Prove that in a metric space, xₙ → x if and only if for every ε > 0, there exists N such that d(xₙ, x) < ε for all n ≥ N.',
    difficulty: 2,
    hints: [
      'This is the definition via the metric',
      'Relate it to the topological definition',
      'B(x, ε) is a neighborhood of x'
    ],
    solution: '(⇒) Assume xₙ → x in the topological sense. Take ε > 0. Then B(x, ε) is a neighborhood of x. By definition of convergence, there exists N such that xₙ ∈ B(x, ε) for all n ≥ N, i.e., d(xₙ, x) < ε. (⇐) Assume the ε-N condition. Take any neighborhood U of x. Then there exists ε > 0 with B(x, ε) ⊆ U. By hypothesis, there exists N with d(xₙ, x) < ε for all n ≥ N, so xₙ ∈ B(x, ε) ⊆ U. Thus xₙ → x topologically.'
  },
  {
    id: 'math403-t6-ex05',
    subjectId: 'math403',
    topicId: 'math403-topic-6',
    type: 'written',
    title: 'Cauchy Sequence',
    description: 'Show that (1/n) is a Cauchy sequence in ℝ.',
    difficulty: 1,
    hints: [
      'Take ε > 0',
      'Find N such that |1/n - 1/m| < ε for all n, m ≥ N',
      'Use the fact that 1/n → 0'
    ],
    solution: 'Take ε > 0. Choose N > 2/ε. For any n, m ≥ N, we have |1/n - 1/m| ≤ |1/n| + |1/m| = 1/n + 1/m ≤ 2/N < ε. Therefore, (1/n) is Cauchy. (Note: We can also use the fact that convergent sequences are Cauchy, and 1/n → 0.)'
  },
  {
    id: 'math403-t6-ex06',
    subjectId: 'math403',
    topicId: 'math403-topic-6',
    type: 'written',
    title: 'Completeness of ℝ',
    description: 'State what it means for ℝ to be complete and explain why this is important.',
    difficulty: 2,
    hints: [
      'Complete: every Cauchy sequence converges',
      'This is an axiom for ℝ',
      'Many important theorems require completeness'
    ],
    solution: 'A metric space is complete if every Cauchy sequence converges (to a point in the space). ℝ with the standard metric d(x, y) = |x - y| is complete. This is a fundamental property of the real numbers, essentially equivalent to the least upper bound property. Importance: Completeness is crucial for analysis. Many theorems require completeness: Banach fixed point theorem, Baire category theorem, uniform limit theorems, existence of solutions to differential equations, etc. Not all metric spaces are complete (e.g., ℚ, (0, 1)).'
  },
  {
    id: 'math403-t6-ex07',
    subjectId: 'math403',
    topicId: 'math403-topic-6',
    type: 'written',
    title: 'Non-complete Example',
    description: 'Show that ℚ with the standard metric is not complete.',
    difficulty: 2,
    hints: [
      'Find a Cauchy sequence of rationals not converging in ℚ',
      'Consider a sequence converging to √2',
      'Use Newton\'s method or decimal expansion'
    ],
    solution: 'Consider the sequence defined by x₁ = 1 and xₙ₊₁ = (xₙ + 2/xₙ)/2 (Newton\'s method for √2). This sequence consists of rational numbers (by induction) and converges in ℝ to √2. Since convergent sequences are Cauchy, (xₙ) is Cauchy in ℝ, hence in ℚ (same metric). However, √2 ∉ ℚ, so (xₙ) does not converge in ℚ. Therefore, ℚ is not complete. Alternatively, consider the decimal approximations xₙ = 1.414...n digits, which is Cauchy but converges to √2 ∉ ℚ.'
  },
  {
    id: 'math403-t6-ex08',
    subjectId: 'math403',
    topicId: 'math403-topic-6',
    type: 'written',
    title: 'Contraction Mapping Theorem',
    description: 'State the Banach fixed point theorem (contraction mapping theorem) and explain its significance.',
    difficulty: 2,
    hints: [
      'A contraction has Lipschitz constant < 1',
      'Complete metric space',
      'Unique fixed point'
    ],
    solution: 'Banach Fixed Point Theorem: Let (X, d) be a complete metric space and f: X → X a contraction, i.e., there exists 0 ≤ k < 1 such that d(f(x), f(y)) ≤ k·d(x, y) for all x, y ∈ X. Then f has a unique fixed point x* (i.e., f(x*) = x*), and for any x₀ ∈ X, the sequence xₙ = f^n(x₀) converges to x*. Significance: This theorem guarantees existence and uniqueness of fixed points and provides a constructive method (iteration) to find them. Applications include: solving differential and integral equations, proving inverse function theorem, Newton\'s method convergence, and numerical analysis.'
  },
  {
    id: 'math403-t6-ex09',
    subjectId: 'math403',
    topicId: 'math403-topic-6',
    type: 'written',
    title: 'Contraction Example',
    description: 'Show that f(x) = x/2 + 1 on ℝ is a contraction and find its fixed point.',
    difficulty: 2,
    hints: [
      'Check |f(x) - f(y)| ≤ k|x - y|',
      'Solve f(x) = x',
      'Verify uniqueness'
    ],
    solution: 'We have |f(x) - f(y)| = |(x/2 + 1) - (y/2 + 1)| = |x/2 - y/2| = (1/2)|x - y|. Thus f is a contraction with k = 1/2. To find the fixed point, solve f(x) = x: x/2 + 1 = x ⟹ x = 2. By the Banach fixed point theorem, x* = 2 is the unique fixed point. We can verify: f(2) = 2/2 + 1 = 2. Starting from any x₀, the iteration xₙ₊₁ = xₙ/2 + 1 converges to 2.'
  },
  {
    id: 'math403-t6-ex10',
    subjectId: 'math403',
    topicId: 'math403-topic-6',
    type: 'written',
    title: 'Baire Category Theorem',
    description: 'State the Baire category theorem for complete metric spaces.',
    difficulty: 2,
    hints: [
      'Involves dense open sets or nowhere dense sets',
      'Complete metric space is of second category',
      'Countable intersection of dense open sets is dense'
    ],
    solution: 'Baire Category Theorem (Complete Metric Spaces): Let (X, d) be a complete metric space. Then X is of second category, meaning X cannot be written as a countable union of nowhere dense sets. Equivalently: The countable intersection of dense open sets is dense. Another formulation: If X = ⋃ₙFₙ where each Fₙ is closed, then at least one Fₙ has nonempty interior. Applications: Proving existence of continuous nowhere differentiable functions, uniform boundedness principle, open mapping theorem, showing most continuous functions are nowhere differentiable.'
  },
  {
    id: 'math403-t6-ex11',
    subjectId: 'math403',
    topicId: 'math403-topic-6',
    type: 'written',
    title: 'Equivalent Metrics',
    description: 'Define equivalent metrics and show that d₁(x, y) = |x - y| and d₂(x, y) = |x - y|/(1 + |x - y|) are equivalent on ℝ.',
    difficulty: 3,
    hints: [
      'Metrics are equivalent if they generate the same topology',
      'Equivalently, sequences converge to the same limits',
      'Show each d₁-ball contains a d₂-ball and vice versa'
    ],
    solution: 'Metrics d₁, d₂ are equivalent if they induce the same topology. For d₁ and d₂ on ℝ: Take x ∈ ℝ and ε > 0. (1) Given B_{d₁}(x, ε), choose δ = ε/(1 + ε). If d₂(x, y) < δ, then |x - y|/(1 + |x - y|) < ε/(1 + ε), which implies |x - y| < ε (solve for |x - y|), so d₁(x, y) < ε. Thus B_{d₂}(x, δ) ⊆ B_{d₁}(x, ε). (2) Given B_{d₂}(x, ε), let δ = ε. If d₁(x, y) < δ, then d₂(x, y) = |x - y|/(1 + |x - y|) ≤ |x - y| < δ = ε. Thus B_{d₁}(x, δ) ⊆ B_{d₂}(x, ε). Therefore, the metrics are equivalent.'
  },
  {
    id: 'math403-t6-ex12',
    subjectId: 'math403',
    topicId: 'math403-topic-6',
    type: 'written',
    title: 'Bounded Metric',
    description: 'Show that if d is a metric on X, then d̄(x, y) = min{d(x, y), 1} is also a metric on X.',
    difficulty: 3,
    hints: [
      'Verify the metric axioms',
      'Triangle inequality: consider cases',
      'This gives an equivalent bounded metric'
    ],
    solution: '(1) d̄(x, y) ≥ 0 since d ≥ 0. (2) d̄(x, y) = 0 ⟺ d(x, y) = 0 ⟺ x = y. (3) d̄(x, y) = min{d(x, y), 1} = min{d(y, x), 1} = d̄(y, x). (4) Triangle inequality: d̄(x, z) = min{d(x, z), 1} ≤ min{d(x, y) + d(y, z), 1}. If d(x, y) + d(y, z) ≥ 1, then min{d(x, y) + d(y, z), 1} = 1 ≥ d̄(x, y) + d̄(y, z) - 1 (since d̄ ≤ 1), which gives d̄(x, z) ≤ 1 ≤ d̄(x, y) + d̄(y, z). If d(x, y) + d(y, z) < 1, then d̄(x, z) ≤ d(x, z) ≤ d(x, y) + d(y, z) = d̄(x, y) + d̄(y, z). Note: d and d̄ induce the same topology.'
  },
  {
    id: 'math403-t6-ex13',
    subjectId: 'math403',
    topicId: 'math403-topic-6',
    type: 'written',
    title: 'Lipschitz Continuity',
    description: 'Prove that every Lipschitz continuous function is uniformly continuous.',
    difficulty: 2,
    hints: [
      'Lipschitz: d(f(x), f(y)) ≤ L·d(x, y)',
      'For uniform continuity, take δ = ε/L'
    ],
    solution: 'Let f: (X, d_X) → (Y, d_Y) be Lipschitz continuous with constant L, i.e., d_Y(f(x), f(y)) ≤ L·d_X(x, y) for all x, y. Take ε > 0. Let δ = ε/L (if L > 0; if L = 0, f is constant and trivially uniformly continuous). If d_X(x, y) < δ, then d_Y(f(x), f(y)) ≤ L·d_X(x, y) < L·δ = ε. Therefore, f is uniformly continuous.'
  },
  {
    id: 'math403-t6-ex14',
    subjectId: 'math403',
    topicId: 'math403-topic-6',
    type: 'written',
    title: 'Metrization Theorem Statement',
    description: 'State the Urysohn metrization theorem and explain when a topological space can be metrized.',
    difficulty: 2,
    hints: [
      'Second countable + Hausdorff + regular',
      'Or: second countable + normal + T₁',
      'This is a characterization of metrizable spaces'
    ],
    solution: 'Urysohn Metrization Theorem: A topological space is metrizable (admits a metric inducing the topology) if and only if it is regular, Hausdorff, and second countable. (Regular means for every closed set F and point x ∉ F, there exist disjoint open sets separating them.) Equivalent formulation: Every second countable normal T₁ space is metrizable. Examples: ℝⁿ, all second countable manifolds, separable Hilbert spaces. Non-examples: Non-first-countable spaces like {0,1}^ℝ with product topology (not metrizable). The theorem provides a topological characterization of when a space can be equipped with a metric.'
  },
  {
    id: 'math403-t6-ex15',
    subjectId: 'math403',
    topicId: 'math403-topic-6',
    type: 'written',
    title: 'Completion of Metric Space',
    description: 'Explain the concept of completion of a metric space and give an example.',
    difficulty: 3,
    hints: [
      'Every metric space can be completed',
      'Completion is a complete metric space containing the original',
      'ℝ is the completion of ℚ'
    ],
    solution: 'A completion of a metric space (X, d) is a complete metric space (X̄, d̄) together with an isometric embedding i: X → X̄ such that i(X) is dense in X̄. The completion is unique up to isometry. Construction: Take equivalence classes of Cauchy sequences in X (where (xₙ) ~ (yₙ) if d(xₙ, yₙ) → 0), and define d̄([(xₙ)], [(yₙ)]) = lim d(xₙ, yₙ). Example: The completion of ℚ with the standard metric is ℝ. Every real number is a limit of a Cauchy sequence of rationals. Another example: The completion of C[0,1] with L² metric is L²[0,1].'
  },
  {
    id: 'math403-t6-ex16',
    subjectId: 'math403',
    topicId: 'math403-topic-6',
    type: 'written',
    title: 'Totally Bounded Space',
    description: 'Define totally bounded and prove that every totally bounded metric space is bounded.',
    difficulty: 3,
    hints: [
      'Totally bounded: for all ε, finite ε-net exists',
      'Bounded: diameter is finite',
      'Use finite cover by balls of radius ε'
    ],
    solution: 'Definition: A metric space (X, d) is totally bounded if for every ε > 0, there exists a finite set {x₁, ..., xₙ} such that X = ⋃ᵢ B(xᵢ, ε) (finite ε-net). Theorem: Every totally bounded space is bounded. Proof: Take ε = 1. There exists a finite 1-net {x₁, ..., xₙ}. For any x, y ∈ X, we have x ∈ B(xᵢ, 1) and y ∈ B(xⱼ, 1) for some i, j. Then d(x, y) ≤ d(x, xᵢ) + d(xᵢ, xⱼ) + d(xⱼ, y) < 1 + D + 1 = D + 2, where D = max{d(xᵢ, xⱼ) : i, j ≤ n} < ∞. Thus diam(X) ≤ D + 2 < ∞, so X is bounded. Note: In ℝⁿ, totally bounded ⟺ bounded. In general infinite-dimensional spaces, bounded ⇏ totally bounded.'
  }
];
