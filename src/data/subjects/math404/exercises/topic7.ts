import type { WrittenExercise } from '../../../../core/types';

export const exercises: WrittenExercise[] = [
  {
    id: 'math404-t7-ex1',
    subjectId: 'math404',
    topicId: 'topic-7',
    type: 'written',
    title: 'Semidefinite Programming Formulation',
    description: 'Formulate a semidefinite programming (SDP) problem for matrix optimization.',
    difficulty: 3,
    hints: [
      'SDP minimizes a linear function over positive semidefinite matrices',
      'Write X ⪰ 0 to denote X is positive semidefinite',
      'Linear constraints use trace: tr(A_i X) = b_i'
    ],
    solution: `**SDP Standard Form:**
min tr(CX)
s.t. tr(A_i X) = b_i for i = 1,...,m
     X ⪰ 0

where X ⪰ 0 means X is positive semidefinite (all eigenvalues ≥ 0).

**Example**: Minimize the largest eigenvalue of A - X where X is diagonal:
min t
s.t. A - X ⪯ tI
     X diagonal
     X ⪰ 0

This is equivalent to:
min t
s.t. [[tI - A + X]] ⪰ 0
     X_ij = 0 for i ≠ j`
  },
  {
    id: 'math404-t7-ex2',
    subjectId: 'math404',
    topicId: 'topic-7',
    type: 'written',
    title: 'MAX-CUT SDP Relaxation',
    description: 'Derive the SDP relaxation for the MAX-CUT problem and explain the Goemans-Williamson approximation.',
    difficulty: 4,
    hints: [
      'Start with labels x_i ∈ {-1, +1}',
      'Use X = xx^T, then relax to X ⪰ 0',
      'Diagonal entries X_ii = 1 since x_i² = 1'
    ],
    solution: `**MAX-CUT Integer Programming:**
max (1/4) Σ_{(i,j)∈E} w_{ij}(1 - x_i x_j)
s.t. x_i ∈ {-1, +1}

**SDP Relaxation:**
Let X_ij = x_i x_j. Note X = xx^T ⪰ 0 and X_ii = 1.

max (1/4) Σ w_{ij}(1 - X_{ij})
s.t. X_ii = 1 for all i
     X ⪰ 0

**Matrix form:** max (1/4) tr(W(J - X))

**Goemans-Williamson Rounding:**
1. Solve SDP to get X*
2. Decompose X* = VV^T (Cholesky)
3. Choose random hyperplane r
4. Set x_i = sign(v_i · r)

This achieves 0.878-approximation ratio (tight under UGC).`
  },
  {
    id: 'math404-t7-ex3',
    subjectId: 'math404',
    topicId: 'topic-7',
    type: 'written',
    title: 'Robust Linear Programming',
    description: 'Formulate a robust LP where constraint coefficients have ellipsoidal uncertainty.',
    difficulty: 4,
    hints: [
      'Uncertain constraint: (a + u)^T x ≤ b for all u ∈ U',
      'For ellipsoidal U = {u: ||u|| ≤ ρ}, find the worst case',
      'max_{||u||≤ρ} u^T x = ρ||x||₂'
    ],
    solution: `**Nominal LP:** min c^T x, s.t. a^T x ≤ b

**Uncertain constraint:** (a + u)^T x ≤ b for all u ∈ U
where U = {u : ||u||₂ ≤ ρ} (ellipsoidal uncertainty)

**Robust counterpart:**
The constraint must hold for worst-case u:
a^T x + max_{||u||≤ρ} u^T x ≤ b

Since max_{||u||≤ρ} u^T x = ρ||x||₂ (achieved at u = ρx/||x||₂):

a^T x + ρ||x||₂ ≤ b

**Final robust LP:**
min c^T x
s.t. a^T x + ρ||x||₂ ≤ b

This is a second-order cone program (SOCP):
(b - a^T x, ρx) ∈ SOC

The robust solution trades optimality for safety against uncertainty.`
  }
];

export default exercises;
