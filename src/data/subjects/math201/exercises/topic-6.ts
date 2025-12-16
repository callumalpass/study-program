import type { WrittenExercise } from '../../../../core/types';

export const topic6Exercises: WrittenExercise[] = [
  {
    id: 'math201-t6-ex01',
    subjectId: 'math201',
    topicId: 'math201-6',
    type: 'written',
    difficulty: 2,
    title: 'Finding Eigenvalues',
    description: 'Find the eigenvalues of $A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}$.',
    hints: ['Solve det(A - λI) = 0.'],
    solution: 'det$(A - \\lambda I) = \\text{det}\\begin{bmatrix} 2-\\lambda & 1 \\\\ 1 & 2-\\lambda \\end{bmatrix} = (2-\\lambda)^2 - 1 = \\lambda^2 - 4\\lambda + 3 = (\\lambda - 3)(\\lambda - 1) = 0$.\n\nEigenvalues: $\\lambda = 3, 1$.'
  },
  {
    id: 'math201-t6-ex02',
    subjectId: 'math201',
    topicId: 'math201-6',
    type: 'written',
    difficulty: 3,
    title: 'Finding Eigenvectors',
    description: 'Find an eigenvector for eigenvalue $\\lambda = 3$ of $A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}$.',
    hints: ['Solve (A - 3I)v = 0.'],
    solution: '$A - 3I = \\begin{bmatrix} -1 & 1 \\\\ 1 & -1 \\end{bmatrix}$. Row reduce: $x_1 = x_2$.\n\nEigenvector: $v = \\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix}$ (or any scalar multiple).'
  },
  {
    id: 'math201-t6-ex03',
    subjectId: 'math201',
    topicId: 'math201-6',
    type: 'written',
    difficulty: 3,
    title: 'Characteristic Polynomial',
    description: 'Find the characteristic polynomial of $A = \\begin{bmatrix} 1 & 2 & 0 \\\\ 0 & 3 & 0 \\\\ 0 & 0 & 2 \\end{bmatrix}$.',
    hints: ['For triangular matrices, eigenvalues are diagonal entries.'],
    solution: '$\\text{det}(A - \\lambda I) = \\text{det}\\begin{bmatrix} 1-\\lambda & 2 & 0 \\\\ 0 & 3-\\lambda & 0 \\\\ 0 & 0 & 2-\\lambda \\end{bmatrix} = (1-\\lambda)(3-\\lambda)(2-\\lambda)$.\n\nCharacteristic polynomial: $-\\lambda^3 + 6\\lambda^2 - 11\\lambda + 6$.'
  },
  {
    id: 'math201-t6-ex04',
    subjectId: 'math201',
    topicId: 'math201-6',
    type: 'written',
    difficulty: 4,
    title: 'Diagonalization',
    description: 'Diagonalize $A = \\begin{bmatrix} 4 & -2 \\\\ 1 & 1 \\end{bmatrix}$ by finding $P$ and $D$ such that $A = PDP^{-1}$.',
    hints: ['Find eigenvalues and eigenvectors.', 'P has eigenvectors as columns, D has eigenvalues on diagonal.'],
    solution: 'Eigenvalues: $\\lambda = 2, 3$ (from characteristic equation).\n\nFor $\\lambda = 2$: $v_1 = \\begin{bmatrix} 2 \\\\ 1 \\end{bmatrix}$.\n\nFor $\\lambda = 3$: $v_2 = \\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix}$.\n\n$P = \\begin{bmatrix} 2 & 1 \\\\ 1 & 1 \\end{bmatrix}$, $D = \\begin{bmatrix} 2 & 0 \\\\ 0 & 3 \\end{bmatrix}$.'
  },
  {
    id: 'math201-t6-ex05',
    subjectId: 'math201',
    topicId: 'math201-6',
    type: 'written',
    difficulty: 3,
    title: 'Trace and Determinant',
    description: 'If $A$ has eigenvalues 1, 2, and 3, find tr$(A)$ and det$(A)$.',
    hints: ['Trace = sum of eigenvalues.', 'Determinant = product of eigenvalues.'],
    solution: 'tr$(A) = 1 + 2 + 3 = 6$.\n\ndet$(A) = 1 \\cdot 2 \\cdot 3 = 6$.'
  },
  {
    id: 'math201-t6-ex06',
    subjectId: 'math201',
    topicId: 'math201-6',
    type: 'written',
    difficulty: 4,
    title: 'Eigenspace Dimension',
    description: 'Find a basis for the eigenspace of $\\lambda = 0$ for $A = \\begin{bmatrix} 0 & 1 & 0 \\\\ 0 & 0 & 1 \\\\ 0 & 0 & 0 \\end{bmatrix}$.',
    hints: ['Eigenspace is Nul(A - λI) = Nul(A).'],
    solution: 'Eigenspace = Nul$(A) = $ Nul$\\begin{bmatrix} 0 & 1 & 0 \\\\ 0 & 0 & 1 \\\\ 0 & 0 & 0 \\end{bmatrix}$.\n\nFrom $x_2 = 0$ and $x_3 = 0$, we have $x_1$ free.\n\nBasis: $\\{\\begin{bmatrix} 1 \\\\ 0 \\\\ 0 \\end{bmatrix}\\}$. Geometric multiplicity = 1.'
  },
  {
    id: 'math201-t6-ex07',
    subjectId: 'math201',
    topicId: 'math201-6',
    type: 'written',
    difficulty: 4,
    title: 'Powers of Diagonal Matrix',
    description: 'If $A = PDP^{-1}$ where $D = \\begin{bmatrix} 2 & 0 \\\\ 0 & 3 \\end{bmatrix}$, find $A^{10}$ in terms of $P$ and $D$.',
    hints: ['A^n = PD^nP^{-1}.'],
    solution: '$A^{10} = PD^{10}P^{-1}$ where $D^{10} = \\begin{bmatrix} 2^{10} & 0 \\\\ 0 & 3^{10} \\end{bmatrix} = \\begin{bmatrix} 1024 & 0 \\\\ 0 & 59049 \\end{bmatrix}$.'
  },
  {
    id: 'math201-t6-ex08',
    subjectId: 'math201',
    topicId: 'math201-6',
    type: 'written',
    difficulty: 4,
    title: 'Similar Matrices',
    description: 'Show that similar matrices have the same eigenvalues.',
    hints: ['If B = P⁻¹AP, show det(B - λI) = det(A - λI).'],
    solution: 'If $B = P^{-1}AP$, then:\n\n$B - \\lambda I = P^{-1}AP - \\lambda P^{-1}IP = P^{-1}(A - \\lambda I)P$.\n\ndet$(B - \\lambda I) = \\text{det}(P^{-1}) \\cdot \\text{det}(A - \\lambda I) \\cdot \\text{det}(P) = \\text{det}(A - \\lambda I)$.\n\nSame characteristic polynomial, hence same eigenvalues.'
  },
  {
    id: 'math201-t6-ex09',
    subjectId: 'math201',
    topicId: 'math201-6',
    type: 'written',
    difficulty: 5,
    title: 'Diagonalizability Test',
    description: 'Determine if $A = \\begin{bmatrix} 5 & -2 & 2 \\\\ -2 & 2 & -4 \\\\ 2 & -4 & 2 \\end{bmatrix}$ is diagonalizable.',
    hints: ['Find eigenvalues and check if geometric multiplicities equal algebraic multiplicities.'],
    solution: 'Characteristic equation gives eigenvalues: $\\lambda = 6, 2, 1$.\n\nThree distinct eigenvalues guarantee 3 linearly independent eigenvectors.\n\nYes, $A$ is diagonalizable.'
  },
  {
    id: 'math201-t6-ex10',
    subjectId: 'math201',
    topicId: 'math201-6',
    type: 'written',
    difficulty: 5,
    title: 'Repeated Eigenvalues',
    description: 'Is $A = \\begin{bmatrix} 3 & 1 \\\\ 0 & 3 \\end{bmatrix}$ diagonalizable?',
    hints: ['Find eigenvalues and eigenvectors.', 'Check if there are n independent eigenvectors.'],
    solution: 'Eigenvalue: $\\lambda = 3$ (repeated, algebraic multiplicity 2).\n\nEigenspace: $(A - 3I)v = 0$ gives $\\begin{bmatrix} 0 & 1 \\\\ 0 & 0 \\end{bmatrix}v = 0$, so $v = \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix}$.\n\nGeometric multiplicity = 1 < 2. NOT diagonalizable.'
  },
  {
    id: 'math201-t6-ex11',
    subjectId: 'math201',
    topicId: 'math201-6',
    type: 'written',
    difficulty: 4,
    title: 'Symmetric Matrix Eigenvalues',
    description: 'Find the eigenvalues of symmetric matrix $A = \\begin{bmatrix} 2 & -1 & 0 \\\\ -1 & 2 & -1 \\\\ 0 & -1 & 2 \\end{bmatrix}$.',
    hints: ['Compute det(A - λI) = 0.'],
    solution: 'det$(A - \\lambda I) = -\\lambda^3 + 6\\lambda^2 - 10\\lambda + 4 = -(\\lambda - 2)(\\lambda^2 - 4\\lambda + 2) = 0$.\n\nEigenvalues: $\\lambda = 2, 2 \\pm \\sqrt{2}$ (all real, as expected for symmetric matrix).'
  },
  {
    id: 'math201-t6-ex12',
    subjectId: 'math201',
    topicId: 'math201-6',
    type: 'written',
    difficulty: 5,
    title: 'Eigenvalue of Inverse',
    description: 'If $\\lambda$ is an eigenvalue of invertible matrix $A$, show that $\\frac{1}{\\lambda}$ is an eigenvalue of $A^{-1}$.',
    hints: ['Start with Av = λv and multiply both sides by A⁻¹.'],
    solution: 'If $Av = \\lambda v$, multiply by $A^{-1}$:\n\n$v = \\lambda A^{-1}v$, so $A^{-1}v = \\frac{1}{\\lambda}v$.\n\nThus $\\frac{1}{\\lambda}$ is an eigenvalue of $A^{-1}$ with eigenvector $v$.'
  },
  {
    id: 'math201-t6-ex13',
    subjectId: 'math201',
    topicId: 'math201-6',
    type: 'written',
    difficulty: 5,
    title: 'Cayley-Hamilton Application',
    description: 'For $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$ with characteristic polynomial $\\lambda^2 - 5\\lambda - 2$, verify that $A^2 - 5A - 2I = 0$.',
    hints: ['Cayley-Hamilton: every matrix satisfies its characteristic equation.'],
    solution: '$A^2 = \\begin{bmatrix} 7 & 10 \\\\ 15 & 22 \\end{bmatrix}$, $5A = \\begin{bmatrix} 5 & 10 \\\\ 15 & 20 \\end{bmatrix}$, $2I = \\begin{bmatrix} 2 & 0 \\\\ 0 & 2 \\end{bmatrix}$.\n\n$A^2 - 5A - 2I = \\begin{bmatrix} 0 & 0 \\\\ 0 & 0 \\end{bmatrix}$ ✓'
  },
  {
    id: 'math201-t6-ex14',
    subjectId: 'math201',
    topicId: 'math201-6',
    type: 'written',
    difficulty: 5,
    title: 'Orthogonal Eigenvectors',
    description: 'Show that eigenvectors of a symmetric matrix corresponding to distinct eigenvalues are orthogonal.',
    hints: ['Use the property that Aᵀ = A and work with dot products.'],
    solution: 'Let $Av_1 = \\lambda_1 v_1$ and $Av_2 = \\lambda_2 v_2$ with $\\lambda_1 \\neq \\lambda_2$.\n\n$\\lambda_1(v_1 \\cdot v_2) = (Av_1) \\cdot v_2 = v_1 \\cdot (A^Tv_2) = v_1 \\cdot (Av_2) = \\lambda_2(v_1 \\cdot v_2)$.\n\nSo $(\\lambda_1 - \\lambda_2)(v_1 \\cdot v_2) = 0$. Since $\\lambda_1 \\neq \\lambda_2$, we have $v_1 \\cdot v_2 = 0$.'
  },
  {
    id: 'math201-t6-ex15',
    subjectId: 'math201',
    topicId: 'math201-6',
    type: 'written',
    difficulty: 5,
    title: 'Complex Eigenvalues',
    description: 'Find the eigenvalues of $A = \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}$.',
    hints: ['Some matrices have complex eigenvalues.'],
    solution: 'det$(A - \\lambda I) = \\text{det}\\begin{bmatrix} -\\lambda & -1 \\\\ 1 & -\\lambda \\end{bmatrix} = \\lambda^2 + 1 = 0$.\n\nEigenvalues: $\\lambda = \\pm i$ (complex).'
  },
  {
    id: 'math201-t6-ex16',
    subjectId: 'math201',
    topicId: 'math201-6',
    type: 'written',
    difficulty: 5,
    title: 'Application: Markov Chain',
    description: 'For transition matrix $P = \\begin{bmatrix} 0.8 & 0.3 \\\\ 0.2 & 0.7 \\end{bmatrix}$, find the steady-state vector (eigenvector for $\\lambda = 1$).',
    hints: ['Solve (P - I)v = 0 and normalize so entries sum to 1.'],
    solution: '$P - I = \\begin{bmatrix} -0.2 & 0.3 \\\\ 0.2 & -0.3 \\end{bmatrix}$. From $-0.2x + 0.3y = 0$: $y = \\frac{2}{3}x$.\n\nNormalize: $x + \\frac{2}{3}x = 1$, so $x = 0.6, y = 0.4$.\n\nSteady-state: $v = \\begin{bmatrix} 0.6 \\\\ 0.4 \\end{bmatrix}$.'
  }
];
