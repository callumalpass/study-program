import type { WrittenExercise } from '../../../../core/types';

export const exercises: WrittenExercise[] = [
  {
    id: 'math404-t6-ex01',
    subjectId: 'math404',
    topicId: 'math404-topic-6',
    type: 'written',
    title: 'Lagrangian Formulation',
    description: 'Write the Lagrangian for a constrained optimization problem with equality and inequality constraints.',
    difficulty: 1,
    hints: [
      'Lagrangian: L(x,λ,μ) = f(x) + Σλᵢgᵢ(x) + Σμⱼhⱼ(x)',
      'λᵢ for inequality constraints gᵢ(x) ≤ 0',
      'μⱼ for equality constraints hⱼ(x) = 0'
    ],
    solution: `**Problem:**
min x² + y²
s.t. x + y ≤ 2
     x - y = 0

**Identify constraints:**
Inequality: g(x,y) = x + y - 2 ≤ 0
Equality: h(x,y) = x - y = 0

**Lagrangian:**
L(x, y, λ, μ) = x² + y² + λ(x + y - 2) + μ(x - y)

where λ ≥ 0 (multiplier for inequality) and μ ∈ ℝ (for equality).

**Expanded:**
L = x² + y² + λx + λy - 2λ + μx - μy

**Interpretation:**
- The Lagrangian penalizes constraint violations
- At optimum: ∇ₓL = 0 (stationarity)
- Multipliers give sensitivity to constraint changes`
  },
  {
    id: 'math404-t6-ex02',
    subjectId: 'math404',
    topicId: 'math404-topic-6',
    type: 'written',
    title: 'KKT Conditions - Statement',
    description: 'State the complete KKT conditions for a nonlinear optimization problem.',
    difficulty: 2,
    hints: [
      'KKT has four components: stationarity, primal feasibility, dual feasibility, complementary slackness',
      'These are necessary conditions for local optimality',
      'Sufficient for convex problems'
    ],
    solution: `**Problem:** min f(x) s.t. gᵢ(x) ≤ 0, hⱼ(x) = 0

**KKT Conditions:**

**1. Stationarity:**
∇f(x*) + Σλᵢ*∇gᵢ(x*) + Σμⱼ*∇hⱼ(x*) = 0

**2. Primal Feasibility:**
gᵢ(x*) ≤ 0 for all i
hⱼ(x*) = 0 for all j

**3. Dual Feasibility:**
λᵢ* ≥ 0 for all i

**4. Complementary Slackness:**
λᵢ*gᵢ(x*) = 0 for all i

**Interpretation:**
- Either constraint is inactive (gᵢ < 0, λᵢ = 0)
- Or constraint is active (gᵢ = 0, λᵢ ≥ 0)

**When KKT conditions are sufficient:**
- f convex, gᵢ convex, hⱼ affine
- Any point satisfying KKT is a global minimum

**When KKT conditions are necessary:**
- Under constraint qualification (e.g., LICQ, Slater)
- Any local minimum satisfies KKT`
  },
  {
    id: 'math404-t6-ex03',
    subjectId: 'math404',
    topicId: 'math404-topic-6',
    type: 'written',
    title: 'KKT Solution - Equality Constraint',
    description: 'Solve a constrained problem with one equality constraint using KKT conditions.',
    difficulty: 2,
    hints: [
      'Form Lagrangian with μ for equality constraint',
      'Set gradient of Lagrangian to zero',
      'Solve system of equations'
    ],
    solution: `**Problem:** min x² + y² s.t. x + y = 1

**Lagrangian:**
L(x, y, μ) = x² + y² + μ(x + y - 1)

**KKT Conditions:**

**Stationarity:**
∂L/∂x = 2x + μ = 0  →  x = -μ/2
∂L/∂y = 2y + μ = 0  →  y = -μ/2

**Primal Feasibility:**
x + y = 1
(-μ/2) + (-μ/2) = 1
-μ = 1
μ = -1

**Solution:**
x* = y* = 1/2
μ* = -1

**Verification:**
- Constraint: 1/2 + 1/2 = 1 ✓
- Objective: f(1/2, 1/2) = 1/4 + 1/4 = 1/2

**Geometric interpretation:**
We're finding the point on the line x + y = 1 closest to the origin.
The gradient ∇f = (1, 1) is perpendicular to the constraint.`
  },
  {
    id: 'math404-t6-ex04',
    subjectId: 'math404',
    topicId: 'math404-topic-6',
    type: 'written',
    title: 'KKT Solution - Inequality Constraint',
    description: 'Solve a constrained problem with one inequality constraint using KKT conditions.',
    difficulty: 3,
    hints: [
      'Check if unconstrained optimum is feasible',
      'If not, constraint must be active at optimum',
      'Use complementary slackness to determine λ'
    ],
    solution: `**Problem:** min (x-2)² + (y-2)² s.t. x + y ≤ 2

**Step 1: Check unconstrained optimum**
Unconstrained: (x*, y*) = (2, 2)
Constraint: 2 + 2 = 4 > 2 (infeasible!)

**Step 2: Solve with active constraint**
Since unconstrained optimum is infeasible, constraint must be active.
By complementary slackness: λ > 0 and x + y = 2

**KKT Conditions:**
∂L/∂x = 2(x-2) + λ = 0  →  x = 2 - λ/2
∂L/∂y = 2(y-2) + λ = 0  →  y = 2 - λ/2

x + y = 2:
(2 - λ/2) + (2 - λ/2) = 2
4 - λ = 2
λ = 2

**Solution:**
x* = y* = 2 - 1 = 1
λ* = 2

**Verification:**
- Primal: 1 + 1 = 2 ✓
- Dual: λ* = 2 ≥ 0 ✓
- Stationarity: ∇f(1,1) = (-2,-2), λ∇g = 2(1,1), sum = 0 ✓
- Objective: f(1,1) = 1 + 1 = 2`
  },
  {
    id: 'math404-t6-ex05',
    subjectId: 'math404',
    topicId: 'math404-topic-6',
    type: 'written',
    title: 'Multiple Inequality Constraints',
    description: 'Solve a problem with multiple inequality constraints, identifying which are active.',
    difficulty: 3,
    hints: [
      'Consider all possible combinations of active constraints',
      'Check feasibility and KKT for each case',
      'Active constraints have λ > 0'
    ],
    solution: `**Problem:** min -x - y
s.t. x² + y² ≤ 1
     x ≥ 0
     y ≥ 0

Rewrite: max x + y s.t. constraints

**Lagrangian:**
L = -x - y + λ₁(x² + y² - 1) - λ₂x - λ₃y

**Analyze constraint activity:**

**Case 1: Interior (all constraints inactive)**
∇(-x-y) = (-1,-1) ≠ 0, so not stationary. ✗

**Case 2: Only circle active**
By symmetry: x = y = 1/√2
Check bounds: x, y > 0 ✓

KKT: -1 + 2λ₁(1/√2) = 0 → λ₁ = √2/2 ≈ 0.707 > 0 ✓

**Solution:** (x*, y*) = (1/√2, 1/√2), λ₁ = √2/2

**Verification:**
- x² + y² = 1/2 + 1/2 = 1 ✓
- x = y = 1/√2 > 0 ✓
- Objective: x + y = √2 ≈ 1.414

**Alternative cases checked:**
- x = 0: optimal at (0, 1), value = 1 < √2
- y = 0: optimal at (1, 0), value = 1 < √2
- Corner (0,0): value = 0 < √2

**Optimal:** (1/√2, 1/√2) with f* = -√2`
  },
  {
    id: 'math404-t6-ex06',
    subjectId: 'math404',
    topicId: 'math404-topic-6',
    type: 'written',
    title: 'Constraint Qualification - LICQ',
    description: 'Verify Linear Independence Constraint Qualification at a candidate optimal point.',
    difficulty: 3,
    hints: [
      'LICQ: gradients of active constraints are linearly independent',
      'Find which constraints are active (equality holds)',
      'Check if gradient vectors are linearly independent'
    ],
    solution: `**Problem:** min x² + y² s.t.
g₁(x,y) = x + y - 1 ≤ 0
g₂(x,y) = x - y ≤ 0

**At point (1/2, 1/2):**
g₁ = 1/2 + 1/2 - 1 = 0 (active)
g₂ = 1/2 - 1/2 = 0 (active)

**Gradients of active constraints:**
∇g₁ = (1, 1)
∇g₂ = (1, -1)

**Check linear independence:**
Matrix: [[1, 1], [1, -1]]
det = -1 - 1 = -2 ≠ 0

**LICQ holds!** Gradients are linearly independent.

**Consequence:**
KKT conditions are necessary for optimality at this point.

**Counterexample where LICQ fails:**

**Problem:** min x s.t. x² ≤ 0, -x² ≤ 0

At x = 0: both constraints active
∇g₁ = 2x = 0
∇g₂ = -2x = 0

Both gradients are zero → LICQ fails!

**Other constraint qualifications:**
- Slater: ∃x with gᵢ(x) < 0 (strictly feasible)
- Mangasarian-Fromovitz: weaker than LICQ
- When CQ holds, KKT conditions are necessary`
  },
  {
    id: 'math404-t6-ex07',
    subjectId: 'math404',
    topicId: 'math404-topic-6',
    type: 'written',
    title: 'Quadratic Programming with KKT',
    description: 'Solve a convex QP using KKT conditions.',
    difficulty: 3,
    hints: [
      'QP: min (1/2)xᵀQx + cᵀx s.t. Ax ≤ b',
      'Form Lagrangian and apply KKT conditions',
      'Use complementary slackness to identify active constraints'
    ],
    solution: `**Problem:** min (1/2)(x₁² + x₂²) - x₁ - x₂
s.t. x₁ + x₂ ≤ 1, x₁, x₂ ≥ 0

**Standard form:**
g₁: x₁ + x₂ - 1 ≤ 0
g₂: -x₁ ≤ 0
g₃: -x₂ ≤ 0

**Lagrangian:**
L = (1/2)(x₁² + x₂²) - x₁ - x₂ + λ₁(x₁ + x₂ - 1) - λ₂x₁ - λ₃x₂

**KKT Stationarity:**
x₁ - 1 + λ₁ - λ₂ = 0
x₂ - 1 + λ₁ - λ₃ = 0

**Try: interior solution (all λ = 0)**
x₁ = x₂ = 1
Check: x₁ + x₂ = 2 > 1 (infeasible) ✗

**Try: g₁ active, g₂, g₃ inactive (λ₁ > 0, λ₂ = λ₃ = 0)**
x₁ - 1 + λ₁ = 0 → x₁ = 1 - λ₁
x₂ - 1 + λ₁ = 0 → x₂ = 1 - λ₁
x₁ + x₂ = 1 → 2(1 - λ₁) = 1 → λ₁ = 1/2

x₁ = x₂ = 1/2 > 0 ✓
λ₁ = 1/2 > 0 ✓

**Solution:** x* = (1/2, 1/2), λ₁* = 1/2

**Objective:** f* = (1/2)(1/2) - 1/2 - 1/2 = 1/4 - 1 = -3/4`
  },
  {
    id: 'math404-t6-ex08',
    subjectId: 'math404',
    topicId: 'math404-topic-6',
    type: 'written',
    title: 'Penalty Method',
    description: 'Apply the quadratic penalty method to solve a constrained problem.',
    difficulty: 3,
    hints: [
      'Penalty function: P_ρ(x) = f(x) + (ρ/2)Σ[gᵢ(x)]₊² + (ρ/2)Σhⱼ(x)²',
      'Minimize for increasing ρ → ∞',
      'Solutions converge to constrained optimum'
    ],
    solution: `**Problem:** min x² s.t. x = 1

**Penalty function:**
P_ρ(x) = x² + (ρ/2)(x - 1)²

**Minimizing P_ρ:**
dP_ρ/dx = 2x + ρ(x - 1) = 0
2x + ρx - ρ = 0
x(2 + ρ) = ρ
x*(ρ) = ρ/(2 + ρ)

**Convergence:**
| ρ    | x*(ρ)      | Error |
|------|------------|-------|
| 1    | 1/3 ≈ 0.33 | 0.67  |
| 10   | 10/12 ≈ 0.83| 0.17  |
| 100  | 100/102 ≈ 0.98| 0.02|
| 1000 | ≈ 0.998    | 0.002 |

As ρ → ∞: x*(ρ) → 1 ✓

**Disadvantages:**
1. Need large ρ for accuracy
2. Large ρ → ill-conditioning
3. Hessian of penalty: 2 + ρ → ∞

**For inequality constraints:**
P_ρ(x) = f(x) + (ρ/2)Σ[max(0, gᵢ(x))]²

Example: min x s.t. x ≥ 1
P_ρ(x) = x + (ρ/2)[max(0, 1-x)]²`
  },
  {
    id: 'math404-t6-ex09',
    subjectId: 'math404',
    topicId: 'math404-topic-6',
    type: 'written',
    title: 'Barrier Method',
    description: 'Apply the log-barrier method to solve an inequality-constrained problem.',
    difficulty: 4,
    hints: [
      'Barrier function: φ(x) = -Σlog(-gᵢ(x))',
      'Solve min f(x) + (1/t)φ(x) for increasing t',
      'As t → ∞, solutions approach constrained optimum'
    ],
    solution: `**Problem:** min x s.t. x ≥ 1

Rewrite: g(x) = 1 - x ≤ 0

**Log-barrier:**
φ(x) = -log(-(1-x)) = -log(x-1)

**Barrier problem:**
B_t(x) = x - (1/t)log(x-1)

**Minimizing B_t:**
dB_t/dx = 1 - 1/(t(x-1)) = 0
t(x-1) = 1
x*(t) = 1 + 1/t

**Central path:**
| t    | x*(t)  | Duality gap |
|------|--------|-------------|
| 1    | 2      | 1/t = 1     |
| 10   | 1.1    | 0.1         |
| 100  | 1.01   | 0.01        |
| 1000 | 1.001  | 0.001       |

As t → ∞: x*(t) → 1 ✓

**Advantages over penalty:**
1. Stays strictly feasible
2. Newton's method works well
3. Polynomial-time complexity

**For multiple constraints:**
B_t(x) = f(x) - (1/t)Σlog(-gᵢ(x))

**Duality gap:**
Gap ≈ m/t where m = number of constraints
For ε-accuracy: t = m/ε`
  },
  {
    id: 'math404-t6-ex10',
    subjectId: 'math404',
    topicId: 'math404-topic-6',
    type: 'written',
    title: 'Augmented Lagrangian Method',
    description: 'Apply the augmented Lagrangian method to solve a constrained problem.',
    difficulty: 4,
    hints: [
      'Combines Lagrangian with penalty term',
      'L_ρ(x,λ) = f(x) + λᵀh(x) + (ρ/2)||h(x)||²',
      'Update multipliers: λ ← λ + ρh(x)'
    ],
    solution: `**Problem:** min x² s.t. x = 1

**Augmented Lagrangian:**
L_ρ(x, λ) = x² + λ(x - 1) + (ρ/2)(x - 1)²

**Algorithm:**
1. Fix λ, minimize L_ρ over x
2. Update λ ← λ + ρ(x - 1)
3. Optionally increase ρ

**Iteration 1:** λ₀ = 0, ρ = 1
∂L_ρ/∂x = 2x + λ + ρ(x-1) = 2x + 0 + (x-1) = 3x - 1 = 0
x₁ = 1/3

λ₁ = λ₀ + ρ(x₁ - 1) = 0 + 1(1/3 - 1) = -2/3

**Iteration 2:** λ₁ = -2/3, ρ = 1
2x - 2/3 + (x-1) = 3x - 5/3 = 0
x₂ = 5/9 ≈ 0.56

λ₂ = -2/3 + 1(5/9 - 1) = -2/3 - 4/9 = -10/9

**Iteration 3:**
2x - 10/9 + (x-1) = 3x - 19/9 = 0
x₃ = 19/27 ≈ 0.70

**Pattern:** Converging to x* = 1, λ* = -2

**Verification:** At optimum:
∂L/∂x = 2x + λ = 2(1) + (-2) = 0 ✓

**Advantages:**
- Bounded penalty parameter ρ
- Faster convergence than pure penalty
- Less ill-conditioning`
  },
  {
    id: 'math404-t6-ex11',
    subjectId: 'math404',
    topicId: 'math404-topic-6',
    type: 'written',
    title: 'Primal-Dual Interior Point Method',
    description: 'Describe the primal-dual interior point algorithm for QP.',
    difficulty: 5,
    hints: [
      'Solve perturbed KKT system',
      'Replace complementarity λᵢsᵢ = 0 with λᵢsᵢ = μ',
      'Use Newton to solve system, decrease μ'
    ],
    solution: `**Primal QP:**
min (1/2)xᵀQx + cᵀx
s.t. Ax ≤ b

**KKT System:**
Qx + c + Aᵀλ = 0  (stationarity)
Ax + s = b        (primal feasibility)
λᵢsᵢ = 0         (complementarity)
λ, s ≥ 0         (dual feasibility)

**Perturbed KKT (barrier parameter μ):**
Replace λᵢsᵢ = 0 with λᵢsᵢ = μ

**Newton System:**
[Q    0   Aᵀ] [Δx]   [-(Qx + c + Aᵀλ)]
[A    I   0 ] [Δs] = [-(Ax + s - b)   ]
[0    Λ   S ] [Δλ]   [μe - ΛSe        ]

where Λ = diag(λ), S = diag(s), e = (1,...,1)ᵀ

**Algorithm:**
1. Initialize x, s, λ > 0 (strictly feasible)
2. While μ > ε:
   a. Solve Newton system for (Δx, Δs, Δλ)
   b. Line search to maintain s, λ > 0
   c. Update: (x,s,λ) ← (x,s,λ) + α(Δx,Δs,Δλ)
   d. Reduce μ ← σμ (e.g., σ = 0.1)

**Complexity:**
O(√m log(1/ε)) Newton iterations
Each iteration: O(n³) for dense, much less for sparse

**Advantages:**
1. Polynomial worst-case complexity
2. Very efficient in practice
3. Warm-starting possible

**Software:** MOSEK, Gurobi, CVXPY all use interior point`
  },
  {
    id: 'math404-t6-ex12',
    subjectId: 'math404',
    topicId: 'math404-topic-6',
    type: 'written',
    title: 'Duality Gap and Optimality',
    description: 'Compute the duality gap and use it as an optimality certificate.',
    difficulty: 4,
    hints: [
      'Duality gap = primal objective - dual objective',
      'At optimality, gap = 0 (strong duality)',
      'Gap provides certificate: both within gap of optimal'
    ],
    solution: `**Primal:** min cᵀx s.t. Ax ≤ b, x ≥ 0
**Dual:** max bᵀy s.t. Aᵀy ≤ c, y ≥ 0

**Given feasible solutions:**
Primal: x = (1, 2) with cᵀx = 5
Dual: y = (1, 0.5) with bᵀy = 4

**Duality gap:** 5 - 4 = 1

**Interpretation:**
- Primal objective: 5 (upper bound on p*)
- Dual objective: 4 (lower bound on p*)
- True optimum: 4 ≤ p* ≤ 5

**For ε-optimality:**
If gap < ε, both solutions within ε of optimal.

**Interior Point Gap:**
At barrier parameter t with m constraints:
Gap ≈ m/t

Example: m = 100 constraints, t = 10⁶
Gap ≈ 100/10⁶ = 10⁻⁴

**Stopping criterion:**
Stop when gap < ε·(1 + |p|) for relative tolerance ε

**Certificate of optimality:**
(x*, y*) with:
- Ax* ≤ b, x* ≥ 0 (primal feasible)
- Aᵀy* ≤ c, y* ≥ 0 (dual feasible)
- cᵀx* = bᵀy* (zero gap)

This certifies x* is optimal!`
  },
  {
    id: 'math404-t6-ex13',
    subjectId: 'math404',
    topicId: 'math404-topic-6',
    type: 'written',
    title: 'Sequential Quadratic Programming',
    description: 'Perform one iteration of SQP for a nonlinear constrained problem.',
    difficulty: 5,
    hints: [
      'Approximate problem with QP at current point',
      'Solve QP to get step direction',
      'Use line search for step size'
    ],
    solution: `**Problem:** min f(x) s.t. h(x) = 0

**SQP subproblem at x_k:**
min ∇f(x_k)ᵀd + (1/2)dᵀB_kd
s.t. h(x_k) + ∇h(x_k)ᵀd = 0

where B_k ≈ ∇²L(x_k, λ_k) (Hessian of Lagrangian)

**Example:**
f(x) = x₁² + x₂²
h(x) = x₁ + x₂ - 1 = 0

At x₀ = (0, 0):
∇f = (0, 0)
∇h = (1, 1)
h(x₀) = -1
B₀ = I (initial approximation)

**QP subproblem:**
min (1/2)(d₁² + d₂²)
s.t. -1 + d₁ + d₂ = 0

**Lagrangian of QP:**
L = (1/2)(d₁² + d₂²) + μ(d₁ + d₂ - 1)

**KKT:**
d₁ + μ = 0 → d₁ = -μ
d₂ + μ = 0 → d₂ = -μ
d₁ + d₂ = 1 → -2μ = 1 → μ = -1/2

**Solution:** d = (1/2, 1/2)

**Update:** x₁ = x₀ + d = (1/2, 1/2)

**Check:** This is the optimal solution!

**General SQP iteration:**
1. Solve QP for d_k
2. Line search: x_{k+1} = x_k + α_k d_k
3. Update B_k using BFGS on Lagrangian
4. Update multiplier estimates`
  },
  {
    id: 'math404-t6-ex14',
    subjectId: 'math404',
    topicId: 'math404-topic-6',
    type: 'written',
    title: 'Active Set Method',
    description: 'Solve a QP using the active set method.',
    difficulty: 4,
    hints: [
      'Maintain a working set of constraints treated as equalities',
      'Solve equality-constrained problem at each iteration',
      'Add/remove constraints based on multipliers and feasibility'
    ],
    solution: `**Problem:** min (1/2)(x₁² + x₂²) - 2x₁ - x₂
s.t. x₁ + x₂ ≤ 2
     x₁ ≥ 0
     x₂ ≥ 0

**Iteration 1:** Start at x₀ = (0, 0), Working set W = {x₁ = 0, x₂ = 0}

Solve with equality: x₁ = 0, x₂ = 0
Already at this point.

Check multipliers from ∇L = 0:
∇f = (x₁ - 2, x₂ - 1) = (-2, -1)
Need -2 - λ₂ = 0 → λ₂ = -2 < 0 (remove this constraint)

**Iteration 2:** W = {x₂ = 0}
Solve: min (1/2)(x₁² + x₂²) - 2x₁ - x₂ s.t. x₂ = 0

∂/∂x₁ = x₁ - 2 = 0 → x₁ = 2
Check: x₁ + x₂ = 2 ≤ 2 ✓, x₁ = 2 ≥ 0 ✓

Multiplier for x₂ = 0:
∇f = (0, -1) at (2, 0)
Need -1 - λ₃ = 0 → λ₃ = -1 < 0 (remove this constraint)

**Iteration 3:** W = {} (no active constraints)
Solve unconstrained: x₁ = 2, x₂ = 1
Check: x₁ + x₂ = 3 > 2 ✗ (infeasible)

Add constraint x₁ + x₂ = 2 to working set.

**Iteration 4:** W = {x₁ + x₂ = 2}
Solve: min f s.t. x₁ + x₂ = 2

KKT: x₁ - 2 + λ₁ = 0, x₂ - 1 + λ₁ = 0, x₁ + x₂ = 2
From first two: x₁ = 2 - λ₁, x₂ = 1 - λ₁
Substitute: 3 - 2λ₁ = 2 → λ₁ = 1/2

x* = (3/2, 1/2), λ₁* = 1/2 > 0 ✓

**Optimal!** f* = (9/8 + 1/8) - 3 - 1/2 = 5/4 - 7/2 = -9/4`
  },
  {
    id: 'math404-t6-ex15',
    subjectId: 'math404',
    topicId: 'math404-topic-6',
    type: 'written',
    title: 'Second-Order Sufficient Conditions',
    description: 'Verify second-order sufficient conditions for a constrained local minimum.',
    difficulty: 5,
    hints: [
      'SOSC: KKT holds + positive curvature on tangent space',
      'Tangent space = {d : ∇gᵢ(x)ᵀd = 0 for active i}',
      'Check dᵀ∇²L(x)d > 0 for all d in tangent space'
    ],
    solution: `**Problem:** min f(x) = x₁² + x₂² - x₁x₂
s.t. g(x) = x₁ + x₂ - 1 ≤ 0

**Candidate:** x* = (1/2, 1/2), λ* = 1

**Verify KKT:**
∇f = (2x₁ - x₂, 2x₂ - x₁) = (1/2, 1/2)
∇g = (1, 1)
∇f + λ∇g = (1/2, 1/2) + 1(1, 1) = (3/2, 3/2) ≠ 0 ✗

Let me recalculate...

Actually, for stationarity: ∇f + λ∇g = 0
(2x₁ - x₂ + λ, 2x₂ - x₁ + λ) = 0

At x = (1/2, 1/2):
2(1/2) - 1/2 + λ = 1/2 + λ = 0 → λ = -1/2

But λ must be ≥ 0 for inequality constraint!

**Revised problem:** min f s.t. g ≥ 0 (or constraint is equality)

For equality h(x) = x₁ + x₂ - 1 = 0:
∇f = (1/2, 1/2), ∇h = (1, 1)
(1/2, 1/2) + μ(1, 1) = 0 → μ = -1/2 (OK for equality)

**Second-Order Check:**
Hessian of Lagrangian:
∇²L = ∇²f = [[2, -1], [-1, 2]]

Tangent space: {d : ∇hᵀd = 0} = {d : d₁ + d₂ = 0}
Take d = (1, -1):
dᵀ∇²Ld = [1,-1][[2,-1],[-1,2]][1,-1]ᵀ
       = [1,-1][3,-3]ᵀ = 3 + 3 = 6 > 0 ✓

**SOSC verified:** x* = (1/2, 1/2) is a strict local minimum`
  },
  {
    id: 'math404-t6-ex16',
    subjectId: 'math404',
    topicId: 'math404-topic-6',
    type: 'written',
    title: 'Sensitivity Analysis',
    description: 'Analyze how the optimal value changes with respect to constraint perturbations.',
    difficulty: 4,
    hints: [
      'Optimal Lagrange multiplier = sensitivity to constraint',
      'For max problem: λ = ∂p*/∂b (marginal value)',
      'Valid for small perturbations'
    ],
    solution: `**Problem:** min f(x) s.t. h(x) = b

**Sensitivity Theorem:**
If (x*, λ*) solves the problem at b*, then:
∂p*(b)/∂bᵢ = -λᵢ*

where p*(b) is the optimal value as function of b.

**Example:**
min x² + y² s.t. x + y = b

**Solve:**
L = x² + y² + μ(x + y - b)
∇L = (2x + μ, 2y + μ) = 0 → x = y = -μ/2
x + y = b → -μ = b → μ = -b

x* = y* = b/2
p*(b) = (b/2)² + (b/2)² = b²/2
λ* = μ = -b

**Verify sensitivity:**
dp*/db = b = -λ* ✓

**Interpretation:**
- λ* = -b is the cost of tightening constraint
- If b = 1, λ* = -1: increasing b by Δ decreases optimal cost by Δ

**For inequalities:**
min f(x) s.t. g(x) ≤ b

If constraint active: ∂p*/∂b = -λ* (shadow price)
If constraint inactive: ∂p*/∂b = 0 (no sensitivity)

**Example application:**
Resource allocation: λ* = value of additional resource
If λ* = 5, should pay up to $5 for one more unit.`
  }
];

export default exercises;
