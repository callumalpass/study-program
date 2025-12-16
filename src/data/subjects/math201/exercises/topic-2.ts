import type { WrittenExercise } from '../../../../core/types';

export const topic2Exercises: WrittenExercise[] = [
  {
    id: 'math201-t2-ex01',
    subjectId: 'math201',
    topicId: 'math201-2',
    type: 'written',
    difficulty: 1,
    title: 'Matrix Addition',
    description: 'Compute $A + B$ where:\n\n$A = \\begin{bmatrix} 2 & -1 \\\\ 3 & 4 \\end{bmatrix}$, $B = \\begin{bmatrix} 1 & 5 \\\\ -2 & 0 \\end{bmatrix}$',
    hints: ['Add corresponding entries.'],
    solution: '$A + B = \\begin{bmatrix} 2+1 & -1+5 \\\\ 3+(-2) & 4+0 \\end{bmatrix} = \\begin{bmatrix} 3 & 4 \\\\ 1 & 4 \\end{bmatrix}$'
  },
  {
    id: 'math201-t2-ex02',
    subjectId: 'math201',
    topicId: 'math201-2',
    type: 'written',
    difficulty: 1,
    title: 'Scalar Multiplication',
    description: 'Compute $3A$ where $A = \\begin{bmatrix} 1 & -2 \\\\ 0 & 4 \\end{bmatrix}$',
    hints: ['Multiply each entry by 3.'],
    solution: '$3A = \\begin{bmatrix} 3 & -6 \\\\ 0 & 12 \\end{bmatrix}$'
  },
  {
    id: 'math201-t2-ex03',
    subjectId: 'math201',
    topicId: 'math201-2',
    type: 'written',
    difficulty: 2,
    title: 'Matrix Multiplication',
    description: 'Compute $AB$ where:\n\n$A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$, $B = \\begin{bmatrix} 2 & 0 \\\\ 1 & 3 \\end{bmatrix}$',
    hints: [
      'Use the row-column rule.',
      'Entry (i,j) is the dot product of row i of A with column j of B.'
    ],
    solution: '$AB = \\begin{bmatrix} 1(2)+2(1) & 1(0)+2(3) \\\\ 3(2)+4(1) & 3(0)+4(3) \\end{bmatrix} = \\begin{bmatrix} 4 & 6 \\\\ 10 & 12 \\end{bmatrix}$'
  },
  {
    id: 'math201-t2-ex04',
    subjectId: 'math201',
    topicId: 'math201-2',
    type: 'written',
    difficulty: 2,
    title: 'Non-Commutativity',
    description: 'Using $A$ and $B$ from the previous problem, compute $BA$ and verify that $AB \\neq BA$.',
    hints: ['Matrix multiplication is generally not commutative.'],
    solution: '$BA = \\begin{bmatrix} 2(1)+0(3) & 2(2)+0(4) \\\\ 1(1)+3(3) & 1(2)+3(4) \\end{bmatrix} = \\begin{bmatrix} 2 & 4 \\\\ 10 & 14 \\end{bmatrix}$\n\nSince $\\begin{bmatrix} 4 & 6 \\\\ 10 & 12 \\end{bmatrix} \\neq \\begin{bmatrix} 2 & 4 \\\\ 10 & 14 \\end{bmatrix}$, we have $AB \\neq BA$.'
  },
  {
    id: 'math201-t2-ex05',
    subjectId: 'math201',
    topicId: 'math201-2',
    type: 'written',
    difficulty: 2,
    title: 'Matrix Transpose',
    description: 'Find $A^T$ and $(AB)^T$ where:\n\n$A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\end{bmatrix}$, $B = \\begin{bmatrix} 1 \\\\ 0 \\\\ -1 \\end{bmatrix}$',
    hints: [
      'Transpose swaps rows and columns.',
      'Use the property (AB)ᵀ = BᵀAᵀ.'
    ],
    solution: '$A^T = \\begin{bmatrix} 1 & 4 \\\\ 2 & 5 \\\\ 3 & 6 \\end{bmatrix}$, $B^T = \\begin{bmatrix} 1 & 0 & -1 \\end{bmatrix}$\n\n$AB = \\begin{bmatrix} 1-3 \\\\ 4-6 \\end{bmatrix} = \\begin{bmatrix} -2 \\\\ -2 \\end{bmatrix}$\n\n$(AB)^T = \\begin{bmatrix} -2 & -2 \\end{bmatrix}$\n\nVerify: $B^TA^T = \\begin{bmatrix} 1 & 0 & -1 \\end{bmatrix}\\begin{bmatrix} 1 & 4 \\\\ 2 & 5 \\\\ 3 & 6 \\end{bmatrix} = \\begin{bmatrix} -2 & -2 \\end{bmatrix}$ ✓'
  },
  {
    id: 'math201-t2-ex06',
    subjectId: 'math201',
    topicId: 'math201-2',
    type: 'written',
    difficulty: 3,
    title: 'Finding Matrix Inverses',
    description: 'Find $A^{-1}$ if it exists, where $A = \\begin{bmatrix} 2 & 1 \\\\ 5 & 3 \\end{bmatrix}$',
    hints: [
      'Use the formula for 2×2 inverse: A⁻¹ = (1/det(A))[d -b; -c a]',
      'First check that det(A) ≠ 0.'
    ],
    solution: '$\\det(A) = 2(3) - 1(5) = 6 - 5 = 1 \\neq 0$, so $A$ is invertible.\n\n$A^{-1} = \\frac{1}{1}\\begin{bmatrix} 3 & -1 \\\\ -5 & 2 \\end{bmatrix} = \\begin{bmatrix} 3 & -1 \\\\ -5 & 2 \\end{bmatrix}$\n\nVerify: $AA^{-1} = \\begin{bmatrix} 2 & 1 \\\\ 5 & 3 \\end{bmatrix}\\begin{bmatrix} 3 & -1 \\\\ -5 & 2 \\end{bmatrix} = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}$ ✓'
  },
  {
    id: 'math201-t2-ex07',
    subjectId: 'math201',
    topicId: 'math201-2',
    type: 'written',
    difficulty: 3,
    title: 'Inverse by Row Reduction',
    description: 'Find $A^{-1}$ by row reducing $[A | I]$ where:\n\n$A = \\begin{bmatrix} 1 & 0 & 1 \\\\ 0 & 2 & 1 \\\\ 1 & 1 & 2 \\end{bmatrix}$',
    hints: [
      'Form [A | I] and row reduce to [I | A⁻¹].',
      'Use elementary row operations.'
    ],
    solution: '$[A | I] = \\left[\\begin{array}{ccc|ccc} 1 & 0 & 1 & 1 & 0 & 0 \\\\ 0 & 2 & 1 & 0 & 1 & 0 \\\\ 1 & 1 & 2 & 0 & 0 & 1 \\end{array}\\right]$\n\nAfter row operations:\n\n$[I | A^{-1}] = \\left[\\begin{array}{ccc|ccc} 1 & 0 & 0 & 3 & 1 & -2 \\\\ 0 & 1 & 0 & 1 & 1 & -1 \\\\ 0 & 0 & 1 & -2 & -1 & 2 \\end{array}\\right]$\n\n$A^{-1} = \\begin{bmatrix} 3 & 1 & -2 \\\\ 1 & 1 & -1 \\\\ -2 & -1 & 2 \\end{bmatrix}$'
  },
  {
    id: 'math201-t2-ex08',
    subjectId: 'math201',
    topicId: 'math201-2',
    type: 'written',
    difficulty: 3,
    title: 'Properties of Inverse',
    description: 'If $A = \\begin{bmatrix} 2 & 0 \\\\ 0 & 3 \\end{bmatrix}$ and $B = \\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}$, find $(AB)^{-1}$ using the property $(AB)^{-1} = B^{-1}A^{-1}$.',
    hints: [
      'Find A⁻¹ and B⁻¹ separately.',
      'Then compute B⁻¹A⁻¹.'
    ],
    solution: '$A^{-1} = \\begin{bmatrix} 1/2 & 0 \\\\ 0 & 1/3 \\end{bmatrix}$\n\n$B^{-1} = \\begin{bmatrix} 1 & -1 \\\\ 0 & 1 \\end{bmatrix}$ (check: $BB^{-1} = I$)\n\n$(AB)^{-1} = B^{-1}A^{-1} = \\begin{bmatrix} 1 & -1 \\\\ 0 & 1 \\end{bmatrix}\\begin{bmatrix} 1/2 & 0 \\\\ 0 & 1/3 \\end{bmatrix} = \\begin{bmatrix} 1/2 & -1/3 \\\\ 0 & 1/3 \\end{bmatrix}$'
  },
  {
    id: 'math201-t2-ex09',
    subjectId: 'math201',
    topicId: 'math201-2',
    type: 'written',
    difficulty: 2,
    title: 'Elementary Matrices',
    description: 'Find the elementary matrix $E$ that performs the row operation $R_2 \\leftarrow R_2 - 3R_1$ on a $3 \\times 3$ matrix.',
    hints: [
      'Start with the 3×3 identity matrix.',
      'Perform the row operation on I.'
    ],
    solution: 'Apply $R_2 \\leftarrow R_2 - 3R_1$ to $I_3$:\n\n$E = \\begin{bmatrix} 1 & 0 & 0 \\\\ -3 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}$\n\nTo perform this operation on matrix A, compute EA.'
  },
  {
    id: 'math201-t2-ex10',
    subjectId: 'math201',
    topicId: 'math201-2',
    type: 'written',
    difficulty: 3,
    title: 'Symmetric Matrix',
    description: 'Show that $A + A^T$ is symmetric for any square matrix $A$.',
    hints: [
      'A matrix is symmetric if it equals its transpose.',
      'Use properties of transpose: (A + B)ᵀ = Aᵀ + Bᵀ and (Aᵀ)ᵀ = A.'
    ],
    solution: 'Let $B = A + A^T$. We need to show $B^T = B$.\n\n$B^T = (A + A^T)^T = A^T + (A^T)^T = A^T + A = A + A^T = B$\n\nTherefore $A + A^T$ is symmetric for any square matrix $A$.'
  },
  {
    id: 'math201-t2-ex11',
    subjectId: 'math201',
    topicId: 'math201-2',
    type: 'written',
    difficulty: 4,
    title: 'Diagonal Matrix Powers',
    description: 'If $D = \\begin{bmatrix} 2 & 0 & 0 \\\\ 0 & 3 & 0 \\\\ 0 & 0 & -1 \\end{bmatrix}$, find $D^5$.',
    hints: [
      'For diagonal matrices, powers are easy to compute.',
      'Each diagonal entry is raised to the power.'
    ],
    solution: 'For a diagonal matrix $D = \\text{diag}(d_1, d_2, \\ldots, d_n)$, we have:\n\n$D^k = \\text{diag}(d_1^k, d_2^k, \\ldots, d_n^k)$\n\n$D^5 = \\begin{bmatrix} 2^5 & 0 & 0 \\\\ 0 & 3^5 & 0 \\\\ 0 & 0 & (-1)^5 \\end{bmatrix} = \\begin{bmatrix} 32 & 0 & 0 \\\\ 0 & 243 & 0 \\\\ 0 & 0 & -1 \\end{bmatrix}$'
  },
  {
    id: 'math201-t2-ex12',
    subjectId: 'math201',
    topicId: 'math201-2',
    type: 'written',
    difficulty: 4,
    title: 'Matrix Equation',
    description: 'Solve for matrix $X$ in the equation: $AX + B = C$ where:\n\n$A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 1 \\end{bmatrix}$, $B = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}$, $C = \\begin{bmatrix} 3 & 2 \\\\ 2 & 2 \\end{bmatrix}$',
    hints: [
      'Rearrange to isolate X: X = A⁻¹(C - B).',
      'First find A⁻¹.'
    ],
    solution: '$AX = C - B = \\begin{bmatrix} 2 & 2 \\\\ 2 & 1 \\end{bmatrix}$\n\n$A^{-1} = \\begin{bmatrix} 1 & -1 \\\\ -1 & 2 \\end{bmatrix}$ (since $\\det(A) = 1$)\n\n$X = A^{-1}(C - B) = \\begin{bmatrix} 1 & -1 \\\\ -1 & 2 \\end{bmatrix}\\begin{bmatrix} 2 & 2 \\\\ 2 & 1 \\end{bmatrix} = \\begin{bmatrix} 0 & 1 \\\\ 2 & 0 \\end{bmatrix}$'
  },
  {
    id: 'math201-t2-ex13',
    subjectId: 'math201',
    topicId: 'math201-2',
    type: 'written',
    difficulty: 4,
    title: 'LU Factorization',
    description: 'Find the LU factorization of $A = \\begin{bmatrix} 2 & 4 \\\\ 1 & 5 \\end{bmatrix}$',
    hints: [
      'L is lower triangular with 1s on diagonal.',
      'U is upper triangular.',
      'Use row operations to find U, tracking multipliers for L.'
    ],
    solution: '$R_2 \\leftarrow R_2 - \\frac{1}{2}R_1$:\n\n$U = \\begin{bmatrix} 2 & 4 \\\\ 0 & 3 \\end{bmatrix}$\n\nThe multiplier was $\\frac{1}{2}$, so:\n\n$L = \\begin{bmatrix} 1 & 0 \\\\ 1/2 & 1 \\end{bmatrix}$\n\nVerify: $LU = \\begin{bmatrix} 1 & 0 \\\\ 1/2 & 1 \\end{bmatrix}\\begin{bmatrix} 2 & 4 \\\\ 0 & 3 \\end{bmatrix} = \\begin{bmatrix} 2 & 4 \\\\ 1 & 5 \\end{bmatrix} = A$ ✓'
  },
  {
    id: 'math201-t2-ex14',
    subjectId: 'math201',
    topicId: 'math201-2',
    type: 'written',
    difficulty: 5,
    title: 'Trace Properties',
    description: 'Prove that $\\text{tr}(AB) = \\text{tr}(BA)$ for any $m \\times n$ matrix $A$ and $n \\times m$ matrix $B$.',
    hints: [
      'Write out the formulas for trace.',
      'Entry (i,i) of AB involves row i of A and column i of B.',
      'Compare with entry (j,j) of BA.'
    ],
    solution: '$\\text{tr}(AB) = \\sum_{i=1}^m (AB)_{ii} = \\sum_{i=1}^m \\sum_{k=1}^n a_{ik}b_{ki}$\n\n$\\text{tr}(BA) = \\sum_{j=1}^n (BA)_{jj} = \\sum_{j=1}^n \\sum_{i=1}^m b_{ji}a_{ij}$\n\nChange indices in second sum: $\\sum_{j=1}^n \\sum_{i=1}^m b_{ji}a_{ij} = \\sum_{i=1}^m \\sum_{k=1}^n a_{ik}b_{ki}$\n\nTherefore $\\text{tr}(AB) = \\text{tr}(BA)$.'
  },
  {
    id: 'math201-t2-ex15',
    subjectId: 'math201',
    topicId: 'math201-2',
    type: 'written',
    difficulty: 5,
    title: 'Orthogonal Matrix',
    description: 'Verify that $Q = \\frac{1}{3}\\begin{bmatrix} 2 & -2 & 1 \\\\ 1 & 2 & 2 \\\\ 2 & 1 & -2 \\end{bmatrix}$ is orthogonal by showing $Q^TQ = I$.',
    hints: [
      'Compute QᵀQ and check if it equals I.',
      'For orthogonal matrices, columns have unit length and are orthogonal.'
    ],
    solution: '$Q^T = \\frac{1}{3}\\begin{bmatrix} 2 & 1 & 2 \\\\ -2 & 2 & 1 \\\\ 1 & 2 & -2 \\end{bmatrix}$\n\n$Q^TQ = \\frac{1}{9}\\begin{bmatrix} 2 & 1 & 2 \\\\ -2 & 2 & 1 \\\\ 1 & 2 & -2 \\end{bmatrix}\\begin{bmatrix} 2 & -2 & 1 \\\\ 1 & 2 & 2 \\\\ 2 & 1 & -2 \\end{bmatrix}$\n\n$= \\frac{1}{9}\\begin{bmatrix} 9 & 0 & 0 \\\\ 0 & 9 & 0 \\\\ 0 & 0 & 9 \\end{bmatrix} = I$\n\nTherefore $Q$ is orthogonal.'
  },
  {
    id: 'math201-t2-ex16',
    subjectId: 'math201',
    topicId: 'math201-2',
    type: 'written',
    difficulty: 5,
    title: 'Block Matrix Multiplication',
    description: 'Compute $AB$ using block multiplication where:\n\n$A = \\begin{bmatrix} I_2 & 0 \\\\ C & I_2 \\end{bmatrix}$, $B = \\begin{bmatrix} I_2 & D \\\\ 0 & I_2 \\end{bmatrix}$\n\nwhere $C = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$ and $D = \\begin{bmatrix} 5 & 6 \\\\ 7 & 8 \\end{bmatrix}$',
    hints: [
      'Treat the blocks as matrix entries.',
      'Multiply block-wise following matrix multiplication rules.'
    ],
    solution: '$AB = \\begin{bmatrix} I_2 \\cdot I_2 + 0 \\cdot 0 & I_2 \\cdot D + 0 \\cdot I_2 \\\\ C \\cdot I_2 + I_2 \\cdot 0 & C \\cdot D + I_2 \\cdot I_2 \\end{bmatrix}$\n\n$= \\begin{bmatrix} I_2 & D \\\\ C & CD + I_2 \\end{bmatrix}$\n\n$CD = \\begin{bmatrix} 19 & 22 \\\\ 43 & 50 \\end{bmatrix}$\n\n$AB = \\begin{bmatrix} 1 & 0 & 5 & 6 \\\\ 0 & 1 & 7 & 8 \\\\ 1 & 2 & 20 & 22 \\\\ 3 & 4 & 43 & 51 \\end{bmatrix}$'
  }
];
