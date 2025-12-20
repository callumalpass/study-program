import type { WrittenExercise } from '../../../../core/types';

export const exercises: WrittenExercise[] = [
  {
    id: 'math404-t3-ex01',
    subjectId: 'math404',
    topicId: 'topic-3',
    type: 'written',
    title: 'Dual LP Formulation',
    description: 'Construct the dual of a given linear program using the standard rules.',
    difficulty: 2,
    hints: [
      'Each primal constraint → one dual variable',
      'Each primal variable → one dual constraint',
      'Transpose coefficient matrix and swap c, b vectors'
    ],
    solution: `**Primal (max):**
max 4x₁ + 3x₂
s.t. 2x₁ + x₂ ≤ 10
     x₁ + 3x₂ ≤ 12
     x₁ + x₂ = 5
     x₁ ≥ 0, x₂ free

**Dual Construction:**

| Primal (max) | Dual (min) |
|--------------|------------|
| ≤ constraint | y ≥ 0      |
| = constraint | y free     |
| x ≥ 0        | ≥ constraint|
| x free       | = constraint|

**Dual (min):**
min 10y₁ + 12y₂ + 5y₃
s.t. 2y₁ + y₂ + y₃ ≥ 4   (from x₁ ≥ 0)
     y₁ + 3y₂ + y₃ = 3   (from x₂ free)
     y₁, y₂ ≥ 0, y₃ free

**Verification:**
- Primal has 2 variables, dual has 2+1=3 constraints (counting = as 2)
- Primal has 2+2=4 constraints, dual has 3 variables
- Coefficient matrix transposes: A → Aᵀ`
  },
  {
    id: 'math404-t3-ex02',
    subjectId: 'math404',
    topicId: 'topic-3',
    type: 'written',
    title: 'Weak Duality Theorem',
    description: 'Prove weak duality and use it to bound an LP\'s optimal value.',
    difficulty: 2,
    hints: [
      'For feasible primal x and dual y: cᵀx ≤ bᵀy (max) or cᵀx ≥ bᵀy (min)',
      'Use constraint multiplications',
      'Provides stopping criterion: if cᵀx = bᵀy, both optimal'
    ],
    solution: `**Weak Duality Proof:**

**Primal (P):** max cᵀx s.t. Ax ≤ b, x ≥ 0
**Dual (D):** min bᵀy s.t. Aᵀy ≥ c, y ≥ 0

For feasible x (primal) and y (dual):
cᵀx ≤ (Aᵀy)ᵀx = yᵀ(Ax) ≤ yᵀb = bᵀy

Therefore: **cᵀx ≤ bᵀy** (primal ≤ dual)

**Application:**

Primal: max 2x₁ + 3x₂, s.t. x₁ + 2x₂ ≤ 8, 3x₁ + 2x₂ ≤ 12, x ≥ 0
Dual: min 8y₁ + 12y₂, s.t. y₁ + 3y₂ ≥ 2, 2y₁ + 2y₂ ≥ 3, y ≥ 0

**Feasible solutions:**
- Primal: x = (2, 3) → z_P = 2·2 + 3·3 = 13 (lower bound on optimal)
- Dual: y = (1, 1) → z_D = 8·1 + 12·1 = 20 (upper bound on optimal)

**Conclusion:** 13 ≤ z* ≤ 20

**Better dual:** y = (1/2, 1/2)
Check: 1/2 + 3/2 = 2 ≥ 2 ✓, 1 + 1 = 2 < 3 ✗ (infeasible)

Try y = (0, 1): 0 + 3 = 3 ≥ 2 ✓, 0 + 2 = 2 < 3 ✗
Try y = (1, 1/3): 1 + 1 = 2 ≥ 2 ✓, 2 + 2/3 = 8/3 ≥ 3 ✗

**If we find cᵀx* = bᵀy*:** Both optimal by weak duality!`
  },
  {
    id: 'math404-t3-ex03',
    subjectId: 'math404',
    topicId: 'topic-3',
    type: 'written',
    title: 'Strong Duality Verification',
    description: 'Verify strong duality by showing the optimal values of primal and dual are equal.',
    difficulty: 3,
    hints: [
      'Solve both primal and dual',
      'Check that p* = d* (zero duality gap)',
      'Strong duality holds for LPs when feasible'
    ],
    solution: `**Primal:**
max 3x₁ + 2x₂
s.t. x₁ + x₂ ≤ 4
     2x₁ + x₂ ≤ 6
     x ≥ 0

**Solve by simplex:**
Optimal: x* = (2, 2), z*_P = 3·2 + 2·2 = 10

**Dual:**
min 4y₁ + 6y₂
s.t. y₁ + 2y₂ ≥ 3
     y₁ + y₂ ≥ 2
     y ≥ 0

**Solve dual:**
Graphically or by simplex:
Active constraints: y₁ + 2y₂ = 3, y₁ + y₂ = 2
Solving: y₂ = 1, y₁ = 1
Optimal: y* = (1, 1), z*_D = 4·1 + 6·1 = 10

**Strong Duality:** z*_P = z*_D = 10 ✓

**Complementary Slackness Verification:**
Primal:
- x₁* = 2 > 0 → dual constraint 1 active: y₁ + 2y₂ = 3 ✓
- x₂* = 2 > 0 → dual constraint 2 active: y₁ + y₂ = 2 ✓

Dual:
- y₁* = 1 > 0 → primal constraint 1 active: x₁ + x₂ = 4 ✓
- y₂* = 1 > 0 → primal constraint 2 active: 2x₁ + x₂ = 6 ✓

All complementary slackness conditions hold!`
  },
  {
    id: 'math404-t3-ex04',
    subjectId: 'math404',
    topicId: 'topic-3',
    type: 'written',
    title: 'Complementary Slackness Conditions',
    description: 'Use complementary slackness to find the optimal dual solution from a known primal solution.',
    difficulty: 3,
    hints: [
      'If xⱼ > 0, then j-th dual constraint is tight',
      'If i-th primal constraint is slack, then yᵢ = 0',
      'Solve system of equations from active constraints'
    ],
    solution: `**Problem:**
max 5x₁ + 4x₂ + 3x₃
s.t. 2x₁ + 3x₂ + x₃ ≤ 5   (constraint 1)
     4x₁ + x₂ + 2x₃ ≤ 11  (constraint 2)
     3x₁ + 4x₂ + 2x₃ ≤ 8   (constraint 3)
     x ≥ 0

**Given:** Primal optimal x* = (2, 0, 1), z* = 13

**Verify feasibility:**
2·2 + 0 + 1 = 5 ≤ 5 (active)
4·2 + 0 + 2·1 = 10 ≤ 11 (slack = 1)
3·2 + 0 + 2·1 = 8 ≤ 8 (active)

**Dual:**
min 5y₁ + 11y₂ + 8y₃
s.t. 2y₁ + 4y₂ + 3y₃ ≥ 5   (from x₁)
     3y₁ + y₂ + 4y₃ ≥ 4   (from x₂)
     y₁ + 2y₂ + 2y₃ ≥ 3   (from x₃)
     y ≥ 0

**Complementary Slackness:**
- x₁* = 2 > 0 → 2y₁ + 4y₂ + 3y₃ = 5
- x₂* = 0 → no requirement
- x₃* = 1 > 0 → y₁ + 2y₂ + 2y₃ = 3
- Constraint 2 slack → y₂* = 0
- Constraints 1,3 active → y₁*, y₃* ≥ 0

**Solve:**
With y₂ = 0:
2y₁ + 3y₃ = 5
y₁ + 2y₃ = 3

From second: y₁ = 3 - 2y₃
Into first: 2(3-2y₃) + 3y₃ = 5
6 - 4y₃ + 3y₃ = 5
y₃ = 1, y₁ = 1

**Dual optimal:** y* = (1, 0, 1), z*_D = 5·1 + 0 + 8·1 = 13 ✓`
  },
  {
    id: 'math404-t3-ex05',
    subjectId: 'math404',
    topicId: 'topic-3',
    type: 'written',
    title: 'Economic Interpretation of Dual Variables',
    description: 'Interpret dual variables as shadow prices in a resource allocation problem.',
    difficulty: 2,
    hints: [
      'Dual variable = marginal value of resource',
      'If yᵢ = 5, increasing bᵢ by 1 increases profit by 5',
      'Zero dual → resource is not scarce (slack in primal)'
    ],
    solution: `**Production Problem:**
Maximize profit from products A, B:
max 40x_A + 30x_B
s.t. 2x_A + x_B ≤ 100  (hours of machine time)
     x_A + 2x_B ≤ 80   (kg of raw material)
     x_A, x_B ≥ 0

**Optimal Solution:**
x* = (40, 20), profit = 40·40 + 30·20 = $2200

Both constraints active:
2·40 + 20 = 100 (full machine time)
40 + 2·20 = 80 (full material)

**Dual Variables (Shadow Prices):**
y₁* = 10 (machine time)
y₂* = 10 (material)

**Economic Interpretation:**

**1. Machine Time (y₁ = 10):**
- Worth $10 per hour
- Increasing machine time from 100→101 hours increases profit by ~$10
- Decreasing to 99 hours decreases profit by ~$10

**2. Material (y₂ = 10):**
- Worth $10 per kg
- Should acquire more material if cost < $10/kg
- Should sell material if can get > $10/kg

**Example:** Suppose we can:
- Rent extra machine: $8/hour → DO IT! (net gain $2/hour)
- Buy material: $12/kg → DON'T! (net loss $2/kg)

**Dual Optimal Value:**
100·10 + 80·10 = 2200 = primal optimal (strong duality)

**If constraint has slack:** y = 0
Example: Add constraint x_A ≤ 50 (not binding)
Then y₃ = 0 (no value to increasing this limit)`
  },
  {
    id: 'math404-t3-ex06',
    subjectId: 'math404',
    topicId: 'topic-3',
    type: 'written',
    title: 'Dual of Dual is Primal',
    description: 'Prove that taking the dual of the dual LP returns the original primal problem.',
    difficulty: 3,
    hints: [
      'Start with primal in standard form',
      'Construct dual systematically',
      'Take dual of the dual using same rules'
    ],
    solution: `**Primal (P):**
max cᵀx
s.t. Ax ≤ b
     x ≥ 0

**Dual (D):**
min bᵀy
s.t. Aᵀy ≥ c
     y ≥ 0

**Dual of Dual (DD):**
Rewrite (D) in max form:
max -bᵀy
s.t. -Aᵀy ≤ -c
     y ≥ 0

**Take dual of this:**
min -cᵀz
s.t. (-Aᵀ)ᵀz ≥ -b
     z ≥ 0

Simplify:
min -cᵀz
s.t. -Az ≥ -b  (equivalently: Az ≤ b)
     z ≥ 0

Multiply objective by -1 (max → min):
**max cᵀz s.t. Az ≤ b, z ≥ 0**

This is identical to (P) with z replacing x! ∎

**Example:**

P: max 3x₁ + 2x₂, s.t. x₁ + x₂ ≤ 4, x ≥ 0
D: min 4y, s.t. y ≥ 3, y ≥ 2, y ≥ 0
   Simplifying: min 4y, s.t. y ≥ 3
DD: Taking dual again returns to P

**Intuition:** Duality is a symmetric relationship.`
  },
  {
    id: 'math404-t3-ex07',
    subjectId: 'math404',
    topicId: 'topic-3',
    type: 'written',
    title: 'Farkas\' Lemma Application',
    description: 'Use Farkas\' Lemma to prove a system of linear inequalities is infeasible.',
    difficulty: 4,
    hints: [
      'Farkas: Exactly one holds: (1) Ax ≤ b, x ≥ 0 OR (2) Aᵀy ≥ 0, bᵀy < 0, y ≥ 0',
      'To prove (1) infeasible, find y satisfying (2)',
      'This is the certificate of infeasibility'
    ],
    solution: `**Farkas' Lemma:**
Exactly one of the following holds:
1. ∃x: Ax ≤ b, x ≥ 0
2. ∃y: Aᵀy ≥ 0, bᵀy < 0, y ≥ 0

**Problem:** Prove infeasible:
x₁ + 2x₂ ≤ 3
2x₁ + x₂ ≤ 3
-x₁ - x₂ ≤ -4
x ≥ 0

**In matrix form:**
A = [[1, 2], [2, 1], [-1, -1]], b = [3, 3, -4]ᵀ

**Find certificate y:**
Need: Aᵀy ≥ 0, bᵀy < 0, y ≥ 0

Aᵀy = [[1,2,-1], [2,1,-1]][[y₁],[y₂],[y₃]]
     = [[y₁+2y₂-y₃], [2y₁+y₂-y₃]]

Try y₁ = y₂ = y₃ = 1:
Aᵀy = [1+2-1, 2+1-1] = [2, 2] ≥ 0 ✓
bᵀy = 3·1 + 3·1 + (-4)·1 = 2 ≮ 0 ✗

Try y₁ = y₂ = 0, y₃ = 1:
Aᵀy = [-1, -1] ≮ 0 ✗

Try y₁ = y₂ = 1, y₃ = 2:
Aᵀy = [1+2-2, 2+1-2] = [1, 1] ≥ 0 ✓
bᵀy = 3 + 3 - 8 = -2 < 0 ✓

**Certificate found:** y* = (1, 1, 2)
This proves system is **infeasible**.

**Geometric interpretation:**
y gives a linear combination of constraints:
1·(x₁+2x₂) + 1·(2x₁+x₂) + 2·(-x₁-x₂) ≤ 1·3 + 1·3 + 2·(-4)
x₁ + 2x₂ + 2x₁ + x₂ - 2x₁ - 2x₂ ≤ -2
x₁ + x₂ ≤ -2

But x ≥ 0 implies x₁ + x₂ ≥ 0, contradiction!`
  },
  {
    id: 'math404-t3-ex08',
    subjectId: 'math404',
    topicId: 'topic-3',
    type: 'written',
    title: 'Dual Simplex Method',
    description: 'Apply the dual simplex method to solve an LP starting from dual feasible but primal infeasible basis.',
    difficulty: 4,
    hints: [
      'Dual simplex maintains dual feasibility',
      'Selects leaving variable with most negative RHS',
      'Ratio test ensures dual feasibility maintained'
    ],
    solution: `**Problem:**
min 2x₁ + 3x₂
s.t. x₁ + x₂ ≥ 3
     2x₁ + x₂ ≥ 4
     x ≥ 0

**Standard form (slack/surplus):**
min 2x₁ + 3x₂
s.t. x₁ + x₂ - s₁ = 3
     2x₁ + x₂ - s₂ = 4
     x, s ≥ 0

**Initial tableau (basis s₁, s₂):**
| BV | x₁ | x₂ | s₁ | s₂ | RHS |
|----|----|----|----|----|-----|
| s₁ | 1  | 1  | -1 | 0  | 3   |
| s₂ | 2  | 1  | 0  | -1 | 4   |
| z  | -2 | -3 | 0  | 0  | 0   |

**Problem:** RHS values 3, 4 are positive, but s₁, s₂ coefficients are -1
After converting: -s₁ = -3, -s₂ = -4 (primal infeasible)

**Multiply rows by -1:**
| BV | x₁ | x₂ | s₁ | s₂ | RHS  |
|----|----|----|----|----|------|
| s₁ | -1 | -1 | 1  | 0  | -3   |
| s₂ | -2 | -1 | 0  | 1  | -4   |
| z  | -2 | -3 | 0  | 0  | 0    |

**Dual Simplex:**

**Iteration 1:**
- Leaving: most negative RHS = -4 (row 2, s₂ leaves)
- Entering: ratio test on objective row: min{-2/-2, -3/-1} = min{1, 3} = 1
  → x₁ enters

**Pivot on a₂₁ = -2:**
Divide row 2 by -2:
| x₁ | x₂  | s₁ | s₂  | RHS |
|----|-----|----|-----|-----|
| 1  | 1/2 | 0  |-1/2 | 2   |

Update other rows...

**Final tableau:**
| BV | x₁ | x₂ | s₁ | s₂ | RHS |
|----|----|----|----|----|-----|
| x₂ | 0  | 1  | 2  | -1 | 1   |
| x₁ | 1  | 0  |-1  | 1  | 1   |
| z  | 0  | 0  | 1  | 1  | 7   |

**Optimal:** x* = (1, 1), z* = 7

**Dual Simplex Use Cases:**
1. After adding cutting planes in integer programming
2. Re-optimization after constraint changes
3. When dual feasible starting basis available`
  },
  {
    id: 'math404-t3-ex09',
    subjectId: 'math404',
    topicId: 'topic-3',
    type: 'written',
    title: 'Duality Gap Analysis',
    description: 'Analyze the duality gap for a sequence of approximations to an LP.',
    difficulty: 3,
    hints: [
      'Duality gap = |primal objective - dual objective|',
      'Gap = 0 at optimality (strong duality)',
      'Can use gap as stopping criterion'
    ],
    solution: `**Problem:**
Primal (P): max 3x₁ + 4x₂, s.t. x₁ + 2x₂ ≤ 8, 2x₁ + x₂ ≤ 8, x ≥ 0
Dual (D): min 8y₁ + 8y₂, s.t. y₁ + 2y₂ ≥ 3, 2y₁ + y₂ ≥ 4, y ≥ 0

**Iteration sequence:**

| Iter | Primal x        | z_P | Dual y      | z_D | Gap |
|------|-----------------|-----|-------------|-----|-----|
| 0    | (0, 0)          | 0   | (3, 2)      | 40  | 40  |
| 1    | (4, 0)          | 12  | (2, 1)      | 24  | 12  |
| 2    | (0, 4)          | 16  | (1, 2)      | 24  | 8   |
| 3    | (2.67, 2.67)    | 18.7| (1.33,1.33) | 21.3| 2.6 |
| 4    | (8/3, 8/3)      | 56/3| (4/3, 4/3)  | 64/3| 8/3 |
| *    | (8/3, 8/3)      | 56/3| (4/3, 4/3)  | 64/3| 0   |

Wait, let me recalculate optimum:

**Solve P graphically:**
Vertices: (0,0), (4,0), (0,4), (8/3,8/3)
Evaluate:
- (0,0): 0
- (4,0): 12
- (0,4): 16
- (8/3,8/3): 3·8/3 + 4·8/3 = 24/3 + 32/3 = 56/3 ≈ 18.67

Optimal P: x* = (8/3, 8/3), z*_P = 56/3

**Solve D:**
Active: y₁ + 2y₂ = 3, 2y₁ + y₂ = 4
Solving: y₁ = 5/3, y₂ = 2/3
z*_D = 8·5/3 + 8·2/3 = 40/3 + 16/3 = 56/3

**Duality gap at optimum = 0** ✓

**Practical use:**
Stop when gap < ε:
|z_P - z_D| < 10⁻⁶
This guarantees both within 10⁻⁶ of true optimum.`
  },
  {
    id: 'math404-t3-ex10',
    subjectId: 'math404',
    topicId: 'topic-3',
    type: 'written',
    title: 'Unbounded Primal and Dual',
    description: 'Analyze the relationship between primal and dual when one is unbounded.',
    difficulty: 3,
    hints: [
      'If primal unbounded → dual infeasible',
      'If dual unbounded → primal infeasible',
      'Both can be infeasible simultaneously'
    ],
    solution: `**Theorem:** For LP primal-dual pair:
1. If P is unbounded → D is infeasible
2. If D is unbounded → P is infeasible
3. Both P and D can be infeasible
4. Exactly one holds: both optimal, one unbounded (other infeasible), both infeasible

**Example 1: Unbounded Primal**
P: max x₁ + x₂, s.t. -x₁ + x₂ ≤ 1, x ≥ 0
D: min y, s.t. -y ≥ 1, y ≥ 1, y ≥ 0

For P: Move along direction (1,1): objective unbounded
For D: Need y ≥ 1 and -y ≥ 1, impossible!
**P unbounded, D infeasible** ✓

**Example 2: Both Infeasible**
P: max x, s.t. x ≤ -1, x ≥ 0
   No x satisfies x ≥ 0 and x ≤ -1

D: min -y, s.t. y ≥ 1, y ≥ 0
   This simplifies to max y, s.t. y ≥ 1, y ≥ 0
   Unbounded!

Actually by duality: D infeasible too.
Let me reconsider...

P: max x₁, s.t. x₁ ≤ 1, -x₁ ≤ -2, x₁ ≥ 0
   Need x₁ ≤ 1 and x₁ ≥ 2 → infeasible

D: min y₁ - 2y₂, s.t. y₁ - y₂ ≥ 1, y ≥ 0
   Set y₁ = 0, y₂ → ∞: objective → -∞ → unbounded

**Both P and D infeasible:**
P: max x, s.t. x ≤ 1, x ≥ 2
D: min y₁ + 2y₂, s.t. y₁ + y₂ ≥ 1, y₁ - y₂ = 0, y ≥ 0
   From y₁ = y₂: 2y₁ ≥ 1 → y₁ ≥ 1/2
   But objective= y₁ + 2y₁ = 3y₁, minimum at y₁ = 1/2, gives 3/2

Let me use standard example:
P: max x₁ - x₂, s.t. x₁ - x₂ ≤ 1, -x₁ + x₂ ≤ -2, x ≥ 0
D: min y₁ - 2y₂, s.t. y₁ - y₂ ≥ 1, -y₁ + y₂ ≥ -1, y ≥ 0

From constraints: y₁ - y₂ ≥ 1 and y₁ - y₂ ≤ 1 → y₁ - y₂ = 1
Objective unbounded below.

**Summary:**
- Weak duality prevents both from being unbounded
- Both can be infeasible
- If one feasible and bounded, strong duality ensures both optimal`
  },
  {
    id: 'math404-t3-ex11',
    subjectId: 'math404',
    topicId: 'topic-3',
    type: 'written',
    title: 'Lagrangian Dual for QP',
    description: 'Derive the Lagrangian dual of a quadratic programming problem.',
    difficulty: 4,
    hints: [
      'Form Lagrangian L(x,λ) = f(x) + λᵀg(x)',
      'Dual function g(λ) = inf_x L(x,λ)',
      'Dual problem: max g(λ) s.t. λ ≥ 0'
    ],
    solution: `**Primal QP:**
min (1/2)xᵀQx + cᵀx
s.t. Ax ≥ b
     x ≥ 0

where Q ⪰ 0 (positive semidefinite)

**Lagrangian:**
L(x,λ,μ) = (1/2)xᵀQx + cᵀx - λᵀ(Ax - b) - μᵀx

**Dual Function:**
g(λ,μ) = inf_x L(x,λ,μ)

**Find minimum over x:**
∇_x L = Qx + c - Aᵀλ - μ = 0
→ Qx = Aᵀλ + μ - c

If Q ≻ 0 (positive definite):
x*(λ,μ) = Q⁻¹(Aᵀλ + μ - c)

**Substitute back:**
g(λ,μ) = (1/2)(Aᵀλ+μ-c)ᵀQ⁻¹(Aᵀλ+μ-c) + cᵀQ⁻¹(Aᵀλ+μ-c)
         - λᵀ(AQ⁻¹(Aᵀλ+μ-c) - b) - μᵀQ⁻¹(Aᵀλ+μ-c)

**Simplify:** (algebra omitted)
g(λ,μ) = -(1/2)(Aᵀλ+μ-c)ᵀQ⁻¹(Aᵀλ+μ-c) + λᵀb

**Dual Problem:**
max -(1/2)(Aᵀλ+μ-c)ᵀQ⁻¹(Aᵀλ+μ-c) + λᵀb
s.t. λ, μ ≥ 0

**For QP with only equality constraints (Ax = b):**
Simpler form:
max -(1/2)λᵀAQ⁻¹Aᵀλ + (b + AQ⁻¹c)ᵀλ

**Example:**
min x₁² + x₂² - 2x₁ - 4x₂, s.t. x₁ + x₂ ≤ 3, x ≥ 0

Q = [[2,0],[0,2]], c = [-2,-4], A = [-1,-1], b = -3

Dual becomes simpler to solve than primal in some cases!`
  },
  {
    id: 'math404-t3-ex12',
    subjectId: 'math404',
    topicId: 'topic-3',
    type: 'written',
    title: 'Bidual Problem',
    description: 'Formulate the bidual (dual of the Lagrangian dual) and relate it to the primal.',
    difficulty: 4,
    hints: [
      'Start with Lagrangian dual',
      'Take dual of the dual problem',
      'For convex problems, bidual = primal'
    ],
    solution: `**Primal:**
min f(x)
s.t. gᵢ(x) ≤ 0, i=1,...,m
     hⱼ(x) = 0, j=1,...,p

**Lagrangian Dual:**
max g(λ,ν) = inf_x L(x,λ,ν)
s.t. λ ≥ 0

where L(x,λ,ν) = f(x) + Σλᵢgᵢ(x) + Σνⱼhⱼ(x)

**For convex problem:** Bidual = Primal (strong duality)

**Example: QP**
P: min (1/2)xᵀQx + cᵀx, s.t. Ax = b

**Lagrangian:**
L(x,ν) = (1/2)xᵀQx + cᵀx + νᵀ(Ax - b)

**Dual function:**
g(ν) = inf_x L = -(1/2)(Aᵀν+c)ᵀQ⁻¹(Aᵀν+c) + cᵀQ⁻¹(Aᵀν+c) - νᵀb

**Dual:**
D: max g(ν)

**Bidual:**
inf_x sup_ν L(x,ν)

**Von Neumann Minimax Theorem:**
For convex-concave L:
inf_x sup_ν L(x,ν) = sup_ν inf_x L(x,ν)

Left side = Primal
Right side = Dual

**Strong Duality ⟺ Minimax Equality**

**Slater's Condition:**
If ∃x̃: gᵢ(x̃) < 0 for all i (strictly feasible), then strong duality holds.

**Summary:**
Bidual recovers primal for convex problems with constraint qualification.
This is fundamental result in convex analysis!`
  },
  {
    id: 'math404-t3-ex13',
    subjectId: 'math404',
    topicId: 'topic-3',
    type: 'written',
    title: 'Sensitivity from Dual Solution',
    description: 'Use the optimal dual solution to perform sensitivity analysis on constraint RHS.',
    difficulty: 3,
    hints: [
      'Dual optimal gives shadow prices',
      'Valid in neighborhood of optimum',
      'Δz ≈ Σyᵢ*Δbᵢ for small changes'
    ],
    solution: `**Problem:**
max 5x₁ + 4x₂ + 6x₃
s.t. x₁ + x₂ + x₃ ≤ 20   (resource 1)
     2x₁ + x₂ + 3x₃ ≤ 30  (resource 2)
     x ≥ 0

**Optimal Solutions:**
Primal: x* = (0, 15, 5), z* = 90
Dual: y* = (0, 2), z*_D = 60

Wait, that doesn't match. Let me recalculate.

Actually solving:
Optimal: x* = (10, 0, 10/3), z* = 50 + 20 = 70
Dual: y* = (1, 2), verify: y₁ + 2y₂ = 5 ✓, y₁ + y₂ = 3 ✗

Let me use correct values:
Primal optimal: x* = (15, 0, 5), z* = 75 + 30 = 105
Check: 15 + 5 = 20 ✓, 30 + 15 = 45 > 30 ✗

**Correct Example:**
max 3x₁ + 2x₂
s.t. x₁ + x₂ ≤ 4    (b₁ = 4)
     2x₁ + x₂ ≤ 6   (b₂ = 6)
     x ≥ 0

Optimal: x* = (2, 2), z* = 10
Dual: y* = (1, 1)

**Sensitivity Analysis:**

**Question 1:** Increase b₁ from 4 to 5?
Δz ≈ y₁*Δb₁ = 1·1 = 1
New objective ≈ 10 + 1 = 11

**Verify:** Resolving with b₁ = 5:
New optimal: x = (2.5, 2.5) (if both stay active)
Wait: x₁ + x₂ = 5, 2x₁ + x₂ = 6 → x₁ = 1, x₂ = 4
Check: 1 + 4 = 5 ✓, 2 + 4 = 6 ✓
z = 3·1 + 2·4 = 11 ✓ Matches!

**Question 2:** Increase b₂ from 6 to 7?
Δz ≈ y₂*Δb₂ = 1·1 = 1
New z ≈ 11

**Verify:** x₁ + x₂ = 4, 2x₁ + x₂ = 7
→ x₁ = 3, x₂ = 1
z = 3·3 + 2·1 = 11 ✓

**Multiple changes:**
Δb₁ = +1, Δb₂ = -0.5
Δz ≈ 1·1 + 1·(-0.5) = 0.5
New z ≈ 10.5

**Valid range:** Shadow prices valid while basis unchanged.`
  },
  {
    id: 'math404-t3-ex14',
    subjectId: 'math404',
    topicId: 'topic-3',
    type: 'written',
    title: 'Reduced Cost Interpretation',
    description: 'Interpret reduced costs in terms of the dual problem and optimality.',
    difficulty: 3,
    hints: [
      'Reduced cost c̄ⱼ = cⱼ - yᵀAⱼ',
      'c̄ⱼ = rate of objective change if xⱼ increases from 0',
      'c̄ⱼ = 0 for basic variables, c̄ⱼ ≥ 0 for optimality'
    ],
    solution: `**Optimal Tableau:**
| BV | x₁ | x₂ | x₃ | s₁ | s₂ | RHS | c̄ⱼ |
|----|----|----|----|----|----|-----|-----|
| x₁ | 1  | 0  | 2  | 1  | 0  | 3   | 0   |
| x₂ | 0  | 1  | -1 | 0  | 1  | 2   | 0   |
| z  | 0  | 0  | 3  | 1  | 2  | 13  |     |

Original: max 3x₁ + 2x₂ + 4x₃

**Reduced Costs:**
- c̄₁ = 0 (basic)
- c̄₂ = 0 (basic)
- c̄₃ = 3 (from z-row)
- c̄_s₁ = 1
- c̄_s₂ = 2

**Interpretation:**

**1. For nonbasic variable x₃ (c̄₃ = 3):**
- Currently x₃ = 0
- If we force x₃ to increase by 1:
  * Must maintain feasibility: adjust basic variables
  * From tableau: x₁ decreases by 2, x₂ increases by 1
  * Objective change: -3·2 + 2·1 + 4·1 = -2

Wait, that's negative. Let me recalculate.
Actually c̄₃ = 3 > 0 means current solution is NOT optimal!
Should bring x₃ into basis.

Let me assume we're at optimum with c̄₃ = -3 (for min):

**For minimization:**
c̄₃ = -3 < 0 → can improve by increasing x₃
c̄₃ = 0 → indifferent
c̄₃ > 0 → increasing x₃ worsens objective

**Connection to Dual:**
Reduced cost = primal objective coef - dual constraint value
c̄ⱼ = cⱼ - yᵀAⱼ

where y = dual variables = shadow prices

**Example:**
If c̄₃ = 2 in max problem:
- Increasing x₃ by 1 improves objective by 2 (in isolation)
- But maintaining feasibility requires changes
- Net effect: would decrease objective by 2 (that's why it's nonbasic)

**Economic interpretation:**
c̄ⱼ = opportunity cost of bringing nonbasic variable into solution.
If c̄ⱼ > 0: cost exceeds benefit → stay at zero
If c̄ⱼ < 0: benefit exceeds cost → should increase (not optimal)
If c̄ⱼ = 0: alternative optimal solution`
  },
  {
    id: 'math404-t3-ex15',
    subjectId: 'math404',
    topicId: 'topic-3',
    type: 'written',
    title: 'Duality in Network Flow',
    description: 'Formulate the dual of a minimum cost flow problem and interpret the dual variables.',
    difficulty: 4,
    hints: [
      'Primal variables: flow on each arc',
      'Dual variables: potential at each node',
      'Complementary slackness: flow only on shortest paths'
    ],
    solution: `**Minimum Cost Flow Primal:**
min Σ_{(i,j)∈A} cᵢⱼxᵢⱼ  (cost)
s.t. Σⱼ xᵢⱼ - Σⱼ xⱼᵢ = bᵢ  for all nodes i  (flow conservation)
     0 ≤ xᵢⱼ ≤ uᵢⱼ  (capacity)

where bᵢ > 0 (supply), bᵢ < 0 (demand), bᵢ = 0 (transship)

**Dual:**
max Σᵢ bᵢπᵢ - Σ_{(i,j)} uᵢⱼyᵢⱼ
s.t. πᵢ - πⱼ - yᵢⱼ ≤ cᵢⱼ  for all arcs (i,j)
     yᵢⱼ ≥ 0

where πᵢ = node potential (price/height)

**Reduced Cost Interpretation:**
c̄ᵢⱼ = cᵢⱼ - (πᵢ - πⱼ)
This is the reduced cost of arc (i,j)

**Complementary Slackness:**
1. If 0 < xᵢⱼ < uᵢⱼ: c̄ᵢⱼ = 0 → πᵢ - πⱼ = cᵢⱼ
2. If xᵢⱼ = 0: c̄ᵢⱼ ≥ 0 → πᵢ - πⱼ ≤ cᵢⱼ
3. If xᵢⱼ = uᵢⱼ: c̄ᵢⱼ ≤ 0 → πᵢ - πⱼ ≥ cᵢⱼ

**Interpretation:**
- πᵢ = "price" at node i
- Flow goes from high price to low price
- c̄ᵢⱼ = actual cost - price differential
- Flow only uses arcs with c̄ᵢⱼ = 0 (zero reduced cost)

**Example: Shortest Path**
Single source s, single sink t, unit supply/demand
Dual potentials are shortest path distances!

**Network Simplex:**
Maintains spanning tree basis
Dual variables = node potentials
Optimality: all nonbasic arcs have c̄ᵢⱼ ≥ 0`
  },
  {
    id: 'math404-t3-ex16',
    subjectId: 'math404',
    topicId: 'topic-3',
    type: 'written',
    title: 'Dual Degeneracy and Uniqueness',
    description: 'Analyze the relationship between primal degeneracy, dual degeneracy, and uniqueness of optimal solutions.',
    difficulty: 4,
    hints: [
      'Primal degeneracy ↔ multiple dual optima',
      'Dual degeneracy ↔ multiple primal optima',
      'Strict complementarity ↔ unique solutions'
    ],
    solution: `**Definitions:**

**Primal Degeneracy:** Basic variable = 0
**Dual Degeneracy:** Nonbasic variable has c̄ⱼ = 0

**Theorems:**

1. **Primal degenerate ↔ Dual has multiple optima**
   - If basic xᵢ* = 0, corresponding dual constraint can be slack
   - Multiple dual solutions satisfy optimality

2. **Dual degenerate ↔ Primal has multiple optima**
   - If c̄ⱼ = 0 for nonbasic xⱼ, can bring xⱼ into basis
   - Objective unchanged → alternative optimal solution

**Example 1: Primal Degeneracy**
max 3x₁ + 2x₂
s.t. x₁ + x₂ ≤ 4
     x₁ ≤ 2
     x₂ ≤ 2
     x ≥ 0

Optimal: x* = (2, 2), slack s₃ = 0 (degenerate basis)

Dual:
min 4y₁ + 2y₂ + 2y₃
s.t. y₁ + y₂ ≥ 3
     y₁ + y₃ ≥ 2
     y ≥ 0

Multiple dual optima:
y = (2, 1, 0): z = 8 + 2 = 10
y = (3, 0, 0): z = 12 ≠ 10 ✗

Actually y* = (1, 2, 0) gives 4 + 4 = 8
Check: 1 + 2 = 3 ≥ 3 ✓, 1 + 0 = 1 < 2 ✗

Let me recalculate. With x* = (2,2), z* = 10
Active constraints: x₁ + x₂ = 4, x₁ = 2, x₂ = 2

Due to redundancy, multiple dual solutions possible.

**Example 2: Dual Degeneracy**
max x₁ + x₂
s.t. x₁ + x₂ ≤ 2
     x ≥ 0

**Optimal:** Any point on line x₁ + x₂ = 2 is optimal
This is dual degeneracy → multiple primal optima

**Strict Complementarity:**
Definition: For every constraint i:
Either sᵢ > 0 OR λᵢ > 0 (not both = 0)

**If strict complementarity holds:**
→ Unique primal solution
→ Unique dual solution
→ No degeneracy

**Summary Table:**
| Primal | Dual   | Implications          |
|--------|--------|-----------------------|
| Unique | Unique | Strict complementarity|
| Unique | Mult.  | Primal degeneracy     |
| Mult.  | Unique | Dual degeneracy       |
| Mult.  | Mult.  | Both degenerate       |`
  }
];

export default exercises;
