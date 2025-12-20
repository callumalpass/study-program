import type { WrittenExercise } from '../../../../core/types';

export const exercises: WrittenExercise[] = [
  {
    id: 'math404-t5-ex01',
    subjectId: 'math404',
    topicId: 'math404-topic-5',
    type: 'written',
    title: 'Gradient Descent Update',
    description: 'Perform gradient descent iterations on a simple quadratic function.',
    difficulty: 1,
    hints: [
      'The update rule is x_{k+1} = x_k - α∇f(x_k)',
      'For quadratic f, gradient is linear in x',
      'Choose step size carefully to ensure convergence'
    ],
    solution: `**Problem:** Minimize f(x) = x² starting from x₀ = 4, step size α = 0.3

**Gradient:** ∇f(x) = 2x

**Iteration 1:**
x₁ = x₀ - α∇f(x₀)
   = 4 - 0.3 × 2 × 4
   = 4 - 2.4
   = 1.6

**Iteration 2:**
x₂ = x₁ - α∇f(x₁)
   = 1.6 - 0.3 × 2 × 1.6
   = 1.6 - 0.96
   = 0.64

**Iteration 3:**
x₃ = 0.64 - 0.3 × 2 × 0.64
   = 0.64 - 0.384
   = 0.256

**Pattern:** x_k = (1 - 2α)^k × x₀ = (0.4)^k × 4

**Convergence:** |1 - 2α| = 0.4 < 1, so converges.

**After k iterations:** x_k = 4 × (0.4)^k → 0 as k → ∞

**Verification:** Optimal x* = 0, f(x*) = 0 ✓`
  },
  {
    id: 'math404-t5-ex02',
    subjectId: 'math404',
    topicId: 'math404-topic-5',
    type: 'written',
    title: 'Gradient Computation',
    description: 'Compute the gradient of a multivariate function and verify it using the definition.',
    difficulty: 1,
    hints: [
      'Gradient is the vector of partial derivatives',
      'For f: ℝⁿ → ℝ, ∇f = [∂f/∂x₁, ..., ∂f/∂xₙ]ᵀ',
      'Check by computing directional derivative'
    ],
    solution: `**Function:** f(x,y) = x²y + 3xy² - 2x + y

**Compute gradient:**
∂f/∂x = 2xy + 3y² - 2
∂f/∂y = x² + 6xy + 1

**Gradient:** ∇f(x,y) = [2xy + 3y² - 2, x² + 6xy + 1]ᵀ

**At point (1, 2):**
∇f(1,2) = [2(1)(2) + 3(4) - 2, 1 + 6(1)(2) + 1]ᵀ
        = [4 + 12 - 2, 1 + 12 + 1]ᵀ
        = [14, 14]ᵀ

**Verification using definition:**
Directional derivative in direction u = [1,0]:
lim_{h→0} [f(1+h, 2) - f(1,2)]/h
= lim_{h→0} [(1+h)²(2) + 3(1+h)(4) - 2(1+h) + 2 - (2 + 12 - 2 + 2)]/h
= lim_{h→0} [2(1+2h+h²) + 12 + 12h - 2 - 2h + 2 - 14]/h
= lim_{h→0} [4h + 2h² + 12h - 2h]/h = 14 ✓

**Steepest ascent direction:** ∇f(1,2)/||∇f(1,2)|| = [1/√2, 1/√2]ᵀ`
  },
  {
    id: 'math404-t5-ex03',
    subjectId: 'math404',
    topicId: 'math404-topic-5',
    type: 'written',
    title: 'Condition Number and Convergence',
    description: 'Analyze how the condition number affects gradient descent convergence rate.',
    difficulty: 2,
    hints: [
      'Condition number κ = λ_max/λ_min for quadratic functions',
      'Convergence rate is (κ-1)/(κ+1)',
      'Higher condition number means slower convergence'
    ],
    solution: `**Problem:** f(x) = (1/2)xᵀQx where Q has eigenvalues 1 and 100.

**Condition number:**
κ = λ_max/λ_min = 100/1 = 100

**Convergence rate for gradient descent:**
r = (κ-1)/(κ+1) = 99/101 ≈ 0.98

**Analysis:**
After k iterations: ||x_k - x*|| ≤ r^k ||x₀ - x*||

**For ε-accuracy (error ≤ ε||x₀ - x*||):**
Need r^k ≤ ε
k ≥ log(1/ε)/log(1/r)
k ≥ log(1/ε)/(1-r) ≈ log(1/ε) × (κ+1)/2

**Example:**
For ε = 10⁻⁶:
k ≥ 6 × ln(10) × 101/2 ≈ 697 iterations

**Comparison with well-conditioned problem:**
If κ = 2: r = 1/3, k ≥ 6 × ln(10) × 3/2 ≈ 21 iterations

**Conclusion:**
- High condition number = slow convergence
- This is the "zig-zag" behavior in elongated level sets
- Preconditioning or Newton's method can help`
  },
  {
    id: 'math404-t5-ex04',
    subjectId: 'math404',
    topicId: 'math404-topic-5',
    type: 'written',
    title: 'Newton\'s Method Iteration',
    description: 'Perform one iteration of Newton\'s method for optimization and compare to gradient descent.',
    difficulty: 2,
    hints: [
      'Newton update: x_{k+1} = x_k - H⁻¹∇f',
      'For quadratics, Newton converges in one step',
      'Need to compute and invert the Hessian'
    ],
    solution: `**Problem:** Minimize f(x,y) = x² + 2y² - xy

**Gradient:**
∇f = [2x - y, 4y - x]ᵀ

**Hessian:**
H = [[2, -1], [-1, 4]]

**Hessian inverse:**
det(H) = 8 - 1 = 7
H⁻¹ = (1/7)[[4, 1], [1, 2]]

**Starting point:** x₀ = (3, 1)

**Newton iteration:**
∇f(x₀) = [2(3) - 1, 4(1) - 3]ᵀ = [5, 1]ᵀ

Δx = -H⁻¹∇f(x₀) = -(1/7)[[4,1],[1,2]][5,1]ᵀ
   = -(1/7)[20+1, 5+2]ᵀ = -(1/7)[21, 7]ᵀ = [-3, -1]ᵀ

x₁ = x₀ + Δx = (3,1) + (-3,-1) = (0, 0)

**Verify optimality:**
∇f(0,0) = [0, 0]ᵀ ✓

**Newton found exact optimum in ONE iteration!**

**Gradient descent comparison:**
With α = 0.2:
x₁ = (3,1) - 0.2[5,1] = (2, 0.8)
Still far from optimum after 1 iteration.

**Convergence:**
- Newton: quadratic convergence (error squares each iteration)
- GD: linear convergence (error reduces by constant factor)`
  },
  {
    id: 'math404-t5-ex05',
    subjectId: 'math404',
    topicId: 'math404-topic-5',
    type: 'written',
    title: 'Exact Line Search',
    description: 'Derive the optimal step size for gradient descent using exact line search.',
    difficulty: 3,
    hints: [
      'Exact line search: α* = argmin_α f(x - α∇f(x))',
      'For quadratics, this has a closed-form solution',
      'Set derivative with respect to α to zero'
    ],
    solution: `**Problem:** f(x) = (1/2)xᵀQx - bᵀx

Find optimal step size α at point x with descent direction d = -∇f(x) = b - Qx.

**Line search problem:**
min_α f(x + αd)

**Expand:**
f(x + αd) = (1/2)(x + αd)ᵀQ(x + αd) - bᵀ(x + αd)
          = (1/2)xᵀQx + α xᵀQd + (α²/2)dᵀQd - bᵀx - αbᵀd

**Differentiate with respect to α:**
d/dα f(x + αd) = xᵀQd + αdᵀQd - bᵀd
               = dᵀQx + αdᵀQd - dᵀb
               = dᵀ(Qx - b) + αdᵀQd
               = -dᵀd + αdᵀQd  (since d = b - Qx)

**Wait, let me recalculate with d = -∇f = -(Qx - b) = b - Qx:**
d/dα = (Qx - b)ᵀd + αdᵀQd = -||d||² + αdᵀQd

**Set to zero:**
α* = ||d||²/(dᵀQd) = ||∇f||²/(∇fᵀQ∇f)

**For steepest descent (d = -∇f):**
**α* = ∇fᵀ∇f / (∇fᵀQ∇f)**

**Example:**
Q = [[2, 0], [0, 8]], x = (1, 1)
∇f = Qx = [2, 8]
α* = (4 + 64)/(4×2 + 64×8) = 68/520 ≈ 0.131

**Properties:**
- Exact line search guarantees descent
- Successive gradients are orthogonal: ∇f_{k+1}ᵀ∇f_k = 0
- Optimal for quadratics with exact arithmetic`
  },
  {
    id: 'math404-t5-ex06',
    subjectId: 'math404',
    topicId: 'math404-topic-5',
    type: 'written',
    title: 'Backtracking Line Search',
    description: 'Implement the Armijo backtracking line search and verify sufficient decrease.',
    difficulty: 3,
    hints: [
      'Armijo condition: f(x - αd) ≤ f(x) - cα∇fᵀd',
      'Start with α = 1 and reduce by factor β until condition holds',
      'Typical values: c = 0.0001, β = 0.5'
    ],
    solution: `**Armijo-Goldstein Condition:**
f(x_k - α d_k) ≤ f(x_k) - c α ∇f(x_k)ᵀd_k

where d_k is descent direction, typically d_k = ∇f(x_k).

**Algorithm:**
1. Set α = 1, c = 10⁻⁴, β = 0.5
2. While f(x - αd) > f(x) - cα||d||²:
     α ← βα
3. Return α

**Example:**
f(x) = (x-2)⁴, x₀ = 0, d = -f'(x₀) = -4(0-2)³ = 32

**Check α = 1:**
f(0 - 1×32) = f(-32) = (-34)⁴ ≈ 1.3 × 10⁶
f(0) - 0.0001×1×32² = 16 - 0.1 = 15.9
1.3×10⁶ > 15.9 ✗

**Check α = 0.5:**
f(-16) = (-18)⁴ = 104,976
Still much > 15.9 ✗

**Continue reducing...**

**α = 0.0625:**
f(-2) = (-4)⁴ = 256
f(0) - 0.0001×0.0625×1024 = 16 - 0.0064 ≈ 16
256 > 16 ✗

**α = 0.03125:**
f(-1) = (-3)⁴ = 81
16 - 0.0032 ≈ 16
81 > 16 ✗

**α = 0.01:**
f(-0.32) = (-2.32)⁴ ≈ 29
16 - 0.001 ≈ 16
29 > 16 ✗

Eventually we find suitable α.

**Key insight:** Backtracking ensures sufficient decrease per iteration.`
  },
  {
    id: 'math404-t5-ex07',
    subjectId: 'math404',
    topicId: 'math404-topic-5',
    type: 'written',
    title: 'Momentum in Gradient Descent',
    description: 'Compare gradient descent with and without momentum on a poorly conditioned problem.',
    difficulty: 3,
    hints: [
      'Momentum update: v_{k+1} = βv_k + ∇f(x_k), x_{k+1} = x_k - αv_{k+1}',
      'Momentum accelerates convergence in consistent directions',
      'Typical β = 0.9'
    ],
    solution: `**Problem:** f(x,y) = (1/2)(x² + 100y²) (condition number κ = 100)

**Standard GD with α = 0.01:**
Starting at (10, 1):
∇f = [10, 200]
x₁ = (10, 1) - 0.01[10, 200] = (9.9, -1)
x₂ = (9.9, -1) - 0.01[9.9, -200] = (9.801, 1)
...oscillates slowly

**Gradient Descent with Momentum (β = 0.9):**
v₀ = 0
∇f(x₀) = [10, 200]

**Iteration 1:**
v₁ = 0.9×0 + [10, 200] = [10, 200]
x₁ = (10, 1) - 0.01[10, 200] = (9.9, -1)

**Iteration 2:**
v₂ = 0.9[10, 200] + [9.9, -200] = [9 + 9.9, 180 - 200] = [18.9, -20]
x₂ = (9.9, -1) - 0.01[18.9, -20] = (9.711, -0.8)

**Iteration 3:**
v₃ = 0.9[18.9, -20] + [9.711, -80] = [17.01 + 9.711, -18 - 80] = [26.7, -98]
x₃ = (9.711, -0.8) - 0.01[26.7, -98] = (9.44, 0.18)

**Comparison:**
- Without momentum: x-coordinate decreases slowly
- With momentum: acceleration in x-direction, damping in y-direction

**Theory:**
With optimal momentum, convergence rate improves from:
(κ-1)/(κ+1) to (√κ-1)/(√κ+1)

For κ = 100:
- Without momentum: r = 0.98
- With momentum: r = 0.82`
  },
  {
    id: 'math404-t5-ex08',
    subjectId: 'math404',
    topicId: 'math404-topic-5',
    type: 'written',
    title: 'Quasi-Newton BFGS Update',
    description: 'Perform one BFGS update to approximate the inverse Hessian.',
    difficulty: 4,
    hints: [
      'BFGS maintains an approximation H_k ≈ (∇²f)⁻¹',
      'Update uses secant condition: H_{k+1}y_k = s_k',
      'Formula: H_{k+1} = (I - ρsy^T)H_k(I - ρys^T) + ρss^T'
    ],
    solution: `**BFGS Update Formula:**
H_{k+1} = (I - ρsyᵀ)H_k(I - ρysᵀ) + ρssᵀ

where:
- s = x_{k+1} - x_k (step)
- y = ∇f_{k+1} - ∇f_k (gradient change)
- ρ = 1/(yᵀs)

**Example:**
H₀ = I (identity initialization)
x₀ = (2, 1), x₁ = (1, 0.5)
∇f₀ = (4, 2), ∇f₁ = (2, 1)

**Compute s and y:**
s = x₁ - x₀ = (-1, -0.5)
y = ∇f₁ - ∇f₀ = (-2, -1)

**Compute ρ:**
yᵀs = (-2)(-1) + (-1)(-0.5) = 2 + 0.5 = 2.5
ρ = 1/2.5 = 0.4

**Compute intermediate terms:**
syᵀ = [[-1], [-0.5]] × [[-2, -1]] = [[2, 1], [1, 0.5]]
ysᵀ = [[-2], [-1]] × [[-1, -0.5]] = [[2, 1], [1, 0.5]]
ssᵀ = [[1, 0.5], [0.5, 0.25]]

**Update:**
(I - ρsyᵀ) = [[1-0.8, -0.4], [-0.4, 1-0.2]] = [[0.2, -0.4], [-0.4, 0.8]]

H₁ = [[0.2, -0.4], [-0.4, 0.8]] × I × [[0.2, -0.4], [-0.4, 0.8]]ᵀ + 0.4×ssᵀ
   = [[0.2, -0.4], [-0.4, 0.8]]² + 0.4[[1, 0.5], [0.5, 0.25]]
   = [[0.04+0.16, -0.08-0.32], [-0.08-0.32, 0.16+0.64]] + [[0.4, 0.2], [0.2, 0.1]]
   = [[0.2+0.4, -0.4+0.2], [-0.4+0.2, 0.8+0.1]]
   = [[0.6, -0.2], [-0.2, 0.9]]

**Verification:** H₁y = s
[[0.6, -0.2], [-0.2, 0.9]][[-2],[-1]] = [[-1.2+0.2], [0.4-0.9]] = [[-1], [-0.5]] = s ✓`
  },
  {
    id: 'math404-t5-ex09',
    subjectId: 'math404',
    topicId: 'math404-topic-5',
    type: 'written',
    title: 'Conjugate Gradient Method',
    description: 'Apply conjugate gradient to minimize a quadratic function.',
    difficulty: 4,
    hints: [
      'CG generates Q-conjugate directions: dᵢᵀQdⱼ = 0',
      'For n-dimensional quadratic, converges in at most n steps',
      'Update: d_k = -g_k + β_k d_{k-1}'
    ],
    solution: `**Problem:** Minimize f(x) = (1/2)xᵀQx - bᵀx
where Q = [[2, 1], [1, 2]], b = [1, 0]ᵀ

**Conjugate Gradient Algorithm:**

**Initialization:** x₀ = (0, 0)
g₀ = Qx₀ - b = -[1, 0]ᵀ = [-1, 0]ᵀ
d₀ = -g₀ = [1, 0]ᵀ

**Iteration 1:**
α₀ = g₀ᵀg₀ / (d₀ᵀQd₀)
   = 1 / ([1,0][[2,1],[1,2]][1,0]ᵀ)
   = 1 / [1,0][2,1]ᵀ = 1/2

x₁ = x₀ + α₀d₀ = (0,0) + 0.5(1,0) = (0.5, 0)

g₁ = Qx₁ - b = [[2,1],[1,2]][0.5,0]ᵀ - [1,0]ᵀ = [1,0.5]ᵀ - [1,0]ᵀ = [0, 0.5]ᵀ

β₁ = g₁ᵀg₁ / g₀ᵀg₀ = 0.25 / 1 = 0.25

d₁ = -g₁ + β₁d₀ = [0, -0.5]ᵀ + 0.25[1, 0]ᵀ = [0.25, -0.5]ᵀ

**Iteration 2:**
α₁ = g₁ᵀg₁ / (d₁ᵀQd₁)
d₁ᵀQd₁ = [0.25, -0.5][[2,1],[1,2]][0.25, -0.5]ᵀ
       = [0.25, -0.5][0.5-0.5, 0.25-1]ᵀ = [0.25, -0.5][0, -0.75]ᵀ = 0.375

α₁ = 0.25/0.375 = 2/3

x₂ = x₁ + α₁d₁ = (0.5, 0) + (2/3)(0.25, -0.5) = (0.5 + 1/6, -1/3) = (2/3, -1/3)

**Verify:** g₂ = Q x₂ - b = [[2,1],[1,2]][2/3,-1/3]ᵀ - [1,0]ᵀ = [4/3-1/3, 2/3-2/3]ᵀ - [1,0]ᵀ = [0,0]ᵀ ✓

**Solution:** x* = (2/3, -1/3)
CG converged exactly in n = 2 iterations!`
  },
  {
    id: 'math404-t5-ex10',
    subjectId: 'math404',
    topicId: 'math404-topic-5',
    type: 'written',
    title: 'Convergence Rate Analysis',
    description: 'Prove the linear convergence rate of gradient descent for strongly convex functions.',
    difficulty: 4,
    hints: [
      'Strong convexity: f(y) ≥ f(x) + ∇f(x)ᵀ(y-x) + (m/2)||y-x||²',
      'Smoothness: ||∇f(x) - ∇f(y)|| ≤ L||x-y||',
      'Contraction: ||x_{k+1} - x*|| ≤ (1 - m/L)||x_k - x*||'
    ],
    solution: `**Assumptions:**
- f is m-strongly convex: ∇²f ⪰ mI
- f is L-smooth: ∇²f ⪯ LI
- Condition number: κ = L/m

**Gradient Descent:** x_{k+1} = x_k - (1/L)∇f(x_k)

**Theorem:** ||x_{k+1} - x*||² ≤ (1 - 1/κ)||x_k - x*||²

**Proof sketch:**
By L-smoothness:
f(x_{k+1}) ≤ f(x_k) + ∇f(x_k)ᵀ(x_{k+1} - x_k) + (L/2)||x_{k+1} - x_k||²
         = f(x_k) - (1/L)||∇f(x_k)||² + (1/2L)||∇f(x_k)||²
         = f(x_k) - (1/2L)||∇f(x_k)||²

By strong convexity:
||∇f(x_k)||² ≥ 2m(f(x_k) - f*)

Combining:
f(x_{k+1}) - f* ≤ (1 - m/L)(f(x_k) - f*)

**Corollary:** After k iterations:
f(x_k) - f* ≤ (1 - 1/κ)^k (f(x₀) - f*)

**For ε-accuracy:**
k ≥ κ log(1/ε)

**Example:**
κ = 100, ε = 10⁻⁶
k ≥ 100 × 6 × ln(10) ≈ 1382 iterations

**Optimal step size:** α = 1/L (not 2/(m+L))
With α = 2/(m+L): rate = (κ-1)/(κ+1) (slightly better)`
  },
  {
    id: 'math404-t5-ex11',
    subjectId: 'math404',
    topicId: 'math404-topic-5',
    type: 'written',
    title: 'Stochastic Gradient Descent',
    description: 'Analyze the convergence of stochastic gradient descent for finite-sum problems.',
    difficulty: 4,
    hints: [
      'SGD uses a random gradient estimate instead of full gradient',
      'For f(x) = (1/n)Σfᵢ(x), use ∇fᵢ(x) for random i',
      'Convergence is O(1/k) for convex, O(1/√k) for general'
    ],
    solution: `**Problem:** min f(x) = (1/n)Σᵢ₌₁ⁿ fᵢ(x)

**SGD Update:**
1. Sample i uniformly from {1,...,n}
2. x_{k+1} = x_k - α_k ∇fᵢ(x_k)

**Key property:** E[∇fᵢ(x)] = ∇f(x) (unbiased estimate)

**Variance:** E[||∇fᵢ - ∇f||²] = σ²

**Convergence for strongly convex f:**

**Constant step size α = 1/L:**
lim_{k→∞} E[f(x_k) - f*] = O(σ²/m)
(Does not converge to optimum!)

**Decreasing step size α_k = 1/(m·k):**
E[f(x_k) - f*] ≤ O(σ²/(mk))
(Converges but slowly)

**Mini-batch SGD:**
Use batch of size B: ∇ ≈ (1/B)Σⱼ∈B ∇fⱼ
Reduces variance by factor B

**Comparison for n = 10⁶, ε = 10⁻⁴:**

| Method | Cost per iteration | Iterations | Total cost |
|--------|-------------------|------------|------------|
| GD     | n                 | O(κ log 1/ε) | n × κ log 1/ε |
| SGD    | 1                 | O(κ/ε)     | κ/ε        |

SGD wins when n > κ log(1/ε)/ε

**Variance reduction (SVRG, SAGA):**
Achieve O(κ log 1/ε) complexity with O(1) per-iteration cost!`
  },
  {
    id: 'math404-t5-ex12',
    subjectId: 'math404',
    topicId: 'math404-topic-5',
    type: 'written',
    title: 'Proximal Gradient Method',
    description: 'Apply the proximal gradient method to minimize a composite objective.',
    difficulty: 5,
    hints: [
      'For f(x) + g(x) where g is non-smooth, use prox_g',
      'Proximal operator: prox_g(y) = argmin_x{g(x) + (1/2)||x-y||²}',
      'Update: x_{k+1} = prox_{αg}(x_k - α∇f(x_k))'
    ],
    solution: `**Problem:** min (1/2)||Ax - b||² + λ||x||₁

f(x) = (1/2)||Ax - b||² (smooth)
g(x) = λ||x||₁ (non-smooth)

**Proximal operator for L1:**
prox_{λ||·||₁}(y) = soft-threshold(y, λ)
[prox(y)]ᵢ = sign(yᵢ) × max(|yᵢ| - λ, 0)

**Proximal Gradient (ISTA):**
1. Gradient step: z_k = x_k - α AᵀA(Ax_k - b)
2. Proximal step: x_{k+1} = soft-threshold(z_k, αλ)

**Example:** A = I, b = [3, -1]ᵀ, λ = 0.5, α = 1

**Iteration 1:** x₀ = (0, 0)
Gradient step: z₀ = (0, 0) - 1×(0 - [3, -1]) = (3, -1)
Proximal step: x₁ = (max(3-0.5, 0), -max(1-0.5, 0)) = (2.5, -0.5)

**Iteration 2:**
z₁ = (2.5, -0.5) - 1×([2.5, -0.5] - [3, -1]) = (2.5, -0.5) - (-0.5, 0.5) = (3, -1)
x₂ = (2.5, -0.5)

**Converged!** x* = (2.5, -0.5)

**Verification:**
∇f(x*) = x* - b = (-0.5, 0.5)
Subgradient of g: ∂g(x*) = λ × sign(x*) = (0.5, -0.5)
∇f + ∂g ∋ 0 ✓

**Acceleration (FISTA):** Achieves O(1/k²) vs O(1/k)`
  },
  {
    id: 'math404-t5-ex13',
    subjectId: 'math404',
    topicId: 'math404-topic-5',
    type: 'written',
    title: 'Nesterov Acceleration',
    description: 'Derive and analyze Nesterov\'s accelerated gradient method.',
    difficulty: 5,
    hints: [
      'Achieves O(1/k²) for convex, vs O(1/k) for standard GD',
      'Uses momentum with look-ahead gradient',
      'Optimal for first-order methods'
    ],
    solution: `**Nesterov Accelerated Gradient (NAG):**

**Algorithm:**
y_k = x_k + β_k(x_k - x_{k-1})  (momentum step)
x_{k+1} = y_k - α∇f(y_k)        (gradient step)

where β_k = (k-1)/(k+2) or β_k = (√κ - 1)/(√κ + 1)

**Key insight:** Compute gradient at "look-ahead" point y_k, not x_k

**Comparison:**

**Standard GD:**
Error: f(x_k) - f* ≤ O(L||x₀ - x*||²/k)
Rate: O(1/k)

**NAG:**
Error: f(x_k) - f* ≤ O(L||x₀ - x*||²/k²)
Rate: O(1/k²)

**For strongly convex:**

**Standard GD:**
f(x_k) - f* ≤ (1 - 1/κ)^k (f(x₀) - f*)

**NAG:**
f(x_k) - f* ≤ (1 - 1/√κ)^k (f(x₀) - f*)

**Example:** κ = 100
- GD: need k ≈ 100 × ln(10⁶) ≈ 1382 for ε = 10⁻⁶
- NAG: need k ≈ 10 × ln(10⁶) ≈ 138 for ε = 10⁻⁶

**10× fewer iterations!**

**Optimality:**
Nesterov showed this rate is optimal for first-order methods:
Any method using only gradient information requires Ω(√κ log(1/ε)) iterations.

**Implementation:**
\`\`\`
x, x_old = x0, x0
for k in range(K):
    y = x + (k-1)/(k+2) * (x - x_old)
    x_old = x
    x = y - alpha * grad_f(y)
\`\`\``
  },
  {
    id: 'math404-t5-ex14',
    subjectId: 'math404',
    topicId: 'math404-topic-5',
    type: 'written',
    title: 'Coordinate Descent',
    description: 'Apply coordinate descent to minimize a separable objective function.',
    difficulty: 3,
    hints: [
      'Update one coordinate at a time',
      'For separable problems, each update is a 1D optimization',
      'Cyclic or randomized coordinate selection'
    ],
    solution: `**Problem:** min f(x₁, x₂) = x₁² + 2x₂² + x₁x₂

**Coordinate Descent:**
At each step, minimize over one coordinate holding others fixed.

**Update rule for coordinate i:**
xᵢ ← argmin_{xᵢ} f(x₁, ..., xᵢ, ..., xₙ)

**For our problem:**
∂f/∂x₁ = 2x₁ + x₂ = 0 → x₁ = -x₂/2
∂f/∂x₂ = 4x₂ + x₁ = 0 → x₂ = -x₁/4

**Starting point:** x₀ = (4, 4)

**Iteration 1:**
Update x₁: x₁ = -x₂/2 = -4/2 = -2
After: x = (-2, 4)

Update x₂: x₂ = -x₁/4 = -(-2)/4 = 0.5
After: x = (-2, 0.5)

**Iteration 2:**
Update x₁: x₁ = -0.5/2 = -0.25
After: x = (-0.25, 0.5)

Update x₂: x₂ = -(-0.25)/4 = 0.0625
After: x = (-0.25, 0.0625)

**Pattern:**
After each full cycle, x₁ reduces by factor 1/8:
x₁^(k) = (−1/8)^k × x₁^(0)

**Convergence:** x* = (0, 0)

**When coordinate descent works well:**
1. Separable or nearly separable objectives
2. Each coordinate update is cheap
3. High-dimensional problems where full gradient is expensive

**Randomized CD:**
Pick coordinate uniformly at random each iteration.
Often better bounds than cyclic CD.`
  },
  {
    id: 'math404-t5-ex15',
    subjectId: 'math404',
    topicId: 'math404-topic-5',
    type: 'written',
    title: 'Trust Region Method',
    description: 'Solve a trust region subproblem and adjust the trust region radius.',
    difficulty: 5,
    hints: [
      'Solve min m_k(p) s.t. ||p|| ≤ Δ_k',
      'm_k(p) = f_k + g_kᵀp + (1/2)pᵀH_kp',
      'Adjust Δ based on actual vs predicted reduction'
    ],
    solution: `**Trust Region Subproblem:**
min m(p) = f + gᵀp + (1/2)pᵀHp
s.t. ||p|| ≤ Δ

**Case 1: Unconstrained minimizer inside trust region**
If H ≻ 0 and ||H⁻¹g|| ≤ Δ:
  p* = -H⁻¹g (Newton step)

**Case 2: Constrained to boundary**
p*(λ) = -(H + λI)⁻¹g for some λ ≥ 0
Choose λ such that ||p*(λ)|| = Δ

**Example:**
f = 10, g = [2, 1]ᵀ, H = [[1, 0], [0, 2]], Δ = 1

**Check unconstrained:**
p_Newton = -H⁻¹g = -[[1,0],[0,0.5]][2,1]ᵀ = [-2, -0.5]ᵀ
||p_Newton|| = √(4 + 0.25) ≈ 2.06 > 1 = Δ

**Constrain to boundary:**
Need ||-(H + λI)⁻¹g|| = 1

For λ = 1:
H + I = [[2,0],[0,3]]
p = -[[0.5,0],[0,0.33]][2,1]ᵀ = [-1, -0.33]ᵀ
||p|| = √(1 + 0.11) ≈ 1.05 > 1

For λ = 1.2:
p ≈ [-0.91, -0.31]ᵀ, ||p|| ≈ 0.96 < 1

Solve exactly: ||p(λ)|| = 1

**Radius adjustment:**
ρ = (f(x) - f(x + p))/(m(0) - m(p)) (actual/predicted reduction)

If ρ < 0.25: Δ ← Δ/4 (contract)
If ρ > 0.75 and ||p|| = Δ: Δ ← min(2Δ, Δ_max) (expand)
Accept step if ρ > η (typically η = 0.1)

**Advantages:**
- Global convergence guarantee
- Handles indefinite Hessians
- Naturally adapts step size`
  },
  {
    id: 'math404-t5-ex16',
    subjectId: 'math404',
    topicId: 'math404-topic-5',
    type: 'written',
    title: 'L-BFGS Method',
    description: 'Describe the limited-memory BFGS method and its memory efficiency.',
    difficulty: 5,
    hints: [
      'Stores only last m pairs (s_i, y_i) instead of full Hessian',
      'Uses two-loop recursion to compute H_k∇f efficiently',
      'Typical m = 3-20'
    ],
    solution: `**L-BFGS Motivation:**
- BFGS stores n×n matrix H_k (O(n²) memory)
- For large n, this is prohibitive
- L-BFGS uses only O(mn) memory

**Storage:**
Keep last m pairs:
{(s_{k-m}, y_{k-m}), ..., (s_{k-1}, y_{k-1})}
where s_i = x_{i+1} - x_i, y_i = ∇f_{i+1} - ∇f_i

**Two-Loop Recursion:**

**Forward loop (compute coefficients):**
q ← ∇f_k
for i = k-1, k-2, ..., k-m:
  ρᵢ = 1/(yᵢᵀsᵢ)
  αᵢ = ρᵢ sᵢᵀ q
  q ← q - αᵢ yᵢ

**Scale:**
H⁰ = γI where γ = (s_{k-1}ᵀy_{k-1})/(y_{k-1}ᵀy_{k-1})
r ← H⁰ q = γq

**Backward loop (apply corrections):**
for i = k-m, ..., k-1:
  β = ρᵢ yᵢᵀ r
  r ← r + sᵢ(αᵢ - β)

return -r

**Complexity:**
- Memory: O(mn)
- Per iteration: O(mn) vs O(n²) for full BFGS

**Typical parameters:**
m = 10 works well for most problems

**Comparison (n = 10,000):**
| Method | Memory | Per-iteration |
|--------|--------|---------------|
| GD     | O(n)   | O(n)          |
| BFGS   | O(n²)  | O(n²)         |
| L-BFGS | O(mn)  | O(mn)         |

For n = 10,000, m = 10:
- BFGS: 100M entries
- L-BFGS: 200K entries (500× smaller)

**When to use:**
- Large-scale smooth optimization
- When Hessian is too expensive to compute/store
- Works well with line search`
  }
];

export default exercises;
