import type { WrittenExercise } from '../../../../core/types';

export const exercises: WrittenExercise[] = [
  {
    id: 'math404-t5-ex1',
    subjectId: 'math404',
    topicId: 'topic-5',
    type: 'written',
    title: 'Gradient Descent Convergence',
    description: 'Analyze the convergence rate of gradient descent for a quadratic function.',
    difficulty: 2,
    hints: [
      'For quadratics, convergence depends on condition number κ',
      'Rate = (κ-1)/(κ+1) where κ = λ_max/λ_min',
      'Step size α should be less than 2/λ_max'
    ],
    solution: `**Problem:** f(x) = (1/2)xᵀQx - bᵀx, Q = [[4, 0], [0, 1]]

**Analysis:**
- λ_max = 4, λ_min = 1
- Condition number κ = 4
- Optimal step size α = 2/(λ_max + λ_min) = 2/5 = 0.4

**Convergence rate:** r = (κ-1)/(κ+1) = 3/5 = 0.6

**After k iterations:**
||x_k - x*|| ≤ (0.6)^k ||x_0 - x*||

**Example:** Starting 100 units from optimum:
- After 10 iterations: 100 × (0.6)^10 ≈ 0.6 units
- After 20 iterations: 100 × (0.6)^20 ≈ 0.004 units

**For ε-accuracy:** k ≥ log(1/ε)/log(1/r) ≈ 2.0 × log(1/ε)`
  },
  {
    id: 'math404-t5-ex2',
    subjectId: 'math404',
    topicId: 'topic-5',
    type: 'written',
    title: 'Newton Method Iteration',
    description: 'Perform one Newton iteration for an unconstrained problem.',
    difficulty: 3,
    hints: [
      'Newton update: x_{k+1} = x_k - H⁻¹∇f',
      'H is the Hessian matrix',
      'For quadratics, Newton converges in one step'
    ],
    solution: `**Problem:** min f(x,y) = x² + 2y² + xy - 2x - 3y

**Gradient:** ∇f = [2x + y - 2, 4y + x - 3]ᵀ

**Hessian:** H = [[2, 1], [1, 4]]

**At x₀ = (0, 0):**
∇f(x₀) = [-2, -3]ᵀ

**Invert Hessian:**
det(H) = 8 - 1 = 7
H⁻¹ = (1/7)[[4, -1], [-1, 2]]

**Newton step:**
Δx = -H⁻¹∇f = (1/7)[4·2 - 1·3, -1·2 + 2·3]ᵀ
    = (1/7)[5, 4]ᵀ = (5/7, 4/7)

**New point:** x₁ = (5/7, 4/7)

**Verify:** ∇f(x₁) = [10/7 + 4/7 - 2, 16/7 + 5/7 - 3] = [0, 0]

Newton found the exact optimum in one iteration!`
  },
  {
    id: 'math404-t5-ex3',
    subjectId: 'math404',
    topicId: 'topic-5',
    type: 'written',
    title: 'Backtracking Line Search',
    description: 'Apply backtracking line search to find a suitable step size.',
    difficulty: 3,
    hints: [
      'Armijo condition: f(x - αd) ≤ f(x) - cα∇fᵀd',
      'Start with α = 1 and reduce by factor β',
      'Typical parameters: c = 0.0001, β = 0.5'
    ],
    solution: `**Problem:** f(x) = x², x₀ = 2, d = -∇f(x₀) = -4

**Parameters:** c = 0.5, β = 0.5

**Armijo condition:**
f(x - αd) ≤ f(x) - c·α·||∇f||²
f(2 + 4α) ≤ 4 - 0.5·α·16 = 4 - 8α

**Try α = 1:**
f(6) = 36, compare to 4 - 8 = -4
36 > -4 ✗

**Try α = 0.5:**
f(4) = 16, compare to 4 - 4 = 0
16 > 0 ✗

**Try α = 0.25:**
f(3) = 9, compare to 4 - 2 = 2
9 > 2 ✗

**Try α = 0.125:**
f(2.5) = 6.25, compare to 4 - 1 = 3
6.25 > 3 ✗

**Try α = 0.0625:**
f(2.25) = 5.0625, compare to 4 - 0.5 = 3.5
5.0625 > 3.5 ✗

With c = 0.1:
**Try α = 0.25:** 9 ≤ 4 - 0.4 = 3.6 ✗
**Try α = 0.5:** 16 ≤ 4 - 0.8 = 3.2 ✗

Accept α = 0.25, x₁ = 2 - 0.25·4 = 1`
  }
];

export default exercises;
