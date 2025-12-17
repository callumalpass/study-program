import type { WrittenExercise } from '../../../../core/types';

export const exercises: WrittenExercise[] = [
  {
    id: 'math404-t4-ex1',
    subjectId: 'math404',
    topicId: 'topic-4',
    type: 'written',
    title: 'LP Dual Formulation',
    description: 'Write the dual of a given linear program.',
    difficulty: 2,
    hints: [
      'Each primal constraint gives a dual variable',
      'Each primal variable gives a dual constraint',
      'max ↔ min, ≤ ↔ ≥, and coefficients transpose'
    ],
    solution: `**Primal LP:**
max 3x₁ + 2x₂
s.t. x₁ + 2x₂ ≤ 4
     2x₁ + x₂ ≤ 3
     x₁, x₂ ≥ 0

**Dual LP:**
min 4y₁ + 3y₂
s.t. y₁ + 2y₂ ≥ 3    (from x₁)
     2y₁ + y₂ ≥ 2    (from x₂)
     y₁, y₂ ≥ 0

**General Rules:**
- Primal max → Dual min
- Primal ≤ constraint → Dual variable ≥ 0
- Primal variable ≥ 0 → Dual ≥ constraint
- Transpose coefficient matrix A to Aᵀ
- Swap c and b vectors`
  },
  {
    id: 'math404-t4-ex2',
    subjectId: 'math404',
    topicId: 'topic-4',
    type: 'written',
    title: 'Weak Duality Application',
    description: 'Use weak duality to bound the optimal value of a linear program.',
    difficulty: 3,
    hints: [
      'Any dual feasible solution gives an upper bound on primal max',
      'Any primal feasible solution gives a lower bound on dual min',
      'The duality gap closes at optimality'
    ],
    solution: `**Primal:** max 2x₁ + 3x₂, s.t. x₁ + x₂ ≤ 4, 2x₁ + x₂ ≤ 5, x ≥ 0

**Dual:** min 4y₁ + 5y₂, s.t. y₁ + 2y₂ ≥ 2, y₁ + y₂ ≥ 3, y ≥ 0

**Bounding:**
- Primal feasible: x = (0, 4) → objective = 12 (lower bound)
- Dual feasible: y = (3, 0) → objective = 12 (upper bound)

Since lower bound = upper bound = 12:
**Strong duality:** Both solutions are optimal!

**Verification:**
Complementary slackness:
- y₁ = 3 > 0 → x₁ + x₂ = 4 (active) ✓
- y₂ = 0 → 2x₁ + x₂ can be slack ✓
- x₂ = 4 > 0 → y₁ + y₂ = 3 (active) ✓`
  },
  {
    id: 'math404-t4-ex3',
    subjectId: 'math404',
    topicId: 'topic-4',
    type: 'written',
    title: 'Lagrangian Dual Problem',
    description: 'Derive and solve the Lagrangian dual of a constrained optimization problem.',
    difficulty: 4,
    hints: [
      'Form Lagrangian L(x,λ) = f(x) + λᵀ(Ax - b)',
      'Minimize over x to get g(λ) = inf_x L(x,λ)',
      'Maximize g(λ) subject to λ ≥ 0'
    ],
    solution: `**Primal:** min ||x||² s.t. Ax = b

**Lagrangian:** L(x,λ) = xᵀx + λᵀ(Ax - b)

**Dual function:**
∇ₓL = 2x + Aᵀλ = 0 → x = -Aᵀλ/2

g(λ) = (-Aᵀλ/2)ᵀ(-Aᵀλ/2) + λᵀ(A(-Aᵀλ/2) - b)
     = (1/4)λᵀAAᵀλ - (1/2)λᵀAAᵀλ - λᵀb
     = -(1/4)λᵀAAᵀλ - λᵀb

**Dual problem:**
max -(1/4)λᵀAAᵀλ - λᵀb

**Solution:**
∇g = -(1/2)AAᵀλ - b = 0
λ* = -2(AAᵀ)⁻¹b

**Primal optimal:** x* = -Aᵀλ*/2 = Aᵀ(AAᵀ)⁻¹b
This is the minimum norm solution!`
  }
];

export default exercises;
