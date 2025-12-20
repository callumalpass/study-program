import type { WrittenExercise } from '../../../../core/types';

export const exercises: WrittenExercise[] = [
  {
    id: 'math404-t1-ex1',
    subjectId: 'math404',
    topicId: 'topic-1',
    type: 'written',
    title: 'Problem Formulation Basics',
    description: 'Formulate an optimization problem from a word description, identifying decision variables, objective function, and constraints.',
    difficulty: 2,
    hints: [
      'Decision variables are the quantities you can control',
      'The objective is what you want to maximize or minimize',
      'Constraints are limitations on the decision variables',
      'Include non-negativity constraints when appropriate'
    ],
    solution: `To formulate an optimization problem:

1. **Decision Variables**: Identify quantities you can choose
   Let x₁ = units of product A, x₂ = units of product B

2. **Objective Function**: Write what to optimize
   max f(x) = 5x₁ + 3x₂ (profit)

3. **Constraints**: List all restrictions
   2x₁ + x₂ ≤ 100 (labor hours)
   x₁ + 2x₂ ≤ 80 (material)

4. **Non-negativity**: x₁, x₂ ≥ 0

Complete formulation:
max 5x₁ + 3x₂
s.t. 2x₁ + x₂ ≤ 100
     x₁ + 2x₂ ≤ 80
     x₁, x₂ ≥ 0`
  },
  {
    id: 'math404-t1-ex2',
    subjectId: 'math404',
    topicId: 'topic-1',
    type: 'written',
    title: 'Convexity Verification',
    description: 'Determine whether the function f(x) = x₁² + x₂² - x₁x₂ is convex by analyzing its Hessian matrix.',
    difficulty: 3,
    hints: [
      'Compute the Hessian matrix of second partial derivatives',
      'A symmetric matrix is PSD if all eigenvalues are non-negative',
      'For 2×2 matrices, check det(H) ≥ 0 and trace(H) ≥ 0'
    ],
    solution: `f(x) = x₁² + x₂² - x₁x₂

**Step 1: Compute the Hessian**
∂f/∂x₁ = 2x₁ - x₂
∂f/∂x₂ = 2x₂ - x₁
∂²f/∂x₁² = 2
∂²f/∂x₂² = 2
∂²f/∂x₁∂x₂ = -1

H = [[2, -1], [-1, 2]]

**Step 2: Check eigenvalues**
det(H - λI) = (2-λ)² - 1 = 0
λ² - 4λ + 3 = 0
λ = (4 ± 2)/2 → λ₁ = 1, λ₂ = 3

**Conclusion**: Both eigenvalues are positive, so H is positive definite.
Therefore f is strictly convex.`
  },
  {
    id: 'math404-t1-ex3',
    subjectId: 'math404',
    topicId: 'topic-1',
    type: 'written',
    title: 'First-Order Optimality Conditions',
    description: 'Find and classify the stationary points of f(x,y) = x³ - 3xy + y³.',
    difficulty: 4,
    hints: [
      'Set ∇f = 0 and solve the system of equations',
      'Use substitution to solve the nonlinear system',
      'Classify using the second derivative test (Hessian)'
    ],
    solution: `**Finding stationary points:**
∂f/∂x = 3x² - 3y = 0 → y = x²
∂f/∂y = -3x + 3y² = 0 → x = y²

Substituting y = x² into x = y²:
x = (x²)² = x⁴
x⁴ - x = 0
x(x³ - 1) = 0

So x = 0 or x = 1
Points: (0,0) and (1,1)

**Classification using Hessian:**
H = [[6x, -3], [-3, 6y]]

At (0,0): H = [[0, -3], [-3, 0]]
det(H) = -9 < 0 → **Saddle point**

At (1,1): H = [[6, -3], [-3, 6]]
det(H) = 36 - 9 = 27 > 0
trace(H) = 12 > 0 → **Local minimum**

f(1,1) = 1 - 3 + 1 = -1`
  },
  {
    id: 'math404-t1-ex04',
    subjectId: 'math404',
    topicId: 'topic-1',
    type: 'written',
    title: 'Feasible Region Analysis',
    description: 'Determine the feasible region for a system of constraints and verify if given points are feasible.',
    difficulty: 2,
    hints: [
      'Check each constraint individually',
      'A point is feasible only if it satisfies ALL constraints',
      'Sketch the region if working in 2D'
    ],
    solution: `**Constraints:**
x₁ + 2x₂ ≤ 10
3x₁ + x₂ ≤ 12
x₁, x₂ ≥ 0

**Test point (2, 3):**
- x₁ + 2x₂ = 2 + 6 = 8 ≤ 10 ✓
- 3x₁ + x₂ = 6 + 3 = 9 ≤ 12 ✓
- x₁ = 2 ≥ 0, x₂ = 3 ≥ 0 ✓
**Result:** Feasible

**Test point (5, 4):**
- x₁ + 2x₂ = 5 + 8 = 13 ≤ 10 ✗
**Result:** Infeasible

**Vertices of feasible region:**
- (0, 0)
- (4, 0)
- (0, 5)
- (2, 4): intersection of x₁ + 2x₂ = 10 and 3x₁ + x₂ = 12

The feasible region is a bounded polyhedron (quadrilateral).`
  },
  {
    id: 'math404-t1-ex05',
    subjectId: 'math404',
    topicId: 'topic-1',
    type: 'written',
    title: 'Constraint Qualification - LICQ',
    description: 'Verify whether LICQ (Linear Independence Constraint Qualification) holds at a given point.',
    difficulty: 3,
    hints: [
      'LICQ requires active constraint gradients to be linearly independent',
      'Find which constraints are active (equality holds)',
      'Compute gradient vectors and check rank'
    ],
    solution: `**Problem:** min f(x) s.t.
g₁(x) = x₁² + x₂² - 1 ≤ 0
g₂(x) = x₁ + x₂ - 1 ≤ 0
h(x) = x₁ - x₂ = 0

**At point x* = (1/√2, 1/√2):**

**Active constraints:**
- g₁(x*) = 1/2 + 1/2 - 1 = 0 (active)
- g₂(x*) = 1/√2 + 1/√2 - 1 = √2 - 1 ≈ 0.414 > 0 (inactive)
- h(x*) = 0 (always active)

**Gradients:**
∇g₁ = [2x₁, 2x₂] = [√2, √2]
∇h = [1, -1]

**Check linear independence:**
Form matrix: [[√2, √2], [1, -1]]
det = -√2 - √2 = -2√2 ≠ 0

**Conclusion:** LICQ holds at x* since the gradients are linearly independent.`
  },
  {
    id: 'math404-t1-ex06',
    subjectId: 'math404',
    topicId: 'topic-1',
    type: 'written',
    title: 'Local vs Global Minimum',
    description: 'Determine whether a local minimum is also a global minimum for a given function.',
    difficulty: 3,
    hints: [
      'Check if the function is convex',
      'For convex functions: local minimum = global minimum',
      'For non-convex: need to check all critical points'
    ],
    solution: `**Example 1:** f(x) = x² on ℝ
- f''(x) = 2 > 0 → convex
- Critical point: f'(x) = 2x = 0 → x* = 0
- f(0) = 0 is both local and global minimum ✓

**Example 2:** f(x) = x³ - 3x on [-2, 2]
- f'(x) = 3x² - 3 = 0 → x = ±1
- f(-1) = -1 + 3 = 2 (local max)
- f(1) = 1 - 3 = -2 (local min)
- Boundary: f(-2) = -8 + 6 = -2, f(2) = 8 - 6 = 2
- Global minimum: min{f(-2), f(1), f(2)} = -2 at x = ±1, -2

**Example 3:** f(x,y) = x² - y² (saddle function)
- Not convex (indefinite Hessian)
- (0,0) is stationary but NOT a local minimum
- No global minimum (unbounded below)

**Key insight:** Convexity guarantees local = global.`
  },
  {
    id: 'math404-t1-ex07',
    subjectId: 'math404',
    topicId: 'topic-1',
    type: 'written',
    title: 'Portfolio Optimization Formulation',
    description: 'Formulate a portfolio optimization problem with risk and return constraints.',
    difficulty: 3,
    hints: [
      'Decision variables: portfolio weights wᵢ',
      'Objective: minimize risk (variance) or maximize return',
      'Constraints: weights sum to 1, possibly bounds on weights'
    ],
    solution: `**Problem Statement:**
Investor has n assets with expected returns μᵢ and covariance matrix Σ.
Goal: Find portfolio weights to maximize return for given risk level.

**Decision Variables:**
w = [w₁, w₂, ..., wₙ]ᵀ (fraction invested in each asset)

**Objective:**
Maximize expected return: max wᵀμ
OR minimize risk: min wᵀΣw

**Constraints:**
1. Σwᵢ = 1 (weights sum to 100%)
2. w ≥ 0 (no short selling)
3. wᵀΣw ≤ σ² (risk limit)
4. wᵀμ ≥ r_target (minimum return)

**Markowitz Mean-Variance:**
min (1/2)wᵀΣw - λwᵀμ
s.t. Σwᵢ = 1, w ≥ 0

where λ controls risk-return tradeoff.

**Example with 2 assets:**
w₁ + w₂ = 1
min σ₁²w₁² + σ₂²w₂² + 2ρσ₁σ₂w₁w₂

This is a convex QP.`
  },
  {
    id: 'math404-t1-ex08',
    subjectId: 'math404',
    topicId: 'topic-1',
    type: 'written',
    title: 'Strict vs Non-Strict Convexity',
    description: 'Distinguish between strictly convex and convex functions, and identify implications for optimization.',
    difficulty: 3,
    hints: [
      'Strict convexity: strict inequality in definition',
      'Strictly convex functions have unique minimizers',
      'Check second derivative test'
    ],
    solution: `**Definitions:**

**Convex:** f(λx + (1-λ)y) ≤ λf(x) + (1-λ)f(y)
**Strictly convex:** f(λx + (1-λ)y) < λf(x) + (1-λ)f(y) for x ≠ y, λ ∈ (0,1)

**Second-order characterization:**
- Convex: ∇²f(x) ⪰ 0 (PSD)
- Strictly convex: ∇²f(x) ≻ 0 (PD)

**Examples:**

1. **f(x) = x²** (strictly convex)
   - f''(x) = 2 > 0
   - Unique minimizer at x = 0

2. **f(x) = |x|** (convex but not strictly)
   - Convex but not differentiable at 0
   - Unique minimizer at x = 0

3. **f(x,y) = x²** (convex but not strictly)
   - ∇²f = [[2, 0], [0, 0]] (PSD not PD)
   - Minimizers: entire y-axis (not unique)

**Implications:**
- Strictly convex → unique global minimum
- Convex → possibly multiple minimizers (but all optimal)
- Non-convex → multiple local minima possible`
  },
  {
    id: 'math404-t1-ex09',
    subjectId: 'math404',
    topicId: 'topic-1',
    type: 'written',
    title: 'Production Planning Formulation',
    description: 'Formulate an optimization problem for production planning with capacity and demand constraints.',
    difficulty: 2,
    hints: [
      'Variables: production quantities for each product',
      'Objective: maximize profit or minimize cost',
      'Constraints: resource limits, demand requirements'
    ],
    solution: `**Scenario:**
Factory produces 3 products using 2 machines.
- Product A: profit $5, needs 2h machine 1, 1h machine 2
- Product B: profit $3, needs 1h machine 1, 2h machine 2
- Product C: profit $4, needs 1h machine 1, 1h machine 2
- Machine 1: 100 hours available
- Machine 2: 80 hours available
- Demand: at least 10 units of product A

**Decision Variables:**
x₁ = units of product A
x₂ = units of product B
x₃ = units of product C

**Objective:**
max 5x₁ + 3x₂ + 4x₃

**Constraints:**
2x₁ + x₂ + x₃ ≤ 100  (machine 1 capacity)
x₁ + 2x₂ + x₃ ≤ 80   (machine 2 capacity)
x₁ ≥ 10              (minimum demand)
x₁, x₂, x₃ ≥ 0       (non-negativity)

This is a **linear program** that can be solved by simplex or interior point methods.`
  },
  {
    id: 'math404-t1-ex10',
    subjectId: 'math404',
    topicId: 'topic-1',
    type: 'written',
    title: 'Level Sets and Contours',
    description: 'Analyze the level sets of a function and their relationship to optimization.',
    difficulty: 3,
    hints: [
      'Level set: {x : f(x) = c}',
      'Gradient is perpendicular to level sets',
      'At optimum, gradient equals zero (flat level set)'
    ],
    solution: `**Function:** f(x,y) = x² + 4y²

**Level sets:** {(x,y) : x² + 4y² = c}
These are ellipses with semi-axes √c and √c/2.

**Analysis:**
- c = 1: ellipse x²/1 + y²/(1/4) = 1
- c = 4: ellipse x²/4 + y²/1 = 1
- c → ∞: increasingly large ellipses
- c = 0: single point (0,0) - the minimum

**Gradient:** ∇f = [2x, 8y]
At (2, 1): ∇f = [4, 8], perpendicular to level curve

**Optimization geometry:**
For min f(x,y) s.t. g(x,y) = 0:
- Optimal when ∇f parallel to ∇g
- This is Lagrange multiplier condition: ∇f = λ∇g

**Example:** min x² + 4y² s.t. x + y = 1
∇f = [2x, 8y], ∇g = [1, 1]
[2x, 8y] = λ[1, 1]
→ 2x = λ, 8y = λ
→ 2x = 8y → x = 4y
Substituting: 4y + y = 1 → y = 1/5, x = 4/5
Optimal: (4/5, 1/5), f* = 16/25 + 4/25 = 4/5`
  },
  {
    id: 'math404-t1-ex11',
    subjectId: 'math404',
    topicId: 'topic-1',
    type: 'written',
    title: 'Second-Order Sufficient Conditions',
    description: 'Apply second-order sufficient conditions to verify local optimality.',
    difficulty: 4,
    hints: [
      'First-order: ∇f(x*) = 0 (necessary)',
      'Second-order: ∇²f(x*) ≻ 0 for minimum (sufficient)',
      'Check eigenvalues or leading principal minors'
    ],
    solution: `**Problem:** f(x,y) = x³ + y³ - 3xy

**First-order (necessary):**
∂f/∂x = 3x² - 3y = 0 → y = x²
∂f/∂y = 3y² - 3x = 0 → x = y²

Solving: x = (x²)² = x⁴ → x(x³ - 1) = 0
Points: (0,0) and (1,1)

**Second-order (sufficient):**
∇²f = [[6x, -3], [-3, 6y]]

**At (0,0):**
H = [[0, -3], [-3, 0]]
Eigenvalues: λ² - 0 + 9 = 0 → λ = ±3
One negative → **saddle point** (not minimum)

**At (1,1):**
H = [[6, -3], [-3, 6]]
- Leading minors: M₁ = 6 > 0, M₂ = 36 - 9 = 27 > 0
- Both positive → H ≻ 0
**Conclusion:** (1,1) is a strict local minimum by second-order sufficient conditions

**Verification:** f(1,1) = 1 + 1 - 3 = -1
Nearby: f(1.1, 1.1) = 1.331 + 1.331 - 3.63 = -0.968 > -1 ✓`
  },
  {
    id: 'math404-t1-ex12',
    subjectId: 'math404',
    topicId: 'topic-1',
    type: 'written',
    title: 'Multi-Objective Optimization Setup',
    description: 'Formulate a multi-objective optimization problem and discuss solution approaches.',
    difficulty: 4,
    hints: [
      'Multiple objectives may conflict',
      'Pareto optimality: no objective can improve without worsening another',
      'Scalarization: combine objectives with weights'
    ],
    solution: `**Problem:** Design optimization
- Minimize cost: f₁(x)
- Maximize performance: f₂(x)
- Minimize weight: f₃(x)

**Approaches:**

**1. Weighted Sum (Scalarization):**
min w₁f₁(x) - w₂f₂(x) + w₃f₃(x)
where w₁ + w₂ + w₃ = 1, wᵢ ≥ 0

**2. ε-Constraint Method:**
min f₁(x)
s.t. f₂(x) ≥ ε₂
     f₃(x) ≤ ε₃

**3. Pareto Front:**
Solution x* is Pareto optimal if no x exists such that:
- fᵢ(x) ≤ fᵢ(x*) for all i
- fⱼ(x) < fⱼ(x*) for some j

**Example:**
f₁(x) = x², f₂(x) = (x-2)² on [0,2]
- Minimize f₁: x = 0 (but f₂ = 4)
- Minimize f₂: x = 2 (but f₁ = 4)
- Pareto front: all x ∈ [0,2]
- Compromise: x = 1 (f₁ = f₂ = 1)

**With weights:** min w₁x² + w₂(x-2)²
Optimal: x* = 2w₂/(w₁ + w₂)`
  },
  {
    id: 'math404-t1-ex13',
    subjectId: 'math404',
    topicId: 'topic-1',
    type: 'written',
    title: 'Boundedness and Existence of Solutions',
    description: 'Determine when an optimization problem has a solution using the extreme value theorem.',
    difficulty: 3,
    hints: [
      'Extreme value theorem: continuous f on compact set has min/max',
      'Compact = closed and bounded',
      'Check domain and objective function properties'
    ],
    solution: `**Extreme Value Theorem:**
If f is continuous and domain S is compact (closed + bounded), then f attains its minimum and maximum on S.

**Example 1:** min x² on [0,1]
- f(x) = x² is continuous
- [0,1] is compact
- **Solution exists:** x* = 0, f* = 0 ✓

**Example 2:** min x² on (0,1)
- f(x) = x² is continuous
- (0,1) is NOT closed
- **No minimum attained** (infimum is 0, not achieved) ✗

**Example 3:** min 1/x on [1,∞)
- f unbounded domain
- **No minimum** (approaches 0 as x→∞, never achieved) ✗

**Example 4:** min (x-1)² + (y-2)² s.t. x² + y² ≤ 4
- f continuous
- Feasible set is closed ball (compact)
- **Solution exists** ✓

**Checking compactness:**
- Closed: includes boundary (≤ not <)
- Bounded: fits in a ball
- ℝⁿ is NOT compact
- Closed ball is compact
- Open ball is NOT compact

**For unbounded domains:**
Add coercivity: f(x) → ∞ as ||x|| → ∞
Then sublevel sets {x : f(x) ≤ c} are compact.`
  },
  {
    id: 'math404-t1-ex14',
    subjectId: 'math404',
    topicId: 'topic-1',
    type: 'written',
    title: 'Diet Problem Formulation',
    description: 'Formulate the classic diet problem as a linear optimization model.',
    difficulty: 2,
    hints: [
      'Variables: amount of each food',
      'Objective: minimize cost',
      'Constraints: meet nutritional requirements'
    ],
    solution: `**Problem:**
Select foods to meet daily nutritional needs at minimum cost.

**Data:**
- n foods: costs cᵢ per unit
- m nutrients: minimum requirements bⱼ
- aᵢⱼ = amount of nutrient j in food i

**Decision Variables:**
xᵢ = units of food i to consume

**Objective:**
min Σᵢ cᵢxᵢ (total cost)

**Constraints:**
Σᵢ aᵢⱼxᵢ ≥ bⱼ  for all nutrients j
xᵢ ≥ 0

**Concrete Example:**
Foods: Bread ($2/loaf), Milk ($3/gallon)
Nutrients: Calories (≥2000), Protein (≥50g), Calcium (≥1000mg)

| Food  | Cal | Prot | Calc | Cost |
|-------|-----|------|------|------|
| Bread | 1200| 30g  | 200mg| $2   |
| Milk  | 800 | 40g  | 1200mg|$3   |

**Formulation:**
min 2x₁ + 3x₂
s.t. 1200x₁ + 800x₂ ≥ 2000  (calories)
     30x₁ + 40x₂ ≥ 50      (protein)
     200x₁ + 1200x₂ ≥ 1000  (calcium)
     x₁, x₂ ≥ 0

This is a linear program.`
  },
  {
    id: 'math404-t1-ex15',
    subjectId: 'math404',
    topicId: 'topic-1',
    type: 'written',
    title: 'Equality vs Inequality Constraints',
    description: 'Compare optimization problems with equality versus inequality constraints and their geometric interpretation.',
    difficulty: 3,
    hints: [
      'Equality constrains to a manifold (lower dimension)',
      'Inequality defines a region',
      'Active inequalities behave like equalities at optimum'
    ],
    solution: `**Equality Constraints:** h(x) = 0
- Reduces dimensionality
- No "slack" - must hold exactly
- Always active

**Inequality Constraints:** g(x) ≤ 0
- Defines feasible region
- May be active (g(x*) = 0) or inactive (g(x*) < 0)
- Active at boundary, inactive in interior

**Example 1: Equality**
min x² + y² s.t. x + y = 1
- Constraint is a line in ℝ²
- Feasible set is 1-dimensional
- Solution: minimize distance to origin from line
- Optimal: (1/2, 1/2)

**Example 2: Inequality**
min x² + y² s.t. x + y ≤ 1
- Constraint is a half-plane
- Feasible set is 2-dimensional
- Unconstrained minimum (0,0) is feasible
- Optimal: (0, 0) (constraint inactive)

**Example 3: Inequality becomes active**
min x² + y² s.t. x + y ≥ 1
- Unconstrained minimum (0,0) is infeasible
- Optimal on boundary: (1/2, 1/2)
- Constraint is active, behaves like equality

**Key insight:**
At optimum, active inequalities + equalities determine the solution.
Inactive inequalities have no effect (could remove them).

**Lagrange multipliers:**
- Equality: λ unrestricted
- Inequality: λ ≥ 0
- Complementary slackness: λg(x) = 0`
  },
  {
    id: 'math404-t1-ex16',
    subjectId: 'math404',
    topicId: 'topic-1',
    type: 'written',
    title: 'Jensen\'s Inequality Application',
    description: 'Apply Jensen\'s inequality to prove bounds and verify convexity properties.',
    difficulty: 4,
    hints: [
      'Jensen: f(E[X]) ≤ E[f(X)] for convex f',
      'Strict inequality if f strictly convex and X non-constant',
      'Can prove AM-GM inequality as special case'
    ],
    solution: `**Jensen's Inequality:**
For convex f and random variable X:
f(E[X]) ≤ E[f(X)]

Equality iff f is linear or X is constant.

**Application 1: Arithmetic-Geometric Mean**
Let f(x) = -log(x) (convex for x > 0)
For x₁,...,xₙ > 0 with equal weights:

f((x₁+...+xₙ)/n) ≤ (f(x₁)+...+f(xₙ))/n
-log((x₁+...+xₙ)/n) ≤ -(log x₁+...+log xₙ)/n
log((x₁+...+xₙ)/n) ≥ log((x₁···xₙ)^(1/n))

Therefore: **(x₁+...+xₙ)/n ≥ (x₁···xₙ)^(1/n)** (AM-GM)

**Application 2: Variance bound**
Let f(x) = x² (convex)
E[X²] ≥ (E[X])²
Therefore: **Var(X) = E[X²] - (E[X])² ≥ 0**

**Application 3: Log-sum-exp**
f(x) = eˣ is convex
For x₁,...,xₙ:
e^((x₁+...+xₙ)/n) ≤ (e^x₁+...+e^xₙ)/n

**Application 4: Optimization**
min f(x) s.t. x ∈ C (convex)
Any convex combination of feasible points is feasible.
If x*, y* both optimal, then (x*+y*)/2 is also optimal (for strictly convex, this gives uniqueness).

**Reverse Jensen:** For concave f:
f(E[X]) ≥ E[f(X)]

Example: log is concave
log(E[X]) ≥ E[log(X)]`
  }
];

export default exercises;
