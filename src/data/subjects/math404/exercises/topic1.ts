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
  }
];

export default exercises;
