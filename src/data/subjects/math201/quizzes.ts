import { Quiz } from '@/core/types';

export const math201Quizzes: Quiz[] = [
  // ============================================================================
  // TOPIC 1: Systems of Linear Equations (3 quizzes)
  // ============================================================================
  {
    id: 'math201-quiz-1a',
    subjectId: 'math201',
    topicId: 'math201-1',
    title: 'Systems of Linear Equations - Fundamentals',
    questions: [
      {
        id: 'math201-q1a-1',
        type: 'multiple_choice',
        prompt: 'What is the first step in Gaussian elimination?',
        options: [
          'Find the determinant',
          'Create the augmented matrix',
          'Find the inverse',
          'Calculate eigenvalues'
        ],
        correctAnswer: 1,
        explanation:
          'Gaussian elimination begins by writing the system as an augmented matrix, which combines the coefficient matrix and the constant vector.'
      },
      {
        id: 'math201-q1a-2',
        type: 'true_false',
        prompt: 'A system of linear equations can have exactly two solutions.',
        correctAnswer: false,
        explanation:
          'False. A linear system can have exactly one solution (consistent and independent), infinitely many solutions (consistent and dependent), or no solution (inconsistent). It cannot have exactly two solutions.'
      },
      {
        id: 'math201-q1a-3',
        type: 'multiple_choice',
        prompt: 'What does it mean for a system to be in row echelon form?',
        options: [
          'All zeros are at the bottom',
          'Leading entries move to the right in successive rows',
          'All entries below leading entries are zero',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation:
          'Row echelon form requires: (1) all zero rows at the bottom, (2) the leading entry of each row is to the right of the leading entry above it, and (3) all entries below a leading entry are zero.'
      },
      {
        id: 'math201-q1a-4',
        type: 'multiple_choice',
        prompt: 'A homogeneous system of linear equations always has at least:',
        options: [
          'One solution',
          'Two solutions',
          'No solution',
          'Infinitely many solutions'
        ],
        correctAnswer: 0,
        explanation:
          'A homogeneous system (where all constants are zero) always has at least the trivial solution (all variables equal zero).'
      },
      {
        id: 'math201-q1a-5',
        type: 'fill_blank',
        prompt: 'The matrix equation $Ax = b$ represents a system of ____ equations.',
        correctAnswer: 'linear',
        explanation: 'The matrix equation $Ax = b$ is the compact form of a system of linear equations.'
      }
    ]
  },
  {
    id: 'math201-quiz-1b',
    subjectId: 'math201',
    topicId: 'math201-1',
    title: 'Systems of Linear Equations - Application',
    questions: [
      {
        id: 'math201-q1b-1',
        type: 'multiple_choice',
        prompt: 'If an augmented matrix row reduces to $[0 \\; 0 \\; 0 \\; | \\; 5]$, the system is:',
        options: [
          'Consistent with one solution',
          'Consistent with infinitely many solutions',
          'Inconsistent',
          'Homogeneous'
        ],
        correctAnswer: 2,
        explanation:
          'The row $[0 \\; 0 \\; 0 \\; | \\; 5]$ represents $0 = 5$, which is impossible. Therefore the system is inconsistent (has no solution).'
      },
      {
        id: 'math201-q1b-2',
        type: 'multiple_choice',
        prompt: 'Which operation is NOT an elementary row operation?',
        options: [
          'Swap two rows',
          'Multiply a row by a nonzero scalar',
          'Add a multiple of one row to another',
          'Add two rows together and replace both'
        ],
        correctAnswer: 3,
        explanation:
          'The three elementary row operations are: (1) swap rows, (2) multiply a row by a nonzero scalar, and (3) add a multiple of one row to another row. We never replace both rows.'
      },
      {
        id: 'math201-q1b-3',
        type: 'true_false',
        prompt: 'Reduced row echelon form (RREF) of a matrix is unique.',
        correctAnswer: true,
        explanation:
          'True. Every matrix has exactly one reduced row echelon form, though there are many possible row echelon forms.'
      },
      {
        id: 'math201-q1b-4',
        type: 'multiple_choice',
        prompt: 'A system with more equations than unknowns is called:',
        options: [
          'Overdetermined',
          'Underdetermined',
          'Square',
          'Homogeneous'
        ],
        correctAnswer: 0,
        explanation:
          'An overdetermined system has more equations than unknowns. Such systems are often inconsistent unless there is redundancy.'
      },
      {
        id: 'math201-q1b-5',
        type: 'fill_blank',
        prompt: 'In RREF, the leading entry in each row is ____ and is the only nonzero entry in its column.',
        correctAnswer: '1',
        explanation: 'In reduced row echelon form, each leading entry (pivot) is 1, and it is the only nonzero entry in its column.'
      }
    ]
  },
  {
    id: 'math201-quiz-1c',
    subjectId: 'math201',
    topicId: 'math201-1',
    title: 'Systems of Linear Equations - Mastery',
    questions: [
      {
        id: 'math201-q1c-1',
        type: 'multiple_choice',
        prompt: 'If a homogeneous system has more unknowns than equations, it must have:',
        options: [
          'Only the trivial solution',
          'No solution',
          'Infinitely many solutions',
          'Exactly one nontrivial solution'
        ],
        correctAnswer: 2,
        explanation:
          'When a homogeneous system has more variables than equations, there are free variables, guaranteeing infinitely many solutions beyond the trivial solution.'
      },
      {
        id: 'math201-q1c-2',
        type: 'multiple_choice',
        prompt: 'The solution set of a consistent nonhomogeneous system $Ax = b$ can be written as:',
        options: [
          '$x = p$ where $p$ is a particular solution',
          '$x = p + v_h$ where $p$ is particular and $v_h$ is from homogeneous',
          'Only as a unique solution',
          'As the null space of $A$'
        ],
        correctAnswer: 1,
        explanation:
          'The general solution is $x = p + v_h$ where $p$ is any particular solution to $Ax = b$ and $v_h$ is the general solution to the homogeneous system $Ax = 0$.'
      },
      {
        id: 'math201-q1c-3',
        type: 'true_false',
        prompt: 'If $Ax = b$ is consistent for every vector $b$, then $A$ must be square.',
        correctAnswer: false,
        explanation:
          'False. The statement is true only if we require a unique solution for every $b$. For consistency alone, $A$ could have more rows than columns.'
      },
      {
        id: 'math201-q1c-4',
        type: 'multiple_choice',
        prompt: 'The equation $Ax = 0$ has only the trivial solution if and only if:',
        options: [
          'The columns of $A$ are linearly independent',
          'The columns of $A$ are linearly dependent',
          '$A$ has more rows than columns',
          '$A$ is symmetric'
        ],
        correctAnswer: 0,
        explanation:
          'The homogeneous equation $Ax = 0$ has only the trivial solution if and only if the columns of $A$ are linearly independent.'
      },
      {
        id: 'math201-q1c-5',
        type: 'fill_blank',
        prompt: 'A variable that is not a leading variable in RREF is called a ____ variable.',
        correctAnswer: 'free',
        explanation: 'Free variables correspond to columns without pivots and can take any value, generating infinitely many solutions.'
      }
    ]
  },

  // ============================================================================
  // TOPIC 2: Matrix Operations (3 quizzes)
  // ============================================================================
  {
    id: 'math201-quiz-2a',
    subjectId: 'math201',
    topicId: 'math201-2',
    title: 'Matrix Operations - Fundamentals',
    questions: [
      {
        id: 'math201-q2a-1',
        type: 'multiple_choice',
        prompt: 'For matrix multiplication $AB$ to be defined, what must be true?',
        options: [
          '$A$ and $B$ must be square',
          'Number of columns in $A$ equals number of rows in $B$',
          'Number of rows in $A$ equals number of columns in $B$',
          '$A$ and $B$ must have the same dimensions'
        ],
        correctAnswer: 1,
        explanation:
          'For $AB$ to be defined, the number of columns in $A$ must equal the number of rows in $B$.'
      },
      {
        id: 'math201-q2a-2',
        type: 'true_false',
        prompt: 'Matrix multiplication is commutative: $AB = BA$ for all matrices $A$ and $B$.',
        correctAnswer: false,
        explanation:
          'False. Matrix multiplication is NOT commutative in general. Even when both $AB$ and $BA$ are defined, they are usually not equal.'
      },
      {
        id: 'math201-q2a-3',
        type: 'multiple_choice',
        prompt: 'If $A$ is a $3 \\times 4$ matrix and $B$ is a $4 \\times 2$ matrix, what size is $AB$?',
        options: [
          '$3 \\times 2$',
          '$4 \\times 4$',
          '$3 \\times 4$',
          '$2 \\times 3$'
        ],
        correctAnswer: 0,
        explanation:
          'When multiplying an $m \\times n$ matrix by an $n \\times p$ matrix, the result is $m \\times p$. So $3 \\times 4$ times $4 \\times 2$ gives $3 \\times 2$.'
      },
      {
        id: 'math201-q2a-4',
        type: 'multiple_choice',
        prompt: 'The transpose of matrix $A$, denoted $A^T$, is formed by:',
        options: [
          'Inverting all the entries',
          'Swapping rows and columns',
          'Multiplying by -1',
          'Taking the reciprocal of each entry'
        ],
        correctAnswer: 1,
        explanation:
          'The transpose $A^T$ is formed by swapping rows and columns: the $(i,j)$ entry of $A$ becomes the $(j,i)$ entry of $A^T$.'
      },
      {
        id: 'math201-q2a-5',
        type: 'fill_blank',
        prompt: 'A matrix $A$ is invertible if there exists a matrix $B$ such that $AB = BA = $ ____.',
        correctAnswer: 'I',
        explanation: 'A matrix is invertible if there exists $B$ (called $A^{-1}$) such that $AB = BA = I$, the identity matrix.'
      }
    ]
  },
  {
    id: 'math201-quiz-2b',
    subjectId: 'math201',
    topicId: 'math201-2',
    title: 'Matrix Operations - Application',
    questions: [
      {
        id: 'math201-q2b-1',
        type: 'multiple_choice',
        prompt: 'If $A$ is invertible, then $(A^{-1})^T$ equals:',
        options: [
          '$A^T$',
          '$(A^T)^{-1}$',
          '$A$',
          '$-A^T$'
        ],
        correctAnswer: 1,
        explanation:
          'The transpose of the inverse equals the inverse of the transpose: $(A^{-1})^T = (A^T)^{-1}$.'
      },
      {
        id: 'math201-q2b-2',
        type: 'multiple_choice',
        prompt: 'An elementary matrix is obtained by:',
        options: [
          'Multiplying the identity matrix by a scalar',
          'Performing one elementary row operation on the identity matrix',
          'Taking the transpose of a matrix',
          'Inverting a matrix'
        ],
        correctAnswer: 1,
        explanation:
          'An elementary matrix is obtained by performing a single elementary row operation on an identity matrix.'
      },
      {
        id: 'math201-q2b-3',
        type: 'true_false',
        prompt: 'Every elementary matrix is invertible.',
        correctAnswer: true,
        explanation:
          'True. Every elementary matrix is invertible, and its inverse is also an elementary matrix corresponding to the reverse row operation.'
      },
      {
        id: 'math201-q2b-4',
        type: 'multiple_choice',
        prompt: 'A diagonal matrix has all nonzero entries:',
        options: [
          'In the first row',
          'In the first column',
          'On the main diagonal',
          'In the last row'
        ],
        correctAnswer: 2,
        explanation:
          'A diagonal matrix has all its nonzero entries on the main diagonal (where row index equals column index).'
      },
      {
        id: 'math201-q2b-5',
        type: 'fill_blank',
        prompt: 'If $A^T = A$, then matrix $A$ is called ____.',
        correctAnswer: 'symmetric',
        explanation: 'A matrix is symmetric if it equals its own transpose: $A^T = A$.'
      }
    ]
  },
  {
    id: 'math201-quiz-2c',
    subjectId: 'math201',
    topicId: 'math201-2',
    title: 'Matrix Operations - Mastery',
    questions: [
      {
        id: 'math201-q2c-1',
        type: 'multiple_choice',
        prompt: 'If $A$ and $B$ are invertible matrices of the same size, then $(AB)^{-1}$ equals:',
        options: [
          '$A^{-1}B^{-1}$',
          '$B^{-1}A^{-1}$',
          '$(A^{-1})(B^{-1})$',
          'Cannot be determined'
        ],
        correctAnswer: 1,
        explanation:
          'The inverse of a product is the product of inverses in reverse order: $(AB)^{-1} = B^{-1}A^{-1}$.'
      },
      {
        id: 'math201-q2c-2',
        type: 'multiple_choice',
        prompt: 'The LU factorization of a matrix $A$ expresses $A$ as:',
        options: [
          'A product of lower and upper triangular matrices',
          'A sum of lower and upper triangular matrices',
          'The transpose of a triangular matrix',
          'A diagonal matrix'
        ],
        correctAnswer: 0,
        explanation:
          'LU factorization expresses $A = LU$ where $L$ is lower triangular and $U$ is upper triangular.'
      },
      {
        id: 'math201-q2c-3',
        type: 'true_false',
        prompt: 'If $A$ is a square matrix and $AB = I$, then $BA = I$ automatically.',
        correctAnswer: true,
        explanation:
          'True. For square matrices, a one-sided inverse is automatically a two-sided inverse. If $AB = I$, then $BA = I$ as well.'
      },
      {
        id: 'math201-q2c-4',
        type: 'multiple_choice',
        prompt: 'A matrix $A$ is orthogonal if:',
        options: [
          '$A^T = A$',
          '$A^TA = I$',
          '$A = -A^T$',
          '$\\det(A) = 1$'
        ],
        correctAnswer: 1,
        explanation:
          'A matrix is orthogonal if its transpose equals its inverse: $A^TA = AA^T = I$.'
      },
      {
        id: 'math201-q2c-5',
        type: 'fill_blank',
        prompt: 'The trace of a square matrix is the sum of its ____ entries.',
        correctAnswer: 'diagonal',
        explanation: 'The trace is the sum of the diagonal entries: $\\text{tr}(A) = \\sum_{i=1}^n a_{ii}$.'
      }
    ]
  },

  // ============================================================================
  // TOPIC 3: Vector Spaces (3 quizzes)
  // ============================================================================
  {
    id: 'math201-quiz-3a',
    subjectId: 'math201',
    topicId: 'math201-3',
    title: 'Vector Spaces - Fundamentals',
    questions: [
      {
        id: 'math201-q3a-1',
        type: 'multiple_choice',
        prompt: 'Which of the following is NOT required for a set to be a vector space?',
        options: [
          'Closure under addition',
          'Closure under scalar multiplication',
          'Existence of additive identity',
          'Existence of multiplicative identity'
        ],
        correctAnswer: 3,
        explanation:
          'A vector space requires closure under addition and scalar multiplication, additive identity and inverses, but NOT a multiplicative identity for vectors.'
      },
      {
        id: 'math201-q3a-2',
        type: 'true_false',
        prompt: 'The set of all $2 \\times 2$ matrices forms a vector space.',
        correctAnswer: true,
        explanation:
          'True. The set of all $2 \\times 2$ matrices with standard matrix addition and scalar multiplication satisfies all vector space axioms.'
      },
      {
        id: 'math201-q3a-3',
        type: 'multiple_choice',
        prompt: 'A subspace of a vector space $V$ must:',
        options: [
          'Be equal to $V$',
          'Contain only the zero vector',
          'Be closed under addition and scalar multiplication',
          'Have the same dimension as $V$'
        ],
        correctAnswer: 2,
        explanation:
          'A subspace must be closed under vector addition and scalar multiplication, and must contain the zero vector. It need not equal $V$ or have the same dimension.'
      },
      {
        id: 'math201-q3a-4',
        type: 'multiple_choice',
        prompt: 'The null space of matrix $A$ is:',
        options: [
          'The set of all vectors $x$ such that $Ax = 0$',
          'The set of all vectors $x$ such that $Ax = b$',
          'The set of column vectors of $A$',
          'The set of row vectors of $A$'
        ],
        correctAnswer: 0,
        explanation:
          'The null space (kernel) of $A$ is $\\text{Nul}(A) = \\{x : Ax = 0\\}$, the solution set of the homogeneous equation.'
      },
      {
        id: 'math201-q3a-5',
        type: 'fill_blank',
        prompt: 'The column space of matrix $A$ is the set of all ____ of the columns of $A$.',
        correctAnswer: 'linear combinations',
        explanation: 'The column space Col$(A)$ is the span of the columns of $A$, i.e., all linear combinations of its columns.'
      }
    ]
  },
  {
    id: 'math201-quiz-3b',
    subjectId: 'math201',
    topicId: 'math201-3',
    title: 'Vector Spaces - Application',
    questions: [
      {
        id: 'math201-q3b-1',
        type: 'multiple_choice',
        prompt: 'The span of vectors $\\{v_1, v_2, \\ldots, v_k\\}$ is:',
        options: [
          'The largest vector',
          'All linear combinations of the vectors',
          'The sum of the vectors',
          'The product of the vectors'
        ],
        correctAnswer: 1,
        explanation:
          'Span$\\{v_1, \\ldots, v_k\\}$ is the set of all linear combinations $c_1v_1 + \\cdots + c_kv_k$ where $c_i$ are scalars.'
      },
      {
        id: 'math201-q3b-2',
        type: 'multiple_choice',
        prompt: 'Vectors $v_1, v_2, \\ldots, v_k$ are linearly independent if:',
        options: [
          'They all have different lengths',
          'The only solution to $c_1v_1 + \\cdots + c_kv_k = 0$ is all $c_i = 0$',
          'They span the entire space',
          'They are orthogonal'
        ],
        correctAnswer: 1,
        explanation:
          'Vectors are linearly independent if the only linear combination that gives the zero vector is the trivial combination (all coefficients zero).'
      },
      {
        id: 'math201-q3b-3',
        type: 'true_false',
        prompt: 'If a set contains the zero vector, it cannot be linearly independent.',
        correctAnswer: true,
        explanation:
          'True. Any set containing the zero vector is linearly dependent because $1 \\cdot 0 = 0$ provides a nontrivial linear combination equaling zero.'
      },
      {
        id: 'math201-q3b-4',
        type: 'multiple_choice',
        prompt: 'The dimension of the null space of $A$ is called:',
        options: [
          'The rank',
          'The nullity',
          'The trace',
          'The determinant'
        ],
        correctAnswer: 1,
        explanation:
          'The nullity of $A$ is the dimension of its null space, equal to the number of free variables in $Ax = 0$.'
      },
      {
        id: 'math201-q3b-5',
        type: 'fill_blank',
        prompt: 'A set of vectors that spans a vector space $V$ and is linearly independent is called a ____ for $V$.',
        correctAnswer: 'basis',
        explanation: 'A basis is a linearly independent spanning set. Every vector in $V$ can be uniquely expressed as a linear combination of basis vectors.'
      }
    ]
  },
  {
    id: 'math201-quiz-3c',
    subjectId: 'math201',
    topicId: 'math201-3',
    title: 'Vector Spaces - Mastery',
    questions: [
      {
        id: 'math201-q3c-1',
        type: 'multiple_choice',
        prompt: 'The dimension of $\\mathbb{R}^n$ is:',
        options: [
          '$1$',
          '$n-1$',
          '$n$',
          '$n+1$'
        ],
        correctAnswer: 2,
        explanation:
          'The standard basis for $\\mathbb{R}^n$ has $n$ vectors, so $\\dim(\\mathbb{R}^n) = n$.'
      },
      {
        id: 'math201-q3c-2',
        type: 'multiple_choice',
        prompt: 'If $\\{v_1, v_2, v_3\\}$ is a basis for vector space $V$, then $\\dim(V) = $:',
        options: [
          '$1$',
          '$2$',
          '$3$',
          'Cannot be determined'
        ],
        correctAnswer: 2,
        explanation:
          'The dimension of a vector space equals the number of vectors in any basis. Since the basis has 3 vectors, $\\dim(V) = 3$.'
      },
      {
        id: 'math201-q3c-3',
        type: 'true_false',
        prompt: 'Every basis for $\\mathbb{R}^n$ must contain exactly $n$ vectors.',
        correctAnswer: true,
        explanation:
          'True. All bases for a given vector space have the same number of vectors (the dimension). For $\\mathbb{R}^n$, every basis has $n$ vectors.'
      },
      {
        id: 'math201-q3c-4',
        type: 'multiple_choice',
        prompt: 'The row space and column space of a matrix $A$ have:',
        options: [
          'Different dimensions always',
          'The same dimension',
          'No relationship',
          'The same vectors'
        ],
        correctAnswer: 1,
        explanation:
          'The row space and column space of any matrix have the same dimension, which is the rank of the matrix.'
      },
      {
        id: 'math201-q3c-5',
        type: 'fill_blank',
        prompt: 'If $H$ is a subspace of finite-dimensional vector space $V$, then $\\dim(H)$ ____ $\\dim(V)$.',
        correctAnswer: '<=',
        explanation: 'Any subspace has dimension less than or equal to the dimension of the containing space: $\\dim(H) \\leq \\dim(V)$.'
      }
    ]
  },

  // ============================================================================
  // TOPIC 4: Linear Independence and Basis (3 quizzes)
  // ============================================================================
  {
    id: 'math201-quiz-4a',
    subjectId: 'math201',
    topicId: 'math201-4',
    title: 'Linear Independence and Basis - Fundamentals',
    questions: [
      {
        id: 'math201-q4a-1',
        type: 'multiple_choice',
        prompt: 'To test if vectors $\\{v_1, v_2, v_3\\}$ in $\\mathbb{R}^n$ are linearly independent, form matrix $A = [v_1 \\; v_2 \\; v_3]$ and:',
        options: [
          'Find the determinant',
          'Check if $Ax = 0$ has only the trivial solution',
          'Find the rank',
          'Both B and C'
        ],
        correctAnswer: 3,
        explanation:
          'Vectors are independent if and only if $Ax = 0$ has only the trivial solution, which occurs when the rank equals the number of columns.'
      },
      {
        id: 'math201-q4a-2',
        type: 'true_false',
        prompt: 'Any set of 5 vectors in $\\mathbb{R}^3$ must be linearly dependent.',
        correctAnswer: true,
        explanation:
          'True. In $\\mathbb{R}^3$, any set of more than 3 vectors is linearly dependent. You cannot have more linearly independent vectors than the dimension of the space.'
      },
      {
        id: 'math201-q4a-3',
        type: 'multiple_choice',
        prompt: 'The coordinate vector of $x$ with respect to basis $\\mathcal{B} = \\{b_1, b_2\\}$ is $[x]_\\mathcal{B} = \\begin{bmatrix} 3 \\\\ -2 \\end{bmatrix}$. This means:',
        options: [
          '$x = 3b_1 - 2b_2$',
          '$x = -2b_1 + 3b_2$',
          '$x = b_1 + b_2$',
          '$x = 3 - 2$'
        ],
        correctAnswer: 0,
        explanation:
          'The coordinate vector $[x]_\\mathcal{B} = \\begin{bmatrix} c_1 \\\\ c_2 \\end{bmatrix}$ means $x = c_1b_1 + c_2b_2$. So $x = 3b_1 - 2b_2$.'
      },
      {
        id: 'math201-q4a-4',
        type: 'multiple_choice',
        prompt: 'The Rank-Nullity Theorem states that for an $m \\times n$ matrix $A$:',
        options: [
          '$\\text{rank}(A) + \\text{nullity}(A) = m$',
          '$\\text{rank}(A) + \\text{nullity}(A) = n$',
          '$\\text{rank}(A) \\times \\text{nullity}(A) = n$',
          '$\\text{rank}(A) = \\text{nullity}(A)$'
        ],
        correctAnswer: 1,
        explanation:
          'The Rank-Nullity Theorem: rank$(A)$ + nullity$(A) = n$ (the number of columns). This relates the dimensions of column space and null space.'
      },
      {
        id: 'math201-q4a-5',
        type: 'fill_blank',
        prompt: 'The rank of a matrix is the dimension of its ____ space.',
        correctAnswer: 'column',
        explanation: 'The rank of a matrix is the dimension of its column space (also equals the dimension of its row space).'
      }
    ]
  },
  {
    id: 'math201-quiz-4b',
    subjectId: 'math201',
    topicId: 'math201-4',
    title: 'Linear Independence and Basis - Application',
    questions: [
      {
        id: 'math201-q4b-1',
        type: 'multiple_choice',
        prompt: 'If the columns of $A$ form a basis for $\\mathbb{R}^m$, then:',
        options: [
          '$A$ has $m$ linearly independent columns',
          '$A$ must be square',
          '$A$ is invertible',
          'All of the above if $A$ is $m \\times m$'
        ],
        correctAnswer: 3,
        explanation:
          'If columns form a basis for $\\mathbb{R}^m$, there must be exactly $m$ linearly independent columns. For an $m \\times m$ matrix, this means $A$ is invertible.'
      },
      {
        id: 'math201-q4b-2',
        type: 'multiple_choice',
        prompt: 'The change-of-basis matrix from basis $\\mathcal{B}$ to basis $\\mathcal{C}$ is denoted:',
        options: [
          '$P_{\\mathcal{B} \\leftarrow \\mathcal{C}}$',
          '$P_{\\mathcal{C} \\leftarrow \\mathcal{B}}$',
          '$\\mathcal{C} - \\mathcal{B}$',
          '$\\mathcal{B} \\times \\mathcal{C}$'
        ],
        correctAnswer: 0,
        explanation:
          'The change-of-basis matrix $P_{\\mathcal{B} \\leftarrow \\mathcal{C}}$ converts coordinates from $\\mathcal{C}$ to $\\mathcal{B}$: $[x]_\\mathcal{B} = P_{\\mathcal{B} \\leftarrow \\mathcal{C}}[x]_\\mathcal{C}$.'
      },
      {
        id: 'math201-q4b-3',
        type: 'true_false',
        prompt: 'The pivot columns of a matrix form a basis for its column space.',
        correctAnswer: true,
        explanation:
          'True. The pivot columns of the original matrix $A$ (not the RREF) form a basis for Col$(A)$.'
      },
      {
        id: 'math201-q4b-4',
        type: 'multiple_choice',
        prompt: 'If matrix $A$ has rank $r$, then the dimension of Nul$(A)$ is:',
        options: [
          '$r$',
          '$n - r$ where $n$ is the number of columns',
          '$m - r$ where $m$ is the number of rows',
          'Cannot be determined'
        ],
        correctAnswer: 1,
        explanation:
          'By the Rank-Nullity Theorem: nullity$(A) = n - r$ where $n$ is the number of columns and $r$ is the rank.'
      },
      {
        id: 'math201-q4b-5',
        type: 'fill_blank',
        prompt: 'The standard basis for $\\mathbb{R}^3$ is $\\{e_1, e_2, e_3\\}$ where $e_1 = \\begin{bmatrix} 1 \\\\ 0 \\\\ 0 \\end{bmatrix}$, and the entries are called ____.',
        correctAnswer: 'unit vectors',
        explanation: 'The standard basis vectors are unit vectors (length 1) aligned with the coordinate axes.'
      }
    ]
  },
  {
    id: 'math201-quiz-4c',
    subjectId: 'math201',
    topicId: 'math201-4',
    title: 'Linear Independence and Basis - Mastery',
    questions: [
      {
        id: 'math201-q4c-1',
        type: 'multiple_choice',
        prompt: 'If $\\mathcal{B} = \\{b_1, b_2\\}$ is a basis for $\\mathbb{R}^2$ and $P_{\\mathcal{B} \\leftarrow \\mathcal{E}} = [b_1 \\; b_2]$ where $\\mathcal{E}$ is the standard basis, then:',
        options: [
          '$[x]_\\mathcal{B} = P_{\\mathcal{B} \\leftarrow \\mathcal{E}} x$',
          '$x = P_{\\mathcal{B} \\leftarrow \\mathcal{E}} [x]_\\mathcal{B}$',
          '$x = [x]_\\mathcal{B}$',
          'None of the above'
        ],
        correctAnswer: 1,
        explanation:
          'The change-of-basis matrix $P_{\\mathcal{B} \\leftarrow \\mathcal{E}} = [b_1 \\; b_2]$ satisfies $x = P_{\\mathcal{B} \\leftarrow \\mathcal{E}}[x]_\\mathcal{B}$, converting $\\mathcal{B}$-coordinates to standard coordinates.'
      },
      {
        id: 'math201-q4c-2',
        type: 'multiple_choice',
        prompt: 'For which values of $k$ are the vectors $\\begin{bmatrix} 1 \\\\ 2 \\end{bmatrix}$ and $\\begin{bmatrix} 2 \\\\ k \\end{bmatrix}$ linearly dependent?',
        options: [
          '$k = 0$',
          '$k = 2$',
          '$k = 4$',
          'Never dependent'
        ],
        correctAnswer: 2,
        explanation:
          'Vectors in $\\mathbb{R}^2$ are dependent if one is a scalar multiple of the other. $\\begin{bmatrix} 2 \\\\ k \\end{bmatrix} = 2\\begin{bmatrix} 1 \\\\ 2 \\end{bmatrix}$ when $k = 4$.'
      },
      {
        id: 'math201-q4c-3',
        type: 'true_false',
        prompt: 'If vectors span $\\mathbb{R}^n$ and there are exactly $n$ vectors, they must be linearly independent.',
        correctAnswer: true,
        explanation:
          'True. If $n$ vectors span $\\mathbb{R}^n$ (which has dimension $n$), they must be linearly independent and form a basis.'
      },
      {
        id: 'math201-q4c-4',
        type: 'multiple_choice',
        prompt: 'The row space of $A$ equals:',
        options: [
          'The column space of $A$',
          'The column space of $A^T$',
          'The null space of $A$',
          'The null space of $A^T$'
        ],
        correctAnswer: 1,
        explanation:
          'Row$(A)$ = Col$(A^T)$ because the rows of $A$ are the columns of $A^T$.'
      },
      {
        id: 'math201-q4c-5',
        type: 'fill_blank',
        prompt: 'If $A$ is an $m \\times n$ matrix with rank $m$, we say $A$ has ____ rank.',
        correctAnswer: 'full',
        explanation: 'A matrix has full rank if its rank equals the minimum of $m$ and $n$. For rank $= m$, we specifically say full row rank.'
      }
    ]
  },

  // ============================================================================
  // TOPIC 5: Determinants (3 quizzes)
  // ============================================================================
  {
    id: 'math201-quiz-5a',
    subjectId: 'math201',
    topicId: 'math201-5',
    title: 'Determinants - Fundamentals',
    questions: [
      {
        id: 'math201-q5a-1',
        type: 'multiple_choice',
        prompt: 'The determinant of a $2 \\times 2$ matrix $\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$ is:',
        options: [
          '$a + d$',
          '$ad - bc$',
          '$ac - bd$',
          '$a - b - c + d$'
        ],
        correctAnswer: 1,
        explanation:
          'For a $2 \\times 2$ matrix, $\\det\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} = ad - bc$.'
      },
      {
        id: 'math201-q5a-2',
        type: 'true_false',
        prompt: 'If $\\det(A) = 0$, then $A$ is not invertible.',
        correctAnswer: true,
        explanation:
          'True. A matrix is invertible if and only if its determinant is nonzero. If $\\det(A) = 0$, the matrix is singular (not invertible).'
      },
      {
        id: 'math201-q5a-3',
        type: 'multiple_choice',
        prompt: 'If you swap two rows of a matrix $A$, the determinant:',
        options: [
          'Stays the same',
          'Changes sign',
          'Becomes zero',
          'Doubles'
        ],
        correctAnswer: 1,
        explanation:
          'Swapping two rows (or two columns) of a matrix changes the sign of the determinant.'
      },
      {
        id: 'math201-q5a-4',
        type: 'multiple_choice',
        prompt: 'The determinant of the identity matrix $I_n$ is:',
        options: [
          '$0$',
          '$1$',
          '$n$',
          '$-1$'
        ],
        correctAnswer: 1,
        explanation:
          'The determinant of any identity matrix is 1: $\\det(I_n) = 1$.'
      },
      {
        id: 'math201-q5a-5',
        type: 'fill_blank',
        prompt: 'The $(i,j)$-cofactor of matrix $A$ is $C_{ij} = (-1)^{i+j}$ times the ____ of the $(i,j)$ submatrix.',
        correctAnswer: 'determinant',
        explanation: 'The cofactor $C_{ij} = (-1)^{i+j}M_{ij}$ where $M_{ij}$ is the determinant of the submatrix obtained by deleting row $i$ and column $j$.'
      }
    ]
  },
  {
    id: 'math201-quiz-5b',
    subjectId: 'math201',
    topicId: 'math201-5',
    title: 'Determinants - Application',
    questions: [
      {
        id: 'math201-q5b-1',
        type: 'multiple_choice',
        prompt: 'If you multiply a row of matrix $A$ by scalar $k$, the determinant:',
        options: [
          'Is multiplied by $k$',
          'Is multiplied by $k^2$',
          'Stays the same',
          'Becomes zero'
        ],
        correctAnswer: 0,
        explanation:
          'Multiplying one row by $k$ multiplies the determinant by $k$. Therefore $\\det(kA) = k^n\\det(A)$ for an $n \\times n$ matrix.'
      },
      {
        id: 'math201-q5b-2',
        type: 'multiple_choice',
        prompt: 'For square matrices $A$ and $B$ of the same size, $\\det(AB) = $:',
        options: [
          '$\\det(A) + \\det(B)$',
          '$\\det(A) \\cdot \\det(B)$',
          '$\\det(A) - \\det(B)$',
          'Cannot be determined'
        ],
        correctAnswer: 1,
        explanation:
          'The determinant of a product equals the product of determinants: $\\det(AB) = \\det(A)\\det(B)$.'
      },
      {
        id: 'math201-q5b-3',
        type: 'true_false',
        prompt: 'If $A$ is invertible, then $\\det(A^{-1}) = \\frac{1}{\\det(A)}$.',
        correctAnswer: true,
        explanation:
          'True. Since $AA^{-1} = I$, we have $\\det(A)\\det(A^{-1}) = \\det(I) = 1$, so $\\det(A^{-1}) = \\frac{1}{\\det(A)}$.'
      },
      {
        id: 'math201-q5b-4',
        type: 'multiple_choice',
        prompt: 'Cramer\'s Rule can be used to solve $Ax = b$ when:',
        options: [
          '$A$ is square and invertible',
          '$A$ is any matrix',
          '$A$ is symmetric',
          '$\\det(A) = 1$'
        ],
        correctAnswer: 0,
        explanation:
          'Cramer\'s Rule applies when $A$ is square and invertible (i.e., $\\det(A) \\neq 0$). Each component is $x_i = \\frac{\\det(A_i)}{\\det(A)}$.'
      },
      {
        id: 'math201-q5b-5',
        type: 'fill_blank',
        prompt: 'The determinant of a triangular matrix equals the product of its ____ entries.',
        correctAnswer: 'diagonal',
        explanation: 'For any triangular matrix (upper or lower), the determinant is the product of the diagonal entries.'
      }
    ]
  },
  {
    id: 'math201-quiz-5c',
    subjectId: 'math201',
    topicId: 'math201-5',
    title: 'Determinants - Mastery',
    questions: [
      {
        id: 'math201-q5c-1',
        type: 'multiple_choice',
        prompt: 'The area of the parallelogram formed by vectors $\\begin{bmatrix} a \\\\ b \\end{bmatrix}$ and $\\begin{bmatrix} c \\\\ d \\end{bmatrix}$ is:',
        options: [
          '$|ad - bc|$',
          '$ad + bc$',
          '$\\sqrt{a^2 + b^2}$',
          '$ac + bd$'
        ],
        correctAnswer: 0,
        explanation:
          'The area is the absolute value of the determinant: $|\\det\\begin{bmatrix} a & c \\\\ b & d \\end{bmatrix}| = |ad - bc|$.'
      },
      {
        id: 'math201-q5c-2',
        type: 'multiple_choice',
        prompt: 'If $A$ has two identical rows, then $\\det(A) = $:',
        options: [
          '$0$',
          '$1$',
          '$2$',
          'Depends on the entries'
        ],
        correctAnswer: 0,
        explanation:
          'If a matrix has two identical rows (or columns), its determinant is 0 because the rows are linearly dependent.'
      },
      {
        id: 'math201-q5c-3',
        type: 'true_false',
        prompt: 'For any square matrix $A$, $\\det(A^T) = \\det(A)$.',
        correctAnswer: true,
        explanation:
          'True. The determinant of a matrix equals the determinant of its transpose: $\\det(A^T) = \\det(A)$.'
      },
      {
        id: 'math201-q5c-4',
        type: 'multiple_choice',
        prompt: 'The adjugate (classical adjoint) of matrix $A$ is:',
        options: [
          'The transpose of $A$',
          'The transpose of the cofactor matrix',
          'The inverse of $A$',
          'The determinant of $A$'
        ],
        correctAnswer: 1,
        explanation:
          'The adjugate adj$(A)$ is the transpose of the cofactor matrix. It satisfies $A \\cdot \\text{adj}(A) = \\det(A) \\cdot I$.'
      },
      {
        id: 'math201-q5c-5',
        type: 'fill_blank',
        prompt: 'If $A$ is $n \\times n$ and $\\det(A) = d$, then $\\det(2A) = $ ____ (in terms of $d$ and $n$).',
        correctAnswer: '2^n * d',
        explanation: 'Multiplying every entry by 2 multiplies each of the $n$ rows by 2, so $\\det(2A) = 2^n\\det(A) = 2^n d$.'
      }
    ]
  },

  // ============================================================================
  // TOPIC 6: Eigenvalues and Eigenvectors (3 quizzes)
  // ============================================================================
  {
    id: 'math201-quiz-6a',
    subjectId: 'math201',
    topicId: 'math201-6',
    title: 'Eigenvalues and Eigenvectors - Fundamentals',
    questions: [
      {
        id: 'math201-q6a-1',
        type: 'multiple_choice',
        prompt: 'A vector $v$ is an eigenvector of matrix $A$ if:',
        options: [
          '$Av = v$',
          '$Av = \\lambda v$ for some scalar $\\lambda$',
          '$Av = 0$',
          '$v = 0$'
        ],
        correctAnswer: 1,
        explanation:
          'By definition, $v$ is an eigenvector if $Av = \\lambda v$ for some scalar $\\lambda$ (the eigenvalue), and $v \\neq 0$.'
      },
      {
        id: 'math201-q6a-2',
        type: 'true_false',
        prompt: 'The zero vector can be an eigenvector.',
        correctAnswer: false,
        explanation:
          'False. By definition, eigenvectors must be nonzero. The equation $Av = \\lambda v$ holds for $v = 0$ with any $\\lambda$, but we exclude this trivial case.'
      },
      {
        id: 'math201-q6a-3',
        type: 'multiple_choice',
        prompt: 'The characteristic equation of matrix $A$ is:',
        options: [
          '$Av = \\lambda v$',
          '$\\det(A - \\lambda I) = 0$',
          '$A - \\lambda I = 0$',
          '$\\det(A) = \\lambda$'
        ],
        correctAnswer: 1,
        explanation:
          'The characteristic equation is $\\det(A - \\lambda I) = 0$. Its solutions are the eigenvalues of $A$.'
      },
      {
        id: 'math201-q6a-4',
        type: 'multiple_choice',
        prompt: 'For an $n \\times n$ matrix, the characteristic polynomial has degree:',
        options: [
          '$n-1$',
          '$n$',
          '$n+1$',
          '$2n$'
        ],
        correctAnswer: 1,
        explanation:
          'The characteristic polynomial $\\det(A - \\lambda I)$ is a polynomial in $\\lambda$ of degree $n$ for an $n \\times n$ matrix.'
      },
      {
        id: 'math201-q6a-5',
        type: 'fill_blank',
        prompt: 'The set of all eigenvectors corresponding to eigenvalue $\\lambda$ (plus the zero vector) is called the ____ of $\\lambda$.',
        correctAnswer: 'eigenspace',
        explanation: 'The eigenspace of $\\lambda$ is the null space of $(A - \\lambda I)$, containing all eigenvectors for $\\lambda$ plus the zero vector.'
      }
    ]
  },
  {
    id: 'math201-quiz-6b',
    subjectId: 'math201',
    topicId: 'math201-6',
    title: 'Eigenvalues and Eigenvectors - Application',
    questions: [
      {
        id: 'math201-q6b-1',
        type: 'multiple_choice',
        prompt: 'A matrix $A$ is diagonalizable if:',
        options: [
          'It has $n$ linearly independent eigenvectors',
          'It is already diagonal',
          'It is symmetric',
          'It is invertible'
        ],
        correctAnswer: 0,
        explanation:
          'An $n \\times n$ matrix is diagonalizable if and only if it has $n$ linearly independent eigenvectors, allowing $A = PDP^{-1}$ where $D$ is diagonal.'
      },
      {
        id: 'math201-q6b-2',
        type: 'multiple_choice',
        prompt: 'If $A = PDP^{-1}$ where $D$ is diagonal, then the columns of $P$ are:',
        options: [
          'The eigenvalues of $A$',
          'The eigenvectors of $A$',
          'The rows of $A$',
          'The diagonal entries of $D$'
        ],
        correctAnswer: 1,
        explanation:
          'In the diagonalization $A = PDP^{-1}$, the columns of $P$ are eigenvectors of $A$, and the diagonal entries of $D$ are the corresponding eigenvalues.'
      },
      {
        id: 'math201-q6b-3',
        type: 'true_false',
        prompt: 'Eigenvectors corresponding to different eigenvalues are always linearly independent.',
        correctAnswer: true,
        explanation:
          'True. If $v_1, \\ldots, v_k$ are eigenvectors corresponding to distinct eigenvalues, they are automatically linearly independent.'
      },
      {
        id: 'math201-q6b-4',
        type: 'multiple_choice',
        prompt: 'The trace of matrix $A$ equals:',
        options: [
          'The product of eigenvalues',
          'The sum of eigenvalues',
          'The largest eigenvalue',
          'The determinant'
        ],
        correctAnswer: 1,
        explanation:
          'The trace (sum of diagonal entries) equals the sum of eigenvalues: $\\text{tr}(A) = \\lambda_1 + \\cdots + \\lambda_n$.'
      },
      {
        id: 'math201-q6b-5',
        type: 'fill_blank',
        prompt: 'The determinant of matrix $A$ equals the ____ of its eigenvalues.',
        correctAnswer: 'product',
        explanation: 'The determinant equals the product of eigenvalues: $\\det(A) = \\lambda_1 \\cdots \\lambda_n$.'
      }
    ]
  },
  {
    id: 'math201-quiz-6c',
    subjectId: 'math201',
    topicId: 'math201-6',
    title: 'Eigenvalues and Eigenvectors - Mastery',
    questions: [
      {
        id: 'math201-q6c-1',
        type: 'multiple_choice',
        prompt: 'If $\\lambda$ is an eigenvalue of $A$, then $\\lambda^2$ is an eigenvalue of:',
        options: [
          '$A$',
          '$2A$',
          '$A^2$',
          '$A^{-1}$'
        ],
        correctAnswer: 2,
        explanation:
          'If $Av = \\lambda v$, then $A^2v = A(Av) = A(\\lambda v) = \\lambda(Av) = \\lambda^2 v$. So $\\lambda^2$ is an eigenvalue of $A^2$.'
      },
      {
        id: 'math201-q6c-2',
        type: 'multiple_choice',
        prompt: 'A symmetric matrix is always:',
        options: [
          'Invertible',
          'Diagonalizable',
          'Upper triangular',
          'Has determinant 1'
        ],
        correctAnswer: 1,
        explanation:
          'The Spectral Theorem guarantees that every symmetric matrix is diagonalizable (in fact, orthogonally diagonalizable).'
      },
      {
        id: 'math201-q6c-3',
        type: 'true_false',
        prompt: 'If 0 is an eigenvalue of $A$, then $A$ is not invertible.',
        correctAnswer: true,
        explanation:
          'True. If $\\lambda = 0$ is an eigenvalue, then $\\det(A - 0 \\cdot I) = \\det(A) = 0$, so $A$ is singular (not invertible).'
      },
      {
        id: 'math201-q6c-4',
        type: 'multiple_choice',
        prompt: 'The geometric multiplicity of eigenvalue $\\lambda$ is:',
        options: [
          'The number of times $\\lambda$ appears as a root of characteristic polynomial',
          'The dimension of the eigenspace of $\\lambda$',
          'Always equal to 1',
          'The trace of the matrix'
        ],
        correctAnswer: 1,
        explanation:
          'Geometric multiplicity is $\\dim(\\text{Nul}(A - \\lambda I))$, the dimension of the eigenspace. Algebraic multiplicity is the multiplicity as a root of the characteristic polynomial.'
      },
      {
        id: 'math201-q6c-5',
        type: 'fill_blank',
        prompt: 'If all eigenvalues of $A$ are positive, the matrix is called ____ definite.',
        correctAnswer: 'positive',
        explanation: 'A symmetric matrix with all positive eigenvalues is positive definite. All negative eigenvalues means negative definite.'
      }
    ]
  },

  // ============================================================================
  // TOPIC 7: Linear Transformations (3 quizzes)
  // ============================================================================
  {
    id: 'math201-quiz-7a',
    subjectId: 'math201',
    topicId: 'math201-7',
    title: 'Linear Transformations - Fundamentals',
    questions: [
      {
        id: 'math201-q7a-1',
        type: 'multiple_choice',
        prompt: 'A transformation $T: \\mathbb{R}^n \\to \\mathbb{R}^m$ is linear if:',
        options: [
          '$T(u + v) = T(u) + T(v)$ for all vectors $u, v$',
          '$T(cu) = cT(u)$ for all scalars $c$ and vectors $u$',
          'Both of the above',
          'Neither of the above'
        ],
        correctAnswer: 2,
        explanation:
          'A transformation is linear if it preserves both addition and scalar multiplication: $T(u+v) = T(u)+T(v)$ and $T(cu) = cT(u)$.'
      },
      {
        id: 'math201-q7a-2',
        type: 'true_false',
        prompt: 'Every linear transformation $T: \\mathbb{R}^n \\to \\mathbb{R}^m$ can be represented as $T(x) = Ax$ for some matrix $A$.',
        correctAnswer: true,
        explanation:
          'True. Every linear transformation between finite-dimensional vector spaces can be represented as matrix multiplication.'
      },
      {
        id: 'math201-q7a-3',
        type: 'multiple_choice',
        prompt: 'The kernel (null space) of linear transformation $T$ is:',
        options: [
          'The set of all outputs of $T$',
          'The set of all inputs that $T$ maps to zero',
          'The set of all invertible vectors',
          'The dimension of the domain'
        ],
        correctAnswer: 1,
        explanation:
          'ker$(T) = \\{x : T(x) = 0\\}$, the set of all vectors that map to the zero vector.'
      },
      {
        id: 'math201-q7a-4',
        type: 'multiple_choice',
        prompt: 'The range of linear transformation $T: \\mathbb{R}^n \\to \\mathbb{R}^m$ is:',
        options: [
          'All of $\\mathbb{R}^n$',
          'The set $\\{T(x) : x \\in \\mathbb{R}^n\\}$',
          'The kernel of $T$',
          'The null space of $T$'
        ],
        correctAnswer: 1,
        explanation:
          'The range of $T$ is the set of all possible outputs: range$(T) = \\{T(x) : x \\in \\mathbb{R}^n\\}$. For $T(x) = Ax$, this is Col$(A)$.'
      },
      {
        id: 'math201-q7a-5',
        type: 'fill_blank',
        prompt: 'For any linear transformation $T$, we always have $T(0) = $ ____.',
        correctAnswer: '0',
        explanation: 'Linear transformations always map the zero vector to the zero vector: $T(0) = T(0 \\cdot v) = 0 \\cdot T(v) = 0$.'
      }
    ]
  },
  {
    id: 'math201-quiz-7b',
    subjectId: 'math201',
    topicId: 'math201-7',
    title: 'Linear Transformations - Application',
    questions: [
      {
        id: 'math201-q7b-1',
        type: 'multiple_choice',
        prompt: 'A linear transformation $T$ is one-to-one if and only if:',
        options: [
          'ker$(T) = \\{0\\}$',
          'range$(T) = \\mathbb{R}^m$',
          '$T$ is invertible',
          'The matrix is square'
        ],
        correctAnswer: 0,
        explanation:
          'A linear transformation is one-to-one (injective) if and only if its kernel contains only the zero vector: ker$(T) = \\{0\\}$.'
      },
      {
        id: 'math201-q7b-2',
        type: 'multiple_choice',
        prompt: 'A linear transformation $T: \\mathbb{R}^n \\to \\mathbb{R}^m$ is onto if:',
        options: [
          'Every vector in $\\mathbb{R}^m$ is in the range of $T$',
          'ker$(T) = \\{0\\}$',
          '$n = m$',
          '$T$ is one-to-one'
        ],
        correctAnswer: 0,
        explanation:
          'A transformation is onto (surjective) if its range equals the entire codomain: range$(T) = \\mathbb{R}^m$.'
      },
      {
        id: 'math201-q7b-3',
        type: 'true_false',
        prompt: 'If $T: \\mathbb{R}^n \\to \\mathbb{R}^n$ is both one-to-one and onto, then $T$ is invertible.',
        correctAnswer: true,
        explanation:
          'True. A linear transformation from $\\mathbb{R}^n$ to $\\mathbb{R}^n$ that is both one-to-one and onto is an isomorphism and has an inverse.'
      },
      {
        id: 'math201-q7b-4',
        type: 'multiple_choice',
        prompt: 'The composition of linear transformations $T_1: \\mathbb{R}^n \\to \\mathbb{R}^m$ and $T_2: \\mathbb{R}^m \\to \\mathbb{R}^p$ is:',
        options: [
          'Always linear',
          'Never linear',
          'Linear only if both are invertible',
          'Linear only if $n = p$'
        ],
        correctAnswer: 0,
        explanation:
          'The composition $(T_2 \\circ T_1)(x) = T_2(T_1(x))$ is always linear if both $T_1$ and $T_2$ are linear.'
      },
      {
        id: 'math201-q7b-5',
        type: 'fill_blank',
        prompt: 'If $T(x) = Ax$ where $A$ is $m \\times n$, then $T$ maps $\\mathbb{R}^n$ to $\\mathbb{R}^{____}$.',
        correctAnswer: 'm',
        explanation: 'Matrix multiplication $Ax$ where $A$ is $m \\times n$ and $x$ is $n \\times 1$ produces an $m \\times 1$ vector in $\\mathbb{R}^m$.'
      }
    ]
  },
  {
    id: 'math201-quiz-7c',
    subjectId: 'math201',
    topicId: 'math201-7',
    title: 'Linear Transformations - Mastery',
    questions: [
      {
        id: 'math201-q7c-1',
        type: 'multiple_choice',
        prompt: 'Two matrices $A$ and $B$ are similar if there exists invertible $P$ such that:',
        options: [
          '$A = B$',
          '$A = PBP^{-1}$',
          '$A + B = P$',
          '$AP = PB$'
        ],
        correctAnswer: 1,
        explanation:
          'Matrices $A$ and $B$ are similar if $A = PBP^{-1}$ for some invertible matrix $P$. Similar matrices represent the same transformation in different bases.'
      },
      {
        id: 'math201-q7c-2',
        type: 'multiple_choice',
        prompt: 'Similar matrices have the same:',
        options: [
          'Entries',
          'Eigenvalues',
          'Eigenvectors',
          'Columns'
        ],
        correctAnswer: 1,
        explanation:
          'Similar matrices have the same eigenvalues, determinant, trace, and characteristic polynomial, but generally different eigenvectors and entries.'
      },
      {
        id: 'math201-q7c-3',
        type: 'true_false',
        prompt: 'A rotation in $\\mathbb{R}^2$ is a linear transformation.',
        correctAnswer: true,
        explanation:
          'True. Rotation about the origin is a linear transformation represented by a rotation matrix. It preserves addition and scalar multiplication.'
      },
      {
        id: 'math201-q7c-4',
        type: 'multiple_choice',
        prompt: 'Which transformation is NOT linear?',
        options: [
          'Rotation about the origin',
          'Reflection across a line through the origin',
          'Translation by a nonzero vector',
          'Projection onto a subspace'
        ],
        correctAnswer: 2,
        explanation:
          'Translation by a nonzero vector is not linear because it doesn\'t map the zero vector to zero: $T(0) = b \\neq 0$ for translation by $b$.'
      },
      {
        id: 'math201-q7c-5',
        type: 'fill_blank',
        prompt: 'The standard matrix of a linear transformation $T: \\mathbb{R}^n \\to \\mathbb{R}^m$ has columns that are $T(e_1), T(e_2), \\ldots, T(e_n)$ where $e_i$ are the ____ vectors.',
        correctAnswer: 'standard basis',
        explanation: 'The standard matrix $A$ is formed by computing $T$ applied to each standard basis vector: $A = [T(e_1) \\; T(e_2) \\; \\cdots \\; T(e_n)]$.'
      }
    ]
  }
];
