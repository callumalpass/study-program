import { CodingExercise } from '../../../../core/types';

export const topic4Exercises: CodingExercise[] = [
  {
    id: 'math302-t4-ex01',
    subjectId: 'math302',
    topicId: 'math302-topic-4',
    title: 'Find Eigenvalues - 2x2 Matrix',
    difficulty: 1,
    description: 'Find eigenvalues of the matrix [[3, 1], [0, 2]].',
    starterCode: `import numpy as np

def find_eigenvalues_2x2():
    """
    Find eigenvalues of [[3, 1], [0, 2]]
    Return sorted eigenvalues
    """
    pass`,
    solution: `import numpy as np

def find_eigenvalues_2x2():
    """
    Matrix [[3, 1], [0, 2]]
    Eigenvalues from det(A - λI) = 0
    (3-λ)(2-λ) = 0
    λ = 2, 3
    """
    A = np.array([[3, 1], [0, 2]])
    eigenvalues = np.linalg.eigvals(A)
    return sorted(eigenvalues.real)`,
    testCases: [
      { input: '', expectedOutput: '[2.0, 3.0]', isHidden: false, description: 'Eigenvalues 2 and 3' },
      { input: '', expectedOutput: '[2.0, 3.0]', isHidden: false, description: 'Triangular matrix' }
    ],
    hints: ['For triangular matrix, eigenvalues are diagonal entries', 'Use np.linalg.eigvals()', 'Can also solve det(A - λI) = 0'],
    language: 'python'
  },
  {
    id: 'math302-t4-ex02',
    subjectId: 'math302',
    topicId: 'math302-topic-4',
    title: 'Find Eigenvector',
    difficulty: 2,
    description: 'Find the eigenvector for eigenvalue λ=2 of matrix [[3, 1], [0, 2]].',
    starterCode: `import numpy as np

def find_eigenvector():
    """
    Find eigenvector for λ=2 of [[3, 1], [0, 2]]
    Return normalized eigenvector
    """
    pass`,
    solution: `import numpy as np

def find_eigenvector():
    """
    For λ=2: (A - 2I)v = 0
    [[1, 1], [0, 0]]v = 0
    v1 + v2 = 0
    Eigenvector: [1, -1] or normalized
    """
    A = np.array([[3, 1], [0, 2]])
    eigenvalues, eigenvectors = np.linalg.eig(A)
    idx = np.argmin(np.abs(eigenvalues - 2))
    v = eigenvectors[:, idx].real
    # Normalize to match [1, -1] direction
    v = v / v[0]
    return v`,
    testCases: [
      { input: '', expectedOutput: '[1.0, -1.0]', isHidden: false, description: 'Eigenvector for λ=2' },
      { input: '', expectedOutput: '[1.0, -1.0]', isHidden: false, description: 'Direction [1, -1]' }
    ],
    hints: ['Solve (A - λI)v = 0', 'Set up system: [[1,1],[0,0]]v = 0', 'One free variable gives eigenvector [1, -1]'],
    language: 'python'
  },
  {
    id: 'math302-t4-ex03',
    subjectId: 'math302',
    topicId: 'math302-topic-4',
    title: 'Solve System - Distinct Real Eigenvalues',
    difficulty: 2,
    description: 'Solve dx/dt = [[1, 2], [2, 1]]x with x(0) = [1, 1].',
    starterCode: `import numpy as np
from scipy.integrate import odeint

def solve_system_distinct(t):
    """
    Solve dx/dt = Ax with A = [[1, 2], [2, 1]]
    x(0) = [1, 1]
    """
    pass`,
    solution: `import numpy as np
from scipy.integrate import odeint

def solve_system_distinct(t):
    """
    A = [[1, 2], [2, 1]]
    Eigenvalues: 3, -1
    Eigenvectors: [1, 1], [1, -1]
    General: x = c1*[1,1]*e^(3t) + c2*[1,-1]*e^(-t)
    With x(0) = [1, 1]: c1 = 1, c2 = 0
    Solution: x = [e^(3t), e^(3t)]
    """
    return np.array([np.exp(3*t), np.exp(3*t)])`,
    testCases: [
      { input: '0', expectedOutput: '[1.0, 1.0]', isHidden: false, description: 'Initial condition' },
      { input: '1', expectedOutput: '[20.0855, 20.0855]', isHidden: false, description: 't = 1' },
      { input: '0.5', expectedOutput: '[4.4817, 4.4817]', isHidden: false, description: 'Intermediate value' },
      { input: '-1', expectedOutput: '[0.0498, 0.0498]', isHidden: true, description: 'Negative t' }
    ],
    hints: ['Find eigenvalues and eigenvectors of A', 'General solution: x = c1*v1*e^(λ1*t) + c2*v2*e^(λ2*t)', 'Apply initial condition to find c1, c2'],
    language: 'python'
  },
  {
    id: 'math302-t4-ex04',
    subjectId: 'math302',
    topicId: 'math302-topic-4',
    title: 'Complex Eigenvalues',
    difficulty: 3,
    description: 'Find eigenvalues of [[0, -1], [1, 0]].',
    starterCode: `import numpy as np

def find_complex_eigenvalues():
    """
    Find eigenvalues of [[0, -1], [1, 0]]
    Return eigenvalues
    """
    pass`,
    solution: `import numpy as np

def find_complex_eigenvalues():
    """
    A = [[0, -1], [1, 0]]
    det(A - λI) = λ^2 + 1 = 0
    λ = ±i
    """
    A = np.array([[0, -1], [1, 0]])
    eigenvalues = np.linalg.eigvals(A)
    return sorted(eigenvalues, key=lambda x: x.imag)`,
    testCases: [
      { input: '', expectedOutput: '[-1j, 1j]', isHidden: false, description: 'Pure imaginary ±i' },
      { input: '', expectedOutput: '[-1j, 1j]', isHidden: false, description: 'Rotation matrix eigenvalues' }
    ],
    hints: ['Characteristic equation: λ^2 + 1 = 0', 'This is a 90° rotation matrix', 'Eigenvalues are ±i'],
    language: 'python'
  },
  {
    id: 'math302-t4-ex05',
    subjectId: 'math302',
    topicId: 'math302-topic-4',
    title: 'Solve System - Pure Imaginary Eigenvalues',
    difficulty: 3,
    description: 'Solve dx/dt = [[0, -1], [1, 0]]x with x(0) = [1, 0].',
    starterCode: `import numpy as np

def solve_rotation_system(t):
    """
    Solve dx/dt = [[0, -1], [1, 0]]x
    x(0) = [1, 0]
    """
    pass`,
    solution: `import numpy as np

def solve_rotation_system(t):
    """
    A = [[0, -1], [1, 0]]
    Eigenvalues: ±i
    Real solution from Euler formula
    x(t) = [cos(t), sin(t)]
    This rotates initial vector counterclockwise
    """
    return np.array([np.cos(t), np.sin(t)])`,
    testCases: [
      { input: '0', expectedOutput: '[1.0, 0.0]', isHidden: false, description: 'Initial condition' },
      { input: 'np.pi/2', expectedOutput: '[0.0, 1.0]', isHidden: false, description: '90° rotation' },
      { input: 'np.pi', expectedOutput: '[-1.0, 0.0]', isHidden: false, description: '180° rotation' },
      { input: '-np.pi/2', expectedOutput: '[0.0, -1.0]', isHidden: true, description: '-90° rotation' }
    ],
    hints: ['Complex eigenvalues ±i give oscillating solutions', 'Real solution: x = cos(t)*v_real - sin(t)*v_imag', 'This represents rotation in phase plane'],
    language: 'python'
  },
  {
    id: 'math302-t4-ex06',
    subjectId: 'math302',
    topicId: 'math302-topic-4',
    title: 'Solve System - General Complex Eigenvalues',
    difficulty: 3,
    description: 'Solve dx/dt = [[-1, -2], [2, -1]]x with x(0) = [1, 0].',
    starterCode: `import numpy as np

def solve_spiral_system(t):
    """
    Solve dx/dt = [[-1, -2], [2, -1]]x
    x(0) = [1, 0]
    """
    pass`,
    solution: `import numpy as np

def solve_spiral_system(t):
    """
    A = [[-1, -2], [2, -1]]
    Eigenvalues: -1 ± 2i
    Solution: e^(-t)[cos(2t), sin(2t)] (after applying IC)
    This is a spiral sink
    """
    return np.exp(-t) * np.array([np.cos(2*t), np.sin(2*t)])`,
    testCases: [
      { input: '0', expectedOutput: '[1.0, 0.0]', isHidden: false, description: 'Initial condition' },
      { input: 'np.pi/4', expectedOutput: '[0.0, 0.4559]', isHidden: false, description: 't = π/4' },
      { input: 'np.pi/2', expectedOutput: '[-0.2079, 0.0]', isHidden: false, description: 't = π/2' },
      { input: 'np.pi', expectedOutput: '[0.0432, 0.0]', isHidden: true, description: 'Approaches origin' }
    ],
    hints: ['Eigenvalues: -1 ± 2i (α = -1, β = 2)', 'Solution spirals inward (α < 0)', 'Exponential decay with oscillation'],
    language: 'python'
  },
  {
    id: 'math302-t4-ex07',
    subjectId: 'math302',
    topicId: 'math302-topic-4',
    title: 'Repeated Eigenvalue - Sufficient Eigenvectors',
    difficulty: 4,
    description: 'Find eigenvalues of [[2, 0], [0, 2]].',
    starterCode: `import numpy as np

def repeated_eigenvalue_diagonal():
    """
    Find eigenvalues of [[2, 0], [0, 2]]
    """
    pass`,
    solution: `import numpy as np

def repeated_eigenvalue_diagonal():
    """
    A = 2*I
    Eigenvalue λ = 2 (repeated)
    Every vector is an eigenvector
    Two independent eigenvectors: [1,0], [0,1]
    """
    A = np.array([[2, 0], [0, 2]])
    eigenvalues = np.linalg.eigvals(A)
    return sorted(eigenvalues.real)`,
    testCases: [
      { input: '', expectedOutput: '[2.0, 2.0]', isHidden: false, description: 'Repeated eigenvalue 2' },
      { input: '', expectedOutput: '[2.0, 2.0]', isHidden: false, description: 'Scalar matrix' }
    ],
    hints: ['This is a scalar multiple of identity', 'Every vector is an eigenvector', 'Two independent eigenvectors exist'],
    language: 'python'
  },
  {
    id: 'math302-t4-ex08',
    subjectId: 'math302',
    topicId: 'math302-topic-4',
    title: 'Repeated Eigenvalue - Defective Matrix',
    difficulty: 4,
    description: 'Find eigenvalues and number of independent eigenvectors for [[2, 1], [0, 2]].',
    starterCode: `import numpy as np

def defective_matrix():
    """
    For A = [[2, 1], [0, 2]]
    Return (eigenvalue, number_of_independent_eigenvectors)
    """
    pass`,
    solution: `import numpy as np

def defective_matrix():
    """
    A = [[2, 1], [0, 2]]
    Eigenvalue λ = 2 (repeated)
    (A - 2I) = [[0, 1], [0, 0]]
    Rank = 1, nullity = 1
    Only one independent eigenvector
    This is a defective matrix
    """
    return (2.0, 1)`,
    testCases: [
      { input: '', expectedOutput: '(2.0, 1)', isHidden: false, description: 'Defective: one eigenvector' },
      { input: '', expectedOutput: '(2.0, 1)', isHidden: false, description: 'Repeated λ=2, one eigenvector' }
    ],
    hints: ['Repeated eigenvalue λ = 2', 'Solve (A - 2I)v = 0', 'Only one independent solution exists'],
    language: 'python'
  },
  {
    id: 'math302-t4-ex09',
    subjectId: 'math302',
    topicId: 'math302-topic-4',
    title: 'Solve System - Repeated Eigenvalue',
    difficulty: 4,
    description: 'Solve dx/dt = [[2, 1], [0, 2]]x with x(0) = [0, 1].',
    starterCode: `import numpy as np

def solve_repeated_eigenvalue(t):
    """
    Solve dx/dt = [[2, 1], [0, 2]]x
    x(0) = [0, 1]
    """
    pass`,
    solution: `import numpy as np

def solve_repeated_eigenvalue(t):
    """
    A = [[2, 1], [0, 2]]
    Repeated eigenvalue λ = 2
    Eigenvector: v = [1, 0]
    Need generalized eigenvector w from (A-2I)w = v
    w = [0, 1]
    General: x = c1*[1,0]*e^(2t) + c2*([0,1] + [1,0]*t)*e^(2t)
    With x(0) = [0, 1]: c1 = 0, c2 = 1
    Solution: x = [t, 1]*e^(2t)
    """
    return np.exp(2*t) * np.array([t, 1])`,
    testCases: [
      { input: '0', expectedOutput: '[0.0, 1.0]', isHidden: false, description: 'Initial condition' },
      { input: '1', expectedOutput: '[7.3891, 7.3891]', isHidden: false, description: 't = 1' },
      { input: '0.5', expectedOutput: '[1.3591, 2.7183]', isHidden: false, description: 'Intermediate value' },
      { input: '2', expectedOutput: '[109.1963, 54.5982]', isHidden: true, description: 't = 2' }
    ],
    hints: ['Need generalized eigenvector for defective matrix', 'Solve (A - λI)w = v where v is eigenvector', 'Solution includes t*e^(λt) term'],
    language: 'python'
  },
  {
    id: 'math302-t4-ex10',
    subjectId: 'math302',
    topicId: 'math302-topic-4',
    title: 'Phase Portrait Classification',
    difficulty: 4,
    description: 'Classify the equilibrium at origin for dx/dt = [[3, 0], [0, -2]]x.',
    starterCode: `import numpy as np

def classify_equilibrium():
    """
    Classify equilibrium for A = [[3, 0], [0, -2]]
    Return classification: 'saddle', 'node', 'spiral', or 'center'
    """
    pass`,
    solution: `import numpy as np

def classify_equilibrium():
    """
    A = [[3, 0], [0, -2]]
    Eigenvalues: 3, -2 (real, opposite signs)
    One positive, one negative => saddle point
    """
    return 'saddle'`,
    testCases: [
      { input: '', expectedOutput: 'saddle', isHidden: false, description: 'Saddle point' },
      { input: '', expectedOutput: 'saddle', isHidden: false, description: 'Opposite sign eigenvalues' }
    ],
    hints: ['Find eigenvalues: 3 and -2', 'Real eigenvalues with opposite signs', 'This is a saddle point (unstable)'],
    language: 'python'
  },
  {
    id: 'math302-t4-ex11',
    subjectId: 'math302',
    topicId: 'math302-topic-4',
    title: 'Stability Analysis',
    difficulty: 4,
    description: 'Determine stability of dx/dt = [[-1, 2], [-2, -1]]x.',
    starterCode: `import numpy as np

def determine_stability():
    """
    For A = [[-1, 2], [-2, -1]]
    Return 'stable', 'unstable', or 'center'
    """
    pass`,
    solution: `import numpy as np

def determine_stability():
    """
    A = [[-1, 2], [-2, -1]]
    Eigenvalues: -1 ± 2i
    Real part α = -1 < 0
    Negative real part => stable spiral
    """
    A = np.array([[-1, 2], [-2, -1]])
    eigenvalues = np.linalg.eigvals(A)
    max_real = np.max(eigenvalues.real)
    if max_real < 0:
        return 'stable'
    elif max_real > 0:
        return 'unstable'
    else:
        return 'center'`,
    testCases: [
      { input: '', expectedOutput: 'stable', isHidden: false, description: 'Stable spiral' },
      { input: '', expectedOutput: 'stable', isHidden: false, description: 'Negative real parts' }
    ],
    hints: ['Find eigenvalues: -1 ± 2i', 'Check real part of eigenvalues', 'Real part < 0 means stable'],
    language: 'python'
  },
  {
    id: 'math302-t4-ex12',
    subjectId: 'math302',
    topicId: 'math302-topic-4',
    title: 'Trace-Determinant Classification',
    difficulty: 5,
    description: 'For 2×2 matrix A, classify using trace τ = tr(A) and determinant Δ = det(A). Given τ = -2, Δ = 5.',
    starterCode: `import numpy as np

def classify_trace_det(tau, delta):
    """
    Classify equilibrium using trace and determinant
    tau = trace, delta = determinant
    Return: 'saddle', 'node', 'spiral', 'center', or 'degenerate'
    """
    pass`,
    solution: `import numpy as np

def classify_trace_det(tau, delta):
    """
    τ = -2, Δ = 5
    Eigenvalues from λ^2 - τλ + Δ = 0
    Discriminant: τ^2 - 4Δ = 4 - 20 = -16 < 0
    => complex eigenvalues
    τ < 0 => stable spiral
    """
    discriminant = tau**2 - 4*delta

    if delta < 0:
        return 'saddle'
    elif discriminant > 0:
        if tau < 0:
            return 'stable node'
        else:
            return 'unstable node'
    elif discriminant < 0:
        if tau < 0:
            return 'stable spiral'
        elif tau > 0:
            return 'unstable spiral'
        else:
            return 'center'
    else:
        return 'degenerate'`,
    testCases: [
      { input: '-2, 5', expectedOutput: 'stable spiral', isHidden: false, description: 'τ=-2, Δ=5' },
      { input: '0, 1', expectedOutput: 'center', isHidden: false, description: 'τ=0, Δ=1' },
      { input: '3, -1', expectedOutput: 'saddle', isHidden: true, description: 'τ=3, Δ=-1' },
      { input: '-4, 3', expectedOutput: 'stable node', isHidden: true, description: 'τ=-4, Δ=3' }
    ],
    hints: ['Discriminant D = τ² - 4Δ determines eigenvalue type', 'D < 0: complex (spiral/center)', 'D > 0: real (node/saddle)', 'Sign of τ and Δ determine stability'],
    language: 'python'
  },
  {
    id: 'math302-t4-ex13',
    subjectId: 'math302',
    topicId: 'math302-topic-4',
    title: 'Nonhomogeneous System',
    difficulty: 5,
    description: 'Solve dx/dt = [[1, 0], [0, -1]]x + [2, 0] with x(0) = [0, 0].',
    starterCode: `import numpy as np
from scipy.integrate import odeint

def solve_nonhomogeneous_system(t):
    """
    Solve dx/dt = [[1, 0], [0, -1]]x + [2, 0]
    x(0) = [0, 0]
    """
    pass`,
    solution: `import numpy as np
from scipy.integrate import odeint

def solve_nonhomogeneous_system(t):
    """
    dx/dt = [[1, 0], [0, -1]]x + [2, 0]
    Particular solution: x_p = [-2, 0] (constant)
    Homogeneous: x_h = [c1*e^t, c2*e^(-t)]
    General: x = [-2 + c1*e^t, c2*e^(-t)]
    With x(0) = [0, 0]: c1 = 2, c2 = 0
    Solution: x = [2(e^t - 1), 0]
    """
    return np.array([2*(np.exp(t) - 1), 0])`,
    testCases: [
      { input: '0', expectedOutput: '[0.0, 0.0]', isHidden: false, description: 'Initial condition' },
      { input: '1', expectedOutput: '[3.4366, 0.0]', isHidden: false, description: 't = 1' },
      { input: '2', expectedOutput: '[12.7781, 0.0]', isHidden: false, description: 't = 2' },
      { input: '0.5', expectedOutput: '[1.2974, 0.0]', isHidden: true, description: 'Intermediate value' }
    ],
    hints: ['Find particular solution by trying constant vector', 'Add homogeneous solution', 'Apply initial condition to find constants'],
    language: 'python'
  },
  {
    id: 'math302-t4-ex14',
    subjectId: 'math302',
    topicId: 'math302-topic-4',
    title: 'Matrix Exponential',
    difficulty: 5,
    description: 'Compute e^(At) for A = [[0, 1], [0, 0]] at t = 1.',
    starterCode: `import numpy as np
from scipy.linalg import expm

def matrix_exponential():
    """
    Compute e^(At) at t = 1 for A = [[0, 1], [0, 0]]
    """
    pass`,
    solution: `import numpy as np
from scipy.linalg import expm

def matrix_exponential():
    """
    A = [[0, 1], [0, 0]]
    A is nilpotent: A^2 = 0
    e^(At) = I + At + (At)^2/2! + ... = I + At
    At t=1: e^A = [[1, 1], [0, 1]]
    """
    A = np.array([[0, 1], [0, 0]])
    return expm(A)`,
    testCases: [
      { input: '', expectedOutput: '[[1.0, 1.0], [0.0, 1.0]]', isHidden: false, description: 'e^A at t=1' },
      { input: '', expectedOutput: '[[1.0, 1.0], [0.0, 1.0]]', isHidden: false, description: 'Nilpotent matrix' }
    ],
    hints: ['A² = 0 (nilpotent)', 'Series e^A = I + A + A²/2! + ... terminates', 'e^A = I + A for this matrix'],
    language: 'python'
  },
  {
    id: 'math302-t4-ex15',
    subjectId: 'math302',
    topicId: 'math302-topic-4',
    title: 'Coupled Oscillators',
    difficulty: 5,
    description: 'Two masses connected by springs: d²x/dt² = -2x + y, d²y/dt² = x - 2y. Convert to first-order system.',
    starterCode: `import numpy as np

def coupled_oscillators_matrix():
    """
    Convert second-order system to first-order
    Return the 4x4 coefficient matrix A
    where dX/dt = AX with X = [x, y, x', y']
    """
    pass`,
    solution: `import numpy as np

def coupled_oscillators_matrix():
    """
    Let X = [x, y, x', y']
    x' = x'
    y' = y'
    x'' = -2x + y
    y'' = x - 2y

    dX/dt = [[0,  0,  1,  0],
             [0,  0,  0,  1],
             [-2, 1,  0,  0],
             [1, -2,  0,  0]] X
    """
    A = np.array([
        [0,  0,  1,  0],
        [0,  0,  0,  1],
        [-2, 1,  0,  0],
        [1, -2,  0,  0]
    ])
    return A`,
    testCases: [
      { input: '', expectedOutput: '[[0, 0, 1, 0], [0, 0, 0, 1], [-2, 1, 0, 0], [1, -2, 0, 0]]', isHidden: false, description: 'First-order system matrix' },
      { input: '', expectedOutput: '[[0, 0, 1, 0], [0, 0, 0, 1], [-2, 1, 0, 0], [1, -2, 0, 0]]', isHidden: false, description: 'Coupled oscillator matrix' }
    ],
    hints: ['Introduce variables v = dx/dt, w = dy/dt', 'State vector: [x, y, v, w]', 'First two equations: dx/dt = v, dy/dt = w'],
    language: 'python'
  },
  {
    id: 'math302-t4-ex16',
    subjectId: 'math302',
    topicId: 'math302-topic-4',
    title: 'Fundamental Matrix',
    difficulty: 5,
    description: 'For dx/dt = [[1, 1], [4, 1]]x, compute the fundamental matrix Φ(t) at t = 0.',
    starterCode: `import numpy as np

def fundamental_matrix():
    """
    For A = [[1, 1], [4, 1]]
    Compute fundamental matrix Φ(0)
    Φ(t) has columns as independent solutions
    Φ(0) should be identity if normalized
    """
    pass`,
    solution: `import numpy as np

def fundamental_matrix():
    """
    Fundamental matrix Φ(t) at t=0 is identity
    when solutions are normalized so that Φ(0) = I

    For this problem, Φ(0) = I
    """
    return np.eye(2)`,
    testCases: [
      { input: '', expectedOutput: '[[1.0, 0.0], [0.0, 1.0]]', isHidden: false, description: 'Φ(0) = I' },
      { input: '', expectedOutput: '[[1.0, 0.0], [0.0, 1.0]]', isHidden: false, description: 'Identity at t=0' }
    ],
    hints: ['Fundamental matrix contains independent solutions as columns', 'At t=0, Φ(0) = I when properly normalized', 'Φ(t) = e^(At) when Φ(0) = I'],
    language: 'python'
  }
];
