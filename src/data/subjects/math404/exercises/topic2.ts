import type { WrittenExercise } from '../../../../core/types';

export const exercises: WrittenExercise[] = [
  {
    id: 'math404-t2-ex1',
    subjectId: 'math404',
    topicId: 'topic-2',
    type: 'written',
    title: 'LP Standard Form Conversion',
    description: 'Convert a linear program with inequality constraints to standard form.',
    difficulty: 2,
    hints: [
      'Standard form requires Ax = b with x ≥ 0',
      'Add slack variables for ≤ constraints',
      'Subtract surplus variables for ≥ constraints',
      'Replace free variables x with x⁺ - x⁻'
    ],
    solution: `**Problem:** Convert to standard form:
max 3x₁ + 2x₂
s.t. x₁ + x₂ ≤ 4
     2x₁ + x₂ ≥ 2
     x₁ ≥ 0, x₂ free

**Solution:**
1. Convert max to min: min -3x₁ - 2x₂
2. Add slack s₁: x₁ + x₂ + s₁ = 4
3. Subtract surplus s₂: 2x₁ + x₂ - s₂ = 2
4. Replace x₂ = x₂⁺ - x₂⁻

**Standard form:**
min -3x₁ - 2x₂⁺ + 2x₂⁻
s.t. x₁ + x₂⁺ - x₂⁻ + s₁ = 4
     2x₁ + x₂⁺ - x₂⁻ - s₂ = 2
     x₁, x₂⁺, x₂⁻, s₁, s₂ ≥ 0`
  },
  {
    id: 'math404-t2-ex2',
    subjectId: 'math404',
    topicId: 'topic-2',
    type: 'written',
    title: 'Simplex Method Iteration',
    description: 'Perform one iteration of the simplex method on a given tableau.',
    difficulty: 3,
    hints: [
      'Select entering variable with most negative coefficient in objective row',
      'Use minimum ratio test to select leaving variable',
      'Pivot to create new basic feasible solution'
    ],
    solution: `**Simplex Iteration:**

Initial tableau:
| BV  | x₁ | x₂ | s₁ | s₂ | RHS |
|-----|----|----|----|----|-----|
| s₁  | 1  | 2  | 1  | 0  | 8   |
| s₂  | 4  | 1  | 0  | 1  | 12  |
| z   | -3 | -2 | 0  | 0  | 0   |

1. **Entering**: x₁ (most negative: -3)
2. **Leaving**: min(8/1, 12/4) = 3 → s₂ leaves
3. **Pivot** on row 2, column 1

After pivoting:
| BV  | x₁ | x₂   | s₁ | s₂  | RHS |
|-----|----|----- |----|----|------|
| s₁  | 0  | 7/4  | 1  |-1/4| 5    |
| x₁  | 1  | 1/4  | 0  |1/4 | 3    |
| z   | 0  |-5/4  | 0  |3/4 | 9    |

Current solution: x₁ = 3, x₂ = 0, z = 9`
  },
  {
    id: 'math404-t2-ex3',
    subjectId: 'math404',
    topicId: 'topic-2',
    type: 'written',
    title: 'LP Infeasibility and Unboundedness',
    description: 'Identify whether an LP is infeasible, unbounded, or has a unique optimal solution.',
    difficulty: 4,
    hints: [
      'Check if Phase I finds feasible solution',
      'Unbounded if entering variable has no positive coefficients',
      'Multiple optima if non-basic variable has zero reduced cost'
    ],
    solution: `**Analysis Procedure:**

**Case 1: Infeasibility**
max 2x₁ + 3x₂, s.t. x₁ + x₂ ≤ 2, x₁ + x₂ ≥ 4, x ≥ 0
No x satisfies both constraints → **Infeasible**

**Case 2: Unboundedness**
max 2x₁ + 3x₂, s.t. x₁ - x₂ ≤ 1, x ≥ 0
Moving along direction (0, 1) increases objective unboundedly → **Unbounded**

**Case 3: Unique Optimal**
max x₁ + x₂, s.t. x₁ + 2x₂ ≤ 4, 2x₁ + x₂ ≤ 4, x ≥ 0
Optimal at (4/3, 4/3), objective = 8/3 → **Unique optimal**

**Detection in Simplex:**
- Infeasible: Phase I terminates with artificial variables > 0
- Unbounded: All coefficients in pivot column ≤ 0
- Multiple optima: Zero reduced cost for non-basic variable`
  },
  {
    id: 'math404-t2-ex04',
    subjectId: 'math404',
    topicId: 'topic-2',
    type: 'written',
    title: 'Basic Feasible Solutions',
    description: 'Identify all basic feasible solutions for a given LP and determine which are vertices of the feasible region.',
    difficulty: 3,
    hints: [
      'BFS: Set n-m variables to zero, solve for remaining m',
      'Check if solution satisfies all constraints',
      'Each BFS corresponds to a vertex of the polytope'
    ],
    solution: `**Problem:** x₁ + x₂ + s₁ = 4, 2x₁ + x₂ + s₂ = 6, x, s ≥ 0
(n=4 variables, m=2 equations → 2 basic, 2 nonbasic)

**Finding all BFS:**

**1. x₁, x₂ basic (s₁=s₂=0):**
x₁ + x₂ = 4, 2x₁ + x₂ = 6
→ x₁ = 2, x₂ = 2
Check: x ≥ 0 ✓ → **BFS at (2,2)**

**2. x₁, s₁ basic (x₂=s₂=0):**
x₁ + s₁ = 4, 2x₁ = 6
→ x₁ = 3, s₁ = 1
Check: x₁, s₁ ≥ 0 ✓ → **BFS at (3,0)**

**3. x₁, s₂ basic (x₂=s₁=0):**
x₁ = 4, 2x₁ + s₂ = 6
→ x₁ = 4, s₂ = -2
Check: s₂ < 0 ✗ → **Not feasible**

**4. x₂, s₁ basic (x₁=s₂=0):**
x₂ + s₁ = 4, x₂ = 6
→ x₂ = 6, s₁ = -2
Check: s₁ < 0 ✗ → **Not feasible**

**5. x₂, s₂ basic (x₁=s₁=0):**
x₂ = 4, x₂ + s₂ = 6
→ x₂ = 4, s₂ = 2
Check: x₂, s₂ ≥ 0 ✓ → **BFS at (0,4)**

**6. s₁, s₂ basic (x₁=x₂=0):**
s₁ = 4, s₂ = 6
Check: s ≥ 0 ✓ → **BFS at (0,0)**

**Vertices:** (0,0), (3,0), (2,2), (0,4)`
  },
  {
    id: 'math404-t2-ex05',
    subjectId: 'math404',
    topicId: 'topic-2',
    type: 'written',
    title: 'Graphical LP Solution',
    description: 'Solve a 2-variable LP problem graphically by plotting constraints and identifying the optimal vertex.',
    difficulty: 2,
    hints: [
      'Plot each constraint as a line',
      'Shade the feasible region',
      'Evaluate objective at each vertex',
      'Optimal solution is at a vertex'
    ],
    solution: `**Problem:** max 3x₁ + 2x₂
s.t. x₁ + x₂ ≤ 4
     2x₁ + x₂ ≤ 6
     x₁, x₂ ≥ 0

**Step 1: Plot constraints**
- x₁ + x₂ = 4: passes through (4,0) and (0,4)
- 2x₁ + x₂ = 6: passes through (3,0) and (0,6)
- x₁ ≥ 0: right of y-axis
- x₂ ≥ 0: above x-axis

**Step 2: Find vertices**
- (0, 0): origin
- (3, 0): intersection of 2x₁ + x₂ = 6 and x₂ = 0
- (2, 2): intersection of x₁ + x₂ = 4 and 2x₁ + x₂ = 6
  Solving: x₁ + x₂ = 4, 2x₁ + x₂ = 6 → x₁ = 2, x₂ = 2
- (0, 4): intersection of x₁ + x₂ = 4 and x₁ = 0

**Step 3: Evaluate objective**
| Vertex | z = 3x₁ + 2x₂ |
|--------|---------------|
| (0,0)  | 0             |
| (3,0)  | 9             |
| (2,2)  | 10            |
| (0,4)  | 8             |

**Optimal:** x* = (2, 2), z* = 10`
  },
  {
    id: 'math404-t2-ex06',
    subjectId: 'math404',
    topicId: 'topic-2',
    type: 'written',
    title: 'Slack Variables and Standard Form',
    description: 'Convert an LP with mixed constraints to standard form by introducing slack and surplus variables.',
    difficulty: 2,
    hints: [
      'Add slack for ≤ constraints',
      'Subtract surplus for ≥ constraints',
      'Replace free variables with difference of non-negative variables'
    ],
    solution: `**Original Problem:**
max 2x₁ + 3x₂ - x₃
s.t. x₁ + 2x₂ + x₃ ≤ 10
     3x₁ - x₂ ≥ 5
     x₁ - x₃ = 2
     x₁, x₂ ≥ 0, x₃ free

**Step 1: Convert to minimization**
min -2x₁ - 3x₂ + x₃

**Step 2: Handle constraints**
- ≤ constraint: add slack s₁
  x₁ + 2x₂ + x₃ + s₁ = 10, s₁ ≥ 0
- ≥ constraint: subtract surplus s₂
  3x₁ - x₂ - s₂ = 5, s₂ ≥ 0
- = constraint: keep as is
  x₁ - x₃ = 2

**Step 3: Handle free variable**
Replace x₃ = x₃⁺ - x₃⁻ where x₃⁺, x₃⁻ ≥ 0

**Standard Form:**
min -2x₁ - 3x₂ + x₃⁺ - x₃⁻
s.t. x₁ + 2x₂ + x₃⁺ - x₃⁻ + s₁ = 10
     3x₁ - x₂ - s₂ = 5
     x₁ - x₃⁺ + x₃⁻ = 2
     x₁, x₂, x₃⁺, x₃⁻, s₁, s₂ ≥ 0

**Matrix form:** min cᵀx s.t. Ax = b, x ≥ 0
where x = [x₁, x₂, x₃⁺, x₃⁻, s₁, s₂]ᵀ`
  },
  {
    id: 'math404-t2-ex07',
    subjectId: 'math404',
    topicId: 'topic-2',
    type: 'written',
    title: 'Degeneracy in Simplex',
    description: 'Identify degenerate basic feasible solutions and explain their impact on the simplex algorithm.',
    difficulty: 3,
    hints: [
      'Degeneracy: more than n-m variables are zero',
      'Can cause cycling in simplex',
      'Bland\'s rule prevents cycling'
    ],
    solution: `**Definition:**
A BFS is degenerate if more than n-m variables are zero (some basic variables = 0).

**Example:** Consider x₁ + x₂ + s₁ = 4, x₁ + x₂ + s₂ = 4, x ≥ 0

**BFS with x₁, s₁ basic:**
Set x₂ = s₂ = 0: x₁ + s₁ = 4, x₁ = 4
→ x₁ = 4, s₁ = 0
This is **degenerate** (3 variables zero instead of 2)

**Impact on Simplex:**
1. **Zero pivot:** Minimum ratio test may give tie
2. **No improvement:** Objective may not change
3. **Cycling possible:** Algorithm may revisit same basis

**Example of cycling:**
Consider highly degenerate LP:
max -3x₄ + 20x₅ - (1/2)x₆ + 6x₇
s.t. (1/4)x₄ - 8x₅ - x₆ + 9x₇ ≤ 0
     (1/2)x₄ - 12x₅ - (1/2)x₆ + 3x₇ ≤ 0
     x₇ ≤ 1

Without anti-cycling rules, simplex can cycle through:
Basis 1 → Basis 2 → Basis 3 → ... → Basis 1 (never terminating)

**Prevention: Bland's Rule**
- Choose smallest index entering variable among candidates
- Choose smallest index leaving variable in case of ties
- Guarantees finite termination

**Geometric interpretation:**
Degeneracy occurs when more than n constraints intersect at a vertex.`
  },
  {
    id: 'math404-t2-ex08',
    subjectId: 'math404',
    topicId: 'topic-2',
    type: 'written',
    title: 'Revised Simplex Method',
    description: 'Apply the revised simplex method using basis matrix operations.',
    difficulty: 4,
    hints: [
      'Maintain basis matrix B and its inverse B⁻¹',
      'Compute reduced costs: c̄ⱼ = cⱼ - cᴮᵀB⁻¹Aⱼ',
      'Update B⁻¹ efficiently using rank-1 updates'
    ],
    solution: `**Problem:** min cᵀx s.t. Ax = b, x ≥ 0

**Revised Simplex Key Ideas:**
Instead of full tableau, maintain only:
- Basis B and B⁻¹
- Basic solution xᴮ = B⁻¹b
- Dual variables y = cᴮᵀB⁻¹

**Algorithm:**

**1. Pricing:**
For each nonbasic j:
  c̄ⱼ = cⱼ - yᵀAⱼ = cⱼ - cᴮᵀB⁻¹Aⱼ
If all c̄ⱼ ≥ 0: STOP (optimal)
Else: select entering variable k with c̄ₖ < 0

**2. Ratio test:**
Compute d = B⁻¹Aₖ (direction)
θ = min{xᴮᵢ/dᵢ : dᵢ > 0}
Select leaving variable at position achieving minimum

**3. Update basis:**
Replace leaving column in B with Aₖ
Update B⁻¹ using Sherman-Morrison or recompute

**Example:**
A = [[1,1,1,0], [2,1,0,1]], b = [4,6], c = [-3,-2,0,0]
Initial basis: B = [[1,0],[0,1]] (columns 3,4)

**Iteration 1:**
- xᴮ = B⁻¹b = [4,6]
- y = cᴮᵀB⁻¹ = [0,0]
- c̄₁ = -3 - 0 = -3 < 0 → enter x₁
- d = B⁻¹A₁ = [1,2]
- θ = min{4/1, 6/2} = 3 → x₄ leaves
- New basis: columns {3,1}

**Advantage:** Sparse matrices → much faster for large LPs`
  },
  {
    id: 'math404-t2-ex09',
    subjectId: 'math404',
    topicId: 'topic-2',
    type: 'written',
    title: 'Sensitivity Analysis: RHS Changes',
    description: 'Analyze how changes in the right-hand side affect the optimal solution and objective value.',
    difficulty: 3,
    hints: [
      'Shadow price = dual variable value',
      'Valid for changes keeping basis optimal',
      'Recompute xᴮ = B⁻¹b for new b'
    ],
    solution: `**Optimal Tableau:**
| BV | x₁ | x₂ | s₁ | s₂ | RHS |
|----|----|----|----|----|-----|
| x₁ | 1  | 0  | 2  | -1 | 2   |
| x₂ | 0  | 1  | -1 | 2  | 3   |
| z  | 0  | 0  | 1  | 2  | 13  |

Dual variables: y₁ = 1, y₂ = 2 (shadow prices)

**Question:** What if b₁ changes from 4 to 4 + Δ₁?

**Analysis:**
New RHS = B⁻¹(b + Δ)
From tableau: B⁻¹ = [[2,-1],[-1,2]]

If b₁ increases by 1:
New xᴮ = [[2,-1],[-1,2]][[5],[6]] = [[4],[7]]

**Feasibility range:**
Need xᴮ ≥ 0:
2(4+Δ₁) - 6 ≥ 0 → Δ₁ ≥ -1
-(4+Δ₁) + 2·6 ≥ 0 → Δ₁ ≤ 8
Range: -1 ≤ Δ₁ ≤ 8

**Objective change:**
Δz = y₁Δ₁ = 1·Δ₁
If Δ₁ = 2: z increases by 2

**Multiple RHS changes:**
Δz = y₁Δ₁ + y₂Δ₂
Valid only if new xᴮ ≥ 0

**Economic interpretation:**
Shadow price yᵢ = marginal value of resource i
Increasing bᵢ by 1 unit increases optimal profit by yᵢ (within valid range).`
  },
  {
    id: 'math404-t2-ex10',
    subjectId: 'math404',
    topicId: 'topic-2',
    type: 'written',
    title: 'Sensitivity Analysis: Objective Coefficients',
    description: 'Determine the range of an objective coefficient that maintains the current optimal basis.',
    difficulty: 3,
    hints: [
      'Reduced cost c̄ⱼ = cⱼ - cᴮᵀB⁻¹Aⱼ',
      'Need c̄ⱼ ≥ 0 for all nonbasic j',
      'For basic variable: affects cᴮ, recalculate all c̄ⱼ'
    ],
    solution: `**Optimal Tableau:**
| BV | x₁ | x₂ | s₁ | s₂ | RHS | c̄ⱼ |
|----|----|----|----|----|-----|-----|
| x₁ | 1  | 0  | 2  | -1 | 2   |  -  |
| x₂ | 0  | 1  | -1 | 2  | 3   |  -  |
| z  | 0  | 0  | 1  | 2  | 13  | 0   |

Original: max 3x₁ + 2x₂
Current basis: {x₁, x₂}

**Question 1: Range for c₁**
Let c₁ = 3 + Δ
Need: c̄ⱼ ≥ 0 for all nonbasic {s₁, s₂}

c̄ₛ₁ = 0 - [(3+Δ), 2][[2],[-1]] = -(6+2Δ-2) = -(4+2Δ)
Need: 4+2Δ ≥ 0 → Δ ≥ -2 → **c₁ ≥ 1**

c̄ₛ₂ = 0 - [(3+Δ), 2][[-1],[2]] = -(-3-Δ+4) = -(1-Δ)
Need: 1-Δ ≥ 0 → Δ ≤ 1 → **c₁ ≤ 4**

**Range: 1 ≤ c₁ ≤ 4**

**Question 2: Range for c₂**
Let c₂ = 2 + Δ

c̄ₛ₁ = 0 - [3, (2+Δ)][[2],[-1]] = -(6-2-Δ) = -(4-Δ)
Need: 4-Δ ≥ 0 → **c₂ ≤ 6**

c̄ₛ₂ = 0 - [3, (2+Δ)][[-1],[2]] = -(-3+4+2Δ) = -(1+2Δ)
Need: 1+2Δ ≥ 0 → **c₂ ≥ -1/2**

**Range: -1/2 ≤ c₂ ≤ 6**

**Outside range:** Basis changes, need to re-solve LP`
  },
  {
    id: 'math404-t2-ex11',
    subjectId: 'math404',
    topicId: 'topic-2',
    type: 'written',
    title: 'Two-Phase Simplex Method',
    description: 'Apply the two-phase simplex method to find an initial basic feasible solution.',
    difficulty: 4,
    hints: [
      'Phase I: Minimize sum of artificial variables',
      'Add artificial variables for = and ≥ constraints',
      'Phase II: Use Phase I solution as starting BFS'
    ],
    solution: `**Problem:**
min 2x₁ + 3x₂
s.t. x₁ + x₂ = 4
     2x₁ + x₂ ≥ 5
     x₁, x₂ ≥ 0

**Phase I: Find initial BFS**

Add artificial variables a₁, a₂:
min a₁ + a₂
s.t. x₁ + x₂ + a₁ = 4
     2x₁ + x₂ - s₂ + a₂ = 5
     x, s, a ≥ 0

**Initial tableau:**
| BV | x₁ | x₂ | s₂ | a₁ | a₂ | RHS |
|----|----|----|----|----|-----|-----|
| a₁ | 1  | 1  | 0  | 1  | 0   | 4   |
| a₂ | 2  | 1  | -1 | 0  | 1   | 5   |
| w  | -3 | -2 | 1  | 0  | 0   | -9  |

(w-row formed by: 0 - (1+2)x₁ - (1+1)x₂ - (-1)s₂)

**Iteration 1:** x₁ enters, a₂ leaves
**Iteration 2:** x₂ enters, a₁ leaves

**Final Phase I tableau:**
All artificial variables nonbasic, w = 0
BFS: x₁ = 1, x₂ = 3

**Phase II: Optimize original objective**
Use x₁ = 1, x₂ = 3 as starting BFS
Minimize 2x₁ + 3x₂

**Result:**
Optimal: x₁ = 1, x₂ = 3, z* = 11

**Note:** If Phase I ends with artificial variables > 0, problem is infeasible.`
  },
  {
    id: 'math404-t2-ex12',
    subjectId: 'math404',
    topicId: 'topic-2',
    type: 'written',
    title: 'Big-M Method',
    description: 'Solve an LP using the Big-M method as an alternative to two-phase simplex.',
    difficulty: 3,
    hints: [
      'Add artificial variables with large penalty M',
      'Single phase with modified objective',
      'M should be large enough to force artificials to zero'
    ],
    solution: `**Problem:**
min x₁ + 2x₂
s.t. x₁ + x₂ = 3
     2x₁ + x₂ ≥ 4
     x₁, x₂ ≥ 0

**Big-M Formulation:**
Add artificials a₁, a₂ with penalty M:
min x₁ + 2x₂ + M·a₁ + M·a₂
s.t. x₁ + x₂ + a₁ = 3
     2x₁ + x₂ - s + a₂ = 4
     x, s, a ≥ 0

**Initial tableau:**
| BV | x₁    | x₂    | s  | a₁ | a₂ | RHS |
|----|-------|-------|----|----|-----|-----|
| a₁ | 1     | 1     | 0  | 1  | 0   | 3   |
| a₂ | 2     | 1     | -1 | 0  | 1   | 4   |
| z  |-1-3M |-2-2M  | M  | 0  | 0   | -7M |

**Simplex iterations:**
M is very large → most negative coefficient is -1-3M
Enter x₁, leave a₂

After pivoting:
| BV | x₁ | x₂   | s    | a₁ | a₂   | RHS |
|----|-----|------|------|----|------|-----|
| a₁ | 0  | 1/2  | 1/2  | 1  |-1/2  | 1   |
| x₁ | 1  | 1/2  |-1/2  | 0  | 1/2  | 2   |
| z  | 0  |-1-M/2| M/2-1| 0  |1+3M/2| 2-4M|

Continue until all artificials are driven out.

**Final:** x₁ = 2, x₂ = 1, z* = 4
(Artificials a₁ = a₂ = 0)

**Practical M:** M = 10⁶ typically sufficient
**Numerical issues:** Large M can cause ill-conditioning`
  },
  {
    id: 'math404-t2-ex13',
    subjectId: 'math404',
    topicId: 'topic-2',
    type: 'written',
    title: 'Transportation Problem',
    description: 'Formulate and solve a transportation problem as a special structured LP.',
    difficulty: 3,
    hints: [
      'Variables: xᵢⱼ = amount shipped from source i to destination j',
      'Supply constraints: Σⱼ xᵢⱼ = sᵢ',
      'Demand constraints: Σᵢ xᵢⱼ = dⱼ',
      'Special structure allows efficient algorithms'
    ],
    solution: `**Problem:**
3 factories supply 4 warehouses
Factories: supplies s₁=20, s₂=30, s₃=25
Warehouses: demands d₁=15, d₂=20, d₃=25, d₄=15
Cost cᵢⱼ to ship from factory i to warehouse j

**LP Formulation:**
min Σᵢ Σⱼ cᵢⱼxᵢⱼ

s.t. Σⱼ xᵢⱼ = sᵢ  for i=1,2,3  (supply)
     Σᵢ xᵢⱼ = dⱼ  for j=1,2,3,4  (demand)
     xᵢⱼ ≥ 0

**Matrix form (cost table):**
|     | W1 | W2 | W3 | W4 | Supply |
|-----|----|----|----|----|--------|
| F1  | 8  | 6  | 10 | 9  | 20     |
| F2  | 9  | 12 | 13 | 7  | 30     |
| F3  | 14 | 9  | 16 | 5  | 25     |
|Demand| 15 | 20 | 25 | 15 | 75     |

**Special Properties:**
- Totally unimodular → BFS has integer values
- m+n-1 basic variables (3+4-1 = 6)
- Network structure → efficient algorithms

**Solution Methods:**
1. **Northwest Corner:** Start at (1,1), allocate max possible
2. **Vogel's Approximation:** Greedy based on penalties
3. **Stepping Stone:** Improvement method
4. **Network Simplex:** Specialized simplex

**Example Solution:**
x₁₁=15, x₁₂=5, x₂₂=15, x₂₄=15, x₃₃=25
Total cost = 8·15 + 6·5 + 12·15 + 7·15 + 16·25 = 805`
  },
  {
    id: 'math404-t2-ex14',
    subjectId: 'math404',
    topicId: 'topic-2',
    type: 'written',
    title: 'Assignment Problem',
    description: 'Formulate the assignment problem as a special case of LP and explain the Hungarian algorithm.',
    difficulty: 3,
    hints: [
      'Binary variables: xᵢⱼ ∈ {0,1}',
      'Each worker assigned to exactly one job',
      'Each job assigned to exactly one worker',
      'LP relaxation has integer optimal solution'
    ],
    solution: `**Problem:**
Assign n workers to n jobs to minimize total cost.
Cost cᵢⱼ for worker i to do job j.

**LP Formulation:**
min Σᵢ Σⱼ cᵢⱼxᵢⱼ
s.t. Σⱼ xᵢⱼ = 1  for all i  (each worker assigned once)
     Σᵢ xᵢⱼ = 1  for all j  (each job done once)
     xᵢⱼ ≥ 0

**Remarkably:** LP relaxation (dropping xᵢⱼ ∈ {0,1}) automatically gives integer solution!

**Cost Matrix Example:**
|        | Job1 | Job2 | Job3 |
|--------|------|------|------|
| Worker1| 10   | 19   | 8    |
| Worker2| 12   | 15   | 13   |
| Worker3| 14   | 13   | 12   |

**Hungarian Algorithm:**

**Step 1: Row reduction**
Subtract minimum of each row:
|   | J1 | J2 | J3 |
|---|----|----|-----|
| W1| 2  | 11 | 0   |
| W2| 0  | 3  | 1   |
| W3| 2  | 1  | 0   |

**Step 2: Column reduction**
Subtract minimum of each column:
|   | J1 | J2 | J3 |
|---|----|----|-----|
| W1| 2  | 10 | 0   |
| W2| 0  | 2  | 1   |
| W3| 2  | 0  | 0   |

**Step 3: Cover zeros**
Try to match using minimum lines. If < n lines needed, continue.

**Step 4: Optimal assignment**
W1→J3, W2→J1, W3→J2
Total cost = 8 + 12 + 13 = 33

**Complexity:** O(n³) vs O(n!) brute force`
  },
  {
    id: 'math404-t2-ex15',
    subjectId: 'math404',
    topicId: 'topic-2',
    type: 'written',
    title: 'Barrier Function for LP',
    description: 'Apply the logarithmic barrier method to solve a simple LP and trace the central path.',
    difficulty: 4,
    hints: [
      'Barrier: φ(x) = -Σ log(bᵢ - aᵢᵀx)',
      'Minimize f(x) = cᵀx + (1/t)φ(x)',
      'As t → ∞, solution approaches LP optimum'
    ],
    solution: `**Problem:** min x s.t. x ≥ 0, x ≤ 1

**Barrier function:**
φ(x) = -log(x) - log(1-x)

**Barrier problem:**
min_t(x) = x - (1/t)[log(x) + log(1-x)]

**Optimality condition:**
f'(x) = 1 + (1/t)[1/x - 1/(1-x)] = 0

Solving:
1 + (1/t)[(1-x-x)/(x(1-x))] = 0
t = -(1-2x)/(x(1-x))
t·x(1-x) = 2x - 1
tx - tx² = 2x - 1
tx² - (t-2)x - 1 = 0

**Central path x*(t):**
x*(t) = [(t-2) + √((t-2)² + 4t)]/(2t)

**Asymptotic behavior:**
As t → ∞:
x*(t) ≈ [(t-2) + √(t²)]/(2t) = [(t-2) + t]/(2t) = (2t-2)/(2t) = 1 - 1/t → 1

**Duality gap:**
Gap = cᵀx - b'ᵀy ≈ 1/t → 0 as t → ∞

**Example values:**
| t   | x*(t) | f(x*) |
|-----|-------|-------|
| 1   | 0.5   | 0.5   |
| 10  | 0.9   | 0.9   |
| 100 | 0.99  | 0.99  |
| ∞   | 1.0   | 1.0   |

**Central path:** Smooth curve from analytic center (t=0: x=0.5) to optimum (x=1)`
  },
  {
    id: 'math404-t2-ex16',
    subjectId: 'math404',
    topicId: 'topic-2',
    type: 'written',
    title: 'Primal-Dual Interior Point Method',
    description: 'Explain the primal-dual interior point algorithm for LP and its advantages over simplex.',
    difficulty: 4,
    hints: [
      'Simultaneously solve primal and dual',
      'Maintain strict feasibility',
      'Newton steps toward KKT conditions',
      'Polynomial complexity: O(√n log(1/ε))'
    ],
    solution: `**LP Primal-Dual Pair:**
Primal: min cᵀx s.t. Ax = b, x ≥ 0
Dual: max bᵀy s.t. Aᵀy + s = c, s ≥ 0

**KKT Conditions:**
1. Aᵀy + s = c
2. Ax = b
3. xᵢsᵢ = 0 for all i (complementarity)
4. x, s ≥ 0

**Primal-Dual Algorithm:**

Replace complementarity xᵢsᵢ = 0 with xᵢsᵢ = μ (barrier parameter)

**Perturbed KKT:**
F(x,y,s,μ) = [Aᵀy + s - c, Ax - b, XSe - μe] = 0
where X = diag(x), S = diag(s), e = [1,...,1]ᵀ

**Newton Step:**
Solve for (Δx, Δy, Δs):
[0   Aᵀ  I] [Δx]   [rₐ]
[A   0   0] [Δy] = -[rᵦ]
[S   0   X] [Δs]   [rμ]

where rₐ = Aᵀy + s - c
      rᵦ = Ax - b
      rμ = XSe - μe

**Update:**
(x,y,s) ← (x,y,s) + α(Δx,Δy,Δs)
α chosen to maintain x,s > 0

**Reduce μ:**
μ ← σμ (typically σ = 0.1)

**Convergence:**
- Each outer iteration: reduce μ by constant factor
- Each outer: O(√n) Newton steps
- Total: O(√n log(1/ε)) iterations

**Advantages over Simplex:**
1. Polynomial worst-case (simplex is exponential)
2. Warm-start for similar problems
3. Exploits sparsity efficiently
4. Parallelizable

**Software:** CPLEX, Gurobi, MOSEK use interior point for large LPs`
  }
];

export default exercises;
