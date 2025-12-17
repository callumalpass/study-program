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
  }
];

export default exercises;
