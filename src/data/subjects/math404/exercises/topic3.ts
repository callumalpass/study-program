import type { WrittenExercise } from '../../../../core/types';

export const exercises: WrittenExercise[] = [
  {
    id: 'math404-t3-ex1',
    subjectId: 'math404',
    topicId: 'topic-3',
    type: 'written',
    title: 'Convex Set Verification',
    description: 'Prove that the intersection of two convex sets is convex.',
    difficulty: 2,
    hints: [
      'Use the definition of convex set',
      'Take any two points in the intersection',
      'Show their convex combination is in both sets'
    ],
    solution: `**Proof:**

Let C₁ and C₂ be convex sets. We show C₁ ∩ C₂ is convex.

Take any x, y ∈ C₁ ∩ C₂ and λ ∈ [0,1].

Since x, y ∈ C₁ and C₁ is convex:
λx + (1-λ)y ∈ C₁

Since x, y ∈ C₂ and C₂ is convex:
λx + (1-λ)y ∈ C₂

Therefore: λx + (1-λ)y ∈ C₁ ∩ C₂

By definition, C₁ ∩ C₂ is convex. ∎

**Note:** This extends to arbitrary intersections. The intersection of any collection of convex sets is convex.`
  },
  {
    id: 'math404-t3-ex2',
    subjectId: 'math404',
    topicId: 'topic-3',
    type: 'written',
    title: 'Convex Function Composition',
    description: 'Determine conditions under which g(f(x)) is convex.',
    difficulty: 3,
    hints: [
      'Consider the composition rules for convex functions',
      'g(f(x)) is convex if g is convex and nondecreasing, f is convex',
      'Or if g is convex and nonincreasing, f is concave'
    ],
    solution: `**Composition Rules:**

Let h(x) = g(f(x)) where g: ℝ → ℝ and f: ℝⁿ → ℝ.

**h is convex if:**
1. g is convex, g is nondecreasing, f is convex
2. g is convex, g is nonincreasing, f is concave

**Examples:**

1. h(x) = eˣ²
   - g(t) = eᵗ (convex, increasing)
   - f(x) = x² (convex)
   → h is convex ✓

2. h(x) = 1/x for x > 0
   - g(t) = 1/t (convex, decreasing for t > 0)
   - f(x) = x (affine, both convex and concave)
   → h is convex ✓

3. h(x) = log(x²)
   - g(t) = log(t) (concave, increasing)
   - f(x) = x² (convex)
   → Neither rule applies; h is not convex`
  },
  {
    id: 'math404-t3-ex3',
    subjectId: 'math404',
    topicId: 'topic-3',
    type: 'written',
    title: 'KKT Conditions Application',
    description: 'Solve a constrained optimization problem using KKT conditions.',
    difficulty: 4,
    hints: [
      'Write the Lagrangian L(x,λ,μ)',
      'Apply stationarity: ∇ₓL = 0',
      'Check primal feasibility, dual feasibility, and complementary slackness'
    ],
    solution: `**Problem:** min x₁² + x₂², s.t. x₁ + x₂ ≥ 1

**Lagrangian:** L = x₁² + x₂² - λ(x₁ + x₂ - 1)

**KKT Conditions:**
1. Stationarity: 2x₁ - λ = 0, 2x₂ - λ = 0
2. Primal feasibility: x₁ + x₂ ≥ 1
3. Dual feasibility: λ ≥ 0
4. Complementary slackness: λ(x₁ + x₂ - 1) = 0

**Solution:**
From stationarity: x₁ = x₂ = λ/2

Case 1: λ = 0 → x₁ = x₂ = 0, violates x₁ + x₂ ≥ 1

Case 2: λ > 0 → constraint active: x₁ + x₂ = 1
λ/2 + λ/2 = 1 → λ = 1
x₁ = x₂ = 1/2

**Verify:** All KKT conditions satisfied.
**Optimal solution:** x* = (1/2, 1/2), f* = 1/2`
  }
];

export default exercises;
