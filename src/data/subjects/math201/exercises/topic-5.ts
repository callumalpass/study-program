import type { WrittenExercise } from '../../../../core/types';

export const topic5Exercises: WrittenExercise[] = [
  {
    id: 'math201-t5-ex01',
    subjectId: 'math201',
    topicId: 'math201-5',
    type: 'written',
    difficulty: 1,
    title: '2×2 Determinant',
    description: 'Compute det$(A)$ where $A = \\begin{bmatrix} 3 & 5 \\\\ 1 & 2 \\end{bmatrix}$.',
    hints: ['Use formula: det([a b; c d]) = ad - bc.'],
    solution: 'det$(A) = 3(2) - 5(1) = 6 - 5 = 1$.'
  },
  {
    id: 'math201-t5-ex02',
    subjectId: 'math201',
    topicId: 'math201-5',
    type: 'written',
    difficulty: 2,
    title: '3×3 Determinant by Cofactor',
    description: 'Find det$(A)$ using cofactor expansion along row 1:\n\n$A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 0 & 4 & 5 \\\\ 0 & 0 & 6 \\end{bmatrix}$',
    hints: ['For triangular matrices, det is product of diagonal entries.', 'Or expand: det(A) = a₁₁C₁₁ + a₁₂C₁₂ + a₁₃C₁₃.'],
    solution: 'Since $A$ is upper triangular: det$(A) = 1 \\cdot 4 \\cdot 6 = 24$.'
  },
  {
    id: 'math201-t5-ex03',
    subjectId: 'math201',
    topicId: 'math201-5',
    type: 'written',
    difficulty: 2,
    title: 'Determinant Properties',
    description: 'If det$(A) = 5$, find det$(2A)$ where $A$ is $3 \\times 3$.',
    hints: ['det(kA) = kⁿ det(A) for n×n matrix.'],
    solution: 'det$(2A) = 2^3 \\cdot \\text{det}(A) = 8 \\cdot 5 = 40$.'
  },
  {
    id: 'math201-t5-ex04',
    subjectId: 'math201',
    topicId: 'math201-5',
    type: 'written',
    difficulty: 3,
    title: 'Determinant of Product',
    description: 'If det$(A) = 2$ and det$(B) = -3$ for $3 \\times 3$ matrices, find det$(AB)$ and det$(A^{-1})$.',
    hints: ['det(AB) = det(A)det(B).', 'det(A⁻¹) = 1/det(A).'],
    solution: 'det$(AB) = \\text{det}(A) \\cdot \\text{det}(B) = 2 \\cdot (-3) = -6$.\n\ndet$(A^{-1}) = \\frac{1}{\\text{det}(A)} = \\frac{1}{2}$.'
  },
  {
    id: 'math201-t5-ex05',
    subjectId: 'math201',
    topicId: 'math201-5',
    type: 'written',
    difficulty: 3,
    title: 'Row Operations and Determinant',
    description: 'Matrix $B$ is obtained from $A$ by swapping two rows, then multiplying a row by 3. If det$(A) = 4$, find det$(B)$.',
    hints: ['Swapping rows changes sign.', 'Multiplying a row by k multiplies det by k.'],
    solution: 'Swap rows: det changes to $-4$. Multiply row by 3: det becomes $3(-4) = -12$. So det$(B) = -12$.'
  },
  {
    id: 'math201-t5-ex06',
    subjectId: 'math201',
    topicId: 'math201-5',
    type: 'written',
    difficulty: 3,
    title: 'Determinant and Invertibility',
    description: 'Determine if $A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 2 & 4 & 5 \\\\ 3 & 5 & 6 \\end{bmatrix}$ is invertible.',
    hints: ['A is invertible iff det(A) ≠ 0.'],
    solution: 'Cofactor expansion: det$(A) = 1(24-25) - 2(12-15) + 3(10-12) = -1 + 6 - 6 = -1 \\neq 0$. Yes, $A$ is invertible.'
  },
  {
    id: 'math201-t5-ex07',
    subjectId: 'math201',
    topicId: 'math201-5',
    type: 'written',
    difficulty: 4,
    title: 'Cramer\'s Rule',
    description: 'Use Cramer\'s Rule to solve:\n\n$2x + y = 5$\n\n$x - y = 1$',
    hints: ['x = det(A₁)/det(A) where A₁ replaces first column with b.'],
    solution: '$A = \\begin{bmatrix} 2 & 1 \\\\ 1 & -1 \\end{bmatrix}$, det$(A) = -2 - 1 = -3$.\n\n$A_1 = \\begin{bmatrix} 5 & 1 \\\\ 1 & -1 \\end{bmatrix}$, det$(A_1) = -5 - 1 = -6$.\n\n$A_2 = \\begin{bmatrix} 2 & 5 \\\\ 1 & 1 \\end{bmatrix}$, det$(A_2) = 2 - 5 = -3$.\n\n$x = \\frac{-6}{-3} = 2$, $y = \\frac{-3}{-3} = 1$.'
  },
  {
    id: 'math201-t5-ex08',
    subjectId: 'math201',
    topicId: 'math201-5',
    type: 'written',
    difficulty: 4,
    title: 'Area of Parallelogram',
    description: 'Find the area of the parallelogram with vertices at $(0,0)$, $(2,1)$, $(3,4)$, and $(5,5)$.',
    hints: ['Area = |det([v₁ v₂])| where v₁, v₂ are edge vectors from origin.'],
    solution: 'Edge vectors: $v_1 = \\begin{bmatrix} 2 \\\\ 1 \\end{bmatrix}$, $v_2 = \\begin{bmatrix} 3 \\\\ 4 \\end{bmatrix}$.\n\nArea $= |\\text{det}\\begin{bmatrix} 2 & 3 \\\\ 1 & 4 \\end{bmatrix}| = |8 - 3| = 5$.'
  },
  {
    id: 'math201-t5-ex09',
    subjectId: 'math201',
    topicId: 'math201-5',
    type: 'written',
    difficulty: 4,
    title: 'Transpose Determinant',
    description: 'Verify that det$(A^T) = $ det$(A)$ for $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$.',
    hints: ['Compute both determinants.'],
    solution: 'det$(A) = 4 - 6 = -2$.\n\n$A^T = \\begin{bmatrix} 1 & 3 \\\\ 2 & 4 \\end{bmatrix}$, det$(A^T) = 4 - 6 = -2$.\n\nIndeed, det$(A^T) = $ det$(A)$.'
  },
  {
    id: 'math201-t5-ex10',
    subjectId: 'math201',
    topicId: 'math201-5',
    type: 'written',
    difficulty: 4,
    title: 'Adjugate Matrix',
    description: 'Find the adjugate of $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$ and verify $A \\cdot \\text{adj}(A) = \\text{det}(A) \\cdot I$.',
    hints: ['adj(A) is transpose of cofactor matrix.'],
    solution: 'Cofactor matrix: $C = \\begin{bmatrix} 4 & -3 \\\\ -2 & 1 \\end{bmatrix}$.\n\nadj$(A) = C^T = \\begin{bmatrix} 4 & -2 \\\\ -3 & 1 \\end{bmatrix}$.\n\n$A \\cdot \\text{adj}(A) = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}\\begin{bmatrix} 4 & -2 \\\\ -3 & 1 \\end{bmatrix} = \\begin{bmatrix} -2 & 0 \\\\ 0 & -2 \\end{bmatrix} = -2I$ ✓'
  },
  {
    id: 'math201-t5-ex11',
    subjectId: 'math201',
    topicId: 'math201-5',
    type: 'written',
    difficulty: 5,
    title: 'Vandermonde Determinant',
    description: 'Compute det$(V)$ where $V = \\begin{bmatrix} 1 & 1 & 1 \\\\ 1 & 2 & 3 \\\\ 1 & 4 & 9 \\end{bmatrix}$ (Vandermonde matrix).',
    hints: ['Use row operations or the formula for Vandermonde determinants.'],
    solution: '$R_2 \\leftarrow R_2 - R_1$, $R_3 \\leftarrow R_3 - R_1$:\n\n$\\begin{bmatrix} 1 & 1 & 1 \\\\ 0 & 1 & 2 \\\\ 0 & 3 & 8 \\end{bmatrix}$\n\ndet $= 1 \\cdot \\text{det}\\begin{bmatrix} 1 & 2 \\\\ 3 & 8 \\end{bmatrix} = 8 - 6 = 2$.'
  },
  {
    id: 'math201-t5-ex12',
    subjectId: 'math201',
    topicId: 'math201-5',
    type: 'written',
    difficulty: 5,
    title: 'Determinant Expansion',
    description: 'Find det$(A)$ using expansion along column 2:\n\n$A = \\begin{bmatrix} 2 & 0 & 1 \\\\ 3 & 0 & 2 \\\\ 1 & 5 & 3 \\end{bmatrix}$',
    hints: ['Expand along column with most zeros for efficiency.'],
    solution: 'Expansion along column 2: det$(A) = 0 \\cdot C_{12} + 0 \\cdot C_{22} + 5 \\cdot C_{32}$.\n\n$C_{32} = (-1)^{3+2}\\text{det}\\begin{bmatrix} 2 & 1 \\\\ 3 & 2 \\end{bmatrix} = -(4-3) = -1$.\n\ndet$(A) = 5(-1) = -5$.'
  },
  {
    id: 'math201-t5-ex13',
    subjectId: 'math201',
    topicId: 'math201-5',
    type: 'written',
    difficulty: 5,
    title: 'Volume of Parallelepiped',
    description: 'Find the volume of the parallelepiped determined by vectors $a = \\begin{bmatrix} 1 \\\\ 0 \\\\ 0 \\end{bmatrix}$, $b = \\begin{bmatrix} 0 \\\\ 2 \\\\ 0 \\end{bmatrix}$, $c = \\begin{bmatrix} 0 \\\\ 0 \\\\ 3 \\end{bmatrix}$.',
    hints: ['Volume = |det([a b c])|.'],
    solution: '$\\text{Volume} = |\\text{det}\\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 2 & 0 \\\\ 0 & 0 & 3 \\end{bmatrix}| = |1 \\cdot 2 \\cdot 3| = 6$.'
  },
  {
    id: 'math201-t5-ex14',
    subjectId: 'math201',
    topicId: 'math201-5',
    type: 'written',
    difficulty: 5,
    title: 'Determinant of Block Matrix',
    description: 'If $A$ and $D$ are $n \\times n$ matrices, show that det$\\begin{bmatrix} A & 0 \\\\ C & D \\end{bmatrix} = $ det$(A) \\cdot $ det$(D)$.',
    hints: ['Use cofactor expansion or properties of block matrices.'],
    solution: 'Expand along first $n$ rows. Each expansion gives factors from $A$ and leaves a block with $D$. By induction or direct calculation: det$\\begin{bmatrix} A & 0 \\\\ C & D \\end{bmatrix} = \\text{det}(A) \\cdot \\text{det}(D)$.'
  },
  {
    id: 'math201-t5-ex15',
    subjectId: 'math201',
    topicId: 'math201-5',
    type: 'written',
    difficulty: 5,
    title: 'Determinant and Eigenvalues',
    description: 'If $A$ is $3 \\times 3$ with eigenvalues 2, 3, -1, find det$(A)$ and det$(A^2 - I)$.',
    hints: ['det(A) = product of eigenvalues.', 'Eigenvalues of A² - I are λ² - 1.'],
    solution: 'det$(A) = 2 \\cdot 3 \\cdot (-1) = -6$.\n\nEigenvalues of $A^2 - I$: $2^2 - 1 = 3$, $3^2 - 1 = 8$, $(-1)^2 - 1 = 0$.\n\ndet$(A^2 - I) = 3 \\cdot 8 \\cdot 0 = 0$.'
  },
  {
    id: 'math201-t5-ex16',
    subjectId: 'math201',
    topicId: 'math201-5',
    type: 'written',
    difficulty: 5,
    title: 'Determinant Characterization',
    description: 'Prove that if det$(A) \\neq 0$, then the columns of $A$ are linearly independent.',
    hints: ['Use the relationship between determinant and invertibility.'],
    solution: 'If det$(A) \\neq 0$, then $A$ is invertible. This means $Ax = 0$ has only the trivial solution $x = 0$. Therefore, the columns of $A$ are linearly independent.'
  }
];
