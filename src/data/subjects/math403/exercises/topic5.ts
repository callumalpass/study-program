import { WrittenExercise } from '../../../../core/types';

export const topic5Exercises: WrittenExercise[] = [
  {
    id: 'math403-t5-ex01',
    subjectId: 'math403',
    topicId: 'math403-topic-5',
    type: 'written',
    title: 'Compactness Definition',
    description: 'Prove that X is compact if and only if every open cover has a finite subcover.',
    difficulty: 1,
    hints: [
      'This is the definition of compactness',
      'Just state it clearly'
    ],
    solution: 'By definition, a topological space X is compact if every open cover of X has a finite subcover. An open cover is a collection {Uᵢ}ᵢ∈I of open sets with X = ⋃ᵢ∈I Uᵢ. A finite subcover is a finite subcollection {Uᵢ₁, ..., Uᵢₙ} with X = Uᵢ₁ ∪ ... ∪ Uᵢₙ.'
  },
  {
    id: 'math403-t5-ex02',
    subjectId: 'math403',
    topicId: 'math403-topic-5',
    type: 'written',
    title: 'Closed Subset of Compact',
    description: 'Prove that every closed subset of a compact space is compact.',
    difficulty: 3,
    hints: [
      'Let F be closed in compact space X',
      'Take an open cover {Uᵢ} of F',
      'Add X \\ F to get an open cover of X'
    ],
    solution: 'Let F be closed in compact space X, and let {Uᵢ}ᵢ∈I be an open cover of F. Then {Uᵢ}ᵢ∈I ∪ {X \\ F} is an open cover of X (since F ∪ (X \\ F) = X). By compactness of X, there exists a finite subcover {Uᵢ₁, ..., Uᵢₙ, X \\ F} or {Uᵢ₁, ..., Uᵢₙ}. Since F ⊆ X \\ (X \\ F), we have F ⊆ Uᵢ₁ ∪ ... ∪ Uᵢₙ. Therefore, {Uᵢ₁, ..., Uᵢₙ} is a finite subcover of F, so F is compact.'
  },
  {
    id: 'math403-t5-ex03',
    subjectId: 'math403',
    topicId: 'math403-topic-5',
    type: 'written',
    title: 'Continuous Image of Compact',
    description: 'Prove that the continuous image of a compact space is compact.',
    difficulty: 3,
    hints: [
      'Let f: X → Y be continuous with X compact',
      'Take an open cover of f(X)',
      'Pull it back to X via f⁻¹'
    ],
    solution: 'Let f: X → Y be continuous with X compact. Let {Vᵢ}ᵢ∈I be an open cover of f(X). Then {f⁻¹(Vᵢ)}ᵢ∈I is an open cover of X (since x ∈ X implies f(x) ∈ f(X) ⊆ ⋃Vᵢ, so x ∈ f⁻¹(⋃Vᵢ) = ⋃f⁻¹(Vᵢ)). By compactness of X, there exists a finite subcover {f⁻¹(Vᵢ₁), ..., f⁻¹(Vᵢₙ)}. Then f(X) ⊆ f(⋃f⁻¹(Vᵢⱼ)) ⊆ ⋃Vᵢⱼ. Therefore, {Vᵢ₁, ..., Vᵢₙ} is a finite subcover of f(X), so f(X) is compact.'
  },
  {
    id: 'math403-t5-ex04',
    subjectId: 'math403',
    topicId: 'math403-topic-5',
    type: 'written',
    title: 'Heine-Borel Theorem',
    description: 'State the Heine-Borel theorem and use it to show that [0, 1] is compact.',
    difficulty: 2,
    hints: [
      'Heine-Borel: A subset of ℝⁿ is compact iff it is closed and bounded',
      '[0, 1] is closed and bounded'
    ],
    solution: 'Heine-Borel Theorem: A subset of ℝⁿ (with the standard topology) is compact if and only if it is closed and bounded. For [0, 1]: It is closed because it equals ⋂ₙ(-1/n, 1+1/n)ᶜ, an intersection of closed sets. It is bounded because it is contained in the ball B(0, 2). Therefore, by the Heine-Borel theorem, [0, 1] is compact.'
  },
  {
    id: 'math403-t5-ex05',
    subjectId: 'math403',
    topicId: 'math403-topic-5',
    type: 'written',
    title: 'Non-compact Example',
    description: 'Show that (0, 1) is not compact.',
    difficulty: 2,
    hints: [
      'Find an open cover with no finite subcover',
      'Consider Uₙ = (1/n, 1)',
      'Or use Heine-Borel: not closed'
    ],
    solution: 'Method 1: Consider the open cover {(1/n, 1) : n ≥ 2}. For any x ∈ (0, 1), choose n with 1/n < x, so x ∈ (1/n, 1). Thus this is an open cover. However, any finite subcollection {(1/n₁, 1), ..., (1/nₖ, 1)} has union (1/N, 1) where N = max{n₁, ..., nₖ}, which doesn\'t cover (0, 1/N). Therefore, no finite subcover exists. Method 2: By Heine-Borel, (0, 1) is not compact because it is not closed in ℝ (1/2 is a limit point of (0, 1) \\ {1/2}, or observe that 0, 1 are limit points not in (0, 1)).'
  },
  {
    id: 'math403-t5-ex06',
    subjectId: 'math403',
    topicId: 'math403-topic-5',
    type: 'written',
    title: 'Compact Hausdorff Property',
    description: 'Prove that a compact subset of a Hausdorff space is closed.',
    difficulty: 4,
    hints: [
      'Let K be compact in Hausdorff space X',
      'Take x ∈ X \\ K',
      'For each y ∈ K, separate x and y',
      'Use compactness to get finite separation'
    ],
    solution: 'Let K be compact in Hausdorff space X. Take x ∈ X \\ K. For each y ∈ K, use the Hausdorff property to find disjoint open sets Uᵧ containing x and Vᵧ containing y. Then {Vᵧ}ᵧ∈K is an open cover of K. By compactness, there exists a finite subcover {Vᵧ₁, ..., Vᵧₙ}. Let U = Uᵧ₁ ∩ ... ∩ Uᵧₙ and V = Vᵧ₁ ∪ ... ∪ Vᵧₙ. Then U is open, x ∈ U, K ⊆ V, and U ∩ V = ∅. Thus U ⊆ X \\ K, so x is interior to X \\ K. Since x was arbitrary, X \\ K is open, hence K is closed.'
  },
  {
    id: 'math403-t5-ex07',
    subjectId: 'math403',
    topicId: 'math403-topic-5',
    type: 'written',
    title: 'Extreme Value Theorem',
    description: 'Use compactness to prove the Extreme Value Theorem: A continuous real-valued function on a compact space attains its maximum and minimum.',
    difficulty: 3,
    hints: [
      'Let f: X → ℝ be continuous with X compact',
      'f(X) is compact in ℝ',
      'Compact subsets of ℝ are closed and bounded'
    ],
    solution: 'Let f: X → ℝ be continuous with X compact. Since f is continuous and X is compact, f(X) is compact. By the Heine-Borel theorem, f(X) is closed and bounded in ℝ. Since f(X) is bounded, M = sup f(X) and m = inf f(X) exist and are finite. Since f(X) is closed and M is a limit point of f(X) (as supremum), we have M ∈ f(X). Similarly, m ∈ f(X). Therefore, there exist x₁, x₂ ∈ X with f(x₁) = M and f(x₂) = m, so f attains its maximum and minimum.'
  },
  {
    id: 'math403-t5-ex08',
    subjectId: 'math403',
    topicId: 'math403-topic-5',
    type: 'written',
    title: 'Sequential Compactness',
    description: 'Define sequential compactness and show that in ℝⁿ, sequential compactness is equivalent to compactness.',
    difficulty: 4,
    hints: [
      'Sequential compactness: every sequence has a convergent subsequence',
      'Use Bolzano-Weierstrass for one direction',
      'Use Heine-Borel for the other'
    ],
    solution: 'Definition: X is sequentially compact if every sequence in X has a convergent subsequence (converging to a point in X). In ℝⁿ: (⇒) Let X be compact. By Heine-Borel, X is closed and bounded. Take a sequence (xₙ) in X. Since X is bounded, (xₙ) is bounded. By Bolzano-Weierstrass, (xₙ) has a convergent subsequence converging to some x ∈ ℝⁿ. Since X is closed and all terms of the subsequence are in X, x ∈ X. (⇐) Let X be sequentially compact. Then X is bounded (else take xₙ with ||xₙ|| > n) and closed (if xₙ → x with xₙ ∈ X, then (xₙ) has a subsequence converging to y ∈ X, so x = y ∈ X). By Heine-Borel, X is compact.'
  },
  {
    id: 'math403-t5-ex09',
    subjectId: 'math403',
    topicId: 'math403-topic-5',
    type: 'written',
    title: 'Product of Compact Spaces',
    description: 'Prove that if X and Y are compact, then X × Y is compact (without using Tychonoff).',
    difficulty: 4,
    hints: [
      'Take an open cover of X × Y',
      'Use the tube lemma',
      'Or directly: for fixed x, cover {x} × Y'
    ],
    solution: 'Let {Uᵢ}ᵢ∈I be an open cover of X × Y. For each x ∈ X, {x} × Y is homeomorphic to Y, hence compact. For this slice, extract a finite subcover {Uᵢ₁, ..., Uᵢₙₓ}. Let Wₓ = Uᵢ₁ ∪ ... ∪ Uᵢₙₓ, which is open and contains {x} × Y. By the tube lemma (or direct argument), there exists an open Vₓ ⊆ X containing x such that Vₓ × Y ⊆ Wₓ. Then {Vₓ}ₓ∈X is an open cover of X. By compactness of X, there exists a finite subcover {Vₓ₁, ..., Vₓₘ}. The corresponding finite collection of Uᵢ\'s covers X × Y. Therefore, X × Y is compact.'
  },
  {
    id: 'math403-t5-ex10',
    subjectId: 'math403',
    topicId: 'math403-topic-5',
    type: 'written',
    title: 'Tychonoff Theorem Statement',
    description: 'State Tychonoff\'s theorem and explain its significance.',
    difficulty: 2,
    hints: [
      'Tychonoff: arbitrary product of compact spaces is compact',
      'This uses the product topology',
      'Requires axiom of choice'
    ],
    solution: 'Tychonoff\'s Theorem: An arbitrary product ∏ᵢ∈I Xᵢ of compact spaces is compact in the product topology. Significance: This is one of the most important theorems in topology. It generalizes the finite product case and is equivalent to the axiom of choice. It has numerous applications, including the existence of ultralimits, Stone-Čech compactification, and various fixed point theorems. Note that the theorem fails for the box topology (even for countable products of [0,1]).'
  },
  {
    id: 'math403-t5-ex11',
    subjectId: 'math403',
    topicId: 'math403-topic-5',
    type: 'written',
    title: 'Local Compactness',
    description: 'Prove that ℝⁿ is locally compact.',
    difficulty: 2,
    hints: [
      'A space is locally compact if each point has a compact neighborhood',
      'Consider closed balls around each point',
      'Closed balls are compact by Heine-Borel'
    ],
    solution: 'A space is locally compact if every point has a compact neighborhood. Take any x ∈ ℝⁿ. Consider the closed ball B̄(x, 1) = {y : d(x, y) ≤ 1}. This set is closed (preimage of [0, 1] under the continuous function y ↦ d(x, y)) and bounded. By the Heine-Borel theorem, B̄(x, 1) is compact. Since B̄(x, 1) contains the open ball B(x, 1/2), which is a neighborhood of x, we have shown that x has a compact neighborhood. Therefore, ℝⁿ is locally compact.'
  },
  {
    id: 'math403-t5-ex12',
    subjectId: 'math403',
    topicId: 'math403-topic-5',
    type: 'written',
    title: 'One-Point Compactification',
    description: 'Describe the one-point compactification of ℝ and identify the resulting space.',
    difficulty: 2,
    hints: [
      'Add a point ∞ to ℝ',
      'Open sets containing ∞ have compact complement',
      'This gives S¹'
    ],
    solution: 'The one-point compactification of ℝ is ℝ* = ℝ ∪ {∞}. Open sets in ℝ* are: (1) Open sets in ℝ, (2) Sets of the form {∞} ∪ (ℝ \\ K) where K is compact in ℝ. Since compact sets in ℝ are precisely the closed and bounded sets, open sets containing ∞ are complements of closed and bounded sets (together with ∞). Geometrically, ℝ* is homeomorphic to the circle S¹. One explicit homeomorphism is stereographic projection: map ℝ to S¹ \\ {(0, 1)} via x ↦ (2x/(1+x²), (x²-1)/(1+x²)), and send ∞ to (0, 1).'
  },
  {
    id: 'math403-t5-ex13',
    subjectId: 'math403',
    topicId: 'math403-topic-5',
    type: 'written',
    title: 'Compact Metric Space',
    description: 'Prove that a compact metric space is complete.',
    difficulty: 3,
    hints: [
      'Let (xₙ) be a Cauchy sequence',
      'Use sequential compactness',
      'Show the subsequence limit equals the sequence limit'
    ],
    solution: 'Let (X, d) be a compact metric space. In a metric space, compactness implies sequential compactness. Let (xₙ) be a Cauchy sequence in X. By sequential compactness, there exists a convergent subsequence xₙₖ → x for some x ∈ X. We claim xₙ → x. Take ε > 0. Since (xₙ) is Cauchy, there exists N₁ such that d(xₙ, xₘ) < ε/2 for all n, m ≥ N₁. Since xₙₖ → x, there exists N₂ such that d(xₙₖ, x) < ε/2 for nₖ ≥ N₂. For n ≥ max{N₁, N₂}, choose k with nₖ ≥ max{N₁, N₂, n}. Then d(xₙ, x) ≤ d(xₙ, xₙₖ) + d(xₙₖ, x) < ε. Thus xₙ → x, so X is complete.'
  },
  {
    id: 'math403-t5-ex14',
    subjectId: 'math403',
    topicId: 'math403-topic-5',
    type: 'written',
    title: 'Lebesgue Number Lemma',
    description: 'State and prove the Lebesgue Number Lemma for compact metric spaces.',
    difficulty: 4,
    hints: [
      'For an open cover of compact metric space, there exists δ > 0',
      'Every set of diameter < δ is contained in some cover element',
      'Use contradiction: assume no such δ exists'
    ],
    solution: 'Lebesgue Number Lemma: Let (X, d) be a compact metric space and {Uᵢ}ᵢ∈I an open cover. Then there exists δ > 0 such that every subset of X with diameter < δ is contained in some Uᵢ. Proof: Suppose not. Then for each n, there exists a set Aₙ with diam(Aₙ) < 1/n not contained in any Uᵢ. Choose xₙ ∈ Aₙ. By compactness, (xₙ) has a convergent subsequence xₙₖ → x. Then x ∈ Uᵢ₀ for some i₀. Since Uᵢ₀ is open, B(x, ε) ⊆ Uᵢ₀ for some ε > 0. Choose k large enough that d(xₙₖ, x) < ε/2 and diam(Aₙₖ) < ε/2. Then Aₙₖ ⊆ B(xₙₖ, ε/2) ⊆ B(x, ε) ⊆ Uᵢ₀, contradiction.'
  },
  {
    id: 'math403-t5-ex15',
    subjectId: 'math403',
    topicId: 'math403-topic-5',
    type: 'written',
    title: 'Finite Intersection Property',
    description: 'Prove that X is compact if and only if every collection of closed sets with the finite intersection property has nonempty intersection.',
    difficulty: 3,
    hints: [
      'Finite intersection property: every finite subcollection has nonempty intersection',
      'Use De Morgan\'s laws',
      'Relate to open covers'
    ],
    solution: 'The finite intersection property (FIP) means every finite subcollection has nonempty intersection. (⇒) Assume X is compact and let {Fᵢ}ᵢ∈I be a collection of closed sets with FIP. Suppose ⋂ᵢFᵢ = ∅. Then X = ⋃ᵢ(X \\ Fᵢ), so {X \\ Fᵢ}ᵢ∈I is an open cover. By compactness, there exists a finite subcover {X \\ Fᵢ₁, ..., X \\ Fᵢₙ}, so X = ⋃ⱼ(X \\ Fᵢⱼ), implying ⋂ⱼFᵢⱼ = ∅. This contradicts FIP. (⇐) Assume the FIP property. Let {Uᵢ}ᵢ∈I be an open cover with no finite subcover. Then {X \\ Uᵢ}ᵢ∈I is a collection of closed sets with FIP (if ⋂ⱼ(X \\ Uᵢⱼ) = ∅, then ⋃ⱼUᵢⱼ = X), but ⋂ᵢ(X \\ Uᵢ) = X \\ (⋃ᵢUᵢ) = ∅, contradiction.'
  },
  {
    id: 'math403-t5-ex16',
    subjectId: 'math403',
    topicId: 'math403-topic-5',
    type: 'written',
    title: 'Compactness and Uniform Continuity',
    description: 'Prove that a continuous function from a compact metric space to a metric space is uniformly continuous.',
    difficulty: 4,
    hints: [
      'Use the Lebesgue number lemma',
      'For given ε, cover Y with balls of radius ε/2',
      'Pull back to get cover of X, find Lebesgue number'
    ],
    solution: 'Let f: (X, d_X) → (Y, d_Y) be continuous with X compact. Take ε > 0. For each y ∈ Y, B(y, ε/2) is open. Then {f⁻¹(B(y, ε/2))}_{y∈Y} is an open cover of X. By the Lebesgue number lemma, there exists δ > 0 such that every subset of X with diameter < δ is contained in some f⁻¹(B(y, ε/2)). Now take x₁, x₂ ∈ X with d_X(x₁, x₂) < δ. Then {x₁, x₂} has diameter < δ, so {x₁, x₂} ⊆ f⁻¹(B(y, ε/2)) for some y. Thus f(x₁), f(x₂) ∈ B(y, ε/2), implying d_Y(f(x₁), f(x₂)) ≤ d_Y(f(x₁), y) + d_Y(y, f(x₂)) < ε. Therefore, f is uniformly continuous.'
  }
];
