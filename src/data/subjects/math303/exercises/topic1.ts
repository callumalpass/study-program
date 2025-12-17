import { CodingExercise } from '../../../../core/types';

export const topic1Exercises: CodingExercise[] = [
  {
    id: 'math303-t1-ex01',
    subjectId: 'math303',
    topicId: 'math303-topic-1',
    title: 'Find Supremum of Bounded Set',
    difficulty: 1,
    description: 'Given a finite set of real numbers, find its supremum (least upper bound).',
    starterCode: `def find_supremum(S):
    """
    Find the supremum of set S
    Args:
        S: list of real numbers
    Returns:
        float: supremum of S
    """
    pass`,
    solution: `def find_supremum(S):
    """
    Find the supremum of set S
    Args:
        S: list of real numbers
    Returns:
        float: supremum of S
    """
    return max(S)`,
    testCases: [
      { input: '[1, 2, 3, 4, 5]', expectedOutput: '5', isHidden: false, description: 'Simple integer set' },
      { input: '[0.1, 0.5, 0.9]', expectedOutput: '0.9', isHidden: false, description: 'Decimal values' },
      { input: '[-5, -2, -1]', expectedOutput: '-1', isHidden: true, description: 'Negative numbers' }
    ],
    hints: ['The supremum of a finite set is its maximum element'],
    language: 'python'
  },
  {
    id: 'math303-t1-ex02',
    subjectId: 'math303',
    topicId: 'math303-topic-1',
    title: 'Find Infimum of Bounded Set',
    difficulty: 1,
    description: 'Given a finite set of real numbers, find its infimum (greatest lower bound).',
    starterCode: `def find_infimum(S):
    """
    Find the infimum of set S
    Args:
        S: list of real numbers
    Returns:
        float: infimum of S
    """
    pass`,
    solution: `def find_infimum(S):
    """
    Find the infimum of set S
    Args:
        S: list of real numbers
    Returns:
        float: infimum of S
    """
    return min(S)`,
    testCases: [
      { input: '[1, 2, 3, 4, 5]', expectedOutput: '1', isHidden: false, description: 'Simple integer set' },
      { input: '[0.1, 0.5, 0.9]', expectedOutput: '0.1', isHidden: false, description: 'Decimal values' },
      { input: '[-5, -2, -1]', expectedOutput: '-5', isHidden: true, description: 'Negative numbers' }
    ],
    hints: ['The infimum of a finite set is its minimum element'],
    language: 'python'
  },
  {
    id: 'math303-t1-ex03',
    subjectId: 'math303',
    topicId: 'math303-topic-1',
    title: 'Supremum of Open Interval',
    difficulty: 2,
    description: 'Compute the supremum of the set {x : a < x < b} for given a and b.',
    starterCode: `def supremum_open_interval(a, b):
    """
    Find supremum of open interval (a, b)
    Args:
        a: left endpoint
        b: right endpoint
    Returns:
        float: supremum
    """
    pass`,
    solution: `def supremum_open_interval(a, b):
    """
    Find supremum of open interval (a, b)
    Args:
        a: left endpoint
        b: right endpoint
    Returns:
        float: supremum
    """
    return b`,
    testCases: [
      { input: '0, 1', expectedOutput: '1', isHidden: false, description: 'Unit interval' },
      { input: '-5, 5', expectedOutput: '5', isHidden: false, description: 'Symmetric interval' },
      { input: '2.5, 7.8', expectedOutput: '7.8', isHidden: true, description: 'Arbitrary interval' }
    ],
    hints: ['The supremum of (a,b) is b, even though b is not in the set'],
    language: 'python'
  },
  {
    id: 'math303-t1-ex04',
    subjectId: 'math303',
    topicId: 'math303-topic-1',
    title: 'Infimum of Open Interval',
    difficulty: 2,
    description: 'Compute the infimum of the set {x : a < x < b} for given a and b.',
    starterCode: `def infimum_open_interval(a, b):
    """
    Find infimum of open interval (a, b)
    Args:
        a: left endpoint
        b: right endpoint
    Returns:
        float: infimum
    """
    pass`,
    solution: `def infimum_open_interval(a, b):
    """
    Find infimum of open interval (a, b)
    Args:
        a: left endpoint
        b: right endpoint
    Returns:
        float: infimum
    """
    return a`,
    testCases: [
      { input: '0, 1', expectedOutput: '0', isHidden: false, description: 'Unit interval' },
      { input: '-5, 5', expectedOutput: '-5', isHidden: false, description: 'Symmetric interval' },
      { input: '2.5, 7.8', expectedOutput: '2.5', isHidden: true, description: 'Arbitrary interval' }
    ],
    hints: ['The infimum of (a,b) is a, even though a is not in the set'],
    language: 'python'
  },
  {
    id: 'math303-t1-ex05',
    subjectId: 'math303',
    topicId: 'math303-topic-1',
    title: 'Supremum of Reciprocal Set',
    difficulty: 3,
    description: 'Find the supremum of the set {1/n : n ∈ ℕ, n ≥ 1}.',
    starterCode: `def supremum_reciprocals(max_n):
    """
    Find supremum of {1/n : n = 1, 2, ..., max_n}
    Args:
        max_n: maximum n to consider
    Returns:
        float: supremum
    """
    pass`,
    solution: `def supremum_reciprocals(max_n):
    """
    Find supremum of {1/n : n = 1, 2, ..., max_n}
    Args:
        max_n: maximum n to consider
    Returns:
        float: supremum
    """
    return 1.0`,
    testCases: [
      { input: '10', expectedOutput: '1.0', isHidden: false, description: 'First 10 terms' },
      { input: '100', expectedOutput: '1.0', isHidden: false, description: 'First 100 terms' },
      { input: '1000', expectedOutput: '1.0', isHidden: true, description: 'First 1000 terms' }
    ],
    hints: ['The supremum occurs at n=1', 'The sequence 1/n is decreasing'],
    language: 'python'
  },
  {
    id: 'math303-t1-ex06',
    subjectId: 'math303',
    topicId: 'math303-topic-1',
    title: 'Infimum of Reciprocal Set',
    difficulty: 3,
    description: 'Find the infimum of the set {1/n : n ∈ ℕ, n ≥ 1}.',
    starterCode: `def infimum_reciprocals():
    """
    Find infimum of {1/n : n ∈ ℕ, n ≥ 1}
    Returns:
        float: infimum
    """
    pass`,
    solution: `def infimum_reciprocals():
    """
    Find infimum of {1/n : n ∈ ℕ, n ≥ 1}
    Returns:
        float: infimum
    """
    return 0.0`,
    testCases: [
      { input: '', expectedOutput: '0.0', isHidden: false, description: 'Infimum of reciprocals' },
      { input: '', expectedOutput: '0.0', isHidden: false, description: 'Verify limit behavior' },
      { input: '', expectedOutput: '0.0', isHidden: true, description: 'Greatest lower bound' }
    ],
    hints: ['As n → ∞, 1/n → 0', 'The infimum is 0, but 0 is not in the set'],
    language: 'python'
  },
  {
    id: 'math303-t1-ex07',
    subjectId: 'math303',
    topicId: 'math303-topic-1',
    title: 'Bounded Above Check',
    difficulty: 2,
    description: 'Determine if a given set is bounded above.',
    starterCode: `def is_bounded_above(S, M):
    """
    Check if set S is bounded above by M
    Args:
        S: list of real numbers
        M: potential upper bound
    Returns:
        bool: True if M is an upper bound
    """
    pass`,
    solution: `def is_bounded_above(S, M):
    """
    Check if set S is bounded above by M
    Args:
        S: list of real numbers
        M: potential upper bound
    Returns:
        bool: True if M is an upper bound
    """
    return all(x <= M for x in S)`,
    testCases: [
      { input: '[1, 2, 3], 5', expectedOutput: 'True', isHidden: false, description: 'Valid upper bound' },
      { input: '[1, 2, 3], 2', expectedOutput: 'False', isHidden: false, description: 'Too small bound' },
      { input: '[0.5, 0.9, 1.2], 1.5', expectedOutput: 'True', isHidden: true, description: 'Decimal values' }
    ],
    hints: ['M is an upper bound if x ≤ M for all x in S'],
    language: 'python'
  },
  {
    id: 'math303-t1-ex08',
    subjectId: 'math303',
    topicId: 'math303-topic-1',
    title: 'Bounded Below Check',
    difficulty: 2,
    description: 'Determine if a given set is bounded below.',
    starterCode: `def is_bounded_below(S, m):
    """
    Check if set S is bounded below by m
    Args:
        S: list of real numbers
        m: potential lower bound
    Returns:
        bool: True if m is a lower bound
    """
    pass`,
    solution: `def is_bounded_below(S, m):
    """
    Check if set S is bounded below by m
    Args:
        S: list of real numbers
        m: potential lower bound
    Returns:
        bool: True if m is a lower bound
    """
    return all(x >= m for x in S)`,
    testCases: [
      { input: '[1, 2, 3], 0', expectedOutput: 'True', isHidden: false, description: 'Valid lower bound' },
      { input: '[1, 2, 3], 2', expectedOutput: 'False', isHidden: false, description: 'Too large bound' },
      { input: '[-5, -2, 1], -6', expectedOutput: 'True', isHidden: true, description: 'Mixed signs' }
    ],
    hints: ['m is a lower bound if x ≥ m for all x in S'],
    language: 'python'
  },
  {
    id: 'math303-t1-ex09',
    subjectId: 'math303',
    topicId: 'math303-topic-1',
    title: 'Supremum of Quadratic Set',
    difficulty: 3,
    description: 'Find the supremum of the set {-x² + 4 : x ∈ [0, 3]}.',
    starterCode: `def supremum_quadratic():
    """
    Find supremum of {-x² + 4 : x ∈ [0, 3]}
    Returns:
        float: supremum
    """
    pass`,
    solution: `def supremum_quadratic():
    """
    Find supremum of {-x² + 4 : x ∈ [0, 3]}
    Returns:
        float: supremum
    """
    # Maximum at x=0: -0² + 4 = 4
    return 4.0`,
    testCases: [
      { input: '', expectedOutput: '4.0', isHidden: false, description: 'Maximum of quadratic' },
      { input: '', expectedOutput: '4.0', isHidden: false, description: 'Vertex analysis' },
      { input: '', expectedOutput: '4.0', isHidden: true, description: 'Supremum value' }
    ],
    hints: ['The function -x² + 4 is maximized at x = 0', 'Evaluate at the endpoints and critical points'],
    language: 'python'
  },
  {
    id: 'math303-t1-ex10',
    subjectId: 'math303',
    topicId: 'math303-topic-1',
    title: 'Infimum of Quadratic Set',
    difficulty: 3,
    description: 'Find the infimum of the set {-x² + 4 : x ∈ [0, 3]}.',
    starterCode: `def infimum_quadratic():
    """
    Find infimum of {-x² + 4 : x ∈ [0, 3]}
    Returns:
        float: infimum
    """
    pass`,
    solution: `def infimum_quadratic():
    """
    Find infimum of {-x² + 4 : x ∈ [0, 3]}
    Returns:
        float: infimum
    """
    # Minimum at x=3: -9 + 4 = -5
    return -5.0`,
    testCases: [
      { input: '', expectedOutput: '-5.0', isHidden: false, description: 'Minimum of quadratic' },
      { input: '', expectedOutput: '-5.0', isHidden: false, description: 'Endpoint analysis' },
      { input: '', expectedOutput: '-5.0', isHidden: true, description: 'Infimum value' }
    ],
    hints: ['The function -x² + 4 is minimized at x = 3 on [0,3]', 'Check the endpoints'],
    language: 'python'
  },
  {
    id: 'math303-t1-ex11',
    subjectId: 'math303',
    topicId: 'math303-topic-1',
    title: 'Supremum of Rational Set',
    difficulty: 4,
    description: 'Find the supremum of the set {n/(n+1) : n ∈ ℕ, n ≥ 1}.',
    starterCode: `def supremum_rationals():
    """
    Find supremum of {n/(n+1) : n ∈ ℕ, n ≥ 1}
    Returns:
        float: supremum
    """
    pass`,
    solution: `def supremum_rationals():
    """
    Find supremum of {n/(n+1) : n ∈ ℕ, n ≥ 1}
    Returns:
        float: supremum
    """
    # As n → ∞, n/(n+1) → 1
    return 1.0`,
    testCases: [
      { input: '', expectedOutput: '1.0', isHidden: false, description: 'Limit as n approaches infinity' },
      { input: '', expectedOutput: '1.0', isHidden: false, description: 'Supremum of sequence' },
      { input: '', expectedOutput: '1.0', isHidden: true, description: 'Least upper bound' }
    ],
    hints: ['Consider lim(n→∞) n/(n+1)', 'Rewrite as 1 - 1/(n+1)'],
    language: 'python'
  },
  {
    id: 'math303-t1-ex12',
    subjectId: 'math303',
    topicId: 'math303-topic-1',
    title: 'Supremum of Sine-Based Set',
    difficulty: 4,
    description: 'Find the supremum of the set {sin(x) : x ∈ [0, π/2]}.',
    starterCode: `def supremum_sine():
    """
    Find supremum of {sin(x) : x ∈ [0, π/2]}
    Returns:
        float: supremum
    """
    pass`,
    solution: `def supremum_sine():
    """
    Find supremum of {sin(x) : x ∈ [0, π/2]}
    Returns:
        float: supremum
    """
    # sin(x) reaches maximum of 1 at x = π/2
    return 1.0`,
    testCases: [
      { input: '', expectedOutput: '1.0', isHidden: false, description: 'Maximum of sine on interval' },
      { input: '', expectedOutput: '1.0', isHidden: false, description: 'Supremum value' },
      { input: '', expectedOutput: '1.0', isHidden: true, description: 'Sin achieves maximum' }
    ],
    hints: ['sin(x) is increasing on [0, π/2]', 'Maximum occurs at x = π/2'],
    language: 'python'
  },
  {
    id: 'math303-t1-ex13',
    subjectId: 'math303',
    topicId: 'math303-topic-1',
    title: 'Verify Least Upper Bound',
    difficulty: 4,
    description: 'Verify that M is the least upper bound of set S by checking: (1) M is an upper bound, (2) no smaller value is an upper bound.',
    starterCode: `def verify_supremum(S, M, epsilon=0.01):
    """
    Verify M is supremum of S
    Args:
        S: list of real numbers
        M: candidate supremum
        epsilon: tolerance for verification
    Returns:
        bool: True if M is supremum
    """
    pass`,
    solution: `def verify_supremum(S, M, epsilon=0.01):
    """
    Verify M is supremum of S
    Args:
        S: list of real numbers
        M: candidate supremum
        epsilon: tolerance for verification
    Returns:
        bool: True if M is supremum
    """
    # Check M is upper bound
    if not all(x <= M for x in S):
        return False
    # Check M - epsilon is not upper bound
    # i.e., there exists x in S with x > M - epsilon
    return any(x > M - epsilon for x in S)`,
    testCases: [
      { input: '[1, 2, 3, 4], 4, 0.1', expectedOutput: 'True', isHidden: false, description: 'Valid supremum' },
      { input: '[1, 2, 3, 4], 5, 0.1', expectedOutput: 'False', isHidden: false, description: 'Not least upper bound' },
      { input: '[0.1, 0.5, 0.9], 0.9, 0.01', expectedOutput: 'True', isHidden: true, description: 'Decimal supremum' }
    ],
    hints: ['Check that M is an upper bound', 'Check that M - ε is not an upper bound for small ε'],
    language: 'python'
  },
  {
    id: 'math303-t1-ex14',
    subjectId: 'math303',
    topicId: 'math303-topic-1',
    title: 'Supremum of Union',
    difficulty: 4,
    description: 'Given two sets A and B, find sup(A ∪ B) = max(sup A, sup B).',
    starterCode: `def supremum_union(A, B):
    """
    Find supremum of A ∪ B
    Args:
        A: list of real numbers
        B: list of real numbers
    Returns:
        float: sup(A ∪ B)
    """
    pass`,
    solution: `def supremum_union(A, B):
    """
    Find supremum of A ∪ B
    Args:
        A: list of real numbers
        B: list of real numbers
    Returns:
        float: sup(A ∪ B)
    """
    return max(max(A), max(B))`,
    testCases: [
      { input: '[1, 2, 3], [4, 5, 6]', expectedOutput: '6', isHidden: false, description: 'Disjoint sets' },
      { input: '[1, 5, 9], [2, 3, 4]', expectedOutput: '9', isHidden: false, description: 'Overlapping ranges' },
      { input: '[-5, -2], [-3, -1]', expectedOutput: '-1', isHidden: true, description: 'Negative numbers' }
    ],
    hints: ['sup(A ∪ B) = max(sup A, sup B)'],
    language: 'python'
  },
  {
    id: 'math303-t1-ex15',
    subjectId: 'math303',
    topicId: 'math303-topic-1',
    title: 'Infimum of Union',
    difficulty: 4,
    description: 'Given two sets A and B, find inf(A ∪ B) = min(inf A, inf B).',
    starterCode: `def infimum_union(A, B):
    """
    Find infimum of A ∪ B
    Args:
        A: list of real numbers
        B: list of real numbers
    Returns:
        float: inf(A ∪ B)
    """
    pass`,
    solution: `def infimum_union(A, B):
    """
    Find infimum of A ∪ B
    Args:
        A: list of real numbers
        B: list of real numbers
    Returns:
        float: inf(A ∪ B)
    """
    return min(min(A), min(B))`,
    testCases: [
      { input: '[1, 2, 3], [4, 5, 6]', expectedOutput: '1', isHidden: false, description: 'Disjoint sets' },
      { input: '[1, 5, 9], [2, 3, 4]', expectedOutput: '1', isHidden: false, description: 'Overlapping ranges' },
      { input: '[-5, -2], [-3, -1]', expectedOutput: '-5', isHidden: true, description: 'Negative numbers' }
    ],
    hints: ['inf(A ∪ B) = min(inf A, inf B)'],
    language: 'python'
  },
  {
    id: 'math303-t1-ex16',
    subjectId: 'math303',
    topicId: 'math303-topic-1',
    title: 'Supremum of Scaled Set',
    difficulty: 5,
    description: 'Given a set S and scalar c > 0, prove that sup(cS) = c·sup(S) where cS = {cx : x ∈ S}.',
    starterCode: `def supremum_scaled_set(S, c):
    """
    Find supremum of cS where cS = {c*x : x in S}
    Args:
        S: list of real numbers
        c: positive scalar
    Returns:
        float: sup(cS)
    """
    pass`,
    solution: `def supremum_scaled_set(S, c):
    """
    Find supremum of cS where cS = {c*x : x in S}
    Args:
        S: list of real numbers
        c: positive scalar
    Returns:
        float: sup(cS)
    """
    return c * max(S)`,
    testCases: [
      { input: '[1, 2, 3], 2', expectedOutput: '6', isHidden: false, description: 'Scale by 2' },
      { input: '[1, 2, 3], 0.5', expectedOutput: '1.5', isHidden: false, description: 'Scale by 0.5' },
      { input: '[-5, -2, 1], 3', expectedOutput: '3', isHidden: true, description: 'Mixed signs scaled' }
    ],
    hints: ['If c > 0, then sup(cS) = c·sup(S)', 'Scaling preserves order when c > 0'],
    language: 'python'
  }
];
