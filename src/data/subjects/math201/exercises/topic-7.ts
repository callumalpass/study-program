import type { WrittenExercise } from '../../../../core/types';

export const topic7Exercises: WrittenExercise[] = [
  {
    id: 'math201-t7-ex01',
    subjectId: 'math201',
    topicId: 'math201-7',
    type: 'written',
    difficulty: 2,
    title: 'Verifying Linearity',
    description: 'Determine if $T(\\begin{bmatrix} x \\\\ y \\end{bmatrix}) = \\begin{bmatrix} x + 1 \\\\ 2y \\end{bmatrix}$ is a linear transformation.',
    hints: ['Check if T(u + v) = T(u) + T(v) and T(cu) = cT(u).'],
    solution: '$T(0) = \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix} \\neq 0$, so NOT linear. (Linear transformations must map zero to zero.)'
  },
  {
    id: 'math201-t7-ex02',
    subjectId: 'math201',
    topicId: 'math201-7',
    type: 'written',
    difficulty: 2,
    title: 'Matrix of a Transformation',
    description: 'Find the standard matrix for $T: \\mathbb{R}^2 \\to \\mathbb{R}^2$ where $T(\\begin{bmatrix} x \\\\ y \\end{bmatrix}) = \\begin{bmatrix} 3x - y \\\\ x + 2y \\end{bmatrix}$.',
    hints: ['Find T(e₁) and T(e₂).'],
    solution: '$T(e_1) = T(\\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix}) = \\begin{bmatrix} 3 \\\\ 1 \\end{bmatrix}$, $T(e_2) = T(\\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix}) = \\begin{bmatrix} -1 \\\\ 2 \\end{bmatrix}$.\n\nStandard matrix: $A = \\begin{bmatrix} 3 & -1 \\\\ 1 & 2 \\end{bmatrix}$.'
  },
  {
    id: 'math201-t7-ex03',
    subjectId: 'math201',
    topicId: 'math201-7',
    type: 'written',
    difficulty: 3,
    title: 'Kernel of a Transformation',
    description: 'Find ker$(T)$ where $T(x) = Ax$ and $A = \\begin{bmatrix} 1 & 2 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}$.',
    hints: ['ker(T) = Nul(A) = {x : Ax = 0}.'],
    solution: 'From $Ax = 0$: $x_1 + 2x_2 = 0$ and $x_3 = 0$. So $x_1 = -2x_2$, $x_3 = 0$, $x_2$ free.\n\nker$(T) = $ Span$\\{\\begin{bmatrix} -2 \\\\ 1 \\\\ 0 \\end{bmatrix}\\}$.'
  },
  {
    id: 'math201-t7-ex04',
    subjectId: 'math201',
    topicId: 'math201-7',
    type: 'written',
    difficulty: 3,
    title: 'Range of a Transformation',
    description: 'Find the range of $T(x) = Ax$ where $A = \\begin{bmatrix} 1 & 2 \\\\ 2 & 4 \\\\ 3 & 6 \\end{bmatrix}$.',
    hints: ['range(T) = Col(A).'],
    solution: 'Columns of $A$ are multiples of $\\begin{bmatrix} 1 \\\\ 2 \\\\ 3 \\end{bmatrix}$.\n\nrange$(T) = $ Span$\\{\\begin{bmatrix} 1 \\\\ 2 \\\\ 3 \\end{bmatrix}\\}$ (a line in $\\mathbb{R}^3$).'
  },
  {
    id: 'math201-t7-ex05',
    subjectId: 'math201',
    topicId: 'math201-7',
    type: 'written',
    difficulty: 3,
    title: 'One-to-One Test',
    description: 'Determine if $T: \\mathbb{R}^3 \\to \\mathbb{R}^2$ given by $T(x) = \\begin{bmatrix} 1 & 0 & 1 \\\\ 0 & 1 & -1 \\end{bmatrix}x$ is one-to-one.',
    hints: ['T is one-to-one iff ker(T) = {0}.'],
    solution: 'ker$(T) = $ Nul$(A)$. RREF of $A$: $\\begin{bmatrix} 1 & 0 & 1 \\\\ 0 & 1 & -1 \\end{bmatrix}$ has free variable $x_3$.\n\nker$(T) \\neq \\{0\\}$, so NOT one-to-one.'
  },
  {
    id: 'math201-t7-ex06',
    subjectId: 'math201',
    topicId: 'math201-7',
    type: 'written',
    difficulty: 3,
    title: 'Onto Test',
    description: 'Determine if $T: \\mathbb{R}^2 \\to \\mathbb{R}^3$ given by $T(x) = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\\\ 1 & 1 \\end{bmatrix}x$ is onto.',
    hints: ['T is onto iff range(T) = ℝ³, i.e., Col(A) = ℝ³.'],
    solution: 'Matrix $A$ is $3 \\times 2$ with rank $\\leq 2 < 3$.\n\nCol$(A)$ is at most 2-dimensional, so range$(T) \\neq \\mathbb{R}^3$. NOT onto.'
  },
  {
    id: 'math201-t7-ex07',
    subjectId: 'math201',
    topicId: 'math201-7',
    type: 'written',
    difficulty: 4,
    title: 'Composition of Transformations',
    description: 'Find the standard matrix for $(T_2 \\circ T_1)$ where $T_1(x) = \\begin{bmatrix} 1 & 2 \\\\ 0 & 1 \\end{bmatrix}x$ and $T_2(x) = \\begin{bmatrix} 2 & 0 \\\\ 1 & 3 \\end{bmatrix}x$.',
    hints: ['Standard matrix for composition is A₂A₁.'],
    solution: '$A_{T_2 \\circ T_1} = A_2A_1 = \\begin{bmatrix} 2 & 0 \\\\ 1 & 3 \\end{bmatrix}\\begin{bmatrix} 1 & 2 \\\\ 0 & 1 \\end{bmatrix} = \\begin{bmatrix} 2 & 4 \\\\ 1 & 5 \\end{bmatrix}$.'
  },
  {
    id: 'math201-t7-ex08',
    subjectId: 'math201',
    topicId: 'math201-7',
    type: 'written',
    difficulty: 4,
    title: 'Rotation Transformation',
    description: 'Find the standard matrix for rotation by $90°$ counterclockwise in $\\mathbb{R}^2$.',
    hints: ['Find where e₁ and e₂ map under rotation.'],
    solution: 'Rotation by $90°$ maps $e_1 = \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix}$ to $\\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix}$ and $e_2 = \\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix}$ to $\\begin{bmatrix} -1 \\\\ 0 \\end{bmatrix}$.\n\nMatrix: $\\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}$.'
  },
  {
    id: 'math201-t7-ex09',
    subjectId: 'math201',
    topicId: 'math201-7',
    type: 'written',
    difficulty: 4,
    title: 'Reflection Transformation',
    description: 'Find the standard matrix for reflection across the x-axis in $\\mathbb{R}^2$.',
    hints: ['Reflection across x-axis: (x, y) → (x, -y).'],
    solution: '$T(\\begin{bmatrix} x \\\\ y \\end{bmatrix}) = \\begin{bmatrix} x \\\\ -y \\end{bmatrix} = \\begin{bmatrix} 1 & 0 \\\\ 0 & -1 \\end{bmatrix}\\begin{bmatrix} x \\\\ y \\end{bmatrix}$.\n\nMatrix: $\\begin{bmatrix} 1 & 0 \\\\ 0 & -1 \\end{bmatrix}$.'
  },
  {
    id: 'math201-t7-ex10',
    subjectId: 'math201',
    topicId: 'math201-7',
    type: 'written',
    difficulty: 5,
    title: 'Isomorphism',
    description: 'Show that $T: P_1 \\to \\mathbb{R}^2$ defined by $T(a + bt) = \\begin{bmatrix} a \\\\ b \\end{bmatrix}$ is an isomorphism.',
    hints: ['Show T is linear, one-to-one, and onto.'],
    solution: 'Linearity: $T(c_1p_1 + c_2p_2) = c_1T(p_1) + c_2T(p_2)$ ✓\n\nOne-to-one: If $T(a+bt) = 0$, then $a = b = 0$, so $a + bt = 0$. ✓\n\nOnto: For any $\\begin{bmatrix} x \\\\ y \\end{bmatrix}$, choose $p = x + yt$. ✓\n\nThus $T$ is an isomorphism.'
  },
  {
    id: 'math201-t7-ex11',
    subjectId: 'math201',
    topicId: 'math201-7',
    type: 'written',
    difficulty: 5,
    title: 'Rank-Nullity for Transformations',
    description: 'If $T: \\mathbb{R}^5 \\to \\mathbb{R}^3$ is linear with dim(ker$(T)$) = 2, find dim(range$(T)$).',
    hints: ['Use Rank-Nullity: dim(domain) = dim(ker) + dim(range).'],
    solution: 'Rank-Nullity: $5 = 2 + \\text{dim(range}(T))$.\n\nSo dim(range$(T)$) = 3.'
  },
  {
    id: 'math201-t7-ex12',
    subjectId: 'math201',
    topicId: 'math201-7',
    type: 'written',
    difficulty: 5,
    title: 'Inverse Transformation',
    description: 'Find the inverse transformation $T^{-1}$ if $T(\\begin{bmatrix} x \\\\ y \\end{bmatrix}) = \\begin{bmatrix} 2x + y \\\\ x + y \\end{bmatrix}$.',
    hints: ['Find the matrix A for T, then find A⁻¹.'],
    solution: '$A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 1 \\end{bmatrix}$, det$(A) = 2 - 1 = 1$.\n\n$A^{-1} = \\begin{bmatrix} 1 & -1 \\\\ -1 & 2 \\end{bmatrix}$.\n\n$T^{-1}(\\begin{bmatrix} x \\\\ y \\end{bmatrix}) = \\begin{bmatrix} x - y \\\\ -x + 2y \\end{bmatrix}$.'
  },
  {
    id: 'math201-t7-ex13',
    subjectId: 'math201',
    topicId: 'math201-7',
    type: 'written',
    difficulty: 5,
    title: 'Matrix Similarity via Change of Basis',
    description: 'If $A$ represents transformation $T$ in basis $\\mathcal{B}$ and $B$ represents $T$ in basis $\\mathcal{C}$, show that $A$ and $B$ are similar.',
    hints: ['Use the change-of-basis formula.'],
    solution: 'Let $P = P_{\\mathcal{B} \\leftarrow \\mathcal{C}}$ be the change-of-basis matrix.\n\nThen $B = P^{-1}AP$, so $A$ and $B$ are similar.'
  },
  {
    id: 'math201-t7-ex14',
    subjectId: 'math201',
    topicId: 'math201-7',
    type: 'written',
    difficulty: 4,
    title: 'Projection onto Subspace',
    description: 'Find the standard matrix for orthogonal projection onto the x-axis in $\\mathbb{R}^2$.',
    hints: ['Projection onto x-axis: (x, y) → (x, 0).'],
    solution: '$\\text{proj}_{x\\text{-axis}}(\\begin{bmatrix} x \\\\ y \\end{bmatrix}) = \\begin{bmatrix} x \\\\ 0 \\end{bmatrix} = \\begin{bmatrix} 1 & 0 \\\\ 0 & 0 \\end{bmatrix}\\begin{bmatrix} x \\\\ y \\end{bmatrix}$.\n\nMatrix: $\\begin{bmatrix} 1 & 0 \\\\ 0 & 0 \\end{bmatrix}$.'
  },
  {
    id: 'math201-t7-ex15',
    subjectId: 'math201',
    topicId: 'math201-7',
    type: 'written',
    difficulty: 5,
    title: 'Shear Transformation',
    description: 'Find the matrix for a horizontal shear that maps $(x, y)$ to $(x + 2y, y)$.',
    hints: ['Apply the transformation to standard basis vectors.'],
    solution: '$T(e_1) = T(\\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix}) = \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix}$, $T(e_2) = T(\\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix}) = \\begin{bmatrix} 2 \\\\ 1 \\end{bmatrix}$.\n\nMatrix: $\\begin{bmatrix} 1 & 2 \\\\ 0 & 1 \\end{bmatrix}$.'
  },
  {
    id: 'math201-t7-ex16',
    subjectId: 'math201',
    topicId: 'math201-7',
    type: 'written',
    difficulty: 5,
    title: 'Eigenvalues and Transformation Behavior',
    description: 'If $T: \\mathbb{R}^2 \\to \\mathbb{R}^2$ has matrix $A = \\begin{bmatrix} 3 & 1 \\\\ 0 & 2 \\end{bmatrix}$, describe geometrically what happens to eigenvectors under $T$.',
    hints: ['Eigenvectors are stretched by their eigenvalues.'],
    solution: 'Eigenvalues: $\\lambda_1 = 3, \\lambda_2 = 2$.\n\nEigenvector for $\\lambda = 3$: direction $\\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix}$ (stretched by factor 3).\n\nEigenvector for $\\lambda = 2$: direction $\\begin{bmatrix} 1 \\\\ -1 \\end{bmatrix}$ (stretched by factor 2).\n\nEigenvectors point in directions that are preserved (only scaled) by $T$.'
  }
];
