import type { WrittenExercise } from '../../../../core/types';

export const exercises: WrittenExercise[] = [
  {
    id: 'math404-t6-ex1',
    subjectId: 'math404',
    topicId: 'topic-6',
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

**Lagrangian:**
L = (1/2)(x₁² + x₂²) - x₁ - x₂ + λ(x₁ + x₂ - 1) - μ₁x₁ - μ₂x₂

**KKT Stationarity:**
x₁ - 1 + λ - μ₁ = 0
x₂ - 1 + λ - μ₂ = 0

**Try interior solution:** μ₁ = μ₂ = 0, λ > 0
Then x₁ = x₂ = 1 - λ
Constraint active: 2(1-λ) = 1 → λ = 1/2
x₁ = x₂ = 1/2

**Verify:** x₁ + x₂ = 1 ≤ 1 ✓, x ≥ 0 ✓, λ = 1/2 ≥ 0 ✓

**Solution:** x* = (1/2, 1/2), f* = 1/4 - 1 = -3/4`
  },
  {
    id: 'math404-t6-ex2',
    subjectId: 'math404',
    topicId: 'topic-6',
    type: 'written',
    title: 'Penalty Method Convergence',
    description: 'Apply the quadratic penalty method and analyze convergence.',
    difficulty: 3,
    hints: [
      'Penalty function: P_ρ(x) = f(x) + (ρ/2)||c(x)||²',
      'Minimize for increasing sequence of ρ',
      'Solution converges to constrained optimum as ρ → ∞'
    ],
    solution: `**Problem:** min x₁ + x₂ s.t. x₁² + x₂² = 1

**Penalty function:**
P_ρ(x) = x₁ + x₂ + (ρ/2)(x₁² + x₂² - 1)²

**Optimality conditions:**
∂P_ρ/∂xᵢ = 1 + 2ρ(x₁² + x₂² - 1)xᵢ = 0

**By symmetry:** x₁ = x₂ = x
1 + 2ρ(2x² - 1)x = 0

**For large ρ:** Either x ≈ 0 or 2x² ≈ 1

If 2x² = 1: x = ±1/√2
- x = -1/√2 minimizes f = -√2
- x = +1/√2 maximizes f = +√2

**Convergence:**
| ρ    | x*         | f(x*)  | Violation |
|------|------------|--------|-----------|
| 1    | (-0.62,...)| -1.24  | 0.23      |
| 10   | (-0.70,...)| -1.40  | 0.02      |
| 100  | (-0.707,...)| -1.414| 0.002     |

**Limit:** x* = (-1/√2, -1/√2), f* = -√2 ≈ -1.414`
  },
  {
    id: 'math404-t6-ex3',
    subjectId: 'math404',
    topicId: 'topic-6',
    type: 'written',
    title: 'Interior Point Central Path',
    description: 'Describe the barrier method and central path for LP.',
    difficulty: 4,
    hints: [
      'Log barrier: φ(x) = -Σ log(bᵢ - aᵢᵀx)',
      'Central path: x*(t) minimizes f(x) + (1/t)φ(x)',
      'As t → ∞, x*(t) → optimal solution'
    ],
    solution: `**LP:** min cᵀx s.t. Ax ≤ b (m constraints)

**Log barrier:** φ(x) = -Σᵢ₌₁ᵐ log(bᵢ - aᵢᵀx)

**Barrier problem:** min cᵀx + (1/t)φ(x)

**Central path x*(t):**
- For t > 0, x*(t) is the unique minimizer
- x*(t) is strictly feasible (Ax*(t) < b)
- Parameterized curve from analytic center to optimum

**Properties:**
1. Duality gap at x*(t) equals m/t
2. For ε-accuracy: need t ≥ m/ε

**Algorithm (path-following):**
1. Start at x*(t₀) for small t₀
2. Increase t ← μt (typically μ = 10-20)
3. Re-center: compute x*(t) via Newton
4. Stop when m/t < ε

**Complexity:** O(√m log(m/ε)) Newton steps total

**Example:** LP with m = 100 constraints
- μ = 10, ε = 10⁻⁸
- Outer iterations: log₁₀(100/10⁻⁸) = 10
- Each outer: ~10 Newton steps
- Total: ~100 Newton steps`
  }
];

export default exercises;
