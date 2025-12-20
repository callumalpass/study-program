import type { WrittenExercise } from '../../../../core/types';

export const exercises: WrittenExercise[] = [
  {
    id: 'math404-t4-ex01',
    subjectId: 'math404',
    topicId: 'math404-topic-4',
    type: 'written',
    title: 'Convex Set Verification',
    description: 'Prove that a given set is convex by showing it satisfies the definition of convexity.',
    difficulty: 1,
    hints: [
      'A set is convex if for any two points x, y in the set, the line segment connecting them is also in the set',
      'Mathematically: λx + (1-λ)y ∈ S for all λ ∈ [0,1]',
      'Show the convex combination satisfies the defining inequality'
    ],
    solution: `**Problem:** Prove the set S = {x ∈ ℝ² : x₁ + 2x₂ ≤ 4} is convex.

**Proof:**
Let x, y ∈ S and λ ∈ [0,1].
We need to show z = λx + (1-λ)y ∈ S.

**Step 1:** Since x ∈ S: x₁ + 2x₂ ≤ 4
**Step 2:** Since y ∈ S: y₁ + 2y₂ ≤ 4

**Step 3:** Check z = λx + (1-λ)y:
z₁ + 2z₂ = λx₁ + (1-λ)y₁ + 2λx₂ + 2(1-λ)y₂
         = λ(x₁ + 2x₂) + (1-λ)(y₁ + 2y₂)
         ≤ λ·4 + (1-λ)·4
         = 4

**Conclusion:** z ∈ S, so S is convex. ∎

**Geometric interpretation:** S is a halfspace, and all halfspaces are convex.`
  },
  {
    id: 'math404-t4-ex02',
    subjectId: 'math404',
    topicId: 'math404-topic-4',
    type: 'written',
    title: 'Non-Convex Set Example',
    description: 'Show that the union of two disjoint intervals is not convex by providing a counterexample.',
    difficulty: 1,
    hints: [
      'Find two points in the set such that a point on the line segment between them is not in the set',
      'For unions, points in different components often work',
      'The midpoint is a good candidate'
    ],
    solution: `**Set:** S = [0,1] ∪ [2,3] ⊂ ℝ

**Counterexample:**
Take x = 0.5 ∈ [0,1] ⊂ S
Take y = 2.5 ∈ [2,3] ⊂ S

**Midpoint:** z = 0.5·0.5 + 0.5·2.5 = 1.5

**Check:** 1.5 ∉ [0,1] and 1.5 ∉ [2,3]

Therefore z = 1.5 ∉ S.

**Conclusion:** We found x, y ∈ S and λ = 0.5 such that λx + (1-λ)y ∉ S.
Therefore S is NOT convex. ∎

**Key insight:** The union of convex sets is generally not convex, unlike intersection which always preserves convexity.`
  },
  {
    id: 'math404-t4-ex03',
    subjectId: 'math404',
    topicId: 'math404-topic-4',
    type: 'written',
    title: 'Intersection of Convex Sets',
    description: 'Prove that the intersection of any collection of convex sets is convex.',
    difficulty: 2,
    hints: [
      'Let {Cᵢ} be a collection of convex sets',
      'Take any two points in the intersection and show their convex combination is in the intersection',
      'A point is in the intersection iff it is in every Cᵢ'
    ],
    solution: `**Theorem:** If {Cᵢ}ᵢ∈I is a collection of convex sets, then C = ∩ᵢ∈I Cᵢ is convex.

**Proof:**
Let x, y ∈ C and λ ∈ [0,1].
We need to show z = λx + (1-λ)y ∈ C.

**Step 1:** Since x ∈ C, we have x ∈ Cᵢ for all i ∈ I.
**Step 2:** Since y ∈ C, we have y ∈ Cᵢ for all i ∈ I.

**Step 3:** Fix any i ∈ I.
- x ∈ Cᵢ and y ∈ Cᵢ
- Cᵢ is convex
- Therefore z = λx + (1-λ)y ∈ Cᵢ

**Step 4:** Since z ∈ Cᵢ for all i ∈ I, we have z ∈ ∩ᵢ∈I Cᵢ = C.

**Conclusion:** C is convex. ∎

**Applications:**
- Feasible region of LP = intersection of halfspaces (convex)
- Positive semidefinite cone = intersection of halfspaces in eigenvalue space`
  },
  {
    id: 'math404-t4-ex04',
    subjectId: 'math404',
    topicId: 'math404-topic-4',
    type: 'written',
    title: 'Convex Hull Computation',
    description: 'Find the convex hull of a finite set of points and describe it as the intersection of halfspaces.',
    difficulty: 2,
    hints: [
      'Convex hull = smallest convex set containing all points',
      'For finite points, it is a polyhedron',
      'Can express as {x : Ax ≤ b} for appropriate A, b'
    ],
    solution: `**Points:** P = {(0,0), (2,0), (0,2)}

**Step 1: Identify convex hull**
conv(P) = {λ₁(0,0) + λ₂(2,0) + λ₃(0,2) : λᵢ ≥ 0, Σλᵢ = 1}

This is a triangle with vertices at the three points.

**Step 2: Find halfspace representation**
The triangle is bounded by three lines:
- x₁ = 0 (left edge)
- x₂ = 0 (bottom edge)
- x₁ + x₂ = 2 (hypotenuse)

**Halfspace form:**
conv(P) = {(x₁,x₂) : x₁ ≥ 0, x₂ ≥ 0, x₁ + x₂ ≤ 2}

**Matrix form:**
A = [[-1, 0], [0, -1], [1, 1]], b = [0, 0, 2]ᵀ
conv(P) = {x : Ax ≤ b}

**Verification:**
- (0,0): [-0, 0, 0] ≤ [0, 0, 2] ✓
- (2,0): [-2, 0, 2] ≤ [0, 0, 2] ✓
- (0,2): [0, -2, 2] ≤ [0, 0, 2] ✓
- (1,0.5): [-1, -0.5, 1.5] ≤ [0, 0, 2] ✓ (interior point)`
  },
  {
    id: 'math404-t4-ex05',
    subjectId: 'math404',
    topicId: 'math404-topic-4',
    type: 'written',
    title: 'Convex Function Verification via Definition',
    description: 'Prove that f(x) = eˣ is convex using the definition of convexity.',
    difficulty: 2,
    hints: [
      'Need to show f(λx + (1-λ)y) ≤ λf(x) + (1-λ)f(y)',
      'Use properties of the exponential function',
      'Consider using the weighted AM-GM inequality'
    ],
    solution: `**Claim:** f(x) = eˣ is convex on ℝ.

**Proof using definition:**
For any x, y ∈ ℝ and λ ∈ [0,1], we need to show:
e^(λx + (1-λ)y) ≤ λeˣ + (1-λ)eʸ

**Method 1: Using AM-GM inequality**
The weighted arithmetic mean-geometric mean inequality states:
aᵏb¹⁻ᵏ ≤ λa + (1-λ)b for a,b > 0 and λ ∈ [0,1]

Let a = eˣ and b = eʸ:
(eˣ)ᵏ(eʸ)¹⁻ᵏ ≤ λeˣ + (1-λ)eʸ
e^(λx)e^((1-λ)y) ≤ λeˣ + (1-λ)eʸ
e^(λx + (1-λ)y) ≤ λeˣ + (1-λ)eʸ ✓

**Method 2: Second derivative test**
f'(x) = eˣ
f''(x) = eˣ > 0 for all x ∈ ℝ

Since f''(x) > 0, the function is strictly convex.

**Conclusion:** f(x) = eˣ is convex (in fact, strictly convex). ∎`
  },
  {
    id: 'math404-t4-ex06',
    subjectId: 'math404',
    topicId: 'math404-topic-4',
    type: 'written',
    title: 'Hessian Test for Convexity',
    description: 'Determine whether f(x,y) = x² + xy + y² is convex by analyzing its Hessian matrix.',
    difficulty: 3,
    hints: [
      'Compute the Hessian matrix of second partial derivatives',
      'Check if the Hessian is positive semidefinite',
      'A 2×2 symmetric matrix is PSD if trace ≥ 0 and det ≥ 0'
    ],
    solution: `**Function:** f(x,y) = x² + xy + y²

**Step 1: Compute gradient**
∂f/∂x = 2x + y
∂f/∂y = x + 2y

**Step 2: Compute Hessian**
H = [[∂²f/∂x², ∂²f/∂x∂y], [∂²f/∂y∂x, ∂²f/∂y²]]
H = [[2, 1], [1, 2]]

**Step 3: Check positive semidefiniteness**

**Method 1: Eigenvalue test**
det(H - λI) = (2-λ)² - 1 = λ² - 4λ + 3 = 0
λ = (4 ± 2)/2 → λ₁ = 1, λ₂ = 3

Both eigenvalues > 0 → H is positive definite → f is strictly convex.

**Method 2: Leading principal minors**
M₁ = 2 > 0
M₂ = det(H) = 4 - 1 = 3 > 0

Since all leading principal minors > 0 → H is positive definite.

**Method 3: Quadratic form**
vᵀHv = 2v₁² + 2v₁v₂ + 2v₂² = v₁² + (v₁ + v₂)² + v₂² ≥ 0

with equality only when v = 0 → strictly convex.

**Conclusion:** f is strictly convex. ∎`
  },
  {
    id: 'math404-t4-ex07',
    subjectId: 'math404',
    topicId: 'math404-topic-4',
    type: 'written',
    title: 'First-Order Condition for Convexity',
    description: 'Use the first-order characterization to prove convexity of a differentiable function.',
    difficulty: 3,
    hints: [
      'First-order condition: f(y) ≥ f(x) + ∇f(x)ᵀ(y-x)',
      'This says the function lies above all its tangent lines',
      'Equivalent to convexity for differentiable functions'
    ],
    solution: `**Theorem:** A differentiable function f is convex iff:
f(y) ≥ f(x) + ∇f(x)ᵀ(y-x) for all x, y

**Example:** Prove f(x) = ||x||² = xᵀx is convex using first-order condition.

**Gradient:** ∇f(x) = 2x

**First-order condition:**
f(y) ≥ f(x) + ∇f(x)ᵀ(y-x)
||y||² ≥ ||x||² + 2xᵀ(y-x)
||y||² ≥ ||x||² + 2xᵀy - 2||x||²
||y||² ≥ 2xᵀy - ||x||²

**Rearranging:**
||y||² - 2xᵀy + ||x||² ≥ 0
(y - x)ᵀ(y - x) ≥ 0
||y - x||² ≥ 0 ✓

This is always true! ∎

**Geometric interpretation:**
The tangent hyperplane at x is z = f(x) + ∇f(x)ᵀ(y-x).
For convex f, the graph of f lies above this hyperplane.
For strictly convex f, the graph lies strictly above (except at x).`
  },
  {
    id: 'math404-t4-ex08',
    subjectId: 'math404',
    topicId: 'math404-topic-4',
    type: 'written',
    title: 'Operations Preserving Convexity - Sum',
    description: 'Prove that the sum of two convex functions is convex.',
    difficulty: 2,
    hints: [
      'Apply the definition of convexity to each function',
      'Add the inequalities together',
      'Use linearity of addition'
    ],
    solution: `**Theorem:** If f and g are convex, then h = f + g is convex.

**Proof:**
Let x, y ∈ dom(h) and λ ∈ [0,1].

**Step 1:** Since f is convex:
f(λx + (1-λ)y) ≤ λf(x) + (1-λ)f(y)

**Step 2:** Since g is convex:
g(λx + (1-λ)y) ≤ λg(x) + (1-λ)g(y)

**Step 3:** Add the inequalities:
f(λx + (1-λ)y) + g(λx + (1-λ)y) ≤ λf(x) + (1-λ)f(y) + λg(x) + (1-λ)g(y)

h(λx + (1-λ)y) ≤ λ(f(x) + g(x)) + (1-λ)(f(y) + g(y))

h(λx + (1-λ)y) ≤ λh(x) + (1-λ)h(y) ✓

**Conclusion:** h = f + g is convex. ∎

**Extension:** More generally, if f₁,...,fₙ are convex and w₁,...,wₙ ≥ 0, then:
h = Σᵢ wᵢfᵢ is convex.

**Example:** f(x) = x² + |x| + eˣ is convex (sum of three convex functions).`
  },
  {
    id: 'math404-t4-ex09',
    subjectId: 'math404',
    topicId: 'math404-topic-4',
    type: 'written',
    title: 'Pointwise Maximum of Convex Functions',
    description: 'Prove that the pointwise maximum of a set of convex functions is convex.',
    difficulty: 3,
    hints: [
      'Define h(x) = max{f₁(x), f₂(x), ...}',
      'Use that the max of two numbers ≤ max of each',
      'The maximum preserves the convexity inequality'
    ],
    solution: `**Theorem:** If f₁,...,fₘ are convex, then h(x) = max{f₁(x),...,fₘ(x)} is convex.

**Proof:**
Let x, y ∈ dom(h) and λ ∈ [0,1].
Let z = λx + (1-λ)y.

**Step 1:** For any i:
fᵢ(z) ≤ λfᵢ(x) + (1-λ)fᵢ(y)  (convexity of fᵢ)
      ≤ λ·max_j fⱼ(x) + (1-λ)·max_j fⱼ(y)  (fᵢ ≤ max)
      = λh(x) + (1-λ)h(y)

**Step 2:** Since this holds for all i:
max_i fᵢ(z) ≤ λh(x) + (1-λ)h(y)
h(z) ≤ λh(x) + (1-λ)h(y) ✓

**Conclusion:** h is convex. ∎

**Applications:**
1. **Piecewise linear:** max{a₁ᵀx + b₁, ..., aₘᵀx + bₘ}
2. **Spectral norm:** ||A|| = max_i σᵢ(A)
3. **Max eigenvalue:** λ_max(A) = max_||x||=1 xᵀAx

**Example:** f(x) = max{x, -x, 0} = |x|⁺ = max(|x|, 0) = |x|
This shows |x| is convex as max of linear functions.`
  },
  {
    id: 'math404-t4-ex10',
    subjectId: 'math404',
    topicId: 'math404-topic-4',
    type: 'written',
    title: 'Conjugate Function Computation',
    description: 'Compute the conjugate function f*(y) = sup_x{yᵀx - f(x)} for a quadratic function.',
    difficulty: 4,
    hints: [
      'Set derivative of yᵀx - f(x) to zero to find maximizer',
      'Substitute back to get f*(y)',
      'For quadratics, conjugate is also quadratic'
    ],
    solution: `**Problem:** Find f*(y) where f(x) = (1/2)xᵀQx for Q ≻ 0.

**Definition:** f*(y) = sup_x{yᵀx - f(x)} = sup_x{yᵀx - (1/2)xᵀQx}

**Step 1: Find maximizer**
∂/∂x [yᵀx - (1/2)xᵀQx] = y - Qx = 0
x* = Q⁻¹y

**Step 2: Substitute back**
f*(y) = yᵀ(Q⁻¹y) - (1/2)(Q⁻¹y)ᵀQ(Q⁻¹y)
      = yᵀQ⁻¹y - (1/2)yᵀQ⁻¹QQ⁻¹y
      = yᵀQ⁻¹y - (1/2)yᵀQ⁻¹y
      = (1/2)yᵀQ⁻¹y

**Result:** f*(y) = (1/2)yᵀQ⁻¹y

**Observations:**
1. f*(y) is also quadratic
2. The Hessian of f is Q; the Hessian of f* is Q⁻¹
3. Taking conjugate again: f**(x) = f(x) (for convex f)

**Special case:** f(x) = (1/2)x² → f*(y) = (1/2)y²

**General property:** If f has strong convexity parameter m and smoothness L, then f* has strong convexity 1/L and smoothness 1/m.`
  },
  {
    id: 'math404-t4-ex11',
    subjectId: 'math404',
    topicId: 'math404-topic-4',
    type: 'written',
    title: 'Sublevel Sets and Convexity',
    description: 'Show that sublevel sets of a convex function are convex, and provide a counterexample for the converse.',
    difficulty: 3,
    hints: [
      'Sublevel set: Sα = {x : f(x) ≤ α}',
      'Take two points in Sα and show their convex combination is also in Sα',
      'For counterexample, find a non-convex f with convex sublevel sets'
    ],
    solution: `**Part 1: Sublevel sets of convex f are convex**

**Proof:**
Let f be convex and Sα = {x : f(x) ≤ α}.
Take x, y ∈ Sα and λ ∈ [0,1].

Since x, y ∈ Sα: f(x) ≤ α and f(y) ≤ α

By convexity of f:
f(λx + (1-λ)y) ≤ λf(x) + (1-λ)f(y)
              ≤ λα + (1-λ)α = α

Therefore λx + (1-λ)y ∈ Sα. ∎

**Part 2: Counterexample (converse is false)**

**Function:** f(x) = x³ on ℝ

**Check sublevel sets:**
S₀ = {x : x³ ≤ 0} = {x : x ≤ 0} = (-∞, 0] (convex!)
Sα = {x : x³ ≤ α} = (-∞, α^(1/3)] for α > 0 (convex!)

All sublevel sets are intervals = convex!

**Check convexity of f:**
f''(x) = 6x
f''(x) < 0 for x < 0 (concave there)

f is NOT convex, even though all sublevel sets are convex.

**Definition:** A function with convex sublevel sets is called **quasiconvex**.
Every convex function is quasiconvex, but not vice versa.`
  },
  {
    id: 'math404-t4-ex12',
    subjectId: 'math404',
    topicId: 'math404-topic-4',
    type: 'written',
    title: 'Epigraph and Convexity',
    description: 'Prove that a function is convex if and only if its epigraph is a convex set.',
    difficulty: 4,
    hints: [
      'Epigraph: epi(f) = {(x,t) : f(x) ≤ t}',
      'For "if": take (x,t), (y,s) in epi(f) and show convex combination is too',
      'For "only if": use definition of convex function'
    ],
    solution: `**Theorem:** f: ℝⁿ → ℝ is convex ⟺ epi(f) = {(x,t) : f(x) ≤ t} is convex.

**Proof (⟹):** Assume f is convex.
Take (x,t), (y,s) ∈ epi(f) and λ ∈ [0,1].
We need: (λx + (1-λ)y, λt + (1-λ)s) ∈ epi(f)

Check: f(λx + (1-λ)y) ≤ λf(x) + (1-λ)f(y)  (convexity of f)
                     ≤ λt + (1-λ)s          (since f(x) ≤ t, f(y) ≤ s)

Therefore (λx + (1-λ)y, λt + (1-λ)s) ∈ epi(f). ∎

**Proof (⟸):** Assume epi(f) is convex.
Take x, y ∈ dom(f) and λ ∈ [0,1].

Let t = f(x) and s = f(y). Then (x, t), (y, s) ∈ epi(f).

By convexity of epi(f):
(λx + (1-λ)y, λt + (1-λ)s) ∈ epi(f)

This means: f(λx + (1-λ)y) ≤ λt + (1-λ)s = λf(x) + (1-λ)f(y)

Therefore f is convex. ∎

**Applications:**
- This characterization allows extending convexity to non-differentiable functions
- Useful for showing operations preserve convexity
- epi(f + g) = intersection of translates of epi(f) and epi(g)`
  },
  {
    id: 'math404-t4-ex13',
    subjectId: 'math404',
    topicId: 'math404-topic-4',
    type: 'written',
    title: 'Separation Hyperplane',
    description: 'Apply the separating hyperplane theorem to separate a point from a convex set.',
    difficulty: 4,
    hints: [
      'If x₀ ∉ C (convex), there exists hyperplane separating them',
      'Find the closest point in C to x₀',
      'The hyperplane is perpendicular to the line joining them'
    ],
    solution: `**Separating Hyperplane Theorem:**
If C is closed convex and x₀ ∉ C, then ∃ a ≠ 0 and b such that:
aᵀx ≤ b for all x ∈ C, and aᵀx₀ > b

**Example:** C = {x ∈ ℝ² : ||x|| ≤ 1} (unit ball), x₀ = (2, 0)

**Step 1: Find closest point**
Project x₀ onto C: x_closest = x₀/||x₀|| = (1, 0)

**Step 2: Find separating hyperplane**
Normal direction: a = x₀ - x_closest = (1, 0)
Midpoint: (x₀ + x_closest)/2 = (1.5, 0)
Hyperplane: aᵀx = aᵀ(midpoint) = 1.5

**Separating hyperplane:** x₁ = 1.5

**Verification:**
- For x ∈ C: ||x|| ≤ 1 → x₁ ≤ 1 < 1.5 ✓
- For x₀ = (2,0): x₁ = 2 > 1.5 ✓

**Strict separation:**
For any b ∈ (1, 1.5): aᵀx < b for all x ∈ C, and aᵀx₀ > b

**General formula:**
a = x₀ - P_C(x₀)  (projection direction)
b = aᵀ(x₀ + P_C(x₀))/2  (midpoint)

where P_C(x₀) = argmin_{x∈C} ||x - x₀||.`
  },
  {
    id: 'math404-t4-ex14',
    subjectId: 'math404',
    topicId: 'math404-topic-4',
    type: 'written',
    title: 'Perspective Function Convexity',
    description: 'Show that the perspective of a convex function preserves convexity.',
    difficulty: 4,
    hints: [
      'Perspective of f: g(x,t) = tf(x/t) for t > 0',
      'The perspective operation preserves convexity',
      'Check using definition or epi(g)'
    ],
    solution: `**Definition:** The perspective of f: ℝⁿ → ℝ is:
g(x,t) = tf(x/t) for t > 0

**Theorem:** If f is convex, then g is convex.

**Proof:**
Let (x₁, t₁), (x₂, t₂) with t₁, t₂ > 0 and λ ∈ [0,1].
Let μ = λt₁/(λt₁ + (1-λ)t₂).

**Key calculation:**
λx₁/t₁ + (1-λ)x₂/t₂ can be written as:
= [λt₁ · (x₁/t₁) + (1-λ)t₂ · (x₂/t₂)] / [λt₁ + (1-λ)t₂]
= μ(x₁/t₁) + (1-μ)(x₂/t₂)

**Check convexity of g:**
g(λ(x₁,t₁) + (1-λ)(x₂,t₂))
= g(λx₁ + (1-λ)x₂, λt₁ + (1-λ)t₂)
= (λt₁ + (1-λ)t₂) · f((λx₁ + (1-λ)x₂)/(λt₁ + (1-λ)t₂))
= (λt₁ + (1-λ)t₂) · f(μ(x₁/t₁) + (1-μ)(x₂/t₂))
≤ (λt₁ + (1-λ)t₂) · [μf(x₁/t₁) + (1-μ)f(x₂/t₂)]  (convexity of f)
= λt₁f(x₁/t₁) + (1-λ)t₂f(x₂/t₂)
= λg(x₁,t₁) + (1-λ)g(x₂,t₂) ✓

**Example:**
f(x) = x² → g(x,t) = tx²/t² = x²/t (convex for t > 0)

**Application:** The relative entropy D(p||q) = Σpᵢlog(pᵢ/qᵢ) is a perspective of -log, hence convex.`
  },
  {
    id: 'math404-t4-ex15',
    subjectId: 'math404',
    topicId: 'math404-topic-4',
    type: 'written',
    title: 'Jensen\'s Inequality',
    description: 'State and prove Jensen\'s inequality, then apply it to prove the AM-GM inequality.',
    difficulty: 4,
    hints: [
      'Jensen: f(E[X]) ≤ E[f(X)] for convex f',
      'For AM-GM, use f(x) = -log(x) or f(x) = eˣ',
      'Consider uniform distribution on the values'
    ],
    solution: `**Jensen's Inequality:**
If f is convex and X is a random variable with E[X] ∈ dom(f), then:
f(E[X]) ≤ E[f(X)]

**Proof (finite case):**
Let X take values x₁,...,xₙ with probabilities p₁,...,pₙ.
E[X] = Σpᵢxᵢ

By induction on convexity definition:
f(Σpᵢxᵢ) ≤ Σpᵢf(xᵢ) = E[f(X)] ✓

**AM-GM Inequality:**
For a₁,...,aₙ > 0: (a₁ + ... + aₙ)/n ≥ (a₁ · ... · aₙ)^(1/n)

**Proof using Jensen:**
Let f(x) = -log(x), which is convex (f''(x) = 1/x² > 0).
Let X take values a₁,...,aₙ each with probability 1/n.

Jensen gives: f(E[X]) ≤ E[f(X)]
-log((Σaᵢ)/n) ≤ (1/n)Σ(-log(aᵢ))
-log((Σaᵢ)/n) ≤ -log((Πaᵢ)^(1/n))
log((Σaᵢ)/n) ≥ log((Πaᵢ)^(1/n))

Taking exponentials:
**(Σaᵢ)/n ≥ (Πaᵢ)^(1/n)** ∎

**Other applications:**
- Variance: E[X²] ≥ (E[X])² (use f(x) = x²)
- Log-sum-exp: log(Σeˣⁱ) ≥ (1/n)Σxᵢ`
  },
  {
    id: 'math404-t4-ex16',
    subjectId: 'math404',
    topicId: 'math404-topic-4',
    type: 'written',
    title: 'Log-Concavity and Log-Convexity',
    description: 'Prove that the Gaussian density is log-concave and discuss implications.',
    difficulty: 5,
    hints: [
      'A function is log-concave if log(f) is concave',
      'The Gaussian pdf is proportional to exp(-x²/2)',
      'Log-concave functions have nice optimization properties'
    ],
    solution: `**Definition:**
- f is **log-concave** if log(f) is concave
- f is **log-convex** if log(f) is convex

**Gaussian Density:**
f(x) = (1/√(2π)) exp(-x²/2)

**Claim:** f is log-concave.

**Proof:**
log(f(x)) = -log(√(2π)) - x²/2

d²(log f)/dx² = -1 < 0

Since second derivative is negative, log(f) is concave.
Therefore f is log-concave. ∎

**Properties of log-concave functions:**

1. **Product rule:** If f, g log-concave, then fg is log-concave.
   Proof: log(fg) = log(f) + log(g) (sum of concave = concave)

2. **Convolution:** If f, g log-concave, then f * g is log-concave.
   (Prékopa-Leindler theorem)

3. **Marginals:** Marginal of log-concave density is log-concave.

4. **Optimization:** Maximizing log-concave function is a concave maximization (convex problem).

**Examples of log-concave:**
- Gaussian: exp(-||x-μ||²/(2σ²))
- Exponential: exp(-λx) for x ≥ 0
- Uniform: 1 on [a,b]
- Laplace: exp(-|x|)

**Example of log-convex:**
- Gamma function: Γ(x) for x > 0`
  }
];

export default exercises;
