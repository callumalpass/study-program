import type { WrittenExercise } from '../../../../core/types';

export const exercises: WrittenExercise[] = [
  {
    id: 'math404-t7-ex01',
    subjectId: 'math404',
    topicId: 'math404-topic-7',
    type: 'written',
    title: 'Second-Order Cone Constraint',
    description: 'Formulate a constraint as a second-order cone constraint and identify its structure.',
    difficulty: 2,
    hints: [
      'SOCP form: ||Ax + b||₂ ≤ cᵀx + d',
      'Can represent various nonlinear constraints',
      'Lorentz cone: K = {(t, x) : ||x||₂ ≤ t}'
    ],
    solution: `**Second-Order Cone (Lorentz cone):**
K = {(t, x) ∈ ℝ × ℝⁿ : ||x||₂ ≤ t}

**Example 1: Norm constraint**
||x|| ≤ 3
SOCP form: (3, x) ∈ K

**Example 2: Quadratic inequality**
x² + y² ≤ z
Rewrite: ||(x, y)||₂ ≤ √z
SOCP: Requires z ≥ 0, then (√z, x, y) ∈ K
Or use rotated cone: x² + y² ≤ z·1

**Example 3: Robust linear constraint**
(a + u)ᵀx ≤ b for all ||u|| ≤ 1
Worst case: aᵀx + ||x|| ≤ b
SOCP: (b - aᵀx, x) ∈ K

**Example 4: Euclidean distance**
||x - c|| ≤ r
SOCP: (r, x - c) ∈ K

**Standard SOCP form:**
min cᵀx
s.t. ||Aᵢx + bᵢ||₂ ≤ dᵢᵀx + eᵢ for i = 1,...,m

**Complexity:** O(n² × m) per iteration with interior point methods`
  },
  {
    id: 'math404-t7-ex02',
    subjectId: 'math404',
    topicId: 'math404-topic-7',
    type: 'written',
    title: 'Semidefinite Programming Formulation',
    description: 'Formulate a semidefinite programming (SDP) problem for matrix optimization.',
    difficulty: 3,
    hints: [
      'SDP minimizes a linear function over positive semidefinite matrices',
      'Write X ⪰ 0 to denote X is positive semidefinite',
      'Linear constraints use trace: tr(AᵢX) = bᵢ'
    ],
    solution: `**SDP Standard Form:**
min tr(CX)
s.t. tr(AᵢX) = bᵢ for i = 1,...,m
     X ⪰ 0

where X ⪰ 0 means X is positive semidefinite (all eigenvalues ≥ 0).

**Example 1: Maximum eigenvalue**
Minimize the largest eigenvalue of matrix A:
min t
s.t. A ⪯ tI
     (equivalently: tI - A ⪰ 0)

**Example 2: Matrix completion**
Find PSD matrix X matching known entries:
min ||X||_* (nuclear norm)
s.t. Xᵢⱼ = Mᵢⱼ for (i,j) ∈ Ω
     X ⪰ 0

**Example 3: Minimum trace**
min tr(X)
s.t. Xᵢⱼ = 1 for all i,j
     X ⪰ 0

Solution: X = eeᵀ where e = (1,...,1)ᵀ

**Dual SDP:**
max bᵀy
s.t. ΣyᵢAᵢ + S = C
     S ⪰ 0

**Strong duality holds when Slater's condition satisfied (strictly feasible point exists).`
  },
  {
    id: 'math404-t7-ex03',
    subjectId: 'math404',
    topicId: 'math404-topic-7',
    type: 'written',
    title: 'MAX-CUT SDP Relaxation',
    description: 'Derive the SDP relaxation for the MAX-CUT problem and explain the Goemans-Williamson approximation.',
    difficulty: 4,
    hints: [
      'Start with labels xᵢ ∈ {-1, +1}',
      'Use X = xxᵀ, then relax to X ⪰ 0',
      'Diagonal entries Xᵢᵢ = 1 since xᵢ² = 1'
    ],
    solution: `**MAX-CUT Integer Programming:**
max (1/4) Σ_{(i,j)∈E} wᵢⱼ(1 - xᵢxⱼ)
s.t. xᵢ ∈ {-1, +1}

**SDP Relaxation:**
Let Xᵢⱼ = xᵢxⱼ. Note X = xxᵀ ⪰ 0 and Xᵢᵢ = 1.

max (1/4) Σ wᵢⱼ(1 - Xᵢⱼ)
s.t. Xᵢᵢ = 1 for all i
     X ⪰ 0

**Matrix form:** max (1/4) tr(W(J - X))
where J is the all-ones matrix.

**Goemans-Williamson Rounding:**
1. Solve SDP to get X*
2. Decompose X* = VVᵀ (Cholesky-like)
3. Choose random hyperplane r uniformly on unit sphere
4. Set xᵢ = sign(vᵢᵀr)

**Approximation guarantee:**
E[cut value] ≥ α·OPT_SDP ≥ α·OPT_IP

where α = min_{θ∈[0,π]} (2/π)θ/(1-cos(θ)) ≈ 0.878

**Example:**
Graph: Triangle with edge weights = 1
OPT = 2 (cut one vertex from other two)
SDP = 2 (exact in this case)

**This 0.878 ratio is optimal under the Unique Games Conjecture!**`
  },
  {
    id: 'math404-t7-ex04',
    subjectId: 'math404',
    topicId: 'math404-topic-7',
    type: 'written',
    title: 'Robust Linear Programming',
    description: 'Formulate a robust LP where constraint coefficients have ellipsoidal uncertainty.',
    difficulty: 4,
    hints: [
      'Uncertain constraint: (a + u)ᵀx ≤ b for all u ∈ U',
      'For ellipsoidal U = {u: ||u|| ≤ ρ}, find the worst case',
      'max_{||u||≤ρ} uᵀx = ρ||x||₂'
    ],
    solution: `**Nominal LP:** min cᵀx, s.t. aᵀx ≤ b

**Uncertain constraint:** (a + u)ᵀx ≤ b for all u ∈ U
where U = {u : ||u||₂ ≤ ρ} (ellipsoidal uncertainty)

**Robust counterpart:**
The constraint must hold for worst-case u:
aᵀx + max_{||u||≤ρ} uᵀx ≤ b

Since max_{||u||≤ρ} uᵀx = ρ||x||₂ (achieved at u = ρx/||x||₂):

aᵀx + ρ||x||₂ ≤ b

**Final robust LP:**
min cᵀx
s.t. aᵀx + ρ||x||₂ ≤ b

**SOCP formulation:**
min cᵀx
s.t. (b - aᵀx, ρx) ∈ SOC

**Example:**
Nominal: min x + y, s.t. x + y ≤ 2
Uncertainty: coefficients in ±0.1

Robust: min x + y, s.t. x + y + 0.1||(x,y)|| ≤ 2

**Trade-off:**
- Larger ρ → more protection → worse objective
- Smaller ρ → less protection → risk of infeasibility

**Price of robustness:**
Robust_obj - Nominal_obj = cost of hedging against uncertainty`
  },
  {
    id: 'math404-t7-ex05',
    subjectId: 'math404',
    topicId: 'math404-topic-7',
    type: 'written',
    title: 'Integer Programming Formulation',
    description: 'Formulate a combinatorial optimization problem as an integer program.',
    difficulty: 2,
    hints: [
      'Use binary variables xᵢ ∈ {0,1} for selection decisions',
      'Model logical constraints with linear inequalities',
      'Common: xᵢ ≤ xⱼ (implication), xᵢ + xⱼ ≤ 1 (exclusive)'
    ],
    solution: `**Knapsack Problem:**
Items with values vᵢ and weights wᵢ, capacity W.
Select items to maximize total value within capacity.

**IP Formulation:**
max Σᵢ vᵢxᵢ
s.t. Σᵢ wᵢxᵢ ≤ W
     xᵢ ∈ {0, 1}

**Set Cover Problem:**
Sets S₁,...,Sₘ with costs cⱼ, cover universe U.
Find minimum cost collection covering all elements.

**IP Formulation:**
min Σⱼ cⱼxⱼ
s.t. Σⱼ:i∈Sⱼ xⱼ ≥ 1 for all i ∈ U
     xⱼ ∈ {0, 1}

**Facility Location:**
Facilities at locations j with costs fⱼ, clients i with demands dᵢ.
Cost cᵢⱼ to serve client i from facility j.

**IP Formulation:**
min Σⱼ fⱼyⱼ + Σᵢ,ⱼ cᵢⱼxᵢⱼ
s.t. Σⱼ xᵢⱼ = 1 for all clients i
     xᵢⱼ ≤ yⱼ for all i,j
     xᵢⱼ, yⱼ ∈ {0, 1}

**Logical constraints as linear inequalities:**
- AND: z = x₁ ∧ x₂ → z ≤ x₁, z ≤ x₂, z ≥ x₁ + x₂ - 1
- OR: z = x₁ ∨ x₂ → z ≥ x₁, z ≥ x₂, z ≤ x₁ + x₂
- Implication: x₁ → x₂ → x₁ ≤ x₂`
  },
  {
    id: 'math404-t7-ex06',
    subjectId: 'math404',
    topicId: 'math404-topic-7',
    type: 'written',
    title: 'LP Relaxation and Integrality Gap',
    description: 'Compute the LP relaxation of an integer program and analyze the integrality gap.',
    difficulty: 3,
    hints: [
      'LP relaxation: replace xᵢ ∈ {0,1} with 0 ≤ xᵢ ≤ 1',
      'Integrality gap = OPT_IP / OPT_LP (for max) or vice versa',
      'Smaller gap means LP relaxation is tighter'
    ],
    solution: `**Vertex Cover IP:**
Given graph G = (V, E), find minimum vertex set covering all edges.

min Σᵥ xᵥ
s.t. xᵤ + xᵥ ≥ 1 for all (u,v) ∈ E
     xᵥ ∈ {0, 1}

**LP Relaxation:**
min Σᵥ xᵥ
s.t. xᵤ + xᵥ ≥ 1 for all (u,v) ∈ E
     0 ≤ xᵥ ≤ 1

**Example: Triangle graph (K₃)**
LP optimal: xᵥ = 1/2 for all v, value = 3/2
IP optimal: select any 2 vertices, value = 2

**Integrality gap:** 2 / (3/2) = 4/3

**General bounds:**
For vertex cover: gap ≤ 2
(Rounding x̂ᵥ = 1 if xᵥ ≥ 1/2 gives 2-approximation)

**Tight example for 2-gap:**
Complete bipartite graph Kₙ,ₙ:
- LP optimal: all vertices = 1/2, value = n
- IP optimal: one side, value = n
- Gap = 1 (no gap for bipartite!)

For general graphs, gap → 2 as n → ∞.

**Strengthening LP relaxations:**
1. Add valid inequalities (cuts)
2. Lift-and-project
3. Semidefinite relaxation`
  },
  {
    id: 'math404-t7-ex07',
    subjectId: 'math404',
    topicId: 'math404-topic-7',
    type: 'written',
    title: 'Branch and Bound',
    description: 'Apply the branch and bound algorithm to solve a small integer program.',
    difficulty: 3,
    hints: [
      'Solve LP relaxation at each node',
      'Branch on fractional variable',
      'Prune nodes with bound worse than incumbent'
    ],
    solution: `**Problem:**
max 5x₁ + 4x₂
s.t. x₁ + x₂ ≤ 5
     10x₁ + 6x₂ ≤ 45
     x₁, x₂ ∈ {0,1,2,3,...} (integer)

**Node 0 (Root):** Solve LP relaxation
LP optimal: x₁ = 3.75, x₂ = 1.25, z = 23.75
Fractional, so branch on x₁.

**Node 1:** x₁ ≤ 3
LP: x₁ = 3, x₂ = 2, z = 23
Integer! Update incumbent: z* = 23, x* = (3, 2)

**Node 2:** x₁ ≥ 4
LP: x₁ = 4, x₂ = 0.83, z = 23.33
z = 23.33 > z* = 23, but fractional.
Branch on x₂.

**Node 3:** x₁ ≥ 4, x₂ ≤ 0
LP: x₁ = 4.5, x₂ = 0, z = 22.5
z = 22.5 < z* = 23 → PRUNE

**Node 4:** x₁ ≥ 4, x₂ ≥ 1
LP: x₁ = 3.9, x₂ = 1, z = 23.5
Constraint x₁ ≥ 4 violated → infeasible → PRUNE

**Optimal:** x* = (3, 2), z* = 23

**Key insights:**
1. LP relaxation provides upper bound (for max)
2. Integer solutions provide lower bound
3. Prune when bound ≤ incumbent
4. Choice of branching variable affects efficiency`
  },
  {
    id: 'math404-t7-ex08',
    subjectId: 'math404',
    topicId: 'math404-topic-7',
    type: 'written',
    title: 'Cutting Planes',
    description: 'Derive a Gomory cutting plane from an optimal LP tableau.',
    difficulty: 4,
    hints: [
      'Gomory cut from row with fractional basic variable',
      'Use fractional parts of coefficients',
      'Cut eliminates current LP solution but preserves integer solutions'
    ],
    solution: `**Optimal LP Tableau:**
| BV | x₁ | x₂ | s₁ | s₂ | RHS  |
|----|----|----|----|----|------|
| x₁ | 1  | 0  | 2/3| -1/3| 7/3 |
| x₂ | 0  | 1  |-1/3| 2/3 | 4/3 |

Current LP optimal: x₁ = 7/3, x₂ = 4/3 (fractional)

**Gomory Cut from Row 1:**
x₁ + (2/3)s₁ + (-1/3)s₂ = 7/3

**Fractional parts:**
Let f(a) = a - ⌊a⌋

f(7/3) = 1/3
f(2/3) = 2/3
f(-1/3) = 2/3 (since -1/3 - (-1) = 2/3)

**Gomory cut:**
f(2/3)s₁ + f(2/3)s₂ ≥ f(7/3)
(2/3)s₁ + (2/3)s₂ ≥ 1/3

Multiply by 3:
2s₁ + 2s₂ ≥ 1

**Add to tableau:**
s₁ = 5 - x₁ - x₂
s₂ = 45 - 10x₁ - 6x₂

2(5 - x₁ - x₂) + 2(45 - 10x₁ - 6x₂) ≥ 1
10 - 2x₁ - 2x₂ + 90 - 20x₁ - 12x₂ ≥ 1
100 - 22x₁ - 14x₂ ≥ 1
22x₁ + 14x₂ ≤ 99

**This cut eliminates (7/3, 4/3) but keeps all integer solutions!**

**Properties:**
- Gomory cuts finite convergence for pure IP
- Practical: combine with branch and bound (branch and cut)`
  },
  {
    id: 'math404-t7-ex09',
    subjectId: 'math404',
    topicId: 'math404-topic-7',
    type: 'written',
    title: 'Geometric Programming',
    description: 'Formulate and solve a geometric programming problem.',
    difficulty: 4,
    hints: [
      'GP: minimize posynomial subject to posynomial ≤ 1',
      'Posynomial: sum of monomials with positive coefficients',
      'Transform to convex problem via log substitution'
    ],
    solution: `**Geometric Programming Standard Form:**
min f₀(x)
s.t. fᵢ(x) ≤ 1, i = 1,...,m
     gⱼ(x) = 1, j = 1,...,p

where fᵢ are posynomials (sum of monomials).

**Monomial:** cxₐ₁¹...xₐₙⁿ with c > 0
**Posynomial:** Σₖ cₖ xₐₖ¹¹...xₐₖⁿⁿ

**Example: Box design**
Maximize volume V = xyz subject to:
- Surface area: 2(xy + yz + xz) ≤ A
- Aspect ratio: x/y ≤ 2, y/x ≤ 2

**GP formulation (minimize 1/V):**
min x⁻¹y⁻¹z⁻¹
s.t. (2/A)(xy + yz + xz) ≤ 1
     (1/2)xy⁻¹ ≤ 1
     (1/2)x⁻¹y ≤ 1

**Convex transformation:**
Let yᵢ = log(xᵢ). Then xᵢ = e^{yᵢ}.

Monomial: c·e^{a₁y₁+...+aₙyₙ} (log-sum-exp)
log of posynomial: log(Σₖ e^{aₖᵀy + bₖ}) (convex!)

**Transformed problem:**
min -y₁ - y₂ - y₃
s.t. log(e^{y₁+y₂} + e^{y₂+y₃} + e^{y₁+y₃}) ≤ log(A/2)
     y₁ - y₂ ≤ log(2)
     y₂ - y₁ ≤ log(2)

This is a convex optimization problem!

**Solution:** For A = 6, optimal is x = y = z = 1 (cube), V = 1`
  },
  {
    id: 'math404-t7-ex10',
    subjectId: 'math404',
    topicId: 'math404-topic-7',
    type: 'written',
    title: 'Conic Programming Hierarchy',
    description: 'Explain the hierarchy of conic programs: LP, SOCP, SDP.',
    difficulty: 3,
    hints: [
      'LP ⊂ SOCP ⊂ SDP in terms of problem classes',
      'Each cone generalizes the previous',
      'Complexity increases but more problems can be modeled'
    ],
    solution: `**Cone Hierarchy:**

**1. Linear Programming (LP)**
Cone: ℝⁿ₊ = {x : xᵢ ≥ 0}
Form: min cᵀx s.t. Ax = b, x ≥ 0

**2. Second-Order Cone Programming (SOCP)**
Cone: Kₛₒc = {(t,x) : ||x||₂ ≤ t}
Form: min cᵀx s.t. ||Aᵢx + bᵢ|| ≤ dᵢᵀx + eᵢ

**3. Semidefinite Programming (SDP)**
Cone: S₊ⁿ = {X : X ⪰ 0} (PSD matrices)
Form: min tr(CX) s.t. tr(AᵢX) = bᵢ, X ⪰ 0

**Inclusion relationships:**

**LP as SOCP:**
x ≥ 0 ↔ (x, 0) ∈ Kₛₒc

**SOCP as SDP:**
||x||₂ ≤ t ↔ [[tI, x], [xᵀ, t]] ⪰ 0 (Schur complement)

**Complexity per interior-point iteration:**
| Problem | Variables | Per-iteration |
|---------|-----------|---------------|
| LP      | n         | O(n²)         |
| SOCP    | n         | O(n²)         |
| SDP     | n×n       | O(n⁶)         |

**Iteration count:** O(√n log(1/ε)) for all

**Modeling power:**
- LP: Linear constraints only
- SOCP: Norm constraints, rotated cones
- SDP: Eigenvalue constraints, matrix inequalities

**Example progression:**
Portfolio optimization:
- LP: Linear utility, no risk constraint
- SOCP: Quadratic risk constraint ||Σ^½w|| ≤ σ
- SDP: More complex risk measures`
  },
  {
    id: 'math404-t7-ex11',
    subjectId: 'math404',
    topicId: 'math404-topic-7',
    type: 'written',
    title: 'Convex Relaxation of Rank Constraint',
    description: 'Derive the nuclear norm relaxation for low-rank matrix optimization.',
    difficulty: 5,
    hints: [
      'Rank constraint is non-convex',
      'Nuclear norm ||X||_* = Σσᵢ(X) is convex envelope of rank',
      'Replace rank(X) ≤ k with ||X||_* ≤ τ'
    ],
    solution: `**Low-Rank Matrix Optimization:**
min ||A(X) - b||²
s.t. rank(X) ≤ k

This is NP-hard in general!

**Nuclear Norm Relaxation:**
||X||_* = Σᵢ σᵢ(X) = tr(√(XᵀX))

**Theorem:** Nuclear norm is the convex envelope of rank over unit spectral norm ball.

**Relaxed problem:**
min ||A(X) - b||² + λ||X||_*

or equivalently (for some τ):
min ||X||_*
s.t. ||A(X) - b||² ≤ ε

**SDP formulation of nuclear norm:**
||X||_* = min{(1/2)(tr(W₁) + tr(W₂)) : [[W₁, X], [Xᵀ, W₂]] ⪰ 0}

**Matrix Completion Example:**
Observe entries Ωᵢⱼ of rank-k matrix M.
min ||X||_*
s.t. Xᵢⱼ = Mᵢⱼ for (i,j) ∈ Ω

**Recovery guarantee (Candès-Recht):**
If M is rank-r and incoherent, with |Ω| ≥ Cn^{1.2}r log n,
then X* = M with high probability!

**Applications:**
1. Netflix recommendation (matrix completion)
2. Video surveillance (background/foreground separation)
3. Robust PCA`
  },
  {
    id: 'math404-t7-ex12',
    subjectId: 'math404',
    topicId: 'math404-topic-7',
    type: 'written',
    title: 'Stochastic Programming',
    description: 'Formulate a two-stage stochastic program with recourse.',
    difficulty: 4,
    hints: [
      'First stage: decisions before uncertainty revealed',
      'Second stage: recourse decisions after observing ξ',
      'Objective: minimize first stage + expected second stage cost'
    ],
    solution: `**Two-Stage Stochastic Program:**

**First stage (here-and-now):**
Choose x before uncertainty ξ is revealed.
Cost: cᵀx

**Second stage (wait-and-see):**
Observe ξ, then choose y(ξ).
Cost: Q(x, ξ) = min{q(ξ)ᵀy : W(ξ)y = h(ξ) - T(ξ)x, y ≥ 0}

**Full problem:**
min cᵀx + E_ξ[Q(x, ξ)]
s.t. Ax = b
     x ≥ 0

**Example: Newsvendor**
Order x newspapers (first stage, cost c per paper).
Demand D is random. Sell at price p, salvage at s < c.

**Second stage:** Given demand D and order x:
Q(x, D) = -p·min(x, D) - s·max(x-D, 0)

**Full problem:**
min cx + E_D[-p·min(x, D) - s·(x-D)⁺]

**Optimal solution:** Order x* where:
P(D ≥ x*) = (c - s)/(p - s)

**Scenario-based formulation:**
If ξ ∈ {ξ₁,...,ξₛ} with probabilities π₁,...,πₛ:

min cᵀx + Σₛ πₛ qₛᵀyₛ
s.t. Ax = b
     Wₛyₛ = hₛ - Tₛx, for s = 1,...,S
     x, yₛ ≥ 0

This is a large LP (solvable by decomposition methods).`
  },
  {
    id: 'math404-t7-ex13',
    subjectId: 'math404',
    topicId: 'math404-topic-7',
    type: 'written',
    title: 'Benders Decomposition',
    description: 'Apply Benders decomposition to solve a structured optimization problem.',
    difficulty: 5,
    hints: [
      'Separate problem into master (x) and subproblem (y)',
      'Subproblem provides cuts for master',
      'Iterate until convergence'
    ],
    solution: `**Original Problem:**
min cᵀx + dᵀy
s.t. Ax = b
     Bx + Dy = e
     x, y ≥ 0

**Decomposition:**
For fixed x, subproblem in y:
Q(x) = min{dᵀy : Dy = e - Bx, y ≥ 0}

**Master problem:**
min cᵀx + θ
s.t. Ax = b
     θ ≥ Q(x)  (implicitly)
     x ≥ 0

**Benders Cuts:**
From dual of subproblem:
Q(x) = max{πᵀ(e - Bx) : πᵀD ≤ dᵀ}

Extreme points: π₁,...,πₖ
Extreme rays: ρ₁,...,ρₘ

**Feasibility cut (if subproblem infeasible):**
ρⱼᵀ(e - Bx) ≤ 0

**Optimality cut (if subproblem bounded):**
θ ≥ πⱼᵀ(e - Bx)

**Algorithm:**
1. Initialize master with no cuts
2. Solve master → (x*, θ*)
3. Solve subproblem with x = x*
   - If infeasible: add feasibility cut
   - If bounded: add optimality cut if πᵀ(e - Bx*) > θ*
4. If no cut added: STOP (optimal)
5. Else: go to step 2

**Convergence:** Finite (finite number of extreme points/rays)

**Application:** Two-stage stochastic programming
- Master: first-stage decisions
- Subproblems: second-stage for each scenario`
  },
  {
    id: 'math404-t7-ex14',
    subjectId: 'math404',
    topicId: 'math404-topic-7',
    type: 'written',
    title: 'Sum-of-Squares Relaxation',
    description: 'Use sum-of-squares relaxation to check polynomial non-negativity.',
    difficulty: 5,
    hints: [
      'Polynomial p(x) ≥ 0 is hard to verify in general',
      'SOS: p(x) = Σqᵢ(x)² is sufficient for non-negativity',
      'SOS can be checked via SDP'
    ],
    solution: `**Non-negativity Certification:**
Is p(x) ≥ 0 for all x?

This is NP-hard for general polynomials (degree ≥ 4).

**Sum-of-Squares (SOS):**
p(x) is SOS if p(x) = Σⱼ qⱼ(x)² for some polynomials qⱼ.

SOS ⟹ non-negative (converse false in general)

**SDP Formulation:**
p(x) = m(x)ᵀQm(x)
where m(x) = [1, x, x², ..., x^d] (monomial basis)

p is SOS ⟺ Q ⪰ 0 (SDP constraint!)

**Example:**
p(x) = x⁴ + 2x² + 1
m(x) = [1, x, x²]

Find Q ⪰ 0 such that:
m(x)ᵀQm(x) = q₁₁ + 2q₁₂x + (2q₁₃ + q₂₂)x² + 2q₂₃x³ + q₃₃x⁴

Matching: q₃₃ = 1, 2q₂₃ = 0, 2q₁₃ + q₂₂ = 2, 2q₁₂ = 0, q₁₁ = 1

One solution: Q = [[1,0,0], [0,2,0], [0,0,1]] ⪰ 0 ✓

So p(x) = 1 + 2x² + x⁴ = (1)² + (√2 x)² + (x²)²

**Hierarchy of relaxations:**
As SOS degree increases, approximates true non-negativity better.

**Applications:**
- Control: Lyapunov function synthesis
- Optimization: Global polynomial optimization
- Robotics: Safety verification`
  },
  {
    id: 'math404-t7-ex15',
    subjectId: 'math404',
    topicId: 'math404-topic-7',
    type: 'written',
    title: 'Distributed Optimization',
    description: 'Formulate a distributed optimization problem and describe ADMM algorithm.',
    difficulty: 4,
    hints: [
      'Decompose problem among agents',
      'Consensus constraint: all local copies agree',
      'ADMM: alternating minimization with dual update'
    ],
    solution: `**Distributed Problem:**
min Σᵢ fᵢ(xᵢ)
s.t. xᵢ = z for all i (consensus)

Each agent i has local data and computes fᵢ.

**ADMM (Alternating Direction Method of Multipliers):**

**Augmented Lagrangian:**
L_ρ(x, z, y) = Σᵢ[fᵢ(xᵢ) + yᵢᵀ(xᵢ - z) + (ρ/2)||xᵢ - z||²]

**Algorithm:**
1. **x-update (parallel):**
   xᵢ^{k+1} = argmin_xᵢ{fᵢ(xᵢ) + yᵢ^kᵀxᵢ + (ρ/2)||xᵢ - z^k||²}

2. **z-update (aggregation):**
   z^{k+1} = (1/n)Σᵢ(xᵢ^{k+1} + yᵢ^k/ρ)

3. **Dual update (parallel):**
   yᵢ^{k+1} = yᵢ^k + ρ(xᵢ^{k+1} - z^{k+1})

**Example: Distributed LASSO**
min (1/2)Σᵢ||Aᵢx - bᵢ||² + λ||x||₁

Split: fᵢ(xᵢ) = (1/2)||Aᵢxᵢ - bᵢ||², g(z) = λ||z||₁

**ADMM updates:**
xᵢ^{k+1} = (AᵢᵀAᵢ + ρI)⁻¹(Aᵢᵀbᵢ + ρz^k - yᵢ^k)
z^{k+1} = soft_threshold(x̄^{k+1} + ȳ^k/ρ, λ/(nρ))
yᵢ^{k+1} = yᵢ^k + ρ(xᵢ^{k+1} - z^{k+1})

**Convergence:** O(1/k) for convex problems

**Communication:** Only z needs to be shared (centralized) or exchanged (decentralized)`
  },
  {
    id: 'math404-t7-ex16',
    subjectId: 'math404',
    topicId: 'math404-topic-7',
    type: 'written',
    title: 'Multi-Objective Optimization',
    description: 'Solve a bi-objective optimization problem and find the Pareto frontier.',
    difficulty: 3,
    hints: [
      'No single solution optimizes all objectives',
      'Pareto optimal: cannot improve one without worsening another',
      'Methods: weighted sum, ε-constraint, goal programming'
    ],
    solution: `**Bi-Objective Problem:**
min (f₁(x), f₂(x))
s.t. x ∈ X

**Pareto Dominance:**
x dominates y if:
- f₁(x) ≤ f₁(y) and f₂(x) ≤ f₂(y)
- At least one strict inequality

**Pareto Optimal:** Not dominated by any feasible x.

**Example:**
min (x², (x-2)²)
s.t. x ∈ [0, 2]

**Analysis:**
f₁(x) = x² is minimized at x = 0
f₂(x) = (x-2)² is minimized at x = 2

For x ∈ [0, 2], all points are Pareto optimal!

**Pareto frontier:** {(x², (x-2)²) : x ∈ [0, 2]}
= {(t, (2-√t)²) : t ∈ [0, 4]}

**Method 1: Weighted Sum**
min w₁f₁(x) + w₂f₂(x), w₁ + w₂ = 1, w ≥ 0

For w₁ = w₂ = 0.5:
min 0.5x² + 0.5(x-2)² = 0.5(2x² - 4x + 4)
d/dx = 2x - 2 = 0 → x* = 1
Solution: (1, 1) on Pareto frontier

**Method 2: ε-Constraint**
min f₁(x)
s.t. f₂(x) ≤ ε
     x ∈ X

For ε = 0.5:
min x² s.t. (x-2)² ≤ 0.5
x ∈ [2-√0.5, 2] ≈ [1.29, 2]
Optimal: x* ≈ 1.29

**Varying ε traces the Pareto frontier!**

**Applications:**
- Cost vs quality
- Risk vs return
- Accuracy vs interpretability`
  }
];

export default exercises;
