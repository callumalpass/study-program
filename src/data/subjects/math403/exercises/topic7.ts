import { WrittenExercise } from '../../../../core/types';

export const topic7Exercises: WrittenExercise[] = [
  {
    id: 'math403-t7-ex01',
    subjectId: 'math403',
    topicId: 'math403-topic-7',
    type: 'written',
    title: 'Topology in Analysis',
    description: 'Explain how the concepts of topology are fundamental to real analysis.',
    difficulty: 2,
    hints: [
      'Continuity is defined topologically',
      'Compactness gives extreme value theorem',
      'Connectedness gives intermediate value theorem'
    ],
    solution: 'Topology provides the abstract framework for analysis: (1) Continuity: The ε-δ definition is equivalent to the topological definition (preimages of open sets are open). This generalizes to any topological space. (2) Limits and convergence: Defined using neighborhoods and open sets. (3) Compactness: The Heine-Borel theorem and extreme value theorem rely on compactness. In metric spaces, compactness relates to sequential compactness and completeness. (4) Connectedness: The intermediate value theorem uses the fact that continuous images of connected sets are connected. (5) Open/closed sets: Understanding the structure of ℝ through topology clarifies many analytic results.'
  },
  {
    id: 'math403-t7-ex02',
    subjectId: 'math403',
    topicId: 'math403-topic-7',
    type: 'written',
    title: 'Brouwer Fixed Point Theorem',
    description: 'State the Brouwer fixed point theorem for dimension 1 and prove it using the intermediate value theorem.',
    difficulty: 3,
    hints: [
      'Every continuous f: [0, 1] → [0, 1] has a fixed point',
      'Consider g(x) = f(x) - x',
      'Use IVT if g(0) ≥ 0 and g(1) ≤ 0'
    ],
    solution: 'Brouwer Fixed Point Theorem (1D): Every continuous function f: [0, 1] → [0, 1] has a fixed point. Proof: Define g(x) = f(x) - x. Then g is continuous. We have g(0) = f(0) - 0 = f(0) ≥ 0 (since f(0) ∈ [0, 1]) and g(1) = f(1) - 1 ≤ 0 (since f(1) ∈ [0, 1]). Case 1: If g(0) = 0, then f(0) = 0, so 0 is a fixed point. Case 2: If g(1) = 0, then f(1) = 1, so 1 is a fixed point. Case 3: If g(0) > 0 and g(1) < 0, then by the intermediate value theorem, there exists c ∈ (0, 1) with g(c) = 0, so f(c) = c. In all cases, f has a fixed point.'
  },
  {
    id: 'math403-t7-ex03',
    subjectId: 'math403',
    topicId: 'math403-topic-7',
    type: 'written',
    title: 'Brouwer Fixed Point in 2D',
    description: 'State the Brouwer fixed point theorem for the unit disk D² and explain its significance.',
    difficulty: 2,
    hints: [
      'Every continuous f: D² → D² has a fixed point',
      'D² = {(x, y) : x² + y² ≤ 1}',
      'Applications in game theory, economics, differential equations'
    ],
    solution: 'Brouwer Fixed Point Theorem (2D): Every continuous function f: D² → D² has a fixed point, where D² = {(x, y) ∈ ℝ² : x² + y² ≤ 1}. Significance: This is a powerful existence theorem. It doesn\'t tell us where the fixed point is, but guarantees existence. The proof for n > 1 requires algebraic topology (no retraction from D² to S¹). Applications: (1) Game theory: Nash equilibrium existence, (2) Economics: existence of market equilibrium, (3) Differential equations: Poincaré-Miranda theorem, (4) Root-finding: Brouwer degree theory. Generalizes to all convex compact subsets of ℝⁿ.'
  },
  {
    id: 'math403-t7-ex04',
    subjectId: 'math403',
    topicId: 'math403-topic-7',
    type: 'written',
    title: 'No Retraction Theorem',
    description: 'State the no retraction theorem: there is no continuous retraction from D² to S¹.',
    difficulty: 3,
    hints: [
      'A retraction is r: D² → S¹ with r(x) = x for x ∈ S¹',
      'This implies Brouwer fixed point theorem',
      'Proof requires algebraic topology (fundamental group)'
    ],
    solution: 'Theorem: There is no continuous retraction r: D² → S¹, where S¹ = ∂D² is the boundary circle. A retraction would satisfy r: D² → S¹ continuous with r|_{S¹} = id_{S¹}. Consequence: This implies the Brouwer fixed point theorem for D². Suppose f: D² → D² has no fixed point. Define r(x) = the intersection of the ray from f(x) through x with S¹. Then r is a retraction, contradiction. Proof of no retraction: Uses fundamental group. If r existed, then π₁(S¹) → π₁(D²) → π₁(S¹) would satisfy i ∘ r = id, where i is inclusion. But π₁(D²) = 0 and π₁(S¹) = ℤ, impossible. This is a topological obstruction: D² and S¹ have fundamentally different topology.'
  },
  {
    id: 'math403-t7-ex05',
    subjectId: 'math403',
    topicId: 'math403-topic-7',
    type: 'written',
    title: 'Hairy Ball Theorem',
    description: 'State the hairy ball theorem and explain what it means geometrically.',
    difficulty: 2,
    hints: [
      'You cannot comb a hairy ball flat',
      'No continuous non-vanishing tangent vector field on S²',
      'Related to fixed point theorems'
    ],
    solution: 'Hairy Ball Theorem: There is no continuous non-vanishing tangent vector field on the 2-sphere S². Geometric meaning: Imagine S² covered with hair (tangent vectors at each point). You cannot comb the hair so that it lies flat everywhere without creating at least one "cowlick" (point where the vector is zero). Equivalently: Every continuous vector field on S² must vanish at some point. Proof sketch: Suppose v: S² → ℝ³ is a continuous tangent vector field with v(x) ≠ 0 for all x. Define f(x) = x + εv(x)/|v(x)| for small ε. Then f: S² → S² has no fixed point (sufficiently small ε), contradicting Brouwer. Generalizes: S^n has a non-vanishing vector field ⟺ n is odd.'
  },
  {
    id: 'math403-t7-ex06',
    subjectId: 'math403',
    topicId: 'math403-topic-7',
    type: 'written',
    title: 'Differential Topology Introduction',
    description: 'Explain the difference between topology and differential topology.',
    difficulty: 2,
    hints: [
      'Topology studies continuous deformations',
      'Differential topology studies smooth deformations',
      'Differentiable manifolds vs topological manifolds'
    ],
    solution: 'Topology: Studies properties preserved by homeomorphisms (continuous bijections with continuous inverse). Focuses on open sets, continuity, compactness, connectedness. No notion of smoothness or derivatives. Differential Topology: Studies properties preserved by diffeomorphisms (smooth bijections with smooth inverse). Requires differentiable manifolds - spaces locally like ℝⁿ with smooth transition maps. Studies: tangent spaces, vector fields, differential forms, degree theory, Morse theory. Key difference: A sphere and a cube are homeomorphic (same topology) but to make them diffeomorphic requires smoothing corners. Example: All 1-manifolds are topologically circles or lines, but differential topology distinguishes different smooth structures (exotic spheres in higher dimensions).'
  },
  {
    id: 'math403-t7-ex07',
    subjectId: 'math403',
    topicId: 'math403-topic-7',
    type: 'written',
    title: 'Smooth Manifolds',
    description: 'Define what it means for a space to be a smooth manifold and give two examples.',
    difficulty: 2,
    hints: [
      'Locally looks like ℝⁿ',
      'Charts and atlases',
      'Smooth transition functions'
    ],
    solution: 'A smooth (differentiable) manifold is a topological space M that is: (1) Hausdorff and second countable, (2) Locally Euclidean: every point has a neighborhood homeomorphic to an open subset of ℝⁿ (charts), (3) Equipped with a smooth atlas: the transition maps between overlapping charts are smooth (C^∞). Examples: (1) S² (2-sphere): Can be covered by stereographic projection charts from north and south poles. Transition functions are smooth. (2) ℝⁿ: Trivially a manifold with a single chart (identity map). Other examples: Torus T² = S¹ × S¹, real projective space ℝP^n, Lie groups like SO(n).'
  },
  {
    id: 'math403-t7-ex08',
    subjectId: 'math403',
    topicId: 'math403-topic-7',
    type: 'written',
    title: 'Knot Theory Basics',
    description: 'Define what a knot is in mathematical terms and explain what it means for two knots to be equivalent.',
    difficulty: 2,
    hints: [
      'Knot: embedding of S¹ in ℝ³',
      'Equivalence: ambient isotopy',
      'Can be deformed into each other without cutting'
    ],
    solution: 'A knot is an embedding K: S¹ → ℝ³ (or S³), i.e., a continuous injective map from the circle into 3-space. Equivalently, a closed curve in ℝ³ that doesn\'t intersect itself. Two knots K₁ and K₂ are equivalent (or isotopic) if there exists an ambient isotopy between them: a continuous family of homeomorphisms Hₜ: ℝ³ → ℝ³ (0 ≤ t ≤ 1) with H₀ = id and H₁(K₁) = K₂. Intuitively: You can deform one into the other through space without cutting the string or passing it through itself. Examples: Unknot (trivial knot), trefoil knot (simplest non-trivial knot), figure-eight knot. Knot invariants (like knot polynomials, knot groups) help distinguish non-equivalent knots.'
  },
  {
    id: 'math403-t7-ex09',
    subjectId: 'math403',
    topicId: 'math403-topic-7',
    type: 'written',
    title: 'Trefoil Knot',
    description: 'Describe the trefoil knot and explain why it is not equivalent to the unknot.',
    difficulty: 3,
    hints: [
      'Trefoil has three crossings (minimal)',
      'Use a knot invariant',
      'Knot group or tricolorability'
    ],
    solution: 'The trefoil knot is the simplest non-trivial knot, with three crossings in its minimal diagram. Parametrically: K(t) = ((2 + cos 3t) cos 2t, (2 + cos 3t) sin 2t, sin 3t). To show it\'s not the unknot: Method 1 (Tricolorability): The trefoil is tricolorable - you can color the three arcs with three colors so that at each crossing, either all three colors meet or only one color appears. The unknot is not tricolorable. Method 2 (Knot group): π₁(ℝ³ \\ K) = ⟨a, b | aba = bab⟩ for the trefoil, but π₁(ℝ³ \\ unknot) = ℤ. These groups are not isomorphic (the trefoil group is non-abelian). Method 3 (Jones polynomial): J_trefoil(t) = t + t³ - t⁴ ≠ 1 = J_unknot(t).'
  },
  {
    id: 'math403-t7-ex10',
    subjectId: 'math403',
    topicId: 'math403-topic-7',
    type: 'written',
    title: 'Algebraic Topology Introduction',
    description: 'Explain the main idea of algebraic topology and give an example of an algebraic invariant.',
    difficulty: 2,
    hints: [
      'Associate algebraic objects to topological spaces',
      'Invariants under homeomorphism',
      'Fundamental group, homology, cohomology'
    ],
    solution: 'Algebraic topology assigns algebraic objects (groups, rings, etc.) to topological spaces in a way that preserves topological structure. If X ≅ Y (homeomorphic), then their algebraic invariants are isomorphic. This allows us to: (1) Distinguish spaces (if invariants differ, spaces aren\'t homeomorphic), (2) Prove theorems using algebra. Example: The fundamental group π₁(X, x₀) measures 1-dimensional holes - loops that cannot be continuously shrunk to a point. Examples: π₁(S¹) = ℤ (wrapping number), π₁(S²) = 0 (simply connected), π₁(T²) = ℤ × ℤ (two independent loops). Since π₁(S¹) ≠ π₁(S²), we know S¹ ≄ S². Other invariants: homology groups Hₙ(X), Euler characteristic χ(X), cohomology rings.'
  },
  {
    id: 'math403-t7-ex11',
    subjectId: 'math403',
    topicId: 'math403-topic-7',
    type: 'written',
    title: 'Fundamental Group Definition',
    description: 'Define the fundamental group π₁(X, x₀) of a topological space X.',
    difficulty: 3,
    hints: [
      'Equivalence classes of loops based at x₀',
      'Homotopy equivalence',
      'Group operation: concatenation'
    ],
    solution: 'Let X be a topological space and x₀ ∈ X a basepoint. A loop based at x₀ is a continuous map γ: [0, 1] → X with γ(0) = γ(1) = x₀. Two loops γ₀ and γ₁ are homotopic (γ₀ ≃ γ₁) if there exists a continuous homotopy H: [0, 1] × [0, 1] → X with H(s, 0) = γ₀(s), H(s, 1) = γ₁(s), and H(0, t) = H(1, t) = x₀ for all s, t. The fundamental group π₁(X, x₀) is the set of homotopy classes of loops based at x₀, with group operation given by concatenation: [γ] · [δ] = [γ * δ] where (γ * δ)(s) = γ(2s) for s ≤ 1/2 and δ(2s-1) for s ≥ 1/2. Identity: constant loop [c_{x₀}]. Inverse: [γ]⁻¹ = [γ⁻], where γ⁻(s) = γ(1-s).'
  },
  {
    id: 'math403-t7-ex12',
    subjectId: 'math403',
    topicId: 'math403-topic-7',
    type: 'written',
    title: 'Fundamental Group of Circle',
    description: 'State that π₁(S¹) = ℤ and explain what this means intuitively.',
    difficulty: 2,
    hints: [
      'Each loop has a winding number',
      'n corresponds to wrapping n times around',
      'Covering space: ℝ → S¹ via t ↦ e^{2πit}'
    ],
    solution: 'π₁(S¹) = ℤ. Intuitive meaning: Each homotopy class of loops on the circle corresponds to an integer n ∈ ℤ, called the winding number, which counts how many times the loop wraps around the circle (positive for counterclockwise, negative for clockwise). A loop winding n times cannot be continuously deformed to a loop winding m times if n ≠ m. The group operation corresponds to addition of winding numbers. Formal proof uses the covering space p: ℝ → S¹ given by p(t) = e^{2πit}. Lifting a loop γ: [0, 1] → S¹ with γ(0) = 1 to γ̃: [0, 1] → ℝ with γ̃(0) = 0 gives γ̃(1) = n for some n ∈ ℤ. This n is the winding number, and the map [γ] ↦ n is the isomorphism π₁(S¹) → ℤ.'
  },
  {
    id: 'math403-t7-ex13',
    subjectId: 'math403',
    topicId: 'math403-topic-7',
    type: 'written',
    title: 'Simply Connected Spaces',
    description: 'Define simply connected and give three examples.',
    difficulty: 2,
    hints: [
      'π₁(X) = 0 or trivial',
      'Every loop can be contracted to a point',
      'Convex subsets of ℝⁿ'
    ],
    solution: 'A space X is simply connected if it is path connected and π₁(X, x₀) = 0 (trivial group) for some (equivalently, every) basepoint x₀. Equivalently: every loop in X can be continuously contracted to a point. Examples: (1) ℝⁿ: Every loop in Euclidean space can be shrunk to a point. (2) S²: The 2-sphere is simply connected. Any loop on the sphere bounds a disk and can be contracted. (3) D² (disk): Any convex set is simply connected. Non-examples: S¹ (π₁(S¹) = ℤ), T² (torus, π₁(T²) = ℤ × ℤ), ℝ² \\ {0} (punctured plane, π₁ = ℤ). Note: S^n is simply connected for n ≥ 2.'
  },
  {
    id: 'math403-t7-ex14',
    subjectId: 'math403',
    topicId: 'math403-topic-7',
    type: 'written',
    title: 'Covering Space Definition',
    description: 'Define a covering space and give an example.',
    difficulty: 3,
    hints: [
      'p: X̃ → X with each point evenly covered',
      'Local homeomorphism with discrete fibers',
      'Universal cover: simply connected covering'
    ],
    solution: 'A covering space of X is a space X̃ together with a continuous surjection p: X̃ → X (covering map) such that every point x ∈ X has an evenly covered neighborhood U: p⁻¹(U) is a disjoint union ⊔ᵢVᵢ of open sets in X̃, each mapped homeomorphically onto U by p. Example: The map p: ℝ → S¹ given by p(t) = e^{2πit} is a covering map. Each point e^{iθ} ∈ S¹ has a neighborhood (say, an open arc) whose preimage in ℝ is a disjoint union of open intervals, each mapped homeomorphically onto the arc. The fiber p⁻¹(e^{iθ}) = {θ/2π + n : n ∈ ℤ} is discrete. ℝ is the universal cover of S¹ (simply connected covering). Other example: S¹ → S¹ via z ↦ z^n (n-fold cover).'
  },
  {
    id: 'math403-t7-ex15',
    subjectId: 'math403',
    topicId: 'math403-topic-7',
    type: 'written',
    title: 'Lifting Properties',
    description: 'State the path lifting property for covering spaces.',
    difficulty: 3,
    hints: [
      'Paths in base lift to paths in cover',
      'Uniqueness given initial point',
      'Used to compute fundamental group'
    ],
    solution: 'Path Lifting Property: Let p: X̃ → X be a covering space, γ: [0, 1] → X a path, and x̃₀ ∈ X̃ with p(x̃₀) = γ(0). Then there exists a unique lift γ̃: [0, 1] → X̃ with p ∘ γ̃ = γ and γ̃(0) = x̃₀. Intuition: Paths in X can be uniquely lifted to X̃ once you specify the starting point. The lift is continuous and unique. Application: Used to define the monodromy action and compute fundamental groups. For example, to show π₁(S¹) = ℤ, we lift loops in S¹ to paths in ℝ. The endpoint γ̃(1) ∈ ℝ depends only on the homotopy class of γ, giving the isomorphism π₁(S¹) → ℤ. More general: Homotopy lifting property lifts homotopies.'
  },
  {
    id: 'math403-t7-ex16',
    subjectId: 'math403',
    topicId: 'math403-topic-7',
    type: 'written',
    title: 'Fundamental Group of Torus',
    description: 'Compute π₁(T²) where T² = S¹ × S¹ is the torus.',
    difficulty: 3,
    hints: [
      'Use the product formula',
      'π₁(X × Y) = π₁(X) × π₁(Y)',
      'Two independent loops: meridian and longitude'
    ],
    solution: 'The torus is T² = S¹ × S¹. Using the fact that the fundamental group of a product is the product of fundamental groups: π₁(S¹ × S¹) = π₁(S¹) × π₁(S¹) = ℤ × ℤ. Geometric interpretation: T² has two independent non-contractible loops: the meridian (going around the "tube") and the longitude (going around the "hole"). Each loop can wrap any number of times, giving two independent integers. An element (m, n) ∈ π₁(T²) represents a loop that wraps m times around the meridian and n times around the longitude. These loops generate π₁(T²), and the only relation is commutativity: the group is abelian. In terms of generators and relations: π₁(T²) = ⟨a, b | ab = ba⟩ = ℤ × ℤ.'
  }
];
