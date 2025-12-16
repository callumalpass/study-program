import type { Exam } from '../../../core/types';

export const math201Exams: Exam[] = [
  {
    id: 'math201-exam-midterm',
    subjectId: 'math201',
    title: 'Math201 Midterm - Linear Algebra',
    durationMinutes: 90,
    instructions: [
      'This exam covers Topics 1-4: Systems of Linear Equations, Matrix Operations, Vector Spaces, and Linear Independence and Basis.',
      'Show all work for full credit on written questions.',
      'Calculators are permitted for arithmetic only.',
      'Fill-in-blank answers should be simplified and use standard mathematical notation.',
      'Passing score is 70% or higher.',
    ],
    questions: [
      // === TOPIC 1: Systems of Linear Equations (7 questions) ===
      {
        id: 'math201-mid-q1',
        type: 'multiple_choice',
        prompt: 'How many solutions does the system have?\n\n$x + 2y = 3$\n\n$2x + 4y = 6$',
        options: ['No solution', 'Exactly one solution', 'Infinitely many solutions', 'Exactly two solutions'],
        correctAnswer: 2,
        explanation:
          'The second equation is 2 times the first, so they represent the same line. The system has infinitely many solutions.',
      },
      {
        id: 'math201-mid-q2',
        type: 'fill_blank',
        prompt: 'The row echelon form requires that all ____ rows are at the bottom.',
        correctAnswer: 'zero',
        explanation: 'In row echelon form, all zero rows must be at the bottom of the matrix.',
      },
      {
        id: 'math201-mid-q3',
        type: 'true_false',
        prompt: 'A homogeneous system always has at least one solution.',
        correctAnswer: true,
        explanation:
          'True. A homogeneous system $Ax = 0$ always has the trivial solution $x = 0$.',
      },
      {
        id: 'math201-mid-q4',
        type: 'multiple_choice',
        prompt: 'If an augmented matrix row reduces to $[0 \; 0 \; 0 \; | \; 3]$, the system is:',
        options: [
          'Consistent with one solution',
          'Consistent with infinitely many solutions',
          'Inconsistent',
          'Dependent'
        ],
        correctAnswer: 2,
        explanation:
          'The row represents $0 = 3$, which is impossible. The system is inconsistent.',
      },
      {
        id: 'math201-mid-q5',
        type: 'multiple_choice',
        prompt: 'The RREF of a matrix is:',
        options: ['Always unique', 'Never unique', 'Unique only for square matrices', 'Unique only for invertible matrices'],
        correctAnswer: 0,
        explanation:
          'Every matrix has exactly one reduced row echelon form (RREF).',
      },
      {
        id: 'math201-mid-q6',
        type: 'fill_blank',
        prompt: 'In a matrix equation $Ax = b$, if the system is consistent, the solution set can be written as $x = p + $ ____ where $p$ is a particular solution.',
        correctAnswer: 'v_h',
        explanation: 'The general solution is $x = p + v_h$ where $v_h$ is the solution to the homogeneous system $Ax = 0$.',
      },
      {
        id: 'math201-mid-q7',
        type: 'written',
        prompt: 'Solve the system using row reduction:\n\n$x + y + z = 6$\n\n$2x - y + z = 3$\n\n$x + 2y - z = 5$',
        correctAnswer: 'x = 2, y = 1, z = 3',
        modelAnswer: 'Augmented matrix: $\\left[\\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\\\ 2 & -1 & 1 & 3 \\\\ 1 & 2 & -1 & 5 \\end{array}\\right]$\n\nRow reduce: $R_2 \\leftarrow R_2 - 2R_1$, $R_3 \\leftarrow R_3 - R_1$\n\n$\\left[\\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\\\ 0 & -3 & -1 & -9 \\\\ 0 & 1 & -2 & -1 \\end{array}\\right]$\n\nContinue to RREF: $\\left[\\begin{array}{ccc|c} 1 & 0 & 0 & 2 \\\\ 0 & 1 & 0 & 1 \\\\ 0 & 0 & 1 & 3 \\end{array}\\right]$\n\nSolution: $(2, 1, 3)$.',
        explanation: 'Use row operations to reduce to RREF, then read off the solution.',
      },

      // === TOPIC 2: Matrix Operations (7 questions) ===
      {
        id: 'math201-mid-q8',
        type: 'multiple_choice',
        prompt: 'For matrix multiplication $AB$ to be defined, what condition must hold?',
        options: [
          'Both matrices must be square',
          'Columns of $A$ = rows of $B$',
          'Rows of $A$ = columns of $B$',
          'Both matrices must have the same dimensions'
        ],
        correctAnswer: 1,
        explanation:
          'For $AB$ to be defined, the number of columns in $A$ must equal the number of rows in $B$.',
      },
      {
        id: 'math201-mid-q9',
        type: 'true_false',
        prompt: 'Matrix multiplication is commutative.',
        correctAnswer: false,
        explanation:
          'False. In general, $AB \\neq BA$ for matrices. Matrix multiplication is not commutative.',
      },
      {
        id: 'math201-mid-q10',
        type: 'fill_blank',
        prompt: 'If $A^T = A$, then matrix $A$ is called ____.',
        correctAnswer: 'symmetric',
        explanation: 'A matrix equal to its transpose is symmetric.',
      },
      {
        id: 'math201-mid-q11',
        type: 'multiple_choice',
        prompt: 'If $A$ and $B$ are invertible matrices, then $(AB)^{-1} = $:',
        options: [
          '$A^{-1}B^{-1}$',
          '$B^{-1}A^{-1}$',
          '$(A^{-1})(B^{-1})$',
          'Not enough information'
        ],
        correctAnswer: 1,
        explanation:
          'The inverse of a product reverses order: $(AB)^{-1} = B^{-1}A^{-1}$.',
      },
      {
        id: 'math201-mid-q12',
        type: 'multiple_choice',
        prompt: 'The determinant of a $2 \\times 2$ matrix $\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$ is:',
        options: ['$a + d$', '$ad - bc$', '$ac - bd$', '$abcd$'],
        correctAnswer: 1,
        explanation: 'For a $2 \\times 2$ matrix, det = $ad - bc$.',
      },
      {
        id: 'math201-mid-q13',
        type: 'written',
        prompt: 'Find the inverse of $A = \\begin{bmatrix} 3 & 1 \\\\ 5 & 2 \\end{bmatrix}$.',
        correctAnswer: 'A^{-1} = [[2, -1], [-5, 3]]',
        modelAnswer: '$\\det(A) = 3(2) - 1(5) = 6 - 5 = 1$\n\nSince det$(A) \\neq 0$, $A$ is invertible.\n\n$A^{-1} = \\frac{1}{1}\\begin{bmatrix} 2 & -1 \\\\ -5 & 3 \\end{bmatrix} = \\begin{bmatrix} 2 & -1 \\\\ -5 & 3 \\end{bmatrix}$',
        explanation: 'Use the formula for $2 \\times 2$ inverse: $A^{-1} = \\frac{1}{\\det(A)}\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}$.',
      },
      {
        id: 'math201-mid-q14',
        type: 'multiple_choice',
        prompt: 'An elementary matrix is obtained by:',
        options: [
          'Performing an elementary row operation on the identity matrix',
          'Multiplying a matrix by a scalar',
          'Taking the transpose',
          'Finding the determinant'
        ],
        correctAnswer: 0,
        explanation:
          'An elementary matrix results from performing one elementary row operation on the identity matrix.',
      },

      // === TOPIC 3: Vector Spaces (7 questions) ===
      {
        id: 'math201-mid-q15',
        type: 'multiple_choice',
        prompt: 'Which is NOT a requirement for a vector space?',
        options: [
          'Closure under addition',
          'Closure under scalar multiplication',
          'Existence of multiplicative identity for vectors',
          'Existence of additive identity'
        ],
        correctAnswer: 2,
        explanation:
          'Vector spaces require additive identity (zero vector) but not multiplicative identity for vectors.',
      },
      {
        id: 'math201-mid-q16',
        type: 'fill_blank',
        prompt: 'The null space of matrix $A$ is the set of all solutions to $Ax = $ ____.',
        correctAnswer: '0',
        explanation: 'Nul$(A) = \\{x : Ax = 0\\}$, the solution set of the homogeneous system.',
      },
      {
        id: 'math201-mid-q17',
        type: 'true_false',
        prompt: 'If a set contains the zero vector, it cannot be linearly independent.',
        correctAnswer: true,
        explanation:
          'True. Any set containing the zero vector is linearly dependent.',
      },
      {
        id: 'math201-mid-q18',
        type: 'multiple_choice',
        prompt: 'Vectors $\\{v_1, v_2, v_3\\}$ are linearly independent if and only if:',
        options: [
          'They span $\\mathbb{R}^3$',
          'The only solution to $c_1v_1 + c_2v_2 + c_3v_3 = 0$ is all $c_i = 0$',
          'They are orthogonal',
          'They all have different lengths'
        ],
        correctAnswer: 1,
        explanation:
          'Linear independence means the only linear combination giving zero is the trivial one.',
      },
      {
        id: 'math201-mid-q19',
        type: 'multiple_choice',
        prompt: 'The column space of $A$ is:',
        options: [
          'The set of all vectors $x$ such that $Ax = 0$',
          'The span of the columns of $A$',
          'The span of the rows of $A$',
          'The set of all $b$ such that $Ax = b$ is inconsistent'
        ],
        correctAnswer: 1,
        explanation:
          'Col$(A)$ is the span of the column vectors of $A$, all linear combinations of the columns.',
      },
      {
        id: 'math201-mid-q20',
        type: 'written',
        prompt: 'Determine if the vectors $\\begin{bmatrix} 1 \\\\ 2 \\\\ 3 \\end{bmatrix}$, $\\begin{bmatrix} 4 \\\\ 5 \\\\ 6 \\end{bmatrix}$, $\\begin{bmatrix} 7 \\\\ 8 \\\\ 9 \\end{bmatrix}$ are linearly independent.',
        correctAnswer: 'Linearly dependent',
        modelAnswer: 'Form matrix: $A = \\begin{bmatrix} 1 & 4 & 7 \\\\ 2 & 5 & 8 \\\\ 3 & 6 & 9 \\end{bmatrix}$\n\nRow reduce: RREF has only 2 pivots (not 3).\n\nSince the matrix has fewer pivots than columns, $Ax = 0$ has nontrivial solutions.\n\nThe vectors are **linearly dependent**.',
        explanation: 'Check if the matrix with these vectors as columns has full column rank.',
      },
      {
        id: 'math201-mid-q21',
        type: 'fill_blank',
        prompt: 'A ____ for a vector space $V$ is a linearly independent spanning set.',
        correctAnswer: 'basis',
        explanation: 'A basis is a minimal spanning set or maximal independent set.',
      },

      // === TOPIC 4: Linear Independence and Basis (7 questions) ===
      {
        id: 'math201-mid-q22',
        type: 'multiple_choice',
        prompt: 'The dimension of $\\mathbb{R}^n$ is:',
        options: ['$n-1$', '$n$', '$n+1$', 'Cannot be determined'],
        correctAnswer: 1,
        explanation:
          'The standard basis for $\\mathbb{R}^n$ has $n$ vectors, so dim$= n$.',
      },
      {
        id: 'math201-mid-q23',
        type: 'true_false',
        prompt: 'Every basis for a given vector space has the same number of vectors.',
        correctAnswer: true,
        explanation:
          'True. All bases for a vector space have the same number of vectors, which is the dimension.',
      },
      {
        id: 'math201-mid-q24',
        type: 'fill_blank',
        prompt: 'The Rank-Nullity Theorem states: rank$(A)$ + nullity$(A) = $ ____ (for an $m \\times n$ matrix).',
        correctAnswer: 'n',
        explanation: 'Rank + nullity equals the number of columns.',
      },
      {
        id: 'math201-mid-q25',
        type: 'multiple_choice',
        prompt: 'The pivot columns of matrix $A$ form a basis for:',
        options: [
          'Nul$(A)$',
          'Col$(A)$',
          'Row$(A)$',
          'All of $\\mathbb{R}^m$'
        ],
        correctAnswer: 1,
        explanation:
          'The pivot columns of the original matrix $A$ form a basis for Col$(A)$.',
      },
      {
        id: 'math201-mid-q26',
        type: 'multiple_choice',
        prompt: 'If $\\mathcal{B} = \\{b_1, b_2\\}$ is a basis and $[x]_\\mathcal{B} = \\begin{bmatrix} 3 \\\\ -2 \\end{bmatrix}$, then $x = $:',
        options: [
          '$3b_1 - 2b_2$',
          '$-2b_1 + 3b_2$',
          '$b_1 + b_2$',
          '$5b_1 + b_2$'
        ],
        correctAnswer: 0,
        explanation:
          'The coordinate vector gives the coefficients: $x = 3b_1 - 2b_2$.',
      },
      {
        id: 'math201-mid-q27',
        type: 'written',
        prompt: 'Find a basis for Nul$(A)$ where $A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 0 & 0 & 0 \\end{bmatrix}$.',
        correctAnswer: '{[-2, 1, 0], [-3, 0, 1]}',
        modelAnswer: 'Solve $Ax = 0$: $x_1 + 2x_2 + 3x_3 = 0$\n\n$x_1 = -2x_2 - 3x_3$ with $x_2, x_3$ free.\n\n$x = x_2\\begin{bmatrix} -2 \\\\ 1 \\\\ 0 \\end{bmatrix} + x_3\\begin{bmatrix} -3 \\\\ 0 \\\\ 1 \\end{bmatrix}$\n\nBasis for Nul$(A)$: $\\{\\begin{bmatrix} -2 \\\\ 1 \\\\ 0 \\end{bmatrix}, \\begin{bmatrix} -3 \\\\ 0 \\\\ 1 \\end{bmatrix}\\}$',
        explanation: 'Express the general solution in parametric vector form.',
      },
      {
        id: 'math201-mid-q28',
        type: 'multiple_choice',
        prompt: 'For a $5 \\times 7$ matrix with rank 4, what is the nullity?',
        options: ['$1$', '$2$', '$3$', '$4$'],
        correctAnswer: 2,
        explanation:
          'Rank-Nullity: $4 + \\text{nullity} = 7$, so nullity $= 3$.',
      },
    ],
  },

  {
    id: 'math201-exam-final',
    subjectId: 'math201',
    title: 'Math201 Final Exam - Linear Algebra (Comprehensive)',
    durationMinutes: 120,
    instructions: [
      'This is a comprehensive exam covering all 7 topics.',
      'Show all work for full credit on written questions.',
      'Calculators are permitted for arithmetic only.',
      'Budget your time wisely: approximately 3 minutes per question.',
      'Passing score is 70% or higher.',
    ],
    questions: [
      // === TOPIC 1: Systems (6 questions) ===
      {
        id: 'math201-final-q1',
        type: 'multiple_choice',
        prompt: 'A system with more unknowns than equations is called:',
        options: ['Overdetermined', 'Underdetermined', 'Square', 'Inconsistent'],
        correctAnswer: 1,
        explanation:
          'An underdetermined system has more unknowns than equations, often leading to infinitely many solutions.',
      },
      {
        id: 'math201-final-q2',
        type: 'fill_blank',
        prompt: 'In RREF, each leading entry is ____ and is the only nonzero entry in its column.',
        correctAnswer: '1',
        explanation: 'Each pivot in RREF is 1 and is the sole nonzero in its column.',
      },
      {
        id: 'math201-final-q3',
        type: 'true_false',
        prompt: 'If a system has no free variables, it has at most one solution.',
        correctAnswer: true,
        explanation:
          'True. No free variables means either a unique solution or no solution (if inconsistent).',
      },
      {
        id: 'math201-final-q4',
        type: 'multiple_choice',
        prompt: 'The general solution to $Ax = b$ can be written as:',
        options: [
          '$x = p$ only',
          '$x = v_h$ only',
          '$x = p + v_h$',
          'Cannot be determined'
        ],
        correctAnswer: 2,
        explanation:
          '$x = p + v_h$ where $p$ is a particular solution and $v_h$ solves the homogeneous system.',
      },
      {
        id: 'math201-final-q5',
        type: 'multiple_choice',
        prompt: 'Which row operation does NOT change the solution set?',
        options: [
          'Swapping two rows',
          'Multiplying a row by zero',
          'Adding a multiple of one row to another',
          'Both A and C'
        ],
        correctAnswer: 3,
        explanation:
          'Swapping rows and adding multiples of rows preserve solutions. Multiplying by zero loses information.',
      },
      {
        id: 'math201-final-q6',
        type: 'multiple_choice',
        prompt: 'For what value of $k$ is the system inconsistent?\n\n$x + 2y = 3$\n\n$2x + 4y = k$',
        options: ['$k = 3$', '$k = 6$', '$k \\neq 6$', 'Always consistent'],
        correctAnswer: 2,
        explanation:
          'The second equation must be $2($ first $) = 6$. If $k \\neq 6$, the system is inconsistent.',
      },

      // === TOPIC 2: Matrix Operations (6 questions) ===
      {
        id: 'math201-final-q7',
        type: 'multiple_choice',
        prompt: 'If $A$ is $3 \\times 4$ and $B$ is $4 \\times 5$, then $AB$ is:',
        options: ['$3 \\times 3$', '$3 \\times 5$', '$4 \\times 4$', 'Undefined'],
        correctAnswer: 1,
        explanation:
          'Matrix product dimensions: $(3 \\times 4)(4 \\times 5) = 3 \\times 5$.',
      },
      {
        id: 'math201-final-q8',
        type: 'true_false',
        prompt: 'Every square matrix is invertible.',
        correctAnswer: false,
        explanation:
          'False. A square matrix is invertible only if its determinant is nonzero.',
      },
      {
        id: 'math201-final-q9',
        type: 'fill_blank',
        prompt: 'If $A$ is invertible, then $(A^T)^{-1} = $ ____.',
        correctAnswer: '(A^{-1})^T',
        explanation: 'The inverse of the transpose equals the transpose of the inverse.',
      },
      {
        id: 'math201-final-q10',
        type: 'multiple_choice',
        prompt: 'The trace of a matrix is:',
        options: [
          'The sum of all entries',
          'The sum of diagonal entries',
          'The product of diagonal entries',
          'The determinant'
        ],
        correctAnswer: 1,
        explanation:
          'Trace is the sum of the main diagonal entries.',
      },
      {
        id: 'math201-final-q11',
        type: 'multiple_choice',
        prompt: 'For diagonal matrix $D = \\text{diag}(d_1, d_2, \\ldots, d_n)$, the inverse is:',
        options: [
          'Does not exist',
          '$\\text{diag}(1/d_1, 1/d_2, \\ldots, 1/d_n)$ if all $d_i \\neq 0$',
          '$\\text{diag}(-d_1, -d_2, \\ldots, -d_n)$',
          '$D^T$'
        ],
        correctAnswer: 1,
        explanation:
          'A diagonal matrix is invertible if all diagonal entries are nonzero; inverse has reciprocals on diagonal.',
      },
      {
        id: 'math201-final-q12',
        type: 'multiple_choice',
        prompt: 'In LU factorization, $L$ is:',
        options: [
          'Lower triangular',
          'Upper triangular',
          'Diagonal',
          'Symmetric'
        ],
        correctAnswer: 0,
        explanation:
          'LU factorization: $A = LU$ where $L$ is lower triangular and $U$ is upper triangular.',
      },

      // === TOPIC 3: Vector Spaces (6 questions) ===
      {
        id: 'math201-final-q13',
        type: 'multiple_choice',
        prompt: 'The span of $\\{v_1, v_2\\}$ is:',
        options: [
          'A point',
          'A line (if vectors are parallel)',
          'A plane (if vectors are not parallel)',
          'Both B and C depending on the vectors'
        ],
        correctAnswer: 3,
        explanation:
          'Span is a line if one vector is a multiple of the other, otherwise a plane (in $\\mathbb{R}^3$ or higher).',
      },
      {
        id: 'math201-final-q14',
        type: 'fill_blank',
        prompt: 'If $H$ is a subspace of $V$, then dim$(H)$ ____ dim$(V)$.',
        correctAnswer: '<=',
        explanation: 'Any subspace has dimension less than or equal to the containing space.',
      },
      {
        id: 'math201-final-q15',
        type: 'true_false',
        prompt: 'Every subset of $\\mathbb{R}^n$ is a vector space.',
        correctAnswer: false,
        explanation:
          'False. Only subsets closed under addition and scalar multiplication (subspaces) are vector spaces.',
      },
      {
        id: 'math201-final-q16',
        type: 'multiple_choice',
        prompt: 'The dimension of the null space is called:',
        options: ['Rank', 'Nullity', 'Trace', 'Determinant'],
        correctAnswer: 1,
        explanation:
          'Nullity is dim(Nul$(A)$), the number of free variables.',
      },
      {
        id: 'math201-final-q17',
        type: 'multiple_choice',
        prompt: 'Row space and column space of $A$ have:',
        options: [
          'Different dimensions always',
          'The same dimension',
          'No relationship',
          'The same vectors'
        ],
        correctAnswer: 1,
        explanation:
          'Both have dimension equal to rank$(A)$.',
      },
      {
        id: 'math201-final-q18',
        type: 'multiple_choice',
        prompt: 'Which set is a subspace of $\\mathbb{R}^2$?',
        options: [
          '$\\{(x, y) : x + y = 1\\}$',
          '$\\{(x, y) : xy = 0\\}$',
          '$\\{(x, y) : 2x - y = 0\\}$',
          '$\\{(x, y) : x > 0\\}$'
        ],
        correctAnswer: 2,
        explanation:
          'Only $2x - y = 0$ passes through origin and is closed under operations (it is a line through origin).',
      },

      // === TOPIC 4: Linear Independence (6 questions) ===
      {
        id: 'math201-final-q19',
        type: 'multiple_choice',
        prompt: 'Any set of more than $n$ vectors in $\\mathbb{R}^n$ is:',
        options: [
          'Linearly independent',
          'Linearly dependent',
          'A basis',
          'Cannot be determined'
        ],
        correctAnswer: 1,
        explanation:
          'More than $n$ vectors in $\\mathbb{R}^n$ must be linearly dependent.',
      },
      {
        id: 'math201-final-q20',
        type: 'fill_blank',
        prompt: 'If columns of $A$ are linearly independent, then Nul$(A) = $ ____.',
        correctAnswer: '{0}',
        explanation: 'Linear independence of columns means $Ax = 0$ has only the trivial solution.',
      },
      {
        id: 'math201-final-q21',
        type: 'true_false',
        prompt: 'The coordinate vector $[x]_\\mathcal{B}$ is unique for each $x$ and basis $\\mathcal{B}$.',
        correctAnswer: true,
        explanation:
          'True. Each vector has a unique representation in terms of any given basis.',
      },
      {
        id: 'math201-final-q22',
        type: 'multiple_choice',
        prompt: 'For a $4 \\times 6$ matrix with rank 3, the nullity is:',
        options: ['$1$', '$2$', '$3$', '$4$'],
        correctAnswer: 2,
        explanation:
          'Rank-Nullity: $3 + \\text{nullity} = 6$, so nullity $= 3$.',
      },
      {
        id: 'math201-final-q23',
        type: 'multiple_choice',
        prompt: 'The change-of-basis matrix from $\\mathcal{B}$ to $\\mathcal{C}$ converts:',
        options: [
          '$\\mathcal{B}$-coordinates to $\\mathcal{C}$-coordinates',
          '$\\mathcal{C}$-coordinates to $\\mathcal{B}$-coordinates',
          'Standard coordinates to $\\mathcal{B}$-coordinates',
          'None of the above'
        ],
        correctAnswer: 1,
        explanation:
          '$P_{\\mathcal{B} \\leftarrow \\mathcal{C}}$ converts from $\\mathcal{C}$ to $\\mathcal{B}$ coordinates.',
      },
      {
        id: 'math201-final-q24',
        type: 'multiple_choice',
        prompt: 'If $n$ vectors span $\\mathbb{R}^n$, they must be:',
        options: [
          'Linearly dependent',
          'Linearly independent',
          'Orthogonal',
          'Unit vectors'
        ],
        correctAnswer: 1,
        explanation:
          'If $n$ vectors span $\\mathbb{R}^n$ (dimension $n$), they must be linearly independent.',
      },

      // === TOPIC 5: Determinants (6 questions) ===
      {
        id: 'math201-final-q25',
        type: 'multiple_choice',
        prompt: 'If two rows of $A$ are identical, then det$(A) = $:',
        options: ['$0$', '$1$', '$-1$', 'Depends on the matrix'],
        correctAnswer: 0,
        explanation:
          'Identical rows (or columns) make the matrix singular with det $= 0$.',
      },
      {
        id: 'math201-final-q26',
        type: 'fill_blank',
        prompt: 'If you swap two rows of a matrix, the determinant is multiplied by ____.',
        correctAnswer: '-1',
        explanation: 'Swapping rows changes the sign of the determinant.',
      },
      {
        id: 'math201-final-q27',
        type: 'true_false',
        prompt: 'det$(AB) = $ det$(A) \\cdot$ det$(B)$ for square matrices.',
        correctAnswer: true,
        explanation:
          'True. The determinant of a product equals the product of determinants.',
      },
      {
        id: 'math201-final-q28',
        type: 'multiple_choice',
        prompt: 'For a triangular matrix, the determinant is:',
        options: [
          'The sum of diagonal entries',
          'The product of diagonal entries',
          'Always 1',
          'Always 0'
        ],
        correctAnswer: 1,
        explanation:
          'For triangular matrices, det equals the product of diagonal entries.',
      },
      {
        id: 'math201-final-q29',
        type: 'multiple_choice',
        prompt: 'If det$(A) = 0$, then:',
        options: [
          '$A$ is invertible',
          '$A$ is not invertible',
          '$A = 0$',
          '$A$ is diagonal'
        ],
        correctAnswer: 1,
        explanation:
          'Zero determinant means the matrix is singular (not invertible).',
      },
      {
        id: 'math201-final-q30',
        type: 'multiple_choice',
        prompt: 'The cofactor expansion can be performed along:',
        options: [
          'Any row only',
          'Any column only',
          'Any row or column',
          'Only the first row'
        ],
        correctAnswer: 2,
        explanation:
          'Cofactor expansion can be done along any row or column.',
      },

      // === TOPIC 6: Eigenvalues (6 questions) ===
      {
        id: 'math201-final-q31',
        type: 'multiple_choice',
        prompt: 'A vector $v$ is an eigenvector of $A$ if:',
        options: [
          '$Av = v$',
          '$Av = \\lambda v$ for some scalar $\\lambda$, $v \\neq 0$',
          '$Av = 0$',
          '$v$ is in the null space'
        ],
        correctAnswer: 1,
        explanation:
          'By definition, $v$ is an eigenvector if $Av = \\lambda v$ with $v \\neq 0$.',
      },
      {
        id: 'math201-final-q32',
        type: 'fill_blank',
        prompt: 'The eigenvalues of $A$ are the roots of the ____ polynomial.',
        correctAnswer: 'characteristic',
        explanation: 'Eigenvalues are solutions to det$(A - \\lambda I) = 0$.',
      },
      {
        id: 'math201-final-q33',
        type: 'true_false',
        prompt: 'The zero vector can be an eigenvector.',
        correctAnswer: false,
        explanation:
          'False. Eigenvectors must be nonzero by definition.',
      },
      {
        id: 'math201-final-q34',
        type: 'multiple_choice',
        prompt: 'If $A$ has eigenvalue $\\lambda$, then $A^2$ has eigenvalue:',
        options: ['$\\lambda$', '$2\\lambda$', '$\\lambda^2$', '$\\sqrt{\\lambda}$'],
        correctAnswer: 2,
        explanation:
          'If $Av = \\lambda v$, then $A^2v = \\lambda^2 v$.',
      },
      {
        id: 'math201-final-q35',
        type: 'multiple_choice',
        prompt: 'A matrix is diagonalizable if:',
        options: [
          'It has $n$ linearly independent eigenvectors',
          'It is symmetric',
          'It is invertible',
          'It has distinct eigenvalues'
        ],
        correctAnswer: 0,
        explanation:
          'An $n \\times n$ matrix is diagonalizable iff it has $n$ linearly independent eigenvectors.',
      },
      {
        id: 'math201-final-q36',
        type: 'multiple_choice',
        prompt: 'The trace of $A$ equals:',
        options: [
          'Product of eigenvalues',
          'Sum of eigenvalues',
          'Largest eigenvalue',
          'Determinant'
        ],
        correctAnswer: 1,
        explanation:
          'Trace equals the sum of eigenvalues (with multiplicity).',
      },

      // === TOPIC 7: Linear Transformations (6 questions) ===
      {
        id: 'math201-final-q37',
        type: 'multiple_choice',
        prompt: 'A linear transformation must satisfy:',
        options: [
          '$T(u + v) = T(u) + T(v)$ only',
          '$T(cu) = cT(u)$ only',
          'Both of the above',
          'Neither'
        ],
        correctAnswer: 2,
        explanation:
          'Linearity requires both additivity and homogeneity.',
      },
      {
        id: 'math201-final-q38',
        type: 'fill_blank',
        prompt: 'The kernel of $T$ is the set of all $x$ such that $T(x) = $ ____.',
        correctAnswer: '0',
        explanation: 'ker$(T) = \\{x : T(x) = 0\\}$.',
      },
      {
        id: 'math201-final-q39',
        type: 'true_false',
        prompt: '$T$ is one-to-one if and only if ker$(T) = \\{0\\}$.',
        correctAnswer: true,
        explanation:
          'True. One-to-one transformations have trivial kernel.',
      },
      {
        id: 'math201-final-q40',
        type: 'multiple_choice',
        prompt: 'The range of $T(x) = Ax$ is:',
        options: [
          'Nul$(A)$',
          'Col$(A)$',
          'Row$(A)$',
          '$\\mathbb{R}^n$'
        ],
        correctAnswer: 1,
        explanation:
          'Range of matrix transformation is the column space.',
      },
      {
        id: 'math201-final-q41',
        type: 'multiple_choice',
        prompt: 'If $T: \\mathbb{R}^4 \\to \\mathbb{R}^3$ with dim(ker$(T)$) = 1, then dim(range$(T)$) = :',
        options: ['$1$', '$2$', '$3$', '$4$'],
        correctAnswer: 2,
        explanation:
          'Rank-Nullity: $1 + \\text{dim(range)} = 4$, so dim(range) $= 3$.',
      },
      {
        id: 'math201-final-q42',
        type: 'multiple_choice',
        prompt: 'Similar matrices represent:',
        options: [
          'Different transformations',
          'The same transformation in different bases',
          'Inverse transformations',
          'Transposed transformations'
        ],
        correctAnswer: 1,
        explanation:
          'If $A = PBP^{-1}$, then $A$ and $B$ represent the same transformation in different bases.',
      },
    ],
  },
];
