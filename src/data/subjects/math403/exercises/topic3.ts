import { WrittenExercise } from '../../../../core/types';

export const topic3Exercises: WrittenExercise[] = [
  {
    id: 'math403-t3-ex01',
    subjectId: 'math403',
    topicId: 'math403-topic-3',
    type: 'written',
    title: 'Continuity via Open Sets',
    description: 'Prove that a function f: X → Y is continuous if and only if f⁻¹(V) is open in X for every open set V in Y.',
    difficulty: 3,
    hints: [
      'This is the fundamental characterization of continuity in topology',
      'Use the ε-δ definition for one direction',
      'Use preimages for the other direction'
    ],
    solution: '(⇒) Assume f is continuous. Let V be open in Y. Take x ∈ f⁻¹(V). Then f(x) ∈ V. Since V is open and f is continuous at x, there exists a neighborhood U of x with f(U) ⊆ V, so U ⊆ f⁻¹(V). Thus x is interior to f⁻¹(V), so f⁻¹(V) is open. (⇐) Assume f⁻¹(V) is open for every open V. Take x ∈ X and a neighborhood V of f(x). Then f⁻¹(V) is open and contains x, so it\'s a neighborhood of x with f(f⁻¹(V)) ⊆ V. Thus f is continuous at x.'
  },
  {
    id: 'math403-t3-ex02',
    subjectId: 'math403',
    topicId: 'math403-topic-3',
    type: 'written',
    title: 'Continuity via Closed Sets',
    description: 'Prove that f: X → Y is continuous if and only if f⁻¹(F) is closed in X for every closed set F in Y.',
    difficulty: 2,
    hints: [
      'Use the open set characterization',
      'f⁻¹(Y \\ F) = X \\ f⁻¹(F)',
      'Complements of open sets are closed'
    ],
    solution: 'f is continuous ⟺ f⁻¹(V) is open for all open V ⟺ f⁻¹(Y \\ F) is open for all closed F ⟺ X \\ f⁻¹(F) is open for all closed F ⟺ f⁻¹(F) is closed for all closed F.'
  },
  {
    id: 'math403-t3-ex03',
    subjectId: 'math403',
    topicId: 'math403-topic-3',
    type: 'written',
    title: 'Composition of Continuous Functions',
    description: 'Prove that the composition of continuous functions is continuous.',
    difficulty: 2,
    hints: [
      'Let f: X → Y and g: Y → Z be continuous',
      'Consider g ∘ f: X → Z',
      'Use the open set characterization'
    ],
    solution: 'Let f: X → Y and g: Y → Z be continuous. Take an open set W in Z. Since g is continuous, g⁻¹(W) is open in Y. Since f is continuous, f⁻¹(g⁻¹(W)) is open in X. But f⁻¹(g⁻¹(W)) = (g ∘ f)⁻¹(W). Thus (g ∘ f)⁻¹(W) is open for every open W, so g ∘ f is continuous.'
  },
  {
    id: 'math403-t3-ex04',
    subjectId: 'math403',
    topicId: 'math403-topic-3',
    type: 'written',
    title: 'Homeomorphism Properties',
    description: 'Prove that if f: X → Y is a homeomorphism, then f⁻¹: Y → X is also a homeomorphism.',
    difficulty: 2,
    hints: [
      'A homeomorphism is a continuous bijection with continuous inverse',
      'Check that f⁻¹ satisfies the definition',
      'This is almost immediate from the definition'
    ],
    solution: 'Since f is a homeomorphism, f is a continuous bijection and f⁻¹ is continuous. Since f is a bijection, f⁻¹ is also a bijection, and (f⁻¹)⁻¹ = f is continuous. Therefore, f⁻¹ is a continuous bijection with continuous inverse, making it a homeomorphism.'
  },
  {
    id: 'math403-t3-ex05',
    subjectId: 'math403',
    topicId: 'math403-topic-3',
    type: 'written',
    title: 'Open Map Example',
    description: 'Give an example of a continuous function that is not an open map.',
    difficulty: 2,
    hints: [
      'Consider constant functions',
      'Or projection maps from ℝ² to ℝ',
      'Show that some open set maps to a non-open set'
    ],
    solution: 'Let f: ℝ → ℝ be the constant function f(x) = 0. Then f is continuous. However, (0, 1) is open in ℝ, but f((0, 1)) = {0} is not open in ℝ. Therefore, f is not an open map. Another example: the projection π₁: ℝ² → ℝ given by π₁(x, y) = x is continuous and open, but f(x) = x² is continuous but not open (maps (-1, 1) to [0, 1)).'
  },
  {
    id: 'math403-t3-ex06',
    subjectId: 'math403',
    topicId: 'math403-topic-3',
    type: 'written',
    title: 'Closed Map Example',
    description: 'Show that the projection π₁: ℝ² → ℝ given by π₁(x, y) = x is not a closed map.',
    difficulty: 2,
    hints: [
      'Find a closed set whose image is not closed',
      'Consider the hyperbola xy = 1',
      'What is the image of this hyperbola?'
    ],
    solution: 'Consider the set F = {(x, y) ∈ ℝ² : xy = 1}. This set is closed in ℝ² (it\'s the preimage of {1} under the continuous function (x, y) ↦ xy). The image π₁(F) = {x ∈ ℝ : x ≠ 0} = ℝ \\ {0}, which is not closed in ℝ. Therefore, π₁ is not a closed map.'
  },
  {
    id: 'math403-t3-ex07',
    subjectId: 'math403',
    topicId: 'math403-topic-3',
    type: 'written',
    title: 'Homeomorphism Invariant',
    description: 'Prove that connectedness is a topological property (preserved by homeomorphisms).',
    difficulty: 3,
    hints: [
      'Let f: X → Y be a homeomorphism',
      'Assume X is connected',
      'Show Y cannot be written as a disjoint union of nonempty open sets'
    ],
    solution: 'Let f: X → Y be a homeomorphism and assume X is connected. Suppose Y = U ∪ V where U, V are nonempty disjoint open sets. Then X = f⁻¹(Y) = f⁻¹(U) ∪ f⁻¹(V). Since f is continuous, f⁻¹(U) and f⁻¹(V) are open. Since f is a bijection, f⁻¹(U) and f⁻¹(V) are disjoint and nonempty. This contradicts the connectedness of X. Therefore, Y is connected.'
  },
  {
    id: 'math403-t3-ex08',
    subjectId: 'math403',
    topicId: 'math403-topic-3',
    type: 'written',
    title: 'Non-Homeomorphic Spaces',
    description: 'Prove that [0, 1] and (0, 1) are not homeomorphic.',
    difficulty: 3,
    hints: [
      'Use a topological invariant',
      'Consider what happens when you remove a point',
      'Connectedness is preserved by homeomorphisms'
    ],
    solution: 'Suppose f: [0, 1] → (0, 1) is a homeomorphism. Let x = f⁻¹(1/2). Consider the restriction g = f|[0,1]\\{x}: [0, 1] \\ {x} → (0, 1) \\ {1/2}. Since f is a homeomorphism, g is also a homeomorphism. But [0, 1] \\ {x} is disconnected if x ∈ (0, 1), or connected if x ∈ {0, 1}. Meanwhile, (0, 1) \\ {1/2} is always disconnected. If x ∈ {0, 1}, we get a contradiction since connectedness is preserved. If x ∈ (0, 1), we need more care, but [0, 1] is compact while (0, 1) is not, contradicting the preservation of compactness.'
  },
  {
    id: 'math403-t3-ex09',
    subjectId: 'math403',
    topicId: 'math403-topic-3',
    type: 'written',
    title: 'Product Topology Projections',
    description: 'Prove that the projection maps πᵢ: X₁ × X₂ → Xᵢ are continuous and open in the product topology.',
    difficulty: 3,
    hints: [
      'For continuity, use the definition of product topology',
      'For openness, consider basis elements',
      'π₁(U₁ × U₂) = U₁'
    ],
    solution: 'Continuity: Let U be open in Xᵢ. Then π₁⁻¹(U) = U × X₂ (for i=1) which is open in the product topology by definition. Openness: Let W be open in X₁ × X₂. We can write W = ⋃ⱼ(Uⱼ × Vⱼ) where Uⱼ, Vⱼ are open. Then π₁(W) = ⋃ⱼ π₁(Uⱼ × Vⱼ) = ⋃ⱼ Uⱼ, which is open in X₁. Therefore, π₁ is continuous and open.'
  },
  {
    id: 'math403-t3-ex10',
    subjectId: 'math403',
    topicId: 'math403-topic-3',
    type: 'written',
    title: 'Continuous Extension',
    description: 'Let f: A → Y be continuous where A is dense in X. If Y is Hausdorff and f has at most one continuous extension to X, prove uniqueness.',
    difficulty: 4,
    hints: [
      'Suppose g, h: X → Y are continuous extensions',
      'Consider the set where g = h',
      'Use density of A and Hausdorff property'
    ],
    solution: 'Suppose g, h: X → Y are continuous extensions of f. Let E = {x ∈ X : g(x) = h(x)}. Since g, h are continuous and Y is Hausdorff, E is closed (it\'s the preimage of the diagonal under (g, h)). Since f = g|ₐ = h|ₐ, we have A ⊆ E. Since A is dense and E is closed, cl(A) ⊆ E, so X = cl(A) ⊆ E. Therefore, g = h on all of X, proving uniqueness.'
  },
  {
    id: 'math403-t3-ex11',
    subjectId: 'math403',
    topicId: 'math403-topic-3',
    type: 'written',
    title: 'Quotient Map Properties',
    description: 'Let π: X → Y be a quotient map. Prove that a function f: Y → Z is continuous if and only if f ∘ π: X → Z is continuous.',
    difficulty: 3,
    hints: [
      'This is the universal property of quotient spaces',
      'Use the definition of quotient map',
      'One direction is composition of continuous functions'
    ],
    solution: '(⇒) If f is continuous and π is continuous (quotient maps are continuous), then f ∘ π is continuous by composition. (⇐) Assume f ∘ π is continuous. Let W be open in Z. We need to show f⁻¹(W) is open in Y. By definition of quotient topology, f⁻¹(W) is open in Y iff π⁻¹(f⁻¹(W)) is open in X. But π⁻¹(f⁻¹(W)) = (f ∘ π)⁻¹(W), which is open since f ∘ π is continuous. Therefore, f is continuous.'
  },
  {
    id: 'math403-t3-ex12',
    subjectId: 'math403',
    topicId: 'math403-topic-3',
    type: 'written',
    title: 'Gluing Lemma',
    description: 'Let X = A ∪ B where A, B are closed. If f: A → Y and g: B → Y are continuous and agree on A ∩ B, prove that h: X → Y defined by h(x) = f(x) for x ∈ A and h(x) = g(x) for x ∈ B is continuous.',
    difficulty: 3,
    hints: [
      'Use the closed set characterization',
      'Let F be closed in Y',
      'h⁻¹(F) = (f⁻¹(F) ∩ A) ∪ (g⁻¹(F) ∩ B)'
    ],
    solution: 'Let F be closed in Y. Then h⁻¹(F) = {x ∈ X : h(x) ∈ F} = {x ∈ A : f(x) ∈ F} ∪ {x ∈ B : g(x) ∈ F} = f⁻¹(F) ∪ g⁻¹(F). Since f and g are continuous, f⁻¹(F) is closed in A and g⁻¹(F) is closed in B. Since A and B are closed in X, f⁻¹(F) and g⁻¹(F) are closed in X. Therefore, h⁻¹(F) = f⁻¹(F) ∪ g⁻¹(F) is closed in X, so h is continuous.'
  },
  {
    id: 'math403-t3-ex13',
    subjectId: 'math403',
    topicId: 'math403-topic-3',
    type: 'written',
    title: 'Universal Property of Product',
    description: 'Prove that a function f: Z → X × Y is continuous if and only if π₁ ∘ f and π₂ ∘ f are both continuous.',
    difficulty: 3,
    hints: [
      'Use the definition of product topology',
      'One direction follows from composition',
      'For the other, use the basis for the product topology'
    ],
    solution: '(⇒) If f is continuous, then π₁ ∘ f and π₂ ∘ f are continuous by composition. (⇐) Assume π₁ ∘ f and π₂ ∘ f are continuous. Let U × V be a basis element for X × Y. Then f⁻¹(U × V) = {z ∈ Z : f(z) ∈ U × V} = {z : π₁(f(z)) ∈ U and π₂(f(z)) ∈ V} = (π₁ ∘ f)⁻¹(U) ∩ (π₂ ∘ f)⁻¹(V), which is open. Since f⁻¹ takes basis elements to open sets and preserves unions, f is continuous.'
  },
  {
    id: 'math403-t3-ex14',
    subjectId: 'math403',
    topicId: 'math403-topic-3',
    type: 'written',
    title: 'Continuity and Convergence',
    description: 'In a first countable space, prove that f: X → Y is continuous at x if and only if for every sequence (xₙ) converging to x, the sequence (f(xₙ)) converges to f(x).',
    difficulty: 4,
    hints: [
      'Use the sequential characterization',
      'First countable means countable local basis',
      'One direction is straightforward'
    ],
    solution: '(⇒) Assume f is continuous at x and xₙ → x. Let V be a neighborhood of f(x). Then f⁻¹(V) is a neighborhood of x. Since xₙ → x, there exists N such that xₙ ∈ f⁻¹(V) for n ≥ N. Thus f(xₙ) ∈ V for n ≥ N, so f(xₙ) → f(x). (⇐) Assume the sequential condition. Suppose f is not continuous at x. Then there exists a neighborhood V of f(x) such that for every neighborhood U of x, there exists y ∈ U with f(y) ∉ V. Let {Uₙ} be a countable local basis at x with Uₙ₊₁ ⊆ Uₙ. Choose xₙ ∈ Uₙ with f(xₙ) ∉ V. Then xₙ → x but f(xₙ) ↛ f(x), contradiction.'
  },
  {
    id: 'math403-t3-ex15',
    subjectId: 'math403',
    topicId: 'math403-topic-3',
    type: 'written',
    title: 'Box Topology vs Product Topology',
    description: 'Show that the box topology on ∏ᵢℝ (infinite product) is strictly finer than the product topology.',
    difficulty: 3,
    hints: [
      'In product topology, basis elements have only finitely many non-trivial components',
      'In box topology, all components can be non-trivial',
      'Find a set open in box but not in product topology'
    ],
    solution: 'Every product topology basis element is of the form ∏ᵢUᵢ where Uᵢ = ℝ for all but finitely many i. Such sets are also open in the box topology. Thus, product topology ⊆ box topology. Consider U = ∏ₙ(-1/n, 1/n) in ∏ₙℝ. This is a basis element in the box topology. However, U is not open in the product topology: the origin 0 = (0, 0, ...) ∈ U, but any product topology basis element containing 0 has the form ∏ₙVₙ where Vₙ = ℝ for all but finitely many n, which is not contained in U. Therefore, the box topology is strictly finer.'
  },
  {
    id: 'math403-t3-ex16',
    subjectId: 'math403',
    topicId: 'math403-topic-3',
    type: 'written',
    title: 'Quotient Topology Example',
    description: 'Let X = [0, 1] and define an equivalence relation by x ~ y if x = y or {x, y} = {0, 1}. Describe the quotient space X/~ geometrically.',
    difficulty: 2,
    hints: [
      'What points are identified?',
      'Only 0 and 1 are identified',
      'Think about the resulting shape'
    ],
    solution: 'The equivalence relation identifies 0 and 1, while all other points are equivalent only to themselves. The quotient space X/~ can be visualized as the circle S¹. We glue the endpoints of [0, 1] together to form a circle. Formally, X/~ is homeomorphic to S¹ via the map that sends [x] to e^(2πix). This quotient map wraps the interval around into a circle.'
  }
];
